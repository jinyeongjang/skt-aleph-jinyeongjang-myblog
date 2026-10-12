import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, BarChart3, Award, FileText, Cpu, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { STUDENT_INFO } from '../data/portfolioData';

interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative overflow-hidden rounded-3xl border border-neutral-200/90 bg-linear-to-b from-blue-50/50 via-white/80 to-white/95 p-6 shadow-lg shadow-neutral-200/40 backdrop-blur-xl transition-all sm:p-8 dark:border-neutral-800 dark:from-neutral-900/80 dark:via-neutral-950/70 dark:to-neutral-950 dark:shadow-none ${
        className || ''
      }`}
    >
      {/* Top Accent Gradient Line */}
      <div className="absolute top-0 right-0 left-0 h-1 bg-linear-to-r from-blue-600 via-indigo-600 to-cyan-500" />

      <div className="relative z-10 space-y-5">
        {/* 상태 뱃지 */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/90 px-3 py-1 text-xs font-bold text-blue-700 shadow-2xs backdrop-blur-sm dark:border-blue-800/80 dark:bg-blue-950/70 dark:text-blue-300">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>SKT ALEPH 1기 · 보안 & 네트워크 인프라 트랙</span>
          </div>
          <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
            3분 완독 공개 포트폴리오
          </span>
        </div>

        {/* 메인 타이틀: 본인 이름 명시 (BRA-C03) */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl dark:text-white">
            <span className="block font-extrabold text-neutral-900 sm:inline dark:text-white">안녕하세요 👋 </span>
            <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              {STUDENT_INFO.name}입니다.
            </span>
          </h1>

          {/* 한 줄 소개: "...한 사람"으로 끝나는 문장 (BRA-C03) */}
          <p className="text-xs leading-relaxed font-bold break-keep text-neutral-700 sm:text-sm sm:leading-normal md:text-base dark:text-neutral-200">
            {STUDENT_INFO.oneLiner}
          </p>
        </div>

        {/* 태그 칩 */}
        <div className="flex flex-wrap gap-1.5 pt-0.5 sm:gap-2">
          {['#자기조절력', '#대인관계력', '#자기동기력', '#회복탄력성_100%', '#13주_전수완주'].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-lg border border-neutral-200/80 bg-neutral-100/80 px-2.5 py-1 text-xs font-semibold text-neutral-600 transition-colors dark:border-neutral-800 dark:bg-neutral-800/70 dark:text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 4대 필수 입구 카드 데크 (Condition 12-4 & T01-C10/C11 동시 충족) */}
        <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-4">
          {/* 01. 내 이야기 */}
          <a
            href="#story"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/95 p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/80 hover:shadow-md hover:shadow-blue-500/10 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:border-neutral-800 dark:bg-neutral-900/90 dark:hover:border-blue-600"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-black text-blue-700 dark:bg-blue-950/70 dark:text-blue-300">
                  01 · 소개 (Intro)
                </span>
                <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-sm font-black text-neutral-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                01. 내 이야기
              </h3>
              <p className="text-[11px] leading-relaxed break-keep text-neutral-600 dark:text-neutral-400">
                1,500자 고난 극복 본편 및 세 능력 성장 서사
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400">
              <span>본편 읽기</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>

          {/* 02. 13주 숫자 */}
          <a
            href="#numbers"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/95 p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/80 hover:shadow-md hover:shadow-cyan-500/10 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none dark:border-neutral-800 dark:bg-neutral-900/90 dark:hover:border-cyan-600"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-black text-cyan-700 dark:bg-cyan-950/70 dark:text-cyan-300">
                  02 · 근거 (Evidence)
                </span>
                <BarChart3 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-sm font-black text-neutral-900 transition-colors group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">
                02. 13주 숫자
              </h3>
              <p className="text-[11px] leading-relaxed break-keep text-neutral-600 dark:text-neutral-400">
                출석 100% · 리추얼 80회 · 과제 12개 지표
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-cyan-600 dark:text-cyan-400">
              <span>숫자 확인</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>

          {/* 03. 대표작 */}
          <a
            href="#featured"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/95 p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400/80 hover:shadow-md hover:shadow-amber-500/10 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none dark:border-neutral-800 dark:bg-neutral-900/90 dark:hover:border-amber-600"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-black text-amber-700 dark:bg-amber-950/70 dark:text-amber-300">
                  03 · 활동 (Activities)
                </span>
                <Award className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-sm font-black text-neutral-900 transition-colors group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400">
                03. 대표작
              </h3>
              <p className="text-[11px] leading-relaxed break-keep text-neutral-600 dark:text-neutral-400">
                10번 연구 논문 및 13번 앱 예정 자리
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
              <span>대표작 보기</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>

          {/* 04. 지원 문서 */}
          <a
            href="#documents"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/95 p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-400/80 hover:shadow-md hover:shadow-purple-500/10 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none dark:border-neutral-800 dark:bg-neutral-900/90 dark:hover:border-purple-600"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-black text-purple-700 dark:bg-purple-950/70 dark:text-purple-300">
                  04 · 문서 (Docs)
                </span>
                <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-sm font-black text-neutral-900 transition-colors group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                04. 지원 문서
              </h3>
              <p className="text-[11px] leading-relaxed break-keep text-neutral-600 dark:text-neutral-400">
                이력서 · 자기소개서 · 12개 과제 STAR
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-purple-600 dark:text-purple-400">
              <span>문서 열람</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>
        </div>

        {/* 하단 퀵 액션 바 (장치 & 완주 검증) */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200/70 pt-3 dark:border-neutral-800/80">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#refresh-engine"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 transition-colors hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400"
            >
              <Cpu className="h-3.5 w-3.5" />
              <span>새로 쓰는 장치 (결정론적 갱신 엔진)</span>
            </a>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <a
              href="#submission"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 transition-colors hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>완주 검증 템플릿</span>
            </a>
          </div>

          <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
            시크릿 모드 무로그인 즉시 열람 (BRA-C13)
          </span>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
