import React from 'react';
import { Info, Plus } from 'lucide-react';
import { Button } from '../Button';
import logo from '../../assets/images/logo_high-removebg-preview.png';

interface HomeEmptyProps {
  onCreateOrder: () => void;
}

// Placeholder illustration SVG (replace with your own if available)
function LogisticsIllustration() {
  return (
    <svg width="160" height="120" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4">
      <rect x="10" y="40" width="100" height="30" rx="6" fill="#E6F0F8" />
      <rect x="30" y="30" width="60" height="20" rx="4" fill="#B3D6F2" />
      <rect x="50" y="20" width="20" height="10" rx="2" fill="#5CB6F9" />
      <circle cx="100" cy="70" r="6" fill="#5CB6F9" />
      <circle cx="20" cy="70" r="6" fill="#5CB6F9" />
      <rect x="80" y="60" width="20" height="10" rx="2" fill="#B3D6F2" />
      <rect x="20" y="60" width="20" height="10" rx="2" fill="#B3D6F2" />
    </svg>
  );
}

export function HomeEmpty({ onCreateOrder }: HomeEmptyProps) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-bg">
      {/* Header Logo and Title */}
      <div className="flex flex-col items-center pt-12 pb-4 px-4">
        <img src={logo} alt="Mada Médical" className="h-14 w-auto mb-2" />
        <p className="text-muted text-xs text-center mt-1 mb-2">"Secure and controlled surgical logistics"</p>
      </div>

      {/* Illustration */}
      <div className="flex flex-col items-center justify-center flex-1 px-4">
        <LogisticsIllustration />
        <h2 className="text-heading text-base font-semibold text-center mb-3 mt-2">No orders in progress</h2>
        <p className="text-body text-sm text-center mb-8">
          Create a new order to organize and track the delivery of scoliosis equipment to the operating room.
        </p>
        <Button
          variant="primary"
          fullWidth
          onClick={onCreateOrder}
          className="mb-12"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create a new order
        </Button>
      </div>

      {/* Info Row */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted px-4 pb-6">
        <Info className="w-4 h-4 text-primary" />
        <span>All steps are tracked: stock, preparation, transport, operating room.</span>
      </div>
    </div>
  );
}
