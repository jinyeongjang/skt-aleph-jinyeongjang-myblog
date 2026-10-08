import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Compass,
  Copy,
  Check,
  Quote,
  Flame,
} from 'lucide-react';
import { MAIN_STORY } from '../data/portfolioData';

export const Story: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyStory = async () => {
    try {
      await navigator.clipboard.writeText(MAIN_STORY.fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const competencyIcon = (competency: string) => {
    switch (competency) {
      case '자기조절력':
        return <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      case '대인관계력':
        return <HeartHandshake className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case '자기동기력':
      default:
        return <Compass className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
    }
  };

  const competencyBadgeColor = (competency: string) => {
    switch (competency) {
      case '자기조절력':
        return 'border-emerald-200/80 bg-emerald-50/80 text-emerald-800 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-300';
      case '대인관계력':
        return 'border-blue-200/80 bg-blue-50/80 text-blue-800 dark:border-blue-800/60 dark:bg-blue-950/40 dark:text-blue-300';
      case '자기동기력':
      default:
        return 'border-amber-200/80 bg-amber-50/80 text-amber-800 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-300';
    }
  };

  return (
    <section id="story" className="scroll-mt-24 space-y-8">
      {/* 섹션 헤더 */}
      <div className="flex flex-col justify-between gap-4 border-b border-neutral-200/80 pb-5 sm:flex-row sm:items-end dark:border-neutral-800">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100/90 px-3 py-0.5 text-xs font-bold text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-neutral-200">
            <BookOpen className="h-3.5 w-3.5" />
            <span>사이트의 본편 · 내 이야기 (11번 소설 사실 환원)</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
            {MAIN_STORY.title}
          </h2>
          <p className="text-xs text-neutral-600 sm:text-sm dark:text-neutral-400">
            고난에서 시작해 다시 일어나고 더 나아진 지금에 이르는 1,500자 자기소개 본편입니다. (BRA-C01 ~ BRA-C04)
          </p>
        </div>

        {/* 글자 수 카운터 및 복사 버튼 */}
        <div className="flex items-center gap-2">
          <div className="rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-right shadow-2xs dark:border-neutral-800 dark:bg-neutral-900">
            <div className="text-[10px] font-medium text-neutral-500">본편 분량 (1,500자 안팎)</div>
            <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
              공백 포함 <span className="text-blue-600 dark:text-blue-400">{MAIN_STORY.charCountWithSpaces}자</span> ·
              공백 제외 {MAIN_STORY.charCountWithoutSpaces}자
            </div>
          </div>
          <button
            onClick={handleCopyStory}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-bold text-neutral-700 shadow-2xs transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
            title="본편 이야기 텍스트 복사"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? '복사 완료' : '본편 복사'}</span>
          </button>
        </div>
      </div>

      {/* 내 손으로 쓴 첫 문장 강조 배너 (BRA-C04: 날짜 있는 장면으로 시작) */}
      <div className="rounded-2xl border border-rose-200/80 bg-rose-50/50 p-4 sm:p-5 dark:border-rose-900/40 dark:bg-rose-950/20">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-rose-500/10 p-2 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400">
            <Calendar className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-rose-700 dark:text-rose-400">
                [내 손으로 쓴 첫 문장 · 날짜 있는 장면]
              </span>
              <span className="py-0.2 rounded-full bg-rose-200/80 px-2 text-[10px] font-bold text-rose-800 dark:bg-rose-900/60 dark:text-rose-300">
                {MAIN_STORY.hardshipDate}
              </span>
            </div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">"{MAIN_STORY.firstSentence}"</p>
          </div>
        </div>
      </div>

      {/* 본편 이야기 카드 (글래스모피즘 아티클) */}
      <div className="relative rounded-3xl border border-neutral-200/90 bg-white/95 p-6 shadow-sm backdrop-blur-md sm:p-8 dark:border-neutral-800 dark:bg-neutral-900/90">
        <div className="absolute top-6 right-6 text-neutral-300 dark:text-neutral-700">
          <Quote className="h-8 w-8 opacity-40" />
        </div>

        <article className="prose prose-neutral dark:prose-invert max-w-none text-neutral-800 sm:text-base dark:text-neutral-200">
          <div className="space-y-5 text-sm leading-relaxed sm:text-base sm:leading-loose">
            {MAIN_STORY.fullText.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* 내 손으로 쓴 마지막 문장 강조 */}
        <div className="mt-6 rounded-2xl border border-blue-200/80 bg-blue-50/50 p-4 sm:p-5 dark:border-blue-900/40 dark:bg-blue-950/20">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg bg-blue-500/10 p-2 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-blue-700 dark:text-blue-400">
                [내 손으로 쓴 마지막 문장 · 앞으로의 다짐]
              </span>
              <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">"{MAIN_STORY.lastSentence}"</p>
            </div>
          </div>
        </div>
      </div>

      {/* 세 능력(자기조절력 · 대인관계력 · 자기동기력) 장면 분석 카드 (BRA-C02) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-amber-500" />
          <h3 className="text-lg font-black text-neutral-900 dark:text-white">
            이야기 속에서 자란 세 능력과 장면 근거 (BRA-C02)
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {MAIN_STORY.threeCompetencies.map((comp) => (
            <motion.div
              key={comp.competency}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-white/95 p-5 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900/90"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-extrabold ${competencyBadgeColor(
                      comp.competency,
                    )}`}
                  >
                    {competencyIcon(comp.competency)}
                    <span>{comp.competency}</span>
                  </span>
                  <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">{comp.date}</span>
                </div>

                <h4 className="text-sm font-black text-neutral-900 dark:text-white">{comp.title}</h4>

                <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">{comp.scene}</p>
              </div>

              <div className="mt-4 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400">관찰된 결과:</div>
                <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">{comp.outcome}</div>
                <div className="mt-1 text-[10px] text-neutral-500 dark:text-neutral-400">
                  <span className="font-bold">근거:</span> {comp.evidence}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 고난 장면과 회복탄력성 짝짓기 배너 (Condition 12-2, 12-5) */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-100/80 p-5 dark:border-neutral-800 dark:bg-neutral-900/80">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-neutral-800 px-2 py-0.5 text-[11px] font-extrabold text-white dark:bg-neutral-200 dark:text-neutral-900">
                고난 ↔ 회복탄력성 짝짓기
              </span>
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                13주 기록의 숫자로 뒷받침
              </span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">{MAIN_STORY.pairingWithNumbers}</p>
          </div>
          <a
            href="#numbers"
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-neutral-900 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            13주 숫자 기록 보기
          </a>
        </div>
      </div>
    </section>
  );
};

export default Story;
