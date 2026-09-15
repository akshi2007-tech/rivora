const CarePassport = require('../models/CarePassport');
const Patient = require('../models/Patient');
const { logAction } = require('./auditLogController');


const createCarePassport = async (req, res) => {
  try {
    const {
      patientId,
      diagnosis,
      stage,
      biomarkers,
      requiredCare,
      locationConstraint,
      financialConstraint,
      accessBarriers,
      currentTreatmentStatus
    } = req.body;

    if (!patientId) {
      return res.status(400).json({
        error: 'patientId is required'
      });
    }

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        error: 'Patient not found'
      });
    }

    if (req.user.role === 'patient') {
      const isOwner =
        patient.userId &&
        patient.userId.toString() === req.user.id;

      if (!isOwner) {
        return res.status(403).json({
          error:
            'Access denied: You can only create a care passport for your own profile'
        });
      }
    }

    const carePassport = new CarePassport({
      patientId,

      diagnosis:
        diagnosis || patient.diagnosis || 'Breast Cancer',

      stage:
        stage || patient.stage,

      biomarkers:
        biomarkers || patient.biomarkers || [],

      requiredCare:
        Array.isArray(requiredCare)
          ? requiredCare
          : requiredCare
            ? [requiredCare]
            : [],

      locationConstraint:
        locationConstraint || {
          maxDistanceKm:
            patient.travelToleranceKm || 100,
          preferredRegion:
            patient.location || ''
        },

      financialConstraint:
        financialConstraint || {
          totalEstimatedCost:
            patient.totalEstimatedCost || 0,
          insuranceCoverage:
            patient.coverageEstimated || 0,
          fundingGap:
            patient.financialGap || 0
        },

      accessBarriers:
        accessBarriers || patient.accessBarriers || [],

      currentTreatmentStatus:
        currentTreatmentStatus ||
        patient.currentTreatment ||
        'Not started',

      verified: false,
      verifiedBy: null,
      verifiedAt: null
    });

    await carePassport.save();

    return res.status(201).json(carePassport);
  } catch (err) {
    console.error('Create Care Passport error:', err);

    return res.status(500).json({
      error: err.message
    });
  }
};


const getCarePassportByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        error: 'Patient not found'
      });
    }

    if (req.user.role === 'patient') {
      const isOwner =
        patient.userId &&
        patient.userId.toString() === req.user.id;

      if (!isOwner) {
        return res.status(403).json({
          error:
            'Access denied: You can only view your own care passport'
        });
      }
    }

    const carePassport =
      await CarePassport.findOne({ patientId })
        .populate('verifiedBy', 'name email role')
        .populate('patientId');

    if (!carePassport) {
      return res.status(404).json({
        error: 'Care Passport not found for this patient'
      });
    }

    await logAction(
      req.user.id,
      req.user.role,
      'view_care_passport',
      patientId
    );

    return res.json(carePassport);
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};


const updateCarePassport = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    if (req.user.role === 'patient' && patient.userId && patient.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied: you can only update your own care passport' });
    }

    const existing = await CarePassport.findOne({ patientId });
    const updates = req.body || {};

    const carePassport = existing || new CarePassport({ patientId });
    const fields = [
      'diagnosis', 'stage', 'biomarkers', 'requiredCare', 'locationConstraint',
      'financialConstraint', 'accessBarriers', 'currentTreatmentStatus', 'verified', 'verifiedBy', 'verifiedAt'
    ];

    fields.forEach((field) => {
      if (updates[field] !== undefined) {
        carePassport[field] = updates[field];
      }
    });

    if (!carePassport.diagnosis) carePassport.diagnosis = patient.diagnosis || 'Breast Cancer';
    if (!carePassport.requiredCare || carePassport.requiredCare.length === 0) {
      carePassport.requiredCare = patient.recommendedTreatment ? [patient.recommendedTreatment] : [];
    }

    await carePassport.save();
    await logAction(req.user.id, req.user.role, 'care_passport_updated', patientId, 'Care passport updated');
    return res.json({ success: true, data: carePassport });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const verifyCarePassport = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== 'doctor') {
      return res.status(403).json({
        success: false,
        message: 'Access denied: Only doctors can verify care passports'
      });
    }

    const carePassport = await CarePassport.findById(id);

    if (!carePassport) {
      return res.status(404).json({
        success: false,
        message: 'Care Passport not found'
      });
    }

    carePassport.verified = true;
    carePassport.verifiedBy = req.user.id;
    carePassport.verifiedAt = new Date();

    const patient = await Patient.findById(carePassport.patientId);
    if (patient) {
      patient.verificationStatus = 'doctor_verified';
      patient.verificationNotes = 'Care passport verified by doctor.';
      patient.verifiedBy = req.user.id;
      patient.verifiedAt = new Date();
      await patient.save();
    }

    await carePassport.save();

    await logAction(req.user.id, req.user.role, 'verify_care_passport', carePassport.patientId);

    return res.json({ success: true, data: carePassport });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


module.exports = {
  createCarePassport,
  getCarePassportByPatientId,
  updateCarePassport,
  verifyCarePassport
};