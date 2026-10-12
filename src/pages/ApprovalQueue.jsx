import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Clock, Eye, Send, CheckCircle2, AlertCircle, ShieldCheck, 
  FileText, Check, Building2, MapPin, Calendar, ChevronRight, 
  ArrowRight, Lock, BadgeCheck, FileCheck, X, Award, ExternalLink
} from 'lucide-react';
import { proposals, getStatusColor } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const STORAGE_KEY = 'nlams_proposals_data';

export default function ApprovalQueue() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [actionSuccess, setActionSuccess] = useState('');
  const [scrutinyRemarks, setScrutinyRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verification Checklist State
  const [checklist, setChecklist] = useState({
    cadastralSync: true,
    siaQuorum: true,
    sec15Objections: true,
    rrSchemeAligned: true,
    ecoSensitiveClear: true,
  });

  // Reactive state synced with localStorage and backend API
  const [proposalsList, setProposalsList] = useState(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Check that cached items conform to the 3-tier hierarchy structure
          const isValidV2 = parsed.every(p => p.approvalStatus && Array.isArray(p.workflowHistory) && p.workflowHistory.length > 0);
          if (isValidV2) return parsed;
        }
      }
    } catch (e) {}
    return proposals;
  });

  // Sync with backend on mount
  useEffect(() => {
    async function loadBackendProposals() {
      try {
        const res = await api.proposals.getAll();
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          setProposalsList(prev => {
            const serverMap = new Map(res.data.map(p => [p.id, p]));
            // Merge server proposals with any active local modifications
            const merged = res.data.map(serverP => {
              const localP = prev.find(p => p.id === serverP.id);
              if (localP && localP.approvalStatus && localP.approvalStatus !== serverP.approvalStatus) {
                return { ...serverP, ...localP };
              }
              return serverP;
            });
            prev.forEach(p => {
              if (!serverMap.has(p.id)) {
                merged.push(p);
              }
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            return merged;
          });
        }
      } catch (err) {
        // Graceful fallback to existing local state
      }
    }
    loadBackendProposals();

    // Listen for cross-tab or cross-session storage updates
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setProposalsList(JSON.parse(e.newValue));
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Statutory role & territorial jurisdiction boundaries
  const role = user?.role || 'central_admin';
  const isCentral = role === 'central_admin';
  const isState = role === 'state_officer';
  const isCollector = role === 'district_collector';
  const isAgency = role === 'project_agency';

  // Helper to persist proposal updates
  const persistProposals = (updatedList) => {
    setProposalsList(updatedList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}
  };

  // Helper: check if active officer is empowered to take action on this proposal
  const canActOnProposal = (p) => {
    const status = p.approvalStatus || 'PENDING_STATE_SCRUTINY';
    if (isCollector) {
      return status === 'DISTRICT_PROPOSED' || p.currentAuthority === 'DISTRICT';
    }
    if (isState) {
      return status === 'PENDING_STATE_SCRUTINY' || p.currentAuthority === 'STATE';
    }
    if (isCentral) {
      return status === 'PENDING_CENTRAL_APPROVAL' || p.currentAuthority === 'CENTRAL';
    }
    return false;
  };

  // Filter proposals strictly bounded by territorial jurisdiction
  const jurisdictionProposals = useMemo(() => {
    return proposalsList.filter(p => {
      if (isState && user?.state) {
        const uState = user.state.toLowerCase();
        const pState = (p.state || '').toLowerCase();
        if (!pState.includes(uState) && !uState.includes(pState)) return false;
      }
      if (isCollector && user?.district) {
        const uDist = user.district.toLowerCase();
        const pDist = (p.district || '').toLowerCase();
        if (!pDist.includes(uDist) && !uDist.includes(pDist)) return false;
      }
      if (isAgency && !p.requestingBody.includes('NHAI') && p.category !== 'Highways') return false;
      return true;
    });
  }, [proposalsList, isState, isCollector, isAgency, user]);

  // Tab & search filtering
  const filteredProposals = useMemo(() => {
    return jurisdictionProposals.filter(p => {
      const status = p.approvalStatus || 'PENDING_STATE_SCRUTINY';

      // Tab filter
      if (activeTab === 'action_needed' && !canActOnProposal(p)) return false;
      if (activeTab === 'pending_state' && status !== 'PENDING_STATE_SCRUTINY' && status !== 'DISTRICT_PROPOSED') return false;
      if (activeTab === 'pending_central' && status !== 'PENDING_CENTRAL_APPROVAL') return false;
      if (activeTab === 'sanctioned' && status !== 'CENTRAL_APPROVED') return false;
      if (activeTab === 'critical' && p.urgency !== 'Critical') return false;

      // Search filter
      const q = searchTerm.toLowerCase();
      const matchSearch = p.projectName.toLowerCase().includes(q) || 
                          p.id.toLowerCase().includes(q) ||
                          p.requestingBody.toLowerCase().includes(q) ||
                          (p.gazetteOrderNo && p.gazetteOrderNo.toLowerCase().includes(q));
      return matchSearch;
    }).sort((a, b) => {
      // Prioritize items requiring current user's action
      const aCanAct = canActOnProposal(a);
      const bCanAct = canActOnProposal(b);
      if (aCanAct && !bCanAct) return -1;
      if (!aCanAct && bCanAct) return 1;
      if (a.urgency === 'Critical' && b.urgency !== 'Critical') return -1;
      if (a.urgency !== 'Critical' && b.urgency === 'Critical') return 1;
      return 0;
    });
  }, [jurisdictionProposals, activeTab, searchTerm, isCollector, isState, isCentral]);

  // Counts for KPIs
  const totalCount = jurisdictionProposals.length;
  const actionNeededCount = jurisdictionProposals.filter(canActOnProposal).length;
  const pendingCentralCount = jurisdictionProposals.filter(p => (p.approvalStatus || '') === 'PENDING_CENTRAL_APPROVAL').length;
  const sanctionedCount = jurisdictionProposals.filter(p => (p.approvalStatus || '') === 'CENTRAL_APPROVED').length;

  // Open modal handler
  const handleOpenDocket = (proposal) => {
    setSelectedProposal(proposal);
    const defaultRemark = isCollector
      ? `Field Joint Measurement Survey and Section 15 inquiries concluded. No unrecorded tenancy disputes found. Recommended for formal proposal to State Revenue Department.`
      : isState
      ? `Proposal scrutinized under Section 15(2) and Section 19(1). Boundary alignments confirmed against Mahabhulekh cadastral maps. R&R scheme aligned with Second Schedule. Endorsed and forwarded to Central Ministry for Section 19 Gazette Declaration.`
      : `Statutory Section 19 National Sanction granted. Land Acquisition award budget authorized. Direct Benefit Transfer disbursement cleared upon Section 23 declaration.`;
    setScrutinyRemarks(defaultRemark);
  };

  // 1. STEP 1: District Collector proposes to State
  const handleDistrictPropose = async (proposal) => {
    setIsSubmitting(true);
    const today = new Date().toISOString().split('T')[0];
    const officerName = user?.name || `District Collector (${user?.district || 'CALA'})`;

    try {
      await api.proposals.action(proposal.id, {
        action: 'district_propose',
        remarks: scrutinyRemarks,
        officerName,
        role: 'district_collector'
      }).catch(() => null);

      const updated = proposalsList.map(p => {
        if (p.id === proposal.id) {
          const history = [...(p.workflowHistory || [])];
          history[0] = {
            ...history[0],
            status: 'COMPLETED',
            date: today,
            remarks: scrutinyRemarks
          };
          if (history[1]) {
            history[1] = {
              ...history[1],
              status: 'IN_PROGRESS',
              date: today
            };
          }
          return {
            ...p,
            approvalStatus: 'PENDING_STATE_SCRUTINY',
            currentAuthority: 'STATE',
            assignedTo: `State Revenue Department, ${p.state}`,
            stage: 'Pending State Government Scrutiny',
            stageCode: 6,
            remarks: scrutinyRemarks,
            lastAction: today,
            workflowHistory: history,
          };
        }
        return p;
      });

      persistProposals(updated);
      setActionSuccess(`Proposal ${proposal.id} successfully submitted by District Collectorate to State Revenue Department for statutory scrutiny.`);
      setSelectedProposal(null);
      setTimeout(() => setActionSuccess(''), 7000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. STEP 2: State Officer scrutinizes & forwards to Central Ministry
  const handleStateForwardToCentral = async (proposal) => {
    setIsSubmitting(true);
    const today = new Date().toISOString().split('T')[0];
    const officerName = user?.name || 'State Revenue Secretary, Maharashtra';

    try {
      await api.proposals.action(proposal.id, {
        action: 'forward_to_central',
        remarks: scrutinyRemarks,
        officerName,
        role: 'state_officer'
      }).catch(() => null);

      const updated = proposalsList.map(p => {
        if (p.id === proposal.id) {
          const history = [...(p.workflowHistory || [])];
          if (history[1]) {
            history[1] = {
              ...history[1],
              status: 'COMPLETED',
              officer: officerName,
              date: today,
              remarks: scrutinyRemarks
            };
          }
          if (history[2]) {
            history[2] = {
              ...history[2],
              status: 'IN_PROGRESS',
              date: today
            };
          }
          return {
            ...p,
            approvalStatus: 'PENDING_CENTRAL_APPROVAL',
            currentAuthority: 'CENTRAL',
            assignedTo: 'Ministry of Rural Development (DoLR), New Delhi',
            stage: 'Awaiting Central Ministry Sanction u/s 19',
            stageCode: 8,
            remarks: scrutinyRemarks,
            lastAction: today,
            workflowHistory: history,
          };
        }
        return p;
      });

      persistProposals(updated);
      setActionSuccess(`Proposal ${proposal.id} scrutinized by State Revenue Department and forwarded to Central Ministry (DoLR/MoRD). Status updated to: Pending Central Approval.`);
      setSelectedProposal(null);
      setTimeout(() => setActionSuccess(''), 7000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. STEP 3: Central Admin grants Statutory National Sanction & Issues Gazette
  const handleCentralGrantSanction = async (proposal) => {
    setIsSubmitting(true);
    const today = new Date().toISOString().split('T')[0];
    const officerName = user?.name || 'Dr. Rajesh Kumar Sharma, IAS';
    const gazetteOrderNo = `CG-DL-E-2024-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      await api.proposals.action(proposal.id, {
        action: 'central_approve',
        remarks: scrutinyRemarks,
        officerName,
        role: 'central_admin',
        gazetteOrderNo
      }).catch(() => null);

      const updated = proposalsList.map(p => {
        if (p.id === proposal.id) {
          const history = [...(p.workflowHistory || [])];
          if (history[2]) {
            history[2] = {
              ...history[2],
              status: 'COMPLETED',
              officer: officerName,
              date: today,
              remarks: `Gazette notification published: ${gazetteOrderNo}. Final national sanction granted under Section 19.`
            };
          }
          return {
            ...p,
            approvalStatus: 'CENTRAL_APPROVED',
            currentAuthority: 'SANCTIONED',
            assignedTo: 'Sanctioned & Gazette Issued',
            stage: 'Statutory Central Sanction Granted (Gazette Published)',
            stageCode: 9,
            gazetteOrderNo,
            gazetteDate: today,
            remarks: scrutinyRemarks,
            lastAction: today,
            workflowHistory: history,
          };
        }
        return p;
      });

      persistProposals(updated);
      setActionSuccess(`Statutory Central Sanction successfully granted for ${proposal.id}! Gazette Order No. ${gazetteOrderNo} published in Gazette of India Extraordinary.`);
      setSelectedProposal(null);
      setTimeout(() => setActionSuccess(''), 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-enter p-6 space-y-6">
      {/* Title & Scope header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="badge bg-primary-100 text-primary-800 text-xs px-2.5 py-0.5 font-semibold">
              Statutory Scrutiny & Sanctions Desk
            </span>
            <span className="text-xs text-slate-500 font-medium">RFCTLARR Act 2013 Statutory Authority</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Approval Queue & Clearance Desk</h1>
          <p className="text-slate-500 text-xs">
            अनुमोदन कतार • 3-Tier Statutory Clearance: District Proposal → State Scrutiny → Central Ministry Sanction
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-xs">
          <ShieldCheck size={16} className="text-primary-700" />
          <div className="flex flex-col text-left">
            <span className="font-semibold text-slate-900">{user?.roleLabel || 'Official Authority'}</span>
            <span className="text-[10px] text-slate-500 font-mono">Service ID: {user?.serviceId || 'GOV-SECURE-ID'}</span>
          </div>
        </div>
      </div>

      {/* Success Notification Banner */}
      {actionSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-xl flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2.5 text-xs font-semibold">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
          <span className="badge badge-success text-[10px]">Statutory Ledger Updated</span>
        </div>
      )}

      {/* 4 Unified KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4 border-l-4 border-blue-600">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total in Scrutiny</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalCount} {totalCount === 1 ? 'Case' : 'Cases'}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Jurisdictional proposals</p>
            </div>
            <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600"><Clock className="w-5 h-5" /></div>
          </div>
        </div>

        <div className="card p-4 border-l-4 border-amber-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Action Required by You</p>
              <h3 className="text-2xl font-bold text-amber-900 mt-1">{actionNeededCount} {actionNeededCount === 1 ? 'Case' : 'Cases'}</h3>
              <p className="text-[11px] text-amber-700 mt-0.5">
                {isCentral ? 'Awaiting Central Sanction' : isState ? 'Awaiting State Scrutiny' : 'Ready to Propose to State'}
              </p>
            </div>
            <div className="p-2.5 bg-amber-50 rounded-lg text-amber-600"><AlertCircle className="w-5 h-5" /></div>
          </div>
        </div>

        <div className="card p-4 border-l-4 border-indigo-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Central Ministry</p>
              <h3 className="text-2xl font-bold text-indigo-700 mt-1">{pendingCentralCount} {pendingCentralCount === 1 ? 'Case' : 'Cases'}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Section 19 Central clearance</p>
            </div>
            <div className="p-2.5 bg-indigo-50 rounded-lg text-indigo-600"><Building2 className="w-5 h-5" /></div>
          </div>
        </div>

        <div className="card p-4 border-l-4 border-emerald-600">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Central Sanctioned</p>
              <h3 className="text-2xl font-bold text-emerald-700 mt-1">{sanctionedCount} {sanctionedCount === 1 ? 'Case' : 'Cases'}</h3>
              <p className="text-[11px] text-emerald-600 mt-0.5">Gazette orders published</p>
            </div>
            <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-600"><Award className="w-5 h-5" /></div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card overflow-hidden">
        <div className="border-b px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50/70">
          {/* Statutory Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: `All Proposals (${totalCount})` },
              { id: 'action_needed', label: `Action Needed (${actionNeededCount})`, highlight: actionNeededCount > 0 },
              { id: 'pending_state', label: 'Pending State Scrutiny' },
              { id: 'pending_central', label: 'Pending Central Sanction' },
              { id: 'sanctioned', label: 'Sanctioned Orders' },
            ].map(tab => (
              <button
                key={tab.id}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-primary-800 text-white shadow-xs' 
                    : tab.highlight
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by ID, Project, Gazette Ref..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-9 text-xs py-1.5 w-full sm:w-64"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="data-table w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
              <tr>
                <th className="py-2.5 px-3">Proposal ID</th>
                <th className="py-2.5 px-3">Project & Agency</th>
                <th className="py-2.5 px-3">Statutory Stage</th>
                <th className="py-2.5 px-3">Approval Status & Assigned Level</th>
                <th className="py-2.5 px-3">Jurisdiction</th>
                <th className="py-2.5 px-3">Land Req.</th>
                <th className="py-2.5 px-3 text-right">Statutory Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProposals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No proposals matching the selected filter in your jurisdiction.
                  </td>
                </tr>
              ) : (
                filteredProposals.map(proposal => {
                  const status = proposal.approvalStatus || 'PENDING_STATE_SCRUTINY';
                  const isActionable = canActOnProposal(proposal);

                  return (
                    <tr key={proposal.id} className={`hover:bg-slate-50 transition-colors ${isActionable ? 'bg-amber-50/40' : ''}`}>
                      <td className="py-3 px-3 font-bold text-primary-900">
                        {proposal.id}
                        {proposal.urgency === 'Critical' && (
                          <span className="badge badge-danger text-[9px] py-0 px-1 ml-1 font-bold">CRITICAL</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-800 text-xs">{proposal.projectName}</div>
                        <div className="text-[11px] text-slate-500">{proposal.requestingBody}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="badge badge-info text-[11px] font-medium">{proposal.stage}</span>
                        <div className="text-[10px] text-slate-400 mt-0.5">Stage #{proposal.stageCode || 5} of 12</div>
                      </td>
                      <td className="py-3 px-3">
                        {status === 'CENTRAL_APPROVED' ? (
                          <div>
                            <span className="badge badge-success text-[10px] font-bold flex items-center gap-1 w-fit">
                              <CheckCircle2 size={12} /> Central Sanctioned
                            </span>
                            <span className="text-[10px] font-mono text-emerald-800 font-semibold block mt-0.5">
                              {proposal.gazetteOrderNo || 'Gazette Order Published'}
                            </span>
                          </div>
                        ) : status === 'PENDING_CENTRAL_APPROVAL' ? (
                          <div>
                            <span className="badge bg-indigo-100 text-indigo-800 border border-indigo-200 text-[10px] font-bold flex items-center gap-1 w-fit">
                              <Clock size={12} /> Pending Central Approval
                            </span>
                            <span className="text-[10px] text-slate-500 block mt-0.5">
                              Forwarded to Ministry (DoLR/MoRD)
                            </span>
                          </div>
                        ) : status === 'PENDING_STATE_SCRUTINY' ? (
                          <div>
                            <span className="badge bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold flex items-center gap-1 w-fit">
                              <Clock size={12} /> Pending State Scrutiny
                            </span>
                            <span className="text-[10px] text-slate-500 block mt-0.5">
                              Awaiting State Revenue Secretary
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span className="badge badge-neutral text-[10px] font-bold w-fit">
                              District Field Draft
                            </span>
                            <span className="text-[10px] text-slate-500 block mt-0.5">
                              Collectorate Joint Survey
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-slate-700">{proposal.state}</div>
                        <div className="text-[10px] text-slate-400">{proposal.district}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-slate-800">{proposal.landRequired} Ha</span>
                        <div className="text-[10px] text-slate-400">₹{proposal.estimatedCompensation} Cr</div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex justify-end gap-1.5 items-center">
                          {/* Role-Specific Action Button */}
                          {isCentral && status === 'PENDING_CENTRAL_APPROVAL' ? (
                            <button 
                              onClick={() => handleOpenDocket(proposal)}
                              className="btn btn-sm text-[11px] py-1 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center gap-1 shadow-xs cursor-pointer"
                            >
                              <ShieldCheck size={13} /> Grant Central Sanction
                            </button>
                          ) : isState && (status === 'PENDING_STATE_SCRUTINY' || status === 'DISTRICT_PROPOSED') ? (
                            <button 
                              onClick={() => handleOpenDocket(proposal)}
                              className="btn btn-primary btn-sm text-[11px] py-1 px-3 flex items-center gap-1 font-bold cursor-pointer"
                            >
                              <Eye size={13} /> Scrutinize & Forward
                            </button>
                          ) : isCollector && status === 'DISTRICT_PROPOSED' ? (
                            <button 
                              onClick={() => handleOpenDocket(proposal)}
                              className="btn btn-sm text-[11px] py-1 px-3 bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center gap-1 shadow-xs cursor-pointer"
                            >
                              <Send size={13} /> Propose to State
                            </button>
                          ) : status === 'CENTRAL_APPROVED' ? (
                            <button 
                              onClick={() => handleOpenDocket(proposal)}
                              className="btn btn-outline btn-sm text-[11px] py-1 px-2.5 text-emerald-800 border-emerald-300 hover:bg-emerald-50 flex items-center gap-1 font-semibold cursor-pointer"
                            >
                              <Award size={13} className="text-emerald-600" /> View Gazette Order
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleOpenDocket(proposal)}
                              className="btn btn-outline btn-sm text-[11px] py-1 px-2.5 text-slate-600 border-slate-200 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                              title="Inspect Scrutiny Docket"
                            >
                              <FileText size={13} /> View Docket
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Government Scrutiny Docket & Clearance Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden my-8">
            {/* Header Tricolor */}
            <div className="tricolor-bar h-2 w-full"></div>

            {/* Modal Header */}
            <div className="gov-header-gradient p-5 text-white flex justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="badge bg-amber-400 text-amber-950 font-bold text-[10px] px-2 py-0.5 uppercase tracking-wider">
                    RFCTLARR Act 2013 Statutory Clearance Docket
                  </span>
                  <span className="text-xs text-blue-200 font-mono">ID: {selectedProposal.id}</span>
                </div>
                <h3 className="text-lg font-bold mt-1 leading-snug">{selectedProposal.projectName}</h3>
                <p className="text-xs text-blue-100">
                  Requiring Body: {selectedProposal.requestingBody} • Jurisdiction: {selectedProposal.district}, {selectedProposal.state}
                </p>
              </div>
              <button 
                onClick={() => setSelectedProposal(null)} 
                className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-xs max-h-[75vh] overflow-y-auto">
              {/* 3-Tier Hierarchy Visual Progress Stepper */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                    Statutory Approval Hierarchy Pipeline
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">LARR Act 2013 Section 11 → 15 → 19 Chain</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
                  {/* Step 1: District */}
                  <div className={`p-3 rounded-xl border ${
                    selectedProposal.approvalStatus === 'DISTRICT_PROPOSED' 
                      ? 'bg-amber-50 border-amber-300' 
                      : 'bg-emerald-50 border-emerald-300'
                  }`}>
                    <div className="flex items-center gap-2 font-bold text-slate-800">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] font-bold ${
                        selectedProposal.approvalStatus === 'DISTRICT_PROPOSED' ? 'bg-amber-600' : 'bg-emerald-600'
                      }`}>
                        1
                      </div>
                      <span>District Collectorate</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Field Survey & Sec 15 Inquiry</div>
                    <div className="mt-2 text-[10px] font-semibold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 size={12} /> {selectedProposal.approvalStatus === 'DISTRICT_PROPOSED' ? 'Ready to Propose' : 'Verified by District'}
                    </div>
                  </div>

                  {/* Step 2: State */}
                  <div className={`p-3 rounded-xl border ${
                    selectedProposal.approvalStatus === 'PENDING_STATE_SCRUTINY'
                      ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200'
                      : selectedProposal.approvalStatus === 'PENDING_CENTRAL_APPROVAL' || selectedProposal.approvalStatus === 'CENTRAL_APPROVED'
                      ? 'bg-emerald-50 border-emerald-300'
                      : 'bg-slate-100 border-slate-200 text-slate-400'
                  }`}>
                    <div className="flex items-center gap-2 font-bold text-slate-800">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] font-bold ${
                        selectedProposal.approvalStatus === 'PENDING_STATE_SCRUTINY'
                          ? 'bg-amber-600'
                          : selectedProposal.approvalStatus === 'PENDING_CENTRAL_APPROVAL' || selectedProposal.approvalStatus === 'CENTRAL_APPROVED'
                          ? 'bg-emerald-600'
                          : 'bg-slate-400'
                      }`}>
                        2
                      </div>
                      <span>State Revenue Dept</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Statutory Scrutiny & Endorsement</div>
                    <div className="mt-2 text-[10px] font-semibold flex items-center gap-1">
                      {selectedProposal.approvalStatus === 'PENDING_STATE_SCRUTINY' ? (
                        <span className="text-amber-700 flex items-center gap-1">
                          <Clock size={12} /> Awaiting State Scrutiny
                        </span>
                      ) : selectedProposal.approvalStatus === 'PENDING_CENTRAL_APPROVAL' || selectedProposal.approvalStatus === 'CENTRAL_APPROVED' ? (
                        <span className="text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 size={12} /> Scrutinized & Recommended
                        </span>
                      ) : (
                        <span className="text-slate-400">Pending District Submission</span>
                      )}
                    </div>
                  </div>

                  {/* Step 3: Central */}
                  <div className={`p-3 rounded-xl border ${
                    selectedProposal.approvalStatus === 'CENTRAL_APPROVED'
                      ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-300'
                      : selectedProposal.approvalStatus === 'PENDING_CENTRAL_APPROVAL'
                      ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-200'
                      : 'bg-slate-100 border-slate-200 text-slate-400'
                  }`}>
                    <div className="flex items-center gap-2 font-bold text-slate-800">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] font-bold ${
                        selectedProposal.approvalStatus === 'CENTRAL_APPROVED'
                          ? 'bg-emerald-600'
                          : selectedProposal.approvalStatus === 'PENDING_CENTRAL_APPROVAL'
                          ? 'bg-blue-600'
                          : 'bg-slate-400'
                      }`}>
                        3
                      </div>
                      <span>Central Ministry (DoLR)</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Section 19 National Sanction</div>
                    <div className="mt-2 text-[10px] font-semibold flex items-center gap-1">
                      {selectedProposal.approvalStatus === 'CENTRAL_APPROVED' ? (
                        <span className="text-emerald-800 flex items-center gap-1 font-bold">
                          <CheckCircle2 size={12} /> Gazette Issued
                        </span>
                      ) : selectedProposal.approvalStatus === 'PENDING_CENTRAL_APPROVAL' ? (
                        <span className="text-blue-700 flex items-center gap-1 font-bold">
                          <Clock size={12} /> Awaiting Central Sanction
                        </span>
                      ) : (
                        <span className="text-slate-400">Awaiting State Endorsement</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sanctioned Certificate Highlight if Central Approved */}
              {selectedProposal.approvalStatus === 'CENTRAL_APPROVED' && (
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-400 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
                      <Award size={18} className="text-emerald-700" />
                      <span>Official Gazette of India Extraordinary Sanction Order</span>
                    </div>
                    <span className="badge badge-success text-[10px] font-bold">LEGALLY BINDING</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2 border-t border-emerald-200 text-[11px]">
                    <div>
                      <span className="text-slate-500">Gazette Order Ref:</span>
                      <div className="font-mono font-bold text-emerald-900">{selectedProposal.gazetteOrderNo || 'CG-DL-E-2024-749102'}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Sanction Authority:</span>
                      <div className="font-semibold text-slate-800">Ministry of Rural Development (DoLR)</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Sanction Date:</span>
                      <div className="font-semibold text-slate-800">{selectedProposal.gazetteDate || 'Today'}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quantum & Financial Summary Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Land Quantum</span>
                  <div className="font-bold text-sm text-emerald-700">{selectedProposal.landRequired} Hectares</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Est. Compensation</span>
                  <div className="font-bold text-sm text-slate-800">₹{selectedProposal.estimatedCompensation} Crores</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Affected Families</span>
                  <div className="font-bold text-sm text-slate-800">{selectedProposal.estimatedFamilies} Families</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Solatium Mandate</span>
                  <div className="font-bold text-sm text-primary-800">100% Solatium (Sec 30)</div>
                </div>
              </div>

              {/* Statutory Verification Checklist */}
              <div>
                <h4 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-2">
                  Digital Statutory Verification Checklist (RFCTLARR Compliance)
                </h4>
                <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={checklist.cadastralSync} 
                      onChange={e => setChecklist({ ...checklist, cadastralSync: e.target.checked })}
                      className="rounded text-primary-600 focus:ring-primary-500" 
                    />
                    <span className="text-slate-700">
                      Cadastral boundaries verified against State Digital Land Records (Bhulekh / AnyRoR sync).
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={checklist.siaQuorum} 
                      onChange={e => setChecklist({ ...checklist, siaQuorum: e.target.checked })}
                      className="rounded text-primary-600 focus:ring-primary-500" 
                    />
                    <span className="text-slate-700">
                      SIA Expert Group appraisal report submitted with public hearing minutes under Section 7.
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={checklist.sec15Objections} 
                      onChange={e => setChecklist({ ...checklist, sec15Objections: e.target.checked })}
                      className="rounded text-primary-600 focus:ring-primary-500" 
                    />
                    <span className="text-slate-700">
                      Section 15 landowner objections addressed and formally disposed of by Competent Authority.
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={checklist.rrSchemeAligned} 
                      onChange={e => setChecklist({ ...checklist, rrSchemeAligned: e.target.checked })}
                      className="rounded text-primary-600 focus:ring-primary-500" 
                    />
                    <span className="text-slate-700">
                      Rehabilitation & Resettlement (R&R) Scheme aligned with Second Schedule entitlements.
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={checklist.ecoSensitiveClear} 
                      onChange={e => setChecklist({ ...checklist, ecoSensitiveClear: e.target.checked })}
                      className="rounded text-primary-600 focus:ring-primary-500" 
                    />
                    <span className="text-slate-700">
                      PARIVESH Environmental / Forest Clearance confirmed with no unnotified eco-sensitive overlap.
                    </span>
                  </label>
                </div>
              </div>

              {/* Scrutiny Remarks & Statutory Observations */}
              <div>
                <h4 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-1">
                  Official Competent Authority Scrutiny Remarks
                </h4>
                <textarea 
                  rows={3}
                  value={scrutinyRemarks}
                  onChange={e => setScrutinyRemarks(e.target.value)}
                  className="form-input w-full text-xs p-3 rounded-lg border-slate-300 font-sans"
                  placeholder="Enter statutory scrutiny observations..."
                  disabled={selectedProposal.approvalStatus === 'CENTRAL_APPROVED'}
                />
              </div>

              {/* Statutory Jurisdiction Authority Banner in Modal */}
              {selectedProposal.approvalStatus === 'PENDING_CENTRAL_APPROVAL' && !isCentral ? (
                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-xs text-blue-950">
                    <Lock size={14} className="text-blue-700" />
                    <span>Statutory Authority Restriction Notice</span>
                  </div>
                  <p className="text-[11px] text-blue-800 leading-relaxed">
                    This proposal was scrutinized by the State Revenue Department and forwarded to the Central Ministry on {selectedProposal.lastAction}. 
                    Under Section 19 of the RFCTLARR Act 2013, the statutory power to grant final national clearance rests exclusively with the Central Government (Ministry of Rural Development / DoLR).
                  </p>
                </div>
              ) : null}
            </div>

            {/* Modal Footer with Role-Gated Action Buttons */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap justify-between items-center gap-3">
              <div className="text-[10px] text-slate-500 font-medium">
                Active Authority: <strong className="text-slate-800">{user?.name} ({user?.roleLabel})</strong>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSelectedProposal(null)}
                  className="btn btn-outline text-xs py-2 px-4 bg-white cursor-pointer"
                >
                  Close Docket
                </button>

                {/* 1. STATE OFFICER ACTION: Scrutinize & Forward to Central Ministry */}
                {isState && (selectedProposal.approvalStatus === 'PENDING_STATE_SCRUTINY' || selectedProposal.approvalStatus === 'DISTRICT_PROPOSED') ? (
                  <button 
                    disabled={isSubmitting}
                    onClick={() => handleStateForwardToCentral(selectedProposal)}
                    className="btn btn-primary text-xs py-2 px-5 font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Send size={14} />
                    <span>{isSubmitting ? 'Forwarding...' : 'Recommend & Forward to Central Ministry'}</span>
                  </button>
                ) : null}

                {/* 2. CENTRAL ADMIN ACTION: Grant Central Sanction & Gazette Publication */}
                {isCentral && selectedProposal.approvalStatus === 'PENDING_CENTRAL_APPROVAL' ? (
                  <button 
                    disabled={isSubmitting}
                    onClick={() => handleCentralGrantSanction(selectedProposal)}
                    className="btn btn-sm text-xs py-2 px-5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <ShieldCheck size={15} />
                    <span>{isSubmitting ? 'Issuing Sanction...' : 'Grant Statutory Central Sanction & Gazette'}</span>
                  </button>
                ) : null}

                {/* 3. DISTRICT COLLECTOR ACTION: Propose to State */}
                {isCollector && selectedProposal.approvalStatus === 'DISTRICT_PROPOSED' ? (
                  <button 
                    disabled={isSubmitting}
                    onClick={() => handleDistrictPropose(selectedProposal)}
                    className="btn btn-sm text-xs py-2 px-5 bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Send size={14} />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Field Proposal to State Govt'}</span>
                  </button>
                ) : null}

                {/* DISABLED BUTTON FOR STATE WHEN PENDING AT CENTRAL */}
                {isState && selectedProposal.approvalStatus === 'PENDING_CENTRAL_APPROVAL' ? (
                  <button 
                    disabled
                    className="btn text-xs py-2 px-4 bg-slate-200 text-slate-500 border border-slate-300 font-semibold cursor-not-allowed flex items-center gap-1.5"
                    title="Awaiting Central Ministry Sanction"
                  >
                    <Clock size={14} />
                    <span>Awaiting Central Sanction (DoLR Authority)</span>
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
