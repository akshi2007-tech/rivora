import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Stethoscope, 
  Bus, 
  FileText, 
  CheckCircle2, 
  Phone, 
  ArrowRight, 
  Heart, 
  Download, 
  Sparkles,
  Users,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProgressStepper } from '../../components/ProgressStepper';
import { mockAppointments } from '../../data/mockData';
import { AppointmentReminder } from '../../types';

export const FollowUpView: React.FC = () => {
  const { navigate, showToast, t } = useApp();
  const [appointments, setAppointments] = useState<AppointmentReminder[]>(mockAppointments);
  const [activeModalApt, setActiveModalApt] = useState<AppointmentReminder | null>(null);

  const primaryAppointment = appointments[0]; // Thursday consultation
  const upcomingReminders = appointments.slice(1);

  const handleConfirmSlot = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'confirmed' } : a));
    showToast('Slot confirmed with hospital scheduler.', 'success');
  };

  const handleDownloadPass = () => {
    showToast('Downloaded RIVORA Patient Travel & Consultation Slip.', 'success');
  };

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '860px',
      margin: '0 auto 4rem',
      padding: '0 1rem'
    }}>
      
      {/* 6-Stage Progress Stepper */}
      <ProgressStepper activeStepNumber={6} />

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
          <Calendar size={14} />
          <span>Step 6 of 6 • Follow-up & Next Actions</span>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
          Your Next Step
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', maxWidth: '640px' }}>
          A calm, focused view of exactly what happens next. No complicated calendars — just simple, confirmed actions.
        </p>
      </div>

      {/* PRIMARY CONCRETE ACTION CARD (HERO FOCUS) */}
      <div className="rivora-card" style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF6F8 100%)',
        border: '2px solid var(--color-rose-700)',
        padding: '2.25rem 2rem',
        marginBottom: '2.5rem',
        boxShadow: 'var(--shadow-md)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '-12px',
          left: '1.5rem',
          backgroundColor: 'var(--color-rose-700)',
          color: '#ffffff',
          padding: '0.2rem 0.8rem',
          borderRadius: '12px',
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.04em'
        }}>
          Immediate Priority
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginTop: '0.35rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.45rem' }}>
              {primaryAppointment.title}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-rose-700)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.85rem' }}>
              <Stethoscope size={18} />
              <span>{primaryAppointment.specialist}</span>
            </div>
          </div>

          <span className="badge badge-verified" style={{ padding: '0.4rem 0.9rem', fontSize: '0.875rem' }}>
            <CheckCircle2 size={15} />
            <span>Confirmed Appointment</span>
          </span>
        </div>

        {/* Date, Time & Location Highlights */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          backgroundColor: '#ffffff',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          margin: '1rem 0 1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <Calendar size={18} color="var(--color-rose-700)" style={{ marginTop: '2px' }} />
            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>Date & Time</span>
              <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--color-text-primary)' }}>
                {primaryAppointment.date}
              </strong>
              <small style={{ color: 'var(--color-rose-700)', fontWeight: 600 }}>{primaryAppointment.time}</small>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <MapPin size={18} color="var(--color-rose-700)" style={{ marginTop: '2px' }} />
            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>Hospital Location</span>
              <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--color-text-primary)' }}>
                Centre B — OPD Block Room 204
              </strong>
              <small style={{ color: 'var(--color-text-secondary)' }}>Salem-Bangalore Highway (65 km)</small>
            </div>
          </div>
        </div>

        {/* Patient Instructions Callout */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          borderLeft: '3.5px solid var(--color-pink-500)',
          padding: '0.85rem 1.15rem',
          borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
          fontSize: '0.925rem',
          color: 'var(--color-text-primary)',
          marginBottom: '1.5rem'
        }}>
          <strong>What to bring with you: </strong>
          <span>{primaryAppointment.instructions}</span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleDownloadPass}
            className="btn-primary"
            style={{ padding: '0.75rem 1.6rem', fontSize: '0.95rem' }}
          >
            <Download size={16} />
            <span>Download Appointment & Travel Slip</span>
          </button>

          <button
            onClick={() => {
              showToast('Direct helpline for Dr. Menon OPD: +91 427 244 8900', 'info');
            }}
            className="btn-secondary"
            style={{ padding: '0.75rem 1.4rem', fontSize: '0.95rem' }}
          >
            <Phone size={16} />
            <span>Call OPD Helpdesk</span>
          </button>
        </div>

      </div>

      {/* UPCOMING SUPPORTING REMINDER CARDS */}
      <section style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
          Supporting Preparations & Milestones
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {upcomingReminders.map((rem) => (
            <div key={rem.id} className="rivora-card" style={{ padding: '1.35rem 1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: rem.type === 'transport' ? 'var(--color-pink-100)' : 'var(--color-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-rose-700)',
                    flexShrink: 0
                  }}>
                    {rem.type === 'transport' ? <Bus size={18} /> : <FileText size={18} />}
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.2rem' }}>
                      {rem.title}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>
                      <span><strong>Date:</strong> {rem.date}</span>
                      <span><strong>Time:</strong> {rem.time}</span>
                      <span><strong>Location:</strong> {rem.location}</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>
                      {rem.instructions}
                    </p>
                  </div>
                </div>

                <div>
                  {rem.status === 'confirmed' ? (
                    <span className="badge badge-verified">
                      <CheckCircle2 size={13} />
                      <span>Arranged</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleConfirmSlot(rem.id)}
                      className="btn-soft"
                      style={{ padding: '0.4rem 0.95rem', fontSize: '0.825rem' }}
                    >
                      <span>{rem.actionPrompt}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reassuring Closing Message */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-pink-300)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-rose-700)',
          marginBottom: '0.75rem',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <Heart size={22} fill="var(--color-pink-100)" />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
          "You've completed your initial care navigation pathway."
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', maxWidth: '520px', margin: '0 auto 1.5rem' }}>
          Your records are safe, your care centre is matched, and funding applications are structured. We are with you every step of the way.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('patient-home')}
            className="btn-secondary"
            style={{ padding: '0.75rem 1.5rem' }}
          >
            <span>Return to Care Home</span>
          </button>

          <button
            onClick={() => navigate('care-passport')}
            className="btn-primary"
            style={{ padding: '0.75rem 1.75rem' }}
          >
            <span>Review Full Care Passport</span>
          </button>
        </div>
      </div>

    </div>
  );
};
