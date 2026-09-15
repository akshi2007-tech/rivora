const mongoose = require('mongoose');

const medicalReportSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    fileName: {
      type: String,
      trim: true,
      required: true
    },
    fileUrl: {
      type: String,
      trim: true
    },
    filePath: {
      type: String,
      trim: true
    },
    fileType: {
      type: String,
      trim: true
    },
    fileSize: {
      type: Number,
      default: 0
    },
    reportType: {
      type: String,
      trim: true,
      default: 'medical_report'
    },
    status: {
      type: String,
      enum: ['pending', 'under_review', 'verified', 'rejected'],
      default: 'pending'
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    reviewedAt: {
      type: Date,
      default: null
    },
    reviewNotes: {
      type: String,
      trim: true,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('MedicalReport', medicalReportSchema);
