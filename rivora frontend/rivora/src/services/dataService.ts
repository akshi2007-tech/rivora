import {
  CarePassportData,
  HospitalMatch,
  FinancialScheme,
  AccessRiskAssessment,
  CarePathwayStep,
  AppointmentReminder,
  AuditLogEntry,
  UserRole,
  VerificationStatus,
  Language
} from '../types';
import {
  initialPatientData,
  localizedHospitals,
  localizedFinancialSchemes,
  localizedCarePathway,
  localizedAppointments,
  initialAccessRisk,
  initialAuditLogs
} from '../data/mockData';

const STORAGE_KEYS = {
  PATIENT_DATA: 'rivora_patient_data_v2',
  FINANCIAL_SCHEMES_PREFIX: 'rivora_financial_schemes_v2_',
  AUDIT_LOGS: 'rivora_audit_logs_v2',
  OFFLINE_QUEUE: 'rivora_offline_queue_v2',
  SELECTED_HOSPITAL: 'rivora_selected_hospital_v2',
  CONSENT_GIVEN: 'rivora_consent_given_v2',
  REPORTS: 'rivora_uploaded_reports_v2'
};

export class DataService {
  // Get current patient data
  static getPatientData(): CarePassportData {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PATIENT_DATA);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return initialPatientData;
  }

  // Update patient data
  static savePatientData(data: Partial<CarePassportData>, actorName = 'Lakshmi Narayanan', actorRole: UserRole = 'patient'): CarePassportData {
    const current = this.getPatientData();
    const updated: CarePassportData = {
      ...current,
      ...data,
      lastUpdated: 'Just now'
    };
    try {
      localStorage.setItem(STORAGE_KEYS.PATIENT_DATA, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }

    // Log update
    this.addAuditLog({
      actorName,
      actorRole,
      action: 'Updated Patient Information',
      details: `Modified care profile fields for ${updated.fullName}.`,
      patientId: updated.patientId
    });

    return updated;
  }

  // Verify clinical info (Doctor Action)
  static verifyClinicalInfo(doctorName = 'Dr. R. Menon', notes = 'Verified biopsy parameters, stage IIB classification, and surgical readiness.'): CarePassportData {
    const current = this.getPatientData();
    const updated: CarePassportData = {
      ...current,
      clinicalVerification: {
        status: 'doctor_verified' as VerificationStatus,
        verifiedBy: doctorName,
        verifiedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        notes
      },
      lastUpdated: 'Just now'
    };
    try {
      localStorage.setItem(STORAGE_KEYS.PATIENT_DATA, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    this.addAuditLog({
      actorName: doctorName,
      actorRole: 'doctor',
      action: 'Verified Clinical Information',
      details: notes,
      patientId: current.patientId
    });

    return updated;
  }

  // Reset verification to intake draft (for demo reset)
  static resetVerificationToAI(): CarePassportData {
    const current = this.getPatientData();
    const updated: CarePassportData = {
      ...current,
      clinicalVerification: {
        status: 'ai_assisted',
        notes: 'Consolidated from diagnostic histopathology report #DHP-8492 by clinical care intake coordinator. Awaiting oncologist sign-off.'
      }
    };
    try {
      localStorage.setItem(STORAGE_KEYS.PATIENT_DATA, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    return updated;
  }

  // Get Hospitals with dynamic matching logic & localization
  static getHospitalMatches(travelToleranceKm = 75, lang: Language = 'en'): HospitalMatch[] {
    const rawList = localizedHospitals[lang] || localizedHospitals.en;
    return rawList.map(hospital => {
      let score = 50;
      if (hospital.surgeryAvailable) score += 20;
      if (hospital.oncologyAvailable) score += 20;
      if (hospital.radiotherapyAvailable) score += 10;
      if (hospital.waitingTimeDays <= 5) score += 10;
      if (hospital.distanceKm <= travelToleranceKm) score += 10;
      else score -= 15;

      return {
        ...hospital,
        feasibilityScore: Math.min(100, Math.max(20, score))
      };
    }).sort((a, b) => b.feasibilityScore - a.feasibilityScore);
  }

  // Selected Hospital
  static getSelectedHospital(lang: Language = 'en'): HospitalMatch {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SELECTED_HOSPITAL);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    const list = localizedHospitals[lang] || localizedHospitals.en;
    return list[0]; // Default Centre B
  }

  static setSelectedHospital(hospital: HospitalMatch): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SELECTED_HOSPITAL, JSON.stringify(hospital));
      this.addAuditLog({
        actorName: 'Lakshmi Narayanan',
        actorRole: 'patient',
        action: 'Selected Preferred Care Centre',
        details: `Selected ${hospital.name} (${hospital.distanceKm} km).`,
        patientId: 'lakshmi-patient'
      });
    } catch (e) {
      console.error(e);
    }
  }

  // Financial calculation & schemes with localization
  static getFinancialSchemes(lang: Language = 'en'): FinancialScheme[] {
    const key = STORAGE_KEYS.FINANCIAL_SCHEMES_PREFIX + lang;
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return localizedFinancialSchemes[lang] || localizedFinancialSchemes.en;
  }

  static toggleSchemeApplication(schemeId: string, lang: Language = 'en'): FinancialScheme[] {
    const current = this.getFinancialSchemes(lang);
    const updated = current.map(scheme => {
      if (scheme.id === schemeId) {
        const nextStatus = scheme.applicationStatus === 'in_review' ? 'eligible_to_apply' : 'in_review';
        return { ...scheme, applicationStatus: nextStatus as FinancialScheme['applicationStatus'] };
      }
      return scheme;
    });
    try {
      const key = STORAGE_KEYS.FINANCIAL_SCHEMES_PREFIX + lang;
      localStorage.setItem(key, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    return updated;
  }

  static getFinancialSummary() {
    const patient = this.getPatientData();
    const totalEstimate = patient.totalEstimatedCost || 900000;
    const potentialSupport = patient.coverageEstimated || 600000;
    const remainingGap = Math.max(0, totalEstimate - potentialSupport);

    return {
      totalEstimate,
      potentialSupport,
      remainingGap,
      percentageCovered: Math.round((potentialSupport / totalEstimate) * 100)
    };
  }

  // Care Pathway with localization
  static getCarePathway(lang: Language = 'en'): CarePathwayStep[] {
    return localizedCarePathway[lang] || localizedCarePathway.en;
  }

  // Appointments with localization
  static getAppointments(lang: Language = 'en'): AppointmentReminder[] {
    return localizedAppointments[lang] || localizedAppointments.en;
  }

  // Access Risk Assessment calculation
  static getAccessRiskAssessment(lang: Language = 'en'): AccessRiskAssessment {
    const patient = this.getPatientData();
    let riskScore = 4.0;
    if (patient.financialGap > 200000) riskScore += 2.0;
    if (patient.travelToleranceKm < 80) riskScore += 1.0;
    
    const overallRisk = riskScore >= 7 ? 'high' : riskScore >= 4 ? 'medium' : 'low';
    
    // We can also localize the descriptions
    const isTa = lang === 'ta';
    const isHi = lang === 'hi';

    const localizedFactors = [
      {
        name: isTa ? 'சிறப்பு புற்றுநோய் மருத்துவமனைக்கான பயண தூரம்' : isHi ? 'विशेषज्ञ कैंसर अस्पताल की यात्रा दूरी' : 'Travel Distance to Specialized Oncology Centre',
        severity: 'medium' as const,
        description: isTa 
          ? 'அறுவை சிகிச்சை மற்றும் மருத்துவ புற்றுநோய் நிபுணர்கள் உள்ள மையம் B 65 கி.மீ தொலைவில் உள்ளது (1 மணி 45 நிமிடம்).' 
          : isHi 
          ? 'निकटतम सुसज्जित केंद्र B 65 किमी दूर है (1 घंटा 45 मिनट की यात्रा)।' 
          : 'The nearest comprehensive surgical and medical oncology centre (Centre B) is 65 km away, requiring 1h 45m of transit.',
        icon: 'MapPin'
      },
      {
        name: isTa ? 'மதிப்பிடப்பட்ட சொந்த செலவு நிதி இடைவெளி' : isHi ? 'अनुमानित वित्तीय अंतर' : 'Estimated Out-of-Pocket Financial Gap',
        severity: 'medium' as const,
        description: isTa 
          ? 'காப்பீடு தவிர ₹3,00,000 கூடுதல் நிதி தேவைப்படுகிறது. இதை அரசு மற்றும் அறக்கட்டளை நிதிகள் மூலம் ஈடுசெய்யலாம்.' 
          : isHi 
          ? 'प्राथमिक बीमा के अतिरिक्त ₹3,00,000 की आवश्यकता है, जिसे अनुदान से पूरा किया जा सकता है।' 
          : 'Estimated ₹3,00,000 funding gap remaining after primary insurance, which can be bridged by grants.',
        icon: 'Wallet'
      },
      {
        name: isTa ? 'உள்ளூர் பகுதியில் சிறப்பு புற்றுநோய் மருத்துவர்கள் பற்றாக்குறை' : isHi ? 'स्थानीय स्तर पर ऑन्कोलॉजिस्ट की अनुपलब्धता' : 'Local Specialist Oncology Availability',
        severity: 'high' as const,
        description: isTa 
          ? 'உள்ளூர் தாலுகா மருத்துவமனையில் (மையம் A / D) பிரத்யேக புற்றுநோய் அறுவை சிகிச்சை நிபுணர்கள் இல்லை.' 
          : isHi 
          ? 'स्थानीय अस्पताल (केंद्र A / D) में नियमित मेडिकल ऑन्कोलॉजिस्ट उपलब्ध नहीं हैं।' 
          : 'Your local sub-district hospital (Centre A / Centre D) does not have dedicated medical oncologists on staff.',
        icon: 'Users'
      },
      {
        name: isTa ? 'அறுவை சிகிச்சை காத்திருப்பு நேரம்' : isHi ? 'सर्जरी प्रतीक्षा समय' : 'Surgical Wait Time Feasibility',
        severity: 'low' as const,
        description: isTa 
          ? 'மையம் B-யில் காத்திருப்பு நேரம் வெறும் 4 நாட்கள் மட்டுமே. இதனால் சிகிச்சை தாமதமாகாது.' 
          : isHi 
          ? 'केंद्र B में केवल 4 दिन का प्रतीक्षा समय है, जिससे समय की बचत होगी।' 
          : 'Centre B currently has a short 4-day surgical scheduling turnaround, which prevents critical time loss.',
        icon: 'Clock'
      }
    ];

    const localizedSteps = [
      {
        title: isTa ? 'மையம் B-யில் அறுவை சிகிச்சை ஆலோசனையை பதிவு செய்க' : isHi ? 'केंद्र B में सर्जरी परामर्श तय करें' : 'Lock In Surgery Schedule at Centre B',
        actionText: isTa ? 'மையம் B விவரங்களை பார்க்க' : isHi ? 'केंद्र B विवरण देखें' : 'View Centre B Details',
        targetView: 'healthcare-matching',
        description: isTa 
          ? 'குறுகிய காத்திருப்பு நேரத்தை பயன்படுத்தி டாக்டர் மேனனுடன் சந்திப்பை பதிவு செய்க.' 
          : isHi 
          ? 'कम प्रतीक्षा समय का लाभ उठाने के लिए केंद्र B में अग्रिम परामर्श लें।' 
          : 'Reserve your pre-surgical consultation at Centre B to take advantage of their 4-day wait time.'
      },
      {
        title: isTa ? 'PMJAY மற்றும் அரவிந்தர் நிதிக்கு விண்ணப்பிக்கவும்' : isHi ? 'PMJAY एवं अरबिंदो अनुदान के लिए आवेदन करें' : 'Apply for PMJAY & Sri Aurobindo Grant',
        actionText: isTa ? 'நிதி உதவிகளை பார்க்க' : isHi ? 'वित्तीय विकल्प देखें' : 'Review Financial Options',
        targetView: 'financial-support',
        description: isTa 
          ? '₹3,00,000 நிதி இடைவெளியை போக்க காப்பீட்டு முன்அனுமதியை தொடங்கவும்.' 
          : isHi 
          ? '₹3,00,000 के अंतर को समाप्त करने के लिए बीमा एवं अनुदान प्रक्रिया शुरू करें।' 
          : 'Initiate the PMJAY pre-authorization and the NGO grant to eliminate the estimated ₹3,00,000 gap.'
      },
      {
        title: isTa ? 'ஆஷா சுகாதார பணியாளர் அனிதாவுடன் இணைக' : isHi ? 'आशा कार्यकर्ता अनिता से संपर्क करें' : 'Connect with ASHA Lead Anitha',
        actionText: isTa ? 'அனிதாவிடம் உதவி கோருக' : isHi ? 'सहायता का अनुरोध करें' : 'Request Worker Assistance',
        targetView: 'follow-up',
        description: isTa 
          ? 'சுகாதார பணியாளர் அனிதா உள்ளூர் ரத்த பரிசோதனை மற்றும் பயண ஏற்பாடுகளை செய்து தருவார்.' 
          : isHi 
          ? 'कार्यकर्ता अनिता स्थानीय जांच और यात्रा व्यवस्था में पूरा सहयोग करेंगी।' 
          : 'Your designated health worker Anitha can coordinate local blood test pickups and travel logistics.'
      }
    ];

    return {
      overallRisk,
      riskScore,
      factors: localizedFactors,
      possibleNextSteps: localizedSteps
    };
  }

  // Audit Logs
  static getAuditLogs(): AuditLogEntry[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialAuditLogs;
  }

  static addAuditLog(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): void {
    const current = this.getAuditLogs();
    const newEntry: AuditLogEntry = {
      id: 'log-' + Date.now(),
      timestamp: 'Just now',
      ...entry
    };
    const updated = [newEntry, ...current].slice(0, 30);
    try {
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  }

  // Consent status
  static getConsentStatus(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEYS.CONSENT_GIVEN) === 'true';
    } catch {
      return false;
    }
  }

  static setConsentStatus(granted: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CONSENT_GIVEN, String(granted));
    } catch (e) {
      console.error(e);
    }
  }

  // Uploaded patient reports
  static getPatientReports(): Array<{ id: string; name: string; type: string; size: number; uploadedAt: string }> {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REPORTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  }

  static savePatientReports(reports: Array<{ id: string; name: string; type: string; size: number; uploadedAt: string }>) {
    try {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    } catch (e) {
      console.error(e);
    }
  }

  // Offline queue
  static queueOfflineAction(actionName: string, data: any): void {
    try {
      const queue = JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE) || '[]');
      queue.push({
        id: 'offline-' + Date.now(),
        timestamp: new Date().toISOString(),
        actionName,
        data
      });
      localStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(queue));
    } catch (e) {
      console.error(e);
    }
  }

  static getOfflineQueue(): any[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE) || '[]');
    } catch {
      return [];
    }
  }

  static clearOfflineQueue(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.OFFLINE_QUEUE);
    } catch (e) {
      console.error(e);
    }
  }

  // Full demo reset
  static resetAllDemoData(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.PATIENT_DATA);
      localStorage.removeItem(STORAGE_KEYS.AUDIT_LOGS);
      localStorage.removeItem(STORAGE_KEYS.OFFLINE_QUEUE);
      localStorage.removeItem(STORAGE_KEYS.SELECTED_HOSPITAL);
      localStorage.removeItem(STORAGE_KEYS.CONSENT_GIVEN);
      localStorage.removeItem(STORAGE_KEYS.REPORTS);
      ['en', 'ta', 'hi'].forEach(l => {
        localStorage.removeItem(STORAGE_KEYS.FINANCIAL_SCHEMES_PREFIX + l);
      });
    } catch (e) {
      console.error(e);
    }
  }
}
