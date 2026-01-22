import React, { useState } from 'react';
import { Package, MapPin, Clock, ChevronRight, Truck } from 'lucide-react';
import { TopBar } from '../TopBar';
import { Card } from '../Card';

interface DeliveryListProps {
  onViewDelivery: (id: string) => void;
}

interface DeliveryItem {
  id: string;
  orderNumber: string;
  hospital: string;
  address: string;
  pickupTime: string;
  status: 'pending-pickup' | 'in-transit' | 'pending-delivery' | 'delivered';
  urgency: 'standard' | 'urgent';
  destiny: '1' | '2';
}

export function DeliveryList({ onViewDelivery }: DeliveryListProps) {
  const [activeDestiny, setActiveDestiny] = useState<'destiny1' | 'destiny2' | null>('destiny1');
  const deliveries: DeliveryItem[] = [
    {
      id: '1',
      orderNumber: 'CMD-412345',
      hospital: 'Hôpital Saint-Louis',
      address: 'Paris 10ème',
      pickupTime: '14:00 - 16:00',
      status: 'pending-pickup',
      urgency: 'urgent',
      destiny: '1',
    },
    {
      id: '2',
      orderNumber: 'CMD-412346',
      hospital: 'Clinique Saint-Charles',
      address: 'Lyon 3ème',
      pickupTime: '09:00 - 11:00',
      status: 'in-transit',
      urgency: 'standard',
      destiny: '2',
    },
    {
      id: '3',
      orderNumber: 'CMD-412347',
      hospital: 'CHU Bordeaux',
      address: 'Bordeaux Centre',
      pickupTime: '16:00 - 18:00',
      status: 'pending-delivery',
      urgency: 'standard',
      destiny: '2',
    },
    {
      id: '4',
      orderNumber: 'CMD-412340',
      hospital: 'Hôpital Nord',
      address: 'Marseille',
      pickupTime: '08:00 - 10:00',
      status: 'delivered',
      urgency: 'standard',
      destiny: '1',
    },
  ];

  const destinyFilters: { id: string; label: string }[] = [
    { id: 'destiny1', label: 'Departure' },
    { id: 'destiny2', label: 'Return' },
  ];

  const getStatusConfig = (status: DeliveryItem['status']) => {
    switch (status) {
      case 'pending-pickup':
        return { label: 'To Pickup', color: 'bg-warning text-white' };
      case 'in-transit':
        return { label: 'In Transit', color: 'bg-primary text-white' };
      case 'pending-delivery':
        return { label: 'To Deliver', color: 'bg-primary text-white' };
      case 'delivered':
        return { label: 'Delivered', color: 'bg-accent text-white' };
    }
  };

  const getCardBackgroundStyle = (status: DeliveryItem['status']) => {
    switch (status) {
      case 'pending-pickup':
        return '#ffbcbc';
      case 'in-transit':
        return '#c7c4ff';
      case 'pending-delivery':
        return '#c7c4ff';
      case 'delivered':
        return '#d3ffe0';
    }
  };

  const getBorderColor = (status: DeliveryItem['status']) => {
    switch (status) {
      case 'pending-pickup':
        return 'border-l-warning';
      case 'in-transit':
        return 'border-l-primary';
      case 'pending-delivery':
        return 'border-l-primary';
      case 'delivered':
        return 'border-l-accent';
    }
  };

  const pendingDeliveries = deliveries.filter(d => d.status !== 'delivered' && (activeDestiny === null || (activeDestiny === 'destiny1' ? d.destiny === '1' : d.destiny === '2')));
  const completedDeliveries = deliveries.filter(d => d.status === 'delivered' && (activeDestiny === null || (activeDestiny === 'destiny1' ? d.destiny === '1' : d.destiny === '2')));

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
      <TopBar title="My Deliveries" subtitle="Driver - Jean Dupont" filters={filtersJSX} />

      <div className="px-4 mt-6 space-y-6">
        {/* Stats summary */}
        <div className="flex gap-3">
          <Card className="flex-1 text-center !p-3">
            <div className="text-2xl font-bold text-primary">{pendingDeliveries.length}</div>
            <div className="text-xs text-muted">In Progress</div>
          </Card>
          <Card className="flex-1 text-center !p-3">
            <div className="text-2xl font-bold text-warning">{deliveries.filter(d => d.status === 'pending-pickup' && (activeDestiny === null || (activeDestiny === 'destiny1' ? d.destiny === '1' : d.destiny === '2'))).length}</div>
            <div className="text-xs text-muted">To Pickup</div>
          </Card>
          <Card className="flex-1 text-center !p-3">
            <div className="text-2xl font-bold text-accent">{completedDeliveries.length}</div>
            <div className="text-xs text-muted">Delivered</div>
          </Card>
        </div>

        {/* Active deliveries */}
        {pendingDeliveries.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-body mb-3 flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary" />
              Active Deliveries
            </h2>
            <div className="space-y-3">
              {pendingDeliveries.map((delivery) => {
                const statusConfig = getStatusConfig(delivery.status);
                return (
                  <button
                    key={delivery.id}
                    onClick={() => onViewDelivery(delivery.id)}
                    className="w-full text-left"
                  >
                    <Card 
                      className={`hover:border-primary transition-colors duration-200 border-l-4 ${getBorderColor(delivery.status)}`}
                      style={{ backgroundColor: getCardBackgroundStyle(delivery.status) }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          delivery.urgency === 'urgent' ? 'bg-error/10' : 'bg-primary/10'
                        }`}>
                          <Package className={`w-5 h-5 ${
                            delivery.urgency === 'urgent' ? 'text-error' : 'text-primary'
                          }`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-body">{delivery.orderNumber}</span>
                            {delivery.urgency === 'urgent' && (
                              <span className="px-1.5 py-0.5 bg-error/10 text-error text-[10px] font-medium rounded">
                                URGENT
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-body truncate">{delivery.hospital}</p>
                          <div className="flex items-center gap-1 text-xs text-muted mt-1">
                            <MapPin className="w-3 h-3" />
                            {delivery.address}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted mt-1">
                            <Clock className="w-3 h-3" />
                            {delivery.pickupTime}
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

        {/* Completed deliveries */}
        {completedDeliveries.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-muted mb-3">Completed Deliveries</h2>
            <div className="space-y-3">
              {completedDeliveries.map((delivery) => {
                const statusConfig = getStatusConfig(delivery.status);
                return (
                  <button
                    key={delivery.id}
                    onClick={() => onViewDelivery(delivery.id)}
                    className="w-full text-left"
                  >
                    <Card 
                      className={`border-l-4 ${getBorderColor(delivery.status)}`}
                      style={{ backgroundColor: getCardBackgroundStyle(delivery.status) }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Package className="w-5 h-5 text-accent" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium text-body">{delivery.orderNumber}</span>
                          <p className="text-xs text-muted truncate">{delivery.hospital}</p>
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
