// Core application types
export type ViewType = 
  | 'landing' 
  | 'signup' 
  | 'candidate-dashboard' 
  | 'recruiter-dashboard' 
  | 'skill-challenge'
  | 'interview-experience'
  | 'job-search' 
  | 'profile';

export type UserType = 'candidate' | 'recruiter';

export interface User {
  id: string;
  type: UserType;
  email: string;
  name: string;
  isVerified: boolean;
  createdAt: Date;
  profileCompleteness?: number;
}

export interface AppState {
  currentView: ViewType;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface NavigationProps {
  onNavigate: (view: ViewType) => void;
}

export interface AuthProps {
  onSignup: (userType: UserType, userData: { email: string; name: string }) => Promise<void>;
  onSignIn: (userData: User) => void;
  onSignOut: () => void;
}

export interface ComponentProps extends NavigationProps, Partial<AuthProps> {
  user?: User | null;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  timestamp: Date;
  stack?: string;
}

// Route configuration
export interface RouteConfig {
  view: ViewType;
  component: React.ComponentType<ComponentProps>;
  requiresAuth: boolean;
  allowedUserTypes?: UserType[];
  title: string;
}