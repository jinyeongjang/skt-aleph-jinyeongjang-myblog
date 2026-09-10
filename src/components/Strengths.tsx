import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Scale, Sparkles, HandHeart, Smile, Award, CheckCircle2, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

interface StrengthsProps {
  className?: string;
}

const STAR_STRENGTHS = [
  {
    title: '보이스피싱 예방 교육 & 침착한 위기 대응',
    situation:
      '금융 취약 계층 대상 디지털 모바일 교육 현장에서 수강생이 실시간 스미싱 의심 문자에 노출되는 긴급 상황 발생',
    action:
      '사전에 준비한 보이스피싱 대응 매뉴얼에 따라 즉각 링크 접속을 차단하고 악성 앱 설치 여부를 검사하며 계좌 지급정지 절차 신속 안내',
    result: '실제 금전 피해 0건으로 완전 방어 및 교육 참여 어르신 100% 모바일 보안 안심 앱 설치 완료',
    evidence: {
      text: '부산광역시 사상구청장 표창 (2022.12 수상) 및 사회복지빅데이터 학사 실적',
      link: '#education',
      linkText: '학력/이력에서 확인',
    },
  },
  {
    title: '따뜻한 배려와 동료 수강생 멘토링',
    situation:
      'KDT 웹 개발 부트캠프 팀 프로젝트 중 비전공 팀원들이 Git 버전 관리 및 상태 관리 아키텍처에 큰 학습 장벽을 겪음',
    action:
      '주 3회 눈높이 정기 코드 리뷰를 자발적으로 개설하고, 빈출 에러 해결 가이드 문서와 1:1 라이브 페어 프로그래밍 진행',
    result: '팀원 전원 중도 포기 없이 프로젝트를 완주하였으며, 전원 정규 커리큘럼 과제를 우수하게 완수',
    evidence: {
      text: 'Nextrunners OZ Coding School KDT 과제상 수상 및 수료증 취득',
      link: '#education',
      linkText: '부트캠프 수상 내역 확인',
    },
  },
  {
    title: '기술 탐구와 지속적인 실천 학습력',
    situation:
      'SKT ALEPH 보안·네트워크 트랙에서 리눅스 터미널 명령어 및 Python 기반 대용량 로그 분석 자동화의 실무 난제 직면',
    action:
      '매일 학습한 보안 개념을 가상 웹 터미널 실행기와 CSV 스프레드시트 뷰어로 직접 구현하고 인터랙티브 기술 블로그에 지속 연재',
    result: '5개 이상의 핵심 기술 포스트 발행 및 인터랙티브 학습 도구를 오픈소스로 공개 배포',
    evidence: {
      text: 'SKT ALEPH 기술 블로그 및 GitHub 오픈소스 레포지토리',
      link: 'https://skt-aleph-jinyeongblog.vercel.app',
      linkText: '기술 블로그 라이브 데모 방문',
    },
  },
];

const VIA_TOP_5 = [
  {
    rank: '01',
    category: '인류애',
    title: '사랑 (Love)',
    icon: Heart,
    description:
      '타인과의 진솔한 관계를 매우 소중하게 여깁니다. 서로 나누고 보살피는 친밀한 유대를 진심으로 중요하게 생각합니다.',
  },
  {
    rank: '02',
    category: '정의',
    title: '공정성 (Fairness)',
    icon: Scale,
    description:
      '모든 사람을 공평하게 대하는 것을 원칙으로 삼습니다. 사적인 편견으로 결정을 흐리지 않고 균등한 기회를 제공합니다.',
  },
  {
    rank: '03',
    category: '지혜',
    title: '호기심 (Curiosity)',
    icon: Sparkles,
    description:
      '새로운 기술과 지식에 늘 흥미를 느끼며, 끊임없이 질문을 던지고 미지의 영역을 탐구하는 데서 희열을 얻습니다.',
  },
  {
    rank: '04',
    category: '인류애',
    title: '친절 (Kindness)',
    icon: HandHeart,
    description:
      '타인에게 관대하고 자상하며 도움이 필요한 순간을 지나치지 않습니다. 누군가에게 선한 영향력을 베푸는 데서 보람을 느낍니다.',
  },
  {
    rank: '05',
    category: '초월',
    title: '유머 (Humor)',
    icon: Smile,
    description:
      '함께하는 사람들을 미소 짓게 만드는 밝은 에너지를 발산하며, 어려운 난관 속에서도 긍정적인 희망의 면을 발견합니다.',
  },
];

