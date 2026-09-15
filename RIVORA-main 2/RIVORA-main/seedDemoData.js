require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Patient = require('./models/Patient');
const MedicalReport = require('./models/MedicalReport');
const CarePassport = require('./models/CarePassport');
const Hospital = require('./models/Hospital');
const FinancialSupport = require('./models/FinancialSupport');
const Appointment = require('./models/Appointment');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/rivora';

async function seed() {
  await mongoose.connect(MONGO_URI);
  await Promise.all([
    User.deleteMany({}),
    Patient.deleteMany({}),
    MedicalReport.deleteMany({}),
    CarePassport.deleteMany({}),
    Hospital.deleteMany({}),
    FinancialSupport.deleteMany({}),
    Appointment.deleteMany({})
  ]);

  const doctorUser = await User.create({
    name: 'Dr. Meera Rao',
    email: 'doctor@rivora.demo',
    password: await bcrypt.hash('doctor123', 10),
    passwordHash: await bcrypt.hash('doctor123', 10),
    role: 'doctor',
    isActive: true
  });

  const healthWorkerUser = await User.create({
    name: 'Asha Health Worker',
    email: 'worker@rivora.demo',
    password: await bcrypt.hash('worker123', 10),
    passwordHash: await bcrypt.hash('worker123', 10),
    role: 'healthworker',
    isActive: true
  });

  const patientUserPending = await User.create({
    name: 'Priya Sharma',
    email: 'patient1@rivora.demo',
    password: await bcrypt.hash('patient123', 10),
    passwordHash: await bcrypt.hash('patient123', 10),
    role: 'patient',
    isActive: true
  });

  const patientUserVerified = await User.create({
    name: 'Nisha Patel',
    email: 'patient2@rivora.demo',
    password: await bcrypt.hash('patient123', 10),
    passwordHash: await bcrypt.hash('patient123', 10),
    role: 'patient',
    isActive: true
  });

  const patientPending = await Patient.create({
    userId: patientUserPending._id,
    fullName: 'Priya Sharma',
    name: 'Priya Sharma',
    age: 39,
    location: 'Bengaluru',
    preferredLanguage: 'English',
    phone: '+91 9876543210',
    email: 'patient1@rivora.demo',
    diagnosed: true,
    diagnosis: 'Breast Cancer',
    diagnosisDate: new Date('2026-05-12'),
    stage: 'Stage II',
    biomarkers: [{ name: 'ER', value: 'Positive', status: 'confirmed' }],
    currentTreatment: 'Chemotherapy',
    recommendedTreatment: 'Surgery',
    travelToleranceKm: 80,
    totalEstimatedCost: 420000,
    coverageEstimated: 150000,
    financialGap: 270000,
    insuranceStatus: 'partially-insured',
    accessBarriers: ['Transport support', 'Income loss'],
    preferredContactMethod: 'phone',
    emergencyContact: { name: 'Ramesh Sharma', relationship: 'Spouse', phone: '+91 9988776655' },
    consent: { given: true, givenAt: new Date(), version: 'v1' },
    verificationStatus: 'patient_provided',
    verificationNotes: 'Awaiting review'
  });

  const patientVerified = await Patient.create({
    userId: patientUserVerified._id,
    fullName: 'Nisha Patel',
    name: 'Nisha Patel',
    age: 45,
    location: 'Pune',
    preferredLanguage: 'Hindi',
    phone: '+91 9123456789',
    email: 'patient2@rivora.demo',
    diagnosed: true,
    diagnosis: 'Breast Cancer',
    diagnosisDate: new Date('2026-04-20'),
    stage: 'Stage I',
    biomarkers: [{ name: 'HER2', value: 'Positive', status: 'confirmed' }],
    currentTreatment: 'Radiotherapy',
    recommendedTreatment: 'Targeted Therapy',
    travelToleranceKm: 120,
    totalEstimatedCost: 280000,
    coverageEstimated: 180000,
    financialGap: 100000,
    insuranceStatus: 'insured',
    accessBarriers: ['Need caregiver assistance'],
    preferredContactMethod: 'whatsapp',
    emergencyContact: { name: 'Mehul Patel', relationship: 'Brother', phone: '+91 9877665544' },
    consent: { given: true, givenAt: new Date(), version: 'v1' },
    verificationStatus: 'doctor_verified',
    verificationNotes: 'Approved by doctor',
    verifiedBy: doctorUser._id,
    verifiedAt: new Date()
  });

  const pendingReport = await MedicalReport.create({
    patientId: patientPending._id,
    uploadedBy: patientUserPending._id,
    fileName: 'priya-report.pdf',
    fileUrl: '/uploads/priya-report.pdf',
    fileType: 'application/pdf',
    fileSize: 120000,
    reportType: 'medical_report',
    status: 'pending',
    uploadedAt: new Date()
  });

  const verifiedReport = await MedicalReport.create({
    patientId: patientVerified._id,
    uploadedBy: patientUserVerified._id,
    fileName: 'nisha-report.jpg',
    fileUrl: '/uploads/nisha-report.jpg',
    fileType: 'image/jpeg',
    fileSize: 70000,
    reportType: 'medical_report',
    status: 'verified',
    uploadedAt: new Date('2026-08-21'),
    reviewedBy: doctorUser._id,
    reviewedAt: new Date('2026-08-22'),
    reviewNotes: 'Report reviewed and approved.'
  });

  await CarePassport.create({
    patientId: patientPending._id,
    diagnosis: 'Breast Cancer',
    stage: 'Stage II',
    biomarkers: [{ name: 'ER', value: 'Positive', status: 'confirmed' }],
    requiredCare: ['Surgery', 'Oncology', 'Radiotherapy'],
    locationConstraint: { maxDistanceKm: 80, preferredRegion: 'Bengaluru' },
    financialConstraint: { totalEstimatedCost: 420000, insuranceCoverage: 150000, fundingGap: 270000 },
    accessBarriers: ['Transport support', 'Income loss'],
    currentTreatmentStatus: 'Chemotherapy',
    verified: false
  });

  await CarePassport.create({
    patientId: patientVerified._id,
    diagnosis: 'Breast Cancer',
    stage: 'Stage I',
    biomarkers: [{ name: 'HER2', value: 'Positive', status: 'confirmed' }],
    requiredCare: ['Targeted Therapy', 'Radiotherapy'],
    locationConstraint: { maxDistanceKm: 120, preferredRegion: 'Pune' },
    financialConstraint: { totalEstimatedCost: 280000, insuranceCoverage: 180000, fundingGap: 100000 },
    accessBarriers: ['Need caregiver assistance'],
    currentTreatmentStatus: 'Radiotherapy',
    verified: true,
    verifiedBy: doctorUser._id,
    verifiedAt: new Date()
  });

  await Hospital.insertMany([
    {
      name: 'City Cancer Center',
      location: 'Bengaluru',
      address: 'MG Road, Bengaluru',
      contactNumber: '+91 8022223333',
      latitude: 12.9716,
      longitude: 77.5946,
      surgeryAvailable: true,
      oncologyAvailable: true,
      radiotherapyAvailable: true,
      specialistAvailable: true,
      treatmentsAvailable: ['Surgery', 'Oncology', 'Radiotherapy', 'Chemotherapy'],
      capacityAvailable: true,
      availableBeds: 24,
      waitingTimeDays: 6,
      distanceFromPatient: 18,
      accreditation: ['NABH'],
      supportedSchemes: ['PMJAY', 'CSR'],
      estimatedTreatmentCost: 420000
    },
    {
      name: 'Apollo Oncology Institute',
      location: 'Pune',
      address: 'Baner, Pune',
      contactNumber: '+91 2022224444',
      latitude: 18.5204,
      longitude: 73.8567,
      surgeryAvailable: true,
      oncologyAvailable: true,
      radiotherapyAvailable: true,
      specialistAvailable: true,
      treatmentsAvailable: ['Surgery', 'Oncology', 'Radiotherapy', 'Targeted Therapy'],
      capacityAvailable: true,
      availableBeds: 30,
      waitingTimeDays: 4,
      distanceFromPatient: 14,
      accreditation: ['JCI'],
      supportedSchemes: ['CSR', 'Hospital Assistance'],
      estimatedTreatmentCost: 280000
    }
  ]);

  await FinancialSupport.insertMany([
    {
      patientId: patientPending._id,
      schemeId: 'gov-001',
      category: 'government',
      title: 'State Cancer Assistance Program',
      provider: 'State Health Department',
      potentialAmount: 120000,
      coverageDescription: 'Support for diagnostics and treatment for eligible cancer patients.',
      eligibilityStatus: 'eligible',
      applicationStatus: 'in_progress',
      documentsNeeded: ['Income certificate', 'Medical report'],
      submittedAt: new Date(),
      updatedAt: new Date()
    },
    {
      patientId: patientVerified._id,
      schemeId: 'ngo-101',
      category: 'ngo',
      title: 'Patient Care Grant',
      provider: 'RIVORA Care Network',
      potentialAmount: 50000,
      coverageDescription: 'Travel and nutrition support for treatment continuity.',
      eligibilityStatus: 'eligible',
      applicationStatus: 'approved',
      documentsNeeded: ['Patient ID', 'Treatment summary'],
      submittedAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  await Appointment.insertMany([
    {
      patientId: patientPending._id,
      hospitalId: null,
      specialist: 'Medical Oncologist',
      type: 'follow_up',
      date: new Date(Date.now() + 86400000),
      time: '10:30 AM',
      location: 'Bengaluru',
      status: 'scheduled',
      instructions: 'Bring all investigation records and consent form.',
      completed: false,
      reminder: 'Two days before appointment'
    },
    {
      patientId: patientVerified._id,
      hospitalId: null,
      specialist: 'Radiation Oncologist',
      type: 'follow_up',
      date: new Date(Date.now() + 172800000),
      time: '2:00 PM',
      location: 'Pune',
      status: 'scheduled',
      instructions: 'Continue prescribed care plan and follow-up imaging.',
      completed: false,
      reminder: 'One day before appointment'
    }
  ]);

  console.log('Demo seed complete');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
