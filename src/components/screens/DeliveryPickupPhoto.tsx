import React, { useState } from 'react';
import { Camera, Image, Upload, X, CheckCircle, RotateCcw, Package, QrCode } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Stepper } from '../Stepper';
import { Card } from '../Card';
import { Button } from '../Button';
import { InfoCallout } from '../InfoCallout';

interface DeliveryPickupPhotoProps {
  onBack: () => void;
  onConfirmPickup: () => void;
}

export function DeliveryPickupPhoto({ onBack, onConfirmPickup }: DeliveryPickupPhotoProps) {
  const [colisPhotos, setColisPhotos] = useState<string[]>([]);
  const [labelPhotos, setLabelPhotos] = useState<string[]>([]);
  const [isCapturingColis, setIsCapturingColis] = useState(false);
  const [isCapturingLabel, setIsCapturingLabel] = useState(false);
  const [scannedCode, setScannedCode] = useState<string | null>(null);

  const steps = [
    { id: 1, label: 'Detail' },
    { id: 2, label: 'Pickup' },
    { id: 3, label: 'Delivery' },
    { id: 4, label: 'Confirm' },
  ];

  const orderInfo = {
    orderNumber: 'CMD-412345',
    packageCount: 2,
  };

  const handleTakeColisPhoto = () => {
    setIsCapturingColis(true);
    setTimeout(() => {
      const newPhoto = `colis-pickup-${Date.now()}`;
      setColisPhotos([...colisPhotos, newPhoto]);
      setIsCapturingColis(false);
    }, 500);
  };

  const handleTakeLabelPhoto = () => {
    setIsCapturingLabel(true);
    setTimeout(() => {
      const newPhoto = `label-${Date.now()}`;
      setLabelPhotos([...labelPhotos, newPhoto]);
      setIsCapturingLabel(false);
    }, 500);
  };

  const handleScanCode = () => {
    setTimeout(() => {
      setScannedCode('PKG-2026-412345-001');
    }, 300);
  };

  const handleRemoveColisPhoto = (index: number) => {
    setColisPhotos(colisPhotos.filter((_, i) => i !== index));
  };

  const handleRemoveLabelPhoto = (index: number) => {
    setLabelPhotos(labelPhotos.filter((_, i) => i !== index));
  };

  const handleRetakeColisPhoto = (index: number) => {
    const newPhotos = [...colisPhotos];
    newPhotos[index] = `colis-pickup-${Date.now()}`;
    setColisPhotos(newPhotos);
  };

  const handleRetakeLabelPhoto = (index: number) => {
    const newPhotos = [...labelPhotos];
    newPhotos[index] = `label-${Date.now()}`;
    setLabelPhotos(newPhotos);
  };

  const canConfirm = colisPhotos.length > 0;

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      <TopBar 
        onBack={onBack} 
        title="Pickup Photo" 
        subtitle={orderInfo.orderNumber}
      />
      
      <Stepper steps={steps} currentStep={2} />

      <div className="px-4 mt-6 space-y-6">
        <InfoCallout type="info">
          Photograph the package at the time of pickup from the warehouse. These photos will serve as proof of the package's initial condition.
        </InfoCallout>


        <Card>
          <h3 className="text-sm font-semibold text-body mb-4">📦 Package Photos</h3>
          
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
                  <p className="text-xs text-muted mt-1">Tap to capture</p>
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
          <h3 className="text-sm font-semibold text-body mb-3">Pickup Checklist</h3>
          <ul className="space-y-2">
            {[
              { text: 'Package photo (general view)', done: colisPhotos.length > 0 },
              { text: 'Barcode scanned', done: !!scannedCode },
              { text: 'Check packaging integrity', done: colisPhotos.length > 0 },
              { text: 'Label photo visible', done: labelPhotos.length > 0 },
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
          variant="primary" 
          fullWidth 
          onClick={onConfirmPickup}
        >
          Confirm Pickup
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
