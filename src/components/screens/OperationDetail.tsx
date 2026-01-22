import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Truck, 
  Package, 
  CheckCircle, 
  AlertCircle,
  Stethoscope,
  Building2
} from 'lucide-react';
import { Card } from '../Card';
import { Button } from '../Button';

type OperationStatus = 'pending' | 'preparation' | 'in-transit' | 'delivered' | 'cancelled';

interface OperationDetailProps {
  operationId: string;
  onBack: () => void;
  onTrackDelivery?: () => void;
}

// Mock operation data - in real app this would come from API based on operationId
const mockOperationData = {
  id: 'OP-2026-001',
  status: 'in-transit' as OperationStatus,
  
  // General Information
  hospital: 'CHU Saint-Denis',
  city: 'Saint-Denis',
  operationType: 'Knee Arthroscopy',
  urgency: 'Scheduled',
  
  // Patient Info
  patientName: 'Jean Dupont',
  patientId: 'PAT-2026-4521',
  
  // Surgery Details
  surgeon: 'Dr. Marie Laurent',
  operationDate: 'January 22, 2026',
  operationTime: '09:00',
  operatingRoom: 'OR-3',
  
  // Logistics
  deliveryMode: 'Standard (D-1)',
  deliveryDate: 'January 21, 2026',
  deliveryTime: '08:00 - 10:00',
  
  // Contact
  contactName: 'Nurse Sophie Martin',
  contactPhone: '+33 6 12 34 56 78',
  
  // Equipment
  equipment: [
    { id: '1', name: 'Arthroscopy Set', category: 'Instruments', quantity: 1 },
    { id: '2', name: 'Camera System HD', category: 'Equipment', quantity: 1 },
    { id: '3', name: 'Shaver Blades 4.5mm', category: 'Consumables', quantity: 4 },
    { id: '4', name: 'Suture Anchors', category: 'Implants', quantity: 6 },
  ],
  
  // Timeline
  timeline: [
    {
      id: 1,
      title: 'Order Created',
      time: 'Jan 19, 2026, 14:32',
      description: 'Order registered and validated',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Stock Prepared',
      time: 'Jan 20, 2026, 09:15',
      description: 'Equipment verified and packed',
      status: 'completed',
    },
    {
      id: 3,
      title: 'In Transit',
      time: 'Jan 21, 2026, 06:45',
      description: 'Delivery in progress',
      status: 'current',
    },
    {
      id: 4,
      title: 'Delivered to OR',
      time: 'Expected at 08:30',
      description: 'Awaiting delivery',
      status: 'pending',
    },
  ],
  
  createdAt: 'January 19, 2026',
};

const getStatusConfig = (status: OperationStatus) => {
  switch (status) {
    case 'pending':
      return { label: 'Pending', bgColor: 'bg-gray-500', textColor: 'text-gray-500' };
    case 'preparation':
      return { label: 'In Preparation', bgColor: 'bg-primary', textColor: 'text-primary' };
    case 'in-transit':
      return { label: 'In Transit', bgColor: 'bg-accent', textColor: 'text-accent' };
    case 'delivered':
      return { label: 'Delivered', bgColor: 'bg-accent', textColor: 'text-accent' };
    case 'cancelled':
      return { label: 'Cancelled', bgColor: 'bg-error', textColor: 'text-error' };
    default:
      return { label: 'Unknown', bgColor: 'bg-gray-400', textColor: 'text-gray-400' };
  }
};

const getTimelineIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return CheckCircle;
    case 'current':
      return Truck;
    default:
      return Clock;
  }
};

