import type { PasskeyJwk } from './types.ts';

// Base64URL encoding/decoding
export function uint8ArrayToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function base64UrlToUint8Array(base64url: string): Uint8Array {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export function stringToBase64Url(str: string): string {
  const encoder = new TextEncoder();
  return uint8ArrayToBase64Url(encoder.encode(str));
}

export function base64UrlToString(base64url: string): string {
  const decoder = new TextDecoder();
  return decoder.decode(base64UrlToUint8Array(base64url));
}

// Generate a cryptographically secure random challenge (32 bytes / 256 bits)
export function generateRandomChallenge(): string {
  const bytes = new Uint8Array(32);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    // Fallback for non-crypto environments
    for (let i = 0; i < 32; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  return uint8ArrayToBase64Url(bytes);
}

// Convert JWK to PEM format for display
export function jwkToPem(jwk: PasskeyJwk): string {
  if (!jwk.x || !jwk.y) return 'INVALID_JWK';
  return (
    `-----BEGIN PUBLIC KEY-----\n` +
    `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA\n` +
    `Curve: ${jwk.crv || 'P-256'} | Alg: ${jwk.alg || 'ES256'}\n` +
    `X: ${jwk.x}\n` +
    `Y: ${jwk.y}\n` +
    `-----END PUBLIC KEY-----`
  );
}

// Verify an ECDSA P-256 (ES256) signature against clientDataJson + authenticatorData
export async function verifyEs256Signature(
  publicKeyJwk: PasskeyJwk,
  signatureBase64Url: string,
  clientDataJsonBase64Url: string,
  authenticatorDataBase64Url: string,
): Promise<boolean> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const key = await crypto.subtle.importKey(
      'jwk',
      publicKeyJwk as unknown as any,
      {
        name: 'ECDSA',
        namedCurve: 'P-256',
      },
      false,
      ['verify'],
    );

    const clientDataBytes = base64UrlToUint8Array(clientDataJsonBase64Url);
    const clientDataHash = await crypto.subtle.digest(
      'SHA-256',
      clientDataBytes as unknown as ArrayBufferView<ArrayBuffer>,
    );

    const authDataBytes = base64UrlToUint8Array(authenticatorDataBase64Url);
    const signedData = new Uint8Array(authDataBytes.length + clientDataHash.byteLength);
    signedData.set(authDataBytes, 0);
    signedData.set(new Uint8Array(clientDataHash), authDataBytes.length);

    const signatureBytes = base64UrlToUint8Array(signatureBase64Url);

    // Standard WebAuthn signatures may be DER-encoded or IEEE P1363 (raw R||S).
    // SubtleCrypto ECDSA verify expects raw IEEE P1363 format (64 bytes: 32 bytes R + 32 bytes S).
    let rawSignature = signatureBytes;
    if (signatureBytes[0] === 0x30) {
      // Convert DER to raw P1363
      rawSignature = derToRawSignature(signatureBytes);
    }

    const isValid = await crypto.subtle.verify(
      {
        name: 'ECDSA',
        hash: { name: 'SHA-256' },
      },
      key,
      rawSignature as unknown as ArrayBufferView<ArrayBuffer>,
      signedData as unknown as ArrayBufferView<ArrayBuffer>,
    );

    return isValid;
  } catch (err) {
    console.warn('[PasskeyCrypto] Signature verification fallback/error:', err);
    return false;
  }
}

// Helper: Convert DER signature (ASN.1 sequence of two integers) to raw R||S 64-byte signature
function derToRawSignature(derBytes: Uint8Array): Uint8Array {
  try {
    let offset = 2; // skip 0x30, length
    if (derBytes[1] & 0x80) {
      offset += derBytes[1] & 0x7f;
    }

    // R
    if (derBytes[offset] !== 0x02) return derBytes;
    offset++;
    const rLen = derBytes[offset++];
    let r = derBytes.slice(offset, offset + rLen);
    offset += rLen;

    // S
    if (derBytes[offset] !== 0x02) return derBytes;
    offset++;
    const sLen = derBytes[offset++];
    let s = derBytes.slice(offset, offset + sLen);

    // Strip leading zeroes if length is 33
    if (r.length === 33 && r[0] === 0x00) r = r.slice(1);
    if (s.length === 33 && s[0] === 0x00) s = s.slice(1);

    // Pad if shorter than 32
    const raw = new Uint8Array(64);
    raw.set(r, 32 - r.length);
    raw.set(s, 64 - s.length);
    return raw;
  } catch {
    return derBytes;
  }
}

// Secret key for HMAC token signing (ephemeral in-memory key or static seed)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let tokenHmacKey: any = null;
async function getHmacKey(): Promise<any> {
  if (!tokenHmacKey) {
    const rawSecret = new TextEncoder().encode('SKT_ALEPH_PASSKEY_SESSION_SECRET_2026_SECURE_TOKEN_SEED');
    tokenHmacKey = await crypto.subtle.importKey('raw', rawSecret, { name: 'HMAC', hash: 'SHA-256' }, false, [
      'sign',
      'verify',
    ]);
  }
  return tokenHmacKey;
}

// Sign a session token (JWT-like HMAC-SHA256)
export async function createSessionToken(payload: {
  userId: string;
  username: string;
  sessionId: string;
  exp: number;
}): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const headerB64 = stringToBase64Url(JSON.stringify(header));
  const payloadB64 = stringToBase64Url(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000) }));

  const key = await getHmacKey();
  const dataToSign = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, dataToSign);
  const signatureB64 = uint8ArrayToBase64Url(new Uint8Array(signatureBuffer));

  return `${headerB64}.${payloadB64}.${signatureB64}`;
}

// Verify a session token
export async function verifySessionToken(
  token: string,
): Promise<{ valid: boolean; payload?: { userId: string; username: string; sessionId: string; exp: number } }> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return { valid: false };

    const [headerB64, payloadB64, signatureB64] = parts;
    const key = await getHmacKey();
    const dataToVerify = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
    const signatureBytes = base64UrlToUint8Array(signatureB64);

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes as unknown as ArrayBufferView<ArrayBuffer>,
      dataToVerify as unknown as ArrayBufferView<ArrayBuffer>,
    );
    if (!isValid) return { valid: false };

    const payload = JSON.parse(base64UrlToString(payloadB64));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return { valid: false }; // Expired
    }

    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}

// Mask sensitive token for display/logging (T08-C34)
export function maskToken(token?: string): string {
  if (!token) return 'null';
  if (token.length <= 16) return '***MASKED***';
  return `${token.substring(0, 10)}...***MASKED***...${token.substring(token.length - 6)}`;
}
