import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, LogIn } from 'lucide-react';
import { cn } from '../lib/utils';

interface ProjectsProps {
  className?: string;
}

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ExtraLink {
  label: string;
  url: string;
}

interface ProjectItem {
  title: string;
  category: string;
  period: string;
  description: string;
  highlight?: string;
  technologies: string[];
  demoLink?: string;
  githubLink?: string;
  extraLinks?: ExtraLink[];
}

const PROJECTS: ProjectItem[] = [
  {
    title: 'SKT ALEPH 기술 블로그',
    category: '인터랙티브 기술 학습 및 실습 기록 블로그',
    period: '2026.08 ~ 현재',
    description:
      'SKT ALEPH 교육 과정(Python 로그 분석 자동화, Kali Linux 터미널 실습, 네트워크 ZT 운영 기초)을 체계적으로 기록하고 공유하는 모던 인터랙티브 기술 블로그입니다.',
    highlight:
      '인터랙티브 가상 터미널 시뮬레이터, CSV 스프레드시트 뷰어, 태그 필터링 및 다크 모드, GitHub Actions 자동화',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'GitHub Actions', 'Vercel'],
    demoLink: 'https://skt-aleph-jinyeongblog.vercel.app',
    githubLink: 'https://github.com/jinyeongjang/skt-aleph-jinyeongblog',
  },
  {
    title: '케이티 잉글리쉬 영어학원 관리',
    category: '학원 운영 통합 관리 & AI 에듀테크 플랫폼',
    period: '2026.06 ~ 유지보수',
    description:
      '학원 운영을 위한 출결·성적·리포트 관리 시스템과 학생을 위한 AI(Gemini) 모델을 통한 자동 자막 추가 기능, 음성인식(STT/TTS), 단어 플래시카드 및 6종 미니게임을 제공하는 에듀테크 통합 플랫폼입니다.',
    highlight:
      'Google Gemini AI 및 Web Speech 기반 학습 인터랙션, Chart.js/ExcelJS 리포트 자동화, Supabase 연동 및 PWA 구현',
    technologies: [
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Supabase',
      'Gemini AI',
      'Web Speech API',
      'Chart.js',
      'ExcelJS',
      'PWA',
    ],
    demoLink: 'https://katie-english.vercel.app',
    githubLink: 'https://github.com/jinyeongjang/Katie_English_management',
    extraLinks: [
      {
        label: '관리자 페이지',
        url: 'https://katie-english.vercel.app/auth/login',
      },
    ],
  },
  {
    title: '밥피엔스 (Babpiens)',
    category: '맞춤형 메뉴 추천 PWA 웹앱',
    period: '2024.08 - 2024.10',
    description:
      '미각을 깨우는 맞춤형 음식 메뉴 추천 서비스로, 위치 기반 추천과 오프라인 접근성을 지원하는 PWA를 적용했습니다. 사업팀의 예산 부족으로 인해 상용화까지 진행되지는 못했던 프로젝트입니다.',
    highlight: 'AWS EC2, CloudFront, Route53 클라우드 인프라 구축 배포 및 구글·네이버 포털 검색엔진(SEO) 최적화',
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'AWS EC2',
      'CloudFront',
      'Route53',
      'Kakao Map API',
      'PWA',
      'SEO',
    ],
    demoLink: 'https://babpiens2024.vercel.app/',
    githubLink: 'https://github.com/OZ-Coding-School/oz_03_collabo-005-FE',
  },
  {
    title: '이레페이 (IrehPay)',
    category: '결제 솔루션 사업자 공식 홈페이지',
    period: '2024.12 ~ 유지보수',
    description:
      'POS 및 키오스크 결제 단말기 유통 사업자를 위한 공식 웹사이트로, 직관적인 서비스 안내와 반응형 웹을 구현했습니다.',
    highlight: 'AWS S3, CloudFront를 연계한 정적 웹 호스팅 아키텍처 구축 및 포털 검색 등록 SEO 최적화',
    technologies: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'AWS S3', 'CloudFront', 'Route53', 'SEO'],
    demoLink: 'https://www.irehpay.com/',
    githubLink: 'https://github.com/jinyeongjang/Project5',
  },
  {
    title: '포도리더스 다이닝 & 말씀',
    category: '모임 장소 추천 & 말씀 암송 웹앱',
    period: '2025.01 ~ 유지보수',
    description:
      '소그룹 모임을 위한 주변 식사 장소·카페 추천 기능과 암송구절 미니게임을 제공하는 신앙생활 지원 플랫폼입니다.',
    highlight: 'Next.js와 Supabase를 연동하여 실시간 데이터베이스 관리 및 Google OAuth 소셜 인증 구현',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Supabase', 'Google OAuth', 'PWA'],
    demoLink: 'https://podoreaders2025.vercel.app/',
    githubLink: 'https://github.com/jinyeongjang/podoreaders2025',
  },
  {
    title: '영화 검색 웹 애플리케이션',
    category: '실시간 영화 정보 탐색 웹앱',
    period: '2024.06',
    description:
      'TMDB 오픈 API를 연동하여 최신 영화 정보 검색, 상세 줄거리 및 평점 조회 기능을 구현한 웹 애플리케이션입니다.',
    highlight: 'Firebase 연동 및 비동기 API 통신을 통한 빠른 검색 및 직관적인 UI 인터랙션 구현',
    technologies: ['React', 'CSS3', 'Firebase', 'TMDB API'],
    demoLink: 'https://mini-project-01-seven.vercel.app/',
    githubLink: 'https://github.com/jinyeongjang/mini_project_01',
  },
];

export const Projects: React.FC<ProjectsProps> = ({ className }) => {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className={cn('scroll-mt-24 space-y-8 border-t border-neutral-200/80 pt-12', className)}
    >
      <div className="space-y-1">
        <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">Selected Projects</span>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">프로젝트</h2>
        <p className="text-sm text-neutral-600">실제 배포 및 클라우드 인프라 운영 경험을 담은 프로젝트입니다.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <div
            key={project.title}
            className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-semibold text-neutral-600">{project.category}</span>
                  <h3 className="text-lg font-bold text-neutral-900">{project.title}</h3>
                </div>
                <div className="flex shrink-0 items-center gap-1 rounded bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600">
                  <Calendar className="h-3 w-3 text-neutral-500" />
                  <span>{project.period}</span>
                </div>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-neutral-700 sm:text-sm">{project.description}</p>

              {project.highlight && (
                <p className="mt-2.5 rounded-lg border border-neutral-100 bg-neutral-50/70 px-3 py-2 text-xs text-neutral-700">
                  <span className="font-semibold text-neutral-900">핵심 성과: </span>
                  {project.highlight}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-neutral-100 pt-4">
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none"
                >
                  <span>프로젝트 열기</span>
                  <ExternalLink className="h-3 w-3 text-neutral-300" />
                </a>
              )}
              {project.extraLinks?.map((extra) => (
                <a
                  key={extra.url}
                  href={extra.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none"
                >
                  <LogIn className="h-3.5 w-3.5 text-neutral-600" />
                  <span>{extra.label}</span>
                </a>
              ))}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none"
                >
                  <GithubIcon className="h-3.5 w-3.5 text-neutral-600" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;
