import React, { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, FileText, FileUp, X, UploadCloud } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DataService } from '../../services/dataService';

interface UploadedReport {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
}

const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

export const ReportUploadView: React.FC = () => {
  const { navigate, showToast, t } = useApp();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [reports, setReports] = useState<UploadedReport[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const accepted = Array.from(fileList).filter((file) => {
      const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      return allowed.includes(file.type) || /\.(pdf|jpg|jpeg|png)$/i.test(file.name);
    });

    if (accepted.length === 0) {
      showToast(`Please upload a supported file: ${t.fileFormats}.`, 'caution');
      return;
    }

    const appended = accepted.map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}`,
      name: file.name,
      type: file.type || 'application/octet-stream',
      size: file.size,
      uploadedAt: new Date().toISOString()
    }));

    setReports(prev => [...prev, ...appended]);
    showToast(`${accepted.length} report${accepted.length > 1 ? 's have' : ' has'} been added.`, 'success');
  };

  const handleSubmit = () => {
    if (reports.length === 0) {
      showToast('Please upload at least one report before continuing.', 'caution');
      return;
    }

    DataService.savePatientReports(reports);
    setIsSubmitted(true);
    showToast('Reports submitted for review.', 'success');
  };

  const removeReport = (id: string) => {
    setReports(prev => prev.filter(item => item.id !== id));
  };

  const resetToUpload = () => {
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="animate-fade-in" style={{ maxWidth: '760px', margin: '2rem auto 4rem', padding: '0 1rem' }}>
        <div className="rivora-card" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-surface)', border: '1.5px solid var(--color-pink-300)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <CheckCircle2 size={30} color="var(--color-success)" />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>{t.reportSubmittedReviewHeader}</h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', maxWidth: '560px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            {t.reportSubmittedReviewBody}
          </p>
          <div style={{ padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', marginBottom: '1.5rem' }}>
            <strong style={{ color: 'var(--color-text-primary)', display: 'block', marginBottom: '0.35rem' }}>{t.waitingDoctorVerification}</strong>
            <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>{t.waitingReviewing}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={resetToUpload} className="btn-secondary" style={{ padding: '0.7rem 1.2rem' }}>
              <span>{t.uploadMoreReports}</span>
            </button>
            <button onClick={() => navigate('patient-home')} className="btn-primary" style={{ padding: '0.7rem 1.5rem' }}>
              <span>{t.returnHome}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '860px', margin: '2rem auto 4rem', padding: '0 1rem' }}>
      <div className="rivora-card" style={{ padding: '2rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '18px', backgroundColor: 'var(--color-surface)', border: '1.5px solid var(--color-pink-300)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <FileUp size={28} color="var(--color-rose-700)" />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>{t.uploadMedicalReportsHeader}</h1>
          <p style={{ maxWidth: '620px', margin: '0 auto', color: 'var(--color-text-secondary)', fontSize: '1.02rem', lineHeight: 1.6 }}>
            {t.uploadMedicalReportsSubtext}
          </p>
        </div>

        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            handleFiles(event.dataTransfer.files);
          }}
          style={{
            border: '2px dashed var(--color-pink-300)',
            background: 'linear-gradient(180deg, #fffdfd 0%, #fff7f9 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem 1.25rem',
            textAlign: 'center',
            cursor: 'pointer',
            marginBottom: '1.5rem'
          }}
        >
          <UploadCloud size={32} color="var(--color-rose-700)" style={{ marginBottom: '0.75rem' }} />
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>{t.dragAndDropReports}</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{t.fileFormats}</div>
          <button type="button" className="btn-primary" style={{ padding: '0.7rem 1.5rem', fontSize: '0.95rem' }}>
            <FileText size={16} />
            <span>{t.browseFiles}</span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,image/png,image/jpeg,application/pdf"
            multiple
            onChange={(event) => handleFiles(event.target.files)}
            style={{ display: 'none' }}
          />
        </div>

        {reports.length > 0 && (
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>{t.selectedFiles}</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{reports.length} file{reports.length > 1 ? 's' : ''}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {reports.map((report) => (
                <div key={report.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: '#ffffff', padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', minWidth: 0, flex: 1 }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-pink-300)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-rose-700)' }}>
                      <FileText size={17} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{report.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{report.type} • {formatFileSize(report.size)}</div>
                    </div>
                  </div>
                  <button onClick={() => removeReport(report.id)} type="button" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                    <X size={15} />
                    <span>{t.remove}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={handleSubmit} className="btn-primary" style={{ width: '100%', padding: '0.9rem 1rem', fontSize: '1.02rem' }}>
          <span>{t.uploadMedicalReportsHeader}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
