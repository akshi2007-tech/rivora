const Patient = require('../models/Patient');

const canAccessPatientRecord = (req, patient) => {
  if (!patient) return false;
  if (req.user.role === 'patient') {
    return patient.userId && patient.userId.toString() === req.user.id;
  }
  return ['doctor', 'healthworker'].includes(req.user.role);
};

const createPatient = async (req, res) => {
  try {
    const {
      userId,
      fullName,
      name,
      age,
      location,
      preferredLanguage,
      preferred_language,
      phone,
      email,
      diagnosed,
      diagnosis,
      stage,
      biomarkers,
      currentTreatment,
      current_treatment,
      recommendedTreatment,
      recommended_treatment,
      hospital,
      currentHospital,
      travelToleranceKm,
      totalEstimatedCost,
      coverageEstimated,
      financialGap,
      insuranceStatus,
      accessBarriers,
      preferredContactMethod,
      emergencyContact,
      consent
    } = req.body;

    if (!fullName && !name) {
      return res.status(400).json({ success: false, message: 'Patient name is required' });
    }

    const linkedUserId = userId || (req.user.role === 'patient' ? req.user.id : null);

    const patient = new Patient({
      userId: linkedUserId,
      fullName: fullName || name,
      name: name || fullName,
      age,
      location,
      preferredLanguage: preferredLanguage || preferred_language || 'English',
      preferred_language: preferred_language || preferredLanguage || 'English',
      phone,
      email,
      diagnosed: diagnosed !== undefined ? diagnosed : false,
      diagnosis: diagnosis || 'Breast Cancer',
      stage,
      biomarkers: biomarkers || [],
      currentTreatment: currentTreatment || current_treatment || '',
      current_treatment: current_treatment || currentTreatment || '',
      recommendedTreatment: recommendedTreatment || recommended_treatment || '',
      recommended_treatment: recommended_treatment || recommendedTreatment || '',
      hospital: hospital || currentHospital || '',
      currentHospital: currentHospital || null,
      travelToleranceKm: travelToleranceKm || 100,
      totalEstimatedCost: totalEstimatedCost || 0,
      coverageEstimated: coverageEstimated || 0,
      financialGap: financialGap || 0,
      insuranceStatus: insuranceStatus || 'unknown',
      accessBarriers: accessBarriers || [],
      preferredContactMethod: preferredContactMethod || 'phone',
      emergencyContact: emergencyContact || {},
      consent: consent || { given: false, givenAt: null, version: 'v1' },
      verificationStatus: 'patient_provided'
    });

    await patient.save();

    return res.status(201).json({ success: true, data: patient });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    if (req.user.role === 'patient' && !canAccessPatientRecord(req, patient)) {
      return res.status(403).json({ success: false, message: 'Access denied: You can only view your own patient profile' });
    }

    if (['doctor', 'healthworker'].includes(req.user.role)) {
      // protected access is allowed for relevant clinician roles
    }

    return res.json({ success: true, data: patient });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    if (req.user.role === 'patient' && !canAccessPatientRecord(req, patient)) {
      return res.status(403).json({ success: false, message: 'Access denied: You can only update your own patient profile' });
    }

    const allowedUpdates = [
      'fullName', 'name', 'age', 'location', 'preferredLanguage', 'preferred_language',
      'phone', 'email', 'diagnosed', 'diagnosis', 'diagnosisDate', 'stage', 'biomarkers',
      'currentTreatment', 'current_treatment', 'recommendedTreatment', 'recommended_treatment',
      'hospital', 'currentHospital', 'travelToleranceKm', 'totalEstimatedCost', 'coverageEstimated',
      'financialGap', 'insuranceStatus', 'accessBarriers', 'preferredContactMethod', 'emergencyContact',
      'consent', 'verificationStatus', 'verificationNotes', 'verifiedBy', 'verifiedAt'
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        patient[field] = req.body[field];
      }
    });

    if (req.body.fullName && !req.body.name) {
      patient.name = req.body.fullName;
    }
    if (req.body.name && !req.body.fullName) {
      patient.fullName = req.body.name;
    }

    await patient.save();
    return res.json({ success: true, data: patient });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const submitConsent = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    if (req.user.role === 'patient' && !canAccessPatientRecord(req, patient)) {
      return res.status(403).json({ success: false, message: 'Access denied: You can only submit consent for your own profile' });
    }

    const consentData = {
      given: req.body.given === true,
      givenAt: new Date(),
      version: req.body.version || 'v1'
    };

    patient.consent = consentData;
    await patient.save();

    return res.json({ success: true, data: patient.consent });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createPatient,
  getPatientById,
  updatePatient,
  submitConsent,
  canAccessPatientRecord
};
