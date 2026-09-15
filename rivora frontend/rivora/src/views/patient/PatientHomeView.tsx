import React from 'react';
import { 
  Heart, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Building2, 
  Wallet, 
  AlertCircle, 
  Calendar, 
  Compass, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProgressStepper } from '../../components/ProgressStepper';
import { StatusBadge } from '../../components/StatusBadge';

export const PatientHomeView: React.FC = () => {
  const { patientData, navigate, t } = useApp();

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
      
      {/* Warm Personal Greeting Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF6F8 100%)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        padding: '2.25rem 2rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ maxWidth: '640px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'var(--color-pink-100)',
            color: 'var(--color-rose-700)',
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.825rem',
            fontWeight: 600,
            marginBottom: '0.75rem'
          }}>
            <Heart size={14} fill="var(--color-pink-300)" />
            <span>{t.oneStepAtATime}</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '0.5rem'
          }}>
            {t.helloPatient}
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.55,
            margin: 0
          }}>
            We've mapped your clinical parameters, identified equipped care centres, and organized financial relief options so you can focus on healing.
          </p>
        </div>

        {/* Primary Unfinished Next Step Button */}
        <div>
          <button
            onClick={() => navigate('patient-info')}
            className="btn-primary"
            style={{
              padding: '0.9rem 1.85rem',
              fontSize: '1.05rem',
              minHeight: '52px'
            }}
          >
            <span>Complete Care Assessment</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* 6-Stage Progress Stepper */}
      <ProgressStepper activeStepNumber={1} />

      {/* Current Journey Highlight Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        
        {/* Next Concrete Appointment Callout */}
        <div className="rivora-card" style={{
          borderLeft: '4px solid var(--color-rose-700)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-rose-700)', letterSpacing: '0.04em' }}>
                Your Next Concrete Step
              </span>
              <span className="badge badge-verified">Confirmed</span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>
              Pre-Surgical Oncology Consultation
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.925rem', marginBottom: '0.35rem' }}>
              <Calendar size={16} color="var(--color-rose-700)" />
              <span>Thursday, 18 Sep • 10:30 AM</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.925rem', marginBottom: '1rem' }}>
              <Building2 size={16} color="var(--color-rose-700)" />
              <span>Centre B — Apex Regional Cancer Centre (Room 204)</span>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>
              Consulting with <strong>Dr. R. Menon</strong> for final surgical scheduling and pre-op clearance.
            </p>
          </div>

          <button
            onClick={() => navigate('follow-up')}
            style={{
              marginTop: '1.25rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '0.65rem 1rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-pink-300)',
              color: 'var(--color-rose-700)',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
          >
            <span>View Appointment & Transit Details</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Financial Gap Summary Callout */}
        <div className="rivora-card" style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-rose-700)', letterSpacing: '0.04em' }}>
                Financial Support Status
              </span>
              <span className="badge badge-ai">67% Identified</span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
              ₹3,00,000 Estimated Out-of-Pocket Gap
            </h3>

            {/* Progress bar */}
            <div style={{
              height: '10px',
              backgroundColor: 'var(--color-border)',
              borderRadius: '5px',
              overflow: 'hidden',
              marginBottom: '0.75rem'
            }}>
              <div style={{
                height: '100%',
                width: '67%',
                backgroundColor: 'var(--color-pink-500)',
                borderRadius: '5px'
              }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', color: 'var(--color-text-secondary)', marginBottom: '0.85rem' }}>
              <span>Total Est: ₹9,00,000</span>
              <span>Potential Support: ₹6,00,000</span>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>
              PMJAY Scheme (₹5L) and Sri Aurobindo Relief Grant (₹1.5L) can bridge this amount without personal debt.
            </p>
          </div>

          <button
            onClick={() => navigate('financial-support')}
            style={{
              marginTop: '1.25rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '0.65rem 1rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-pink-300)',
              color: 'var(--color-rose-700)',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
          >
            <span>Explore 6 Matched Support Schemes</span>
            <ChevronRight size={16} />
          </button>
        </div>

      </div>

      {/* Navigation Cards Grid: Direct Access to All Key Tools */}
      <section>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Explore Your Care Navigation Hub
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
            Every section provides transparent, plain-language guidance tailored to your diagnosis.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem'
        }}>
          
          {/* Card 1: Care Passport */}
          <div 
            onClick={() => navigate('care-passport')}
            className="rivora-card"
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-pink-300)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-rose-700)'
              }}>
                <FileText size={18} />
              </div>
              <StatusBadge status={patientData.clinicalVerification.status} />
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Care Passport
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Stage IIB clinical record, receptor status, and doctor verification.
            </p>
          </div>

          {/* Card 2: Healthcare Matching */}
          <div 
            onClick={() => navigate('healthcare-matching')}
            className="rivora-card"
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-pink-300)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-rose-700)'
              }}>
                <Building2 size={18} />
              </div>
              <span className="badge badge-verified">4 Centres Evaluated</span>
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Care Centre Matching
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Centre B recommended (65 km) for full surgery + oncology specialists.
            </p>
          </div>

          {/* Card 3: Access Risk Assessment */}
          <div 
            onClick={() => navigate('treatment-risk')}
            className="rivora-card"
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-caution-bg)',
                border: '1px solid rgba(217, 138, 77, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-caution)'
              }}>
                <AlertCircle size={18} />
              </div>
              <span className="badge badge-caution">Medium Access Risk</span>
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Delay Risk & Next Steps
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Practical actions to overcome transit distance and financial barriers.
            </p>
          </div>

          {/* Card 5: Care Pathway */}
          <div 
            onClick={() => navigate('care-pathway')}
            className="rivora-card"
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-pink-300)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-rose-700)'
              }}>
                <Compass size={18} />
              </div>
              <span className="badge badge-verified">Stage 3 of 6</span>
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Personalized Pathway
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Step-by-step roadmap from biopsy to recovery and follow-up.
            </p>
          </div>

          {/* Card 6: Follow-up Reminders */}
          <div 
            onClick={() => navigate('follow-up')}
            className="rivora-card"
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-pink-300)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-rose-700)'
              }}>
                <Calendar size={18} />
              </div>
              <span className="badge badge-verified">3 Reminders</span>
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Upcoming Reminders
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Appointment details, lab preparation instructions, and bus vouchers.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
