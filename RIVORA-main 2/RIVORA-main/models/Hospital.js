const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      trim: true
    },

    address: {
      type: String,
      trim: true
    },

    contactNumber: {
      type: String,
      trim: true
    },

    latitude: {
      type: Number
    },

    longitude: {
      type: Number
    },

    // Cancer treatment services
    surgeryAvailable: {
      type: Boolean,
      default: false
    },

    oncologyAvailable: {
      type: Boolean,
      default: false
    },

    radiotherapyAvailable: {
      type: Boolean,
      default: false
    },

    specialistAvailable: {
      type: Boolean,
      default: true
    },

    treatmentsAvailable: [
      {
        type: String,
        trim: true
      }
    ],

    // Hospital capacity
    capacityAvailable: {
      type: Boolean,
      default: true
    },

    availableBeds: {
      type: Number,
      default: 0,
      min: 0
    },

    waitingTimeDays: {
      type: Number,
      default: 0,
      min: 0
    },

    // Kept for compatibility with old backend
    distanceFromPatient: {
      type: Number,
      default: 0,
      min: 0
    },

    // General hospital information
    accreditation: [
      {
        type: String,
        trim: true
      }
    ],

    supportedSchemes: [
      {
        type: String,
        trim: true
      }
    ],

    estimatedTreatmentCost: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Hospital', hospitalSchema);