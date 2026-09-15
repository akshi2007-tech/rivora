import React from 'react';
import { 
  Compass, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Calendar, 
  Building2, 
  FileText, 
  ShieldCheck, 
  Stethoscope, 
  Users 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProgressStepper } from '../../components/ProgressStepper';
import { mockCarePathway } from '../../data/mockData';

export const CarePathwayView: React.FC = () => {
  const { navigate, t } = useApp();

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '860px',
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
          backgroundColor: 'var(--color-pink-100)',
          color: 'var(--color-rose-700)',
          padding: '0.25rem 0.75rem',
          borderRadius: '20px',
          fontSize: '0.825rem',
          fontWeight: 600,
          marginBottom: '0.5rem'
        }}>
          <Compass size={14} />
          <span>Step 5 of 6 • Your Care Pathway</span>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
          Your Personalized Care Pathway
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', maxWidth: '640px' }}>
          "I know what happens next." A clear, sequential roadmap from diagnosis through surgery, financial clearance, and long-term recovery.
        </p>
      </div>

      {/* Vertical Connected Pathway Roadmap */}
      <div style={{
        position: 'relative',
        paddingLeft: '2rem',
        marginBottom: '2.5rem'
      }}>
        {/* Continuous soft pink pathway line */}
        <div style={{
          position: 'absolute',
          top: '20px',
          bottom: '20px',
          left: '19px',
          width: '3px',
          backgroundColor: 'var(--color-pink-300)',
          zIndex: 1
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {mockCarePathway.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';

            return (
              <div key={step.id} style={{ position: 'relative', zIndex: 2 }}>
                
                {/* Pathway Node Pin */}
                <div style={{
                  position: 'absolute',
                  left: '-2rem',
                  top: '1.25rem',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: isCompleted ? 'var(--color-pink-100)' : isCurrent ? 'var(--color-rose-700)' : '#ffffff',
                  border: `2.5px solid ${isCompleted ? 'var(--color-pink-500)' : isCurrent ? 'var(--color-pink-300)' : 'var(--color-border)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isCompleted ? 'var(--color-rose-700)' : isCurrent ? '#ffffff' : 'var(--color-text-muted)',
                  boxShadow: isCurrent ? '0 0 0 5px rgba(240, 136, 163, 0.3)' : 'var(--shadow-xs)'
                }}>
                  {isCompleted ? (
                    <CheckCircle2 size={20} strokeWidth={2.5} />
                  ) : isCurrent ? (
                    <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{idx + 1}</span>
                  ) : (
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{idx + 1}</span>
                  )}
                </div>

                {/* Pathway Card */}
                <div className="rivora-card" style={{
                  marginLeft: '1.25rem',
                  border: isCurrent ? '2px solid var(--color-rose-700)' : '1px solid var(--color-border)',
                  backgroundColor: isCurrent ? 'var(--color-surface)' : '#ffffff',
                  boxShadow: isCurrent ? 'var(--shadow-md)' : 'var(--shadow-xs)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        {step.stageName}
                      </h3>
                      {isCurrent && (
                        <span className="badge badge-ai" style={{ fontWeight: 700 }}>
                          ★ You Are Here
                        </span>
                      )}
                      {isCompleted && (
                        <span className="badge badge-verified">
                          Completed
                        </span>
                      )}
                    </div>

                    <span style={{
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      color: isCurrent ? 'var(--color-rose-700)' : 'var(--color-text-muted)',
                      backgroundColor: isCurrent ? 'var(--color-pink-100)' : '#f8f8f8',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '12px'
                    }}>
                      {step.dateOrDuration}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
                    {step.summary}
                  </p>

                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: '0 0 0.75rem' }}>
                    {step.details}
                  </p>

                  {step.assignedEntity && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.8rem',
                      color: 'var(--color-rose-700)',
                      backgroundColor: isCurrent ? '#ffffff' : 'var(--color-surface)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      width: 'fit-content'
                    }}>
                      <Stethoscope size={14} />
                      <span><strong>Lead:</strong> {step.assignedEntity}</span>
                    </div>
                  )}

                  {isCurrent && (
                    <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => navigate('follow-up')}
                        className="btn-primary"
                        style={{ padding: '0.55rem 1.25rem', fontSize: '0.875rem', minHeight: '38px' }}
                      >
                        <span>View Next Appointment Details</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Continuation Footer */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-rose-700)', textTransform: 'uppercase' }}>
            Final Journey Stage
          </span>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
            Review Your Upcoming Follow-ups & Reminders
          </h4>
        </div>

        <button
          onClick={() => navigate('follow-up')}
          className="btn-primary"
          style={{ padding: '0.85rem 1.85rem', fontSize: '1rem' }}
        >
          <span>Continue to Follow-up</span>
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
};
