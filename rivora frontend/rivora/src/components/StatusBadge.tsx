import React from 'react';
import { CheckCircle2, ClipboardCheck, User, AlertCircle, HelpCircle, Clock } from 'lucide-react';
import { VerificationStatus } from '../types';

interface StatusBadgeProps {
  status: VerificationStatus | 'potentially_relevant' | 'caution' | 'pending';
  label?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, size = 'md' }) => {
  const isSm = size === 'sm';
  const sizeStyle = isSm 
    ? { fontSize: '0.75rem', padding: '0.2rem 0.6rem' } 
    : { fontSize: '0.825rem', padding: '0.35rem 0.8rem' };

  if (status === 'doctor_verified') {
    return (
      <span className="badge badge-verified" style={sizeStyle}>
        <CheckCircle2 size={isSm ? 12 : 14} />
        {label || 'Doctor verified'}
      </span>
    );
  }

  if (status === 'ai_assisted' || status === 'care_team_review') {
    return (
      <span className="badge badge-ai" style={sizeStyle}>
        <Clock size={isSm ? 12 : 14} />
        {label || 'Care team intake — review required'}
      </span>
    );
  }

  if (status === 'patient_provided') {
    return (
      <span className="badge badge-provided" style={sizeStyle}>
        <User size={isSm ? 12 : 14} />
        {label || 'Patient provided'}
      </span>
    );
  }

  if (status === 'caution') {
    return (
      <span className="badge badge-caution" style={sizeStyle}>
        <AlertCircle size={isSm ? 12 : 14} />
        {label || 'Needs attention'}
      </span>
    );
  }

  return (
    <span className="badge badge-potential" style={sizeStyle}>
      <HelpCircle size={isSm ? 12 : 14} />
      {label || 'Potentially relevant'}
    </span>
  );
};
