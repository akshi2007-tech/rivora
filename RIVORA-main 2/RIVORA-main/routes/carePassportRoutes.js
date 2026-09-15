const express = require('express');
const router = express.Router();
const carePassportController = require('../controllers/carePassportController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.post(
  '/',
  authenticateToken,
  carePassportController.createCarePassport
);

router.get(
  '/:patientId',
  authenticateToken,
  carePassportController.getCarePassportByPatientId
);

router.patch(
  '/:patientId',
  authenticateToken,
  carePassportController.updateCarePassport
);

router.patch(
  '/:id/verify',
  authenticateToken,
  authorizeRoles('doctor'),
  carePassportController.verifyCarePassport
);

module.exports = router;
