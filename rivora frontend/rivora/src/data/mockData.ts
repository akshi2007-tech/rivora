import {
  CarePassportData,
  HospitalMatch,
  FinancialScheme,
  AccessRiskAssessment,
  CarePathwayStep,
  AppointmentReminder,
  AuditLogEntry,
  User,
  Language
} from '../types';

export const mockUsers: User[] = [
  {
    id: 'lakshmi-patient',
    name: 'Lakshmi',
    role: 'patient',
    email: 'patient@rivora.demo',
    password: 'patient123',
    title: 'Patient (Stage II Care Journey)',
    location: 'Dharmapuri Rural District'
  },
  {
    id: 'dr-menon',
    name: 'Dr. R. Menon',
    role: 'doctor',
    email: 'doctor@rivora.demo',
    password: 'doctor123',
    title: 'Senior Consulting Surgical Oncologist',
    location: 'Apex Regional Cancer Centre'
  },
  {
    id: 'anitha-hw',
    name: 'Anitha',
    role: 'healthworker',
    email: 'healthworker@rivora.demo',
    password: 'health123',
    title: 'Community Health Worker (ASHA Lead)',
    location: 'District Primary Health Block'
  }
];

export const initialPatientData: CarePassportData = {
  patientId: 'lakshmi-patient',
  fullName: 'Lakshmi Narayanan',
  age: 48,
  location: 'Dharmapuri Rural District, Sector 4',
  preferredLanguage: 'Tamil / English',
  phone: '+91 98421 •••••',
  
  diagnosis: 'Invasive Ductal Carcinoma (Left Breast)',
  stage: 'Stage IIB (cT2 N1 M0)',
  biomarkers: 'ER+ / PR+ / HER2 Negative, Ki-67 22%',
  requiredCare: [
    'Breast Conserving Surgery / Modified Radical Mastectomy',
    'Medical Oncology Consultation & Adjuvant Planning',
    'Radiation Therapy Evaluation'
  ],
  currentTreatment: 'Initial diagnostic biopsy completed; awaiting surgical schedule',
  recommendedTreatment: 'Surgical excision followed by adjuvant systemic chemotherapy & endocrine therapy',
  currentHospital: 'District Community Referral Unit',
  
  travelToleranceKm: 75,
  totalEstimatedCost: 900000,
  coverageEstimated: 600000,
  financialGap: 300000,
  accessBarriers: [
    'Travel distance to specialized cancer centres (> 50 km)',
    'Out-of-pocket gap of ₹3,00,000 for specialized targeted adjuvant therapy',
    'Specialist oncology waiting times in local district'
  ],
  
  clinicalVerification: {
    status: 'ai_assisted', // Starts as pending care-team review to allow demonstration of Dr. Menon verifying it
    notes: 'Consolidated from diagnostic histopathology report #DHP-8492 by clinical care intake coordinator. Awaiting oncologist sign-off.'
  },
  
  journeyStep: 3,
  lastUpdated: 'Today at 10:45 AM'
};

/* ==========================================================================
   LOCALIZED HOSPITALS
   ========================================================================== */
