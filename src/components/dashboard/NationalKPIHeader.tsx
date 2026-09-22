'use client';

import React from 'react';
import { 
  LandPlot, 
  Banknote, 
  CheckCircle2, 
  Users, 
  TrendingUp
} from 'lucide-react';
import { Project } from '@/types/land-acquisition';

interface NationalKPIHeaderProps {
  projects: Project[];
  language: 'en' | 'hi';
}

export const NationalKPIHeader: React.FC<NationalKPIHeaderProps> = ({ projects, language }) => {
  // Aggregate real-time statistics
  const totalProposedHa = projects.reduce((acc, p) => acc + p.totalProposedAreaHa, 0);
  const totalAcquiredHa = projects.reduce((acc, p) => acc + p.acquiredAreaHa, 0);
  const totalPossessionHa = projects.reduce((acc, p) => acc + p.possessionTakenHa, 0);

  const totalAssessedCr = projects.reduce((acc, p) => acc + p.compensationAssessedCr, 0);
  const totalDisbursedCr = projects.reduce((acc, p) => acc + p.compensationDisbursedCr, 0);
  const totalEscrowCr = projects.reduce((acc, p) => acc + p.escrowFundedCr, 0);

  const totalPAFs = projects.reduce((acc, p) => acc + p.totalAffectedFamilies, 0);
  const totalPDFs = projects.reduce((acc, p) => acc + p.totalDisplacedFamilies, 0);

  const totalProjects = projects.length;
  const onTrackCount = projects.filter((p) => p.status === 'ON_TRACK' || p.status === 'COMPLETED').length;

  const acquisitionPct = totalProposedHa > 0 ? Math.round((totalAcquiredHa / totalProposedHa) * 100) : 0;
  const disbursalPct = totalAssessedCr > 0 ? Math.round((totalDisbursedCr / totalAssessedCr) * 100) : 0;
  const possessionPct = totalProposedHa > 0 ? Math.round((totalPossessionHa / totalProposedHa) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Top Banner Alert / Status */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-800">
                {language === 'hi' ? 'अखिल भारतीय भूमि अर्जन सांख्यिकी' : 'All-India Land Acquisition Real-Time Pulse'}
              </h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
                ● Live PostGIS Sync
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {language === 'hi' 
                ? `सक्रिय राष्ट्रीय परियोजनाएं: ${totalProjects} | वैधानिक अनुपालन दर: ${Math.round((onTrackCount / totalProjects) * 100)}%`
                : `Active Megaprojects: ${totalProjects} | Statutory SLA Adherence: ${Math.round((onTrackCount / totalProjects) * 100)}%`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <div className="text-right">
            <span className="text-slate-500 block">{language === 'hi' ? 'कुल बजट' : 'Total Capital Outlay'}</span>
            <span className="text-sm font-bold text-slate-900">
              ₹ {projects.reduce((acc, p) => acc + p.totalEstimatedBudgetCr, 0).toLocaleString('en-IN')} Cr
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-right">
            <span className="text-slate-500 block">{language === 'hi' ? 'एस्क्रो जमा राशि' : 'Escrow Deposit'}</span>
            <span className="text-sm font-bold text-emerald-700">
              ₹ {totalEscrowCr.toLocaleString('en-IN')} Cr
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Key Land Acquisition Parameters (Mandated in Prompt) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Land Proposed & Acquired */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-gov-blue/50 transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              {language === 'hi' ? 'प्रस्तावित बनाम अधिग्रहित' : '1. Land Proposed vs Acquired'}
            </span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
              <LandPlot className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{totalAcquiredHa.toFixed(1)}</span>
            <span className="text-xs text-slate-500">/ {totalProposedHa.toFixed(1)} Ha</span>
          </div>
          <div className="mt-2.5">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500">{language === 'hi' ? 'प्रगति' : 'Progress'}</span>
              <span className="font-bold text-blue-700">{acquisitionPct}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${acquisitionPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* KPI 2: Compensation Assessed & Disbursed (PFMS/DBT) */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-emerald-500/50 transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              {language === 'hi' ? 'मुआवजा आंकलन एवं वितरण' : '2. Compensation Disbursed (DBT)'}
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Banknote className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-700">₹ {totalDisbursedCr.toFixed(1)}</span>
            <span className="text-xs text-slate-500">/ ₹ {totalAssessedCr.toFixed(1)} Cr</span>
          </div>
          <div className="mt-2.5">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500">{language === 'hi' ? 'वितरित अनुपात' : 'DBT Disbursal Rate'}</span>
              <span className="font-bold text-emerald-700">{disbursalPct}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${disbursalPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* KPI 3: Physical Possession Status */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-amber-500/50 transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              {language === 'hi' ? 'भौतिक कब्जा स्थिति' : '3. Possession Handed Over'}
            </span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{totalPossessionHa.toFixed(1)}</span>
            <span className="text-xs text-slate-500">Ha ({possessionPct}%)</span>
          </div>
          <div className="mt-2.5">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500">{language === 'hi' ? 'पंचनामा पूर्ण' : 'Panchnama Executed'}</span>
              <span className="font-bold text-amber-700">{possessionPct}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-amber-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${possessionPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* KPI 4: Rehabilitation & Resettlement (PAFs/PDFs) */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-purple-500/50 transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              {language === 'hi' ? 'प्रभावित एवं विस्थापित परिवार' : '4. Affected & Displaced (R&R)'}
            </span>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-purple-900">{totalPAFs.toLocaleString('en-IN')}</span>
            <span className="text-xs text-slate-500">PAFs</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span className="text-slate-500">{language === 'hi' ? 'विस्थापित (PDFs)' : 'Displaced (PDFs)'}</span>
            <span className="font-bold text-slate-800">{totalPDFs.toLocaleString('en-IN')} Families</span>
          </div>
        </div>

      </div>
    </div>
  );
};
