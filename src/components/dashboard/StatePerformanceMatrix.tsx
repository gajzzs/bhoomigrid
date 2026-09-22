'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Filter, 
  ArrowUpRight,
  CheckCircle, 
  AlertCircle
} from 'lucide-react';
import { Project, WORKFLOW_STAGES } from '@/types/land-acquisition';

interface StatePerformanceMatrixProps {
  projects: Project[];
  language: 'en' | 'hi';
  onSelectProject: (projectId: string) => void;
  onOpenGIS: (projectId: string) => void;
}

export const StatePerformanceMatrix: React.FC<StatePerformanceMatrixProps> = ({
  projects,
  language,
  onSelectProject,
  onOpenGIS,
}) => {
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');

  const states = Array.from(new Set(projects.map((p) => p.state)));
  const sectors = Array.from(new Set(projects.map((p) => p.sector)));

  const filteredProjects = projects.filter((p) => {
    if (selectedState !== 'ALL' && p.state !== selectedState) return false;
    if (selectedSector !== 'ALL' && p.sector !== selectedSector) return false;
    return true;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Matrix Header & Filters */}
      <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-gov-blue" />
            {language === 'hi' ? 'परियोजनावार एवं राज्यवार प्रगति मैट्रिक्स' : 'Project-wise & State-wise Acquisition Matrix'}
          </h3>
          <p className="text-xs text-slate-500">
            {language === 'hi' 
              ? 'प्रस्ताव से कब्जा तक चरणवार निगरानी एवं तुलनात्मक विश्लेषण'
              : 'Multi-jurisdictional monitoring from Proposal Requisition to Physical Possession'}
          </p>
        </div>

        {/* Filter dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="ALL">{language === 'hi' ? 'सभी राज्य (All States)' : 'All States'}</option>
              {states.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700">
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="ALL">{language === 'hi' ? 'सभी क्षेत्र (All Sectors)' : 'All Sectors'}</option>
              {sectors.map((sc) => (
                <option key={sc} value={sc}>{sc}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table of Projects */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-100/80 text-slate-600 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">{language === 'hi' ? 'परियोजना / एजेंसी' : 'Project & Requiring Agency'}</th>
              <th className="py-3 px-4">{language === 'hi' ? 'राज्य एवं जिले' : 'State / Districts'}</th>
              <th className="py-3 px-4">{language === 'hi' ? 'वर्तमान चरण' : 'Current Stage'}</th>
              <th className="py-3 px-4 text-center">{language === 'hi' ? 'भूमि अर्जन (हेक्टेयर)' : 'Land Acquired (Ha)'}</th>
              <th className="py-3 px-4 text-center">{language === 'hi' ? 'मुआवजा वितरण' : 'DBT Disbursed'}</th>
              <th className="py-3 px-4 text-center">{language === 'hi' ? 'स्थिति' : 'SLA Status'}</th>
              <th className="py-3 px-4 text-right">{language === 'hi' ? 'कार्रवाई' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredProjects.map((proj) => {
              const stageInfo = WORKFLOW_STAGES.find((s) => s.id === proj.currentStage);
              const landPct = Math.round((proj.acquiredAreaHa / proj.totalProposedAreaHa) * 100);
              const compPct = Math.round((proj.compensationDisbursedCr / proj.compensationAssessedCr) * 100);

              return (
                <tr key={proj.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-medium">
                    <div className="flex items-center gap-3">
                      <img 
                        src={proj.heroImageUrl} 
                        alt={proj.title}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0" 
                      />
                      <div>
                        <div className="font-bold text-slate-900 text-xs hover:text-gov-blue cursor-pointer" onClick={() => onSelectProject(proj.id)}>
                          {language === 'hi' ? proj.hindiTitle : proj.title}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <span className="font-semibold text-slate-700">{proj.code}</span>
                          <span>•</span>
                          <span>{proj.requiringBody}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-semibold text-slate-800">{proj.state}</div>
                    <div className="text-[11px] text-slate-500">{proj.districts.join(', ')}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-900 border border-blue-200">
                      <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]">
                        {proj.currentStage}
                      </span>
                      <span>{language === 'hi' ? stageInfo?.hindiName : stageInfo?.name}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <div className="font-bold text-slate-900">
                      {proj.acquiredAreaHa.toFixed(1)} / {proj.totalProposedAreaHa.toFixed(1)}
                    </div>
                    <div className="w-24 bg-slate-100 rounded-full h-1.5 mx-auto mt-1.5 overflow-hidden">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${landPct}%` }} />
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{landPct}%</span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <div className="font-bold text-emerald-700">
                      ₹ {proj.compensationDisbursedCr.toFixed(1)} / {proj.compensationAssessedCr.toFixed(1)} Cr
                    </div>
                    <div className="w-24 bg-slate-100 rounded-full h-1.5 mx-auto mt-1.5 overflow-hidden">
                      <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${compPct}%` }} />
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{compPct}%</span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    {proj.status === 'ON_TRACK' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        <CheckCircle className="w-3 h-3" /> On Track
                      </span>
                    )}
                    {proj.status === 'COMPLETED' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                        <CheckCircle className="w-3 h-3" /> Completed
                      </span>
                    )}
                    {proj.status === 'DELAYED' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 animate-pulse">
                        <AlertCircle className="w-3 h-3" /> Delayed
                      </span>
                    )}
                    {proj.status === 'ACTIVE' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        Active
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onOpenGIS(proj.id)}
                        className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium flex items-center gap-1 transition"
                        title="View Cadastral GIS Map"
                      >
                        <MapPin className="w-3 h-3 text-gov-blue" />
                        <span>GIS</span>
                      </button>
                      <button
                        onClick={() => onSelectProject(proj.id)}
                        className="px-2.5 py-1 text-xs bg-gov-navy hover:bg-gov-blue text-white rounded-md font-medium flex items-center gap-1 transition"
                      >
                        <span>Workflow</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
