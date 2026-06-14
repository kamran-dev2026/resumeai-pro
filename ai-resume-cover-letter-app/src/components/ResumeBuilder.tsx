import { useState } from 'react';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Eye,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Sparkles,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { ResumeData, ResumeStep, Experience, Education } from '../types';
import {
  generateSummary,
  generateAchievements,
  generateExperienceDescription,
  simulateAITyping,
} from '../utils/aiGenerator';
import ResumePreview from './ResumePreview';

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    title: '',
    summary: '',
  },
  experiences: [],
  education: [],
  skills: [],
  certifications: [],
  languages: [],
};

const steps: { key: ResumeStep; label: string; icon: React.ReactNode }[] = [
  { key: 'personal', label: 'Personal', icon: <User className="h-4 w-4" /> },
  { key: 'experience', label: 'Experience', icon: <Briefcase className="h-4 w-4" /> },
  { key: 'education', label: 'Education', icon: <GraduationCap className="h-4 w-4" /> },
  { key: 'skills', label: 'Skills', icon: <Wrench className="h-4 w-4" /> },
  { key: 'preview', label: 'Preview', icon: <Eye className="h-4 w-4" /> },
];

export default function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState<ResumeStep>('personal');
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [aiLoading, setAiLoading] = useState<string | null>(null);

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);

  const goNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].key);
    }
  };

  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].key);
    }
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [],
    };
    setResumeData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExp],
    }));
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const handleAIGenerateSummary = async () => {
    setAiLoading('summary');
    const fullText = generateSummary(resumeData.personalInfo.title);
    await simulateAITyping(fullText, (partial) => {
      updatePersonalInfo('summary', partial);
    });
    setAiLoading(null);
  };

  const handleAIGenerateDescription = async (exp: Experience) => {
    setAiLoading(`desc-${exp.id}`);
    const fullText = generateExperienceDescription(exp);
    await simulateAITyping(fullText, (partial) => {
      updateExperience(exp.id, 'description', partial);
    });
    setAiLoading(null);
  };

  const handleAIGenerateAchievements = async (exp: Experience) => {
    setAiLoading(`ach-${exp.id}`);
    const achievements = generateAchievements(exp.position, exp.company);
    await new Promise((r) => setTimeout(r, 800));
    updateExperience(exp.id, 'achievements', achievements);
    setAiLoading(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Step indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(step.key)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    index === currentStepIndex
                      ? 'bg-primary-600/20 text-primary-300 ring-1 ring-primary-500/30'
                      : index < currentStepIndex
                      ? 'text-accent-400'
                      : 'text-slate-500'
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                      index === currentStepIndex
                        ? 'bg-primary-600 text-white'
                        : index < currentStepIndex
                        ? 'bg-accent-500/20 text-accent-400'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {index < currentStepIndex ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-1 hidden h-px w-8 sm:block lg:w-16 ${
                      index < currentStepIndex ? 'bg-accent-500/40' : 'bg-slate-800'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="animate-fade-in">
          {currentStep === 'personal' && (
            <PersonalInfoStep
              data={resumeData.personalInfo}
              onUpdate={updatePersonalInfo}
              onGenerateSummary={handleAIGenerateSummary}
              aiLoading={aiLoading}
            />
          )}
          {currentStep === 'experience' && (
            <ExperienceStep
              experiences={resumeData.experiences}
              onAdd={addExperience}
              onUpdate={updateExperience}
              onRemove={removeExperience}
              onGenerateDescription={handleAIGenerateDescription}
              onGenerateAchievements={handleAIGenerateAchievements}
              aiLoading={aiLoading}
            />
          )}
          {currentStep === 'education' && (
            <EducationStep
              education={resumeData.education}
              onAdd={addEducation}
              onUpdate={updateEducation}
              onRemove={removeEducation}
            />
          )}
          {currentStep === 'skills' && (
            <SkillsStep
              skills={resumeData.skills}
              certifications={resumeData.certifications}
              languages={resumeData.languages}
              onUpdateSkills={(skills) =>
                setResumeData((prev) => ({ ...prev, skills }))
              }
              onUpdateCertifications={(certifications) =>
                setResumeData((prev) => ({ ...prev, certifications }))
              }
              onUpdateLanguages={(languages) =>
                setResumeData((prev) => ({ ...prev, languages }))
              }
            />
          )}
          {currentStep === 'preview' && <ResumePreview data={resumeData} />}
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={goBack}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-slate-400 transition-all hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          {currentStepIndex < steps.length - 1 && (
            <button
              onClick={goNext}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 transition-all hover:scale-105"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ========================= Step Components ========================= */

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
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

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  aiButton,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  aiButton?: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-sm font-medium text-slate-300">{label}</label>
        {aiButton}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500/30"
      />
    </div>
  );
}

function AIButton({
  onClick,
  loading,
  label = 'AI Generate',
}: {
  onClick: () => void;
  loading: boolean;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary-600/80 to-purple-600/80 px-3 py-1 text-xs font-medium text-white transition-all hover:from-primary-600 hover:to-purple-600 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <Sparkles className="h-3 w-3" />
      )}
      {label}
    </button>
  );
}

function PersonalInfoStep({
  data,
  onUpdate,
  onGenerateSummary,
  aiLoading,
}: {
  data: ResumeData['personalInfo'];
  onUpdate: (field: string, value: string) => void;
  onGenerateSummary: () => void;
  aiLoading: string | null;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
      <SectionTitle
        title="Personal Information"
        subtitle="Let's start with your basic details"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Full Name"
          value={data.fullName}
          onChange={(v) => onUpdate('fullName', v)}
          placeholder="John Doe"
        />
        <InputField
          label="Professional Title"
          value={data.title}
          onChange={(v) => onUpdate('title', v)}
          placeholder="Senior Software Engineer"
        />
        <InputField
          label="Email"
          value={data.email}
          onChange={(v) => onUpdate('email', v)}
          placeholder="john@example.com"
          type="email"
        />
        <InputField
          label="Phone"
          value={data.phone}
          onChange={(v) => onUpdate('phone', v)}
          placeholder="+1 (555) 123-4567"
        />
        <InputField
          label="Location"
          value={data.location}
          onChange={(v) => onUpdate('location', v)}
          placeholder="San Francisco, CA"
        />
        <InputField
          label="LinkedIn URL"
          value={data.linkedin}
          onChange={(v) => onUpdate('linkedin', v)}
          placeholder="linkedin.com/in/johndoe"
        />
        <div className="sm:col-span-2">
          <InputField
            label="Website / Portfolio"
            value={data.website}
            onChange={(v) => onUpdate('website', v)}
            placeholder="johndoe.dev"
          />
        </div>
        <div className="sm:col-span-2">
          <TextareaField
            label="Professional Summary"
            value={data.summary}
            onChange={(v) => onUpdate('summary', v)}
            placeholder="A brief summary of your professional background and career objectives..."
            rows={4}
            aiButton={
              <AIButton
                onClick={onGenerateSummary}
                loading={aiLoading === 'summary'}
                label="AI Generate Summary"
              />
            }
          />
        </div>
      </div>
    </div>
  );
}

function ExperienceStep({
  experiences,
  onAdd,
  onUpdate,
  onRemove,
  onGenerateDescription,
  onGenerateAchievements,
  aiLoading,
}: {
  experiences: Experience[];
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: any) => void;
  onRemove: (id: string) => void;
  onGenerateDescription: (exp: Experience) => void;
  onGenerateAchievements: (exp: Experience) => void;
  aiLoading: string | null;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <SectionTitle
            title="Work Experience"
            subtitle="Add your professional experience"
          />
          <button
            onClick={onAdd}
            className="flex items-center gap-2 rounded-lg bg-primary-600/20 px-4 py-2 text-sm font-medium text-primary-300 transition-all hover:bg-primary-600/30"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>

        {experiences.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-700 py-12 text-center">
            <Briefcase className="mx-auto mb-3 h-10 w-10 text-slate-600" />
            <p className="text-sm text-slate-500">No experience added yet</p>
            <button
              onClick={onAdd}
              className="mt-3 text-sm font-medium text-primary-400 hover:text-primary-300"
            >
              + Add your first experience
            </button>
          </div>
        )}

        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className="animate-fade-in rounded-xl border border-slate-700/50 bg-slate-800/30 p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-300">
                  Experience #{idx + 1}
                </h3>
                <button
                  onClick={() => onRemove(exp.id)}
                  className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Company"
                  value={exp.company}
                  onChange={(v) => onUpdate(exp.id, 'company', v)}
                  placeholder="Google"
                />
                <InputField
                  label="Position"
                  value={exp.position}
                  onChange={(v) => onUpdate(exp.id, 'position', v)}
                  placeholder="Senior Developer"
                />
                <InputField
                  label="Start Date"
                  value={exp.startDate}
                  onChange={(v) => onUpdate(exp.id, 'startDate', v)}
                  placeholder="Jan 2020"
                />
                <div>
                  <InputField
                    label="End Date"
                    value={exp.current ? 'Present' : exp.endDate}
                    onChange={(v) => onUpdate(exp.id, 'endDate', v)}
                    placeholder="Dec 2023"
                  />
                  <label className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) =>
                        onUpdate(exp.id, 'current', e.target.checked)
                      }
                      className="rounded border-slate-600 bg-slate-800"
                    />
                    Currently working here
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <TextareaField
                    label="Description"
                    value={exp.description}
                    onChange={(v) => onUpdate(exp.id, 'description', v)}
                    placeholder="Describe your role and responsibilities..."
                    rows={3}
                    aiButton={
                      <AIButton
                        onClick={() => onGenerateDescription(exp)}
                        loading={aiLoading === `desc-${exp.id}`}
                        label="AI Write"
                      />
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-300">
                      Key Achievements
                    </label>
                    <AIButton
                      onClick={() => onGenerateAchievements(exp)}
                      loading={aiLoading === `ach-${exp.id}`}
                      label="AI Generate"
                    />
                  </div>
                  {exp.achievements.length > 0 ? (
                    <ul className="space-y-2">
                      {exp.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-400" />
                          <input
                            value={ach}
                            onChange={(e) => {
                              const newAch = [...exp.achievements];
                              newAch[i] = e.target.value;
                              onUpdate(exp.id, 'achievements', newAch);
                            }}
                            className="w-full rounded border border-slate-700/50 bg-transparent px-2 py-1 text-sm text-slate-300 focus:border-primary-500 focus:outline-none"
                          />
                          <button
                            onClick={() => {
                              const newAch = exp.achievements.filter((_, idx) => idx !== i);
                              onUpdate(exp.id, 'achievements', newAch);
                            }}
                            className="flex-shrink-0 text-slate-600 hover:text-red-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500">
                      Click "AI Generate" to create achievements, or add them manually.
                    </p>
                  )}
                  <button
                    onClick={() =>
                      onUpdate(exp.id, 'achievements', [...exp.achievements, ''])
                    }
                    className="mt-2 text-xs text-primary-400 hover:text-primary-300"
                  >
                    + Add achievement
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EducationStep({
  education,
  onAdd,
  onUpdate,
  onRemove,
}: {
  education: Education[];
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <SectionTitle
          title="Education"
          subtitle="Add your educational background"
        />
        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-lg bg-primary-600/20 px-4 py-2 text-sm font-medium text-primary-300 transition-all hover:bg-primary-600/30"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      {education.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-700 py-12 text-center">
          <GraduationCap className="mx-auto mb-3 h-10 w-10 text-slate-600" />
          <p className="text-sm text-slate-500">No education added yet</p>
          <button
            onClick={onAdd}
            className="mt-3 text-sm font-medium text-primary-400 hover:text-primary-300"
          >
            + Add your education
          </button>
        </div>
      )}

      <div className="space-y-6">
        {education.map((edu, idx) => (
          <div
            key={edu.id}
            className="animate-fade-in rounded-xl border border-slate-700/50 bg-slate-800/30 p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-300">
                Education #{idx + 1}
              </h3>
              <button
                onClick={() => onRemove(edu.id)}
                className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                label="Institution"
                value={edu.institution}
                onChange={(v) => onUpdate(edu.id, 'institution', v)}
                placeholder="MIT"
              />
              <InputField
                label="Degree"
                value={edu.degree}
                onChange={(v) => onUpdate(edu.id, 'degree', v)}
                placeholder="Bachelor of Science"
              />
              <InputField
                label="Field of Study"
                value={edu.field}
                onChange={(v) => onUpdate(edu.id, 'field', v)}
                placeholder="Computer Science"
              />
              <InputField
                label="GPA (optional)"
                value={edu.gpa}
                onChange={(v) => onUpdate(edu.id, 'gpa', v)}
                placeholder="3.8 / 4.0"
              />
              <InputField
                label="Start Date"
                value={edu.startDate}
                onChange={(v) => onUpdate(edu.id, 'startDate', v)}
                placeholder="Sep 2016"
              />
              <InputField
                label="End Date"
                value={edu.endDate}
                onChange={(v) => onUpdate(edu.id, 'endDate', v)}
                placeholder="Jun 2020"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TagInput({
  label,
  tags,
  onUpdate,
  placeholder,
  suggestions,
}: {
  label: string;
  tags: string[];
  onUpdate: (tags: string[]) => void;
  placeholder: string;
  suggestions?: string[];
}) {
  const [input, setInput] = useState('');

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onUpdate([...tags, trimmed]);
    }
    setInput('');
  };

  const removeTag = (index: number) => {
    onUpdate(tags.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3">
        <div className="mb-2 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 rounded-full bg-primary-600/20 px-3 py-1 text-xs font-medium text-primary-300"
            >
              {tag}
              <button
                onClick={() => removeTag(i)}
                className="hover:text-red-400"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              addTag(input);
            }
          }}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
        />
      </div>
      {suggestions && suggestions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {suggestions
            .filter((s) => !tags.includes(s))
            .slice(0, 10)
            .map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => addTag(suggestion)}
                className="rounded-full border border-slate-700 px-2.5 py-0.5 text-xs text-slate-400 transition-colors hover:border-primary-500/50 hover:text-primary-300"
              >
                + {suggestion}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

function SkillsStep({
  skills,
  certifications,
  languages,
  onUpdateSkills,
  onUpdateCertifications,
  onUpdateLanguages,
}: {
  skills: string[];
  certifications: string[];
  languages: string[];
  onUpdateSkills: (skills: string[]) => void;
  onUpdateCertifications: (certs: string[]) => void;
  onUpdateLanguages: (langs: string[]) => void;
}) {
  const skillSuggestions = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java',
    'SQL', 'AWS', 'Docker', 'Git', 'Agile', 'Machine Learning',
    'Data Analysis', 'Project Management', 'Communication', 'Leadership',
    'Problem Solving', 'Critical Thinking', 'Teamwork', 'Time Management',
  ];

  const langSuggestions = [
    'English', 'Spanish', 'French', 'German', 'Mandarin', 'Japanese',
    'Korean', 'Portuguese', 'Arabic', 'Hindi', 'Italian', 'Russian',
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
      <SectionTitle
        title="Skills & More"
        subtitle="Add your skills, certifications, and languages"
      />
      <div className="space-y-6">
        <TagInput
          label="Skills"
          tags={skills}
          onUpdate={onUpdateSkills}
          placeholder="Type a skill and press Enter..."
          suggestions={skillSuggestions}
        />
        <TagInput
          label="Certifications"
          tags={certifications}
          onUpdate={onUpdateCertifications}
          placeholder="e.g., AWS Certified Solutions Architect"
        />
        <TagInput
          label="Languages"
          tags={languages}
          onUpdate={onUpdateLanguages}
          placeholder="e.g., English (Native)"
          suggestions={langSuggestions}
        />
      </div>
    </div>
  );
}
