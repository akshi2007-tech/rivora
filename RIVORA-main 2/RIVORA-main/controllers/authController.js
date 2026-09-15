const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const normalizeRole = (role) => {
  const value = String(role || '').trim().toLowerCase();
  if (value === 'health_worker') return 'healthworker';
  if (value === 'healthworker') return 'healthworker';
  return value;
};

const signup = async (req, res) => {
  try {
    const { email, password, role, name } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ success: false, message: 'Email, password, and role are required' });
    }

    const normalizedRole = normalizeRole(role);
    const validRoles = ['patient', 'doctor', 'healthworker'];
    if (!validRoles.includes(normalizedRole)) {
      return res.status(400).json({ success: false, message: 'Invalid role. Must be patient, doctor, or healthworker' });
    }

    const existingUser = await User.findOne({ email: String(email).trim().toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email: String(email).trim().toLowerCase(),
      password: hashedPassword,
      passwordHash: hashedPassword,
      role: normalizedRole,
      name: name || email.split('@')[0],
      isActive: true
    });

    await user.save();

    return res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          name: user.name
        }
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ success: false, message: 'Email, password, and role are required' });
    }

    const normalizedRole = normalizeRole(role);
    if (!['patient', 'doctor', 'healthworker'].includes(normalizedRole)) {
      return res.status(400).json({ success: false, message: 'Invalid role. Must be patient, doctor, or healthworker' });
    }

    const user = await User.findOne({ email: String(email).trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (user.role !== normalizedRole) {
      return res.status(401).json({ success: false, message: 'Role mismatch. This account is not registered as the requested role.' });
    }

    const storedPassword = user.passwordHash || user.password;
    const isMatch = await bcrypt.compare(password, storedPassword);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'rivora_super_secret_jwt_key_2026',
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  signup,
  login,
  normalizeRole
};
