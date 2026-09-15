import React, { useState } from 'react';
import { Wallet, ArrowRight, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProgressStepper } from '../../components/ProgressStepper';
import { DataService } from '../../services/dataService';
import { FinancialScheme } from '../../types';

export const FinancialSupportView: React.FC = () => {
  const { financialSchemes, toggleSchemeApplication, navigate, t } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const summary = DataService.getFinancialSummary();

  const filteredSchemes = activeCategory === 'all'
    ? financialSchemes
    : financialSchemes.filter(s => s.category === activeCategory);

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'government': return 'Government Scheme';
      case 'ngo': return 'NGO & Foundation Grant';
      case 'pharma': return 'Pharma Patient Assistance';
      case 'financing': return '0% Medical Financing';
      case 'crowdfunding': return 'Verified Community Bridge';
      default: return 'Hospital Assistance';
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '920px', margin: '0 auto 4rem', padding: '0 1rem' }}>
      <ProgressStepper activeStepNumber={4} />

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'var(--color-pink-100)', color: 'var(--color-rose-700)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          <Wallet size={14} />
          <span>Step 4 of 6 • Financial Navigation</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
          Let's make treatment more affordable
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', maxWidth: '680px' }}>
          Cancer care should not cause financial exhaustion. We have matched verified government and philanthropic programs that may cover your care.
        </p>
      </div>

      <div className="rivora-card" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF6F8 100%)', border: '1.5px solid var(--color-pink-300)', padding: '2rem 1.75rem', marginBottom: '2.25rem', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '1rem', backgroundColor: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.825rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>{t.totalEstimate}</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0.25rem 0' }}>Rs.{summary.totalEstimate.toLocaleString('en-IN')}</h2>
            <small style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Complete Surgery + Adjuvant Cycles</small>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--color-success-bg)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(79, 162, 119, 0.3)' }}>
            <span style={{ fontSize: '0.825rem', textTransform: 'uppercase', color: 'var(--color-success)', fontWeight: 700 }}>{t.potentialSupport}</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-success)', margin: '0.25rem 0' }}>Rs.{summary.potentialSupport.toLocaleString('en-IN')}</h2>
            <small style={{ fontSize: '0.8rem', color: 'var(--color-success)' }}>Matched Government and NGO Grants</small>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--color-caution-bg)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(217, 138, 77, 0.3)' }}>
            <span style={{ fontSize: '0.825rem', textTransform: 'uppercase', color: 'var(--color-caution)', fontWeight: 700 }}>{t.remainingGap}</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-caution)', margin: '0.25rem 0' }}>Rs.{summary.remainingGap.toLocaleString('en-IN')}</h2>
            <small style={{ fontSize: '0.8rem', color: 'var(--color-caution)' }}>Targeted for assistance programs below</small>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.4rem', fontWeight: 600 }}>
            <span style={{ color: 'var(--color-text-primary)' }}>Estimated Support Coverage</span>
            <span style={{ color: 'var(--color-rose-700)' }}>{summary.percentageCovered}% Potential Coverage Identified</span>
          </div>
          <div style={{ height: '12px', backgroundColor: '#e8dfe3', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${summary.percentageCovered}%`, backgroundColor: 'var(--color-rose-700)', borderRadius: '6px', transition: 'width 0.5s ease' }} />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
        {[{ id: 'all', label: 'All Matched Options' }, { id: 'government', label: 'Government (PMJAY)' }, { id: 'ngo', label: 'NGO Grants' }, { id: 'pharma', label: 'Pharma Subsidies' }, { id: 'financing', label: '0% Financing' }, { id: 'crowdfunding', label: 'Community Relief' }].map((tab) => (
          <button key={tab.id} onClick={() => setActiveCategory(tab.id)} style={{ padding: '0.45rem 0.95rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: activeCategory === tab.id ? 700 : 500, backgroundColor: activeCategory === tab.id ? 'var(--color-rose-700)' : '#ffffff', color: activeCategory === tab.id ? '#ffffff' : 'var(--color-text-primary)', border: `1.5px solid ${activeCategory === tab.id ? 'var(--color-rose-700)' : 'var(--color-border)'}`, whiteSpace: 'nowrap', transition: 'all 0.2s ease' }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {filteredSchemes.map((scheme) => (
          <SchemeCard key={scheme.id} scheme={scheme} isApplied={scheme.applicationStatus === 'in_review'} getCategoryLabel={getCategoryLabel} onToggle={() => toggleSchemeApplication(scheme.id)} />
        ))}
      </div>

      <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
        <button onClick={() => navigate('treatment-risk')} className="btn-primary" style={{ padding: '0.85rem 1.85rem', fontSize: '1rem' }}>
          <span>Review Delay Risk and Pathway</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

interface SchemeCardProps {
  scheme: FinancialScheme;
  isApplied: boolean;
  getCategoryLabel: (cat: string) => string;
  onToggle: () => void;
}

const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, isApplied, getCategoryLabel, onToggle }) => {
  const [showDetail, setShowDetail] = useState(false);
  const { language } = useApp();
  const isTa = language === 'ta';
  const isHi = language === 'hi';

  return (
    <div className="rivora-card" style={{ border: isApplied ? '1.5px solid var(--color-success)' : '1px solid var(--color-border)', backgroundColor: isApplied ? 'var(--color-success-bg)' : '#ffffff', transition: 'border-color 0.2s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', backgroundColor: 'var(--color-surface)', color: 'var(--color-rose-700)', padding: '0.15rem 0.5rem', borderRadius: '4px', border: '1px solid var(--color-pink-300)' }}>{getCategoryLabel(scheme.category)}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{isTa ? 'வழங்குனர்:' : isHi ? 'प्रदाता:' : 'Provided by'} {scheme.provider}</span>
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{scheme.title}</h3>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600, display: 'block' }}>{isTa ? 'அதிகபட்ச உதவி' : isHi ? 'अधिकतम सहायता' : 'Potential Assistance'}</span>
          <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-rose-700)' }}>Up to Rs.{scheme.potentialAmount.toLocaleString('en-IN')}</div>
        </div>
      </div>

      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.85rem', lineHeight: 1.5 }}>{scheme.coverageDescription}</p>

      <div style={{ backgroundColor: isApplied ? '#ffffff' : 'var(--color-surface)', borderLeft: '3px solid var(--color-pink-500)', padding: '0.65rem 1rem', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', fontSize: '0.875rem', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
        <strong>{isTa ? 'ஏன் பொருந்துகிறது: ' : isHi ? 'यह क्यों प्रासंगिक है: ' : 'Why this matters for you: '}</strong>
        <span>{scheme.whyRelevant}</span>
      </div>

      {showDetail && (
        <div style={{ backgroundColor: '#FAFAFA', border: '1px solid var(--color-pink-300)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.65rem' }}>
            {isTa ? 'நோயாளியிடம் தேவைப்படும் ஆவணங்கள்:' : isHi ? 'मरीज़ की ओर से आवश्यक दस्तावेज़:' : 'Documents required from you:'}
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.15rem' }}>
            {scheme.documentsNeeded.map((doc, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.55rem 0.85rem', backgroundColor: '#ffffff', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
                <CheckCircle2 size={15} color="var(--color-success)" style={{ flexShrink: 0 }} />
                <span>{doc}</span>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: '#FFFDF9', border: '1px dashed #E8C8A3', borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
            <strong style={{ color: 'var(--color-caution)', display: 'block', marginBottom: '0.25rem' }}>
              {isTa ? 'மருத்துவ குழுவின் உதவி:' : isHi ? 'आपकी मेडिकल टीम कैसे मदद करती है:' : 'How your care team will help:'}
            </strong>
            {isTa
              ? 'நீங்கள் அலைய வேண்டியதில்லை. மருத்துவமனை சமூக நல அலுவலகமும் உங்கள் சுகாதார பணியாளர் அனிதாவும் இந்த ஆவணங்களை நேரடியாக சரிபார்த்து சமர்ப்பிப்பார்கள்.'
              : isHi
              ? 'आपको कहीं भटकने की जरूरत नहीं। अस्पताल का कल्याण विभाग और स्वास्थ्य कार्यकर्ता अनिता मिलकर दस्तावेज जमा कराने में पूरी मदद करेंगे।'
              : 'You do not have to manage this paperwork alone. The hospital welfare desk and ASHA worker Anitha will collect, verify, and file these on your behalf.'}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.85rem', borderTop: '1px solid var(--color-border)', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button onClick={() => setShowDetail(!showDetail)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--color-rose-700)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: '0.3rem 0', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
          <FileText size={15} />
          <span>{showDetail ? (isTa ? 'விவரங்களை மறைக்க' : isHi ? 'विवरण छुपाएं' : 'Hide Details') : (isTa ? 'ஆவண தேவைகளை காண்க' : isHi ? 'दस्तावेज और विवरण देखें' : 'View Documents and Requirements')}</span>
        </button>

        <button onClick={onToggle} className={isApplied ? 'btn-secondary' : 'btn-primary'} style={{ padding: '0.55rem 1.25rem', fontSize: '0.875rem', minHeight: '40px' }}>
          {isApplied ? (
            <>
              <CheckCircle2 size={15} color="var(--color-success)" />
              <span>{isTa ? 'தேர்வு நீக்கு' : isHi ? 'हटाएं' : 'Remove Selection'}</span>
            </>
          ) : (
            <span>{isTa ? 'இத்திட்டத்தை தேர்வு செய்க' : isHi ? 'इस योजना का चयन करें' : 'Select This Option'}</span>
          )}
        </button>
      </div>
    </div>
  );
};
