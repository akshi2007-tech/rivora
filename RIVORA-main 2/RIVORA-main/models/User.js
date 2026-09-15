const mongoose = require('mongoose');

const normalizeRole = (role) => {
  const value = String(role || '').trim().toLowerCase();
  if (value === 'health_worker') return 'healthworker';
  if (value === 'healthworker') return 'healthworker';
  if (['patient', 'doctor', 'healthworker'].includes(value)) return value;
  return value;
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      default: null
    },
    passwordHash: {
      type: String,
      default: null
    },
    role: {
      type: String,
      enum: ['patient', 'doctor', 'healthworker'],
      required: true,
      set: normalizeRole,
      lowercase: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function(next) {
  if (!this.passwordHash && this.password) {
    this.passwordHash = this.password;
  }

  if (this.passwordHash && !this.password) {
    this.password = this.passwordHash;
  }

  next();
});

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.passwordHash;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
