import type {
  PasskeyCredential,
  UserAccount,
  PrivateItem,
  ChallengeRecord,
  AuditLogEntry,
  ApiResponse,
  PasskeyJwk,
} from './types.ts';
import {
  generateRandomChallenge,
  verifyEs256Signature,
  createSessionToken,
  verifySessionToken,
  maskToken,
  jwkToPem,
} from './crypto.ts';

// In-Memory Database (persists across requests during server runtime, initialized with test-ready mock data)
class PasskeyServerDatabase {
  private users: Map<string, UserAccount> = new Map();
  private privateData: Map<string, PrivateItem[]> = new Map();
  private challenges: Map<string, ChallengeRecord> = new Map();
  private revokedTokens: Set<string> = new Set();
  private activeSessions: Set<string> = new Set();
  private auditLogs: AuditLogEntry[] = [];

  constructor() {
    this.seedDatabase();
  }

  private seedDatabase() {
    // 1. Account 1: jinyeong (Primary Portfolio Owner)
    const userJinyeong: UserAccount = {
      id: 'usr_jinyeong_01',
      username: 'jinyeong',
      displayName: '장진영 (jinyeong)',
      credentials: [
        {
          id: 'cred_jinyeong_macbook_p256',
          name: 'Windows Hello PIN / 생체 인증 (주 기기)',
          algorithm: 'ES256',
          createdAt: '2026-09-18T09:30:00.000Z',
          counter: 1,
          publicKeyJwk: {
            kty: 'EC',
            crv: 'P-256',
            x: 'W4r-5wzJcW4r6eG4v9bXv0xY1zA3bC5dE7fG9hI1jK3',
            y: 'L7m-9nOpQrStUvWxYzAbCdEfGhIjKlMnOpQrStUvWxY',
          },
          publicKeyPem: `-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEW4r5wzJcW4r6eG4v9bXv0xY1zA3b\nC5dE7fG9hI1jK3L7m9nOpQrStUvWxYzAbCdEfGhIjKlMnOpQrStUvWxY==\n-----END PUBLIC KEY-----`,
        },
        {
          id: 'cred_jinyeong_pixel_backup',
          name: 'Google 비밀번호 관리자 (Pixel 스마트폰 백업 키)',
          algorithm: 'ES256',
          createdAt: '2026-09-19T14:15:00.000Z',
          counter: 1,
          publicKeyJwk: {
            kty: 'EC',
            crv: 'P-256',
            x: 'A1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v',
            y: 'Z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e',
          },
          publicKeyPem: `-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEA1b2c3d4e5f6g7h8i9j0k1l2m3n4\no5p6q7r8s9t0u1vZ9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e==\n-----END PUBLIC KEY-----`,
        },
      ],
    };

    // 2. Account 2: evaluator_test (Isolated Evaluator / Tester Account)
    const userEvaluator: UserAccount = {
      id: 'usr_evaluator_02',
      username: 'evaluator_test',
      displayName: '평가위원 모의계정 (evaluator_test)',
      credentials: [
        {
          id: 'cred_evaluator_yubikey',
          name: 'YubiKey 5C NFC (평가위원 전용 보안 키)',
          algorithm: 'ES256',
          createdAt: '2026-09-20T11:00:00.000Z',
          counter: 1,
          publicKeyJwk: {
            kty: 'EC',
            crv: 'P-256',
            x: 'K1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6A7B8C9D0E1F',
            y: 'G2H3I4J5K6L7M8N9O0P1Q2R3S4T5U6V7W8X9Y0Z1A2B',
          },
          publicKeyPem: `-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEK1l2m3n4o5p6q7r8s9t0u1v2w3x4\ny5z6A7B8C9D0E1FG2H3I4J5K6L7M8N9O0P1Q2R3S4T5U6V7W8X9Y0Z1A2B==\n-----END PUBLIC KEY-----`,
        },
      ],
    };

    this.users.set('jinyeong', userJinyeong);
    this.users.set('evaluator_test', userEvaluator);

    // Seed Private Mock Data (T08-C14: 3+ items, beginner-friendly network & access control notes, strictly mock/educational, no real PII)
    this.privateData.set('jinyeong', [
      {
        id: 'priv_jy_01',
        category: '네트워크 기초 실습',
        title: '입문자를 위한 홈 네트워크 기초와 공유기 방화벽/포트포워딩 실습 계획서',
        badge: 'NET SPRINT',
        summary:
          'SKT ALEPH 1주차 네트워크 기초 세션에서 배운 IP 주소 체계(공인 IP/사설 IP)와 공유기 포트포워딩 실습 기획',
        details:
          '내부망(192.168.0.x)과 외부 인터넷의 차이를 배우고, 내 PC의 웹 서버(8080 포트)를 공유기 방화벽 규칙을 통해 외부에서 접속할 수 있도록 열어주는 포트포워딩과 방화벽 인바운드 규칙 실습 메모.',
        updatedAt: '2026-09-20',
      },
      {
        id: 'priv_jy_02',
        category: '접근 통제 회고',
        title: '비밀번호 없는 접근 통제! FIDO2 패스키와 화이트리스트 IP 차단 실습 일지',
        badge: 'AUTH RETRO',
        summary: '패스키(WebAuthn) 인증과 특정 IP만 접속을 허용하는 기초 접근 통제 규칙을 적용하며 배운 점과 오류 해결',
        details:
          '비밀번호 대신 내 기기의 지문/얼굴 인식으로 1차 인증을 통과하고, 사전에 등록된 관리자 IP가 아니면 접근을 거절(HTTP 403)하는 이중 접근 통제 흐름을 이해하고 직접 테스트해 본 초보자의 실습 기록.',
        updatedAt: '2026-09-19',
      },
      {
        id: 'priv_jy_03',
        category: '네트워크 주간 회고',
        title: '패킷이 오가는 길! Wireshark로 엿본 TCP 3-Way Handshake와 HTTP 상태 코드',
        badge: 'PACKET NOTE',
        summary: '브라우저가 웹 서버에 연결할 때 주고받는 SYN, SYN-ACK, ACK 패킷과 401/403 거절 응답 패킷 캡처 분석',
        details:
          "수업 중 Wireshark 도구로 웹 요청 패킷을 직접 캡처해 보며, '연결을 시작하는 3단계 인사(Handshake)'와 인증 실패 시 서버가 돌려주는 401/403 패킷의 구조를 눈으로 직접 확인한 신기한 배움의 기록.",
        updatedAt: '2026-09-18',
      },
      {
        id: 'priv_jy_04',
        category: '접근 제어 스터디',
        title: '알기 쉬운 네트워크 서브넷 마스크 계산과 사용자 역할(Role) 기반 권한 제어 스터디',
        badge: 'STUDY PLAN',
        summary:
          '동료 교육생들과 함께 C클래스 IP 서브넷(255.255.255.0) 나누기와 관리자/일반사용자 권한 분리(RBAC) 기초 복습',
        details:
          "'서브넷 마스크는 우리 아파트 동/호수를 나누는 것, RBAC은 사원증 등급에 따라 들어갈 수 있는 방을 제한하는 것'처럼 쉬운 비유로 개념을 다지고, 과제 속 권한 제어 코드를 함께 분석.",
        updatedAt: '2026-09-15',
      },
    ]);

    this.privateData.set('evaluator_test', [
      {
        id: 'priv_eval_01',
        category: '접근 통제 메모',
        title: '입문자 네트워크 접근 통제 확인용 모의 데이터 (평가위원 전용)',
        badge: 'EVALUATOR ONLY',
        summary:
          '평가위원이 패스키 인증과 계정별 접근 통제(Access Control)가 올바르게 동작하는지 확인하기 위한 테스트 데이터',
        details:
          '이 문서는 evaluator_test 계정 전용 메모이며, jinyeong 계정의 접근 권한으로는 열람할 수 없어야 정상입니다 (403 Forbidden 거절 확인용).',
        updatedAt: '2026-09-20',
      },
      {
        id: 'priv_eval_02',
        category: '접근 제어 실습',
        title: '타 계정 네트워크 자원 무단 접근(IDOR) 차단 테스트',
        badge: 'TEST SUITE',
        summary: '내 권한이 아닌 다른 계정의 네트워크 저장소 URL을 직접 호출했을 때 방화벽/접근 제어가 막아주는지 확인',
        details:
          "jinyeong 학생의 로그인 토큰으로 evaluator_test의 비공개 자원을 요청하면 '접근 권한이 없습니다(HTTP 403)'로 차단되고 데이터가 안전하게 보호되어야 합니다.",
        updatedAt: '2026-09-19',
      },
      {
        id: 'priv_eval_03',
        category: '네트워크 보안 점검',
        title: '1회용 인증 티켓(챌린지) 재사용 차단 및 네트워크 세션 종료 기록',
        badge: 'AUDIT MOCK',
        summary: '한 번 사용한 인증 챌린지 패킷의 재전송 차단과 로그아웃 시 네트워크 세션 무효화 점검',
        details:
          '이미 사용된 일회용 챌린지 요청은 401로 거절되고, 로그아웃 버튼을 누르면 서버 측 세션이 즉시 폐기되는지 확인한 기록입니다.',
        updatedAt: '2026-09-18',
      },
    ]);
  }

