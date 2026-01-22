import React, { useState } from 'react';
import { Camera, Image, Upload, X, CheckCircle, RotateCcw } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Stepper } from '../Stepper';
import { Card } from '../Card';
import { Button } from '../Button';
import { InfoCallout } from '../InfoCallout';

interface NewOrderPhotoProps {
  onBack: () => void;
  onNext: () => void;
}

export function NewOrderPhoto({ onBack, onNext }: NewOrderPhotoProps) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);

  const steps = [
    { id: 1, label: 'Info' },
    { id: 2, label: 'Photo' },
    { id: 3, label: 'Logistics' },
    { id: 4, label: 'Validation' },
  ];

  // Simulate taking a photo
  const handleTakePhoto = () => {
    setIsCapturing(true);
    // Simulate camera delay
    setTimeout(() => {
      const newPhoto = `photo-${Date.now()}`;
      setPhotos([...photos, newPhoto]);
      setIsCapturing(false);
    }, 500);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleRetakePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos[index] = `photo-${Date.now()}`;
    setPhotos(newPhotos);
  };

  const canProceed = true; // Photos are optional

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      <TopBar onBack={onBack} title="Nouvelle commande" />
      
      <Stepper steps={steps} currentStep={2} />

      <div className="px-4 mt-6 space-y-6">
        {/* Instructions */}
        <InfoCallout type="info">
          Prenez une photo du dossier médical ou de la prescription pour faciliter le traitement de la commande.
        </InfoCallout>

        {/* Photo capture area */}
        <Card>
          <h2 className="text-body mb-4">Photos du dossier médical</h2>
          
          {/* Photo grid */}
          {photos.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {photos.map((photo, index) => (
                <div 
                  key={photo} 
                  className="relative aspect-square bg-neutral-100 rounded-xl border-2 border-neutral-200 overflow-hidden group"
                >
                  {/* Simulated photo placeholder */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                    <div className="text-center">
                      <Image className="w-8 h-8 text-primary mx-auto mb-1" />
                      <span className="text-xs text-muted">Photo {index + 1}</span>
                    </div>
                  </div>
                  
                  {/* Photo success indicator */}
                  <div className="absolute top-2 left-2">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Action buttons overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleRetakePhoto(index)}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
                    >
                      <RotateCcw className="w-5 h-5 text-body" />
                    </button>
                    <button
                      onClick={() => handleRemovePhoto(index)}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
                    >
                      <X className="w-5 h-5 text-error" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Camera button */}
          <button
            onClick={handleTakePhoto}
            disabled={isCapturing}
            className={`w-full aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all ${
              isCapturing 
                ? 'border-primary bg-primary/5' 
                : 'border-neutral-300 hover:border-primary hover:bg-primary/5'
            }`}
          >
            {isCapturing ? (
              <>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm text-primary font-medium">Capture en cours...</span>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-body">Prendre une photo</p>
                  <p className="text-xs text-muted mt-1">Appuyez pour capturer</p>
                </div>
              </>
            )}
          </button>

          {/* Alternative upload option */}
          <div className="mt-4 pt-4 border-t border-neutral-100">
            <button className="w-full flex items-center justify-center gap-2 py-3 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors">
              <Upload className="w-4 h-4" />
              <span>Importer depuis la galerie</span>
            </button>
          </div>
        </Card>

        {/* Photo requirements */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-3">Types de photos recommandées</h3>
          <ul className="space-y-2">
            {[
              'Photo de la prescription médicale',
              'Photo du dossier patient (page pertinente)',
              'Documents administratifs associés',
              'Minimum 1 photo requise',
            ].map((requirement, index) => (
              <li key={index} className="flex items-start gap-2 text-xs text-muted">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  index === 3 && photos.length > 0 
                    ? 'bg-accent text-white' 
                    : 'bg-neutral-100 text-muted'
                }`}>
                  {index === 3 && photos.length > 0 ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <span className="text-[10px] font-medium">{index + 1}</span>
                  )}
                </span>
                {requirement}
              </li>
            ))}
          </ul>
        </Card>

        {/* Photo count indicator */}
        {photos.length > 0 && (
          <div className="flex items-center justify-center gap-2 py-2">
            <div className="flex items-center gap-1 px-3 py-1.5 bg-accent/10 rounded-full">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                {photos.length} photo{photos.length > 1 ? 's' : ''} ajoutée{photos.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <Button 
          variant="primary" 
          fullWidth 
          onClick={onNext}
          disabled={!canProceed}
        >
          Continuer vers le logistique
        </Button>
        
        <button 
          onClick={onBack}
          className="w-full text-center py-3 text-sm text-muted hover:text-body transition-colors"
        >
          Retour
        </button>
      </div>
    </div>
  );
}
