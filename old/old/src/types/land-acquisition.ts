// National Land Acquisition & Management System (NLAMS) - Data Types

export type ProjectSector = 
  | 'Highways & Expressways'
  | 'Railways & High Speed Rail'
  | 'Renewable & Power Transmission'
  | 'Irrigation & River Interlinking'
  | 'Industrial Corridors & NIMZ'
  | 'Urban Transit & Aviation';

export type StageId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface WorkflowStage {
  id: StageId;
  name: string;
  hindiName: string;
  actReference: string;
  description: string;
  slaDays: number;
}

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: 1,
    name: 'Proposal & Alignment Requisition',
    hindiName: 'प्रस्ताव एवं संरेखण मांग',
    actReference: 'RFCTLARR 2013 Sec 3(za) / NH Act 3A',
    description: 'Requiring body submits proposal, DPR, alignment geometry, and estimated budget.',
    slaDays: 30,
  },
  {
    id: 2,
    name: 'Digital Scrutiny & SIA Review',
    hindiName: 'डिजिटल स्क्रूटनी एवं एसआईए समीक्षा',
    actReference: 'RFCTLARR 2013 Sec 4-9',
    description: 'District Collector scrutiny, Social Impact Assessment, and public hearing report.',
    slaDays: 60,
  },
  {
    id: 3,
    name: 'Preliminary Statutory Notification',
    hindiName: 'प्रारंभिक सांविधिक अधिसूचना',
    actReference: 'Section 11 / NH Act Sec 3A',
    description: 'Publication in Gazette & local papers; transaction freeze and initial boundary lock.',
    slaDays: 30,
  },
  {
    id: 4,
    name: 'Hearing of Objections',
    hindiName: 'आपत्तियों की सुनवाई',
    actReference: 'Section 15 / NH Act Sec 3C',
    description: '60-day window for affected landowners to file claims; CALA hearing & disposal orders.',
    slaDays: 60,
  },
  {
    id: 5,
    name: 'Declaration of Acquisition & JMS',
    hindiName: 'अधिग्रहण घोषणा एवं संयुक्त माप सर्वेक्षण',
    actReference: 'Section 19 / NH Act Sec 3D',
    description: 'Final declaration of acquisition (must be within 12 months of Sec 11) and Joint Measurement Survey.',
    slaDays: 90,
  },
  {
    id: 6,
    name: 'Award Determination (Land & R&R)',
    hindiName: 'मुआवजा पंचाट निर्धारण',
    actReference: 'Section 23/26-30 & Sec 31',
    description: 'Valuation with rural multiplier, 100% solatium, 12% AMV, tree/asset value, and R&R awards.',
    slaDays: 60,
  },
  {
    id: 7,
    name: 'PFMS / DBT Compensation Disbursement',
    hindiName: 'पीएफएमएस / डीबीटी मुआवजा वितरण',
    actReference: 'Section 37 & 77 / Direct Benefit Transfer',
    description: 'Escrow account deposit and direct Aadhaar/bank transfer to affected families.',
    slaDays: 45,
  },
  {
    id: 8,
    name: 'Physical Possession & RoR Mutation',
    hindiName: 'भौतिक कब्जा एवं खतौनी नामांतरण',
    actReference: 'Section 38 & 41 / State RoR Rules',
    description: 'Field Panchnama execution, handing over possession to Requiring Body, and revenue mutation.',
    slaDays: 30,
  },
  {
    id: 9,
    name: 'R&R Execution & Project Closure',
    hindiName: 'पुनर्वास क्रियान्वयन एवं परियोजना समापन',
    actReference: 'Section 42-45 & Schedule II',
    description: 'Resettlement colony handover, livelihood restoration, and final audit clearance.',
    slaDays: 90,
  },
];

export type StakeholderRole = 
  | 'CENTRAL_MINISTRY'
  | 'DISTRICT_COLLECTOR_CALA'
  | 'REQUIRING_BODY'
  | 'RNR_ADMIN'
  | 'CITIZEN';

export type ParcelStatus = 
  | 'PROPOSED'
  | 'NOTIFIED_SEC11'
  | 'DECLARED_SEC19'
  | 'AWARD_DECLARED'
  | 'COMPENSATION_DISBURSED'
  | 'POSSESSION_TAKEN'
  | 'DISPUTED';

export type LandType = 
  | 'AGRICULTURAL_IRRIGATED'
  | 'AGRICULTURAL_UNIRRIGATED'
  | 'RURAL_HOMESTEAD'
  | 'COMMERCIAL_URBAN'
  | 'BARREN_WASTELAND'
  | 'FOREST_GOVERNMENT';

