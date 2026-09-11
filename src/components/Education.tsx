import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, CheckCircle2, ShieldCheck, Briefcase, FileBadge2, HeartHandshake } from 'lucide-react';
import { cn } from '../lib/utils';

interface EducationProps {
  className?: string;
}

type TabType = 'all' | 'career' | 'program' | 'academic' | 'credential';

interface CareerItem {
  id: string;
  company: string;
  department: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  description: string;
  tasks: string[];
  badges: string[];
}

interface ProgramItem {
  id: string;
  institution: string;
  title: string;
  subtitle?: string;
  period: string;
  hours?: string;
  details: string[];
  badges: string[];
}

interface AcademicItem {
  id: string;
  school: string;
  degree: string;
  major: string;
  doubleMajor?: string;
  period: string;
  status: string;
  gpa: string;
  details: string[];
  badges: string[];
}

interface CredentialItem {
  name: string;
  issuer: string;
  date: string;
  type: 'cert' | 'award';
  description: string;
}

const CAREER_LIST: CareerItem[] = [
  {
    id: 'bluecom',
    company: '(주)블루커뮤니케이션',
    department: '교육사업부 (부산)',
    role: '매니저 · 교육운영',
    period: '2025.05 ~ 2026.01',
    duration: '9개월',
    location: '부산광역시',
    description: '부산SW·AI교육거점센터 교육운영실 업무 전반 총괄(행정 사무 및 교육 실무)',
    tasks: [
      '부산SW·AI교육거점센터 체험실 및 교육실 운영 지원 및 안전 관리 총괄',
      'SW·AI 교육용 교구 및 부자재 자산 관리, 실습 환경 사전 점검 및 운영 프로세스 수립',
      '교육생 문의 응대, 강사 관리 및 행정 사무 업무 전반 원활한 지원',
    ],
    badges: ['부산SW·AI교육거점센터', '교육운영', '체험실 관리', '교구/자재 관리', '강사관리'],
  },
  {
    id: 'ktcs',
    company: '(주)케이티씨에스 (ktcs)',
    department: '부산디지털배움터',
    role: '전일제 / 반일제 전문 IT 강사 (총 3개 사업 수행)',
    period: '2020.09 ~ 2023.12',
    duration: '총 2년 1개월',
    location: '부산광역시 (사상구청, 북구 도서관/복지관)',
    description: '과학기술정보통신부·한국지능정보사회진흥원(NIA) 주관 국가 디지털역량향상 사업 디지털배움터 강사 역임',
    tasks: [
      '[2023.03 ~ 2023.12 (10개월)] 10대부터 80대까지 전 연령층 맞춤형 IT 교육 및 북구 만덕도서관 들락날락 초등 코딩 교육(엔트리, 스크래치, AI스피커, 스마트홈, 카미봇, 메이키메이키), 반딧불이지역아동센터 실습 교육 진행',
      '[2023.12.20] 교육생 눈높이에 맞춘 참여형/실습 중심 교육으로 부산 북구 동원종합사회복지관 우수 강사 표창 선정',
      '[2021.05 ~ 2022.01 (9개월)] 사상구청 정보화교육장 내 전일제 강의 진행, ITQ 국가공인자격증반(한글·엑셀·파워포인트) 및 엑셀 기초·중고급반 운영, 사상구청 교육 성과 보고 및 교육장·강사 관리',
      '[2020.09 ~ 2021.02 (6개월)] 국가 디지털역량향상 맞춤형 IT 교육 반일제 강사 운영 완수',
    ],
    badges: ['디지털배움터 강사', '우수강사 표창', '사상구청 정보화교육', '만덕도서관 코딩', 'ITQ 자격증반'],
  },
];

