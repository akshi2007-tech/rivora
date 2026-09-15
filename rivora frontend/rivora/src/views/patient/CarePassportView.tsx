import React from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  User, 
  MapPin, 
  Phone, 
  Calendar, 
  Share2, 
  Printer, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  Stethoscope, 
  Wallet,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProgressStepper } from '../../components/ProgressStepper';
import { StatusBadge } from '../../components/StatusBadge';

export const CarePassportView: React.FC = () => {
  const { patientData, verifyClinicalInfo, resetVerificationToAI, navigate, showToast, currentRole, t } = useApp();
  const isVerified = patientData.clinicalVerification?.status === 'doctor_verified';

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Secure Care Passport link copied to clipboard.', 'success');
  };

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '860px',
      margin: '0 auto 4rem',
      padding: '0 1rem'
    }}>
      
      {/* 6-Stage Progress Stepper */}
      <ProgressStepper activeStepNumber={2} />

      {/* Intro Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: 'var(--color-pink-100)',
          color: 'var(--color-rose-700)',
          padding: '0.3rem 0.85rem',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '0.6rem'
        }}>
          <FileText size={15} />
          <span>The Emotional Centerpiece</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
          Your RIVORA Care Passport
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', maxWidth: '580px', margin: '0 auto' }}>
          "Everything important about my care, in one calm and trustworthy place."
        </p>
      </div>

      {/* Doctor Verification Banner Callout */}
      <div style={{
        backgroundColor: isVerified ? 'var(--color-success-bg)' : 'var(--color-surface)',
        border: `1.5px solid ${isVerified ? 'rgba(79, 162, 119, 0.4)' : 'var(--color-pink-300)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isVerified ? 'var(--color-success)' : 'var(--color-rose-700)',
            boxShadow: 'var(--shadow-xs)'
          }}>
            {isVerified ? <CheckCircle2 size={22} /> : <Stethoscope size={22} />}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
                {isVerified ? 'Doctor Verified Clinical Record' : 'Clinical Intake Record — Pending Oncologist Sign-off'}
              </h4>
              <StatusBadge status={isVerified ? 'doctor_verified' : 'ai_assisted'} />
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: '0.2rem 0 0' }}>
              {isVerified 
                ? `Verified by Dr. R. Menon (${patientData.clinicalVerification?.verifiedAt || 'Today'}). Suitable for hospital admission & PMJAY approvals.`
                : 'Consolidated from diagnostic histopathology report #DHP-8492. Dr. Menon can sign off in 1 click.'}
            </p>
          </div>
        </div>

        {/* Verification Action (Accessible to doctors or demoers) */}
        <div>
          {isVerified ? (
            <button
              onClick={resetVerificationToAI}
              className="btn-secondary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', minHeight: '40px' }}
              title="Toggle back to clinical intake state for demonstration"
            >
              <span>Reset to Clinical Draft</span>
            </button>
          ) : (
            <button
              onClick={() => verifyClinicalInfo('Dr. R. Menon')}
              className="btn-primary"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.9rem', minHeight: '40px', backgroundColor: 'var(--color-rose-700)' }}
            >
              <Stethoscope size={16} />
              <span>Verify as Dr. Menon</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Single Care Passport Document Card */}
      <div className="rivora-card" style={{
        padding: '2.5rem 2.25rem',
        boxShadow: 'var(--shadow-md)',
        border: '1.5px solid var(--color-border)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Top Watermark Badge */}
        <div style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: 'var(--color-surface)',
          padding: '0.3rem 0.75rem',
          borderRadius: '20px',
          border: '1px solid var(--color-pink-300)',
          fontSize: '0.78rem',
          color: 'var(--color-rose-700)',
          fontWeight: 600
        }}>
          <ShieldCheck size={14} />
          <span>Official Care Record #CP-84920</span>
        </div>

        {/* Patient Identity Header */}
        <div style={{
          borderBottom: '1.5px solid var(--color-border)',
          paddingBottom: '1.5rem',
          marginBottom: '1.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-pink-100)',
              border: '2px solid var(--color-pink-300)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--color-rose-700)'
            }}>
              PS
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {patientData.fullName}
                </h2>
                <StatusBadge status="patient_provided" label="Patient Verified" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', marginTop: '0.35rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <User size={15} color="var(--color-rose-700)" />
                  <span>{patientData.age} Years Old (Female)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={15} color="var(--color-rose-700)" />
                  <span>{patientData.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Phone size={15} color="var(--color-rose-700)" />
                  <span>{patientData.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Clinical Diagnosis & Staging (AI-assisted / Doctor-verified) */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Stethoscope size={18} color="var(--color-rose-700)" />
              <span>Clinical Diagnosis & Receptor Profile</span>
            </h3>
            <StatusBadge status={isVerified ? 'doctor_verified' : 'ai_assisted'} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            backgroundColor: 'var(--color-surface)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)'
          }}>
            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Pathology Diagnosis
              </span>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0.15rem 0 0' }}>
                {patientData.diagnosis}
              </p>
            </div>

            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Confirmed Staging
              </span>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0.15rem 0 0' }}>
                {patientData.stage}
              </p>
            </div>

            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Biomarkers & IHC Profile
              </span>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0.15rem 0 0' }}>
                {patientData.biomarkers}
              </p>
            </div>

            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Initial Referral Centre
              </span>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0.15rem 0 0' }}>
                {patientData.currentHospital}
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Required Care & Clinical Next Steps */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building2 size={18} color="var(--color-rose-700)" />
              <span>Required Care Spectrum</span>
            </h3>
            <StatusBadge status={isVerified ? 'doctor_verified' : 'ai_assisted'} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {patientData.requiredCare.map((careItem, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--color-border)'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-pink-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-rose-700)',
                  fontSize: '0.8rem',
                  fontWeight: 700
                }}>
                  {idx + 1}
                </div>
                <span style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {careItem}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Access & Logistics Parameters */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Wallet size={18} color="var(--color-rose-700)" />
              <span>Access & Funding Profile</span>
            </h3>
            <StatusBadge status="patient_provided" />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: '#ffffff' }}>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Travel Tolerance
              </span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-rose-700)', margin: '0.2rem 0 0' }}>
                Up to {patientData.travelToleranceKm} km
              </h4>
              <small style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Regional bus / rail transit</small>
            </div>

            <div style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: '#ffffff' }}>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Estimated Funding Gap
              </span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-rose-700)', margin: '0.2rem 0 0' }}>
                ₹{patientData.financialGap.toLocaleString('en-IN')}
              </h4>
              <small style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Eligible for PMJAY & Grants</small>
            </div>

            <div style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: '#ffffff' }}>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Key Barriers Identified
              </span>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0.2rem 0 0' }}>
                {patientData.accessBarriers.length} Factors Listed
              </h4>
              <small style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Transit & Specialist Wait</small>
            </div>
          </div>
        </div>

        {/* Passport Actions Toolbar */}
        <div style={{
          borderTop: '1.5px solid var(--color-border)',
          paddingTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={handlePrint}
              className="btn-secondary"
              style={{ padding: '0.6rem 1.15rem', fontSize: '0.875rem' }}
            >
              <Printer size={16} />
              <span>Print Passport</span>
            </button>

            <button
              onClick={handleShare}
              className="btn-secondary"
              style={{ padding: '0.6rem 1.15rem', fontSize: '0.875rem' }}
            >
              <Share2 size={16} />
              <span>Share Secure Link</span>
            </button>
          </div>

          <button
            onClick={() => navigate('healthcare-matching')}
            className="btn-primary"
            style={{ padding: '0.75rem 1.85rem', fontSize: '1rem' }}
          >
            <span>Proceed to Healthcare Matching</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};