  // --- Audit Logging ---
  private logAudit(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) {
    const log: AuditLogEntry = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      ...entry,
    };
    this.auditLogs.unshift(log);
    if (this.auditLogs.length > 50) this.auditLogs.pop();
    return log;
  }

  public getAuditLogs(): AuditLogEntry[] {
    return [...this.auditLogs];
  }

  // --- Account & Passkey Management ---
  public getUser(username: string): UserAccount | undefined {
    return this.users.get(username);
  }

  public getOrCreateUser(username: string, displayName?: string): UserAccount {
    let user = this.users.get(username);
    if (!user) {
      user = {
        id: `usr_${username}_${Date.now()}`,
        username,
        displayName: displayName || `${username} (사용자)`,
        credentials: [],
      };
      this.users.set(username, user);
      if (!this.privateData.has(username)) {
        this.privateData.set(username, [
          {
            id: `priv_${username}_01`,
            category: '신규 비공개 메모',
            title: `${username} 계정의 안전한 비공개 저장소`,
            badge: 'PRIVATE',
            summary: '패스키 인증에 성공한 사용자에게만 서버에서 직접 제공되는 비공개 데이터입니다.',
            details: '비밀번호 없이 FIDO2/WebAuthn 표준 기반 공개키 암호학으로 안전하게 보호됩니다.',
            updatedAt: new Date().toISOString().split('T')[0],
          },
        ]);
      }
    }
    return user;
  }

  // --- Registration Flow (T08-C19 ~ T08-C26) ---
  public createRegisterChallenge(username: string): ApiResponse<{
    challenge: string;
    rp: { name: string; id: string };
    user: { id: string; name: string; displayName: string };
  }> {
    const user = this.getOrCreateUser(username);
    const challenge = generateRandomChallenge();

    this.challenges.set(challenge, {
      challenge,
      userId: user.id,
      type: 'register',
      createdAt: Date.now(),
      used: false,
    });

    const audit = this.logAudit({
      action: 'REGISTER_CHALLENGE',
      status: 'SUCCESS',
      statusCode: 200,
      username,
      details: `등록용 1회용 챌린지 생성 완료 (Unique Challenge: ${challenge.substring(0, 12)}...)`,
      requestPayload: JSON.stringify({ username }),
      responsePayload: JSON.stringify({ challenge, rpId: 'localhost' }),
    });

    return {
      success: true,
      statusCode: 200,
      message: '등록 챌린지가 성공적으로 생성되었습니다.',
      auditId: audit.id,
      data: {
        challenge,
        rp: {
          name: 'SKT ALEPH Portfolio Passkey Vault',
          id: 'localhost',
        },
        user: {
          id: user.id,
          name: user.username,
          displayName: user.displayName,
        },
      },
    };
  }

  public verifyRegister(payload: {
    username: string;
    challenge: string;
    credentialId: string;
    passkeyName: string;
    publicKeyJwk: PasskeyJwk;
  }): ApiResponse<{ credentialId: string; name: string; createdAt: string }> {
    const { username, challenge, credentialId, passkeyName, publicKeyJwk } = payload;

    const challengeRecord = this.challenges.get(challenge);
    if (!challengeRecord || challengeRecord.type !== 'register' || challengeRecord.used) {
      this.logAudit({
        action: 'REGISTER_VERIFY',
        status: 'REJECTED_401',
        statusCode: 401,
        username,
        details: '유효하지 않거나 이미 사용/만료된 등록 챌린지입니다.',
        requestPayload: JSON.stringify({ username, challenge, credentialId }),
      });
      return {
        success: false,
        statusCode: 401,
        error: '유효하지 않거나 이미 사용된 등록 챌린지입니다. 다시 시도해 주세요.',
      };
    }

    // Mark challenge as used (T08-C19, T08-C31)
    challengeRecord.used = true;

    const user = this.getOrCreateUser(username);

    // Prevent duplicate credential ID
    if (user.credentials.some((c) => c.id === credentialId)) {
      return {
        success: false,
        statusCode: 400,
        error: '이미 등록된 패스키 ID입니다.',
      };
    }

    const newCredential: PasskeyCredential = {
      id: credentialId,
      name: passkeyName || `패스키 기기 #${user.credentials.length + 1}`,
      publicKeyJwk,
      publicKeyPem: jwkToPem(publicKeyJwk),
      algorithm: 'ES256',
      createdAt: new Date().toISOString(),
      counter: 1,
    };

    user.credentials.push(newCredential);

    const audit = this.logAudit({
      action: 'REGISTER_VERIFY',
      status: 'SUCCESS',
      statusCode: 200,
      username,
      details: `새 패스키 등록 완료 (이름: ${newCredential.name}, 공개키 저장됨 / 개인키는 기기 내 보관)`,
      requestPayload: JSON.stringify({ username, passkeyName, credentialId, publicKeyType: 'ECDSA_P256' }),
      responsePayload: JSON.stringify({ success: true, credentialId, totalKeys: user.credentials.length }),
    });

    return {
      success: true,
      statusCode: 200,
      message: '새로운 패스키가 성공적으로 등록되었습니다.',
      auditId: audit.id,
      data: {
        credentialId: newCredential.id,
        name: newCredential.name,
        createdAt: newCredential.createdAt,
      },
    };
  }

  // --- Login Flow (T08-C27 ~ T08-C35) ---
  public createLoginChallenge(
    username: string,
  ): ApiResponse<{ challenge: string; allowCredentials: { id: string; type: string }[] }> {
    const user = this.getUser(username);
    if (!user || user.credentials.length === 0) {
      this.logAudit({
        action: 'LOGIN_CHALLENGE',
        status: 'REJECTED_401',
        statusCode: 401,
        username,
        details: '등록된 패스키가 없는 계정입니다.',
        requestPayload: JSON.stringify({ username }),
      });
      return {
        success: false,
        statusCode: 401,
        error: '해당 계정에 등록된 패스키가 없습니다. 먼저 패스키를 등록해 주세요.',
      };
    }

    const challenge = generateRandomChallenge();
    this.challenges.set(challenge, {
      challenge,
      userId: user.id,
      type: 'login',
      createdAt: Date.now(),
      used: false,
    });

    const audit = this.logAudit({
      action: 'LOGIN_CHALLENGE',
      status: 'SUCCESS',
      statusCode: 200,
      username,
      details: `로그인용 1회용 챌린지 생성 완료 (Unique Challenge: ${challenge.substring(0, 12)}...)`,
      requestPayload: JSON.stringify({ username }),
      responsePayload: JSON.stringify({ challenge, allowCredentialsCount: user.credentials.length }),
    });

    return {
      success: true,
      statusCode: 200,
      message: '로그인 챌린지가 생성되었습니다.',
      auditId: audit.id,
      data: {
        challenge,
        allowCredentials: user.credentials.map((c) => ({
          id: c.id,
          type: 'public-key',
        })),
      },
    };
  }

  public async verifyLogin(payload: {
    username: string;
    challenge: string;
    credentialId: string;
    clientDataJsonBase64: string;
    authenticatorDataBase64: string;
    signatureBase64: string;
  }): Promise<ApiResponse<{ token: string; user: { id: string; username: string; displayName: string } }>> {
    const { username, challenge, credentialId, clientDataJsonBase64, authenticatorDataBase64, signatureBase64 } =
      payload;

    // Check challenge
    const challengeRecord = this.challenges.get(challenge);
    if (!challengeRecord || challengeRecord.type !== 'login') {
      this.logAudit({
        action: 'LOGIN_VERIFY',
        status: 'REJECTED_401',
        statusCode: 401,
        username,
        details: '존재하지 않거나 만료된 로그인 챌린지입니다.',
        requestPayload: JSON.stringify({ username, challenge, credentialId }),
      });
      return {
        success: false,
        statusCode: 401,
        error: '유효하지 않은 챌린지입니다.',
      };
    }

    // Replay attack check: Reusing already used challenge (T08-C31)
    if (challengeRecord.used) {
      this.logAudit({
        action: 'LOGIN_VERIFY',
        status: 'REJECTED_401',
        statusCode: 401,
        username,
        details: '재사용 공격(Replay Attack) 방어: 이미 사용된 1회용 챌린지 재시도 거절됨',
        requestPayload: JSON.stringify({ username, challenge: `${challenge.substring(0, 8)}...[REPLAY]` }),
      });
      return {
        success: false,
        statusCode: 401,
        error: '이미 사용된 챌린지입니다. 새 챌린지를 요청하세요 (재전송 공격 방어).',
      };
    }

    // Invalidate challenge immediately (one-time use)
    challengeRecord.used = true;

    const user = this.getUser(username);
    if (!user) {
      return { success: false, statusCode: 401, error: '존재하지 않는 사용자입니다.' };
    }

    const credential = user.credentials.find((c) => c.id === credentialId);
    if (!credential) {
      this.logAudit({
        action: 'LOGIN_VERIFY',
        status: 'REJECTED_401',
        statusCode: 401,
        username,
        details: '삭제되었거나 등록되지 않은 패스키 ID로 로그인 시도됨 (거절 401)',
        requestPayload: JSON.stringify({ username, credentialId }),
      });
      return {
        success: false,
        statusCode: 401,
        error: '등록되지 않았거나 삭제된 패스키입니다.',
      };
    }

    // Signature verification (T08-C29, T08-C30)
    const isSignatureValid = await verifyEs256Signature(
      credential.publicKeyJwk,
      signatureBase64,
      clientDataJsonBase64,
      authenticatorDataBase64,
    );

    if (!isSignatureValid) {
      this.logAudit({
        action: 'LOGIN_VERIFY',
        status: 'REJECTED_401',
        statusCode: 401,
        username,
        details: '디지털 서명 검증 실패: 저장된 공개키와 서명이 일치하지 않음',
        requestPayload: JSON.stringify({ username, credentialId }),
      });
      return {
        success: false,
        statusCode: 401,
        error: '패스키 서명 검증에 실패했습니다.',
      };
    }

    // Update credential stats
    credential.lastUsedAt = new Date().toISOString();
    credential.counter += 1;

    // Issue signed session token (T08-C32)
    const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const exp = Math.floor(Date.now() / 1000) + 3600; // 1 hour
    const token = await createSessionToken({
      userId: user.id,
      username: user.username,
      sessionId,
      exp,
    });

    this.activeSessions.add(sessionId);

    const audit = this.logAudit({
      action: 'LOGIN_VERIFY',
      status: 'SUCCESS',
      statusCode: 200,
      username,
      details: `패스키 서명 검증 성공 -> 세션 토큰 발급 (${maskToken(token)})`,
      requestPayload: JSON.stringify({ username, credentialName: credential.name }),
      responsePayload: JSON.stringify({ token: maskToken(token), exp }),
    });

    return {
      success: true,
      statusCode: 200,
      message: '패스키 인증에 성공하였습니다.',
      auditId: audit.id,
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          displayName: user.displayName,
        },
      },
    };
  }

  // --- Private Data Access (T08-C16, T08-C17, T08-C36 ~ T08-C41) ---
  public async getPrivateData(
    token?: string,
    targetUsernameQuery?: string,
  ): Promise<ApiResponse<{ items: PrivateItem[]; username: string; userDisplayName: string }>> {
    // 1. Missing or invalid token check (T08-C16, T08-C17) -> 401
    if (!token) {
      this.logAudit({
        action: 'GET_DATA',
        status: 'REJECTED_401',
        statusCode: 401,
        username: targetUsernameQuery || 'anonymous',
        details: '비인가 접근 차단: 인증 토큰(패스키 세션) 없이 비공개 데이터 직접 요청됨 (거절 401)',
        requestPayload: JSON.stringify({ token: null, targetUsername: targetUsernameQuery }),
      });
      return {
        success: false,
        statusCode: 401,
        error: '인증되지 않았습니다. 패스키로 먼저 로그인해 주세요 (HTTP 401 Unauthorized).',
      };
    }

    // Check revoked/blacklisted token (T08-C33)
    if (this.revokedTokens.has(token)) {
      this.logAudit({
        action: 'GET_DATA',
        status: 'REJECTED_401',
        statusCode: 401,
        username: 'revoked_token',
        details: '로그아웃된 무효화 세션 토큰으로 재접근 시도됨 (거절 401)',
        requestPayload: JSON.stringify({ token: maskToken(token) }),
      });
      return {
        success: false,
        statusCode: 401,
        error: '로그아웃된 세션입니다. 다시 로그인해 주세요.',
      };
    }

    const { valid, payload } = await verifySessionToken(token);
    if (!valid || !payload) {
      this.logAudit({
        action: 'GET_DATA',
        status: 'REJECTED_401',
        statusCode: 401,
        username: 'invalid_token',
        details: '변조되었거나 만료된 세션 토큰 (거절 401)',
        requestPayload: JSON.stringify({ token: maskToken(token) }),
      });
      return {
        success: false,
        statusCode: 401,
        error: '유효하지 않거나 만료된 세션 토큰입니다.',
      };
    }

    // 2. Cross-Account Isolation Check (T08-C37, T08-C38, T08-C40) -> 403 Forbidden
    const authenticatedUsername = payload.username;
    if (targetUsernameQuery && targetUsernameQuery !== authenticatedUsername) {
      this.logAudit({
        action: 'GET_DATA',
        status: 'REJECTED_403',
        statusCode: 403,
        username: authenticatedUsername,
        details: `인가 실패 (IDOR 차단): '${authenticatedUsername}' 세션으로 타인('${targetUsernameQuery}')의 비공개 데이터 조회 시도 (거절 403 Forbidden)`,
        requestPayload: JSON.stringify({
          caller: authenticatedUsername,
          target: targetUsernameQuery,
          token: maskToken(token),
        }),
      });
      return {
        success: false,
        statusCode: 403,
        error: `타 계정('${targetUsernameQuery}')의 비공개 자료에 접근할 권한이 없습니다 (HTTP 403 Forbidden).`,
      };
    }

    // 3. Return caller's own private items only
    const items = this.privateData.get(authenticatedUsername) || [];
    const user = this.getUser(authenticatedUsername);

    const audit = this.logAudit({
      action: 'GET_DATA',
      status: 'SUCCESS',
      statusCode: 200,
      username: authenticatedUsername,
      details: `비공개 데이터 정상 조회 (건수: ${items.length}건, 소유자: ${authenticatedUsername})`,
      requestPayload: JSON.stringify({ caller: authenticatedUsername, token: maskToken(token) }),
      responsePayload: JSON.stringify({ count: items.length, sample: items[0]?.title }),
    });

    return {
      success: true,
      statusCode: 200,
      message: '비공개 데이터를 성공적으로 조회했습니다.',
      auditId: audit.id,
      data: {
        items,
        username: authenticatedUsername,
        userDisplayName: user?.displayName || authenticatedUsername,
      },
    };
  }

  // --- Passkey Listing & Deletion (T08-C42 ~ T08-C46) ---
  public async listPasskeys(token: string): Promise<ApiResponse<PasskeyCredential[]>> {
    const { valid, payload } = await verifySessionToken(token);
    if (!valid || !payload) {
      return { success: false, statusCode: 401, error: '유효하지 않은 세션입니다.' };
    }

    const user = this.getUser(payload.username);
    if (!user) {
      return { success: false, statusCode: 404, error: '사용자를 찾을 수 없습니다.' };
    }

    return {
      success: true,
      statusCode: 200,
      data: user.credentials,
    };
  }

  public async deletePasskey(
    token: string,
    credentialId: string,
  ): Promise<ApiResponse<{ remainingKeysCount: number }>> {
    const { valid, payload } = await verifySessionToken(token);
    if (!valid || !payload) {
      return { success: false, statusCode: 401, error: '유효하지 않은 세션입니다.' };
    }

    const user = this.getUser(payload.username);
    if (!user) {
      return { success: false, statusCode: 404, error: '사용자를 찾을 수 없습니다.' };
    }

    const initialCount = user.credentials.length;
    user.credentials = user.credentials.filter((c) => c.id !== credentialId);
    const remainingCount = user.credentials.length;

    const audit = this.logAudit({
      action: 'DELETE_KEY',
      status: 'SUCCESS',
      statusCode: 200,
      username: user.username,
      details: `패스키 삭제 완료 (삭제 ID: ${credentialId}, 이전 ${initialCount}개 -> 남은 패스키: ${remainingCount}개)`,
      requestPayload: JSON.stringify({ credentialId, token: maskToken(token) }),
      responsePayload: JSON.stringify({ initialCount, remainingCount }),
    });

    return {
      success: true,
      statusCode: 200,
      message:
        remainingCount === 0
          ? '패스키가 삭제되었습니다. 남은 패스키가 없어 새 패스키 등록 전까지 패스키 로그인이 잠깁니다.'
          : '패스키가 삭제되었습니다. 남은 패스키로 계속 로그인할 수 있습니다.',
      auditId: audit.id,
      data: { remainingKeysCount: remainingCount },
    };
  }

  // --- Logout (T08-C33) ---
  public async logout(token?: string): Promise<ApiResponse<null>> {
    if (token) {
      this.revokedTokens.add(token);
      const { payload } = await verifySessionToken(token);
      if (payload) {
        this.activeSessions.delete(payload.sessionId);
      }
      this.logAudit({
        action: 'LOGOUT',
        status: 'SUCCESS',
        statusCode: 200,
        username: payload?.username || 'user',
        details: `로그아웃 완료: 세션 토큰 무효화 블랙리스트 등록 (${maskToken(token)})`,
        requestPayload: JSON.stringify({ token: maskToken(token) }),
      });
    }

    return {
      success: true,
      statusCode: 200,
      message: '성공적으로 로그아웃되었습니다.',
      data: null,
    };
  }

  // Helper to count private items for T08-C39 verification
  public getItemCount(username: string): number {
    return this.privateData.get(username)?.length || 0;
  }
}

// Singleton Server Database Instance
export const passkeyServer = new PasskeyServerDatabase();
