import React from 'react';
import { CheckCircle, FileText, Pill, Clock, User, Calendar, ArrowRight } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Card } from '../Card';
import { Button } from '../Button';
import { Stepper } from '../Stepper';

interface DoctorConfirmationProps {
  onBack: () => void;
  onFinish: () => void;
  onViewNextRequest: () => void;
}

export function DoctorConfirmation({ onBack, onFinish, onViewNextRequest }: DoctorConfirmationProps) {
  const steps = [
    { id: 1, label: 'Detail' },
    { id: 2, label: 'Documents' },
    { id: 3, label: 'Confirm' },
  ];

  return (
    <div className="min-h-screen bg-neutral-bg pb-8">
      <TopBar 
        title="Confirmation" 
        subtitle="DOC-789012"
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
              <h2 className="text-lg font-semibold text-body">Documents sent</h2>
              <p className="text-sm text-muted">The request has been processed successfully</p>
            </div>
          </div>
        </Card>

        {/* Request summary */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-4">Summary</h3>
          
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
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <span className="text-xs text-muted">Processing date</span>
                <p className="text-sm font-medium text-body">January 20, 2026 at 14:45</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <span className="text-xs text-muted">Request number</span>
                <p className="text-sm font-medium text-body">DOC-789012</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Documents submitted */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-4">Documents submitted</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg border border-accent/20">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-body">Medical record</p>
                <p className="text-xs text-muted">1 photo • Validated</p>
              </div>
              <CheckCircle className="w-5 h-5 text-accent" />
            </div>

            <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg border border-accent/20">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Pill className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-body">Prescription</p>
                <p className="text-xs text-muted">1 photo • Validated</p>
              </div>
              <CheckCircle className="w-5 h-5 text-accent" />
            </div>
          </div>
        </Card>

        {/* Timeline */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-4">Next steps</h3>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-accent"></div>
                <div className="w-0.5 h-full bg-border"></div>
              </div>
              <div className="pb-4">
                <p className="text-sm font-medium text-body">Documents received</p>
                <p className="text-xs text-muted">01/20/2026 - 14:45</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <div className="w-0.5 h-full bg-border"></div>
              </div>
              <div className="pb-4">
                <p className="text-sm font-medium text-body">Validation in progress</p>
                <p className="text-xs text-muted">Awaiting verification</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-border"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted">Order processing</p>
                <p className="text-xs text-muted">Next step</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Next request teaser */}
        <button 
          onClick={onViewNextRequest}
          className="w-full"
        >
          <Card className="!bg-primary/5 border-primary/20 hover:border-primary transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-body">2 pending requests</p>
                  <p className="text-xs text-muted">View next request</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-primary" />
            </div>
          </Card>
        </button>

        {/* Action buttons */}
        <div className="space-y-3 pt-4">
          <Button 
            variant="primary" 
            fullWidth 
            onClick={onFinish}
          >
            Back to list
          </Button>
        </div>
      </div>
    </div>
  );
}
