import express from 'express';
import Database from '../db/database.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// GET /api/projects - List projects with filtering
router.get('/', (req, res) => {
  try {
    const { category, status, state, search } = req.query;
    const list = Database.projects.findAll({ category, status, state, search });
    res.json({
      success: true,
      count: list.length,
      data: list,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// GET /api/projects/:id - Project details
router.get('/:id', (req, res) => {
  try {
    const project = Database.projects.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'NOT_FOUND', message: `Project ${req.params.id} not found.` });
    }
    res.json({
      success: true,
      data: project,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// POST /api/projects - Create new project
router.post('/', authenticateToken, requireRole(['central_admin', 'state_officer', 'project_agency']), (req, res) => {
  try {
    const { name, category, requestingBody, state, districts, landProposed, description } = req.body;
    if (!name || !requestingBody) {
      return res.status(400).json({ success: false, error: 'VALIDATION_ERROR', message: 'Project name and requesting body are required.' });
    }

    const newProject = Database.projects.create({
      name,
      shortName: req.body.shortName || name.substring(0, 10).toUpperCase(),
      category: category || 'Highways',
      requestingBody,
      state: state || 'Maharashtra',
      districts: Array.isArray(districts) ? districts : [districts || 'All'],
      landProposed: Number(landProposed) || 100,
      description: description || 'Infrastructure Development Corridor under RFCTLARR Act 2013',
      priority: req.body.priority || 'Medium',
      startDate: req.body.startDate || new Date().toISOString().split('T')[0],
      targetDate: req.body.targetDate || '2028-12-31',
    });

    res.status(201).json({
      success: true,
      message: 'Project registered in national portfolio.',
      data: newProject,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// PATCH /api/projects/:id/stage - Advance statutory milestone
router.patch('/:id/stage', authenticateToken, (req, res) => {
  try {
    const { stage, completionPercent } = req.body;
    const updated = Database.projects.updateStage(req.params.id, {
      currentStage: stage,
      completionPercent: completionPercent !== undefined ? Number(completionPercent) : undefined,
    });

    if (!updated) {
      return res.status(404).json({ success: false, error: 'NOT_FOUND', message: 'Project not found.' });
    }

    res.json({
      success: true,
      message: `Project stage advanced to '${stage}'.`,
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

export default router;
