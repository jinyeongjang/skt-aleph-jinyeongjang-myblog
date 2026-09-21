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

    // Seed Private Mock Data (T08-C14: 3+ items, strictly mock/educational, no real PII)
    this.privateData.set('jinyeong', [
      {
        id: 'priv_jy_01',
        category: '프로젝트 기획',
        title: '미공개 차세대 AI 기반 제로 트러스트 엔드포인트 이상 탐지 아키텍처 초안',
        badge: 'CONFIDENTIAL',
        summary: 'eBPF 기반 커널 이벤트 추적 및 로컬 LLM 연동 실시간 악성 행위 격리 시스템 설계서',
        details:
          '네트워크 트래픽 인스펙션 및 시스템 콜(Syscall) 시퀀스를 실시간 분석하여 제로데이 공격 발생 시 50ms 이내에 프로세스 격리 및 방화벽 룰 자동 생성.',
        updatedAt: '2026-09-20',
      },
      {
        id: 'priv_jy_02',
        category: '취업 목표 분석',
        title: '2026 SKT 인프라/보안 엔지니어 직무 역량 분석 및 기술 면접 대비 요약',
        badge: 'CAREER NOTE',
        summary: 'SKT ALEPH 1기 프로젝트 경험과 기업 현장 인프라 요구사항 매핑',
        details:
          'BGP 라우팅 프로토콜 트러블슈팅, Kubernetes 네트워크 CNI 보안 정책 구성, WebAuthn 기반 패스키 무암호화 인증 전환 전략 및 장애 대응 시나리오 정리.',
        updatedAt: '2026-09-19',
      },
      {
        id: 'priv_jy_03',
        category: '취약점 회고',
        title: '상반기 모의해킹 실습 취약점 분석 오답 노트 및 시큐어 코딩 개선 일지',
        badge: 'POST-MORTEM',
        summary: 'OWASP Top 10 기준 취약점 12건에 대한 완화 코드 패치 및 방어 기법 기록',
        details:
          'JWT None 알고리즘 공격 방어, WebAuthn 서명 검증 시 DER/IEEE 변환 오차 해결, IDOR 방어를 위한 유저 세션 소유권 엄격 바인딩 패턴 정립.',
        updatedAt: '2026-09-18',
      },
      {
        id: 'priv_jy_04',
        category: '학습 로드맵',
        title: '정보보안기사 실기 및 eWPTX 취득을 위한 24주차 심화 마일스톤',
        badge: 'MILESTONE',
        summary: '시스템/네트워크 보안 실습 및 실무 웹 애플리케이션 침투 테스트 실기 대비',
        details:
          'Snort 룰셋 작성, Wireshark 패킷 분석 훈련, Burp Suite 플러그인 개발 및 취약점 보고서 작성 표준화 연습 계획.',
        updatedAt: '2026-09-15',
      },
    ]);

    this.privateData.set('evaluator_test', [
      {
        id: 'priv_eval_01',
        category: '평가위원 메모',
        title: 'SKT ALEPH 1기 평가위원 전용 모의 보안 진단 체크리스트',
        badge: 'EVALUATOR ONLY',
        summary: '계정 간 데이터 격리 및 권한 우회(IDOR) 방어 상태 검증을 위한 격리 데이터셋',
        details:
          '본 항목은 evaluator_test 계정 소유의 비공개 데이터이며, jinyeong 계정의 패스키나 토큰으로는 열람할 수 없어야 합니다.',
        updatedAt: '2026-09-20',
      },
      {
        id: 'priv_eval_02',
        category: '모의 시나리오',
        title: '타 계정 비공개 데이터 탈취 시도 모의 공격 시나리오',
        badge: 'TEST SUITE',
        summary: 'HTTP 403 Forbidden 응답 및 비인가 접근 차단 로그 검증',
        details:
          'jinyeong 사용자의 요청 토큰으로 evaluator_test의 private-data 엔드포인트를 호출했을 때 403 에러가 반환되는지 확인.',
        updatedAt: '2026-09-19',
      },
      {
        id: 'priv_eval_03',
        category: '보안 감사',
        title: 'WebAuthn 챌린지 재사용 방지 및 세션 무효화 감사 기록',
        badge: 'AUDIT MOCK',
        summary: '재전송 공격(Replay Attack) 방어 및 로그아웃 후 세션 재사용 차단 기록',
        details: '사용한 챌린지 1회용 소모 및 로그아웃 시 서버 측 블랙리스트 등록 검증 완료.',
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
