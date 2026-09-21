import type { IncomingMessage, ServerResponse } from 'http';
import { passkeyServer } from '../src/lib/passkey/server.ts';

/**
 * Serverless / HTTP API route handler for Passkey operations
 * Handles:
 * - POST /api/passkey/register-challenge
 * - POST /api/passkey/register-verify
 * - POST /api/passkey/login-challenge
 * - POST /api/passkey/login-verify
 * - GET  /api/passkey/private-data
 * - GET  /api/passkey/list-keys
 * - POST /api/passkey/delete-key
 * - POST /api/passkey/logout
 */

async function parseJsonBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function sendJsonResponse(res: ServerResponse, statusCode: number, data: unknown) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  res.end(JSON.stringify(data));
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method === 'OPTIONS') {
    return sendJsonResponse(res, 204, {});
  }

  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname.replace(/\/+$/, '');
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : undefined;

  try {
    // 1. Register Challenge
    if (pathname.endsWith('/register-challenge') && req.method === 'POST') {
      const body = await parseJsonBody(req);
      const username = (body.username as string) || 'jinyeong';
      const rpId = (body.rpId as string) || (req.headers.host ? req.headers.host.split(':')[0] : 'localhost');
      const result = passkeyServer.createRegisterChallenge(username, rpId);
      return sendJsonResponse(res, result.statusCode, result);
    }

    // 2. Register Verify
    if (pathname.endsWith('/register-verify') && req.method === 'POST') {
      const body = await parseJsonBody(req);
      const result = passkeyServer.verifyRegister(
        body as unknown as Parameters<typeof passkeyServer.verifyRegister>[0],
      );
      return sendJsonResponse(res, result.statusCode, result);
    }

    // 3. Login Challenge
    if (pathname.endsWith('/login-challenge') && req.method === 'POST') {
      const body = await parseJsonBody(req);
      const username = (body.username as string) || 'jinyeong';
      const result = passkeyServer.createLoginChallenge(username);
      return sendJsonResponse(res, result.statusCode, result);
    }

    // 4. Login Verify
    if (pathname.endsWith('/login-verify') && req.method === 'POST') {
      const body = await parseJsonBody(req);
      const result = await passkeyServer.verifyLogin(
        body as unknown as Parameters<typeof passkeyServer.verifyLogin>[0],
      );
      return sendJsonResponse(res, result.statusCode, result);
    }

    // 5. Private Data (T08-C16, T08-C17, T08-C36 ~ T08-C40)
    if (pathname.endsWith('/private-data') && req.method === 'GET') {
      const targetUser = url.searchParams.get('user') || undefined;
      const result = await passkeyServer.getPrivateData(token, targetUser);
      return sendJsonResponse(res, result.statusCode, result);
    }

    // 6. List Passkeys (T08-C43)
    if (pathname.endsWith('/list-keys') && req.method === 'GET') {
      if (!token) {
        return sendJsonResponse(res, 401, { success: false, statusCode: 401, error: 'Unauthorized' });
      }
      const result = await passkeyServer.listPasskeys(token);
      return sendJsonResponse(res, result.statusCode, result);
    }

    // 7. Delete Passkey (T08-C44)
    if (pathname.endsWith('/delete-key') && (req.method === 'POST' || req.method === 'DELETE')) {
      if (!token) {
        return sendJsonResponse(res, 401, { success: false, statusCode: 401, error: 'Unauthorized' });
      }
      const body = await parseJsonBody(req);
      const credentialId = (body.credentialId as string) || url.searchParams.get('id') || '';
      const result = await passkeyServer.deletePasskey(token, credentialId);
      return sendJsonResponse(res, result.statusCode, result);
    }

    // 8. Logout (T08-C33)
    if (pathname.endsWith('/logout') && req.method === 'POST') {
      const result = await passkeyServer.logout(token);
      return sendJsonResponse(res, result.statusCode, result);
    }

    return sendJsonResponse(res, 404, { success: false, statusCode: 404, error: 'Endpoint not found' });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return sendJsonResponse(res, 500, { success: false, statusCode: 500, error: errorMsg });
  }
}
