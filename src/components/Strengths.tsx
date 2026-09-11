import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

interface StrengthsProps {
  className?: string;
}

const STAR_STRENGTHS = [
  {
    title: '눈높이 맞춤형 실기 코딩 교육 & 동료 멘토링',
    situation:
      '만덕도서관 들락날락·지역아동센터 어린이 코딩 교육 및 KDT 웹 개발 부트캠프 팀 프로젝트 중 학습자들의 큰 편차와 기술 장벽 발생',
    action:
      '이론보다 실습(엔트리, AI스피커, 스마트홈, 카미봇) 중심의 참여형 콘텐츠를 구성하고, 부트캠프에서는 주 3회 정기 코드 리뷰와 1:1 라이브 페어 프로그래밍 진행',
    result:
      '부산 북구 동원종합사회복지관 우수강사 표창 선정, 408시간 지역 멘토링 완수 및 KDT 부트캠프 팀원 전원 완주 이끔',
    evidence: {
      text: '동원종합사회복지관 우수강사 표창 (2023.12.20) & KDT 과제상',
      link: '#education',
      linkText: '수상/표창 내역 확인',
    },
  },
  {
    title: '기술 탐구와 지속적인 실천 학습력',
    situation:
      'AWS 클라우드 인프라와 SKT ALEPH 보안·네트워크 트랙에서 리눅스 터미널 환경 및 Python 대용량 로그 분석 자동화의 실무 난제 직면',
    action:
      'AWS 본사 JAM 해커톤에 직접 참여하여 핸즈온 역량을 배양하고, 매일 학습한 보안 개념을 가상 웹 터미널 실행기와 CSV 뷰어로 직접 구현하여 오픈소스로 공개 연재',
    result: 'AWS Jam 해커톤 공식 수료 및 SKT ALEPH 인터랙티브 기술 블로그에 5건 이상의 핵심 기술 포스트 발행',
    evidence: {
      text: 'AWS Jam 교육수료증 (2024.06.25) & SKT ALEPH 기술 블로그',
      link: 'https://skt-aleph-jinyeongblog.vercel.app',
      linkText: '기술 블로그 라이브 데모 방문',
    },
  },
  {
    title: 'SW·AI 체험실 운영 체계화 & 교구 안전 관리',
    situation:
      '부산SW·AI교육거점센터 체험실 및 교육실 내 다양한 디지털 교구(로봇, 센서 보드 등)와 다수 교육생 방문으로 인한 실습 장비 분실·파손 및 안전사고 위험 존재',
    action:
      'SW·AI 교육용 교구 및 부자재 자산 관리 대장을 전산화하고, 수업 전후 3단계 사전 점검 루틴 및 안전 가이드라인 프로세스를 수립하여 운영',
    result:
      '9개월 재직 기간 동안 교구 손망실 0건 및 안전사고 0건 달성, 강사와 교육생 모두가 신뢰하는 쾌적한 실습 환경 구축',
    evidence: {
      text: '(주)블루커뮤니케이션 부산SW·AI교육거점센터 매니저 실무 경력',
      link: '#education',
      linkText: '실무 경력 확인',
    },
  },
  {
    title: '데이터 기반 문제 해결 & 학과대표 협업 리더십',
    situation:
      '컴퓨터공학 전공과 사회복지빅데이터학 복수전공 과정 중 방대한 학업량과 함께 온라인 환경 특성상 학우 간 소통 단절 및 중도 이탈 우려 발생',
    action:
      '컴퓨터공학과 학과대표(1년)로서 정기 온라인 전공 스터디를 주도하고, 데이터 분석 및 프로그래밍 기초에 어려움을 겪는 학우들을 위한 1:1 학습 멘토링 운영',
    result:
      '4개 학기 성적우수 장학생 선정 및 평점 3.97/4.5 최우수 학업 성과 달성, 스터디 참여 학우들의 전공 과목 이수율 100% 견인',
    evidence: {
      text: '컴퓨터공학·사회복지빅데이터학 학사 학위 및 성적우수 장학 실적',
      link: '#education',
      linkText: '학력/장학 내역 확인',
    },
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
      className={cn(
        'scroll-mt-24 space-y-8 border-t border-neutral-200/80 pt-12 dark:border-neutral-800/80',
        className,
      )}
    >
      <div className="space-y-1">
        <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
          Strengths & Evidence
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">나의 강점</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          현장 경험을 통해 입증된 문제 해결력과 공인 근거입니다.
        </p>
      </div>

      {/* 1. 실전 경험 기반 강점 카드 (T01-C06 상황, T01-C07 행동, T01-C08 결과, T01-C09 근거 충족) */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-7 dark:border-neutral-800 dark:bg-neutral-900/90">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5 text-neutral-900 dark:text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white shadow-xs dark:bg-white dark:text-neutral-900">
              <Award className="h-4 w-4" />
            </span>
            <h3 className="text-base font-bold">실전 경험 기반 핵심 강점 (상황 · 행동 · 결과 · 공개 근거)</h3>
          </div>
          <span className="self-start rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-medium text-neutral-600 sm:self-auto dark:bg-neutral-800 dark:text-neutral-300">
            STAR 검증 모델 적용
          </span>
        </div>

        <div className="mt-5 space-y-4">
          {STAR_STRENGTHS.map((item, idx) => (
            <div
              key={item.title}
              className="rounded-xl border border-neutral-200/80 bg-neutral-50/50 p-4 transition-colors hover:border-neutral-300 sm:p-5 dark:border-neutral-800 dark:bg-neutral-800/50 dark:hover:border-neutral-700"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-xs font-bold text-white dark:bg-white dark:text-neutral-900">
                  0{idx + 1}
                </span>
                <h4 className="text-sm font-bold text-neutral-900 sm:text-base dark:text-white">{item.title}</h4>
              </div>

              {/* 상황 / 행동 / 결과 3분할 그리드 */}
              <div className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                <div className="rounded-lg border border-neutral-200/60 bg-white p-3 dark:border-neutral-700/60 dark:bg-neutral-900/90">
                  <span className="inline-block rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                    상황 (Situation)
                  </span>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {item.situation}
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-200/60 bg-white p-3 dark:border-neutral-700/60 dark:bg-neutral-900/90">
                  <span className="inline-block rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                    행동 (Action)
                  </span>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">{item.action}</p>
                </div>
                <div className="rounded-lg border border-neutral-200/60 bg-white p-3 dark:border-neutral-700/60 dark:bg-neutral-900/90">
                  <span className="inline-block rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    결과 (Result)
                  </span>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">{item.result}</p>
                </div>
              </div>

              {/* 공개 가능한 근거 (T01-C09) */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-200/60 pt-3 text-xs dark:border-neutral-700/60">
                <div className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-medium">공개 근거: {item.evidence.text}</span>
                </div>
                <a
                  href={item.evidence.link}
                  target={item.evidence.link.startsWith('http') ? '_blank' : undefined}
                  rel={item.evidence.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1 font-semibold text-neutral-900 underline underline-offset-4 hover:text-neutral-600 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none dark:text-white dark:hover:text-neutral-300 dark:focus-visible:ring-white"
                >
                  <span>{item.evidence.linkText}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Strengths;
