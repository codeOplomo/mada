import React, { useState } from 'react';
import { Package, ChevronRight, Clock, CheckCircle2, Truck, AlertCircle, Search } from 'lucide-react';
import { Card } from '../Card';

interface OrdersListProps {
  onViewOrder: () => void;
}

type OperationStatus = 'pending' | 'preparation' | 'in-transit' | 'delivered' | 'cancelled' | 'blocked';
type FilterType = 'all' | 'urgent' | 'pending' | 'blocked';

interface Operation {
  id: string;
  patientName: string;
  operationType: string;
  scheduledDate: string;
  scheduledTime: string;
  status: OperationStatus;
  hospital: string;
  equipmentCount: number;
}

// Mock data for demonstration - in real app this would come from props or API
const mockOperations: Operation[] = [
  {
    id: 'OP-2026-001',
    patientName: 'Jean Dupont',
    operationType: 'Knee Arthroscopy',
    scheduledDate: '2026-01-22',
    scheduledTime: '09:00',
    status: 'in-transit',
    hospital: 'CHU Saint-Denis',
    equipmentCount: 12
  },
  {
    id: 'OP-2026-002',
    patientName: 'Marie Laurent',
    operationType: 'Hip Replacement',
    scheduledDate: '2026-01-23',
    scheduledTime: '14:30',
    status: 'preparation',
    hospital: 'Clinique Sainte-Marie',
    equipmentCount: 8
  },
  {
    id: 'OP-2025-089',
    patientName: 'Pierre Martin',
    operationType: 'Shoulder Surgery',
    scheduledDate: '2026-01-18',
    scheduledTime: '10:00',
    status: 'delivered',
    hospital: 'CHU Saint-Denis',
    equipmentCount: 15
  },
  {
    id: 'OP-2025-088',
    patientName: 'Sophie Bernard',
    operationType: 'Spinal Fusion',
    scheduledDate: '2026-01-15',
    scheduledTime: '08:00',
    status: 'delivered',
    hospital: 'Hôpital Nord',
    equipmentCount: 22
  }
];

const getStatusConfig = (status: OperationStatus) => {
  switch (status) {
    case 'pending':
      return { label: 'Pending', bgColor: 'bg-warning', icon: Clock };
    case 'preparation':
      return { label: 'Preparing', bgColor: 'bg-error', icon: Package };
    case 'in-transit':
      return { label: 'In Transit', bgColor: 'bg-error', icon: Truck };
    case 'delivered':
      return { label: 'Delivered', bgColor: 'bg-success', icon: CheckCircle2 };
    case 'blocked':
      return { label: 'Blocked', bgColor: 'bg-gray-300', icon: AlertCircle };
    case 'cancelled':
      return { label: 'Cancelled', bgColor: 'bg-gray-300', icon: AlertCircle };
    default:
      return { label: 'Unknown', bgColor: 'bg-gray-300', icon: Clock };
  }
};

const getCardBackgroundStyle = (status: OperationStatus) => {
  switch (status) {
    case 'pending':
      return '#fff3cd'; // yellow for pending
    case 'preparation':
      return '#ffbcbc'; // red for urgent
    case 'in-transit':
      return '#ffbcbc'; // red for urgent
    case 'delivered':
      return '#d3ffe0'; // green for delivered
    case 'blocked':
      return '#f5f5f5'; // gray for blocked
    case 'cancelled':
      return '#f5f5f5'; // gray for cancelled
    default:
      return undefined;
  }
};

