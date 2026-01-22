import React, { useState } from 'react';
import { CreditCard, Shield, Banknote, FileText, CheckCircle, Truck, Upload, X } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Stepper } from '../Stepper';
import { Card } from '../Card';
import { Button } from '../Button';
import { RadioGroup } from '../RadioGroup';

interface NewOrderStep5PaymentProps {
  onBack: () => void;
  onNext: () => void;
}

export function NewOrderStep5Payment({ onBack, onNext }: NewOrderStep5PaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'cb' | 'cash' | 'cheque' | null>(null);
  const [invoiceDocuments, setInvoiceDocuments] = useState<File[]>([]);

  const steps = [
    { id: 1, label: 'Info' },
    { id: 2, label: 'Equipment' },
    { id: 3, label: 'Payment' },
    { id: 4, label: 'Validation' },
  ];

  const paymentMethodOptions = [
    { value: 'advance', label: 'Pay in advance', description: 'Payment before operation date' },
    { value: 'after', label: 'Pay after operation', description: 'Payment within 30 days after operation' },
  ];

  const paymentMethods = [
    {
      id: 'cb' as const,
      label: 'Credit Card',
      description: 'Secure card payment',
      icon: CreditCard,
    },
    {
      id: 'cash' as const,
      label: 'Cash',
      description: 'Cash payment on delivery',
      icon: Banknote,
    },
    {
      id: 'cheque' as const,
      label: 'Check',
      description: 'Payment by bank check',
      icon: FileText,
    },
  ];

  const handleAddInvoiceDocument = (files: FileList | null) => {
    if (files) {
      setInvoiceDocuments([...invoiceDocuments, ...Array.from(files)]);
    }
  };

  const handleRemoveInvoiceDocument = (index: number) => {
    setInvoiceDocuments(invoiceDocuments.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      <TopBar onBack={onBack} title="Paiement de la commande" />
      <Stepper steps={steps} currentStep={3} />

      <div className="px-4 mt-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          
          <h2 className="text-lg font-semibold text-body mb-2">Choisissez votre mode de paiement</h2>
          <p className="text-sm text-muted">
            Sélectionnez comment vous souhaitez régler votre commande.
          </p>
        </div>


        {/* Payment Type Selection */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-primary" />
            <h2 className="text-body">Payment Type</h2>
          </div>
          <RadioGroup
            name="paymentMethod"
            options={paymentMethodOptions}
            value={paymentMethod}
            onChange={setPaymentMethod}
          />
        </Card>

        {/* Payment Methods (only if 'Pay in advance' is selected) */}
        {paymentMethod === 'advance' && (
          <Card>
            <h3 className="text-sm font-semibold text-body mb-4">Payment Method</h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const isSelected = selectedMethod === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-border bg-white hover:border-primary/30 hover:bg-neutral-bg'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-primary text-white' : 'bg-neutral-bg text-muted'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${isSelected ? 'text-primary' : 'text-body'}`}>{method.label}</p>
                      <p className="text-xs text-muted mt-0.5">{method.description}</p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected ? 'border-primary bg-primary' : 'border-border'
                      }`}
                    >
                      {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        )}

        {/* Invoice Document Section */}
        <Card>
          <h3 className="text-sm font-semibold text-body mb-4 flex items-center gap-2">
            <Upload className="w-4 h-4 text-primary" />
            Invoice Document
          </h3>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.png"
            onChange={(e) => handleAddInvoiceDocument(e.target.files)}
            className="hidden"
            id="invoice-upload"
          />
          <label htmlFor="invoice-upload" className="w-full py-2.5 border border-border rounded-lg flex items-center justify-center gap-2 text-sm text-muted hover:bg-neutral-bg transition-colors cursor-pointer">
            <Upload className="w-4 h-4" />
            Upload Invoice Document
          </label>
          {invoiceDocuments.length > 0 && (
            <div className="mt-4 space-y-2">
              {invoiceDocuments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-neutral-bg rounded-lg">
                  <span className="text-sm text-body">{file.name}</span>
                  <button onClick={() => handleRemoveInvoiceDocument(index)} className="text-error">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Delivery tracking preview */}
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-body mb-1">
                Real-time tracking
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                You will receive notifications at each stage: stock preparation, transport departure, arrival at the operating room.
              </p>
            </div>
          </div>
        </Card>

        {/* Confirm Button */}
        <Button
          variant="primary"
          fullWidth
          onClick={onNext}
        >
          Continue to validation
        </Button>
      </div>
    </div>
  );
}