export const localizedHospitals: Record<Language, HospitalMatch[]> = {
  en: [
    {
      id: 'centre-b',
      name: 'Centre B — Apex Regional Cancer Institute',
      location: 'Salem - Bangalore Highway (Regional Hub)',
      distanceKm: 65,
      travelTime: '1 hr 45 min by bus/car',
      surgeryAvailable: true,
      oncologyAvailable: true,
      radiotherapyAvailable: true,
      waitingTimeDays: 4,
      feasibilityScore: 94,
      isRecommended: true,
      whyRecommended: 'Although this centre is 65 km away, it currently meets all your critical care needs with both dedicated onco-surgery and medical oncology teams immediately available with minimal waiting time.',
      contactNumber: '+91 427 244 8900',
      supportedSchemes: ['PMJAY', 'Chief Minister Comprehensive Scheme', 'Aurobindo Relief']
    },
    {
      id: 'centre-a',
      name: 'Centre A — District Civil Hospital',
      location: 'District Headquarter Town',
      distanceKm: 18,
      travelTime: '35 min by local transport',
      surgeryAvailable: true,
      oncologyAvailable: false,
      radiotherapyAvailable: false,
      waitingTimeDays: 14,
      feasibilityScore: 62,
      isRecommended: false,
      whyRecommended: 'Close to your residence, but currently lacks an on-site medical oncologist and radiation equipment needed for your Stage II care plan.',
      contactNumber: '+91 4342 260 100',
      supportedSchemes: ['PMJAY', 'State Free Care']
    },
    {
      id: 'centre-c',
      name: 'Centre C — Kaveri Comprehensive Cancer Trust',
      location: 'Trichy North Medical Enclave',
      distanceKm: 98,
      travelTime: '2 hr 30 min by train/car',
      surgeryAvailable: true,
      oncologyAvailable: true,
      radiotherapyAvailable: true,
      waitingTimeDays: 6,
      feasibilityScore: 86,
      isRecommended: false,
      whyRecommended: 'Comprehensive advanced oncology centre with full multidisciplinary tumor board, recommended as an excellent secondary option if travel permits.',
      contactNumber: '+91 431 278 3000',
      supportedSchemes: ['PMJAY', 'Private Insurance', 'TPA Cashless']
    },
    {
      id: 'centre-d',
      name: 'Centre D — Taluk Sub-District Health Clinic',
      location: 'Dharmapuri Rural Taluk',
      distanceKm: 8,
      travelTime: '15 min by auto/bus',
      surgeryAvailable: false,
      oncologyAvailable: false,
      radiotherapyAvailable: false,
      waitingTimeDays: 1,
      feasibilityScore: 40,
      isRecommended: false,
      whyRecommended: 'Convenient for routine blood counts, wound dressings, and basic medication pick-ups, but cannot provide surgical oncology or systemic chemotherapy.',
      contactNumber: '+91 4342 220 050',
      supportedSchemes: ['Primary Health Free Care']
    }
  ],
  ta: [
    {
      id: 'centre-b',
      name: 'மையம் B — அபெக்ஸ் மண்டல புற்றுநோய் மருத்துவ நிறுவனம்',
      location: 'சேலம் - பெங்களூரு தேசிய நெடுஞ்சாலை (மண்டல மையம்)',
      distanceKm: 65,
      travelTime: 'பேருந்து அல்லது காரில் 1 மணி 45 நிமிடம்',
      surgeryAvailable: true,
      oncologyAvailable: true,
      radiotherapyAvailable: true,
      waitingTimeDays: 4,
      feasibilityScore: 94,
      isRecommended: true,
      whyRecommended: 'இந்த மையம் 65 கி.மீ தொலைவில் இருந்தாலும், உங்களுக்குத் தேவையான சிறப்பு அறுவை சிகிச்சை மற்றும் மருத்துவ புற்றுநோய் நிபுணர்கள் உடனடியாகக் கிடைக்கிறார்கள். காத்திருப்பு நேரம் வெறும் 4 நாட்கள் மட்டுமே.',
      contactNumber: '+91 427 244 8900',
      supportedSchemes: ['முதலமைச்சரின் காப்பீட்டுத் திட்டம்', 'PMJAY ஆயுஷ்மான் பாரத்', 'அரவிந்தர் நிவாரண நிதி']
    },
    {
      id: 'centre-a',
      name: 'மையம் A — மாவட்ட அரசு தலைமை மருத்துவமனை',
      location: 'தருமபுரி மாவட்ட தலைநகரம்',
      distanceKm: 18,
      travelTime: 'உள்ளூர் போக்குவரத்தில் 35 நிமிடம்',
      surgeryAvailable: true,
      oncologyAvailable: false,
      radiotherapyAvailable: false,
      waitingTimeDays: 14,
      feasibilityScore: 62,
      isRecommended: false,
      whyRecommended: 'உங்கள் இருப்பிடத்திற்கு அருகில் உள்ளது. ஆனால் உங்கள் நிலை 2 சிகிச்சைக்கு தேவையான சிறப்பு புற்றுநோய் மருத்துவர்களும் கதிர்வீச்சு வசதிகளும் இங்கு இல்லை.',
      contactNumber: '+91 4342 260 100',
      supportedSchemes: ['அரசு இலவச சிகிச்சை', 'PMJAY']
    },
    {
      id: 'centre-c',
      name: 'மையம் C — காவேரி ஒருங்கிணைந்த புற்றுநோய் அறக்கட்டளை',
      location: 'திருச்சி வடக்கு மருத்துவ வளாகம்',
      distanceKm: 98,
      travelTime: 'ரயில் அல்லது காரில் 2 மணி 30 நிமிடம்',
      surgeryAvailable: true,
      oncologyAvailable: true,
      radiotherapyAvailable: true,
      waitingTimeDays: 6,
      feasibilityScore: 86,
      isRecommended: false,
      whyRecommended: 'அனைத்து மேம்பட்ட சிகிச்சைகளும் கொண்ட மிகச்சிறந்த மையம். பயணம் செய்ய முடிந்தால் இது ஒரு சிறந்த மாற்று வாய்ப்பாகும்.',
      contactNumber: '+91 431 278 3000',
      supportedSchemes: ['PMJAY', 'தனியார் காப்பீடு']
    },
    {
      id: 'centre-d',
      name: 'மையம் D — வட்டார ஆரம்ப சுகாதார நிலையம்',
      location: 'தருமபுரி கிராமப்புற வட்டம்',
      distanceKm: 8,
      travelTime: 'ஆட்டோ அல்லது பேருந்தில் 15 நிமிடம்',
      surgeryAvailable: false,
      oncologyAvailable: false,
      radiotherapyAvailable: false,
      waitingTimeDays: 1,
      feasibilityScore: 40,
      isRecommended: false,
      whyRecommended: 'வழக்கமான ரத்தப் பரிசோதனைகள் மற்றும் மருந்து மாத்திரைகள் வாங்க ஏற்றது. ஆனால் புற்றுநோய் அறுவை சிகிச்சைக்கு உகந்தது அல்ல.',
      contactNumber: '+91 4342 220 050',
      supportedSchemes: ['ஆரம்ப சுகாதார இலவச சேவை']
    }
  ],
  hi: [
    {
      id: 'centre-b',
      name: 'केंद्र B — एपेक्स क्षेत्रीय कैंसर संस्थान',
      location: 'सलेम - बैंगलोर राष्ट्रीय राजमार्ग (क्षेत्रीय हब)',
      distanceKm: 65,
      travelTime: 'बस/कार से 1 घंटा 45 मिनट',
      surgeryAvailable: true,
      oncologyAvailable: true,
      radiotherapyAvailable: true,
      waitingTimeDays: 4,
      feasibilityScore: 94,
      isRecommended: true,
      whyRecommended: 'यद्यपि यह केंद्र 65 किमी दूर है, यह आपकी सभी ज़रूरतों को पूरा करता है। यहाँ ऑन्को-सर्जरी और मेडिकल ऑन्कोलॉजिस्ट दोनों तुरंत उपलब्ध हैं और प्रतीक्षा समय केवल 4 दिन है।',
      contactNumber: '+91 427 244 8900',
      supportedSchemes: ['आयुष्मान भारत PMJAY', 'मुख्यमंत्री स्वास्थ्य बीमा', 'अरबिंदो राहत कोष']
    },
    {
      id: 'centre-a',
      name: 'केंद्र A — जिला सिविल अस्पताल',
      location: 'जिला मुख्यालय',
      distanceKm: 18,
      travelTime: 'स्थानीय परिवहन से 35 मिनट',
      surgeryAvailable: true,
      oncologyAvailable: false,
      radiotherapyAvailable: false,
      waitingTimeDays: 14,
      feasibilityScore: 62,
      isRecommended: false,
      whyRecommended: 'आपके घर के पास है, लेकिन यहाँ आपकी स्टेज II देखभाल के लिए आवश्यक मेडिकल ऑन्कोलॉजिस्ट और विकिरण सुविधा उपलब्ध नहीं है।',
      contactNumber: '+91 4342 260 100',
      supportedSchemes: ['सरकारी मुफ्त देखभाल', 'PMJAY']
    },
    {
      id: 'centre-c',
      name: 'केंद्र C — कावेरी कैंसर रिसर्च ट्रस्ट',
      location: 'त्रिची मेडिकल एन्क्लेव',
      distanceKm: 98,
      travelTime: 'ट्रेन/कार से 2 घंटा 30 मिनट',
      surgeryAvailable: true,
      oncologyAvailable: true,
      radiotherapyAvailable: true,
      waitingTimeDays: 6,
      feasibilityScore: 86,
      isRecommended: false,
      whyRecommended: 'उन्नत ऑन्कोलॉजी सुविधाओं वाला व्यापक अस्पताल। यदि यात्रा संभव हो तो यह एक मजबूत विकल्प है।',
      contactNumber: '+91 431 278 3000',
      supportedSchemes: ['PMJAY', 'निजी बीमा']
    },
    {
      id: 'centre-d',
      name: 'केंद्र D — उप-जिला प्राथमिक स्वास्थ्य केंद्र',
      location: 'धर्मपुरी ग्रामीण ब्लॉक',
      distanceKm: 8,
      travelTime: 'ऑटो/बस से 15 मिनट',
      surgeryAvailable: false,
      oncologyAvailable: false,
      radiotherapyAvailable: false,
      waitingTimeDays: 1,
      feasibilityScore: 40,
      isRecommended: false,
      whyRecommended: 'नियमित रक्त जांच और प्राथमिक दवाओं के लिए उपयुक्त, लेकिन बड़ी सर्जरी के लिए सुसज्जित नहीं।',
      contactNumber: '+91 4342 220 050',
      supportedSchemes: ['प्राथमिक स्वास्थ्य मुफ्त सेवा']
    }
  ]
};

