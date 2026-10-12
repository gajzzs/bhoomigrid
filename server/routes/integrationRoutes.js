import express from 'express';
import Database from '../db/database.js';

const router = express.Router();

// GET /api/integrations/status - Status of external government portals
router.get('/status', (req, res) => {
  try {
    const integrations = Database.stats.getIntegrations();
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      systems: integrations,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// GET /api/integrations/bhulekh/lookup - Simulated live RoR (Record of Rights 7/12) lookup
router.get('/bhulekh/lookup', (req, res) => {
  try {
    const { state = 'Gujarat', district = 'Ahmedabad', taluka = 'Daskroi', village = 'Vasna', surveyNo = '142/A' } = req.query;

    res.json({
      success: true,
      source: `AnyRoR / Mahabhulekh Gateway (${state})`,
      queryTimestamp: new Date().toISOString(),
      recordOfRights: {
        state,
        district,
        taluka,
        village,
        surveyNumber: surveyNo,
        khataNumber: '882',
        tenureType: 'Occupant Class I (Old Tenure / Purva Hakka)',
        primaryOwner: 'Shri Rameshbhai J. Patel (50%) & Smt. Gitaben R. Patel (50%)',
        totalAreaAcres: 5.93,
        totalAreaHectares: 2.40,
        soilClassification: 'Medium Black Irrigated (Jirayat)',
        encumbranceStatus: 'Clear • Acquired for High Speed Rail Corridor vide Gazette Notif Sec 11',
        annualRevenueAssessment: '₹48.50',
        digitallySignedBy: 'Talati-cum-Mantri, Vasna',
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// GET /api/integrations/pfms/status - Treasury e-Kuber DBT payout pipeline health
router.get('/pfms/status', (req, res) => {
  res.json({
    success: true,
    gateway: 'RBI e-Kuber Core Treasury System (DoLR Scheme Code: 9148)',
    dailyDisbursementVolume: '₹142.8 Cr',
    dbtSuccessRate: '99.4%',
    pendingBankClearingQueue: 18,
    averageSettlementLatency: '14 minutes (RTGS Batch)',
  });
});

export default router;
