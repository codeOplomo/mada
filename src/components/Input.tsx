import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ 
  label, 
  error, 
  icon,
  className = '',
  ...props 
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-body mb-2 font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full px-4 py-3 rounded-[10px] border bg-white text-body placeholder:text-muted transition-all duration-200
            ${error ? 'border-[#E85D5D] focus:border-[#E85D5D]' : 'border-border focus:border-primary'}
            focus:outline-none focus:ring-2 focus:ring-primary/20
            ${icon ? 'pr-12' : ''}
            ${className}`}
          {...props}
        />
        {icon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-[#E85D5D] mt-1">{error}</p>
      )}
    </div>
  );
}
