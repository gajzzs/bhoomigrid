import express from 'express';
import Database from '../db/database.js';

const router = express.Router();

// GET /api/audit - Immutable statutory audit ledger
router.get('/', (req, res) => {
  try {
    const limit = Number(req.query.limit) || 50;
    const logs = Database.auditLogs.findAll(limit);
    res.json({
      success: true,
      standard: 'National e-Governance Standard (NeGP) & CAG/CVC Statutory Compliance',
      tamperEvidentLedger: true,
      count: logs.length,
      data: logs,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

export default router;
