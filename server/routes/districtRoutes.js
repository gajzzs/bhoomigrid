import express from 'express';
import { 
  STATES_AND_UTS, 
  ALL_DISTRICTS, 
  TOTAL_DISTRICTS, 
  TOTAL_STATES, 
  TOTAL_UTS,
  getStateByCode, 
  getDistrictsByState, 
  searchDistricts 
} from '../../src/data/indianDivisions.js';
import Database from '../db/database.js';

const router = express.Router();

// GET /api/districts - Directory of all 780+ districts across all 36 States and UTs
router.get('/', (req, res) => {
  try {
    const { state, search, limit = 100, page = 1 } = req.query;

    let result = [...ALL_DISTRICTS];

    if (state) {
      result = result.filter(d => 
        d.stateCode.toLowerCase() === state.toLowerCase() ||
        d.stateName.toLowerCase().includes(state.toLowerCase())
      );
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(d => 
        d.districtName.toLowerCase().includes(q) ||
        d.stateName.toLowerCase().includes(q)
      );
    }

    const totalMatching = result.length;
    const startIndex = (Number(page) - 1) * Number(limit);
    const paginated = result.slice(startIndex, startIndex + Number(limit));

    // Attach live statutory statistics to each district in the page
    const enriched = paginated.map(dist => {
      const distStats = Database.stats.getDistrictDynamic(dist.stateName, dist.districtName);
      return {
        ...dist,
        activeProjects: distStats.stats.totalProjects,
        landProposed: distStats.stats.landProposed,
        landAcquired: distStats.stats.landAcquired,
        compensationAssessed: distStats.stats.compensationAssessed,
        compensationDisbursed: distStats.stats.compensationDisbursed,
        possessionRate: distStats.stats.possessionRate || 75,
      };
    });

    res.json({
      success: true,
      totalDistricts: TOTAL_DISTRICTS,
      totalStates: TOTAL_STATES,
      totalUnionTerritories: TOTAL_UTS,
      matchingCount: totalMatching,
      page: Number(page),
      limit: Number(limit),
      data: enriched,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// GET /api/districts/search - Instant search across all 780+ districts
router.get('/search', (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json({ success: true, count: 0, data: [] });
    }
    const matches = searchDistricts(q).slice(0, 50);
    res.json({
      success: true,
      query: q,
      count: matches.length,
      data: matches,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// GET /api/districts/state/:stateCode - All districts for a specific state
router.get('/state/:stateCode', (req, res) => {
  try {
    const { stateCode } = req.params;
    const stateObj = getStateByCode(stateCode.toUpperCase());
    if (!stateObj) {
      return res.status(404).json({ success: false, error: 'NOT_FOUND', message: `State '${stateCode}' not found.` });
    }

    const districts = getDistrictsByState(stateCode.toUpperCase());
    res.json({
      success: true,
      state: stateObj.name,
      stateCode: stateObj.code,
      type: stateObj.type,
      capital: stateObj.capital,
      revenueZones: stateObj.zones,
      districtCount: districts.length,
      districts,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

// GET /api/districts/profile/:stateCode/:district - Full CALA jurisdiction profile
router.get('/profile/:stateCode/:district', (req, res) => {
  try {
    const { stateCode, district } = req.params;
    const stateObj = getStateByCode(stateCode.toUpperCase());
    const stateName = stateObj ? stateObj.name : stateCode;

    // Capitalize district name
    const districtName = district.split(/[\s_-]+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');

    const profile = Database.stats.getDistrictDynamic(stateName, districtName);
    const proposals = Database.proposals.findAll({ state: stateName, district: districtName });
    const compensation = Database.compensation.findAll({ state: stateName, district: districtName });

    res.json({
      success: true,
      state: stateName,
      stateCode: stateCode.toUpperCase(),
      district: districtName,
      profile,
      proposalsCount: proposals.length,
      proposals,
      compensationCount: compensation.length,
      compensation,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
  }
});

export default router;