/* ==========================================================================
   LOCALIZED FINANCIAL SCHEMES
   ========================================================================== */
export const localizedFinancialSchemes: Record<Language, FinancialScheme[]> = {
  en: [
    {
      id: 'gov-pmjay',
      category: 'government',
      title: 'Ayushman Bharat — PMJAY Scheme',
      provider: 'National Health Authority',
      potentialAmount: 500000,
      coverageDescription: 'Covers surgical hospitalization, pre-operative lab work, and post-surgery staging investigations.',
      whyRelevant: 'Covers 100% of the primary surgical procedure package at empanelled centres including Centre B.',
      applicationStatus: 'eligible_to_apply',
      documentsNeeded: ['Ration Card / PMJAY ID Card', 'Aadhaar Card', 'Biopsy Histology Report #DHP-8492']
    },
    {
      id: 'gov-cmchistn',
      category: 'government',
      title: "Chief Minister's Comprehensive Health Insurance",
      provider: 'State Department of Health & Family Welfare',
      potentialAmount: 100000,
      coverageDescription: 'Covers auxiliary surgical disposables, histopathology re-evaluations, and supportive medications.',
      whyRelevant: 'Seamlessly supplements primary government coverage to offset hospital bed and anesthesia charges.',
      applicationStatus: 'eligible_to_apply',
      documentsNeeded: ['State Domicile / Income Certificate', 'Hospital Admission Estimate Slip']
    },
    {
      id: 'ngo-aurobindo',
      category: 'ngo',
      title: 'Sri Aurobindo Cancer Relief Medical Grant',
      provider: 'Aurobindo Healthcare Foundation',
      potentialAmount: 150000,
      coverageDescription: 'Direct financial assistance grant for adjuvant chemotherapy and hormone receptor therapy cycles.',
      whyRelevant: 'Specifically supports women with hormone-receptor-positive breast cancer facing high out-of-pocket medication expenses.',
      applicationStatus: 'eligible_to_apply',
      documentsNeeded: ['Oncology Prescription', 'Care Passport Summary Slip', 'Income Declaration']
    },
    {
      id: 'pharma-care',
      category: 'pharma',
      title: 'Compassionate Access Patient Assistance Program (PAP)',
      provider: 'Oncology Access Alliance & Pharma Partners',
      potentialAmount: 80000,
      coverageDescription: 'Subsidized anti-nausea, supportive growth factors, and oral endocrine medications.',
      whyRelevant: 'Reduces the ongoing cost of essential supportive medicines by up to 60%.',
      applicationStatus: 'eligible_to_apply',
      documentsNeeded: ['Treating Oncologist Letter (Dr. Menon)', 'Pathology IHC Report']
    },
    {
      id: 'med-finance',
      category: 'financing',
      title: 'CareNow 0% Interest Medical Bridge Financing',
      provider: 'Social Health Impact Fund',
      potentialAmount: 100000,
      coverageDescription: 'Zero-interest micro-draw facility to bridge immediate deposits while awaiting government disbursement.',
      whyRelevant: 'Prevents treatment start delays while insurance paperwork is being processed.',
      applicationStatus: 'eligible_to_apply',
      documentsNeeded: ['Bank Passbook Copy', 'Aadhaar Card']
    },
    {
      id: 'crowd-milaap',
      category: 'crowdfunding',
      title: 'Verified Medical Relief Community Bridge',
      provider: 'Milaap Verified Healthcare Trust',
      potentialAmount: 70000,
      coverageDescription: 'Assistance for patient and companion travel, lodging, and dietary nutrition support during therapy.',
      whyRelevant: 'Assists with non-medical out-of-pocket costs such as regional bus travel and lodging for companions.',
      applicationStatus: 'eligible_to_apply',
      documentsNeeded: ['Care Passport Certificate', 'Hospital Referral Slip']
    }
  ],
  ta: [
    {
      id: 'gov-pmjay',
      category: 'government',
      title: 'ஆயுஷ்மான் பாரத் — PMJAY மருத்துவ காப்பீட்டுத் திட்டம்',
      provider: 'தேசிய சுகாதார ஆணையம்',
      potentialAmount: 500000,
      coverageDescription: 'அறுவை சிகிச்சைக்கான மருத்துவமனை கட்டணம், அறுவை சிகிச்சைக்கு முந்தைய பரிசோதனைகள் மற்றும் மருந்துகளை முழுமையாக ஈடுசெய்கிறது.',
      whyRelevant: 'மையம் B உட்பட இணைக்கப்பட்ட மருத்துவமனைகளில் அறுவை சிகிச்சைக்கான முழு செலவையும் இது ஏற்கும்.',
      applicationStatus: 'eligible_to_apply',
      documentsNeeded: ['ரேஷன் அட்டை / PMJAY அட்டை', 'ஆதார் அட்டை', 'பயாப்ஸி பரிசோதனை அறிக்கை #DHP-8492']
    },
    {
      id: 'gov-cmchistn',
      category: 'government',
      title: 'முதலமைச்சரின் விரிவான மருத்துவக் காப்பீட்டுத் திட்டம்',
      provider: 'தமிழக மக்கள் நல்வாழ்வுத்துறை',
      potentialAmount: 100000,
      coverageDescription: 'கூடுதல் அறுவை சிகிச்சை செலவுகள், சிறப்பு மருந்துகள் மற்றும் படுக்கை கட்டணங்களை ஈடுசெய்கிறது.',
      whyRelevant: 'அரசு திட்டத்துடன் இணைந்து கூடுதல் செலவுகள் எதுவும் நோயாளிக்கு ஏற்படாமல் பாதுகாக்கிறது.',
      applicationStatus: 'eligible_to_apply',
      documentsNeeded: ['வருமானச் சான்றிதழ் / குடும்ப அட்டை', 'மருத்துவமனை மதிப்பீட்டு ரசீது']
    },
    {
      id: 'ngo-aurobindo',
      category: 'ngo',
      title: 'ஸ்ரீ அரவிந்தர் புற்றுநோய் நிவாரண மருத்துவ உதவி நிதி',
      provider: 'அரவிந்தர் ஹெல்த்கேர் அறக்கட்டளை',
      potentialAmount: 150000,
      coverageDescription: 'கீமோதெரபி மற்றும் ஹார்மோன் மாத்திரைகளுக்கான நேரடி நிதி மானியம்.',
      whyRelevant: 'ஹார்மோன் பாசிட்டிவ் மார்பக புற்றுநோயால் பாதிக்கப்பட்ட பெண்களுக்கு மருந்து செலவுக்காக வழங்கப்படும் நேரடி உதவி.',
      applicationStatus: 'eligible_to_apply',
      documentsNeeded: ['மருத்துவர் பரிந்துரை சீட்டு', 'ரிவோரா பாஸ்போர்ட் நகல்', 'வருமான விவரம்']
    },
    {
      id: 'pharma-care',
      category: 'pharma',
      title: 'கருணை அடிப்படையிலான இலவச மருந்து உதவி திட்டம்',
      provider: 'புற்றுநோய் மருந்துகள் கூட்டமைப்பு',
      potentialAmount: 80000,
      coverageDescription: 'விலையுயர்ந்த மாத்திரைகள் மற்றும் துணை மருந்துகளுக்கு 60% வரை நேரடி தள்ளுபடி.',
      whyRelevant: 'தொடர் சிகிச்சையின் போது ஏற்படும் மாதாந்திர மருந்து செலவை வெகுவாக குறைக்கிறது.',
      applicationStatus: 'eligible_to_apply',
      documentsNeeded: ['சிகிச்சை அளிக்கும் மருத்துவர் கடிதம் (டாக்டர் மேனன்)', 'பயாப்ஸி அறிக்கை']
    },
    {
      id: 'med-finance',
      category: 'financing',
      title: 'கேர்நவ் (CareNow) வட்டி இல்லா மருத்துவ முன்தொகை',
      provider: 'சமூக நல நிதி நிறுவனம்',
      potentialAmount: 100000,
      coverageDescription: 'அரசு காப்பீட்டு தொகை அனுமதி கிடைக்கும் வரை சிகிச்சை தாமதமாகாமல் இருக்க 0% வட்டியில் உடனடி நிதி.',
      whyRelevant: 'ஆவண சரிபார்ப்பு முடியும் வரை சிகிச்சை தொடங்குவதில் தாமதம் ஏற்படுவதைத் தடுக்கிறது.',
      applicationStatus: 'eligible_to_apply',
      documentsNeeded: ['வங்கி கணக்கு புத்தகம்', 'ஆதார் அட்டை']
    },
    {
      id: 'crowd-milaap',
      category: 'crowdfunding',
      title: 'மிலாப் (Milaap) சமூக மருத்துவ பயண உதவி நிதி',
      provider: 'மிலாப் சமூக நல அறக்கட்டளை',
      potentialAmount: 70000,
      coverageDescription: 'நோயாளி மற்றும் உடன் வருபவருக்கான பேருந்து பயண கட்டணம், தங்குமிடம் மற்றும் சத்தான உணவு உதவி.',
      whyRelevant: 'மருத்துவம் சாராத வெளி மாவட்ட பயணச் செலவுகளை ஈடுசெய்து நோயாளியின் நிதிச்சுமையை குறைக்கிறது.',
      applicationStatus: 'eligible_to_apply',
      documentsNeeded: ['ரிவோரா சிகிச்சை அட்டை', 'மருத்துவமனை பரிந்துரை சீட்டு']
    }
  ],
  hi: [
    {
      id: 'gov-pmjay',
      category: 'government',
      title: 'आयुष्मान भारत — प्रधानमंत्री जन आरोग्य योजना (PMJAY)',
      provider: 'राष्ट्रीय स्वास्थ्य प्राधिकरण',
      potentialAmount: 500000,
      coverageDescription: 'सर्जिकल अस्पताल में भर्ती, ऑपरेशन से पहले की जांच और दवाओं का 100% खर्च वहन करता है।',
      whyRelevant: 'केंद्र B सहित पैनल में शामिल अस्पतालों में सर्जरी का पूरा पैकेज कवर करता है।',
      applicationStatus: 'eligible_to_apply',
      documentsNeeded: ['राशन कार्ड / PMJAY कार्ड', 'आधार कार्ड', 'बायोप्सी रिपोर्ट #DHP-8492']
    },
    {
      id: 'gov-cmchistn',
      category: 'government',
      title: 'मुख्यमंत्री व्यापक स्वास्थ्य बीमा योजना',
      provider: 'राज्य स्वास्थ्य एवं परिवार कल्याण विभाग',
      potentialAmount: 100000,
      coverageDescription: 'अतिरिक्त सर्जिकल सामग्री, विशेष दवाओं और बेड शुल्क के लिए अतिरिक्त वित्तीय सहायता।',
      whyRelevant: 'केंद्रीय योजना के साथ मिलकर किसी भी अप्रत्याशित खर्च से पूरी सुरक्षा प्रदान करता है।',
      applicationStatus: 'eligible_to_apply',
      documentsNeeded: ['आय प्रमाण पत्र / निवास प्रमाण', 'अस्पताल अनुमान पर्ची']
    },
    {
      id: 'ngo-aurobindo',
      category: 'ngo',
      title: 'श्री अरबिंदो कैंसर रिलीफ मेडिकल ग्रांट',
      provider: 'अरबिंदो हेल्थकेयर फाउंडेशन',
      potentialAmount: 150000,
      coverageDescription: 'कीमोथेरेपी और हार्मोन थेरेपी के लिए सीधी गैर-वापसी योग्य वित्तीय सहायता।',
      whyRelevant: 'हार्मोन पॉजिटिव स्तन कैंसर से जूझ रही महिलाओं की दवाओं के खर्च को पूरा करने के लिए विशेष अनुदान।',
      applicationStatus: 'eligible_to_apply',
      documentsNeeded: ['ऑन्कोलॉजिस्ट का पर्चा', 'केयर पासपोर्ट सारांश', 'आय घोषणा']
    },
    {
      id: 'pharma-care',
      category: 'pharma',
      title: 'विशेष रोगी सहायता कार्यक्रम (PAP)',
      provider: 'ऑन्कोलॉजी एक्सेस अलायंस',
      potentialAmount: 80000,
      coverageDescription: 'सहायक दवाओं और हार्मोनल गोलियों पर 60% तक की सीधी छूट।',
      whyRelevant: 'नियमित दवाओं के मासिक खर्च को कम करके इलाज जारी रखना आसान बनाता है।',
      applicationStatus: 'eligible_to_apply',
      documentsNeeded: ['डॉक्टर का अनुशंसा पत्र (डॉ. मेनन)', 'पैथोलॉजी रिपोर्ट']
    },
    {
      id: 'med-finance',
      category: 'financing',
      title: 'केयर-नाउ 0% ब्याज चिकित्सा सहायता',
      provider: 'सोशल हेल्थ इम्पैक्ट फंड',
      potentialAmount: 100000,
      coverageDescription: 'बीमा कागजी कार्रवाई पूरी होने तक तुरंत इलाज शुरू करने के लिए 0% ब्याज पर अग्रिम राशि।',
      whyRelevant: 'पैसों की व्यवस्था में होने वाली देरी से इलाज रुकने नहीं देता।',
      applicationStatus: 'eligible_to_apply',
      documentsNeeded: ['बैंक पासबुक प्रति', 'आधार कार्ड']
    },
    {
      id: 'crowd-milaap',
      category: 'crowdfunding',
      title: 'मिलाप समुदाय चिकित्सा यात्रा राहत कोष',
      provider: 'मिलाप वेरीफाइड हेल्थकेयर ट्रस्ट',
      potentialAmount: 70000,
      coverageDescription: 'मरीज़ और उनके साथी के बस यात्रा, रहने और पोषण के खर्च के लिए सहायता राशि।',
      whyRelevant: 'इलाज के दौरान होने वाले यात्रा और रहने के अतिरिक्त खर्च को वहन करने में मदद करता है।',
      applicationStatus: 'eligible_to_apply',
      documentsNeeded: ['केयर पासपोर्ट प्रमाणपत्र', 'अस्पताल पर्ची']
    }
  ]
};

