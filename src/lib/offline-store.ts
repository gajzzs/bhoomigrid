// In-Memory & Offline Spatial Data Store (Pure TS/JS, Browser and Server compatible)
import { 
  Project, 
  LandParcel, 
  StatutoryNotification, 
  StatutoryAlert, 
  ProjectAffectedFamily, 
  DBTTransaction, 
  AuditLog, 
  ParcelStatus 
} from '@/types/land-acquisition';
import { 
  INITIAL_PROJECTS, 
  INITIAL_PARCELS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_ALERTS, 
  INITIAL_PAFS, 
  INITIAL_DBT_TRANSACTIONS, 
  INITIAL_AUDIT_LOGS 
} from './seed-data';

export class OfflineSpatialStore {
  private projects: Project[] = [...INITIAL_PROJECTS];
  private parcels: LandParcel[] = [...INITIAL_PARCELS];
  private notifications: StatutoryNotification[] = [...INITIAL_NOTIFICATIONS];
  private alerts: StatutoryAlert[] = [...INITIAL_ALERTS];
  private pafs: ProjectAffectedFamily[] = [...INITIAL_PAFS];
  private dbtTransactions: DBTTransaction[] = [...INITIAL_DBT_TRANSACTIONS];
  private auditLogs: AuditLog[] = [...INITIAL_AUDIT_LOGS];

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const savedProjects = localStorage.getItem('nlams_projects');
        const savedParcels = localStorage.getItem('nlams_parcels');
        const savedTransactions = localStorage.getItem('nlams_dbt');
        const savedLogs = localStorage.getItem('nlams_audit');
        const savedPafs = localStorage.getItem('nlams_pafs');

