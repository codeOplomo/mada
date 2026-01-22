import React from 'react';
import { User, Bell, Shield, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { Card } from '../Card';

export function Profile() {
  const menuItems = [
    { icon: User, label: 'Personal Information', badge: null },
    { icon: Bell, label: 'Notifications', badge: '3' },
    { icon: Shield, label: 'Security & Privacy', badge: null },
    { icon: HelpCircle, label: 'Help & Support', badge: null },
  ];

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      <div className="bg-primary rounded-b-[20px] shadow-card px-4 pt-12 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-white text-xl font-semibold">Dr. Martin Dubois</h1>
            <p className="text-white/70 text-sm">martin.dubois@chu-paris.fr</p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6 space-y-4">
        <Card padding="none">
          <div className="divide-y divide-border">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className="w-full p-4 flex items-center gap-3 hover:bg-neutral-bg transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="flex-1 text-left text-sm text-body font-medium">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-accent text-white text-xs font-medium">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-muted" />
                </button>
              );
            })}
          </div>
        </Card>

        <Card>
          <button className="w-full flex items-center gap-3 text-[#E85D5D]">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </Card>

        <div className="text-center pt-4">
          <p className="text-xs text-muted">Version 1.2.4</p>
          <p className="text-xs text-muted mt-1">© 2026 Mada Médical</p>
        </div>
      </div>
    </div>
  );
}
