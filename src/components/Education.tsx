import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface EducationProps {
  className?: string;
}

interface EducationItem {
  institution: string;
  title: string;
  subtitle?: string;
  period: string;
  type: 'academic' | 'bootcamp' | 'program';
  details: string[];
  badges?: string[];
}

const EDUCATION_LIST: EducationItem[] = [
  {
    institution: 'SKT ALEPH 1기',
    title: '기업 현장 중심 보안 & 네트워크 인프라 트랙',
    subtitle: '집중 교육 및 실무 프로젝트 과정',
    period: '2026.03 ~ 진행 중',
    type: 'program',
    details: [
      'TCP/IP, 패킷 분석, 라우팅 및 스위칭 등 핵심 네트워크 프로토콜 심화 실습',
      '시스템 및 네트워크 보안 취약점 분석, 방화벽 및 침입 탐지/방지(IDS/IPS) 프레임워크 학습',
      '엔터프라이즈 환경 모의 인프라 구축 및 보안 시스템 아키텍처 연구',
    ],
    badges: ['SKT ALEPH 1기', '정보보안 (Security)', '네트워크 (Network)', '인프라 엔지니어링'],
  },
  {
    institution: 'Nextrunners - OZ Coding School',
    title: 'AWS와 오즈코딩스쿨이 함께 만든 Frontend Developer Bootcamp',
    subtitle: 'KDT 프론트엔드 웹개발자 부트캠프 (수료)',
    period: '2024.03 ~ 2024.09',
    type: 'bootcamp',
    details: [
      'React, TypeScript, Next.js, Tailwind CSS 등 모던 프론트엔드 핵심 기술 집중 훈련',
      'AWS EC2, S3, CloudFront, Route53, Certificate Manager 기반 클라우드 배포 인프라 구축 실습',
      '부트캠프 기간 동안 주어진 전 커리큘럼 과제를 성실히 완수하여 KDT 과제상 수상 및 수료',
    ],
    badges: ['KDT 과제상 수상', 'KDT 수료증 취득', 'AWS & OZ Coding School'],
  },
  {
    institution: 'AWS 코리아 (서울)',
    title: 'AWS Jam 해커톤 교육',
    subtitle: 'AWS 코리아 사옥 원데이 핸즈온 실습 (수료)',
    period: '2024.06.25',
    type: 'bootcamp',
    details: [
      'AWS 코리아 사옥에서 JAM 해커톤 형식으로 원데이 교육 수강',
      'AWS 기초부터 심화까지 EC2, S3, RDS, CloudFront, 보안, 마이그레이션, DevOps 실전 역량 배양',
    ],
    badges: ['AWS Jam Certification 수료'],
  },
  {
    institution: '부산디지털대학교 (Busan Digital University)',
    title: '컴퓨터공학과 학사 · 사회복지빅데이터 학사 (복수전공)',
    subtitle: '공학사 & 문학사 취득 (학점: 3.97 / 4.5)',
    period: '2021.03 ~ 2024.02',
    type: 'academic',
    details: [
      '데이터구조, 알고리즘, 데이터베이스, AI, 빅데이터, AWS 클라우드 등 전산학 기초 체화',
      '컴퓨터공학과 학과대표 역임 및 리더십 발휘 (BDU 리더상 수상, 학과대표 임명장 수여)',
      '지역사회 공헌 및 멘토링 기여로 사상구청장 표창장 및 동원종합사회복지관 우수강사 표창',
    ],
    badges: ['학점 3.97 / 4.5', '컴퓨터공학과 학과대표', '사상구청장 표창장', 'BDU 리더상'],
  },
];

export const Education: React.FC<EducationProps> = ({ className }) => {
  return (
    <motion.section
      id="education"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className={cn('scroll-mt-24 space-y-8 border-t border-neutral-200/80 pt-12', className)}
    >
      <div className="space-y-1">
        <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">Education & Experience</span>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">학력 및 교육 이력</h2>
        <p className="text-sm text-neutral-600">체계적인 컴퓨터공학 전공 지식과 검증된 부트캠프·교육 이력입니다.</p>
      </div>

      <div className="space-y-4">
        {EDUCATION_LIST.map((item) => (
          <div
            key={item.institution}
            className="rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300 sm:p-7"
          >
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800">
                  {item.type === 'academic' ? (
                    <GraduationCap className="h-4 w-4" />
                  ) : item.type === 'program' ? (
                    <ShieldCheck className="h-4 w-4" />
                  ) : (
                    <Award className="h-4 w-4" />
                  )}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-neutral-900">{item.institution}</h3>
                    {item.type === 'program' && (
                      <span className="rounded bg-neutral-900 px-1.5 py-0.5 text-[10px] font-medium text-white">
                        현재 진행 중
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-neutral-700">{item.title}</p>
                  {item.subtitle && <p className="text-xs text-neutral-500">{item.subtitle}</p>}
                </div>
              </div>

              <span className="self-start rounded bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600 sm:self-auto">
                {item.period}
              </span>
            </div>

            <ul className="mt-4 space-y-2 text-xs leading-relaxed text-neutral-700 sm:text-sm">
              {item.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-neutral-500" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            {item.badges && (
              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-neutral-100 pt-3">
                {item.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Education;
