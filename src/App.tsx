import React from 'react';
import { motion } from 'framer-motion';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 antialiased">
      {/* 상단 Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-50 border-b border-neutral-200 bg-white/85 backdrop-blur-md"
      >
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-6 text-sm">
          <a href="#" className="font-semibold text-neutral-900 transition-colors hover:text-neutral-600">
            환영해요.
          </a>
          <nav className="flex items-center gap-5 text-neutral-600">
            <a href="#about" className="transition-colors hover:text-neutral-900">
              소개
            </a>
            <a href="#activities" className="transition-colors hover:text-neutral-900">
              활동
            </a>
            <a href="#contact" className="transition-colors hover:text-neutral-900">
              연락처
            </a>
          </nav>
        </div>
      </motion.header>

      <main className="mx-auto max-w-2xl space-y-16 px-6 py-20">
        {/* 1. 기본 소개 (Hero) */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">이름을 입력하세요</h1>
          <p className="text-lg leading-relaxed text-neutral-600">나를 표현하는 한 줄 소개를 작성해 보세요.</p>
        </motion.section>

        {/* 2. 나에 대해 (About) */}
        <motion.section
          id="about"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="scroll-mt-20 space-y-4 border-t border-neutral-200 pt-10"
        >
          <h2 className="text-xl font-semibold text-neutral-900">소개</h2>
          <p className="leading-relaxed text-neutral-600">
            자유롭게 나의 이야기, 가치관, 좋아하는 것들을 작성하는 공간입니다.
          </p>
        </motion.section>

        {/* 3. 활동 및 경험 (Activities / Works) */}
        <motion.section
          id="activities"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="scroll-mt-20 space-y-4 border-t border-neutral-200 pt-10"
        >
          <h2 className="text-xl font-semibold text-neutral-900">활동 & 경험</h2>
          <div className="space-y-3">
            <div className="rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-300">
              <h3 className="font-medium text-neutral-900">활동 또는 프로젝트 제목</h3>
              <p className="mt-1 text-sm text-neutral-500">간단한 설명과 역할, 배운 점 등을 기록해 보세요.</p>
            </div>
          </div>
        </motion.section>

        {/* 4. 연락처 및 링크 (Contact / Links) */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="scroll-mt-20 space-y-4 border-t border-neutral-200 pt-10"
        >
          <h2 className="text-xl font-semibold text-neutral-900">연락처</h2>
          <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
            <a href="mailto:email@example.com" className="underline underline-offset-4 hover:text-neutral-900">
              이메일
            </a>
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-neutral-900"
            >
              블로그 / SNS
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default App;
