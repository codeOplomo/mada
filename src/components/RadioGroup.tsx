import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
}

export function RadioGroup({ label, options, value, onChange, name }: RadioGroupProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-body mb-3 font-medium">
          {label}
        </label>
      )}
      <div className="flex gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex-1 flex items-center gap-2 px-4 py-3 rounded-[10px] border border-border bg-white cursor-pointer transition-all duration-200 hover:border-primary"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className="w-4 h-4 text-primary border-border focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-sm text-body">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
