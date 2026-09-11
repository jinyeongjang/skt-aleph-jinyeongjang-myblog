import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Church, Video, Award, Target, Users2, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface ValuesProps {
  className?: string;
}

const CORE_VALUES = [
  {
    icon: Award,
    name: '책임감',
    en: 'Responsibility',
    description: '스스로 맡은 역할과 프로젝트의 결과에 대해 주도적으로 끝까지 최선을 다하며 신뢰를 지킵니다.',
  },
  {
    icon: Target,
    name: '소명 & 성취',
    en: 'Calling & Achievement',
    description: '단순한 일에 그치지 않고 배움과 일에 명확한 의미와 소명을 부여하며 높은 성취를 이룹니다.',
  },
  {
    icon: Users2,
    name: '공동체',
    en: 'Community',
    description: '나 혼자만의 성취보다 동료와 함께 나누고 서로를 격려하며 따뜻한 시너지를 이끌어냅니다.',
  },
];

const INTERESTS = [
  {
    icon: Shield,
    title: '보안 / 인프라 IT',
    subtitle: '지속적인 성장 커리어',
    description:
      '네트워크 인프라 구축, 시스템 방어, 보안 취약점 분석 등 안전한 엔터프라이즈 환경을 설계하는 엔지니어링에 매료되어 있습니다.',
    tag: '#보안 #네트워크 #인프라',
  },
  {
    icon: Sparkles,
    title: 'SW·AI 교육 & 디지털 나눔',
    subtitle: '기술 격차 해소와 에듀테크',
    description:
      '부산SW·AI교육거점센터 및 디지털배움터 강사 경험을 바탕으로, 디지털 소외 없이 누구나 신기술을 체험하도록 돕는 데 깊은 보람을 느낍니다.',
    tag: '#에듀테크 #SW·AI교육 #디지털배움터',
  },
  {
    icon: Church,
    title: '교회 사역 / 찬양팀',
    subtitle: '나눔과 섬김의 가치',
    description:
      '공동체 안에서 헌신하고 섬기며, 사람들과 진솔한 마음을 나누고 따뜻한 에너지를 충전하는 소중한 시간입니다.',
    tag: '#공동체 #섬김 #찬양',
  },
  {
    icon: Video,
    title: '개발 / 영상 콘텐츠',
    subtitle: '기술과 시각 미디어 창작',
    description: '코드로 인터랙티브한 웹 논리를 구현하는 것에 관심이 있습니다.',
    tag: '#개발 #미디어 #콘텐츠',
  },
];

export const Values: React.FC<ValuesProps> = ({ className }) => {
  return (
    <motion.section
      id="values"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className={cn(
        'scroll-mt-24 space-y-8 border-t border-neutral-200/80 pt-12 dark:border-neutral-800/80',
        className,
      )}
    >
      {/* 1. 핵심 가치 */}
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
            Core Values
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">핵심 가치</h2>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
          {CORE_VALUES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="rounded-2xl border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900/90 dark:hover:border-neutral-700"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    {item.en}
                  </span>
                </div>
                <h3 className="mt-3.5 text-base font-bold text-neutral-900 dark:text-white">{item.name}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-700 sm:text-sm dark:text-neutral-300">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. 관심사 */}
      <div className="space-y-4 pt-2">
        <div className="space-y-1">
          <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
            Interests
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
            관심사 & 활동 영역
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {INTERESTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900/90 dark:hover:border-neutral-700"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="font-bold text-neutral-900 dark:text-white">{item.title}</h3>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">{item.subtitle}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-neutral-700 sm:text-sm dark:text-neutral-300">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                  <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">{item.tag}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default Values;
