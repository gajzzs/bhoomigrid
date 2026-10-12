// =============================================================================
// NLAMS Mock Data – National Land Acquisition & Management System
// Dept. of Land Resources (DoLR), Ministry of Rural Development
// =============================================================================

// --------------- National Aggregate Statistics ---------------
export const nationalStats = {
  totalProjects: 847,
  activeProjects: 612,
  completedProjects: 189,
  statesActive: 28,
  utsActive: 6,
  totalLandProposed: 124850.75,   // hectares
  totalLandAcquired: 78432.50,
  totalLandPossessed: 62148.25,
  notificationsIssued: 2341,
  awardsDeclared: 1876,
  compensationAssessed: 45623.80, // crores
  compensationDisbursed: 38214.55,
  pendingCompensation: 7409.25,
  familiesAffected: 156840,
  familiesCompensated: 128450,
  familiesResettled: 97820,
  rrSchemesApproved: 1245,
  averageProcessingDays: 142,
  onTimeCompletion: 67.4,
  pendingApprovals: 234,
  criticalDelays: 47,
};

// --------------- State-wise Data ---------------
export const statesData = [
  { id: 'UP', name: 'Uttar Pradesh', code: 'UP', projects: 127, landProposed: 18750.5, landAcquired: 12450.3, compensation: 6820.4, compensationPaid: 5640.2, families: 28400, resettled: 18200, possession: 72, lat: 26.8467, lng: 80.9462 },
  { id: 'MH', name: 'Maharashtra', code: 'MH', projects: 98, landProposed: 15200.8, landAcquired: 11200.6, compensation: 8450.3, compensationPaid: 7320.1, families: 22100, resettled: 16800, possession: 78, lat: 19.0760, lng: 72.8777 },
  { id: 'MP', name: 'Madhya Pradesh', code: 'MP', projects: 84, landProposed: 14300.2, landAcquired: 9800.4, compensation: 4120.7, compensationPaid: 3540.8, families: 19600, resettled: 12400, possession: 65, lat: 23.2599, lng: 77.4126 },
  { id: 'RJ', name: 'Rajasthan', code: 'RJ', projects: 76, landProposed: 12800.9, landAcquired: 8200.5, compensation: 3980.2, compensationPaid: 3120.6, families: 15800, resettled: 10200, possession: 61, lat: 26.9124, lng: 75.7873 },
  { id: 'KA', name: 'Karnataka', code: 'KA', projects: 72, landProposed: 8900.4, landAcquired: 6750.2, compensation: 5240.8, compensationPaid: 4680.3, families: 12400, resettled: 9800, possession: 82, lat: 12.9716, lng: 77.5946 },
  { id: 'GJ', name: 'Gujarat', code: 'GJ', projects: 68, landProposed: 9200.6, landAcquired: 7100.8, compensation: 4560.5, compensationPaid: 4120.9, families: 11200, resettled: 9100, possession: 80, lat: 23.2156, lng: 72.6369 },
  { id: 'TN', name: 'Tamil Nadu', code: 'TN', projects: 61, landProposed: 6800.3, landAcquired: 5200.1, compensation: 4780.6, compensationPaid: 4250.4, families: 9800, resettled: 8200, possession: 85, lat: 13.0827, lng: 80.2707 },
  { id: 'AP', name: 'Andhra Pradesh', code: 'AP', projects: 54, landProposed: 8100.7, landAcquired: 5400.3, compensation: 3640.2, compensationPaid: 2980.7, families: 10600, resettled: 7400, possession: 68, lat: 15.9129, lng: 79.7400 },
  { id: 'TS', name: 'Telangana', code: 'TS', projects: 42, landProposed: 5600.4, landAcquired: 4100.6, compensation: 3120.8, compensationPaid: 2840.3, families: 7800, resettled: 6200, possession: 76, lat: 17.3850, lng: 78.4867 },
  { id: 'WB', name: 'West Bengal', code: 'WB', projects: 38, landProposed: 4200.8, landAcquired: 2800.4, compensation: 2140.5, compensationPaid: 1680.2, families: 8400, resettled: 5200, possession: 58, lat: 22.5726, lng: 88.3639 },
  { id: 'BR', name: 'Bihar', code: 'BR', projects: 34, landProposed: 5100.6, landAcquired: 2900.2, compensation: 1840.3, compensationPaid: 1320.8, families: 9200, resettled: 4800, possession: 52, lat: 25.6093, lng: 85.1376 },
  { id: 'OD', name: 'Odisha', code: 'OD', projects: 31, landProposed: 4800.3, landAcquired: 3200.7, compensation: 1960.4, compensationPaid: 1640.6, families: 7600, resettled: 5100, possession: 64, lat: 20.2961, lng: 85.8245 },
  { id: 'KL', name: 'Kerala', code: 'KL', projects: 28, landProposed: 2400.2, landAcquired: 1800.5, compensation: 2840.6, compensationPaid: 2580.2, families: 4200, resettled: 3600, possession: 88, lat: 8.5241, lng: 76.9366 },
  { id: 'PB', name: 'Punjab', code: 'PB', projects: 26, landProposed: 3600.4, landAcquired: 2600.8, compensation: 2280.3, compensationPaid: 2040.5, families: 5400, resettled: 4200, possession: 74, lat: 30.7333, lng: 76.7794 },
  { id: 'HR', name: 'Haryana', code: 'HR', projects: 24, landProposed: 3200.7, landAcquired: 2400.3, compensation: 3460.8, compensationPaid: 3120.4, families: 4800, resettled: 3900, possession: 79, lat: 29.0588, lng: 76.0856 },
  { id: 'JH', name: 'Jharkhand', code: 'JH', projects: 22, landProposed: 3800.5, landAcquired: 2100.4, compensation: 1420.6, compensationPaid: 980.3, families: 6400, resettled: 3200, possession: 48, lat: 23.3441, lng: 85.3096 },
  { id: 'CG', name: 'Chhattisgarh', code: 'CG', projects: 19, landProposed: 3400.8, landAcquired: 2200.6, compensation: 1280.4, compensationPaid: 1040.7, families: 5600, resettled: 3400, possession: 56, lat: 21.2514, lng: 81.6296 },
  { id: 'UK', name: 'Uttarakhand', code: 'UK', projects: 16, landProposed: 2100.3, landAcquired: 1400.8, compensation: 1640.2, compensationPaid: 1380.5, families: 3200, resettled: 2400, possession: 71, lat: 30.3165, lng: 78.0322 },
  { id: 'AS', name: 'Assam', code: 'AS', projects: 14, landProposed: 2800.6, landAcquired: 1600.3, compensation: 920.5, compensationPaid: 680.4, families: 4600, resettled: 2200, possession: 45, lat: 26.1445, lng: 91.7362 },
  { id: 'GA', name: 'Goa', code: 'GA', projects: 8, landProposed: 680.4, landAcquired: 520.2, compensation: 840.3, compensationPaid: 780.6, families: 1200, resettled: 1050, possession: 90, lat: 15.4909, lng: 73.8278 },
  { id: 'HP', name: 'Himachal Pradesh', code: 'HP', projects: 12, landProposed: 1420.5, landAcquired: 980.2, compensation: 1240.5, compensationPaid: 1050.2, families: 2100, resettled: 1650, possession: 76, lat: 31.1048, lng: 77.1734 },
  { id: 'AR', name: 'Arunachal Pradesh', code: 'AR', projects: 11, landProposed: 2200.4, landAcquired: 1400.6, compensation: 780.2, compensationPaid: 620.4, families: 1800, resettled: 1200, possession: 68, lat: 27.0844, lng: 93.6053 },
  { id: 'MN', name: 'Manipur', code: 'MN', projects: 9, landProposed: 850.2, landAcquired: 520.4, compensation: 420.5, compensationPaid: 340.2, families: 1400, resettled: 950, possession: 64, lat: 24.8170, lng: 93.9368 },
  { id: 'ML', name: 'Meghalaya', code: 'ML', projects: 8, landProposed: 740.6, landAcquired: 480.2, compensation: 390.4, compensationPaid: 310.8, families: 1100, resettled: 820, possession: 67, lat: 25.5788, lng: 91.8933 },
  { id: 'MZ', name: 'Mizoram', code: 'MZ', projects: 7, landProposed: 620.4, landAcquired: 390.5, compensation: 310.2, compensationPaid: 250.4, families: 850, resettled: 640, possession: 65, lat: 23.1645, lng: 92.9376 },
  { id: 'NL', name: 'Nagaland', code: 'NL', projects: 7, landProposed: 580.2, landAcquired: 360.4, compensation: 290.6, compensationPaid: 220.5, families: 790, resettled: 580, possession: 63, lat: 26.1584, lng: 94.5624 },
  { id: 'SK', name: 'Sikkim', code: 'SK', projects: 6, landProposed: 410.5, landAcquired: 310.2, compensation: 340.8, compensationPaid: 290.4, families: 560, resettled: 480, possession: 82, lat: 27.5330, lng: 88.5122 },
  { id: 'TR', name: 'Tripura', code: 'TR', projects: 8, landProposed: 690.3, landAcquired: 470.8, compensation: 380.5, compensationPaid: 320.2, families: 1250, resettled: 980, possession: 72, lat: 23.9408, lng: 91.9882 },
  { id: 'DL', name: 'Delhi', code: 'DL', projects: 22, landProposed: 1850.4, landAcquired: 1680.2, compensation: 5640.8, compensationPaid: 5210.5, families: 3400, resettled: 3100, possession: 92, lat: 28.7041, lng: 77.1025 },
  { id: 'JK', name: 'Jammu & Kashmir', code: 'JK', projects: 18, landProposed: 2640.5, landAcquired: 1920.4, compensation: 2150.4, compensationPaid: 1840.6, families: 4100, resettled: 3200, possession: 74, lat: 33.7782, lng: 76.5762 },
  { id: 'LA', name: 'Ladakh', code: 'LA', projects: 6, landProposed: 1200.0, landAcquired: 840.5, compensation: 480.2, compensationPaid: 390.5, families: 620, resettled: 480, possession: 70, lat: 34.1526, lng: 77.5771 },
  { id: 'CH', name: 'Chandigarh', code: 'CH', projects: 5, landProposed: 320.4, landAcquired: 290.8, compensation: 980.4, compensationPaid: 920.2, families: 450, resettled: 420, possession: 95, lat: 30.7333, lng: 76.7794 },
  { id: 'PY', name: 'Puducherry', code: 'PY', projects: 6, landProposed: 280.6, landAcquired: 240.2, compensation: 410.5, compensationPaid: 370.8, families: 520, resettled: 460, possession: 88, lat: 11.9416, lng: 79.8083 },
  { id: 'AN', name: 'Andaman & Nicobar Islands', code: 'AN', projects: 5, landProposed: 520.4, landAcquired: 380.2, compensation: 320.4, compensationPaid: 260.5, families: 380, resettled: 290, possession: 75, lat: 11.7401, lng: 92.6586 },
  { id: 'DD', name: 'Dadra & Nagar Haveli and Daman & Diu', code: 'DD', projects: 5, landProposed: 340.2, landAcquired: 280.5, compensation: 390.2, compensationPaid: 340.6, families: 420, resettled: 360, possession: 85, lat: 20.1809, lng: 73.0169 },
  { id: 'LD', name: 'Lakshadweep', code: 'LD', projects: 3, landProposed: 85.0, landAcquired: 72.4, compensation: 120.5, compensationPaid: 105.2, families: 140, resettled: 120, possession: 89, lat: 10.5667, lng: 72.6417 },
];

