import express from 'express';
import Database from '../db/database.js';

const router = express.Router();

// GET /api/grievances - List objections and grievances
router.get('/', (req, res) => {
  try {
    const list = Database.grievances.findAll();
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// POST /api/grievances - Lodge formal objection under Section 15
router.post('/', (req, res) => {
  try {
    const { title, applicantName, applicantPhone, project, district, state, surveyNo, khataNo, category, description } = req.body;

    if (!title || !description || !surveyNo) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Title, survey number, and objection grounds description are mandatory.',
      });
    }

    const newGrievance = Database.grievances.create({
      title,
      applicantName: applicantName || req.user?.name || 'Affected Citizen',
      applicantPhone: applicantPhone || req.user?.phone || '+91-9800000000',
      project: project || 'Infrastructure Project',
      district: district || 'Ahmedabad',
      state: state || 'Gujarat',
      surveyNo,
      khataNo: khataNo || '882',
      category: category || 'Measurement & Demarcation',
      description,
      assignedOfficer: 'CALA & Dy. Collector (Inquiry)',
    });

    res.status(201).json({
      success: true,
      message: `Formal objection registered under Section 15 of RFCTLARR Act 2013 with Token: ${newGrievance.tokenNumber}`,
      data: newGrievance,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// PATCH /api/grievances/:id/resolve - Collectorate Resolution
router.patch('/:id/resolve', (req, res) => {
  try {
    const { resolutionNotes } = req.body;
    const officerName = req.user?.name || req.body?.officerName || 'District Magistrate (CALA)';

    const resolved = Database.grievances.resolve(req.params.id, { resolutionNotes, officerName });
    if (!resolved) {
      return res.status(404).json({ success: false, error: 'NOT_FOUND', message: 'Grievance ticket not found.' });
    }

    res.json({
      success: true,
      message: 'Objection resolved and judicial order appended.',
      data: resolved,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

export default router;
