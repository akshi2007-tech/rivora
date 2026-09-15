import React from 'react';
import { Compass } from 'lucide-react';

interface WhyCalloutProps {
  reason: string;
  title?: string;
}

export const WhyCallout: React.FC<WhyCalloutProps> = ({ reason, title = 'Why this is recommended for you:' }) => {
  if (!reason) return null;

  return (
    <div className="reason-box">
      <Compass size={18} style={{ color: 'var(--color-rose-700)', flexShrink: 0, marginTop: '2px' }} />
      <div>
        <span style={{ 
          fontSize: '0.8rem', 
          fontWeight: 600, 
          textTransform: 'uppercase', 
          letterSpacing: '0.04em',
          color: 'var(--color-rose-700)',
          display: 'block',
          marginBottom: '2px'
        }}>
          {title}
        </span>
        <p style={{ fontSize: '0.925rem', color: 'var(--color-text-primary)', lineHeight: 1.5 }}>
          {reason}
        </p>
      </div>
    </div>
  );
};