/* ==========================================================================
   LOCALIZED CARE PATHWAY
   ========================================================================== */
export const localizedCarePathway: Record<Language, CarePathwayStep[]> = {
  en: [
    {
      id: 'step-1',
      stageName: 'Diagnosis & Pathology Confirmation',
      status: 'completed',
      dateOrDuration: 'Completed • 12 Sep',
      summary: 'Core needle biopsy and receptor status confirmed: Stage IIB IDC (ER+/PR+/HER2-).',
      details: 'Diagnostic reports organized into your Care Passport and ready for multidisciplinary review.',
      assignedEntity: 'District Pathology Lab'
    },
    {
      id: 'step-2',
      stageName: 'Care Passport & Access Assessment',
      status: 'completed',
      dateOrDuration: 'Completed • Today',
      summary: 'Clinical history structured with your dedicated care team; travel and funding parameters calculated.',
      details: 'Personalized care parameters generated to match against optimal healthcare centres.',
      assignedEntity: 'RIVORA Navigation Platform'
    },
    {
      id: 'step-3',
      stageName: 'Care Centre Selection & Pre-Op Consultation',
      status: 'current',
      dateOrDuration: 'Scheduled • Thursday, 10:30 AM',
      summary: 'Oncology consultation and surgical staging at Centre B (Apex Regional Cancer Centre).',
      details: 'Consultation with Dr. R. Menon for surgical plan finalization and baseline cardiac clearance.',
      assignedEntity: 'Dr. R. Menon • Centre B'
    },
    {
      id: 'step-4',
      stageName: 'Financial Support Authorization',
      status: 'upcoming',
      dateOrDuration: 'Next 3–5 Days',
      summary: 'PMJAY pre-authorization and NGO grant paperwork submission.',
      details: 'Hospital social welfare desk at Centre B coordinates pre-authorization.',
      assignedEntity: 'Centre B Patient Welfare Helpdesk'
    },
    {
      id: 'step-5',
      stageName: 'Curative Surgical Procedure',
      status: 'upcoming',
      dateOrDuration: 'Targeted: Within 7–10 Days',
      summary: 'Breast Conserving Surgery / Resection with Sentinel Node Mapping.',
      details: 'Performed by onco-surgical team with 3-day recovery stay.',
      assignedEntity: 'Surgical Team • Centre B'
    },
    {
      id: 'step-6',
      stageName: 'Adjuvant Therapy & Long-term Follow-up',
      status: 'upcoming',
      dateOrDuration: 'Starting Post-Surgery',
      summary: 'Systemic adjuvant therapy cycles with local community health worker monitoring.',
      details: 'Regular follow-up visits with travel assistance and doorstep check-ins by ASHA worker Anitha.',
      assignedEntity: 'Oncology Team & ASHA Worker Anitha'
    }
  ],
  ta: [
    {
      id: 'step-1',
      stageName: '1. நோயறிதல் மற்றும் பயாப்ஸி உறுதிப்படுத்தல்',
      status: 'completed',
      dateOrDuration: 'முடிந்தது • செப் 12',
      summary: 'பயாப்ஸி பரிசோதனை மூலம் நிலை IIB மார்பக புற்றுநோய் உறுதி செய்யப்பட்டது.',
      details: 'அனைத்து பரிசோதனை குறிப்புகளும் உங்கள் கேர் பாஸ்போர்ட்டில் பாதுகாப்பாக தொகுக்கப்பட்டுள்ளன.',
      assignedEntity: 'மாவட்ட நோயியல் ஆய்வகம்'
    },
    {
      id: 'step-2',
      stageName: '2. சிகிச்சை பாஸ்போர்ட் மற்றும் பயண திட்டம்',
      status: 'completed',
      dateOrDuration: 'முடிந்தது • இன்று',
      summary: 'உங்கள் மருத்துவ குழுவின் வழிகாட்டுதலுடன் சிகிச்சை மற்றும் பயண திட்டங்கள் அமைக்கப்பட்டன.',
      details: 'உங்களுக்கு ஏற்ற சிறந்த மருத்துவமனைகளும் நிதி உதவிகளும் கண்டறியப்பட்டுள்ளன.',
      assignedEntity: 'ரிவோரா சிகிச்சை வழிகாட்டி'
    },
    {
      id: 'step-3',
      stageName: '3. மருத்துவமனை தேர்வு மற்றும் டாக்டர் மேனன் ஆலோசனை',
      status: 'current',
      dateOrDuration: 'திட்டமிடப்பட்டது • வியாழன், காலை 10:30',
      summary: 'மையம் B-யில் டாக்டர் ஆர். மேனனுடன் நேரடி அறுவை சிகிச்சை திட்டமிடல் சந்திப்பு.',
      details: 'அறுவை சிகிச்சைக்கு முந்தைய உடல்தகுதி மற்றும் மருத்துவ திட்டத்தை இறுதி செய்தல்.',
      assignedEntity: 'டாக்டர் ஆர். மேனன் • மையம் B'
    },
    {
      id: 'step-4',
      stageName: '4. நிதி உதவி மற்றும் காப்பீட்டு அனுமதி',
      status: 'upcoming',
      dateOrDuration: 'அடுத்த 3–5 நாட்களில்',
      summary: 'PMJAY மற்றும் முதலமைச்சர் காப்பீட்டு திட்ட முன்அனுமதி சமர்ப்பித்தல்.',
      details: 'மையம் B சமூக நல அலுவலகம் இதை நேரடியாக செய்து தரும்.',
      assignedEntity: 'நோயாளி நல உதவி மையம்'
    },
    {
      id: 'step-5',
      stageName: '5. பாதுகாப்பான குணப்படுத்தும் அறுவை சிகிச்சை',
      status: 'upcoming',
      dateOrDuration: '7–10 நாட்களுக்குள்',
      summary: 'சிறப்பு அறுவை சிகிச்சை நிபுணர்கள் மூலம் வெற்றிகரமாக கட்டி அகற்றுதல்.',
      details: 'அறுவை சிகிச்சைக்குப் பின் 3 நாட்கள் மருத்துவமனை கண்காணிப்பு.',
      assignedEntity: 'அறுவை சிகிச்சை பிரிவு • மையம் B'
    },
    {
      id: 'step-6',
      stageName: '6. தொடர் சிகிச்சை மற்றும் இல்லம் தேடி வரும் கவனிப்பு',
      status: 'upcoming',
      dateOrDuration: 'அறுவை சிகிச்சைக்குப் பின்',
      summary: 'ஆஷா பணியாளர் அனிதாவின் நேரடி இல்ல கண்காணிப்புடன் தொடர் மருந்துகள்.',
      details: 'வழக்கமான சோதனைகள் மற்றும் பேருந்து பயண சீட்டுகள் வழங்கப்பட்டு சிகிச்சை தொடரும்.',
      assignedEntity: 'டாக்டர் குழு & ஆஷா பணியாளர் அனிதா'
    }
  ],
  hi: [
    {
      id: 'step-1',
      stageName: '1. निदान एवं पैथोलॉजी पुष्टि',
      status: 'completed',
      dateOrDuration: 'पूर्ण • 12 सितंबर',
      summary: 'बायोप्सी जांच द्वारा स्टेज IIB स्तन कैंसर की पुष्टि हुई।',
      details: 'सभी रिपोर्ट आपके केयर पासपोर्ट में सुरक्षित रूप से दर्ज कर ली गई हैं।',
      assignedEntity: 'जिला पैथोलॉजी लैब'
    },
    {
      id: 'step-2',
      stageName: '2. केयर पासपोर्ट एवं सहायता मूल्यांकन',
      status: 'completed',
      dateOrDuration: 'पूर्ण • आज',
      summary: 'आपकी मेडिकल टीम के सहयोग से इलाज और वित्तीय सहायता का खाका तैयार हुआ।',
      details: 'निकटतम सुसज्जित अस्पताल और अनुदान विकल्प निर्धारित किए गए।',
      assignedEntity: 'रिवोरा नेविगेशन प्लेटफॉर्म'
    },
    {
      id: 'step-3',
      stageName: '3. अस्पताल चयन एवं डॉ. मेनन से परामर्श',
      status: 'current',
      dateOrDuration: 'निर्धारित • गुरुवार, सुबह 10:30 बजे',
      summary: 'केंद्र B में सीनियर ऑन्कोलॉजिस्ट डॉ. आर. मेनन के साथ प्री-सर्जरी परामर्श।',
      details: 'सर्जरी की योजना और स्वास्थ्य जांच को अंतिम रूप देना।',
      assignedEntity: 'डॉ. आर. मेनन • केंद्र B'
    },
    {
      id: 'step-4',
      stageName: '4. वित्तीय सहायता एवं बीमा स्वीकृति',
      status: 'upcoming',
      dateOrDuration: 'अगले 3–5 दिनों में',
      summary: 'आयुष्मान भारत और राज्य बीमा की प्री-ऑथराइजेशन प्रक्रिया।',
      details: 'केंद्र B का समाज कल्याण विभाग पूरी कागजी कार्रवाई संभालेगा।',
      assignedEntity: 'रोगी कल्याण सहायता डेस्क'
    },
    {
      id: 'step-5',
      stageName: '5. सुरक्षित सुधारात्मक सर्जरी',
      status: 'upcoming',
      dateOrDuration: '7–10 दिनों के भीतर',
      summary: 'विशेषज्ञ सर्जिकल टीम द्वारा स्तन संरक्षण सर्जरी।',
      details: 'सर्जरी के बाद 3 दिन का सामान्य स्वास्थ्य लाभ।',
      assignedEntity: 'सर्जिकल टीम • केंद्र B'
    },
    {
      id: 'step-6',
      stageName: '6. सहायक थेरेपी एवं निरंतर देखभाल',
      status: 'upcoming',
      dateOrDuration: 'सर्जरी के बाद प्रारंभ',
      summary: 'आशा कार्यकर्ता अनिता की देखरेख में नियमित स्वास्थ्य फॉलो-अप।',
      details: 'यात्रा सहायता और घर पर नियमित जांच के साथ पूर्ण स्वास्थ्य लाभ।',
      assignedEntity: 'ऑन्कोलॉजी टीम एवं आशा कार्यकर्ता अनिता'
    }
  ]
};

