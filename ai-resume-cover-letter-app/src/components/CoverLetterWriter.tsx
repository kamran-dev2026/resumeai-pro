import { useState } from 'react';
import {
  Sparkles,
  Loader2,
  Plus,
  Trash2,
  Printer,
  Copy,
  CheckCircle2,
  PenTool,
  User,
  Building2,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { CoverLetterData, ResumeData, PersonalInfo } from '../types';
import { generateCoverLetter, simulateAITyping } from '../utils/aiGenerator';

const defaultPersonalInfo: PersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  website: '',
  title: '',
  summary: '',
};

const defaultResumeData: ResumeData = {
  personalInfo: defaultPersonalInfo,
  experiences: [],
  education: [],
  skills: [],
  certifications: [],
  languages: [],
};

const defaultCoverLetterData: CoverLetterData = {
  recipientName: '',
  companyName: '',
  jobTitle: '',
  jobDescription: '',
  tone: 'professional',
  keyPoints: [],
};

export default function CoverLetterWriter() {
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>(defaultCoverLetterData);
  const [yourInfo, setYourInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    title: '',
    skills: '',
    previousCompany: '',
    previousRole: '',
  });
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [keyPointInput, setKeyPointInput] = useState('');

  const addKeyPoint = () => {
    const trimmed = keyPointInput.trim();
    if (trimmed) {
      setCoverLetterData((prev) => ({
        ...prev,
        keyPoints: [...prev.keyPoints, trimmed],
      }));
      setKeyPointInput('');
    }
  };

  const removeKeyPoint = (index: number) => {
    setCoverLetterData((prev) => ({
      ...prev,
      keyPoints: prev.keyPoints.filter((_, i) => i !== index),
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedLetter('');

    const resumeData: ResumeData = {
      ...defaultResumeData,
      personalInfo: {
        ...defaultPersonalInfo,
        fullName: yourInfo.fullName,
        email: yourInfo.email,
        phone: yourInfo.phone,
        title: yourInfo.title,
      },
      experiences: yourInfo.previousCompany
        ? [
            {
              id: '1',
              company: yourInfo.previousCompany,
              position: yourInfo.previousRole,
              startDate: '',
              endDate: '',
              current: false,
              description: '',
              achievements: [],
            },
          ]
        : [],
      skills: yourInfo.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const fullText = generateCoverLetter(coverLetterData, resumeData);
    await simulateAITyping(
      fullText,
      (partial) => setGeneratedLetter(partial),
      10
    );
    setIsGenerating(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Cover Letter</title>
        <style>
          body { font-family: 'Inter', system-ui, sans-serif; color: #1e293b; line-height: 1.8; padding: 60px; max-width: 700px; margin: 0 auto; font-size: 14px; white-space: pre-wrap; }
        </style>
      </head>
      <body>${generatedLetter}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
              AI Cover Letter Writer
            </span>
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Fill in the details and let AI craft a compelling cover letter for you
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input side */}
          <div className="space-y-6">
            {/* Your information */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <User className="h-5 w-5 text-primary-400" />
                Your Information
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <InputField
                  label="Full Name"
                  value={yourInfo.fullName}
                  onChange={(v) => setYourInfo((p) => ({ ...p, fullName: v }))}
                  placeholder="John Doe"
                />
                <InputField
                  label="Professional Title"
                  value={yourInfo.title}
                  onChange={(v) => setYourInfo((p) => ({ ...p, title: v }))}
                  placeholder="Software Engineer"
                />
                <InputField
                  label="Email"
                  value={yourInfo.email}
                  onChange={(v) => setYourInfo((p) => ({ ...p, email: v }))}
                  placeholder="john@example.com"
                />
                <InputField
                  label="Phone"
                  value={yourInfo.phone}
                  onChange={(v) => setYourInfo((p) => ({ ...p, phone: v }))}
                  placeholder="+1 (555) 123-4567"
                />
                <InputField
                  label="Previous Company"
                  value={yourInfo.previousCompany}
                  onChange={(v) => setYourInfo((p) => ({ ...p, previousCompany: v }))}
                  placeholder="Google"
                />
                <InputField
                  label="Previous Role"
                  value={yourInfo.previousRole}
                  onChange={(v) => setYourInfo((p) => ({ ...p, previousRole: v }))}
                  placeholder="Senior Developer"
                />
                <div className="sm:col-span-2">
                  <InputField
                    label="Key Skills (comma-separated)"
                    value={yourInfo.skills}
                    onChange={(v) => setYourInfo((p) => ({ ...p, skills: v }))}
                    placeholder="React, Node.js, Python, Leadership"
                  />
                </div>
              </div>
            </div>

            {/* Job information */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Building2 className="h-5 w-5 text-primary-400" />
                Job Details
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <InputField
                  label="Recipient Name (optional)"
                  value={coverLetterData.recipientName}
                  onChange={(v) =>
                    setCoverLetterData((p) => ({ ...p, recipientName: v }))
                  }
                  placeholder="Jane Smith"
                />
                <InputField
                  label="Company Name"
                  value={coverLetterData.companyName}
                  onChange={(v) =>
                    setCoverLetterData((p) => ({ ...p, companyName: v }))
                  }
                  placeholder="Apple"
                />
                <div className="sm:col-span-2">
                  <InputField
                    label="Job Title"
                    value={coverLetterData.jobTitle}
                    onChange={(v) =>
                      setCoverLetterData((p) => ({ ...p, jobTitle: v }))
                    }
                    placeholder="Senior Software Engineer"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">
                    Job Description (optional)
                  </label>
                  <textarea
                    value={coverLetterData.jobDescription}
                    onChange={(e) =>
                      setCoverLetterData((p) => ({
                        ...p,
                        jobDescription: e.target.value,
                      }))
                    }
                    placeholder="Paste the job description here..."
                    rows={3}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500/30"
                  />
                </div>
              </div>
            </div>

            {/* Tone & Key Points */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <MessageSquare className="h-5 w-5 text-primary-400" />
                Tone & Key Points
              </h2>

              {/* Tone selector */}
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                Writing Tone
              </label>
              <div className="mb-4 grid grid-cols-3 gap-2">
                {(['professional', 'enthusiastic', 'creative'] as const).map(
                  (tone) => (
                    <button
                      key={tone}
                      onClick={() =>
                        setCoverLetterData((p) => ({ ...p, tone }))
                      }
                      className={`rounded-lg border px-3 py-2 text-sm font-medium capitalize transition-all ${
                        coverLetterData.tone === tone
                          ? 'border-primary-500 bg-primary-600/20 text-primary-300'
                          : 'border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                      }`}
                    >
                      {tone}
                    </button>
                  )
                )}
              </div>

              {/* Key points */}
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                Key Points to Highlight
              </label>
              <div className="space-y-2">
                {coverLetterData.keyPoints.map((point, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-400" />
                    <span className="flex-1 text-sm text-slate-300">{point}</span>
                    <button
                      onClick={() => removeKeyPoint(i)}
                      className="text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <input
                  value={keyPointInput}
                  onChange={(e) => setKeyPointInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addKeyPoint();
                    }
                  }}
                  placeholder="e.g., 5+ years of React experience"
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none"
                />
                <button
                  onClick={addKeyPoint}
                  className="rounded-lg bg-slate-800 px-3 py-2 text-slate-400 hover:text-white"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !coverLetterData.companyName || !coverLetterData.jobTitle}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-primary-500/20 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  AI is writing...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Cover Letter
                </>
              )}
            </button>
          </div>

          {/* Output side */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <FileText className="h-5 w-5 text-primary-400" />
                  Cover Letter
                </h2>
                {generatedLetter && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition-all hover:bg-slate-700"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-accent-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                    <button
                      onClick={handlePrint}
                      className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition-all hover:bg-slate-700"
                    >
                      <Printer className="h-3.5 w-3.5" />
                      Print
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6">
                {generatedLetter ? (
                  <div className="rounded-xl bg-white p-6 sm:p-8">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-700">
                      {generatedLetter}
                    </pre>
                    {isGenerating && (
                      <span className="mt-1 inline-block h-4 w-0.5 animate-pulse bg-primary-500" />
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800">
                      <PenTool className="h-8 w-8 text-slate-600" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-slate-300">
                      Your cover letter will appear here
                    </h3>
                    <p className="max-w-xs text-sm text-slate-500">
                      Fill in the details on the left and click "Generate Cover Letter" to get started.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500/30"
      />
    </div>
  );
}
