import React from 'react';

interface PinkRibbonProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const PinkRibbon: React.FC<PinkRibbonProps> = ({ size = 24, className, style }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
    >
      <defs>
        <linearGradient id="pinkRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F79AB2" />
          <stop offset="45%" stopColor="#E66588" />
          <stop offset="80%" stopColor="#C24D6B" />
          <stop offset="100%" stopColor="#9C324E" />
        </linearGradient>
        <linearGradient id="pinkRibbonLoop" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB3C6" />
          <stop offset="100%" stopColor="#E66588" />
        </linearGradient>
        <filter id="ribbonShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#C24D6B" floodOpacity="0.25" />
        </filter>
      </defs>
      {/* Official Breast Cancer Awareness Ribbon Shape */}
      <g filter="url(#ribbonShadow)">
        {/* Right Tail (underneath) */}
        <path
          d="M48 45 L68 85 C69 87 67 90 64 90 C62 90 60 89 59 87 L44 56 Z"
          fill="url(#pinkRibbonGrad)"
          opacity="0.92"
        />
        {/* Top Folded Loop */}
        <path
          d="M50 10 C36 10 26 22 26 36 C26 48 34 58 48 70 L52 70 C66 58 74 48 74 36 C74 22 64 10 50 10 Z M50 20 C58 20 63 27 63 36 C63 44 57 52 50 59 C43 52 37 44 37 36 C37 27 42 20 50 20 Z"
          fill="url(#pinkRibbonLoop)"
        />
        {/* Left Tail (on top) */}
        <path
          d="M52 45 L32 85 C31 87 33 90 36 90 C38 90 40 89 41 87 L56 56 Z"
          fill="url(#pinkRibbonGrad)"
        />
      </g>
    </svg>
  );
};
