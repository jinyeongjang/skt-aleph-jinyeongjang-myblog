import React from 'react';
import { motion } from 'framer-motion';
import { Zap, BatteryLow, Sparkles, BookCheck, MessageSquareHeart, Layers } from 'lucide-react';
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
      className={cn(
        'scroll-mt-24 space-y-8 border-t border-neutral-200/80 pt-12 dark:border-neutral-800/80',
        className,
      )}
    >
      <div className="space-y-1">
        <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
          User Manual & Work Style
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
          작동 방식 & 사용설명서
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          동료들과 최고의 시너지를 내기 위한 장진영 사용 설명서입니다.
        </p>
      </div>

      {/* 1. 저는 이런 사람입니다 */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-7 dark:border-neutral-800 dark:bg-neutral-900/90">
        <div className="flex items-center gap-2 text-neutral-900 dark:text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
            <Sparkles className="h-4 w-4" />
          </span>
          <h3 className="font-bold text-neutral-900 dark:text-white">저는 이런 사람입니다</h3>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-neutral-100 bg-neutral-50/60 p-4 dark:border-neutral-800 dark:bg-neutral-800/50">
            <div className="mb-1.5 flex items-center gap-2">
              <BookCheck className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">눈높이 지식 공유자</h4>
            </div>
            <p className="text-xs leading-relaxed text-neutral-700 sm:text-sm dark:text-neutral-300">
              지식을 혼자 담아두기보다 상대방의 입장에서 이해하기 쉽게 풀어서 나누고 함께 성장할 때 보람을 느낍니다.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-100 bg-neutral-50/60 p-4 dark:border-neutral-800 dark:bg-neutral-800/50">
            <div className="mb-1.5 flex items-center gap-2">
              <MessageSquareHeart className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">경청과 배려의 소통</h4>
            </div>
            <p className="text-xs leading-relaxed text-neutral-700 sm:text-sm dark:text-neutral-300">
              질문을 존중하며 진심으로 경청합니다. 언제든 편하게 질문해주시면 차분하고 따뜻하게 대화를 이끌어갑니다.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-100 bg-neutral-50/60 p-4 dark:border-neutral-800 dark:bg-neutral-800/50">
            <div className="mb-1.5 flex items-center gap-2">
              <Layers className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">실기 중심의 끈기 있는 메이커</h4>
            </div>
            <p className="text-xs leading-relaxed text-neutral-700 sm:text-sm dark:text-neutral-300">
              이론에 머물지 않고 직접 구현하고 실습하며, 복잡한 인프라와 기술적 난제도 끈기 있게 끝까지 해결합니다.
            </p>
          </div>
        </div>
      </div>

      {/* 2. 충전/몰입 vs 방전/주의사항 2열 비교 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* 충전 / 몰입 */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/90">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
              <Zap className="h-4 w-4" />
            </span>
            <h3 className="font-bold text-neutral-900 dark:text-white">충전 & 몰입의 순간 (Energy Up)</h3>
          </div>

          <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-neutral-700 sm:text-sm dark:text-neutral-300">
            <li className="flex items-start gap-2">
              <span className="text-neutral-500 dark:text-neutral-400">•</span>
              <span>대화를 나누며 공감대가 형성되고 적극적인 리액션과 피드백이 오갈 때 큰 에너지를 얻습니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-500 dark:text-neutral-400">•</span>
              <span>
                실제 손으로 만져보고 작동시키는 핸즈온 실습형 프로젝트를 수행할 때 엄청난 몰입도를 발휘합니다.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-500 dark:text-neutral-400">•</span>
              <span>동료나 교육생이 기술적 어려움을 극복하고 "이해되었다"는 피드백을 주었을 때 가장 보람찹니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-500 dark:text-neutral-400">•</span>
              <span>체계적으로 정돈된 환경에서 계획에 맞춰 차근차근 문제를 풀어갈 때 최상의 집중력을 유지합니다.</span>
            </li>
          </ul>
        </div>

        {/* 방전 & 주의사항 */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/90">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
              <BatteryLow className="h-4 w-4" />
            </span>
            <h3 className="font-bold text-neutral-900 dark:text-white">방전 & 주의사항 (Please Note)</h3>
          </div>

          <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-neutral-700 sm:text-sm dark:text-neutral-300">
            <li className="flex items-start gap-2">
              <span className="text-neutral-500 dark:text-neutral-400">•</span>
              <span>
                대화의 흐름이 일방적이거나 차가운 침묵 속에서 눈치를 보아야 하는 환경에서는 에너지가 쉽게 소모됩니다.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-500 dark:text-neutral-400">•</span>
              <span>갑작스러운 기준 변경이나 충분한 협의 없는 촉박한 일정 압박에 직면했을 때 방전되기 쉽습니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-500 dark:text-neutral-400">•</span>
              <span>
                <strong className="font-semibold text-neutral-900 dark:text-white">조심해주세요:</strong> 짧은 맞장구나
                진행 피드백을 남겨주시면 훨씬 편안하고 든든하게 몰입할 수 있습니다.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-500 dark:text-neutral-400">•</span>
              <span>
                <strong className="font-semibold text-neutral-900 dark:text-white">사전 공유:</strong> 협업 시 중요한
                일정이나 변경 사항을 미리 공유해 주시면 꼼꼼하게 사전 점검 후 대응할 수 있습니다.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

export default WorkStyle;
