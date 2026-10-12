import express from 'express';
import Database from '../db/database.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// GET /api/proposals - List proposals
router.get('/', (req, res) => {
  try {
    const { state, district, urgency } = req.query;
    let list = Database.proposals.findAll({ state, district, urgency });
    
    if (state) {
      list = list.filter(p => p.state && p.state.toLowerCase().includes(state.toLowerCase()));
    }
    if (district) {
      list = list.filter(p => p.district && p.district.toLowerCase().includes(district.toLowerCase()));
    }

    res.json({
      success: true,
      count: list.length,
      data: list,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// GET /api/proposals/:id
router.get('/:id', (req, res) => {
  try {
    const prop = Database.proposals.findById(req.params.id);
    if (!prop) {
      return res.status(404).json({ success: false, error: 'NOT_FOUND', message: 'Proposal not found.' });
    }
    res.json({ success: true, data: prop });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// POST /api/proposals - Submit proposal (Wizard)
router.post('/', (req, res) => {
  try {
    const { projectName, category, requestingBody, state, district, landRequired, estimatedCompensation, estimatedFamilies, description, landTypes, fundingSource } = req.body;

    if (!projectName || !state || !landRequired) {
      return res.status(400).json({ 
        success: false, 
        error: 'VALIDATION_ERROR', 
        message: 'Project name, state, and required land area (Ha) are mandatory fields.' 
      });
    }

    const newProposal = Database.proposals.create({
      projectName,
      category: category || 'Highways',
      requestingBody: requestingBody || req.user?.organization || 'State Infrastructure Agency',
      state,
      district: district || 'Central District',
      landRequired: Number(landRequired),
      estimatedFamilies: Number(estimatedFamilies) || 250,
      estimatedCompensation: Number(estimatedCompensation) || 45.0,
      description: description || 'Acquisition Requisition under RFCTLARR Act 2013',
      landTypes: landTypes || ['Agricultural'],
      fundingSource: fundingSource || 'Central Ministry Budgetary Allocation',
      urgency: req.body.urgency || 'High',
    });

    res.status(201).json({
      success: true,
      message: `Proposal submitted successfully with ID: ${newProposal.id}. Forwarded to Competent Authority for preliminary investigation under Section 4.`,
      data: newProposal,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// POST /api/proposals/:id/action - Scrutiny action (district_propose, forward_to_central, central_approve, escalate)
router.post('/:id/action', (req, res) => {
  try {
    const { action, remarks, role } = req.body;
    const allowedActions = ['approve', 'escalate', 'reject', 'district_propose', 'forward_to_central', 'central_approve'];
    if (!allowedActions.includes(action)) {
      return res.status(400).json({ 
        success: false, 
        error: 'INVALID_ACTION', 
        message: `Action must be one of: ${allowedActions.join(', ')}.` 
      });
    }

    const officerName = req.user?.name || req.body?.officerName || 'Competent Authority';
    const activeRole = req.user?.role || role || 'central_admin';
    const updated = Database.proposals.updateAction(req.params.id, { 
      action, 
      remarks, 
      officerName,
      role: activeRole 
    });

    if (!updated) {
      return res.status(404).json({ success: false, error: 'NOT_FOUND', message: 'Proposal not found.' });
    }

    res.json({
      success: true,
      message: `Action '${action.toUpperCase()}' executed successfully by ${officerName}. Notification issued.`,
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

export default router;
