import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { IndianRupee, FileText, AlertTriangle, CheckCircle, Download, CheckCircle2, ShieldCheck, Landmark, Building2 } from 'lucide-react';
import { compensationRecords, formatCurrency, getStatusColor, citizenData, maharashtraStateData, ahmedabadDistrictData, nationalStats, nhaiAgencyData } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const COMP_STORAGE_KEY = 'nlams_compensation_data';

export default function Compensation() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('All');
  const [liveRecords, setLiveRecords] = useState(() => {
    try {
      const cached = localStorage.getItem(COMP_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return compensationRecords;
  });
  const [disbursementAlert, setDisbursementAlert] = useState(null);

  const persistRecords = (updated) => {
    setLiveRecords(updated);
    try {
      localStorage.setItem(COMP_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  const isCentral = user?.role === 'central_admin';
  const isCitizen = user?.role === 'citizen_landowner';
  const isState = user?.role === 'state_officer';
  const isCollector = user?.role === 'district_collector';
  const isAgency = user?.role === 'project_agency';
  
  // Jurisdictional filter
  const filteredRecords = liveRecords.filter(r => {
    if (isState && user?.state) {
      const uState = user.state.toLowerCase();
      const rState = (r.state || '').toLowerCase();
      if (!rState.includes(uState) && !uState.includes(rState)) return false;
    }
    if (isCollector) {
      if (user?.state) {
        const uState = user.state.toLowerCase();
        const rState = (r.state || '').toLowerCase();
        if (!rState.includes(uState) && !uState.includes(rState)) return false;
      }
      if (user?.district) {
        const uDist = user.district.toLowerCase();
        const rDist = (r.district || '').toLowerCase();
        if (!rDist.includes(uDist) && !uDist.includes(rDist)) return false;
      }
    }
    if (isCitizen && r.id !== 'COMP-4521') return false;
    if (isAgency && !r.project.toLowerCase().includes('nh-') && !r.project.toLowerCase().includes('expressway') && !r.project.toLowerCase().includes('bharatmala') && !r.project.toLowerCase().includes('highway')) return false;

    if (activeTab === 'Disbursed' && r.status !== 'Disbursed') return false;
    if (activeTab === 'Pending' && r.status !== 'Pending') return false;
    if (activeTab === 'Dispute' && r.status !== 'Dispute') return false;
    return true;
  });

  const handleExecuteDBT = (record) => {
    const utr = `RTGS/RBI2024/${Math.floor(100000 + Math.random() * 900000)}/DBT`;
    const today = new Date().toISOString().split('T')[0];
    
    const updated = liveRecords.map(item => {
      if (item.id === record.id) {
        return {
          ...item,
          status: 'Disbursed',
          mode: 'RBI e-Kuber DBT',
          transactionRef: utr,
          date: today,
        };
      }
      return item;
    });

    persistRecords(updated);
    setDisbursementAlert(`Direct Benefit Transfer of ₹${record.totalCompensation} Lakhs initiated for ${record.beneficiary} (${record.surveyNo}). Transaction Reference: ${utr}`);
    setTimeout(() => setDisbursementAlert(null), 7000);
  };

  const handleDepositEscrow = (record) => {
    const escrowRef = `COURT-ESCROW-2024-${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date().toISOString().split('T')[0];

    const updated = liveRecords.map(item => {
      if (item.id === record.id) {
        return {
          ...item,
          status: 'Disbursed',
          mode: 'Judicial Escrow Deposit (Sec 77)',
          transactionRef: escrowRef,
          date: today,
        };
      }
      return item;
    });

    persistRecords(updated);
    setDisbursementAlert(`Statutory Escrow Deposit of ₹${record.totalCompensation} Lakhs deposited in LARRA Reference Court for ${record.beneficiary} (${record.surveyNo}) under Section 77(2). Reference: ${escrowRef}`);
    setTimeout(() => setDisbursementAlert(null), 7000);
  };

  // Dynamic KPI Stats based strictly on Authenticated Jurisdiction
  const kpi = isCitizen ? {
    assessed: '₹1.79 Cr',
    disbursed: '₹1.79 Cr (100%)',
    pending: '₹0.00',
    disputes: '0 Cases (Cleared)',
    note: 'Personal Land Parcel (Survey No. 142/A, Vasna, Ahmedabad)'
  } : isCollector ? {
    assessed: `₹${ahmedabadDistrictData.stats.compensationAssessed} Cr`,
    disbursed: `₹${ahmedabadDistrictData.stats.compensationDisbursed} Cr (90.1%)`,
    pending: `₹${ahmedabadDistrictData.stats.pendingCompensation} Cr`,
    disputes: '18 Cases (Sec 64 LARRA)',
    note: `${user?.district || 'District'} Collectorate (${user?.state || 'CALA'})`
  } : isState ? {
    assessed: `₹${maharashtraStateData.stats.compensationAssessed} Cr`,
    disbursed: `₹${maharashtraStateData.stats.compensationDisbursed} Cr (86.6%)`,
    pending: `₹${maharashtraStateData.stats.pendingCompensation} Cr`,
    disputes: '84 Cases (Sec 64 LARRA)',
    note: `${user?.state || 'State'} Revenue Department`
  } : isAgency ? {
    assessed: `₹${nhaiAgencyData.stats.capitalDepositedCALA} Cr`,
    disbursed: `₹${nhaiAgencyData.stats.capitalDisbursedToLandowners} Cr (88.5%)`,
    pending: `₹${(nhaiAgencyData.stats.capitalDepositedCALA - nhaiAgencyData.stats.capitalDisbursedToLandowners).toFixed(1)} Cr`,
    disputes: '42 Active Arbitrations (Sec 3G NH Act)',
    note: 'NHAI National Requisition & CALA Accounts'
  } : {
    assessed: `₹${nationalStats.compensationAssessed} Cr`,
    disbursed: `₹${nationalStats.compensationDisbursed} Cr (83.8%)`,
    pending: `₹${nationalStats.pendingCompensation} Cr`,
    disputes: '1,245 Cases (Pan-India)',
    note: 'National Apex Directorate (28 States & 8 UTs)'
  };

  const chartData = isState ? [
    { name: 'MAHSR (Palghar)', assessed: 2850, paid: 2640 },
    { name: 'Navi Mumbai Airport', assessed: 2450, paid: 2180 },
    { name: 'Pune Ring Road', assessed: 1840, paid: 1560 },
    { name: 'DMIC Dighi Port', assessed: 1310, paid: 940 },
  ] : isCollector ? [
    { name: 'MAHSR (Sanand)', assessed: 640, paid: 610 },
    { name: 'Dholera SIR Exp.', assessed: 520, paid: 480 },
    { name: 'Sanand Industrial', assessed: 380, paid: 350 },
    { name: 'Metro Rail Ph-2', assessed: 280, paid: 200 },
  ] : isAgency ? [
    { name: 'Bharatmala NH-48', assessed: 2180, paid: 2060 },
    { name: 'NH-44 Bypass', assessed: 620, paid: 480 },
    { name: 'Delhi-Mumbai Exp', assessed: 4120, paid: 3980 },
    { name: 'Ganga Exp Spur', assessed: 890, paid: 620 },
  ] : [
    { name: 'Mumbai-Ahd HSR', assessed: 14520, paid: 12840 },
    { name: 'Delhi-Mumbai DMIC', assessed: 3240, paid: 2480 },
    { name: 'Bharatmala NH-48', assessed: 2180, paid: 2060 },
    { name: 'Jewar Airport', assessed: 4520, paid: 4520 },
    { name: 'Ken-Betwa RLP', assessed: 2840, paid: 1920 },
  ];

  return (
    <div className="page-enter p-6 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="badge bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 font-semibold">
              Treasury & Public Finance Directorate
            </span>
            <span className="text-xs text-slate-500 font-medium">RFCTLARR Act 2013 First Schedule Mandate</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            {isCitizen ? 'My Land Compensation & Payment Voucher' : 'Compensation & Direct Benefit Transfer (DBT) Desk'}
          </h1>
          <p className="text-slate-500 text-xs">
            {isCitizen 
              ? 'आपला मोबदला आणि थेट बँक हस्तांतरण माहिती • 100% Solatium & Tax-Free Payouts under Section 96' 
              : 'मुआवज़ा एवं प्रत्यक्ष लाभ अंतरण • Assessment, 100% Solatium, PFMS / RBI e-Kuber DBT Tracking'}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-xs">
          <ShieldCheck size={16} className="text-primary-700" />
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900">{kpi.note}</span>
            <span className="text-[10px] text-slate-500 font-mono">Service ID: {user?.serviceId || 'GOV-SECURE-ID'}</span>
          </div>
        </div>
      </div>

      {/* Citizen Personal Compensation Spotlight Card */}
      {isCitizen && (
        <div className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white p-6 rounded-2xl shadow-md space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="badge bg-emerald-400 text-emerald-950 font-bold text-xs px-2.5 py-1">
                Verified Direct Benefit Transfer (DBT) Credited
              </span>
              <h2 className="text-xl font-bold mt-2">
                Award Amount: ₹1,79,80,000 (100% Disbursed to Bank A/C)
              </h2>
              <p className="text-emerald-200 text-xs mt-0.5">
                Beneficiary: <strong>{citizenData.landownerName}</strong> • Survey No: {citizenData.landParcel.surveyNumber} • Award Ref: {citizenData.compensationBreakdown.awardId}
              </p>
            </div>
            <button 
              onClick={() => alert(`Official Treasury DBT Credit Voucher\nAward: AWD-2024-AHM-089\nAmount: ₹1,79,80,000\nTransaction Ref: ${citizenData.compensationBreakdown.transactionRef}\nPayment Date: ${citizenData.compensationBreakdown.creditedDate}\nStatus: Cleared via RBI e-Kuber`)}
              className="btn btn-outline bg-white text-emerald-900 hover:bg-emerald-50 text-xs py-2 px-4 flex items-center gap-1.5 font-semibold cursor-pointer"
            >
              <Download size={14} /> Download Treasury Voucher
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-2 border-t border-emerald-700/60">
            <div>
              <span className="text-emerald-300">Basic Land Value:</span>
              <div className="font-bold text-sm">₹84,60,000</div>
            </div>
            <div>
              <span className="text-emerald-300">100% Solatium (LARR):</span>
              <div className="font-bold text-sm">+ ₹84,60,000</div>
            </div>
            <div>
              <span className="text-emerald-300">12% Addl. Interest & Crops:</span>
              <div className="font-bold text-sm">+ ₹10,60,000</div>
            </div>
            <div>
              <span className="text-emerald-300">TDS / Deductions:</span>
              <div className="font-bold text-sm text-emerald-200">₹0 (Sec 96 Exempt)</div>
            </div>
          </div>
        </div>
      )}

      {/* 4 Unified KPI Cards (Strictly aligned with Active Role) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4 border-l-4 border-blue-600">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Assessed</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{kpi.assessed}</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><FileText className="w-5 h-5" /></div>
          </div>
          <span className="text-[10px] text-slate-400 mt-2 block">RFCTLARR Schedule I Determination</span>
        </div>

        <div className="card p-4 border-l-4 border-emerald-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Disbursed via DBT</p>
              <h3 className="text-2xl font-bold text-emerald-700 mt-1">{kpi.disbursed}</h3>
            </div>
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><CheckCircle className="w-5 h-5" /></div>
          </div>
          <span className="text-[10px] text-emerald-600 mt-2 block font-medium">Direct e-Kuber Treasury Credits</span>
        </div>

        <div className="card p-4 border-l-4 border-amber-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Treasury Pipeline</p>
              <h3 className="text-2xl font-bold text-amber-700 mt-1">{kpi.pending}</h3>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><IndianRupee className="w-5 h-5" /></div>
          </div>
          <span className="text-[10px] text-slate-400 mt-2 block">KYC & Notice u/s 21 Stage</span>
        </div>

        <div className="card p-4 border-l-4 border-purple-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sec 64 LARRA References</p>
              <h3 className="text-2xl font-bold text-purple-700 mt-1">{kpi.disputes}</h3>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><AlertTriangle className="w-5 h-5" /></div>
          </div>
          <span className="text-[10px] text-slate-400 mt-2 block">Tribunal Title Determination</span>
        </div>
      </div>

      {/* Overview Chart (Non-citizen view) */}
      {!isCitizen && (
        <div className="card p-5">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-bold text-slate-800 text-sm">
              Compensation Trajectory (Assessed vs Disbursed) — ₹ Crores
            </h3>
            <span className="badge badge-success text-xs">Direct Benefit Transfer (DBT)</span>
          </div>
          <p className="text-xs text-slate-500 mb-4">Statutory First Schedule determinations vs live Treasury payments</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="assessed" fill="#0284c7" name="Assessed (₹ Cr)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="paid" fill="#10b981" name="Disbursed (₹ Cr)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Live Direct Benefit Transfer Notification Banner */}
      {disbursementAlert && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold">Treasury DBT Executed Successfully: </span>
              <span>{disbursementAlert}</span>
            </div>
          </div>
          <span className="badge badge-success text-[10px]">RBI e-Kuber Cleared</span>
        </div>
      )}

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="border-b px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/70">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Disbursement Registry (RFCTLARR Section 26-30 Determinations)</h3>
            <p className="text-xs text-slate-500">Official record of individual compensation determinations, PFMS direct payouts, and Section 64 Tribunal Escrow</p>
          </div>
          <div className="flex gap-2">
            {['All', 'Disbursed', 'Pending', 'Dispute'].map(tab => (
              <button
                key={tab}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === tab ? 'bg-primary-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
              <tr>
                <th className="py-2.5 px-3">Record ID</th>
                <th className="py-2.5 px-3">Project</th>
                <th className="py-2.5 px-3">Beneficiary</th>
                <th className="py-2.5 px-3">Survey No</th>
                <th className="py-2.5 px-3">Area (Ha)</th>
                <th className="py-2.5 px-3">Basic Value</th>
                <th className="py-2.5 px-3">100% Solatium</th>
                <th className="py-2.5 px-3">Total (₹ Lakhs)</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Payment Channel / Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400">
                    No compensation records matching the selected filter in this jurisdiction.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => {
                  const isMyRecord = isCitizen && r.id === 'COMP-4521';
                  return (
                    <tr key={r.id} className={`hover:bg-slate-50 transition-colors ${isMyRecord ? 'bg-emerald-50/90 font-medium' : ''}`}>
                      <td className="py-2.5 px-3 font-semibold text-primary-900">
                        {isMyRecord ? (
                          <span className="badge badge-success text-[10px] py-0.5 px-1.5 mr-1 font-bold">YOUR PARCEL</span>
                        ) : null}
                        {r.id}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-800">{r.project}</td>
                      <td className="py-2.5 px-3 font-medium">{r.beneficiary}</td>
                      <td className="py-2.5 px-3 font-mono">{r.surveyNo}</td>
                      <td className="py-2.5 px-3">{r.landArea} Ha</td>
                      <td className="py-2.5 px-3">₹{r.marketValue} L</td>
                      <td className="py-2.5 px-3 text-emerald-700 font-medium">+ ₹{r.solatium} L</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">₹{r.totalCompensation} L</td>
                      <td className="py-2.5 px-3">
                        <span className={`badge ${getStatusColor(r.status)} text-[10px]`}>
                          {r.status === 'Dispute' ? 'Sec 64 LARRA Escrow' : r.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">
                        {r.status === 'Disbursed' ? (
                          <div>
                            <span className="font-semibold text-emerald-800 block">{r.mode}</span>
                            <span className="text-[10px] text-slate-400">{r.transactionRef}</span>
                          </div>
                        ) : r.status === 'Pending' ? (
                          <div className="flex items-center gap-2">
                            <span className="text-amber-700 font-medium text-[11px] block">{r.transactionRef || 'Notice u/s 21 Issued'}</span>
                            {!isCitizen && (
                              <button
                                onClick={() => handleExecuteDBT(r)}
                                className="btn btn-primary text-[10px] py-1 px-2.5 font-bold cursor-pointer shrink-0"
                                title="Authorize e-Kuber Treasury Payment"
                              >
                                Disburse DBT
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div>
                              <span className="text-purple-700 font-semibold block">Sec 64 LARRA Tribunal</span>
                              <span className="text-[10px] text-slate-500 italic block">{r.transactionRef}</span>
                            </div>
                            {!isCitizen && (
                              <button
                                onClick={() => handleDepositEscrow(r)}
                                className="btn btn-outline text-[10px] py-1 px-2 font-bold text-purple-700 border-purple-300 hover:bg-purple-50 cursor-pointer shrink-0"
                                title="Deposit into Reference Court Escrow under Section 77(2)"
                              >
                                Deposit Escrow
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
