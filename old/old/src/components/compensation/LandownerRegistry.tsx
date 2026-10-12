'use client';

import React, { useState } from 'react';
import { 
  Banknote, 
  CheckCircle, 
  Search, 
  Calculator, 
  Send
} from 'lucide-react';
import { LandParcel, Project, StakeholderRole } from '@/types/land-acquisition';
import { formatIndianCurrency, calculateRFCTLARRCompensation, CompensationBreakdown } from '@/lib/rfctlarr-calculator';
import confetti from 'canvas-confetti';

interface LandownerRegistryProps {
  parcels: LandParcel[];
  projects: Project[];
  selectedProjectId?: string;
  onSelectProject: (id: string) => void;
  onExecuteDBT: (parcelId: string) => void;
  currentRole: StakeholderRole;
  language: 'en' | 'hi';
}

export const LandownerRegistry: React.FC<LandownerRegistryProps> = ({
  parcels,
  projects,
  selectedProjectId,
  onSelectProject,
  onExecuteDBT,
  currentRole,
  language,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);

  // Calculator Modal State
  const [calcAreaHa, setCalcAreaHa] = useState<number>(1.5);
  const [calcBaseRate, setCalcBaseRate] = useState<number>(2400000);
  const [calcIsRural, setCalcIsRural] = useState<boolean>(true);
  const [calcDistanceKm, setCalcDistanceKm] = useState<number>(12);
  const [calcAssetsValue, setCalcAssetsValue] = useState<number>(350000);
  const [calcResult, setCalcResult] = useState<CompensationBreakdown | null>(null);

  // Processed parcels
  const displayedParcels = parcels.filter((p) => {
    if (selectedProjectId && p.projectId !== selectedProjectId) return false;
    if (statusFilter !== 'ALL' && p.compensationStatus !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.ownerName.toLowerCase().includes(q) ||
        p.khasraNumber.toLowerCase().includes(q) ||
        p.village.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const runCalculator = () => {
    const res = calculateRFCTLARRCompensation({
      areaHectares: calcAreaHa,
      baseCircleRatePerHa: calcBaseRate,
      isRural: calcIsRural,
      distanceFromUrbanKm: calcDistanceKm,
      sec11DateStr: '2025-02-15',
      awardDateStr: '2025-09-15',
      structuresAndTreesValue: calcAssetsValue,
    });
    setCalcResult(res);
  };

  const handleDisburseClick = (parcelId: string) => {
    onExecuteDBT(parcelId);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Actions */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Banknote className="w-5 h-5 text-emerald-600" />
            {language === 'hi' ? 'भूस्वामी पंचाट एवं प्रत्यक्ष लाभ अंतरण (DBT) रजिस्टर' : 'Landowner Award Registry & PFMS DBT Disbursal'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'hi' 
              ? 'धारा 23/37 के अंतर्गत वैज्ञानिक पंचाट आंकलन एवं आधार-सत्यापित प्रत्यक्ष बैंक खाता भुगतान'
              : 'Statutory RFCTLARR compensation ledger with Aadhaar-linked Direct Benefit Transfer (DBT)'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              runCalculator();
              setShowCalculatorModal(true);
            }}
            className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-2 rounded-lg transition shadow-xs"
          >
            <Calculator className="w-4 h-4 text-emerald-700" />
            <span>RFCTLARR Statutory Calculator</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-2.5 py-1.5 border border-slate-200">
            <span className="text-xs font-semibold text-slate-600">Project:</span>
            <select
              value={selectedProjectId || ''}
              onChange={(e) => onSelectProject(e.target.value)}
              className="bg-transparent text-xs font-bold text-gov-navy focus:outline-none cursor-pointer"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.code} - {p.title.slice(0, 35)}...
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-2.5 py-1.5 border border-slate-200">
            <span className="text-xs font-semibold text-slate-600">Disbursal Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Statuses ({parcels.length})</option>
              <option value="PENDING">Pending Assessment</option>
              <option value="ASSESSED">Assessed (Ready for DBT)</option>
              <option value="DISBURSED">Disbursed (Paid via PFMS)</option>
              <option value="UNDER_APPEAL">Under Dispute / Appeal</option>
            </select>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search Landowner / Khasra..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-navy w-48"
            />
          </div>
        </div>

        <span className="text-xs text-slate-500 font-semibold">
          Showing {displayedParcels.length} Beneficiaries
        </span>
      </div>

      {/* Beneficiary Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Khasra / Location</th>
                <th className="py-3 px-4">Landowner & KYC</th>
                <th className="py-3 px-4 text-center">Area (Ha / Ac)</th>
                <th className="py-3 px-4 text-right">Base Market Value</th>
                <th className="py-3 px-4 text-right">Solatium (100%)</th>
                <th className="py-3 px-4 text-right">Total Statutory Award</th>
                <th className="py-3 px-4 text-center">PFMS / DBT Status</th>
                <th className="py-3 px-4 text-right">Disbursement Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedParcels.map((p) => {
                const baseVal = p.areaHectares * p.baseCircleRatePerHa;
                const isDisbursed = p.compensationStatus === 'DISBURSED';
                const canDisburse = currentRole === 'DISTRICT_COLLECTOR_CALA' || currentRole === 'REQUIRING_BODY';

                return (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-medium">
                      <div className="font-bold text-slate-900 text-xs">Khasra {p.khasraNumber}</div>
                      <div className="text-[11px] text-slate-500">
                        {p.village}, {p.taluk}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{p.surveyNumber}</span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{p.ownerName}</div>
                      <div className="text-[10px] text-slate-500">Aadhaar: {p.aadhaarMasked}</div>
                      <div className="text-[10px] text-slate-400">
                        {p.ifscCode} • {p.bankAccountMasked}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="font-bold text-slate-800">{p.areaHectares} Ha</div>
                      <div className="text-[10px] text-slate-400">{p.areaAcres} Acres</div>
                    </td>

                    <td className="py-3 px-4 text-right font-medium text-slate-700">
                      ₹ {baseVal.toLocaleString('en-IN')}
                    </td>

                    <td className="py-3 px-4 text-right font-semibold text-emerald-800">
                      + ₹ {p.solatiumAmount.toLocaleString('en-IN')}
                    </td>

                    <td className="py-3 px-4 text-right font-black text-slate-900 text-sm">
                      {formatIndianCurrency(p.totalCompensationAmount)}
                    </td>

                    <td className="py-3 px-4 text-center">
                      {isDisbursed ? (
                        <div>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            <CheckCircle className="w-3 h-3" /> DBT Paid
                          </span>
                          {p.pfmsUtrNumber && (
                            <span className="block text-[9px] font-mono text-slate-400 mt-0.5">
                              {p.pfmsUtrNumber}
                            </span>
                          )}
                        </div>
                      ) : p.compensationStatus === 'ASSESSED' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                          Assessed
                        </span>
                      ) : p.compensationStatus === 'UNDER_APPEAL' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
                          Disputed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      {isDisbursed ? (
                        <span className="text-[11px] font-semibold text-emerald-700 flex items-center justify-end gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Disbursed
                        </span>
                      ) : (
                        <button
                          onClick={() => handleDisburseClick(p.id)}
                          disabled={!canDisburse}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ml-auto shadow-xs ${
                            canDisburse
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                          title={canDisburse ? 'Initiate PFMS DBT Bank Transfer' : 'Only CALA / Requiring Body can disburse'}
                        >
                          <Send className="w-3 h-3" />
                          <span>Disburse DBT</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* RFCTLARR Statutory Calculator Modal */}
      {showCalculatorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    RFCTLARR Act 2013 Statutory Compensation Estimator
                  </h3>
                  <p className="text-xs text-slate-500">
                    Mandatory formula under First Schedule, Section 26, 27, 29 & 30
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCalculatorModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Form Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Land Area (Hectares)</label>
                <input
                  type="number"
                  step="0.1"
                  value={calcAreaHa}
                  onChange={(e) => setCalcAreaHa(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gov-navy focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Base Circle Rate (₹ per Hectare)</label>
                <input
                  type="number"
                  step="100000"
                  value={calcBaseRate}
                  onChange={(e) => setCalcBaseRate(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gov-navy focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Area Category</label>
                <select
                  value={calcIsRural ? 'RURAL' : 'URBAN'}
                  onChange={(e) => setCalcIsRural(e.target.value === 'RURAL')}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gov-navy focus:outline-none"
                >
                  <option value="RURAL">Rural Area (1.25x - 2.0x Multiplier)</option>
                  <option value="URBAN">Urban Area (1.0x Multiplier)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Distance from Urban Boundary (Km)</label>
                <input
                  type="number"
                  value={calcDistanceKm}
                  onChange={(e) => setCalcDistanceKm(parseFloat(e.target.value) || 0)}
                  disabled={!calcIsRural}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gov-navy focus:outline-none disabled:bg-slate-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Valuation of Standing Trees & Built Structures (₹)</label>
                <input
                  type="number"
                  step="10000"
                  value={calcAssetsValue}
                  onChange={(e) => setCalcAssetsValue(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gov-navy focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={runCalculator}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-sm transition"
            >
              Recalculate Statutory Award
            </button>

            {/* Results Card */}
            {calcResult && (
              <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 text-xs space-y-2">
                <div className="flex justify-between items-center border-b border-emerald-200 pb-2">
                  <span className="font-bold text-emerald-950">Total Statutory Compensation (Payable Award)</span>
                  <span className="text-lg font-black text-emerald-800">
                    {calcResult.formattedTotalInCrores} ({calcResult.formattedTotalInLakhs})
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 pt-1">
                  <div>1. Base Market Value: <strong>₹ {calcResult.baseMarketValue.toLocaleString('en-IN')}</strong></div>
                  <div>2. Rural Multiplier: <strong>{calcResult.ruralMultiplier}x</strong></div>
                  <div>3. Solatium (100% Sec 30): <strong>+ ₹ {calcResult.solatiumAmount.toLocaleString('en-IN')}</strong></div>
                  <div>4. 12% AMV Interest: <strong>+ ₹ {calcResult.additionalMarketValueAmount.toLocaleString('en-IN')}</strong></div>
                  <div>5. Assets & Trees: <strong>+ ₹ {calcResult.structuresAndAssets.toLocaleString('en-IN')}</strong></div>
                  <div>Exact Award Amount: <strong>{calcResult.formattedTotalInRupees}</strong></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
