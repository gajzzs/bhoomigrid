import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import Database from '../db/database.js';

export function generateToken(user) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    roleLabel: user.roleLabel,
    jurisdiction: user.jurisdiction,
    permissions: user.permissions || [],
    state: user.state,
    district: user.district,
    organization: user.organization,
  };
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
}

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.split(' ')[1] 
    : req.cookies?.token || req.query?.token;

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'AUTHENTICATION_REQUIRED', 
      message: 'Access denied. Valid Government Authorization Bearer token is required.' 
    });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        error: 'INVALID_OR_EXPIRED_TOKEN', 
        message: 'Security token is invalid or has expired. Please re-authenticate.' 
      });
    }

    // Verify user is still active in database
    const userInDb = Database.users.findById(decoded.id);
    if (!userInDb || !userInDb.active) {
      return res.status(403).json({ 
        success: false, 
        error: 'ACCOUNT_SUSPENDED', 
        message: 'Government credential suspended or revoked.' 
      });
    }

    req.user = decoded;
    next();
  });
}

// Role-Based Access Control (RBAC)
export function requireRole(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'UNAUTHENTICATED' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'JURISDICTION_PERMISSION_DENIED',
        message: `Action restricted to roles: [${allowedRoles.join(', ')}]. Current role: ${req.user.role}`,
        userJurisdiction: req.user.jurisdiction
      });
    }

    next();
  };
}

// Permission-Based Access Control
export function requirePermission(requiredPermission) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'UNAUTHENTICATED' });
    }

    const hasPerm = req.user.permissions?.includes(requiredPermission) || req.user.role === 'central_admin';
    if (!hasPerm) {
      return res.status(403).json({
        success: false,
        error: 'INSUFFICIENT_PRIVILEGES',
        message: `Action requires permission: '${requiredPermission}' under RFCTLARR Act 2013 Statutory Rules.`,
      });
    }

    next();
  };
}
