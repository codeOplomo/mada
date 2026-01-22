import React from 'react';
import { Building2, Package, Truck, CreditCard, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Stepper } from '../Stepper';
import { Card } from '../Card';
import { Button } from '../Button';
import { InfoCallout } from '../InfoCallout';

interface ReceptionDetailProps {
  onBack: () => void;
  onMarkAsReviewed: () => void;
  onReportProblem: () => void;
  onRequestCorrection: () => void;
}

export function ReceptionDetail({ onBack, onMarkAsReviewed, onReportProblem, onRequestCorrection }: ReceptionDetailProps) {
  const commandData = {
    status: 'Under Mada Medical Review',
    hospital: 'Centre Hôpital Universitaire Lyon-Sud',
    city: 'Lyon',
    interventionDate: 'October 24, 2024',
    urgency: 'Urgent',
    setType: 'Standard Scoliosis Set',
    numberOfSets: 2,
    elements: 'Implants, instrumentation, consumables',
    constraints: 'Sterile equipment required. Preference for 5.5mm screw implant.',
    deliveryLocation: 'Receiving Dock, Operating Room',
    deliveryDate: 'October 23, 2024, 2PM-4PM',
    logisticsConstraints: 'Limited vehicle access, contact manager upon arrival.',
    siteContact: 'Mrs. Sophie Dubois - 06 12 34 56 78',
    paymentMethod: 'Advance Payment',
    adminStatus: 'Confirmed',
  };

  const steps = [
    { id: 1, label: 'Detail' },
    { id: 2, label: 'Photo' },
  ];

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      <TopBar onBack={onBack} title="Order Details" />
      
      <Stepper steps={steps} currentStep={1} />

      {/* Status badge */}
      <div className="flex justify-center -mt-2 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/20 border border-warning text-warning text-xs font-medium">
          <AlertTriangle className="w-3.5 h-3.5" />
          {commandData.status}
        </div>
      </div>

      <div className="px-4 mt-6 space-y-6">
        {/* General Information */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-body">General Information</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Hospital / Clinic</span>
              <span className="text-body font-medium text-right max-w-[60%]">{commandData.hospital}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">City</span>
              <span className="text-body font-medium">{commandData.city}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted">Scheduled Procedure Date</span>
              <div className="flex items-center gap-2">
                <span className="text-body font-medium">{commandData.interventionDate}</span>
                <Calendar className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Urgency Level</span>
              <span className="text-accent font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {commandData.urgency}
              </span>
            </div>
          </div>
        </Card>

        {/* Material */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-body">Equipment</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Set Type</span>
              <span className="text-body font-medium">{commandData.setType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Number of Sets</span>
              <span className="text-body font-medium">{commandData.numberOfSets}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Included Items</span>
              <span className="text-body font-medium text-right max-w-[60%]">{commandData.elements}</span>
            </div>
            <div>
              <span className="text-muted">Constraints or Notes</span>
              <p className="text-body text-xs mt-1 p-2 bg-neutral-bg rounded-md">{commandData.constraints}</p>
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
              <span className="text-muted">Delivery Location</span>
              <span className="text-body font-medium text-right max-w-[60%]">{commandData.deliveryLocation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Delivery Date & Time</span>
              <span className="text-body font-medium text-right max-w-[60%]">{commandData.deliveryDate}</span>
            </div>
            <div>
              <span className="text-muted">Specific Logistics Constraints</span>
              <p className="text-body text-xs mt-1 p-2 bg-neutral-bg rounded-md">{commandData.logisticsConstraints}</p>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Site Contact</span>
              <span className="text-body font-medium text-right max-w-[60%]">{commandData.siteContact}</span>
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
              <span className="text-muted">Selected Payment Method</span>
              <span className="text-body font-medium">{commandData.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Administrative Status</span>
              <span className="text-accent font-medium flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                {commandData.adminStatus}
              </span>
            </div>
          </div>
        </Card>

        <InfoCallout type="success">
          Verify overall consistency before launch: dates, standard equipment and payment method.
        </InfoCallout>

        {/* Action buttons */}
        <Button variant="primary" fullWidth onClick={onMarkAsReviewed}>
          Validate
        </Button>
        
        <Button variant="danger" fullWidth onClick={onReportProblem}>
          Report a Problem
        </Button>
        
        <button 
          onClick={onRequestCorrection}
          className="w-full text-center text-primary text-sm font-medium hover:underline transition-all duration-200 py-2"
        >
          Request a Correction
        </button>
      </div>
    </div>
  );
}
