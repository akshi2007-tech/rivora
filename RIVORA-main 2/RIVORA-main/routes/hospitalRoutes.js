const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, hospitalController.getAllHospitals);
router.get('/match', authenticateToken, hospitalController.getMatchingHospitals);

module.exports = router;
