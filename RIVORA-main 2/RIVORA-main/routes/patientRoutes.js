const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.post(
  '/',
  authenticateToken,
  authorizeRoles('patient', 'healthworker', 'doctor'),
  patientController.createPatient
);

router.get(
  '/:id',
  authenticateToken,
  patientController.getPatientById
);

router.patch(
  '/:id',
  authenticateToken,
  patientController.updatePatient
);

router.post(
  '/:id/consent',
  authenticateToken,
  authorizeRoles('patient', 'healthworker'),
  patientController.submitConsent
);

module.exports = router;
