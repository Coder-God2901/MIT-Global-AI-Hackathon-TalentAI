import React from 'react';
import { NeuralNetworkSVG } from './logo/NeuralNetworkSVG';
import { LOGO_SIZES } from './logo/logoConstants';

interface TalentAILogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export const TalentAILogo: React.FC<TalentAILogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  onClick
}) => {
  const config = LOGO_SIZES[size] || LOGO_SIZES.md; // Fallback to 'md' if size is invalid

  const content = (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex items-center justify-center rounded-lg bg-primary p-1 relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
        <div className={`relative z-10 ${config.container}`}>
          <NeuralNetworkSVG size={size} nodeRadius={config.nodeRadius} />
        </div>
      </div>
      {showText && (
        <span className={`${config.text} font-bold text-talentai-accent`}>
          TalentAI
        </span>
      )}
    </div>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="hover:opacity-80 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
        aria-label="TalentAI Home"
      >
        {content}
      </button>
    );
  }

  return content;
};

// Simplified icon-only version for compact spaces
export const TalentAIIcon: React.FC<{
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  return (
    <TalentAILogo
      size={size}
      showText={false}
      className={className}
    />
  );
};

// Animated version for loading states or hero sections
export const AnimatedTalentAILogo: React.FC<TalentAILogoProps> = (props) => {
  return (
    <div className="animate-float">
      <TalentAILogo {...props} />
    </div>
  );
};