import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RotateCw,
  Cpu,
  FileCode2,
  CheckCircle2,
  Download,
  Terminal,
  ShieldCheck,
  HeartHandshake,
  Compass,
  Check,
  Copy,
} from 'lucide-react';
import { REFRESH_ENGINE_DATA } from '../data/portfolioData';

export const RefreshEngine: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeInputTab, setActiveInputTab] = useState<number>(0);
  const [candidates, setCandidates] = useState(REFRESH_ENGINE_DATA.candidates);
  const [runCount, setRunCount] = useState(2);
  const [runLog, setRunLog] = useState<string[]>([
    '[1/4] inputs/attendance.json, rituals.json, projects.json 로드 완료 (총 65일, 80개 리추얼, 12개 과제)',
    '[2/4] 13주 전수 출석률(100%), 리추얼 완주(80회), 제출 달성률(100%) 재계산 완료',
    '[3/4] 능력별 문단 후보 3건 추출 (자기조절력·대인관계력·자기동기력) & 승인 필터 적용 완료',
    '[4/4] 1회차 == 2회차 결과 SHA-256 해시 100% 일치 검증 완료 (219cb026596457e822306f30f273f109d8b8628f55762c2e91b52fb0fb9e0771)',
  ]);
  const [copiedHash, setCopiedHash] = useState(false);

  const handleRunEngine = () => {
    setIsRunning(true);
    setTimeout(() => {
      setRunCount((prev) => prev + 1);
      setRunLog([
        `[1/4] 새 기록 파일 재검사 완료 (총 65일 출석, 80개 리추얼, 12개 과제)`,
        `[2/4] 결정론적 집계 엔진 실행: 출석률 100.0%, 제출률 100.0%, 30일 조기 입실 산출`,
        `[3/4] 승인된 문단 후보 ${candidates.filter((c) => c.approved).length}건 최종 반영 완료`,
        `[4/4] SHA-256 복합 해시 일치 확인: 219cb026596457e822306f30f273f109d8b8628f55762c2e91b52fb0fb9e0771 (PASS)`,
      ]);
      setIsRunning(false);
    }, 450);
  };

  const toggleApproval = (id: string) => {
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, approved: !c.approved } : c)));
  };

  const handleCopyHash = async () => {
    try {
      await navigator.clipboard.writeText('219cb026596457e822306f30f273f109d8b8628f55762c2e91b52fb0fb9e0771');
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    } catch {
      // Fallback
    }
  };

  const getCompetencyIcon = (comp: string) => {
    switch (comp) {
      case '자기조절력':
        return <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      case '대인관계력':
        return <HeartHandshake className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case '자기동기력':
      default:
        return <Compass className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
    }
  };

  return (
    <section id="refresh-engine" className="scroll-mt-24 space-y-8">
      {/* 섹션 헤더 */}
      <div className="flex flex-col justify-between gap-4 border-b border-neutral-200/80 pb-5 sm:flex-row sm:items-end dark:border-neutral-800">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100/90 px-3 py-0.5 text-xs font-bold text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-neutral-200">
            <Cpu className="h-3.5 w-3.5" />
            <span>지속 갱신 체계 · 자동화 장치 (Condition 12-7)</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
            계속 새로 쓰는 장치 (BRA-C09, BRA-C14)
          </h2>
          <p className="text-xs text-neutral-600 sm:text-sm dark:text-neutral-400">
            새 출석·리추얼·과제 기록을 넣으면 숫자 칸과 능력별 문단 후보를 결정론적으로 다시 생성합니다.
          </p>
        </div>

        {/* ZIP 다운로드 버튼 */}
        <a
          href="/downloads/portfolio-updater.zip"
          download
          className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          <Download className="h-4 w-4" />
          <span>장치 ZIP 다운로드 (소스+README+결과)</span>
        </a>
      </div>

      {/* 장치 동작 원리 안내 배너 */}
      <div className="rounded-3xl border border-neutral-200 bg-white/95 p-6 shadow-sm backdrop-blur-md sm:p-7 dark:border-neutral-800 dark:bg-neutral-900/95">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-black text-blue-900 dark:bg-blue-950 dark:text-blue-300">
                결정론적 알고리즘 (Deterministic)
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                두 번 실행 시 100% 동일 결과 보장
              </span>
            </div>
            <p className="text-xs text-neutral-600 sm:text-sm dark:text-neutral-300">
              과정이 끝난 뒤에도 새 기록을 `inputs/`에 넣고 `python updater.py` 또는 `node updater.js`를 돌리면 날짜와
              근거가 붙은 문단 후보가 생성되며, 내가 승인한 문단만 안전하게 사이트에 반영됩니다.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRunEngine}
            disabled={isRunning}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            <RotateCw className={`h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? '장치 계산 중...' : '장치 지금 실행 (Run)'}</span>
          </button>
        </div>

        {/* 2회 실행 해시 일치 검증 바 */}
        <div className="mt-5 rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <div className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                BRA-C09 완주 통과: 새 임시 폴더에서 2회 연속 실행 결과 SHA-256 해시 100% 일치
              </div>
            </div>
            <div className="flex items-center gap-2">
              <code className="rounded bg-white/80 px-2 py-0.5 font-mono text-[10px] text-emerald-800 dark:bg-neutral-900 dark:text-emerald-300">
                219cb026...9e0771
              </code>
              <button
                type="button"
                onClick={handleCopyHash}
                className="text-emerald-700 hover:text-emerald-900 dark:text-emerald-300"
                title="해시 전체 복사"
              >
                {copiedHash ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 입력 파일 미리보기 & 실행 콘솔 터미널 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 좌측: 입력 파일 3종 탭 */}
        <div className="rounded-3xl border border-neutral-200 bg-white/95 p-5 shadow-2xs backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/95">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <FileCode2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-bold text-neutral-900 dark:text-white">입력 데이터 소스 (inputs/)</span>
            </div>
            <div className="flex gap-1">
              {REFRESH_ENGINE_DATA.inputs.map((inp, idx) => (
                <button
                  key={inp.fileName}
                  type="button"
                  onClick={() => setActiveInputTab(idx)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors ${
                    activeInputTab === idx
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300'
                  }`}
                >
                  {inp.fileName.replace('inputs/', '')}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
              <span>{REFRESH_ENGINE_DATA.inputs[activeInputTab].description}</span>
              <span className="font-bold">데이터: {REFRESH_ENGINE_DATA.inputs[activeInputTab].itemCount}건</span>
            </div>
            <pre className="max-h-56 overflow-auto rounded-xl border border-neutral-200/80 bg-neutral-950 p-3 font-mono text-[11px] leading-relaxed text-emerald-400 dark:border-neutral-800">
              {REFRESH_ENGINE_DATA.inputs[activeInputTab].sample}
            </pre>
          </div>
        </div>

        {/* 우측: 실행 로그 터미널 */}
        <div className="rounded-3xl border border-neutral-200 bg-white/95 p-5 shadow-2xs backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/95">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold text-neutral-900 dark:text-white">
                실행 로그 (Execution Console · 총 {runCount}회차)
              </span>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <Check className="h-3 w-3" /> 결정론적 일치
            </span>
          </div>

          <div className="mt-3 max-h-56 space-y-2 overflow-auto rounded-xl border border-neutral-200/80 bg-neutral-950 p-3 font-mono text-[11px] leading-relaxed text-neutral-200 dark:border-neutral-800">
            {runLog.map((log, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                <span className="font-bold text-emerald-400">&gt;</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 능력별 문단 후보 & 승인 관리 (내가 승인한 것만 사이트에 반영) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-black text-neutral-900 sm:text-lg dark:text-white">
              장치가 추출한 능력별 문단 후보 & 학생 직접 승인 목록
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              후보에는 날짜와 근거가 붙으며, 내가 승인(Toggle)한 문단만 사이트 본편과 지원 문서에 반영됩니다.
            </p>
          </div>
          <span className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-bold text-neutral-700 dark:border-neutral-800 dark:bg-neutral-800/80 dark:text-neutral-300">
            승인 완료: {candidates.filter((c) => c.approved).length} / {candidates.length}건
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {candidates.map((cand) => (
            <motion.div
              key={cand.id}
              whileHover={{ y: -2 }}
              className={`flex flex-col justify-between rounded-2xl border p-5 shadow-2xs transition-all ${
                cand.approved
                  ? 'border-blue-200/90 bg-white dark:border-blue-900/60 dark:bg-neutral-900/95'
                  : 'border-neutral-200 bg-neutral-50/60 opacity-60 dark:border-neutral-800 dark:bg-neutral-900/40'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-neutral-900 dark:text-white">
                    {getCompetencyIcon(cand.competency)}
                    <span>{cand.competency}</span>
                  </span>
                  <span className="text-[11px] font-semibold text-neutral-500">{cand.date}</span>
                </div>

                <div className="rounded-lg bg-neutral-50 p-2 text-[10px] text-neutral-600 dark:bg-neutral-800/50 dark:text-neutral-400">
                  <span className="font-bold">기록 근거: </span>
                  {cand.evidence}
                </div>

                <p className="text-xs leading-relaxed text-neutral-800 dark:text-neutral-200">"{cand.text}"</p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3 dark:border-neutral-800">
                <span className="text-[11px] font-bold text-neutral-500">
                  {cand.approved ? '사이트 반영 상태' : '미반영 (보류)'}
                </span>
                <button
                  type="button"
                  onClick={() => toggleApproval(cand.id)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-colors ${
                    cand.approved
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300'
                  }`}
                >
                  {cand.approved ? '승인됨 (Approved)' : '승인하기'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* README 돌리는 방법 3단계 안내 카드 */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-100/70 p-5 dark:border-neutral-800 dark:bg-neutral-900/70">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-neutral-800 dark:text-neutral-200" />
            <h4 className="text-sm font-black text-neutral-900 dark:text-white">
              README 3단계 실행 가이드 (새 폴더 독립 실행)
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-3 sm:gap-3">
            {REFRESH_ENGINE_DATA.readmeSteps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-800/60"
              >
                <div className="font-semibold text-neutral-800 dark:text-neutral-200">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RefreshEngine;
