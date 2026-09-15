import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Wifi, 
  WifiOff, 
  ChevronRight, 
  ChevronLeft, 
  UserCircle, 
  Stethoscope, 
  Users,
  Compass,
  FileText,
  Building2,
  Wallet,
  Calendar,
  Layers,
  Sparkles,
  Sliders,
  Pin
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppView, UserRole } from '../types';
import { PinkRibbon } from './PinkRibbon';

export const DemoTourBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const { 
    currentRole, 
    switchRole, 
    currentView, 
    navigate, 
    patientData, 
    verifyClinicalInfo, 
    resetVerificationToAI, 
    isLowConnectivity, 
    toggleLowConnectivity, 
    resetDemo,
    language 
  } = useApp();

  const isVerified = patientData.clinicalVerification?.status === 'doctor_verified';

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      setIsOpen(false);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'fixed',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1050,
        display: 'flex',
        alignItems: 'center',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: 'auto'
      }}
    >
      {/* Slide-out Drawer Panel */}
      <div style={{
        width: isOpen ? '310px' : '0px',
        opacity: isOpen ? 1 : 0,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        border: isOpen ? '1.5px solid var(--color-pink-300)' : 'none',
        borderLeft: 'none',
        borderRadius: '0 var(--radius-lg) var(--radius-lg) 0',
        boxShadow: isOpen ? 'var(--shadow-lg)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '85vh',
        overflowY: 'auto'
      }}>
        {isOpen && (
          <div style={{ padding: '1.25rem 1rem', width: '310px' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <PinkRibbon size={18} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-rose-700)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Demo Navigator
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <button
                  onClick={() => setIsPinned(!isPinned)}
                  style={{
                    color: isPinned ? 'var(--color-rose-700)' : 'var(--color-text-muted)',
                    padding: '0.2rem',
                    cursor: 'pointer'
                  }}
                  title={isPinned ? 'Unpin menu (auto-hide on hover away)' : 'Pin menu open'}
                >
                  <Pin size={14} style={{ transform: isPinned ? 'rotate(45deg)' : 'none' }} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{ color: 'var(--color-text-muted)', padding: '0.2rem', cursor: 'pointer' }}
                >
                  <ChevronLeft size={16} />
                </button>
              </div>
            </div>

            {/* Persona Switcher Section */}
            <div style={{ marginBottom: '1.15rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                1. Switch Active Persona
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <button
                  onClick={() => switchRole('patient')}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    textAlign: 'left',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.825rem',
                    fontWeight: currentRole === 'patient' ? 700 : 500,
                    backgroundColor: currentRole === 'patient' ? 'var(--color-pink-100)' : 'transparent',
                    color: currentRole === 'patient' ? 'var(--color-rose-700)' : 'var(--color-text-primary)',
                    border: `1px solid ${currentRole === 'patient' ? 'var(--color-pink-300)' : 'var(--color-border)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <UserCircle size={15} />
                  <span>Lakshmi (Patient)</span>
                </button>

                <button
                  onClick={() => switchRole('doctor')}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    textAlign: 'left',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.825rem',
                    fontWeight: currentRole === 'doctor' ? 700 : 500,
                    backgroundColor: currentRole === 'doctor' ? 'var(--color-pink-100)' : 'transparent',
                    color: currentRole === 'doctor' ? 'var(--color-rose-700)' : 'var(--color-text-primary)',
                    border: `1px solid ${currentRole === 'doctor' ? 'var(--color-pink-300)' : 'var(--color-border)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Stethoscope size={15} />
                  <span>Dr. Menon (Doctor)</span>
                </button>

                <button
                  onClick={() => switchRole('healthworker')}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    textAlign: 'left',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.825rem',
                    fontWeight: currentRole === 'healthworker' ? 700 : 500,
                    backgroundColor: currentRole === 'healthworker' ? 'var(--color-pink-100)' : 'transparent',
                    color: currentRole === 'healthworker' ? 'var(--color-rose-700)' : 'var(--color-text-primary)',
                    border: `1px solid ${currentRole === 'healthworker' ? 'var(--color-pink-300)' : 'var(--color-border)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Users size={15} />
                  <span>Anitha (Health Worker)</span>
                </button>
              </div>
            </div>

            {/* Quick Actions (Verify / Offline / Reset) */}
            <div style={{ marginBottom: '1.15rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                2. Live Demo Triggers
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <button
                  onClick={() => {
                    if (isVerified) {
                      resetVerificationToAI();
                    } else {
                      verifyClinicalInfo('Dr. R. Menon');
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    textAlign: 'left',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    backgroundColor: isVerified ? 'var(--color-success-bg)' : 'var(--color-surface)',
                    color: isVerified ? 'var(--color-success)' : 'var(--color-rose-700)',
                    border: `1px solid ${isVerified ? 'rgba(79, 162, 119, 0.4)' : 'var(--color-pink-300)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem'
                  }}
                >
                  {isVerified ? <CheckCircle2 size={14} /> : <Stethoscope size={14} />}
                  <span>{isVerified ? 'Reset to Intake Draft' : 'Sign Off as Dr. Menon'}</span>
                </button>

                <button
                  onClick={toggleLowConnectivity}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    textAlign: 'left',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    backgroundColor: isLowConnectivity ? 'var(--color-caution-bg)' : '#ffffff',
                    color: isLowConnectivity ? 'var(--color-caution)' : 'var(--color-text-primary)',
                    border: `1px solid ${isLowConnectivity ? 'var(--color-caution)' : 'var(--color-border)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem'
                  }}
                >
                  {isLowConnectivity ? <WifiOff size={14} /> : <Wifi size={14} />}
                  <span>{isLowConnectivity ? 'Disable Offline Mode' : 'Simulate Offline Mode'}</span>
                </button>

                <button
                  onClick={resetDemo}
                  style={{
                    width: '100%',
                    padding: '0.45rem 0.75rem',
                    textAlign: 'left',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem'
                  }}
                >
                  <RotateCcw size={13} />
                  <span>Reset All Demo Data</span>
                </button>
              </div>
            </div>

            {/* Direct Flow Jumps */}
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                3. Jump to Journey Stage
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem' }}>
                {[
                  { label: 'Landing', view: 'landing' as AppView },
                  { label: 'Login', view: 'login' as AppView },
                  { label: 'Consent', view: 'consent' as AppView },
                  { label: 'Home', view: 'patient-home' as AppView },
                  { label: '3-Step Form', view: 'patient-info' as AppView },
                  { label: 'Care Passport', view: 'care-passport' as AppView },
                  { label: 'Matching', view: 'healthcare-matching' as AppView },
                  { label: 'Financial', view: 'financial-support' as AppView },
                  { label: 'Risk Factors', view: 'treatment-risk' as AppView },
                  { label: 'Care Pathway', view: 'care-pathway' as AppView },
                  { label: 'Follow-up', view: 'follow-up' as AppView },
                  { label: 'Doctor Hub', view: 'doctor-dashboard' as AppView },
                  { label: 'Audit Log', view: 'audit-log' as AppView },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (item.view === 'doctor-dashboard') switchRole('doctor');
                      else if (currentRole !== 'patient') switchRole('patient');
                      navigate(item.view);
                    }}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.35rem 0.45rem',
                      textAlign: 'left',
                      borderRadius: '6px',
                      backgroundColor: currentView === item.view ? 'var(--color-pink-100)' : '#f8f8f8',
                      color: currentView === item.view ? 'var(--color-rose-700)' : 'var(--color-text-secondary)',
                      border: `1px solid ${currentView === item.view ? 'var(--color-pink-500)' : '#e5e5e5'}`,
                      fontWeight: currentView === item.view ? 700 : 400,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Vertical Left Edge Trigger Handle (Always Visible) */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: '#ffffff',
          border: '1.5px solid var(--color-pink-300)',
          borderLeft: 'none',
          borderRadius: '0 12px 12px 0',
          padding: '0.75rem 0.4rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          cursor: 'pointer',
          boxShadow: '2px 0 10px rgba(194, 77, 107, 0.12)',
          userSelect: 'none'
        }}
        title="Hover or click to open Demo Navigator"
      >
        <PinkRibbon size={16} />
        <span style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: 'var(--color-rose-700)',
          textTransform: 'uppercase'
        }}>
          Demo Tools
        </span>
        <ChevronRight size={14} color="var(--color-rose-700)" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </div>

    </div>
  );
};
