import React from 'react';
import { motion } from 'framer-motion';
import { Award, FileText, ExternalLink, Download, Sparkles, Play, ShieldCheck } from 'lucide-react';
import { FEATURED_WORKS } from '../data/portfolioData';

interface FeaturedWorksProps {
  onOpenApp?: () => void;
}

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const FeaturedWorks: React.FC<FeaturedWorksProps> = ({ onOpenApp }) => {
  return (
    <section id="featured" className="scroll-mt-24 space-y-8">
      {/* 섹션 헤더 */}
      <div className="space-y-1.5 border-b border-neutral-200/80 pb-5 dark:border-neutral-800">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100/90 px-3 py-0.5 text-xs font-bold text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-neutral-200">
          <Award className="h-3.5 w-3.5" />
          <span>대표작 자리 (10번 논문 & 13번 논문 반영 앱)</span>
        </div>
        <h2 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
          대표작 자리 (과제 BR-B & BRB-C10)
        </h2>
        <p className="text-xs text-neutral-600 sm:text-sm dark:text-neutral-400">
          대표작 자리에는 10번 연구 논문과, 논문의 실측 결과를 실제 사용하는 애플리케이션(AgentTopology Lab)이 나란히
          공개 배치되어 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {FEATURED_WORKS.map((work) => {
          const isApp = work.id === 'work-app-13';

          return (
            <motion.div
              key={work.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-white/95 p-6 shadow-md backdrop-blur-md sm:p-7 dark:bg-neutral-900/95 ${
                isApp
                  ? 'border-indigo-200/90 shadow-indigo-500/5 dark:border-indigo-900/60'
                  : 'border-blue-200/80 shadow-blue-500/5 dark:border-blue-900/60'
              }`}
            >
              <div
                className={`absolute top-0 right-0 left-0 h-1.5 ${
                  isApp
                    ? 'bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500'
                    : 'bg-linear-to-r from-blue-600 via-indigo-600 to-cyan-500'
                }`}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-black ${
                      isApp
                        ? 'border-indigo-200 bg-indigo-50 text-indigo-800 dark:border-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-300'
                        : 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950/70 dark:text-blue-300'
                    }`}
                  >
                    {isApp ? (
                      <Play className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                    ) : (
                      <FileText className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    )}
                    <span>{work.badge}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                    <Sparkles className="h-3 w-3" />
                    {work.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base leading-snug font-black break-keep text-neutral-900 sm:text-lg dark:text-white">
                    {work.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    <span>{work.author}</span>
                    <span>•</span>
                    <span>{work.releaseDate}</span>
                  </div>
                </div>

                {/* 이 앱이 누구를 어떻게 돕는가 한 문장 (BRB-C10) */}
                {work.oneSentenceHelp && (
                  <div className="rounded-2xl border border-indigo-200/80 bg-indigo-50/60 p-3.5 text-xs dark:border-indigo-900/60 dark:bg-indigo-950/40">
                    <div className="text-[11px] font-black tracking-wider text-indigo-900 uppercase dark:text-indigo-300">
                      누구를 어떻게 돕는가 (BRB-C10):
                    </div>
                    <p className="mt-1 leading-relaxed font-semibold break-keep text-neutral-800 dark:text-neutral-200">
                      "{work.oneSentenceHelp}"
                    </p>
                  </div>
                )}

                <p className="text-xs leading-relaxed break-keep text-neutral-600 sm:text-sm dark:text-neutral-300">
                  {work.description}
                </p>

                {/* 핵심 실측 성과 & 기능 지표 */}
                <div
                  className={`rounded-2xl border p-4 ${
                    isApp
                      ? 'border-indigo-100 bg-indigo-50/40 dark:border-indigo-950 dark:bg-indigo-950/20'
                      : 'border-blue-100 bg-blue-50/50 dark:border-blue-950 dark:bg-blue-950/30'
                  }`}
                >
                  <div
                    className={`text-[11px] font-extrabold ${
                      isApp ? 'text-indigo-900 dark:text-indigo-300' : 'text-blue-900 dark:text-blue-300'
                    }`}
                  >
                    {isApp ? '애플리케이션 핵심 기능 & 실증 반영 지표:' : '핵심 연구 실증 성과 & 가설 검증 결과:'}
                  </div>
                  <ul className="mt-2 space-y-1.5 text-xs break-keep text-neutral-700 dark:text-neutral-300">
                    {work.keyMetrics.map((metric, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span
                          className={`font-bold ${
                            isApp ? 'text-indigo-600 dark:text-indigo-400' : 'text-blue-600 dark:text-blue-400'
                          }`}
                        >
                          •
                        </span>
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 동료의 한 줄 감상 (이름 없이 · BRB-C11) */}
                {work.peerReview && (
                  <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/80 p-3 text-xs dark:border-neutral-800 dark:bg-neutral-800/60">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                      <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                      <span>동료 평가 (BRB-C11)</span>
                    </div>
                    <p className="mt-1 text-xs break-keep text-neutral-700 italic dark:text-neutral-300">
                      {work.peerReview}
                    </p>
                  </div>
                )}
              </div>

              {/* 액션 버튼들 */}
              <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-neutral-100 pt-4 dark:border-neutral-800">
                {isApp ? (
                  <>
                    {onOpenApp ? (
                      <button
                        type="button"
                        onClick={onOpenApp}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-indigo-700"
                      >
                        <Play className="h-3.5 w-3.5 fill-white" />
                        <span>애플리케이션 열기</span>
                      </button>
                    ) : (
                      <a
                        href="?page=paper-app"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-indigo-700"
                      >
                        <Play className="h-3.5 w-3.5 fill-white" />
                        <span>애플리케이션 열기</span>
                      </a>
                    )}
                    {work.downloadUrl && (
                      <a
                        href={work.downloadUrl}
                        download
                        className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-bold text-neutral-700 shadow-2xs transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>독립 실행 묶음(ZIP) 다운로드</span>
                      </a>
                    )}
                    {work.repoUrl && (
                      <a
                        href={work.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-bold text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </>
                ) : (
                  <>
                    {work.liveUrl && (
                      <a
                        href={work.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>논문 라이브 뷰어</span>
                      </a>
                    )}
                    {work.downloadUrl && (
                      <a
                        href={work.downloadUrl}
                        download
                        className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-bold text-neutral-700 shadow-2xs transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>논문 DOCX 다운로드</span>
                      </a>
                    )}
                    {work.repoUrl && (
                      <a
                        href={work.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-bold text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedWorks;
