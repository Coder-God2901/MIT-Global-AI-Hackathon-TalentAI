import React from 'react';
import { NEURAL_NETWORK_NODES, CONNECTION_LINES, DATA_FLOW_INDICATORS } from './logoConstants';

interface NeuralNetworkSVGProps {
  size: 'sm' | 'md' | 'lg' | 'xl';
  nodeRadius: string;
}

export const NeuralNetworkSVG: React.FC<NeuralNetworkSVGProps> = ({
  size,
  nodeRadius
}) => {
  const gradientId = `connectionGradient-${size}`;
  const glowId = `neuralGlow-${size}`;

  return (
    <svg
      viewBox="0 0 40 40"
      className="w-full h-full text-primary-foreground"
      fill="currentColor"
    >
      {/* Definitions */}
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.6" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
        </linearGradient>
        <filter id={glowId}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Connection lines with flow animation */}
      <g stroke={`url(#${gradientId})`} strokeWidth="1.2" fill="none">
        {CONNECTION_LINES.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            className="animate-connection-flow"
            style={{ animationDelay: line.delay }}
          />
        ))}
      </g>
      
      {/* Neural network nodes */}
      <g fill="currentColor">
        {/* Input layer */}
        {NEURAL_NETWORK_NODES.input.map((node, index) => (
          <circle
            key={`input-${index}`}
            cx={node.cx}
            cy={node.cy}
            r={nodeRadius}
            className="animate-neural-pulse"
            style={{ animationDelay: node.delay }}
            filter={`url(#${glowId})`}
          />
        ))}
        
        {/* Hidden layer */}
        {NEURAL_NETWORK_NODES.hidden.map((node, index) => (
          <circle
            key={`hidden-${index}`}
            cx={node.cx}
            cy={node.cy}
            r={nodeRadius}
            className="animate-neural-pulse"
            style={{ animationDelay: node.delay }}
            filter={`url(#${glowId})`}
            opacity={node.opacity || '1'}
          />
        ))}
        
        {/* Output layer */}
        {NEURAL_NETWORK_NODES.output.map((node, index) => (
          <circle
            key={`output-${index}`}
            cx={node.cx}
            cy={node.cy}
            r={nodeRadius}
            className="animate-neural-pulse"
            style={{ animationDelay: node.delay }}
            filter={`url(#${glowId})`}
          />
        ))}
      </g>
      
      {/* Central AI processing core */}
      <circle 
        cx="20" 
        cy="20" 
        r="1.5" 
        fill="currentColor" 
        opacity="0.9"
        className="animate-neural-pulse"
        style={{ animationDelay: '1.8s' }}
        filter={`url(#${glowId})`}
      />
      
      {/* Data flow indicators */}
      <g opacity="0.6">
        {DATA_FLOW_INDICATORS.map((indicator, index) => (
          <circle
            key={`flow-${index}`}
            cx={indicator.cx}
            cy={indicator.cy}
            r="0.5"
            fill="currentColor"
            className="animate-pulse"
            style={{ animationDelay: indicator.delay }}
          />
        ))}
      </g>
    </svg>
  );
};