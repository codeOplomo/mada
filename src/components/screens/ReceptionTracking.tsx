import React from 'react';
import { ArrowLeft, Bell, CheckCircle, Package, Settings, Truck, Building2, Search, AlertTriangle, Clock } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Stepper } from '../Stepper';
import { Card } from '../Card';
import { InfoCallout } from '../InfoCallout';

interface ReceptionTrackingProps {
  onBack: () => void;
  onViewIncident: () => void;
}

interface TimelineStep {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'blocked' | 'pending';
  statusLabel: string;
  time?: string;
  eta?: string;
  icon: React.ElementType;
}

export function ReceptionTracking({ onBack, onViewIncident }: ReceptionTrackingProps) {
  const lastUpdate = "aujourd'hui à 14:30";

  const steps = [
    { id: 1, label: 'Détail' },
    { id: 2, label: 'Photo' },
  ];

  const timelineSteps: TimelineStep[] = [
    {
      id: 'stock',
      title: 'Stock',
      status: 'completed',
      statusLabel: 'Réservé',
      time: '10:15',
      icon: Package,
    },
    {
      id: 'preparation',
      title: 'Préparation dépôt',
      status: 'in-progress',
      statusLabel: 'Stérilisation en cours',
      time: '12:00',
      icon: Settings,
    },
    {
      id: 'quality',
      title: 'Contrôle qualité',
      status: 'blocked',
      statusLabel: 'Bloqué qualité',
      time: '13:45',
      icon: Search,
    },
    {
      id: 'transport',
      title: 'Transport',
      status: 'in-progress',
      statusLabel: 'En transit',
      time: '14:25',
      eta: '16:00 aujourd\'hui',
      icon: Truck,
    },
    {
      id: 'reception',
      title: 'Réception hôpital',
      status: 'pending',
      statusLabel: 'En attente de livraison',
      time: '14:30',
      icon: Building2,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-accent text-white';
      case 'in-progress': return 'bg-primary text-white';
      case 'blocked': return 'bg-error/10 border-2 border-error text-error';
      case 'pending': return 'bg-neutral-bg border-2 border-border text-muted';
      default: return 'bg-neutral-bg text-muted';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-accent';
      case 'in-progress': return 'text-primary';
      case 'blocked': return 'text-error';
      case 'pending': return 'text-muted';
      default: return 'text-muted';
    }
  };

  const getLineColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-accent';
      case 'in-progress': return 'bg-primary';
      default: return 'bg-border';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      <TopBar onBack={onBack} title="Suivi de la commande" subtitle="Vue globale – lecture seule" />
      
      <Stepper steps={steps} currentStep={3} />

      {/* Status banner */}
      <div className="px-4 -mt-2 mb-4">
        <div className="bg-accent/10 rounded-xl p-3 border border-accent/30">
          <p className="text-sm font-semibold text-accent">Commande en cours de traitement</p>
          <p className="text-xs text-muted">Dernière mise à jour : {lastUpdate}</p>
        </div>
      </div>

      <div className="px-4 space-y-6">
        <h2 className="text-sm font-semibold text-primary">Avancement logistique</h2>

        {/* Timeline */}
        <div className="space-y-0">
          {timelineSteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === timelineSteps.length - 1;
            const isBlocked = step.status === 'blocked';
            
            return (
              <div key={step.id} className="flex gap-3">
                {/* Timeline indicator */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getStatusColor(step.status)}`}>
                    {step.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  {!isLast && (
                    <div className={`w-0.5 h-16 ${getLineColor(step.status)}`} />
                  )}
                </div>
                
                {/* Content */}
                <Card 
                  className={`flex-1 mb-3 ${isBlocked ? 'border-error bg-error/5' : ''}`}
                  padding="small"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-body mb-1">{step.title}</h3>
                      <div className="flex items-center gap-2">
                        {step.status === 'completed' && (
                          <CheckCircle className={`w-3.5 h-3.5 ${getStatusBadgeColor(step.status)}`} />
                        )}
                        {step.status === 'in-progress' && (
                          <Clock className={`w-3.5 h-3.5 ${getStatusBadgeColor(step.status)}`} />
                        )}
                        {step.status === 'blocked' && (
                          <AlertTriangle className={`w-3.5 h-3.5 ${getStatusBadgeColor(step.status)}`} />
                        )}
                        <span className={`text-xs font-medium ${getStatusBadgeColor(step.status)}`}>
                          {step.statusLabel}
                        </span>
                        {step.time && (
                          <span className="text-xs text-muted">{step.time}</span>
                        )}
                      </div>
                      {step.eta && (
                        <p className="text-xs text-muted mt-1">ETA: {step.eta}</p>
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-neutral-bg border border-border flex items-center justify-center">
                      <Icon className="w-5 h-5 text-muted" />
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Incident alert */}
        <button 
          onClick={onViewIncident}
          className="w-full p-4 bg-error/10 rounded-xl border border-error/30 flex items-center justify-between hover:bg-error/15 transition-colors duration-200"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-error" />
            <span className="text-sm font-medium text-error">Incident en cours – action requise</span>
          </div>
          <ArrowLeft className="w-5 h-5 text-error rotate-180" />
        </button>

        <InfoCallout type="info">
          Tous les statuts sont mis à jour en temps réel et historisés pour traçabilité.
        </InfoCallout>
      </div>
    </div>
  );
}