export interface LandParcel {
  id: string;
  projectId: string;
  khasraNumber: string;
  surveyNumber: string;
  village: string;
  taluk: string;
  district: string;
  state: string;
  areaHectares: number;
  areaAcres: number;
  landType: LandType;
  ownerName: string;
  fatherHusbandName: string;
  aadhaarMasked: string;
  bankAccountMasked: string;
  ifscCode: string;
  baseCircleRatePerHa: number;
  ruralMultiplier: number;
  solatiumAmount: number;
  additionalMarketValue: number;
  assetsValue: number;
  totalCompensationAmount: number;
  compensationStatus: 'PENDING' | 'ASSESSED' | 'DISBURSED' | 'UNDER_APPEAL';
  possessionStatus: 'PENDING' | 'SURVEYED' | 'POSSESSION_TAKEN' | 'DISPUTED';
  status: ParcelStatus;
  postgisWkt: string;
  coordinates: [number, number][]; // [lat, lng] polygon vertices
  centroid: [number, number]; // [lat, lng]
  fieldPhotoUrl?: string;
  possessionDate?: string;
  disbursementDate?: string;
  pfmsUtrNumber?: string;
}

export interface StatutoryNotification {
  id: string;
  projectId: string;
  section: 'Section 11(1)' | 'Section 15' | 'Section 19(1)' | 'Section 23' | 'Section 40 (Urgency)';
  gazetteNumber: string;
  gazetteDate: string;
  expiryDate: string;
  status: 'DRAFT' | 'PUBLISHED' | 'EXPIRED' | 'COMPLIANT';
  newspaperPublicationEnglish: string;
  newspaperPublicationVernacular: string;
  digitalSignCertHash: string;
  signedBy: string;
  documentTitle: string;
  fileSizeMb: number;
}

export interface StatutoryAlert {
  id: string;
  projectId: string;
  projectTitle: string;
  stageName: string;
  deadlineDate: string;
  daysRemaining: number;
  severity: 'CRITICAL' | 'WARNING' | 'COMPLIANT';
  message: string;
  legalImplication: string;
}

export interface ProjectAffectedFamily {
  id: string;
  projectId: string;
  familyHeadName: string;
  vulnerabilityStatus: 'GENERAL' | 'SC' | 'ST' | 'OBC' | 'WOMEN_HEADED' | 'BPL';
  isDisplaced: boolean; // PDF vs PAF
  khasraNumber: string;
  residentialStructureAffected: boolean;
  agriculturalLandPercentageLost: number;
  entitlements: {
    resettlementHouseAllotted: boolean;
    resettlementPlotLocation?: string;
    subsistenceAllowancePaidMonths: number; // Max 12 months @ Rs 3000/mo
    displacementGrantPaid: boolean; // Rs 50,000
    cattleShedGrantPaid: boolean; // Rs 25,000
    annuityOrJobOption: 'ANNUITY_PENSION' | 'ONE_TIME_LUMPSUM' | 'EMPLOYMENT';
  };
  status: 'ELIGIBLE' | 'PARTIALLY_SETTLED' | 'FULLY_SETTLED';
}

export interface DBTTransaction {
  id: string;
  projectId: string;
  khasraNumber: string;
  beneficiaryName: string;
  bankName: string;
  maskedAccount: string;
  ifsc: string;
  amountRupees: number;
  utrNumber: string;
  timestamp: string;
  status: 'SUCCESS' | 'PROCESSING' | 'FAILED';
  pfmsBatchId: string;
  disbursedBy: string;
}

export interface AuditLog {
  id: string;
  projectId: string;
  timestamp: string;
  actor: string;
  role: StakeholderRole;
  action: string;
  details: string;
  sha256Hash: string;
}

export interface Project {
  id: string;
  code: string;
  title: string;
  hindiTitle: string;
  sector: ProjectSector;
  ministry: string;
  requiringBody: string;
  state: string;
  districts: string[];
  totalProposedAreaHa: number;
  notifiedAreaHa: number;
  acquiredAreaHa: number;
  possessionTakenHa: number;
  totalEstimatedBudgetCr: number;
  compensationAssessedCr: number;
  compensationDisbursedCr: number;
  escrowFundedCr: number;
  totalAffectedFamilies: number;
  totalDisplacedFamilies: number;
  currentStage: StageId;
  sec11Date?: string;
  sec19Deadline?: string;
  status: 'ACTIVE' | 'DELAYED' | 'COMPLETED' | 'ON_TRACK';
  createdDate: string;
  leadOfficerName: string;
  leadOfficerRole: string;
  heroImageUrl: string;
}
