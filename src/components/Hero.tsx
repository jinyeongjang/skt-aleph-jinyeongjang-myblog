import React from 'react';
import { motion } from 'framer-motion';
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
      className={cn('relative pt-8 pb-4 sm:pt-12', className)}
    >
      <div className="flex flex-col-reverse items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="flex-1 space-y-5">
          {/* 메인 타이틀 */}
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl lg:leading-tight">
            안녕하세요 👋 <br />
          </h1>

          {/* 서브 문구 */}
          <p className="max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            SKT ALEPH에서 보안과 네트워크를 집중적으로 학습하고 있습니다.
          </p>
        </div>
      </div>
    </motion.section>
  );
};
