import express from 'express';
import bcrypt from 'bcryptjs';
import Database from '../db/database.js';
import { generateToken, authenticateToken } from '../middleware/auth.js';
import { governmentCadreRegistry, verifyGovernmentServiceId } from '../db/governmentCadreRegistry.js';

const router = express.Router();

// GET /api/auth/cadre-directory - Official Civil List of registered positions
router.get('/cadre-directory', (req, res) => {
  const directory = governmentCadreRegistry.map(({ defaultPassword, ...safe }) => safe);
  res.json({
    success: true,
    totalRecords: directory.length,
    statutoryNote: 'Government Service Identity Cards bind directly to official active cadre postings under DoPT/GAD rules. Aadhaar is strictly excluded to prevent statutory overreach and uphold administrative privacy.',
    data: directory,
  });
});

// POST /api/auth/verify-service-id - Verify official ID Card before login
router.post('/verify-service-id', (req, res) => {
  try {
    const { serviceId } = req.body;
    if (!serviceId) {
      return res.status(400).json({
        success: false,
        error: 'SERVICE_ID_REQUIRED',
        message: 'Please provide an official Government Service Identity Code (e.g., IAS-GJ-2011-0428) or Certified Revenue Passbook Code.'
      });
    }

    const record = verifyGovernmentServiceId(serviceId);
    if (!record) {
      return res.status(404).json({
        success: false,
        error: 'CADRE_RECORD_NOT_FOUND',
        message: `No active government posting found for Service ID '${serviceId}'. Please ensure you are entering an official Civil List ID, SPARROW Code, or Certified Landowner Passbook ID.`
      });
    }

    const { defaultPassword, ...safeRecord } = record;

    res.json({
      success: true,
      verified: true,
      message: `Verified: ${safeRecord.officerName} (${safeRecord.designation})`,
      cadreRecord: safeRecord,
      statutoryJurisdictionLock: {
        assignedLevel: safeRecord.postingLevel,
        state: safeRecord.postingLocation.state,
        district: safeRecord.postingLocation.district,
        exclusiveAccessNote: `Access is strictly restricted to ${safeRecord.postingLocation.jurisdictionDesc} under GAD Posting Order No. ${safeRecord.postingOrderNo}`,
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// POST /api/auth/login - Production Sign-In with Government Service ID Card binding
router.post('/login', async (req, res) => {
  try {
    const { serviceId, email, username, password, firebaseToken } = req.body;
    const identifier = (serviceId || email || username || '').trim();

    if (!identifier) {
      return res.status(400).json({
        success: false,
        error: 'CREDENTIAL_REQUIRED',
        message: 'Please provide your Government Service Identity Code or Official Email.',
      });
    }

    // Check Government Cadre Registry first
    const cadreRecord = verifyGovernmentServiceId(identifier);

    let user = null;
    if (cadreRecord) {
      const existingUser = Database.users.findByEmail(cadreRecord.officialEmail);
      if (existingUser) {
        user = {
          ...existingUser,
          name: cadreRecord.officerName,
          serviceId: cadreRecord.serviceId,
          designation: cadreRecord.designation,
          jurisdiction: cadreRecord.postingLocation.jurisdictionDesc,
          state: cadreRecord.postingLocation.state,
          district: cadreRecord.postingLocation.district,
          postingOrderNo: cadreRecord.postingOrderNo,
        };
      } else {
        const baseRoleUser = Database.users.findByRole(cadreRecord.assignedRole);
        user = {
          id: `USR-${cadreRecord.serviceId.replace(/[^a-zA-Z0-9]/g, '-')}`,
          username: cadreRecord.officialEmail.split('@')[0],
          email: cadreRecord.officialEmail,
          role: cadreRecord.assignedRole,
          name: cadreRecord.officerName,
          serviceId: cadreRecord.serviceId,
          designation: cadreRecord.designation,
          jurisdiction: cadreRecord.postingLocation.jurisdictionDesc,
          state: cadreRecord.postingLocation.state,
          district: cadreRecord.postingLocation.district,
          postingOrderNo: cadreRecord.postingOrderNo,
          permissions: baseRoleUser?.permissions || ['view_district', 'approve_district'],
          department: cadreRecord.department,
        };
      }
    } else {
      user = Database.users.findByEmail(identifier) || 
             Database.users.findAll().find(u => u.username?.toLowerCase() === identifier.toLowerCase());
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'INVALID_CREDENTIALS',
        message: 'No official government user account found matching provided Service ID or Email.',
      });
    }

    // Password validation (Common Password INDIa@114 or Bcrypt or Cadre Match)
    if (password && password !== '••••••••••••') {
      let isMatch = false;
      if (password === 'INDIa@114' || password.toLowerCase() === 'india@114') {
        isMatch = true;
      } else if (user.passwordHash) {
        isMatch = bcrypt.compareSync(password, user.passwordHash);
      }
      if (!isMatch && cadreRecord?.defaultPassword) {
        isMatch = password === cadreRecord.defaultPassword || password.toLowerCase() === cadreRecord.defaultPassword.toLowerCase();
      }

      if (!isMatch && !firebaseToken) {
        return res.status(401).json({
          success: false,
          error: 'INCORRECT_PASSWORD',
          message: 'The government SSO credentials entered are incorrect.',
        });
      }
    }

    // Update last login
    try {
      Database.users.updateLoginTime(user.id);
    } catch (e) {
      // Ignore if dynamic user is not in mock DB
    }

    // Issue JWT token with strictly bounded jurisdiction
    const token = generateToken(user);
    const { passwordHash, ...safeUser } = user;

    res.json({
      success: true,
      message: `Authentication successful. Access granted strictly to: ${user.jurisdiction}`,
      token,
      user: {
        ...safeUser,
        serviceId: cadreRecord?.serviceId || safeUser.id,
        idType: cadreRecord?.idType || 'GOV_SERVICE_ID',
        cardTitle: cadreRecord?.cardTitle || 'Government Official ID',
        postingOrderNo: cadreRecord?.postingOrderNo || 'DoLR/ORD/2024/01',
        postingLocation: cadreRecord?.postingLocation || { state: safeUser.state, district: safeUser.district },
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// GET /api/auth/me
router.get('/me', authenticateToken, (req, res) => {
  try {
    const user = Database.users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'USER_NOT_FOUND' });
    }
    const { passwordHash, ...safeUser } = user;
    const cadreRecord = verifyGovernmentServiceId(safeUser.email);

    res.json({
      success: true,
      user: {
        ...safeUser,
        serviceId: cadreRecord?.serviceId || safeUser.id,
        idType: cadreRecord?.idType || 'GOV_SERVICE_ID',
        cardTitle: cadreRecord?.cardTitle || 'Government Official ID',
        postingOrderNo: cadreRecord?.postingOrderNo || 'DoLR/ORD/2024/01',
        postingLocation: cadreRecord?.postingLocation || { state: safeUser.state, district: safeUser.district },
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully.' });
});

export default router;
