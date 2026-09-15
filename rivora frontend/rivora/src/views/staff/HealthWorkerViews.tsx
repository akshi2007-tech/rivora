import React from 'react';
import { 
  Users, 
  MapPin, 
  Bus, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Phone, 
  Heart, 
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/StatusBadge';
import { mockAssignedPatients } from '../../data/mockData';

export const HealthWorkerDashboardView: React.FC = () => {
  const { navigate, showToast, patientData } = useApp();

  const handleArrangeTransit = (patientName: string) => {
    showToast(`Issued Rural Transit Voucher for ${patientName} via Direct Bus Route.`, 'success');
  };

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '1080px',
      margin: '0 auto 4rem',
      padding: '0 1rem'
    }}>
      
      {/* Health Worker Header */}
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
            <Users size={28} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Anitha's Community Care Hub
              </h1>
              <span className="badge badge-ai">ASHA Community Lead</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: 0 }}>
              Dharmapuri Rural Health Block • Assisting patients with low digital literacy and rural transit
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('patient-info')}
          className="btn-primary"
          style={{ padding: '0.65rem 1.35rem', fontSize: '0.9rem' }}
        >
          <PlusCircle size={16} />
          <span>Complete Form for a Patient</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        <div className="rivora-card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            Assigned Rural Patients
          </span>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-rose-700)', margin: '0.2rem 0' }}>
            3 Patients
          </h3>
          <small style={{ color: 'var(--color-text-secondary)' }}>Dharmapuri Sector 4</small>
        </div>

        <div className="rivora-card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            Transit Vouchers Issued
          </span>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-success)', margin: '0.2rem 0' }}>
            2 Active Passes
          </h3>
          <small style={{ color: 'var(--color-text-secondary)' }}>Express Bus to Centre B</small>
        </div>

        <div className="rivora-card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            Upcoming Doorstep Check-ins
          </span>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0.2rem 0' }}>
            Tomorrow
          </h3>
          <small style={{ color: 'var(--color-text-secondary)' }}>Pre-op visit for Priya Sundaram</small>
        </div>
      </div>

      {/* Patient Assistance List */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
          Assigned Patients & Care Assistance Actions
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {mockAssignedPatients.map((patient) => {
            const isPriya = patient.id === 'priya-patient';

            return (
              <div key={patient.id} className="rivora-card" style={{
                border: isPriya ? '2px solid var(--color-pink-500)' : '1px solid var(--color-border)',
                backgroundColor: isPriya ? 'var(--color-surface)' : '#ffffff'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-pink-100)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-rose-700)',
                      fontWeight: 700,
                      fontSize: '1.1rem'
                    }}>
                      {patient.name.slice(0, 2).toUpperCase()}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                          {patient.name}
                        </h4>
                        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>({patient.age} yrs)</span>
                        <StatusBadge status={patient.verificationStatus as any} />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: '0.3rem 0' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <MapPin size={14} color="var(--color-rose-700)" />
                          {patient.location}
                        </span>
                        <span><strong>Stage:</strong> {patient.stage}</span>
                        <span style={{ color: 'var(--color-caution)', fontWeight: 600 }}>{patient.riskReason}</span>
                      </div>

                      <div style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)' }}>
                        Needs: <strong>{patient.missingData}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => handleArrangeTransit(patient.name)}
                      className="btn-secondary"
                      style={{ padding: '0.5rem 0.95rem', fontSize: '0.85rem' }}
                    >
                      <Bus size={15} />
                      <span>Issue Bus Pass</span>
                    </button>

                    <button
                      onClick={() => navigate('patient-info')}
                      className="btn-primary"
                      style={{ padding: '0.5rem 1.15rem', fontSize: '0.85rem' }}
                    >
                      <span>Update Care Info</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export const AuditLogView: React.FC = () => {
  const { auditLogs, navigate, t } = useApp();

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '920px',
      margin: '0 auto 4rem',
      padding: '0 1rem'
    }}>
      
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-rose-700)',
          padding: '0.25rem 0.75rem',
          borderRadius: '20px',
          fontSize: '0.825rem',
          fontWeight: 600,
          marginBottom: '0.5rem',
          border: '1px solid var(--color-pink-300)'
        }}>
          <Clock size={14} />
          <span>Security & Governance</span>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
          Transparent Care Audit Trail
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', maxWidth: '640px' }}>
          A secure, immutable record of every clinical update, doctor verification, and data access event.
        </p>
      </div>

      {/* Log list */}
      <div className="rivora-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {auditLogs.map((log) => (
            <div
              key={log.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid var(--color-border)'
              }}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: log.actorRole === 'doctor' ? 'var(--color-success-bg)' : log.actorRole === 'healthworker' ? 'var(--color-pink-100)' : 'var(--color-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: log.actorRole === 'doctor' ? 'var(--color-success)' : 'var(--color-rose-700)',
                flexShrink: 0
              }}>
                <CheckCircle2 size={18} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <strong style={{ fontSize: '0.975rem', color: 'var(--color-text-primary)' }}>
                      {log.action}
                    </strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-rose-700)', backgroundColor: 'var(--color-surface)', padding: '0.1rem 0.45rem', borderRadius: '4px' }}>
                      by {log.actorName} ({log.actorRole})
                    </span>
                  </div>

                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    {log.timestamp}
                  </span>
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: '0.35rem 0 0' }}>
                  {log.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
