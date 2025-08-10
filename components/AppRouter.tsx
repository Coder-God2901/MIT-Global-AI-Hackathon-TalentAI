import React from 'react';
import { useApp } from '../context/AppContext';
import type { ComponentProps } from '../types';

// Import components directly since they have named exports
import { LandingPage } from './LandingPage';
import SignupFlow from './SignupFlow';
import CandidateDashboard from './CandidateDashboard';
import RecruiterDashboard from './RecruiterDashboard';
import SkillChallengePage from './SkillChallengePage';
import InterviewExperience from './InterviewExperience';
import JobSearchPage from './JobSearchPage';
import ProfilePage from './ProfilePage';

export const AppRouter: React.FC = () => {
  const { state, navigate, signUp, signIn, signOut } = useApp();

  const componentProps: ComponentProps = {
    onNavigate: navigate,
    onSignup: signUp,
    onSignIn: signIn,
    onSignOut: signOut,
    user: state.user
  };

  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'landing':
        return <LandingPage {...componentProps} />;
      case 'signup':
        return <SignupFlow {...componentProps} />;
      case 'candidate-dashboard':
        return <CandidateDashboard {...componentProps} />;
      case 'recruiter-dashboard':
        return <RecruiterDashboard {...componentProps} />;
      case 'skill-challenge':
        return <SkillChallengePage {...componentProps} />;
      case 'interview-experience':
        return <InterviewExperience {...componentProps} />;
      case 'job-search':
        return <JobSearchPage {...componentProps} />;
      case 'profile':
        return <ProfilePage {...componentProps} />;
      default:
        return <LandingPage {...componentProps} />;
    }
  };

  return renderCurrentView();
};