// --------------- Projects ---------------
export const projects = [
  {
    id: 'PRJ-2024-001', name: 'Mumbai–Ahmedabad High Speed Rail Corridor', shortName: 'MAHSR', category: 'Railways',
    status: 'In Progress', priority: 'High', requestingBody: 'National High Speed Rail Corporation Ltd.',
    state: 'Maharashtra, Gujarat', districts: ['Mumbai','Thane','Palghar','Valsad','Navsari','Surat','Bharuch','Vadodara','Anand','Ahmedabad'],
    landProposed: 1380.5, landAcquired: 1124.8, landPossessed: 980.2,
    compensationAssessed: 14520.6, compensationPaid: 12840.3,
    familiesAffected: 5620, familiesResettled: 4280, rrProgress: 76,
    startDate: '2018-09-14', targetDate: '2028-12-31', currentStage: 'Possession & R&R',
    notificationDate: '2017-12-15', awardDate: '2019-06-22', completionPercent: 82, lastUpdated: '2024-11-28',
    description: 'India\'s first high-speed rail corridor connecting Mumbai and Ahmedabad, spanning 508 km.',
    coordinates: { lat: 20.5, lng: 73.5 },
  },
  {
    id: 'PRJ-2024-002', name: 'Delhi–Mumbai Industrial Corridor (DMIC) Phase-II', shortName: 'DMIC-II', category: 'Industrial',
    status: 'In Progress', priority: 'High', requestingBody: 'DMIC Development Corporation',
    state: 'Rajasthan, Gujarat, Madhya Pradesh', districts: ['Jaipur','Ajmer','Kota','Neemuch','Dhar','Vadodara'],
    landProposed: 4200.0, landAcquired: 2860.4, landPossessed: 1920.6,
    compensationAssessed: 3240.8, compensationPaid: 2480.5,
    familiesAffected: 8400, familiesResettled: 4200, rrProgress: 50,
    startDate: '2020-03-01', targetDate: '2030-06-30', currentStage: 'Award & Compensation',
    notificationDate: '2019-08-10', awardDate: '2021-11-05', completionPercent: 54, lastUpdated: '2024-11-25',
    description: 'Phase-II development of Delhi-Mumbai Industrial Corridor across Rajasthan, Gujarat, and MP.',
    coordinates: { lat: 24.5, lng: 74.8 },
  },
  {
    id: 'PRJ-2024-003', name: 'Bharatmala Pariyojana – Lot 3 (NH-48 Expansion)', shortName: 'BMP-L3', category: 'Highways',
    status: 'In Progress', priority: 'Medium', requestingBody: 'National Highways Authority of India',
    state: 'Karnataka, Goa', districts: ['Belgaum','Dharwad','North Goa','South Goa'],
    landProposed: 1840.2, landAcquired: 1620.8, landPossessed: 1480.3,
    compensationAssessed: 2180.4, compensationPaid: 2060.2,
    familiesAffected: 3200, familiesResettled: 2800, rrProgress: 88,
    startDate: '2019-07-15', targetDate: '2026-12-31', currentStage: 'Possession & Construction',
    notificationDate: '2018-11-20', awardDate: '2020-03-15', completionPercent: 91, lastUpdated: '2024-11-30',
    description: 'Expansion of NH-48 connecting Karnataka and Goa under Bharatmala Pariyojana Phase-I.',
    coordinates: { lat: 15.4, lng: 74.8 },
  },
  {
    id: 'PRJ-2024-004', name: 'Jewar (Noida) International Airport', shortName: 'NIA', category: 'Aviation',
    status: 'In Progress', priority: 'Critical', requestingBody: 'Yamuna International Airport Pvt. Ltd.',
    state: 'Uttar Pradesh', districts: ['Gautam Buddha Nagar'],
    landProposed: 1334.0, landAcquired: 1334.0, landPossessed: 1280.5,
    compensationAssessed: 4520.8, compensationPaid: 4520.8,
    familiesAffected: 7200, familiesResettled: 6840, rrProgress: 95,
    startDate: '2019-11-25', targetDate: '2027-03-31', currentStage: 'R&R Implementation',
    notificationDate: '2018-04-12', awardDate: '2019-09-30', completionPercent: 96, lastUpdated: '2024-12-01',
    description: 'Development of Noida International Airport at Jewar – NCR\'s second major airport.',
    coordinates: { lat: 28.1, lng: 77.6 },
  },
  {
    id: 'PRJ-2024-005', name: 'Ken–Betwa River Interlinking Project', shortName: 'KBRLP', category: 'Irrigation',
    status: 'In Progress', priority: 'High', requestingBody: 'National Water Development Agency',
    state: 'Madhya Pradesh, Uttar Pradesh', districts: ['Panna','Chhatarpur','Tikamgarh','Banda','Mahoba'],
    landProposed: 9800.0, landAcquired: 5200.3, landPossessed: 3100.5,
    compensationAssessed: 2840.6, compensationPaid: 1920.4,
    familiesAffected: 12400, familiesResettled: 5600, rrProgress: 45,
    startDate: '2021-12-25', targetDate: '2033-12-31', currentStage: 'Acquisition & SIA',
    notificationDate: '2021-06-15', awardDate: '2023-02-28', completionPercent: 38, lastUpdated: '2024-11-20',
    description: 'First major river interlinking project connecting Ken and Betwa rivers.',
    coordinates: { lat: 24.7, lng: 80.2 },
  },
  {
    id: 'PRJ-2024-006', name: 'Polavaram Irrigation Project', shortName: 'PIP', category: 'Irrigation',
    status: 'Delayed', priority: 'Critical', requestingBody: 'Polavaram Project Authority',
    state: 'Andhra Pradesh', districts: ['Eluru','East Godavari','West Godavari'],
    landProposed: 3800.6, landAcquired: 3100.2, landPossessed: 2600.8,
    compensationAssessed: 3680.4, compensationPaid: 2840.6,
    familiesAffected: 10500, familiesResettled: 6200, rrProgress: 59,
    startDate: '2014-07-01', targetDate: '2027-06-30', currentStage: 'R&R Implementation',
    notificationDate: '2013-12-20', awardDate: '2015-08-15', completionPercent: 72, lastUpdated: '2024-11-15',
    description: 'Multi-purpose national project on River Godavari for irrigation and hydropower.',
    coordinates: { lat: 17.2, lng: 81.7 },
  },
  {
    id: 'PRJ-2024-007', name: 'Eastern Dedicated Freight Corridor (Ludhiana–Dankuni)', shortName: 'EDFC', category: 'Railways',
    status: 'In Progress', priority: 'High', requestingBody: 'Dedicated Freight Corridor Corporation',
    state: 'Punjab, Haryana, UP, Bihar, Jharkhand, WB', districts: ['Ludhiana','Ambala','Saharanpur','Mughalsarai','Dankuni'],
    landProposed: 5680.4, landAcquired: 4920.8, landPossessed: 4520.3,
    compensationAssessed: 4240.6, compensationPaid: 3920.4,
    familiesAffected: 8600, familiesResettled: 7200, rrProgress: 84,
    startDate: '2016-06-15', targetDate: '2026-06-30', currentStage: 'Possession & Construction',
    notificationDate: '2015-09-20', awardDate: '2017-12-10', completionPercent: 87, lastUpdated: '2024-11-22',
    description: 'Eastern DFC from Ludhiana to Dankuni, spanning 1856 km for freight transport.',
    coordinates: { lat: 26.0, lng: 82.0 },
  },
  {
    id: 'PRJ-2024-008', name: 'AIIMS Madurai Campus Development', shortName: 'AIIMS-MDU', category: 'Healthcare',
    status: 'Completed', priority: 'Medium', requestingBody: 'Ministry of Health & Family Welfare',
    state: 'Tamil Nadu', districts: ['Madurai'],
    landProposed: 152.4, landAcquired: 152.4, landPossessed: 152.4,
    compensationAssessed: 340.6, compensationPaid: 340.6,
    familiesAffected: 480, familiesResettled: 480, rrProgress: 100,
    startDate: '2019-01-10', targetDate: '2024-06-30', currentStage: 'Completed',
    notificationDate: '2018-05-15', awardDate: '2019-08-20', completionPercent: 100, lastUpdated: '2024-06-30',
    description: 'Campus development for AIIMS Madurai under PM\'s new AIIMS initiative.',
    coordinates: { lat: 9.9252, lng: 78.1198 },
  },
  {
    id: 'PRJ-2024-009', name: 'Hybrid Renewable Energy Park – Kutch', shortName: 'HREP-Kutch', category: 'Renewable Energy',
    status: 'In Progress', priority: 'Medium', requestingBody: 'Gujarat Power Corporation Ltd.',
    state: 'Gujarat', districts: ['Kutch'],
    landProposed: 72600.0, landAcquired: 48200.5, landPossessed: 42000.3,
    compensationAssessed: 1840.4, compensationPaid: 1620.8,
    familiesAffected: 2400, familiesResettled: 2100, rrProgress: 88,
    startDate: '2020-12-15', targetDate: '2030-12-31', currentStage: 'Phased Acquisition',
    notificationDate: '2020-03-10', awardDate: '2021-09-25', completionPercent: 66, lastUpdated: '2024-11-18',
    description: 'World\'s largest hybrid renewable energy park in Kutch, 30 GW capacity target.',
    coordinates: { lat: 23.7337, lng: 69.8597 },
  },
  {
    id: 'PRJ-2024-010', name: 'Smart City Mission – Varanasi Phase III', shortName: 'SCM-VNS', category: 'Urban Dev.',
    status: 'In Progress', priority: 'Medium', requestingBody: 'Varanasi Smart City Ltd.',
    state: 'Uttar Pradesh', districts: ['Varanasi'],
    landProposed: 280.6, landAcquired: 220.4, landPossessed: 198.2,
    compensationAssessed: 1240.8, compensationPaid: 1080.6,
    familiesAffected: 1800, familiesResettled: 1540, rrProgress: 86,
    startDate: '2021-04-01', targetDate: '2027-03-31', currentStage: 'R&R Implementation',
    notificationDate: '2020-11-05', awardDate: '2022-05-18', completionPercent: 78, lastUpdated: '2024-11-26',
    description: 'Phase III development under Smart City Mission for Varanasi.',
    coordinates: { lat: 25.3176, lng: 83.0064 },
  },
];

