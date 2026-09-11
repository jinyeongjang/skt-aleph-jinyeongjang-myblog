import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles, HeartHandshake, UserCheck, Compass } from 'lucide-react';
import { cn } from '../lib/utils';

interface AboutProps {
  className?: string;
}

const PILLARS = [
  {
    icon: Sparkles,
    label: '지속적 성장과 학구열',
    sub: '배움 (Learning)',
    description: '새로운 기술과 지식을 두려움 없이 탐구하며 어제보다 더 나은 내일을 만들어갑니다.',
  },
  {
    icon: HeartHandshake,
    label: '이타적 배려와 나눔',
    sub: '나눔 (Sharing)',
    description: '내가 배운 지식을 동료와 알기 쉽게 나누며 함께 발전하는 시너지를 믿습니다.',
  },
  {
    icon: UserCheck,
    label: '신뢰 기반의 인간관계',
    sub: '연결 (Connection)',
    description: '경청과 온기 있는 소통을 통해 공동체 안에서 든든한 신뢰와 협업 문화를 일굽니다.',
  },
];

export const About: React.FC<AboutProps> = ({ className }) => {
  const [scopeTab, setScopeTab] = React.useState<'public' | 'private'>('public');

  return (
    <motion.section
      id="about"
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
          Self Definition
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
          ‘나’를 한 문장으로 표현한다면
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          일과 삶을 대하는 핵심 가치와 지향점을 소개합니다.
        </p>
      </div>

      {/* 1. 대표 정의 카드 */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xs sm:p-8 dark:border-neutral-800 dark:bg-neutral-900/90">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white shadow-xs dark:bg-white dark:text-neutral-900">
            <Quote className="h-5 w-5" />
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-800/80 dark:text-neutral-300">
            <Compass className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
            <span>나침반 & 지향점</span>
          </span>
        </div>

        {/* 메인 인용구 */}
        <blockquote className="mt-5 text-xl leading-relaxed font-bold tracking-tight text-neutral-900 sm:text-2xl dark:text-white">
          “배움과 나눔에 진심을 다하며, <br className="hidden sm:inline" />
          사람과의 따뜻한 연결 속에서 함께 성장하는 사람.”
        </blockquote>

        {/* 상세 설명 (PDF 자기소개서 철학 반영) */}
        <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-[15px] dark:text-neutral-300">
          나의 지식을 얼마나 많이 갖고 있는가보다 상대방의 눈높이에서 접근하기 쉬운 지식으로 전달하고, 이론에 머무르지
          않고 실습과 체험을 통해 배움의 시간을 보람찬 성취로 전환하는 것을 가장 중요한 나침반으로 삼고 있습니다.
        </p>

        {/* 3대 핵심 기둥 그리드 */}
        <div className="mt-8 grid grid-cols-1 gap-3.5 border-t border-neutral-100 pt-6 sm:grid-cols-3 dark:border-neutral-800">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.label}
                className="group rounded-xl border border-neutral-200/70 bg-neutral-50/50 p-4 transition-all hover:border-neutral-300 hover:bg-white hover:shadow-xs dark:border-neutral-800 dark:bg-neutral-800/50 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
              >
                <div className="mb-2.5 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-200/70 text-neutral-700 transition-colors group-hover:bg-neutral-900 group-hover:text-white dark:bg-neutral-700 dark:text-neutral-200 dark:group-hover:bg-white dark:group-hover:text-neutral-900">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-500 uppercase dark:text-neutral-400">
                    {pillar.sub}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">{pillar.label}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. 대상 및 공개 범위 점검표 (T01-C03, T01-C04, T01-C05, T01-C19, T01-C20, T01-C21 충족) */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-7 dark:border-neutral-800 dark:bg-neutral-900/90">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
              Target & Disclosure Scope
            </span>
            <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
              접근성 상호작용
            </span>
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">페이지 대상 및 정보 공개 범위 점검표</h3>

          {/* 대상과 목적 한 문장 (T01-C03) */}
          <p className="rounded-xl border border-neutral-200/80 bg-neutral-50/80 p-3.5 text-xs leading-relaxed text-neutral-700 sm:text-sm dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-300">
            <strong className="font-semibold text-neutral-900 dark:text-white">페이지의 대상과 목적: </strong>본
            페이지는 SKT ALEPH 과정의 동료 교육생 및 멘토에게 개발자 장진영의 핵심 가치관, 실무 기술 역량, 프로젝트 및
            학습 경험을 투명하게 공유하기 위해 제작되었습니다.
          </p>
        </div>

        {/* 대화형 탭 버튼 (마우스 클릭 T01-C20 & 키보드 Enter/Space T01-C21 지원) */}
        <div
          className="mt-5 flex gap-2 border-b border-neutral-200 pb-3 dark:border-neutral-800"
          role="tablist"
          aria-label="공개 범위 전환"
        >
          <button
            type="button"
            role="tab"
            aria-selected={scopeTab === 'public'}
            onClick={() => setScopeTab('public')}
            className={cn(
              'rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none dark:focus-visible:ring-white',
              scopeTab === 'public'
                ? 'bg-neutral-900 text-white shadow-xs dark:bg-white dark:text-neutral-900'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white',
            )}
          >
            공개 정보 점검표 (3개 항목)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={scopeTab === 'private'}
            onClick={() => setScopeTab('private')}
            className={cn(
              'rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none dark:focus-visible:ring-white',
              scopeTab === 'private'
                ? 'bg-neutral-900 text-white shadow-xs dark:bg-white dark:text-neutral-900'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white',
            )}
          >
            비공개 정보 점검표 (3개 항목)
          </button>
        </div>

        {/* 탭 컨텐츠 */}
        <div className="mt-4">
          {scopeTab === 'public' ? (
            /* 공개할 정보 3개 이상 (T01-C04) */
            <ul className="space-y-2.5 text-xs text-neutral-700 sm:text-sm dark:text-neutral-300">
              <li className="flex items-start gap-2.5 rounded-lg border border-neutral-100 bg-neutral-50/50 p-3 dark:border-neutral-800 dark:bg-neutral-800/40">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  1
                </span>
                <div>
                  <strong className="font-semibold text-neutral-900 dark:text-white">
                    실전 프로젝트 산출물 및 소스코드:{' '}
                  </strong>
                  실제 배포된 6개 프로젝트 라이브 데모 URL과 검증 가능한 GitHub 오픈소스 저장소 전체
                </div>
              </li>
              <li className="flex items-start gap-2.5 rounded-lg border border-neutral-100 bg-neutral-50/50 p-3 dark:border-neutral-800 dark:bg-neutral-800/40">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  2
                </span>
                <div>
                  <strong className="font-semibold text-neutral-900 dark:text-white">
                    실무 경력·학습·자격 및 수상 이력:{' '}
                  </strong>
                  (주)블루커뮤니케이션 부산SW·AI교육거점센터 9개월 매니저, (주)케이티씨에스 2년 1개월 IT강사, 컴퓨터공학
                  학사(3.97/4.5), ITQ·ERP Master 국가공인 자격 및 사상구청장 표창, 복지관 우수강사상
                </div>
              </li>
              <li className="flex items-start gap-2.5 rounded-lg border border-neutral-100 bg-neutral-50/50 p-3 dark:border-neutral-800 dark:bg-neutral-800/40">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  3
                </span>
                <div>
                  <strong className="font-semibold text-neutral-900 dark:text-white">
                    협업 성향 및 STAR 핵심 강점:{' '}
                  </strong>
                  WorkStyle 사용설명서와 STAR 기반 실전 경험(맞춤형 코딩 교육·멘토링, 기술 탐구, SW·AI 거점센터 운영,
                  데이터 기반 문제 해결) 및 408시간 지역 아동 맞춤형 멘토링
                </div>
              </li>
            </ul>
          ) : (
            /* 공개하지 않을 정보 3개 이상 (T01-C05) */
            <ul className="space-y-2.5 text-xs text-neutral-700 sm:text-sm dark:text-neutral-300">
              <li className="flex items-start gap-2.5 rounded-lg border border-neutral-100 bg-neutral-50/50 p-3 dark:border-neutral-800 dark:bg-neutral-800/40">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[11px] font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                  1
                </span>
                <div>
                  <strong className="font-semibold text-neutral-900 dark:text-white">고유 식별 개인정보: </strong>
                  주민등록번호, 생년월일 전체, 상세 자택 주소 등 법적으로 보호되는 민감 식별 개인정보 일체
                </div>
              </li>
              <li className="flex items-start gap-2.5 rounded-lg border border-neutral-100 bg-neutral-50/50 p-3 dark:border-neutral-800 dark:bg-neutral-800/40">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[11px] font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                  2
                </span>
                <div>
                  <strong className="font-semibold text-neutral-900 dark:text-white">개인 사적 연락처: </strong>
                  개인 휴대전화 번호 및 사적인 메신저 ID (공식 이메일 및 GitHub를 통한 소통으로 제한)
                </div>
              </li>
              <li className="flex items-start gap-2.5 rounded-lg border border-neutral-100 bg-neutral-50/50 p-3 dark:border-neutral-800 dark:bg-neutral-800/40">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[11px] font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                  3
                </span>
                <div>
                  <strong className="font-semibold text-neutral-900 dark:text-white">보안 자격 증명 (Secrets): </strong>
                  서버/데이터베이스 접속 비밀번호, 클라우드 Access Key, 외부 API Private Token 등 보안 자격 증명 일체
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default About;
