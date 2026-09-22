export type UserRole = 
  | 'CENTRAL_NODAL'       // Joint Secretary / MoRTH / NIC Nodal Officer
  | 'CALA_COLLECTOR'      // Competent Authority for Land Acquisition / District Collector
  | 'REQUIRING_BODY'      // NHAI / DFC / PGCIL Project Director
  | 'SURVEY_OFFICER'      // Tehsildar / Cadastral Surveyor
  | 'CITIZEN_LANDOWNER';  // Affected Landowner / Khatedar

export interface AuthUser {
  id: string;
  name: string;
  designation: string;
  department: string;
  role: UserRole;
  email: string;
  phone: string;
  jurisdiction: string;
  avatarUrl: string;
  nicToken: string;
  lastLogin: string;
}

export const SAMPLE_USERS: Record<UserRole, AuthUser> = {
  CENTRAL_NODAL: {
    id: 'usr-nodal-01',
    name: 'Shri R. K. Sharma, IAS',
    designation: 'Joint Secretary - Land Resources',
    department: 'MoRTH / DILRMP Nodal Authority',
    role: 'CENTRAL_NODAL',
    email: 'rk.sharma@gov.in',
    phone: '+91 98110 44201',
    jurisdiction: 'Union of India (All States & UTs)',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWWGRJm78yPxfuZoCEEaFykpQWJK-hrZIZ4cnW1MhRN_LCnuoEclFIgv2_k-w-iVbSpIyZJeKN9EhhKpGoZOOC7296JPiu3PZ7MOHc328k_BpC4ezQCtMqsWWzjYBDSmTU4mxGUBT7I_F5HirhEQkyQ3VWsIgfoNgefiBis6bgh-1mv0x6nstahHhIp7HjfK1m6sM4xiZSBDb-gGiQK9faGrrqFIJfbDZ5zeAPprKVzOEYmLtOvKYyiw',
    nicToken: 'NIC-SEC-NODE-DL-0982-ST',
    lastLogin: '21 Sep 2026, 10:14 IST',
  },
  CALA_COLLECTOR: {
    id: 'usr-cala-02',
    name: 'Smt. Vaishali Patil, IAS',
    designation: 'Competent Authority (CALA) & District Collector',
    department: 'Revenue & District Administration, Pune',
    role: 'CALA_COLLECTOR',
    email: 'cala.pune@maharashtra.gov.in',
    phone: '+91 94220 18833',
    jurisdiction: 'Pune District (Haveli, Daund, Khed)',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    nicToken: 'NIC-CALA-MH-PUN-041',
    lastLogin: '21 Sep 2026, 09:30 IST',
  },
  REQUIRING_BODY: {
    id: 'usr-nhai-03',
    name: 'Er. Vikramaditya Singh',
    designation: 'Chief General Manager & Project Director',
    department: 'National Highways Authority of India (NHAI)',
    role: 'REQUIRING_BODY',
    email: 'pd.delkattr@nhai.org',
    phone: '+91 97112 55902',
    jurisdiction: 'Expressway Corridors (Pkg 1-IV)',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    nicToken: 'NHAI-REQUISITION-GATEWAY-88',
    lastLogin: '21 Sep 2026, 08:45 IST',
  },
  SURVEY_OFFICER: {
    id: 'usr-surv-04',
    name: 'Shri Dnyaneshwar Rao',
    designation: 'Assistant Director of Land Records & Tehsildar',
    department: 'Survey of India / Haveli Tehsil Revenue',
    role: 'SURVEY_OFFICER',
    email: 'surv.haveli@nic.in',
    phone: '+91 93701 44321',
    jurisdiction: 'Wagholi & Lohegaon Mouza, Haveli',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    nicToken: 'BHUMAP-RTK-PUN-0941',
    lastLogin: '21 Sep 2026, 07:15 IST',
  },
  CITIZEN_LANDOWNER: {
    id: 'usr-cit-05',
    name: 'Shri Rameshwar K. Patel',
    designation: 'Registered Landowner (Khasra 142/1B)',
    department: 'Village Wagholi, District Pune',
    role: 'CITIZEN_LANDOWNER',
    email: 'rameshwar.patel@citizen.in',
    phone: '+91 98230 77192',
    jurisdiction: 'Khasra No. 142/1B (1.450 Ha)',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    nicToken: 'BHU-AADHAAR-6490-2819-0021',
    lastLogin: '20 Sep 2026, 18:20 IST',
  },
};
