import React from 'react';
import { Building2, Package, Truck, MapPin, Clock, Phone, User, AlertTriangle } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Stepper } from '../Stepper';
import { Card } from '../Card';
import { Button } from '../Button';
import { InfoCallout } from '../InfoCallout';

interface DeliveryDetailProps {
  onBack: () => void;
  onStartPickup: () => void;
}

export function DeliveryDetail({ onBack, onStartPickup }: DeliveryDetailProps) {
  const deliveryData = {
    orderNumber: 'CMD-412345',
    status: 'To Pick Up',
    pickup: {
      location: 'Mada Medical Warehouse - Zone A',
      address: '15 Rue de la Logistique, 93200 Saint-Denis',
      date: 'January 20, 2026',
      timeSlot: '14:00 - 16:00',
      contact: 'Mr. Pierre Martin',
      phone: '01 23 45 67 89',
    },
    delivery: {
      hospital: 'Hôpital Saint-Louis',
      service: 'Operating Room - Level 2',
      address: '1 Avenue Claude Vellefaux, 75010 Paris',
      date: 'January 20, 2026',
      timeSlot: '16:30 - 18:00',
      contact: 'Ms. Sophie Dubois',
      phone: '06 12 34 56 78',
    },
    package: {
      type: 'Scoliosis Surgical Set',
      quantity: 2,
      weight: '12 kg',
      dimensions: '60 x 40 x 30 cm',
      handling: 'Fragile - Sterile Material',
    },
    urgency: 'Urgent',
  };

  const steps = [
    { id: 1, label: 'Detail' },
    { id: 2, label: 'Pickup' },
    { id: 3, label: 'Delivery' },
    { id: 4, label: 'Confirm' },
  ];

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      <TopBar onBack={onBack} title="Delivery Details" subtitle={deliveryData.orderNumber} />
      
      <Stepper steps={steps} currentStep={1} />

      {/* Status badge */}
      <div className="flex justify-center -mt-2 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/20 border border-warning text-warning text-xs font-medium">
          <AlertTriangle className="w-3.5 h-3.5" />
          {deliveryData.status} • {deliveryData.urgency}
        </div>
      </div>

      <div className="px-4 mt-6 space-y-6">
        {/* Pickup Information */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-body">Delivery Point</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Location</span>
              <span className="text-body font-medium text-right max-w-[60%]">{deliveryData.pickup.location}</span>
            </div>
            <div>
              <span className="text-muted">Address</span>
              <p className="text-body text-xs mt-1 p-2 bg-neutral-bg rounded-md flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                {deliveryData.pickup.address}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted">Date & Time Slot</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-body font-medium">{deliveryData.pickup.timeSlot}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted">Contact</span>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted" />
                <span className="text-body font-medium">{deliveryData.pickup.contact}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted">Phone</span>
              <a href={`tel:${deliveryData.pickup.phone}`} className="flex items-center gap-2 text-primary font-medium">
                <Phone className="w-4 h-4" />
                {deliveryData.pickup.phone}
              </a>
            </div>
          </div>
        </Card>

        {/* Delivery Information */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-sm font-semibold text-body">Pickup Point</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Hospital</span>
              <span className="text-body font-medium text-right max-w-[60%]">{deliveryData.delivery.hospital}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Department</span>
              <span className="text-body font-medium text-right max-w-[60%]">{deliveryData.delivery.service}</span>
            </div>
            <div>
              <span className="text-muted">Address</span>
              <p className="text-body text-xs mt-1 p-2 bg-neutral-bg rounded-md flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                {deliveryData.delivery.address}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted">Delivery Time Slot</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-body font-medium">{deliveryData.delivery.timeSlot}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted">On-site Contact</span>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted" />
                <span className="text-body font-medium">{deliveryData.delivery.contact}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted">Phone</span>
              <a href={`tel:${deliveryData.delivery.phone}`} className="flex items-center gap-2 text-primary font-medium">
                <Phone className="w-4 h-4" />
                {deliveryData.delivery.phone}
              </a>
            </div>
          </div>
        </Card>

        {/* Package Information */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-warning" />
            </div>
            <h3 className="text-sm font-semibold text-body">Package Information</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Type</span>
              <span className="text-body font-medium">{deliveryData.package.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Quantity</span>
              <span className="text-body font-medium">{deliveryData.package.quantity} packages</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Total Weight</span>
              <span className="text-body font-medium">{deliveryData.package.weight}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Dimensions</span>
              <span className="text-body font-medium">{deliveryData.package.dimensions}</span>
            </div>
            <div>
              <span className="text-muted">Instructions</span>
              <p className="text-error text-xs mt-1 p-2 bg-error/5 rounded-md border border-error/20 font-medium">
                ⚠️ {deliveryData.package.handling}
              </p>
            </div>
          </div>
        </Card>

        <InfoCallout type="info">
          Take a photo of the package during pickup and delivery to ensure complete traceability.
        </InfoCallout>

        {/* Action buttons */}
        <Button variant="primary" fullWidth onClick={onStartPickup}>
          Start Pickup
        </Button>
        
        <button 
          onClick={onBack}
          className="w-full text-center text-primary text-sm font-medium hover:underline transition-all duration-200 py-2"
        >
          Back to List
        </button>
      </div>
    </div>
  );
}
