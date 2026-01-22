import React from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Card } from '../Card';
import { Button } from '../Button';

interface OrderTrackingProps {
  onBack: () => void;
}

export function OrderTracking({ onBack }: OrderTrackingProps) {
  const orderData = {
    id: 'ORD-2024-0428',
    hospital: 'Paris University Hospital',
    city: 'Paris',
    date: 'January 24, 2026',
    status: 'In Transit',
    intervention: 'Scoliosis Surgery',
  };

  const timeline = [
    {
      id: 1,
      title: 'Order Created',
      time: 'Jan 19, 2026, 14:32',
      description: 'Order registered and validated',
      status: 'completed',
      icon: CheckCircle,
    },
    {
      id: 2,
      title: 'Stock Prepared',
      time: 'Jan 22, 2026, 09:15',
      description: 'Equipment verified and packed',
      status: 'completed',
      icon: Package,
    },
    {
      id: 3,
      title: 'In Transit',
      time: 'Jan 24, 2026, 06:45',
      description: 'Delivery expected at 08:30',
      status: 'current',
      icon: Truck,
    },
    {
      id: 4,
      title: 'Delivery to OR',
      time: 'Expected at 08:30',
      description: 'Estimated arrival',
      status: 'pending',
      icon: MapPin,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      {/* Header */}
      <div className="bg-primary rounded-b-[20px] shadow-card px-4 pt-6 pb-8">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 mb-4"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        
        <div>
          <p className="text-white/80 text-xs mb-1">Order</p>
          <h1 className="text-white text-xl font-semibold mb-2">
            {orderData.id}
          </h1>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-white text-xs font-medium">
            <Clock className="w-3.5 h-3.5" />
            {orderData.status}
          </div>
        </div>
      </div>

      <div className="px-4 mt-6 space-y-6">
        {/* Order summary */}
        <Card>
          <h2 className="text-body mb-4">Order Details</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm text-muted">Facility</span>
              <span className="text-sm text-body font-medium text-right">
                {orderData.hospital}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-muted">City</span>
              <span className="text-sm text-body font-medium text-right">
                {orderData.city}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-muted">Procedure Date</span>
              <span className="text-sm text-body font-medium text-right">
                {orderData.date}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-muted">Type</span>
              <span className="text-sm text-body font-medium text-right">
                {orderData.intervention}
              </span>
            </div>
          </div>
        </Card>

        {/* Timeline */}
        <Card>
          <h2 className="text-body mb-4">History & Tracking</h2>
          
          <div className="space-y-4">
            {timeline.map((event, index) => {
              const Icon = event.icon;
              const isLast = index === timeline.length - 1;
              
              return (
                <div key={event.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        event.status === 'completed'
                          ? 'bg-accent text-white'
                          : event.status === 'current'
                          ? 'bg-primary text-white'
                          : 'bg-neutral-bg border-2 border-border text-muted'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    {!isLast && (
                      <div
                        className={`w-0.5 h-12 mt-1 ${
                          event.status === 'completed' ? 'bg-accent' : 'bg-border'
                        }`}
                      />
                    )}
                  </div>
                  
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-semibold text-body mb-0.5">
                      {event.title}
                    </p>
                    <p className="text-xs text-muted mb-1">{event.time}</p>
                    <p className="text-sm text-muted">{event.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Map placeholder */}
        <Card padding="none" className="overflow-hidden">
          <div className="h-40 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
            <MapPin className="w-12 h-12 text-primary/30" />
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center">
              <p className="text-sm text-muted">Real-time tracking map</p>
            </div>
          </div>
        </Card>

        {/* Contact support */}
        <Card className="bg-gradient-to-br from-primary/5 to-transparent border border-primary/20">
          <h3 className="text-sm font-semibold text-body mb-3">
            Need assistance?
          </h3>
          <div className="flex gap-3">
            <Button variant="secondary" fullWidth size="small">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button variant="secondary" fullWidth size="small">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
