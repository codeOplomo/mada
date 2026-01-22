import React, { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { HomeEmpty } from './components/screens/HomeEmpty';
import { OperationDetail } from './components/screens/OperationDetail';
import { NewOrderStep1 } from './components/screens/NewOrderStep1';
import { NewOrderStep2 } from './components/screens/NewOrderStep2';
import { NewOrderStep3 } from './components/screens/NewOrderStep3';
import { NewOrderStep4 } from './components/screens/NewOrderStep4';
import { NewOrderStep5Payment } from './components/screens/NewOrderStep5Payment';
import { OrderTracking } from './components/screens/OrderTracking';
import { OrdersList } from './components/screens/OrdersList';
import { Profile } from './components/screens/Profile';
import { ReceptionList } from './components/screens/ReceptionList';
import { ReceptionDetail } from './components/screens/ReceptionDetail';
import { ReceptionVerification } from './components/screens/ReceptionVerification';
import { ReceptionLaunch } from './components/screens/ReceptionLaunch';
import { ReceptionPhoto } from './components/screens/ReceptionPhoto';
import { ReceptionTracking } from './components/screens/ReceptionTracking';
import { ReceptionIncidents } from './components/screens/ReceptionIncidents';
import { DeliveryList } from './components/screens/DeliveryList';
import { DeliveryDetail } from './components/screens/DeliveryDetail';
import { DeliveryPickupPhoto } from './components/screens/DeliveryPickupPhoto';
import { DeliveryDropoffPhoto } from './components/screens/DeliveryDropoffPhoto';
import { DeliveryConfirmation } from './components/screens/DeliveryConfirmation';
import { DoctorList } from './components/screens/DoctorList';
import { DoctorDetail } from './components/screens/DoctorDetail';
import { DoctorDocuments } from './components/screens/DoctorDocuments';
import { DoctorConfirmation } from './components/screens/DoctorConfirmation';
import { ReportProblem } from './components/screens/ReportProblem';
import { ReportProblemConfirmation } from './components/screens/ReportProblemConfirmation';
import { DesignSystem } from './components/DesignSystem';
import { Palette } from 'lucide-react';

type Screen = 
  | 'home' 
  | 'orders' 
  | 'tracking' 
  | 'profile'
  | 'reception'
  | 'new-order-1'
  | 'new-order-2'
  | 'new-order-3'
  | 'new-order-4'
  | 'new-order-5-payment'
  | 'order-detail'
  | 'operation-detail'
  | 'reception-detail'
  | 'reception-verification'
  | 'reception-launch'
  | 'reception-photo'
  | 'reception-tracking'
  | 'reception-incidents'
  | 'delivery-detail'
  | 'delivery-pickup-photo'
  | 'delivery-dropoff-photo'
  | 'delivery-confirmation'
  | 'doctor'
  | 'doctor-detail'
  | 'doctor-documents'
  | 'doctor-confirmation'
  | 'report-problem'
  | 'report-problem-confirmation'
  | 'design-system';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [activeTab, setActiveTab] = useState<'home' | 'orders' | 'tracking' | 'reception' | 'doctor' | 'profile'>('home');
  const [selectedOperationId, setSelectedOperationId] = useState<string | null>(null);

  const handleNavigate = (tab: 'home' | 'orders' | 'tracking' | 'reception' | 'doctor' | 'profile') => {
    setActiveTab(tab);
    setCurrentScreen(tab);
  };

  const handleCreateOrder = () => {
    setCurrentScreen('new-order-1');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleViewOrder = () => {
    setCurrentScreen('order-detail');
  };

  const handleOperationClick = (operationId: string) => {
    setSelectedOperationId(operationId);
    setCurrentScreen('operation-detail');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeEmpty 
            onCreateOrder={handleCreateOrder} 
            onOperationClick={handleOperationClick}
          />
        );
      
      case 'operation-detail':
        return (
          <OperationDetail
            operationId={selectedOperationId || ''}
            onBack={handleBackToHome}
            onTrackDelivery={() => {
              setCurrentScreen('tracking');
              setActiveTab('tracking');
            }}
          />
        );
      
      case 'new-order-1':
        return (
          <NewOrderStep1
            onBack={handleBackToHome}
            onNext={() => setCurrentScreen('new-order-2')}
          />
        );
      
      case 'new-order-2':
        return (
          <NewOrderStep2
            onBack={() => setCurrentScreen('new-order-1')}
            onNext={() => setCurrentScreen('new-order-5-payment')}
          />
        );
      
      case 'new-order-5-payment':
        return (
          <NewOrderStep5Payment
            onBack={() => setCurrentScreen('new-order-2')}
            onNext={() => setCurrentScreen('new-order-4')}
          />
        );

      case 'new-order-4':
        return (
          <NewOrderStep4
            onBack={() => setCurrentScreen('new-order-5-payment')}
            onConfirm={() => {
              setCurrentScreen('tracking');
              setActiveTab('tracking');
            }}
          />
        );
      
      case 'orders':
        return <OrdersList onViewOrder={handleViewOrder} />;
      
      case 'reception':
        return <ReceptionList onViewCommand={(id) => setCurrentScreen('reception-detail')} />;
      
      case 'reception-detail':
        return (
          <ReceptionDetail
            onBack={() => {
              setCurrentScreen('reception');
              setActiveTab('reception');
            }}
            onMarkAsReviewed={() => setCurrentScreen('reception-photo')}
            onReportProblem={() => setCurrentScreen('reception-photo')}
            onRequestCorrection={() => setCurrentScreen('reception-photo')}
          />
        );
      
      case 'reception-verification':
        return (
          <ReceptionVerification
            onBack={() => setCurrentScreen('reception-detail')}
            onSaveDecision={() => setCurrentScreen('reception-launch')}
          />
        );
      
      case 'reception-launch':
        return (
          <ReceptionLaunch
            onBack={() => setCurrentScreen('reception-detail')}
            onLaunchLogistics={() => setCurrentScreen('reception-photo')}
          />
        );
      
      case 'reception-photo':
        return (
          <ReceptionPhoto
            onBack={() => setCurrentScreen('reception-detail')}
            onValidate={() => {
              setCurrentScreen('reception');
              setActiveTab('reception');
            }}
          />
        );
      
      case 'reception-tracking':
        return (
          <ReceptionTracking
            onBack={() => {
              setCurrentScreen('reception');
              setActiveTab('reception');
            }}
            onViewIncident={() => setCurrentScreen('reception-incidents')}
          />
        );
      
      case 'reception-incidents':
        return (
          <ReceptionIncidents
            onBack={() => setCurrentScreen('reception-tracking')}
          />
        );
      
      case 'tracking':
        return <DeliveryList onViewDelivery={() => setCurrentScreen('delivery-detail')} />;
      
      case 'delivery-detail':
        return (
          <DeliveryDetail
            onBack={() => {
              setCurrentScreen('tracking');
              setActiveTab('tracking');
            }}
            onStartPickup={() => setCurrentScreen('delivery-pickup-photo')}
          />
        );
      
      case 'delivery-pickup-photo':
        return (
          <DeliveryPickupPhoto
            onBack={() => setCurrentScreen('delivery-detail')}
            onConfirmPickup={() => setCurrentScreen('delivery-dropoff-photo')}
          />
        );
      
      case 'delivery-dropoff-photo':
        return (
          <DeliveryDropoffPhoto
            onBack={() => setCurrentScreen('delivery-pickup-photo')}
            onConfirmDelivery={() => setCurrentScreen('delivery-confirmation')}
          />
        );
      
      case 'delivery-confirmation':
        return (
          <DeliveryConfirmation
            onBack={() => setCurrentScreen('delivery-dropoff-photo')}
            onFinish={() => {
              setCurrentScreen('tracking');
              setActiveTab('tracking');
            }}
            onViewNextDelivery={() => setCurrentScreen('delivery-detail')}
          />
        );

      case 'doctor':
        return <DoctorList onViewRequest={() => setCurrentScreen('doctor-detail')} />;

      case 'doctor-detail':
        return (
          <DoctorDetail
            onBack={() => {
              setCurrentScreen('doctor');
              setActiveTab('doctor');
            }}
            onStartProcess={() => setCurrentScreen('doctor-documents')}
            onReportProblem={() => setCurrentScreen('report-problem')}
            onRequestCorrection={() => setCurrentScreen('doctor-documents')}
          />
        );

      case 'doctor-documents':
        return (
          <DoctorDocuments
            onBack={() => setCurrentScreen('doctor-detail')}
            onNext={() => setCurrentScreen('doctor-confirmation')}
          />
        );

      case 'doctor-confirmation':
        return (
          <DoctorConfirmation
            onBack={() => setCurrentScreen('doctor-documents')}
            onFinish={() => {
              setCurrentScreen('doctor');
              setActiveTab('doctor');
            }}
            onViewNextRequest={() => setCurrentScreen('doctor-documents')}
          />
        );

      case 'report-problem':
        return (
          <ReportProblem
            onBack={() => setCurrentScreen('doctor-detail')}
            onSubmit={(data) => {
              // Handle submission, then navigate to confirmation
              setCurrentScreen('report-problem-confirmation');
            }}
          />
        );

      case 'report-problem-confirmation':
        return (
          <ReportProblemConfirmation
            onBack={() => setCurrentScreen('report-problem')}
            onFinish={() => {
              setCurrentScreen('doctor');
              setActiveTab('doctor');
            }}
            onViewNextRequest={() => setCurrentScreen('doctor-detail')}
          />
        );

      case 'order-detail':
        return <OrderTracking onBack={() => {
          setCurrentScreen('orders');
          setActiveTab('orders');
        }} />;
      
      case 'profile':
        return <Profile />;
      
      case 'design-system':
        return <DesignSystem />;
      
      default:
        return <HomeEmpty onCreateOrder={handleCreateOrder} />;
    }
  };

  const showBottomNav = !currentScreen.startsWith('new-order') && 
    !currentScreen.startsWith('reception-') && 
    !currentScreen.startsWith('delivery-') &&
    !currentScreen.startsWith('doctor-') &&
    currentScreen !== 'order-detail' && 
    currentScreen !== 'design-system';

  return (
    <div className="min-h-screen bg-neutral-bg">
      {/* Design System Toggle - floating button */}
      <button
        onClick={() => setCurrentScreen(currentScreen === 'design-system' ? 'home' : 'design-system')}
        className="fixed top-4 right-4 z-50 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-dark transition-colors duration-200"
        title={currentScreen === 'design-system' ? 'Back to App' : 'View Design System'}
      >
        <Palette className="w-6 h-6" />
      </button>

      <div className="max-w-[390px] mx-auto relative bg-white shadow-xl min-h-screen">
        {renderScreen()}
        
        {showBottomNav && (
          <BottomNav active={activeTab} onNavigate={handleNavigate} />
        )}
      </div>
    </div>
  );
}