import type { ViewType, UserType, User, AppError } from '../types';
import { 
  VIEW_TITLES, 
  DEFAULT_USER_DASHBOARDS, 
  PUBLIC_VIEWS, 
  CANDIDATE_VIEWS, 
  RECRUITER_VIEWS,
  ERROR_MESSAGES 
} from './constants';
import { getPageTitle } from './navigation';

export const updateDocumentTitle = (view: ViewType, userType?: UserType | null): void => {
  document.title = getPageTitle(view, userType);
};

export const getDefaultDashboard = (userType: UserType): ViewType => {
  return DEFAULT_USER_DASHBOARDS[userType];
};

export const isPublicView = (view: ViewType): boolean => {
  return PUBLIC_VIEWS.includes(view);
};

export const canUserAccessView = (view: ViewType, user: User | null): boolean => {
  // Public views are accessible to everyone
  if (isPublicView(view)) {
    return true;
  }

  // Protected views require authentication
  if (!user) {
    return false;
  }

  // Check user type permissions for protected views
  if (user.type === 'candidate') {
    return CANDIDATE_VIEWS.includes(view);
  }
  
  if (user.type === 'recruiter') {
    return RECRUITER_VIEWS.includes(view);
  }

  return false;
};

export const validateNavigation = (
  view: ViewType, 
  user: User | null
): { canNavigate: boolean; error?: string } => {
  if (!canUserAccessView(view, user)) {
    if (!user) {
      return {
        canNavigate: false,
        error: ERROR_MESSAGES.UNAUTHORIZED
      };
    }
    return {
      canNavigate: false,
      error: ERROR_MESSAGES.FORBIDDEN
    };
  }

  return { canNavigate: true };
};

export const createAppError = (
  code: string, 
  message: string, 
  stack?: string
): AppError => ({
  code,
  message,
  timestamp: new Date(),
  stack
});

export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const createUser = (
  type: UserType, 
  email: string, 
  name: string,
  additionalData?: Partial<User>
): User => ({
  id: generateUserId(),
  type,
  email: email.toLowerCase().trim(),
  name: name.trim(),
  isVerified: false,
  createdAt: new Date(),
  profileCompleteness: type === 'candidate' ? 25 : 40,
  ...additionalData
});

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

export const formatError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return ERROR_MESSAGES.GENERIC;
};

export const logError = (error: AppError, context?: string): void => {
  console.error(`[TalentAI Error] ${context ? `[${context}] ` : ''}`, error);
  
  // In production, you would send this to your error tracking service
  // Example: Sentry.captureException(error);
};

// Helper function to determine if user should see authenticated vs public content
export const shouldShowAuthenticatedContent = (view: ViewType, user: User | null): boolean => {
  return user !== null && canUserAccessView(view, user);
};

// Helper function to get appropriate CTA based on authentication status
export const getViewCTA = (view: ViewType, user: User | null): string => {
  if (user) {
    switch (view) {
      case 'skill-challenge':
        return 'Start Challenge';
      case 'interview-experience':
        return 'Begin Interview';
      case 'job-search':
        return 'Apply Now';
      default:
        return 'Continue';
    }
  } else {
    switch (view) {
      case 'skill-challenge':
        return 'Try Challenge (Sign up to save progress)';
      case 'interview-experience':
        return 'Demo Interview (Sign up for full experience)';
      case 'job-search':
        return 'View Job (Sign up to apply)';
      default:
        return 'Sign Up to Continue';
    }
  }
};