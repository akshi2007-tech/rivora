import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { LowConnectivityBanner, Toast } from './components/FeedbackBanner';
import { MobileNav } from './components/MobileNav';

// Patient Views
import { LandingView } from './views/patient/LandingView';
import { LoginView } from './views/patient/LoginView';
import { ConsentView } from './views/patient/ConsentView';
import { ReportUploadView } from './views/patient/ReportUploadView';
import { PatientHomeView } from './views/patient/PatientHomeView';
import { PatientInfoFormView } from './views/patient/PatientInfoFormView';
import { CarePassportView } from './views/patient/CarePassportView';
import { HealthcareMatchingView } from './views/patient/HealthcareMatchingView';
import { FinancialSupportView } from './views/patient/FinancialSupportView';
import { TreatmentDelayRiskView } from './views/patient/TreatmentDelayRiskView';
import { CarePathwayView } from './views/patient/CarePathwayView';
import { FollowUpView } from './views/patient/FollowUpView';

// Staff Views
import { DoctorDashboardView } from './views/staff/DoctorDashboardView';
import { HealthWorkerDashboardView, AuditLogView } from './views/staff/HealthWorkerViews';

import './styles/tokens.css';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingView />;
      case 'login':
        return <LoginView />;
      case 'consent':
        return <ConsentView />;
      case 'report-upload':
        return <ReportUploadView />;
      case 'patient-home':
        return <PatientHomeView />;
      case 'patient-info':
        return <PatientInfoFormView />;
      case 'care-passport':
        return <CarePassportView />;
      case 'healthcare-matching':
        return <HealthcareMatchingView />;
      case 'financial-support':
        return <FinancialSupportView />;
      case 'treatment-risk':
        return <TreatmentDelayRiskView />;
      case 'care-pathway':
        return <CarePathwayView />;
      case 'follow-up':
        return <FollowUpView />;
      case 'doctor-dashboard':
      case 'doctor-patient-review':
        return <DoctorDashboardView />;
      case 'healthworker-dashboard':
        return <HealthWorkerDashboardView />;
      case 'audit-log':
        return <AuditLogView />;
      default:
        return <PatientHomeView />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-warm)' }}>
      {/* Low Connectivity Banner */}
      <LowConnectivityBanner />

      {/* Header */}
      <Header />

      {/* Main App Container */}
      <main className="app-container" style={{ flex: 1, width: '100%' }}>
        {renderCurrentView()}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Reactive Toast Notification */}
      <Toast />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
};

export default App;
