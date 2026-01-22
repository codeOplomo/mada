import React from 'react';
import { Phone, MessageSquare, Calendar, Package, Users, CheckCircle, Clock } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Card } from '../Card';
import { InfoCallout } from '../InfoCallout';

interface ReceptionIncidentsProps {
  onBack: () => void;
}

interface Incident {
  id: string;
  title: string;
  commandId: string;
  hospital: string;
  actor: string;
  actorType: 'stock' | 'quality' | 'transport';
  status: 'critique' | 'modere' | 'resolu';
  description?: string;
  actionRequired?: string;
  resolvedDate?: string;
}

export function ReceptionIncidents({ onBack }: ReceptionIncidentsProps) {
  const incidents: Incident[] = [
    {
      id: '1',
      title: 'Stock incomplet',
      commandId: 'CMD-20231025-001',
      hospital: 'Hôpital Saint-Louis',
      actor: 'Stock',
      actorType: 'stock',
      status: 'critique',
      actionRequired: 'Identifier stock de remplacement immédiatement. Commande bloquée.',
    },
    {
      id: '2',
      title: 'Retard de stérilisation',
      commandId: 'CMD-20231026-005',
      hospital: 'Clinique de la Montagne',
      actor: 'Qualité',
      actorType: 'quality',
      status: 'modere',
      description: 'Vérifier statut avec centre de stérilisation. Impact limité sur délai.',
    },
    {
      id: '3',
      title: 'Paiement non confirmé',
      commandId: 'CMD-20231024-002',
      hospital: 'Centre Orthopédique',
      actor: 'Transport',
      actorType: 'transport',
      status: 'resolu',
      resolvedDate: 'le 27/10 à 14h30',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critique':
        return { label: 'Critique', color: 'bg-error text-white' };
      case 'modere':
        return { label: 'Modéré', color: 'bg-warning text-white' };
      case 'resolu':
        return { label: 'Résolu', color: 'bg-accent text-white' };
      default:
        return { label: status, color: 'bg-muted text-white' };
    }
  };

  const getBorderColor = (status: string) => {
    switch (status) {
      case 'critique': return 'border-l-error';
      case 'modere': return 'border-l-warning';
      case 'resolu': return 'border-l-accent';
      default: return 'border-l-muted';
    }
  };

  const getActorIcon = (actorType: string) => {
    switch (actorType) {
      case 'stock': return Package;
      case 'quality': return CheckCircle;
      case 'transport': return Users;
      default: return Users;
    }
  };

  const incidentCount = incidents.filter(i => i.status !== 'resolu').length;

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      <TopBar onBack={onBack} title={`Incidents & blocages (${incidentCount})`} />

      <div className="px-4 mt-6 space-y-4">
        {incidents.map((incident) => {
          const statusBadge = getStatusBadge(incident.status);
          const ActorIcon = getActorIcon(incident.actorType);
          const isResolved = incident.status === 'resolu';
          
          return (
            <Card
              key={incident.id}
              className={`border-l-4 ${getBorderColor(incident.status)} ${isResolved ? 'opacity-70' : ''}`}
              padding="none"
            >
              <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className={`text-sm font-semibold ${
                    incident.status === 'critique' ? 'text-error' :
                    incident.status === 'modere' ? 'text-warning' : 'text-body'
                  }`}>
                    {incident.title}
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${statusBadge.color}`}>
                    {statusBadge.label}
                  </span>
                </div>

                {/* Command info */}
                <p className="text-xs text-muted mb-2">
                  {incident.commandId} - {incident.hospital}
                </p>

                {/* Actor */}
                <div className="flex items-center gap-2 text-xs text-muted mb-2">
                  <ActorIcon className="w-3.5 h-3.5" />
                  <span>Acteur: {incident.actor}</span>
                </div>

                {/* Status-specific info */}
                {incident.status === 'critique' && (
                  <div className="flex items-center gap-2 text-xs text-muted mb-3">
                    <Package className="w-3.5 h-3.5" />
                    <span>Commande bloquée</span>
                  </div>
                )}

                {incident.status === 'modere' && (
                  <div className="flex items-center gap-2 text-xs text-muted mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Incident en cours</span>
                  </div>
                )}

                {/* Description or action required */}
                {(incident.actionRequired || incident.description) && !isResolved && (
                  <div className="bg-neutral-bg rounded-lg p-3 mb-3">
                    <p className="text-xs text-body">
                      {incident.actionRequired ? (
                        <>
                          <span className="font-medium">Action requise : </span>
                          {incident.actionRequired}
                        </>
                      ) : (
                        incident.description
                      )}
                    </p>
                  </div>
                )}

                {/* Resolved info */}
                {isResolved && incident.resolvedDate && (
                  <p className="text-xs text-muted mb-3">
                    Résolu : {incident.resolvedDate}
                  </p>
                )}

                {/* Action buttons */}
                {!isResolved && (
                  <div className="flex items-center gap-3 pt-3 border-t border-border">
                    <button className="flex flex-col items-center gap-1 flex-1 py-2 hover:bg-neutral-bg rounded-lg transition-colors">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-[10px] text-muted">Recontacter l'acteur</span>
                    </button>
                    
                    {incident.status === 'critique' && (
                      <>
                        <button className="flex flex-col items-center gap-1 flex-1 py-2 hover:bg-neutral-bg rounded-lg transition-colors">
                          <div className="w-4 h-4 rounded-full bg-warning flex items-center justify-center">
                            <span className="text-white text-[8px] font-bold">!</span>
                          </div>
                          <span className="text-[10px] text-muted">Suspendre la commande</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 flex-1 py-2 hover:bg-neutral-bg rounded-lg transition-colors">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="text-[10px] text-muted">Reprogrammer</span>
                        </button>
                      </>
                    )}
                    
                    {incident.status === 'modere' && (
                      <>
                        <button className="flex flex-col items-center gap-1 flex-1 py-2 hover:bg-neutral-bg rounded-lg transition-colors">
                          <MessageSquare className="w-4 h-4 text-primary" />
                          <span className="text-[10px] text-muted">Envoyer rappel</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 flex-1 py-2 hover:bg-neutral-bg rounded-lg transition-colors">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="text-[10px] text-muted">Reprogrammer</span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
