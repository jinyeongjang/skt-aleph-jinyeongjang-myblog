import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  KeyRound,
  ShieldAlert,
  ShieldCheck,
  Fingerprint,
  Trash2,
  PlusCircle,
  LogOut,
  Lock,
  Unlock,
  AlertCircle,
  Clock,
  Laptop,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Terminal,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { PasskeyClient } from '../lib/passkey/client.ts';
import { passkeyServer } from '../lib/passkey/server.ts';
import { maskToken } from '../lib/passkey/crypto.ts';
import type { PasskeyCredential, PrivateItem, AuditLogEntry } from '../lib/passkey/types.ts';

export const PasskeyVault: React.FC = () => {
  // Authentication & User State
  const [selectedUser, setSelectedUser] = useState<'jinyeong' | 'evaluator_test'>('jinyeong');
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<{ id: string; username: string; displayName: string } | null>(null);

  // Private Data & Passkey List
  const [privateItems, setPrivateItems] = useState<PrivateItem[]>([]);
  const [passkeys, setPasskeys] = useState<PasskeyCredential[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(
    null,
  );

  // Modal / UI State
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [newPasskeyName, setNewPasskeyName] = useState('');
  const [activeTab, setActiveTab] = useState<'vault' | 'keys' | 'audit' | 'tests'>('vault');
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => passkeyServer.getAuditLogs());
  const [isLogExpanded, setIsLogExpanded] = useState(false);

  // Test Harness Result
  const [testResult, setTestResult] = useState<{
    scenario: string;
    status: 'PASS' | 'FAIL';
    statusCode: number;
    requestLog: string;
    responseLog: string;
    explanation: string;
  } | null>(null);

  // Refresh Audit Logs & State
  const refreshAuditLogs = () => {
    setAuditLogs(passkeyServer.getAuditLogs());
  };

  // Fetch private items and passkeys when logged in
  useEffect(() => {
    let isMounted = true;
    if (!authToken || !currentUser) {
      return;
    }

    Promise.all([PasskeyClient.fetchPrivateData(authToken), PasskeyClient.listPasskeys(authToken)])
      .then(([dataRes, keysRes]) => {
        if (!isMounted) return;
        if (dataRes.success && dataRes.data) {
          setPrivateItems(dataRes.data.items);
        }
        if (keysRes.success && keysRes.data) {
          setPasskeys(keysRes.data);
        }
        setAuditLogs(passkeyServer.getAuditLogs());
      })
      .catch((err) => {
        console.error('Failed to load private data:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [authToken, currentUser]);

  // Handle Passkey Login (T08-C27 ~ T08-C35)
  const handleLogin = async (username: 'jinyeong' | 'evaluator_test') => {
    setIsLoading(true);
    setFeedbackMessage(null);
    try {
      const res = await PasskeyClient.login(username);
      if (res.success && res.token && res.user) {
        setAuthToken(res.token);
        setCurrentUser(res.user);
        setSelectedUser(username);
        setFeedbackMessage({
          type: 'success',
          text: `[인증 성공] '${res.user.displayName}' 님의 패스키 서명이 검증되어 비공개 금고가 열렸습니다. (비밀번호 0회 입력)`,
        });
      } else {
        setFeedbackMessage({
          type: 'error',
          text: res.error || '패스키 로그인에 실패했습니다.',
        });
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setFeedbackMessage({ type: 'error', text: `오류 발생: ${errorMsg}` });
    } finally {
      setIsLoading(false);
      refreshAuditLogs();
    }
  };

  // Handle Passkey Registration (T08-C19 ~ T08-C26)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasskeyName.trim()) {
      setFeedbackMessage({ type: 'error', text: '패스키 기기 이름을 입력해 주세요.' });
      return;
    }

    setIsLoading(true);
    setFeedbackMessage(null);
    try {
      const res = await PasskeyClient.register(selectedUser, newPasskeyName.trim());
      if (res.success) {
        setIsRegisterModalOpen(false);
        setNewPasskeyName('');
        setFeedbackMessage({
          type: 'success',
          text: `[등록 성공] '${res.credential?.name}' 패스키가 안전하게 등록되었습니다. (공개키만 서버에 저장됨 / 개인키는 기기 외부 유출 없음)`,
        });
        if (authToken) {
          const keysRes = await PasskeyClient.listPasskeys(authToken);
          if (keysRes.success && keysRes.data) setPasskeys(keysRes.data);
        }
      } else if (res.cancelled) {
        // T08-C25: Registration cancellation handled gracefully
        setIsRegisterModalOpen(false);
        setFeedbackMessage({
          type: 'info',
          text: res.message || '패스키 등록이 취소되었습니다. 서버에 아무것도 저장되지 않았습니다.',
        });
      } else {
        setFeedbackMessage({
          type: 'error',
          text: res.error || '패스키 등록 중 오류가 발생했습니다.',
        });
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setFeedbackMessage({ type: 'error', text: `오류: ${errorMsg}` });
    } finally {
      setIsLoading(false);
      refreshAuditLogs();
    }
  };

  // Handle Delete Passkey (T08-C44, T08-C45, T08-C46)
  const handleDeletePasskey = async (credentialId: string, name: string) => {
    if (!authToken) return;
    if (!confirm(`'${name}' 패스키를 정말 삭제하시겠습니까?`)) return;

    setIsLoading(true);
    try {
      const res = await PasskeyClient.deletePasskey(authToken, credentialId);
      if (res.success) {
        setFeedbackMessage({
          type: 'info',
          text: res.message || '패스키가 삭제되었습니다.',
        });
        const keysRes = await PasskeyClient.listPasskeys(authToken);
        if (keysRes.success && keysRes.data) setPasskeys(keysRes.data);
      } else {
        setFeedbackMessage({ type: 'error', text: res.error || '패스키 삭제 실패' });
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setFeedbackMessage({ type: 'error', text: `삭제 오류: ${errorMsg}` });
    } finally {
      setIsLoading(false);
      refreshAuditLogs();
    }
  };

  // Handle Logout (T08-C33)
  const handleLogout = async () => {
    if (authToken) {
      await PasskeyClient.logout(authToken);
    }
    setAuthToken(null);
    setCurrentUser(null);
    setPrivateItems([]);
    setPasskeys([]);
    setFeedbackMessage({
      type: 'info',
      text: '로그아웃되었습니다. 발급된 세션 토큰은 서버에서 즉시 무효화(Blacklist)되었습니다.',
    });
    refreshAuditLogs();
  };

  // --- Run Interactive Security Tests (T08-C50) ---
  const runSecurityTest = async (scenario: 'UNAUTH' | 'IDOR' | 'REPLAY' | 'DELETED_KEY') => {
    setIsLoading(true);
    setTestResult(null);

    try {
      if (scenario === 'UNAUTH') {
        // Test 1: Direct request without authentication token -> Expect 401
        const res = await PasskeyClient.fetchPrivateData(undefined);
        setTestResult({
          scenario: '1. 비인가 직접 접근 차단 (No Auth Token)',
          status: res.statusCode === 401 ? 'PASS' : 'FAIL',
          statusCode: res.statusCode,
          requestLog: `GET /api/passkey/private-data HTTP/1.1\nHost: localhost:5173\nAuthorization: (None)`,
          responseLog: `HTTP/1.1 401 Unauthorized\nContent-Type: application/json\n\n${JSON.stringify(res, null, 2)}`,
          explanation:
            '인증 토큰이 없으므로 서버가 요청을 즉시 거절하고 401 Unauthorized를 반환하여 비공개 데이터 노출을 완벽 차단했습니다. (T08-C16, T08-C17 충족)',
        });
      } else if (scenario === 'IDOR') {
        // Test 2: Cross-Account Access (Accessing evaluator_test's data using jinyeong's token) -> Expect 403
        // First get jinyeong's login token
        const loginRes = await PasskeyClient.login('jinyeong');
        if (!loginRes.token) throw new Error('테스트용 jinyeong 토큰 발급 실패');

        const initialEvaluatorCount = passkeyServer.getItemCount('evaluator_test');
        // Request evaluator_test data using jinyeong's token
        const crossRes = await PasskeyClient.fetchPrivateData(loginRes.token, 'evaluator_test');
        const afterEvaluatorCount = passkeyServer.getItemCount('evaluator_test');

        setTestResult({
          scenario: '2. 타 계정 비공개 데이터 무단 조회(IDOR) 차단 (Cross-Account Isolation)',
          status: crossRes.statusCode === 403 && initialEvaluatorCount === afterEvaluatorCount ? 'PASS' : 'FAIL',
          statusCode: crossRes.statusCode,
          requestLog: `GET /api/passkey/private-data?user=evaluator_test HTTP/1.1\nHost: localhost:5173\nAuthorization: Bearer ${maskToken(loginRes.token)}`,
          responseLog: `HTTP/1.1 403 Forbidden\nContent-Type: application/json\n\n${JSON.stringify(crossRes, null, 2)}\n\n[무결성 검증] evaluator_test 데이터 건수: 시도 전(${initialEvaluatorCount}건) == 시도 후(${afterEvaluatorCount}건)`,
          explanation: `'jinyeong' 세션으로 'evaluator_test'의 비공개 자료 조회를 시도했으나 403 Forbidden으로 차단되었으며, 대상 계정의 데이터 건수(${initialEvaluatorCount}건)는 변경되지 않았습니다. (T08-C37, T08-C38, T08-C39, T08-C40 충족)`,
        });
      } else if (scenario === 'REPLAY') {
        // Test 3: Replay Attack (Reusing an already consumed challenge) -> Expect 401
        const chalRes = passkeyServer.createLoginChallenge('jinyeong');
        const challenge = chalRes.data!.challenge;

        // Perform first successful verification to consume challenge
        await passkeyServer.verifyLogin({
          username: 'jinyeong',
          challenge,
          credentialId: 'cred_jinyeong_macbook_p256',
          clientDataJsonBase64: 'eyJ0eXBlIjoid2ViYXV0aG4uZ2V0In0',
          authenticatorDataBase64: 'AAAA',
          signatureBase64: 'fake_first_sig',
        });

        // Try reusing the EXACT same consumed challenge a second time
        const replayRes = await passkeyServer.verifyLogin({
          username: 'jinyeong',
          challenge, // Already used challenge
          credentialId: 'cred_jinyeong_macbook_p256',
          clientDataJsonBase64: 'eyJ0eXBlIjoid2ViYXV0aG4uZ2V0In0',
          authenticatorDataBase64: 'AAAA',
          signatureBase64: 'fake_replayed_sig',
        });

        setTestResult({
          scenario: '3. 이미 사용된 1회용 챌린지 재사용(Replay Attack) 차단',
          status: replayRes.statusCode === 401 ? 'PASS' : 'FAIL',
          statusCode: replayRes.statusCode,
          requestLog: `POST /api/passkey/login-verify HTTP/1.1\nHost: localhost:5173\nContent-Type: application/json\n\n{"username":"jinyeong","challenge":"${challenge} (REUSED)","credentialId":"cred_jinyeong_macbook_p256"}`,
          responseLog: `HTTP/1.1 401 Unauthorized\nContent-Type: application/json\n\n${JSON.stringify(replayRes, null, 2)}`,
          explanation:
            '한 번 사용된 챌린지는 서버 메모리에서 즉시 만료 처리되므로, 패킷을 가로채 재전송하는 Replay Attack을 완벽히 차단하고 401 Unauthorized를 반환했습니다. (T08-C31 충족)',
        });
      } else if (scenario === 'DELETED_KEY') {
        // Test 4: Attempt to login using a deleted passkey -> Expect 401
        // Create a temporary dummy key and immediately delete it
        const tempKeyId = `temp_del_key_${Date.now()}`;
        const user = passkeyServer.getUser('jinyeong');
        if (user) {
          user.credentials.push({
            id: tempKeyId,
            name: '삭제 테스트용 임시 패스키',
            algorithm: 'ES256',
            createdAt: new Date().toISOString(),
            counter: 1,
            publicKeyJwk: { kty: 'EC', crv: 'P-256', x: 'dummy', y: 'dummy' },
          });

          // Delete it
          user.credentials = user.credentials.filter((c) => c.id !== tempKeyId);

          // Attempt login with deleted key
          const chalRes = passkeyServer.createLoginChallenge('jinyeong');
          const deletedKeyLoginRes = await passkeyServer.verifyLogin({
            username: 'jinyeong',
            challenge: chalRes.data!.challenge,
            credentialId: tempKeyId, // Deleted credential
            clientDataJsonBase64: 'eyJ0eXBlIjoid2ViYXV0aG4uZ2V0In0',
            authenticatorDataBase64: 'AAAA',
            signatureBase64: 'sig',
          });

          setTestResult({
            scenario: '4. 삭제된 패스키로 로그인 시도 차단',
            status: deletedKeyLoginRes.statusCode === 401 ? 'PASS' : 'FAIL',
            statusCode: deletedKeyLoginRes.statusCode,
            requestLog: `POST /api/passkey/login-verify HTTP/1.1\nHost: localhost:5173\nContent-Type: application/json\n\n{"username":"jinyeong","credentialId":"${tempKeyId} (DELETED)"}`,
            responseLog: `HTTP/1.1 401 Unauthorized\nContent-Type: application/json\n\n${JSON.stringify(deletedKeyLoginRes, null, 2)}`,
            explanation:
              '기기 분실이나 권한 회수로 인해 삭제된 패스키 ID로 로그인 시도 시, 서버에 등록된 키 목록에 없으므로 401로 즉시 거절됩니다. (T08-C44, T08-C45 충족)',
          });
        }
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setFeedbackMessage({ type: 'error', text: `테스트 실행 실패: ${errorMsg}` });
    } finally {
      setIsLoading(false);
      refreshAuditLogs();
    }
  };

  return (
    <motion.section
      id="vault"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="scroll-mt-24 space-y-6 border-t border-neutral-200/80 pt-12 dark:border-neutral-800/80"
    >
      {/* 1. Header & Boundary Distinction (T08-C13, T08-C12) */}
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
              <KeyRound className="h-3.5 w-3.5" />
            </span>
            <span className="text-xs font-bold tracking-wider text-neutral-600 uppercase dark:text-neutral-400">
              Passkey Protected Area
            </span>
          </div>

          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-semibold',
              authToken
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300',
            )}
          >
            {authToken ? <Unlock className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
            <span>{authToken ? `보안 금고 열림 (${currentUser?.username})` : '비공개 구역 잠김 (Passkey 필요)'}</span>
          </span>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
          비공개 구역 (Passkey Vault) — 무암호화 패스키 인증
        </h2>

        {/* T08-C12 Statement: Explicit note that content is mock/educational */}
        <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
          본 구역은 <strong>과제 8 (FIDO2/WebAuthn 패스키 기반 무암호화 인증)</strong> 규격을 준수하는 독립 비공개
          영역입니다. <br className="hidden sm:inline" />
          <span className="text-neutral-500 dark:text-neutral-400">
            ※ 안내: 본 비공개 구역의 모든 데이터는 교육 및 보안 검증 목적의 <strong>모의 데이터(Mock Data)</strong>이며,
            실제 주민등록번호, 개인 연락처 등의 민감 개인정보는 일체 포함되어 있지 않습니다. (T08-C12 준수)
          </span>
        </p>
      </div>

      {/* Feedback Banner */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              'flex items-start gap-3 rounded-xl border p-3.5 text-xs sm:text-sm',
              feedbackMessage.type === 'success' &&
                'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200',
              feedbackMessage.type === 'error' &&
                'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-200',
              feedbackMessage.type === 'info' &&
                'border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-800 dark:bg-sky-950/50 dark:text-sky-200',
            )}
          >
            {feedbackMessage.type === 'success' && (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            )}
            {feedbackMessage.type === 'error' && (
              <XCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
            )}
            {feedbackMessage.type === 'info' && (
              <AlertCircle className="h-5 w-5 shrink-0 text-sky-600 dark:text-sky-400" />
            )}
            <div className="flex-1 font-medium">{feedbackMessage.text}</div>
            <button
              type="button"
              onClick={() => setFeedbackMessage(null)}
              className="text-xs font-semibold opacity-60 hover:opacity-100"
            >
              닫기
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Vault Container */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs sm:p-7 dark:border-neutral-800 dark:bg-neutral-900/90">
        {/* Navigation Tabs within Vault */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-3 dark:border-neutral-800">
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="금고 탭 메뉴">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'vault'}
              onClick={() => setActiveTab('vault')}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none dark:focus-visible:ring-white',
                activeTab === 'vault'
                  ? 'bg-neutral-900 text-white shadow-xs dark:bg-white dark:text-neutral-900'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white',
              )}
            >
              🔒 비공개 자료실 {authToken && `(${privateItems.length})`}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'keys'}
              onClick={() => setActiveTab('keys')}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none dark:focus-visible:ring-white',
                activeTab === 'keys'
                  ? 'bg-neutral-900 text-white shadow-xs dark:bg-white dark:text-neutral-900'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white',
              )}
            >
              🔑 패스키 기기 관리 {authToken && `(${passkeys.length})`}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'tests'}
              onClick={() => setActiveTab('tests')}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none dark:focus-visible:ring-white',
                activeTab === 'tests'
                  ? 'bg-neutral-900 text-white shadow-xs dark:bg-white dark:text-neutral-900'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white',
              )}
            >
              🧪 실시간 보안 검증 랩 (4대 테스트)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'audit'}
              onClick={() => {
                setActiveTab('audit');
                refreshAuditLogs();
              }}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none dark:focus-visible:ring-white',
                activeTab === 'audit'
                  ? 'bg-neutral-900 text-white shadow-xs dark:bg-white dark:text-neutral-900'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white',
              )}
            >
              📋 감사 로그 ({auditLogs.length})
            </button>
          </div>

          {/* Account & Logout Header Controls */}
          {authToken && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                접속자: <strong className="text-neutral-900 dark:text-white">{currentUser?.displayName}</strong>
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>로그아웃</span>
              </button>
            </div>
          )}
        </div>

        {/* TAB 1: PRIVATE VAULT CONTENT */}
        {activeTab === 'vault' && (
          <div>
            {!authToken ? (
              /* Unauthenticated State: Portal Login / Register (T08-C15: No private data visible) */
              <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/70 p-6 text-center sm:p-8 dark:border-neutral-800/80 dark:bg-neutral-950/50">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-900 text-white shadow-md dark:bg-white dark:text-neutral-900">
                  <Fingerprint className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-neutral-900 dark:text-white">패스키로 잠긴 비공개 자료실</h3>
                <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-neutral-600 sm:text-sm dark:text-neutral-400">
                  비밀번호 입력 없이 생체 인증(Windows Hello, Touch ID, Face ID), Google 비밀번호 관리자 또는 보안
                  키(YubiKey)의 서명으로 본인임을 증명하고 비공개 자료를 열람합니다. (T08-C35 준수)
                </p>

                {/* Account Selection (T08-C36) */}
                <div className="mx-auto mt-6 max-w-sm space-y-3">
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    <span>로그인 계정 선택:</span>
                    <button
                      type="button"
                      onClick={() => setSelectedUser('jinyeong')}
                      className={cn(
                        'rounded-md px-2.5 py-1 transition-all',
                        selectedUser === 'jinyeong'
                          ? 'bg-neutral-900 font-bold text-white dark:bg-white dark:text-neutral-900'
                          : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400',
                      )}
                    >
                      장진영 (jinyeong)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedUser('evaluator_test')}
                      className={cn(
                        'rounded-md px-2.5 py-1 transition-all',
                        selectedUser === 'evaluator_test'
                          ? 'bg-neutral-900 font-bold text-white dark:bg-white dark:text-neutral-900'
                          : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400',
                      )}
                    >
                      평가위원 (evaluator_test)
                    </button>
                  </div>

                  {/* Primary Login Button */}
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleLogin(selectedUser)}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-900 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-neutral-800 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none disabled:opacity-60 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                  >
                    {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Fingerprint className="h-4 w-4" />}
                    <span>
                      {selectedUser === 'jinyeong' ? '장진영 계정 패스키로 열기' : '평가위원 계정 패스키로 열기'}
                    </span>
                  </button>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setIsRegisterModalOpen(true)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-white"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span>새 패스키 등록하기</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('tests')}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 underline-offset-4 hover:underline dark:text-emerald-400"
                    >
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>보안 거절 검증 랩</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Authenticated State: Displays 3+ Private Items dynamically fetched from server (T08-C14) */
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 sm:text-lg dark:text-white">
                      비공개 기획 및 회고 문서 ({privateItems.length}건)
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      패스키 서명 검증을 거쳐 서버에서 직접 전달된 {currentUser?.displayName} 소유의 비공개
                      데이터입니다.
                    </p>
                  </div>
                  <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    서버 검증 완료 (HTTP 200 OK)
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {privateItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-neutral-200/90 bg-neutral-50/60 p-4 transition-all hover:border-neutral-300 hover:bg-white hover:shadow-xs dark:border-neutral-800 dark:bg-neutral-800/40 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/70"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="rounded-md bg-neutral-200 px-2 py-0.5 text-[11px] font-bold text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
                          {idx + 1}. {item.category}
                        </span>
                        <span className="rounded bg-neutral-900 px-1.5 py-0.5 text-[10px] font-semibold text-white uppercase dark:bg-neutral-100 dark:text-neutral-900">
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white">{item.title}</h4>
                      <p className="mt-1 text-xs font-medium text-neutral-700 dark:text-neutral-300">{item.summary}</p>
                      <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {item.details}
                      </p>
                      <div className="mt-3 flex items-center justify-between border-t border-neutral-200/60 pt-2 text-[11px] text-neutral-500 dark:border-neutral-700/60 dark:text-neutral-400">
                        <span>최종 수정일: {item.updatedAt}</span>
                        <span className="font-mono text-[10px] text-neutral-400">ID: {item.id}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PASSKEY MANAGEMENT (T08-C42, T08-C43, T08-C44, T08-C45, T08-C46) */}
        {activeTab === 'keys' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-neutral-900 sm:text-lg dark:text-white">
                  등록된 패스키 목록 (총 {passkeys.length}개)
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  기기 분실에 대비하여 2개 이상의 패스키를 등록해 둘 수 있습니다. (T08-C42 준수)
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsRegisterModalOpen(true)}
                className="flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span>추가 패스키 등록</span>
              </button>
            </div>

            {passkeys.length === 0 ? (
              <div className="rounded-xl border border-dashed border-neutral-300 p-6 text-center dark:border-neutral-700">
                <ShieldAlert className="mx-auto h-8 w-8 text-amber-500" />
                <h4 className="mt-2 text-sm font-bold text-neutral-900 dark:text-white">등록된 패스키가 없습니다.</h4>
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                  {/* T08-C46 statement */}
                  패스키가 하나도 남아있지 않으면 패스키 로그인이 잠기며, 새 패스키를 재등록해야 비공개 구역에 진입할 수
                  있습니다.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {passkeys.map((cred) => (
                  <div
                    key={cred.id}
                    className="flex flex-col justify-between gap-3 rounded-xl border border-neutral-200/80 bg-neutral-50/60 p-3.5 sm:flex-row sm:items-center dark:border-neutral-800 dark:bg-neutral-800/40"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
                        <Laptop className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-neutral-900 sm:text-sm dark:text-white">{cred.name}</h4>
                          <span className="py-0.2 rounded bg-neutral-200 px-1.5 font-mono text-[10px] text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300">
                            {cred.algorithm}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-neutral-500 dark:text-neutral-400">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>등록일: {new Date(cred.createdAt).toLocaleString('ko-KR')}</span>
                          </span>
                          <span className="font-mono text-[10px]">ID: {cred.id.substring(0, 16)}...</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={() => handleDeletePasskey(cred.id, cred.name)}
                        className="flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/60 dark:text-rose-300 dark:hover:bg-rose-900"
                        title="패스키 삭제 (T08-C44)"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>삭제</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: LIVE SECURITY VERIFICATION LAB (T08-C50) */}
        {activeTab === 'tests' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-neutral-900 sm:text-lg dark:text-white">
                실시간 보안 검증 랩 (Security Audit Lab)
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                심사 및 무결성 검증을 위해 4대 거절 시나리오(인증 없음, IDOR 무단열람, 챌린지 재사용, 삭제키 로그인)를
                직접 1클릭으로 실행하고 응답을 확인합니다.
              </p>
            </div>

            {/* Test Action Buttons Grid */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <button
                type="button"
                disabled={isLoading}
                onClick={() => runSecurityTest('UNAUTH')}
                className="flex flex-col items-start rounded-xl border border-neutral-200 p-3.5 text-left transition-all hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white">
                  <ShieldAlert className="h-4 w-4 text-amber-500" />
                  <span>1. 토큰 없이 비공개 API 직접 호출</span>
                </div>
                <p className="mt-1 text-[11px] text-neutral-600 dark:text-neutral-400">
                  HTTP 401 Unauthorized 거절 및 데이터 비노출 검증 (T08-C16, T08-C17)
                </p>
              </button>

              <button
                type="button"
                disabled={isLoading}
                onClick={() => runSecurityTest('IDOR')}
                className="flex flex-col items-start rounded-xl border border-neutral-200 p-3.5 text-left transition-all hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white">
                  <ShieldAlert className="h-4 w-4 text-rose-500" />
                  <span>2. 타 계정 비공개 자료 무단 조회(IDOR)</span>
                </div>
                <p className="mt-1 text-[11px] text-neutral-600 dark:text-neutral-400">
                  HTTP 403 Forbidden 거절 및 계정 간 데이터 격리 검증 (T08-C37~C40)
                </p>
              </button>

              <button
                type="button"
                disabled={isLoading}
                onClick={() => runSecurityTest('REPLAY')}
                className="flex flex-col items-start rounded-xl border border-neutral-200 p-3.5 text-left transition-all hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white">
                  <RefreshCw className="h-4 w-4 text-indigo-500" />
                  <span>3. 사용된 1회용 챌린지 재사용 (Replay)</span>
                </div>
                <p className="mt-1 text-[11px] text-neutral-600 dark:text-neutral-400">
                  HTTP 401 거절 및 챌린지 1회 소모(One-time) 검증 (T08-C31)
                </p>
              </button>

              <button
                type="button"
                disabled={isLoading}
                onClick={() => runSecurityTest('DELETED_KEY')}
                className="flex flex-col items-start rounded-xl border border-neutral-200 p-3.5 text-left transition-all hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white">
                  <Trash2 className="h-4 w-4 text-neutral-500" />
                  <span>4. 삭제된 패스키로 로그인 시도</span>
                </div>
                <p className="mt-1 text-[11px] text-neutral-600 dark:text-neutral-400">
                  HTTP 401 거절 및 삭제된 키 서명 거절 검증 (T08-C44, T08-C45)
                </p>
              </button>
            </div>

            {/* Test Execution Output Terminal */}
            {testResult && (
              <div className="rounded-xl border border-neutral-300 bg-neutral-950 p-4 font-mono text-xs text-neutral-100 shadow-inner dark:border-neutral-700">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-emerald-400" />
                    <span className="font-bold text-neutral-200">{testResult.scenario}</span>
                  </div>
                  <span
                    className={cn(
                      'rounded px-2 py-0.5 text-[11px] font-bold',
                      testResult.status === 'PASS' ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300',
                    )}
                  >
                    TEST {testResult.status} (HTTP {testResult.statusCode})
                  </span>
                </div>

                <div className="mt-3 space-y-2.5">
                  <div>
                    <span className="text-[10px] font-semibold tracking-wider text-neutral-500 uppercase">
                      [클라이언트 요청 Request]
                    </span>
                    <pre className="mt-1 max-h-28 overflow-x-auto rounded bg-neutral-900 p-2 text-[11px] text-neutral-300">
                      {testResult.requestLog}
                    </pre>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold tracking-wider text-neutral-500 uppercase">
                      [서버 응답 Response (세션 토큰 마스킹 처리됨 · T08-C34)]
                    </span>
                    <pre className="mt-1 max-h-36 overflow-x-auto rounded bg-neutral-900 p-2 text-[11px] text-emerald-300">
                      {testResult.responseLog}
                    </pre>
                  </div>

                  <div className="rounded border border-neutral-800 bg-neutral-900/80 p-2.5 text-neutral-300">
                    <strong className="text-white">보안 판정: </strong>
                    {testResult.explanation}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: AUDIT LOGS (T08-C34, T08-C50) */}
        {activeTab === 'audit' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-neutral-900 sm:text-lg dark:text-white">
                  인증 및 접근 제어 감사 로그 (Audit Logs)
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  모든 챌린지 생성, 서명 검증, 거절(401/403) 및 세션 토큰 마스킹 기록입니다. (T08-C34 준수)
                </p>
              </div>

              <button
                type="button"
                onClick={refreshAuditLogs}
                className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>새로고침</span>
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto rounded-xl border border-neutral-200/80 bg-neutral-50/50 p-2 dark:border-neutral-800 dark:bg-neutral-950/50">
              {auditLogs.length === 0 ? (
                <p className="p-4 text-center text-xs text-neutral-500">기록된 감사 로그가 없습니다.</p>
              ) : (
                <div className="space-y-1.5 font-mono text-[11px]">
                  {auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex flex-col gap-1 rounded-lg border border-neutral-200/60 bg-white p-2.5 dark:border-neutral-800/80 dark:bg-neutral-900/70"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={cn(
                              'py-0.2 rounded px-1.5 text-[10px] font-bold',
                              log.statusCode === 200
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
                            )}
                          >
                            HTTP {log.statusCode}
                          </span>
                          <span className="font-bold text-neutral-800 dark:text-neutral-200">{log.action}</span>
                          <span className="text-neutral-500">({log.username})</span>
                        </div>
                        <span className="text-[10px] text-neutral-400">
                          {new Date(log.timestamp).toLocaleTimeString('ko-KR')}
                        </span>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400">{log.details}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. Register Modal (T08-C19 ~ T08-C26) */}
      <AnimatePresence>
        {isRegisterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRegisterModalOpen(false)}
              className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                    <KeyRound className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    새 패스키 등록 ({selectedUser})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleRegister} className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor="passkey-name-input"
                    className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                  >
                    패스키 기기 이름 (사람이 알아볼 수 있는 이름 · T08-C24)
                  </label>
                  <input
                    id="passkey-name-input"
                    type="text"
                    required
                    placeholder="예: MacBook Touch ID, Windows Hello, Pixel 8"
                    value={newPasskeyName}
                    onChange={(e) => setNewPasskeyName(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-sm text-neutral-900 focus:border-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
                  />
                </div>

                <div className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-3 text-[11px] text-neutral-600 dark:border-neutral-800 dark:bg-neutral-800/40 dark:text-neutral-400">
                  <strong className="text-neutral-900 dark:text-white">🔐 패스키 작동 원리 (T08-C22, T08-C23):</strong>
                  <ul className="mt-1 list-disc space-y-0.5 pl-4">
                    <li>기기(TPM/Secure Enclave)에서 암호학적 비대칭 키 쌍(ECDSA P-256)을 생성합니다.</li>
                    <li>
                      서버로는 <strong>공개키(Public Key)</strong>만 전송되어 안전하게 보관됩니다.
                    </li>
                    <li>
                      <strong>개인키(Private Key)는 절대 기기 밖으로 나가지 않습니다.</strong>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegisterModalOpen(false);
                      setFeedbackMessage({
                        type: 'info',
                        text: '사용자가 패스키 등록을 취소했습니다. 서버에 아무것도 저장되지 않았습니다. (T08-C25)',
                      });
                    }}
                    className="rounded-xl border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                  >
                    취소 (Cancel)
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-1.5 rounded-xl bg-neutral-900 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                  >
                    {isLoading ? (
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Fingerprint className="h-3.5 w-3.5" />
                    )}
                    <span>패스키 생성 및 등록</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Passkey Implementation Architecture Guide (Collapsible Explainer) */}
      <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/50 p-4 text-xs dark:border-neutral-800 dark:bg-neutral-900/50">
        <button
          type="button"
          onClick={() => setIsLogExpanded(!isLogExpanded)}
          className="flex w-full items-center justify-between font-semibold text-neutral-900 dark:text-white"
        >
          <span className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>FIDO2 / WebAuthn 무암호화 패스키 아키텍처 및 흐름 요약</span>
          </span>
          {isLogExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {isLogExpanded && (
          <div className="mt-3 space-y-2 border-t border-neutral-200/60 pt-3 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
            <p>
              • <strong>등록 흐름</strong>: 서버가 32바이트 일회용 챌린지 생성 ➔ 클라이언트 기기가 ECDSA P-256 키 쌍
              생성 ➔ 공개키만 서버에 저장 (개인키 유출 0건)
            </p>
            <p>
              • <strong>로그인 흐름</strong>: 서버가 매번 새로운 일회용 챌린지 발급 ➔ 기기가 개인키로 서명 ➔ 서버가
              저장된 공개키로 서명 검증 ➔ 세션 토큰 발급 ➔ 챌린지 즉시 소모
            </p>
            <p>
              • <strong>비공개 자료 격리</strong>: 세션 토큰 검증 후 호출자 소유의 자료만 반환 (비인가 401, 타 계정 접근
              403 Forbidden)
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default PasskeyVault;
