export type Tab = 'home' | 'courses' | 'quiz' | 'current' | 'profile' | 'subscription' | 'android';

export type PlanId = 'free' | 'pro' | 'promax';

export type Language = 'hi' | 'en';

export interface Category {
  id: string;
  label: string;
  labelHi: string;
  emoji: string;
  bg: string;
  count: string;
}

export interface Lesson {
  id: string;
  title: string;
  titleHi: string;
  duration: string;
  isFree: boolean;
  videoUrl?: string;
  notesPdfUrl?: string;
}

export interface Course {
  id: number;
  title: string;
  titleHi: string;
  instructor: string;
  rating: number;
  students: string;
  price: string;
  originalPrice: string;
  progress: number;
  tag: string;
  color: string;
  lessons: number;
  hours: string;
  pro: boolean;
  category: 'ssc' | 'railway' | 'state' | 'ca';
  description: string;
  descriptionHi: string;
  lessonList: Lesson[];
}

export interface Question {
  id: number;
  subject: 'maths' | 'reasoning' | 'gk' | 'english';
  textEn: string;
  textHi: string;
  optionsEn: string[];
  optionsHi: string[];
  correctIndex: number;
  explanationEn: string;
  explanationHi: string;
}

export interface MockTest {
  id: string;
  title: string;
  titleHi: string;
  category: 'ssc' | 'railway' | 'state' | 'daily';
  questionsCount: number;
  durationMinutes: number;
  totalMarks: number;
  pro: boolean;
  attempted?: boolean;
  questions: Question[];
}

export interface CurrentAffairItem {
  id: string;
  date: string;
  titleEn: string;
  titleHi: string;
  category: string;
  summaryEn: string;
  summaryHi: string;
  tags: string[];
  importance: 'High' | 'Very High' | 'Medium';
}

export interface UserState {
  name: string;
  rollNo: string;
  targetExam: string;
  streakDays: number;
  questionsSolved: number;
  accuracy: number;
  rank: number;
  currentPlan: PlanId;
  freeModeOn: boolean;
  bookmarks: number[];
  language: Language;
}