const getBorderColor = (status: OperationStatus) => {
  switch (status) {
    case 'pending':
      return 'border-l-primary';
    case 'preparation':
      return 'border-l-error';
    case 'in-transit':
      return 'border-l-error';
    case 'delivered':
      return 'border-l-success';
    case 'blocked':
      return 'border-l-error';
    case 'cancelled':
      return 'border-l-error';
    default:
      return 'border-l-gray-300';
  }
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export function OrdersList({ onViewOrder }: OrdersListProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filters: { id: FilterType; label: string; count?: number }[] = [
    { id: 'all', label: 'All' },
    { id: 'urgent', label: 'Urgent' },
    { id: 'pending', label: 'Pending' },
    { id: 'blocked', label: 'Blocked' },
  ];

  // Filter operations based on active filter and search query
  const filteredOperations = mockOperations.filter(op => {
    // Apply status filter
    let matchesFilter = true;
    if (activeFilter === 'urgent') {
      matchesFilter = ['in-transit', 'preparation'].includes(op.status);
    } else if (activeFilter === 'pending') {
      matchesFilter = op.status === 'pending';
    } else if (activeFilter === 'blocked') {
      matchesFilter = ['blocked', 'cancelled'].includes(op.status);
    }

    // Apply search query
    const matchesSearch = searchQuery === '' || 
      op.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.operationType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const activeOperations = filteredOperations.filter(op => !['delivered', 'cancelled'].includes(op.status));
  const pastOperations = filteredOperations.filter(op => ['delivered', 'cancelled'].includes(op.status));
  return (
    <div className="min-h-screen bg-neutral-bg pb-24">
      {/* Header */}
      <div className="bg-primary rounded-b-[20px] shadow-card px-4 pt-12 pb-6">
        <div className="text-center">
          <h1 className="text-white text-2xl font-semibold">My Orders</h1>
          <p className="text-white/70 text-sm mt-1">
            History and ongoing orders
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mt-4">
          {/* Search bar - collapsible */}
          {showSearch && (
            <div className="mb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search by patient, operation, hospital..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl text-sm text-body placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-white/50"
                  autoFocus
                />
              </div>
            </div>
          )}

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
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-200 ${
                    activeFilter === filter.id
                      ? 'bg-white text-primary'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                showSearch ? 'bg-white text-primary' : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <Search className={`w-4 h-4 ${showSearch ? 'text-primary' : 'text-white'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 mt-6">
        {filteredOperations.length === 0 ? (
          <>
            {/* No results state */}
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted text-sm leading-relaxed px-4">
                No operations found matching your filters.
              </p>
              <button 
                onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
                className="mt-4 text-primary text-sm font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Active Operations Section */}
            {activeOperations.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-semibold text-heading">Active Operations</h2>
                  <span className="text-xs text-muted bg-primary/10 px-2 py-1 rounded-full">
                    {activeOperations.length} active
                  </span>
                </div>
                <div className="space-y-3">
                  {activeOperations.map((operation) => {
                    const statusConfig = getStatusConfig(operation.status);
                    const StatusIcon = statusConfig.icon;
                    return (
                      <div
                        key={operation.id}
                        onClick={() => onViewOrder()}
                        style={{ backgroundColor: getCardBackgroundStyle(operation.status) }}
                        className={`rounded-[12px] p-4 shadow-card border border-neutral-border cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 ${getBorderColor(operation.status)}`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-muted font-medium">{operation.id}</span>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${statusConfig.bgColor}`}>
                                {statusConfig.label}
                              </span>
                            </div>
                            <h3 className="text-sm font-semibold text-heading">{operation.operationType}</h3>
                            <p className="text-xs text-muted mt-0.5">{operation.patientName}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted flex-shrink-0" />
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 border-t border-neutral-border/50">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-muted" />
                              <span className="text-xs text-body">
                                {formatDate(operation.scheduledDate)} • {operation.scheduledTime}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Package className="w-3.5 h-3.5 text-muted" />
                            <span className="text-xs text-body">{operation.equipmentCount} items</span>
                          </div>
                        </div>
                        
                        {/* Progress indicator for in-transit */}
                        {operation.status === 'in-transit' && (
                          <div className="mt-3 pt-3 border-t border-neutral-border/50">
                            <div className="flex items-center gap-2">
                              <StatusIcon className="w-4 h-4 text-error animate-pulse" />
                              <span className="text-xs text-error font-medium">Equipment on the way</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Past Operations Section */}
            {pastOperations.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-semibold text-heading">History</h2>
                  <span className="text-xs text-muted">{pastOperations.length} operations</span>
                </div>
                <div className="space-y-3">
                  {pastOperations.map((operation) => {
                    const statusConfig = getStatusConfig(operation.status);
                    return (
                      <div
                        key={operation.id}
                        onClick={() => onViewOrder()}
                        style={{ backgroundColor: getCardBackgroundStyle(operation.status) }}
                        className={`rounded-[12px] p-4 shadow-card border border-neutral-border cursor-pointer hover:shadow-lg transition-all duration-200 opacity-80 border-l-4 ${getBorderColor(operation.status)}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-muted font-medium">{operation.id}</span>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${statusConfig.bgColor}`}>
                                {statusConfig.label}
                              </span>
                            </div>
                            <h3 className="text-sm font-medium text-heading">{operation.operationType}</h3>
                            <p className="text-xs text-muted mt-0.5">{operation.patientName} • {operation.hospital}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted flex-shrink-0" />
                        </div>
                        
                        <div className="flex items-center gap-1.5 mt-2">
                          <Clock className="w-3.5 h-3.5 text-muted" />
                          <span className="text-xs text-muted">
                            {formatDate(operation.scheduledDate)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

