import { useRef } from 'react';
import {
  Printer,
  Download,
  Lock,
  Crown,
  Palette,
  Sparkles,
} from 'lucide-react';
import { ResumeData, ResumeTemplate } from '../types';

interface ResumePreviewProps {
  data: ResumeData;
  template: ResumeTemplate;
  onTemplateChange: (template: ResumeTemplate) => void;
}

const templateMeta: {
  key: ResumeTemplate;
  name: string;
  desc: string;
  colors: string[];
  premium: boolean;
}[] = [
  {
    key: 'modern',
    name: 'Modern',
    desc: 'Clean & professional with accent colors',
    colors: ['#6366f1', '#818cf8', '#eef2ff'],
    premium: false,
  },
  {
    key: 'classic',
    name: 'Classic',
    desc: 'Traditional layout, timeless design',
    colors: ['#1e293b', '#475569', '#f8fafc'],
    premium: false,
  },
  {
    key: 'minimal',
    name: 'Minimal',
    desc: 'Simple, elegant and distraction-free',
    colors: ['#0f172a', '#94a3b8', '#ffffff'],
    premium: false,
  },
  {
    key: 'creative',
    name: 'Creative',
    desc: 'Bold colors & unique sidebar layout',
    colors: ['#7c3aed', '#a78bfa', '#faf5ff'],
    premium: false,
  },
];

