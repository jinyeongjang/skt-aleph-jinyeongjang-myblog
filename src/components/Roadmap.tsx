import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, ShieldCheck, XCircle, Quote, Flame, Calendar, Heart, Trophy } from 'lucide-react';
import { cn } from '../lib/utils';

interface RoadmapProps {
  className?: string;
}

const TIMELINE_STEPS = [
  {
    step: '01',
    title: '기초 확립',
    period: '2026.03 ~ 04',
    desc: 'TCP/IP 네트워크 구조 및 리눅스 보안 기초 체화',
    status: 'current',
  },
  {
    step: '02',
    title: '심화 실습',
    period: '2026.05 ~ 06',
    desc: '보안 취약점 분석, 방화벽 및 인프라 침해사고 대응',
    status: 'upcoming',
  },
  {
    step: '03',
    title: '실전 프로젝트',
    period: '2026.07 ~ 08',
    desc: '엔터프라이즈 환경 모의 구축 및 성과 포트폴리오 완성',
    status: 'upcoming',
  },
  {
    step: '04',
    title: '커리어 도약',
    period: '2026.08 ~',
    desc: '워라밸과 성장이 보장되는 안정적인 IT 직무 취업',
    status: 'target',
  },
];

const PROHIBITED_LIST = [
  { text: '현실적인 계획 없이 이상적인 목표만 좇기', tip: '실행 가능한 작은 단위로 쪼개기' },
  { text: '주어진 일과 과제를 제때 하지 않고 미루기', tip: '당일 해결 원칙 지키기' },
  { text: '결석이나 조퇴로 학습 흐름을 놓치는 것', tip: '철저한 건강 관리와 시간 약속' },
  { text: '과제나 프로젝트에 소극적이거나 비협조적으로 임하기', tip: '원팀 마인드로 솔선수범' },
  { text: '수업 시간에 집중하지 않고 딴짓하기', tip: '오프라인 집중 환경 유지' },
  { text: '나 자신과의 약속을 가볍게 여기고 어기는 태도', tip: '일일 회고를 통한 자가 점검' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export const Roadmap: React.FC<RoadmapProps> = ({ className }) => {
  // 인터랙티브 응원 하트 수
  const [cheerCount, setCheerCount] = useState(24);
  const [hasCheered, setHasCheered] = useState(false);

  const handleCheer = () => {
    if (!hasCheered) {
      setCheerCount((prev) => prev + 1);
      setHasCheered(true);
    } else {
      setCheerCount((prev) => prev - 1);
      setHasCheered(false);
    }
  };

  return (
    <motion.section
      id="roadmap"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={cn('scroll-mt-24 space-y-10 border-t border-neutral-200/80 pt-14', className)}
    >
      {/* 헤더 */}
      <div className="space-y-1">
        <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">Roadmap & Commitments</span>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">알레프 로드맵 & 다짐 💡</h2>
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/80 bg-amber-50 px-3 py-0.5 text-xs font-semibold text-amber-700">
            <Flame className="h-3.5 w-3.5 text-amber-500" />
            <span>목표 D-Day: 2026.08.28</span>
          </span>
        </div>
        <p className="text-sm text-neutral-500">목표 달성을 위한 단계별 로드맵과 실천 다짐입니다.</p>
      </div>

      {/* 1. 비전 & 궁극적 목적 (모션 인터랙티브 카드) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="group relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-linear-to-br from-white via-white to-amber-50/20 p-6 shadow-2xs transition-all hover:border-amber-300 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
              <Trophy className="h-5 w-5" />
            </span>
            <span className="rounded-full bg-amber-100/80 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
              RESULT
            </span>
          </div>
          <h3 className="mt-4 text-lg font-bold text-neutral-900">워라밸을 보장받는 안정적 직장 근무</h3>
          <p className="mt-2 text-xs leading-relaxed text-neutral-600 sm:text-sm">
            보안과 네트워크 전문성을 갖추고, 일과 삶의 균형이 존중되는 건강한 기업에서 역량을 마음껏 펼칩니다.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="group relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-linear-to-br from-white via-white to-sky-50/20 p-6 shadow-2xs transition-all hover:border-sky-300 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-800 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
              <Compass className="h-5 w-5" />
            </span>
            <span className="rounded-full bg-sky-100/80 px-2.5 py-0.5 text-[11px] font-bold text-sky-800">PURPOSE</span>
          </div>
          <h3 className="mt-4 text-lg font-bold text-neutral-900">목표를 이룸으로써 안정적인 삶 실현</h3>
          <p className="mt-2 text-xs leading-relaxed text-neutral-600 sm:text-sm">
            스스로 정한 배움의 목표를 차분히 완수하여 주도적인 삶의 안정을 구축하고 소중한 사람들과 나눕니다.
          </p>
        </motion.div>
      </motion.div>

      {/* 2. 4단계 타임라인 로드맵 */}
      <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-2xs sm:p-7">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-900">SKT ALEPH 단계별 성장 로드맵</h3>
            <p className="text-xs text-neutral-500">지속 가능한 성장을 위한 마일스톤</p>
          </div>
          <span className="hidden items-center gap-1 text-xs font-semibold text-neutral-500 sm:inline-flex">
            <Calendar className="h-3.5 w-3.5 text-neutral-400" />총 6개월 집중 과정
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TIMELINE_STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className={cn(
                'relative rounded-xl border p-4 transition-all hover:shadow-xs',
                step.status === 'current'
                  ? 'border-emerald-300 bg-emerald-50/40 ring-1 ring-emerald-400/30'
                  : step.status === 'target'
                    ? 'border-amber-300 bg-amber-50/30'
                    : 'border-neutral-200/80 bg-neutral-50/50',
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold tracking-wider text-neutral-400">STEP {step.step}</span>
                {step.status === 'current' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                    진행 중
                  </span>
                )}
                {step.status === 'target' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    최종 목표
                  </span>
                )}
              </div>

              <h4 className="mt-2.5 text-sm font-bold text-neutral-900">{step.title}</h4>
              <span className="text-[11px] font-medium text-neutral-400">{step.period}</span>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. 4개월간의 다짐 서약 (Quote Callout with Glow & Cheer Interaction) */}
      <motion.div
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.2 }}
        className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-white shadow-lg sm:p-8"
      >
        <Quote className="absolute top-4 right-4 h-20 w-20 text-neutral-800/80" />
        <div className="relative space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-md border border-neutral-700 bg-neutral-800/90 px-3 py-1 text-xs font-semibold text-amber-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>나의 4개월 서약 (Pledge)</span>
            </div>

            {/* 응원 인터랙션 버튼 */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={handleCheer}
              className={cn(
                'group flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm transition-all',
                hasCheered
                  ? 'border-rose-500/50 bg-rose-500/20 text-rose-300'
                  : 'border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700',
              )}
              title="장진영 님의 다짐을 응원합니다!"
            >
              <Heart
                className={cn(
                  'h-3.5 w-3.5 transition-transform group-hover:scale-125',
                  hasCheered ? 'fill-rose-400 text-rose-400' : 'text-neutral-400',
                )}
              />
              <span>응원하기 {cheerCount}</span>
            </motion.button>
          </div>

          <div className="space-y-3.5 text-sm leading-relaxed text-neutral-300 sm:text-base">
            <p>
              “저는 넉 달 동안{' '}
              <strong className="font-semibold text-white underline decoration-amber-400/80 underline-offset-4">
                진지하게 수업에 임하고 주어진 과제 및 훌륭한 결과물을 만들어
              </strong>{' '}
              기업에서 눈여겨볼 만한 인재가 되려 합니다.”
            </p>
            <p>
              “그게 저한테{' '}
              <strong className="font-semibold text-white">
                큰 성취가 되고 앞으로의 커리어를 성장시키는 데 확실한 디딤돌
              </strong>
              이 될 것이기 때문입니다.”
            </p>
            <p>
              “그리고{' '}
              <span className="rounded-md border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 font-bold text-amber-300">
                수업 외에 불필요한 과소비와 이유 없는 결석 및 조퇴는 결코 하지 않겠습니다.
              </span>
              ”
            </p>
          </div>

          <div className="flex flex-col gap-2 border-t border-neutral-800 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-medium text-neutral-400 italic">
              “만약 제가 그러고 있지 않다면 언제든 편하게 말씀해 주세요. 여러분이 저의 목격자이자 증인입니다.”
            </p>
            <span className="self-end font-mono text-[11px] text-neutral-500 sm:self-auto">Signed by 장진영</span>
          </div>
        </div>
      </motion.div>

      {/* 5. 금지 목록 (경계할 태도 - 호버 애니메이션 카드) */}
      <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-2xs sm:p-7">
        <div className="flex items-center gap-2 text-rose-700">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100">
            <XCircle className="h-4 w-4" />
          </span>
          <div>
            <h3 className="font-bold text-neutral-900">금지 목록 (경계할 태도)</h3>
            <p className="text-xs text-neutral-500">슬럼프에 빠지지 않고 원칙을 지키기 위해 항상 되새기는 6가지</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PROHIBITED_LIST.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.15 }}
              className="group flex flex-col justify-between rounded-xl border border-rose-100 bg-rose-50/20 p-3.5 transition-colors hover:border-rose-200 hover:bg-rose-50/40"
            >
              <div className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-black text-rose-600">
                  ✕
                </span>
                <span className="text-xs leading-snug font-semibold text-neutral-800 sm:text-sm">{item.text}</span>
              </div>
              <div className="mt-2.5 pl-7">
                <span className="text-[11px] text-neutral-400 transition-colors group-hover:text-neutral-600">
                  💡 극복 행동: {item.tip}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Roadmap;
