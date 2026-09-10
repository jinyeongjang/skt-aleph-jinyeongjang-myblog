import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, HeartHandshake, Users, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';

interface AboutProps {
  className?: string;
}

const VALUES = [
  {
    icon: BookOpen,
    title: '배움 (Learning)',
    description: '새로운 기술과 지식을 두려움 없이 적극적으로 받아들이고 탐구합니다.',
  },
  {
    icon: HeartHandshake,
    title: '나눔 (Sharing)',
    description: '혼자만 아는 지식에 머물지 않고 동료와 나누며 함께 발전하는 가치를 믿습니다.',
  },
  {
    icon: Users,
    title: '연결 (Connection)',
    description: '사람과 사람 사이의 따뜻한 소통과 신뢰를 바탕으로 긍정적인 협업을 만듭니다.',
  },
  {
    icon: TrendingUp,
    title: '성장 (Growth)',
    description: '어제보다 더 나은 내일을 위해 지속적으로 회고하고 개선점을 찾아 나아갑니다.',
  },
];

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
      <div className="space-y-2">
        <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">About Me</span>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">저를 소개합니다.</h2>
      </div>

      {/* 핵심 가치관 하이라이트 카드 */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-2xs transition-shadow hover:shadow-sm sm:p-8">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-linear-to-bl from-neutral-100 to-transparent" />
        <p className="relative text-lg leading-relaxed font-medium text-neutral-800 sm:text-xl">
          “배움과 나눔에 진심을 다하며,
          <br className="hidden sm:inline" />
          사람과의 따뜻한 연결 속에서 함께 성장하고 싶은 사람.”
        </p>
      </div>

      {/* 가치관 그리드 */}
      <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
        {VALUES.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="group rounded-xl border border-neutral-200/70 bg-white/70 p-4 transition-all hover:border-neutral-300 hover:bg-white hover:shadow-2xs"
            >
              <div className="mb-2 flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="text-sm font-semibold text-neutral-900">{item.title}</h3>
              </div>
              <p className="text-xs leading-relaxed text-neutral-500 sm:text-sm">{item.description}</p>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};