/* ==========================================================================
   LOCALIZED APPOINTMENTS
   ========================================================================== */
export const localizedAppointments: Record<Language, AppointmentReminder[]> = {
  en: [
    {
      id: 'apt-1',
      type: 'consultation',
      title: 'Pre-Surgical Oncology Consultation with Dr. R. Menon',
      date: 'Thursday, 18 Sep 2026',
      time: '10:30 AM',
      location: 'Centre B — Apex Regional Cancer Institute, Room 204, OPD Block',
      specialist: 'Dr. R. Menon (Surgical Oncology)',
      status: 'confirmed',
      actionPrompt: 'View Directions & Instructions',
      instructions: 'Please bring your physical biopsy slide block and your RIVORA Care Passport summary slip.'
    },
    {
      id: 'apt-2',
      type: 'test',
      title: 'Pre-Operative Blood Profile & Chest X-Ray',
      date: 'Wednesday, 17 Sep 2026',
      time: '08:30 AM',
      location: 'Centre A or Centre B Diagnostic Lab',
      specialist: 'Laboratory Services',
      status: 'pending',
      actionPrompt: 'Book Morning Slot',
      instructions: 'Fasting of 8 hours recommended for blood glucose and complete lipid panel.'
    },
    {
      id: 'apt-3',
      type: 'transport',
      title: 'Coordinated Bus Transit to Centre B',
      date: 'Thursday, 18 Sep 2026',
      time: '06:45 AM Departure',
      location: 'Dharmapuri Bus Stand • Direct Express Service',
      specialist: 'Travel Assistance Service',
      status: 'confirmed',
      actionPrompt: 'View Bus Voucher',
      instructions: 'Health worker Anitha has arranged transit voucher assistance via Rural Access Program.'
    }
  ],
  ta: [
    {
      id: 'apt-1',
      type: 'consultation',
      title: 'டாக்டர் ஆர். மேனனுடன் அறுவை சிகிச்சைக்கு முந்தைய மருத்துவ சந்திப்பு',
      date: 'வியாழக்கிழமை, 18 செப்டம்பர் 2026',
      time: 'காலை 10:30 மணி',
      location: 'மையம் B — அபெக்ஸ் மண்டல புற்றுநோய் நிறுவனம், அறை 204, வெளிநோயாளி பிரிவு',
      specialist: 'டாக்டர் ஆர். மேனன் (புற்றுநோய் அறுவை சிகிச்சை தலைமை நிபுணர்)',
      status: 'confirmed',
      actionPrompt: 'வழிமுறைகள் மற்றும் விவரங்களைப் பார்க்க',
      instructions: 'உங்கள் பயாப்ஸி பரிசோதனை கண்ணாடி ஸ்லைடு மற்றும் ரிவோரா பாஸ்போர்ட் அட்டையை உடன் கொண்டு வரவும்.'
    },
    {
      id: 'apt-2',
      type: 'test',
      title: 'அறுவை சிகிச்சைக்கு முந்தைய ரத்தப் பரிசோதனை & நெஞ்சு எக்ஸ்-ரே',
      date: 'புதன்கிழமை, 17 செப்டம்பர் 2026',
      time: 'காலை 08:30 மணி',
      location: 'மையம் A அல்லது மையம் B பரிசோதனை ஆய்வகம்',
      specialist: 'ஆய்வக சேவை பிரிவு',
      status: 'pending',
      actionPrompt: 'நேரத்தை உறுதி செய்க',
      instructions: 'ரத்த சர்க்கரை பரிசோதனைக்காக காலையில் வெறும் வயிற்றில் வரவும்.'
    },
    {
      id: 'apt-3',
      type: 'transport',
      title: 'மையம் B-க்கு நேரடி விரைவு பேருந்து பயணம்',
      date: 'வியாழக்கிழமை, 18 செப்டம்பர் 2026',
      time: 'காலை 06:45 புறப்பாடு',
      location: 'தருமபுரி மத்திய பேருந்து நிலையம் • நேரடி விரைவு சேவை',
      specialist: 'கிராமப்புற பயண உதவி சேவை',
      status: 'confirmed',
      actionPrompt: 'பயண சீட்டைப் பார்க்க',
      instructions: 'சுகாதார பணியாளர் அனிதா இலவச பயண உதவி சீட்டை தயார் செய்துள்ளார்.'
    }
  ],
  hi: [
    {
      id: 'apt-1',
      type: 'consultation',
      title: 'डॉ. आर. मेनन के साथ सर्जरी पूर्व ऑन्कोलॉजी परामर्श',
      date: 'गुरुवार, 18 सितंबर 2026',
      time: 'सुबह 10:30 बजे',
      location: 'केंद्र B — एपेक्स क्षेत्रीय कैंसर संस्थान, कमरा 204, ओपीडी ब्लॉक',
      specialist: 'डॉ. आर. मेनन (सीनियर सर्जिकल ऑन्कोलॉजिस्ट)',
      status: 'confirmed',
      actionPrompt: 'दिशा-निर्देश देखें',
      instructions: 'कृपया अपनी बायोप्सी स्लाइड और रिवोरा केयर पासपोर्ट पर्ची साथ लेकर आएं।'
    },
    {
      id: 'apt-2',
      type: 'test',
      title: 'सर्जरी पूर्व रक्त जांच एवं छाती का एक्स-रे',
      date: 'बुधवार, 17 सितंबर 2026',
      time: 'सुबह 08:30 बजे',
      location: 'केंद्र A अथवा केंद्र B डायग्नोस्टिक लैब',
      specialist: 'लैबोरेटरी सेवाएं',
      status: 'pending',
      actionPrompt: 'समय स्लॉट चुनें',
      instructions: 'रक्त शर्करा जांच के लिए 8 घंटे खाली पेट रहना आवश्यक है।'
    },
    {
      id: 'apt-3',
      type: 'transport',
      title: 'केंद्र B के लिए समन्वित एक्सप्रेस बस यात्रा',
      date: 'गुरुवार, 18 सितंबर 2026',
      time: 'सुबह 06:45 बजे प्रस्थान',
      location: 'धर्मपुरी बस स्टैंड • सीधी एक्सप्रेस सेवा',
      specialist: 'यात्रा सहायता सेवा',
      status: 'confirmed',
      actionPrompt: 'बस वाउचर देखें',
      instructions: 'स्वास्थ्य कार्यकर्ता अनिता ने ग्रामीण सहायता कार्यक्रम के तहत बस वाउचर की व्यवस्था की है।'
    }
  ]
};

