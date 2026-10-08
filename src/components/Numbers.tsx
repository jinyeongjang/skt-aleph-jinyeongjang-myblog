import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Flame } from 'lucide-react';
import { THIRTEEN_WEEK_METRICS } from '../data/portfolioData';

export const Numbers: React.FC = () => {
  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case '내 출석 기록':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800/60';
      case '리추얼 기록':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800/60';
      case '내 제출 현황':
      default:
        return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/70 dark:text-purple-300 dark:border-purple-800/60';
    }
  };

  return (
    <section id="numbers" className="scroll-mt-24 space-y-8">
      {/* 섹션 헤더 */}
      <div className="space-y-1.5 border-b border-neutral-200/80 pb-5 dark:border-neutral-800">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100/90 px-3 py-0.5 text-xs font-bold text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-neutral-200">
          <BarChart3 className="h-3.5 w-3.5" />
          <span>숫자로 뒷받침하는 13주 기록 (회복탄력성 & 과제지속력)</span>
        </div>
        <h2 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
          13주 기록의 숫자와 출처 (BRA-C05)
        </h2>
        <p className="text-xs text-neutral-600 sm:text-sm dark:text-neutral-400">
          추상적인 주장이 아닌 「내 출석 기록」, 「리추얼 기록」, 「내 제출 현황」 3대 공인 기록에서 나온 실제
          숫자입니다.
        </p>
      </div>

      {/* 고난 장면과 짝지어진 핵심 지표 하이라이트 배너 (Condition 12-2, 12-5 필수) */}
      <div className="rounded-3xl border border-blue-200/90 bg-linear-to-r from-blue-50/70 via-indigo-50/40 to-white/90 p-6 shadow-sm backdrop-blur-md sm:p-7 dark:border-blue-900/40 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-neutral-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-300 bg-blue-100 px-3 py-0.5 text-[11px] font-black text-blue-900 dark:border-blue-800 dark:bg-blue-900/70 dark:text-blue-200">
              <Flame className="h-3.5 w-3.5 text-amber-500" />
              <span>[고난 장면 ↔ 13주 기록 숫자 짝짓기]</span>
            </div>
            <h3 className="text-lg font-black text-neutral-900 sm:text-xl dark:text-white">
              과거의 셧다운 실패를 극복한 13주 65일 전수 완주 (출석률 100% & 리추얼 80회)
            </h3>
            <p className="text-xs leading-relaxed text-neutral-700 sm:text-sm dark:text-neutral-300">
              <strong>고난 장면 (2024년 11월):</strong> 마감 3분 전 28,492개 소켓 누수로 서버가 멈췄던 미숙함 ➔{' '}
              <br className="hidden sm:inline" />
              <strong>숫자 뒷받침:</strong> SKT ALEPH 13주 동안{' '}
              <span className="font-bold text-blue-700 dark:text-blue-300">「내 출석 기록」 100%(지각·결석 0회)</span>와{' '}
              <span className="font-bold text-emerald-700 dark:text-emerald-300">
                「리추얼 기록」 80회 전수 작성(40일 전수)
              </span>
              ,{' '}
              <span className="font-bold text-purple-700 dark:text-purple-300">
                「내 제출 현황」 12개 과제 전수 완료
              </span>
              로 회복탄력성과 과제지속력을 증명했습니다.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-blue-200 bg-white/90 p-4 text-center shadow-xs dark:border-blue-800/80 dark:bg-neutral-800/90">
            <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400">13주 전수 출석</div>
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400">100%</div>
            <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              지각 0 · 결석 0 · 조퇴 0
            </div>
          </div>
        </div>
      </div>

      {/* 6대 숫자 카드 그리드 (출처 명시) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {THIRTEEN_WEEK_METRICS.map((metric) => (
          <motion.div
            key={metric.id}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-white/95 p-5 shadow-2xs backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/90"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[11px] font-bold ${getSourceBadgeColor(
                    metric.source,
                  )}`}
                >
                  출처: {metric.source}
                </span>
                {metric.pairedHardship && (
                  <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-extrabold text-rose-700 dark:bg-rose-950/70 dark:text-rose-300">
                    고난 짝짓기
                  </span>
                )}
              </div>

              <div>
                <div className="text-xs font-bold text-neutral-500 dark:text-neutral-400">{metric.label}</div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
                    {metric.value}
                  </span>
                  <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">{metric.unit}</span>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">{metric.description}</p>
            </div>

            <div className="mt-4 border-t border-neutral-100 pt-3 dark:border-neutral-800">
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                <span className="font-semibold">원천 근거:</span> {metric.sourceDetail}
              </div>
              {metric.pairedHardship && (
                <div className="mt-1.5 rounded-lg bg-neutral-50 p-2 text-[10px] text-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-300">
                  <span className="font-bold text-rose-600 dark:text-rose-400">고난 연결: </span>
                  {metric.pairedHardship}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 출처 3곳 검증 안내 표 */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white/95 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900/90">
        <div className="border-b border-neutral-100 bg-neutral-50/80 px-5 py-3 dark:border-neutral-800 dark:bg-neutral-800/40">
          <h4 className="text-xs font-black text-neutral-800 sm:text-sm dark:text-neutral-200">
            📊 숫자 데이터의 3대 출처 및 검증 기준 (BRA-C05)
          </h4>
        </div>
        <div className="divide-y divide-neutral-100 text-xs dark:divide-neutral-800">
          <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-3 sm:gap-4">
            <div className="font-bold text-blue-700 dark:text-blue-400">① 「내 출석 기록」</div>
            <div className="text-neutral-600 sm:col-span-2 dark:text-neutral-300">
              SKT ALEPH 1기 13주(2026.07 ~ 2026.10, 총 65일 교육) 전수 출석 관리 시스템 데이터. 총 65일 전수 출석(100%),
              지각 0회, 결석 0회, 조퇴 0회. 양산발 새벽 5:40 통학 30일 연속 1등 입실.
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-3 sm:gap-4">
            <div className="font-bold text-emerald-700 dark:text-emerald-400">② 「리추얼 기록」</div>
            <div className="text-neutral-600 sm:col-span-2 dark:text-neutral-300">
              30일간 작성한 아침 리추얼 30회 + 저녁 마무리 리추얼 30회(총 60건) 전수 일지(`assets/myritual.json`). 동료
              피드백 30건 교차 수집 및 일일 복습 루틴 30일 완주.
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-3 sm:gap-4">
            <div className="font-bold text-purple-700 dark:text-purple-400">③ 「내 제출 현황」</div>
            <div className="text-neutral-600 sm:col-span-2 dark:text-neutral-300">
              과제 1부터 과제 12까지 12개 실전 프로젝트 전수 제출 완료(제출률 100%). 사전 고정 38개 자동화 테스트 전수
              PASS, Oxlint 오류/경고 0건 유지.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Numbers;
