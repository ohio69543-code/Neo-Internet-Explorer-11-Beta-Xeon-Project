import React from 'react';

interface IE11LogoProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

/**
 * Authentic Internet Explorer 11 Vector Logo
 * Features the signature sky-blue lowercase 'e' and the golden/orange orbital halo ring.
 */
export const IE11Logo: React.FC<IE11LogoProps> = ({
  size = 20,
  className = '',
  animate = false,
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center select-none relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
      title="Internet Explorer 11"
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={animate ? 'animate-pulse' : ''}
        style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))' }}
      >
        <defs>
          {/* Classic IE11 Cyan/Blue Gradient */}
          <linearGradient id="ie11Blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#29B6F6" />
            <stop offset="40%" stopColor="#0288D1" />
            <stop offset="100%" stopColor="#01579B" />
          </linearGradient>

          {/* Golden/Amber Orbital Swoosh Halo */}
          <linearGradient id="ie11Halo" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFD54F" />
            <stop offset="45%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#FF8F00" />
          </linearGradient>

          {/* Inner 3D Highlight */}
          <linearGradient id="ie11Specular" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Orbit Ring: Background Arc (Behind the top loop of the 'e') */}
        <path
          d="M 12 68 C 15 36, 48 16, 88 28"
          fill="none"
          stroke="url(#ie11Halo)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Main 'e' Body */}
        <path
          d="M 50 16 C 28 16, 16 32, 16 52 C 16 73, 31 85, 53 85 C 69 85, 78 77, 82 71 L 72 63 C 68 68, 62 73, 52 73 C 38 73, 29 64, 28 50 L 84 50 C 85 47, 85 43, 85 39 C 85 24, 71 16, 50 16 Z M 28 41 C 30 30, 39 25, 50 25 C 61 25, 71 30, 72 41 Z"
          fill="url(#ie11Blue)"
        />

        {/* Top curved specular sheen */}
        <path
          d="M 50 18 C 32 18, 21 31, 19 48 C 24 44, 35 27, 50 27 C 66 27, 76 38, 79 46 C 81 42, 82 39, 82 36 C 82 24, 69 18, 50 18 Z"
          fill="url(#ie11Specular)"
          opacity="0.45"
        />

        {/* Orbit Ring: Foreground Arc (Sweeps cleanly across front of lower loop) */}
        <path
          d="M 88 28 C 96 38, 93 57, 76 73 C 57 91, 23 93, 8 76"
          fill="none"
          stroke="url(#ie11Halo)"
          strokeWidth="6.5"
          strokeLinecap="round"
        />

        {/* Orbit tips shine */}
        <circle cx="8" cy="76" r="3.2" fill="#FFE082" />
        <circle cx="88" cy="28" r="3" fill="#FFF9C4" />
      </svg>
    </div>
  );
};
