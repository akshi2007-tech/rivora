import React, { useState } from 'react';
import { 
  Stethoscope, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  Clock, 
  FileText, 
  User, 
  ArrowRight, 
  History, 
  Calendar, 
  Check, 
  Building2,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/StatusBadge';
import { mockAssignedPatients } from '../../data/mockData';

export const DoctorDashboardView: React.FC = () => {
  const { patientData, verifyClinicalInfo, resetVerificationToAI, navigate, showToast } = useApp();
  const [verificationNotes, setVerificationNotes] = useState('Confirmed Stage IIB (cT2 N1 M0) ER+/PR+ diagnosis from biopsy #DHP-8492. Cleared for Breast Conserving Surgery and adjuvant oncology at Centre B.');
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const isLakshmiVerified = patientData.clinicalVerification?.status === 'doctor_verified';

  const handleVerifyLakshmi = () => {
    verifyClinicalInfo('Dr. R. Menon', verificationNotes);
    setIsEditingNotes(false);
  };

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '1080px',
      margin: '0 auto 4rem',
      padding: '0 1rem'
    }}>
      
      {/* Doctor Portal Header */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem 2rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        boxShadow: 'var(--shadow-xs)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            backgroundColor: 'var(--color-surface)',
            border: '1.5px solid var(--color-pink-300)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-rose-700)'
          }}>
            <Stethoscope size={28} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Dr. R. Menon's Clinical Console
              </h1>
              <span className="badge badge-verified">Senior Surgical Oncologist</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: 0 }}>
              Apex Regional Cancer Centre (Centre B) • Multidisciplinary Breast Care Board
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => navigate('audit-log')}
            className="btn-secondary"
            style={{ padding: '0.6rem 1.15rem', fontSize: '0.875rem' }}
          >
            <History size={16} />
            <span>View Audit Log</span>
          </button>

          <button
            onClick={() => navigate('care-passport')}
            className="btn-primary"
            style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}
          >
            <span>Open Lakshmi's Passport</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        <div className="rivora-card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            Pending Clinical Verifications
          </span>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: isLakshmiVerified ? 'var(--color-success)' : 'var(--color-rose-700)', margin: '0.2rem 0' }}>
            {isLakshmiVerified ? '0 Pending' : '1 Pending (Lakshmi)'}
          </h3>
          <small style={{ color: 'var(--color-text-secondary)' }}>Clinical intake & pathology reports</small>
        </div>

        <div className="rivora-card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            High Access Risk Patients
          </span>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-caution)', margin: '0.2rem 0' }}>
            2 Monitored
          </h3>
          <small style={{ color: 'var(--color-text-secondary)' }}>Distance &gt; 60km or funding gap</small>
        </div>

        <div className="rivora-card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            Scheduled Surgery Consultations
          </span>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0.2rem 0' }}>
            3 This Week
          </h3>
          <small style={{ color: 'var(--color-text-secondary)' }}>Thursday 10:30 AM: Lakshmi</small>
        </div>
      </div>

      {/* PRIYA CLINICAL VERIFICATION WORKBENCH */}
      <div className="rivora-card" style={{
        border: isLakshmiVerified ? '1.5px solid rgba(79, 162, 119, 0.4)' : '2px solid var(--color-rose-700)',
        backgroundColor: isLakshmiVerified ? 'var(--color-success-bg)' : '#ffffff',
        padding: '2rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-rose-700)',
                padding: '0.15rem 0.5rem',
                borderRadius: '4px',
                border: '1px solid var(--color-pink-300)'
              }}>
                Actionable Patient Record #CP-84920
              </span>
              <StatusBadge status={isLakshmiVerified ? 'doctor_verified' : 'ai_assisted'} />
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              Lakshmi Narayanan (48y F) — Clinical Verification Review
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>
              Referred from Dharmapuri Rural Unit • Target Procedure: Breast Conserving Surgery + Adjuvant Oncology
            </p>
          </div>

          <div>
            {isLakshmiVerified ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="badge badge-verified" style={{ padding: '0.5rem 0.9rem' }}>
                  <CheckCircle2 size={16} />
                  <span>Verified by Dr. R. Menon</span>
                </span>
                <button
                  onClick={resetVerificationToAI}
                  className="btn-secondary"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                  title="Reset status for demo purposes"
                >
                  Reset for Demo
                </button>
              </div>
            ) : (
              <button
                onClick={handleVerifyLakshmi}
                className="btn-primary"
                style={{ padding: '0.7rem 1.6rem', fontSize: '0.95rem' }}
              >
                <CheckCircle2 size={18} />
                <span>Verify & Sign Off Record</span>
              </button>
            )}
          </div>
        </div>

        {/* Clinical Snapshot for Verification */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          backgroundColor: '#ffffff',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          marginBottom: '1.25rem'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Extracted Histology
            </span>
            <p style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0.15rem 0 0' }}>
              {patientData.diagnosis}
            </p>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Patient Passport Open</h2>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              TNM Staging
            </span>
            <p style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0.15rem 0 0' }}>
              {patientData.stage}
            </p>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Biomarkers & Proliferation
            </span>
            <p style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0.15rem 0 0' }}>
              {patientData.biomarkers}
            </p>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Logistics Alert
            </span>
            <p style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--color-rose-700)', margin: '0.15rem 0 0' }}>
              65 km distance • ASHA Bus Arranged
            </p>
          </div>
        </div>

        {/* Doctor's Clinical Verification Notes Field */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Doctor Sign-off Notes & Verification Summary</span>
            {!isEditingNotes && (
              <button
                type="button"
                onClick={() => setIsEditingNotes(true)}
                style={{ fontSize: '0.8rem', color: 'var(--color-rose-700)', textDecoration: 'underline' }}
              >
                Edit Notes
              </button>
            )}
          </label>
          <textarea
            value={verificationNotes}
            onChange={(e) => setVerificationNotes(e.target.value)}
            disabled={!isEditingNotes && isLakshmiVerified}
            rows={2}
            className="form-textarea"
            style={{ fontSize: '0.9rem', backgroundColor: '#ffffff' }}
          />
        </div>

      </div>

      {/* Monitored Patients Queue */}
      <section>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            All Assigned Patients in Care Stream
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            Patients actively navigating breast cancer treatment pathways.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {mockAssignedPatients.map((p) => {
            const isLakshmi = p.id === 'priya-patient';
            const status = isLakshmi && isLakshmiVerified ? 'doctor_verified' : p.verificationStatus as any;

            return (
              <div key={p.id} className="rivora-card" style={{ padding: '1.25rem 1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      color: 'var(--color-rose-700)'
                    }}>
                      {p.name.slice(0, 2).toUpperCase()}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                          {p.name}
                        </h4>
                        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>({p.age}y)</span>
                        <StatusBadge status={status} />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
                        <span><strong>Stage:</strong> {p.stage}</span>
                        <span><strong>Location:</strong> {p.location}</span>
                        <span><strong>Access Barrier:</strong> {p.riskReason}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('care-passport')}
                    className="btn-secondary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                  >
                    <span>Inspect Record</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
