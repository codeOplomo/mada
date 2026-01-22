import React from 'react';

interface StatusPillProps {
  status: 'pending' | 'preparation' | 'in-transit' | 'delivered' | 'cancelled';
  className?: string;
}

export function StatusPill({ status, className = '' }: StatusPillProps) {
  const statusConfig = {
    pending: {
      label: 'En attente',
      color: 'bg-muted text-white',
    },
    preparation: {
      label: 'En préparation',
      color: 'bg-primary text-white',
    },
    'in-transit': {
      label: 'En route',
      color: 'bg-accent text-white',
    },
    delivered: {
      label: 'Livré',
      color: 'bg-accent text-white',
    },
    cancelled: {
      label: 'Annulé',
      color: 'bg-[#E85D5D] text-white',
    },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color} ${className}`}>
      {config.label}
    </span>
  );
}