export function OperationDetail({ operationId, onBack, onTrackDelivery }: OperationDetailProps) {
  // In real app, fetch operation data based on operationId
  const operation = mockOperationData;
  const statusConfig = getStatusConfig(operation.status);
  const totalEquipment = operation.equipment.reduce((sum, item) => sum + item.quantity, 0);

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
          <p className="text-white/80 text-xs mb-1">Operation</p>
          <h1 className="text-white text-xl font-semibold mb-2">
            {operation.id}
          </h1>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-medium ${statusConfig.bgColor}`}>
              <Clock className="w-3.5 h-3.5" />
              {statusConfig.label}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6 space-y-4">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-[12px] p-3 shadow-card border border-neutral-border">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted">Surgery Date</span>
            </div>
            <p className="text-sm font-semibold text-heading">{operation.operationDate}</p>
            <p className="text-xs text-muted">{operation.operationTime}</p>
          </div>
          <div className="bg-white rounded-[12px] p-3 shadow-card border border-neutral-border">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted">Equipment</span>
            </div>
            <p className="text-sm font-semibold text-heading">{totalEquipment} items</p>
            <p className="text-xs text-muted">{operation.equipment.length} types</p>
          </div>
        </div>

        {/* Patient & Surgery Info */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-body">Surgery Information</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Patient</span>
              <span className="text-body font-medium">{operation.patientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Procedure</span>
              <span className="text-body font-medium">{operation.operationType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Surgeon</span>
              <span className="text-body font-medium">{operation.surgeon}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Operating Room</span>
              <span className="text-body font-medium">{operation.operatingRoom}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Urgency</span>
              <span className="text-body font-medium">{operation.urgency}</span>
            </div>
          </div>
        </Card>

        {/* Hospital Info */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-body">Facility</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Hospital</span>
              <span className="text-body font-medium">{operation.hospital}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">City</span>
              <span className="text-body font-medium">{operation.city}</span>
            </div>
          </div>
        </Card>

        {/* Logistics */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-body">Logistics</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Delivery Mode</span>
              <span className="text-body font-medium">{operation.deliveryMode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Delivery Date</span>
              <span className="text-body font-medium">{operation.deliveryDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Time Slot</span>
              <span className="text-body font-medium">{operation.deliveryTime}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-body">On-site Contact</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Name</span>
                <span className="text-body font-medium">{operation.contactName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Phone</span>
                <a href={`tel:${operation.contactPhone}`} className="text-primary font-medium flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {operation.contactPhone}
                </a>
              </div>
            </div>
          </div>
        </Card>

        {/* Equipment List */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-body">Equipment</h3>
            </div>
            <span className="text-xs text-muted bg-primary/10 px-2 py-1 rounded-full">
              {totalEquipment} items
            </span>
          </div>
          
          <div className="space-y-3">
            {operation.equipment.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3 rounded-lg bg-neutral-bg border border-border"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-body">{item.name}</p>
                  <p className="text-xs text-muted">{item.category}</p>
                </div>
                <span className="text-sm font-semibold text-primary">×{item.quantity}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Timeline / Tracking */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-body">Tracking History</h3>
          </div>
          
          <div className="space-y-0">
            {operation.timeline.map((event, index) => {
              const Icon = getTimelineIcon(event.status);
              const isLast = index === operation.timeline.length - 1;
              
              return (
                <div key={event.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        event.status === 'completed'
                          ? 'bg-accent text-white'
                          : event.status === 'current'
                          ? 'bg-primary text-white animate-pulse'
                          : 'bg-neutral-bg border-2 border-border text-muted'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {!isLast && (
                      <div
                        className={`w-0.5 h-10 ${
                          event.status === 'completed' ? 'bg-accent' : 'bg-border'
                        }`}
                      />
                    )}
                  </div>
                  
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-semibold text-body mb-0.5">
                      {event.title}
                    </p>
                    <p className="text-xs text-muted mb-0.5">{event.time}</p>
                    <p className="text-xs text-muted">{event.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Actions */}
        {operation.status === 'in-transit' && onTrackDelivery && (
          <Button variant="primary" fullWidth onClick={onTrackDelivery}>
            <Truck className="w-5 h-5 mr-2" />
            Track Delivery Live
          </Button>
        )}

        <p className="text-xs text-center text-muted">
          Created on {operation.createdAt}
        </p>
      </div>
    </div>
  );
}
