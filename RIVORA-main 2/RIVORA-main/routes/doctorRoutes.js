const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const Patient = require('../models/Patient');
const MedicalReport = require('../models/MedicalReport');
const CarePassport = require('../models/CarePassport');
const Hospital = require('../models/Hospital');

router.get('/patients/pending', authenticateToken, authorizeRoles('doctor'), async (req, res) => {
  try {
    const reports = await MedicalReport.find({ status: { $in: ['pending', 'under_review'] } }).sort({ uploadedAt: -1 });
    const patientIds = [...new Set(reports.map((report) => report.patientId.toString()))];
    const patients = await Patient.find({ _id: { $in: patientIds } });

    const result = patients.map((patient) => {
      const report = reports.filter((r) => r.patientId.toString() === patient._id.toString()).sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))[0];
      return {
        patientId: patient._id,
        patientName: patient.fullName || patient.name,
        name: patient.fullName || patient.name,
        age: patient.age,
        location: patient.location,
        diagnosis: patient.diagnosis,
        stage: patient.stage,
        reportId: report ? report._id : null,
        reportType: report ? report.reportType : null,
        reportUploadDate: report ? report.uploadedAt : null,
        verificationStatus: patient.verificationStatus,
        reviewStatus: report ? report.status : 'pending'
      };
    });

    return res.json({ success: true, data: result });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/patients/:id', authenticateToken, authorizeRoles('doctor'), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    const reports = await MedicalReport.find({ patientId: patient._id }).sort({ uploadedAt: -1 });
    const carePassport = await CarePassport.findOne({ patientId: patient._id });
    const hospitals = await Hospital.find();

    return res.json({
      success: true,
      data: {
        patient,
        consentStatus: patient.consent || { given: false },
        uploadedReports: reports,
        verificationStatus: patient.verificationStatus,
        carePassport,
        treatmentInformation: {
          currentTreatment: patient.currentTreatment || patient.current_treatment,
          recommendedTreatment: patient.recommendedTreatment || patient.recommended_treatment,
          diagnosis: patient.diagnosis,
          stage: patient.stage,
          biomarker: patient.biomarkers || []
        },
        accessBarriers: patient.accessBarriers || [],
        financialInformation: {
          totalEstimatedCost: patient.totalEstimatedCost,
          coverageEstimated: patient.coverageEstimated,
          financialGap: patient.financialGap,
          insuranceStatus: patient.insuranceStatus
        },
        relevantHospitalMatches: hospitals,
        pathwayFollowUp: { status: 'pending' }
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.patch('/patients/:id/verify', authenticateToken, authorizeRoles('doctor'), async (req, res) => {
  try {
    const { status, reviewNotes } = req.body;
    if (!['verified', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be verified or rejected' });
    }

    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    const report = await MedicalReport.findOne({ patientId: patient._id }).sort({ uploadedAt: -1 });
    if (!report) {
      return res.status(404).json({ success: false, message: 'No reports available for verification' });
    }

    report.status = status === 'verified' ? 'verified' : 'rejected';
    report.reviewedBy = req.user.id;
    report.reviewedAt = new Date();
    report.reviewNotes = reviewNotes || '';
    await report.save();

    if (status === 'verified') {
      patient.verificationStatus = 'doctor_verified';
      patient.verificationNotes = reviewNotes || 'Verified by doctor.';
      patient.verifiedBy = req.user.id;
      patient.verifiedAt = new Date();
    } else {
      patient.verificationStatus = 'rejected';
      patient.verificationNotes = reviewNotes || 'Report rejected by doctor.';
      patient.verifiedBy = req.user.id;
      patient.verifiedAt = new Date();
    }

    await patient.save();
    return res.json({ success: true, data: { patient, report } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