// --------------- Proposals ---------------
export const proposals = [
  // Maharashtra (State Officer Scope)
  {
    id: 'PROP-2024-0788',
    projectName: 'Navi Mumbai Airport – Ancillary Infrastructure',
    category: 'Aviation',
    requestingBody: 'CIDCO',
    state: 'Maharashtra',
    district: 'Raigad',
    landRequired: 680.2,
    estimatedFamilies: 2100,
    estimatedCompensation: 3420.8,
    stage: 'Declaration u/s 19 Scrutiny',
    stageCode: 7,
    submittedDate: '2024-04-22',
    lastAction: '2024-11-25',
    assignedTo: 'State Revenue Secretary, Maharashtra',
    urgency: 'Critical',
    approvalStatus: 'PENDING_STATE_SCRUTINY', // PENDING_STATE_SCRUTINY -> PENDING_CENTRAL_APPROVAL -> CENTRAL_APPROVED
    currentAuthority: 'STATE',
    gazetteOrderNo: null,
    gazetteDate: null,
    remarks: 'Field inquiry and Section 15 objection disposal report verified by Collector Raigad. Awaiting State Revenue Secretary scrutiny & formal recommendation for Central Section 19 declaration.',
    workflowHistory: [
      { step: 1, title: 'District Field Verification (Raigad)', authority: 'Collector, Raigad', action: 'PROPOSED_TO_STATE', officer: 'District Collector, Raigad', date: '2024-10-18', status: 'COMPLETED', remarks: 'Section 15 objections disposed. Cadastral maps confirmed.' },
      { step: 2, title: 'State Government Scrutiny & Statutory Recommendation', authority: 'State Revenue Secretary, Maharashtra', action: 'AWAITING_STATE_SCRUTINY', officer: 'Smt. Priya Mehta, IAS', date: '2024-11-25', status: 'IN_PROGRESS', remarks: 'Under scrutiny at Mantralaya. Ready for forwarding to Central Ministry.' },
      { step: 3, title: 'Central Ministry National Sanction & Gazette Publication', authority: 'Ministry of Rural Development (DoLR), New Delhi', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Rajesh Kumar Sharma, IAS', date: null, status: 'PENDING', remarks: 'Pending national statutory sanction.' },
    ],
  },
  {
    id: 'PROP-2024-0847',
    projectName: 'NH-44 Bypass Road – Nagpur Section',
    category: 'Highways',
    requestingBody: 'NHAI – PIU Nagpur',
    state: 'Maharashtra',
    district: 'Nagpur',
    landRequired: 245.6,
    estimatedFamilies: 840,
    estimatedCompensation: 620.4,
    stage: 'SIA Appraisal & Scrutiny',
    stageCode: 3,
    submittedDate: '2024-08-12',
    lastAction: '2024-11-15',
    assignedTo: 'State Revenue Secretary, Maharashtra',
    urgency: 'High',
    approvalStatus: 'PENDING_STATE_SCRUTINY',
    currentAuthority: 'STATE',
    gazetteOrderNo: null,
    gazetteDate: null,
    remarks: 'SIA Expert Committee appraisal submitted. Awaiting State Revenue Department scrutiny and onward transmission to Central Ministry.',
    workflowHistory: [
      { step: 1, title: 'District Requisition & SLAO Verification', authority: 'District Collector, Nagpur', action: 'PROPOSED_TO_STATE', officer: 'District Collector, Nagpur', date: '2024-10-02', status: 'COMPLETED', remarks: 'SIA report endorsed.' },
      { step: 2, title: 'State Government Scrutiny & Statutory Recommendation', authority: 'State Revenue Secretary, Maharashtra', action: 'AWAITING_STATE_SCRUTINY', officer: 'Smt. Priya Mehta, IAS', date: '2024-11-15', status: 'IN_PROGRESS', remarks: 'Under State scrutiny.' },
      { step: 3, title: 'Central Ministry National Sanction & Gazette Publication', authority: 'Ministry of Rural Development (DoLR), New Delhi', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Rajesh Kumar Sharma, IAS', date: null, status: 'PENDING', remarks: 'Pending central sanction.' },
    ],
  },

  // Gujarat / Ahmedabad (District Collector Scope)
  {
    id: 'PROP-2024-0512',
    projectName: 'Dholera SIR Expressway Link – Phase 2',
    category: 'Highways',
    requestingBody: 'NHAI & DSIRDA',
    state: 'Gujarat',
    district: 'Ahmedabad',
    landRequired: 312.4,
    estimatedFamilies: 420,
    estimatedCompensation: 520.0,
    stage: 'Joint Measurement Survey Verified',
    stageCode: 5,
    submittedDate: '2024-09-10',
    lastAction: '2024-11-28',
    assignedTo: 'District Collector, Ahmedabad',
    urgency: 'High',
    approvalStatus: 'DISTRICT_PROPOSED', // District needs to propose to State
    currentAuthority: 'DISTRICT',
    gazetteOrderNo: null,
    gazetteDate: null,
    remarks: 'Field joint measurement completed by SLAO Ahmedabad across Dholera & Dhandhuka talukas. Ready for Collectorate formal proposal to State Government.',
    workflowHistory: [
      { step: 1, title: 'District Field Verification (Ahmedabad)', authority: 'District Collector, Ahmedabad', action: 'PROPOSE_TO_STATE', officer: 'Shri Arjun Patel, IAS', date: '2024-11-28', status: 'IN_PROGRESS', remarks: 'Survey verified. Ready to propose to State Revenue Department.' },
      { step: 2, title: 'State Government Scrutiny & Statutory Recommendation', authority: 'Revenue Department, Gujarat', action: 'AWAITING_STATE_SCRUTINY', officer: 'Revenue Secretary, Gujarat', date: null, status: 'PENDING', remarks: 'Pending State receipt.' },
      { step: 3, title: 'Central Ministry National Sanction & Gazette Publication', authority: 'Ministry of Rural Development (DoLR), New Delhi', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Rajesh Kumar Sharma, IAS', date: null, status: 'PENDING', remarks: 'Pending central sanction.' },
    ],
  },
  {
    id: 'PROP-2024-0899',
    projectName: 'Ahmedabad Metro Rail Phase-2 Extension',
    category: 'Urban Transit',
    requestingBody: 'GMRC Ltd.',
    state: 'Gujarat',
    district: 'Ahmedabad',
    landRequired: 45.2,
    estimatedFamilies: 680,
    estimatedCompensation: 340.5,
    stage: 'SIA Hearing Completed',
    stageCode: 3,
    submittedDate: '2024-10-02',
    lastAction: '2024-11-26',
    assignedTo: 'District Collector, Ahmedabad',
    urgency: 'Medium',
    approvalStatus: 'DISTRICT_PROPOSED',
    currentAuthority: 'DISTRICT',
    gazetteOrderNo: null,
    gazetteDate: null,
    remarks: 'Social Impact Assessment hearing completed for Motera-Gandhinagar corridor packages. Ready for proposal to State Govt.',
    workflowHistory: [
      { step: 1, title: 'District Field Requisition (Ahmedabad)', authority: 'District Collector, Ahmedabad', action: 'PROPOSE_TO_STATE', officer: 'Shri Arjun Patel, IAS', date: '2024-11-26', status: 'IN_PROGRESS', remarks: 'Ready for submission to State.' },
      { step: 2, title: 'State Government Scrutiny & Statutory Recommendation', authority: 'Revenue Department, Gujarat', action: 'AWAITING_STATE_SCRUTINY', officer: 'Revenue Secretary, Gujarat', date: null, status: 'PENDING', remarks: 'Pending State scrutiny.' },
      { step: 3, title: 'Central Ministry National Sanction & Gazette Publication', authority: 'Ministry of Rural Development (DoLR), New Delhi', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Rajesh Kumar Sharma, IAS', date: null, status: 'PENDING', remarks: 'Pending central sanction.' },
    ],
  },

  // National Proposals (Pending Central Approval & Sanctioned)
  {
    id: 'PROP-2024-0645',
    projectName: 'Ganga Expressway – Phase II (Prayagraj–Ballia)',
    category: 'Highways',
    requestingBody: 'UPEIDA',
    state: 'Uttar Pradesh',
    district: 'Prayagraj, Jaunpur, Azamgarh, Mau, Ballia',
    landRequired: 3200.8,
    estimatedFamilies: 9800,
    estimatedCompensation: 4820.0,
    stage: 'Pending Central Sanction u/s 19',
    stageCode: 7,
    submittedDate: '2024-03-10',
    lastAction: '2024-11-28',
    assignedTo: 'Ministry of Rural Development (DoLR), New Delhi',
    urgency: 'Critical',
    approvalStatus: 'PENDING_CENTRAL_APPROVAL',
    currentAuthority: 'CENTRAL',
    gazetteOrderNo: null,
    gazetteDate: null,
    remarks: 'Scrutinized and recommended by UP Board of Revenue. Forwarded to Central Ministry (DoLR) for Section 19 statutory sanction.',
    workflowHistory: [
      { step: 1, title: 'District Collectorate Requisitions', authority: 'Collectors of 5 Districts (UP)', action: 'PROPOSED_TO_STATE', officer: 'Competent Authorities (UP)', date: '2024-08-12', status: 'COMPLETED', remarks: 'Public hearings concluded in all 5 districts.' },
      { step: 2, title: 'State Government Scrutiny & Statutory Recommendation', authority: 'Board of Revenue, Uttar Pradesh', action: 'FORWARDED_TO_CENTRE', officer: 'Principal Secretary (Revenue), UP', date: '2024-11-28', status: 'COMPLETED', remarks: 'State scrutiny complete. Recommended to Central Ministry.' },
      { step: 3, title: 'Central Ministry National Sanction & Gazette Publication', authority: 'Ministry of Rural Development (DoLR), New Delhi', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Rajesh Kumar Sharma, IAS', date: null, status: 'IN_PROGRESS', remarks: 'Pending final Central Ministry Sanction & Gazette issuance.' },
    ],
  },
  {
    id: 'PROP-2024-0912',
    projectName: 'Kochi Metro Phase-II Extension',
    category: 'Urban Transit',
    requestingBody: 'Kochi Metro Rail Ltd.',
    state: 'Kerala',
    district: 'Ernakulam',
    landRequired: 38.4,
    estimatedFamilies: 1240,
    estimatedCompensation: 1840.2,
    stage: 'Sanctioned by Central Govt',
    stageCode: 9,
    submittedDate: '2024-06-20',
    lastAction: '2024-11-22',
    assignedTo: 'Sanctioned & Gazette Issued',
    urgency: 'Medium',
    approvalStatus: 'CENTRAL_APPROVED',
    currentAuthority: 'SANCTIONED',
    gazetteOrderNo: 'CG-DL-E-2024-481920',
    gazetteDate: '2024-11-22',
    remarks: 'Section 19 Central Sanction published in Gazette of India Extraordinary. Proceeding to Section 23 Award declaration.',
    workflowHistory: [
      { step: 1, title: 'District Field Verification', authority: 'District Collector, Ernakulam', action: 'PROPOSED_TO_STATE', officer: 'Collector, Ernakulam', date: '2024-07-15', status: 'COMPLETED', remarks: 'Field verification done.' },
      { step: 2, title: 'State Government Scrutiny', authority: 'Revenue Dept, Kerala', action: 'FORWARDED_TO_CENTRE', officer: 'Secretary (Revenue), Kerala', date: '2024-09-10', status: 'COMPLETED', remarks: 'State approved and forwarded.' },
      { step: 3, title: 'Central Ministry National Sanction', authority: 'Ministry of Rural Development (DoLR)', action: 'SANCTIONED', officer: 'Dr. Rajesh Kumar Sharma, IAS', date: '2024-11-22', status: 'COMPLETED', remarks: 'Gazette notification issued: CG-DL-E-2024-481920.' },
    ],
  },
  {
    id: 'PROP-2024-1024',
    projectName: 'Industrial Township – Sri City Phase III',
    category: 'Industrial',
    requestingBody: 'APIIC',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    landRequired: 1200.0,
    estimatedFamilies: 3400,
    estimatedCompensation: 2240.6,
    stage: 'SIA Appraisal & State Scrutiny',
    stageCode: 2,
    submittedDate: '2024-09-05',
    lastAction: '2024-11-18',
    assignedTo: 'Revenue Department, Andhra Pradesh',
    urgency: 'Medium',
    approvalStatus: 'PENDING_STATE_SCRUTINY',
    currentAuthority: 'STATE',
    gazetteOrderNo: null,
    gazetteDate: null,
    remarks: 'SIA unit survey ongoing. Under evaluation at State Revenue level.',
    workflowHistory: [
      { step: 1, title: 'District Field Requisition', authority: 'Collector, Tirupati', action: 'PROPOSED_TO_STATE', officer: 'Collector, Tirupati', date: '2024-10-10', status: 'COMPLETED', remarks: 'District appraisal done.' },
      { step: 2, title: 'State Government Scrutiny', authority: 'Revenue Dept, Andhra Pradesh', action: 'AWAITING_STATE_SCRUTINY', officer: 'Principal Secretary (Revenue), AP', date: '2024-11-18', status: 'IN_PROGRESS', remarks: 'State review in progress.' },
      { step: 3, title: 'Central Ministry National Sanction', authority: 'Ministry of Rural Development (DoLR)', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Rajesh Kumar Sharma, IAS', date: null, status: 'PENDING', remarks: 'Pending central sanction.' },
    ],
  },
  {
    id: 'PROP-2024-0956',
    projectName: 'Bundelkhand Expressway – Connecting Road Package',
    category: 'Highways',
    requestingBody: 'UPEIDA',
    state: 'Uttar Pradesh',
    district: 'Chitrakoot, Hamirpur',
    landRequired: 420.5,
    estimatedFamilies: 1560,
    estimatedCompensation: 840.2,
    stage: 'Pending Central Sanction u/s 19',
    stageCode: 7,
    submittedDate: '2024-05-08',
    lastAction: '2024-11-29',
    assignedTo: 'Ministry of Rural Development (DoLR), New Delhi',
    urgency: 'High',
    approvalStatus: 'PENDING_CENTRAL_APPROVAL',
    currentAuthority: 'CENTRAL',
    gazetteOrderNo: null,
    gazetteDate: null,
    remarks: 'Forwarded by UP State Government. Awaiting Central Ministry sanction.',
    workflowHistory: [
      { step: 1, title: 'District Field Requisition', authority: 'Collector, Chitrakoot', action: 'PROPOSED_TO_STATE', officer: 'Collector, Chitrakoot', date: '2024-08-14', status: 'COMPLETED', remarks: 'Inquiry complete.' },
      { step: 2, title: 'State Government Scrutiny', authority: 'Board of Revenue, UP', action: 'FORWARDED_TO_CENTRE', officer: 'Secretary (Revenue), UP', date: '2024-11-29', status: 'COMPLETED', remarks: 'State recommended.' },
      { step: 3, title: 'Central Ministry National Sanction', authority: 'Ministry of Rural Development (DoLR)', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Rajesh Kumar Sharma, IAS', date: null, status: 'IN_PROGRESS', remarks: 'Under Central review.' },
    ],
  },
  {
    id: 'PROP-2024-1180',
    projectName: 'AIIMS Darbhanga – Campus Land',
    category: 'Healthcare',
    requestingBody: 'MoHFW',
    state: 'Bihar',
    district: 'Darbhanga',
    landRequired: 142.8,
    estimatedFamilies: 380,
    estimatedCompensation: 240.6,
    stage: 'Sanctioned by Central Govt',
    stageCode: 10,
    submittedDate: '2024-01-15',
    lastAction: '2024-11-20',
    assignedTo: 'Sanctioned & Gazette Issued',
    urgency: 'Medium',
    approvalStatus: 'CENTRAL_APPROVED',
    currentAuthority: 'SANCTIONED',
    gazetteOrderNo: 'CG-DL-E-2024-219481',
    gazetteDate: '2024-05-18',
    remarks: 'Sanction granted by Central Ministry. Compensation and land handover ongoing.',
    workflowHistory: [
      { step: 1, title: 'District Field Verification', authority: 'Collector, Darbhanga', action: 'PROPOSED_TO_STATE', officer: 'Collector, Darbhanga', date: '2024-02-10', status: 'COMPLETED', remarks: 'Site selected.' },
      { step: 2, title: 'State Government Scrutiny', authority: 'Health & Revenue Dept, Bihar', action: 'FORWARDED_TO_CENTRE', officer: 'Secretary, Bihar', date: '2024-04-12', status: 'COMPLETED', remarks: 'Endorsed to Centre.' },
      { step: 3, title: 'Central Ministry National Sanction', authority: 'Ministry of Rural Development (DoLR)', action: 'SANCTIONED', officer: 'Dr. Rajesh Kumar Sharma, IAS', date: '2024-05-18', status: 'COMPLETED', remarks: 'Sanction order published: CG-DL-E-2024-219481.' },
    ]
  },
  {
    id: 'PROP-2024-2001', projectName: 'Kanpur Metro Phase 1', category: 'Urban Transit', requestingBody: 'UPMRC', state: 'Uttar Pradesh', district: 'Kanpur',
    landRequired: 15.4, estimatedFamilies: 120, estimatedCompensation: 350.5, stage: 'Sanctioned by Central Govt', stageCode: 9,
    submittedDate: '2024-01-10', lastAction: '2024-11-20', assignedTo: 'Sanctioned & Gazette Issued', urgency: 'High',
    approvalStatus: 'CENTRAL_APPROVED', currentAuthority: 'SANCTIONED', gazetteOrderNo: 'CG-DL-E-2024-918231', gazetteDate: '2024-10-15',
    remarks: 'Gazette issued.',
    workflowHistory: [
      { step: 1, title: 'District', authority: 'Collector', action: 'PROPOSED_TO_STATE', officer: 'Collector', date: '2024-02-10', status: 'COMPLETED', remarks: 'Done.' },
      { step: 2, title: 'State', authority: 'State Rev', action: 'FORWARDED_TO_CENTRE', officer: 'Sec', date: '2024-04-12', status: 'COMPLETED', remarks: 'Done.' },
      { step: 3, title: 'Centre', authority: 'DoLR', action: 'SANCTIONED', officer: 'Dr. Sharma', date: '2024-10-15', status: 'COMPLETED', remarks: 'Done.' },
    ]
  },
  {
    id: 'PROP-2024-2002', projectName: 'Indore-Bhopal Expressway', category: 'Highways', requestingBody: 'NHAI', state: 'Madhya Pradesh', district: 'Indore',
    landRequired: 450.2, estimatedFamilies: 890, estimatedCompensation: 720.0, stage: 'SIA Scrutiny', stageCode: 3,
    submittedDate: '2024-08-10', lastAction: '2024-11-20', assignedTo: 'State Revenue Secretary', urgency: 'Medium',
    approvalStatus: 'PENDING_STATE_SCRUTINY', currentAuthority: 'STATE', gazetteOrderNo: null, gazetteDate: null,
    remarks: 'State scrutiny.',
    workflowHistory: [
      { step: 1, title: 'District', authority: 'Collector', action: 'PROPOSED_TO_STATE', officer: 'Collector', date: '2024-09-10', status: 'COMPLETED', remarks: 'Done.' },
      { step: 2, title: 'State', authority: 'State Rev', action: 'AWAITING_STATE_SCRUTINY', officer: 'Sec', date: '2024-11-20', status: 'IN_PROGRESS', remarks: 'Pending.' },
      { step: 3, title: 'Centre', authority: 'DoLR', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Sharma', date: null, status: 'PENDING', remarks: 'Pending.' },
    ]
  },
  {
    id: 'PROP-2024-2003', projectName: 'Chennai Peripheral Ring Road', category: 'Highways', requestingBody: 'TNRDC', state: 'Tamil Nadu', district: 'Kanchipuram',
    landRequired: 310.5, estimatedFamilies: 650, estimatedCompensation: 980.4, stage: 'Pending Central Sanction', stageCode: 7,
    submittedDate: '2024-05-15', lastAction: '2024-11-15', assignedTo: 'Ministry of Rural Development', urgency: 'Critical',
    approvalStatus: 'PENDING_CENTRAL_APPROVAL', currentAuthority: 'CENTRAL', gazetteOrderNo: null, gazetteDate: null,
    remarks: 'Awaiting centre.',
    workflowHistory: [
      { step: 1, title: 'District', authority: 'Collector', action: 'PROPOSED_TO_STATE', officer: 'Collector', date: '2024-07-10', status: 'COMPLETED', remarks: 'Done.' },
      { step: 2, title: 'State', authority: 'State Rev', action: 'FORWARDED_TO_CENTRE', officer: 'Sec', date: '2024-11-15', status: 'COMPLETED', remarks: 'Done.' },
      { step: 3, title: 'Centre', authority: 'DoLR', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Sharma', date: null, status: 'IN_PROGRESS', remarks: 'Under review.' },
    ]
  },
  {
    id: 'PROP-2024-2004', projectName: 'Bangalore Suburban Rail', category: 'Railways', requestingBody: 'K-RIDE', state: 'Karnataka', district: 'Bangalore Urban',
    landRequired: 85.0, estimatedFamilies: 320, estimatedCompensation: 1450.0, stage: 'Pending Central Sanction', stageCode: 7,
    submittedDate: '2024-04-12', lastAction: '2024-10-30', assignedTo: 'Ministry of Rural Development', urgency: 'High',
    approvalStatus: 'PENDING_CENTRAL_APPROVAL', currentAuthority: 'CENTRAL', gazetteOrderNo: null, gazetteDate: null,
    remarks: 'Under review.',
    workflowHistory: [
      { step: 1, title: 'District', authority: 'Collector', action: 'PROPOSED_TO_STATE', officer: 'Collector', date: '2024-06-10', status: 'COMPLETED', remarks: 'Done.' },
      { step: 2, title: 'State', authority: 'State Rev', action: 'FORWARDED_TO_CENTRE', officer: 'Sec', date: '2024-10-30', status: 'COMPLETED', remarks: 'Done.' },
      { step: 3, title: 'Centre', authority: 'DoLR', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Sharma', date: null, status: 'IN_PROGRESS', remarks: 'Under review.' },
    ]
  },
  {
    id: 'PROP-2024-2005', projectName: 'Jaipur Ring Road Phase 2', category: 'Highways', requestingBody: 'JDA', state: 'Rajasthan', district: 'Jaipur',
    landRequired: 120.4, estimatedFamilies: 280, estimatedCompensation: 410.2, stage: 'Proposed', stageCode: 1,
    submittedDate: '2024-11-01', lastAction: '2024-11-25', assignedTo: 'District Collector, Jaipur', urgency: 'Medium',
    approvalStatus: 'DISTRICT_PROPOSED', currentAuthority: 'DISTRICT', gazetteOrderNo: null, gazetteDate: null,
    remarks: 'New proposal.',
    workflowHistory: [
      { step: 1, title: 'District', authority: 'Collector', action: 'PROPOSE_TO_STATE', officer: 'Collector', date: '2024-11-25', status: 'IN_PROGRESS', remarks: 'Survey.' },
      { step: 2, title: 'State', authority: 'State Rev', action: 'AWAITING_STATE_SCRUTINY', officer: 'Sec', date: null, status: 'PENDING', remarks: 'Pending.' },
      { step: 3, title: 'Centre', authority: 'DoLR', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Sharma', date: null, status: 'PENDING', remarks: 'Pending.' },
    ]
  },
  {
    id: 'PROP-2024-2006', projectName: 'Vizag Steel Plant Expansion', category: 'Industrial', requestingBody: 'RINL', state: 'Andhra Pradesh', district: 'Visakhapatnam',
    landRequired: 650.0, estimatedFamilies: 1500, estimatedCompensation: 850.0, stage: 'Pending Central Sanction', stageCode: 7,
    submittedDate: '2023-12-10', lastAction: '2024-11-05', assignedTo: 'Ministry of Rural Development', urgency: 'High',
    approvalStatus: 'PENDING_CENTRAL_APPROVAL', currentAuthority: 'CENTRAL', gazetteOrderNo: null, gazetteDate: null,
    remarks: 'Awaiting centre.',
    workflowHistory: [
      { step: 1, title: 'District', authority: 'Collector', action: 'PROPOSED_TO_STATE', officer: 'Collector', date: '2024-03-10', status: 'COMPLETED', remarks: 'Done.' },
      { step: 2, title: 'State', authority: 'State Rev', action: 'FORWARDED_TO_CENTRE', officer: 'Sec', date: '2024-11-05', status: 'COMPLETED', remarks: 'Done.' },
      { step: 3, title: 'Centre', authority: 'DoLR', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Sharma', date: null, status: 'IN_PROGRESS', remarks: 'Under review.' },
    ]
  },
  {
    id: 'PROP-2024-2007', projectName: 'Hyderabad Pharma City', category: 'Industrial', requestingBody: 'TSIIC', state: 'Telangana', district: 'Ranga Reddy',
    landRequired: 1200.0, estimatedFamilies: 2100, estimatedCompensation: 3200.0, stage: 'Sanctioned', stageCode: 9,
    submittedDate: '2023-08-15', lastAction: '2024-09-10', assignedTo: 'Sanctioned & Gazette Issued', urgency: 'Medium',
    approvalStatus: 'CENTRAL_APPROVED', currentAuthority: 'SANCTIONED', gazetteOrderNo: 'CG-DL-E-2024-112233', gazetteDate: '2024-09-10',
    remarks: 'Sanctioned.',
    workflowHistory: [
      { step: 1, title: 'District', authority: 'Collector', action: 'PROPOSED_TO_STATE', officer: 'Collector', date: '2023-12-10', status: 'COMPLETED', remarks: 'Done.' },
      { step: 2, title: 'State', authority: 'State Rev', action: 'FORWARDED_TO_CENTRE', officer: 'Sec', date: '2024-04-05', status: 'COMPLETED', remarks: 'Done.' },
      { step: 3, title: 'Centre', authority: 'DoLR', action: 'SANCTIONED', officer: 'Dr. Sharma', date: '2024-09-10', status: 'COMPLETED', remarks: 'Done.' },
    ]
  },
  {
    id: 'PROP-2024-2008', projectName: 'Kolkata East-West Metro', category: 'Urban Transit', requestingBody: 'KMRC', state: 'West Bengal', district: 'Kolkata',
    landRequired: 25.5, estimatedFamilies: 410, estimatedCompensation: 850.5, stage: 'Proposed', stageCode: 1,
    submittedDate: '2024-11-10', lastAction: '2024-11-28', assignedTo: 'District Collector, Kolkata', urgency: 'High',
    approvalStatus: 'DISTRICT_PROPOSED', currentAuthority: 'DISTRICT', gazetteOrderNo: null, gazetteDate: null,
    remarks: 'New.',
    workflowHistory: [
      { step: 1, title: 'District', authority: 'Collector', action: 'PROPOSE_TO_STATE', officer: 'Collector', date: '2024-11-28', status: 'IN_PROGRESS', remarks: 'Survey.' },
      { step: 2, title: 'State', authority: 'State Rev', action: 'AWAITING_STATE_SCRUTINY', officer: 'Sec', date: null, status: 'PENDING', remarks: 'Pending.' },
      { step: 3, title: 'Centre', authority: 'DoLR', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Sharma', date: null, status: 'PENDING', remarks: 'Pending.' },
    ]
  },
  {
    id: 'PROP-2024-2009', projectName: 'Bhubaneswar IT Park', category: 'Industrial', requestingBody: 'IDCO', state: 'Odisha', district: 'Khordha',
    landRequired: 85.0, estimatedFamilies: 150, estimatedCompensation: 210.0, stage: 'State Scrutiny', stageCode: 3,
    submittedDate: '2024-07-20', lastAction: '2024-10-15', assignedTo: 'Revenue Secretary, Odisha', urgency: 'Medium',
    approvalStatus: 'PENDING_STATE_SCRUTINY', currentAuthority: 'STATE', gazetteOrderNo: null, gazetteDate: null,
    remarks: 'State review.',
    workflowHistory: [
      { step: 1, title: 'District', authority: 'Collector', action: 'PROPOSED_TO_STATE', officer: 'Collector', date: '2024-09-10', status: 'COMPLETED', remarks: 'Done.' },
      { step: 2, title: 'State', authority: 'State Rev', action: 'AWAITING_STATE_SCRUTINY', officer: 'Sec', date: '2024-10-15', status: 'IN_PROGRESS', remarks: 'Review.' },
      { step: 3, title: 'Centre', authority: 'DoLR', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Sharma', date: null, status: 'PENDING', remarks: 'Pending.' },
    ]
  },
  {
    id: 'PROP-2024-2010', projectName: 'Ranchi Smart City Phase 2', category: 'Urban Dev.', requestingBody: 'RSCL', state: 'Jharkhand', district: 'Ranchi',
    landRequired: 150.0, estimatedFamilies: 320, estimatedCompensation: 340.0, stage: 'State Scrutiny', stageCode: 3,
    submittedDate: '2024-06-15', lastAction: '2024-11-05', assignedTo: 'Revenue Secretary, Jharkhand', urgency: 'High',
    approvalStatus: 'PENDING_STATE_SCRUTINY', currentAuthority: 'STATE', gazetteOrderNo: null, gazetteDate: null,
    remarks: 'State review.',
    workflowHistory: [
      { step: 1, title: 'District', authority: 'Collector', action: 'PROPOSED_TO_STATE', officer: 'Collector', date: '2024-08-10', status: 'COMPLETED', remarks: 'Done.' },
      { step: 2, title: 'State', authority: 'State Rev', action: 'AWAITING_STATE_SCRUTINY', officer: 'Sec', date: '2024-11-05', status: 'IN_PROGRESS', remarks: 'Review.' },
      { step: 3, title: 'Centre', authority: 'DoLR', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Sharma', date: null, status: 'PENDING', remarks: 'Pending.' },
    ]
  },
  {
    id: 'PROP-2024-2011', projectName: 'Ludhiana Freight Terminal', category: 'Railways', requestingBody: 'DFCCIL', state: 'Punjab', district: 'Ludhiana',
    landRequired: 220.5, estimatedFamilies: 480, estimatedCompensation: 680.5, stage: 'Pending Central Sanction', stageCode: 7,
    submittedDate: '2024-02-28', lastAction: '2024-11-20', assignedTo: 'Ministry of Rural Development', urgency: 'Critical',
    approvalStatus: 'PENDING_CENTRAL_APPROVAL', currentAuthority: 'CENTRAL', gazetteOrderNo: null, gazetteDate: null,
    remarks: 'Awaiting centre.',
    workflowHistory: [
      { step: 1, title: 'District', authority: 'Collector', action: 'PROPOSED_TO_STATE', officer: 'Collector', date: '2024-05-10', status: 'COMPLETED', remarks: 'Done.' },
      { step: 2, title: 'State', authority: 'State Rev', action: 'FORWARDED_TO_CENTRE', officer: 'Sec', date: '2024-11-20', status: 'COMPLETED', remarks: 'Done.' },
      { step: 3, title: 'Centre', authority: 'DoLR', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Sharma', date: null, status: 'IN_PROGRESS', remarks: 'Review.' },
    ]
  },
  {
    id: 'PROP-2024-2012', projectName: 'Gurugram Metro Extension', category: 'Urban Transit', requestingBody: 'HMRTC', state: 'Haryana', district: 'Gurugram',
    landRequired: 35.0, estimatedFamilies: 180, estimatedCompensation: 920.0, stage: 'Sanctioned', stageCode: 9,
    submittedDate: '2023-11-10', lastAction: '2024-08-15', assignedTo: 'Sanctioned & Gazette Issued', urgency: 'Medium',
    approvalStatus: 'CENTRAL_APPROVED', currentAuthority: 'SANCTIONED', gazetteOrderNo: 'CG-DL-E-2024-334455', gazetteDate: '2024-08-15',
    remarks: 'Sanctioned.',
    workflowHistory: [
      { step: 1, title: 'District', authority: 'Collector', action: 'PROPOSED_TO_STATE', officer: 'Collector', date: '2024-01-10', status: 'COMPLETED', remarks: 'Done.' },
      { step: 2, title: 'State', authority: 'State Rev', action: 'FORWARDED_TO_CENTRE', officer: 'Sec', date: '2024-04-12', status: 'COMPLETED', remarks: 'Done.' },
      { step: 3, title: 'Centre', authority: 'DoLR', action: 'SANCTIONED', officer: 'Dr. Sharma', date: '2024-08-15', status: 'COMPLETED', remarks: 'Done.' },
    ]
  },
  {
    id: 'PROP-2024-2013', projectName: 'Raipur-Bhilai Expressway', category: 'Highways', requestingBody: 'NHAI', state: 'Chhattisgarh', district: 'Raipur',
    landRequired: 380.0, estimatedFamilies: 850, estimatedCompensation: 540.0, stage: 'Proposed', stageCode: 1,
    submittedDate: '2024-10-15', lastAction: '2024-11-10', assignedTo: 'District Collector, Raipur', urgency: 'Medium',
    approvalStatus: 'DISTRICT_PROPOSED', currentAuthority: 'DISTRICT', gazetteOrderNo: null, gazetteDate: null,
    remarks: 'New.',
    workflowHistory: [
      { step: 1, title: 'District', authority: 'Collector', action: 'PROPOSE_TO_STATE', officer: 'Collector', date: '2024-11-10', status: 'IN_PROGRESS', remarks: 'Survey.' },
      { step: 2, title: 'State', authority: 'State Rev', action: 'AWAITING_STATE_SCRUTINY', officer: 'Sec', date: null, status: 'PENDING', remarks: 'Pending.' },
      { step: 3, title: 'Centre', authority: 'DoLR', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Sharma', date: null, status: 'PENDING', remarks: 'Pending.' },
    ]
  },
  {
    id: 'PROP-2024-2014', projectName: 'Dehradun Airport Expansion', category: 'Aviation', requestingBody: 'AAI', state: 'Uttarakhand', district: 'Dehradun',
    landRequired: 145.0, estimatedFamilies: 210, estimatedCompensation: 380.0, stage: 'State Scrutiny', stageCode: 3,
    submittedDate: '2024-05-20', lastAction: '2024-11-18', assignedTo: 'Revenue Secretary, Uttarakhand', urgency: 'High',
    approvalStatus: 'PENDING_STATE_SCRUTINY', currentAuthority: 'STATE', gazetteOrderNo: null, gazetteDate: null,
    remarks: 'State review.',
    workflowHistory: [
      { step: 1, title: 'District', authority: 'Collector', action: 'PROPOSED_TO_STATE', officer: 'Collector', date: '2024-08-10', status: 'COMPLETED', remarks: 'Done.' },
      { step: 2, title: 'State', authority: 'State Rev', action: 'AWAITING_STATE_SCRUTINY', officer: 'Sec', date: '2024-11-18', status: 'IN_PROGRESS', remarks: 'Review.' },
      { step: 3, title: 'Centre', authority: 'DoLR', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Sharma', date: null, status: 'PENDING', remarks: 'Pending.' },
    ]
  },
  {
    id: 'PROP-2024-2015', projectName: 'Shimla Four-Lane Project', category: 'Highways', requestingBody: 'NHAI', state: 'Himachal Pradesh', district: 'Shimla',
    landRequired: 85.0, estimatedFamilies: 180, estimatedCompensation: 290.0, stage: 'Sanctioned', stageCode: 9,
    submittedDate: '2023-09-10', lastAction: '2024-07-20', assignedTo: 'Sanctioned & Gazette Issued', urgency: 'Medium',
    approvalStatus: 'CENTRAL_APPROVED', currentAuthority: 'SANCTIONED', gazetteOrderNo: 'CG-DL-E-2024-556677', gazetteDate: '2024-07-20',
    remarks: 'Sanctioned.',
    workflowHistory: [
      { step: 1, title: 'District', authority: 'Collector', action: 'PROPOSED_TO_STATE', officer: 'Collector', date: '2024-01-15', status: 'COMPLETED', remarks: 'Done.' },
      { step: 2, title: 'State', authority: 'State Rev', action: 'FORWARDED_TO_CENTRE', officer: 'Sec', date: '2024-04-10', status: 'COMPLETED', remarks: 'Done.' },
      { step: 3, title: 'Centre', authority: 'DoLR', action: 'SANCTIONED', officer: 'Dr. Sharma', date: '2024-07-20', status: 'COMPLETED', remarks: 'Done.' },
    ]
  },
  {
    id: 'PROP-2024-2016', projectName: 'Guwahati Ring Road', category: 'Highways', requestingBody: 'NHIDCL', state: 'Assam', district: 'Kamrup Metro',
    landRequired: 420.0, estimatedFamilies: 920, estimatedCompensation: 750.0, stage: 'Pending Central Sanction', stageCode: 7,
    submittedDate: '2024-03-15', lastAction: '2024-11-22', assignedTo: 'Ministry of Rural Development', urgency: 'High',
    approvalStatus: 'PENDING_CENTRAL_APPROVAL', currentAuthority: 'CENTRAL', gazetteOrderNo: null, gazetteDate: null,
    remarks: 'Awaiting centre.',
    workflowHistory: [
      { step: 1, title: 'District', authority: 'Collector', action: 'PROPOSED_TO_STATE', officer: 'Collector', date: '2024-07-10', status: 'COMPLETED', remarks: 'Done.' },
      { step: 2, title: 'State', authority: 'State Rev', action: 'FORWARDED_TO_CENTRE', officer: 'Sec', date: '2024-11-22', status: 'COMPLETED', remarks: 'Done.' },
      { step: 3, title: 'Centre', authority: 'DoLR', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Sharma', date: null, status: 'IN_PROGRESS', remarks: 'Review.' },
    ]
  },
  {
    id: 'PROP-2024-2017', projectName: 'Delhi Urban Extension Road', category: 'Highways', requestingBody: 'DDA', state: 'Delhi', district: 'North West Delhi',
    landRequired: 110.0, estimatedFamilies: 450, estimatedCompensation: 1850.0, stage: 'State Scrutiny', stageCode: 3,
    submittedDate: '2024-08-10', lastAction: '2024-11-25', assignedTo: 'Revenue Secretary, Delhi', urgency: 'Critical',
    approvalStatus: 'PENDING_STATE_SCRUTINY', currentAuthority: 'STATE', gazetteOrderNo: null, gazetteDate: null,
    remarks: 'State review.',
    workflowHistory: [
      { step: 1, title: 'District', authority: 'Collector', action: 'PROPOSED_TO_STATE', officer: 'Collector', date: '2024-10-15', status: 'COMPLETED', remarks: 'Done.' },
      { step: 2, title: 'State', authority: 'State Rev', action: 'AWAITING_STATE_SCRUTINY', officer: 'Sec', date: '2024-11-25', status: 'IN_PROGRESS', remarks: 'Review.' },
      { step: 3, title: 'Centre', authority: 'DoLR', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Sharma', date: null, status: 'PENDING', remarks: 'Pending.' },
    ]
  },
  {
    id: 'PROP-2024-2018', projectName: 'Jammu Ring Road', category: 'Highways', requestingBody: 'NHAI', state: 'Jammu and Kashmir', district: 'Jammu',
    landRequired: 280.0, estimatedFamilies: 610, estimatedCompensation: 450.0, stage: 'Proposed', stageCode: 1,
    submittedDate: '2024-11-05', lastAction: '2024-11-28', assignedTo: 'District Collector, Jammu', urgency: 'Medium',
    approvalStatus: 'DISTRICT_PROPOSED', currentAuthority: 'DISTRICT', gazetteOrderNo: null, gazetteDate: null,
    remarks: 'New.',
    workflowHistory: [
      { step: 1, title: 'District', authority: 'Collector', action: 'PROPOSE_TO_STATE', officer: 'Collector', date: '2024-11-28', status: 'IN_PROGRESS', remarks: 'Survey.' },
      { step: 2, title: 'State', authority: 'State Rev', action: 'AWAITING_STATE_SCRUTINY', officer: 'Sec', date: null, status: 'PENDING', remarks: 'Pending.' },
      { step: 3, title: 'Centre', authority: 'DoLR', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Sharma', date: null, status: 'PENDING', remarks: 'Pending.' },
    ]
  },
  {
    id: 'PROP-2024-2019', projectName: 'Kochi Water Metro Infra', category: 'Urban Transit', requestingBody: 'KWML', state: 'Kerala', district: 'Ernakulam',
    landRequired: 15.5, estimatedFamilies: 180, estimatedCompensation: 210.0, stage: 'Sanctioned', stageCode: 9,
    submittedDate: '2023-12-10', lastAction: '2024-09-15', assignedTo: 'Sanctioned & Gazette Issued', urgency: 'Medium',
    approvalStatus: 'CENTRAL_APPROVED', currentAuthority: 'SANCTIONED', gazetteOrderNo: 'CG-DL-E-2024-778899', gazetteDate: '2024-09-15',
    remarks: 'Sanctioned.',
    workflowHistory: [
      { step: 1, title: 'District', authority: 'Collector', action: 'PROPOSED_TO_STATE', officer: 'Collector', date: '2024-03-10', status: 'COMPLETED', remarks: 'Done.' },
      { step: 2, title: 'State', authority: 'State Rev', action: 'FORWARDED_TO_CENTRE', officer: 'Sec', date: '2024-06-12', status: 'COMPLETED', remarks: 'Done.' },
      { step: 3, title: 'Centre', authority: 'DoLR', action: 'SANCTIONED', officer: 'Dr. Sharma', date: '2024-09-15', status: 'COMPLETED', remarks: 'Done.' },
    ]
  },
  {
    id: 'PROP-2024-2020', projectName: 'Srinagar Smart City Development', category: 'Urban Dev.', requestingBody: 'SSCL', state: 'Jammu and Kashmir', district: 'Srinagar',
    landRequired: 45.0, estimatedFamilies: 290, estimatedCompensation: 520.0, stage: 'State Scrutiny', stageCode: 3,
    submittedDate: '2024-09-10', lastAction: '2024-11-20', assignedTo: 'Revenue Secretary, J&K', urgency: 'High',
    approvalStatus: 'PENDING_STATE_SCRUTINY', currentAuthority: 'STATE', gazetteOrderNo: null, gazetteDate: null,
    remarks: 'State review.',
    workflowHistory: [
      { step: 1, title: 'District', authority: 'Collector', action: 'PROPOSED_TO_STATE', officer: 'Collector', date: '2024-10-25', status: 'COMPLETED', remarks: 'Done.' },
      { step: 2, title: 'State', authority: 'State Rev', action: 'AWAITING_STATE_SCRUTINY', officer: 'Sec', date: '2024-11-20', status: 'IN_PROGRESS', remarks: 'Review.' },
      { step: 3, title: 'Centre', authority: 'DoLR', action: 'AWAITING_CENTRAL_SANCTION', officer: 'Dr. Sharma', date: null, status: 'PENDING', remarks: 'Pending.' },
    ]
  }
];

// --------------- LARR Act 2013 Workflow Stages ---------------
export const workflowStages = [
  { code: 1, name: 'Preliminary Investigation', section: 'Section 4', description: 'Initial site survey and feasibility assessment', avgDays: 30 },
  { code: 2, name: 'Social Impact Assessment', section: 'Section 4(1)', description: 'SIA study by independent agency', avgDays: 180 },
  { code: 3, name: 'SIA Appraisal by Expert Group', section: 'Section 7', description: 'Multi-disciplinary expert group reviews SIA report', avgDays: 60 },
  { code: 4, name: 'Preliminary Notification', section: 'Section 11', description: 'Gazette notification for intended acquisition', avgDays: 30 },
  { code: 5, name: 'Survey & Measurement', section: 'Section 12-13', description: 'Detailed survey, measurement and marking of land', avgDays: 90 },
  { code: 6, name: 'Hearing of Objections', section: 'Section 15', description: 'Public hearing of objections from affected persons', avgDays: 60 },
  { code: 7, name: 'Declaration', section: 'Section 19', description: 'Declaration that land is required for public purpose', avgDays: 30 },
  { code: 8, name: 'Notice to Interested Persons', section: 'Section 21', description: 'Individual notices to landowners and interested persons', avgDays: 30 },
  { code: 9, name: 'Enquiry & Award', section: 'Section 23-25', description: 'Determination of compensation and award', avgDays: 90 },
  { code: 10, name: 'Compensation & Payment', section: 'Section 26-30', description: 'Disbursement of compensation including solatium', avgDays: 60 },
  { code: 11, name: 'Taking Possession', section: 'Section 38', description: 'Physical possession of acquired land', avgDays: 30 },
  { code: 12, name: 'R&R Implementation', section: 'Chapter V & VI', description: 'Rehabilitation and resettlement of affected families', avgDays: 365 },
];

// --------------- Compensation Records (RFCTLARR Section 26-30 Determinations) ---------------
export const compensationRecords = [
  // Gujarat / Ahmedabad (Collectorate Jurisdiction & Citizen Parcel)
  { id: 'COMP-4521', project: 'Mumbai–Ahmedabad HSR', state: 'Gujarat', district: 'Ahmedabad', beneficiary: 'Shri Rameshbhai J. Patel', surveyNo: '142/A', landArea: 2.40, landType: 'Agricultural (Irrigated)', marketValue: 84.6, solatium: 84.6, totalCompensation: 179.8, status: 'Disbursed', date: '2024-09-15', mode: 'PFMS/RTGS (DBT)', transactionRef: 'RTGS/SBIN24910284719/AHM-LA' },
  { id: 'COMP-4522', project: 'Mumbai–Ahmedabad HSR', state: 'Gujarat', district: 'Ahmedabad', beneficiary: 'Kantilal M. Shah', surveyNo: '78/B', landArea: 1.80, landType: 'Commercial', marketValue: 142.8, solatium: 142.8, totalCompensation: 285.6, status: 'Disbursed', date: '2024-10-02', mode: 'PFMS/RTGS (DBT)', transactionRef: 'RTGS/BOI98214018241/AHM-LA' },
  { id: 'COMP-4535', project: 'Dholera SIR Expressway Package 1', state: 'Gujarat', district: 'Ahmedabad', beneficiary: 'Bhavsinh M. Vaghela', surveyNo: '319/2', landArea: 4.20, landType: 'Agricultural', marketValue: 68.0, solatium: 68.0, totalCompensation: 136.0, status: 'Disbursed', date: '2024-10-25', mode: 'RBI e-Kuber DBT', transactionRef: 'EKUBER/2024/GJ/110294' },
  { id: 'COMP-4536', project: 'Sanand Industrial Extension', state: 'Gujarat', district: 'Ahmedabad', beneficiary: 'Dineshbhai C. Prajapati', surveyNo: '152', landArea: 1.60, landType: 'Agricultural', marketValue: 55.0, solatium: 55.0, totalCompensation: 110.0, status: 'Disbursed', date: '2024-11-12', mode: 'PFMS/RTGS (DBT)', transactionRef: 'RTGS/HDFC8810293412/AHM-LA' },
  { id: 'COMP-4537', project: 'Ahmedabad Metro Rail Phase 2', state: 'Gujarat', district: 'Ahmedabad', beneficiary: 'Hareshbhai K. Solanki', surveyNo: '88/A', landArea: 0.90, landType: 'Commercial', marketValue: 95.0, solatium: 95.0, totalCompensation: 190.0, status: 'Pending', date: null, mode: null, transactionRef: 'Awaiting Bank KYC Verification' },
  { id: 'COMP-4538', project: 'Ahmedabad Outer Ring Road', state: 'Gujarat', district: 'Ahmedabad', beneficiary: 'Jitubhai A. Desai', surveyNo: '214/P', landArea: 1.10, landType: 'Agricultural', marketValue: 42.0, solatium: 42.0, totalCompensation: 84.0, status: 'Dispute', date: null, mode: null, transactionRef: 'Referred to LARRA u/s 64 (Title Apportionment)' },

  // Maharashtra (State Officer Jurisdiction)
  { id: 'COMP-4531', project: 'Mumbai–Ahmedabad HSR (Palghar Section)', state: 'Maharashtra', district: 'Palghar', beneficiary: 'Devendra V. Patil', surveyNo: '204/1', landArea: 2.10, landType: 'Agricultural', marketValue: 126.0, solatium: 126.0, totalCompensation: 252.0, status: 'Disbursed', date: '2024-08-14', mode: 'PFMS/RTGS (DBT)', transactionRef: 'RTGS/MAHB2408149810/PLG-LA' },
  { id: 'COMP-4532', project: 'Navi Mumbai International Airport Corridor', state: 'Maharashtra', district: 'Raigad', beneficiary: 'Suhas B. Mhatre', surveyNo: '45/2A', landArea: 1.80, landType: 'Agricultural', marketValue: 180.0, solatium: 180.0, totalCompensation: 360.0, status: 'Disbursed', date: '2024-09-22', mode: 'RBI e-Kuber DBT', transactionRef: 'EKUBER/2024/MH/481920' },
  { id: 'COMP-4533', project: 'Pune Ring Road Package 3', state: 'Maharashtra', district: 'Pune', beneficiary: 'Ananda R. Jagtap', surveyNo: '112/4', landArea: 3.00, landType: 'Agricultural', marketValue: 90.0, solatium: 90.0, totalCompensation: 180.0, status: 'Disbursed', date: '2024-10-18', mode: 'PFMS/RTGS (DBT)', transactionRef: 'RTGS/SBI2410189410/PUN-LA' },
  { id: 'COMP-4529', project: 'Navi Mumbai Airport Ancillary Link', state: 'Maharashtra', district: 'Raigad', beneficiary: 'Prakash D. More', surveyNo: '88/3B', landArea: 1.50, landType: 'Commercial', marketValue: 210.0, solatium: 210.0, totalCompensation: 420.0, status: 'Disbursed', date: '2024-11-04', mode: 'PFMS/RTGS (DBT)', transactionRef: 'RTGS/MAHB2411041920/RGD-LA' },
  { id: 'COMP-4534', project: 'DMIC Dighi Port Corridor', state: 'Maharashtra', district: 'Raigad', beneficiary: 'Ganesh S. Raut', surveyNo: '67/1', landArea: 1.20, landType: 'Agricultural', marketValue: 72.0, solatium: 72.0, totalCompensation: 144.0, status: 'Pending', date: null, mode: null, transactionRef: 'Treasury Payout Queued' },
  { id: 'COMP-4539', project: 'Thane–Borivali Twin Tunnel Approach', state: 'Maharashtra', district: 'Thane', beneficiary: 'Vijay M. Koli', surveyNo: '19/4', landArea: 0.70, landType: 'Residential', marketValue: 110.0, solatium: 110.0, totalCompensation: 220.0, status: 'Dispute', date: null, mode: null, transactionRef: 'Referred to LARRA u/s 64 (Co-sharer Objection)' },

  // Other National Projects (Pan-India Oversight)
  { id: 'COMP-4524', project: 'Bharatmala NH-48', state: 'Karnataka', district: 'Belgaum', beneficiary: 'Basavaraj S. Patil', surveyNo: '34/1A', landArea: 3.10, landType: 'Agricultural', marketValue: 48.2, solatium: 48.2, totalCompensation: 96.4, status: 'Disbursed', date: '2024-08-20', mode: 'NEFT (DBT)', transactionRef: 'NEFT/CAN2408201948/BLG' },
  { id: 'COMP-4525', project: 'Jewar Airport', state: 'Uttar Pradesh', district: 'G.B. Nagar', beneficiary: 'Suresh Kumar Yadav', surveyNo: '892', landArea: 1.20, landType: 'Residential', marketValue: 186.0, solatium: 186.0, totalCompensation: 372.0, status: 'Disbursed', date: '2024-07-18', mode: 'RTGS (DBT)', transactionRef: 'RTGS/PNB2407188491/GBN' },
  { id: 'COMP-4528', project: 'Polavaram Project', state: 'Andhra Pradesh', district: 'Eluru', beneficiary: 'K. Venkatesh Rao', surveyNo: '523', landArea: 2.80, landType: 'Agricultural', marketValue: 44.8, solatium: 44.8, totalCompensation: 89.6, status: 'Disbursed', date: '2024-11-05', mode: 'NEFT (DBT)', transactionRef: 'NEFT/APGVB24110519/ELR' },
  { id: 'COMP-4530', project: 'EDFC Freight Corridor', state: 'Uttar Pradesh', district: 'Prayagraj', beneficiary: 'Akhilesh Tiwari', surveyNo: '312/1', landArea: 2.00, landType: 'Agricultural', marketValue: 36.0, solatium: 36.0, totalCompensation: 72.0, status: 'Disbursed', date: '2024-10-28', mode: 'RTGS (DBT)', transactionRef: 'RTGS/BARB24102819/PRY' },
  { id: 'COMP-4523', project: 'DMIC Phase-II', state: 'Rajasthan', district: 'Jaipur', beneficiary: 'Gopal Singh Shekhawat', surveyNo: '256', landArea: 5.20, landType: 'Agricultural', marketValue: 62.4, solatium: 62.4, totalCompensation: 124.8, status: 'Pending', date: null, mode: null, transactionRef: 'Notice u/s 21 Issued' },
  { id: 'COMP-4527', project: 'Ganga Expressway Ph-II', state: 'Uttar Pradesh', district: 'Prayagraj', beneficiary: 'Munni Devi', surveyNo: '167/A', landArea: 0.80, landType: 'Agricultural', marketValue: 28.4, solatium: 28.4, totalCompensation: 56.8, status: 'Dispute', date: null, mode: null, transactionRef: 'Referred to LARRA u/s 64' },
  { id: 'COMP-5001', project: 'Kanpur Metro', state: 'Uttar Pradesh', district: 'Kanpur', beneficiary: 'Amit Kumar', surveyNo: '101', landArea: 0.5, landType: 'Urban', marketValue: 50.0, solatium: 50.0, totalCompensation: 100.0, status: 'Disbursed', date: '2024-11-01', mode: 'DBT', transactionRef: 'TXN1001' },
  { id: 'COMP-5002', project: 'Indore-Bhopal Exp', state: 'Madhya Pradesh', district: 'Indore', beneficiary: 'Sunil Singh', surveyNo: '102', landArea: 1.2, landType: 'Agricultural', marketValue: 30.0, solatium: 30.0, totalCompensation: 60.0, status: 'Pending', date: null, mode: null, transactionRef: 'Pending' },
  { id: 'COMP-5003', project: 'Chennai PRR', state: 'Tamil Nadu', district: 'Kanchipuram', beneficiary: 'Ramesh Krishnan', surveyNo: '103', landArea: 0.8, landType: 'Agricultural', marketValue: 40.0, solatium: 40.0, totalCompensation: 80.0, status: 'Dispute', date: null, mode: null, transactionRef: 'Dispute' },
  { id: 'COMP-5004', project: 'Bangalore Rail', state: 'Karnataka', district: 'Bangalore Urban', beneficiary: 'Ravi Reddy', surveyNo: '104', landArea: 0.3, landType: 'Urban', marketValue: 80.0, solatium: 80.0, totalCompensation: 160.0, status: 'Disbursed', date: '2024-11-05', mode: 'DBT', transactionRef: 'TXN1004' },
  { id: 'COMP-5005', project: 'Jaipur Ring Road', state: 'Rajasthan', district: 'Jaipur', beneficiary: 'Mohan Lal', surveyNo: '105', landArea: 1.5, landType: 'Agricultural', marketValue: 25.0, solatium: 25.0, totalCompensation: 50.0, status: 'Pending', date: null, mode: null, transactionRef: 'Pending' },
  { id: 'COMP-5006', project: 'Vizag Steel', state: 'Andhra Pradesh', district: 'Visakhapatnam', beneficiary: 'K Rao', surveyNo: '106', landArea: 2.0, landType: 'Agricultural', marketValue: 45.0, solatium: 45.0, totalCompensation: 90.0, status: 'Disbursed', date: '2024-11-10', mode: 'DBT', transactionRef: 'TXN1006' },
  { id: 'COMP-5007', project: 'Hyd Pharma', state: 'Telangana', district: 'Ranga Reddy', beneficiary: 'Srinivas G', surveyNo: '107', landArea: 1.0, landType: 'Agricultural', marketValue: 35.0, solatium: 35.0, totalCompensation: 70.0, status: 'Disbursed', date: '2024-11-12', mode: 'DBT', transactionRef: 'TXN1007' },
  { id: 'COMP-5008', project: 'Kolkata Metro', state: 'West Bengal', district: 'Kolkata', beneficiary: 'S Das', surveyNo: '108', landArea: 0.2, landType: 'Urban', marketValue: 60.0, solatium: 60.0, totalCompensation: 120.0, status: 'Pending', date: null, mode: null, transactionRef: 'Pending' },
  { id: 'COMP-5009', project: 'Bhubaneswar IT', state: 'Odisha', district: 'Khordha', beneficiary: 'Mishra Ji', surveyNo: '109', landArea: 0.6, landType: 'Urban', marketValue: 20.0, solatium: 20.0, totalCompensation: 40.0, status: 'Dispute', date: null, mode: null, transactionRef: 'Dispute' },
  { id: 'COMP-5010', project: 'Ranchi Smart City', state: 'Jharkhand', district: 'Ranchi', beneficiary: 'Suresh M', surveyNo: '110', landArea: 0.9, landType: 'Urban', marketValue: 30.0, solatium: 30.0, totalCompensation: 60.0, status: 'Disbursed', date: '2024-11-15', mode: 'DBT', transactionRef: 'TXN1010' },
];

// --------------- R&R Records ---------------
export const rrRecords = [
  { id: 'RR-001', project: 'Mumbai–Ahmedabad HSR', state: 'Gujarat', family: 'Patel Family (4 members)', originalVillage: 'Vasna, Ahmedabad', resettlementSite: 'MAHSR Colony, Sanand', housingProvided: true, employmentAssistance: true, annuity: true, status: 'Resettled', dateCompleted: '2024-03-15' },
  { id: 'RR-002', project: 'Jewar Airport', state: 'Uttar Pradesh', family: 'Yadav Family (6 members)', originalVillage: 'Rohi, G.B. Nagar', resettlementSite: 'NIA Township, Sector-32', housingProvided: true, employmentAssistance: true, annuity: true, status: 'Resettled', dateCompleted: '2024-05-20' },
  { id: 'RR-003', project: 'Polavaram Project', state: 'Andhra Pradesh', family: 'Rao Family (5 members)', originalVillage: 'Devipatnam, E. Godavari', resettlementSite: 'Polavaram R&R Colony-II', housingProvided: true, employmentAssistance: false, annuity: true, status: 'In Progress', dateCompleted: null },
  { id: 'RR-004', project: 'Ken-Betwa RLP', state: 'Madhya Pradesh', family: 'Ahirwar Family (7 members)', originalVillage: 'Madla, Panna', resettlementSite: 'Pending Allocation', housingProvided: false, employmentAssistance: false, annuity: false, status: 'Pending', dateCompleted: null },
  { id: 'RR-005', project: 'DMIC Phase-II', state: 'Rajasthan', family: 'Shekhawat Family (3 members)', originalVillage: 'Bagru, Jaipur', resettlementSite: 'DMIC R&R Site, Sanganer', housingProvided: true, employmentAssistance: true, annuity: false, status: 'Resettled', dateCompleted: '2024-08-10' },
  { id: 'RR-006', project: 'Ganga Exp. Ph-II', state: 'Uttar Pradesh', family: 'Devi Family (4 members)', originalVillage: 'Kara, Prayagraj', resettlementSite: 'Under Survey', housingProvided: false, employmentAssistance: false, annuity: false, status: 'Assessment', dateCompleted: null },
  { id: 'RR-007', project: 'EDFC', state: 'Bihar', family: 'Kumar Family (5 members)', originalVillage: 'Aurangabad', resettlementSite: 'DFC Colony, Sasaram', housingProvided: true, employmentAssistance: true, annuity: true, status: 'Resettled', dateCompleted: '2024-01-22' },
  { id: 'RR-008', project: 'Navi Mumbai Airport', state: 'Maharashtra', family: 'More Family (4 members)', originalVillage: 'Ulwe, Raigad', resettlementSite: 'CIDCO R&R Complex, Panvel', housingProvided: true, employmentAssistance: true, annuity: true, status: 'In Progress', dateCompleted: null },
];

// --------------- Documents ---------------
export const documents = [
  { id: 'DOC-001', name: 'SIA Report – NH-44 Bypass Nagpur', type: 'SIA Report', project: 'NH-44 Bypass Road', format: 'PDF', size: '4.2 MB', uploadedBy: 'SIA Consultant, MH', uploadDate: '2024-11-10', version: '2.1', status: 'Under Review' },
  { id: 'DOC-002', name: 'Section 11 Gazette Notification – Kochi Metro', type: 'Gazette Notification', project: 'Kochi Metro Phase-II', format: 'PDF', size: '1.8 MB', uploadedBy: 'Revenue Dept, Kerala', uploadDate: '2024-11-22', version: '1.0', status: 'Published' },
  { id: 'DOC-003', name: 'Compensation Sheet – MAHSR Gujarat', type: 'Compensation Sheet', project: 'Mumbai–Ahmedabad HSR', format: 'XLSX', size: '8.6 MB', uploadedBy: 'LAO, Ahmedabad', uploadDate: '2024-10-15', version: '3.4', status: 'Approved' },
  { id: 'DOC-004', name: 'R&R Scheme – Polavaram Project', type: 'R&R Scheme', project: 'Polavaram Project', format: 'PDF', size: '12.4 MB', uploadedBy: 'R&R Commissioner, AP', uploadDate: '2024-09-28', version: '5.0', status: 'Approved' },
  { id: 'DOC-005', name: 'Expert Group Report – Sri City Ph III', type: 'Expert Report', project: 'Sri City Phase III', format: 'PDF', size: '3.1 MB', uploadedBy: 'Expert Committee, AP', uploadDate: '2024-11-05', version: '1.0', status: 'Under Review' },
  { id: 'DOC-006', name: 'Survey Data – Ganga Expressway', type: 'Survey Report', project: 'Ganga Exp. Ph-II', format: 'ZIP', size: '24.8 MB', uploadedBy: 'Survey Team, UPEIDA', uploadDate: '2024-11-18', version: '2.0', status: 'Verified' },
  { id: 'DOC-007', name: 'Section 19 Declaration – NMIA', type: 'Declaration', project: 'Navi Mumbai Airport', format: 'PDF', size: '2.4 MB', uploadedBy: 'Collector, Raigad', uploadDate: '2024-11-25', version: '1.0', status: 'Published' },
  { id: 'DOC-008', name: 'Award Order – Bundelkhand Expressway', type: 'Award Order', project: 'Bundelkhand Exp.', format: 'PDF', size: '6.8 MB', uploadedBy: 'LAO, Chitrakoot', uploadDate: '2024-11-29', version: '1.2', status: 'Draft' },
  { id: 'DOC-009', name: 'Cadastral Map – Jewar Airport Zone', type: 'Cadastral Map', project: 'Jewar Airport', format: 'GeoTIFF', size: '48.2 MB', uploadedBy: 'Survey of India', uploadDate: '2024-06-15', version: '1.0', status: 'Verified' },
  { id: 'DOC-010', name: 'Environmental Clearance – Ken-Betwa', type: 'Clearance Certificate', project: 'Ken-Betwa RLP', format: 'PDF', size: '5.6 MB', uploadedBy: 'MoEF&CC', uploadDate: '2024-08-20', version: '1.0', status: 'Approved' },
];

// --------------- Monthly Progress (Charts) ---------------
export const monthlyProgress = [
  { month: 'Jan', landAcquired: 4200, compensation: 2840, families: 8400, notifications: 185, awards: 142 },
  { month: 'Feb', landAcquired: 3800, compensation: 3120, families: 7200, notifications: 168, awards: 156 },
  { month: 'Mar', landAcquired: 5600, compensation: 4280, families: 11200, notifications: 224, awards: 198 },
  { month: 'Apr', landAcquired: 4800, compensation: 3640, families: 9600, notifications: 196, awards: 168 },
  { month: 'May', landAcquired: 5200, compensation: 3980, families: 10400, notifications: 210, awards: 182 },
  { month: 'Jun', landAcquired: 6400, compensation: 4520, families: 12800, notifications: 248, awards: 214 },
  { month: 'Jul', landAcquired: 7200, compensation: 5100, families: 14400, notifications: 264, awards: 228 },
  { month: 'Aug', landAcquired: 6800, compensation: 4840, families: 13600, notifications: 242, awards: 208 },
  { month: 'Sep', landAcquired: 7600, compensation: 5420, families: 15200, notifications: 278, awards: 242 },
  { month: 'Oct', landAcquired: 8200, compensation: 5840, families: 16400, notifications: 296, awards: 258 },
  { month: 'Nov', landAcquired: 9400, compensation: 6240, families: 18800, notifications: 312, awards: 274 },
  { month: 'Dec', landAcquired: 8800, compensation: 5920, families: 17600, notifications: 288, awards: 262 },
];

// --------------- Category-wise Acquisition ---------------
export const categoryData = [
  { name: 'Highways', projects: 312, landAcquired: 28400, fill: '#1a2670' },
  { name: 'Railways', projects: 124, landAcquired: 18200, fill: '#3b4de8' },
  { name: 'Industrial', projects: 98, landAcquired: 14600, fill: '#f07008' },
  { name: 'Irrigation', projects: 76, landAcquired: 8400, fill: '#138808' },
  { name: 'Urban Dev.', projects: 64, landAcquired: 4200, fill: '#7c3aed' },
  { name: 'Renewable Energy', projects: 42, landAcquired: 2800, fill: '#0891b2' },
  { name: 'Aviation', projects: 28, landAcquired: 1200, fill: '#dc2626' },
  { name: 'Healthcare', projects: 18, landAcquired: 400, fill: '#ea580c' },
  { name: 'Others', projects: 85, landAcquired: 232, fill: '#6b7280' },
];

// --------------- Notifications ---------------
export const notificationItems = [
  { id: 'N-001', type: 'approval', title: 'SIA Report Pending Approval', message: 'SIA report for NH-44 Bypass Nagpur requires Expert Group appraisal.', project: 'NH-44 Bypass Road', timestamp: '2024-11-30T10:30:00', read: false, priority: 'high' },
  { id: 'N-002', type: 'deadline', title: 'Award Deadline Approaching', message: 'Section 25 Award for Bundelkhand Expressway – 18 days remaining.', project: 'Bundelkhand Exp.', timestamp: '2024-11-29T14:15:00', read: false, priority: 'critical' },
  { id: 'N-003', type: 'update', title: 'Compensation Disbursed', message: '₹285.6 Lakhs compensation disbursed to Kantilal M. Shah (MAHSR).', project: 'Mumbai–Ahmedabad HSR', timestamp: '2024-11-28T09:45:00', read: true, priority: 'normal' },
  { id: 'N-004', type: 'alert', title: 'Objection Filed', message: '12 new objections filed for Ganga Expressway in Azamgarh district.', project: 'Ganga Exp. Ph-II', timestamp: '2024-11-27T16:20:00', read: false, priority: 'high' },
  { id: 'N-005', type: 'milestone', title: 'Milestone Achieved', message: 'Bharatmala NH-48 achieved 90% land possession milestone.', project: 'Bharatmala NH-48', timestamp: '2024-11-26T11:00:00', read: true, priority: 'normal' },
  { id: 'N-006', type: 'system', title: 'Document Updated', message: 'R&R Scheme for Polavaram Project updated to v5.0.', project: 'Polavaram Project', timestamp: '2024-11-25T13:30:00', read: true, priority: 'low' },
  { id: 'N-007', type: 'approval', title: 'Declaration Approved', message: 'Section 19 Declaration for NMIA ancillary infra approved.', project: 'Navi Mumbai Airport', timestamp: '2024-11-25T10:00:00', read: true, priority: 'normal' },
  { id: 'N-008', type: 'deadline', title: 'R&R Timeline Alert', message: 'Ken-Betwa R&R resettlement in Panna is behind schedule by 45 days.', project: 'Ken-Betwa RLP', timestamp: '2024-11-24T15:45:00', read: false, priority: 'high' },
];

// --------------- Helper Functions ---------------
export function getStatusColor(status) {
  const map = {
    'Completed': 'badge-success', 'In Progress': 'badge-info', 'Delayed': 'badge-danger',
    'Pending': 'badge-warning', 'Disbursed': 'badge-success', 'Processing': 'badge-info',
    'Under Review': 'badge-warning', 'Dispute': 'badge-danger', 'Published': 'badge-success',
    'Approved': 'badge-success', 'Verified': 'badge-success', 'Draft': 'badge-neutral',
    'Resettled': 'badge-success', 'Assessment': 'badge-warning', 'Critical': 'badge-danger',
    'High': 'badge-warning', 'Medium': 'badge-info', 'Low': 'badge-neutral',
  };
  return map[status] || 'badge-neutral';
}

export function formatCurrency(crores) {
  if (crores >= 1000) return `₹${(crores / 1000).toFixed(2)}K Cr`;
  if (crores >= 1) return `₹${crores.toFixed(2)} Cr`;
  return `₹${(crores * 100).toFixed(1)} L`;
}

export function formatArea(hectares) {
  if (hectares >= 10000) return `${(hectares / 1000).toFixed(1)}K Ha`;
  if (hectares >= 1000) return `${(hectares / 1000).toFixed(1)}K Ha`;
  return `${hectares.toFixed(1)} Ha`;
}

export function formatNumber(num) {
  if (num >= 100000) return `${(num / 100000).toFixed(2)} L`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString('en-IN');
}

// =============================================================================
// Role-Specific Datasets: State, District, Agency, Citizen
// =============================================================================

// --------------- 1. State Level: Maharashtra Revenue & Land Reforms ---------------
export const maharashtraStateData = {
  stateName: 'Maharashtra',
  stateCode: 'MH',
  totalDistricts: 36,
  activeDistricts: 28,
  stats: {
    totalProjects: 98,
    activeProjects: 72,
    landProposed: 15200.8,
    landAcquired: 11200.6,
    landPossessed: 8940.4,
    compensationAssessed: 8450.3,
    compensationDisbursed: 7320.1,
    pendingCompensation: 1130.2,
    familiesAffected: 22100,
    familiesResettled: 16800,
    possessionRate: 78.5,
    pendingStateApprovals: 34,
    noticesIssuedSec19: 58,
  },
  districts: [
    { name: 'Pune', projects: 18, landProposed: 3240.5, landAcquired: 2820.2, compensation: 2140.0, paid: 1980.5, families: 5400, resettled: 4600, possession: 87 },
    { name: 'Mumbai Suburban', projects: 14, landProposed: 620.4, landAcquired: 580.1, compensation: 2850.2, paid: 2640.8, families: 4200, resettled: 3950, possession: 93 },
    { name: 'Thane', projects: 12, landProposed: 1840.2, landAcquired: 1450.6, compensation: 1240.4, paid: 1080.2, families: 3100, resettled: 2400, possession: 78 },
    { name: 'Palghar', projects: 11, landProposed: 2100.8, landAcquired: 1620.4, compensation: 980.6, paid: 810.4, families: 2800, resettled: 2050, possession: 77 },
    { name: 'Raigad', projects: 15, landProposed: 2450.0, landAcquired: 1890.3, compensation: 1120.5, paid: 940.1, families: 3400, resettled: 2600, possession: 77 },
    { name: 'Nagpur', projects: 9, landProposed: 1650.4, landAcquired: 1220.8, compensation: 540.2, paid: 480.6, families: 1800, resettled: 1420, possession: 73 },
    { name: 'Nashik', projects: 8, landProposed: 1420.2, landAcquired: 940.5, compensation: 420.8, paid: 360.2, families: 1400, resettled: 980, possession: 66 },
    { name: 'Chhatrapati Sambhajinagar', projects: 6, landProposed: 980.6, landAcquired: 680.2, compensation: 320.4, paid: 280.5, families: 1100, resettled: 800, possession: 69 },
  ],
  stateProjects: [
    { id: 'PRJ-2024-001', name: 'Mumbai–Ahmedabad High Speed Rail (Maharashtra Section)', shortName: 'MAHSR-MH', districts: 'Mumbai, Thane, Palghar', landAcquired: 432.5, totalLand: 480.0, progress: 90, status: 'Possession' },
    { id: 'PRJ-2024-008', name: 'Navi Mumbai International Airport Ancillary Corridor', shortName: 'NMIA-AC', districts: 'Raigad, Thane', landAcquired: 680.2, totalLand: 710.0, progress: 95, status: 'R&R' },
    { id: 'PROP-2024-0847', name: 'NH-44 Bypass Road – Nagpur Section', shortName: 'NH-44 Nagpur', districts: 'Nagpur', landAcquired: 180.4, totalLand: 245.6, progress: 73, status: 'SIA Review' },
    { id: 'PRJ-2024-002', name: 'DMIC Dighi Port Industrial Area Package 1', shortName: 'DMIC-Dighi', districts: 'Raigad', landAcquired: 920.0, totalLand: 1450.0, progress: 63, status: 'Award' },
  ],
  pendingActions: [
    { id: 'SA-01', title: 'SIA Expert Committee Approval', project: 'NH-44 Bypass Nagpur', dateDue: '2024-12-05', urgency: 'High' },
    { id: 'SA-02', title: 'Section 19 Declaration Publication', project: 'Navi Mumbai Metro Line 2', dateDue: '2024-12-08', urgency: 'Critical' },
    { id: 'SA-03', title: 'State Solatium & Multiplier Gazetting', project: 'DMIC Dighi Corridor', dateDue: '2024-12-14', urgency: 'Medium' },
  ]
};

// --------------- 2. District Level: Collectorate Ahmedabad, Gujarat ---------------
export const ahmedabadDistrictData = {
  districtName: 'Ahmedabad',
  stateName: 'Gujarat',
  collectorName: 'Shri Arjun Patel, IAS',
  totalTalukas: 10,
  villagesCovered: 556,
  stats: {
    totalProjects: 14,
    activeAcquisitions: 11,
    landProposed: 1680.5,
    landAcquired: 1340.2,
    landPossessed: 1180.4,
    compensationAssessed: 1820.4,
    compensationDisbursed: 1640.8,
    pendingCompensation: 179.6,
    familiesAffected: 4820,
    familiesResettled: 4240,
    possessionRate: 88.0,
    pendingHearingsSec15: 9,
    awardsToDeclareSec23: 4,
  },
  talukas: [
    { name: 'Sanand', schemes: 4, landProposed: 420.5, landAcquired: 380.2, compPaid: 440.5, families: 1420, possession: 90, surveyor: 'R. K. Zala (Talati)' },
    { name: 'Daskroi', schemes: 3, landProposed: 360.2, landAcquired: 320.4, compPaid: 380.2, families: 1180, possession: 88, surveyor: 'M. S. Chauhan' },
    { name: 'Dholka', schemes: 3, landProposed: 410.8, landAcquired: 310.5, compPaid: 310.8, families: 940, possession: 75, surveyor: 'P. D. Vaghela' },
    { name: 'Viramgam', schemes: 2, landProposed: 240.2, landAcquired: 180.6, compPaid: 210.4, families: 680, possession: 75, surveyor: 'S. N. Solanki' },
    { name: 'Bavla', schemes: 1, landProposed: 150.4, landAcquired: 120.2, compPaid: 180.0, families: 420, possession: 80, surveyor: 'K. B. Desai' },
    { name: 'Detroj', schemes: 1, landProposed: 98.4, landAcquired: 28.3, compPaid: 90.5, families: 180, possession: 28, surveyor: 'A. H. Barot' },
  ],
  collectorTasks: [
    { id: 'TSK-AHM-01', title: 'Conduct Public Hearing u/s 15 for 18 Village Objections', village: 'Vasna & Kasindra (Daskroi)', deadline: '04 Dec 2024', status: 'Scheduled' },
    { id: 'TSK-AHM-02', title: 'Sign Section 23 Award Declaration for 42 Khatas', village: 'Rampur (Sanand)', deadline: '08 Dec 2024', status: 'Draft Ready' },
    { id: 'TSK-AHM-03', title: 'Execute Physical Possession Warrants u/s 38', village: 'Dholka Rural Sector 4', deadline: '12 Dec 2024', status: 'Police Escort Requested' },
    { id: 'TSK-AHM-04', title: 'Release DBT Direct Credit Batch #88 (₹14.2 Cr)', village: 'Sanand Industrial Belt', deadline: '02 Dec 2024', status: 'Pending Approval' },
  ]
};

// --------------- 3. Project Implementing Agency: NHAI ---------------
export const nhaiAgencyData = {
  agencyName: 'National Highways Authority of India (NHAI)',
  nodalMinistry: 'Ministry of Road Transport & Highways (MoRTH)',
  officerName: 'Er. Vikram Singh (Chief Project Director)',
  stats: {
    totalPackages: 312,
    activePackages: 248,
    landRequisitioned: 32400.0,
    landPossessedByNHAI: 28400.0,
    pendingCALAPossession: 4000.0,
    capitalDepositedCALA: 21400.0,
    capitalDisbursedToLandowners: 18940.0,
    possessionHandoverRate: 87.6,
    activeArbitrations: 42,
    rowClearancePercent: 89.2,
  },
  keyCorridors: [
    { name: 'Bharatmala Lot 3 (NH-48 Corridor Expansion)', lengthKm: 280, landTarget: 1840.2, landPossessed: 1620.8, status: 'Civil Works 82% Completed', rowStatus: 'Clear' },
    { name: 'NH-44 Bypass Road – Nagpur Urban Expressway Link', lengthKm: 42, landTarget: 245.6, landPossessed: 180.4, status: 'SIA Appraisal In Progress', rowStatus: 'Partial' },
    { name: 'Delhi–Mumbai Expressway Connector Packages', lengthKm: 340, landTarget: 4120.0, landPossessed: 3980.0, status: 'Paving Stage', rowStatus: 'Clear' },
    { name: 'Ganga Expressway Spur Links (Packages 7 & 8)', lengthKm: 110, landTarget: 890.5, landPossessed: 620.0, status: 'Joint Measurement Survey', rowStatus: 'Under Measurement' },
  ],
  calaDeposits: [
    { calaOffice: 'CALA & SDM, Nagpur (NH-44)', deposited: 620.4, disbursed: 480.0, balance: 140.4, status: 'Disbursement Active' },
    { calaOffice: 'CALA & Competent Authority, Belgaum (NH-48)', deposited: 1420.0, disbursed: 1380.2, balance: 39.8, status: '98% Complete' },
    { calaOffice: 'CALA & SDM, North Goa (NH-48)', deposited: 760.4, disbursed: 680.0, balance: 80.4, status: 'Ongoing' },
    { calaOffice: 'CALA & ADM (Land), Prayagraj', deposited: 1840.0, disbursed: 1420.0, balance: 420.0, status: 'Hearing Objections' },
  ]
};

// --------------- 4. Citizen / Affected Landowner Portal ---------------
export const citizenData = {
  landownerName: 'Shri Rameshbhai J. Patel',
  aadhaarMasked: 'XXXX-XXXX-4819',
  panMasked: 'ABCPXXXX9F',
  mobile: '+91-9825xxxx12',
  bankAccount: {
    bankName: 'State Bank of India',
    branch: 'Sanand Branch, Ahmedabad',
    accountMasked: '*******4921',
    ifsc: 'SBIN0001234',
    dbtStatus: 'Aadhaar Seeded & Active',
  },
  landParcel: {
    surveyNumber: '142/A',
    khataNumber: '882',
    village: 'Vasna',
    taluka: 'Daskroi',
    district: 'Ahmedabad',
    state: 'Gujarat',
    totalAreaAcquired: '2.40 Hectares (approx 5.93 Acres)',
    landClassification: 'Jirayat (Irrigated Agricultural - Double Crop)',
    projectAssociated: 'Mumbai–Ahmedabad High Speed Rail (MAHSR Bullet Train)',
    acquiringAuthority: 'National High Speed Rail Corporation Ltd. (NHSRCL) & Collectorate Ahmedabad',
    currentStage: 'Possession Delivered u/s 38 & 100% Compensation Credited',
    possessionHandoverDate: '18 October 2024',
  },
  compensationBreakdown: {
    awardId: 'AWD-2024-AHM-089',
    awardDate: '22 June 2024',
    basicMarketValue: 8460000, // 84.6 Lakhs
    multiplierFactor: '1.0x (Urban Proximity Zone II)',
    solatiumAmount: 8460000, // 100% Solatium under LARR Act 2013 First Schedule
    additionalMarketValue12Percent: 820000, // 12% per annum from Sec 4 to Award
    standingCropsAndTrees: 240000,
    totalGrossCompensation: 17980000, // ₹1,79,80,000 (1.79 Cr)
    tdsDeducted: 0, // Nil TDS as per Section 96 of LARR Act 2013 (Exempt)
    netAmountPaid: 17980000,
    paymentStatus: 'Disbursed via Direct Benefit Transfer (DBT)',
    transactionRef: 'RTGS/SBIN24910284719/AHM-LA',
    creditedDate: '15 September 2024',
  },
  rrEntitlements: {
    schemeName: 'Second Schedule LARR Act 2013 Resettlement Package',
    residentialPlotAllotted: 'Plot No. 42, MAHSR Resettlement Township, Sanand (250 sq. meters)',
    plotPossessionStatus: 'Handed Over with Registered Sanad',
    subsistenceAllowance: '₹36,000 per month for 12 months (Total ₹4,32,000) - Paid in full',
    oneTimeResettlementGrant: '₹50,000 - Credited',
    cattleShedAllowance: '₹25,000 - Credited',
    livelihoodAssistance: 'Vocational Training Certificate issued to son (Kishore Patel, ITI Solar Technician)',
  },
  officialDocuments: [
    { title: 'Section 11 Preliminary Notification (Gazette Copy)', size: '1.4 MB', date: '15-Dec-2023', status: 'Verified' },
    { title: 'Section 19 Final Declaration Notice', size: '2.1 MB', date: '10-Apr-2024', status: 'Verified' },
    { title: 'Collector Final Award Order u/s 23 (with Survey Map)', size: '4.8 MB', date: '22-Jun-2024', status: 'Signed & Sealed' },
    { title: 'Treasury Direct Credit (DBT) Payment Voucher', size: '0.8 MB', date: '15-Sep-2024', status: 'Paid' },
    { title: 'R&R Plot Allotment Sanad & Possession Letter', size: '3.2 MB', date: '18-Oct-2024', status: 'Allotted' },
  ],
  grievances: [
    { id: 'GRV-2024-884', subject: 'Measurement confirmation of boundary line on northern parcel', filedDate: '12-Jul-2024', resolvedDate: '28-Jul-2024', status: 'Resolved (Joint re-survey verified 2.40 Ha area)', officer: 'Dy. Collector (Land Acquisition) Ahmedabad' }
  ]
};

