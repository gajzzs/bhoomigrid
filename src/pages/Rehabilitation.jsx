import React from 'react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Home, Briefcase, CheckCircle2, Check, X, ShieldCheck } from 'lucide-react';
import { rrRecords, getStatusColor } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const rrStatusData = [
  { name: 'Resettled', value: 45000, color: '#10b981' },
  { name: 'In Progress', value: 25000, color: '#3b82f6' },
  { name: 'Pending', value: 12000, color: '#f59e0b' },
  { name: 'Assessment', value: 8500, color: '#6366f1' }
];

export default function Rehabilitation() {
  const { user } = useAuth();
  const isCentral = user?.role === 'central_admin';
  const isState = user?.role === 'state_officer';
  const isCollector = user?.role === 'district_collector';
  const isCitizen = user?.role === 'citizen_landowner';

  const filteredRrRecords = rrRecords.filter(r => {
    if (isState && r.state !== 'Maharashtra') return false;
    if (isCollector && r.state !== 'Gujarat') return false;
    if (isCitizen && r.id !== 'RR-001') return false;
    return true;
  });

  return (
    <div className="page-enter p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="badge bg-indigo-100 text-indigo-800 text-xs px-2.5 py-0.5 font-semibold">
              RFCTLARR Act 2013 Chapter V & VI
            </span>
            <span className="text-xs text-slate-500 font-medium">Rehabilitation & Resettlement Authority</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mt-1">
            {isCitizen ? 'My Rehabilitation & Resettlement (R&R) Entitlement' : 'Rehabilitation & Resettlement Administration'}
          </h1>
          <p className="text-slate-500 text-xs">
            पुनर्वास एवं पुनर्स्थापन • Second Schedule Mandatory Entitlements, Housing, Employment, and Annuity
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-xs">
          <ShieldCheck size={16} className="text-indigo-700" />
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900">
              {isCentral ? 'National Apex R&R Oversight' : `Territorial Scope: ${user?.jurisdiction || user?.district || user?.state}`}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              Service ID: {user?.serviceId || 'GOV-SECURE-ID'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4 border-l-4 border-indigo-500">
          <div className="flex justify-between items-start">
            <div><p className="text-sm font-medium text-slate-500">Total Families Affected</p><h3 className="text-2xl font-bold text-slate-800">{isCitizen ? '1' : isCollector ? '8,420' : isState ? '14,800' : '90,500'}</h3></div>
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Users className="w-5 h-5" /></div>
          </div>
        </div>
        <div className="card p-4 border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div><p className="text-sm font-medium text-slate-500">Resettled</p><h3 className="text-2xl font-bold text-slate-800">{isCitizen ? '1 (Completed)' : isCollector ? '5,120' : isState ? '8,920' : '45,000'}</h3></div>
            <div className="p-2 bg-green-50 rounded-lg text-green-600"><Home className="w-5 h-5" /></div>
          </div>
        </div>
        <div className="card p-4 border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div><p className="text-sm font-medium text-slate-500">In Progress</p><h3 className="text-2xl font-bold text-slate-800">{isCitizen ? '0' : isCollector ? '2,100' : isState ? '4,100' : '25,000'}</h3></div>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Briefcase className="w-5 h-5" /></div>
          </div>
        </div>
        <div className="card p-4 border-l-4 border-orange-500">
          <div className="flex justify-between items-start">
            <div><p className="text-sm font-medium text-slate-500">Pending</p><h3 className="text-2xl font-bold text-slate-800">{isCitizen ? '0' : isCollector ? '1,200' : isState ? '1,780' : '12,000'}</h3></div>
            <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><CheckCircle2 className="w-5 h-5" /></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-1">
          <h3 className="font-bold text-slate-800 mb-4">R&R Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={rrStatusData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {rrStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <RechartsTooltip formatter={(value) => value.toLocaleString()} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card lg:col-span-2">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h3 className="font-bold text-slate-800">
              {isCitizen ? 'My Resettlement Package & Entitlement Record' : 'Official Resettlement Records'}
            </h3>
            <span className="text-xs text-slate-500">
              Showing {filteredRrRecords.length} records in jurisdiction
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Family / ID</th>
                  <th>Project / Location</th>
                  <th>Housing</th>
                  <th>Employment</th>
                  <th>Annuity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRrRecords.map(record => (
                  <tr key={record.id}>
                    <td>
                      <div className="font-medium text-slate-800">{record.family}</div>
                      <div className="text-xs text-slate-500">{record.id}</div>
                    </td>
                    <td>
                      <div className="text-sm font-medium text-primary-900">{record.project}</div>
                      <div className="text-xs text-slate-500">{record.originalVillage} → {record.resettlementSite || 'TBD'}</div>
                    </td>
                    <td className="text-center">{record.housingProvided ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-400 mx-auto" />}</td>
                    <td className="text-center">{record.employmentAssistance ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-400 mx-auto" />}</td>
                    <td className="text-center">{record.annuity ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-400 mx-auto" />}</td>
                    <td>
                      <span className={`badge ${getStatusColor(record.status)}`}>{record.status}</span>
                      {record.dateCompleted && <div className="text-xs text-slate-500 mt-1">{record.dateCompleted}</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