const PROGRAM_LIST: ProgramItem[] = [
  {
    id: 'skt-aleph',
    institution: 'SKT ALEPH 1기',
    title: '기업 현장 중심 보안 & 네트워크 인프라 트랙',
    subtitle: '엔터프라이즈 보안 및 인프라 엔지니어링 집중 교육 과정',
    period: '2026.03 ~ 진행 중',
    details: [
      'TCP/IP 계층 구조 분석, 패킷 스니핑, 라우팅 및 스위칭 핵심 프로토콜 심화 실습',
      '네트워크 보안 취약점 분석, 방화벽(Firewall) 및 침입 탐지/방지 시스템(IDS/IPS) 프레임워크 연구',
      '리눅스(Kali/Ubuntu) 시스템 보안, Python 기반 대용량 로그 분석 자동화 파이프라인 개발',
    ],
    badges: ['SKT ALEPH 1기', '정보보안', '네트워크 인프라', '현재 진행 중'],
  },
  {
    id: 'oz-coding',
    institution: '넥스트러너스 - 오즈코딩스쿨',
    title: 'AWS와 오즈코딩스쿨이 함께 만든 Frontend Developer Bootcamp',
    subtitle: 'KDT 프론트엔드 웹개발자 부트캠프 (수료 & KDT 과제상 수상)',
    period: '2024.03 ~ 2024.09',
    details: [
      'React, TypeScript, Next.js, Tailwind CSS 등 모던 프론트엔드 실무 아키텍처 집중 훈련',
      'AWS EC2, S3, CloudFront, Route53, ACM 연계 클라우드 웹 배포 인프라 구축 실습',
      '전체 부트캠프 기간 동안 정규 커리큘럼 과제를 성실히 수행하여 우수성을 인정받아 KDT 과제상 수상',
    ],
    badges: ['KDT 과제상 수상', 'KDT 수료증 취득', 'AWS 클라우드 배포', 'React/TS'],
  },
  {
    id: 'aws-jam',
    institution: 'AWS 코리아 (서울)',
    title: 'AWS Jam 해커톤 교육',
    subtitle: 'AWS 코리아 본사 사옥 원데이 핸즈온 실습 (수료)',
    period: '2024.06.25',
    details: [
      'AWS 코리아 사옥 현장에서 Jam 해커톤 형식으로 클라우드 핵심 아키텍처 실습',
      'AWS EC2, S3, RDS, CloudFront, 보안 정책 및 모니터링 환경을 핸즈온 실습을 통해 마스터',
    ],
    badges: ['AWS Jam 수료증 취득', 'AWS 코리아 본사', '클라우드 핸즈온'],
  },
  {
    id: 'mentoring-saemmul',
    institution: '샘물지역아동센터 (화명)',
    title: '지역 아동·청소년 맞춤형 학습 멘토링 및 상담 (사회활동)',
    subtitle: '초·중·고 취약계층 학생 대상 1:1 맞춤형 튜터링 (총 408시간 봉사)',
    period: '2022.07.19 ~ 2023.02.21',
    hours: '총 408시간',
    details: [
      '초등학생부터 고등학생까지 다양한 학습 수준의 학생들을 대상으로 맞춤형 기초 학습 지도',
      '심리·정서적 공감대 형성을 위한 정기 상담 및 학습 동기 부여 멘토링 진행',
    ],
    badges: ['408시간 멘토링', '교육 나눔', '사회공헌'],
  },
];

const ACADEMIC_LIST: AcademicItem[] = [
  {
    id: 'bdu',
    school: '부산디지털대학교 (Busan Digital University)',
    degree: '공학사 (4년제) & 사회복지빅데이터학사',
    major: '컴퓨터공학과 (편입 / 졸업)',
    doubleMajor: '이중전공: 사회복지빅데이터',
    period: '2021.03 ~ 2024.02',
    status: '졸업 (주간)',
    gpa: '3.97 / 4.5',
    details: [
      '컴퓨터공학 핵심(데이터구조, 알고리즘, 데이터베이스, AI, 빅데이터, AWS 클라우드)을 깊이 있게 이수하여 평점 3.97/4.5 우수 성적으로 졸업',
      '2023학년도 컴퓨터공학과 학과대표 및 총학생회 활동: 학우 학습 지원, 신입생 멘토링, 학과 행사 총괄 및 리더십 발휘 (BDU 리더상 수상)',
      '동원종합사회복지관 빅데이터 욕구조사 분석 지원: 컴퓨터공학 전공 지식(통계 및 데이터 분석)을 실무 문제 해결에 적용',
    ],
    badges: ['학점 3.97 / 4.5', '컴퓨터공학과 학과대표', '사회복지빅데이터 이중전공', 'BDU 리더상'],
  },
  {
    id: 'polytech',
    school: '한국폴리텍7대학 부산캠퍼스',
    degree: '전문학사 (2·3년제)',
    major: '메카트로닉스과',
    period: '2013.03 ~ 2017.02',
    status: '졸업 (주간)',
    gpa: '3.49 / 4.5',
    details: [
      '기계 공학 기초, 전자 회로, 마이크로프로세서 제어, PLC 및 센서 인터페이스 실습',
      '하드웨어와 소프트웨어의 상호작용 원리를 체계적으로 학습하여 시스템 통합 기초 역량 구축',
    ],
    badges: ['학점 3.49 / 4.5', '메카트로닉스과', '임베디드 제어 기초'],
  },
  {
    id: 'daeyang-high',
    school: '대양전자정보고등학교',
    degree: '전문계 고등학교',
    major: '디지털전자과',
    period: '2010.03 ~ 2013.02',
    status: '졸업',
    gpa: '성적 우수',
    details: [
      '디지털 회로, 전기전자 기초, 프로그래밍 언어 입문',
      '하드웨어 및 네트워크 기술에 대한 조기 흥미 형성 및 IT 진로의 든든한 초석 마련',
    ],
    badges: ['디지털전자과', '전자회로', 'IT 기초'],
  },
];

