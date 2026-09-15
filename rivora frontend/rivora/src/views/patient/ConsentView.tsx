import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, Heart, FileCheck, Eye, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DataService } from '../../services/dataService';

export const ConsentView: React.FC = () => {
  const { navigate, showToast, t } = useApp();
  const [agreed, setAgreed] = useState(true);

  const handleConsent = () => {
    DataService.setConsentStatus(true);
    showToast('Consent recorded securely. Welcome to RIVORA.', 'success');
    navigate('report-upload');
  };

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '680px',
      margin: '2rem auto 4rem',
      padding: '0 1rem'
    }}>
      <div className="rivora-card" style={{ padding: '2.5rem 2.25rem' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-surface)',
            border: '1.5px solid var(--color-pink-300)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-rose-700)',
            marginBottom: '0.85rem'
          }}>
            <ShieldCheck size={24} color="var(--color-success)" />
          </div>

          <h2 style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.45rem' }}>
            {t.trustHeader}
          </h2>
          <p style={{ fontSize: '0.975rem', color: 'var(--color-text-secondary)', maxWidth: '520px', margin: '0 auto' }}>
            {t.consentIntro}
          </p>
        </div>

        {/* Clear, Plain-Language Consent Items */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.15rem',
          backgroundColor: 'var(--color-surface)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          marginBottom: '2rem'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-success)',
              flexShrink: 0,
              boxShadow: 'var(--shadow-xs)'
            }}>
              <CheckCircle2 size={16} />
            </div>
            <div>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-text-primary)', display: 'block', marginBottom: '0.2rem' }}>
                {t.consentItem1Title}
              </strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                {t.consentItem1Desc}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-success)',
              flexShrink: 0,
              boxShadow: 'var(--shadow-xs)'
            }}>
              <CheckCircle2 size={16} />
            </div>
            <div>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-text-primary)', display: 'block', marginBottom: '0.2rem' }}>
                {t.consentItem2Title}
              </strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                {t.consentItem2Desc}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-success)',
              flexShrink: 0,
              boxShadow: 'var(--shadow-xs)'
            }}>
              <CheckCircle2 size={16} />
            </div>
            <div>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-text-primary)', display: 'block', marginBottom: '0.2rem' }}>
                {t.consentItem3Title}
              </strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                {t.consentItem3Desc}
              </p>
            </div>
          </div>

        </div>

        {/* Checkbox agreement */}
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          cursor: 'pointer',
          marginBottom: '2rem',
          userSelect: 'none'
        }}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            style={{ width: '20px', height: '20px', accentColor: 'var(--color-rose-700)', cursor: 'pointer' }}
          />
          <span style={{ fontSize: '0.925rem', color: 'var(--color-text-primary)', fontWeight: 500 }}>
            {t.consentCheckboxText}
          </span>
        </label>

        {/* Action button */}
        <button
          onClick={handleConsent}
          disabled={!agreed}
          className="btn-primary"
          style={{
            width: '100%',
            padding: '0.9rem',
            fontSize: '1.05rem',
            opacity: agreed ? 1 : 0.6,
            cursor: agreed ? 'pointer' : 'not-allowed'
          }}
        >
          <span>{t.continueJourney}</span>
          <ArrowRight size={18} />
        </button>

      </div>
    </div>
  );
};
