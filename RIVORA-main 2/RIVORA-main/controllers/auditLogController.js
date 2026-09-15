const AuditLog = require('../models/AuditLog');
const User = require('../models/User');
const Patient = require('../models/Patient');

const logAction = async (actorId, actorRole, action, targetPatientId, details = '') => {
  try {
    let actorName = '';

    if (actorId) {
      const actor = await User.findById(actorId).select('name email');
      if (actor) {
        actorName = actor.name || actor.email || '';
      }
    }

    await AuditLog.create({
      actorId,
      actorName,
      actorRole,
      action,
      targetPatientId,
      details,
      timestamp: new Date()
    });
  } catch (err) {
    console.error('Failed to record audit log:', err.message);
  }
};

const getAuditLogsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    if (req.user.role === 'patient' && patient.userId && patient.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied: you can only view your own audit log' });
    }

    if (['doctor', 'healthworker'].includes(req.user.role)) {
      // permitted for relevant clinical and support roles
    }

    const logs = await AuditLog.find({ targetPatientId: patientId })
      .populate('actorId', 'name email role')
      .populate('targetPatientId', 'fullName name age diagnosis stage')
      .sort({ timestamp: -1 });

    return res.json({ success: true, data: logs });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  logAction,
  getAuditLogsByPatientId
};