import { useState } from 'react';
import { Page } from './types';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import ResumeBuilder from './components/ResumeBuilder';
import CoverLetterWriter from './components/CoverLetterWriter';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>
        {currentPage === 'landing' && (
          <LandingPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'resume' && <ResumeBuilder />}
        {currentPage === 'coverLetter' && <CoverLetterWriter />}
      </main>
    </div>
  );
}
