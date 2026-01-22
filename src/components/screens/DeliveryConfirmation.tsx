import React from 'react';
import { CheckCircle, Package, MapPin, Clock, Camera, User, Truck, ArrowRight } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Stepper } from '../Stepper';
import { Card } from '../Card';
import { Button } from '../Button';
import { InfoCallout } from '../InfoCallout';

interface DeliveryConfirmationProps {
  onBack: () => void;
  onFinish: () => void;
  onViewNextDelivery?: () => void;
}

export function DeliveryConfirmation({ onBack, onFinish, onViewNextDelivery }: DeliveryConfirmationProps) {
  const steps = [
    { id: 1, label: 'Detail' },
    { id: 2, label: 'Pickup' },
    { id: 3, label: 'Delivery' },
    { id: 4, label: 'Confirm' },
  ];

  const deliverySummary = {
    orderNumber: 'CMD-412345',
    hospital: 'Hôpital Saint-Louis',
    service: 'Operating Room - Level 2',
    recipient: 'Ms. Sophie Dubois',
    deliveryTime: '17:45',
    deliveryDate: 'January 20, 2026',
    pickupPhotos: 2,
    deliveryPhotos: 1,
  };

  const timeline = [
    {
      id: 'pickup',
      title: 'Pickup from warehouse',
      time: '14:30',
      status: 'completed',
      icon: Package,
    },
    {
      id: 'transit',
      title: 'In transit',
      time: '14:45 - 17:30',
      status: 'completed',
      icon: Truck,
    },
    {
      id: 'delivery',
      title: 'Delivery completed',
      time: '17:45',
      status: 'completed',
      icon: MapPin,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      <TopBar 
        onBack={onBack} 
        title="Delivery Confirmed" 
        subtitle={deliverySummary.orderNumber}
      />
      
      <Stepper steps={steps} currentStep={4} />

      <div className="px-4 mt-6 space-y-6">
        <div className="bg-accent/10 rounded-2xl p-6 border border-accent/30 text-center">
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-lg font-bold text-accent mb-1">Delivery Completed!</h2>
          <p className="text-sm text-muted">
            The package has been successfully delivered
          </p>
        </div>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-sm font-semibold text-body">Summary</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Destination</span>
              <span className="text-body font-medium text-right max-w-[60%]">{deliverySummary.hospital}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Department</span>
              <span className="text-body font-medium text-right max-w-[60%]">{deliverySummary.service}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted">Recipient</span>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span className="text-body font-medium">{deliverySummary.recipient}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted">Delivery Time</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-accent font-semibold">{deliverySummary.deliveryTime}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Date</span>
              <span className="text-body font-medium">{deliverySummary.deliveryDate}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-body mb-4">Delivery History</h3>
          
          <div className="space-y-0">
            {timeline.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === timeline.length - 1;
              
              return (
                <div key={step.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    {!isLast && (
                      <div className="w-0.5 h-8 bg-accent" />
                    )}
                  </div>
                  
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-medium text-body">{step.title}</p>
                    <p className="text-xs text-muted">{step.time}</p>
                  </div>
                  
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Camera className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-body">Photo Documentation</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-neutral-bg rounded-xl text-center">
              <div className="text-2xl font-bold text-primary">{deliverySummary.pickupPhotos}</div>
              <p className="text-xs text-muted">Pickup photos</p>
            </div>
            <div className="p-3 bg-neutral-bg rounded-xl text-center">
              <div className="text-2xl font-bold text-accent">{deliverySummary.deliveryPhotos}</div>
              <p className="text-xs text-muted">Delivery photos</p>
            </div>
          </div>
          
          <p className="text-xs text-muted mt-3 text-center">
            All photos are saved for traceability
          </p>
        </Card>

        <InfoCallout type="success">
          The delivery is recorded and tracked. The client and warehouse have been automatically notified.
        </InfoCallout>

        {onViewNextDelivery && (
          <button
            onClick={onViewNextDelivery}
            className="w-full p-4 bg-primary/5 rounded-xl border border-primary/20 flex items-center justify-between hover:bg-primary/10 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-body">Next Delivery</p>
                <p className="text-xs text-muted">2 deliveries pending</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-primary" />
          </button>
        )}

        <Button variant="primary" fullWidth onClick={onFinish}>
          Back to My Deliveries
        </Button>
        
        <button 
          onClick={onBack}
          className="w-full text-center py-3 text-sm text-muted hover:text-body transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
