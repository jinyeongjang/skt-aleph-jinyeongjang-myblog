import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeaderProps {
  className?: string;
}

const NAV_ITEMS = [
  { href: '#about', label: '소개' },
  { href: '#values', label: '가치 & 관심사' },
  { href: '#strengths', label: '강점' },
  { href: '#manual', label: '사용설명서' },
  { href: '#roadmap', label: '로드맵' },
  { href: '#contact', label: '연락처' },
];

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur-md transition-all',
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6 text-sm">
        <a href="#" className="group flex items-center gap-2.5 font-semibold text-neutral-900 transition-colors">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white shadow-xs transition-transform group-hover:scale-105">
            <Sparkles className="h-4 w-4" />
          </span>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-neutral-900">장진영</span>
            <span className="text-[11px] font-medium text-neutral-400">README v1.0 · SKT ALEPH</span>
          </div>
        </a>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-2.5 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 lg:text-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* 모바일 햄버거 버튼 */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 md:hidden"
          aria-label="메뉴 열기"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* 모바일 메뉴 드롭다운 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-neutral-200 bg-white px-6 py-4 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
