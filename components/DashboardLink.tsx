import React from "react";
import { Home } from "lucide-react";
import { Button } from "./ui/button";
import { useApp } from "../context/AppContext";
import type { ViewType } from "../types";

interface DashboardLinkProps {
  userType: "candidate" | "recruiter";
  className?: string;
}

export const DashboardLink: React.FC<DashboardLinkProps> = ({ 
  userType, 
  className = "" 
}) => {
  const { navigate } = useApp();
  
  const dashboardView: ViewType = userType === "candidate" ? "candidate-dashboard" : "recruiter-dashboard";
  const dashboardLabel = userType === "candidate" ? "Candidate Dashboard" : "Recruiter Dashboard";

  const handleDashboardClick = () => {
    navigate(dashboardView);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDashboardClick}
      className={`flex items-center gap-2 ${className}`}
      aria-label={`Go to ${dashboardLabel}`}
    >
      <Home className="w-4 h-4" />
      Dashboard
    </Button>
  );
};