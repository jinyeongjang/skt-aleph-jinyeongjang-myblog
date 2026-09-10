import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Wrench, Shield } from 'lucide-react';
import { cn } from '../lib/utils';

interface SkillsProps {
  className?: string;
}

interface SkillCategory {
  title: string;
  icon: React.FC<{ className?: string }>;
  description: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Development',
    icon: Layout,
    description: '사용자 친화적이고 반응성이 뛰어난 모던 웹 인터페이스 구축',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'HTML5 / CSS3', 'JavaScript (ES6+)'],
  },
  {
    title: 'Backend & Database',
    icon: Server,
    description: 'BaaS 및 RESTful API를 활용한 데이터 모델링과 비동기 통신',
    skills: ['Firebase', 'Supabase', 'Node.js', 'REST API', 'Kakao Map API', 'TMDB API'],
  },
  {
    title: 'Cloud & Infrastructure',
    icon: Shield,
    description: '클라우드 인프라 설계, 배포 자동화 및 보안 아키텍처 학습',
    skills: ['AWS (EC2, S3, CloudFront, Route53, RDS)', 'Docker', 'Vercel', 'Network (TCP/IP)', 'Linux 보안'],
  },
  {
    title: 'Tools & DevOps',
    icon: Wrench,
    description: '효율적인 협업과 버전 관리 및 지속적 통합 환경',
    skills: ['Git', 'GitHub', 'GitHub Actions (CI/CD)', 'Figma', 'Postman', 'SEO (Google/Naver)'],
  },
];

export const Skills: React.FC<SkillsProps> = ({ className }) => {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className={cn('scroll-mt-24 space-y-8 border-t border-neutral-200/80 pt-12', className)}
    >
      <div className="space-y-1">
        <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">Technical Skills</span>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">기술 스택</h2>
        <p className="text-sm text-neutral-600">실제 프로젝트 개발과 인프라 구축에 활용해 온 핵심 기술입니다.</p>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {SKILL_CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.title}
              className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300"
            >
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900">{category.title}</h3>
                    <p className="text-[11px] text-neutral-500">{category.description}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-neutral-100 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default Skills;
