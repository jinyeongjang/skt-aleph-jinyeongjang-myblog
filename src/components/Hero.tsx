import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, BookOpen, FolderCode } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'relative overflow-hidden rounded-3xl border border-white/80 bg-white/70 p-6 shadow-xs backdrop-blur-xl transition-all sm:p-9',
        className,
      )}
    >
      {/* 백그라운드 테크 그리드 애니메이션 & 글래스모피즘 광원 (T01-C22 움직임 줄이기 지원) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl">
        {/* 테크 그리드 패턴 레이어 - 은은한 무한 이동 애니메이션 */}
        <motion.div
          animate={{
            backgroundPosition: ['0px 0px', '28px 28px'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:28px_28px] opacity-40 motion-reduce:animate-none"
        />

        {/* 상단 래디얼 그라데이션 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.08),rgba(255,255,255,0))]" />

        {/* 글래스모피즘 굴절감을 주는 은은한 앰비언트 블러 광원 */}
        <motion.div
          animate={{
            x: [0, 24, -16, 0],
            y: [0, -18, 12, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-12 -left-12 h-64 w-64 rounded-full bg-neutral-300/30 blur-3xl motion-reduce:hidden"
        />
        <motion.div
          animate={{
            x: [0, -20, 16, 0],
            y: [0, 16, -12, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -right-8 bottom-0 h-56 w-56 rounded-full bg-neutral-200/40 blur-3xl motion-reduce:hidden"
        />
      </div>

      <div className="relative z-10 space-y-5">
        {/* 상태 뱃지 (글래스모피즘 필) */}
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200/90 bg-white/80 px-3 py-1 text-xs font-medium text-neutral-700 shadow-2xs backdrop-blur-md">
          <span>SKT ALEPH 1기 · 네트워크, 보안 및 인프라, AI</span>
        </div>

        {/* 메인 타이틀 */}
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl lg:leading-tight">
          안녕하세요 👋 <br />
          <span className="text-neutral-500">SKT ALEPH 수강생 장OO </span>입니다.
        </h1>

        {/* 태그 칩 (글래스모피즘 스타일) */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="rounded-md border border-neutral-200/70 bg-white/80 px-2.5 py-1 text-xs font-medium text-neutral-700 backdrop-blur-sm">
            #책임감
          </span>
          <span className="rounded-md border border-neutral-200/70 bg-white/80 px-2.5 py-1 text-xs font-medium text-neutral-700 backdrop-blur-sm">
            #소명_성취
          </span>
          <span className="rounded-md border border-neutral-200/70 bg-white/80 px-2.5 py-1 text-xs font-medium text-neutral-700 backdrop-blur-sm">
            #따뜻한_공동체
          </span>
          <span className="rounded-md border border-neutral-200/70 bg-white/80 px-2.5 py-1 text-xs font-medium text-neutral-700 backdrop-blur-sm">
            #보안_인프라
          </span>
        </div>

        {/* CTA 버튼 */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-xs transition-colors hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none"
          >
            <FolderCode className="h-4 w-4" />
            <span>프로젝트 보기</span>
          </a>

          <a
            href="#manual"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white/80 px-4 py-2 text-sm font-medium text-neutral-700 shadow-2xs backdrop-blur-md transition-colors hover:bg-white hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none"
          >
            <BookOpen className="h-4 w-4 text-neutral-500" />
            <span>작동방식 & 설명서</span>
            <ArrowDown className="h-3.5 w-3.5 text-neutral-500" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white/80 px-4 py-2 text-sm font-medium text-neutral-700 shadow-2xs backdrop-blur-md transition-colors hover:bg-white hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none"
          >
            <Mail className="h-4 w-4 text-neutral-500" />
            <span>연락하기</span>
          </a>
        </div>

        {/* 첫 화면 핵심 3요소: 소개 · 활동 · 근거 (T01-C10, T01-C11 해상도 기준 첫 화면 동시 노출 & 글래스모피즘 카드) */}
        <div className="grid grid-cols-1 gap-2.5 pt-3 sm:grid-cols-3 sm:pt-4">
          {/* 1. 소개 */}
          <a
            href="#about"
            className="group rounded-xl border border-white/80 bg-white/75 p-3.5 shadow-2xs backdrop-blur-md transition-all hover:border-neutral-300 hover:bg-white/95 hover:shadow-xs focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none"
          >
            <span className="text-[11px] font-bold tracking-wider text-neutral-500 uppercase">01 · 소개 (Intro)</span>
            <p className="mt-1 text-xs font-bold text-neutral-900 group-hover:text-neutral-700">
              배움과 나눔의 성장형 개발자
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-600">
              온기 있는 소통과 신뢰를 바탕으로 팀과 함께 가치를 만드는 엔지니어
            </p>
          </a>

          {/* 2. 대표 활동 */}
          <a
            href="#projects"
            className="group rounded-xl border border-white/80 bg-white/75 p-3.5 shadow-2xs backdrop-blur-md transition-all hover:border-neutral-300 hover:bg-white/95 hover:shadow-xs focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none"
          >
            <span className="text-[11px] font-bold tracking-wider text-neutral-500 uppercase">
              02 · 활동 (Activities)
            </span>
            <p className="mt-1 text-xs font-bold text-neutral-900 group-hover:text-neutral-700">
              SKT ALEPH 1기 & 6개 프로젝트
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-600">
              보안·네트워크 학습 및 에듀테크 AI, 결제 솔루션, 기술 블로그 구축
            </p>
          </a>

          {/* 3. 검증 근거 */}
          <a
            href="#strengths"
            className="group rounded-xl border border-white/80 bg-white/75 p-3.5 shadow-2xs backdrop-blur-md transition-all hover:border-neutral-300 hover:bg-white/95 hover:shadow-xs focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none"
          >
            <span className="text-[11px] font-bold tracking-wider text-neutral-500 uppercase">
              03 · 근거 (Evidence)
            </span>
            <p className="mt-1 text-xs font-bold text-neutral-900 group-hover:text-neutral-700">
              라이브 데모 & 구청장 표창
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-600">
              실제 웹 배포, KDT 부트캠프 과제상, 사상구청장 표창, 학과 수석 3.97
            </p>
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
