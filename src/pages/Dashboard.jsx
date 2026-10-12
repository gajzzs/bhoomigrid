import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, MapPin, Flag, IndianRupee, Users, Home, Calendar, Clock, 
  CheckCircle, AlertTriangle, AlertCircle, ArrowUpRight, ShieldCheck, 
  Building2, Landmark, FileText, Download, CheckCircle2, ChevronRight, 
  ExternalLink, Layers, Navigation, HelpCircle, UserCheck, Search, Globe
} from 'lucide-react';
import { 
  AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import StatCard from '../components/common/StatCard';
import { useAuth } from '../context/AuthContext';
import { 
  getDistrictsByState, 
  getStateByCode, 
  STATES_AND_UTS, 
  ALL_DISTRICTS, 
  TOTAL_DISTRICTS, 
  TOTAL_STATES, 
  TOTAL_UTS 
} from '../data/indianDivisions';
import { 
  nationalStats, 
  statesData, 
  monthlyProgress, 
  categoryData, 
  notificationItems,
  maharashtraStateData,
  ahmedabadDistrictData,
  nhaiAgencyData,
  citizenData,
  formatCurrency,
  formatArea,
  formatNumber
} from '../data/mockData';

export default function Dashboard() {
  const { user } = useAuth();
  const role = user?.role || 'central_admin';

  // Render role-specific dashboard views strictly confined to user's verified posting
  if (role === 'state_officer') {
    return <StateOfficerDashboard user={user} />;
  }

  if (role === 'district_collector') {
    return <DistrictCollectorDashboard user={user} />;
  }

  if (role === 'project_agency') {
    return <ProjectAgencyDashboard user={user} />;
  }

  if (role === 'citizen_landowner') {
    return <CitizenLandownerDashboard user={user} />;
  }

  // Default: Central Administrator View
  return <CentralAdminDashboard user={user} />;
}

// =============================================================================
// 1. CENTRAL ADMINISTRATOR DASHBOARD (National Level)
// =============================================================================
function CentralAdminDashboard({ user }) {
  const topStates = [...statesData].sort((a, b) => b.projects - a.projects).slice(0, 10);

  return (
    <div className="page-enter space-y-6">
      {/* Page Title & Scope Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="badge bg-blue-100 text-blue-800 text-xs px-2.5 py-1 font-semibold">National Authority</span>
            <span className="text-xs text-slate-500 font-medium">DoLR • Ministry of Rural Development</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            National Land Acquisition & Monitoring Dashboard
          </h1>
          <p className="text-xs text-slate-500">
            राष्ट्रीय भूमि अधिग्रहण एवं निगरानी डैशबोर्ड • Real-time Pan-India Coordination Across 28 States & 8 UTs
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg text-slate-600">
          <Calendar size={15} className="text-primary-700" />
          <span>Last Updated: <strong>01 Dec 2024, 10:30 IST</strong></span>
        </div>
      </div>

      {/* Statutory Jurisdiction & Cadre Verification Bar */}
      <div className="bg-blue-50/80 border border-blue-200 p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-blue-950 font-semibold">
          <ShieldCheck size={18} className="text-blue-700 shrink-0" />
          <div>
            <span className="font-bold text-slate-900">National Apex Administrative Authority</span>
            <span className="text-slate-500 font-normal"> — Verified Service ID: <span className="font-mono text-blue-800 font-semibold">{user?.serviceId || 'IAS-AGMUT-2002-0056'}</span></span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-md font-medium border border-blue-200">
            Cadre Order: {user?.postingOrderNo || 'DoPT/ACC/EO/2021/92-C'}
          </span>
          <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md font-medium border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 size={13} /> Pan-India Jurisdiction Confined
          </span>
        </div>
      </div>

      {/* 6 National StatCards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard 
          title="Total Projects" 
          value={formatNumber(nationalStats.totalProjects)} 
          subtitle="Across 28 States"
          icon={Briefcase} 
          gradient="stat-gradient-blue" 
        />
        <StatCard 
          title="Land Acquired" 
          value={formatArea(nationalStats.totalLandAcquired)} 
          subtitle={`62.8% of ${formatArea(nationalStats.totalLandProposed)}`}
          icon={MapPin} 
          gradient="stat-gradient-green" 
        />
        <StatCard 
          title="Land Possessed" 
          value={formatArea(nationalStats.totalLandPossessed)} 
          subtitle="Physically handed over"
          icon={Flag} 
          gradient="stat-gradient-teal" 
        />
        <StatCard 
          title="Comp. Disbursed" 
          value={formatCurrency(nationalStats.compensationDisbursed)} 
          subtitle={`of ${formatCurrency(nationalStats.compensationAssessed)} assessed`}
          icon={IndianRupee} 
          gradient="stat-gradient-saffron" 
        />
        <StatCard 
          title="Families Affected" 
          value={formatNumber(nationalStats.familiesAffected)} 
          subtitle="Project Affected (PAFs)"
          icon={Users} 
          gradient="stat-gradient-purple" 
        />
        <StatCard 
          title="Families Resettled" 
          value={formatNumber(nationalStats.familiesResettled)} 
          subtitle="62.4% R&R completed"
          icon={Home} 
          gradient="stat-gradient-rose" 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Monthly Acquisition & Disbursement Trajectory</h3>
              <p className="text-xs text-slate-500">Pan-India monthly progression under LARR Act 2013</p>
            </div>
            <span className="badge badge-info">FY 2024</span>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyProgress} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                <Area yAxisId="left" type="monotone" dataKey="landAcquired" name="Land Acquired (Ha)" stroke="#0284c7" fillOpacity={1} fill="url(#colorLand)" />
                <Area yAxisId="right" type="monotone" dataKey="compensation" name="Compensation (₹ Cr)" stroke="#ea580c" fillOpacity={1} fill="url(#colorComp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Sectoral Distribution of Acquired Land</h3>
              <p className="text-xs text-slate-500">Major infrastructure requiring bodies</p>
            </div>
            <span className="badge badge-success">8 Infrastructure Sectors</span>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="landAcquired"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  innerRadius={55}
                  paddingAngle={2}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => formatArea(value)}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* State-wise Acquisition Summary Table */}
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap justify-between items-center bg-slate-50/80 gap-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">State-wise Acquisition & Possession Index (Top 10 States)</h3>
            <p className="text-xs text-slate-500">Comparative assessment across key implementing states</p>
          </div>
          <Link to="/reports" className="btn btn-outline btn-sm text-xs">
            View All 28 States & UTs →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-2.5 px-4">State</th>
                <th className="py-2.5 px-4 text-center">Projects</th>
                <th className="py-2.5 px-4">Proposed Land</th>
                <th className="py-2.5 px-4">Acquired Land</th>
                <th className="py-2.5 px-4">Possession %</th>
                <th className="py-2.5 px-4">Comp. Disbursed</th>
                <th className="py-2.5 px-4">Affected Families</th>
                <th className="py-2.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topStates.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-600"></span>
                    {st.name}
                  </td>
                  <td className="py-3 px-4 text-center font-medium">{st.projects}</td>
                  <td className="py-3 px-4">{formatArea(st.landProposed)}</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">{formatArea(st.landAcquired)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${st.possession >= 75 ? 'bg-emerald-600' : st.possession >= 55 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${st.possession}%` }}
                        ></div>
                      </div>
                      <span className="font-medium text-slate-700">{st.possession}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{formatCurrency(st.compensationPaid)}</td>
                  <td className="py-3 px-4">{formatNumber(st.families)}</td>
                  <td className="py-3 px-4 text-center">
                    <Link 
                      to={`/projects?state=${encodeURIComponent(st.name)}`} 
                      className="text-xs text-primary-700 hover:text-primary-900 font-semibold underline"
                    >
                      View Projects →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 4: KPIs & System Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-bold text-slate-800 text-sm mb-3">Key National Performance Indicators</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-xs text-slate-500">Average SIA & Award Time</div>
              <div className="text-xl font-bold text-slate-800 mt-1">142 Days</div>
              <div className="text-[11px] text-emerald-600 mt-0.5">↓ 24% reduction vs 2022</div>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-xs text-slate-500">On-Time Milestone Adherence</div>
              <div className="text-xl font-bold text-emerald-700 mt-1">67.4%</div>
              <div className="text-[11px] text-slate-500 mt-0.5">412 projects on track</div>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-xs text-slate-500">Pending Central Policy Clearances</div>
              <div className="text-xl font-bold text-amber-600 mt-1">234 Cases</div>
              <div className="text-[11px] text-amber-700 mt-0.5">Across 18 ministries</div>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-xs text-slate-500">Critical Timeline Alerts</div>
              <div className="text-xl font-bold text-red-600 mt-1">47 Projects</div>
              <div className="text-[11px] text-red-700 mt-0.5">Section 25 award lapse risk</div>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-slate-800 text-sm">Recent National Activity Log</h3>
            <Link to="/notifications" className="text-xs text-primary-700 font-semibold hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {notificationItems.slice(0, 4).map((item) => (
              <div key={item.id} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/60 flex items-start gap-3">
                <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  item.priority === 'critical' ? 'bg-red-500 ring-2 ring-red-200' : item.priority === 'high' ? 'bg-amber-500' : 'bg-blue-500'
                }`}></span>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-xs text-slate-800">{item.title}</span>
                    <span className="text-[10px] text-slate-400">Today</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{item.message}</p>
                  <span className="text-[10px] text-primary-700 font-medium mt-1 inline-block">{item.project}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pan-India District Directory & CALA Explorer (780+ Districts) */}
      <PanIndiaDistrictExplorer />
    </div>
  );
}

// =============================================================================
// PAN-INDIA DISTRICT DIRECTORY & CALA EXPLORER COMPONENT
// =============================================================================
function PanIndiaDistrictExplorer() {
  const [selectedState, setSelectedState] = useState('ALL');
  const [districtSearch, setDistrictSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const filteredDistricts = useMemo(() => {
    let list = ALL_DISTRICTS;
    if (selectedState !== 'ALL') {
      list = list.filter(d => d.stateCode === selectedState);
    }
    if (districtSearch.trim()) {
      const q = districtSearch.toLowerCase();
      list = list.filter(d => 
        d.districtName.toLowerCase().includes(q) || 
        d.stateName.toLowerCase().includes(q) ||
        d.hq.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedState, districtSearch]);

  const totalPages = Math.ceil(filteredDistricts.length / pageSize) || 1;
  const paginated = filteredDistricts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="card overflow-hidden mt-6">
      <div className="p-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="badge bg-primary-100 text-primary-800 text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider">
              Pan-India CALA Directory
            </span>
            <span className="text-xs text-slate-500 font-medium">{TOTAL_STATES} States & {TOTAL_UTS} Union Territories</span>
          </div>
          <h3 className="font-bold text-slate-900 text-base mt-1 flex items-center gap-2">
            <Globe size={18} className="text-primary-700" />
            District Administration & Land Acquisition Directory ({TOTAL_DISTRICTS} Districts)
          </h3>
          <p className="text-xs text-slate-500">
            Real-time administrative CALA oversight covering all 780+ revenue districts across the Republic of India
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* State selector */}
          <select 
            value={selectedState} 
            onChange={(e) => { setSelectedState(e.target.value); setCurrentPage(1); }}
            className="form-input text-xs py-1.5 px-3 rounded-lg border-slate-300 font-semibold text-slate-700 bg-white"
          >
            <option value="ALL">All States & UTs (36 Jurisdictions)</option>
            {STATES_AND_UTS.map(st => (
              <option key={st.code} value={st.code}>
                {st.name} ({st.districts.length} Districts)
              </option>
            ))}
          </select>

          {/* District search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by District / HQ..."
              value={districtSearch}
              onChange={(e) => { setDistrictSearch(e.target.value); setCurrentPage(1); }}
              className="form-input text-xs py-1.5 pl-8 pr-7 rounded-lg border-slate-300 w-44 sm:w-56"
            />
            {districtSearch && (
              <button 
                onClick={() => setDistrictSearch('')} 
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Districts */}
      <div className="p-5">
        <div className="text-xs text-slate-500 mb-3 flex justify-between items-center">
          <span>Showing <strong>{filteredDistricts.length}</strong> of {TOTAL_DISTRICTS} districts</span>
          <span className="text-[11px] font-mono">Page {currentPage} of {totalPages}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {paginated.map((dist) => {
            const stObj = statesData.find(s => s.code === dist.stateCode) || statesData[0];
            const distProjects = Math.max(2, Math.floor(stObj.projects / 8));
            const landReq = ((stObj.landProposed / 8) * 0.9).toFixed(1);
            return (
              <div 
                key={`${dist.stateCode}-${dist.districtCode}`}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-primary-400 hover:shadow-xs transition-all space-y-2"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs leading-snug">{dist.districtName}</h4>
                    <span className="text-[10px] text-slate-500">{dist.stateName} • HQ: {dist.hq}</span>
                  </div>
                  <span className="badge bg-blue-50 text-blue-800 text-[10px] font-mono font-bold shrink-0">
                    {dist.stateCode}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-100 text-[11px]">
                  <div>
                    <span className="text-[10px] text-slate-400 block">CALA Schemes:</span>
                    <span className="font-bold text-slate-800">{distProjects} Schemes</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Land Required:</span>
                    <span className="font-bold text-emerald-700">{landReq} Ha</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-[10px]">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 size={11} /> CALA Active
                  </span>
                  <Link 
                    to={`/approvals`}
                    className="text-primary-700 font-bold hover:underline"
                  >
                    Collector Desk →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-200 text-xs">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="btn btn-outline btn-sm text-xs disabled:opacity-40 cursor-pointer"
            >
              ← Previous
            </button>
            <div className="flex items-center gap-1">
              <span className="text-slate-500">Page</span>
              <strong className="text-slate-900">{currentPage}</strong>
              <span className="text-slate-500">of</span>
              <strong className="text-slate-900">{totalPages}</strong>
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="btn btn-outline btn-sm text-xs disabled:opacity-40 cursor-pointer"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// 2. STATE OFFICER DASHBOARD (e.g. Maharashtra Revenue & Land Reforms)
// =============================================================================
function StateOfficerDashboard({ user }) {
  const stateRecord = statesData.find(s => s.name === user?.state) || statesData[0];
  const allDistrictsInState = getDistrictsByState(stateRecord.code) || [];
  const totalDist = allDistrictsInState.length || 30;
  
  const stateDistricts = useMemo(() => {
    return allDistrictsInState.slice(0, 10).map((d, idx) => {
      const distProjects = Math.max(1, Math.floor(stateRecord.projects / Math.max(1, allDistrictsInState.length)) + (idx % 3));
      const distAcquired = ((stateRecord.landAcquired / Math.max(1, allDistrictsInState.length)) * (0.8 + (idx % 5) * 0.1)).toFixed(1);
      const distPaid = ((stateRecord.compensationPaid / Math.max(1, allDistrictsInState.length)) * (0.85 + (idx % 4) * 0.1)).toFixed(1);
      const distPossession = Math.min(98, Math.max(45, stateRecord.possession + ((idx % 5) - 2) * 5));
      const distFamilies = Math.floor(stateRecord.families / Math.max(1, allDistrictsInState.length));
      const distResettled = Math.floor(distFamilies * (distPossession / 100));

      return {
        name: d.name,
        projects: distProjects,
        landAcquired: Number(distAcquired),
        possession: distPossession,
        paid: Number(distPaid),
        families: distFamilies,
        resettled: distResettled,
      };
    });
  }, [stateRecord, allDistrictsInState]);

  const data = {
    ...maharashtraStateData,
    stateName: user?.state || 'Maharashtra',
    stateCode: stateRecord.code,
    totalDistricts: totalDist,
    activeDistricts: Math.floor(totalDist * 0.8),
    stats: {
      ...maharashtraStateData.stats,
      totalProjects: stateRecord.projects,
      activeProjects: Math.floor(stateRecord.projects * 0.7),
      landProposed: stateRecord.landProposed,
      landAcquired: stateRecord.landAcquired,
      landPossessed: stateRecord.landAcquired * (stateRecord.possession / 100),
      compensationAssessed: stateRecord.compensation,
      compensationDisbursed: stateRecord.compensationPaid,
      pendingCompensation: stateRecord.compensation - stateRecord.compensationPaid,
      familiesAffected: stateRecord.families,
      familiesResettled: stateRecord.resettled,
      possessionRate: stateRecord.possession,
    },
  };

  return (
    <div className="page-enter space-y-6">
      {/* State Scope Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-xl border border-emerald-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="badge bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 font-semibold">State Government Authority</span>
            <span className="text-xs text-emerald-700 font-medium">Revenue & Land Reforms Department</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            {data.stateName} State Land Acquisition Dashboard
          </h1>
          <p className="text-xs text-slate-500">
            State Level Monitoring Cell • Controlling Officer: {user?.name}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-lg text-xs text-emerald-800 font-medium">
            Jurisdiction: <strong>{data.totalDistricts} Districts • {data.stats.totalProjects} State Projects</strong>
          </div>
        </div>
      </div>

      {/* Statutory State Jurisdiction Verification Bar */}
      <div className="bg-emerald-50/80 border border-emerald-200 p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-emerald-950 font-semibold">
          <Landmark size={18} className="text-emerald-700 shrink-0" />
          <div>
            <span className="font-bold text-slate-900">State Competent Authority (SCA)</span>
            <span className="text-slate-500 font-normal"> — Verified Service ID: <span className="font-mono text-emerald-800 font-semibold">{user?.serviceId || `IAS-${data.stateCode}-2008-0194`}</span></span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md font-medium border border-emerald-200">
            Cadre Order: {user?.postingOrderNo || 'REV/SEC/CADRE/2022/49-A'}
          </span>
          <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium border border-slate-300 flex items-center gap-1">
            <CheckCircle2 size={13} className="text-emerald-600" /> Territorial Scope: {data.stateName} ({data.totalDistricts} Districts)
          </span>
        </div>
      </div>

      {/* 6 State StatCards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard 
          title="State Projects" 
          value={data.stats.totalProjects} 
          subtitle={`${data.stats.totalProjects} Across ${data.stateCode}`}
          icon={Briefcase} 
          gradient="stat-gradient-blue" 
        />
        <StatCard 
          title={`Land Acquired in ${data.stateCode}`} 
          value={formatArea(data.stats.landAcquired)} 
          subtitle={`of ${formatArea(data.stats.landProposed)} target`}
          icon={MapPin} 
          gradient="stat-gradient-green" 
        />
        <StatCard 
          title="Physical Possession" 
          value={formatArea(data.stats.landPossessed)} 
          subtitle={`${data.stats.possessionRate}% handed over`}
          icon={Flag} 
          gradient="stat-gradient-teal" 
        />
        <StatCard 
          title="State Comp. Paid" 
          value={formatCurrency(data.stats.compensationDisbursed)} 
          subtitle={`Pending: ${formatCurrency(data.stats.pendingCompensation)}`}
          icon={IndianRupee} 
          gradient="stat-gradient-saffron" 
        />
        <StatCard 
          title="Affected Families" 
          value={formatNumber(data.stats.familiesAffected)} 
          subtitle="Identified under SIA"
          icon={Users} 
          gradient="stat-gradient-purple" 
        />
        <StatCard 
          title="State R&R Done" 
          value={formatNumber(data.stats.familiesResettled)} 
          subtitle="76% Resettled"
          icon={Home} 
          gradient="stat-gradient-rose" 
        />
      </div>

      {/* District-wise Breakdown in State */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-emerald-50/50">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">District Collectorates Performance Index ({data.stateName})</h3>
              <p className="text-xs text-slate-500">Acquisition progress & possession rate across key districts</p>
            </div>
            <span className="badge badge-success">{stateDistricts.length} Priority Districts</span>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-3">District</th>
                  <th className="py-2.5 px-3 text-center">Projects</th>
                  <th className="py-2.5 px-3">Acquired Land</th>
                  <th className="py-2.5 px-3">Possession %</th>
                  <th className="py-2.5 px-3">Comp. Disbursed</th>
                  <th className="py-2.5 px-3">PAFs Resettled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stateDistricts.map((d) => (
                  <tr key={d.name} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{d.name}</td>
                    <td className="py-2.5 px-3 text-center">{d.projects}</td>
                    <td className="py-2.5 px-3 font-medium text-emerald-700">{formatArea(d.landAcquired)}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 bg-slate-200 rounded-full h-1.5">
                          <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${d.possession}%` }}></div>
                        </div>
                        <span className="text-[11px] font-semibold">{d.possession}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">{formatCurrency(d.paid)}</td>
                    <td className="py-2.5 px-3">{formatNumber(d.resettled)} / {formatNumber(d.families)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* State Statutory Approvals & Actions */}
        <div className="card p-5 space-y-4">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">State Level Statutory Approvals Pending</h3>
            <p className="text-xs text-slate-500">Requires Secretary / Land Commissioner Sign-off</p>
          </div>
          <div className="space-y-3">
            {data.pendingActions.map((act) => (
              <div key={act.id} className="p-3 rounded-lg border border-emerald-100 bg-emerald-50/40">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-xs text-slate-800">{act.title}</span>
                  <span className={`badge ${act.urgency === 'Critical' ? 'badge-danger' : 'badge-warning'} text-[10px]`}>
                    {act.urgency}
                  </span>
                </div>
                <div className="text-xs text-slate-600 mt-1">Project: <strong>{act.project}</strong></div>
                <div className="text-[11px] text-slate-400 mt-0.5">Statutory Deadline: {act.dateDue}</div>
                <div className="mt-2 flex justify-end">
                  <Link to="/approvals" className="btn btn-primary btn-sm text-[11px] py-1 px-2.5">
                    Review & Sanction
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-100 rounded-lg text-xs space-y-1">
            <div className="font-semibold text-slate-800">State Land Acquisition Portal Links:</div>
            <div className="text-slate-600 flex justify-between">
              <span>Mahabhulekh Land Records Sync</span>
              <span className="text-emerald-700 font-semibold">● Connected (Live)</span>
            </div>
            <div className="text-slate-600 flex justify-between">
              <span>MahaDBT Treasury Gateway</span>
              <span className="text-emerald-700 font-semibold">● Active (e-Kuber)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// =============================================================================
// 3. DISTRICT COLLECTOR DASHBOARD
// =============================================================================
function DistrictCollectorDashboard({ user }) {
  const stateRecord = statesData.find(s => s.name === user?.state) || statesData[0];
  const districtName = user?.district || 'Ahmedabad';
  const stateName = user?.state || 'Gujarat';

  const data = {
    districtName,
    stateName,
    collectorName: user?.name || `District Magistrate (${districtName}), IAS`,
    totalTalukas: 8,
    villagesCovered: 412,
    stats: {
      totalProjects: Math.max(3, Math.floor(stateRecord.projects / 5)),
      landProposed: Number((stateRecord.landProposed / 5).toFixed(1)),
      landAcquired: Number((stateRecord.landAcquired / 5).toFixed(1)),
      landPossessed: Number(((stateRecord.landAcquired / 5) * 0.88).toFixed(1)),
      compensationAssessed: Number((stateRecord.compensation / 5).toFixed(1)),
      compensationDisbursed: Number((stateRecord.compensationPaid / 5).toFixed(1)),
      familiesAffected: Math.floor(stateRecord.families / 5),
      familiesResettled: Math.floor((stateRecord.families / 5) * 0.879),
    },
  };

  // Dynamic talukas for ANY district in India (including Nandurbar!)
  const dynamicTalukas = useMemo(() => {
    const knownTalukas = {
      'Nandurbar': ['Nandurbar (Sadar)', 'Navapur', 'Shahada', 'Taloda', 'Akkalkuwa', 'Dhadgaon'],
      'Pune': ['Haveli (Pune)', 'Khed (Rajgurunagar)', 'Baramati', 'Shirur', 'Maval', 'Daund'],
      'Nagpur': ['Nagpur Urban', 'Nagpur Rural', 'Kamptee', 'Hingna', 'Katol', 'Saoner'],
      'Raigad': ['Alibag', 'Panvel', 'Pen', 'Uran', 'Khalapur', 'Roha'],
      'Nashik': ['Nashik Sadar', 'Malegaon', 'Sinnar', 'Niphad', 'Igatpuri', 'Dindori'],
      'Thane': ['Thane Sadar', 'Kalyan', 'Bhiwandi', 'Ulhasnagar', 'Ambernath', 'Murbad'],
      'Ahmedabad': ['Sanand', 'Daskroi', 'Dholka', 'Viramgam', 'Bavla', 'Detroj'],
      'Lucknow': ['Lucknow Sadar', 'Bakshi Ka Talab', 'Malihabad', 'Mohanlalganj', 'Sarojini Nagar'],
      'Varanasi': ['Varanasi Sadar', 'Pindra', 'Raja Talab'],
      'Kanpur': ['Kanpur Sadar', 'Bilhaur', 'Ghatampur'],
      'Jaipur': ['Jaipur Sadar', 'Amer', 'Sanganer', 'Chaksu', 'Bassi', 'Kotputli'],
      'Bengaluru Urban': ['Bangalore North', 'Bangalore South', 'Bangalore East', 'Anekal', 'Yelahanka'],
      'Chennai': ['Egmore', 'Mylapore', 'Guindy', 'Tondiarpet', 'Velachery', 'Ambattur'],
      'Kolkata': ['Kolkata North', 'Kolkata South', 'Alipore', 'Sealdah', 'Bhowanipore'],
      'Patna': ['Patna Sadar', 'Danapur', 'Barh', 'Masaurhi', 'Paliganj', 'Fatuha'],
      'Bikaner': ['Bikaner Sadar', 'Nokha', 'Lunkaransar', 'Kolayat', 'Khajuwala', 'Poogal'],
    };

    const distList = knownTalukas[districtName] || [
      `${districtName} Sadar (Headquarters)`,
      `${districtName} North Sub-Division`,
      `${districtName} East Tehsil`,
      `${districtName} Rural Block`,
      `${districtName} Industrial Zone`,
      `${districtName} Highway Division`
    ];

    const surveyors = [
      'Special Land Acquisition Officer (CALA Desk 1)',
      'Sub-Divisional Magistrate (SDM / SLAO)',
      'Assistant Collector & Land Acquisition Officer',
      'Tehsildar & Executive Magistrate',
      'Deputy Collector (Land Reforms)',
      'Revenue Talati & Surveyor (DoLR Cell)'
    ];

    const baseLand = (data.stats.landAcquired / distList.length);
    const baseComp = (data.stats.compensationDisbursed / distList.length);

    return distList.map((name, idx) => ({
      name,
      surveyor: surveyors[idx % surveyors.length],
      schemes: Math.max(1, Math.floor(data.stats.totalProjects / distList.length) + (idx % 2)),
      landAcquired: Number((baseLand * (0.8 + (idx % 4) * 0.15)).toFixed(1)),
      possession: Math.min(96, Math.max(60, 78 + ((idx % 5) - 2) * 6)),
      compPaid: Number((baseComp * (0.85 + (idx % 3) * 0.1)).toFixed(1)),
    }));
  }, [districtName, data.stats, stateRecord]);

  const dynamicCollectorTasks = useMemo(() => {
    return [
      {
        id: 'TSK-01',
        title: 'Conduct Public Hearing u/s 15 for 18 Village Objections',
        village: `${districtName} Rural & Agricultural Cluster`,
        deadline: '04 Dec 2024',
        status: 'Scheduled',
      },
      {
        id: 'TSK-02',
        title: 'Sign Section 23 Award Declaration for 42 Khatas',
        village: `${districtName} Corridor Sector 2`,
        deadline: '08 Dec 2024',
        status: 'Draft Ready',
      },
      {
        id: 'TSK-03',
        title: 'Execute Physical Possession Warrants u/s 38',
        village: `${districtName} Industrial Feeder Package`,
        deadline: '17 Dec 2024',
        status: 'Police Escort Requested',
      },
      {
        id: 'TSK-04',
        title: 'Release DBT Direct Credit Batch #88 (₹14.2 Cr)',
        village: `${districtName} Affected Landowners Belt`,
        deadline: '02 Dec 2024',
        status: 'Pending Approval',
      },
    ];
  }, [districtName]);

  return (
    <div className="page-enter space-y-6">
      {/* District Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-xl border border-amber-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="badge bg-amber-100 text-amber-800 text-xs px-2.5 py-1 font-semibold">District Magistrate & Collectorate</span>
            <span className="text-xs text-amber-700 font-medium">Government of {data.stateName}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            District Land Acquisition & Monitoring Dashboard — {data.districtName}
          </h1>
          <p className="text-xs text-slate-500">
            Competent Authority for Land Acquisition (CALA) • DM: {user?.name}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-lg text-amber-900 font-medium">
          <MapPin size={16} className="text-amber-700" />
          <span>Scope: <strong>{data.totalTalukas} Talukas • {data.villagesCovered} Revenue Villages</strong></span>
        </div>
      </div>

      {/* Statutory District Jurisdiction Verification Bar */}
      <div className="bg-amber-50/80 border border-amber-200 p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-amber-950 font-semibold">
          <Building2 size={18} className="text-amber-700 shrink-0" />
          <div>
            <span className="font-bold text-slate-900">Competent Authority for Land Acquisition (CALA)</span>
            <span className="text-slate-500 font-normal"> — Verified Service ID: <span className="font-mono text-amber-800 font-semibold">{user?.serviceId || `IAS-${stateRecord.code}-2011-0428`}</span></span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md font-medium border border-amber-200">
            Posting Order: {user?.postingOrderNo || `GAD/AIS/POSTING/2023/184-B`}
          </span>
          <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md font-medium border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 size={13} /> Strict District Jurisdiction: {data.districtName}
          </span>
        </div>
      </div>

      {/* 6 District StatCards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard 
          title="District Projects" 
          value={data.stats.totalProjects} 
          subtitle="14 Active Schemes"
          icon={Briefcase} 
          gradient="stat-gradient-blue" 
        />
        <StatCard 
          title="Notified Land" 
          value={formatArea(data.stats.landProposed)} 
          subtitle="Under Sec 11"
          icon={MapPin} 
          gradient="stat-gradient-green" 
        />
        <StatCard 
          title="Possession Taken" 
          value={formatArea(data.stats.landPossessed)} 
          subtitle="88.0% Handover Rate"
          icon={Flag} 
          gradient="stat-gradient-teal" 
        />
        <StatCard 
          title="Direct DBT Paid" 
          value={formatCurrency(data.stats.compensationDisbursed)} 
          subtitle="90.1% Disbursed"
          icon={IndianRupee} 
          gradient="stat-gradient-saffron" 
        />
        <StatCard 
          title="District PAFs" 
          value={formatNumber(data.stats.familiesAffected)} 
          subtitle="4,820 Landowners"
          icon={Users} 
          gradient="stat-gradient-purple" 
        />
        <StatCard 
          title="Resettled Families" 
          value={formatNumber(data.stats.familiesResettled)} 
          subtitle="87.9% R&R Complete"
          icon={Home} 
          gradient="stat-gradient-rose" 
        />
      </div>

      {/* Collector Actionable Tasks & Taluka Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Taluka Table */}
        <div className="lg:col-span-2 card overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-amber-50/50">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Taluka / Sub-Division Land Acquisition Status ({data.districtName})</h3>
              <p className="text-xs text-slate-500">Field-level progress reported by Special Land Acquisition Officers (SLAO)</p>
            </div>
            <span className="badge badge-warning">{dynamicTalukas.length} Key Sub-Divisions</span>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Taluka</th>
                  <th className="py-2.5 px-3">SLAO / Surveyor</th>
                  <th className="py-2.5 px-3 text-center">Schemes</th>
                  <th className="py-2.5 px-3">Acquired Land</th>
                  <th className="py-2.5 px-3">Possession %</th>
                  <th className="py-2.5 px-3">DBT Disbursed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dynamicTalukas.map((t) => (
                  <tr key={t.name} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{t.name}</td>
                    <td className="py-2.5 px-3 text-slate-500">{t.surveyor}</td>
                    <td className="py-2.5 px-3 text-center">{t.schemes}</td>
                    <td className="py-2.5 px-3 font-medium text-emerald-700">{formatArea(t.landAcquired)}</td>
                    <td className="py-2.5 px-3">
                      <span className={`badge ${t.possession >= 85 ? 'badge-success' : 'badge-warning'} text-[11px]`}>
                        {t.possession}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">₹{t.compPaid} Cr</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Collector Tasks */}
        <div className="card p-5 space-y-4">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Collector Order Queue (Statutory Actions)</h3>
            <p className="text-xs text-slate-500">Section 15, 23, and 38 Executions</p>
          </div>
          <div className="space-y-3">
            {dynamicCollectorTasks.map((tsk) => (
              <div key={tsk.id} className="p-3 rounded-lg border border-amber-100 bg-amber-50/40">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-xs text-slate-800">{tsk.title}</span>
                  <span className="badge badge-warning text-[10px]">{tsk.status}</span>
                </div>
                <div className="text-xs text-slate-600 mt-1">Location: <strong>{tsk.village}</strong></div>
                <div className="text-[11px] text-amber-800 mt-0.5">Execution Due: {tsk.deadline}</div>
                <div className="mt-2 flex justify-end">
                  <button className="btn btn-outline btn-sm text-[11px] py-1 px-2.5 bg-white">
                    Execute Order
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1.5 border border-slate-200">
            <div className="font-semibold text-slate-800">Direct Landowner Grievance Desk:</div>
            <div className="flex justify-between text-slate-600">
              <span>Section 15 Objections Registered</span>
              <span className="font-bold text-amber-700">14 Cases</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Resolved Objections this month</span>
              <span className="font-bold text-emerald-700">22 Cases</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// 4. PROJECT IMPLEMENTING AGENCY DASHBOARD (e.g. NHAI / Highways)
// =============================================================================
function ProjectAgencyDashboard({ user }) {
  const data = nhaiAgencyData;

  return (
    <div className="page-enter space-y-6">
      {/* Agency Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-xl border border-indigo-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="badge bg-indigo-100 text-indigo-800 text-xs px-2.5 py-1 font-semibold">Requiring Body / Project Implementing Agency</span>
            <span className="text-xs text-indigo-700 font-medium">Ministry of Road Transport & Highways</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            National Highways Authority of India (NHAI) — Land Acquisition Portal
          </h1>
          <p className="text-xs text-slate-500">
            परियोजना क्रियान्वयन एजेंसी डैशबोर्ड • Project Director: {user?.name}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/proposals/new" className="btn btn-primary text-xs py-2 px-3.5 shadow-sm flex items-center gap-1.5">
            + Submit New Requisition
          </Link>
        </div>
      </div>

      {/* Statutory Requisition Authority Bar */}
      <div className="bg-indigo-50/80 border border-indigo-200 p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-indigo-950 font-semibold">
          <Briefcase size={18} className="text-indigo-700 shrink-0" />
          <div>
            <span className="font-bold text-slate-900">Requiring Body Technical Directorate</span>
            <span className="text-slate-500 font-normal"> — Official ID: <span className="font-mono text-indigo-800 font-semibold">{user?.serviceId || 'NHAI-CGM-1998-0812'}</span></span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-md font-medium border border-indigo-200">
            Posting Order: {user?.postingOrderNo || 'NHAI/HR/CORRIDOR/2023/110'}
          </span>
          <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium border border-slate-300 flex items-center gap-1">
            <CheckCircle2 size={13} className="text-indigo-600" /> National Highway Corridor Requisitions
          </span>
        </div>
      </div>

      {/* 6 Agency StatCards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard 
          title="Highway Packages" 
          value={data.stats.totalPackages} 
          subtitle="248 Under Execution"
          icon={Briefcase} 
          gradient="stat-gradient-blue" 
        />
        <StatCard 
          title="Requisitioned Land" 
          value={formatArea(data.stats.landRequisitioned)} 
          subtitle="Target across states"
          icon={MapPin} 
          gradient="stat-gradient-green" 
        />
        <StatCard 
          title="Possessed by NHAI" 
          value={formatArea(data.stats.landPossessedByNHAI)} 
          subtitle={`${data.stats.possessionHandoverRate}% handed over`}
          icon={Flag} 
          gradient="stat-gradient-teal" 
        />
        <StatCard 
          title="Funds to CALA" 
          value={formatCurrency(data.stats.capitalDepositedCALA)} 
          subtitle="Deposited with SDMs"
          icon={IndianRupee} 
          gradient="stat-gradient-saffron" 
        />
        <StatCard 
          title="Paid to Farmers" 
          value={formatCurrency(data.stats.capitalDisbursedToLandowners)} 
          subtitle="Direct DBT to PAFs"
          icon={Users} 
          gradient="stat-gradient-purple" 
        />
        <StatCard 
          title="RoW Clearance" 
          value={`${data.stats.rowClearancePercent}%`} 
          subtitle="Ready for Civil Works"
          icon={CheckCircle2} 
          gradient="stat-gradient-rose" 
        />
      </div>

      {/* Agency Corridors and CALA Deposit Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Corridors */}
        <div className="card p-5">
          <h3 className="font-bold text-slate-800 text-sm mb-1">Key Expressway & Highway Corridors Status</h3>
          <p className="text-xs text-slate-500 mb-4">Land handover and Right of Way (RoW) readiness</p>
          <div className="space-y-3">
            {data.keyCorridors.map((c) => (
              <div key={c.name} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-xs text-slate-800">{c.name}</span>
                  <span className={`badge ${c.rowStatus === 'Clear' ? 'badge-success' : 'badge-warning'} text-[10px]`}>
                    {c.rowStatus}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 mt-1">
                  <span>Corridor Length: {c.lengthKm} km</span>
                  <span className="font-semibold text-emerald-700">Handed Over: {formatArea(c.landPossessed)} / {formatArea(c.landTarget)}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                  <div className="bg-primary-600 h-full rounded-full" style={{ width: `${(c.landPossessed / c.landTarget) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CALA Account Balances */}
        <div className="card p-5">
          <h3 className="font-bold text-slate-800 text-sm mb-1">Competent Authority (CALA) Fund Utilization</h3>
          <p className="text-xs text-slate-500 mb-4">Escrow deposits with District Sub-Divisional Magistrates</p>
          <div className="space-y-3">
            {data.calaDeposits.map((cd) => (
              <div key={cd.calaOffice} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-xs text-slate-800">{cd.calaOffice}</span>
                  <span className="badge badge-info text-[10px]">{cd.status}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px]">NHAI Deposited:</span>
                    <div className="font-semibold text-slate-800">₹{cd.deposited} Cr</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Disbursed to PAFs:</span>
                    <div className="font-semibold text-emerald-700">₹{cd.disbursed} Cr</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Unspent Balance:</span>
                    <div className="font-semibold text-amber-700">₹{cd.balance} Cr</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// 5. CITIZEN / AFFECTED LANDOWNER PORTAL (Shri Rameshbhai J. Patel)
// =============================================================================
function CitizenLandownerDashboard({ user }) {
  const c = citizenData;

  return (
    <div className="page-enter space-y-6">
      {/* Landowner Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white p-6 rounded-2xl shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge bg-purple-200 text-purple-900 font-bold text-xs px-2.5 py-1">
                Landowner Self-Service Portal
              </span>
              <span className="badge bg-emerald-500 text-white font-bold text-xs px-2.5 py-1 flex items-center gap-1">
                <CheckCircle2 size={13} /> 100% Compensation Disbursed
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Namaste, {c.landownerName}
            </h1>
            <p className="text-purple-200 text-xs mt-1">
              Survey No. <strong>{c.landParcel.surveyNumber}</strong> • Khata No. <strong>{c.landParcel.khataNumber}</strong> • Village: {c.landParcel.village}, Taluka: {c.landParcel.taluka}, District: {c.landParcel.district}
            </p>
          </div>

          <div className="flex flex-col items-end bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-xl text-xs">
            <span className="text-purple-200">Revenue Khata ID: <strong>{user?.serviceId || 'REV-GJ-AHM-882-142A'}</strong></span>
            <span className="text-purple-200">Mobile: <strong>{c.mobile}</strong></span>
            <span className="text-amber-300 font-semibold mt-1">Bank: {c.bankAccount.bankName} (A/C: {c.bankAccount.accountMasked})</span>
          </div>
        </div>
      </div>

      {/* Land Revenue Passbook & RoR Verification Bar */}
      <div className="bg-purple-50/80 border border-purple-200 p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-purple-950 font-semibold">
          <UserCheck size={18} className="text-purple-700 shrink-0" />
          <div>
            <span className="font-bold text-slate-900">Certified RoR Land Revenue Passbook Credential</span>
            <span className="text-slate-500 font-normal"> — Revenue ID: <span className="font-mono text-purple-800 font-semibold">{user?.serviceId || 'REV-GJ-AHM-882-142A'}</span></span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-purple-100 text-purple-800 px-2.5 py-1 rounded-md font-medium border border-purple-200">
            Section 23 Award Ref: {user?.postingOrderNo || 'AWD-2024-AHM-089'}
          </span>
          <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md font-medium border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 size={13} /> Verified RoR / AnyRoR Match
          </span>
        </div>
      </div>

      {/* 4 Citizen Spotlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 border-l-4 border-l-blue-600">
          <div className="text-xs text-slate-500 font-medium">Acquired Land Area</div>
          <div className="text-xl font-bold text-slate-900 mt-1">{c.landParcel.totalAreaAcquired}</div>
          <div className="text-[11px] text-blue-700 font-medium mt-1">Survey No: {c.landParcel.surveyNumber}</div>
        </div>

        <div className="card p-4 border-l-4 border-l-emerald-600">
          <div className="text-xs text-slate-500 font-medium">Total Compensation Credited</div>
          <div className="text-xl font-bold text-emerald-700 mt-1">₹1,79,80,000</div>
          <div className="text-[11px] text-emerald-800 font-medium mt-1">✓ Credited on {c.compensationBreakdown.creditedDate}</div>
        </div>

        <div className="card p-4 border-l-4 border-l-purple-600">
          <div className="text-xs text-slate-500 font-medium">R&R Residential Plot</div>
          <div className="text-xl font-bold text-purple-900 mt-1">Plot No. 42</div>
          <div className="text-[11px] text-purple-700 font-medium mt-1">MAHSR Sanand Township (Handed Over)</div>
        </div>

        <div className="card p-4 border-l-4 border-l-amber-600">
          <div className="text-xs text-slate-500 font-medium">Associated Project</div>
          <div className="text-sm font-bold text-slate-800 mt-1 truncate">Mumbai–Ahmedabad HSR</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">Bullet Train High Speed Corridor</div>
        </div>
      </div>

      {/* Citizen Acquisition Journey Tracker */}
      <div className="card p-6">
        <h3 className="font-bold text-slate-800 text-sm mb-1">Your Land Acquisition Lifecycle Journey (LARR Act 2013)</h3>
        <p className="text-xs text-slate-500 mb-6">Complete timeline from initial Section 4 notification to final possession and DBT credit</p>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3 text-center relative">
          {[
            { step: '1', title: 'Sec 4 Survey', date: 'Oct 2023', done: true },
            { step: '2', title: 'Sec 11 Notice', date: 'Dec 2023', done: true },
            { step: '3', title: 'Sec 15 Hearing', date: 'Feb 2024', done: true },
            { step: '4', title: 'Sec 19 Decl.', date: 'Apr 2024', done: true },
            { step: '5', title: 'Sec 23 Award', date: 'Jun 2024', done: true },
            { step: '6', title: 'DBT Credit', date: 'Sep 2024', done: true },
            { step: '7', title: 'R&R Sanad', date: 'Oct 2024', done: true },
          ].map((s, idx) => (
            <div key={s.step} className="flex flex-col items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-1.5 shadow-sm">
                ✓
              </div>
              <div className="font-bold text-xs text-slate-800">{s.title}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{s.date}</div>
              <span className="badge badge-success text-[9px] mt-1.5 py-0 px-1.5">Completed</span>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Compensation Breakdown & Official Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Itemized Compensation Table */}
        <div className="card p-5">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Itemized Award Calculation u/s 26–30</h3>
              <p className="text-xs text-slate-500">Determined by Collector Ahmedabad (Award #{c.compensationBreakdown.awardId})</p>
            </div>
            <span className="badge badge-success">Direct DBT Transfer</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Base Market Value of Land (2.40 Ha):</span>
              <span className="font-semibold text-slate-900">₹84,60,000</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">100% Solatium (First Schedule LARR Act 2013):</span>
              <span className="font-semibold text-emerald-700">+ ₹84,60,000</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">12% Additional Market Value (Section 30(3)):</span>
              <span className="font-semibold text-emerald-700">+ ₹8,20,000</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Standing Crops & Fruit Trees Valuation:</span>
              <span className="font-semibold text-emerald-700">+ ₹2,40,000</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 bg-emerald-50 px-2 rounded">
              <span className="text-emerald-900 font-bold">Total Entitlement Received:</span>
              <span className="text-emerald-900 font-bold text-sm">₹1,79,80,000</span>
            </div>
            <div className="flex justify-between py-1.5 text-[11px] text-slate-500">
              <span>Income Tax Deduction:</span>
              <span className="font-semibold text-slate-700">₹0 (Exempt under Section 96)</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            <div className="font-semibold text-slate-800">Bank Credit Reference:</div>
            <div className="text-slate-600 mt-0.5">Ref: <strong>{c.compensationBreakdown.transactionRef}</strong></div>
            <div className="text-slate-500 text-[11px] mt-0.5">Credited to SBI Account *******4921 via Treasury e-Kuber</div>
          </div>
        </div>

        {/* Downloadable Official Documents */}
        <div className="card p-5">
          <h3 className="font-bold text-slate-800 text-sm mb-1">Your Certified Digital Documents</h3>
          <p className="text-xs text-slate-500 mb-3">Digitally signed and sealed government orders</p>

          <div className="space-y-2.5">
            {c.officialDocuments.map((doc) => (
              <div key={doc.title} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs shrink-0">
                    PDF
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-slate-800">{doc.title}</div>
                    <div className="text-[10px] text-slate-400">Date: {doc.date} • Size: {doc.size}</div>
                  </div>
                </div>
                <button 
                  onClick={() => alert(`Downloading verified copy of: ${doc.title}`)}
                  className="btn btn-outline btn-sm text-xs py-1 px-2.5 flex items-center gap-1 bg-white hover:bg-slate-100"
                >
                  <Download size={13} />
                  Download
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-100 text-xs">
            <div className="font-bold text-purple-900">Need Help or Have a Grievance?</div>
            <p className="text-purple-700 text-[11px] mt-0.5">
              Case #GRV-2024-884 was resolved on 28-Jul-2024. Contact CALA Ahmedabad helpline: 1800-233-xxxx.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
