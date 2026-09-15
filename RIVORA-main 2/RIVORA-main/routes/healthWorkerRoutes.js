const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const FinancialSupport = require('../models/FinancialSupport');

router.get('/patients', authenticateToken, authorizeRoles('healthworker'), async (req, res) => {
  try {
    const patients = await Patient.find({}).sort({ createdAt: -1 });
    return res.json({ success: true, data: patients });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/patients/:id', authenticateToken, authorizeRoles('healthworker'), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    return res.json({ success: true, data: patient });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.patch('/patients/:id/follow-up', authenticateToken, authorizeRoles('healthworker'), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    const appointment = await Appointment.findOne({ patientId: patient._id, status: { $ne: 'completed' } });
    if (!appointment) {
      const created = await Appointment.create({ patientId: patient._id, ...req.body, status: 'scheduled' });
      return res.json({ success: true, data: created });
    }

    Object.assign(appointment, req.body);
    await appointment.save();
    return res.json({ success: true, data: appointment });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.patch('/patients/:id/financial-support', authenticateToken, authorizeRoles('healthworker'), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    const support = await FinancialSupport.findOne({ patientId: patient._id });
    if (!support) {
      const created = await FinancialSupport.create({ patientId: patient._id, ...req.body, title: req.body.title || 'Support opportunity' });
      return res.json({ success: true, data: created });
    }

    Object.assign(support, req.body);
    support.updatedAt = new Date();
    await support.save();
    return res.json({ success: true, data: support });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
