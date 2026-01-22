import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'success' | 'danger';
  size?: 'default' | 'small';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'default',
  fullWidth = false,
  children, 
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = {
    primary: "bg-primary-dark text-white hover:bg-[#156A81] active:bg-[#124F5F] shadow-sm",
    secondary: "bg-white text-primary border-2 border-primary hover:bg-[#F0F9FB] active:bg-[#E0F3F7]",
    ghost: "bg-transparent text-primary hover:bg-[#F0F9FB] active:bg-[#E0F3F7]",
    success: "bg-accent text-white hover:bg-[#1E8E4C] active:bg-[#177A40] shadow-sm",
    danger: "bg-error/10 text-error border-2 border-error hover:bg-error/20 active:bg-error/30"
  };
  
  const sizeStyles = {
    default: "px-6 py-3 rounded-[10px] text-button",
    small: "px-4 py-2 rounded-[8px] text-sm"
  };
  
  const widthStyle = fullWidth ? "w-full" : "";
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
