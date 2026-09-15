export type UserRole = 'patient' | 'doctor' | 'healthworker';

export type Language = 'en' | 'ta' | 'hi';

export type VerificationStatus = 'patient_provided' | 'care_team_review' | 'ai_assisted' | 'doctor_verified';

export type RiskLevel = 'low' | 'medium' | 'high';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
  password?: string;
  avatar?: string;
  title?: string;
  location?: string;
}

export interface CarePassportData {
  patientId: string;
  fullName: string;
  age: number;
  location: string;
  preferredLanguage: string;
  phone: string;
  
  // Clinical info
  diagnosis: string;
  stage: string;
  biomarkers: string; // e.g., ER+ / PR+ / HER2-
  requiredCare: string[]; // ['Surgery', 'Oncology Consultation', 'Radiation Therapy']
  currentTreatment: string;
  recommendedTreatment: string;
  currentHospital: string;
  
  // Access & Tolerance
  travelToleranceKm: number;
  financialGap: number; // e.g. 300000
  totalEstimatedCost: number; // e.g. 900000
  coverageEstimated: number; // e.g. 600000
  accessBarriers: string[]; // ['Travel distance > 50km', 'Out-of-pocket funding gap', 'Specialist availability']
  
  // Verification states for specific critical items
  clinicalVerification: {
    status: VerificationStatus;
    verifiedBy?: string;
    verifiedAt?: string;
    notes?: string;
  };
  
  journeyStep: number; // 1 to 6
  lastUpdated: string;
}

export interface HospitalMatch {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  travelTime: string;
  surgeryAvailable: boolean;
  oncologyAvailable: boolean;
  radiotherapyAvailable: boolean;
  waitingTimeDays: number;
  feasibilityScore: number; // 0 - 100
  whyRecommended: string;
  isRecommended: boolean;
  contactNumber: string;
  supportedSchemes: string[];
}

export interface FinancialScheme {
  id: string;
  category: 'government' | 'hospital' | 'ngo' | 'pharma' | 'financing' | 'crowdfunding';
  title: string;
  provider: string;
  potentialAmount: number;
  coverageDescription: string;
  whyRelevant: string;
  applicationStatus: 'not_applied' | 'in_review' | 'approved' | 'eligible_to_apply';
  documentsNeeded: string[];
}

export interface AccessRiskAssessment {
  overallRisk: RiskLevel;
  riskScore: number; // 1 - 10
  factors: {
    name: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
    icon: string;
  }[];
  possibleNextSteps: {
    title: string;
    actionText: string;
    targetView: string;
    description: string;
  }[];
}

export interface CarePathwayStep {
  id: string;
  stageName: string;
  status: 'completed' | 'current' | 'upcoming';
  dateOrDuration: string;
  summary: string;
  details: string;
  assignedEntity?: string;
}

export interface AppointmentReminder {
  id: string;
  type: 'consultation' | 'test' | 'milestone' | 'transport';
  title: string;
  date: string;
  time: string;
  location: string;
  specialist: string;
  status: 'confirmed' | 'pending' | 'completed';
  actionPrompt: string;
  instructions: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  details: string;
  patientId: string;
}

export type AppView = 
  | 'landing'
  | 'login'
  | 'consent'
  | 'report-upload'
  | 'patient-home'
  | 'patient-info'
  | 'care-passport'
  | 'healthcare-matching'
  | 'financial-support'
  | 'treatment-risk'
  | 'care-pathway'
  | 'follow-up'
  | 'doctor-dashboard'
  | 'doctor-patient-review'
  | 'healthworker-dashboard'
  | 'audit-log';
