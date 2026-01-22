import React, { useState } from 'react';
import { Plus, Minus, Package, Calendar, Clock } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Stepper } from '../Stepper';
import { Card } from '../Card';
import { Button } from '../Button';
import { Input } from '../Input';
import { Dropdown } from '../Dropdown';

interface NewOrderStep2Props {
  onBack: () => void;
  onNext: () => void;
}

interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
}

export function NewOrderStep2({ onBack, onNext }: NewOrderStep2Props) {
  const [observations, setObservations] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [equipment, setEquipment] = useState<EquipmentItem[]>([
    { id: '1', name: 'Pedicle Screws Ø 5.5mm', category: 'Implants', quantity: 12 },
    { id: '2', name: 'Vertebral Rods Ti 5.5mm', category: 'Implants', quantity: 2 },
    { id: '3', name: 'Placement Instruments', category: 'Tools', quantity: 1 },
  ]);

  const steps = [
    { id: 1, label: 'Info' },
    { id: 2, label: 'Equipment' },
    { id: 3, label: 'Payment' },
    { id: 4, label: 'Validation' },
  ];

  const deliveryTimeOptions = [
    { value: '08h00', label: '08:00 - 10:00' },
    { value: '10h00', label: '10:00 - 12:00' },
    { value: '12h00', label: '12:00 - 14:00' },
    { value: '14h00', label: '14:00 - 16:00' },
  ];

  const updateQuantity = (id: string, delta: number) => {
    setEquipment(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  const categories = Array.from(new Set(equipment.map(e => e.category)));

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      <TopBar onBack={onBack} title="New Order" />
      
      <Stepper steps={steps} currentStep={2} />

      <div className="px-4 mt-6 space-y-6">

        <Card>
          <h2 className="text-body mb-4">Equipment Selection</h2>
          
          {categories.map(category => (
            <div key={category} className="mb-6 last:mb-0">
              <div className="flex items-center gap-2 mb-3">
                <div className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                  {category}
                </div>
              </div>
              
              <div className="space-y-3">
                {equipment
                  .filter(item => item.category === category)
                  .map(item => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-[10px] bg-neutral-bg border border-border"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-body font-medium truncate">
                          {item.name}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center hover:border-primary transition-colors duration-200"
                        >
                          <Minus className="w-4 h-4 text-body" />
                        </button>
                        <span className="text-sm font-semibold text-body w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          <button className="w-full mt-4 py-3 rounded-[10px] border-2 border-dashed border-border text-primary text-sm font-medium hover:border-primary hover:bg-primary/5 transition-all duration-200 flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add equipment
          </button>

          
        </Card>

        
        <Card>
          <h2 className="text-body mb-4">Logistics Organization</h2>
          <div className="space-y-4">
            <Input
              label="Delivery date"
              type="text"
              placeholder="DD/MM/YYYY"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              icon={<Calendar className="w-5 h-5" />}
            />


            <Dropdown
              label="Preferred delivery slot"
              placeholder="Select a slot"
              options={deliveryTimeOptions}
              value={deliveryTime}
              onChange={setDeliveryTime}
              icon={<Clock className="w-5 h-5" />}
            />
            
          </div>
        </Card>

        <Card><div className="space-y-2">
              <label className="block text-sm font-medium text-body">
                Observations / Remarks
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-body placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
                placeholder="Add any special instructions, patient notes, or remarks for this operation..."
                rows={4}
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
              />
              <p className="text-xs text-muted">
                Optional: Include any relevant notes or special requirements
              </p>
            </div></Card>

        <Button variant="primary" fullWidth onClick={onNext}>
          Continue to logistics
        </Button>

        <button 
          className="w-full text-center text-primary text-sm hover:underline transition-all duration-200"
          onClick={onBack}
        >
          Back to general information
        </button>
      </div>
    </div>
  );
}
