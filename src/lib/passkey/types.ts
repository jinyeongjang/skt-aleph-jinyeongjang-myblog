export interface PasskeyJwk {
  kty?: string;
  crv?: string;
  x?: string;
  y?: string;
  d?: string;
  n?: string;
  e?: string;
  alg?: string;
  ext?: boolean;
  key_ops?: string[];
  use?: string;
  [key: string]: unknown;
}

export type AuthenticatorTransport = 'usb' | 'nfc' | 'ble' | 'internal' | 'hybrid' | string;

export interface PasskeyCredential {
  id: string; // Base64URL credential ID
  name: string; // Human-readable name (e.g., 'MacBook Touch ID', 'Windows Hello')
  publicKeyJwk: PasskeyJwk; // Stored public key (ECDSA P-256)
  publicKeyPem?: string; // PEM representation for audit display
  algorithm: string; // e.g., 'ES256' (-7)
  createdAt: string; // ISO 8601 timestamp
  lastUsedAt?: string;
  transports?: AuthenticatorTransport[];
  counter: number;
}

export interface UserAccount {
  id: string;
  username: string;
  displayName: string;
  credentials: PasskeyCredential[];
}

export interface PrivateItem {
  id: string;
  category: string;
  title: string;
  badge: string;
  summary: string;
  details: string;
  updatedAt: string;
}

export interface ChallengeRecord {
  challenge: string;
  userId: string;
  type: 'register' | 'login';
  createdAt: number;
  used: boolean;
}

export interface SessionTokenPayload {
  userId: string;
  username: string;
  sessionId: string;
  iat: number;
  exp: number;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action:
    | 'REGISTER_CHALLENGE'
    | 'REGISTER_VERIFY'
    | 'LOGIN_CHALLENGE'
    | 'LOGIN_VERIFY'
    | 'GET_DATA'
    | 'DELETE_KEY'
    | 'LOGOUT'
    | 'SECURITY_TEST';
  status: 'SUCCESS' | 'REJECTED_401' | 'REJECTED_403' | 'CANCELLED';
  statusCode: number;
  username: string;
  details: string;
  requestPayload?: string;
  responsePayload?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
  auditId?: string;
}
