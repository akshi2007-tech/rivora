const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.signup);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
