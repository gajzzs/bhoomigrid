import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, MapPin, FolderKanban, FilePlus, 
  CheckSquare, IndianRupee, Home, FileText, 
  BarChart3, Bell, Settings, UserCheck, HelpCircle, FileCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const isCitizen = user?.role === 'citizen_landowner';
  
  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
  };

  const navClass = ({ isActive }) => 
    `flex items-center gap-3 px-3.5 py-2.5 text-xs font-medium rounded-lg mx-2.5 transition-all ${
      isActive 
        ? 'bg-primary-50 text-primary-900 border-l-4 border-primary-700 shadow-xs font-semibold' 
        : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
    }`;

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-full overflow-y-auto no-print">
      {/* User profile capsule */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/70">
        <div className="w-10 h-10 rounded-full bg-primary-800 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
          {getInitials(user?.name)}
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-xs font-bold text-slate-800 truncate">{user?.name || 'Guest User'}</span>
          <span className="text-[11px] font-medium text-primary-700 truncate">{user?.roleLabel || 'Official'}</span>
          <span className="text-[10px] text-slate-400 truncate">{user?.district ? `${user.district}, ${user.state}` : user?.state || 'Govt of India'}</span>
        </div>
      </div>
      
      <div className="flex-1 py-3 space-y-4">
        {/* Citizen Specific Navigation */}
        {isCitizen ? (
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 mb-2">My Land & Entitlements</div>
            <NavLink to="/" className={navClass} end>
              <LayoutDashboard size={17} />
              <span>Citizen Dashboard</span>
            </NavLink>
            <NavLink to="/compensation" className={navClass}>
              <IndianRupee size={17} />
              <span>My Compensation & DBT</span>
            </NavLink>
            <NavLink to="/rehabilitation" className={navClass}>
              <Home size={17} />
              <span>My R&R Entitlements</span>
            </NavLink>
            <NavLink to="/documents" className={navClass}>
              <FileCheck size={17} />
              <span>Official Orders & Sanads</span>
            </NavLink>
            <NavLink to="/map" className={navClass}>
              <MapPin size={17} />
              <span>Interactive GIS Parcel</span>
            </NavLink>
            
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 mt-5 mb-2">Public Services</div>
            <NavLink to="/notifications" className={navClass}>
              <Bell size={17} />
              <span>Alerts & SMS Logs</span>
            </NavLink>
            <NavLink to="/settings" className={navClass}>
              <Settings size={17} />
              <span>Bank & Aadhaar Profile</span>
            </NavLink>
          </div>
        ) : (
          /* Official Administrative Navigation */
          <>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 mb-1.5">Overview</div>
              <NavLink to="/" className={navClass} end>
                <LayoutDashboard size={17} />
                <span>Jurisdiction Dashboard</span>
              </NavLink>
              <NavLink to="/map" className={navClass}>
                <MapPin size={17} />
                <span>GIS Cadastral Map</span>
              </NavLink>
            </div>
            
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 mb-1.5">Acquisition Workflow</div>
              <NavLink to="/projects" className={navClass}>
                <FolderKanban size={17} />
                <span>Projects Directory</span>
              </NavLink>
              {user?.role === 'project_agency' || user?.role === 'central_admin' ? (
                <NavLink to="/proposals/new" className={navClass}>
                  <FilePlus size={17} />
                  <span>Submit Requisition</span>
                </NavLink>
              ) : null}
              <NavLink to="/approvals" className={navClass}>
                <CheckSquare size={17} />
                <span>
                  {user?.role === 'district_collector' ? 'Collectorate Hearings' : 'Statutory Approvals'}
                </span>
              </NavLink>
            </div>
            
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 mb-1.5">Disbursements & R&R</div>
              <NavLink to="/compensation" className={navClass}>
                <IndianRupee size={17} />
                <span>Compensation & Solatium</span>
              </NavLink>
              <NavLink to="/rehabilitation" className={navClass}>
                <Home size={17} />
                <span>R&R Resettlement</span>
              </NavLink>
            </div>
            
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 mb-1.5">Records & Governance</div>
              <NavLink to="/documents" className={navClass}>
                <FileText size={17} />
                <span>Gazettes & Repository</span>
              </NavLink>
              <NavLink to="/reports" className={navClass}>
                <BarChart3 size={17} />
                <span>MIS Analytics Reports</span>
              </NavLink>
            </div>
            
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 mb-1.5">System Administration</div>
              <NavLink to="/notifications" className={navClass}>
                <Bell size={17} />
                <span>Notifications & Deadlines</span>
              </NavLink>
              <NavLink to="/settings" className={navClass}>
                <Settings size={17} />
                <span>System & API Settings</span>
              </NavLink>
            </div>
          </>
        )}
      </div>

      {/* Compliance footer in sidebar */}
      <div className="p-3 border-t border-slate-100 bg-slate-50 text-[10px] text-slate-500">
        <div className="font-semibold text-slate-700">LARR Act 2013 Compliant</div>
        <div className="text-slate-400">Portal Version 2.4.0 (National)</div>
      </div>
    </div>
  );
};

export default Sidebar;
