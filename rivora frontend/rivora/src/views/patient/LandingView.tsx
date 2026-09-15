import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  Wallet, 
  FileText, 
  CheckCircle2, 
  Users, 
  Lock, 
  Compass
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PinkRibbon } from '../../components/PinkRibbon';

export const LandingView: React.FC = () => {
  const { navigate, language, t } = useApp();
  const [showAbout, setShowAbout] = React.useState(false);
  const isTa = language === 'ta';
  const isHi = language === 'hi';

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '3.5rem 1.5rem 4rem',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF6F8 100%)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        marginBottom: '2.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Subtle background glow */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 224, 231, 0.5) 0%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          
          {/* Official Pink Ribbon Badge & Reassuring Tagline */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#ffffff',
            border: '1.5px solid var(--color-pink-300)',
            padding: '0.4rem 1.1rem',
            borderRadius: '30px',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--color-rose-700)',
            marginBottom: '1.75rem',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <PinkRibbon size={18} />
            <span>{t.youAreNotAlone}</span>
          </div>

          {/* Hero Title */}
          <h1 style={{
            fontSize: 'clamp(2.1rem, 4.5vw, 3.2rem)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.18,
            color: 'var(--color-text-primary)',
            marginBottom: '1.25rem'
          }}>
            {isTa ? 'உங்கள் சிகிச்சை பயணம்.' : isHi ? 'आपकी देखभाल यात्रा।' : 'Your care journey.'} <br />
            <span style={{ 
              color: 'var(--color-rose-700)',
              position: 'relative',
              display: 'inline-block'
            }}>
              {isTa ? 'ஒரே பாதுகாப்பான இடத்தில்.' : isHi ? 'एक सुरक्षित और शांत जगह।' : 'One calm place.'}
              {/* Subtle underline wave */}
              <svg style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%', height: '8px' }} viewBox="0 0 200 8" fill="none">
                <path d="M1 5.5C40 1 60 7 100 4C140 1 160 6.5 199 3" stroke="var(--color-pink-300)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          {/* Supporting Copy */}
          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            maxWidth: '680px',
            margin: '0 auto 2.25rem'
          }}>
            {isTa 
              ? 'மார்பக புற்றுநோய் கண்டறியப்பட்ட பெண்களுக்கு மருத்துவமனை தேர்வு, அரசு நிதி உதவி, பயண திட்டம் மற்றும் அடுத்த கட்ட சிகிச்சைகளை தெளிவுடன் வழிநடத்தும் நம்பகமான தளம்.'
              : isHi
              ? 'स्तन कैंसर से जूझ रहे मरीज़ों के लिए सही अस्पताल का चुनाव, सरकारी वित्तीय सहायता और अगले कदमों को सरल व स्पष्ट बनाने वाला एक सच्चा साथी।'
              : 'RIVORA helps people diagnosed with breast cancer navigate healthcare centres, financial relief, treatment availability, and concrete next steps — with clarity and compassion.'}
          </p>

          {/* Action CTAs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => navigate('login')}
              className="btn-primary"
              style={{
                padding: '0.9rem 2.25rem',
                fontSize: '1.05rem',
                minHeight: '52px'
              }}
            >
              <span>{t.startJourney}</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => setShowAbout(true)}
              className="btn-secondary"
              style={{
                padding: '0.9rem 1.85rem',
                fontSize: '1.05rem',
                minHeight: '52px'
              }}
            >
              <span>{t.aboutRivora}</span>
            </button>
          </div>

          {/* Security & Care Badges */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.75rem',
            marginTop: '2.5rem',
            flexWrap: 'wrap',
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={16} color="var(--color-success)" />
              <span>{isTa ? 'பாதுகாப்பானது & அந்தரங்கமானது' : isHi ? 'सुरक्षित एवं गोपनीय' : 'Consent-based & Private'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="var(--color-rose-700)" />
              <span>{isTa ? 'மருத்துவர் சரிபார்த்த சிகிச்சை திட்டம்' : isHi ? 'डॉक्टर द्वारा सत्यापित देखभाल' : 'Doctor-Verified Pathways'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Users size={16} color="var(--color-info)" />
              <span>{isTa ? 'ஆஷா பணியாளர் நேரடி உதவி' : isHi ? 'आशा कार्यकर्ता का सीधा सहयोग' : 'ASHA Health Worker Enabled'}</span>
            </div>
          </div>

        </div>
      </section>

      {/* The 4-Step Calm Navigation Journey (Cleaned & De-cluttered) */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2rem' }}>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--color-rose-700)'
          }}>
            {isTa ? 'ரிவோரா உங்களுக்கு எவ்வாறு உதவுகிறது' : isHi ? 'रिवोरा आपकी कैसे मदद करता है' : 'How RIVORA Guides You'}
          </span>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '0.25rem' }}>
            {isTa ? 'அடுத்த கட்டம் என்ன என்ற தயக்கத்தை போக்குகிறோம்' : isHi ? 'अगले कदम की हर उलझन को दूर करना' : 'Taking the guesswork out of what comes next'}
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem'
        }}>
          {/* Step 1 */}
          <div className="rivora-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: '1.5rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-pink-300)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-rose-700)'
            }}>
              <FileText size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {isTa ? '1. சிகிச்சை பாஸ்போர்ட்' : isHi ? '1. केयर पासपोर्ट' : '1. Your Care Passport'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {isTa 
                ? 'உங்கள் மருத்துவ அறிக்கைகள் மற்றும் சிகிச்சை தேவைகள் அனைத்தும் ஒரே எளிய அட்டையில் தொகுக்கப்படும்.'
                : isHi 
                ? 'आपकी सभी मेडिकल रिपोर्ट और इलाज की ज़रूरतें एक ही स्पष्ट कार्ड में व्यवस्थित की जाती हैं।'
                : 'All essential clinical history, diagnosis staging, and barrier assessments consolidated in one clear profile.'}
            </p>
          </div>

          {/* Step 2 */}
          <div className="rivora-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: '1.5rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-pink-300)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-rose-700)'
            }}>
              <Building2 size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {isTa ? '2. தகுதியான மருத்துவமனை தேர்வு' : isHi ? '2. उपयुक्त अस्पताल चयन' : '2. Healthcare Matching'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {isTa 
                ? 'அறுவை சிகிச்சை மற்றும் புற்றுநோய் நிபுணர்கள் உள்ள சிறந்த மருத்துவமனைகளை கண்டறிந்து பரிந்துரைக்கிறோம்.'
                : isHi 
                ? 'विशेषज्ञ ऑन्कोलॉजिस्ट और सर्जरी की सुविधा वाले श्रेष्ठ अस्पतालों की पहचान की जाती है।'
                : 'Identifies equipped hospitals with surgery and oncology specialists, explaining why each option fits your needs.'}
            </p>
          </div>

          {/* Step 3 */}
          <div className="rivora-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: '1.5rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-pink-300)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-rose-700)'
            }}>
              <Wallet size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {isTa ? '3. நிதி உதவி மற்றும் காப்பீடு' : isHi ? '3. वित्तीय सहायता एवं अनुदान' : '3. Financial Support'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {isTa 
                ? 'அரசு திட்டங்கள் (PMJAY) மற்றும் அறக்கட்டளை உதவிகள் மூலம் உங்கள் சிகிச்சை செலவை குறைக்கிறோம்.'
                : isHi 
                ? 'सरकारी योजनाओं (PMJAY) और ट्रस्ट अनुदानों से इलाज के खर्च का अंतर समाप्त किया जाता है।'
                : 'Unlocks government schemes (PMJAY), NGO grants, and pharma assistance programs to close funding gaps.'}
            </p>
          </div>

          {/* Step 4 */}
          <div className="rivora-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: '1.5rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-pink-300)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-rose-700)'
            }}>
              <Compass size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {isTa ? '4. தெளிவான சிகிச்சை வரைபடம்' : isHi ? '4. स्पष्ट उपचार मार्ग' : '4. Personalized Pathway'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {isTa 
                ? 'அறுவை சிகிச்சை, மருத்துவர் சந்திப்பு மற்றும் தொடர் கவனிப்புக்கான தெளிவான கால அட்டவணை.'
                : isHi 
                ? 'सर्जरी, डॉक्टर की अगली मुलाकात और स्वास्थ्य लाभ का चरणबद्ध कैलेंडर।'
                : 'A concrete roadmap connecting surgery, financial clearance, and appointment reminders with zero confusion.'}
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Security Section (Calm, non-legalistic) */}
      <section style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem 1.75rem',
        boxShadow: 'var(--shadow-xs)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-pink-300)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-rose-700)'
          }}>
            <Lock size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {t.trustHeader}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              {isTa ? 'நோயாளியின் சுயமரியாதை மற்றும் மருத்துவ பாதுகாப்பை மையமாகக் கொண்டு உருவாக்கப்பட்டது.' : isHi ? 'मरीज़ की गरिमा और संपूर्ण गोपनीयता को ध्यान में रखकर बनाया गया।' : 'Designed around privacy, medical verification, and patient dignity.'}
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <CheckCircle2 size={18} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>
              {t.trustItem1}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <CheckCircle2 size={18} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>
              {t.trustItem2}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <CheckCircle2 size={18} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>
              {t.trustItem3}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <CheckCircle2 size={18} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>
              {t.trustItem4}
            </span>
          </div>
        </div>

        {/* Start Journey Bar */}
        <div style={{
          marginTop: '1.75rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
            {isTa ? 'தொடங்க தயாரா? உங்கள் 3 எளிய படிகள் கொண்ட வழிகாட்டலை தொடங்குங்கள்.' : isHi ? 'शुरू करने के लिए तैयार हैं? अपने 3 आसान चरणों का मूल्यांकन शुरू करें।' : 'Ready to begin? Start with your 3-step care assessment.'}
          </span>

          <button
            onClick={() => navigate('login')}
            className="btn-primary"
            style={{ padding: '0.65rem 1.6rem', fontSize: '0.95rem' }}
          >
            <span>{t.beginAssessment}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {showAbout && (
        <div onClick={() => setShowAbout(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(32, 20, 26, 0.42)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1200, padding: '1rem' }}>
          <div onClick={(event) => event.stopPropagation()} className="rivora-card" style={{ maxWidth: '700px', width: '100%', padding: '2rem', position: 'relative' }}>
            <button onClick={() => setShowAbout(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--color-text-secondary)', fontSize: '1.1rem', cursor: 'pointer' }}>✕</button>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--color-pink-100)', color: 'var(--color-rose-700)', borderRadius: '999px', padding: '0.35rem 0.8rem', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
              {t.aboutRivora}
            </div>
            <p style={{ fontSize: '1.02rem', lineHeight: '1.8', color: 'var(--color-text-primary)', margin: 0 }}>
              {t.aboutBody1}
            </p>
            <p style={{ fontSize: '1.02rem', lineHeight: '1.8', color: 'var(--color-text-primary)', margin: '1rem 0 0' }}>
              {t.aboutBody2}
            </p>
            <p style={{ fontSize: '1.02rem', lineHeight: '1.8', color: 'var(--color-text-primary)', margin: '1rem 0 0' }}>
              {t.aboutBody3}
            </p>
            <button onClick={() => setShowAbout(false)} className="btn-primary" style={{ marginTop: '1.5rem', width: '100%', padding: '0.8rem 1rem' }}>
              <span>{t.backToStart}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
