import {
  Sparkles,
  FileText,
  PenTool,
  Zap,
  Target,
  Shield,
  ArrowRight,
  CheckCircle2,
  Star,
} from 'lucide-react';
import { Page } from '../types';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary-600/20 blur-[128px]" />
          <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-purple-600/15 blur-[128px]" />
          <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-accent-500/10 blur-[128px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:pt-32">
          <div className="animate-fade-in-up text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-sm text-primary-300">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Career Documents</span>
            </div>

            {/* Title */}
            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Craft Your Perfect
              <span className="block bg-gradient-to-r from-primary-400 via-purple-400 to-accent-400 bg-clip-text text-transparent">
                Resume & Cover Letter
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 sm:text-xl">
              Let AI help you create professional, ATS-optimized resumes and compelling 
              cover letters that land interviews. Stand out from the crowd in minutes, not hours.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={() => onNavigate('resume')}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-primary-500/25 transition-all hover:scale-105 hover:shadow-primary-500/40 sm:w-auto"
              >
                <FileText className="h-5 w-5" />
                Build Your Resume
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => onNavigate('coverLetter')}
                className="group flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:border-primary-500/50 hover:bg-slate-800 sm:w-auto"
              >
                <PenTool className="h-5 w-5" />
                Write Cover Letter
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-accent-500" />
                100% Free
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-accent-500" />
                ATS-Optimized
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-accent-500" />
                No Sign-up Required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-accent-500" />
                Export & Print
              </span>
            </div>
          </div>

          {/* Preview mockup */}
          <div className="animate-fade-in-up delay-300 mt-16 flex justify-center opacity-0">
            <div className="relative w-full max-w-3xl">
              <div className="animate-pulse-glow rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
                <div className="flex items-center gap-2 pb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="ml-3 text-xs text-slate-500">AI Resume Builder</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary-500 to-purple-500" />
                    <div className="space-y-2">
                      <div className="h-4 w-48 rounded bg-slate-700" />
                      <div className="h-3 w-32 rounded bg-slate-800" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-2.5 rounded bg-slate-700/60" />
                    <div className="h-2.5 rounded bg-slate-700/60" />
                    <div className="h-2.5 rounded bg-slate-700/60" />
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary-400" />
                      <div className="h-3 w-40 rounded bg-primary-500/20" />
                    </div>
                    <div className="h-2.5 w-full rounded bg-slate-800" />
                    <div className="h-2.5 w-5/6 rounded bg-slate-800" />
                    <div className="h-2.5 w-4/6 rounded bg-slate-800" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <div className="h-3 w-24 rounded bg-slate-700" />
                      <div className="h-2 w-full rounded bg-slate-800" />
                      <div className="h-2 w-5/6 rounded bg-slate-800" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-24 rounded bg-slate-700" />
                      <div className="h-2 w-full rounded bg-slate-800" />
                      <div className="h-2 w-3/4 rounded bg-slate-800" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative border-t border-slate-800 bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Land Your Dream Job
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Our AI-powered tools help you create professional documents that get noticed by recruiters and pass ATS screening.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Sparkles className="h-6 w-6" />}
              title="AI-Powered Writing"
              description="Intelligent suggestions for summaries, achievements, and descriptions tailored to your experience and target role."
              gradient="from-primary-500 to-blue-500"
            />
            <FeatureCard
              icon={<Target className="h-6 w-6" />}
              title="ATS-Optimized"
              description="Formats and keywords designed to pass Applicant Tracking Systems and get your resume in front of hiring managers."
              gradient="from-purple-500 to-pink-500"
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Instant Generation"
              description="Create professional resumes and cover letters in minutes, not hours. Just fill in the details and let AI do the rest."
              gradient="from-amber-500 to-orange-500"
            />
            <FeatureCard
              icon={<FileText className="h-6 w-6" />}
              title="Professional Templates"
              description="Clean, modern resume layouts that highlight your strengths and make a great first impression."
              gradient="from-accent-500 to-teal-500"
            />
            <FeatureCard
              icon={<PenTool className="h-6 w-6" />}
              title="Cover Letter Generator"
              description="Personalized cover letters that complement your resume and show genuine interest in the position."
              gradient="from-rose-500 to-red-500"
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Privacy First"
              description="Your data stays in your browser. We don't store any personal information — everything is processed locally."
              gradient="from-cyan-500 to-blue-500"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-slate-800 bg-slate-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Three simple steps to create your professional career documents
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <StepCard
              number="01"
              title="Enter Your Details"
              description="Fill in your personal information, work experience, education, and skills."
            />
            <StepCard
              number="02"
              title="Let AI Enhance"
              description="Our AI generates compelling summaries, achievements, and cover letters tailored to you."
            />
            <StepCard
              number="03"
              title="Export & Apply"
              description="Preview your documents, make final adjustments, and export them ready to send."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-slate-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Loved by Job Seekers</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <TestimonialCard
              name="Sarah Chen"
              role="Software Engineer"
              quote="This tool helped me land 3 interviews in my first week. The AI suggestions were spot-on and saved me hours of writing."
            />
            <TestimonialCard
              name="Marcus Johnson"
              role="Marketing Manager"
              quote="The cover letter generator is incredible. It perfectly captured my tone and highlighted the right experiences for each application."
            />
            <TestimonialCard
              name="Emily Rodriguez"
              role="Data Analyst"
              quote="I was struggling with my resume for weeks. This AI tool transformed it in minutes. I got my dream job within a month!"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Build Your Future?
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Start creating your AI-powered resume and cover letter today. It's free, fast, and effective.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => onNavigate('resume')}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-primary-500/25 transition-all hover:scale-105 sm:w-auto"
            >
              Get Started Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500 sm:px-6">
          <p>© 2025 ResumeAI.pro — AI-Powered Resume & Cover Letter Writer</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-slate-700 hover:bg-slate-900">
      <div
        className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg transition-transform group-hover:scale-110`}
      >
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center">
      <div className="mb-4 text-5xl font-black text-primary-500/20">{number}</div>
      <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  );
}

function TestimonialCard({
  name,
  role,
  quote,
}: {
  name: string;
  role: string;
  quote: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
      <div className="mb-4 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="mb-4 text-sm leading-relaxed text-slate-300">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-purple-500 text-sm font-bold text-white">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{name}</p>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
      </div>
    </div>
  );
}
