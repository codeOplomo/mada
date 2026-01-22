import React from 'react';
import { CheckCircle, AlertTriangle, FileText, User, Calendar, ArrowRight } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Card } from '../Card';
import { Button } from '../Button';
import { Stepper } from '../Stepper';

interface ReportProblemConfirmationProps {
  onBack: () => void;
  onFinish: () => void;
  onViewNextRequest: () => void;
}

export function ReportProblemConfirmation({ onBack, onFinish, onViewNextRequest }: ReportProblemConfirmationProps) {
  const steps = [
    { id: 1, label: 'Detail' },
    { id: 2, label: 'Report' },
    { id: 3, label: 'Confirm' },
  ];

  return (
    <div className="min-h-screen bg-neutral-bg pb-8">
      <TopBar
        title="Confirmation"
        subtitle="Problem Reported"
        showBack
        onBack={onBack}
      />

      <div className="px-4 mt-6 space-y-6">
        <Stepper steps={steps} currentStep={3} />

        {/* Success banner */}
        <Card className="!bg-accent/10 border-accent/20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-body">Problem reported</h2>
              <p className="text-sm text-muted">Your report has been submitted successfully</p>
            </div>
          </div>
        </Card>

        {/* Report summary */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-4">Report Summary</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <span className="text-xs text-muted">Patient</span>
                <p className="text-sm font-medium text-body">Martin Dubois</p>
                <p className="text-xs text-muted">ID: PAT-001234</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-4 h-4 text-warning" />
              </div>
              <div className="flex-1">
                <span className="text-xs text-muted">Request</span>
                <p className="text-sm font-medium text-body">DOC-789012</p>
                <p className="text-xs text-muted">Medication Prescription</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1">
                <span className="text-xs text-muted">Reported on</span>
                <p className="text-sm font-medium text-body">January 22, 2026</p>
                <p className="text-xs text-muted">14:30</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Timeline */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-4">Timeline</h3>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-accent"></div>
                <div className="w-0.5 h-full bg-border"></div>
              </div>
              <div className="pb-4">
                <p className="text-sm font-medium text-body">Problem reported</p>
                <p className="text-xs text-muted">01/22/2026 - 14:30</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <div className="w-0.5 h-full bg-border"></div>
              </div>
              <div className="pb-4">
                <p className="text-sm font-medium text-body">Under review</p>
                <p className="text-xs text-muted">Processing your report...</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-neutral-bg border-2 border-border"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted">Resolution</p>
                <p className="text-xs text-muted">Pending</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action buttons */}
        <div className="space-y-3">
          <Button variant="primary" fullWidth onClick={onFinish}>
            Return to Requests
          </Button>

          <Button variant="outline" fullWidth onClick={onViewNextRequest}>
            View Next Request
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}