const CREDENTIAL_LIST: CredentialItem[] = [
  // 공인 자격증
  {
    name: '정보기술자격 ITQ OA Master',
    issuer: '한국생산성본부 (KPC)',
    date: '2021.03',
    type: 'cert',
    description: '아래한글, 한글엑셀, 파워포인트 전 과목 최고 등급(A) 취득으로 OA Master 공인',
  },
  {
    name: 'ERP정보관리사 Master',
    issuer: '한국생산성본부 (KPC)',
    date: '2018.10',
    type: 'cert',
    description: '전사적자원관리(ERP) 전 영역(회계, 인사, 생산, 물류) 통합 운영 역량 검증',
  },
  {
    name: '컴퓨터활용능력 2급',
    issuer: '대한상공회의소',
    date: '2019.06',
    type: 'cert',
    description: '스프레드시트(Excel) 활용 및 데이터 처리·사무자동화 역량 국가공인 인증',
  },
  {
    name: '워드프로세서 1급',
    issuer: '대한상공회의소',
    date: '2012.08',
    type: 'cert',
    description: '공문서 및 전문 기술 문서 작성과 서식 관리 능력 국가기술자격 인증',
  },
  // 공인 표창 및 수상
  {
    name: '부산광역시 사상구청장 표창장',
    issuer: '부산광역시 사상구청',
    date: '2022.12',
    type: 'award',
    description: '사상구 정보화교육장 디지털배움터 운영을 통한 구민 디지털 격차 해소에 기여',
  },
  {
    name: '동원종합사회복지관 우수강사 표창',
    issuer: '부산 북구 동원종합사회복지관',
    date: '2023.12.20',
    type: 'award',
    description: '교육생 눈높이에 맞춘 맞춤형 코딩 및 스마트폰 교육 진행으로 교육 만족도 및 전문성 최우수 인정',
  },
  {
    name: 'Nextrunners OZ Coding School KDT 과제상',
    issuer: '넥스트러너스 평생교육시설',
    date: '2024.09',
    type: 'award',
    description: '프론트엔드 웹개발자 과정 전 커리큘럼 과제를 탁월한 완성도로 완수하여 KDT 과제상 수상',
  },
  {
    name: 'AWS Jam 해커톤 교육수료증',
    issuer: 'AWS 코리아 (Amazon Web Services Korea)',
    date: '2024.06.25',
    type: 'award',
    description: 'AWS 서울 사옥 핸즈온 Jam 해커톤 실전 클라우드 과제 완수 및 공식 수료',
  },
];