export const initialAuditLogs: AuditLogEntry[] = [
  {
    id: 'log-1',
    timestamp: 'Today, 11:30 AM',
    actorName: 'Dr. R. Menon',
    actorRole: 'doctor',
    action: 'Verified Clinical Information',
    details: 'Confirmed Stage IIB diagnosis, ER+/PR+ IHC markers, and verified surgical indication for Lakshmi Narayanan.',
    patientId: 'lakshmi-patient'
  },
  {
    id: 'log-2',
    timestamp: 'Today, 11:18 AM',
    actorName: 'Anitha (ASHA)',
    actorRole: 'healthworker',
    action: 'Updated Location & Transit Tolerance',
    details: 'Recorded rural transit limit of 75 km and connected patient to morning express bus route.',
    patientId: 'lakshmi-patient'
  },
  {
    id: 'log-3',
    timestamp: 'Today, 10:42 AM',
    actorName: 'Dr. R. Menon',
    actorRole: 'doctor',
    action: 'Viewed Care Passport',
    details: 'Accessed electronic Care Passport for surgical review and feasibility evaluation.',
    patientId: 'lakshmi-patient'
  },
  {
    id: 'log-4',
    timestamp: 'Today, 10:30 AM',
    actorName: 'Clinical Intake Coordinator',
    actorRole: 'healthworker',
    action: 'Clinical Record Prepared',
    details: 'Consolidated pathology parameters from report #DHP-8492. Flagged for Dr. Menon oncologist sign-off.',
    patientId: 'lakshmi-patient'
  },
  {
    id: 'log-5',
    timestamp: 'Today, 10:15 AM',
    actorName: 'Lakshmi Narayanan',
    actorRole: 'patient',
    action: 'Patient Consent Granted',
    details: 'Granted explicit permission for multi-centre matching and financial assistance assessment.',
    patientId: 'lakshmi-patient'
  }
];

