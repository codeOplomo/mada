import React, { useState } from 'react';
import { FileText, Info, CheckCircle, Clock, AlertOctagon, Shield } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Stepper } from '../Stepper';
import { Card } from '../Card';
import { Button } from '../Button';
import { InfoCallout } from '../InfoCallout';

interface ReceptionVerificationProps {
  onBack: () => void;
  onSaveDecision: () => void;
}

type DecisionType = 'validated' | 'pending' | 'blocked';

export function ReceptionVerification({ onBack, onSaveDecision }: ReceptionVerificationProps) {
  const [selectedDecision, setSelectedDecision] = useState<DecisionType>('pending');
  const [comment, setComment] = useState('En attente confirmation administrative hôpital');

  const steps = [
    { id: 1, label: 'Détail' },
    { id: 2, label: 'Photo' },
  ];

  const paymentInfo = {
    method: 'Virement',
    status: 'En attente',
  };

  const decisions = [
    {
      id: 'validated' as const,
      title: 'Paiement validé',
      description: 'Le mode de paiement est conforme. La logistique peut être lancée.',
      icon: CheckCircle,
      color: 'accent',
      borderColor: 'border-accent',
      bgColor: 'bg-accent/5',
    },
    {
      id: 'pending' as const,
      title: 'Paiement en attente',
      description: 'La commande est enregistrée, mais la logistique est temporairement suspendue.',
      icon: Clock,
      color: 'warning',
      borderColor: 'border-warning',
      bgColor: 'bg-warning/5',
    },
    {
      id: 'blocked' as const,
      title: 'Blocage logistique',
      description: 'Le mode de paiement nécessite clarification avant tout lancement.',
      icon: AlertOctagon,
      color: 'error',
      borderColor: 'border-error',
      bgColor: 'bg-error/5',
    },
  ];

  const getIconColor = (color: string) => {
    switch (color) {
      case 'accent': return 'text-accent';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      <TopBar onBack={onBack} title="Vérification du paiement" subtitle="Hôpital Saint Louis - Commande 412345" />
      
      <Stepper steps={steps} currentStep={2} />

      <div className="px-4 mt-6 space-y-6">
        {/* Payment method info */}
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-sm font-semibold text-body">Mode de paiement sélectionné</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted">Mode de paiement:</p>
              <p className="text-sm font-semibold text-body">{paymentInfo.method}</p>
              <p className="text-xs text-muted mt-1">Statut du paiement:</p>
              <p className="text-sm font-medium text-warning flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {paymentInfo.status}
              </p>
            </div>
          </div>
          
          <button className="flex items-center gap-1 text-xs text-primary mt-3 hover:underline">
            <Info className="w-3.5 h-3.5" />
            Données issues de la commande
          </button>
        </Card>

        {/* Decision section */}
        <Card>
          <h2 className="text-sm font-semibold text-body mb-4">Décision du coordinateur</h2>
          
          <div className="space-y-3">
            {decisions.map((decision) => {
              const Icon = decision.icon;
              const isSelected = selectedDecision === decision.id;
              
              return (
                <button
                  key={decision.id}
                  onClick={() => setSelectedDecision(decision.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    isSelected
                      ? `${decision.borderColor} ${decision.bgColor}`
                      : 'border-border bg-white hover:border-muted'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isSelected ? decision.borderColor : 'border-muted'
                    }`}>
                      {isSelected && (
                        <div className={`w-3 h-3 rounded-full ${
                          decision.color === 'accent' ? 'bg-accent' :
                          decision.color === 'warning' ? 'bg-warning' : 'bg-error'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={`w-4 h-4 ${getIconColor(decision.color)}`} />
                        <h3 className={`text-sm font-semibold ${getIconColor(decision.color)}`}>
                          {decision.title}
                        </h3>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        {decision.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Comment section */}
        <Card>
          <label className="text-sm font-medium text-body mb-2 block">
            Commentaire interne (optionnel)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="w-full px-4 py-3 rounded-xl border border-border bg-neutral-bg text-sm text-body placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 resize-none"
            rows={3}
          />
        </Card>

        <InfoCallout type="info">
          <span className="font-semibold">Reassurance & traçabilité:</span> Cette décision est tracée. Elle conditionne le lancement du processus logistique.
        </InfoCallout>

        {/* Action buttons */}
        <Button 
          variant={selectedDecision === 'blocked' ? 'danger' : 'primary'} 
          fullWidth 
          onClick={onSaveDecision}
        >
          Enregistrer la décision
        </Button>
        
        <button 
          onClick={onBack}
          className="w-full text-center text-primary text-sm font-medium hover:underline transition-all duration-200 py-2"
        >
          Revenir à la commande
        </button>
      </div>
    </div>
  );
}
