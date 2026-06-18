import { ResumeData, CoverLetterData, Experience } from '../types';

const summaryTemplates = [
  "Results-driven {title} with a proven track record of delivering high-impact solutions. Skilled in leveraging cutting-edge technologies and methodologies to drive business growth and operational efficiency. Passionate about innovation, continuous learning, and building collaborative teams that exceed expectations.",
  "Dynamic and detail-oriented {title} with extensive experience in developing and implementing strategic initiatives. Adept at problem-solving, cross-functional collaboration, and translating complex requirements into actionable outcomes. Committed to driving measurable results and fostering a culture of excellence.",
  "Accomplished {title} with a strong foundation in analytical thinking and creative problem-solving. Known for building strong stakeholder relationships, leading high-performing teams, and delivering projects on time and within budget. Eager to contribute expertise to forward-thinking organizations.",
  "Innovative {title} combining technical expertise with strategic vision to deliver transformative solutions. Experienced in managing end-to-end project lifecycles, optimizing processes, and mentoring team members. Dedicated to continuous improvement and staying at the forefront of industry trends.",
];

const achievementTemplates = [
  "Spearheaded the development of {task}, resulting in a 35% increase in team productivity and significant cost savings.",
  "Led a cross-functional team of 8+ members to successfully deliver {task} ahead of schedule and under budget.",
  "Implemented innovative solutions for {task}, improving customer satisfaction scores by 28% within the first quarter.",
  "Designed and executed a comprehensive strategy for {task}, generating $500K+ in new revenue streams.",
  "Optimized existing processes for {task}, reducing operational costs by 22% while maintaining quality standards.",
  "Collaborated with stakeholders to define requirements for {task}, ensuring alignment with business objectives and user needs.",
  "Mentored junior team members in {task}, fostering professional growth and improving team retention by 40%.",
  "Pioneered the adoption of new methodologies for {task}, establishing best practices that were adopted company-wide.",
];

const coverLetterIntros: Record<string, string[]> = {
  professional: [
    "I am writing to express my strong interest in the {jobTitle} position at {companyName}. With my background in {field} and a proven track record of delivering results, I am confident in my ability to make a meaningful contribution to your team.",
    "I am excited to submit my application for the {jobTitle} role at {companyName}. My extensive experience and passion for excellence make me an ideal candidate for this position.",
  ],
  enthusiastic: [
    "I was thrilled to discover the {jobTitle} opening at {companyName}! Your company's innovative approach and commitment to excellence perfectly align with my professional aspirations and values. I am eager to bring my skills and energy to your dynamic team.",
    "The {jobTitle} position at {companyName} immediately caught my attention, and I knew I had to apply! Your company's mission resonates deeply with me, and I am excited about the opportunity to contribute to your continued success.",
  ],
  creative: [
    "In a world where {field} is constantly evolving, I believe the {jobTitle} role at {companyName} represents the perfect intersection of challenge and opportunity. My unique blend of skills and creative thinking positions me to drive innovation within your team.",
    "What if I told you that the perfect candidate for your {jobTitle} position has been preparing for this exact role throughout their entire career? That's how I feel about the opportunity at {companyName}, and I'd love to share why.",
  ],
};

const coverLetterBodies = [
  "Throughout my career, I have developed a strong expertise in {skills}. At {previousCompany}, I {achievement}, which directly contributed to the company's growth and success. These experiences have equipped me with the skills and perspective necessary to excel in the {jobTitle} role.",
  "My professional journey has been marked by a commitment to excellence and continuous improvement. Working at {previousCompany}, I honed my abilities in {skills}, where I {achievement}. I am eager to bring this same level of dedication and expertise to {companyName}.",
];

