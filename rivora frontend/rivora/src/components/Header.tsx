import React, { useState } from 'react';
import {
  ShieldCheck,
  Globe,
  Wifi,
  WifiOff,
  UserCircle,
  ChevronDown,
  LogOut,
  Stethoscope,
  Users,
  Compass,
  FileText,
  Building2,
  Calendar,
  Layers,
  House,
  Wallet
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { PinkRibbon } from './PinkRibbon';

export const Header: React.FC = () => {
  const {
    currentUser,
    currentRole,
    currentView,
    navigate,
    logout,
    addAnotherUser,
    language,
    setLanguage,
    isLowConnectivity,
    toggleLowConnectivity,
    t,
    isAuthenticated
  } = useApp();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'doctor': return <Stethoscope size={16} />;
      case 'healthworker': return <Users size={16} />;
      default: return <UserCircle size={16} />;
    }
  };

  const getRoleLabel = (role: UserRole) => {
    if (language === 'ta') {
      if (role === 'doctor') return 'டாக்டர் மேனன் (மருத்துவர்)';
      if (role === 'healthworker') return 'அனிதா (சுகாதார பணியாளர்)';
      return 'இலட்சுமி (நோயாளி)';
    }
    if (language === 'hi') {
      if (role === 'doctor') return 'डॉ. मेनन (डॉक्टर)';
      if (role === 'healthworker') return 'अनिता (स्वास्थ्य कार्यकर्ता)';
      return 'लक्ष्मी (मरीज़)';
    }
    switch (role) {
      case 'doctor': return 'Dr. Menon (Doctor)';
      case 'healthworker': return 'Anitha (Health Worker)';
      default: return 'Lakshmi (Patient)';
    }
  };

  const roleNavItems = {
    patient: [
      { label: 'Home', view: 'patient-home' as const, icon: House },
      { label: 'Care Passport', view: 'care-passport' as const, icon: FileText },
      { label: 'Financial Follow-ups', view: 'financial-support' as const, icon: Wallet }
    ],
    doctor: [
      { label: 'Doctor Dashboard', view: 'doctor-dashboard' as const, icon: Stethoscope },
      { label: 'Audit Log', view: 'audit-log' as const, icon: Layers }
    ],
    healthworker: [
      { label: 'Health Worker Hub', view: 'healthworker-dashboard' as const, icon: Users },
      { label: 'Patient Intake', view: 'patient-info' as const, icon: FileText }
    ]
  };

  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid var(--color-border)',
      position: 'sticky',
      top: 0,
      zIndex: 900,
      boxShadow: 'var(--shadow-xs)'
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0.75rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {/* Logo & Official Breast Cancer Pink Ribbon */}
        <div 
          onClick={() => {
            if (currentRole === 'patient') navigate('patient-home');
            else if (currentRole === 'doctor') navigate('doctor-dashboard');
            else navigate('healthworker-dashboard');
          }}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-surface)',
            border: '1.5px solid var(--color-pink-300)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <PinkRibbon size={26} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ 
                fontSize: '1.35rem', 
                fontWeight: 700, 
                letterSpacing: '-0.02em', 
                color: 'var(--color-rose-700)'
              }}>
                RIVORA
              </span>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '0.15rem 0.45rem',
                borderRadius: '4px',
                backgroundColor: 'var(--color-pink-100)',
                color: 'var(--color-rose-700)'
              }}>
                {language === 'ta' ? 'சிகிச்சை வழிகாட்டி' : language === 'hi' ? 'देखभाल नेविगेशन' : 'Care Navigation'}
              </span>
            </div>
            <span style={{ 
              fontSize: '0.75rem', 
              color: 'var(--color-text-secondary)',
              display: 'block',
              lineHeight: 1
            }}>
              {t.tagline}
            </span>
          </div>
        </div>

        {isAuthenticated && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }} className="hide-on-mobile">
            {(roleNavItems[currentRole] || []).map(({ label, view, icon: Icon }) => (
              <button
                key={view}
                onClick={() => navigate(view)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: currentView === view ? 600 : 500,
                  color: currentView === view ? 'var(--color-rose-700)' : 'var(--color-text-secondary)',
                  backgroundColor: currentView === view ? 'var(--color-pink-50)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Icon size={15} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        )}

        {/* Right Actions: Trust, Offline, Language, Role */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          
          {/* Reassuring Security Indicator */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              padding: '0.35rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.78rem',
              color: 'var(--color-rose-700)',
              fontWeight: 500
            }}
            title="HIPAA & Consent-Compliant Encrypted Channel"
          >
            <ShieldCheck size={14} style={{ color: 'var(--color-success)' }} />
            <span>🔐 {t.secureConnection}</span>
          </div>

          {/* Low Connectivity Toggle */}
          <button
            onClick={toggleLowConnectivity}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: isLowConnectivity ? 'var(--color-caution-bg)' : '#ffffff',
              border: `1.5px solid ${isLowConnectivity ? 'var(--color-caution)' : 'var(--color-border)'}`,
              padding: '0.35rem 0.65rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              color: isLowConnectivity ? 'var(--color-caution)' : 'var(--color-text-secondary)',
              transition: 'all 0.2s ease'
            }}
            title="Simulate rural low-connectivity offline mode"
          >
            {isLowConnectivity ? <WifiOff size={14} /> : <Wifi size={14} />}
            <span className="hide-on-mobile">{isLowConnectivity ? (language === 'ta' ? 'ஆஃப்லைன்' : language === 'hi' ? 'ऑफलाइन' : 'Offline Mode') : (language === 'ta' ? 'ஆன்லைன்' : language === 'hi' ? 'ऑनलाइन' : 'Online')}</span>
          </button>

          {/* Language Switcher Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                setLangMenuOpen(!langMenuOpen);
                setAccountMenuOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: '#ffffff',
                border: '1.5px solid var(--color-border)',
                padding: '0.35rem 0.7rem',
                borderRadius: '20px',
                fontSize: '0.825rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)'
              }}
            >
              <Globe size={14} style={{ color: 'var(--color-rose-700)' }} />
              <span>{language === 'ta' ? 'தமிழ்' : language === 'hi' ? 'हिन्दी' : 'English'}</span>
              <ChevronDown size={12} />
            </button>

            {langMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '120%',
                right: 0,
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--color-border)',
                minWidth: '150px',
                overflow: 'hidden',
                zIndex: 999
              }}>
                <button
                  onClick={() => { setLanguage('en'); setLangMenuOpen(false); }}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.9rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    color: language === 'en' ? 'var(--color-rose-700)' : 'var(--color-text-primary)',
                    backgroundColor: language === 'en' ? 'var(--color-pink-50)' : 'transparent',
                    fontWeight: language === 'en' ? 600 : 400
                  }}
                >
                  🇬🇧 English
                </button>
                <button
                  onClick={() => { setLanguage('ta'); setLangMenuOpen(false); }}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.9rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    color: language === 'ta' ? 'var(--color-rose-700)' : 'var(--color-text-primary)',
                    backgroundColor: language === 'ta' ? 'var(--color-pink-50)' : 'transparent',
                    fontWeight: language === 'ta' ? 600 : 400
                  }}
                >
                  🇮🇳 தமிழ் (Tamil)
                </button>
                <button
                  onClick={() => { setLanguage('hi'); setLangMenuOpen(false); }}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.9rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    color: language === 'hi' ? 'var(--color-rose-700)' : 'var(--color-text-primary)',
                    backgroundColor: language === 'hi' ? 'var(--color-pink-50)' : 'transparent',
                    fontWeight: language === 'hi' ? 600 : 400
                  }}
                >
                  🇮🇳 हिन्दी (Hindi)
                </button>
              </div>
            )}
          </div>

          {isAuthenticated && currentUser && (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  setAccountMenuOpen(!accountMenuOpen);
                  setLangMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  backgroundColor: 'var(--color-surface)',
                  border: '1.5px solid var(--color-pink-300)',
                  padding: '0.35rem 0.8rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--color-rose-700)'
                }}
              >
                {getRoleIcon(currentRole)}
                <span>{currentUser.name}</span>
                <ChevronDown size={12} />
              </button>

              {accountMenuOpen && (
                <div style={{ position: 'absolute', top: '120%', right: 0, backgroundColor: '#ffffff', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-border)', minWidth: '220px', padding: '0.5rem', zIndex: 999 }}>
                  <div style={{ padding: '0.5rem 0.7rem', borderBottom: '1px solid var(--color-border-subtle)', marginBottom: '0.4rem' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Current user</div>
                    <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '0.2rem' }}>{currentUser.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.15rem' }}>{getRoleLabel(currentRole)}</div>
                  </div>

                  <button
                    onClick={() => {
                      addAnotherUser();
                      setAccountMenuOpen(false);
                    }}
                    style={{ width: '100%', padding: '0.7rem 0.75rem', textAlign: 'left', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: 'var(--color-text-primary)', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <UserCircle size={16} />
                    <span>Add Another User</span>
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setAccountMenuOpen(false);
                    }}
                    style={{ width: '100%', padding: '0.7rem 0.75rem', textAlign: 'left', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: 'var(--color-text-primary)', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
