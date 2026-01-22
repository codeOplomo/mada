import React, { useState } from 'react';
import { Filter, Search, Bell, AlertTriangle, Calendar, CreditCard, ChevronRight, FileText, User } from 'lucide-react';
import { Card } from '../Card';
import { EmptyStateIllustration } from '../illustrations/EmptyStateIllustration';

interface ReceptionListProps {
  onViewCommand: (commandId: string) => void;
}

type FilterType = 'tous' | 'urgentes' | 'en-attente' | 'bloquees';

interface Command {
  id: string;
  hospital: string;
  city: string;
  date: string;
  type: string;
  payment: string;
  status: 'bloque' | 'paiement-confirmer' | 'nouvelle' | 'en-attente-revue' | 'validee';
  statusLabel: string;
  statusColor: string;
  borderColor: string;
  hasWarning?: boolean;
  warningText?: string;
  destiny: '1' | '2';
}

export function ReceptionList({ onViewCommand }: ReceptionListProps) {
  const [activeDestiny, setActiveDestiny] = useState<'destiny1' | 'destiny2' | null>('destiny1');
  const [activeStatus, setActiveStatus] = useState<FilterType>('tous');
  const [searchQuery, setSearchQuery] = useState('');

  const destinyFilters: { id: string; label: string }[] = [
    { id: 'destiny1', label: 'Departure' },
    { id: 'destiny2', label: 'Return' },
  ];

  const statusFilters: { id: FilterType; label: string }[] = [
    { id: 'tous', label: 'All' },
    { id: 'urgentes', label: 'Urgent' },
    { id: 'en-attente', label: 'Pending' },
    { id: 'bloquees', label: 'Blocked' },
  ];

  const commands: Command[] = [
    {
      id: 'CMD-2024-0501',
      hospital: 'Hôpital Charles Nicolle',
      city: 'Tunis',
      date: '24 Jan 2024',
      type: 'Scoliosis',
      payment: 'Check',
      status: 'bloque',
      statusLabel: 'Blocked',
      statusColor: 'bg-error',
      borderColor: 'border-l-error',
      hasWarning: true,
      warningText: 'Payment Issue',
      destiny: '1',
    },
    {
      id: 'CMD-2024-0502',
      hospital: 'Clinique Pasteur',
      city: 'Casablanca',
      date: '26 Jan 2024',
      type: 'Scoliosis',
      payment: 'Advance',
      status: 'validee',
      statusLabel: 'Urgent',
      statusColor: 'bg-warning',
      borderColor: 'border-l-error',
      hasWarning: true,
      warningText: 'Missing Document',
      destiny: '2',
    },
    {
      id: 'CMD-2024-0503',
      hospital: 'Centre Hospitalier Universitaire',
      city: 'Lyon',
      date: '28 Jan 2024',
      type: 'Scoliosis',
      payment: 'Cash',
      status: 'completed',
      statusLabel: 'Completed',
      statusColor: 'bg-accent',
      borderColor: 'border-l-accent',
      destiny: '2',
    },
    {
      id: 'CMD-2024-0504',
      hospital: 'Clinique du Parc',
      city: 'Toulouse',
      date: '30 Jan 2024',
      type: 'Scoliosis',
      payment: 'Advance',
      status: 'en-attente-revue',
      statusLabel: 'Pending',
      statusColor: 'bg-primary',
      borderColor: 'border-l-primary',
      destiny: '2',
    },
    {
      id: 'CMD-2024-0505',
      hospital: 'Polyclinique Les Jasmins',
      city: 'Sousse',
      date: '02 Feb 2024',
      type: 'Scoliosis',
      payment: 'Card',
      status: 'nouvelle',
      statusLabel: 'Urgent',
      statusColor: 'bg-success',
      borderColor: 'border-l-error',
      destiny: '1',
    },
    {
      id: 'CMD-2024-0506',
      hospital: 'Hôpital Saint-Louis',
      city: 'Paris',
      date: '04 Feb 2024',
      type: 'Hip Replacement',
      payment: 'Check',
      status: 'bloque',
      statusLabel: 'Blocked',
      statusColor: 'bg-error',
      borderColor: 'border-l-error',
      hasWarning: true,
      warningText: 'Incomplete Documentation',
      destiny: '1',
    },
    {
      id: 'CMD-2024-0507',
      hospital: 'Clinique Sainte-Marie',
      city: 'Marseille',
      date: '06 Feb 2024',
      type: 'Knee Arthroscopy',
      payment: 'Cash',
      status: 'nouvelle',
      statusLabel: 'Urgent',
      statusColor: 'bg-accent',
      borderColor: 'border-l-error',
      destiny: '2',
    },
    {
      id: 'CMD-2024-0508',
      hospital: 'Centre Médical de Bordeaux',
      city: 'Bordeaux',
      date: '08 Feb 2024',
      type: 'Spinal Fusion',
      payment: 'Advance',
      status: 'en-attente-revue',
      statusLabel: 'Pending',
      statusColor: 'bg-primary',
      borderColor: 'border-l-primary',
      destiny: '1',
    },
    {
      id: 'CMD-2024-0509',
      hospital: 'Hôpital Nord',
      city: 'Lille',
      date: '10 Feb 2024',
      type: 'Shoulder Surgery',
      payment: 'Card',
      status: 'validee',
      statusLabel: 'Urgent',
      statusColor: 'bg-warning',
      borderColor: 'border-l-error',
      hasWarning: true,
      warningText: 'Insurance Verification',
      destiny: '2',
    },
    {
      id: 'CMD-2024-0510',
      hospital: 'Clinique du Sud',
      city: 'Nice',
      date: '12 Feb 2024',
      type: 'Elbow Surgery',
      payment: 'Check',
      status: 'completed',
      statusLabel: 'Completed',
      statusColor: 'bg-success',
      borderColor: 'border-l-success',
      destiny: '1',
    },
    {
      id: 'CMD-2024-0511',
      hospital: 'Hôpital Central',
      city: 'Strasbourg',
      date: '14 Feb 2024',
      type: 'Wrist Surgery',
      payment: 'Cash',
      status: 'bloque',
      statusLabel: 'Blocked',
      statusColor: 'bg-error',
      borderColor: 'border-l-error',
      hasWarning: true,
      warningText: 'Payment Overdue',
      destiny: '2',
    },
    {
      id: 'CMD-2024-0512',
      hospital: 'Clinique Méditerranée',
      city: 'Toulon',
      date: '16 Feb 2024',
      type: 'Ankle Surgery',
      payment: 'Advance',
      status: 'nouvelle',
      statusLabel: 'Urgent',
      statusColor: 'bg-accent',
      borderColor: 'border-l-error',
      destiny: '1',
    },
    {
      id: 'CMD-2024-0513',
      hospital: 'Centre Hospitalier Régional',
      city: 'Reims',
      date: '18 Feb 2024',
      type: 'Foot Surgery',
      payment: 'Card',
      status: 'en-attente-revue',
      statusLabel: 'Pending',
      statusColor: 'bg-primary',
      borderColor: 'border-l-primary',
      destiny: '2',
    },
    {
      id: 'CMD-2024-0514',
      hospital: 'Hôpital Universitaire',
      city: 'Nancy',
      date: '20 Feb 2024',
      type: 'Hand Surgery',
      payment: 'Check',
      status: 'validee',
      statusLabel: 'Urgent',
      statusColor: 'bg-warning',
      borderColor: 'border-l-error',
      hasWarning: true,
      warningText: 'Document Review',
      destiny: '1',
    },
    {
      id: 'CMD-2024-0515',
      hospital: 'Clinique du Nord',
      city: 'Rouen',
      date: '22 Feb 2024',
      type: 'Orthopedic Surgery',
      payment: 'Cash',
      status: 'completed',
      statusLabel: 'Completed',
      statusColor: 'bg-success',
      borderColor: 'border-l-success',
      destiny: '2',
    },
  ];

  const filteredCommands = commands.filter(cmd => {
    // First filter by destiny
    if (activeDestiny === 'destiny1' && cmd.destiny !== '1') return false;
    if (activeDestiny === 'destiny2' && cmd.destiny !== '2') return false;
    // Then filter by status
    if (activeStatus === 'urgentes' && !(cmd.status === 'bloque' || cmd.status === 'nouvelle' || cmd.status === 'validee')) return false;
    if (activeStatus === 'en-attente' && !(cmd.status === 'en-attente-revue' || cmd.status === 'paiement-confirmer')) return false;
    if (activeStatus === 'bloquees' && cmd.status !== 'bloque') return false;
    return true;
  });

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'bloque':
        return 'text-muted'; // gray for blocked
      case 'nouvelle':
        return 'text-error'; // red for urgent
      case 'en-attente-revue':
        return 'text-warning'; // yellow for pending
      case 'validee':
        return 'text-error'; // red for urgent
      case 'completed':
        return 'text-success'; // green
      default:
        return 'text-muted';
    }
  };

  const getCardBackgroundStyle = (status: string) => {
    switch (status) {
      case 'bloque':
        return '#f5f5f5'; // gray for blocked
      case 'nouvelle':
        return '#ffbcbc'; // red for urgent
      case 'en-attente-revue':
        return '#fff3cd'; // yellow for pending
      case 'validee':
        return '#ffbcbc'; // red for urgent
      case 'completed':
        return '#d3ffe0'; // green
      default:
        return undefined;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      {/* Header */}
      <div className="bg-primary rounded-b-[20px] shadow-card px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-white text-xl font-semibold">Orders to process</h1>
            <p className="text-white/70 text-sm mt-1">Mada Medical Coordinator</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </button>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Destiny Filter Tabs */}
        <div className="flex items-center gap-2 mb-3">
          <div 
            className="filter-tabs-container flex gap-2 flex-1 overflow-x-auto"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <style>{`
              .filter-tabs-container::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {destinyFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveDestiny(filter.id as 'destiny1' | 'destiny2')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-200 ${
                  activeDestiny === filter.id
                    ? 'bg-white text-primary'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2">
          <div 
            className="filter-tabs-container flex gap-2 flex-1 overflow-x-auto"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <style>{`
              .filter-tabs-container::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {statusFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveStatus(filter.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-200 ${
                  activeStatus === filter.id
                    ? 'bg-white text-primary'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <button className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <Filter className="w-4 h-4 text-white" />
          </button>
          <button className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <Search className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Commands List */}
      <div className="px-4 mt-6 space-y-4">
        {filteredCommands.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <EmptyStateIllustration className="w-24 h-24 mb-4 text-muted" />
            <p className="text-muted text-sm text-center">No orders<br />to process at the moment.</p>
          </div>
        ) : (
          filteredCommands.map((command) => (
            <Card
              key={command.id}
              style={{ backgroundColor: getCardBackgroundStyle(command.status) }}
              className={`cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 ${command.borderColor}`}
              padding="none"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="text-sm font-semibold text-body">{command.hospital}</h3>
                      <span className="text-xs text-muted">{command.city}</span>
                    </div>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${getStatusBadgeStyle(command.status)}`}>
                      {command.statusLabel}
                    </span>
                  </div>
                  {command.status === 'bloque' && (
                    <div className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-error" />
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      Date:
                    </span>
                    <span className="text-body font-medium">{command.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5" />
                      Payment:
                    </span>
                    <span className="text-body font-medium">{command.payment}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted">Type:</span>
                    <span className="text-body font-medium">{command.type}</span>
                  </div>
                </div>

                {command.hasWarning && (
                  <div className="flex items-center gap-1.5 mb-3 py-2 px-3 bg-warning/10 rounded-lg text-xs text-warning font-medium">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{command.warningText}</span>
                  </div>
                )}

                <button 
                  onClick={() => onViewCommand(command.id)}
                  className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
                >
                  Open order
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
