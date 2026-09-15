const jwt = require('jsonwebtoken');

const normalizeRole = (role) => {
  const value = String(role || '').trim().toLowerCase();
  if (value === 'health_worker') return 'healthworker';
  if (value === 'healthworker') return 'healthworker';
  return value;
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'rivora_super_secret_jwt_key_2026');
    req.user = {
      id: decoded.id || decoded._id,
      email: decoded.email,
      role: normalizeRole(decoded.role)
    };
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const canonicalRoles = allowedRoles.map((role) => normalizeRole(role));
    if (!req.user || !canonicalRoles.includes(normalizeRole(req.user.role))) {
      return res.status(403).json({ success: false, message: 'Access denied: insufficient permissions' });
    }
    next();
  };
};

const canAccessPatient = (req, patient) => {
  if (!patient) return false;
  if (req.user.role === 'patient') {
    return patient.userId && patient.userId.toString() === req.user.id;
  }
  if (req.user.role === 'doctor' || req.user.role === 'healthworker') {
    return true;
  }
  return false;
};

module.exports = {
  authenticateToken,
  authorizeRoles,
  normalizeRole,
  canAccessPatient
};
