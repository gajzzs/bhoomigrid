'use client';

import React from 'react';
import { 
  Users, 
  Home, 
  ShieldCheck, 
  CheckCircle, 
  Building, 
  Droplets, 
  Zap, 
  GraduationCap, 
  HeartPulse 
} from 'lucide-react';
import { ProjectAffectedFamily, Project, StakeholderRole } from '@/types/land-acquisition';

interface RnRMonitoringDashboardProps {
  pafs: ProjectAffectedFamily[];
  projects: Project[];
  selectedProjectId?: string;
  onSelectProject: (id: string) => void;
  onUpdatePAF: (pafId: string, updates: any) => void;
  currentRole: StakeholderRole;
  language: 'en' | 'hi';
}

export const RnRMonitoringDashboard: React.FC<RnRMonitoringDashboardProps> = ({
  pafs,
  projects,
  selectedProjectId,
  onSelectProject,
  onUpdatePAF,
  currentRole,
  language,
}) => {
  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const displayedPAFs = pafs.filter((p) => !selectedProjectId || p.projectId === selectedProjectId);

  const totalPAFs = currentProject.totalAffectedFamilies;
  const totalPDFs = currentProject.totalDisplacedFamilies;

  const housesAllottedCount = displayedPAFs.filter((p) => p.entitlements.resettlementHouseAllotted).length;
  const fullySettledCount = displayedPAFs.filter((p) => p.status === 'FULLY_SETTLED').length;

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-700" />
            {language === 'hi' 
              ? 'पुनर्वास एवं पुनर्व्यवस्थापन (R&R) डिजिटल निगरानी कक्ष'
              : 'Rehabilitation & Resettlement (R&R) Statutory Monitoring Cell'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'hi' 
              ? 'द्वितीय अनुसूची के अंतर्गत विस्थापित परिवारों को आवास, निर्वाह भत्ता एवं नागरिक सुविधाएं'
              : 'Schedule II & III Compliance: Affected (PAFs) & Displaced (PDFs) Families Entitlements'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-3 py-1.5 border border-slate-200 text-xs">
            <span className="font-semibold text-slate-600">Active Project:</span>
            <select
              value={currentProject.id}
              onChange={(e) => onSelectProject(e.target.value)}
              className="bg-transparent font-bold text-gov-navy focus:outline-none cursor-pointer"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.code} - {p.title.slice(0, 30)}...</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase">Affected Families (PAFs)</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{totalPAFs.toLocaleString('en-IN')}</div>
          <span className="text-[11px] text-slate-500">Land & livelihood affected</span>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase">Displaced Families (PDFs)</span>
            <Home className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700">{totalPDFs.toLocaleString('en-IN')}</div>
          <span className="text-[11px] text-slate-500">Loss of residential homestead</span>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase">Resettlement Houses</span>
            <Building className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">{housesAllottedCount} Allotted</div>
          <span className="text-[11px] text-emerald-600 font-medium">Under PMAY Specification</span>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase">Settlement Index</span>
            <CheckCircle className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-700">
            {Math.round((fullySettledCount / Math.max(1, displayedPAFs.length)) * 100)}%
          </div>
          <span className="text-[11px] text-slate-500">Full package disbursed</span>
        </div>
      </div>

      {/* Mandatory Schedule III Civic Infrastructure in Resettlement Colony */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
          <Building className="w-4 h-4 text-gov-blue" />
          Schedule III Mandatory Civic Infrastructure at Resettlement Enclave
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200 text-center">
            <Droplets className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
            <span className="font-bold text-slate-800 block text-[11px]">Potable Water</span>
            <span className="text-[10px] text-emerald-700 font-semibold">100% Piped Supply</span>
          </div>

          <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200 text-center">
            <Zap className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <span className="font-bold text-slate-800 block text-[11px]">Electrification</span>
            <span className="text-[10px] text-emerald-700 font-semibold">Grid + Solar Ready</span>
          </div>

          <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200 text-center">
            <GraduationCap className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <span className="font-bold text-slate-800 block text-[11px]">School & Anganwadi</span>
            <span className="text-[10px] text-emerald-700 font-semibold">Operational</span>
          </div>

          <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200 text-center">
            <HeartPulse className="w-5 h-5 text-rose-600 mx-auto mb-1" />
            <span className="font-bold text-slate-800 block text-[11px]">Health Sub-Center</span>
            <span className="text-[10px] text-emerald-700 font-semibold">24x7 Staffed</span>
          </div>

          <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200 text-center">
            <Building className="w-5 h-5 text-purple-600 mx-auto mb-1" />
            <span className="font-bold text-slate-800 block text-[11px]">Community Hall</span>
            <span className="text-[10px] text-emerald-700 font-semibold">Completed</span>
          </div>

          <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200 text-center">
            <Home className="w-5 h-5 text-gov-navy mx-auto mb-1" />
            <span className="font-bold text-slate-800 block text-[11px]">Blacktop Roads</span>
            <span className="text-[10px] text-emerald-700 font-semibold">All-Weather Pucca</span>
          </div>
        </div>
      </div>

      {/* PAF Register & Entitlement Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-xs font-bold text-slate-800 uppercase">
            Beneficiary Entitlement Register (Schedule II)
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Standard: ₹3,000/mo Subsistence Allowance + ₹50,000 Displacement Grant
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[11px] border-b">
              <tr>
                <th className="py-3 px-4">Head of Family</th>
                <th className="py-3 px-4">Category / Khasra</th>
                <th className="py-3 px-4 text-center">Displaced (PDF)</th>
                <th className="py-3 px-4">Resettlement House</th>
                <th className="py-3 px-4 text-center">Subsistence (Months)</th>
                <th className="py-3 px-4">Annuity / Employment</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedPAFs.map((paf) => (
                <tr key={paf.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {paf.familyHeadName}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block bg-slate-100 px-2 py-0.5 rounded text-[10px] font-semibold text-slate-700 mr-1.5">
                      {paf.vulnerabilityStatus}
                    </span>
                    <span className="text-slate-500">Khasra {paf.khasraNumber}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {paf.isDisplaced ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                        Displaced (PDF)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
                        Affected (PAF)
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {paf.entitlements.resettlementHouseAllotted ? (
                      <div className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Allotted: {paf.entitlements.resettlementPlotLocation?.slice(0, 24)}...</span>
                      </div>
                    ) : (
                      <span className="text-slate-400">Not Applicable / In Progress</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-slate-800">
                    {paf.entitlements.subsistenceAllowancePaidMonths} / 12 Months
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-700">
                    {paf.entitlements.annuityOrJobOption}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {paf.status === 'FULLY_SETTLED' ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Fully Settled
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                        Partially Settled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
