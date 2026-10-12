import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { initialUsers, initialAuditLogs } from './seedData.js';
import { 
  projects as initialProjects, 
  proposals as initialProposals, 
  compensationRecords as initialCompensation, 
  rrRecords as initialRR, 
  documents as initialDocuments, 
  notificationItems as initialNotifications,
  nationalStats,
  statesData,
  maharashtraStateData,
  ahmedabadDistrictData,
  nhaiAgencyData,
  citizenData
} from '../../src/data/mockData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

// In-memory data store structure
let db = {
  users: [...initialUsers],
  projects: [...initialProjects],
  proposals: [...initialProposals],
  compensation: [...initialCompensation],
  rehabilitation: [...initialRR],
  documents: [...initialDocuments],
  notifications: [...initialNotifications],
  auditLogs: [...initialAuditLogs],
  grievances: [
    {
      id: 'GRV-2026-0884',
      tokenNumber: 'NLAMS/GRV/GJ/AHM/2026/0884',
      title: 'Cadastral Boundary Verification on Northern Survey Line 142/A',
      applicantName: 'Shri Rameshbhai J. Patel',
      applicantPhone: '+91-9825014819',
      project: 'Mumbai–Ahmedabad High Speed Rail (MAHSR)',
      district: 'Ahmedabad',
      state: 'Gujarat',
      surveyNo: '142/A',
      khataNo: '882',
      category: 'Measurement & Demarcation',
      description: 'Request for re-survey of 0.12 Ha triangular sliver bordering canal bank before final possession handover.',
      filedDate: '2026-07-12',
      resolvedDate: '2026-07-28',
      status: 'RESOLVED',
      assignedOfficer: 'Dy. Collector & SLAO (MAHSR), Ahmedabad',
      resolutionNotes: 'Joint measurement conducted on 24-Jul-2026 with DILR surveyor. Total area confirmed as 2.40 Ha. Solatium credited accordingly.',
      hearingScheduled: null,
    },
    {
      id: 'GRV-2026-0912',
      tokenNumber: 'NLAMS/GRV/MH/NGP/2026/0912',
      title: 'Fruit Orchard Valuation under Section 29 Solatium Schedule',
      applicantName: 'Shri Kisanrao Deshmukh',
      applicantPhone: '+91-9822104523',
      project: 'NH-44 Bypass Road – Nagpur Section',
      district: 'Nagpur',
      state: 'Maharashtra',
      surveyNo: '88/2',
      khataNo: '314',
      category: 'Compensation Valuation',
      description: 'Valuation of 48 mature Nagpur Orange (Santra) trees was not included in draft award.',
      filedDate: '2026-10-02',
      resolvedDate: null,
      status: 'UNDER_INQUIRY',
      assignedOfficer: 'CALA & SDM, Nagpur Rural',
      resolutionNotes: null,
      hearingScheduled: '2026-10-14T11:00:00Z',
    }
  ],
  integrations: {
    bhulekh: { name: 'Bhulekh / State Land Records Modernization API', status: 'HEALTHY', latencyMs: 42, lastSync: '2026-10-08T09:45:00Z', syncCount: 14820 },
    cadastral: { name: 'Survey of India (SOI) Cadastral GIS Gateway', status: 'HEALTHY', latencyMs: 88, lastSync: '2026-10-08T08:15:00Z', syncCount: 9240 },
    treasury: { name: 'PFMS / RBI e-Kuber Treasury Gateway (DBT)', status: 'HEALTHY', latencyMs: 64, lastSync: '2026-10-08T10:10:00Z', syncCount: 28450 },
    digilocker: { name: 'DigiLocker Government Document Verification', status: 'HEALTHY', latencyMs: 51, lastSync: '2026-10-08T09:30:00Z', syncCount: 18920 },
    parivesh: { name: 'PARIVESH Environmental Forest Clearance Sync', status: 'HEALTHY', latencyMs: 112, lastSync: '2026-10-08T06:00:00Z', syncCount: 840 },
  }
};

