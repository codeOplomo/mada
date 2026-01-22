import React from 'react';
import { Home, Package, MapPin, User, Inbox, Stethoscope } from 'lucide-react';

interface BottomNavProps {
  active: 'home' | 'orders' | 'tracking' | 'reception' | 'doctor' | 'profile';
  onNavigate: (tab: 'home' | 'orders' | 'tracking' | 'reception' | 'doctor' | 'profile') => void;
}

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home' as const, icon: Home, label: 'Admin' },
    { id: 'orders' as const, icon: Package, label: 'Orders' },
    { id: 'reception' as const, icon: Inbox, label: 'Warehouse' },
    { id: 'tracking' as const, icon: MapPin, label: 'Delivery' },
    { id: 'doctor' as const, icon: Stethoscope, label: 'Clinic' },
    { id: 'profile' as const, icon: User, label: 'Profil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-[0_-2px_12px_rgba(6,18,38,0.04)]">
      <div 
        className="max-w-[390px] mx-auto px-2 py-2 flex items-center gap-1 overflow-x-auto"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <style>{`
          .bottom-nav-scroll::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-1 py-2 px-3 transition-colors duration-200 relative flex-shrink-0 min-w-[60px]"
            >
              <Icon 
                className={`w-6 h-6 transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-muted'
                }`}
              />
              <span 
                className={`text-small transition-colors duration-200 ${
                  isActive ? 'text-primary font-medium' : 'text-muted'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
