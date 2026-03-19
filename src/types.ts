export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  photo?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface Project {
  id: string;
  name: string;
  link: string;
  description: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  languages: string[];
  template: 'modern' | 'classic' | 'minimal';
}

export const initialCVData: CVData = {
  personalInfo: {
    fullName: 'John Doe',
    jobTitle: 'Senior Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 000-0000',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    summary: 'Passionate software engineer with 8+ years of experience in building scalable web applications. Expert in React, Node.js, and cloud architecture.',
  },
  experiences: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Developer',
      location: 'Remote',
      startDate: '2020-01',
      endDate: '',
      current: true,
      description: 'Led a team of 5 developers to rebuild the core product using React and Next.js. Improved performance by 40%.',
    },
  ],
  educations: [
    {
      id: '1',
      school: 'University of Technology',
      degree: 'B.S. in Computer Science',
      location: 'Boston, MA',
      startDate: '2012-09',
      endDate: '2016-05',
      current: false,
      description: 'Specialized in Algorithms and Data Structures.',
    },
  ],
  skills: [
    { id: '1', name: 'React', level: 5 },
    { id: '2', name: 'TypeScript', level: 4 },
    { id: '3', name: 'Node.js', level: 4 },
    { id: '4', name: 'Tailwind CSS', level: 5 },
  ],
  projects: [
    {
      id: '1',
      name: 'E-commerce Platform',
      link: 'github.com/johndoe/shop',
      description: 'A full-stack e-commerce solution with Stripe integration.',
    },
  ],
  languages: ['English (Native)', 'French (Fluent)'],
  template: 'modern',
};
