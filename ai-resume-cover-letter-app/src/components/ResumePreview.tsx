import { useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Link2,
  Printer,
  Download,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
} from 'lucide-react';
import { ResumeData } from '../types';

interface ResumePreviewProps {
  data: ResumeData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const { personalInfo, experiences, education, skills, certifications, languages } = data;

  const handlePrint = () => {
    const content = resumeRef.current;
    if (!content) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${personalInfo.fullName || 'Resume'}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', system-ui, sans-serif; color: #1e293b; line-height: 1.5; padding: 40px; }
          .resume-header { text-align: center; margin-bottom: 24px; border-bottom: 2px solid #6366f1; padding-bottom: 16px; }
          .resume-header h1 { font-size: 28px; font-weight: 700; color: #0f172a; }
          .resume-header .title { font-size: 16px; color: #6366f1; margin-top: 4px; }
          .contact-row { display: flex; justify-content: center; gap: 16px; margin-top: 8px; font-size: 12px; color: #64748b; flex-wrap: wrap; }
          .section { margin-top: 20px; }
          .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #6366f1; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 12px; }
          .summary { font-size: 13px; color: #475569; }
          .exp-item { margin-bottom: 16px; }
          .exp-header { display: flex; justify-content: space-between; align-items: baseline; }
          .exp-position { font-size: 15px; font-weight: 600; color: #0f172a; }
          .exp-company { font-size: 13px; color: #6366f1; }
          .exp-date { font-size: 12px; color: #94a3b8; }
          .exp-desc { font-size: 13px; color: #475569; margin-top: 4px; }
          .achievements { margin-top: 6px; padding-left: 16px; }
          .achievements li { font-size: 12px; color: #475569; margin-bottom: 3px; }
          .edu-item { margin-bottom: 12px; }
          .edu-degree { font-size: 14px; font-weight: 600; color: #0f172a; }
          .edu-school { font-size: 13px; color: #64748b; }
          .skills-list { display: flex; flex-wrap: wrap; gap: 6px; }
          .skill-tag { background: #eef2ff; color: #4f46e5; padding: 3px 10px; border-radius: 12px; font-size: 12px; }
          .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        </style>
      </head>
      <body>
        ${content.innerHTML}
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const isEmpty =
    !personalInfo.fullName &&
    experiences.length === 0 &&
    education.length === 0 &&
    skills.length === 0;

  if (isEmpty) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
        <Download className="mx-auto mb-4 h-12 w-12 text-slate-600" />
        <h3 className="mb-2 text-xl font-semibold text-slate-300">
          Nothing to preview yet
        </h3>
        <p className="text-sm text-slate-500">
          Go back and fill in your details to see your resume preview here.
        </p>
      </div>
    );
  }

  return (
    <div>
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
        <div
          ref={resumeRef}
          className="bg-white p-8 text-slate-800 sm:p-12"
          style={{ minHeight: '800px' }}
        >
          {/* Header */}
          <div className="resume-header border-b-2 border-primary-500 pb-4 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.title && (
              <p className="title mt-1 text-lg font-medium text-primary-600">
                {personalInfo.title}
              </p>
            )}
            <div className="contact-row mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1">
                  <Link2 className="h-3 w-3" />
                  {personalInfo.linkedin}
                </span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {personalInfo.website}
                </span>
              )}
            </div>
          </div>

          {/* Summary */}
          {personalInfo.summary && (
            <div className="section mt-5">
              <h2 className="section-title mb-2 text-xs font-bold uppercase tracking-widest text-primary-600">
                Professional Summary
              </h2>
              <p className="summary text-sm leading-relaxed text-slate-600">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div className="section mt-6">
              <h2 className="section-title mb-3 flex items-center gap-2 border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-widest text-primary-600">
                <Briefcase className="h-3.5 w-3.5" />
                Professional Experience
              </h2>
              <div className="space-y-5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="exp-item">
                    <div className="exp-header flex items-baseline justify-between">
                      <div>
                        <h3 className="exp-position text-base font-semibold text-slate-900">
                          {exp.position || 'Position'}
                        </h3>
                        <p className="exp-company text-sm font-medium text-primary-600">
                          {exp.company || 'Company'}
                        </p>
                      </div>
                      <span className="exp-date text-xs text-slate-400">
                        {exp.startDate || 'Start'} — {exp.current ? 'Present' : exp.endDate || 'End'}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="exp-desc mt-2 text-sm text-slate-600">
                        {exp.description}
                      </p>
                    )}
                    {exp.achievements.length > 0 && (
                      <ul className="achievements mt-2 list-disc space-y-1 pl-5">
                        {exp.achievements.filter(a => a.trim()).map((ach, i) => (
                          <li key={i} className="text-xs text-slate-600">
                            {ach}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="section mt-6">
              <h2 className="section-title mb-3 flex items-center gap-2 border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-widest text-primary-600">
                <GraduationCap className="h-3.5 w-3.5" />
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="edu-item">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <h3 className="edu-degree text-sm font-semibold text-slate-900">
                          {edu.degree} {edu.field && `in ${edu.field}`}
                        </h3>
                        <p className="edu-school text-sm text-slate-500">
                          {edu.institution}
                          {edu.gpa && ` — GPA: ${edu.gpa}`}
                        </p>
                      </div>
                      <span className="text-xs text-slate-400">
                        {edu.startDate} — {edu.endDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills, Certifications, Languages */}
          <div className={`mt-6 ${(certifications.length > 0 || languages.length > 0) ? 'two-col grid grid-cols-1 gap-6 sm:grid-cols-2' : ''}`}>
            {skills.length > 0 && (
              <div className={`section ${certifications.length === 0 && languages.length === 0 ? '' : ''}`}>
                <h2 className="section-title mb-2 flex items-center gap-2 border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-widest text-primary-600">
                  Skills
                </h2>
                <div className="skills-list flex flex-wrap gap-1.5">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className="skill-tag rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              {certifications.length > 0 && (
                <div className="section">
                  <h2 className="section-title mb-2 flex items-center gap-2 border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-widest text-primary-600">
                    <Award className="h-3.5 w-3.5" />
                    Certifications
                  </h2>
                  <ul className="space-y-1">
                    {certifications.map((cert, i) => (
                      <li key={i} className="text-sm text-slate-600">
                        • {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {languages.length > 0 && (
                <div className="section">
                  <h2 className="section-title mb-2 flex items-center gap-2 border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-widest text-primary-600">
                    <Languages className="h-3.5 w-3.5" />
                    Languages
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {languages.map((lang, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-slate-200 px-2.5 py-0.5 text-xs text-slate-600"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
