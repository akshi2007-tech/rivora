import React from 'react';
import { WifiOff, RefreshCw, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LowConnectivityBanner: React.FC = () => {
  const { isLowConnectivity, offlineQueueCount, syncOfflineData, toggleLowConnectivity } = useApp();

  if (!isLowConnectivity) return null;

  return (
    <div style={{
      backgroundColor: '#FFF6EE',
      borderBottom: '1px solid #FCD9BD',
      padding: '0.6rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '0.875rem',
      color: 'var(--color-caution)',
      position: 'sticky',
      top: 0,
      zIndex: 990
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <WifiOff size={16} style={{ color: 'var(--color-caution)' }} />
        <span>
          <strong>Low Connectivity Mode Active</strong> — updates are securely saved on your device.
          {offlineQueueCount > 0 && (
            <span style={{ marginLeft: '0.4rem', backgroundColor: '#FCD9BD', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>
              {offlineQueueCount} pending {offlineQueueCount === 1 ? 'item' : 'items'}
            </span>
          )}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={syncOfflineData}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--color-rose-700)',
            background: '#ffffff',
            padding: '0.3rem 0.75rem',
            borderRadius: '20px',
            border: '1px solid #FCD9BD'
          }}
        >
          <RefreshCw size={12} />
          Sync Now
        </button>

        <button
          onClick={toggleLowConnectivity}
          style={{
            fontSize: '0.8rem',
            color: 'var(--color-text-secondary)',
            textDecoration: 'underline'
          }}
        >
          Switch to Online
        </button>
      </div>
    </div>
  );
};

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const bg = toast.type === 'success' ? 'var(--color-success-bg)' : toast.type === 'caution' ? 'var(--color-caution-bg)' : 'var(--color-surface)';
  const border = toast.type === 'success' ? 'rgba(79, 162, 119, 0.4)' : toast.type === 'caution' ? 'rgba(217, 138, 77, 0.4)' : 'var(--color-pink-300)';
  const textColor = toast.type === 'success' ? 'var(--color-success)' : toast.type === 'caution' ? 'var(--color-caution)' : 'var(--color-rose-700)';

  return (
    <div style={{
      position: 'fixed',
      bottom: '5.5rem',
      right: '1.5rem',
      backgroundColor: bg,
      border: `1.5px solid ${border}`,
      color: textColor,
      padding: '0.85rem 1.25rem',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-md)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      maxWidth: '380px',
      fontSize: '0.925rem',
      fontWeight: 500,
      animation: 'fadeIn 0.25s ease'
    }}>
      <CheckCircle size={18} />
      <span>{toast.message}</span>
    </div>
  );
};
