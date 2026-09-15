const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
      default: null
    },
    specialist: {
      type: String,
      trim: true,
      default: ''
    },
    type: {
      type: String,
      trim: true,
      default: 'follow_up'
    },
    date: {
      type: Date,
      default: null
    },
    time: {
      type: String,
      trim: true,
      default: ''
    },
    location: {
      type: String,
      trim: true,
      default: ''
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled', 'pending'],
      default: 'scheduled'
    },
    instructions: {
      type: String,
      trim: true,
      default: ''
    },
    completed: {
      type: Boolean,
      default: false
    },
    reminder: {
      type: String,
      trim: true,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
