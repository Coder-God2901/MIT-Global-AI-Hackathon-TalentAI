import React from "react";
import { TalentAILogo } from "./TalentAILogo";
import { BackButton } from "./BackButton";
import { DashboardLink } from "./DashboardLink";
import { useApp } from "../context/AppContext";

interface NavigationHeaderProps {
  showBackButton?: boolean;
  showDashboardLink?: boolean;
  userType?: "candidate" | "recruiter";
  title?: string;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  showBackButton = false,
  showDashboardLink = false,
  userType = "candidate",
  title,
}) => {
  const { navigate, state } = useApp();
  const isHomePage = state.currentView === "landing";

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-talentai-primary/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center gap-4">
            {showBackButton && !isHomePage && <BackButton />}
            
            <button 
              onClick={() => navigate("landing")} 
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <TalentAILogo size="sm" />
            </button>

            {title && (
              <div className="hidden sm:block">
                <span className="text-lg text-talentai-accent/60">|</span>
                <span className="ml-3 text-lg text-talentai-accent">{title}</span>
              </div>
            )}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {showDashboardLink && (
              <DashboardLink userType={userType} />
            )}

            {isHomePage && (
              <div className="hidden sm:flex items-center gap-3">
                <button 
                  onClick={() => navigate("job-search")}
                  className="text-sm text-talentai-accent hover:text-talentai-accent/80 transition-colors"
                >
                  Find Jobs
                </button>
                <button 
                  onClick={() => navigate("signup")}
                  className="bg-talentai-accent text-white px-4 py-2 rounded-lg text-sm hover:bg-talentai-accent/90 transition-colors"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile title */}
        {title && (
          <div className="sm:hidden pb-3">
            <h1 className="text-lg text-talentai-accent">{title}</h1>
          </div>
        )}
      </div>
    </header>
  );
};