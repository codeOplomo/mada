import React from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  label?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

export function Dropdown({ 
  label, 
  placeholder = 'Sélectionner...', 
  options = [],
  value,
  onChange,
  error 
}: DropdownProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-body mb-2 font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={`w-full px-4 py-3 rounded-[10px] border bg-white text-body appearance-none cursor-pointer transition-all duration-200
            ${error ? 'border-[#E85D5D] focus:border-[#E85D5D]' : 'border-border focus:border-primary'}
            focus:outline-none focus:ring-2 focus:ring-primary/20
            ${!value ? 'text-muted' : ''}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
      {error && (
        <p className="text-sm text-[#E85D5D] mt-1">{error}</p>
      )}
    </div>
  );
}
