import React from 'react';
import { 
  X, 
  Wallet, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Phone, 
  Users, 
  HelpCircle, 
  ArrowRight,
  Download,
  AlertCircle
} from 'lucide-react';
import { FinancialScheme, Language } from '../types';
import { useApp } from '../context/AppContext';

interface SchemeDetailModalProps {
  scheme: FinancialScheme | null;
  onClose: () => void;
  onApply: (schemeId: string) => void;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({ scheme, onClose, onApply }) => {
  const { showToast, language } = useApp();

  if (!scheme) return null;

  const isApplied = scheme.applicationStatus === 'in_review';

  const handleHelpRequest = () => {
    showToast(
      language === 'ta' 
        ? 'சுகாதார பணியாளர் அனிதாவுக்கு ஆவண உதவி கோரிக்கை அனுப்பப்பட்டது.' 
        : language === 'hi' 
        ? 'स्वास्थ्य कार्यकर्ता अनिता को दस्तावेज़ सहायता का अनुरोध भेजा गया।' 
        : 'Assistance request sent to ASHA Lead Anitha for document collection.',
      'success'
    );
  };

  const isTa = language === 'ta';
  const isHi = language === 'hi';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(43, 39, 48, 0.55)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: 1100,
      animation: 'fadeIn 0.2s ease'
    }} onClick={onClose}>
      
      <div 
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
          border: '1.5px solid var(--color-pink-300)',
          padding: '2rem 1.75rem',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Scheme Header */}
        <div style={{ paddingRight: '2.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-rose-700)',
              padding: '0.2rem 0.6rem',
              borderRadius: '6px',
              border: '1px solid var(--color-pink-300)'
            }}>
              {scheme.provider}
            </span>
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.25 }}>
            {scheme.title}
          </h2>
        </div>

        {/* Funding Amount Highlight Banner */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1.5px solid var(--color-pink-300)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              {isTa ? 'கிடைக்கக்கூடிய அதிகபட்ச உதவி' : isHi ? 'अधिकतम संभावित सहायता' : 'Maximum Potential Assistance'}
            </span>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-rose-700)' }}>
              ₹{scheme.potentialAmount.toLocaleString('en-IN')}
            </div>
          </div>

          <span className={isApplied ? 'badge badge-verified' : 'badge badge-potential'} style={{ fontSize: '0.85rem', padding: '0.4rem 0.9rem' }}>
            {isApplied 
              ? (isTa ? 'விண்ணப்பம் தயாராக உள்ளது' : isHi ? 'आवेदन तैयार है' : 'Application Pre-filled')
              : (isTa ? 'விண்ணப்பிக்க தகுதியானது' : isHi ? 'आवेदन के लिए पात्र' : 'Eligible for You')}
          </span>
        </div>

        {/* What Is Covered Section */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>
            {isTa ? 'சிகிச்சையில் எவை உள்ளடங்கும்?' : isHi ? 'इस योजना में क्या शामिल है?' : 'What does this support cover?'}
          </h4>
          <p style={{ fontSize: '0.925rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
            {scheme.coverageDescription}
          </p>
        </div>

        {/* Why Relevant Callout */}
        <div style={{
          backgroundColor: '#ffffff',
          borderLeft: '4px solid var(--color-rose-700)',
          padding: '0.85rem 1.15rem',
          borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
          borderTop: '1px solid var(--color-border)',
          borderRight: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          marginBottom: '1.5rem'
        }}>
          <strong style={{ fontSize: '0.88rem', color: 'var(--color-rose-700)', display: 'block', marginBottom: '0.2rem' }}>
            {isTa ? 'உங்கள் மருத்துவ நிலைக்கு ஏன் பொருந்துகிறது?' : isHi ? 'आपकी स्थिति के लिए यह क्यों महत्वपूर्ण है?' : 'Why this is tailored to your care plan:'}
          </strong>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>
            {scheme.whyRelevant}
          </span>
        </div>

        {/* Required Documents Checklist for the Patient */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.65rem' }}>
            {isTa ? 'நோயாளியிடம் தேவைப்படும் எளிய ஆவணங்கள்:' : isHi ? 'मरीज़ की ओर से आवश्यक दस्तावेज़:' : 'Documents needed from you:'}
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {scheme.documentsNeeded.map((doc, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.65rem 0.9rem',
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)'
                }}
              >
                <CheckCircle2 size={16} color="var(--color-success)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-primary)', fontWeight: 500 }}>
                  {doc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* How Your Care Team Guides the Application */}
        <div style={{
          backgroundColor: '#FFFDF9',
          border: '1px dashed #E8C8A3',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          marginBottom: '1.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <Users size={16} color="var(--color-caution)" />
            <strong style={{ fontSize: '0.9rem', color: 'var(--color-caution)' }}>
              {isTa ? 'மருத்துவ குழுவின் உடனடி உதவி' : isHi ? 'मेडिकल टीम की सीधी सहायता' : 'How your care team assists you:'}
            </strong>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
            {isTa 
              ? 'நீங்கள் அலைய வேண்டியதில்லை. மருத்துவமனை சமூக நல அலுவலகமும் உங்கள் சுகாதார பணியாளர் அனிதாவும் இந்த ஆவணங்களை நேரடியாக சரிபார்த்து சமர்ப்பிப்பார்கள்.'
              : isHi
              ? 'आपको कहीं भटकने की ज़रूरत नहीं है। अस्पताल का कल्याण विभाग और स्वास्थ्य कार्यकर्ता अनिता मिलकर दस्तावेज़ जमा कराने में पूरी मदद करेंगे।'
              : 'You do not have to handle the paperwork alone. Centre B patient welfare helpdesk and ASHA worker Anitha will verify and file these directly on your behalf.'}
          </p>
        </div>

        {/* Bottom Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          borderTop: '1px solid var(--color-border)',
          paddingTop: '1.25rem'
        }}>
          <button
            onClick={handleHelpRequest}
            className="btn-secondary"
            style={{ padding: '0.6rem 1.15rem', fontSize: '0.875rem' }}
          >
            <Users size={15} />
            <span>{isTa ? 'அனிதாவிடம் ஆவண உதவி கோருக' : isHi ? 'अनिता से दस्तावेज़ सहायता लें' : 'Ask Anitha for Document Help'}</span>
          </button>

          <button
            onClick={() => {
              onApply(scheme.id);
              onClose();
            }}
            className="btn-primary"
            style={{ padding: '0.65rem 1.5rem', fontSize: '0.925rem' }}
          >
            <CheckCircle2 size={16} />
            <span>
              {isApplied 
                ? (isTa ? 'தேர்வு நீக்கு' : isHi ? 'हटाएं' : 'Remove Selection')
                : (isTa ? 'இத்திட்டத்தை தேர்வு செய்க' : isHi ? 'इस योजना का चयन करें' : 'Select This Funding Option')}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
