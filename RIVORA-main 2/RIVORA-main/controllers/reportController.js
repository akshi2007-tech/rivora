const fs = require('fs');
const path = require('path');
const MedicalReport = require('../models/MedicalReport');
const Patient = require('../models/Patient');
const { logAction } = require('./auditLogController');

const buildReportResponse = (report) => ({
  id: report._id,
  patientId: report.patientId,
  uploadedBy: report.uploadedBy,
  fileName: report.fileName,
  fileUrl: report.fileUrl,
  fileType: report.fileType,
  fileSize: report.fileSize,
  reportType: report.reportType,
  status: report.status,
  uploadedAt: report.uploadedAt,
  reviewedBy: report.reviewedBy,
  reviewedAt: report.reviewedAt,
  reviewNotes: report.reviewNotes
});

const uploadReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Report file is required' });
    }

    const patient = await Patient.findById(req.body.patientId || req.query.patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    if (req.user.role === 'patient' && patient.userId && patient.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied: you can only upload for your own profile' });
    }

    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const publicUrl = `/uploads/${req.file.filename}`;

    const report = await MedicalReport.create({
      patientId: patient._id,
      uploadedBy: req.user.id,
      fileName: req.file.originalname,
      fileUrl: publicUrl,
      filePath,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      reportType: req.body.reportType || 'medical_report',
      status: 'pending',
      uploadedAt: new Date()
    });

    patient.verificationStatus = 'patient_provided';
    patient.verificationNotes = 'Medical report uploaded and awaiting doctor verification.';
    await patient.save();

    await logAction(req.user.id, req.user.role, 'report_uploaded', patient._id, `Uploaded ${req.file.originalname}`);

    return res.status(201).json({ success: true, data: buildReportResponse(report) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getReportsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    if (req.user.role === 'patient' && patient.userId && patient.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied: you can only view your own reports' });
    }

    const reports = await MedicalReport.find({ patientId }).sort({ uploadedAt: -1 });
    return res.json({ success: true, data: reports.map(buildReportResponse) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getReportById = async (req, res) => {
  try {
    const report = await MedicalReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Medical report not found' });
    }

    const patient = await Patient.findById(report.patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    if (req.user.role === 'patient' && patient.userId && patient.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied: you can only view your own medical reports' });
    }

    await logAction(req.user.id, req.user.role, 'report_viewed', patient._id, `Viewed report ${report._id}`);
    return res.json({ success: true, data: buildReportResponse(report) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const reviewReport = async (req, res) => {
  try {
    const { status, reviewNotes } = req.body;
    if (!['verified', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be verified or rejected' });
    }

    const report = await MedicalReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Medical report not found' });
    }

    const patient = await Patient.findById(report.patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
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

    await logAction(req.user.id, req.user.role, status === 'verified' ? 'report_verified' : 'report_rejected', patient._id, reviewNotes || '');
    return res.json({ success: true, data: buildReportResponse(report) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  uploadReport,
  getReportsByPatientId,
  getReportById,
  reviewReport
};
