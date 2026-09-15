const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');

router.get('/patient/:patientId', authenticateToken, authorizeRoles('patient', 'doctor', 'healthworker'), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    if (req.user.role === 'patient' && patient.userId && patient.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied: you can only view your own appointments' });
    }

    const appointments = await Appointment.find({ patientId: patient._id }).sort({ date: 1 });
    return res.json({ success: true, data: appointments });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.patch('/:id', authenticateToken, authorizeRoles('patient', 'doctor', 'healthworker'), async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    const patient = await Patient.findById(appointment.patientId);
    if (req.user.role === 'patient' && patient && patient.userId && patient.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied: you can only update your own appointments' });
    }

    const allowedFields = ['hospitalId', 'specialist', 'type', 'date', 'time', 'location', 'status', 'instructions', 'completed', 'reminder'];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        appointment[field] = req.body[field];
      }
    });

    await appointment.save();
    return res.json({ success: true, data: appointment });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
