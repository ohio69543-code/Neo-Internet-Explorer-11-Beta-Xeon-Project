import React from 'react';
import { IE11Logo } from './IE11Logo';

interface LogoProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export const UltramarineLogo: React.FC<LogoProps> = ({ size = 20, className = '', animate = false }) => {
  return <IE11Logo size={size} className={className} animate={animate} />;
};
