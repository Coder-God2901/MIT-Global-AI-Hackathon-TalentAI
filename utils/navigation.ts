import type { ViewType, UserType } from '../types';

// Navigation flow mappings
export const NAVIGATION_FLOWS: Record<ViewType, {
  backDestination?: ViewType;
  dashboardDestination: Record<UserType, ViewType>;
  requiresAuth: boolean;
}> = {
  'landing': {
    dashboardDestination: {
      candidate: 'candidate-dashboard',
      recruiter: 'recruiter-dashboard'
    },
    requiresAuth: false
  },
  'signup': {
    backDestination: 'landing',
    dashboardDestination: {
      candidate: 'candidate-dashboard',
      recruiter: 'recruiter-dashboard'
    },
    requiresAuth: false
  },
  'candidate-dashboard': {
    dashboardDestination: {
      candidate: 'candidate-dashboard',
      recruiter: 'recruiter-dashboard'
    },
    requiresAuth: true
  },
  'recruiter-dashboard': {
    dashboardDestination: {
      candidate: 'candidate-dashboard',
      recruiter: 'recruiter-dashboard'
    },
    requiresAuth: true
  },
  'skill-challenge': {
    backDestination: 'candidate-dashboard',
    dashboardDestination: {
      candidate: 'candidate-dashboard',
      recruiter: 'recruiter-dashboard'
    },
    requiresAuth: true
  },
  'interview-experience': {
    backDestination: 'candidate-dashboard',
    dashboardDestination: {
      candidate: 'candidate-dashboard',
      recruiter: 'recruiter-dashboard'
    },
    requiresAuth: true
  },
  'job-search': {
    backDestination: 'candidate-dashboard',
    dashboardDestination: {
      candidate: 'candidate-dashboard',
      recruiter: 'recruiter-dashboard'
    },
    requiresAuth: true
  },
  'profile': {
    backDestination: 'candidate-dashboard', // Default, will be dynamic based on user type
    dashboardDestination: {
      candidate: 'candidate-dashboard',
      recruiter: 'recruiter-dashboard'
    },
    requiresAuth: true
  }
};

/**
 * Get the back destination for a given view
 */
export const getBackDestination = (currentView: ViewType, userType?: UserType | null): ViewType | null => {
  const flow = NAVIGATION_FLOWS[currentView];
  
  if (!flow.backDestination) {
    return null;
  }

  // For profile page, determine back destination based on user type
  if (currentView === 'profile' && userType) {
    return flow.dashboardDestination[userType];
  }

  return flow.backDestination;
};

/**
 * Get the dashboard destination for a given user type
 */
export const getDashboardDestination = (userType: UserType): ViewType => {
  return NAVIGATION_FLOWS['landing'].dashboardDestination[userType];
};

/**
 * Check if a view should show navigation controls
 */
export const shouldShowNavigationControls = (currentView: ViewType): boolean => {
  // Don't show navigation controls on landing page or signup
  return !['landing', 'signup'].includes(currentView);
};

/**
 * Check if a view should show back button
 */
export const shouldShowBackButton = (currentView: ViewType): boolean => {
  const flow = NAVIGATION_FLOWS[currentView];
  return !!flow.backDestination;
};

/**
 * Check if a view should show dashboard link
 */
export const shouldShowDashboardLink = (currentView: ViewType, userType?: UserType | null): boolean => {
  // Show dashboard link on all authenticated pages except the dashboard itself
  if (!shouldShowNavigationControls(currentView) || !userType) {
    return false;
  }

  const userDashboard = getDashboardDestination(userType);
  return currentView !== userDashboard;
};

/**
 * Get navigation context for a view
 */
export interface NavigationContext {
  showBackButton: boolean;
  showDashboardLink: boolean;
  backDestination: ViewType | null;
  dashboardDestination: ViewType | null;
  breadcrumbs: Array<{ label: string; view: ViewType }>;
}

export const getNavigationContext = (
  currentView: ViewType, 
  userType?: UserType | null
): NavigationContext => {
  const backDestination = getBackDestination(currentView, userType);
  const dashboardDestination = userType ? getDashboardDestination(userType) : null;

  return {
    showBackButton: shouldShowBackButton(currentView),
    showDashboardLink: shouldShowDashboardLink(currentView, userType),
    backDestination,
    dashboardDestination,
    breadcrumbs: getBreadcrumbs(currentView, userType)
  };
};

/**
 * Get breadcrumb navigation for a view
 */
export const getBreadcrumbs = (
  currentView: ViewType, 
  userType?: UserType | null
): Array<{ label: string; view: ViewType }> => {
  const breadcrumbs: Array<{ label: string; view: ViewType }> = [];

  if (!userType || ['landing', 'signup'].includes(currentView)) {
    return breadcrumbs;
  }

  // Add dashboard as first breadcrumb for authenticated pages
  const dashboardView = getDashboardDestination(userType);
  const dashboardLabel = userType === 'candidate' ? 'Dashboard' : 'Recruiter Dashboard';
  
  if (currentView !== dashboardView) {
    breadcrumbs.push({
      label: dashboardLabel,
      view: dashboardView
    });
  }

  // Add current page
  const currentPageLabel = getViewLabel(currentView);
  if (currentView !== dashboardView && currentPageLabel) {
    breadcrumbs.push({
      label: currentPageLabel,
      view: currentView
    });
  }

  return breadcrumbs;
};

/**
 * Get human-readable label for a view
 */
export const getViewLabel = (view: ViewType): string => {
  const labels: Record<ViewType, string> = {
    'landing': 'Home',
    'signup': 'Sign Up',
    'candidate-dashboard': 'Dashboard',
    'recruiter-dashboard': 'Recruiter Dashboard',
    'skill-challenge': 'Skill Challenge',
    'interview-experience': 'Interviews',
    'job-search': 'Browse Jobs',
    'profile': 'Profile'
  };

  return labels[view] || view;
};

/**
 * Get page title for document.title
 */
export const getPageTitle = (view: ViewType, userType?: UserType | null): string => {
  const baseTitle = 'TalentAI';
  const viewLabel = getViewLabel(view);

  if (view === 'landing') {
    return `${baseTitle} - AI-Powered Talent Marketplace`;
  }

  return `${viewLabel} - ${baseTitle}`;
};