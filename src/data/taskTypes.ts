import { TaskType } from '../types';

export const taskTypes: TaskType[] = [
  {
    id: 'resume-review',
    name: 'Resume Review',
    credits: 2,
    category: 'Career',
    icon: '📄',
    description: 'Professional resume feedback and suggestions',
    estimatedTime: '30-45 mins',
    detailedDescription: 'Get comprehensive feedback on your resume from experienced professionals. We\'ll review formatting, content, keywords, and overall presentation to help you stand out to employers.',
    requiredSkills: ['Career Guidance', 'Writing', 'HR Experience', 'Industry Knowledge'],
    typicalProviders: ['HR Professionals', 'Career Counselors', 'Senior Professionals', 'Recruiters']
  },
  {
    id: 'basic-html-help',
    name: 'Basic HTML Help',
    credits: 3,
    category: 'Programming',
    icon: '💻',
    description: 'Help with HTML basics and simple web pages',
    estimatedTime: '1 hour',
    detailedDescription: 'Learn HTML fundamentals including tags, elements, attributes, and basic page structure. Perfect for beginners starting their web development journey.',
    requiredSkills: ['HTML', 'Web Development', 'CSS Basics', 'Teaching'],
    typicalProviders: ['Web Developers', 'Computer Science Students', 'Frontend Engineers', 'Coding Bootcamp Graduates']
  },
  {
    id: 'graphic-design-logo',
    name: 'Graphic Design (Logo)',
    credits: 5,
    category: 'Design',
    icon: '🎨',
    description: 'Create a simple logo or brand identity',
    estimatedTime: '2-3 hours',
    detailedDescription: 'Professional logo design service including concept development, multiple design options, and final files in various formats. Includes basic brand guidelines.',
    requiredSkills: ['Graphic Design', 'Adobe Creative Suite', 'Brand Identity', 'Typography'],
    typicalProviders: ['Graphic Designers', 'Design Students', 'Freelance Artists', 'Brand Specialists']
  },
  {
    id: 'math-tutoring',
    name: 'Math Tutoring (1 session)',
    credits: 4,
    category: 'Education',
    icon: '📐',
    description: 'One-on-one math tutoring session',
    estimatedTime: '1-1.5 hours',
    detailedDescription: 'Personalized math tutoring covering topics from basic arithmetic to advanced calculus. Includes problem-solving techniques and exam preparation strategies.',
    requiredSkills: ['Mathematics', 'Teaching', 'Patience', 'Problem Solving'],
    typicalProviders: ['Math Teachers', 'Engineering Students', 'Math Graduates', 'Tutoring Professionals']
  },
  {
    id: 'proofreading',
    name: 'Proofreading (1 article)',
    credits: 2,
    category: 'Writing',
    icon: '✏️',
    description: 'Proofread and edit written content',
    estimatedTime: '30-60 mins',
    detailedDescription: 'Thorough proofreading and editing service covering grammar, spelling, punctuation, clarity, and flow. Includes suggestions for improvement.',
    requiredSkills: ['Writing', 'Grammar', 'Editing', 'Attention to Detail'],
    typicalProviders: ['Writers', 'Editors', 'English Teachers', 'Content Creators']
  },
  {
    id: 'video-editing',
    name: 'Video Editing (short reel)',
    credits: 6,
    category: 'Media',
    icon: '🎬',
    description: 'Edit short videos or social media reels',
    estimatedTime: '2-4 hours',
    detailedDescription: 'Professional video editing for short-form content including cuts, transitions, color correction, audio sync, and basic effects. Perfect for social media.',
    requiredSkills: ['Video Editing', 'Adobe Premiere', 'Final Cut Pro', 'Creative Vision'],
    typicalProviders: ['Video Editors', 'Content Creators', 'Film Students', 'Social Media Managers']
  },
  {
    id: 'interview-prep',
    name: 'Mentoring for Interview Prep',
    credits: 4,
    category: 'Career',
    icon: '🎯',
    description: 'Mock interviews and preparation guidance',
    estimatedTime: '1-2 hours',
    detailedDescription: 'Comprehensive interview preparation including mock interviews, common questions practice, behavioral interview techniques, and confidence building.',
    requiredSkills: ['Interview Experience', 'Communication', 'Industry Knowledge', 'Mentoring'],
    typicalProviders: ['Senior Professionals', 'HR Managers', 'Career Coaches', 'Industry Veterans']
  },
  {
    id: 'language-practice',
    name: 'Language Practice (English/Telugu)',
    credits: 2,
    category: 'Language',
    icon: '🗣️',
    description: 'Conversation practice and language learning',
    estimatedTime: '45-60 mins',
    detailedDescription: 'Interactive language practice sessions focusing on conversation, pronunciation, grammar, and cultural context. Available for multiple languages.',
    requiredSkills: ['Language Fluency', 'Teaching', 'Cultural Knowledge', 'Patience'],
    typicalProviders: ['Native Speakers', 'Language Teachers', 'International Students', 'Polyglots']
  },
  {
    id: 'coding-help',
    name: 'Coding Doubt Solving (Live)',
    credits: 3,
    category: 'Programming',
    icon: '🐛',
    description: 'Live coding help and debugging session',
    estimatedTime: '1 hour',
    detailedDescription: 'Real-time coding assistance including debugging, code review, algorithm explanation, and best practices guidance. Screen sharing supported.',
    requiredSkills: ['Programming', 'Debugging', 'Problem Solving', 'Teaching'],
    typicalProviders: ['Software Engineers', 'Computer Science Students', 'Coding Bootcamp Graduates', 'Tech Professionals']
  },
  {
    id: 'website-build',
    name: 'Build a Small Website',
    credits: 8,
    category: 'Programming',
    icon: '🌐',
    description: 'Create a simple website or landing page',
    estimatedTime: '4-6 hours',
    detailedDescription: 'Complete website development including design, responsive layout, basic functionality, and deployment. Perfect for personal or small business sites.',
    requiredSkills: ['Web Development', 'HTML/CSS', 'JavaScript', 'Responsive Design'],
    typicalProviders: ['Web Developers', 'Full-Stack Engineers', 'Freelance Developers', 'CS Graduates']
  },
  {
    id: 'ui-feedback',
    name: 'App UI Feedback Session',
    credits: 2,
    category: 'Design',
    icon: '📱',
    description: 'Review and provide UI/UX feedback',
    estimatedTime: '30-45 mins',
    detailedDescription: 'Detailed UI/UX analysis covering usability, design principles, user flow, accessibility, and improvement recommendations.',
    requiredSkills: ['UI/UX Design', 'User Research', 'Design Principles', 'Critical Analysis'],
    typicalProviders: ['UX Designers', 'Product Designers', 'Design Students', 'App Developers']
  },
  {
    id: 'assignment-help',
    name: 'Helping with Assignments',
    credits: 3,
    category: 'Education',
    icon: '📚',
    description: 'Academic assignment guidance and support',
    estimatedTime: '1-2 hours',
    detailedDescription: 'Academic support for various subjects including research guidance, writing assistance, problem-solving, and study strategies.',
    requiredSkills: ['Subject Expertise', 'Research', 'Writing', 'Teaching'],
    typicalProviders: ['Graduate Students', 'Subject Experts', 'Teachers', 'Academic Tutors']
  },
  {
    id: 'career-counseling',
    name: 'Career Counseling (30 mins)',
    credits: 3,
    category: 'Career',
    icon: '🚀',
    description: 'Career guidance and planning session',
    estimatedTime: '30 mins',
    detailedDescription: 'Professional career guidance including path exploration, skill assessment, industry insights, and strategic planning for career growth.',
    requiredSkills: ['Career Guidance', 'Industry Knowledge', 'Counseling', 'Strategic Thinking'],
    typicalProviders: ['Career Counselors', 'Industry Professionals', 'HR Leaders', 'Executive Coaches']
  },
  {
    id: 'social-media-help',
    name: 'Social Media Strategy',
    credits: 4,
    category: 'Marketing',
    icon: '📲',
    description: 'Help with social media planning and content',
    estimatedTime: '1-2 hours',
    detailedDescription: 'Comprehensive social media strategy including content planning, platform optimization, engagement tactics, and growth strategies.',
    requiredSkills: ['Social Media Marketing', 'Content Strategy', 'Analytics', 'Creative Thinking'],
    typicalProviders: ['Social Media Managers', 'Digital Marketers', 'Content Creators', 'Marketing Students']
  },
  {
    id: 'photography-tips',
    name: 'Photography Tips & Editing',
    credits: 3,
    category: 'Media',
    icon: '📸',
    description: 'Photography guidance and basic editing',
    estimatedTime: '1 hour',
    detailedDescription: 'Photography fundamentals including composition, lighting, camera settings, and basic photo editing techniques using popular software.',
    requiredSkills: ['Photography', 'Photo Editing', 'Composition', 'Technical Knowledge'],
    typicalProviders: ['Professional Photographers', 'Photography Students', 'Visual Artists', 'Content Creators']
  }
];

export const getTaskTypeById = (id: string): TaskType | undefined => {
  return taskTypes.find(task => task.id === id);
};

export const getTaskTypeByName = (name: string): TaskType | undefined => {
  return taskTypes.find(task => task.name === name);
};

export const getTasksByCategory = (category: string): TaskType[] => {
  return taskTypes.filter(task => task.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(taskTypes.map(task => task.category))];
};