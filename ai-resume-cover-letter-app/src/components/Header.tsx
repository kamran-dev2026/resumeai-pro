import { FileText, PenTool, Home, Sparkles } from 'lucide-react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 transition-transform hover:scale-105"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/25">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">
            ResumeAI<span className="text-primary-400">.pro</span>
          </span>
        </button>

        <nav className="flex items-center gap-1">
          <NavButton
            icon={<Home className="h-4 w-4" />}
            label="Home"
            active={currentPage === 'landing'}
            onClick={() => onNavigate('landing')}
          />
          <NavButton
            icon={<FileText className="h-4 w-4" />}
            label="Resume"
            active={currentPage === 'resume'}
            onClick={() => onNavigate('resume')}
          />
          <NavButton
            icon={<PenTool className="h-4 w-4" />}
            label="Cover Letter"
            active={currentPage === 'coverLetter'}
            onClick={() => onNavigate('coverLetter')}
          />
        </nav>
      </div>
    </header>
  );
}

function NavButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
        active
          ? 'bg-primary-600/20 text-primary-300 shadow-inner'
          : 'text-slate-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
