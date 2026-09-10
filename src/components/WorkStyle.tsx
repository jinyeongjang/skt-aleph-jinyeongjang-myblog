import React from 'react';
import { motion } from 'framer-motion';
import { Zap, BatteryLow, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface WorkStyleProps {
  className?: string;
}

export const WorkStyle: React.FC<WorkStyleProps> = ({ className }) => {
  return (
    <motion.section
      id="manual"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className={cn('scroll-mt-24 space-y-8 border-t border-neutral-200/80 pt-12', className)}
    >
      <div className="space-y-1">
        <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
          User Manual & Work Style
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">작동 방식 & 사용설명서</h2>
        <p className="text-sm text-neutral-600">동료들과 최고의 시너지를 내기 위한 장진영 사용 설명서입니다.</p>
      </div>

      {/* 1. 저는 이런 사람입니다 */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-7">
        <div className="flex items-center gap-2 text-neutral-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <h3 className="font-bold text-neutral-900">저는 이런 사람입니다</h3>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-neutral-100 bg-neutral-50/60 p-4">
            <h4 className="text-sm font-semibold text-neutral-900">지식 공유자</h4>
            <p className="mt-1.5 text-xs leading-relaxed text-neutral-700 sm:text-sm">
              내가 배운 지식들을 다른 사람에게 알기 쉽게 전달해주는 것을 가장 좋아합니다.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-100 bg-neutral-50/60 p-4">
            <h4 className="text-sm font-semibold text-neutral-900">열린 소통</h4>
            <p className="mt-1.5 text-xs leading-relaxed text-neutral-700 sm:text-sm">
              언제든 편하게 말을 걸어주세요. 따뜻한 분위기 속에서 대화를 자연스럽게 이끌어갈 수 있습니다.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-100 bg-neutral-50/60 p-4">
            <h4 className="text-sm font-semibold text-neutral-900">끈기 있는 메이커</h4>
            <p className="mt-1.5 text-xs leading-relaxed text-neutral-700 sm:text-sm">
              직접 무언가를 만들 때 깊이 몰입하며, 어려운 기술적 문제도 끝까지 인내하며 버텨냅니다.
            </p>
          </div>
        </div>
      </div>

      {/* 2. 충전/몰입 vs 방전/주의사항 2열 비교 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* 충전 / 몰입 */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800">
              <Zap className="h-4 w-4" />
            </span>
            <h3 className="font-bold text-neutral-900">충전 & 몰입의 순간 (Energy Up)</h3>
          </div>

          <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-neutral-700 sm:text-sm">
            <li className="flex items-start gap-2">
              <span className="text-neutral-500">•</span>
              <span>대화를 나누며 공감대가 형성되고 적극적인 반응이 오갈 때 큰 힘을 얻습니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-500">•</span>
              <span>직접 프로젝트를 만들 때 엄청난 몰입을 하며, 어렵더라도 지치지 않고 버텨냅니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-500">•</span>
              <span>AI 도구를 활용해 능동적으로 문제를 해결하고 답을 찾는 과정에서 고도의 집중을 발휘합니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-500">•</span>
              <span>조용하고 안정적인 환경에서 최상의 집중력을 유지합니다.</span>
            </li>
          </ul>
        </div>

        {/* 방전 & 주의사항 */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800">
              <BatteryLow className="h-4 w-4" />
            </span>
            <h3 className="font-bold text-neutral-900">방전 & 주의사항 (Please Note)</h3>
          </div>

          <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-neutral-700 sm:text-sm">
            <li className="flex items-start gap-2">
              <span className="text-neutral-500">•</span>
              <span>대화의 흐름이 끊기거나 침묵 속에서 서로 눈치를 보는 어색한 분위기에서는 에너지가 소모됩니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-500">•</span>
              <span>촉박한 마감 압박이나 정해진 기한 안에 타인의 일방적인 기준을 맞춰야 할 때 방전되기 쉽습니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-500">•</span>
              <span>
                <strong className="font-semibold text-neutral-900">조심해주세요:</strong> 대화할 때 간단한 맞장구나
                피드백 등 반응을 남겨주시면 훨씬 힘이 납니다.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-500">•</span>
              <span>
                <strong className="font-semibold text-neutral-900">사전 공유:</strong> 협업 시 중요한 일정이나 변경
                사항은 사전에 미리 공유해 주시면 차분히 준비할 수 있습니다.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

export default WorkStyle;
