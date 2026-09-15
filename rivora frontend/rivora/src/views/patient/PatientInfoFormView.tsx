import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  User, 
  MapPin, 
  Globe, 
  Stethoscope, 
  FileText, 
  Heart, 
  ShieldCheck, 
  Compass, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProgressStepper } from '../../components/ProgressStepper';

export const PatientInfoFormView: React.FC = () => {
  const { patientData, updatePatientData, navigate, showToast, t } = useApp();
  const [formStep, setFormStep] = useState<1 | 2 | 3>(1);

  // Form local state initialized with current patientData
  const [fullName, setFullName] = useState(patientData.fullName);
  const [age, setAge] = useState(patientData.age);
  const [location, setLocation] = useState(patientData.location);
  const [preferredLanguage, setPreferredLanguage] = useState(patientData.preferredLanguage);

  const [diagnosis, setDiagnosis] = useState(patientData.diagnosis);
  const [stage, setStage] = useState(patientData.stage);
  const [recommendedTreatment, setRecommendedTreatment] = useState(patientData.recommendedTreatment);
  const [currentHospital, setCurrentHospital] = useState(patientData.currentHospital);

  const [travelToleranceKm, setTravelToleranceKm] = useState(patientData.travelToleranceKm);
  const [financialGap, setFinancialGap] = useState(patientData.financialGap);
  const [barriers, setBarriers] = useState<string[]>(patientData.accessBarriers);

  const toggleBarrier = (barrier: string) => {
    if (barriers.includes(barrier)) {
      setBarriers(barriers.filter(b => b !== barrier));
    } else {
      setBarriers([...barriers, barrier]);
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePatientData({ fullName, age, location, preferredLanguage });
    setFormStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePatientData({ diagnosis, stage, recommendedTreatment, currentHospital });
    setFormStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePatientData({
      travelToleranceKm,
      financialGap,
      accessBarriers: barriers,
      journeyStep: 2
    });
    showToast('Care assessment saved! Generating your Care Passport.', 'success');
    navigate('care-passport');
  };

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '740px',
      margin: '0 auto 4rem',
      padding: '0 1rem'
    }}>
      
      {/* Progress Stepper at top */}
      <ProgressStepper activeStepNumber={1} />

      <div className="rivora-card" style={{ padding: '2.5rem 2.25rem' }}>
        
        {/* Step Progress Pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            padding: '0.2rem 0.6rem',
            borderRadius: '12px',
            backgroundColor: formStep === 1 ? 'var(--color-rose-700)' : 'var(--color-pink-100)',
            color: formStep === 1 ? '#ffffff' : 'var(--color-rose-700)'
          }}>
            Step 1: Identity
          </span>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            padding: '0.2rem 0.6rem',
            borderRadius: '12px',
            backgroundColor: formStep === 2 ? 'var(--color-rose-700)' : 'var(--color-pink-100)',
            color: formStep === 2 ? '#ffffff' : 'var(--color-rose-700)'
          }}>
            Step 2: Diagnosis
          </span>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            padding: '0.2rem 0.6rem',
            borderRadius: '12px',
            backgroundColor: formStep === 3 ? 'var(--color-rose-700)' : 'var(--color-pink-100)',
            color: formStep === 3 ? '#ffffff' : 'var(--color-rose-700)'
          }}>
            Step 3: Access & Barriers
          </span>
        </div>

        {/* STEP 1: Let's start with you */}
        {formStep === 1 && (
          <form onSubmit={handleStep1Submit} className="animate-fade-in">
            <div style={{ marginBottom: '1.75rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
                {t.formStep1Title}
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
                {t.formStep1Subtitle}
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="form-input"
                placeholder="e.g. Priya Sundaram"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Age (Years)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  required
                  min={18}
                  max={100}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Communication Language</label>
                <select
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  className="form-select"
                >
                  <option value="Tamil / English">தமிழ் / English (Tamil & English)</option>
                  <option value="English">English</option>
                  <option value="Tamil">தமிழ் (Tamil)</option>
                  <option value="Hindi">हिन्दी (Hindi)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Residential District / Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="form-input"
                placeholder="e.g. Dharmapuri Rural District"
              />
              <span className="form-helper">Used to compute accurate travel distance to specialized oncology centres.</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button type="submit" className="btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
                <span>Continue to Clinical Care</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Tell us about your current care */}
        {formStep === 2 && (
          <form onSubmit={handleStep2Submit} className="animate-fade-in">
            <div style={{ marginBottom: '1.75rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
                {t.formStep2Title}
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
                {t.formStep2Subtitle}
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">Histopathological Diagnosis</label>
              <input
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                required
                className="form-input"
                placeholder="e.g. Invasive Ductal Carcinoma"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Confirmed Clinical Stage</label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="form-select"
                >
                  <option value="Stage I (T1c N0 M0)">Stage I (Early Stage)</option>
                  <option value="Stage IIB (cT2 N1 M0)">Stage IIB (cT2 N1 M0) — Current Demo</option>
                  <option value="Stage IIIA (T3 N1 M0)">Stage IIIA (Locally Advanced)</option>
                  <option value="Stage IV (Metastatic)">Stage IV</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Current Hospital / Referral Point</label>
                <input
                  type="text"
                  value={currentHospital}
                  onChange={(e) => setCurrentHospital(e.target.value)}
                  className="form-input"
                  placeholder="e.g. District Community Referral Unit"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Recommended Care / Treatment Plan</label>
              <input
                type="text"
                value={recommendedTreatment}
                onChange={(e) => setRecommendedTreatment(e.target.value)}
                className="form-input"
                placeholder="e.g. Breast Conserving Surgery + Adjuvant Oncology"
              />
              <span className="form-helper">This helps match hospitals with dedicated surgical and medical oncology teams.</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
              <button
                type="button"
                onClick={() => setFormStep(1)}
                className="btn-secondary"
                style={{ padding: '0.85rem 1.4rem' }}
              >
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>

              <button type="submit" className="btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
                <span>Continue to Access Needs</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Let's understand what might make care difficult */}
        {formStep === 3 && (
          <form onSubmit={handleStep3Submit} className="animate-fade-in">
            <div style={{ marginBottom: '1.75rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
                {t.formStep3Title}
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
                {t.formStep3Subtitle}
              </p>
            </div>

            {/* Travel Distance Slider */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Maximum Travel Distance You Can Comfortably Manage</label>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-rose-700)' }}>
                  {travelToleranceKm} km
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={150}
                step={5}
                value={travelToleranceKm}
                onChange={(e) => setTravelToleranceKm(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-rose-700)', cursor: 'pointer', height: '6px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                <span>Local (20 km)</span>
                <span>Regional Hub (75 km)</span>
                <span>Metropolitan (150 km)</span>
              </div>
            </div>

            {/* Financial Out-of-Pocket Gap */}
            <div className="form-group">
              <label className="form-label">Estimated Out-of-Pocket Funding Concern</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.6rem' }}>
                {[
                  { label: 'Under ₹1 Lakh', value: 100000 },
                  { label: '₹3,00,000 (Demo)', value: 300000 },
                  { label: '₹5,00,000+', value: 500000 },
                  { label: 'Uncertain / Need Help', value: 300000 }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFinancialGap(item.value)}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: `1.5px solid ${financialGap === item.value ? 'var(--color-rose-700)' : 'var(--color-border)'}`,
                      backgroundColor: financialGap === item.value ? 'var(--color-surface)' : '#ffffff',
                      color: financialGap === item.value ? 'var(--color-rose-700)' : 'var(--color-text-primary)',
                      fontWeight: financialGap === item.value ? 700 : 500,
                      fontSize: '0.875rem'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Access Barriers Checkboxes */}
            <div className="form-group">
              <label className="form-label">Are you concerned about any of the following? (Select all that apply)</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  'Travel distance to specialized cancer centres (> 50 km)',
                  'Out-of-pocket gap of ₹3,00,000 for specialized targeted adjuvant therapy',
                  'Specialist oncology waiting times in local district',
                  'Need accompaniment or lodging support for companion',
                  'Need help applying for PMJAY / Chief Minister scheme'
                ].map((barrierText, idx) => {
                  const checked = barriers.includes(barrierText);
                  return (
                    <label
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: checked ? 'var(--color-surface)' : '#ffffff',
                        border: `1px solid ${checked ? 'var(--color-pink-300)' : 'var(--color-border)'}`,
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleBarrier(barrierText)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-rose-700)' }}
                      />
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>
                        {barrierText}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
              <button
                type="button"
                onClick={() => setFormStep(2)}
                className="btn-secondary"
                style={{ padding: '0.85rem 1.4rem' }}
              >
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>

              <button type="submit" className="btn-primary" style={{ padding: '0.85rem 1.85rem' }}>
                <span>Save & View Care Passport</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
