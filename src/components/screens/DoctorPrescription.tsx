import React, { useState } from 'react';
import { Camera, Upload, FileText, Check, X, Pill, AlertCircle } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Card } from '../Card';
import { Button } from '../Button';
import { Stepper } from '../Stepper';
import { InfoCallout } from '../InfoCallout';
import { Input } from '../Input';

interface DoctorPrescriptionProps {
  onBack: () => void;
  onConfirm: () => void;
}

export function DoctorPrescription({ onBack, onConfirm }: DoctorPrescriptionProps) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const steps = [
    { id: 1, label: 'Detail' },
    { id: 2, label: 'Record' },
    { id: 3, label: 'Prescription' },
    { id: 4, label: 'Confirm' },
  ];

  const handleAddPhoto = () => {
    setPhotos([...photos, `photo-${photos.length + 1}`]);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-neutral-bg pb-8">
      <TopBar 
        title="Prescription" 
        subtitle="DOC-789012"
        showBack 
        onBack={onBack} 
      />

      <div className="px-4 mt-6 space-y-6">
        <Stepper steps={steps} currentStep={3} />

        {/* Instructions */}
        <InfoCallout 
          type="info"
          message="Take a photo of the prescription. Make sure the prescribed medications and dosages are clearly visible."
        />

        {/* Prescription photo section */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-4 flex items-center gap-2">
            <Pill className="w-4 h-4 text-primary" />
            Prescription Photo
          </h3>

          {/* Photo grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {photos.map((photo, index) => (
              <div 
                key={index}
                className="relative aspect-[4/3] bg-neutral-bg rounded-lg border border-border overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-muted" />
                </div>
                <div className="absolute top-1 right-1">
                  <button
                    onClick={() => handleRemovePhoto(index)}
                    className="w-6 h-6 bg-error text-white rounded-full flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-1 left-1">
                  <div className="w-5 h-5 bg-accent text-white rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}

            {/* Add photo button */}
            <button
              onClick={handleAddPhoto}
              className="aspect-[4/3] border-2 border-dashed border-primary/30 rounded-lg flex flex-col items-center justify-center gap-2 bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              <Camera className="w-6 h-6 text-primary" />
              <span className="text-xs text-primary font-medium">Add</span>
            </button>
          </div>

          {/* Upload from gallery */}
          <button className="w-full py-2.5 border border-border rounded-lg flex items-center justify-center gap-2 text-sm text-muted hover:bg-neutral-bg transition-colors">
            <Upload className="w-4 h-4" />
            Import from Gallery
          </button>
        </Card>

        {/* Prescription details */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-warning" />
            Prescription Details
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted">Patient</span>
              <span className="text-sm font-medium text-body">Martin Dubois</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted">Prescription Date</span>
              <span className="text-sm font-medium text-body">20/01/2026</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-muted">Treatment Duration</span>
              <span className="text-sm font-medium text-body">30 days</span>
            </div>
          </div>
        </Card>

        {/* Checklist */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-3">Checks</h3>
          <div className="space-y-3">
            {[
              { label: 'Original prescription', checked: photos.length > 0 },
              { label: 'Doctor\'s signature visible', checked: photos.length > 0 },
              { label: 'Medication list readable', checked: photos.length > 0 },
              { label: 'Dosages clearly indicated', checked: photos.length > 0 },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  item.checked ? 'bg-accent' : 'bg-neutral-bg border border-border'
                }`}>
                  {item.checked && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm ${item.checked ? 'text-body' : 'text-muted'}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Notes */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-3">Additional Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes or remarks about the prescription..."
            className="w-full p-3 border border-border rounded-lg text-sm text-body placeholder:text-muted resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </Card>

        {/* Action buttons */}
        <div className="space-y-3 pt-4">
          <Button 
            variant="primary" 
            fullWidth 
            onClick={onConfirm}
          >
            Validate and Send
          </Button>
          <Button 
            variant="ghost" 
            fullWidth 
            onClick={onBack}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