export const Education: React.FC<EducationProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  return (
    <motion.section
      id="education"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className={cn(
        'scroll-mt-24 space-y-8 border-t border-neutral-200/80 pt-12 dark:border-neutral-800/80',
        className,
      )}
    >
      {/* 섹션 헤더 */}
      <div className="space-y-1">
        <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
          Experience & Credentials
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
          경력 · 학력 · 교육 및 자격
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          SW·AI 교육 현장 2년 10개월 실무 경력과 컴퓨터공학 전공 지식, 검증된 공인 자격 및 수상 내역입니다.
        </p>
      </div>

      {/* 대화형 탭 네비게이션 */}
      <div
        className="flex flex-wrap gap-1.5 border-b border-neutral-200 pb-3 dark:border-neutral-800"
        role="tablist"
        aria-label="경력 및 이력 카테고리 전환"
      >
        {[
          { id: 'all', label: '전체 보기' },
          { id: 'career', label: '실무 경력 (2년 10개월)' },
          { id: 'program', label: '교육 및 대외활동' },
          { id: 'academic', label: '학력 (3.97/4.5)' },
          { id: 'credential', label: '공인 자격 및 수상' },
        ].map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={cn(
                'rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none dark:focus-visible:ring-white',
                isSelected
                  ? 'bg-neutral-900 text-white shadow-xs dark:bg-white dark:text-neutral-900'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white',
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. 실무 경력 (총 2년 10개월) */}
      {(activeTab === 'all' || activeTab === 'career') && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
              <Briefcase className="h-3.5 w-3.5" />
            </span>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">실무 경력 (총 2년 10개월)</h3>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              SW·AI 교육 운영 & 전문 강의
            </span>
          </div>

          <div className="space-y-4">
            {CAREER_LIST.map((career) => (
              <div
                key={career.id}
                className="rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300 sm:p-7 dark:border-neutral-800 dark:bg-neutral-900/90 dark:hover:border-neutral-700"
              >
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                      <Briefcase className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-bold text-neutral-900 dark:text-white">{career.company}</h4>
                        <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[11px] font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                          {career.department}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                        {career.role}
                      </p>
                      <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">{career.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                    <span className="rounded bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                      {career.period}
                    </span>
                    <span className="rounded bg-neutral-900 px-2 py-0.5 text-[11px] font-medium text-white dark:bg-neutral-100 dark:text-neutral-900">
                      {career.duration}
                    </span>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-xs leading-relaxed text-neutral-700 sm:text-sm dark:text-neutral-300">
                  {career.tasks.map((task, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                  {career.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. 교육 및 대외활동 (Programs) */}
      {(activeTab === 'all' || activeTab === 'program') && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
              <ShieldCheck className="h-3.5 w-3.5" />
            </span>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">교육 및 대외활동</h3>
          </div>

          <div className="space-y-4">
            {PROGRAM_LIST.map((program) => (
              <div
                key={program.id}
                className="rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300 sm:p-7 dark:border-neutral-800 dark:bg-neutral-900/90 dark:hover:border-neutral-700"
              >
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                      {program.id === 'skt-aleph' ? (
                        <ShieldCheck className="h-4 w-4" />
                      ) : program.id === 'mentoring-saemmul' ? (
                        <HeartHandshake className="h-4 w-4" />
                      ) : (
                        <Award className="h-4 w-4" />
                      )}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-bold text-neutral-900 dark:text-white">{program.institution}</h4>
                        {program.id === 'skt-aleph' && (
                          <span className="rounded bg-neutral-900 px-1.5 py-0.5 text-[10px] font-medium text-white dark:bg-white dark:text-neutral-900">
                            현재 진행 중
                          </span>
                        )}
                        {program.hours && (
                          <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                            {program.hours}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                        {program.title}
                      </p>
                      {program.subtitle && (
                        <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">{program.subtitle}</p>
                      )}
                    </div>
                  </div>

                  <span className="self-start rounded bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700 sm:self-auto dark:bg-neutral-800 dark:text-neutral-300">
                    {program.period}
                  </span>
                </div>

                <ul className="mt-4 space-y-2 text-xs leading-relaxed text-neutral-700 sm:text-sm dark:text-neutral-300">
                  {program.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-neutral-500 dark:text-neutral-400" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                  {program.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. 학력 (Academic) */}
      {(activeTab === 'all' || activeTab === 'academic') && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
              <GraduationCap className="h-3.5 w-3.5" />
            </span>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">학력 (Academic Background)</h3>
          </div>

          <div className="space-y-4">
            {ACADEMIC_LIST.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300 sm:p-7 dark:border-neutral-800 dark:bg-neutral-900/90 dark:hover:border-neutral-700"
              >
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                      <GraduationCap className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-bold text-neutral-900 dark:text-white">{item.school}</h4>
                        <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[11px] font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                          {item.degree}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                        {item.major} {item.doubleMajor && `· ${item.doubleMajor}`}
                      </p>
                      <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                        상태: {item.status} · 학점:{' '}
                        <strong className="font-semibold text-neutral-800 dark:text-neutral-200">{item.gpa}</strong>
                      </p>
                    </div>
                  </div>

                  <span className="self-start rounded bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700 sm:self-auto dark:bg-neutral-800 dark:text-neutral-300">
                    {item.period}
                  </span>
                </div>

                <ul className="mt-4 space-y-2 text-xs leading-relaxed text-neutral-700 sm:text-sm dark:text-neutral-300">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-neutral-500 dark:text-neutral-400" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                  {item.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. 공인 자격증 및 수상 (Credentials & Awards) */}
      {(activeTab === 'all' || activeTab === 'credential') && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
              <FileBadge2 className="h-3.5 w-3.5" />
            </span>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">공인 자격증 & 수상 표창</h3>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {CREDENTIAL_LIST.map((cred) => (
              <div
                key={cred.name}
                className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900/90 dark:hover:border-neutral-700"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold',
                        cred.type === 'award'
                          ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
                      )}
                    >
                      {cred.type === 'award' ? (
                        <>
                          <Award className="h-3 w-3" />
                          <span>공인 표창 & 수상</span>
                        </>
                      ) : (
                        <>
                          <FileBadge2 className="h-3 w-3" />
                          <span>국가공인 자격증</span>
                        </>
                      )}
                    </span>
                    <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">{cred.date}</span>
                  </div>

                  <h4 className="mt-3 text-base font-bold text-neutral-900 dark:text-white">{cred.name}</h4>
                  <p className="mt-0.5 text-xs font-medium text-neutral-600 dark:text-neutral-400">
                    발급기관: {cred.issuer}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-700 sm:text-sm dark:text-neutral-300">
                    {cred.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default Education;
