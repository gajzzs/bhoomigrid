import express from 'express';
import Database from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/dashboard/stats - Returns jurisdiction stats dynamically tailored to role
router.get('/stats', (req, res) => {
  try {
    // Optional query param or auth header role
    const requestedRole = req.query.role || req.user?.role || 'central_admin';
    const reqState = req.query.state || req.user?.state;
    const reqDistrict = req.query.district || req.user?.district;

    let roleData = {};
    if (requestedRole === 'state_officer') {
      roleData = Database.stats.getStateMH();
      if (reqState) roleData.state = reqState;
    } else if (requestedRole === 'district_collector') {
      roleData = Database.stats.getDistrictAhm();
      if (reqDistrict) roleData.district = reqDistrict;
      if (reqState) roleData.state = reqState;
    } else if (requestedRole === 'project_agency') {
      roleData = Database.stats.getAgencyNHAI();
    } else if (requestedRole === 'citizen_landowner') {
      roleData = Database.stats.getCitizen();
    } else {
      // central_admin
      roleData = {
        national: Database.stats.getNational(),
        states: Database.stats.getStates(),
      };
    }

    res.json({
      success: true,
      role: requestedRole,
      data: roleData,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// GET /api/dashboard/national - Pan-India overview
router.get('/national', (req, res) => {
  res.json({
    success: true,
    stats: Database.stats.getNational(),
    states: Database.stats.getStates(),
  });
});

export default router;