export const Strengths: React.FC<StrengthsProps> = ({ className }) => {
  return (
    <motion.section
      id="strengths"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className={cn('scroll-mt-24 space-y-8 border-t border-neutral-200/80 pt-12', className)}
    >
      <div className="space-y-1">
        <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">Strengths & Character</span>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">나의 강점</h2>
        <p className="text-sm text-neutral-600">현장 경험을 통해 입증된 문제 해결력과 공인 캐릭터 강점입니다.</p>
      </div>

      {/* 1. 실전 경험 기반 강점 카드 (T01-C06 상황, T01-C07 행동, T01-C08 결과, T01-C09 근거 충족) */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5 text-neutral-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white shadow-xs">
              <Award className="h-4 w-4" />
            </span>
            <h3 className="text-base font-bold">실전 경험 기반 핵심 강점 (상황 · 행동 · 결과 · 공개 근거)</h3>
          </div>
          <span className="self-start rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-medium text-neutral-600 sm:self-auto">
            STAR 검증 모델 적용
          </span>
        </div>

        <div className="mt-5 space-y-4">
          {STAR_STRENGTHS.map((item, idx) => (
            <div
              key={item.title}
              className="rounded-xl border border-neutral-200/80 bg-neutral-50/50 p-4 transition-colors hover:border-neutral-300 sm:p-5"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-xs font-bold text-white">
                  0{idx + 1}
                </span>
                <h4 className="text-sm font-bold text-neutral-900 sm:text-base">{item.title}</h4>
              </div>

              {/* 상황 / 행동 / 결과 3분할 그리드 */}
              <div className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                <div className="rounded-lg border border-neutral-200/60 bg-white p-3">
                  <span className="inline-block rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                    상황 (Situation)
                  </span>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-700">{item.situation}</p>
                </div>
                <div className="rounded-lg border border-neutral-200/60 bg-white p-3">
                  <span className="inline-block rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-800">
                    행동 (Action)
                  </span>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-700">{item.action}</p>
                </div>
                <div className="rounded-lg border border-neutral-200/60 bg-white p-3">
                  <span className="inline-block rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                    결과 (Result)
                  </span>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-700">{item.result}</p>
                </div>
              </div>

              {/* 공개 가능한 근거 (T01-C09) */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-200/60 pt-3 text-xs">
                <div className="flex items-center gap-1.5 text-neutral-700">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="font-medium">공개 근거: {item.evidence.text}</span>
                </div>
                <a
                  href={item.evidence.link}
                  target={item.evidence.link.startsWith('http') ? '_blank' : undefined}
                  rel={item.evidence.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1 font-semibold text-neutral-900 underline underline-offset-4 hover:text-neutral-600 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none"
                >
                  <span>{item.evidence.linkText}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. VIA 캐릭터 강점 검사 Top 5 */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-neutral-900">VIA 캐릭터 강점 검사 (Top 5)</h3>
            <p className="text-xs text-neutral-500">과학적인 긍정심리학 프레임워크 기반 나의 대표 덕목</p>
          </div>
          <span className="self-start rounded-full border border-neutral-200 bg-white px-3 py-0.5 text-xs font-medium text-neutral-500 sm:self-auto">
            VIA Strengths
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {VIA_TOP_5.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-300"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="rounded bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
                      {item.rank}위 · {item.category}
                    </span>
                  </div>
                  <h4 className="mt-3.5 text-base font-bold text-neutral-900">{item.title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-600 sm:text-sm">{item.description}</p>
                </div>
              </div>
            );
          })}

          {/* 영역별 종합 요약 카드 */}
          <div className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-neutral-50/60 p-5">
            <div>
              <span className="text-[10px] font-semibold tracking-wider text-neutral-500 uppercase">
                CATEGORY SUMMARY
              </span>
              <h4 className="mt-1 text-sm font-bold text-neutral-900">영역별 강점 분포</h4>
              <div className="mt-3 space-y-2 text-xs text-neutral-700">
                <div className="rounded-lg border border-neutral-200/80 bg-white px-2.5 py-1.5">
                  <span className="font-semibold text-neutral-900">초월:</span> 유머(5위), 영성(6위), 희망(8위)
                </div>
                <div className="rounded-lg border border-neutral-200/80 bg-white px-2.5 py-1.5">
                  <span className="font-semibold text-neutral-900">지혜:</span> 호기심(3위), 학구열(7위), 판단력(16위)
                </div>
                <div className="rounded-lg border border-neutral-200/80 bg-white px-2.5 py-1.5">
                  <span className="font-semibold text-neutral-900">용기:</span> 열정(12위), 진실성(13위), 인내(15위)
                </div>
              </div>
            </div>
            <p className="mt-3 border-t border-neutral-200/60 pt-2 text-[11px] text-neutral-600">
              인간관계의 유대감과 끊임없는 호기심이 저의 가장 큰 원동력입니다.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Strengths;
