import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Network, Calendar, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface ActivitiesProps {
  className?: string;
}

interface ActivityItem {
  title: string;
  role: string;
  period: string;
  description: string;
  details: string[];
  tags: string[];
}

const ACTIVITIES: ActivityItem[] = [
  {
    title: 'SKT ALEPH 1기',
    role: '교육생 (보안 & 네트워크 트랙)',
    period: '2026.08 ~ 진행 중',
    description: '기업 현장 중심의 보안 시스템 구축 및 네트워크 인프라 아키텍처 집중 학습',
    details: [
      'TCP/IP, 라우팅 및 스위칭 등 핵심 네트워크 프로토콜 심화 실습',
      '시스템 및 네트워크 보안 취약점 분석, 방화벽 및 침입 탐지 시스템 학습',
      '클라우드 인프라와 결합한 현대적 인프라 보안 프레임워크 스터디',
    ],
    tags: ['보안 (Security)', '네트워크 (Network)', '인프라', 'SKT ALEPH'],
  },
];

export const Activities: React.FC<ActivitiesProps> = ({ className }) => {
  return (
    <motion.section
      id="activities"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={cn('scroll-mt-24 space-y-6 border-t border-neutral-200/80 pt-14', className)}
    >
      <div className="space-y-2">
        <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">Activities & Experience</span>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">활동 & 경험</h2>
      </div>

      <div className="space-y-4">
        {ACTIVITIES.map((activity) => (
          <div
            key={activity.title}
            className="group relative rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-2xs transition-all hover:border-neutral-300 hover:shadow-sm sm:p-7"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white shadow-xs">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">{activity.title}</h3>
                  <p className="text-xs font-medium text-neutral-500">{activity.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-start rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 sm:self-center">
                <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                <span>{activity.period}</span>
              </div>
            </div>

            <p className="mt-4 text-sm font-medium text-neutral-700">{activity.description}</p>

            <ul className="mt-3 space-y-2 text-sm text-neutral-600">
              {activity.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="leading-snug">{detail}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-1.5 border-t border-neutral-100 pt-4">
              {activity.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 transition-colors group-hover:bg-neutral-200/70"
                >
                  <Network className="h-3 w-3 text-neutral-400" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};
