import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  secureConnection: string;
  youAreNotAlone: string;
  oneStepAtATime: string;

  patient: string;
  doctor: string;
  healthWorker: string;
  loginAs: string;
  switchRole: string;
  signOut: string;
  roleSelectionPrompt: string;
  patientRoleLabel: string;
  doctorRoleLabel: string;
  healthworkerRoleLabel: string;
  patientRoleHelper: string;
  doctorRoleHelper: string;
  healthworkerRoleHelper: string;
  patientIdLabel: string;
  doctorIdLabel: string;
  healthworkerIdLabel: string;
  passwordLabel: string;
  enterPassword: string;
  demoCredentials: string;
  continueAsRole: string;
  secureSessionText: string;

  navJourney: string;
  navPassport: string;
  navCareCentres: string;
  navFinancial: string;
  navRisk: string;
  navPathway: string;
  navFollowUp: string;
  navDashboard: string;
  navAuditLog: string;

  startJourney: string;
  aboutRivora: string;
  backToStart: string;
  exploreRivora: string;
  continue: string;
  back: string;
  saveAndContinue: string;
  verifyInformation: string;
  verified: string;
  viewDetails: string;
  applyForSupport: string;
  callCentre: string;
  offlineBanner: string;
  offlineSubtext: string;
  beginAssessment: string;
  continueJourney: string;
  uploadMoreReports: string;
  returnHome: string;
  browseFiles: string;
  remove: string;
  saveViewCarePassport: string;

  doctorVerified: string;
  clinicalIntakeReview: string;
  patientProvided: string;
  potentiallyRelevant: string;

  helloPatient: string;
  journeyOverview: string;
  nextStepPrompt: string;

  formStep1Title: string;
  formStep1Subtitle: string;
  formStep2Title: string;
  formStep2Subtitle: string;
  formStep3Title: string;
  formStep3Subtitle: string;
  fullName: string;
  ageYears: string;
  preferredLanguage: string;
  residentialDistrict: string;
  locationHelper: string;
  continueClinicalCare: string;
  histopathologicalDiagnosis: string;
  confirmedClinicalStage: string;
  currentHospital: string;
  recommendedCarePlan: string;
  recommendedCareHelper: string;
  continueAccessNeeds: string;
  maxTravelDistance: string;
  localDistance: string;
  regionalDistance: string;
  metropolitanDistance: string;
  fundingConcern: string;
  accessBarriersQuestion: string;
  barrierTravel: string;
  barrierGap: string;
  barrierWaitingTimes: string;
  barrierCompanion: string;
  barrierScheme: string;

  totalEstimate: string;
  potentialSupport: string;
  remainingGap: string;

  accessRiskTitle: string;
  accessRiskSubtitle: string;
  possibleNextSteps: string;

  trustHeader: string;
  trustItem1: string;
  trustItem2: string;
  trustItem3: string;
  trustItem4: string;

  consentIntro: string;
  consentItem1Title: string;
  consentItem1Desc: string;
  consentItem2Title: string;
  consentItem2Desc: string;
  consentItem3Title: string;
  consentItem3Desc: string;
  consentCheckboxText: string;

  uploadMedicalReportsHeader: string;
  uploadMedicalReportsSubtext: string;
  dragAndDropReports: string;
  fileFormats: string;
  selectedFiles: string;
  reportSubmittedReviewHeader: string;
  reportSubmittedReviewBody: string;
  waitingDoctorVerification: string;
  waitingReviewing: string;

  stepThreeOfSix: string;
  healthcareMatchingTitle: string;
  healthcareMatchingSubtitle: string;
  showingCentres: string;
  showOnlyOnsiteOncology: string;
  selectedCentre: string;
  chooseThisCentre: string;
  topCareRecommendation: string;
  kmAway: string;
  avgWait: string;
  breastOncoSurgery: string;
  medicalOncologySpecialists: string;
  radiationFacility: string;
  accepts: string;
  nextJourneyStep: string;
  makeAffordable: string;
  reviewRiskPathway: string;

  stepFourOfSix: string;
  financialSupportTitle: string;
  financialSupportSubtitle: string;
  allMatchedOptions: string;
  governmentPmjay: string;
  ngoGrants: string;
  pharmaSubsidies: string;
  zeroPercentFinancing: string;
  communityRelief: string;
  providedBy: string;
  potentialAssistance: string;
  whyThisMatters: string;
  hideDetails: string;
  viewDocuments: string;
  selectThisOption: string;
  removeSelection: string;
  documentsRequired: string;
  howCareTeamHelps: string;

  emotionalCenterpiece: string;
  carePassportTitle: string;
  carePassportTagline: string;
  doctorVerifiedClinicalRecord: string;
  patientClinicalRecordPending: string;
  verifiedByDoctor: string;
  careTeamReviewing: string;
  resetClinicalDraft: string;
  verifyAsDoctor: string;
  officialCareRecord: string;
  patientVerified: string;
  yearsOldFemale: string;
  clinicalDiagnosisProfile: string;
  pathologyDiagnosis: string;
  confirmedStaging: string;
  biomarkersProfile: string;

  stepSixOfSix: string;
  yourNextStep: string;
  followUpSubtitle: string;
  immediatePriority: string;
  confirmedAppointment: string;
  dateAndTime: string;
  hospitalLocation: string;
  whatToBring: string;
  downloadSlip: string;
  callOpdHelpdesk: string;
  supportingPreparations: string;
  arranged: string;
  thisIsWhatNext: string;

  stepFiveOfSix: string;
  carePathwayTitle: string;
  carePathwaySubtitle: string;
  youAreHere: string;
  completed: string;
  leadLabel: string;
  viewNextAppointment: string;
  finalJourneyStage: string;
  reviewFollowUps: string;
  continueToFollowUp: string;

  aboutBody1: string;
  aboutBody2: string;
  aboutBody3: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'RIVORA',
    tagline: 'Your care journey. One place.',
    secureConnection: 'Secure connection',
    youAreNotAlone: 'You are not alone in this.',
    oneStepAtATime: "Let's take this one step at a time.",

    patient: 'Lakshmi (Patient)',
    doctor: 'Dr. R. Menon (Doctor)',
    healthWorker: 'Anitha (ASHA Health Worker)',
    loginAs: 'Sign in to your care portal',
    switchRole: 'Demo Role Switcher',
    signOut: 'Sign Out',
    roleSelectionPrompt: 'Select your role to access your personalized care environment.',
    patientRoleLabel: 'Patient',
    doctorRoleLabel: 'Doctor',
    healthworkerRoleLabel: 'Health Worker',
    patientRoleHelper: 'Care navigation and support',
    doctorRoleHelper: 'Clinical verification and review',
    healthworkerRoleHelper: 'Patient assistance and support',
    patientIdLabel: 'Email / Patient ID',
    doctorIdLabel: 'Doctor ID / Email',
    healthworkerIdLabel: 'Health Worker ID / Email',
    passwordLabel: 'Password',
    enterPassword: 'Enter password',
    demoCredentials: 'Demo credentials',
    continueAsRole: 'Continue as',
    secureSessionText: '256-bit Encrypted Session • Patient Data Isolated',

    navJourney: 'Journey',
    navPassport: 'Care Passport',
    navCareCentres: 'Care Options',
    navFinancial: 'Financial Support',
    navRisk: 'Access Risk',
    navPathway: 'Care Pathway',
    navFollowUp: 'Next Steps',
    navDashboard: 'Dashboard',
    navAuditLog: 'Audit Log',

    startJourney: 'Start Your Care Journey',
    aboutRivora: 'About RIVORA',
    backToStart: 'Back to the start',
    exploreRivora: 'Explore RIVORA',
    continue: 'Continue',
    back: 'Back',
    saveAndContinue: 'Save & Continue',
    verifyInformation: 'Verify Clinical Record',
    verified: 'Doctor Verified',
    viewDetails: 'View Details',
    applyForSupport: 'Explore This Option',
    callCentre: 'Contact Centre',
    offlineBanner: "You're in low-connectivity mode",
    offlineSubtext: 'Your updates are saved locally and will sync once reconnected.',
    beginAssessment: 'Begin Patient Assessment',
    continueJourney: 'Continue to Your Care Journey',
    uploadMoreReports: 'Upload more reports',
    returnHome: 'Return to Home',
    browseFiles: 'Browse files',
    remove: 'Remove',
    saveViewCarePassport: 'Save & View Care Passport',

    doctorVerified: 'Doctor verified',
    clinicalIntakeReview: 'Care team intake — review required',
    patientProvided: 'Patient provided',
    potentiallyRelevant: 'Potentially relevant',

    helloPatient: 'Hello, Lakshmi',
    journeyOverview: 'Your Care Navigation Progress',
    nextStepPrompt: 'Continue your next step',

    formStep1Title: "Let's start with you",
    formStep1Subtitle: 'Basic information to help your doctors find local care near you.',
    formStep2Title: 'Tell us about your current care',
    formStep2Subtitle: 'Understanding your diagnosis and recommended treatments.',
    formStep3Title: "Let's understand what might make care difficult",
    formStep3Subtitle: 'Highlighting travel, financial, or availability hurdles so your care team can resolve them.',
    fullName: 'Full Name',
    ageYears: 'Age (Years)',
    preferredLanguage: 'Preferred Communication Language',
    residentialDistrict: 'Residential District / Location',
    locationHelper: 'Used to compute accurate travel distance to specialized oncology centres.',
    continueClinicalCare: 'Continue to Clinical Care',
    histopathologicalDiagnosis: 'Histopathological Diagnosis',
    confirmedClinicalStage: 'Confirmed Clinical Stage',
    currentHospital: 'Current Hospital / Referral Point',
    recommendedCarePlan: 'Recommended Care / Treatment Plan',
    recommendedCareHelper: 'This helps match hospitals with dedicated surgical and medical oncology teams.',
    continueAccessNeeds: 'Continue to Access Needs',
    maxTravelDistance: 'Maximum Travel Distance You Can Comfortably Manage',
    localDistance: 'Local (20 km)',
    regionalDistance: 'Regional Hub (75 km)',
    metropolitanDistance: 'Metropolitan (150 km)',
    fundingConcern: 'Estimated Out-of-Pocket Funding Concern',
    accessBarriersQuestion: 'Are you concerned about any of the following? (Select all that apply)',
    barrierTravel: 'Travel distance to specialized cancer centres (> 50 km)',
    barrierGap: 'Out-of-pocket gap of ₹3,00,000 for specialized targeted adjuvant therapy',
    barrierWaitingTimes: 'Specialist oncology waiting times in local district',
    barrierCompanion: 'Need accompaniment or lodging support for companion',
    barrierScheme: 'Need help applying for PMJAY / Chief Minister scheme',

    totalEstimate: 'Treatment Estimate',
    potentialSupport: 'Potential Support',
    remainingGap: 'Remaining Estimated Gap',

    accessRiskTitle: 'Things that may affect your care journey',
    accessRiskSubtitle: 'We assess access barriers early so your care team can connect you with practical solutions.',
    possibleNextSteps: 'Possible next steps to reduce delay',

    trustHeader: "You're in control of your information",
    trustItem1: 'Your personal information is encrypted & protected',
    trustItem2: 'Role-based access ensures only authorized doctors and health workers see clinical data',
    trustItem3: 'Explicit consent-based sharing for all support applications',
    trustItem4: 'Full transparent activity history of who accessed your records',

    consentIntro: 'Before we begin your care navigation journey, please confirm how you’d like RIVORA to support you.',
    consentItem1Title: 'Matching you with equipped care centres',
    consentItem1Desc: 'We use your location and biopsy diagnosis to find hospitals that have the required surgery, oncology specialists, and manageable waiting times.',
    consentItem2Title: 'Identifying financial support & grants',
    consentItem2Desc: 'We evaluate government schemes (PMJAY) and NGO assistance to help close your ₹3,00,000 funding gap. Your identity is never shared publicly.',
    consentItem3Title: 'Doctor verification & health worker assistance',
    consentItem3Desc: 'Dr. Menon and community worker Anitha can view and verify clinical records to ensure safety. You can revoke access at any time.',
    consentCheckboxText: 'I agree to use RIVORA for care navigation and personalized support matching.',

    uploadMedicalReportsHeader: 'Upload your medical reports',
    uploadMedicalReportsSubtext: 'Before we can build your care journey, your medical information needs to be reviewed by a doctor. Your reports help your care team understand where you are in your journey.',
    dragAndDropReports: 'Drag and drop your reports here',
    fileFormats: 'PDF, JPG, JPEG, PNG',
    selectedFiles: 'Selected files',
    reportSubmittedReviewHeader: 'Reports submitted for review',
    reportSubmittedReviewBody: 'Your reports have been submitted to the care team. A doctor will review the information before your care journey is created.',
    waitingDoctorVerification: 'Waiting for doctor verification',
    waitingReviewing: 'Your information is being reviewed by your care team.',

    stepThreeOfSix: 'Step 3 of 6 • Healthcare Matching',
    healthcareMatchingTitle: 'Care options that may work for you',
    healthcareMatchingSubtitle: 'We evaluate surgical capacity, specialist oncologist availability, and waiting times to find hospitals equipped for Stage II breast cancer care.',
    showingCentres: 'Showing',
    showOnlyOnsiteOncology: 'Show only centres with On-Site Medical Oncology',
    selectedCentre: 'Selected Centre',
    chooseThisCentre: 'Choose This Centre',
    topCareRecommendation: 'Top Care Recommendation',
    kmAway: 'km away',
    avgWait: 'Avg Wait',
    breastOncoSurgery: 'Breast Onco-Surgery',
    medicalOncologySpecialists: 'Medical Oncology Specialists',
    radiationFacility: 'Radiation Facility',
    accepts: 'Accepts',
    nextJourneyStep: 'Next Step in Your Journey',
    makeAffordable: 'Make Treatment Affordable with Matched Financial Support',
    reviewRiskPathway: 'Review Delay Risk and Pathway',

    stepFourOfSix: 'Step 4 of 6 • Financial Navigation',
    financialSupportTitle: "Let's make treatment more affordable",
    financialSupportSubtitle: 'Cancer care should not cause financial exhaustion. We have matched verified government and philanthropic programs that may cover your care.',
    allMatchedOptions: 'All Matched Options',
    governmentPmjay: 'Government (PMJAY)',
    ngoGrants: 'NGO Grants',
    pharmaSubsidies: 'Pharma Subsidies',
    zeroPercentFinancing: '0% Financing',
    communityRelief: 'Community Relief',
    providedBy: 'Provided by',
    potentialAssistance: 'Potential Assistance',
    whyThisMatters: 'Why this matters for you',
    hideDetails: 'Hide Details',
    viewDocuments: 'View Documents and Requirements',
    selectThisOption: 'Select This Option',
    removeSelection: 'Remove Selection',
    documentsRequired: 'Documents required from you',
    howCareTeamHelps: 'How your care team will help',

    emotionalCenterpiece: 'The Emotional Centerpiece',
    carePassportTitle: 'Your RIVORA Care Passport',
    carePassportTagline: '"Everything important about my care, in one calm and trustworthy place."',
    doctorVerifiedClinicalRecord: 'Doctor Verified Clinical Record',
    patientClinicalRecordPending: 'Clinical Intake Record — Pending Oncologist Sign-off',
    verifiedByDoctor: 'Verified by',
    careTeamReviewing: 'Your information is being reviewed by your care team.',
    resetClinicalDraft: 'Reset to Clinical Draft',
    verifyAsDoctor: 'Verify as Dr. Menon',
    officialCareRecord: 'Official Care Record',
    patientVerified: 'Patient Verified',
    yearsOldFemale: 'Years Old (Female)',
    clinicalDiagnosisProfile: 'Clinical Diagnosis & Receptor Profile',
    pathologyDiagnosis: 'Pathology Diagnosis',
    confirmedStaging: 'Confirmed Staging',
    biomarkersProfile: 'Biomarkers & IHC Profile',

    stepSixOfSix: 'Step 6 of 6 • Follow-up & Next Actions',
    yourNextStep: 'Your Next Step',
    followUpSubtitle: 'A calm, focused view of exactly what happens next. No complicated calendars — just simple, confirmed actions.',
    immediatePriority: 'Immediate Priority',
    confirmedAppointment: 'Confirmed Appointment',
    dateAndTime: 'Date & Time',
    hospitalLocation: 'Hospital Location',
    whatToBring: 'What to bring with you',
    downloadSlip: 'Download Appointment & Travel Slip',
    callOpdHelpdesk: 'Call OPD Helpdesk',
    supportingPreparations: 'Supporting Preparations & Milestones',
    arranged: 'Arranged',
    thisIsWhatNext: 'This is what happens next',

    stepFiveOfSix: 'Step 5 of 6 • Your Care Pathway',
    carePathwayTitle: 'Your Personalized Care Pathway',
    carePathwaySubtitle: '"I know what happens next." A clear, sequential roadmap from diagnosis through surgery, financial clearance, and long-term recovery.',
    youAreHere: 'You Are Here',
    completed: 'Completed',
    leadLabel: 'Lead',
    viewNextAppointment: 'View Next Appointment Details',
    finalJourneyStage: 'Final Journey Stage',
    reviewFollowUps: 'Review Your Upcoming Follow-ups & Reminders',
    continueToFollowUp: 'Continue to Follow-up',

    aboutBody1: 'A diagnosis can change everything in a moment. But the questions that come after it can be just as difficult: Where should I go? Who will treat me? Can I afford it? How far will I have to travel? What happens next?',
    aboutBody2: 'RIVORA was created to make those questions easier to navigate. It brings a patient&apos;s medical information, care options, financial support and follow-ups into one place, while keeping doctors and health workers part of the journey. Instead of leaving patients to figure everything out on their own, RIVORA helps turn a complicated path into clear next steps.',
    aboutBody3: 'Because treatment should not feel impossible simply because finding the right path is difficult.',
  },

  ta: {
    appName: 'ரிவோரா (RIVORA)',
    tagline: 'உங்கள் சிகிச்சை பயணம். ஒரே இடத்தில்.',
    secureConnection: 'பாதுகாப்பான இணைப்பு',
    youAreNotAlone: 'இதில் நீங்கள் தனியாக இல்லை.',
    oneStepAtATime: 'ஒவ்வொரு படியாக நிதானமாகப் பார்ப்போம்.',

    patient: 'இலட்சுமி (நோயாளி)',
    doctor: 'டாக்டர் ஆர். மேனன் (மருத்துவர்)',
    healthWorker: 'அனிதா (ஆஷா சுகாதார பணியாளர்)',
    loginAs: 'உங்கள் சிகிச்சை தளத்தில் நுழையுங்கள்',
    switchRole: 'பயனர் பாத்திரத்தை மாற்றவும்',
    signOut: 'வெளியேறு',
    roleSelectionPrompt: 'உங்கள் தனிப்பட்ட சிகிச்சை சூழலை அணுகுவதற்கு உங்கள் பாத்திரத்தைத் தேர்ந்தெடுக்கவும்.',
    patientRoleLabel: 'நோயாளி',
    doctorRoleLabel: 'மருத்துவர்',
    healthworkerRoleLabel: 'சுகாதார பணியாளர்',
    patientRoleHelper: 'சிகிச்சை வழிநடத்தல் மற்றும் ஆதரவு',
    doctorRoleHelper: 'மருத்துவ சரிபார்ப்பு மற்றும் மதிப்பாய்வு',
    healthworkerRoleHelper: 'நோயாளி உதவி மற்றும் ஆதரவு',
    patientIdLabel: 'மின்னஞ்சல் / நோயாளி அடையாள எண்',
    doctorIdLabel: 'மருத்துவர் அடையாள எண் / மின்னஞ்சல்',
    healthworkerIdLabel: 'சுகாதார பணியாளர் அடையாள எண் / மின்னஞ்சல்',
    passwordLabel: 'கடவுச்சொல்',
    enterPassword: 'கடவுச்சொல்லை உள்ளிடவும்',
    demoCredentials: 'டெமோ சான்றுகள்',
    continueAsRole: 'தொடரவும்',
    secureSessionText: '256-பிட் குறியாக்கப்பட்ட அமர்வு • நோயாளி தரவு தனிமைப்படுத்தப்பட்டது',

    navJourney: 'பயணம்',
    navPassport: 'சிகிச்சை பாஸ்போர்ட்',
    navCareCentres: 'சிகிச்சை மையங்கள்',
    navFinancial: 'நிதி உதவி',
    navRisk: 'அணுகல் இடர்',
    navPathway: 'சிகிச்சை வரைபடம்',
    navFollowUp: 'அடுத்த கட்டம்',
    navDashboard: 'பலகை',
    navAuditLog: 'பதிவு வரலாறு',

    startJourney: 'உங்கள் பயணத்தைத் தொடங்குங்கள்',
    aboutRivora: 'ரிவோரா பற்றி',
    backToStart: 'மீண்டும் தொடக்கத்துக்கு',
    exploreRivora: 'ரிவோராவை அறிக',
    continue: 'தொடரவும்',
    back: 'பின்னே செல்லவும்',
    saveAndContinue: 'சேமித்து தொடரவும்',
    verifyInformation: 'தகவலை உறுதிப்படுத்தவும்',
    verified: 'மருத்துவ அங்கீகாரம் பெற்றது',
    viewDetails: 'விவரங்களைப் பார்க்க',
    applyForSupport: 'இத்திட்டத்தின் விவரங்களை காண்க',
    callCentre: 'மையத்தைத் தொடர்புகொள்ள',
    offlineBanner: 'குறைந்த இணைய இணைப்பு முறை',
    offlineSubtext: 'உங்கள் தரவுகள் பாதுகாப்பாக சேமிக்கப்பட்டு, இணையம் வந்தவுடன் புதுப்பிக்கப்படும்.',
    beginAssessment: 'நோயாளி மதிப்பீட்டை தொடங்குக',
    continueJourney: 'உங்கள் சிகிச்சை பயணத்தை தொடரவும்',
    uploadMoreReports: 'மேலும் அறிக்கைகளை பதிவேற்றவும்',
    returnHome: 'முகப்புக்கு திரும்பு',
    browseFiles: 'கோப்புகளை தேடு',
    remove: 'நீக்கு',
    saveViewCarePassport: 'சேமித்து சிகிச்சை பாஸ்போர்ட்டைப் பார்க்கவும்',

    doctorVerified: 'மருத்துவர் சரிபார்த்தார்',
    clinicalIntakeReview: 'மருத்துவ குழு பதிவு — மதிப்பாய்வு தேவை',
    patientProvided: 'நோயாளி வழங்கியது',
    potentiallyRelevant: 'பயனுள்ளதாக அமையலாம்',

    helloPatient: 'வணக்கம், இலட்சுமி',
    journeyOverview: 'உங்கள் சிகிச்சை வழிசெலுத்தல் முன்னேற்றம்',
    nextStepPrompt: 'அடுத்த நிலையைத் தொடரவும்',

    formStep1Title: 'உங்களைப் பற்றி தொடங்குவோம்',
    formStep1Subtitle: 'உங்களுக்கு அருகிலுள்ள சிறந்த சிகிச்சையைக் கண்டறிய அடிப்படை விவரங்கள்.',
    formStep2Title: 'உங்கள் தற்போதைய சிகிச்சையைப் பற்றி கூறவும்',
    formStep2Subtitle: 'மருத்துவ நிலை மற்றும் பரிந்துரைக்கப்பட்ட சிகிச்சைகளைப் புரிந்துகொள்ள.',
    formStep3Title: 'சிகிச்சையை கடினமாக்கும் சவால்களைப் புரிந்துகொள்வோம்',
    formStep3Subtitle: 'பயணம், நிதி அல்லது காத்திருப்பு தடைகளை தீர்க்க உங்கள் மருத்துவ குழு முன்கூட்டியே திட்டமிடும்.',
    fullName: 'முழு பெயர்',
    ageYears: 'வயது (ஆண்டுகள்)',
    preferredLanguage: 'பிடித்த தகவல் தொடர்பு மொழி',
    residentialDistrict: 'குடியிருப்பு மாவட்டம் / இருப்பிடம்',
    locationHelper: 'சிறப்பு புற்றுநோய் மையங்களுக்கு துல்லியமான பயண தூரத்தை கணக்கிட பயன்படுத்தப்படுகிறது.',
    continueClinicalCare: 'மருத்துவ பராமரிப்பை தொடரவும்',
    histopathologicalDiagnosis: 'ஹிஸ்டோபேதாலஜிக்கல் நோயறிதல்',
    confirmedClinicalStage: 'நிச்சயிக்கப்பட்ட மருத்துவ நிலை',
    currentHospital: 'தற்போதைய மருத்துவமனை / பரிந்துரை புள்ளி',
    recommendedCarePlan: 'பரிந்துரைக்கப்பட்ட சிகிச்சை / சிகிச்சை திட்டம்',
    recommendedCareHelper: 'இது மருத்துவமனைகளை சிறப்பு அறுவை சிகிச்சை மற்றும் மருத்துவ புற்றுநோய் குழுக்களுடன் பொருத்த உதவுகிறது.',
    continueAccessNeeds: 'அணுகல் தேவைகளை தொடரவும்',
    maxTravelDistance: 'நீங்கள் வசதியாகச் செல்லக்கூடிய அதிகபட்ச பயண தூரம்',
    localDistance: 'உள்ளூர் (20 கி.மீ)',
    regionalDistance: 'மண்டல மையம் (75 கி.மீ)',
    metropolitanDistance: 'மெட்ரோபொலிஸ் (150 கி.மீ)',
    fundingConcern: 'மதிப்பிடப்பட்ட கையிலுள்ள நிதி கவலை',
    accessBarriersQuestion: 'பின்வருவனவற்றில் ஏதேனும் குறித்து நீங்கள் கவலைப்படுகிறீர்களா? (பொருந்துவதை அனைத்தையும் தேர்ந்தெடுக்கவும்)',
    barrierTravel: 'சிறப்பு புற்றுநோய் மையங்களுக்கு பயண தூரம் (> 50 கி.மீ)',
    barrierGap: 'சிறப்பு இலக்கு துணை சிகிச்சைக்கு ₹3,00,000 தோராயமாக கூடுதல் செலவு',
    barrierWaitingTimes: 'உள்ளூர் மாவட்டத்தில் நிபுணர் புற்றுநோய் காத்திருப்பு நேரம்',
    barrierCompanion: 'சக பயணியர் அல்லது தங்கும் உதவி தேவை',
    barrierScheme: 'PMJAY / முதல்வர் திட்டத்தில் விண்ணப்பிக்க உதவி தேவை',

    totalEstimate: 'மதிப்பிடப்பட்ட சிகிச்சை செலவு',
    potentialSupport: 'கிடைக்கக்கூடிய நிதி உதவி',
    remainingGap: 'மீதமுள்ள நிதி இடைவெளி',

    accessRiskTitle: 'சிகிச்சையை தாமதப்படுத்தக்கூடிய காரணிகள்',
    accessRiskSubtitle: 'சிகிச்சை தாமதங்களைத் தவிர்க்க எளிய நடைமுறை தீர்வுகளை உங்கள் மருத்துவ குழு வழங்குகிறது.',
    possibleNextSteps: 'தாமதத்தைத் தவிர்க்க சாத்தியமான அடுத்த படிகள்',

    trustHeader: 'உங்கள் தகவல் உங்கள் கட்டுப்பாட்டில் உள்ளது',
    trustItem1: 'தனிப்பட்ட தகவல்கள் குறியாக்கம் செய்யப்பட்டு பாதுகாக்கப்படுகின்றன',
    trustItem2: 'அங்கீகரிக்கப்பட்ட மருத்துவர்கள் மற்றும் சுகாதார பணியாளர்கள் மட்டுமே மருத்துவக் குறிப்புகளைக் காண முடியும்',
    trustItem3: 'உங்கள் ஒப்புதலுடன் மட்டுமே நிதி விண்ணப்பங்கள் பகிரப்படும்',
    trustItem4: 'யார் எப்போது அணுகினார்கள் என்ற முழுமையான வெளிப்படையான வரலாறு',

    consentIntro: 'உங்கள் சிகிச்சை வழிநடத்தல் பயணத்தை தொடங்குவதற்கு முன், ரிவோரா உங்களுக்கு எவ்வாறு உதவ விரும்புகிறீர்கள் என்பதை உறுதிப்படுத்தவும்.',
    consentItem1Title: 'தகுதிவாய்ந்த சிகிச்சை மையங்களுடன் பொருத்துதல்',
    consentItem1Desc: 'உங்கள் இருப்பிடம் மற்றும் பயாப்சு நோயறிதலைப் பயன்படுத்தி தேவையான அறுவை சிகிச்சை, புற்றுநோய் நிபுணர்கள் மற்றும் மேலாண்மை செய்யக்கூடிய காத்திருப்பு நேரம் உள்ள மருத்துவமனைகளை கண்டுபிடிக்கிறோம்.',
    consentItem2Title: 'நிதி உதவி மற்றும் மானியங்களை கண்டறிதல்',
    consentItem2Desc: 'PMJAY போன்ற அரசு திட்டங்கள் மற்றும் நன்கொடை உதவிகளை மதிப்பீடு செய்து ₹3,00,000 நிதி இடைவெளியை குறைக்க உதவுகிறோம். உங்கள் அடையாளம் எங்கும் பகிரப்படுவதில்லை.',
    consentItem3Title: 'மருத்துவர் சரிபார்ப்பு மற்றும் சுகாதார பணியாளர் உதவி',
    consentItem3Desc: 'டாக்டர் மேனன் மற்றும் சமூகப் பணியாளர் அனிதா மருத்துவத் தரவுகளைப் பார்த்து சரிபார்த்து பாதுகாப்பை உறுதி செய்கிறார்கள். எப்போது வேண்டுமானாலும் அணுகலை நிறுத்தலாம்.',
    consentCheckboxText: 'காப்பு வழிநடத்தல் மற்றும் தனிப்பட்ட ஆதரவு பொருத்துதலுக்காக ரிவோராவைப் பயன்படுத்த நான் ஒப்புக்கொள்கிறேன்.',

    uploadMedicalReportsHeader: 'உங்கள் மருத்துவ அறிக்கைகளை பதிவேற்றவும்',
    uploadMedicalReportsSubtext: 'உங்கள் சிகிச்சை பயணத்தை உருவாக்குவதற்கு முன், மருத்துவத் தகவல் மருத்துவரால் மதிப்பாய்வு செய்யப்பட வேண்டும். உங்கள் அறிக்கைகள் உங்கள் சிகிச்சை குழுவிற்கு உங்கள் நிலையை புரிந்துகொள்ள உதவுகின்றன.',
    dragAndDropReports: 'உங்கள் அறிக்கைகளை இங்கே இழுத்து விடவும்',
    fileFormats: 'PDF, JPG, JPEG, PNG',
    selectedFiles: 'தேர்ந்தெடுக்கப்பட்ட கோப்புகள்',
    reportSubmittedReviewHeader: 'அறிக்கைகள் மதிப்பாய்வுக்கு சமர்ப்பிக்கப்பட்டன',
    reportSubmittedReviewBody: 'உங்கள் அறிக்கைகள் சிகிச்சை குழுவிற்கு சமர்ப்பிக்கப்பட்டுள்ளன. உங்கள் சிகிச்சை பயணம் உருவாக்குவதற்கு முன் மருத்துவர் அவற்றை மதிப்பாய்வு செய்வார்.',
    waitingDoctorVerification: 'மருத்துவர் சரிபார்ப்புக்காக காத்திருக்கிறது',
    waitingReviewing: 'உங்கள் தகவல் உங்கள் சிகிச்சை குழுவால் மதிப்பாய்வு செய்யப்படுகிறது.',

    stepThreeOfSix: 'படிமுறை 3 / 6 • சிகிச்சை மையங்கள்',
    healthcareMatchingTitle: 'உங்களுக்கு வேலை செய்யக்கூடிய சிகிச்சை விருப்பங்கள்',
    healthcareMatchingSubtitle: 'அறுவை சிகிச்சை திறன், நிபுணர் புற்றுநோய் மருத்துவர்களின் இருப்பு, மற்றும் காத்திருப்பு நேரங்களை மதிப்பிட்டு Stage II மார்பக புற்றுநோய் சிகிச்சைக்கு பொருத்தமான மருத்துவமனைகளை கண்டறிகிறோம்.',
    showingCentres: 'காண்பிக்கப்படுகிறது',
    showOnlyOnsiteOncology: 'மருத்துவமனையில் இருக்கும் மருத்துவப் புற்றுநோய் நிபுணர்களுடன் மட்டும் காட்டு',
    selectedCentre: 'தேர்ந்தெடுக்கப்பட்ட மையம்',
    chooseThisCentre: 'இந்த மையத்தை தேர்ந்தெடுக்கவும்',
    topCareRecommendation: 'சிறந்த பரிந்துரை',
    kmAway: 'கி.மீ தொலைவில்',
    avgWait: 'சராசரி காத்திருப்பு',
    breastOncoSurgery: 'மார்பக புற்றுநோய் அறுவை சிகிச்சை',
    medicalOncologySpecialists: 'மருத்துவ புற்றுநோய் நிபுணர்கள்',
    radiationFacility: 'கதிர்வீச்சு வசதி',
    accepts: 'ஏற்கிறது',
    nextJourneyStep: 'உங்கள் பயணத்தின் அடுத்த படி',
    makeAffordable: 'பொருத்தப்பட்ட நிதி உதவியுடன் சிகிச்சையை மலிவாக்குங்கள்',
    reviewRiskPathway: 'தாமத அபாயத்தையும் பாதையையும் மதிப்பாய்வு செய்யவும்',

    stepFourOfSix: 'படிமுறை 4 / 6 • நிதி வழிநடத்தல்',
    financialSupportTitle: 'சிகிச்சையை மலிவு விலையில் செய்யலாம்',
    financialSupportSubtitle: 'புற்றுநோய் சிகிச்சை நிதி சுமையை உண்டாக்கக் கூடாது. அரசு மற்றும் தொண்டு அமைப்புகளின் சான்றளிக்கப்பட்ட திட்டங்களை எங்களால் பொருத்த முடியும்.',
    allMatchedOptions: 'அனைத்து பொருத்தப்பட்ட விருப்பங்கள்',
    governmentPmjay: 'அரசு (PMJAY)',
    ngoGrants: 'இலாபநோக்கற்ற நன்கொடை',
    pharmaSubsidies: 'மருந்து மானியங்கள்',
    zeroPercentFinancing: '0% நிதியளிப்பு',
    communityRelief: 'சமூக நிவாரணம்',
    providedBy: 'வழங்கியவர்',
    potentialAssistance: 'சாத்தியமான உதவி',
    whyThisMatters: 'இது உங்களுக்கு ஏன் முக்கியம்',
    hideDetails: 'விவரங்களை மறைக்க',
    viewDocuments: 'ஆவணங்கள் மற்றும் தேவைகளைப் பார்க்க',
    selectThisOption: 'இந்த விருப்பத்தை தேர்வு செய்யுங்கள்',
    removeSelection: 'தேர்வை நீக்கு',
    documentsRequired: 'உங்களிடம் தேவைப்படும் ஆவணங்கள்',
    howCareTeamHelps: 'உங்கள் சிகிச்சை குழு எவ்வாறு உதவும்',

    emotionalCenterpiece: 'உணர்ச்சி மையம்',
    carePassportTitle: 'உங்கள் ரிவோரா சிகிச்சை பாஸ்போர்ட்',
    carePassportTagline: '"என் சிகிச்சை தொடர்பான அனைத்தும், ஒரே அமைதியான மற்றும் நம்பகமான இடத்தில்."',
    doctorVerifiedClinicalRecord: 'மருத்துவர் சரிபார்த்த மருத்துவ பதிவு',
    patientClinicalRecordPending: 'மருத்துவ intake பதிவு — ஆன்ப்காலஜிஸ்ட் ஒப்புதல்_pending',
    verifiedByDoctor: 'சரிபார்த்தவர்',
    careTeamReviewing: 'உங்கள் தகவல் உங்கள் சிகிச்சை குழுவால் மதிப்பாய்வு செய்யப்படுகிறது.',
    resetClinicalDraft: 'மருத்துவ வரைவை மீட்டமை',
    verifyAsDoctor: 'டாக்டர் மேனன் போல சரிபார்க்கவும்',
    officialCareRecord: 'அதிகாரப்பூர்வ சிகிச்சை பதிவு',
    patientVerified: 'நோயாளி சரிபார்க்கப்பட்டது',
    yearsOldFemale: 'வயது (பெண்)',
    clinicalDiagnosisProfile: 'மருத்துவ நோயறிதல் & ரிசெப்டர் விவரம்',
    pathologyDiagnosis: 'பாதாலஜி நோயறிதல்',
    confirmedStaging: 'சரிபார்க்கப்பட்ட நிலை',
    biomarkersProfile: 'பயோமார்க்கர்கள் & IHC விவரம்',

    stepSixOfSix: 'படிமுறை 6 / 6 • பின்தொடர்தல் & அடுத்த நடவடிக்கைகள்',
    yourNextStep: 'உங்கள் அடுத்த படி',
    followUpSubtitle: 'அடுத்து என்ன நடக்கும் என்பதை தெளிவாகக் காட்டும் அமைதியான காட்சி. சிக்கலான நாட்காட்டிகள் இல்லை — வெறும் தெளிவான உறுதிப்படுத்தப்பட்ட நடவடிக்கைகள்.',
    immediatePriority: 'உடனடி முன்னுரிமை',
    confirmedAppointment: 'உறுதிப்படுத்தப்பட்ட சந்திப்பு',
    dateAndTime: 'தேதி & நேரம்',
    hospitalLocation: 'மருத்துவமனை இருப்பிடம்',
    whatToBring: 'நீங்கள் கொண்டு வர வேண்டியவை',
    downloadSlip: 'சந்திப்பு & பயண சீட்டை பதிவிறக்கவும்',
    callOpdHelpdesk: 'OPD உதவி மையத்தை அழைக்கவும்',
    supportingPreparations: 'உதவிகரமான தயாரிப்புகள் & படிகள்',
    arranged: 'ஒழுங்குபடுத்தப்பட்டது',
    thisIsWhatNext: 'அடுத்து என்ன நடக்கும்',

    stepFiveOfSix: 'படிமுறை 5 / 6 • உங்கள் சிகிச்சை பாதை',
    carePathwayTitle: 'உங்கள் தனிப்பயன் சிகிச்சை பாதை',
    carePathwaySubtitle: '"அடுத்து என்ன நடக்கும் என்பது எனக்குத் தெரியும்." நோயறிதல் முதல் அறுவை சிகிச்சை, நிதி சமரசம் மற்றும் நீண்டகால மீட்பு வரை தெளிவான வரிசைபடுத்தப்பட்ட வரைபடம்.',
    youAreHere: 'நீங்கள் இங்கே',
    completed: 'முடிந்தது',
    leadLabel: 'தலைமை',
    viewNextAppointment: 'அடுத்த சந்திப்பின் விவரங்களைப் பார்க்கவும்',
    finalJourneyStage: 'இறுதி பயண நிலை',
    reviewFollowUps: 'உங்கள் வரவிருக்கும் பின்தொடர்தல்களை மதிப்பாய்வு செய்யவும்',
    continueToFollowUp: 'பின்தொடர்தலுக்கு தொடரவும்',

    aboutBody1: 'ஒரு நோயறிதல் ஒரு கணத்தில் எல்லாவற்றையும் மாற்றும். ஆனால் அதற்குப் பின் வரும் கேள்விகள் அதைவிட கடினமாக இருக்கும்: நான் எங்கே செல்ல வேண்டும்? யார் என்னை சிகிச்சை செய்வார்? நான் செலவு செய்ய முடியுமா? எவ்வளவு தூரம் பயணிக்க வேண்டும்? அடுத்து என்ன நடக்கும்?',
    aboutBody2: 'இத்தகைய கேள்விகளை எளிதாக்குவதற்காக ரிவோரா உருவாக்கப்பட்டது. இது நோயாளியின் மருத்துவ தகவல், சிகிச்சை விருப்பங்கள், நிதி உதவி மற்றும் பின்தொடர்தல்களை ஒரே இடத்தில் கொண்டு வந்து, மருத்துவர்கள் மற்றும் சுகாதாரப் பணியாளர்களையும் பயணத்தில் வைத்திருக்கிறது. நோயாளிகள் தங்களைத் தாங்களே வழிநடத்த வேண்டிய சூழலைத் தவிர்த்து, ரிவோரா சிக்கலான பாதையை தெளிவான அடுத்த படிகளாக மாற்ற உதவுகிறது.',
    aboutBody3: 'சிகிச்சை சரியான பாதையை கண்டுபிடிப்பதில் சிரமம் காரணமாக சாத்தியமற்றதாக மாறக் கூடாது.',
  },

  hi: {
    appName: 'रिवोरा (RIVORA)',
    tagline: 'आपकी देखभाल यात्रा। एक ही जगह।',
    secureConnection: 'सुरक्षित कनेक्शन',
    youAreNotAlone: 'आप इसमें अकेले नहीं हैं।',
    oneStepAtATime: 'आइए इसे एक-एक कदम करके समझें।',

    patient: 'लक्ष्मी (मरीज़)',
    doctor: 'डॉ. आर. मेनन (चिकित्सक)',
    healthWorker: 'अनिता (आशा स्वास्थ्य कार्यकर्ता)',
    loginAs: 'अपने देखभाल पोर्टल में प्रवेश करें',
    switchRole: 'भूमिका बदलें',
    signOut: 'लॉग आउट',
    roleSelectionPrompt: 'अपना भूमिका चुनें ताकि आपकी व्यक्तिगत देखभाल वातावरण तक पहुँच मिल सके।',
    patientRoleLabel: 'मरीज़',
    doctorRoleLabel: 'डॉक्टर',
    healthworkerRoleLabel: 'स्वास्थ्य कार्यकर्ता',
    patientRoleHelper: 'देखभाल मार्गदर्शन और सहायता',
    doctorRoleHelper: 'नैदानिक सत्यापन और समीक्षा',
    healthworkerRoleHelper: 'मरीज़ सहायता और सहयोग',
    patientIdLabel: 'ईमेल / मरीज आईडी',
    doctorIdLabel: 'डॉक्टर आईडी / ईमेल',
    healthworkerIdLabel: 'स्वास्थ्य कार्यकर्ता आईडी / ईमेल',
    passwordLabel: 'पासवर्ड',
    enterPassword: 'पासवर्ड दर्ज करें',
    demoCredentials: 'डेमो क्रेडेंशियल',
    continueAsRole: 'जारी रखें',
    secureSessionText: '256-बिट एन्क्रिप्टेड सेशन • मरीज डेटा अलग रखा गया है',

    navJourney: 'यात्रा',
    navPassport: 'केयर पासपोर्ट',
    navCareCentres: 'देखभाल केंद्र',
    navFinancial: 'वित्तीय सहायता',
    navRisk: 'उपचार जोखिम',
    navPathway: 'देखभाल मार्ग',
    navFollowUp: 'अगला कदम',
    navDashboard: 'डैशबोर्ड',
    navAuditLog: 'ऑडिट लॉग',

    startJourney: 'अपनी देखभाल यात्रा शुरू करें',
    aboutRivora: 'रिवोरा के बारे में',
    backToStart: 'शुरुआत पर वापस जाएँ',
    exploreRivora: 'रिवोरा के बारे में जानें',
    continue: 'आगे बढ़ें',
    back: 'पीछे जाएं',
    saveAndContinue: 'सहेजें और आगे बढ़ें',
    verifyInformation: 'सत्यापित करें',
    verified: 'डॉक्टर द्वारा सत्यापित',
    viewDetails: 'विवरण देखें',
    applyForSupport: 'योजना के विवरण देखें',
    callCentre: 'केंद्र से संपर्क करें',
    offlineBanner: 'कम कनेक्टिविटी मोड सक्रिय है',
    offlineSubtext: 'आपकी जानकारी सुरक्षित रूप से सहेजी गई है और नेटवर्क आने पर सिंक होगी।',
    beginAssessment: 'मरीज मूल्यांकन शुरू करें',
    continueJourney: 'अपनी देखभाल यात्रा जारी रखें',
    uploadMoreReports: 'अधिक रिपोर्ट अपलोड करें',
    returnHome: 'मुख्य पृष्ठ पर लौटें',
    browseFiles: 'फाइलें चुनें',
    remove: 'हटाएँ',
    saveViewCarePassport: 'सहेजें और केयर पासपोर्ट देखें',

    doctorVerified: 'डॉक्टर द्वारा सत्यापित',
    clinicalIntakeReview: 'चिकित्सा दल प्रविष्टि — समीक्षा आवश्यक',
    patientProvided: 'मरीज़ द्वारा प्रदान',
    potentiallyRelevant: 'संभावित रूप से उपयोगी',

    helloPatient: 'नमस्ते, लक्ष्मी',
    journeyOverview: 'आपकी देखभाल यात्रा की प्रगति',
    nextStepPrompt: 'अगला कदम पूरा करें',

    formStep1Title: 'आइए आपके बारे में जानें',
    formStep1Subtitle: 'आपके निकटतम सर्वोत्तम देखभाल खोजने के लिए बुनियादी जानकारी।',
    formStep2Title: 'अपनी वर्तमान चिकित्सा के बारे में बताएं',
    formStep2Subtitle: 'निदान और अनुशंसित उपचारों को समझने के लिए।',
    formStep3Title: 'उन कारणों को समझें जो इलाज को कठिन बना सकते हैं',
    formStep3Subtitle: 'यात्रा दूरी, वित्तीय चिंताएं या देरी के समाधान आपकी मेडिकल टीम पहले से तैयार करेगी।',
    fullName: 'पूरा नाम',
    ageYears: 'उम्र (वर्ष)',
    preferredLanguage: 'पसंदीदा संचार भाषा',
    residentialDistrict: 'निवास जिला / स्थान',
    locationHelper: 'विशेषकृत ऑन्कोलॉजी केंद्रों तक सही यात्रा दूरी की गणना के लिए उपयोग किया जाता है।',
    continueClinicalCare: 'मेडिकल केयर जारी रखें',
    histopathologicalDiagnosis: 'हिस्टोपैथोलॉजिकल निदान',
    confirmedClinicalStage: 'पुष्टि की गई नैदानिक अवस्था',
    currentHospital: 'वर्तमान अस्पताल / संदर्भ बिंदु',
    recommendedCarePlan: 'अनुशंसित देखभाल / उपचार योजना',
    recommendedCareHelper: 'यह अस्पतालों को विशेष सर्जिकल और मेडिकल ऑन्कोलॉजी टीमों से जोड़ने में मदद करता है।',
    continueAccessNeeds: 'पहुँच आवश्यकताओं को आगे बढ़ाएँ',
    maxTravelDistance: 'आप कितनी अधिकतम दूरी तक सुरक्षित रूप से यात्रा कर सकते हैं',
    localDistance: 'स्थानिक (20 किमी)',
    regionalDistance: 'क्षेत्रीय केंद्र (75 किमी)',
    metropolitanDistance: 'मेट्रोपॉलिटन (150 किमी)',
    fundingConcern: 'अनुमानित आउट-ऑफ-पॉकेट वित्तीय चिंता',
    accessBarriersQuestion: 'क्या आप इनमें से किसी भी बात से चिंतित हैं? (सभी लागू विकल्प चुनें)',
    barrierTravel: 'विशेषकृत कैंसर केंद्रों तक यात्रा दूरी (> 50 किमी)',
    barrierGap: 'विशेष लक्षित सहायक उपचार के लिए ₹3,00,000 अतिरिक्त धनराशि की कमी',
    barrierWaitingTimes: 'स्थानीय जिले में विशेषज्ञ ऑन्कोलॉजी की प्रतीक्षा',
    barrierCompanion: 'साथी/अतिथि के लिए साथ रहने या आवास की सहायता की आवश्यकता',
    barrierScheme: 'PMJAY / मुख्य मंत्री योजना के लिए आवेदन में सहायता चाहिए',

    totalEstimate: 'उपचार का अनुमानित खर्च',
    potentialSupport: 'संभावित वित्तीय सहायता',
    remainingGap: 'शेष अनुमानित अंतर',

    accessRiskTitle: 'वे बातें जो आपकी देखभाल में देरी कर सकती हैं',
    accessRiskSubtitle: 'हम बाधाओं को समय पर पहचानकर आपके डॉक्टर के साथ मिलकर स्पष्ट समाधान प्रस्तुत करते हैं।',
    possibleNextSteps: 'देरी से बचने के लिए सुझाई गई त्वरित कार्रवाइयां',

    trustHeader: 'आपकी जानकारी पर आपका पूरा नियंत्रण है',
    trustItem1: 'आपकी निजी जानकारी पूरी तरह एन्क्रिप्टेड और सुरक्षित है',
    trustItem2: 'केवल अधिकृत डॉक्टर और स्वास्थ्य कार्यकर्ता ही आपके मेडिकल रिकॉर्ड देख सकते हैं',
    trustItem3: 'केवल आपकी अनुमति से ही सहायता योजनाओं के साथ डेटा साझा होता है',
    trustItem4: 'रिकॉर्ड देखे जाने का पूरा पारदर्शी ऑडिट इतिहास उपलब्ध है',

    consentIntro: 'आपकी देखभाल यात्रा शुरू करने से पहले, कृपया बताएं कि रिवोरा आपके लिए कैसे सहायता देना चाहता है।',
    consentItem1Title: 'उपयुक्त देखभाल केंद्रों से मिलान',
    consentItem1Desc: 'हम आपके स्थान और बायोप्सी निदान के आधार पर उन अस्पतालों को खोजते हैं जिनमें आवश्यक सर्जरी, ऑन्कोलॉजी विशेषज्ञ और संभालने योग्य प्रतीक्षा समय हो।',
    consentItem2Title: 'वित्तीय सहायता और अनुदान की पहचान',
    consentItem2Desc: 'हम सरकारी योजनाओं (PMJAY) और NGO सहायता का मूल्यांकन कर आपके ₹3,00,000 फंडिंग अंतर को पूरा करने में मदद करते हैं। आपकी पहचान सार्वजनिक रूप से कभी साझा नहीं की जाती।',
    consentItem3Title: 'डॉक्टर सत्यापन और स्वास्थ्य कार्यकर्ता सहायता',
    consentItem3Desc: 'डॉ. मेनन और सामुदायिक कार्यकर्ता अनिता नैदानिक रिकॉर्ड देख सकते हैं और सुरक्षित रूप से सत्यापन कर सकते हैं। आप किसी भी समय पहुँच को समाप्त कर सकते हैं।',
    consentCheckboxText: 'मैं देखभाल मार्गदर्शन और व्यक्तिगत सहायता मिलान के लिए रिवोरा का उपयोग करने के लिए सहमत हूँ।',

    uploadMedicalReportsHeader: 'अपनी मेडिकल रिपोर्ट अपलोड करें',
    uploadMedicalReportsSubtext: 'हम आपकी केयर यात्रा बनाने से पहले आपके मेडिकल डेटा की डॉक्टर द्वारा समीक्षा चाहते हैं। आपकी रिपोर्ट्स टीम को आपकी स्थिति समझने में मदद करती हैं।',
    dragAndDropReports: 'अपनी रिपोर्ट यहाँ ड्रैग और ड्रॉप करें',
    fileFormats: 'PDF, JPG, JPEG, PNG',
    selectedFiles: 'चयनित फाइलें',
    reportSubmittedReviewHeader: 'रिपोर्ट समीक्षा के लिए भेज दी गई है',
    reportSubmittedReviewBody: 'आपकी रिपोर्ट्स देखभाल टीम को भेज दी गई हैं। आपकी केयर यात्रा बनाने से पहले डॉक्टर इन्हें देखेंगे।',
    waitingDoctorVerification: 'डॉक्टर सत्यापन की प्रतीक्षा',
    waitingReviewing: 'आपकी जानकारी आपकी देखभाल टीम द्वारा समीक्षा की जा रही है।',

    stepThreeOfSix: 'स्टेप 3 ऑफ 6 • हेल्थकेयर मैचिंग',
    healthcareMatchingTitle: 'ऐसे देखभाल विकल्प जो आपके लिए काम कर सकते हैं',
    healthcareMatchingSubtitle: 'हम सर्जिकल क्षमता, विशेषज्ञ ऑन्कोलॉजिस्ट उपलब्धता और प्रतीक्षा समय का मूल्यांकन करके अस्पतालों का चयन करते हैं जो Stage II ब्रेस्ट कैंसर के लिए उपयुक्त हैं।',
    showingCentres: 'दिखा रहे हैं',
    showOnlyOnsiteOncology: 'केवल ऑन-साइट मेडिकल ऑन्कोलॉजी वाले केंद्र दिखाएँ',
    selectedCentre: 'चयनित केंद्र',
    chooseThisCentre: 'यह केंद्र चुनें',
    topCareRecommendation: 'शीर्ष देखभाल अनुशंसा',
    kmAway: 'किमी दूर',
    avgWait: 'औसत प्रतीक्षा',
    breastOncoSurgery: 'ब्रास्ट ऑन्को-सर्जरी',
    medicalOncologySpecialists: 'मेडिकल ऑन्कोलॉजी विशेषज्ञ',
    radiationFacility: 'रेडिएशन सुविधा',
    accepts: 'स्वीकृत',
    nextJourneyStep: 'आपकी यात्रा का अगला कदम',
    makeAffordable: 'मिलान वित्तीय सहायता से इलाज सस्ता बनाएं',
    reviewRiskPathway: 'देरी का जोखिम और मार्ग देखें',

    stepFourOfSix: 'स्टेप 4 ऑफ 6 • वित्तीय मार्गदर्शन',
    financialSupportTitle: 'आइए इलाज को अधिक किफ़ायती बनाएं',
    financialSupportSubtitle: 'कैंसर की देखभाल के लिए वित्तीय थकान नहीं होनी चाहिए। हमने सरकार और दानदाताओं की सत्यापित योजनाओं को आपके लिए मिलान किया है।',
    allMatchedOptions: 'सभी मिलान विकल्प',
    governmentPmjay: 'सरकारी (PMJAY)',
    ngoGrants: 'NGO अनुदान',
    pharmaSubsidies: 'फार्मा सब्सिडी',
    zeroPercentFinancing: '0% फाइनेंसिंग',
    communityRelief: 'सामुदायिक राहत',
    providedBy: 'द्वारा उपलब्ध',
    potentialAssistance: 'संभावित सहायता',
    whyThisMatters: 'यह आपके लिए क्यों महत्वपूर्ण है',
    hideDetails: 'विवरण छुपाएं',
    viewDocuments: 'दस्तावेज़ और आवश्यकताएँ देखें',
    selectThisOption: 'यह विकल्प चुनें',
    removeSelection: 'चयन हटाएँ',
    documentsRequired: 'आपसे आवश्यक दस्तावेज़',
    howCareTeamHelps: 'आपकी देखभाल टीम कैसे मदद करती है',

    emotionalCenterpiece: 'भावनात्मक केंद्र बिंदु',
    carePassportTitle: 'आपका रिवोरा केयर पासपोर्ट',
    carePassportTagline: '"मेरी सारी महत्वपूर्ण जानकारी, एक शांत और भरोसेमंद जगह पर."',
    doctorVerifiedClinicalRecord: 'डॉक्टर द्वारा सत्यापित नैदानिक रिकॉर्ड',
    patientClinicalRecordPending: 'नैदानिक इनटेक रिकॉर्ड — ऑन्कोलॉजिस्ट स्वीकृति लंबित',
    verifiedByDoctor: 'सत्यापित किया गया',
    careTeamReviewing: 'आपकी जानकारी आपकी देखभाल टीम द्वारा समीक्षा की जा रही है।',
    resetClinicalDraft: 'क्लिनिकल ड्राफ्ट पर लौटें',
    verifyAsDoctor: 'डॉ. मेनन के रूप में सत्यापित करें',
    officialCareRecord: 'अधिकृत केयर रिकॉर्ड',
    patientVerified: 'मरीज़ सत्यापित',
    yearsOldFemale: 'वर्ष का (महिला)',
    clinicalDiagnosisProfile: 'नैदानिक निदान & रिसेप्टर प्रोफ़ाइल',
    pathologyDiagnosis: 'पैथोलॉजी निदान',
    confirmedStaging: 'पुष्टि की गई अवस्था',
    biomarkersProfile: 'बायोमार्कर & IHC प्रोफ़ाइल',

    stepSixOfSix: 'स्टेप 6 ऑफ 6 • फॉलो-अप और अगले कदम',
    yourNextStep: 'आपका अगला कदम',
    followUpSubtitle: 'अगला कदम स्पष्ट और शांत तरीके से दिखता है। जटिल कैलेंडर नहीं — केवल सरल, सत्यापित कार्रवाई।',
    immediatePriority: 'तत्काल प्राथमिकता',
    confirmedAppointment: 'पुष्टि की गई अपॉइंटमेंट',
    dateAndTime: 'तारीख और समय',
    hospitalLocation: 'अस्पताल का स्थान',
    whatToBring: 'आपको साथ ले जाना चाहिए',
    downloadSlip: 'अपॉइंटमेंट और यात्रा स्लिप डाउनलोड करें',
    callOpdHelpdesk: 'OPD हेल्पडेस्क कॉल करें',
    supportingPreparations: 'सहायक तैयारी और मील के पत्थर',
    arranged: 'व्यवस्थित',
    thisIsWhatNext: 'अगला कदम क्या होगा',

    stepFiveOfSix: 'स्टेप 5 ऑफ 6 • आपकी केयर पाथवे',
    carePathwayTitle: 'आपकी व्यक्तिगत केयर पाथवे',
    carePathwaySubtitle: '"मुझे पता है कि अगला कदम क्या होगा." निदान से सर्जरी, वित्तीय स्वीकृति और दीर्घकालिक रिकवरी तक स्पष्ट अनुक्रमित रोडमैप।',
    youAreHere: 'आप यहाँ हैं',
    completed: 'पूरा हो गया',
    leadLabel: 'नेतृत्व',
    viewNextAppointment: 'अगली अपॉइंटमेंट देखें',
    finalJourneyStage: 'अंतिम यात्रा चरण',
    reviewFollowUps: 'अपनी आगामी फॉलो-अप्स और रिमाइंडर देखें',
    continueToFollowUp: 'फॉलो-अप पर जाएँ',

    aboutBody1: 'एक निदान एक पल में सब बदल सकता है। लेकिन उसके बाद आने वाले सवाल उतने ही मुश्किल होते हैं: मुझे कहाँ जाना चाहिए? मुझे कौन इलाज करेगा? क्या मैं इसे वहन कर पाऊंगा? मुझे कितनी दूरी तय करनी होगी? अगला कदम क्या होगा?',
    aboutBody2: 'रिवोरा को इन सवालों को आसान बनाने के लिए बनाया गया है। यह मरीज की मेडिकल जानकारी, देखभाल विकल्प, वित्तीय सहायता और फॉलो-अप को एक ही जगह लाता है, जबकि डॉक्टर और स्वास्थ्य कार्यकर्ता को यात्रा का हिस्सा बनाता है। मरीजों को अकेले सब समझने के बजाय, रिवोरा जटिल रास्ते को स्पष्ट अगले कदमों में बदलने में मदद करता है।',
    aboutBody3: 'क्योंकि सही रास्ता ढूँढ़ने में कठिनाई के कारण इलाज असंभव नहीं होना चाहिए।',
  },
};
