import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, BarChart3, Award, FileText, Cpu, CheckCircle2 } from 'lucide-react';
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
      className={`relative overflow-hidden rounded-3xl border border-slate-200/80 bg-linear-to-b from-blue-50/60 via-slate-50/40 to-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-all sm:p-8 lg:p-9 dark:border-slate-800/80 dark:from-slate-900/80 dark:via-slate-950/60 dark:to-[#070b12] dark:shadow-none ${
        className || ''
      }`}
    >
      {/* Top Accent Gradient Line */}
      <div className="absolute top-0 right-0 left-0 h-1.5 bg-linear-to-r from-blue-600 via-indigo-600 to-cyan-500" />

      <div className="relative z-10 space-y-4 sm:space-y-5">
        {/* 상태 뱃지 */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/90 bg-blue-50/90 px-3 py-1 text-xs font-bold text-blue-700 shadow-2xs backdrop-blur-sm dark:border-blue-800/80 dark:bg-blue-950/70 dark:text-blue-300">
          <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          <span>SKT ALEPH 1기 · 보안 & 네트워크 인프라 · 과제 12 BR-A</span>
        </div>

        {/* 메인 타이틀: 본인 이름 명시 (BRA-C03) */}
        <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
          <span className="block font-extrabold text-slate-900 sm:inline dark:text-white">안녕하세요 👋 </span>
          <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            {STUDENT_INFO.name}입니다.
          </span>
        </h1>

        {/* 한 줄 소개: "...한 사람"으로 끝나는 문장 (BRA-C03) */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-xs leading-relaxed font-bold tracking-tight text-slate-700 sm:text-sm md:text-base dark:text-slate-200"
        >
          {STUDENT_INFO.oneLiner}
        </motion.p>

        {/* 태그 칩 */}
        <div className="flex flex-wrap gap-1.5 pt-0.5 sm:gap-2">
          {['#자기조절력', '#대인관계력', '#자기동기력', '#회복탄력성_100%', '#13주_연속완주'].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-lg border border-slate-200/80 bg-slate-100/80 px-2.5 py-1 text-xs font-semibold text-slate-600 transition-colors hover:border-blue-300/60 hover:bg-blue-50/60 hover:text-blue-700 dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-400 dark:hover:border-blue-700/60 dark:hover:bg-blue-950/50 dark:hover:text-blue-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 4대 필수 입구 버튼 그룹: 이야기 · 숫자 · 대표작 · 이력서 (Condition 12-4) */}
        <div className="flex flex-wrap items-center gap-2 pt-2 sm:gap-2.5">
          <a
            href="#story"
            className="group inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm shadow-blue-500/25 transition-all hover:bg-blue-700 sm:px-4 sm:text-sm"
          >
            <BookOpen className="h-4 w-4 transition-transform group-hover:scale-105" />
            <span>01. 내 이야기</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>

          <a
            href="#numbers"
            className="group inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-white/90 px-3.5 py-2 text-xs font-bold text-blue-900 shadow-2xs transition-all hover:bg-blue-50 sm:px-4 sm:text-sm dark:border-blue-800 dark:bg-neutral-900 dark:text-blue-300 dark:hover:bg-neutral-800"
          >
            <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>02. 13주 숫자 기록</span>
          </a>

          <a
            href="#featured"
            className="group inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50/90 px-3.5 py-2 text-xs font-bold text-amber-900 shadow-2xs transition-all hover:bg-amber-100 sm:px-4 sm:text-sm dark:border-amber-700 dark:bg-amber-950/60 dark:text-amber-200"
          >
            <Award className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span>03. 대표작 (논문&앱)</span>
          </a>

          <a
            href="#documents"
            className="group inline-flex items-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50/90 px-3.5 py-2 text-xs font-bold text-purple-900 shadow-2xs transition-all hover:bg-purple-100 sm:px-4 sm:text-sm dark:border-purple-800 dark:bg-purple-950/60 dark:text-purple-200"
          >
            <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span>04. 이력서·지원문서</span>
          </a>

          <a
            href="#refresh-engine"
            className="group inline-flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-bold text-neutral-700 shadow-2xs transition-all hover:bg-neutral-50 sm:text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            <Cpu className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
            <span>새로 쓰는 장치</span>
          </a>
        </div>

        {/* 첫 화면 핵심 3요소: 소개 · 활동 · 근거 (T01-C10, T01-C11 무스크롤 노출 보장) */}
        <div className="grid grid-cols-1 gap-2.5 pt-2 sm:grid-cols-3 sm:gap-3 sm:pt-3">
          {/* 1. 소개 */}
          <a
            href="#story"
            className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-3.5 shadow-md shadow-slate-200/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/15 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none dark:hover:border-blue-500/30 dark:hover:shadow-blue-950/40"
          >
            <div className="absolute top-0 right-0 left-0 h-1 bg-linear-to-r from-blue-600 to-indigo-600 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-extrabold text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
                01 · 소개 (Intro)
              </span>
              <Sparkles className="h-3.5 w-3.5 text-blue-500 opacity-60 transition-transform group-hover:scale-110 group-hover:opacity-100" />
            </div>
            <p className="mt-2 text-xs font-bold text-slate-900 transition-colors group-hover:text-blue-600 sm:text-sm dark:text-white dark:group-hover:text-blue-400">
              배움과 나눔의 성장형 개발자
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
              고난에서 시작해 원리를 파고드는 집요함으로 신뢰를 짓는 엔지니어
            </p>
          </a>

          {/* 2. 대표 활동 */}
          <a
            href="#featured"
            className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-3.5 shadow-md shadow-slate-200/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/15 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none dark:hover:border-indigo-500/30 dark:hover:shadow-indigo-950/40"
          >
            <div className="absolute top-0 right-0 left-0 h-1 bg-linear-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-extrabold text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300">
                02 · 활동 (Activities)
              </span>
              <Award className="h-3.5 w-3.5 text-indigo-500 opacity-60 transition-transform group-hover:scale-110 group-hover:opacity-100" />
            </div>
            <p className="mt-2 text-xs font-bold text-slate-900 transition-colors group-hover:text-indigo-600 sm:text-sm dark:text-white dark:group-hover:text-indigo-400">
              10번 논문 & 12개 실무 과제 완결
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
              에이전트 토폴로지 연구 논문 및 무암호화 패스키 금고 라이브 배포
            </p>
          </a>

          {/* 3. 검증 근거 */}
          <a
            href="#numbers"
            className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-3.5 shadow-md shadow-slate-200/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/15 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none dark:hover:border-cyan-500/30 dark:hover:shadow-cyan-950/40"
          >
            <div className="absolute top-0 right-0 left-0 h-1 bg-linear-to-r from-cyan-600 to-teal-600 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-extrabold text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                03 · 근거 (Evidence)
              </span>
              <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500 opacity-60 transition-transform group-hover:scale-110 group-hover:opacity-100" />
            </div>
            <p className="mt-2 text-xs font-bold text-slate-900 transition-colors group-hover:text-cyan-600 sm:text-sm dark:text-white dark:group-hover:text-cyan-400">
              출석 100% · 사상구청장 표창 · 평점 3.97
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
              13주 출석 100% · 리추얼 80회 완주 · 공인 자격 4종 & 표창 2건
            </p>
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
