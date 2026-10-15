import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { Numbers } from './components/Numbers';
import { FeaturedWorks } from './components/FeaturedWorks';
import { Documents } from './components/Documents';
import { RefreshEngine } from './components/RefreshEngine';
import { SubmissionVerify } from './components/SubmissionVerify';
import { Footer } from './components/Footer';
import { ResearchPaperApp } from './components/ResearchPaperApp';

export const App: React.FC = () => {
  // 브라우저 URL 기반 현재 페이지 감지 (?page=paper-app 또는 #paper-app)
  const getInitialPage = (): 'main' | 'paper-app' => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('page') === 'paper-app') return 'paper-app';
      if (window.location.hash.includes('paper-app')) return 'paper-app';
    }
    return 'main';
  };

  const [currentPage, setCurrentPage] = useState<'main' | 'paper-app'>(getInitialPage);

  // URL 및 페이지 전환 핸들러
  const navigateTo = useCallback((page: 'main' | 'paper-app') => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      if (page === 'paper-app') {
        const url = new URL(window.location.href);
        url.searchParams.set('page', 'paper-app');
        window.history.pushState({ page: 'paper-app' }, '', url.toString());
      } else {
        const url = new URL(window.location.href);
        url.searchParams.delete('page');
        window.history.pushState({ page: 'main' }, '', url.pathname + (url.hash || ''));
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // 브라우저 뒤로가기 / 앞으로가기 처리
  useEffect(() => {
    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('page') === 'paper-app' || window.location.hash.includes('paper-app')) {
        setCurrentPage('paper-app');
      } else {
        setCurrentPage('main');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-neutral-50/40 font-sans text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white dark:bg-neutral-950 dark:text-neutral-100">
      {currentPage === 'paper-app' ? (
        <ResearchPaperApp onBackToMain={() => navigateTo('main')} />
      ) : (
        <>
          <Header onOpenPaperApp={() => navigateTo('paper-app')} />
          <main
            id="main-content"
            tabIndex={-1}
            className="mx-auto max-w-4xl space-y-12 px-4 pt-20 pb-10 outline-none sm:space-y-16 sm:px-6 sm:pt-24 sm:pb-16"
          >
            <Hero />
            <Story />
            <Numbers />
            <FeaturedWorks onOpenApp={() => navigateTo('paper-app')} />
            <Documents />
            <RefreshEngine />
            <SubmissionVerify />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
