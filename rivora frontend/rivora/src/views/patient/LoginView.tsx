import React, { useState } from 'react';
import {
  UserCircle,
  Stethoscope,
  Users,
  ShieldCheck,
  ArrowRight,
  Heart,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const LoginView: React.FC = () => {
  const { login, navigate, t } = useApp();
  const roleConfig = {
    patient: {
      label: t.patientRoleLabel,
      icon: UserCircle,
      helper: t.patientRoleHelper,
      emailLabel: t.patientIdLabel,
      demo: 'patient@rivora.demo',
      password: 'patient123'
    },
    doctor: {
      label: t.doctorRoleLabel,
      icon: Stethoscope,
      helper: t.doctorRoleHelper,
      emailLabel: t.doctorIdLabel,
      demo: 'doctor@rivora.demo',
      password: 'doctor123'
    },
    healthworker: {
      label: t.healthworkerRoleLabel,
      icon: Users,
      helper: t.healthworkerRoleHelper,
      emailLabel: t.healthworkerIdLabel,
      demo: 'healthworker@rivora.demo',
      password: 'health123'
    }
  } as const;
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    const ok = await login(selectedRole, identifier, password);
    if (!ok) return;

    if (selectedRole === 'patient') {
      navigate('consent');
    } else if (selectedRole === 'doctor') {
      navigate('doctor-dashboard');
    } else {
      navigate('healthworker-dashboard');
    }
  };

  const activeRole = selectedRole ? roleConfig[selectedRole] : null;

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '560px',
      margin: '2rem auto 4rem',
      padding: '0 1rem'
    }}>
      <div className="rivora-card" style={{ padding: '2.5rem 2rem' }}>
        
        {/* Header Icon */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            backgroundColor: 'var(--color-surface)',
            border: '1.5px solid var(--color-pink-300)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-rose-700)',
            marginBottom: '1rem',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <Heart size={26} fill="var(--color-pink-100)" strokeWidth={2.2} />
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
            {t.loginAs}
          </h2>
          <p style={{ fontSize: '0.925rem', color: 'var(--color-text-secondary)' }}>
            {t.roleSelectionPrompt}
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
            {(['patient', 'doctor', 'healthworker'] as UserRole[]).map((role) => {
              const roleMeta = roleConfig[role];
              const Icon = roleMeta.icon;
              const isSelected = selectedRole === role;

              return (
                <div
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.15rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'var(--color-surface)' : '#ffffff',
                    border: `2px solid ${isSelected ? 'var(--color-rose-700)' : 'var(--color-border)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: isSelected ? 'var(--color-pink-100)' : '#f8f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-rose-700)' }}>
                    <Icon size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '1rem', color: 'var(--color-text-primary)' }}>{roleMeta.label}</strong>
                      {isSelected && <CheckCircle2 size={18} color="var(--color-rose-700)" />}
                    </div>
                    <p style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)', margin: 0 }}>{roleMeta.helper}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {activeRole && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="role-identifier">{activeRole.emailLabel}</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="role-identifier"
                    type="text"
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                    className="form-input"
                    placeholder={activeRole.demo}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="role-password">{t.passwordLabel}</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="role-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="form-input"
                    placeholder={t.enterPassword}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.7rem 0.9rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                {t.demoCredentials}: {activeRole.demo} / {activeRole.password}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={!selectedRole || !identifier || !password}
            style={{ width: '100%', padding: '0.9rem', fontSize: '1.05rem', opacity: selectedRole && identifier && password ? 1 : 0.6 }}
          >
            <span>{t.continueAsRole} {selectedRole ? activeRole?.label : 'Role'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Security Reassurance Footer */}
        <div style={{
          marginTop: '1.75rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          fontSize: '0.825rem',
          color: 'var(--color-text-secondary)'
        }}>
          <ShieldCheck size={16} color="var(--color-success)" />
          <span>{t.secureSessionText}</span>
        </div>

      </div>
    </div>
  );
};
