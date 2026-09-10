import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles, UserCheck, HeartHandshake } from 'lucide-react';
import { cn } from '../lib/utils';

interface AboutProps {
  className?: string;
}

export const About: React.FC<AboutProps> = ({ className }) => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={cn('scroll-mt-24 space-y-6 border-t border-neutral-200/80 pt-14', className)}
    >
      <div className="space-y-1">
        <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">Self Definition</span>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">‘나’를 한 문장으로 🎯</h2>
      </div>

      {/* 대표 정의 하이라이트 배너 */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-2xs transition-all hover:border-neutral-300 hover:shadow-sm sm:p-8">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-linear-to-bl from-amber-100/60 to-purple-100/40 blur-xl" />
        <Quote className="h-8 w-8 text-neutral-300" />
        <blockquote className="mt-3 text-lg leading-relaxed font-bold text-neutral-900 sm:text-2xl">
          “배움과 나눔에 진심을 다하며, <br className="hidden sm:inline" />
          사람과의 따뜻한 연결 속에서 함께 성장하는 사람.”
        </blockquote>
        <p className="mt-4 text-xs leading-relaxed text-neutral-500 sm:text-sm">
          지식의 습득에만 머물지 않고 동료와 나누며, 온기 있는 소통을 통해 공동체의 건강한 시너지를 이끌어내는 것을
          인생과 커리어의 가장 소중한 나침반으로 삼고 있습니다.
        </p>

        <div className="mt-6 flex flex-wrap gap-4 border-t border-neutral-100 pt-5 text-xs text-neutral-600 sm:text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>지속적 성장과 학구열</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartHandshake className="h-4 w-4 text-rose-500" />
            <span>이타적 배려와 나눔</span>
          </div>
          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-emerald-500" />
            <span>신뢰 기반의 인간관계</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
