const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const FinancialSupport = require('../models/FinancialSupport');
const Patient = require('../models/Patient');

router.get('/:patientId', authenticateToken, authorizeRoles('patient', 'doctor', 'healthworker'), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    if (req.user.role === 'patient' && patient.userId && patient.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied: you can only view your own funding support' });
    }

    const support = await FinancialSupport.find({ patientId: patient._id }).sort({ updatedAt: -1 });
    return res.json({ success: true, data: support });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.patch('/:id', authenticateToken, authorizeRoles('patient', 'doctor', 'healthworker'), async (req, res) => {
  try {
    const support = await FinancialSupport.findById(req.params.id);
    if (!support) {
      return res.status(404).json({ success: false, message: 'Financial support record not found' });
    }

    const patient = await Patient.findById(support.patientId);
    if (req.user.role === 'patient' && patient && patient.userId && patient.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied: you can only update your own funding support' });
    }

    const allowedFields = ['schemeId', 'category', 'title', 'provider', 'potentialAmount', 'coverageDescription', 'eligibilityStatus', 'applicationStatus', 'documentsNeeded', 'submittedAt'];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        support[field] = req.body[field];
      }
    });

    support.updatedAt = new Date();
    await support.save();
    return res.json({ success: true, data: support });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
