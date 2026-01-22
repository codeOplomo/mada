import React from 'react';
import { CheckCircle, Calendar, MapPin, Clock, Truck, Package, CreditCard, User, FileText } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Stepper } from '../Stepper';
import { Card } from '../Card';
import { Button } from '../Button';
import { InfoCallout } from '../InfoCallout';

interface NewOrderStep4Props {
  onBack: () => void;
  onConfirm: () => void;
}

export function NewOrderStep4({ onBack, onConfirm }: NewOrderStep4Props) {
  const steps = [
    { id: 1, label: 'Info' },
    { id: 2, label: 'Equipment' },
    { id: 3, label: 'Payment' },
    { id: 4, label: 'Validation' },
  ];

  // Mock data - in real app this would come from a shared state/context
  const orderSummary = {
    // Step 1 - General Info
    hospital: 'Paris University Hospital',
    surgeon: 'Dr. John Smith',
    city: 'Paris',
    operationDate: 'January 24, 2026',
    interventionType: 'Scoliosis Surgery',
    
    // Step 2 - Equipment & Logistics
    equipment: [
      { name: 'Pedicle Screws Ø 5.5mm', quantity: 12, category: 'Implants' },
      { name: 'Vertebral Rods Ti 5.5mm', quantity: 2, category: 'Implants' },
      { name: 'Placement Instruments', quantity: 1, category: 'Tools' },
    ],
    deliveryDate: 'January 23, 2026',
    deliveryTime: '08:00 - 10:00',
    observations: '',
    
    // Step 3 - Payment
    paymentTiming: 'Pay in advance',
    paymentType: 'Credit Card',
  };

  const totalEquipment = orderSummary.equipment.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      <TopBar onBack={onBack} title="New Order" />
      
      <Stepper steps={steps} currentStep={4} />

      <div className="px-4 mt-6 space-y-6">
        <div className="text-center">
          <h2 className="text-body mb-2">Review your order</h2>
          <p className="text-sm text-muted">
            Make sure all information is correct before confirming.
          </p>
        </div>

        {/* General Information */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-body">General Information</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Facility</span>
              <span className="text-body font-medium">{orderSummary.hospital}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Surgeon</span>
              <span className="text-body font-medium">{orderSummary.surgeon}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">City</span>
              <span className="text-body font-medium">{orderSummary.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Operation Date</span>
              <span className="text-body font-medium">{orderSummary.operationDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Intervention Type</span>
              <span className="text-body font-medium">{orderSummary.interventionType}</span>
            </div>
          </div>
        </Card>

        {/* Equipment */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-body">Equipment</h3>
              <p className="text-xs text-muted">{totalEquipment} items total</p>
            </div>
          </div>
          
          <div className="space-y-2">
            {orderSummary.equipment.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-neutral-border/50 last:border-0">
                <div>
                  <span className="text-sm text-body">{item.name}</span>
                  <span className="text-xs text-muted ml-2">({item.category})</span>
                </div>
                <span className="text-sm font-medium text-primary">×{item.quantity}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Logistics */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-body">Delivery</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Delivery Date</span>
              <span className="text-body font-medium">{orderSummary.deliveryDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Time Slot</span>
              <span className="text-body font-medium">{orderSummary.deliveryTime}</span>
            </div>
          </div>
        </Card>

        {/* Payment */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-body">Payment</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Payment Timing</span>
              <span className="text-body font-medium">{orderSummary.paymentTiming}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Payment Type</span>
              <span className="text-body font-medium">{orderSummary.paymentType}</span>
            </div>
          </div>
        </Card>

        <InfoCallout type="info">
          You will receive a notification as soon as the order is confirmed and processed by our logistics team.
        </InfoCallout>

        <Button variant="primary" fullWidth onClick={onConfirm}>
          Confirm Order
        </Button>

        <button 
          className="w-full text-center text-primary text-sm hover:underline transition-all duration-200"
          onClick={onBack}
        >
          Back to payment
        </button>
      </div>
    </div>
  );
}
