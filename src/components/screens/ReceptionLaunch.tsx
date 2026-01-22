import React from 'react';
import { Calendar, Package, Truck, CreditCard, AlertTriangle, CheckCircle } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Stepper } from '../Stepper';
import { Card } from '../Card';
import { Button } from '../Button';
import { InfoCallout } from '../InfoCallout';

interface ReceptionLaunchProps {
  onBack: () => void;
  onLaunchLogistics: () => void;
}

export function ReceptionLaunch({ onBack, onLaunchLogistics }: ReceptionLaunchProps) {
  const summaryData = {
    intervention: {
      date: '24/05/2024',
      urgency: 'Standard',
    },
    material: {
      setType: 'Scoliose Premium',
      numberOfSets: 2,
    },
    logistics: {
      deliveryLocation: 'Hôpital Saint-Louis, Paris',
      deliveryDate: '23/05/2024',
    },
    payment: {
      method: 'Virement bancaire',
      status: 'Validé',
    },
  };

  const steps = [
    { id: 1, label: 'Détail' },
    { id: 2, label: 'Photo' },
  ];

  const consequences = [
    'le stock sera réservé',
    'le dépôt sera notifié pour préparation',
    'la commande entrera en phase opérationnelle',
    'Cette action est tracée.',
  ];

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      <TopBar onBack={onBack} title="Lancement logistique" subtitle="Décision coordinateur Mada Médical" />
      
      <Stepper steps={steps} currentStep={2} />

      <div className="px-4 mt-6 space-y-6">
        {/* Success callout */}
        <InfoCallout type="success">
          Toutes les étapes préalables ont été complétées. Vous êtes sur le point de lancer la chaîne logistique.
        </InfoCallout>

        {/* Intervention */}
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-body">Intervention</h3>
              <p className="text-xs text-muted">
                Date prévue d'intervention: {summaryData.intervention.date}
              </p>
              <p className="text-xs text-muted">
                Niveau d'urgence: {summaryData.intervention.urgency}
              </p>
            </div>
          </div>
        </Card>

        {/* Material */}
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-body">Matériel</h3>
              <p className="text-xs text-muted">
                Type de set: {summaryData.material.setType}
              </p>
              <p className="text-xs text-muted">
                Nombre de sets: {summaryData.material.numberOfSets}
              </p>
            </div>
          </div>
        </Card>

        {/* Logistics */}
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-body">Logistique</h3>
              <p className="text-xs text-muted">
                Lieu de livraison: {summaryData.logistics.deliveryLocation}
              </p>
              <p className="text-xs text-muted">
                Date de livraison prévue: {summaryData.logistics.deliveryDate}
              </p>
            </div>
          </div>
        </Card>

        {/* Payment */}
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-body">Paiement</h3>
              <p className="text-xs text-muted">
                Mode de paiement: {summaryData.payment.method}
              </p>
              <p className="text-xs text-muted">
                Statut administratif: <span className="text-accent font-medium">{summaryData.payment.status}</span>
              </p>
            </div>
          </div>
        </Card>

        {/* Warning callout */}
        <InfoCallout type="warning">
          <span className="font-semibold">En lançant la logistique :</span>
          <ul className="mt-2 space-y-1">
            {consequences.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-warning mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </InfoCallout>

        {/* Action buttons */}
        <Button variant="success" fullWidth onClick={onLaunchLogistics}>
          Lancer la logistique
        </Button>
        
        <button 
          onClick={onBack}
          className="w-full text-center text-primary text-sm font-medium hover:underline transition-all duration-200 py-2"
        >
          Annuler et revenir à la commande
        </button>
      </div>
    </div>
  );
}
