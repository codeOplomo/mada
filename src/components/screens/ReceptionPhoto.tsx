import React, { useState } from 'react';
import { Camera, Image, Upload, X, CheckCircle, RotateCcw } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Stepper } from '../Stepper';
import { Card } from '../Card';
import { Button } from '../Button';
import { InfoCallout } from '../InfoCallout';

interface ReceptionPhotoProps {
  onBack: () => void;
  onValidate: () => void;
}

export function ReceptionPhoto({ onBack, onValidate }: ReceptionPhotoProps) {
  const [instrumentPhotos, setInstrumentPhotos] = useState<string[]>([]);
  const [colisPhotos, setColisPhotos] = useState<string[]>([]);
  const [isCapturingInstrument, setIsCapturingInstrument] = useState(false);
  const [isCapturingColis, setIsCapturingColis] = useState(false);
  const [insuranceDocuments, setInsuranceDocuments] = useState<File[]>([]);
  const [invoicePhotos, setInvoicePhotos] = useState<string[]>([]);
  const [isCapturingInvoice, setIsCapturingInvoice] = useState(false);

  const steps = [
    { id: 1, label: 'Detail' },
    { id: 2, label: 'Photo' },
  ];

  // Simulate taking a photo for instruments
  const handleTakeInstrumentPhoto = () => {
    setIsCapturingInstrument(true);
    setTimeout(() => {
      const newPhoto = `instrument-${Date.now()}`;
      setInstrumentPhotos([...instrumentPhotos, newPhoto]);
      setIsCapturingInstrument(false);
    }, 500);
  };

  // Simulate taking a photo for colis
  const handleTakeColisPhoto = () => {
    setIsCapturingColis(true);
    setTimeout(() => {
      const newPhoto = `colis-${Date.now()}`;
      setColisPhotos([...colisPhotos, newPhoto]);
      setIsCapturingColis(false);
    }, 500);
  };

  const handleRemoveInstrumentPhoto = (index: number) => {
    setInstrumentPhotos(instrumentPhotos.filter((_, i) => i !== index));
  };

  const handleRemoveColisPhoto = (index: number) => {
    setColisPhotos(colisPhotos.filter((_, i) => i !== index));
  };

  const handleRetakeInstrumentPhoto = (index: number) => {
    const newPhotos = [...instrumentPhotos];
    newPhotos[index] = `instrument-${Date.now()}`;
    setInstrumentPhotos(newPhotos);
  };

  const handleRetakeColisPhoto = (index: number) => {
    const newPhotos = [...colisPhotos];
    newPhotos[index] = `colis-${Date.now()}`;
    setColisPhotos(newPhotos);
  };

  const handleAddInsuranceDocument = (files: FileList | null) => {
    if (files) {
      setInsuranceDocuments([...insuranceDocuments, ...Array.from(files)]);
    }
  };

  const handleRemoveInsuranceDocument = (index: number) => {
    setInsuranceDocuments(insuranceDocuments.filter((_, i) => i !== index));
  };

  // Simulate taking a photo for invoice
  const handleTakeInvoicePhoto = () => {
    setIsCapturingInvoice(true);
    setTimeout(() => {
      const newPhoto = `invoice-${Date.now()}`;
      setInvoicePhotos([...invoicePhotos, newPhoto]);
      setIsCapturingInvoice(false);
    }, 500);
  };

  const handleRemoveInvoicePhoto = (index: number) => {
    setInvoicePhotos(invoicePhotos.filter((_, i) => i !== index));
  };

  const handleRetakeInvoicePhoto = (index: number) => {
    const newPhotos = [...invoicePhotos];
    newPhotos[index] = `invoice-${Date.now()}`;
    setInvoicePhotos(newPhotos);
  };

  const canValidate = instrumentPhotos.length > 0 && colisPhotos.length > 0 && invoicePhotos.length > 0;

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      <TopBar 
        onBack={onBack} 
        title="Order Photo" 
        subtitle="Documentation before validation" 
      />
      
      <Stepper steps={steps} currentStep={2} />

      <div className="px-4 mt-6 space-y-6">
        {/* Instructions */}
        <InfoCallout type="info">
          Take photos of the instruments and the package for documentation. These photos will serve as proof of condition before shipment.
        </InfoCallout>

        {/* Instrument Photos Section */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-4">📦 Instrument Photos</h3>
          
          {/* Photo grid */}
          {instrumentPhotos.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {instrumentPhotos.map((photo, index) => (
                <div 
                  key={photo} 
                  className="relative aspect-square bg-neutral-100 rounded-xl border-2 border-neutral-200 overflow-hidden group"
                >
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                    <div className="text-center">
                      <Image className="w-8 h-8 text-primary mx-auto mb-1" />
                      <span className="text-xs text-muted">Instrument {index + 1}</span>
                    </div>
                  </div>
                  
                  <div className="absolute top-2 left-2">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleRetakeInstrumentPhoto(index)}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
                    >
                      <RotateCcw className="w-5 h-5 text-body" />
                    </button>
                    <button
                      onClick={() => handleRemoveInstrumentPhoto(index)}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
                    >
                      <X className="w-5 h-5 text-error" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Camera button for instruments */}
          <button
            onClick={handleTakeInstrumentPhoto}
            disabled={isCapturingInstrument}
            className={`w-full aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all ${
              isCapturingInstrument 
                ? 'border-primary bg-primary/5' 
                : 'border-neutral-300 hover:border-primary hover:bg-primary/5'
            }`}
          >
            {isCapturingInstrument ? (
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
                  <p className="text-sm font-medium text-body">Take a photo of the instruments</p>
                  <p className="text-xs text-muted mt-1">Tap to capture</p>
                </div>
              </>
            )}
          </button>

          <div className="mt-4 pt-4 border-t border-neutral-100">
            <button className="w-full flex items-center justify-center gap-2 py-3 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors">
              <Upload className="w-4 h-4" />
              <span>Import from gallery</span>
            </button>
          </div>

          {instrumentPhotos.length > 0 && (
            <div className="flex items-center justify-center gap-2 pt-3">
              <div className="flex items-center gap-1 px-3 py-1.5 bg-accent/10 rounded-full">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">
                  {instrumentPhotos.length} photo{instrumentPhotos.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          )}
        </Card>

        {/* Package Photos Section */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-4">🏷️ Package Photos</h3>
          
          {/* Photo grid */}
          {colisPhotos.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {colisPhotos.map((photo, index) => (
                <div 
                  key={photo} 
                  className="relative aspect-square bg-neutral-100 rounded-xl border-2 border-neutral-200 overflow-hidden group"
                >
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-accent/5">
                    <div className="text-center">
                      <Image className="w-8 h-8 text-accent mx-auto mb-1" />
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

          {/* Camera button for package */}
          <button
            onClick={handleTakeColisPhoto}
            disabled={isCapturingColis}
            className={`w-full aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all ${
              isCapturingColis 
                ? 'border-accent bg-accent/5' 
                : 'border-neutral-300 hover:border-accent hover:bg-accent/5'
            }`}
          >
            {isCapturingColis ? (
              <>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center animate-pulse">
                  <Camera className="w-6 h-6 text-accent" />
                </div>
                <span className="text-sm text-accent font-medium">Capturing...</span>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-accent" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-body">Take a photo of the package</p>
                  <p className="text-xs text-muted mt-1">Tap to capture</p>
                </div>
              </>
            )}
          </button>

          <div className="mt-4 pt-4 border-t border-neutral-100">
            <button className="w-full flex items-center justify-center gap-2 py-3 text-sm text-accent hover:bg-accent/5 rounded-lg transition-colors">
              <Upload className="w-4 h-4" />
              <span>Import from gallery</span>
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

        {/* Invoice Image Section */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-4">📄 Invoice Image</h3>
          
          {/* Photo grid */}
          {invoicePhotos.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {invoicePhotos.map((photo, index) => (
                <div 
                  key={photo} 
                  className="relative aspect-square bg-neutral-100 rounded-xl border-2 border-neutral-200 overflow-hidden group"
                >
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-warning/10 to-warning/5">
                    <div className="text-center">
                      <Image className="w-8 h-8 text-warning mx-auto mb-1" />
                      <span className="text-xs text-muted">Invoice {index + 1}</span>
                    </div>
                  </div>
                  
                  <div className="absolute top-2 left-2">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleRetakeInvoicePhoto(index)}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
                    >
                      <RotateCcw className="w-5 h-5 text-body" />
                    </button>
                    <button
                      onClick={() => handleRemoveInvoicePhoto(index)}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
                    >
                      <X className="w-5 h-5 text-error" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Camera button for invoice */}
          <button
            onClick={handleTakeInvoicePhoto}
            disabled={isCapturingInvoice}
            className={`w-full aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all ${
              isCapturingInvoice 
                ? 'border-warning bg-warning/5' 
                : 'border-neutral-300 hover:border-warning hover:bg-warning/5'
            }`}
          >
            {isCapturingInvoice ? (
              <>
                <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center animate-pulse">
                  <Camera className="w-6 h-6 text-warning" />
                </div>
                <span className="text-sm text-warning font-medium">Capturing...</span>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-warning" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-body">Take a photo of the invoice</p>
                  <p className="text-xs text-muted mt-1">Tap to capture</p>
                </div>
              </>
            )}
          </button>

          <div className="mt-4 pt-4 border-t border-neutral-100">
            <button className="w-full flex items-center justify-center gap-2 py-3 text-sm text-warning hover:bg-warning/5 rounded-lg transition-colors">
              <Upload className="w-4 h-4" />
              <span>Import from gallery</span>
            </button>
          </div>

          {invoicePhotos.length > 0 && (
            <div className="flex items-center justify-center gap-2 pt-3">
              <div className="flex items-center gap-1 px-3 py-1.5 bg-accent/10 rounded-full">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">
                  {invoicePhotos.length} photo{invoicePhotos.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          )}
        </Card>

        
        {/* Insurance Document Section */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-4 flex items-center gap-2">
            <Upload className="w-4 h-4 text-primary" />
            Insurance Document
          </h3>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.png"
            onChange={(e) => handleAddInsuranceDocument(e.target.files)}
            className="hidden"
            id="insurance-upload"
          />
          <label htmlFor="insurance-upload" className="w-full py-2.5 border border-border rounded-lg flex items-center justify-center gap-2 text-sm text-muted hover:bg-neutral-bg transition-colors cursor-pointer">
            <Upload className="w-4 h-4" />
            Upload Insurance Document
          </label>
          {insuranceDocuments.length > 0 && (
            <div className="mt-4 space-y-2">
              {insuranceDocuments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-neutral-bg rounded-lg">
                  <span className="text-sm text-body">{file.name}</span>
                  <button onClick={() => handleRemoveInsuranceDocument(index)} className="text-error">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>


        {/* Photo requirements */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-3">Photo requirements</h3>
          <ul className="space-y-2">
            {[
              { text: 'Clear photo of medical instruments', done: instrumentPhotos.length > 0 },
              { text: 'Visible labels and barcodes', done: false },
              { text: 'Photo of the package with general condition visible', done: colisPhotos.length > 0 },
              { text: 'Invoice photo uploaded', done: invoicePhotos.length > 0 },
              { text: 'Insurance document uploaded', done: insuranceDocuments.length > 0 },
              { text: 'At least 1 photo per section required', done: instrumentPhotos.length > 0 && colisPhotos.length > 0 && invoicePhotos.length > 0 },
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

        {/* Action buttons */}
        <Button 
          variant="success" 
          fullWidth 
          onClick={onValidate}
          disabled={!canValidate}
        >
          Validate and continue
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
