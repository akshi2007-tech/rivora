import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Phone, 
  ArrowRight, 
  Check, 
  Filter, 
  Sparkles, 
  Info,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProgressStepper } from '../../components/ProgressStepper';
import { WhyCallout } from '../../components/WhyCallout';
import { DataService } from '../../services/dataService';
import { HospitalMatch } from '../../types';

export const HealthcareMatchingView: React.FC = () => {
  const { patientData, selectedHospital, selectHospital, navigate, t } = useApp();
  const [hospitals] = useState<HospitalMatch[]>(DataService.getHospitalMatches(patientData.travelToleranceKm));
  const [filterOnlyFullyEquipped, setFilterOnlyFullyEquipped] = useState(false);

  const displayedHospitals = filterOnlyFullyEquipped 
    ? hospitals.filter(h => h.surgeryAvailable && h.oncologyAvailable) 
    : hospitals;

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '920px',
      margin: '0 auto 4rem',
      padding: '0 1rem'
    }}>
      
      {/* 6-Stage Progress Stepper */}
      <ProgressStepper activeStepNumber={3} />

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
          <Building2 size={14} />
          <span>Step 3 of 6 • Healthcare Matching</span>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
          Care options that may work for you
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', maxWidth: '680px' }}>
          We evaluate surgical capacity, specialist oncologist availability, and waiting times to find hospitals equipped for Stage II breast cancer care.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        backgroundColor: '#ffffff',
        padding: '0.85rem 1.25rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        marginBottom: '1.75rem',
        boxShadow: 'var(--shadow-xs)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
          <Filter size={16} color="var(--color-rose-700)" />
          <span>Showing <strong>{displayedHospitals.length}</strong> evaluated centres for {patientData.location}</span>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>
          <input
            type="checkbox"
            checked={filterOnlyFullyEquipped}
            onChange={(e) => setFilterOnlyFullyEquipped(e.target.checked)}
            style={{ width: '16px', height: '16px', accentColor: 'var(--color-rose-700)' }}
          />
          <span>Show only centres with On-Site Medical Oncology</span>
        </label>
      </div>

      {/* Hospital Recommendation Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {displayedHospitals.map((hospital) => {
          const isSelected = selectedHospital?.id === hospital.id;

          return (
            <div
              key={hospital.id}
              className="rivora-card"
              style={{
                border: isSelected ? '2px solid var(--color-rose-700)' : hospital.isRecommended ? '1.5px solid var(--color-pink-500)' : '1px solid var(--color-border)',
                backgroundColor: isSelected ? 'var(--color-surface)' : '#ffffff',
                position: 'relative'
              }}
            >
              {/* Top Recommended Tag */}
              {hospital.isRecommended && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '1.5rem',
                  backgroundColor: 'var(--color-rose-700)',
                  color: '#ffffff',
                  padding: '0.2rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  boxShadow: 'var(--shadow-xs)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  <Sparkles size={12} />
                  <span>Top Care Recommendation</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginTop: hospital.isRecommended ? '0.5rem' : 0 }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                    {hospital.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <MapPin size={15} color="var(--color-rose-700)" />
                      <span><strong>{hospital.distanceKm} km away</strong> ({hospital.travelTime})</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={15} color="var(--color-caution)" />
                      <span>Avg Wait: <strong>{hospital.waitingTimeDays} Days</strong></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Phone size={14} color="var(--color-text-muted)" />
                      <span>{hospital.contactNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Select / Active Button */}
                <button
                  onClick={() => selectHospital(hospital)}
                  className={isSelected ? 'btn-primary' : 'btn-secondary'}
                  style={{
                    padding: '0.6rem 1.35rem',
                    fontSize: '0.9rem',
                    minHeight: '44px',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  {isSelected ? (
                    <>
                      <Check size={16} />
                      <span>Selected Centre</span>
                    </>
                  ) : (
                    <span>Choose This Centre</span>
                  )}
                </button>
              </div>

              {/* Clinical Services Capability Checklist */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                margin: '1.15rem 0 0.5rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-border)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem' }}>
                  {hospital.surgeryAvailable ? (
                    <CheckCircle2 size={16} color="var(--color-success)" />
                  ) : (
                    <XCircle size={16} color="var(--color-text-muted)" />
                  )}
                  <span style={{ color: hospital.surgeryAvailable ? 'var(--color-text-primary)' : 'var(--color-text-muted)', fontWeight: hospital.surgeryAvailable ? 600 : 400 }}>
                    Breast Onco-Surgery
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem' }}>
                  {hospital.oncologyAvailable ? (
                    <CheckCircle2 size={16} color="var(--color-success)" />
                  ) : (
                    <XCircle size={16} color="var(--color-caution)" />
                  )}
                  <span style={{ color: hospital.oncologyAvailable ? 'var(--color-text-primary)' : 'var(--color-caution)', fontWeight: hospital.oncologyAvailable ? 600 : 400 }}>
                    Medical Oncology Specialists
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem' }}>
                  {hospital.radiotherapyAvailable ? (
                    <CheckCircle2 size={16} color="var(--color-success)" />
                  ) : (
                    <XCircle size={16} color="var(--color-text-muted)" />
                  )}
                  <span style={{ color: hospital.radiotherapyAvailable ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
                    Radiation Facility
                  </span>
                </div>

                <div style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  Accepts: {hospital.supportedSchemes.join(', ')}
                </div>
              </div>

              {/* Plain Language "Why" Callout Component */}
              <WhyCallout reason={hospital.whyRecommended} />

            </div>
          );
        })}
      </div>

      {/* Bottom Continuation Bar */}
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
            Next Step in Your Journey
          </span>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
            Make Treatment Affordable with Matched Financial Support
          </h4>
        </div>

        <button
          onClick={() => navigate('financial-support')}
          className="btn-primary"
          style={{ padding: '0.85rem 1.85rem', fontSize: '1rem' }}
        >
          <span>Continue to Financial Support</span>
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
};