const coverLetterClosings: Record<string, string[]> = {
  professional: [
    "I am confident that my skills and experience align well with the requirements of this position. I would welcome the opportunity to discuss how my background can contribute to {companyName}'s continued success. Thank you for considering my application.",
  ],
  enthusiastic: [
    "I am genuinely excited about the possibility of joining {companyName} and contributing to your amazing team! I would love the chance to discuss how my passion and skills can help drive your mission forward. Thank you so much for your time and consideration!",
  ],
  creative: [
    "I believe that great things happen when the right person meets the right opportunity, and I am convinced this is one of those moments. I would be delighted to explore how my unique perspective can add value to {companyName}. I look forward to the conversation.",
  ],
};

function fillTemplate(template: string, vars: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value || key);
  }
  return result;
}

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateSummary(title: string): string {
  const template = randomPick(summaryTemplates);
  return fillTemplate(template, { title: title || 'Professional' });
}

export function generateAchievements(position: string, company: string): string[] {
  const count = 3 + Math.floor(Math.random() * 2);
  const shuffled = [...achievementTemplates].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(t =>
    fillTemplate(t, { task: `${position.toLowerCase()} initiatives at ${company}` })
  );
}

export function generateExperienceDescription(exp: Experience): string {
  const templates = [
    `As ${exp.position} at ${exp.company}, drove strategic initiatives and delivered measurable results across multiple projects. Collaborated with cross-functional teams to identify opportunities, streamline processes, and implement solutions that aligned with organizational goals.`,
    `Served as ${exp.position} at ${exp.company}, responsible for overseeing key projects and driving operational excellence. Leveraged expertise to mentor team members, optimize workflows, and deliver high-quality outcomes within tight deadlines.`,
    `Contributed as ${exp.position} at ${exp.company}, where I played a pivotal role in developing and executing strategies that enhanced team performance. Focused on building strong stakeholder relationships and driving continuous improvement across all areas of responsibility.`,
  ];
  return randomPick(templates);
}

export function generateCoverLetter(
  coverLetterData: CoverLetterData,
  resumeData: ResumeData
): string {
  const { companyName, jobTitle, tone, keyPoints } = coverLetterData;
  const { personalInfo, experiences, skills } = resumeData;
  
  const field = personalInfo.title || 'the industry';
  const previousCompany = experiences[0]?.company || 'my previous organization';
  const previousPosition = experiences[0]?.position || 'my previous role';
  const skillsStr = skills.slice(0, 4).join(', ') || 'various technical and professional competencies';
  
  const achievementText = `successfully led and delivered key projects as ${previousPosition}`;
  
  const intro = fillTemplate(randomPick(coverLetterIntros[tone] || coverLetterIntros.professional), {
    jobTitle,
    companyName,
    field,
  });
  
  const body = fillTemplate(randomPick(coverLetterBodies), {
    skills: skillsStr,
    previousCompany,
    achievement: achievementText,
    jobTitle,
    companyName,
  });
  
  const keyPointsSection = keyPoints.length > 0
    ? `\n\nKey qualifications that make me an excellent fit for this role include:\n${keyPoints.map(p => `• ${p}`).join('\n')}`
    : '';
  
  const closing = fillTemplate(
    randomPick(coverLetterClosings[tone] || coverLetterClosings.professional),
    { companyName }
  );
  
  const date = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  });
  
  return `${date}

${coverLetterData.recipientName ? `Dear ${coverLetterData.recipientName},` : 'Dear Hiring Manager,'}

${intro}

${body}${keyPointsSection}

${closing}

Sincerely,
${personalInfo.fullName || 'Your Name'}
${personalInfo.email ? `${personalInfo.email}` : ''}
${personalInfo.phone ? `${personalInfo.phone}` : ''}`;
}

export async function simulateAITyping(
  text: string,
  onUpdate: (partial: string) => void,
  speed: number = 15
): Promise<string> {
  return new Promise((resolve) => {
    let index = 0;
    const interval = setInterval(() => {
      index += Math.floor(Math.random() * 3) + 1;
      if (index >= text.length) {
        index = text.length;
        clearInterval(interval);
        onUpdate(text);
        resolve(text);
      } else {
        onUpdate(text.slice(0, index));
      }
    }, speed);
  });
}
