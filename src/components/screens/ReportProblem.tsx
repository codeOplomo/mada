import React, { useState } from 'react';
import { AlertTriangle, Camera, Upload, X } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Card } from '../Card';
import { Button } from '../Button';
import { Stepper } from '../Stepper';

interface ReportProblemProps {
  onBack: () => void;
  onSubmit: (data: { image?: string; remarks: string }) => void;
}

export function ReportProblem({ onBack, onSubmit }: ReportProblemProps) {
  const [problemImage, setProblemImage] = useState<string | null>(null);
  const [remarks, setRemarks] = useState('');

  const steps = [
    { id: 1, label: 'Detail' },
    { id: 2, label: 'Report' },
    { id: 3, label: 'Confirm' },
  ];

  const handleAddImage = () => {
    // Simulate adding an image (in real app, this would open camera/gallery)
    setProblemImage(`problem-image-${Date.now()}`);
  };

  const handleRemoveImage = () => {
    setProblemImage(null);
  };

  const handleSubmit = () => {
    onSubmit({
      image: problemImage || undefined,
      remarks,
    });
  };

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      <TopBar
        title="Report Problem"
        subtitle="Describe the issue"
        onBack={onBack}
      />

      <Stepper steps={steps} currentStep={2} />

      <div className="px-4 mt-6 space-y-6">
        {/* Optional Image Section */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-4 flex items-center gap-2">
            <Camera className="w-4 h-4 text-primary" />
            Problem Image (Optional)
          </h3>

          {problemImage ? (
            <div className="relative mb-4">
              <img
                src={problemImage} // In real app, this would be the actual image URL
                alt="Problem"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 w-8 h-8 bg-error rounded-full flex items-center justify-center text-white hover:bg-error/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddImage}
              className="w-full aspect-[4/3] border-2 border-dashed border-primary/30 rounded-lg flex flex-col items-center justify-center gap-2 bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              <Camera className="w-6 h-6 text-primary" />
              <span className="text-sm text-muted">Add Photo</span>
            </button>
          )}

          {/* Upload from gallery */}
          <button className="w-full py-2.5 border border-border rounded-lg flex items-center justify-center gap-2 text-sm text-muted hover:bg-neutral-bg transition-colors mt-4">
            <Upload className="w-4 h-4" />
            Import from Gallery
          </button>
        </Card>

        {/* Remarks Section */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            Remarks
          </h3>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Describe the problem in detail..."
            className="w-full p-3 border border-border rounded-lg text-sm text-body placeholder:text-muted resize-none h-32 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            required
          />
        </Card>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            variant="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Submit Report
          </Button>
        </div>
      </div>
    </div>
  );
}