const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    actorName: {
      type: String,
      trim: true
    },

    actorRole: {
      type: String,
      required: true,
      trim: true
    },

    action: {
      type: String,
      required: true,
      trim: true
    },

    targetPatientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },

    details: {
      type: String,
      trim: true
    },

    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false
  }
);

module.exports = mongoose.model('AuditLog', auditLogSchema);