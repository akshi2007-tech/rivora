const mongoose = require('mongoose');

const financialSupportSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    schemeId: {
      type: String,
      trim: true,
      default: ''
    },
    category: {
      type: String,
      enum: ['government', 'hospital', 'ngo', 'pharma', 'financing', 'crowdfunding'],
      default: 'government'
    },
    title: {
      type: String,
      trim: true,
      required: true
    },
    provider: {
      type: String,
      trim: true,
      default: ''
    },
    potentialAmount: {
      type: Number,
      default: 0
    },
    coverageDescription: {
      type: String,
      trim: true,
      default: ''
    },
    eligibilityStatus: {
      type: String,
      enum: ['eligible', 'pending', 'ineligible', 'not_started'],
      default: 'not_started'
    },
    applicationStatus: {
      type: String,
      enum: ['not_started', 'in_progress', 'submitted', 'approved', 'rejected'],
      default: 'not_started'
    },
    documentsNeeded: [{ type: String, trim: true }],
    submittedAt: { type: Date, default: null },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

financialSupportSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('FinancialSupport', financialSupportSchema);
