import React, { useState } from 'react';
import { Truck, Clock, MapPin, Calendar, CreditCard } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Stepper } from '../Stepper';
import { Card } from '../Card';
import { Input } from '../Input';
import { Dropdown } from '../Dropdown';
import { RadioGroup } from '../RadioGroup';
import { Button } from '../Button';

interface NewOrderStep3Props {
  onBack: () => void;
  onNext: () => void;
}

export function NewOrderStep3({ onBack, onNext }: NewOrderStep3Props) {
  const [deliveryMode, setDeliveryMode] = useState('standard');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('advance');

  const steps = [
    { id: 1, label: 'Info' },
    { id: 2, label: 'Equipment' },
    { id: 3, label: 'Logistics' },
    { id: 4, label: 'Payment' },
    { id: 5, label: 'Validation' },
  ];

  const deliveryModeOptions = [
    { value: 'standard', label: 'Standard (D-1)' },
    { value: 'express', label: 'Express (same day)' },
  ];

  const deliveryTimeOptions = [
    { value: '08h00', label: '08:00 - 10:00' },
    { value: '10h00', label: '10:00 - 12:00' },
    { value: '12h00', label: '12:00 - 14:00' },
    { value: '14h00', label: '14:00 - 16:00' },
  ];

  const paymentMethodOptions = [
    { value: 'advance', label: 'Pay in advance', description: 'Payment before operation date' },
    { value: 'after', label: 'Pay after operation', description: 'Payment within 30 days after operation' },
  ];

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      <TopBar onBack={onBack} title="New Order" />
      
      <Stepper steps={steps} currentStep={3} />

      <div className="px-4 mt-6 space-y-6">


        
        <Button variant="primary" fullWidth onClick={onNext}>
          Continue to validation
        </Button>
        <button 
          className="w-full text-center text-primary text-sm hover:underline transition-all duration-200"
          onClick={onBack}
        >
          Back to info
        </button>
      </div>
    </div>
  );
}