export default function ResumePreview({ data, template, onTemplateChange }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const { personalInfo, experiences, education, skills } = data;

  const handlePrint = () => {
    const content = resumeRef.current;
    if (!content) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const photoStyle = personalInfo.photo
      ? `
      .photo-circle { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; }
      .photo-square { width: 100%; height: 160px; object-fit: cover; }
      `
      : '';

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${personalInfo.fullName || 'Resume'}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', system-ui, sans-serif; color: #1e293b; line-height: 1.5; }
          ${photoStyle}
          img { max-width: 100%; }
        </style>
      </head>
      <body>
        ${content.innerHTML}
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 300);
  };

  const isEmpty =
    !personalInfo.fullName &&
    experiences.length === 0 &&
    education.length === 0 &&
    skills.length === 0;

  return (
    <div>
      {/* Template Selector */}
      <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
        <div className="mb-4 flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary-400" />
          <h3 className="text-base font-semibold text-white">Choose Template</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {templateMeta.map((t) => (
            <button
              key={t.key}
              onClick={() => {
                if (!t.premium) onTemplateChange(t.key);
              }}
              className={`group relative overflow-hidden rounded-xl border-2 p-3 text-left transition-all ${
                template === t.key
                  ? 'border-primary-500 bg-primary-600/10 shadow-lg shadow-primary-500/10'
                  : t.premium
                  ? 'border-slate-700/50 bg-slate-800/30 opacity-60'
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
              }`}
            >
              {/* Mini preview */}
              <div className="mb-2 flex gap-1">
                {t.colors.map((c, i) => (
                  <div
                    key={i}
                    className="h-3 flex-1 rounded-sm"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              {/* Template thumbnail lines */}
              <div className="mb-2 space-y-1">
                <div className="h-1.5 w-3/4 rounded-full" style={{ backgroundColor: t.colors[0] + '40' }} />
                <div className="h-1 w-full rounded-full bg-slate-600/30" />
                <div className="h-1 w-5/6 rounded-full bg-slate-600/30" />
                <div className="h-1 w-2/3 rounded-full bg-slate-600/30" />
              </div>
              <p className="text-xs font-semibold text-white">{t.name}</p>
              <p className="text-[10px] text-slate-400">{t.desc}</p>
              {t.premium && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-[1px]">
                  <div className="flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-1 text-[10px] font-bold text-amber-400">
                    <Crown className="h-3 w-3" />
                    Premium
                  </div>
                </div>
              )}
              {template === t.key && (
                <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Premium teaser */}
        <div className="mt-4 flex items-center justify-between rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-orange-500/5 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20">
              <Crown className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-300">Unlock Premium Templates</p>
              <p className="text-xs text-slate-400">Get Executive, Tech, Designer & more exclusive templates</p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-amber-500/20 transition-all hover:scale-105">
            <Lock className="h-3 w-3" />
            Coming Soon
          </button>
        </div>
      </div>

      {isEmpty ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
          <Download className="mx-auto mb-4 h-12 w-12 text-slate-600" />
          <h3 className="mb-2 text-xl font-semibold text-slate-300">
            Nothing to preview yet
          </h3>
          <p className="text-sm text-slate-500">
            Go back and fill in your details to see your resume preview here.
          </p>
        </div>
      ) : (
        <>
          {/* Action bar */}
          <div className="no-print mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Resume Preview</h2>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary-500"
            >
              <Printer className="h-4 w-4" />
              Print / Save PDF
            </button>
          </div>

          {/* Resume document */}
          <div className="overflow-hidden rounded-2xl border border-slate-700 shadow-2xl">
            <div ref={resumeRef}>
              {template === 'modern' && <ModernTemplate data={data} />}
              {template === 'classic' && <ClassicTemplate data={data} />}
              {template === 'minimal' && <MinimalTemplate data={data} />}
              {template === 'creative' && <CreativeTemplate data={data} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ================================================================
   SHARED HELPERS
   ================================================================ */

function PhotoAvatar({ src, size = 80, rounded = true }: { src: string; size?: number; rounded?: boolean }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt="Profile"
      style={{ width: size, height: size }}
      className={`object-cover ${rounded ? 'rounded-full' : 'rounded-lg'}`}
    />
  );
}

/* ================================================================
   1. MODERN TEMPLATE
   ================================================================ */

function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills, certifications, languages } = data;

  return (
    <div className="bg-white" style={{ minHeight: 900, fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header band */}
      <div style={{ backgroundColor: '#6366f1', padding: '32px 40px', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {personalInfo.photo && (
            <PhotoAvatar src={personalInfo.photo} size={90} />
          )}
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.title && (
              <p style={{ fontSize: 16, opacity: 0.9, marginTop: 2, fontWeight: 500 }}>
                {personalInfo.title}
              </p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 10, fontSize: 12, opacity: 0.85 }}>
              {personalInfo.email && <span>✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span>☎ {personalInfo.phone}</span>}
              {personalInfo.location && <span>📍 {personalInfo.location}</span>}
              {personalInfo.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
              {personalInfo.website && <span>🌐 {personalInfo.website}</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '28px 40px' }}>
        {/* Summary */}
        {personalInfo.summary && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#6366f1', borderBottom: '2px solid #e0e7ff', paddingBottom: 4, marginBottom: 10 }}>
              Professional Summary
            </h2>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: '#475569' }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#6366f1', borderBottom: '2px solid #e0e7ff', paddingBottom: 4, marginBottom: 10 }}>
              Experience
            </h2>
            {experiences.map((exp) => (
              <div key={exp.id} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>{exp.position || 'Position'}</h3>
                    <p style={{ fontSize: 13, fontWeight: 500, color: '#6366f1' }}>{exp.company || 'Company'}</p>
                  </div>
                  <span style={{ fontSize: 12, color: '#94a3b8', whiteSpace: 'nowrap' }}>
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && <p style={{ fontSize: 12.5, color: '#475569', marginTop: 4 }}>{exp.description}</p>}
                {exp.achievements.filter(a => a.trim()).length > 0 && (
                  <ul style={{ paddingLeft: 18, marginTop: 6 }}>
                    {exp.achievements.filter(a => a.trim()).map((a, i) => (
                      <li key={i} style={{ fontSize: 12, color: '#475569', marginBottom: 2 }}>{a}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#6366f1', borderBottom: '2px solid #e0e7ff', paddingBottom: 4, marginBottom: 10 }}>
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                    <p style={{ fontSize: 13, color: '#64748b' }}>{edu.institution}{edu.gpa && ` — GPA: ${edu.gpa}`}</p>
                  </div>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>{edu.startDate} — {edu.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#6366f1', borderBottom: '2px solid #e0e7ff', paddingBottom: 4, marginBottom: 10 }}>
              Skills
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.map((s, i) => (
                <span key={i} style={{ backgroundColor: '#eef2ff', color: '#4f46e5', padding: '3px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500 }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom row */}
        <div style={{ display: 'grid', gridTemplateColumns: certifications.length > 0 && languages.length > 0 ? '1fr 1fr' : '1fr', gap: 20 }}>
          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#6366f1', borderBottom: '2px solid #e0e7ff', paddingBottom: 4, marginBottom: 10 }}>Certifications</h2>
              {certifications.map((c, i) => <p key={i} style={{ fontSize: 12, color: '#475569', marginBottom: 2 }}>• {c}</p>)}
            </div>
          )}
          {languages.length > 0 && (
            <div>
              <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#6366f1', borderBottom: '2px solid #e0e7ff', paddingBottom: 4, marginBottom: 10 }}>Languages</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {languages.map((l, i) => <span key={i} style={{ border: '1px solid #e2e8f0', padding: '2px 10px', borderRadius: 20, fontSize: 12, color: '#475569' }}>{l}</span>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   2. CLASSIC TEMPLATE
   ================================================================ */

function ClassicTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills, certifications, languages } = data;

  return (
    <div className="bg-white" style={{ minHeight: 900, fontFamily: "'Inter', Georgia, serif", padding: '40px 48px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', borderBottom: '3px double #1e293b', paddingBottom: 20, marginBottom: 24 }}>
        {personalInfo.photo && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <PhotoAvatar src={personalInfo.photo} size={85} />
          </div>
        )}
        <h1 style={{ fontSize: 30, fontWeight: 700, color: '#0f172a', letterSpacing: 2, textTransform: 'uppercase' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.title && (
          <p style={{ fontSize: 14, color: '#64748b', marginTop: 4, fontStyle: 'italic' }}>{personalInfo.title}</p>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 14, marginTop: 10, fontSize: 12, color: '#64748b' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>| {personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#1e293b', borderBottom: '1px solid #cbd5e1', paddingBottom: 4, marginBottom: 8 }}>
            Profile
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: '#475569' }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#1e293b', borderBottom: '1px solid #cbd5e1', paddingBottom: 4, marginBottom: 10 }}>
            Professional Experience
          </h2>
          {experiences.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{exp.position}</h3>
                  <p style={{ fontSize: 13, color: '#475569', fontStyle: 'italic' }}>{exp.company}</p>
                </div>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              {exp.description && <p style={{ fontSize: 12.5, color: '#475569', marginTop: 4 }}>{exp.description}</p>}
              {exp.achievements.filter(a => a.trim()).length > 0 && (
                <ul style={{ paddingLeft: 18, marginTop: 6 }}>
                  {exp.achievements.filter(a => a.trim()).map((a, i) => (
                    <li key={i} style={{ fontSize: 12, color: '#475569', marginBottom: 2 }}>{a}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#1e293b', borderBottom: '1px solid #cbd5e1', paddingBottom: 4, marginBottom: 10 }}>
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                <p style={{ fontSize: 13, color: '#64748b' }}>{edu.institution}{edu.gpa && `, GPA: ${edu.gpa}`}</p>
              </div>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>{edu.startDate} — {edu.endDate}</span>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#1e293b', borderBottom: '1px solid #cbd5e1', paddingBottom: 4, marginBottom: 8 }}>
            Skills
          </h2>
          <p style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.8 }}>{skills.join('  •  ')}</p>
        </div>
      )}

      {/* Certifications & Languages */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {certifications.length > 0 && (
          <div>
            <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#1e293b', borderBottom: '1px solid #cbd5e1', paddingBottom: 4, marginBottom: 8 }}>Certifications</h2>
            {certifications.map((c, i) => <p key={i} style={{ fontSize: 12, color: '#475569', marginBottom: 2 }}>• {c}</p>)}
          </div>
        )}
        {languages.length > 0 && (
          <div>
            <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#1e293b', borderBottom: '1px solid #cbd5e1', paddingBottom: 4, marginBottom: 8 }}>Languages</h2>
            <p style={{ fontSize: 12.5, color: '#475569' }}>{languages.join('  •  ')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================================================
   3. MINIMAL TEMPLATE
   ================================================================ */

function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills, certifications, languages } = data;

  return (
    <div className="bg-white" style={{ minHeight: 900, fontFamily: "'Inter', system-ui, sans-serif", padding: '48px 56px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
        {personalInfo.photo && (
          <PhotoAvatar src={personalInfo.photo} size={70} />
        )}
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 300, color: '#0f172a', letterSpacing: 0.5 }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.title && (
            <p style={{ fontSize: 14, color: '#94a3b8', marginTop: 2, fontWeight: 400 }}>{personalInfo.title}</p>
          )}
        </div>
      </div>

      {/* Contact line */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, fontSize: 12, color: '#94a3b8', marginBottom: 28, paddingBottom: 20, borderBottom: '1px solid #f1f5f9' }}>
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.phone && <span>{personalInfo.phone}</span>}
        {personalInfo.location && <span>{personalInfo.location}</span>}
        {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        {personalInfo.website && <span>{personalInfo.website}</span>}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 13, lineHeight: 1.8, color: '#64748b', fontWeight: 300 }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 3, color: '#94a3b8', marginBottom: 16 }}>
            Experience
          </h2>
          {experiences.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 20, paddingLeft: 16, borderLeft: '2px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{exp.position}</h3>
                <span style={{ fontSize: 11, color: '#cbd5e1' }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>{exp.company}</p>
              {exp.description && <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>{exp.description}</p>}
              {exp.achievements.filter(a => a.trim()).length > 0 && (
                <ul style={{ paddingLeft: 16, marginTop: 6 }}>
                  {exp.achievements.filter(a => a.trim()).map((a, i) => (
                    <li key={i} style={{ fontSize: 11.5, color: '#64748b', marginBottom: 2, lineHeight: 1.5 }}>{a}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 3, color: '#94a3b8', marginBottom: 16 }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 10, paddingLeft: 16, borderLeft: '2px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                <span style={{ fontSize: 11, color: '#cbd5e1' }}>{edu.startDate} — {edu.endDate}</span>
              </div>
              <p style={{ fontSize: 12, color: '#94a3b8' }}>{edu.institution}{edu.gpa && ` — ${edu.gpa}`}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 3, color: '#94a3b8', marginBottom: 12 }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skills.map((s, i) => <span key={i} style={{ fontSize: 12, color: '#64748b', padding: '2px 0' }}>{s}{i < skills.length - 1 ? '  ·' : ''}</span>)}
          </div>
        </div>
      )}

      {certifications.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 3, color: '#94a3b8', marginBottom: 10 }}>Certifications</h2>
          {certifications.map((c, i) => <p key={i} style={{ fontSize: 12, color: '#64748b', marginBottom: 2 }}>{c}</p>)}
        </div>
      )}

      {languages.length > 0 && (
        <div>
          <h2 style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 3, color: '#94a3b8', marginBottom: 10 }}>Languages</h2>
          <p style={{ fontSize: 12, color: '#64748b' }}>{languages.join('  ·  ')}</p>
        </div>
      )}
    </div>
  );
}

/* ================================================================
   4. CREATIVE TEMPLATE (Sidebar layout)
   ================================================================ */

function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills, certifications, languages } = data;

  return (
    <div className="bg-white" style={{ minHeight: 900, fontFamily: "'Inter', system-ui, sans-serif", display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: 240, backgroundColor: '#1e1b4b', color: 'white', padding: '32px 24px', flexShrink: 0 }}>
        {/* Photo */}
        {personalInfo.photo && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <img
              src={personalInfo.photo}
              alt="Profile"
              style={{ width: 110, height: 110, borderRadius: '50%', objectFit: 'cover', border: '4px solid rgba(167, 139, 250, 0.4)' }}
            />
          </div>
        )}

        {/* Contact */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#a78bfa', marginBottom: 10 }}>Contact</h3>
          <div style={{ fontSize: 11.5, lineHeight: 2, color: '#c4b5fd' }}>
            {personalInfo.email && <p>✉ {personalInfo.email}</p>}
            {personalInfo.phone && <p>☎ {personalInfo.phone}</p>}
            {personalInfo.location && <p>📍 {personalInfo.location}</p>}
            {personalInfo.linkedin && <p>🔗 {personalInfo.linkedin}</p>}
            {personalInfo.website && <p>🌐 {personalInfo.website}</p>}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#a78bfa', marginBottom: 10 }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {skills.map((s, i) => (
                <span key={i} style={{ backgroundColor: 'rgba(167, 139, 250, 0.15)', color: '#c4b5fd', padding: '3px 10px', borderRadius: 14, fontSize: 11, fontWeight: 500 }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#a78bfa', marginBottom: 10 }}>Languages</h3>
            {languages.map((l, i) => (
              <p key={i} style={{ fontSize: 12, color: '#c4b5fd', marginBottom: 4 }}>• {l}</p>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#a78bfa', marginBottom: 10 }}>Certifications</h3>
            {certifications.map((c, i) => (
              <p key={i} style={{ fontSize: 11, color: '#c4b5fd', marginBottom: 4 }}>• {c}</p>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '32px 36px' }}>
        {/* Name */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1e1b4b' }}>{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.title && (
            <p style={{ fontSize: 15, color: '#7c3aed', fontWeight: 600, marginTop: 2 }}>{personalInfo.title}</p>
          )}
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div style={{ marginBottom: 24, padding: '14px 18px', backgroundColor: '#faf5ff', borderRadius: 10, borderLeft: '4px solid #7c3aed' }}>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: '#475569' }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#7c3aed', marginBottom: 14, paddingBottom: 4, borderBottom: '2px solid #ede9fe' }}>
              Experience
            </h2>
            {experiences.map((exp) => (
              <div key={exp.id} style={{ marginBottom: 18, position: 'relative', paddingLeft: 16 }}>
                <div style={{ position: 'absolute', left: 0, top: 6, width: 8, height: 8, borderRadius: '50%', backgroundColor: '#7c3aed' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{exp.position}</h3>
                  <span style={{ fontSize: 11, color: '#a78bfa', fontWeight: 600 }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontSize: 12.5, color: '#7c3aed', fontWeight: 500 }}>{exp.company}</p>
                {exp.description && <p style={{ fontSize: 12, color: '#475569', marginTop: 4, lineHeight: 1.6 }}>{exp.description}</p>}
                {exp.achievements.filter(a => a.trim()).length > 0 && (
                  <ul style={{ paddingLeft: 16, marginTop: 6 }}>
                    {exp.achievements.filter(a => a.trim()).map((a, i) => (
                      <li key={i} style={{ fontSize: 11.5, color: '#475569', marginBottom: 2 }}>{a}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#7c3aed', marginBottom: 14, paddingBottom: 4, borderBottom: '2px solid #ede9fe' }}>
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: 12, paddingLeft: 16, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 6, width: 8, height: 8, borderRadius: '50%', backgroundColor: '#7c3aed' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <span style={{ fontSize: 11, color: '#a78bfa' }}>{edu.startDate} — {edu.endDate}</span>
                </div>
                <p style={{ fontSize: 12, color: '#64748b' }}>{edu.institution}{edu.gpa && ` — GPA: ${edu.gpa}`}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