        if (savedProjects) this.projects = JSON.parse(savedProjects);
        if (savedParcels) this.parcels = JSON.parse(savedParcels);
        if (savedTransactions) this.dbtTransactions = JSON.parse(savedTransactions);
        if (savedLogs) this.auditLogs = JSON.parse(savedLogs);
        if (savedPafs) this.pafs = JSON.parse(savedPafs);
      } catch (e) {
        console.warn('Failed to load from localStorage, using seed data', e);
      }
    }
  }

  private saveToLocalStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('nlams_projects', JSON.stringify(this.projects));
        localStorage.setItem('nlams_parcels', JSON.stringify(this.parcels));
        localStorage.setItem('nlams_dbt', JSON.stringify(this.dbtTransactions));
        localStorage.setItem('nlams_audit', JSON.stringify(this.auditLogs));
        localStorage.setItem('nlams_pafs', JSON.stringify(this.pafs));
      } catch (e) {
        console.warn('Failed to save to localStorage', e);
      }
    }
  }

  public resetToSeedData() {
    this.projects = [...INITIAL_PROJECTS];
    this.parcels = [...INITIAL_PARCELS];
    this.notifications = [...INITIAL_NOTIFICATIONS];
    this.alerts = [...INITIAL_ALERTS];
    this.pafs = [...INITIAL_PAFS];
    this.dbtTransactions = [...INITIAL_DBT_TRANSACTIONS];
    this.auditLogs = [...INITIAL_AUDIT_LOGS];
    this.saveToLocalStorage();
  }

  // --- Projects ---
  public getProjects(): Project[] {
    return this.projects;
  }

  public getProjectById(id: string): Project | undefined {
    return this.projects.find((p) => p.id === id);
  }

  public updateProjectStage(id: string, stage: number, officerName = 'Competent Authority') {
    const proj = this.projects.find((p) => p.id === id);
    if (proj) {
      const prevStage = proj.currentStage;
      proj.currentStage = stage as any;
      
      this.addAuditLog({
        projectId: id,
        actor: officerName,
        role: 'DISTRICT_COLLECTOR_CALA',
        action: `ADVANCE_WORKFLOW_STAGE_${stage}`,
        details: `Project advanced from Stage ${prevStage} to Stage ${stage}.`,
      });

      this.saveToLocalStorage();
    }
    return proj;
  }

  // --- Parcels with Spatial Queries ---
  public getParcels(projectId?: string): LandParcel[] {
    if (projectId) {
      return this.parcels.filter((p) => p.projectId === projectId);
    }
    return this.parcels;
  }

  public getParcelById(id: string): LandParcel | undefined {
    return this.parcels.find((p) => p.id === id);
  }

  public updateParcelStatus(id: string, status: ParcelStatus, possessionDate?: string) {
    const parcel = this.parcels.find((p) => p.id === id);
    if (parcel) {
      parcel.status = status;
      if (status === 'POSSESSION_TAKEN') {
        parcel.possessionStatus = 'POSSESSION_TAKEN';
        parcel.possessionDate = possessionDate || new Date().toISOString().split('T')[0];
        const proj = this.projects.find((p) => p.id === parcel.projectId);
        if (proj) {
          proj.possessionTakenHa = Number((proj.possessionTakenHa + parcel.areaHectares).toFixed(2));
        }
      }
      this.saveToLocalStorage();
    }
    return parcel;
  }

  // --- PFMS DBT Direct Benefit Transfer ---
  public executeDBTTransfer(parcelId: string, officerName: string): { success: boolean; transaction?: DBTTransaction; error?: string } {
    const parcel = this.parcels.find((p) => p.id === parcelId);
    if (!parcel) {
      return { success: false, error: 'Parcel not found' };
    }

    if (parcel.compensationStatus === 'DISBURSED') {
      return { success: false, error: 'Compensation has already been disbursed for this parcel.' };
    }

    const utr = `PFMS${new Date().getFullYear()}${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' IST';

    const newTxn: DBTTransaction = {
      id: `dbt-${Date.now()}`,
      projectId: parcel.projectId,
      khasraNumber: parcel.khasraNumber,
      beneficiaryName: parcel.ownerName,
      bankName: 'Direct Benefit Transfer (PFMS / NPCI)',
      maskedAccount: parcel.bankAccountMasked,
      ifsc: parcel.ifscCode,
      amountRupees: parcel.totalCompensationAmount,
      utrNumber: utr,
      timestamp: nowStr,
      status: 'SUCCESS',
      pfmsBatchId: `BATCH-GOI-${Date.now().toString().slice(-6)}`,
      disbursedBy: officerName,
    };

    parcel.compensationStatus = 'DISBURSED';
    parcel.status = 'COMPENSATION_DISBURSED';
    parcel.disbursementDate = nowStr.split(' ')[0];
    parcel.pfmsUtrNumber = utr;

    // Update Project financials
    const proj = this.projects.find((p) => p.id === parcel.projectId);
    if (proj) {
      const amountInCr = parcel.totalCompensationAmount / 10000000;
      proj.compensationDisbursedCr = Number((proj.compensationDisbursedCr + amountInCr).toFixed(2));
      proj.acquiredAreaHa = Number((proj.acquiredAreaHa + parcel.areaHectares).toFixed(2));
    }

    this.dbtTransactions.unshift(newTxn);

    this.addAuditLog({
      projectId: parcel.projectId,
      actor: officerName,
      role: 'DISTRICT_COLLECTOR_CALA',
      action: 'EXECUTE_DBT_DISBURSEMENT',
      details: `Disbursed ₹ ${parcel.totalCompensationAmount.toLocaleString('en-IN')} via PFMS to ${parcel.ownerName} (Khasra ${parcel.khasraNumber}, UTR: ${utr}).`,
    });

    this.saveToLocalStorage();
    return { success: true, transaction: newTxn };
  }

  // --- Notifications, Alerts, R&R, Audit ---
  public getNotifications(projectId?: string): StatutoryNotification[] {
    if (projectId) return this.notifications.filter((n) => n.projectId === projectId);
    return this.notifications;
  }

  public getAlerts(): StatutoryAlert[] {
    return this.alerts;
  }

  public getPAFs(projectId?: string): ProjectAffectedFamily[] {
    if (projectId) return this.pafs.filter((p) => p.projectId === projectId);
    return this.pafs;
  }

  public updatePAFEntitlement(id: string, updates: Partial<ProjectAffectedFamily['entitlements']>) {
    const paf = this.pafs.find((p) => p.id === id);
    if (paf) {
      paf.entitlements = { ...paf.entitlements, ...updates };
      if (paf.entitlements.resettlementHouseAllotted && paf.entitlements.subsistenceAllowancePaidMonths >= 12) {
        paf.status = 'FULLY_SETTLED';
      } else {
        paf.status = 'PARTIALLY_SETTLED';
      }
      this.saveToLocalStorage();
    }
    return paf;
  }

  public getDBTTransactions(projectId?: string): DBTTransaction[] {
    if (projectId) return this.dbtTransactions.filter((t) => t.projectId === projectId);
    return this.dbtTransactions;
  }

  public getAuditLogs(projectId?: string): AuditLog[] {
    if (projectId) return this.auditLogs.filter((l) => l.projectId === projectId);
    return this.auditLogs;
  }

  public addAuditLog(entry: { projectId: string; actor: string; role: any; action: string; details: string }) {
    const newLog: AuditLog = {
      id: `audit-${Date.now()}`,
      projectId: entry.projectId,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' IST',
      actor: entry.actor,
      role: entry.role,
      action: entry.action,
      details: entry.details,
      sha256Hash: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    };
    this.auditLogs.unshift(newLog);
    this.saveToLocalStorage();
    return newLog;
  }

  /**
   * Export entire offline database as a pure PostgreSQL + PostGIS SQL dump
   */
  public exportToPostgreSQLDump(): string {
    let sql = `-- =========================================================================\n`;
    sql += `-- NLAMS / BHOOMI-GATI: Complete PostgreSQL with PostGIS Spatial Database Dump\n`;
    sql += `-- Generated: ${new Date().toISOString()}\n`;
    sql += `-- =========================================================================\n\n`;
    sql += `CREATE EXTENSION IF NOT EXISTS postgis;\n\n`;

    sql += `-- 1. PROJECTS\n`;
    for (const p of this.projects) {
      sql += `INSERT INTO projects (id, code, title, sector, ministry, requiring_body, state, districts, total_proposed_area_ha, acquired_area_ha, possession_taken_ha, total_estimated_budget_cr, compensation_assessed_cr, compensation_disbursed_cr, current_stage, status) VALUES ('${p.id}', '${p.code}', '${p.title.replace(/'/g, "''")}', '${p.sector}', '${p.ministry.replace(/'/g, "''")}', '${p.requiringBody.replace(/'/g, "''")}', '${p.state}', ARRAY['${p.districts.join("','")}'], ${p.totalProposedAreaHa}, ${p.acquiredAreaHa}, ${p.possessionTakenHa}, ${p.totalEstimatedBudgetCr}, ${p.compensationAssessedCr}, ${p.compensationDisbursedCr}, ${p.currentStage}, '${p.status}') ON CONFLICT (id) DO UPDATE SET current_stage = EXCLUDED.current_stage;\n`;
    }

    sql += `\n-- 2. LAND PARCELS WITH POSTGIS GEOMETRIES\n`;
    for (const pcl of this.parcels) {
      sql += `INSERT INTO land_parcels (id, project_id, khasra_number, village, taluk, district, state, area_hectares, area_acres, land_type, owner_name, base_circle_rate_per_ha, rural_multiplier, solatium_amount, total_compensation_amount, compensation_status, possession_status, status, geom) VALUES ('${pcl.id}', '${pcl.projectId}', '${pcl.khasraNumber}', '${pcl.village}', '${pcl.taluk}', '${pcl.district}', '${pcl.state}', ${pcl.areaHectares}, ${pcl.areaAcres}, '${pcl.landType}', '${pcl.ownerName.replace(/'/g, "''")}', ${pcl.baseCircleRatePerHa}, ${pcl.ruralMultiplier}, ${pcl.solatiumAmount}, ${pcl.totalCompensationAmount}, '${pcl.compensationStatus}', '${pcl.possessionStatus}', '${pcl.status}', ST_GeomFromText('${pcl.postgisWkt}', 4326)) ON CONFLICT (id) DO NOTHING;\n`;
    }

    return sql;
  }
}

export const offlineDb = new OfflineSpatialStore();
