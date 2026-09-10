import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Church, Video, Award, Target, Users2, ArrowUpRight } from 'lucide-react';
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
    accent: 'from-amber-500/10 to-amber-500/5 text-amber-800 border-amber-200/60',
  },
  {
    icon: Target,
    name: '소명 & 성취',
    en: 'Calling & Achievement',
    description: '단순한 일에 그치지 않고 배움과 일에 명확한 의미와 소명을 부여하며 높은 성취를 이룹니다.',
    accent: 'from-sky-500/10 to-sky-500/5 text-sky-800 border-sky-200/60',
  },
  {
    icon: Users2,
    name: '공동체',
    en: 'Community',
    description: '나 혼자만의 성취보다 동료와 함께 나누고 서로를 격려하며 따뜻한 시너지를 이끌어냅니다.',
    accent: 'from-emerald-500/10 to-emerald-500/5 text-emerald-800 border-emerald-200/60',
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
    accent: 'bg-indigo-50 text-indigo-700',
  },
  {
    icon: Church,
    title: '교회 사역 / 찬양팀',
    subtitle: '나눔과 섬김의 가치',
    description:
      '공동체 안에서 헌신하고 섬기며, 사람들과 진솔한 마음을 나누고 따뜻한 에너지를 충전하는 소중한 시간입니다.',
    tag: '#공동체 #섬김 #찬양',
    accent: 'bg-rose-50 text-rose-700',
  },
  {
    icon: Video,
    title: '개발 / 영상편집',
    subtitle: '기술과 콘텐츠 창작',
    description: '코드로 논리를 구현하는 개발과 시각적으로 메시지를 직관적이게 전달하는 영상 미디어 창작을 사랑합니다.',
    tag: '#개발 #미디어 #콘텐츠',
    accent: 'bg-purple-50 text-purple-700',
  },
];

export const Values: React.FC<ValuesProps> = ({ className }) => {
  return (
    <motion.section
      id="values"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={cn('scroll-mt-24 space-y-10 border-t border-neutral-200/80 pt-14', className)}
    >
      {/* 1. 핵심 가치 */}
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">Core Values</span>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">핵심 가치 🔑</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CORE_VALUES.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'group rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-2xs transition-all hover:border-neutral-300 hover:shadow-sm',
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-500">
                    {item.en}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-neutral-900">{item.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600 sm:text-sm">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 2. 관심사 */}
      <div className="space-y-4 pt-2">
        <div className="space-y-1">
          <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">Interests</span>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">관심사 👍</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {INTERESTS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="group flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-2xs transition-all hover:border-neutral-300 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-105',
                        item.accent,
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-bold text-neutral-900">{item.title}</h3>
                      <p className="text-[11px] text-neutral-400">{item.subtitle}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-neutral-600 sm:text-sm">{item.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
                  <span className="text-xs font-medium text-neutral-500">{item.tag}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-neutral-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-600" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
