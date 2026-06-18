export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  title: string;
  summary: string;
  photo: string; // base64 data URL
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export type ResumeTemplate = 'modern' | 'classic' | 'minimal' | 'creative';

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  certifications: string[];
  languages: string[];
  template: ResumeTemplate;
}

export interface CoverLetterData {
  recipientName: string;
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  tone: 'professional' | 'enthusiastic' | 'creative';
  keyPoints: string[];
}

export type Page = 'landing' | 'resume' | 'coverLetter';
export type ResumeStep = 'personal' | 'experience' | 'education' | 'skills' | 'preview';
