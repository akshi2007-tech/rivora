import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  UserRole,
  Language,
  AppView,
  CarePassportData,
  HospitalMatch,
  FinancialScheme,
  AuditLogEntry
} from '../types';
import { mockUsers } from '../data/mockData';
import { DataService } from '../services/dataService';
import { authApi, setAuthToken } from '../services/api';
import { translations, Translations } from '../i18n/translations';

interface Toast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'caution';
}

interface AppContextType {
  currentUser: User | null;
  currentRole: UserRole;
  currentView: AppView;
  isAuthenticated: boolean;
  language: Language;
  t: Translations;
  isLowConnectivity: boolean;
  offlineQueueCount: number;
  patientData: CarePassportData;
  selectedHospital: HospitalMatch | null;
  financialSchemes: FinancialScheme[];
  auditLogs: AuditLogEntry[];
  toast: Toast | null;
  
  // Navigation & Role Handlers
  navigate: (view: AppView) => void;
  login: (role: UserRole, identifier: string, password: string) => Promise<boolean>;
  logout: () => void;
  addAnotherUser: () => void;
  switchRole: (role: UserRole) => void;
  setLanguage: (lang: Language) => void;
  toggleLowConnectivity: () => void;
  syncOfflineData: () => void;
  
  // State Mutators
  updatePatientData: (data: Partial<CarePassportData>) => void;
  verifyClinicalInfo: (doctorName?: string, notes?: string) => void;
  resetVerificationToAI: () => void;
  selectHospital: (hospital: HospitalMatch) => void;
  toggleSchemeApplication: (schemeId: string) => void;
  resetDemo: () => void;
  showToast: (message: string, type?: 'info' | 'success' | 'caution') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('patient');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [language, setLanguageState] = useState<Language>('en');
  const [isLowConnectivity, setIsLowConnectivity] = useState<boolean>(false);
  const [offlineQueueCount, setOfflineQueueCount] = useState<number>(0);
  
  const [patientData, setPatientData] = useState<CarePassportData>(DataService.getPatientData());
  const [selectedHospital, setSelectedHospitalState] = useState<HospitalMatch | null>(DataService.getSelectedHospital('en'));
  const [financialSchemes, setFinancialSchemes] = useState<FinancialScheme[]>(DataService.getFinancialSchemes('en'));
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(DataService.getAuditLogs());
  const [toast, setToast] = useState<Toast | null>(null);

  const getDefaultPatientView = (): AppView => {
    if (!DataService.getConsentStatus()) return 'consent';
    const uploadedReports = DataService.getPatientReports();
    const verified = DataService.getPatientData().clinicalVerification.status === 'doctor_verified';
    return verified ? 'patient-home' : uploadedReports.length > 0 ? 'report-upload' : 'consent';
  };

  const getRoleHomeView = (role: UserRole): AppView => {
    if (role === 'doctor') return 'doctor-dashboard';
    if (role === 'healthworker') return 'healthworker-dashboard';
    return getDefaultPatientView();
  };

  useEffect(() => {
    if (currentUser) {
      setCurrentRole(currentUser.role);
    } else {
      setCurrentRole('patient');
    }
  }, [currentUser]);

  // Sync localized data when language changes
  useEffect(() => {
    setFinancialSchemes(DataService.getFinancialSchemes(language));
    setSelectedHospitalState(DataService.getSelectedHospital(language));
  }, [language]);

  // Toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string, type: 'info' | 'success' | 'caution' = 'info') => {
    setToast({
      id: 'toast-' + Date.now(),
      message,
      type
    });
  };

  const navigate = (view: AppView) => {
    const isAllowedForRole = (viewToCheck: AppView, role: UserRole) => {
      if (role === 'patient') {
        return !['doctor-dashboard', 'doctor-patient-review', 'healthworker-dashboard', 'audit-log'].includes(viewToCheck);
      }
      if (role === 'doctor') {
        return !['healthworker-dashboard'].includes(viewToCheck);
      }
      if (role === 'healthworker') {
        return !['doctor-dashboard', 'doctor-patient-review', 'audit-log'].includes(viewToCheck);
      }
      return true;
    };

    if (!isAuthenticated && view !== 'landing' && view !== 'login') {
      setCurrentView('landing');
      showToast('Please sign in to continue.', 'caution');
      return;
    }

    if (!isAllowedForRole(view, currentRole)) {
      const redirect = currentRole === 'patient' ? getDefaultPatientView() : currentRole === 'doctor' ? 'doctor-dashboard' : 'healthworker-dashboard';
      showToast('This area is available to your care team.', 'caution');
      setCurrentView(redirect);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const login = async (role: UserRole, identifier: string, password: string): Promise<boolean> => {
    const cleanedIdentifier = identifier.trim();

    try {
      const response = await authApi.login({
        email: cleanedIdentifier,
        password,
        role
      });

      const apiUser = response.data.user;
      const loggedInUser: User = {
        id: apiUser.id,
        name: apiUser.name,
        role: apiUser.role as UserRole,
        email: apiUser.email
      };

      setAuthToken(response.data.token);
      setCurrentUser(loggedInUser);
      setCurrentRole(loggedInUser.role);
      setIsAuthenticated(true);
      setCurrentView(getRoleHomeView(loggedInUser.role));
      showToast(`Welcome back, ${loggedInUser.name}.`, 'success');
      return true;
    } catch (error) {
      const matchedUser = mockUsers.find(user => {
        if (user.role !== role) return false;
        const matchesId = user.id === cleanedIdentifier || user.email === cleanedIdentifier.toLowerCase();
        return matchesId && user.password === password;
      });

      if (!matchedUser) {
        const message = error instanceof Error ? error.message : 'Incorrect credentials for this role. Please try again.';
        showToast(message, 'caution');
        return false;
      }

      setAuthToken(null);
      setCurrentUser(matchedUser);
      setCurrentRole(matchedUser.role);
      setIsAuthenticated(true);
      setCurrentView(getRoleHomeView(matchedUser.role));
      showToast(`Welcome back, ${matchedUser.name}.`, 'success');
      return true;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRole('patient');
    setIsAuthenticated(false);
    setCurrentView('landing');
    showToast('You have been signed out.', 'info');
  };

  const addAnotherUser = () => {
    setCurrentUser(null);
    setCurrentRole('patient');
    setIsAuthenticated(false);
    setCurrentView('login');
    showToast('Please sign in with another account.', 'info');
  };

  const switchRole = (role: UserRole) => {
    const user = mockUsers.find(u => u.role === role) || mockUsers[0];
    setCurrentUser(user);
    setCurrentRole(role);
    setIsAuthenticated(true);
    setCurrentView(getRoleHomeView(role));
    showToast(`Signed in as ${user.name}.`, 'info');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    const label = lang === 'ta' ? 'தமிழ் (முழுமையான தமிழ்)' : lang === 'hi' ? 'हिन्दी (संपूर्ण हिन्दी)' : 'English';
    showToast(`Language set to ${label}`, 'info');
  };

  const toggleLowConnectivity = () => {
    const nextState = !isLowConnectivity;
    setIsLowConnectivity(nextState);
    if (nextState) {
      showToast("Low connectivity mode enabled. Updates will queue locally.", 'caution');
    } else {
      syncOfflineData();
    }
  };

  const syncOfflineData = () => {
    const queue = DataService.getOfflineQueue();
    if (queue.length > 0) {
      showToast(`Connected. Synced ${queue.length} offline updates.`, 'success');
      DataService.clearOfflineQueue();
      setOfflineQueueCount(0);
    } else {
      showToast("Online connection restored.", 'success');
    }
  };

  const updatePatientData = (newData: Partial<CarePassportData>) => {
    if (isLowConnectivity) {
      DataService.queueOfflineAction('Update Patient Profile', newData);
      setOfflineQueueCount(prev => prev + 1);
      showToast("Saved locally in offline queue.", 'caution');
    }

    const actorName = currentUser?.name || 'Lakshmi Narayanan';
    const actorRole = currentUser?.role || 'patient';
    const updated = DataService.savePatientData(newData, actorName, actorRole);
    setPatientData(updated);
    setAuditLogs(DataService.getAuditLogs());
  };

  const verifyClinicalInfo = (
    doctorName = currentUser?.name || 'Dr. R. Menon',
    notes = 'Verified biopsy parameters, stage IIB classification, and surgical readiness.'
  ) => {
    const updated = DataService.verifyClinicalInfo(doctorName, notes);
    setPatientData(updated);
    setAuditLogs(DataService.getAuditLogs());
    showToast('Clinical record verified by ' + doctorName, 'success');
  };

  const resetVerificationToAI = () => {
    const updated = DataService.resetVerificationToAI();
    setPatientData(updated);
    showToast('Reset clinical status to pending care team review for demo.', 'info');
  };

  const selectHospital = (hospital: HospitalMatch) => {
    DataService.setSelectedHospital(hospital);
    setSelectedHospitalState(hospital);
    showToast(`Selected ${hospital.name}`, 'success');
  };

  const toggleSchemeApplication = (schemeId: string) => {
    const updated = DataService.toggleSchemeApplication(schemeId, language);
    setFinancialSchemes(updated);
    const item = updated.find(s => s.id === schemeId);
    if (item?.applicationStatus === 'in_review') {
      showToast(`Selected ${item.title} for funding assistance.`, 'success');
    } else {
      showToast(`Removed ${item?.title}`, 'info');
    }
  };

  const resetDemo = () => {
    DataService.resetAllDemoData();
    setPatientData(DataService.getPatientData());
    setFinancialSchemes(DataService.getFinancialSchemes(language));
    setAuditLogs(DataService.getAuditLogs());
    setSelectedHospitalState(DataService.getSelectedHospital(language));
    setOfflineQueueCount(0);
    setIsLowConnectivity(false);
    setCurrentUser(null);
    setCurrentRole('patient');
    setIsAuthenticated(false);
    setCurrentView('landing');
    showToast('Demo data reset to initial state.', 'info');
  };

  const t = translations[language] || translations.en;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        currentView,
        isAuthenticated,
        language,
        t,
        isLowConnectivity,
        offlineQueueCount,
        patientData,
        selectedHospital,
        financialSchemes,
        auditLogs,
        toast,
        navigate,
        login,
        logout,
        addAnotherUser,
        switchRole,
        setLanguage,
        toggleLowConnectivity,
        syncOfflineData,
        updatePatientData,
        verifyClinicalInfo,
        resetVerificationToAI,
        selectHospital,
        toggleSchemeApplication,
        resetDemo,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
