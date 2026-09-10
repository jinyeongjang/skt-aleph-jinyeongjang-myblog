import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Scale, Sparkles, HandHeart, Smile, CheckCircle2, ShieldAlert, Award } from 'lucide-react';
import { cn } from '../lib/utils';

interface StrengthsProps {
  className?: string;
}

const VIA_TOP_5 = [
  {
    rank: '01',
    category: '인류애',
    title: '사랑 (Love)',
    icon: Heart,
    description:
      '타인과의 진솔한 관계를 매우 소중하게 여깁니다. 서로 나누고 보살피는 친밀한 유대를 진심으로 중요하게 생각합니다.',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200/80',
    iconColor: 'bg-rose-100 text-rose-700',
  },
  {
    rank: '02',
    category: '정의',
    title: '공정성 (Fairness)',
    icon: Scale,
    description:
      '모든 사람을 공평하게 대하는 것을 원칙으로 삼습니다. 사적인 편견으로 결정을 흐리지 않고 균등한 기회를 제공합니다.',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/80',
    iconColor: 'bg-blue-100 text-blue-700',
  },
  {
    rank: '03',
    category: '지혜',
    title: '호기심 (Curiosity)',
    icon: Sparkles,
    description:
      '새로운 기술과 지식에 늘 흥미를 느끼며, 끊임없이 질문을 던지고 미지의 영역을 탐구하는 데서 희열을 얻습니다.',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/80',
    iconColor: 'bg-amber-100 text-amber-700',
  },
  {
    rank: '04',
    category: '인류애',
    title: '친절 (Kindness)',
    icon: HandHeart,
    description:
      '타인에게 관대하고 자상하며 도움이 필요한 순간을 지나치지 않습니다. 누군가에게 선한 영향력을 베푸는 데서 보람을 느낍니다.',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    iconColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    rank: '05',
    category: '초월',
    title: '유머 (Humor)',
    icon: Smile,
    description:
      '함께하는 사람들을 미소 짓게 만드는 밝은 에너지를 발산하며, 어려운 난관 속에서도 긍정적인 희망의 면을 발견합니다.',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200/80',
    iconColor: 'bg-purple-100 text-purple-700',
  },
];

export const Strengths: React.FC<StrengthsProps> = ({ className }) => {
  return (
    <motion.section
      id="strengths"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={cn('scroll-mt-24 space-y-8 border-t border-neutral-200/80 pt-14', className)}
    >
      <div className="space-y-1">
        <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">Strengths & Character</span>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">나의 강점 💪</h2>
        <p className="text-sm text-neutral-500">현장 경험을 통해 입증된 문제 해결력과 공인 캐릭터 강점입니다.</p>
      </div>

      {/* 1. 실전 경험 기반 강점 카드 */}
      <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-2xs sm:p-7">
        <div className="flex items-center gap-2 text-neutral-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white">
            <Award className="h-4 w-4" />
          </span>
          <h3 className="text-base font-bold">실전 경험 기반의 핵심 강점</h3>
        </div>

        <ul className="mt-5 space-y-3.5 text-sm text-neutral-600">
          <li className="flex items-start gap-3 rounded-xl bg-neutral-50/70 p-3.5 transition-colors hover:bg-neutral-50">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <div>
              <strong className="font-semibold text-neutral-900">자연스러운 소통과 대화 주도력:</strong>
              <p className="mt-0.5 text-xs text-neutral-600 sm:text-sm">
                내가 자신 있는 IT/보안 관심사에 대해 상대방의 눈높이에 맞춰 흥미롭고 유익한 대화를 편안하게
                이끌어갑니다.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3 rounded-xl bg-neutral-50/70 p-3.5 transition-colors hover:bg-neutral-50">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <div>
              <strong className="font-semibold text-neutral-900">따뜻한 배려와 수강생 멘토링:</strong>
              <p className="mt-0.5 text-xs text-neutral-600 sm:text-sm">
                이전에 강의를 진행하며 진도를 따라오기 힘들어하는 수강생들의 어려움을 세심하게 파악하고 끝까지
                도와주었습니다.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/30 p-3.5">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
            <div>
              <strong className="font-semibold text-neutral-900">보이스피싱 예방 교육 & 침착한 위기 대응:</strong>
              <p className="mt-0.5 text-xs text-neutral-600 sm:text-sm">
                보이스피싱 예방 교육을 주도하고, 실제 위기 상황 발생 시 당황하지 않고 침착하게 대응 조치를 수행하여
                추가적인 피해가 발생하지 않도록 방어했습니다.
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* 2. VIA 캐릭터 강점 검사 Top 5 */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-neutral-900">VIA 캐릭터 강점 검사 (Top 5)</h3>
            <p className="text-xs text-neutral-500">과학적인 긍정심리학 프레임워크 기반 나의 대표 덕목</p>
          </div>
          <span className="self-start rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-600 shadow-2xs sm:self-auto">
            VIA Character Strengths
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VIA_TOP_5.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-2xs transition-all hover:border-neutral-300 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={cn('flex h-10 w-10 items-center justify-center rounded-xl', item.iconColor)}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className={cn('rounded-full border px-2.5 py-0.5 text-xs font-bold', item.badgeColor)}>
                      {item.rank}위 · {item.category}
                    </span>
                  </div>
                  <h4 className="mt-3.5 text-base font-bold text-neutral-900">{item.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-600 sm:text-sm">{item.description}</p>
                </div>
              </motion.div>
            );
          })}

          {/* 영역별 종합 요약 카드 */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-linear-to-br from-neutral-50 to-neutral-100/50 p-5 shadow-2xs"
          >
            <div>
              <span className="text-[10px] font-extrabold tracking-wider text-neutral-400 uppercase">
                CATEGORY SUMMARY
              </span>
              <h4 className="mt-1 text-sm font-bold text-neutral-900">영역별 강점 분포</h4>
              <div className="mt-3 space-y-2 text-xs text-neutral-700">
                <div className="rounded-lg border border-neutral-200/60 bg-white p-2">
                  <span className="font-bold text-neutral-900">초월:</span> 유머(5위), 영성(6위), 희망(8위)
                </div>
                <div className="rounded-lg border border-neutral-200/60 bg-white p-2">
                  <span className="font-bold text-neutral-900">지혜:</span> 호기심(3위), 학구열(7위), 판단력(16위)
                </div>
                <div className="rounded-lg border border-neutral-200/60 bg-white p-2">
                  <span className="font-bold text-neutral-900">용기:</span> 열정(12위), 진실성(13위), 인내(15위)
                </div>
              </div>
            </div>
            <p className="mt-3 border-t border-neutral-200 pt-2 text-[11px] text-neutral-500">
              인간관계의 유대감과 끊임없는 호기심이 저의 가장 큰 원동력입니다.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Strengths;
