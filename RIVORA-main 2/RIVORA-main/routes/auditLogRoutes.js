const express = require('express');
const router = express.Router();
const auditLogController = require('../controllers/auditLogController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get(
  '/patient/:patientId',
  authenticateToken,
  authorizeRoles('patient', 'doctor', 'healthworker'),
  auditLogController.getAuditLogsByPatientId
);

module.exports = router;
