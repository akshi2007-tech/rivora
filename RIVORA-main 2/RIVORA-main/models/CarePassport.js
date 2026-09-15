const mongoose = require('mongoose');

const carePassportSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },

    diagnosis: {
      type: String,
      default: 'Breast Cancer',
      trim: true
    },

    stage: {
      type: String,
      trim: true
    },

    biomarkers: [
      {
        name: {
          type: String,
          trim: true
        },
        value: {
          type: String,
          trim: true
        },
        status: {
          type: String,
          trim: true
        }
      }
    ],

    requiredCare: [
      {
        type: String,
        trim: true
      }
    ],

    locationConstraint: {
      maxDistanceKm: {
        type: Number,
        default: 100,
        min: 0
      },

      preferredRegion: {
        type: String,
        trim: true
      }
    },

    financialConstraint: {
      totalEstimatedCost: {
        type: Number,
        default: 0,
        min: 0
      },

      insuranceCoverage: {
        type: Number,
        default: 0,
        min: 0
      },

      fundingGap: {
        type: Number,
        default: 0,
        min: 0
      }
    },

    accessBarriers: [
      {
        type: String,
        trim: true
      }
    ],

    currentTreatmentStatus: {
      type: String,
      trim: true
    },

    verified: {
      type: Boolean,
      default: false
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
  {
    timestamps: true
  }
);

module.exports = mongoose.model('CarePassport', carePassportSchema);