export const mockAssignedPatients = [
  {
    id: 'lakshmi-patient',
    name: 'Lakshmi Narayanan',
    age: 48,
    stage: 'Stage IIB Breast Cancer',
    location: 'Dharmapuri Rural District',
    riskLevel: 'medium',
    riskReason: 'Travel distance 65 km + ₹3L funding gap',
    verificationStatus: 'ai_assisted',
    needsAttention: true,
    lastActive: '12 mins ago',
    missingData: 'Requires Doctor Clinical Verification'
  },
  {
    id: 'meena-patient',
    name: 'Meenakshi K.',
    age: 52,
    stage: 'Stage I (T1c N0)',
    location: 'Harur Taluk',
    riskLevel: 'low',
    riskReason: 'Local care centre available, PMJAY pre-approved',
    verificationStatus: 'doctor_verified',
    needsAttention: false,
    lastActive: '2 days ago',
    missingData: 'None • On Schedule'
  },
  {
    id: 'kavitha-patient',
    name: 'Kavitha S.',
    age: 44,
    stage: 'Stage III (T3 N2)',
    location: 'Pennagaram Remote Village',
    riskLevel: 'high',
    riskReason: 'Distance 110 km + financial barrier',
    verificationStatus: 'doctor_verified',
    needsAttention: true,
    lastActive: '1 hour ago',
    missingData: 'Requires Special Transit Grant Approval'
  }
];

