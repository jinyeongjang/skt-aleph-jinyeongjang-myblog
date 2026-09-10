import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, BookOpen, Compass } from 'lucide-react';
import heroGraphic from '../assets/hero.png';
import { cn } from '../lib/utils';

interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('relative pt-6 pb-2 sm:pt-10', className)}
    >
      <div className="flex flex-col-reverse items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="flex-1 space-y-5">
          {/* 상태 뱃지 */}
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-medium text-neutral-700 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span>SKT ALEPH 1기 · 보안 및 인프라 학습 중</span>
          </div>

          {/* 메인 타이틀 */}
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl lg:leading-tight">
            안녕하세요 👋 <br />
            배움과 나눔에 진심인 <br />
            <span className="text-neutral-600">장진영</span>입니다.
          </h1>

          {/* Notion 대표 정의 문구 */}
          <p className="max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            “배움과 나눔에 진심을 다하며, 사람과의 따뜻한 연결 속에서 함께 성장하는 사람.”
          </p>

          {/* 태그 칩 */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">#책임감</span>
            <span className="rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
              #소명_성취
            </span>
            <span className="rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
              #따뜻한_공동체
            </span>
            <span className="rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
              #보안_인프라
            </span>
          </div>

          {/* CTA 버튼 */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#manual"
              className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-neutral-800 hover:shadow-md"
            >
              <BookOpen className="h-4 w-4" />
              <span>작동방식 & 설명서</span>
              <ArrowDown className="h-4 w-4" />
            </a>

            <a
              href="#roadmap"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-2xs transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              <Compass className="h-4 w-4 text-neutral-500" />
              <span>알레프 로드맵</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-2xs transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              <Mail className="h-4 w-4 text-neutral-500" />
              <span>연락하기</span>
            </a>
          </div>
        </div>

        {/* 3D 그래픽 장식 */}
        <div className="relative mx-auto flex h-36 w-36 shrink-0 items-center justify-center md:h-48 md:w-48">
          <div className="absolute inset-0 rounded-full bg-linear-to-tr from-purple-100/50 to-indigo-100/30 blur-xl" />
          <motion.img
            src={heroGraphic}
            alt="Hero Graphic"
            className="relative h-32 w-32 object-contain drop-shadow-md md:h-40 md:w-40"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.section>
  );
};
