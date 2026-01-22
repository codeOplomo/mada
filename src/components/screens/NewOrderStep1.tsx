import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Stepper } from '../Stepper';
import { Card } from '../Card';
import { Dropdown } from '../Dropdown';
import { Input } from '../Input';
import { RadioGroup } from '../RadioGroup';
import { InfoCallout } from '../InfoCallout';
import { Button } from '../Button';

interface NewOrderStep1Props {
  onBack: () => void;
  onNext: () => void;
}


export function NewOrderStep1({ onBack, onNext }: NewOrderStep1Props) {
  const [hospital, setHospital] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [intervention, setIntervention] = useState('scoliosis');
  const [urgency, setUrgency] = useState('scheduled');
  const [materials, setMaterials] = useState('');
  const [surgeon, setSurgeon] = useState('');

  const steps = [
    { id: 1, label: 'Info' },
    { id: 2, label: 'Equipment' },
    { id: 3, label: 'Payment' },
    { id: 4, label: 'Validation' },
  ];

  const hospitalOptions = [
    { value: 'chu-paris', label: 'Paris University Hospital' },
    { value: 'clinique-st-charles', label: 'Saint-Charles Clinic' },
    { value: 'hopital-nord', label: 'North Hospital' },
    { value: 'centre-chirurgical', label: 'Surgical Center of the Valley' },
  ];

  const interventionOptions = [
    { value: 'scoliosis', label: 'Scoliosis Surgery' },
    { value: 'arthrodesis', label: 'Spinal Arthrodesis' },
    { value: 'kyphoplasty', label: 'Kyphoplasty' },
  ];

  const urgencyOptions = [
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'urgent', label: 'Urgent' },
  ];

  const surgeonOptions = [
    { value: 'dr-smith', label: 'Dr. John Smith' },
    { value: 'dr-jones', label: 'Dr. Emily Jones' },
    { value: 'dr-brown', label: 'Dr. Michael Brown' },
    { value: 'dr-wilson', label: 'Dr. Sarah Wilson' },
  ];

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      <TopBar onBack={onBack} title="New Order" />
      
      <Stepper steps={steps} currentStep={1} />

      <div className="px-4 mt-6 space-y-6">
        <Card>
          <h2 className="text-body mb-4">General Information</h2>
          
          <div className="space-y-4">
            <Dropdown
              label="Hospital / Clinic"
              placeholder="Select a facility"
              options={hospitalOptions}
              value={hospital}
              onChange={setHospital}
            />

            <Dropdown
              label="Surgeon"
              placeholder="Select a surgeon"
              options={surgeonOptions}
              value={surgeon}
              onChange={setSurgeon}
            />

            <Input
              label="City"
              placeholder="Enter the city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <Input
              label="Operation date"
              type="text"
              placeholder="DD/MM/YYYY"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              icon={<Calendar className="w-5 h-5" />}
            />

            <Dropdown
              label="Type of intervention"
              placeholder="Select type"
              options={interventionOptions}
              value={intervention}
              onChange={setIntervention}
            />

            

            {/* <div className="space-y-2">
              <label className="block text-sm font-medium text-body">
                Required materials
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-body placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
                placeholder="Describe the materials you need (e.g. pedicle screws, spinal rods, instruments...)"
                rows={4}
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
              />
              <p className="text-xs text-muted">
                List the specific materials required for the intervention
              </p>
            </div> */}
          </div>
        </Card>

        <InfoCallout type="success">
          No medical data or diagnosis is required at this stage. All information is tracked and secured.
        </InfoCallout>

        <Button variant="primary" fullWidth onClick={onNext}>
          Next step
        </Button>

        <button 
          className="w-full text-center text-primary text-sm hover:underline transition-all duration-200"
          onClick={onBack}
        >
          Save and continue later →
        </button>
      </div>
    </div>
  );
}
