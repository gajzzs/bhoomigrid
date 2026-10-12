import express from 'express';
import Database from '../db/database.js';

const router = express.Router();

// GET /api/rehabilitation/records
router.get('/records', (req, res) => {
  try {
    const records = Database.rehabilitation.findAll();
    res.json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// PATCH /api/rehabilitation/records/:id
router.patch('/records/:id', (req, res) => {
  try {
    const updated = Database.rehabilitation.updateStatus(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'NOT_FOUND', message: 'R&R record not found.' });
    }
    res.json({
      success: true,
      message: 'R&R Entitlement milestone updated.',
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

export default router;
