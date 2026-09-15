const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },

    fullName: {
      type: String,
      trim: true
    },

    name: {
      type: String,
      trim: true
    },

    age: {
      type: Number,
      min: 0,
      max: 120
    },

    location: {
      type: String,
      trim: true
    },

    preferredLanguage: {
      type: String,
      default: 'English',
      trim: true
    },

    preferred_language: {
      type: String,
      trim: true
    },

    phone: {
      type: String,
      trim: true
    },

    email: {
      type: String,
      trim: true,
      lowercase: true
    },

    diagnosed: {
      type: Boolean,
      default: false
    },

    diagnosis: {
      type: String,
      default: 'Breast Cancer',
      trim: true
    },

    diagnosisDate: {
      type: Date,
      default: null
    },

    stage: {
      type: String,
      trim: true
    },

    biomarkers: [
      {
        name: { type: String, trim: true },
        value: { type: String, trim: true },
        status: { type: String, trim: true }
      }
    ],

    currentTreatment: {
      type: String,
      trim: true
    },

    current_treatment: {
      type: String,
      trim: true
    },

    recommendedTreatment: {
      type: String,
      trim: true
    },

    recommended_treatment: {
      type: String,
      trim: true
    },

    currentHospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
      default: null
    },

    hospital: {
      type: String,
      trim: true
    },

    travelToleranceKm: {
      type: Number,
      min: 0,
      default: 100
    },

    totalEstimatedCost: {
      type: Number,
      min: 0,
      default: 0
    },

    coverageEstimated: {
      type: Number,
      min: 0,
      default: 0
    },

    financialGap: {
      type: Number,
      min: 0,
      default: 0
    },

    insuranceStatus: {
      type: String,
      enum: ['insured', 'partially-insured', 'uninsured', 'unknown'],
      default: 'unknown'
    },

    accessBarriers: [{ type: String, trim: true }],

    preferredContactMethod: {
      type: String,
      enum: ['phone', 'sms', 'email', 'whatsapp'],
      default: 'phone'
    },

    emergencyContact: {
      name: { type: String, trim: true },
      relationship: { type: String, trim: true },
      phone: { type: String, trim: true }
    },

    consent: {
      given: { type: Boolean, default: false },
      givenAt: { type: Date, default: null },
      version: { type: String, default: 'v1' }
    },

    verificationStatus: {
      type: String,
      enum: ['patient_provided', 'care_team_review', 'doctor_verified', 'rejected'],
      default: 'patient_provided'
    },

    verificationNotes: {
      type: String,
      trim: true,
      default: ''
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },

    verifiedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

patientSchema.pre('save', function(next) {
  if (!this.fullName && this.name) this.fullName = this.name;
  if (!this.name && this.fullName) this.name = this.fullName;
  if (!this.email && this.userId) {
    // email is optional at patient record level; user email can be used where needed
  }
  next();
});

module.exports = mongoose.model('Patient', patientSchema);