// Persistence helper to safely write to disk
function saveToDisk() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
  } catch (err) {
    // In serverless read-only filesystem environments, log and gracefully continue with in-memory state
    console.warn('[DB] Running in read-only / ephemeral filesystem:', err.message);
  }
}

// Load persisted state if exists
function loadFromDisk() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf8');
      const loaded = JSON.parse(content);
      if (loaded.users && loaded.projects) {
        db = { ...db, ...loaded };
      }
    } else {
      saveToDisk();
    }
  } catch (err) {
    console.warn('[DB] Initializing fresh in-memory database:', err.message);
  }
}

loadFromDisk();

// Database Access Objects (DAO)
export const Database = {
  // ---- Users ----
  users: {
    findAll: () => db.users.map(({ passwordHash, ...safe }) => safe),
    findById: (id) => {
      const u = db.users.find(x => x.id === id);
      return u ? { ...u } : null;
    },
    findByEmail: (email) => {
      const u = db.users.find(x => x.email.toLowerCase() === email.toLowerCase());
      return u ? { ...u } : null;
    },
    findByRole: (role) => {
      const u = db.users.find(x => x.role === role);
      return u ? { ...u } : null;
    },
    create: (userData) => {
      const newUser = {
        id: `USR-${Date.now().toString().slice(-4)}`,
        active: true,
        lastLogin: new Date().toISOString(),
        twoFactorEnabled: false,
        permissions: userData.role === 'citizen_landowner' 
          ? ['view_own_land', 'view_compensation', 'track_grievance']
          : ['view_project', 'track_status'],
        ...userData,
      };
      db.users.push(newUser);
      saveToDisk();
      const { passwordHash, ...safe } = newUser;
      return safe;
    },
    updateLoginTime: (id) => {
      const idx = db.users.findIndex(x => x.id === id);
      if (idx !== -1) {
        db.users[idx].lastLogin = new Date().toISOString();
        saveToDisk();
      }
    }
  },

  // ---- Projects ----
  projects: {
    findAll: (filters = {}) => {
      let list = [...db.projects];
      if (filters.category && filters.category !== 'All') {
        list = list.filter(p => p.category === filters.category);
      }
      if (filters.status && filters.status !== 'All') {
        list = list.filter(p => p.status === filters.status);
      }
      if (filters.state && filters.state !== 'All') {
        list = list.filter(p => p.state.includes(filters.state));
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        list = list.filter(p => 
          p.name.toLowerCase().includes(q) || 
          p.id.toLowerCase().includes(q) ||
          p.requestingBody.toLowerCase().includes(q)
        );
      }
      return list;
    },
    findById: (id) => {
      const p = db.projects.find(x => x.id === id);
      return p ? { ...p } : null;
    },
    create: (projectData) => {
      const newProj = {
        id: `PRJ-2026-${String(db.projects.length + 1).padStart(3, '0')}`,
        completionPercent: 0,
        landAcquired: 0,
        landPossessed: 0,
        compensationPaid: 0,
        familiesResettled: 0,
        status: 'In Progress',
        currentStage: 'Preliminary Investigation',
        lastUpdated: new Date().toISOString().split('T')[0],
        ...projectData,
      };
      db.projects.unshift(newProj);
      saveToDisk();
      return newProj;
    },
    updateStage: (id, stageData) => {
      const idx = db.projects.findIndex(x => x.id === id);
      if (idx === -1) return null;
      db.projects[idx] = {
        ...db.projects[idx],
        ...stageData,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      saveToDisk();
      return db.projects[idx];
    }
  },

  // ---- Proposals ----
  proposals: {
    findAll: (filters = {}) => {
      let list = [...db.proposals];
      if (filters.state) {
        const s = filters.state.toLowerCase();
        list = list.filter(p => p.state && (p.state.toLowerCase().includes(s) || s.includes(p.state.toLowerCase())));
      }
      if (filters.district) {
        const d = filters.district.toLowerCase();
        list = list.filter(p => p.district && (p.district.toLowerCase().includes(d) || d.includes(p.district.toLowerCase())));
      }
      if (filters.urgency && filters.urgency !== 'All') {
        list = list.filter(p => p.urgency === filters.urgency);
      }

      // If a specific district is queried and currently has no proposals, synthesize a real statutory proposal on-the-fly!
      if (filters.district && list.length === 0) {
        const synthState = filters.state || 'India';
        const synthesized = Database.proposals.synthesizeForDistrict(synthState, filters.district);
        list = [synthesized];
      }

      return list;
    },
    synthesizeForDistrict: (state, district) => {
      const cleanDist = district.split(/[\s_-]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      const id = `PROP-${state.slice(0, 2).toUpperCase()}-${cleanDist.slice(0, 3).toUpperCase()}-01`;
      const existing = db.proposals.find(p => p.id === id);
      if (existing) return existing;

      const today = new Date().toISOString().split('T')[0];
      const newProp = {
        id,
        projectName: `${cleanDist} Strategic Ring Road & Industrial Feeder Package`,
        category: 'Highways',
        requestingBody: `NHAI – PIU ${cleanDist}`,
        state: state,
        district: cleanDist,
        landRequired: 164.8,
        estimatedFamilies: 420,
        estimatedCompensation: 312.5,
        stage: 'Pending State Government Scrutiny',
        stageCode: 6,
        submittedDate: today,
        lastAction: today,
        assignedTo: `State Revenue Department, ${state}`,
        urgency: 'High',
        approvalStatus: 'PENDING_STATE_SCRUTINY',
        currentAuthority: 'STATE',
        gazetteOrderNo: null,
        gazetteDate: null,
        remarks: `Joint Measurement Survey completed by Collectorate of ${cleanDist}. Recommended for State statutory endorsement under RFCTLARR Section 15(2).`,
        workflowHistory: [
          {
            step: 1,
            title: `District Field Verification (${cleanDist})`,
            authority: `Collector, ${cleanDist}`,
            action: 'PROPOSED_TO_STATE',
            officer: `District Collector, ${cleanDist}`,
            date: today,
            status: 'COMPLETED',
            remarks: 'Cadastral land boundaries demarcated. Section 15 objections cleared.'
          },
          {
            step: 2,
            title: 'State Government Scrutiny & Statutory Recommendation',
            authority: `State Revenue Secretary, ${state}`,
            action: 'AWAITING_STATE_SCRUTINY',
            officer: `Principal Secretary (Revenue), ${state}`,
            date: today,
            status: 'IN_PROGRESS',
            remarks: 'Proposal under statutory scrutiny at State Revenue Department. Ready for forwarding to Central Ministry.'
          },
          {
            step: 3,
            title: 'Central Ministry National Sanction & Gazette Publication',
            authority: 'Ministry of Rural Development (DoLR), New Delhi',
            action: 'AWAITING_CENTRAL_SANCTION',
            officer: 'Dr. Rajesh Kumar Sharma, IAS',
            date: null,
            status: 'PENDING',
            remarks: 'Pending Central Section 19 statutory clearance.'
          }
        ]
      };
      db.proposals.push(newProp);
      saveToDisk();
      return newProp;
    },
    findById: (id) => {
      const p = db.proposals.find(x => x.id === id);
      return p ? { ...p } : null;
    },
    create: (proposalData) => {
      const newProp = {
        id: `PROP-2026-${String(db.proposals.length + 1001).slice(-4)}`,
        stage: 'Preliminary Investigation',
        stageCode: 1,
        submittedDate: new Date().toISOString().split('T')[0],
        lastAction: new Date().toISOString().split('T')[0],
        assignedTo: 'Competent Authority (CALA)',
        urgency: proposalData.urgency || 'Medium',
        ...proposalData,
      };
      db.proposals.unshift(newProp);
      saveToDisk();
      return newProp;
    },
    updateAction: (id, { action, remarks, officerName, role }) => {
      const idx = db.proposals.findIndex(x => x.id === id);
      if (idx === -1) return null;
      const prop = db.proposals[idx];
      const today = new Date().toISOString().split('T')[0];
      
      if (!prop.workflowHistory) {
        prop.workflowHistory = [];
      }

      if (action === 'forward_to_central' || (action === 'approve' && role === 'state_officer')) {
        prop.approvalStatus = 'PENDING_CENTRAL_APPROVAL';
        prop.currentAuthority = 'CENTRAL';
        prop.assignedTo = 'Ministry of Rural Development (DoLR), New Delhi';
        prop.stage = 'Forwarded for Central Sanction u/s 19';
        prop.stageCode = 8;
        prop.remarks = remarks || 'Scrutinized by State Revenue Department and forwarded to Central Ministry for Section 19 declaration.';
        prop.workflowHistory.push({
          step: 2,
          title: 'State Revenue Department Scrutiny',
          authority: 'State Revenue Secretary',
          action: 'FORWARDED_TO_CENTRE',
          officer: officerName || 'State Revenue Secretary',
          date: today,
          status: 'COMPLETED',
          remarks: remarks || 'Recommended for Central Sanction.'
        });
      } else if (action === 'central_approve' || (action === 'approve' && role === 'central_admin')) {
        const gazetteNo = `CG-DL-E-2024-${Math.floor(100000 + Math.random() * 900000)}`;
        prop.approvalStatus = 'CENTRAL_APPROVED';
        prop.currentAuthority = 'SANCTIONED';
        prop.assignedTo = 'Sanctioned & Gazette Issued';
        prop.stage = 'Sanctioned by Central Govt (Gazette Published)';
        prop.stageCode = 9;
        prop.gazetteOrderNo = gazetteNo;
        prop.gazetteDate = today;
        prop.remarks = remarks || `Central Sanction granted under Section 19. Gazette Order ${gazetteNo} published.`;
        prop.workflowHistory.push({
          step: 3,
          title: 'Central Ministry National Sanction',
          authority: 'Ministry of Rural Development (DoLR)',
          action: 'SANCTIONED',
          officer: officerName || 'Dr. Rajesh Kumar Sharma, IAS',
          date: today,
          status: 'COMPLETED',
          remarks: `Gazette notification published: ${gazetteNo}.`
        });
      } else if (action === 'district_propose' || (action === 'approve' && role === 'district_collector')) {
        prop.approvalStatus = 'PENDING_STATE_SCRUTINY';
        prop.currentAuthority = 'STATE';
        prop.assignedTo = `State Revenue Department, ${prop.state}`;
        prop.stage = 'Proposed to State Revenue Dept';
        prop.stageCode = 6;
        prop.remarks = remarks || 'District joint survey verified. Proposed to State Govt for sanction.';
        prop.workflowHistory.push({
          step: 1,
          title: 'District Collectorate Field Verification',
          authority: 'District Collector',
          action: 'PROPOSED_TO_STATE',
          officer: officerName || 'District Collector',
          date: today,
          status: 'COMPLETED',
          remarks: remarks || 'Field verification verified. Proposed to State.'
        });
      } else if (action === 'escalate') {
        prop.urgency = 'Critical';
        prop.remarks = `${remarks || 'Escalated with High Priority'} (Escalated by: ${officerName || 'Competent Authority'})`;
      } else {
        prop.stageCode = Math.min(12, (prop.stageCode || 5) + 1);
        prop.stage = `Stage ${prop.stageCode} Sanctioned`;
        prop.remarks = `${remarks || 'Statutory review completed'} (Signed by: ${officerName || 'Competent Authority'})`;
      }
      
      prop.lastAction = today;
      db.proposals[idx] = prop;
      saveToDisk();
      return prop;
    }
  },

  // ---- Compensation & Solatium ----
  compensation: {
    findAll: (filters = {}) => {
      let list = [...db.compensation];
      if (filters.status && filters.status !== 'All') {
        list = list.filter(c => c.status === filters.status);
      }
      if (filters.state) {
        const s = filters.state.toLowerCase();
        list = list.filter(c => c.state && (c.state.toLowerCase().includes(s) || s.includes(c.state.toLowerCase())));
      }
      if (filters.district) {
        const d = filters.district.toLowerCase();
        list = list.filter(c => c.district && (c.district.toLowerCase().includes(d) || d.includes(c.district.toLowerCase())));
      }

      // If a specific district was requested and has no compensation records, synthesize authentic ones on the fly!
      if (filters.district && list.length === 0) {
        const synthState = filters.state || 'India';
        list = Database.compensation.synthesizeForDistrict(synthState, filters.district);
      }

      return list;
    },
    synthesizeForDistrict: (state, district) => {
      const cleanDist = district.split(/[\s_-]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      const records = [
        {
          id: `COMP-${state.slice(0, 2).toUpperCase()}-${cleanDist.slice(0, 3).toUpperCase()}-01`,
          project: `${cleanDist} Strategic Infrastructure Package`,
          state: state,
          district: cleanDist,
          beneficiary: 'Shri Anand S. Patil',
          surveyNo: '48/2',
          landArea: 1.20,
          landType: 'Agricultural',
          marketValue: 48.0,
          solatium: 48.0,
          totalCompensation: 96.0,
          status: 'Pending',
          date: null,
          mode: null,
          transactionRef: 'Notice u/s 21 Issued (PFMS KYC Ready)',
        },
        {
          id: `COMP-${state.slice(0, 2).toUpperCase()}-${cleanDist.slice(0, 3).toUpperCase()}-02`,
          project: `${cleanDist} Strategic Infrastructure Package`,
          state: state,
          district: cleanDist,
          beneficiary: 'Smt. Lakshmi Devi',
          surveyNo: '84/A',
          landArea: 0.85,
          landType: 'Non-Agricultural',
          marketValue: 62.0,
          solatium: 62.0,
          totalCompensation: 124.0,
          status: 'Disbursed',
          date: new Date().toISOString().split('T')[0],
          mode: 'RBI e-Kuber DBT',
          transactionRef: `RTGS/RBI2024/${Math.floor(100000 + Math.random() * 900000)}/DBT`,
        },
        {
          id: `COMP-${state.slice(0, 2).toUpperCase()}-${cleanDist.slice(0, 3).toUpperCase()}-03`,
          project: `${cleanDist} Strategic Infrastructure Package`,
          state: state,
          district: cleanDist,
          beneficiary: 'Shri Mahendra K. Singh',
          surveyNo: '112/P',
          landArea: 1.05,
          landType: 'Agricultural',
          marketValue: 45.0,
          solatium: 45.0,
          totalCompensation: 90.0,
          status: 'Dispute',
          date: null,
          mode: null,
          transactionRef: 'Referred to LARRA Tribunal u/s 64',
        }
      ];
      db.compensation.push(...records);
      saveToDisk();
      return records;
    },
    findById: (id) => {
      const c = db.compensation.find(x => x.id === id);
      return c ? { ...c } : null;
    },
    calculateSolatium: ({ marketValue, areaHa, ruralFactor = 1.0, yearsElapsed = 1 }) => {
      // LARR Act 2013 Formula (Sections 26 to 30)
      const baseValue = Number(marketValue);
      const multipliedValue = baseValue * Number(ruralFactor);
      const solatium100Percent = multipliedValue; // 100% Solatium under Section 30(1)
      const additionalMarketValue12Pct = (baseValue * 0.12 * Number(yearsElapsed)); // 12% p.a. under Section 30(3)
      const totalCompensation = multipliedValue + solatium100Percent + additionalMarketValue12Pct;
      
      return {
        baseMarketValue: baseValue,
        multiplierFactor: `${ruralFactor}x (${ruralFactor > 1.0 ? 'Rural Sliding Scale' : 'Urban Proximity'})`,
        multipliedMarketValue: multipliedValue,
        solatium100Percent: solatium100Percent,
        additionalInterest12Percent: Number(additionalMarketValue12Pct.toFixed(2)),
        totalGrossCompensation: Number(totalCompensation.toFixed(2)),
        incomeTaxDeductionTDS: 0, // Exempt under Section 96 of LARR Act 2013
        netPayableToLandowner: Number(totalCompensation.toFixed(2)),
        statutoryReference: 'Sections 26, 27, 28, 29, 30 & 96 of RFCTLARR Act 2013',
      };
    },
    disburseDBT: (id, { officerId, officerName }) => {
      const idx = db.compensation.findIndex(x => x.id === id);
      if (idx === -1) return null;
      
      const utr = `RTGS/RBI${Date.now().toString().slice(-9)}/LA-DBT`;
      db.compensation[idx] = {
        ...db.compensation[idx],
        status: 'Disbursed',
        mode: 'RTGS',
        date: new Date().toISOString().split('T')[0],
        transactionUtr: utr,
        disbursingOfficer: officerName,
      };
      saveToDisk();
      return db.compensation[idx];
    }
  },

  // ---- Rehabilitation & Resettlement ----
  rehabilitation: {
    findAll: () => [...db.rehabilitation],
    findById: (id) => db.rehabilitation.find(x => x.id === id) || null,
    updateStatus: (id, updates) => {
      const idx = db.rehabilitation.findIndex(x => x.id === id);
      if (idx === -1) return null;
      db.rehabilitation[idx] = { ...db.rehabilitation[idx], ...updates };
      saveToDisk();
      return db.rehabilitation[idx];
    }
  },

  // ---- Documents ----
  documents: {
    findAll: () => [...db.documents],
    findById: (id) => db.documents.find(x => x.id === id) || null,
    upload: (docData) => {
      const hash = crypto.createHash('sha256').update(JSON.stringify(docData) + Date.now()).digest('hex');
      const newDoc = {
        id: `DOC-2026-${String(db.documents.length + 101).slice(-3)}`,
        uploadDate: new Date().toISOString().split('T')[0],
        version: '1.0',
        status: 'Verified',
        digitalSignatureHash: `sha256-${hash.substring(0, 16)}`,
        signedBy: 'NIC e-Sign Gateway / Authorised Signatory',
        ...docData,
      };
      db.documents.unshift(newDoc);
      saveToDisk();
      return newDoc;
    }
  },

  // ---- Notifications ----
  notifications: {
    findAll: () => [...db.notifications],
    create: (notifData) => {
      const newNotif = {
        id: `N-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toISOString(),
        read: false,
        ...notifData,
      };
      db.notifications.unshift(newNotif);
      saveToDisk();
      return newNotif;
    },
    markAllAsRead: () => {
      db.notifications.forEach(n => n.read = true);
      saveToDisk();
      return true;
    }
  },

  // ---- Grievances & Objections (Sec 15) ----
  grievances: {
    findAll: () => [...db.grievances],
    findById: (id) => db.grievances.find(x => x.id === id) || null,
    create: (grievanceData) => {
      const token = `NLAMS/GRV/${grievanceData.state || 'IN'}/${Date.now().toString().slice(-4)}`;
      const newGrv = {
        id: `GRV-${Date.now().toString().slice(-4)}`,
        tokenNumber: token,
        filedDate: new Date().toISOString().split('T')[0],
        status: 'SUBMITTED',
        resolutionNotes: null,
        hearingScheduled: null,
        ...grievanceData,
      };
      db.grievances.unshift(newGrv);
      saveToDisk();
      return newGrv;
    },
    resolve: (id, { resolutionNotes, officerName }) => {
      const idx = db.grievances.findIndex(x => x.id === id);
      if (idx === -1) return null;
      db.grievances[idx].status = 'RESOLVED';
      db.grievances[idx].resolvedDate = new Date().toISOString().split('T')[0];
      db.grievances[idx].resolutionNotes = `${resolutionNotes} (Resolved by: ${officerName})`;
      saveToDisk();
      return db.grievances[idx];
    }
  },

  // ---- Statutory Audit Trail ----
  auditLogs: {
    findAll: (limit = 50) => db.auditLogs.slice(0, limit),
    record: (logEntry) => {
      const hash = crypto.createHash('sha256').update(JSON.stringify(logEntry) + Date.now()).digest('hex');
      const entry = {
        id: `AUD-2026-${String(db.auditLogs.length + 1).padStart(4, '0')}`,
        timestamp: new Date().toISOString(),
        status: 'SUCCESS',
        hashSignature: `sha256-${hash.substring(0, 16)}`,
        ...logEntry,
      };
      db.auditLogs.unshift(entry);
      saveToDisk();
      return entry;
    }
  },

  // ---- System Statistics & State/District/Agency datasets ----
  stats: {
    getNational: () => ({ ...nationalStats }),
    getStates: () => [...statesData],
    getStateMH: () => ({ ...maharashtraStateData }),
    getDistrictAhm: () => ({ ...ahmedabadDistrictData }),
    getAgencyNHAI: () => ({ ...nhaiAgencyData }),
    getCitizen: () => ({ ...citizenData }),
    getIntegrations: () => ({ ...db.integrations }),
    getDistrictDynamic: (stateName = 'Gujarat', districtName = 'Ahmedabad') => {
      const stateObj = statesData.find(s => 
        s.name.toLowerCase().includes(stateName.toLowerCase()) || 
        stateName.toLowerCase().includes(s.name.toLowerCase())
      ) || statesData[0];

      const distProjects = Math.max(3, Math.floor(stateObj.projects / 6));
      const distLandProposed = Number((stateObj.landProposed / 6).toFixed(1));
      const distLandAcquired = Number((stateObj.landAcquired / 6).toFixed(1));
      const distCompAssessed = Number((stateObj.compensation / 6).toFixed(1));
      const distCompPaid = Number((stateObj.compensationPaid / 6).toFixed(1));

      return {
        districtName,
        stateName: stateObj.name,
        stateCode: stateObj.code,
        collectorName: `District Magistrate (${districtName}), IAS`,
        totalTalukas: 8,
        villagesCovered: 412,
        stats: {
          totalProjects: distProjects,
          landProposed: distLandProposed,
          landAcquired: distLandAcquired,
          landPossessed: Number((distLandAcquired * 0.82).toFixed(1)),
          compensationAssessed: distCompAssessed,
          compensationDisbursed: distCompPaid,
          pendingCompensation: Number((distCompAssessed - distCompPaid).toFixed(1)),
          familiesAffected: Math.floor(stateObj.families / 6),
          familiesResettled: Math.floor(stateObj.resettled / 6),
          possessionRate: stateObj.possession || 78,
        }
      };
    },
    getStateDynamic: (stateName = 'Maharashtra') => {
      const stateObj = statesData.find(s => 
        s.name.toLowerCase().includes(stateName.toLowerCase()) || 
        stateName.toLowerCase().includes(s.name.toLowerCase())
      ) || statesData[0];

      return {
        stateName: stateObj.name,
        stateCode: stateObj.code,
        secretaryName: `Principal Secretary (${stateObj.name}), IAS`,
        totalDistricts: 30,
        activeDistricts: 24,
        stats: {
          totalProjects: stateObj.projects,
          activeProjects: Math.floor(stateObj.projects * 0.75),
          landProposed: stateObj.landProposed,
          landAcquired: stateObj.landAcquired,
          landPossessed: Number((stateObj.landAcquired * (stateObj.possession / 100)).toFixed(1)),
          compensationAssessed: stateObj.compensation,
          compensationDisbursed: stateObj.compensationPaid,
          pendingCompensation: Number((stateObj.compensation - stateObj.compensationPaid).toFixed(1)),
          familiesAffected: stateObj.families,
          familiesResettled: stateObj.resettled,
          possessionRate: stateObj.possession,
        }
      };
    }
  }
};

export default Database;
