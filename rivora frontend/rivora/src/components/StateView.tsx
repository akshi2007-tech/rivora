import React from 'react';
import { RefreshCw, SearchX, AlertCircle, Compass } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = "Finding the most suitable options for you..." }) => {
  return (
    <div style={{
      padding: '3rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      textAlign: 'center',
      backgroundColor: 'var(--color-bg)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-border)'
    }}>
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-surface)',
        border: '2px solid var(--color-pink-300)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-rose-700)',
        animation: 'spin 1.5s linear infinite'
      }}>
        <RefreshCw size={20} />
      </div>
      <div>
        <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
          {message}
        </h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Reviewing clinical criteria, travel distances, and verified support schemes.
        </p>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction
}) => {
  return (
    <div style={{
      padding: '3rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      textAlign: 'center',
      backgroundColor: 'var(--color-surface)',
      borderRadius: 'var(--radius-lg)',
      border: '1px dashed var(--color-pink-300)'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-rose-700)',
        boxShadow: 'var(--shadow-xs)'
      }}>
        <SearchX size={22} />
      </div>
      <div style={{ maxWidth: '420px' }}>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
          {title}
        </h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          {description}
        </p>
      </div>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="btn-primary"
          style={{ padding: '0.6rem 1.25rem', minHeight: '42px', fontSize: '0.9rem' }}
        >
          <Compass size={15} />
          {actionText}
        </button>
      )}
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong loading this",
  message = "Let's try again. Your saved information is safe.",
  onRetry
}) => {
  return (
    <div style={{
      padding: '2.5rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      textAlign: 'center',
      backgroundColor: 'var(--color-caution-bg)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid rgba(217, 138, 77, 0.3)'
    }}>
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-caution)'
      }}>
        <AlertCircle size={22} />
      </div>
      <div>
        <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
          {title}
        </h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
          {message}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: '#ffffff',
            color: 'var(--color-text-primary)',
            border: '1.5px solid var(--color-border)',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.875rem',
            fontWeight: 600
          }}
        >
          <RefreshCw size={14} />
          Try Again
        </button>
      )}
    </div>
  );
};
