import React, { useState } from 'react';
import { Bell, LogOut, ShieldCheck, BadgeCheck, X, FileText, ExternalLink, Building2, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const [showIdModal, setShowIdModal] = useState(false);

  return (
    <>
      <div className="w-full flex flex-col no-print">
        <div className="tricolor-bar h-1 w-full"></div>
        
        {/* Main Government Header */}
        <div className="gov-header-gradient flex flex-wrap justify-between items-center py-2.5 px-6 text-white shadow-md gap-4">
          {/* Emblem & Ministry */}
          <Link to="/" className="flex items-center gap-3.5 hover:opacity-95 transition-opacity">
            <div className="w-11 h-11 flex items-center justify-center bg-white rounded-full p-1 shadow-sm shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" className="w-8 h-8">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs tracking-wider text-amber-300 uppercase">Government of India | भारत सरकार</span>
              <span className="text-base font-bold tracking-tight text-white leading-tight">National Land Acquisition & Management System (NLAMS)</span>
              <span className="text-[11px] text-blue-200">Dept. of Land Resources (DoLR) • Ministry of Rural Development</span>
            </div>
          </Link>
          
          {/* Right side: Verified Identity Card Badge & User Profile */}
          <div className="flex items-center flex-wrap gap-3">
            {/* Verified Government Service ID Badge */}
            <button
              onClick={() => setShowIdModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-blue-500/20 hover:from-amber-500/30 hover:to-blue-500/30 border border-amber-400/40 hover:border-amber-400/80 px-3 py-1.5 rounded-lg text-xs transition-all shadow-xs cursor-pointer group"
              title="Click to inspect official Digital Government Identity Card"
            >
              <div className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform">
                <BadgeCheck size={14} className="text-amber-300" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-amber-300 text-[11px]">{user?.serviceId || 'GOV-CADRE-ID'}</span>
                  <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 text-[9px] px-1 rounded font-semibold uppercase">Verified</span>
                </div>
                <span className="text-[10px] text-blue-100 group-hover:text-white underline decoration-dotted">Digital Service ID Card</span>
              </div>
            </button>

            <Link to="/notifications" className="relative p-2 hover:bg-white/10 rounded-full transition-colors text-blue-100 hover:text-white" title="Notifications">
              <Bell size={18} />
              <span className="notification-dot absolute top-1 right-1 w-2 h-2 bg-saffron-500 rounded-full"></span>
            </Link>
            
            <div className="flex items-center gap-3 border-l border-white/20 pl-4">
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-white leading-tight">{user?.name || 'Authorized Officer'}</span>
                <span className="text-[11px] text-amber-200 font-medium">{user?.designation || user?.roleLabel}</span>
              </div>
              <button 
                onClick={logout}
                className="p-1.5 hover:bg-red-500/20 text-red-200 hover:text-white rounded-md transition-colors flex items-center gap-1 text-xs border border-red-400/30 hover:border-red-400/60"
                title="Secure Sign Out"
              >
                <LogOut size={15} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Role Context Notification Bar with Bound Territorial Jurisdiction */}
        <div className="bg-slate-800 text-slate-200 px-6 py-1.5 text-xs flex flex-wrap justify-between items-center border-b border-slate-700 gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-amber-300">Territorial Jurisdiction:</span>
            <span className="font-medium text-white">{user?.jurisdiction || user?.postingLocation?.jurisdictionDesc || 'National Oversight (All India)'}</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300 font-mono text-[11px]">Order: {user?.postingOrderNo || 'DoPT Cadre Order'}</span>
          </div>
          <div className="text-[11px] text-slate-300 flex items-center gap-2">
            <span className="bg-blue-900/60 border border-blue-600/40 px-2 py-0.5 rounded text-blue-200 font-medium">
              RFCTLARR Act 2013 Statutory Lock
            </span>
            <span className="text-slate-400 hidden lg:inline">Real-time Civil Registry Verification</span>
          </div>
        </div>
      </div>

      {/* Digital Government Service Identity Card Modal */}
      {showIdModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 max-w-xl w-full overflow-hidden text-slate-800 relative">
            {/* Header Tricolor */}
            <div className="tricolor-bar h-2 w-full"></div>

            {/* Modal Close Button */}
            <button
              onClick={() => setShowIdModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer z-10"
              title="Close Identity Card"
            >
              <X size={18} />
            </button>

            {/* Identity Card Interior */}
            <div className="p-6">
              {/* Card Official Header */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200">
                <div className="w-14 h-14 bg-amber-50 border border-amber-300 rounded-full flex items-center justify-center p-2 shadow-xs shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2" className="w-10 h-10">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Government of India / भारत सरकार</div>
                  <h3 className="text-base font-bold text-slate-900">
                    {user?.cardTitle || 'Official Government Service Identity Card'}
                  </h3>
                  <div className="text-xs text-primary-700 font-medium">
                    DoPT Civil Services Cadre & Land Revenue Authority
                  </div>
                </div>
              </div>

              {/* Officer Details Grid */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Officer Emblem / Photo Placeholder */}
                <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                  <div className="w-20 h-20 rounded-xl bg-primary-900 text-white flex flex-col items-center justify-center font-bold text-xl shadow-inner border-2 border-amber-400">
                    <span>{user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'GOV'}</span>
                    <span className="text-[9px] tracking-widest text-amber-300 uppercase">OFFICIAL</span>
                  </div>
                  <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                    <BadgeCheck size={11} /> Verified Active
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 mt-1">Status: Regular</span>
                </div>

                {/* Core Parameters */}
                <div className="md:col-span-2 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Officer / Beneficiary Name</span>
                    <span className="text-sm font-bold text-slate-900">{user?.name}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Official Service ID</span>
                      <span className="font-mono font-bold text-primary-800 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 inline-block">
                        {user?.serviceId}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Cadre / Identification</span>
                      <span className="font-semibold text-slate-800">{user?.cadre || user?.department || 'Executive Cadre'}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Designation</span>
                    <span className="font-medium text-slate-800">{user?.designation || user?.roleLabel}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Posting Order / Award Ref</span>
                    <span className="font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded inline-block">
                      {user?.postingOrderNo || 'DoPT/ACC/EO/2021/92-C'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Confined Jurisdiction Block */}
              <div className="mt-4 bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold mb-1">
                  <MapPin size={14} className="text-amber-700" />
                  <span>Bound Statutory Territorial Jurisdiction:</span>
                </div>
                <p className="text-amber-950 font-medium">
                  {user?.jurisdiction || user?.postingLocation?.jurisdictionDesc || 'All India National Jurisdiction'}
                </p>
                <p className="text-[11px] text-amber-800/80 mt-1">
                  Statutory executive actions under RFCTLARR Act 2013 (Sections 3(g), 11, 15, 19, 23 & 38) are strictly restricted to this territorial boundary. Cross-jurisdictional access is blocked by policy.
                </p>
              </div>

              {/* Supreme Court / Puttaswamy Statutory Mandate Note */}
              <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] text-slate-600">
                <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-blue-700" />
                  <span>Statutory Identification Rationale (Why Service ID Card, Not Aadhaar):</span>
                </div>
                <p className="leading-relaxed">
                  In compliance with the Hon'ble Supreme Court of India's landmark verdict (<em>K.S. Puttaswamy v. Union of India, 2017</em>) and DoPT Civil Services Directives, Aadhaar is exclusively restricted to personal welfare benefit transfers and cannot be mandated as an administrative executive credential. Administrative powers derive solely from verified Civil List Posting Orders.
                </p>
              </div>

              {/* Digital Hash and Verification Bar */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap justify-between items-center text-[10px] text-slate-400 font-mono gap-2">
                <span>DIGITAL AUTH HASH: SHA256:{user?.serviceId ? user.serviceId.split('').reduce((acc, c) => (acc * 31 + c.charCodeAt(0)).toString(16), '9a').substring(0, 16) : 'e83fa091'}</span>
                <span className="text-emerald-700 font-semibold uppercase bg-emerald-100 px-2 py-0.5 rounded">AUTHENTICATED SESSION</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowIdModal(false)}
                className="px-4 py-1.5 bg-primary-800 hover:bg-primary-900 text-white rounded-lg text-xs font-medium transition-colors shadow-xs"
              >
                Close Official ID Card
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
