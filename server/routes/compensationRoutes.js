import express from 'express';
import Database from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/compensation or /api/compensation/records - List compensation records
router.get(['/', '/records'], (req, res) => {
  try {
    const { status, state, district } = req.query;
    const list = Database.compensation.findAll({ status, state, district });
    res.json({
      success: true,
      count: list.length,
      data: list,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// GET /api/compensation/calculate - Live RFCTLARR Act 2013 Solatium Calculator API
router.get('/calculate', (req, res) => {
  try {
    const { marketValue, ruralFactor = 1.0, yearsElapsed = 1, areaHa = 1.0 } = req.query;

    if (!marketValue || isNaN(marketValue)) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_PARAMETER',
        message: 'marketValue query parameter is required (numeric in Rupees or Lakhs).'
      });
    }

    const calculation = Database.compensation.calculateSolatium({
      marketValue: Number(marketValue),
      ruralFactor: Number(ruralFactor),
      yearsElapsed: Number(yearsElapsed),
      areaHa: Number(areaHa),
    });

    res.json({
      success: true,
      calculation,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// GET /api/compensation/my-record - Citizen's personal record
router.get('/my-record', (req, res) => {
  try {
    const citizen = Database.stats.getCitizen();
    res.json({
      success: true,
      data: citizen,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// POST /api/compensation/:id/disburse - Execute Direct Benefit Transfer (DBT)
router.post('/:id/disburse', (req, res) => {
  try {
    const officerName = req.user?.name || req.body?.officerName || 'District Magistrate (CALA)';
    const officerId = req.user?.id || 'CALA-AHM';

    const updated = Database.compensation.disburseDBT(req.params.id, { officerId, officerName });
    if (!updated) {
      return res.status(404).json({ success: false, error: 'NOT_FOUND', message: 'Compensation record not found.' });
    }

    res.json({
      success: true,
      message: `Direct Benefit Transfer of ₹${updated.totalCompensation} Lakhs initiated via PFMS/e-Kuber Treasury Gateway.`,
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

export default router;
