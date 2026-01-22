import React, { useState } from 'react';
import { FileText, User, Clock, ChevronRight, Stethoscope } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Card } from '../Card';

interface DoctorListProps {
  onViewRequest: (id: string) => void;
}

interface RequestItem {
  id: string;
  requestNumber: string;
  patientName: string;
  patientId: string;
  requestDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  urgency: 'standard' | 'urgent';
  destiny: '1' | '2';
}

export function DoctorList({ onViewRequest }: DoctorListProps) {
  const [activeDestiny, setActiveDestiny] = useState<'destiny1' | 'destiny2' | null>('destiny1');
  const requests: RequestItem[] = [
    {
      id: '1',
      requestNumber: 'DOC-789012',
      patientName: 'Martin Dubois',
      patientId: 'PAT-001234',
      requestDate: '20/01/2026 - 14:30',
      status: 'pending',
      urgency: 'urgent',
      destiny: '1',
    },
    {
      id: '2',
      requestNumber: 'DOC-789013',
      patientName: 'Sophie Laurent',
      patientId: 'PAT-001235',
      requestDate: '20/01/2026 - 11:00',
      status: 'in-progress',
      urgency: 'standard',
      destiny: '2',
    },
    {
      id: '3',
      requestNumber: 'DOC-789014',
      patientName: 'Pierre Bernard',
      patientId: 'PAT-001236',
      requestDate: '19/01/2026 - 16:45',
      status: 'pending',
      urgency: 'standard',
      destiny: '1',
    },
    {
      id: '4',
      requestNumber: 'DOC-789010',
      patientName: 'Marie Petit',
      patientId: 'PAT-001230',
      requestDate: '19/01/2026 - 09:00',
      status: 'completed',
      urgency: 'standard',
      destiny: '2',
    },
  ];

  const destinyFilters: { id: string; label: string }[] = [
    { id: 'destiny1', label: 'Departure' },
    { id: 'destiny2', label: 'Return' },
  ];

  const getStatusConfig = (status: RequestItem['status']) => {
    switch (status) {
      case 'pending':
        return { label: 'Pending', color: 'bg-warning text-white' };
      case 'in-progress':
        return { label: 'In Progress', color: 'bg-error text-white' };
      case 'completed':
        return { label: 'Completed', color: 'bg-success text-white' };
    }
  };

  const getCardBackgroundStyle = (request: RequestItem) => {
    if (request.status === 'completed') {
      return '#d3ffe0'; // green for completed
    }
    if (request.status === 'in-progress' || request.urgency === 'urgent') {
      return '#ffbcbc'; // red for urgent/in-progress
    }
    if (request.status === 'pending') {
      return '#fff3cd'; // yellow for pending
    }
    return undefined;
  };

  const getBorderColor = (request: RequestItem) => {
    if (request.status === 'completed') {
      return 'border-l-success';
    }
    if (request.status === 'in-progress' || request.urgency === 'urgent') {
      return 'border-l-error';
    }
    if (request.status === 'pending') {
      return 'border-l-primary';
    }
    return 'border-l-gray-300';
  };

  const pendingRequests = requests.filter(r => r.status !== 'completed' && (activeDestiny === null || (activeDestiny === 'destiny1' ? r.destiny === '1' : r.destiny === '2')));
  const completedRequests = requests.filter(r => r.status === 'completed' && (activeDestiny === null || (activeDestiny === 'destiny1' ? r.destiny === '1' : r.destiny === '2')));

  const filtersJSX = (
    <div 
      className="filter-tabs-container flex gap-2 overflow-x-auto"
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
  );

  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      <TopBar title="My Prescriptions" subtitle="Dr. Jean Martin" filters={filtersJSX} />

      <div className="px-4 mt-6 space-y-6">
        {/* Stats summary */}
        <div className="flex gap-3">
          <Card className="flex-1 text-center !p-3">
            <div className="text-2xl font-bold text-primary">{pendingRequests.length}</div>
            <div className="text-xs text-muted">Pending</div>
          </Card>
          <Card className="flex-1 text-center !p-3">
            <div className="text-2xl font-bold text-warning">{requests.filter(r => r.urgency === 'urgent' && (activeDestiny === null || (activeDestiny === 'destiny1' ? r.destiny === '1' : r.destiny === '2'))).length}</div>
            <div className="text-xs text-muted">Urgent</div>
          </Card>
          <Card className="flex-1 text-center !p-3">
            <div className="text-2xl font-bold text-accent">{completedRequests.length}</div>
            <div className="text-xs text-muted">Completed</div>
          </Card>
        </div>

        {/* Active requests */}
        {pendingRequests.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-body mb-3 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-primary" />
              Active Requests
            </h2>
            <div className="space-y-3">
              {pendingRequests.map((request) => {
                const statusConfig = getStatusConfig(request.status);
                return (
                  <button
                    key={request.id}
                    onClick={() => onViewRequest(request.id)}
                    className="w-full text-left"
                  >
                    <Card 
                      style={{ backgroundColor: getCardBackgroundStyle(request) }}
                      className={`hover:shadow-lg transition-all duration-200 border-l-4 ${getBorderColor(request)}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          request.urgency === 'urgent' ? 'bg-error/10' : 'bg-primary/10'
                        }`}>
                          <FileText className={`w-5 h-5 ${
                            request.urgency === 'urgent' ? 'text-error' : 'text-primary'
                          }`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-body">{request.requestNumber}</span>
                            {request.urgency === 'urgent' && (
                              <span className="px-1.5 py-0.5 bg-error/10 text-error text-[10px] font-medium rounded">
                                URGENT
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-body">
                            <User className="w-3 h-3" />
                            {request.patientName}
                          </div>
                          <div className="text-xs text-muted mt-1">
                            ID: {request.patientId}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted mt-1">
                            <Clock className="w-3 h-3" />
                            {request.requestDate}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                            {statusConfig.label}
                          </span>
                          <ChevronRight className="w-5 h-5 text-muted" />
                        </div>
                      </div>
                    </Card>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Completed requests */}
        {completedRequests.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-muted mb-3">Completed Requests</h2>
            <div className="space-y-3">
              {completedRequests.map((request) => {
                const statusConfig = getStatusConfig(request.status);
                return (
                  <button
                    key={request.id}
                    onClick={() => onViewRequest(request.id)}
                    className="w-full text-left opacity-70"
                  >
                    <Card 
                      style={{ backgroundColor: getCardBackgroundStyle(request) }}
                      className={`border-l-4 ${getBorderColor(request)}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-accent" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium text-body">{request.requestNumber}</span>
                          <p className="text-xs text-muted truncate">{request.patientName}</p>
                        </div>
                        
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                          {statusConfig.label}
                        </span>
                      </div>
                    </Card>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
