import React from 'react';
import { Compass, FileText, Building2, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileNav: React.FC = () => {
  const { currentRole, currentView, navigate, t } = useApp();

  if (!currentRole || currentView === 'landing' || currentView === 'login') {
    return null;
  }

  const patientItems = [
    { key: 'patient-home', label: t.navJourney, icon: Compass, view: 'patient-home' as const },
    { key: 'care-passport', label: t.navPassport, icon: FileText, view: 'care-passport' as const },
    { key: 'financial-support', label: 'Financial Follow-ups', icon: Building2, view: 'financial-support' as const }
  ];

  const items = currentRole === 'patient' ? patientItems : currentRole === 'doctor' ? [{ key: 'doctor-dashboard', label: 'Dashboard', icon: Compass, view: 'doctor-dashboard' as const }, { key: 'audit-log', label: 'Audit', icon: Calendar, view: 'audit-log' as const }] : [{ key: 'healthworker-dashboard', label: 'Hub', icon: Compass, view: 'healthworker-dashboard' as const }, { key: 'patient-info', label: 'Intake', icon: FileText, view: 'patient-info' as const }];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#ffffff',
      borderTop: '1px solid var(--color-border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0.5rem 0.25rem',
      zIndex: 850,
      boxShadow: '0 -2px 12px rgba(43, 39, 48, 0.05)'
    }} className="show-on-mobile-only">
      {items.map(({ key, label, icon: Icon, view }) => (
        <button
          key={key}
          onClick={() => navigate(view)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.2rem',
            color: currentView === view ? 'var(--color-rose-700)' : 'var(--color-text-secondary)',
            fontSize: '0.72rem',
            fontWeight: currentView === view ? 600 : 500,
            padding: '0.35rem 0.5rem'
          }}
        >
          <Icon size={20} color={currentView === view ? 'var(--color-rose-700)' : 'var(--color-text-secondary)'} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};
