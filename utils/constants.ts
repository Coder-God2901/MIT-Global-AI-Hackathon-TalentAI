import type { ViewType, UserType } from '../types';

export const VIEW_TITLES: Record<ViewType, string> = {
  'landing': 'TalentAI - AI-Powered Talent Marketplace',
  'signup': 'Join TalentAI',
  'candidate-dashboard': 'Candidate Dashboard - TalentAI',
  'recruiter-dashboard': 'Recruiter Dashboard - TalentAI',
  'skill-challenge': 'Skill Challenge - TalentAI',
  'interview-experience': 'Interview Experience - TalentAI',
  'job-search': 'Find AI Jobs - TalentAI',
  'profile': 'Profile - TalentAI'
};

export const DEFAULT_USER_DASHBOARDS: Record<UserType, ViewType> = {
  'candidate': 'candidate-dashboard',
  'recruiter': 'recruiter-dashboard'
};

// Public views accessible to everyone without authentication
export const PUBLIC_VIEWS: ViewType[] = [
  'landing', 
  'signup', 
  'job-search',
  'skill-challenge',
  'interview-experience'
];

// Protected views that require authentication
export const PROTECTED_VIEWS: ViewType[] = [
  'candidate-dashboard',
  'recruiter-dashboard',
  'profile'
];

// Views accessible to authenticated candidates
export const CANDIDATE_VIEWS: ViewType[] = [
  'candidate-dashboard',
  'skill-challenge',
  'interview-experience',
  'job-search',
  'profile'
];

// Views accessible to authenticated recruiters
export const RECRUITER_VIEWS: ViewType[] = [
  'recruiter-dashboard',
  'skill-challenge',
  'interview-experience',
  'job-search',
  'profile'
];

export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You need to sign in to access this page',
  FORBIDDEN: 'You don\'t have permission to access this page',
  NOT_FOUND: 'Page not found',
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
} as const;