import React, { useState } from 'react';
import { Camera, Image, Upload, X, CheckCircle, RotateCcw, MapPin, User } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Stepper } from '../Stepper';
import { Card } from '../Card';
import { Button } from '../Button';
import { InfoCallout } from '../InfoCallout';

interface DeliveryDropoffPhotoProps {
  onBack: () => void;
  onConfirmDelivery: () => void;
}

export function DeliveryDropoffPhoto({ onBack, onConfirmDelivery }: DeliveryDropoffPhotoProps) {
  const [colisPhotos, setColisPhotos] = useState<string[]>([]);
  const [deliveryPhotos, setDeliveryPhotos] = useState<string[]>([]);
  const [isCapturingColis, setIsCapturingColis] = useState(false);
  const [isCapturingDelivery, setIsCapturingDelivery] = useState(false);
  const [recipientName, setRecipientName] = useState('');

  const steps = [
    { id: 1, label: 'Detail' },
    { id: 2, label: 'Pickup' },
    { id: 3, label: 'Delivery' },
    { id: 4, label: 'Confirm' },
  ];

  const deliveryInfo = {
    orderNumber: 'CMD-412345',
    hospital: 'Hôpital Saint-Louis',
    service: 'Operating Room - Level 2',
    contact: 'Ms. Sophie Dubois',
  };

  const handleTakeColisPhoto = () => {
    setIsCapturingColis(true);
    setTimeout(() => {
      const newPhoto = `colis-delivery-${Date.now()}`;
      setColisPhotos([...colisPhotos, newPhoto]);
      setIsCapturingColis(false);
    }, 500);
  };

  const handleTakeDeliveryPhoto = () => {
    setIsCapturingDelivery(true);
    setTimeout(() => {
      const newPhoto = `delivery-${Date.now()}`;
      setDeliveryPhotos([...deliveryPhotos, newPhoto]);
      setIsCapturingDelivery(false);
    }, 500);
  };

  const handleRemoveColisPhoto = (index: number) => {
    setColisPhotos(colisPhotos.filter((_, i) => i !== index));
  };

  const handleRemoveDeliveryPhoto = (index: number) => {
    setDeliveryPhotos(deliveryPhotos.filter((_, i) => i !== index));
  };

  const handleRetakeColisPhoto = (index: number) => {
    const newPhotos = [...colisPhotos];
    newPhotos[index] = `colis-delivery-${Date.now()}`;
    setColisPhotos(newPhotos);
  };

  const handleRetakeDeliveryPhoto = (index: number) => {
    const newPhotos = [...deliveryPhotos];
    newPhotos[index] = `delivery-${Date.now()}`;
    setDeliveryPhotos(newPhotos);
  };

  const canConfirm = colisPhotos.length > 0 && recipientName.trim().length > 0;

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      <TopBar 
        onBack={onBack} 
        title="Delivery Photo" 
        subtitle={deliveryInfo.orderNumber}
      />
      
      <Stepper steps={steps} currentStep={3} />

      <div className="px-4 mt-6 space-y-6">
        <InfoCallout type="info">
          Photograph the package upon delivery and confirm the recipient. These photos will serve as proof of delivery.
        </InfoCallout>

        <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center">
              <MapPin className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-body">{deliveryInfo.hospital}</p>
              <p className="text-xs text-muted">{deliveryInfo.service}</p>
              <p className="text-xs text-primary mt-1">Contact: {deliveryInfo.contact}</p>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-body mb-4">📦 Package Photos at Delivery</h3>
          
          {colisPhotos.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {colisPhotos.map((photo, index) => (
                <div 
                  key={photo} 
                  className="relative aspect-square bg-neutral-100 rounded-xl border-2 border-neutral-200 overflow-hidden group"
                >
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                    <div className="text-center">
                      <Image className="w-8 h-8 text-primary mx-auto mb-1" />
                      <span className="text-xs text-muted">Package {index + 1}</span>
                    </div>
                  </div>
                  
                  <div className="absolute top-2 left-2">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleRetakeColisPhoto(index)}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
                    >
                      <RotateCcw className="w-5 h-5 text-body" />
                    </button>
                    <button
                      onClick={() => handleRemoveColisPhoto(index)}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
                    >
                      <X className="w-5 h-5 text-error" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleTakeColisPhoto}
            disabled={isCapturingColis}
            className={`w-full aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all ${
              isCapturingColis 
                ? 'border-primary bg-primary/5' 
                : 'border-neutral-300 hover:border-primary hover:bg-primary/5'
            }`}
          >
            {isCapturingColis ? (
              <>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm text-primary font-medium">Capturing...</span>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-body">Take Package Photo</p>
                  <p className="text-xs text-muted mt-1">Delivery State</p>
                </div>
              </>
            )}
          </button>

          <div className="mt-4 pt-4 border-t border-neutral-100">
            <button className="w-full flex items-center justify-center gap-2 py-3 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors">
              <Upload className="w-4 h-4" />
              <span>Import from Gallery</span>
            </button>
          </div>

          {colisPhotos.length > 0 && (
            <div className="flex items-center justify-center gap-2 pt-3">
              <div className="flex items-center gap-1 px-3 py-1.5 bg-accent/10 rounded-full">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">
                  {colisPhotos.length} photo{colisPhotos.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          )}
        </Card>


        <Card>
          <h3 className="text-sm font-semibold text-body mb-3">Delivery Checklist</h3>
          <ul className="space-y-2">
            {[
              { text: 'Package photo at delivery', done: colisPhotos.length > 0 },
              { text: 'Recipient name provided', done: recipientName.trim().length > 0 },
              { text: 'Drop-off location photo', done: deliveryPhotos.length > 0 },
              { text: 'Verify compliance with contact', done: colisPhotos.length > 0 && recipientName.trim().length > 0 },
            ].map((requirement, index) => (
              <li key={index} className="flex items-start gap-2 text-xs text-muted">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  requirement.done 
                    ? 'bg-accent text-white' 
                    : 'bg-neutral-100 text-muted'
                }`}>
                  {requirement.done ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <span className="text-[10px] font-medium">{index + 1}</span>
                  )}
                </span>
                {requirement.text}
              </li>
            ))}
          </ul>
        </Card>

        <Button 
          variant="success" 
          fullWidth 
          onClick={onConfirmDelivery}
        >
          Confirm Delivery
        </Button>
        
        <button 
          onClick={onBack}
          className="w-full text-center py-3 text-sm text-muted hover:text-body transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
}
