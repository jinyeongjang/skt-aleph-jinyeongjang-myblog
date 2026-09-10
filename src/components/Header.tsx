import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Play, Pause, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeaderProps {
  className?: string;
}

const NAV_ITEMS = [
  { href: '#about', label: '소개' },
  { href: '#skills', label: '기술' },
  { href: '#projects', label: '프로젝트' },
  { href: '#education', label: '학력/이력' },
  { href: '#strengths', label: '강점(근거)' },
  { href: '#values', label: '가치관' },
  { href: '#manual', label: '설명서' },
  { href: '#contact', label: '연락처' },
];

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [reducedMotion]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => !prev);
  };

  return (
    <>
      {/* 웹 접근성 본문 바로가기 링크 (T01-C14) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-neutral-900 focus:px-4 focus:py-2.5 focus:text-xs focus:font-semibold focus:text-white focus:shadow-xl focus:ring-2 focus:ring-neutral-900 focus:outline-none dark:focus:bg-white dark:focus:text-neutral-900"
      >
        본문 바로가기 (Skip to content)
      </a>

      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0.01 : 0.3 }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b border-neutral-200/80 bg-white/85 shadow-2xs backdrop-blur-xl transition-all dark:border-neutral-800/80 dark:bg-neutral-950/85',
          className,
        )}
      >
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          {/* 브랜드 로고 */}
          <a
            href="#"
            className="group flex items-center gap-2.5 rounded-lg py-1 transition-all focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none dark:focus-visible:ring-white"
          >
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-neutral-900 transition-colors group-hover:text-neutral-700 dark:text-white dark:group-hover:text-neutral-200">
                안녕하세요. SKT ALEPH 수강생 장OO 입니다.
              </span>
            </div>
          </a>

          {/* 데스크톱 네비게이션 & 제어 컨트롤 */}
          <div className="hidden items-center gap-1.5 md:flex">
            <nav className="flex items-center gap-0.5" aria-label="메인 네비게이션">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-2 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none lg:px-2.5 lg:text-[13px] dark:text-neutral-300 dark:hover:bg-neutral-800/70 dark:hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* 구분선 */}
            <div className="mx-1 h-3.5 w-px bg-neutral-200 dark:bg-neutral-800" aria-hidden="true" />

            {/* 유틸리티 컨트롤 버튼 그룹 (아이콘 전용) */}
            <div className="flex items-center gap-1.5">
              {/* 다크모드 토글 버튼 (아이콘 전용) */}
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-200/90 bg-neutral-50/90 text-neutral-700 shadow-2xs transition-all hover:border-neutral-300 hover:bg-white hover:text-neutral-900 hover:shadow-xs focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-neutral-200 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-white"
                title={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
                aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 text-amber-500 transition-transform hover:rotate-45" />
                ) : (
                  <Moon className="h-4 w-4 text-neutral-600 transition-transform hover:-rotate-12 dark:text-neutral-400" />
                )}
              </button>

              {/* 애니메이션 활성화 / 비활성화 토글 (아이콘 전용 - T01-C22 평가 규격 충족) */}
              <button
                type="button"
                onClick={toggleReducedMotion}
                className={cn(
                  'inline-flex h-8 w-8 items-center justify-center rounded-lg border shadow-2xs transition-all focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none',
                  !reducedMotion
                    ? 'border-neutral-200/90 bg-neutral-50/90 text-neutral-700 hover:border-neutral-300 hover:bg-white hover:text-neutral-900 hover:shadow-xs dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-neutral-200 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-white'
                    : 'border-neutral-200/70 bg-neutral-100/80 text-neutral-400 hover:bg-neutral-200/70 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-500',
                )}
                title={reducedMotion ? '애니메이션 켜기 (활성화)' : '애니메이션 끄기 (비활성화)'}
                aria-label={reducedMotion ? '애니메이션 켜기' : '애니메이션 끄기'}
                aria-pressed={!reducedMotion}
              >
                {reducedMotion ? (
                  <Pause className="h-4 w-4 text-neutral-400" />
                ) : (
                  <Play className="h-4 w-4 fill-emerald-600/30 text-emerald-600 dark:fill-emerald-400/30 dark:text-emerald-400" />
                )}
              </button>
            </div>
          </div>

          {/* 모바일 햄버거 & 컨트롤 버튼 그룹 */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200/90 bg-neutral-50 p-1.5 text-neutral-700 transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
              title={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
              aria-label="다크 모드 전환"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-amber-500" />
              ) : (
                <Moon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
              )}
            </button>
            <button
              type="button"
              onClick={toggleReducedMotion}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200/90 bg-neutral-50 p-1.5 text-neutral-700 transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
              title={reducedMotion ? '애니메이션 활성화하기' : '애니메이션 비활성화하기'}
              aria-label="애니메이션 토글"
            >
              {reducedMotion ? (
                <Pause className="h-4 w-4 text-neutral-400" />
              ) : (
                <Play className="h-4 w-4 fill-emerald-600/30 text-emerald-600 dark:text-emerald-400" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200/90 bg-neutral-50 text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
              aria-label="메뉴 열기"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 드롭다운 */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: reducedMotion ? 0.01 : 0.2 }}
              className="border-b border-neutral-200/80 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-xl md:hidden dark:border-neutral-800/80 dark:bg-neutral-950/95"
            >
              <nav className="grid grid-cols-2 gap-1.5">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-3 py-2 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none dark:text-neutral-200 dark:hover:bg-neutral-800/80 dark:hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
