import React from 'react';
import { 
  AlertCircle, 
  ArrowRight, 
  MapPin, 
  Wallet, 
  Users, 
  Clock, 
  CheckCircle2, 
  Compass, 
  Building2, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProgressStepper } from '../../components/ProgressStepper';
import { DataService } from '../../services/dataService';
import { AppView } from '../../types';

export const TreatmentDelayRiskView: React.FC = () => {
  const { navigate, t } = useApp();
  const assessment = DataService.getAccessRiskAssessment();

  const getIcon = (name: string) => {
    switch (name) {
      case 'MapPin': return <MapPin size={20} color="var(--color-rose-700)" />;
      case 'Wallet': return <Wallet size={20} color="var(--color-rose-700)" />;
      case 'Users': return <Users size={20} color="var(--color-rose-700)" />;
      default: return <Clock size={20} color="var(--color-rose-700)" />;
    }
  };

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '920px',
      margin: '0 auto 4rem',
      padding: '0 1rem'
    }}>
      
      {/* 6-Stage Progress Stepper */}
      <ProgressStepper activeStepNumber={5} />

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: 'var(--color-caution-bg)',
          color: 'var(--color-caution)',
          padding: '0.25rem 0.75rem',
          borderRadius: '20px',
          fontSize: '0.825rem',
          fontWeight: 600,
          marginBottom: '0.5rem',
          border: '1px solid rgba(217, 138, 77, 0.3)'
        }}>
          <AlertCircle size={14} />
          <span>Step 5 of 6 • Access Barrier Prevention</span>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
          {t.accessRiskTitle}
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', maxWidth: '680px' }}>
          {t.accessRiskSubtitle}
        </p>
      </div>

      {/* Calm Muted Risk Overview Card */}
      <div className="rivora-card" style={{
        backgroundColor: 'var(--color-caution-bg)',
        border: '1.5px solid rgba(217, 138, 77, 0.35)',
        padding: '1.75rem 2rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-caution)',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <AlertCircle size={26} />
            </div>

            <div>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-caution)', letterSpacing: '0.04em' }}>
                Access Assessment Level
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0.1rem 0' }}>
                Moderate Access Risk (6.5 / 10)
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                Driven primarily by travel distance (65 km) and out-of-pocket funding gap (₹3L).
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('care-pathway')}
            className="btn-primary"
            style={{ padding: '0.65rem 1.35rem', fontSize: '0.9rem' }}
          >
            <span>View Full Care Pathway</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Identified Risk Factors Breakdown */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
          Identified Factors Contributing to Care Delays
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {assessment.factors.map((factor, idx) => (
            <div key={idx} className="rivora-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--color-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {getIcon(factor.icon)}
                  </div>
                  <span className={factor.severity === 'high' ? 'badge badge-caution' : factor.severity === 'medium' ? 'badge badge-ai' : 'badge badge-verified'}>
                    {factor.severity === 'high' ? 'High Impact' : factor.severity === 'medium' ? 'Moderate Impact' : 'Well Managed'}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
                  {factor.name}
                </h4>

                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  {factor.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CRITICAL UX RULE: NEVER END ON FEAR — IMMEDIATE CONCRETE NEXT STEPS */}
      <section style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--color-pink-300)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem 1.75rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-pink-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-rose-700)'
          }}>
            <Compass size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {t.possibleNextSteps}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Practical actions designed to eliminate delays before they happen.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {assessment.possibleNextSteps.map((step, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.15rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div style={{ maxWidth: '560px' }}>
                <strong style={{ fontSize: '1rem', color: 'var(--color-text-primary)', display: 'block', marginBottom: '0.2rem' }}>
                  {idx + 1}. {step.title}
                </strong>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                  {step.description}
                </p>
              </div>

              <button
                onClick={() => navigate(step.targetView as AppView)}
                className="btn-secondary"
                style={{ padding: '0.55rem 1.25rem', fontSize: '0.875rem', minHeight: '40px' }}
              >
                <span>{step.actionText}</span>
                <ChevronRight size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* Continuation Action */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <button
            onClick={() => navigate('care-pathway')}
            className="btn-primary"
            style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}
          >
            <span>Proceed to Personalized Care Pathway</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </section>

    </div>
  );
};
