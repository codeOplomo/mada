import React, { useState } from 'react';
import { Camera, Upload, FileText, Check, X, User, Calendar, Pill, Activity } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Card } from '../Card';
import { Button } from '../Button';
import { Stepper } from '../Stepper';
import { InfoCallout } from '../InfoCallout';

interface PhotoCaptureSectionProps {
  title: string;
  icon: React.ReactNode;
  instruction: string;
  photos: string[];
  onAddPhoto: () => void;
  onRemovePhoto: (index: number) => void;
}

function PhotoCaptureSection({
  title,
  icon,
  instruction,
  photos,
  onAddPhoto,
  onRemovePhoto,
}: PhotoCaptureSectionProps) {
  return (
    <div className="space-y-4">
      <Card>
        <h3 className="text-sm font-semibold text-body mb-4 flex items-center gap-2">
          {icon}
          {title}
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
                  onClick={() => onRemovePhoto(index)}
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
            onClick={onAddPhoto}
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
    </div>
  );
}

interface DoctorDocumentsProps {
  onBack: () => void;
  onNext: () => void;
}

export function DoctorDocuments({ onBack, onNext }: DoctorDocumentsProps) {
  const [recordPhotos, setRecordPhotos] = useState<string[]>([]);
  const [prescriptionPhotos, setPrescriptionPhotos] = useState<string[]>([]);
  const [instrumentPhotos, setInstrumentPhotos] = useState<string[]>([]);
  const [interventionPhotos, setInterventionPhotos] = useState<string[]>([]);
  const [insuranceDocuments, setInsuranceDocuments] = useState<File[]>([]);
  const [notes, setNotes] = useState('');

  const steps = [
    { id: 1, label: 'Detail' },
    { id: 2, label: 'Documents' },
    { id: 3, label: 'Confirm' },
  ];

  const handleAddRecordPhoto = () => {
    setRecordPhotos([...recordPhotos, `record-photo-${recordPhotos.length + 1}`]);
  };

  const handleRemoveRecordPhoto = (index: number) => {
    setRecordPhotos(recordPhotos.filter((_, i) => i !== index));
  };

  const handleAddPrescriptionPhoto = () => {
    setPrescriptionPhotos([...prescriptionPhotos, `prescription-photo-${prescriptionPhotos.length + 1}`]);
  };

  const handleRemovePrescriptionPhoto = (index: number) => {
    setPrescriptionPhotos(prescriptionPhotos.filter((_, i) => i !== index));
  };

  const handleAddInstrumentPhoto = () => {
    setInstrumentPhotos([...instrumentPhotos, `instrument-photo-${instrumentPhotos.length + 1}`]);
  };

  const handleRemoveInstrumentPhoto = (index: number) => {
    setInstrumentPhotos(instrumentPhotos.filter((_, i) => i !== index));
  };

  const handleAddInterventionPhoto = () => {
    setInterventionPhotos([...interventionPhotos, `intervention-photo-${interventionPhotos.length + 1}`]);
  };

  const handleRemoveInterventionPhoto = (index: number) => {
    setInterventionPhotos(interventionPhotos.filter((_, i) => i !== index));
  };

  const handleAddInsuranceDocument = (files: FileList | null) => {
    if (files) {
      setInsuranceDocuments([...insuranceDocuments, ...Array.from(files)]);
    }
  };

  const handleRemoveInsuranceDocument = (index: number) => {
    setInsuranceDocuments(insuranceDocuments.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-neutral-bg pb-8">
      <TopBar
        title="Medical Documents"
        subtitle="DOC-789012"
        onBack={onBack}
      />

      <div className="px-4 mt-6 space-y-6">
        <Stepper steps={steps} currentStep={2} />

        {/* Patient & Prescription Info */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Patient Information
          </h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted">Name</span>
              <span className="text-sm font-medium text-body">Martin Dubois</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted">Patient ID</span>
              <span className="text-sm font-medium text-body">PAT-001234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted">Date of Birth</span>
              <span className="text-sm font-medium text-body">15/03/1985</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted">Prescription Date</span>
              <span className="text-sm font-medium text-body">20/01/2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted">Treatment Duration</span>
              <span className="text-sm font-medium text-body">30 days</span>
            </div>
          </div>

        </Card>

        {/* Medical Record Section */}
        <PhotoCaptureSection
          title="Patient File Photo"
          icon={<FileText className="w-4 h-4 text-primary" />}
          instruction="Take a clear and readable photo of the patient's medical record. Make sure all information is visible."
          photos={recordPhotos}
          onAddPhoto={handleAddRecordPhoto}
          onRemovePhoto={handleRemoveRecordPhoto}
        />

        {/* Prescription Section */}
        <PhotoCaptureSection
          title="Prescription Photo"
          icon={<Pill className="w-4 h-4 text-primary" />}
          instruction="Take a photo of the prescription. Make sure the prescribed medications and dosages are clearly visible."
          photos={prescriptionPhotos}
          onAddPhoto={handleAddPrescriptionPhoto}
          onRemovePhoto={handleRemovePrescriptionPhoto}
        />

        {/* Instruments Section */}
        <PhotoCaptureSection
          title="Medical Instruments Photo"
          icon={<FileText className="w-4 h-4 text-primary" />}
          instruction="Take a photo of the medical instruments. Make sure they are clearly visible and in good condition."
          photos={instrumentPhotos}
          onAddPhoto={handleAddInstrumentPhoto}
          onRemovePhoto={handleRemoveInstrumentPhoto}
        />

        {/* Intervention Image Section */}
        <PhotoCaptureSection
          title="Intervention Image"
          icon={<Activity className="w-4 h-4 text-primary" />}
          instruction="Take a photo of the intervention site or procedure. Make sure the area is clearly visible and well-documented."
          photos={interventionPhotos}
          onAddPhoto={handleAddInterventionPhoto}
          onRemovePhoto={handleRemoveInterventionPhoto}
        />

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

        {/* Notes */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-3">Additional Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes or remarks about the documents..."
            className="w-full p-3 border border-border rounded-lg text-sm text-body placeholder:text-muted resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </Card>

        {/* Auto Checks Section */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-3">Auto Checks</h3>
          <ul className="space-y-2">
            {/* Medical Record Photo Check */}
            <li className="flex items-center gap-2 text-xs text-muted">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                recordPhotos.length > 0 ? 'bg-accent text-white' : 'bg-neutral-100 text-muted'
              }`}>
                {recordPhotos.length > 0 ? <Check className="w-3 h-3" /> : <span className="text-[10px] font-medium">1</span>}
              </span>
              Medical record photo uploaded
            </li>
            {/* Prescription Photo Check */}
            <li className="flex items-center gap-2 text-xs text-muted">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                prescriptionPhotos.length > 0 ? 'bg-accent text-white' : 'bg-neutral-100 text-muted'
              }`}>
                {prescriptionPhotos.length > 0 ? <Check className="w-3 h-3" /> : <span className="text-[10px] font-medium">2</span>}
              </span>
              Prescription photo uploaded
            </li>
            {/* Instruments Photo Check */}
            <li className="flex items-center gap-2 text-xs text-muted">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                instrumentPhotos.length > 0 ? 'bg-accent text-white' : 'bg-neutral-100 text-muted'
              }`}>
                {instrumentPhotos.length > 0 ? <Check className="w-3 h-3" /> : <span className="text-[10px] font-medium">3</span>}
              </span>
              Medical instruments photo uploaded
            </li>
            {/* Intervention Photo Check */}
            <li className="flex items-center gap-2 text-xs text-muted">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                interventionPhotos.length > 0 ? 'bg-accent text-white' : 'bg-neutral-100 text-muted'
              }`}>
                {interventionPhotos.length > 0 ? <Check className="w-3 h-3" /> : <span className="text-[10px] font-medium">4</span>}
              </span>
              Intervention image uploaded
            </li>
            {/* Insurance Document Check */}
            <li className="flex items-center gap-2 text-xs text-muted">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                insuranceDocuments.length > 0 ? 'bg-accent text-white' : 'bg-neutral-100 text-muted'
              }`}>
                {insuranceDocuments.length > 0 ? <Check className="w-3 h-3" /> : <span className="text-[10px] font-medium">5</span>}
              </span>
              Insurance document uploaded
            </li>
          </ul>
        </Card>

        {/* Action buttons */}
        <div className="space-y-3 pt-4">
          <Button
            variant="primary"
            fullWidth
            onClick={onNext}
          >
            Continue to Confirmation
          </Button>
          <Button
            variant="ghost"
            fullWidth
            onClick={onBack}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}