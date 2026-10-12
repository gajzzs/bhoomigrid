import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Download, FileText, Filter, ArrowDownToLine, ChevronDown, BarChart2 } from 'lucide-react';
import {
  nationalStats,
  statesData,
  projects,
  monthlyProgress,
  getStatusColor,
  formatCurrency,
  formatArea
} from '../data/mockData';

const COLORS = ['#1e40af', '#f97316', '#16a34a', '#eab308', '#ef4444', '#8b5cf6', '#06b6d4'];

const Reports = () => {
  const [activeTab, setActiveTab] = useState('executive');

  const tabs = [
    { id: 'executive', label: 'Executive Summary', hindi: 'कार्यकारी सारांश' },
    { id: 'state', label: 'State-wise Analysis', hindi: 'राज्यवार विश्लेषण' },
    { id: 'project', label: 'Project Reports', hindi: 'परियोजना रिपोर्ट' },
    { id: 'financial', label: 'Financial Reports', hindi: 'वित्तीय रिपोर्ट' },
    { id: 'rr', label: 'R&R Reports', hindi: 'आर एंड आर रिपोर्ट' }
  ];

  // Derived Data for Charts
  const top10States = [...statesData].sort((a, b) => b.landAcquired - a.landAcquired).slice(0, 10);
  
  const statusCounts = projects.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});
  
  const statusPieData = [
    { name: 'In Progress', value: statusCounts['In Progress'] || 0 },
    { name: 'Completed', value: statusCounts['Completed'] || 0 },
    { name: 'Delayed', value: statusCounts['Delayed'] || 0 },
    { name: 'Pending', value: statusCounts['Pending'] || 0 }
  ].filter(item => item.value > 0);

  const categoryCounts = projects.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  const categoryBarData = Object.keys(categoryCounts).map(key => ({
    name: key,
    count: categoryCounts[key]
  }));

  const top5CompensationProjects = [...projects].sort((a, b) => b.compensationAssessed - a.compensationAssessed).slice(0, 5);

  const top5StatesRR = [...statesData].sort((a, b) => b.families - a.families).slice(0, 5);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'executive':
        return (
          <div className="space-y-6 page-enter">
            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card p-4 stat-gradient-blue border-l-4 border-blue-600">
                <p className="text-sm text-slate-500 font-medium">Total Projects</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">847</p>
                <p className="text-xs text-blue-600 mt-2 flex items-center">
                  <span className="font-semibold">+12</span> in last 30 days
                </p>
              </div>
              <div className="card p-4 stat-gradient-saffron border-l-4 border-orange-500">
                <p className="text-sm text-slate-500 font-medium">Acquisition Rate</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">62.8%</p>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-3">
                  <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '62.8%' }}></div>
                </div>
              </div>
              <div className="card p-4 stat-gradient-green border-l-4 border-green-600">
                <p className="text-sm text-slate-500 font-medium">Disbursement Rate</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">83.8%</p>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-3">
                  <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '83.8%' }}></div>
                </div>
              </div>
              <div className="card p-4 stat-gradient-purple border-l-4 border-purple-600">
                <p className="text-sm text-slate-500 font-medium">R&R Completion</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">62.4%</p>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-3">
                  <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '62.4%' }}></div>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card">
                <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-800">Monthly Trend – Land Acquisition vs Compensation</h3>
                  <button className="text-slate-400 hover:text-slate-600"><BarChart2 className="w-4 h-4" /></button>
                </div>
                <div className="p-5 h-80">
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={monthlyProgress} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                      <Line yAxisId="left" type="monotone" dataKey="landAcquired" name="Land Acquired (Ha)" stroke="#1e40af" strokeWidth={3} activeDot={{ r: 6 }} />
                      <Line yAxisId="right" type="monotone" dataKey="compensation" name="Compensation (₹ Cr)" stroke="#f97316" strokeWidth={3} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="card">
                <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-800">Notifications vs Awards Issued</h3>
                  <button className="text-slate-400 hover:text-slate-600"><BarChart2 className="w-4 h-4" /></button>
                </div>
                <div className="p-5 h-80">
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={monthlyProgress} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{ fill: '#f8fafc' }} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                      <Bar dataKey="notifications" name="Notifications (Sec 11)" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                      <Bar dataKey="awards" name="Awards (Sec 23)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'state':
        return (
          <div className="space-y-6 page-enter">
            <div className="card">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800">Top 10 States by Land Acquisition</h3>
              </div>
              <div className="p-5 h-80">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={top10States} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#475569' }} width={100} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                    <Legend />
                    <Bar dataKey="landAcquired" name="Land Acquired (Ha)" fill="#1e40af" radius={[0, 4, 4, 0]} barSize={16} />
                    <Bar dataKey="landProposed" name="Land Proposed (Ha)" fill="#cbd5e1" radius={[0, 4, 4, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-semibold text-slate-800">State-wise Detailed Performance</h3>
                <div className="flex gap-2">
                  <span className="flex items-center text-xs text-slate-500"><span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>Possession &gt; 80%</span>
                  <span className="flex items-center text-xs text-slate-500 ml-3"><span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span>Possession &lt; 60%</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="data-table w-full text-left text-sm">
                  <thead>
                    <tr>
                      <th className="font-medium text-slate-500 cursor-pointer">State <ChevronDown className="w-3 h-3 inline ml-1" /></th>
                      <th className="font-medium text-slate-500 cursor-pointer">Projects <ChevronDown className="w-3 h-3 inline ml-1" /></th>
                      <th className="font-medium text-slate-500 cursor-pointer">Proposed (Ha)</th>
                      <th className="font-medium text-slate-500 cursor-pointer">Acquired (Ha)</th>
                      <th className="font-medium text-slate-500 cursor-pointer">Possession %</th>
                      <th className="font-medium text-slate-500 cursor-pointer">Comp. Disbursed (Cr)</th>
                      <th className="font-medium text-slate-500 cursor-pointer">Families Resettled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statesData.map((state, idx) => {
                      const possessionRate = (state.possession / state.landAcquired) * 100;
                      let heatClass = "";
                      if (possessionRate > 80) heatClass = "bg-green-50";
                      else if (possessionRate < 60) heatClass = "bg-red-50";
                      
                      return (
                        <tr key={idx} className={`border-b border-slate-100 hover:bg-slate-50 ${heatClass}`}>
                          <td className="py-3 font-medium text-slate-800">{state.name}</td>
                          <td className="py-3">{state.projects}</td>
                          <td className="py-3">{formatNumber(state.landProposed)}</td>
                          <td className="py-3">{formatNumber(state.landAcquired)}</td>
                          <td className="py-3">
                            <span className={possessionRate > 80 ? 'text-green-700 font-semibold' : possessionRate < 60 ? 'text-red-600 font-semibold' : ''}>
                              {possessionRate.toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-3">₹{formatNumber(state.compensationPaid)}</td>
                          <td className="py-3">{formatNumber(state.resettled)} / {formatNumber(state.families)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'project':
        return (
          <div className="space-y-6 page-enter">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card">
                <div className="px-5 py-4 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800">Projects by Status</h3>
                </div>
                <div className="p-5 h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {statusPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="card">
                <div className="px-5 py-4 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800">Projects by Category</h3>
                </div>
                <div className="p-5 h-80">
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={categoryBarData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />
                      <YAxis />
                      <Tooltip cursor={{ fill: '#f8fafc' }} />
                      <Bar dataKey="count" name="No. of Projects" fill="#f97316" radius={[4, 4, 0, 0]} barSize={30}>
                        {categoryBarData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[(index + 1) % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-semibold text-slate-800">Project Performance Summary</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="data-table w-full text-left text-sm">
                  <thead>
                    <tr>
                      <th className="font-medium text-slate-500">Project Name</th>
                      <th className="font-medium text-slate-500">State</th>
                      <th className="font-medium text-slate-500">Category</th>
                      <th className="font-medium text-slate-500">Status</th>
                      <th className="font-medium text-slate-500">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((proj, idx) => (
                      <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 font-medium text-slate-800">{proj.shortName}</td>
                        <td className="py-3">{proj.state}</td>
                        <td className="py-3">{proj.category}</td>
                        <td className="py-3">
                          <span className={`badge ${getStatusColor(proj.status)}`}>{proj.status}</span>
                        </td>
                        <td className="py-3 w-48">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${proj.completionPercent}%` }}></div>
                            </div>
                            <span className="text-xs text-slate-600 w-8">{proj.completionPercent}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'financial':
        return (
          <div className="space-y-6 page-enter">
            <div className="card">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800">Total Compensation Flow (₹ Crores)</h3>
              </div>
              <div className="p-8 flex justify-center">
                <div className="w-full max-w-3xl flex flex-col items-center">
                  <div className="w-full bg-blue-100 p-4 rounded-t-lg border-b-2 border-blue-200 text-center relative">
                    <p className="text-sm text-blue-800 font-semibold mb-1">Total Assessed</p>
                    <p className="text-2xl font-bold text-blue-900">₹{formatNumber(nationalStats.compensationAssessed)}</p>
                  </div>
                  <div className="w-10/12 bg-green-100 p-4 border-b-2 border-green-200 text-center relative mt-2">
                    <p className="text-sm text-green-800 font-semibold mb-1">Total Disbursed ({(nationalStats.compensationDisbursed / nationalStats.compensationAssessed * 100).toFixed(1)}%)</p>
                    <p className="text-2xl font-bold text-green-900">₹{formatNumber(nationalStats.compensationDisbursed)}</p>
                  </div>
                  <div className="w-8/12 bg-orange-100 p-4 rounded-b-lg text-center relative mt-2">
                    <p className="text-sm text-orange-800 font-semibold mb-1">Pending Disbursal</p>
                    <p className="text-2xl font-bold text-orange-900">₹{formatNumber(nationalStats.pendingCompensation)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card">
                <div className="px-5 py-4 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800">Top 5 Projects by Compensation Assessed</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="data-table w-full text-left text-sm">
                    <thead>
                      <tr>
                        <th className="font-medium text-slate-500">Project</th>
                        <th className="font-medium text-slate-500 text-right">Assessed (₹ Cr)</th>
                        <th className="font-medium text-slate-500 text-right">Paid (₹ Cr)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {top5CompensationProjects.map((proj, idx) => (
                        <tr key={idx} className="border-b border-slate-100">
                          <td className="py-3 font-medium text-slate-800">{proj.shortName}</td>
                          <td className="py-3 text-right">₹{proj.compensationAssessed}</td>
                          <td className="py-3 text-right">₹{proj.compensationPaid}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card">
                <div className="px-5 py-4 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800">State-wise Compensation Status</h3>
                </div>
                <div className="overflow-x-auto max-h-80">
                  <table className="data-table w-full text-left text-sm relative">
                    <thead className="sticky top-0 bg-white">
                      <tr>
                        <th className="font-medium text-slate-500">State</th>
                        <th className="font-medium text-slate-500 text-right">Assessed (Cr)</th>
                        <th className="font-medium text-slate-500 text-right">Disbursed (Cr)</th>
                        <th className="font-medium text-slate-500 text-center">%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statesData.map((state, idx) => {
                        const pct = (state.compensationPaid / state.compensation) * 100;
                        return (
                          <tr key={idx} className="border-b border-slate-100">
                            <td className="py-2">{state.name}</td>
                            <td className="py-2 text-right">₹{formatNumber(state.compensation)}</td>
                            <td className="py-2 text-right">₹{formatNumber(state.compensationPaid)}</td>
                            <td className="py-2 text-center">
                              <span className={`text-xs px-2 py-1 rounded-full ${pct > 80 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                {pct.toFixed(0)}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'rr':
        return (
          <div className="space-y-6 page-enter">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card">
                <div className="px-5 py-4 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800">Overall R&R Completion</h3>
                </div>
                <div className="p-5 h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Resettled', value: nationalStats.familiesResettled },
                          { name: 'Pending Resettlement', value: nationalStats.familiesAffected - nationalStats.familiesResettled }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        <Cell fill="#10b981" />
                        <Cell fill="#fcd34d" />
                      </Pie>
                      <Tooltip formatter={(value) => formatNumber(value)} />
                      <Legend />
                      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold fill-slate-700">
                        {((nationalStats.familiesResettled / nationalStats.familiesAffected) * 100).toFixed(1)}%
                      </text>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="card">
                <div className="px-5 py-4 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800">Families: Affected vs Resettled (Top 5 States)</h3>
                </div>
                <div className="p-5 h-80">
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={top5StatesRR} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tickFormatter={(val) => val / 1000 + 'k'} />
                      <Tooltip cursor={{ fill: '#f8fafc' }} />
                      <Legend />
                      <Bar dataKey="families" name="Affected Families" fill="#f87171" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="resettled" name="Resettled Families" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800">Project-wise R&R Summary</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="data-table w-full text-left text-sm">
                  <thead>
                    <tr>
                      <th className="font-medium text-slate-500">Project</th>
                      <th className="font-medium text-slate-500 text-right">Families Affected</th>
                      <th className="font-medium text-slate-500 text-right">Resettled</th>
                      <th className="font-medium text-slate-500">R&R Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((proj, idx) => (
                      <tr key={idx} className="border-b border-slate-100">
                        <td className="py-3 font-medium text-slate-800">{proj.shortName}</td>
                        <td className="py-3 text-right">{proj.familiesAffected?.toLocaleString() || '-'}</td>
                        <td className="py-3 text-right">{proj.familiesResettled?.toLocaleString() || '-'}</td>
                        <td className="py-3 w-48">
                          {proj.familiesAffected ? (
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(proj.familiesResettled / proj.familiesAffected) * 100}%` }}></div>
                              </div>
                              <span className="text-xs text-slate-600 w-8">{((proj.familiesResettled / proj.familiesAffected) * 100).toFixed(0)}%</span>
                            </div>
                          ) : <span className="text-slate-400 text-xs">N/A</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const formatNumber = (num) => {
    if (num === undefined || num === null) return '0';
    if (num >= 100000) return (num / 100000).toFixed(2) + 'L';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto page-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">MIS Reports & Analytics</h1>
          <p className="text-slate-500">प्रबंधन सूचना प्रणाली रिपोर्ट</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-outline flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <button className="btn btn-outline flex items-center gap-2">
            <FileText className="w-4 h-4" /> Export CSV
          </button>
          <button className="btn btn-primary flex items-center gap-2">
            <Download className="w-4 h-4" /> Generate Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-6 overflow-hidden">
        <div className="flex flex-wrap border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex flex-col items-center gap-0.5">
                <span>{tab.label}</span>
                <span className="text-[10px] text-slate-400 opacity-80">{tab.hindi}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      {renderTabContent()}
    </div>
  );
};

export default Reports;
