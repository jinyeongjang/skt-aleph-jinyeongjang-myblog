import React, { useState } from 'react';
import { CheckCircle2, FileCheck, Copy, Check, Award } from 'lucide-react';
import { SUBMISSION_DATA, STUDENT_INFO } from '../data/portfolioData';

export const SubmissionVerify: React.FC = () => {
  const [copied4Lines, setCopied4Lines] = useState(false);
  const [copied3Lines, setCopied3Lines] = useState(false);

  const format4LinesText = () => {
    return `${SUBMISSION_DATA.quickVerification4Lines.whereToGo}\n${SUBMISSION_DATA.quickVerification4Lines.whatToDoIn3Steps}\n${SUBMISSION_DATA.quickVerification4Lines.whatShowsSuccess}\n${SUBMISSION_DATA.quickVerification4Lines.whatShowsFailure}`;
  };

  const format3LinesText = () => {
    return `${SUBMISSION_DATA.aiAndJudgment3Lines.delegatedToAi}\n${SUBMISSION_DATA.aiAndJudgment3Lines.studentJudged}\n${SUBMISSION_DATA.aiAndJudgment3Lines.rejectedAiProposal}`;
  };

  const handleCopy4Lines = async () => {
    try {
      await navigator.clipboard.writeText(format4LinesText());
      setCopied4Lines(true);
      setTimeout(() => setCopied4Lines(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopy3Lines = async () => {
    try {
      await navigator.clipboard.writeText(format3LinesText());
      setCopied3Lines(true);
      setTimeout(() => setCopied3Lines(false), 2000);
    } catch {
      // Fallback
    }
  };

  const checklistItems = [
    { text: '소설에서 자기소개의 본편을 뽑고 각색한 대목을 사실로 되돌렸습니다.', code: 'BRA-C01' },
    { text: '첫 화면에 내 이름과 "…한 사람"으로 끝나는 한 줄 소개를 내 손으로 썼습니다.', code: 'BRA-C03' },
    { text: '13주 기록의 숫자를 3대 출처와 함께 넣고 하나를 고난 장면과 짝지었습니다.', code: 'BRA-C05' },
    { text: '대표작 자리에 10번 논문을 넣고 13번 앱 자리를 마련했습니다.', code: 'BRA-C06' },
    {
      text: '이력서·자기소개서·경력기술서(12개 과제 STAR)를 문서 파일(DOCX/MD/TXT)로 만들었습니다.',
      code: 'BRA-C07, C08',
    },
    {
      text: '장치를 두 번 돌려 같은 결과(SHA-256 해시 100% 일치)가 나오는 것을 새 폴더에서 확인했습니다.',
      code: 'BRA-C09',
    },
    { text: '제출물 어디에도 본인 외 다른 사람의 실명과 비밀값이 없음을 전수 점검했습니다.', code: 'BRA-C10' },
  ];

  return (
    <section id="submission" className="scroll-mt-24 space-y-8">
      {/* 섹션 헤더 */}
      <div className="space-y-1.5 border-b border-neutral-200/80 pb-5 dark:border-neutral-800">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100/90 px-3 py-0.5 text-xs font-bold text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-neutral-200">
          <FileCheck className="h-3.5 w-3.5" />
          <span>과제 12 완주 검증 및 제출 명세 (BR-A)</span>
        </div>
        <h2 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
          완주 체크리스트 및 제출 템플릿 (BRA-C11 ~ BRA-C21)
        </h2>
        <p className="text-xs text-neutral-600 sm:text-sm dark:text-neutral-400">
          짧은 확인 방법 4줄과 AI와 나의 판단 3줄, 무로그인 시크릿 창 열람 검증 명세입니다.
        </p>
      </div>

      {/* 완주 체크리스트 7대 항목 전수 통과 배너 */}
      <div className="rounded-3xl border border-emerald-200/90 bg-emerald-50/50 p-6 shadow-sm backdrop-blur-md sm:p-7 dark:border-emerald-900/50 dark:bg-emerald-950/20">
        <div className="mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-lg font-black text-neutral-900 sm:text-xl dark:text-white">
            과제 12 완주 체크리스트 7대 항목 (100% 완결)
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {checklistItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 rounded-xl border border-emerald-200/80 bg-white/90 p-3 text-xs dark:border-emerald-900/40 dark:bg-neutral-900/90"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <div className="space-y-0.5">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">{item.text}</span>
                <span className="block text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                  [{item.code}]
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 짧은 확인 방법 4줄 카드 (BRA-C11) */}
      <div className="rounded-3xl border border-neutral-200 bg-white/95 p-6 shadow-2xs backdrop-blur-md sm:p-7 dark:border-neutral-800 dark:bg-neutral-900/95">
        <div className="mb-4 flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
          <h3 className="text-base font-black text-neutral-900 sm:text-lg dark:text-white">
            짧은 확인 방법 4줄 (BRA-C11)
          </h3>
          <button
            type="button"
            onClick={handleCopy4Lines}
            className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-bold text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-300"
          >
            {copied4Lines ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied4Lines ? '복사됨' : '4줄 복사'}</span>
          </button>
        </div>

        <div className="space-y-3 text-xs leading-relaxed sm:text-sm">
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3.5 dark:border-neutral-800 dark:bg-neutral-800/40">
            <span className="font-bold text-blue-700 dark:text-blue-400">① 어디로 가나요: </span>
            <span className="text-neutral-800 dark:text-neutral-200">
              {SUBMISSION_DATA.quickVerification4Lines.whereToGo.replace('① 어디로 가나요: ', '')}
            </span>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3.5 dark:border-neutral-800 dark:bg-neutral-800/40">
            <span className="font-bold text-blue-700 dark:text-blue-400">② 3단계 이내 무엇을 하나요: </span>
            <span className="whitespace-pre-line text-neutral-800 dark:text-neutral-200">
              {SUBMISSION_DATA.quickVerification4Lines.whatToDoIn3Steps.replace('② 3단계 이내 무엇을 하나요: ', '')}
            </span>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5 dark:border-emerald-900/40 dark:bg-emerald-950/20">
            <span className="font-bold text-emerald-700 dark:text-emerald-400">③ 무엇이 보이면 통과인가요: </span>
            <span className="text-neutral-800 dark:text-neutral-200">
              {SUBMISSION_DATA.quickVerification4Lines.whatShowsSuccess.replace('③ 무엇이 보이면 통과인가요: ', '')}
            </span>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-3.5 dark:border-rose-900/40 dark:bg-rose-950/20">
            <span className="font-bold text-rose-700 dark:text-rose-400">④ 안 될 때 무엇이 보이나요: </span>
            <span className="text-neutral-800 dark:text-neutral-200">
              {SUBMISSION_DATA.quickVerification4Lines.whatShowsFailure.replace('④ 안 될 때 무엇이 보이나요: ', '')}
            </span>
          </div>
        </div>
      </div>

      {/* AI와 나의 판단 3줄 카드 (BRA-C12) */}
      <div className="rounded-3xl border border-neutral-200 bg-white/95 p-6 shadow-2xs backdrop-blur-md sm:p-7 dark:border-neutral-800 dark:bg-neutral-900/95">
        <div className="mb-4 flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
          <h3 className="text-base font-black text-neutral-900 sm:text-lg dark:text-white">
            AI와 나의 판단 3줄 (BRA-C12)
          </h3>
          <button
            type="button"
            onClick={handleCopy3Lines}
            className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-bold text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-300"
          >
            {copied3Lines ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied3Lines ? '복사됨' : '3줄 복사'}</span>
          </button>
        </div>

        <div className="space-y-3 text-xs leading-relaxed sm:text-sm">
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3.5 dark:border-neutral-800 dark:bg-neutral-800/40">
            <span className="font-bold text-purple-700 dark:text-purple-400">① AI에게 맡긴 일: </span>
            <span className="text-neutral-800 dark:text-neutral-200">
              {SUBMISSION_DATA.aiAndJudgment3Lines.delegatedToAi.replace('① AI에게 맡긴 일: ', '')}
            </span>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3.5 dark:border-neutral-800 dark:bg-neutral-800/40">
            <span className="font-bold text-blue-700 dark:text-blue-400">② 학생이 직접 판단한 일: </span>
            <span className="text-neutral-800 dark:text-neutral-200">
              {SUBMISSION_DATA.aiAndJudgment3Lines.studentJudged.replace('② 학생이 직접 판단한 일: ', '')}
            </span>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3.5 dark:border-neutral-800 dark:bg-neutral-800/40">
            <span className="font-bold text-rose-700 dark:text-rose-400">③ AI 제안을 따르지 않은 일: </span>
            <span className="text-neutral-800 dark:text-neutral-200">
              {SUBMISSION_DATA.aiAndJudgment3Lines.rejectedAiProposal.replace('③ AI 제안을 따르지 않은 일: ', '')}
            </span>
          </div>
        </div>
      </div>

      {/* 무로그인 시크릿 창 무결성 보장 배너 (BRA-C10, BRA-C13, BRA-C20) */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-100/80 p-5 dark:border-neutral-800 dark:bg-neutral-900/80">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-neutral-900 px-2 py-0.5 text-[11px] font-extrabold text-white dark:bg-white dark:text-neutral-900">
                무로그인 시크릿 창 100% 무결성 (BRA-C13, BRA-C20)
              </span>
              <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                HTTPS 배포 URL 단일 제출
              </span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              계정 생성 · 로그인 · 비밀번호 · OAuth · CAPTCHA 없이 모든 기능이 시크릿 창에서 즉시 동작하며, 비밀번호
              필드 0개 및 타인 실명 0건을 준수합니다.
            </p>
          </div>
          <div className="shrink-0 text-right">
            <code className="text-xs font-bold text-blue-600 dark:text-blue-400">{STUDENT_INFO.portfolioUrl}</code>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubmissionVerify;
