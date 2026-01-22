import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'default' | 'large';
  background?: string;
  style?: React.CSSProperties;
}

export function Card({ children, className = '', padding = 'default', background = 'bg-card', style }: CardProps) {
  const paddingStyles = {
    none: '',
    default: 'p-4',
    large: 'p-6'
  };
  
  return (
    <div className={`${background} rounded-[12px] shadow-card ${paddingStyles[padding]} ${className}`} style={style}>
      {children}
    </div>
  );
}
