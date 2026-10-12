import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, MapPin, Building, ChevronDown, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { projects, categoryData, statesData, getStatusColor, formatArea, formatCurrency, formatNumber } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export default function Projects() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [state, setState] = useState('All');
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [roleFilterApplied, setRoleFilterApplied] = useState(false);

  const isCentral = user?.role === 'central_admin';
  const isState = user?.role === 'state_officer';
  const isCollector = user?.role === 'district_collector';
  const isAgency = user?.role === 'project_agency';
  const isCitizen = user?.role === 'citizen_landowner';

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      // Mandatory statutory jurisdiction boundaries
      if (isState && !p.state.includes('Maharashtra')) return false;
      if (isCollector && (!p.state.includes('Gujarat') || !p.districts.includes('Ahmedabad'))) return false;
      if (isAgency && !p.requestingBody.includes('NHAI') && p.category !== 'Highways') return false;
      if (isCitizen && p.id !== 'PRJ-2024-001') return false;

      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.id.toLowerCase().includes(search.toLowerCase()) || 
                          p.requestingBody.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'All' || p.category === category;
      const matchStatus = status === 'All' || p.status === status;
      const matchState = state === 'All' || p.state.includes(state);
      return matchSearch && matchCategory && matchStatus && matchState;
    }).sort((a, b) => {
      if (sortBy === 'completionPercent') return b.completionPercent - a.completionPercent;
      if (sortBy === 'landAcquired') return b.landAcquired - a.landAcquired;
      return new Date(b.lastUpdated) - new Date(a.lastUpdated);
    });
  }, [search, category, status, state, sortBy, isCentral, isState, isCollector, isAgency, isCitizen]);

  return (
    <div className="page-enter p-6 max-w-7xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="badge bg-primary-100 text-primary-800 text-xs px-2.5 py-0.5 font-semibold">
              Master Project Registry
            </span>
            <span className="text-xs text-slate-500 font-medium">National Infrastructure Pipeline & Gati Shakti</span>
          </div>
          <h1 className="text-2xl font-bold text-primary-900 mt-1">Project Portfolio Management</h1>
          <p className="text-gray-500 text-xs">
            परियोजना प्रबंधन • End-to-End Tracking Across Highways, Railways, Industrial Corridors & Urban Transit
          </p>
        </div>

        {/* Statutory Jurisdiction Indicator */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-xs">
          <ShieldCheck size={16} className="text-primary-700" />
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900">
              {isCentral ? 'National Apex Oversight (All 28 States)' : `Territorial Scope: ${user?.jurisdiction || user?.district || user?.state}`}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              Service ID: {user?.serviceId || 'GOV-SECURE-ID'} • Order: {user?.postingOrderNo || 'DoPT Order'}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-200 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search projects by name, ID, or requesting body..." 
              className="form-input pl-9 text-xs w-full py-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select className="form-select w-full md:w-44 text-xs py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Sectors</option>
            {categoryData.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
          <select className="form-select w-full md:w-40 text-xs py-2" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Delayed">Delayed</option>
          </select>
          <select className="form-select w-full md:w-44 text-xs py-2" value={state} onChange={(e) => setState(e.target.value)}>
            <option value="All">All States</option>
            {statesData.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-100 text-xs">
          <div className="font-medium text-gray-600">
            Showing <strong className="text-slate-900">{filteredProjects.length}</strong> infrastructure projects
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Sort by:</span>
            <select className="form-select text-xs py-1" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="lastUpdated">Recently Updated</option>
              <option value="completionPercent">Highest Completion %</option>
              <option value="landAcquired">Land Quantum Acquired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Project Cards List */}
      <div className="space-y-4">
        {filteredProjects.map(project => {
          const isMyParcelProject = isCitizen && project.id === 'PRJ-2024-001';

          return (
            <div 
              key={project.id} 
              className={`card p-5 hover:border-primary-300 transition-all ${
                isMyParcelProject ? 'ring-2 ring-emerald-500 bg-emerald-50/20' : ''
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <Link to={`/projects/${project.id}`} className="text-base font-bold text-primary-900 hover:text-primary-700 hover:underline">
                      {project.name}
                    </Link>
                    <span className="text-[11px] text-gray-400 font-mono bg-slate-100 px-1.5 py-0.5 rounded">{project.id}</span>
                    {isMyParcelProject && (
                      <span className="badge badge-success text-[10px] py-0 px-2 flex items-center gap-1">
                        <CheckCircle2 size={12} /> Your Land Parcel Is Acquired For This Project
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                    <span className="flex items-center gap-1 font-medium"><Building className="w-3.5 h-3.5 text-slate-400" /> {project.requestingBody}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {project.state} ({project.districts.join(', ')})</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge badge-info text-xs">{project.category}</span>
                  <span className={`badge ${getStatusColor(project.status)} text-xs`}>{project.status}</span>
                  {project.priority === 'High' && <span className="badge badge-danger text-xs">High Priority</span>}
                  {project.priority === 'Critical' && <span className="badge badge-danger text-xs">Critical</span>}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 bg-slate-50/80 p-3 rounded-lg border border-slate-100 text-xs">
                <div>
                  <div className="text-slate-400 text-[11px] mb-0.5">Land (Acq / Prop)</div>
                  <div className="font-bold text-slate-800">{formatArea(project.landAcquired)} / {formatArea(project.landProposed)}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[11px] mb-0.5">Compensation Paid</div>
                  <div className="font-bold text-emerald-700">{formatCurrency(project.compensationPaid)} / {formatCurrency(project.compensationAssessed)}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[11px] mb-0.5">PAFs Resettled</div>
                  <div className="font-bold text-slate-800">{formatNumber(project.familiesResettled)} / {formatNumber(project.familiesAffected)}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[11px] mb-0.5">Acquisition Completion</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-primary-700 h-2 rounded-full" style={{ width: `${project.completionPercent}%` }}></div>
                    </div>
                    <span className="font-bold text-slate-800">{project.completionPercent}%</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-between items-center text-xs border-t border-gray-100 pt-3 gap-2">
                <div className="text-gray-600 flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Current Statutory Stage:</span>
                  <span className="bg-blue-50 text-blue-800 font-medium px-2 py-0.5 rounded text-[11px] border border-blue-200">{project.currentStage}</span>
                  <span className="text-gray-400 ml-2 hidden sm:inline">Updated: {new Date(project.lastUpdated).toLocaleDateString()}</span>
                </div>
                <Link to={`/projects/${project.id}`} className="text-primary-700 font-semibold hover:text-primary-900 flex items-center gap-1 group">
                  View Full Project Dossier & Workflow <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-xs border border-gray-200">
            <div className="text-gray-500 font-medium mb-2">No projects found matching your jurisdictional criteria.</div>
            <button 
              onClick={() => {setSearch(''); setCategory('All'); setStatus('All'); setState('All'); setRoleFilterApplied(false);}} 
              className="text-primary-700 font-semibold hover:underline text-xs"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
