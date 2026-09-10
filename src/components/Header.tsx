import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'sticky top-0 z-50 border-b border-neutral-200/80 bg-white/85 backdrop-blur-md transition-all',
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6 text-sm">
        <a href="#" className="group flex items-center gap-2 font-semibold text-neutral-900 transition-colors">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900 text-white shadow-xs transition-transform group-hover:scale-105">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <span className="truncate font-medium tracking-tight">
            SKT ALEPH <span className="font-normal text-neutral-400">|</span> 포트폴리오
          </span>
        </a>

        <nav className="flex items-center gap-1 sm:gap-2">
          <a
            href="#about"
            className="rounded-md px-3 py-1.5 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            소개
          </a>
          <a
            href="#activities"
            className="rounded-md px-3 py-1.5 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            활동
          </a>
          <a
            href="#contact"
            className="rounded-md px-3 py-1.5 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            연락처
          </a>
        </nav>
      </div>
    </motion.header>
  );
};
