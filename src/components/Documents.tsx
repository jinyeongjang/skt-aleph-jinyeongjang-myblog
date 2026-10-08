import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  UserCheck,
  Briefcase,
  Download,
  Copy,
  Check,
  GraduationCap,
  Award,
  ShieldCheck,
  HeartHandshake,
  Compass,
} from 'lucide-react';
import { APPLICATION_DOCUMENTS, STUDENT_INFO } from '../data/portfolioData';

type DocTab = 'resume' | 'coverletter' | 'career';

export const Documents: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DocTab>('resume');
  const [copied, setCopied] = useState(false);

  const getDocTextForCopy = () => {
    if (activeTab === 'resume') {
      return `[이력서]\n성명: ${APPLICATION_DOCUMENTS.resume.studentName}\n연락처: ${APPLICATION_DOCUMENTS.resume.contact}\n교육: ${APPLICATION_DOCUMENTS.resume.courseInfo.title} (${APPLICATION_DOCUMENTS.resume.courseInfo.period})\n학력: ${APPLICATION_DOCUMENTS.resume.education[0].school} ${APPLICATION_DOCUMENTS.resume.education[0].major}`;
    } else if (activeTab === 'coverletter') {
      return `[자기소개서]\n${APPLICATION_DOCUMENTS.coverLetter.title}\n\n${APPLICATION_DOCUMENTS.coverLetter.body}`;
    } else {
      return `[경력기술서]\n${APPLICATION_DOCUMENTS.careerDescription.title}\n\n${APPLICATION_DOCUMENTS.careerDescription.tasks
        .map((t) => `[${t.taskNumber}] ${t.title} (${t.period}) - ${t.competency}\n  ${t.oneLineSummary}`)
        .join('\n')}`;
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getDocTextForCopy());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const competencyBadge = (comp: string) => {
    switch (comp) {
      case '자기조절력':
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            <ShieldCheck className="h-3 w-3" />
            <span>자기조절력</span>
          </span>
        );
      case '대인관계력':
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-extrabold text-blue-800 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
            <HeartHandshake className="h-3 w-3" />
            <span>대인관계력</span>
          </span>
        );
      case '자기동기력':
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-extrabold text-amber-800 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
            <Compass className="h-3 w-3" />
            <span>자기동기력</span>
          </span>
        );
    }
  };

  return (
    <section id="documents" className="scroll-mt-24 space-y-8">
      {/* 섹션 헤더 */}
      <div className="flex flex-col justify-between gap-4 border-b border-neutral-200/80 pb-5 sm:flex-row sm:items-end dark:border-neutral-800">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100/90 px-3 py-0.5 text-xs font-bold text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-neutral-200">
            <FileText className="h-3.5 w-3.5" />
            <span>보낼 수 있는 문서 (이력서 · 자기소개서 · 경력기술서)</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
            지원 문서 3종 (BRA-C07, BRA-C08, BRA-C21)
          </h2>
          <p className="text-xs text-neutral-600 sm:text-sm dark:text-neutral-400">
            오늘 바로 채용 지원서에 붙일 수 있는 문서입니다. (비밀번호 없이 무로그인 열람 및 다운로드)
          </p>
        </div>

        {/* 파일 다운로드 & 복사 버튼 그룹 */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/downloads/resume-coverletter-portfolio.docx"
            download
            className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-900 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            <Download className="h-3.5 w-3.5" />
            <span>DOCX 다운로드</span>
          </a>
          <a
            href="/downloads/resume-coverletter-portfolio.md"
            download
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-bold text-neutral-700 shadow-2xs transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            <span>MD</span>
          </a>
          <a
            href="/downloads/resume-coverletter-portfolio.txt"
            download
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-bold text-neutral-700 shadow-2xs transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            <span>TXT</span>
          </a>
          <button
            onClick={handleCopy}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-bold text-neutral-700 shadow-2xs transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
            title="현재 탭 내용 복사"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? '복사됨' : '복사'}</span>
          </button>
        </div>
      </div>

      {/* 3대 탭 전환 헤더 */}
      <div className="flex rounded-2xl border border-neutral-200 bg-neutral-100/80 p-1.5 dark:border-neutral-800 dark:bg-neutral-900/80">
        <button
          type="button"
          onClick={() => setActiveTab('resume')}
          className={`flex-1 rounded-xl py-2.5 text-center text-xs font-bold transition-all sm:text-sm ${
            activeTab === 'resume'
              ? 'bg-white text-neutral-900 shadow-xs dark:bg-neutral-800 dark:text-white'
              : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5">
            <UserCheck className="h-4 w-4" />
            <span>01. 이력서 (Resume)</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('coverletter')}
          className={`flex-1 rounded-xl py-2.5 text-center text-xs font-bold transition-all sm:text-sm ${
            activeTab === 'coverletter'
              ? 'bg-white text-neutral-900 shadow-xs dark:bg-neutral-800 dark:text-white'
              : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5">
            <FileText className="h-4 w-4" />
            <span>02. 자기소개서 (1,500자 본문)</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('career')}
          className={`flex-1 rounded-xl py-2.5 text-center text-xs font-bold transition-all sm:text-sm ${
            activeTab === 'career'
              ? 'bg-white text-neutral-900 shadow-xs dark:bg-neutral-800 dark:text-white'
              : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5">
            <Briefcase className="h-4 w-4" />
            <span>03. 경력기술서 (12대 과제 STAR)</span>
          </div>
        </button>
      </div>

      {/* 탭 내용 영역 */}
      <AnimatePresence mode="wait">
        {activeTab === 'resume' && (
          <motion.div
            key="resume"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-6 rounded-3xl border border-neutral-200/90 bg-white/95 p-6 shadow-sm backdrop-blur-md sm:p-8 dark:border-neutral-800 dark:bg-neutral-900/95"
          >
            {/* 기본 프로필 */}
            <div className="flex flex-col justify-between gap-4 border-b border-neutral-100 pb-6 sm:flex-row sm:items-center dark:border-neutral-800">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-neutral-900 dark:text-white">
                  {APPLICATION_DOCUMENTS.resume.studentName}
                </h3>
                <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">{STUDENT_INFO.oneLiner}</p>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-xs dark:border-neutral-800 dark:bg-neutral-800/60">
                <div className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400">
                  공개 연락처 (1개만 명시)
                </div>
                <div className="font-mono font-bold text-neutral-900 dark:text-neutral-100">
                  {APPLICATION_DOCUMENTS.resume.contact}
                </div>
              </div>
            </div>

            {/* 교육 과정 및 출석 실적 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-black text-neutral-900 dark:text-white">
                <Briefcase className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>실무 집중 교육 이력</span>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 dark:border-neutral-800 dark:bg-neutral-800/40">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                  <div className="font-bold text-neutral-900 dark:text-white">
                    {APPLICATION_DOCUMENTS.resume.courseInfo.title}
                  </div>
                  <div className="text-xs font-semibold text-neutral-500">
                    {APPLICATION_DOCUMENTS.resume.courseInfo.period}
                  </div>
                </div>
                <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-300">
                  • 기관: {APPLICATION_DOCUMENTS.resume.courseInfo.institution}
                  <br />• 13주 동안 65일 전수 출석(100%, 지각 0회, 결석 0회) 및 12개 실무 과제 전수 완료
                </div>
              </div>
            </div>

            {/* 학력 사항 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-black text-neutral-900 dark:text-white">
                <GraduationCap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>학력 사항</span>
              </div>
              {APPLICATION_DOCUMENTS.resume.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 dark:border-neutral-800 dark:bg-neutral-800/40"
                >
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                    <div className="font-bold text-neutral-900 dark:text-white">{edu.school}</div>
                    <div className="text-xs font-semibold text-neutral-500">{edu.period}</div>
                  </div>
                  <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">
                    {edu.major} ({edu.status})
                  </div>
                </div>
              ))}
            </div>

            {/* 자격증 및 수상 */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-black text-neutral-900 dark:text-white">
                  <Award className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <span>공인 자격증 ({APPLICATION_DOCUMENTS.resume.certifications.length}종)</span>
                </div>
                <div className="space-y-2">
                  {APPLICATION_DOCUMENTS.resume.certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-3 text-xs dark:border-neutral-800 dark:bg-neutral-800/40"
                    >
                      <div className="font-bold text-neutral-900 dark:text-white">{cert.title}</div>
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        {cert.issuer} ({cert.date})
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-black text-neutral-900 dark:text-white">
                  <Award className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                  <span>수상 및 표창</span>
                </div>
                <div className="space-y-2">
                  {APPLICATION_DOCUMENTS.resume.awards.map((award, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-3 text-xs dark:border-neutral-800 dark:bg-neutral-800/40"
                    >
                      <div className="font-bold text-neutral-900 dark:text-white">{award.title}</div>
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        {award.issuer} ({award.date})
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'coverletter' && (
          <motion.div
            key="coverletter"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-6 rounded-3xl border border-neutral-200/90 bg-white/95 p-6 shadow-sm backdrop-blur-md sm:p-8 dark:border-neutral-800 dark:bg-neutral-900/95"
          >
            <div className="border-b border-neutral-100 pb-4 dark:border-neutral-800">
              <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400">
                [자기소개서 본문 — 카드 1의 이야기 전수 수록]
              </span>
              <h3 className="mt-1 text-xl font-black text-neutral-900 dark:text-white">
                {APPLICATION_DOCUMENTS.coverLetter.title}
              </h3>
            </div>

            <div className="space-y-5 text-sm leading-relaxed text-neutral-800 sm:text-base sm:leading-loose dark:text-neutral-200">
              {APPLICATION_DOCUMENTS.coverLetter.body.split('\n\n').map((para, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'career' && (
          <motion.div
            key="career"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-6 rounded-3xl border border-neutral-200/90 bg-white/95 p-6 shadow-sm backdrop-blur-md sm:p-8 dark:border-neutral-800 dark:bg-neutral-900/95"
          >
            <div className="border-b border-neutral-100 pb-4 dark:border-neutral-800">
              <span className="text-[11px] font-extrabold text-purple-600 dark:text-purple-400">
                [경력기술서 규격 (BRA-C08) — 과제 하나당 한 줄 & 세 능력 및 STAR]
              </span>
              <h3 className="mt-1 text-xl font-black text-neutral-900 dark:text-white">
                {APPLICATION_DOCUMENTS.careerDescription.title}
              </h3>
            </div>

            <div className="space-y-3">
              {APPLICATION_DOCUMENTS.careerDescription.tasks.map((task) => (
                <div
                  key={task.taskNumber}
                  className="rounded-2xl border border-neutral-200 bg-neutral-50/60 p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800/40 dark:hover:bg-neutral-800/70"
                >
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-neutral-900 dark:text-white">
                        {task.taskNumber} · {task.title}
                      </span>
                      {competencyBadge(task.competency)}
                    </div>
                    <span className="text-[11px] font-semibold text-neutral-500">{task.period}</span>
                  </div>

                  {/* STAR 1줄 서술 */}
                  <div className="mt-2 text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
                    <span className="font-bold text-neutral-900 dark:text-white">STAR 요약: </span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">(S)</span> {task.situation} ➔{' '}
                    <span className="font-bold text-blue-600 dark:text-blue-400">(A)</span> {task.action} ➔{' '}
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">(R)</span> {task.result}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Documents;
