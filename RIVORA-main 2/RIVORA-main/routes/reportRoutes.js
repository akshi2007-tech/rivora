const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const safeName = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_')}`;
    cb(null, safeName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const allowed = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, JPG, JPEG, and PNG files are allowed.'));
    }
  }
});

router.post('/', authenticateToken, authorizeRoles('patient'), upload.single('file'), reportController.uploadReport);
router.get('/patient/:patientId', authenticateToken, authorizeRoles('patient', 'doctor', 'healthworker'), reportController.getReportsByPatientId);
router.get('/:id', authenticateToken, reportController.getReportById);
router.patch('/:id/review', authenticateToken, authorizeRoles('doctor'), reportController.reviewReport);

module.exports = router;
