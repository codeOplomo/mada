import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface InfoCalloutProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
}

export function InfoCallout({ type = 'success', children }: InfoCalloutProps) {
  const config = {
    info: {
      bg: 'bg-primary/5 border border-primary/20',
      icon: Info,
      iconColor: 'text-primary'
    },
    success: {
      bg: 'bg-accent/10 border border-accent/30',
      icon: CheckCircle,
      iconColor: 'text-accent'
    },
    warning: {
      bg: 'bg-warning/10 border border-warning/30',
      icon: AlertTriangle,
      iconColor: 'text-warning'
    },
    error: {
      bg: 'bg-error/10 border border-error/30',
      icon: AlertCircle,
      iconColor: 'text-error'
    }
  };
  
  const { bg, icon: Icon, iconColor } = config[type];
  
  return (
    <div className={`${bg} rounded-xl p-4 flex gap-3`}>
      <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
      <div className="text-sm text-body leading-relaxed">{children}</div>
    </div>
  );
}