// Helper fallback getters for default dataset
export const mockHospitals = localizedHospitals.en;
export const mockFinancialSchemes = localizedFinancialSchemes.en;
export const mockCarePathway = localizedCarePathway.en;
export const mockAppointments = localizedAppointments.en;

export const initialAccessRisk: AccessRiskAssessment = {
  overallRisk: 'medium',
  riskScore: 6.5,
  factors: [
    {
      name: 'Travel Distance to Specialized Oncology Centre',
      severity: 'medium',
      description: 'The nearest comprehensive surgical and medical oncology centre (Centre B) is 65 km away, requiring 1h 45m of transit.',
      icon: 'MapPin'
    },
    {
      name: 'Estimated Out-of-Pocket Financial Gap',
      severity: 'medium',
      description: 'Estimated ₹3,00,000 funding gap remaining after primary insurance, which may cause start delays if not bridged.',
      icon: 'Wallet'
    },
    {
      name: 'Local Specialist Oncology Availability',
      severity: 'high',
      description: 'Your local sub-district hospital (Centre A / Centre D) does not have dedicated medical oncologists on staff.',
      icon: 'Users'
    },
    {
      name: 'Surgical Wait Time Feasibility',
      severity: 'low',
      description: 'Centre B currently has a short 4-day surgical scheduling turnaround, which prevents critical time loss.',
      icon: 'Clock'
    }
  ],
  possibleNextSteps: [
    {
      title: 'Lock In Surgery Schedule at Centre B',
      actionText: 'View Centre B Details',
      targetView: 'healthcare-matching',
      description: 'Reserve your pre-surgical consultation at Centre B to take advantage of their 4-day wait time.'
    },
    {
      title: 'Apply for PMJAY & Sri Aurobindo Grant',
      actionText: 'Review Financial Options',
      targetView: 'financial-support',
      description: 'Initiate the PMJAY pre-authorization and the NGO grant to eliminate the estimated ₹3,00,000 gap.'
    },
    {
      title: 'Connect with ASHA Lead Anitha',
      actionText: 'Request Worker Assistance',
      targetView: 'follow-up',
      description: 'Your designated health worker Anitha can coordinate local blood test pickups and travel logistics.'
    }
  ]
};
