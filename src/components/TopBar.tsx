import React from 'react';
import { ArrowLeft } from 'lucide-react';
import logo from '../assets/images/logo_high-removebg-preview.png';

interface TopBarProps {
  onBack?: () => void;
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  filters?: React.ReactNode;
}

export function TopBar({ onBack, title, subtitle, showLogo = false, filters }: TopBarProps) {
  return (
    <div className="relative bg-primary rounded-b-[20px] shadow-card">
      <div className="px-4 py-6">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          )}
          {showLogo && (
            <img 
              src={logo} 
              alt="Mada Médical" 
              className="h-10 w-auto object-contain"
            />
          )}
          {title && (
            <div>
              <h2 className="text-white text-xl font-semibold">{title}</h2>
              {subtitle && (
                <p className="text-white/70 text-xs mt-0.5">{subtitle}</p>
              )}
            </div>
          )}
        </div>
        {filters && (
          <div className="px-4 mt-4">
            {filters}
          </div>
        )}
      </div>
    </div>
  );
}
