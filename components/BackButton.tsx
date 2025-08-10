import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useApp } from "../context/AppContext";
import type { ViewType } from "../types";

interface BackButtonProps {
  fallbackView?: ViewType;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  fallbackView = "landing", 
  className = "" 
}) => {
  const { navigate } = useApp();

  const handleBack = () => {
    // For now, we'll implement a simple back navigation
    // In a more sophisticated implementation, you could maintain a navigation history
    navigate(fallbackView);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className={`flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors ${className}`}
      aria-label="Go back"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </Button>
  );
};