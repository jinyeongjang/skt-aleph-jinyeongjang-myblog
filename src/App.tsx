import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Activities } from './components/Activities';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50/40 font-sans text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white">
      <Header />
      <main className="mx-auto max-w-3xl space-y-12 px-6 py-8 sm:space-y-16 sm:py-12">
        <Hero />
        <About />
        <Activities />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
