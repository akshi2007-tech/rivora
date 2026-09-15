import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppView } from '../types';

interface StepDef {
  id: number;
  label: string;
  shortLabel: string;
  view: AppView;
  isSubStep?: boolean;
}

const STEPS: StepDef[] = [
  { id: 1, label: '1. Patient Info', shortLabel: 'Info', view: 'patient-info' },
  { id: 2, label: '2. Care Passport', shortLabel: 'Passport', view: 'care-passport' },
  { id: 3, label: '3. Care Matching', shortLabel: 'Centres', view: 'healthcare-matching' },
  { id: 4, label: '4. Financial Support', shortLabel: 'Finance', view: 'financial-support' },
  { id: 5, label: '5. Risk & Pathway', shortLabel: 'Pathway', view: 'treatment-risk' },
  { id: 6, label: '6. Next Steps', shortLabel: 'Follow-up', view: 'follow-up' }
];

export const ProgressStepper: React.FC<{ activeStepNumber?: number }> = ({ activeStepNumber }) => {
  const { currentView, navigate, patientData } = useApp();

  // Determine current active step based on currentView or props
  let currentStepIndex = 1;
  if (activeStepNumber) {
    currentStepIndex = activeStepNumber;
  } else if (currentView === 'patient-info') {
    currentStepIndex = 1;
  } else if (currentView === 'care-passport') {
    currentStepIndex = 2;
  } else if (currentView === 'healthcare-matching') {
    currentStepIndex = 3;
  } else if (currentView === 'financial-support') {
    currentStepIndex = 4;
  } else if (currentView === 'treatment-risk' || currentView === 'care-pathway') {
    currentStepIndex = 5;
  } else if (currentView === 'follow-up') {
    currentStepIndex = 6;
  } else {
    currentStepIndex = patientData.journeyStep || 3;
  }

  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.25rem 1.5rem',
      marginBottom: '1.75rem',
      boxShadow: 'var(--shadow-xs)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '0.85rem'
      }}>
        <div>
          <span style={{ 
            fontSize: '0.78rem', 
            textTransform: 'uppercase', 
            fontWeight: 700, 
            letterSpacing: '0.05em',
            color: 'var(--color-rose-700)',
            display: 'block'
          }}>
            Step {currentStepIndex} of 6
          </span>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
            {STEPS[currentStepIndex - 1]?.label || 'Care Navigation Pathway'}
          </h4>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ 
            fontSize: '0.8rem', 
            backgroundColor: 'var(--color-pink-50)', 
            color: 'var(--color-rose-700)',
            padding: '0.25rem 0.65rem',
            borderRadius: '12px',
            fontWeight: 600
          }}>
            {Math.round(((currentStepIndex) / 6) * 100)}% Complete
          </span>
        </div>
      </div>

      {/* Visual Stepper Track */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        marginTop: '0.5rem'
      }}>
        {/* Connecting line */}
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '20px',
          right: '20px',
          height: '3px',
          backgroundColor: 'var(--color-border)',
          zIndex: 1
        }}>
          <div style={{
            height: '100%',
            backgroundColor: 'var(--color-pink-500)',
            width: `${((currentStepIndex - 1) / 5) * 100}%`,
            transition: 'width 0.35s ease'
          }} />
        </div>

        {STEPS.map((step) => {
          const isCompleted = step.id < currentStepIndex;
          const isCurrent = step.id === currentStepIndex;

          let nodeBg = '#ffffff';
          let nodeBorder = 'var(--color-border)';
          let textColor = 'var(--color-text-muted)';
          let icon = <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{step.id}</span>;

          if (isCompleted) {
            nodeBg = 'var(--color-pink-100)';
            nodeBorder = 'var(--color-pink-500)';
            textColor = 'var(--color-rose-700)';
            icon = <Check size={14} strokeWidth={2.5} color="var(--color-rose-700)" />;
          } else if (isCurrent) {
            nodeBg = 'var(--color-rose-700)';
            nodeBorder = 'var(--color-pink-300)';
            textColor = '#ffffff';
            icon = <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>{step.id}</span>;
          }

          return (
            <button
              key={step.id}
              onClick={() => navigate(step.view)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.35rem',
                position: 'relative',
                zIndex: 2,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0 4px'
              }}
              title={`Jump to ${step.label}`}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: nodeBg,
                border: `2px solid ${nodeBorder}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isCurrent ? '0 0 0 4px rgba(240, 136, 163, 0.25)' : 'none',
                transition: 'all 0.2s ease'
              }}>
                {icon}
              </div>

              <span style={{
                fontSize: '0.75rem',
                fontWeight: isCurrent ? 700 : isCompleted ? 600 : 500,
                color: isCurrent ? 'var(--color-rose-700)' : isCompleted ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                whiteSpace: 'nowrap'
              }} className="hide-on-mobile">
                {step.shortLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
