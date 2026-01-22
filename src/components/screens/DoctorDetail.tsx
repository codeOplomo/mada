import React from 'react';
import { User, FileText, Pill, Clock, Phone, Calendar, AlertTriangle, Building2, Stethoscope } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Stepper } from '../Stepper';
import { Card } from '../Card';
import { Button } from '../Button';
import { InfoCallout } from '../InfoCallout';

interface DoctorDetailProps {
  onBack: () => void;
  onStartProcess: () => void;
  onReportProblem: () => void;
  onRequestCorrection: () => void;
}

export function DoctorDetail({ onBack, onStartProcess, onReportProblem, onRequestCorrection }: DoctorDetailProps) {
  const requestData = {
    requestNumber: 'DOC-789012',
    status: 'Pending',
    urgency: 'Urgent',
    patient: {
      name: 'Martin Dubois',
      id: 'PAT-001234',
      birthDate: '15/03/1985',
      age: '40 years',
      gender: 'Male',
      phone: '06 12 34 56 78',
    },
    hospital: {
      name: 'Hôpital Saint-Louis',
      service: 'Cardiology - Floor 3',
      address: '1 Avenue Claude Vellefaux, 75010 Paris',
      room: 'Room 312',
    },
    request: {
      type: 'Medication Prescription',
      date: 'January 20, 2026',
      time: '14:30',
      reason: 'Renewal of cardiac treatment',
      notes: 'Patient on anticoagulants - INR monitoring required',
    },
    documents: {
      medicalRecord: 'To Photograph',
      prescription: 'To Create',
    },
  };

  const steps = [
    { id: 1, label: 'Detail' },
    { id: 2, label: 'Documents' },
    { id: 3, label: 'Confirm' },
  ];

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      <TopBar onBack={onBack} title="Request Details" subtitle={requestData.requestNumber} />
      
      <Stepper steps={steps} currentStep={1} />

      {/* Status badge */}
      <div className="flex justify-center -mt-2 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/20 border border-warning text-warning text-xs font-medium">
          <AlertTriangle className="w-3.5 h-3.5" />
          {requestData.status} • {requestData.urgency}
        </div>
      </div>

      <div className="px-4 mt-6 space-y-6">
        {/* Patient Information */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-body">Patient Information</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Full Name</span>
              <span className="text-body font-medium">{requestData.patient.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted">Phone</span>
              <a href={`tel:${requestData.patient.phone}`} className="flex items-center gap-2 text-primary font-medium">
                <Phone className="w-4 h-4" />
                {requestData.patient.phone}
              </a>
            </div>
          </div>
        </Card>

        {/* Hospital Information */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-sm font-semibold text-body">Facility</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Hospital</span>
              <span className="text-body font-medium text-right max-w-[60%]">{requestData.hospital.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Department</span>
              <span className="text-body font-medium text-right max-w-[60%]">{requestData.hospital.service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Room</span>
              <span className="text-body font-medium">{requestData.hospital.room}</span>
            </div>
            <div>
              <span className="text-muted">Address</span>
              <p className="text-body text-xs mt-1 p-2 bg-neutral-bg rounded-md">
                {requestData.hospital.address}
              </p>
            </div>
          </div>
        </Card>

        {/* Request Details */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-warning" />
            </div>
            <h3 className="text-sm font-semibold text-body">Request Details</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Type</span>
              <span className="text-body font-medium">{requestData.request.type}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted">Date & Time</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-body font-medium">{requestData.request.date} - {requestData.request.time}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Reason</span>
              <span className="text-body font-medium text-right max-w-[60%]">{requestData.request.reason}</span>
            </div>
            <div>
              <span className="text-muted">Medical Notes</span>
              <p className="text-error text-xs mt-1 p-2 bg-error/5 rounded-md border border-error/20 font-medium">
                ⚠️ {requestData.request.notes}
              </p>
            </div>
          </div>
        </Card>

        {/* Documents to complete */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-body">Documents to Complete</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-warning/5 rounded-lg border border-warning/20">
              <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-warning" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-body">Passion file picture</p>
                <p className="text-xs text-muted">{requestData.documents.medicalRecord}</p>
              </div>
              <Clock className="w-4 h-4 text-warning" />
            </div>

            <div className="flex items-center gap-3 p-3 bg-warning/5 rounded-lg border border-warning/20">
              <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                <Pill className="w-4 h-4 text-warning" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-body">Prescription</p>
                <p className="text-xs text-muted">{requestData.documents.prescription}</p>
              </div>
              <Clock className="w-4 h-4 text-warning" />
            </div>
          </div>
        </Card>

        <InfoCallout type="info">
          Take a photo of the medical record and prescription to complete this request.
        </InfoCallout>

        {/* Action buttons */}
        <Button variant="primary" fullWidth onClick={onStartProcess}>
          Start Process
        </Button>
        
        {/* <Button variant="danger" fullWidth onClick={onReportProblem}>
          Report Problem
        </Button> */}
        
        <button 
          onClick={onRequestCorrection}
          className="w-full text-center text-primary text-sm font-medium hover:underline transition-all duration-200 py-2"
        >
          Request Correction
        </button>
      </div>
    </div>
  );
}
