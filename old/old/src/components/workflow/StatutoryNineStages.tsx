'use client';

import React, { useState } from 'react';
import { Project } from '@/types/land-acquisition';

interface StatutoryNineStagesProps {
  activeProject: Project;
  onAdvanceStage?: (projectId: string, nextStage: number) => void;
}

interface StageDetail {
  step: number;
  statutorySection: string;
  name: string;
  description: string;
  leadAuthority: string;
  timelineDays: number;
  statutoryRule: string;
  deliverables: string[];
  status: 'COMPLETED' | 'ACTIVE' | 'PENDING';
}

export const StatutoryNineStages: React.FC<StatutoryNineStagesProps> = ({
  activeProject,
  onAdvanceStage,
}) => {
  const currentStage = activeProject.currentStage || 4;
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(currentStage);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const STAGES: StageDetail[] = [
    {
      step: 1,
      statutorySection: 'Section 3 / DPR',
      name: 'Proposal & Alignment Requisition',
      description: 'Formal proposal submission by Land Requiring Body (NHAI/Railways/MoRTH) with DPR, KML corridor alignment coordinates, RoW width, and fund commitment.',
      leadAuthority: 'Requisitioning Body (NHAI / Project Director)',
      timelineDays: 30,
      statutoryRule: 'RFCTLARR Rules 2014, Rule 3(1)',
      deliverables: [
        'Detailed Project Report (DPR) Annexures',
        'Geo-tagged KML Corridor Alignment Vector',
        'Administrative Approval & Expenditure Sanction (AA&ES)',
        'RoW Width & Cadastral Village Mouza Schedule',
      ],
      status: currentStage > 1 ? 'COMPLETED' : currentStage === 1 ? 'ACTIVE' : 'PENDING',
    },
    {
      step: 2,
      statutorySection: 'Section 4 & 7 / 10A',
      name: 'Social Impact Assessment & Hearing',
      description: 'Conduct of Social Impact Assessment (SIA) by independent institution, public hearing in affected gram sabhas, and Social Impact Management Plan (SIMP). Exemptions evaluated under Section 10A.',
      leadAuthority: 'State Revenue Dept & Independent SIA Unit',
      timelineDays: 180,
      statutoryRule: 'Section 4(1) & Rule 7 Expert Group Review',
      deliverables: [
        'Draft SIA Report with Livelihood Impact Assessment',
        'Gram Sabha Public Hearing Videography & Minutes',
        'Multi-Disciplinary Expert Group Appraisal',
        'Section 10A Linear Infrastructure Exemption Certificate',
      ],
      status: currentStage > 2 ? 'COMPLETED' : currentStage === 2 ? 'ACTIVE' : 'PENDING',
    },
    {
      step: 3,
      statutorySection: 'Section 11(1)',
      name: 'Section 11 Preliminary Notification',
      description: 'Publication of Preliminary Notification in Official Gazette, two regional vernacular newspapers, and web portal. Triggers the freeze on subsequent property transactions and land price speculation.',
      leadAuthority: 'District Collector / State Gazette Press',
      timelineDays: 30,
      statutoryRule: 'Gazette Publication Rule 11(2)',
      deliverables: [
        'Official Central/State Gazette Extraordinary S.O. Number',
        'Vernacular Daily Newspaper Clippings (Hindi/Regional)',
        'Notice Served to Village Panchayats & Municipal Counters',
        'Digital Public Notice on NIC Sovereign Land Grid',
      ],
      status: currentStage > 3 ? 'COMPLETED' : currentStage === 3 ? 'ACTIVE' : 'PENDING',
    },
    {
      step: 4,
      statutorySection: 'Section 15(1) & (2)',
      name: 'Section 15 Objection Window (60 Days)',
      description: 'Statutory 60-day window for any interested party to submit objections regarding suitability of land, public purpose validity, or survey discrepancies. Quasi-judicial hearings conducted by CALA.',
      leadAuthority: 'Competent Authority for Land Acquisition (CALA)',
      timelineDays: 60,
      statutoryRule: 'Rule 15 Quasi-Judicial Hearing Docket',
      deliverables: [
        'Section 15 Objection Cause List & Hearing Notice Register',
        'Written Objections & Affidavits of Claimants',
        'Site Re-inspection Reports by Field Revenue Tehsildar',
        'CALA Statutory Adjudication Order under Section 15(2)',
      ],
      status: currentStage > 4 ? 'COMPLETED' : currentStage === 4 ? 'ACTIVE' : 'PENDING',
    },
    {
      step: 5,
      statutorySection: 'Section 19(1) & Joint Survey',
      name: 'Section 19 Declaration & Joint Measurement',
      description: 'Final Declaration that land is required for public purpose (within 12 months of Section 11). Followed by Joint Measurement Survey (JMS) with RTK GPS and drone orthomosaic boundary pinning.',
      leadAuthority: 'State Govt Revenue Board & Joint Survey Team',
      timelineDays: 60,
      statutoryRule: 'Section 19(1) Declaration & Section 21 Notices',
      deliverables: [
        'Section 19 Declaration Gazette Publication',
        'Joint Measurement Survey (JMS) Panchnama Sheets',
        'Drone Orthomosaic (5cm GSD) + RoR BhuNaksha Overlay',
        'Individual Section 21 Public Notices to Khatedars',
      ],
      status: currentStage > 5 ? 'COMPLETED' : currentStage === 5 ? 'ACTIVE' : 'PENDING',
    },
    {
      step: 6,
      statutorySection: 'Section 23, 26-30',
      name: 'Award Determination (RFCTLARR Formula)',
      description: 'Computation of total compensation using statutory formula: Basic Market Value × Rural Multiplier (1.0 to 2.0) + 100% Solatium + 12% Additional Market Value (AMV) + Assets/Trees/Structures.',
      leadAuthority: 'Collector / CALA Award Inquiry Bench',
      timelineDays: 90,
      statutoryRule: 'First Schedule Compensation Formula Matrix',
      deliverables: [
        'Section 23 Statutory Award Docket & Summary Sheet',
        'Certified Circle Rate & Sale Deed Averages Analysis',
        '100% Solatium & 12% AMV Mathematical Calculation Ledger',
        'Horticulture & PWD Structural Asset Valuation Reports',
      ],
      status: currentStage > 6 ? 'COMPLETED' : currentStage === 6 ? 'ACTIVE' : 'PENDING',
    },
    {
      step: 7,
      statutorySection: 'Section 77 & PFMS/DBT',
      name: 'PFMS/DBT Compensation Disbursement',
      description: 'Direct transfer of full determined compensation amount into verified Aadhaar-seeded bank accounts of tenure-holders through Public Financial Management System (PFMS) gateway.',
      leadAuthority: 'CALA / Treasury / PFMS Nodal Bank',
      timelineDays: 30,
      statutoryRule: 'DBT Direct Credit Protocol & Escrow Ledger',
      deliverables: [
        'Aadhaar / NPCI Bank Account Verification Batch Report',
        'PFMS Electronic Sanction Order & Bill Generation',
        'Unique Transaction Reference (UTR) Disbursement Slips',
        'Disputed Share Escrow Deposits under Section 77(2)',
      ],
      status: currentStage > 7 ? 'COMPLETED' : currentStage === 7 ? 'ACTIVE' : 'PENDING',
    },
    {
      step: 8,
      statutorySection: 'Section 38 & 40',
      name: 'Physical Possession & RoR Mutation',
      description: 'Taking physical possession of land free from all encumbrances after compensation is tendered. Issuance of Section 38 Possession Certificate and mutation of RoR (7/12) in favor of Requiring Body.',
      leadAuthority: 'Executive Magistrate & Taluka Tehsildar',
      timelineDays: 30,
      statutoryRule: 'Section 38 Possession Panchnama & RoR Update',
      deliverables: [
        'Physical Possession Panchnama with Boundary Geo-Pegging',
        'Section 38 Statutory Possession Handover Certificate',
        'Tehsil Revenue Court RoR Mutation Order (Khata Transfer)',
        'Police Protection & Boundary Fencing Handover Protocol',
      ],
      status: currentStage > 8 ? 'COMPLETED' : currentStage === 8 ? 'ACTIVE' : 'PENDING',
    },
    {
      step: 9,
      statutorySection: 'Second & Third Schedule',
      name: 'R&R Execution & Project Closure',
      description: 'Implementation of Rehabilitation & Resettlement entitlements for Project Affected Families (PAFs): alternate house sites, one-time subsistence allowance, transport cost, and infrastructural amenities.',
      leadAuthority: 'Commissioner for R&R & State Govt',
      timelineDays: 120,
      statutoryRule: 'Second & Third Schedule RFCTLARR Act 2013',
      deliverables: [
        'PAF Entitlement Disbursal Ledgers (Second Schedule)',
        'Resettlement Colony Infrastructure Handover (Third Schedule)',
        'Livelihood Training & Skill Development Certificates',
        'National Highway / Corridor Statutory Project Closure Audit',
      ],
      status: currentStage >= 9 ? 'ACTIVE' : 'PENDING',
    },
  ];

  const activeStageObj = STAGES[selectedStageIndex - 1] || STAGES[0];

  const handleSimulateAction = (actionTitle: string) => {
    setActionSuccessMsg(`Statutory Action '${actionTitle}' digitally authorized under Section ${activeStageObj.statutorySection}. Audit Hash generated: SEC-HASH-${Date.now().toString(36).toUpperCase()}`);
    setTimeout(() => {
      setActionSuccessMsg(null);
    }, 6000);
  };

  const handleAdvanceToNext = () => {
    if (onAdvanceStage && currentStage < 9) {
      onAdvanceStage(activeProject.id, currentStage + 1);
      setSelectedStageIndex(currentStage + 1);
      setActionSuccessMsg(`Statutory Workflow advanced to Stage 0${currentStage + 1}: ${STAGES[currentStage].name}!`);
      setTimeout(() => setActionSuccessMsg(null), 5000);
    }
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Ribbon Header */}
      <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md flex-wrap">
          <div className="flex items-center gap-space-xs bg-primary text-on-primary px-space-sm py-space-2xs rounded">
            <span className="material-symbols-outlined text-[16px] text-tertiary">timeline</span>
            <span className="font-label-md text-label-md tracking-wider uppercase">STATUTORY WORKFLOW ENGINE</span>
          </div>
          <div className="h-4 w-px bg-surface-container-highest"></div>
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
            <span>RFCTLARR ACT 2013</span>
            <span>•</span>
            <span className="text-secondary font-semibold">9 MANDATORY PHASES OF STATUTORY ACQUISITION</span>
            <span>•</span>
            <span className="bg-surface-container px-2 py-0.5 rounded font-cadastral-code text-on-surface">
              CURRENT STAGE: 0{currentStage} / 09
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-sm">
          {currentStage < 9 && (
            <button
              onClick={handleAdvanceToNext}
              className="flex items-center gap-1.5 px-space-md py-space-xs bg-tertiary text-on-primary hover:bg-amber-600 rounded font-label-md text-label-md shadow-sm transition-colors font-semibold"
            >
              <span className="material-symbols-outlined text-[16px]">step</span>
              <span>Advance to Stage 0{currentStage + 1}</span>
            </button>
          )}
        </div>
      </div>

      {/* Success Notification Alert */}
      {actionSuccessMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-space-md py-space-sm rounded flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-emerald-700 text-[20px]">check_circle</span>
            <span className="font-body-sm text-body-sm font-medium">{actionSuccessMsg}</span>
          </div>
          <button onClick={() => setActionSuccessMsg(null)} className="text-emerald-700 hover:text-emerald-900">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Stepper Pipeline (9 Steps Grid) */}
      <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant">
        <div className="flex items-center justify-between mb-space-sm">
          <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider font-semibold">
            Interactive Statutory Acquisition Pipeline (Click any stage to inspect regulatory dossier)
          </span>
          <span className="font-cadastral-code text-label-sm text-secondary">
            Project: {activeProject.title}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2">
          {STAGES.map((s) => {
            const isSelected = selectedStageIndex === s.step;
            const isCurrent = currentStage === s.step;
            const isPast = currentStage > s.step;

            return (
              <div
                key={s.step}
                onClick={() => setSelectedStageIndex(s.step)}
                className={`p-2.5 rounded border cursor-pointer transition-all flex flex-col justify-between relative ${
                  isSelected
                    ? 'border-secondary bg-secondary-fixed/20 shadow-md ring-2 ring-secondary'
                    : isPast
                    ? 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50'
                    : isCurrent
                    ? 'border-amber-400 bg-amber-50/80 shadow-sm'
                    : 'border-outline-variant bg-surface-container-low hover:bg-surface-container opacity-85'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-cadastral-code text-[11px] font-bold ${
                    isPast ? 'text-emerald-700' : isCurrent ? 'text-amber-800' : 'text-on-surface-variant'
                  }`}>
                    STAGE 0{s.step}
                  </span>
                  {isPast ? (
                    <span className="material-symbols-outlined text-[16px] text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  ) : isCurrent ? (
                    <span className="material-symbols-outlined text-[16px] text-amber-600 animate-spin">
                      sync
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-[16px] text-outline">
                      radio_button_unchecked
                    </span>
                  )}
                </div>

                <div className="font-headline-sm text-[12px] font-semibold text-on-surface leading-tight line-clamp-2 my-0.5">
                  {s.name}
                </div>

                <div className="mt-1 pt-1 border-t border-outline-variant/30 flex items-center justify-between text-[10px] font-cadastral-code text-on-surface-variant">
                  <span>{s.timelineDays}d Cap</span>
                  <span className={`font-semibold ${
                    isPast ? 'text-emerald-700' : isCurrent ? 'text-amber-800' : 'text-slate-500'
                  }`}>
                    {isPast ? 'DONE' : isCurrent ? 'ACTIVE' : 'PENDING'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column: Stage Dossier & Legal Parameters (8 cols) */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-space-lg rounded shadow-sm border border-outline-variant flex flex-col gap-space-md">
          <div className="flex items-start justify-between flex-wrap gap-space-sm border-b border-outline-variant pb-space-sm">
            <div>
              <div className="flex items-center gap-space-xs">
                <span className="bg-primary text-on-primary font-cadastral-code text-label-sm px-2 py-0.5 rounded">
                  STAGE 0{activeStageObj.step}
                </span>
                <span className="text-secondary font-semibold font-label-md text-label-md">
                  {activeStageObj.statutorySection}
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold mt-1">
                {activeStageObj.name}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded font-label-md text-label-md font-bold uppercase ${
                activeStageObj.status === 'COMPLETED'
                  ? 'bg-emerald-100 text-emerald-800'
                  : activeStageObj.status === 'ACTIVE'
                  ? 'bg-amber-100 text-amber-900 animate-pulse'
                  : 'bg-slate-200 text-slate-700'
              }`}>
                {activeStageObj.status}
              </span>
            </div>
          </div>

          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {activeStageObj.description}
          </p>

          {/* Key Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm bg-surface-container-low p-space-md rounded">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant block">Competent Nodal Authority</span>
              <strong className="font-body-md text-body-md text-on-surface block mt-0.5">{activeStageObj.leadAuthority}</strong>
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant block">Statutory Rule Reference</span>
              <strong className="font-cadastral-code text-label-md text-secondary block mt-0.5">{activeStageObj.statutoryRule}</strong>
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant block">Statutory SLA Cap</span>
              <strong className="font-headline-sm text-headline-sm text-on-surface block mt-0.5">{activeStageObj.timelineDays} Calendar Days</strong>
            </div>
          </div>

          {/* Statutory Deliverables & Evidence Trail */}
          <div className="flex flex-col gap-space-xs mt-space-xs">
            <span className="font-label-md text-label-md uppercase text-on-surface font-semibold tracking-wider">
              Mandatory Statutory Deliverables & Verified Audit Artifacts
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm mt-1">
              {activeStageObj.deliverables.map((d, i) => (
                <div
                  key={i}
                  className="p-space-sm bg-surface-container-lowest border border-outline-variant rounded flex items-start gap-space-xs hover:border-secondary transition-colors"
                >
                  <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                    verified
                  </span>
                  <div className="flex flex-col">
                    <span className="font-body-sm text-body-sm font-semibold text-on-surface">{d}</span>
                    <span className="font-cadastral-code text-[11px] text-on-surface-variant mt-0.5">
                      GovTech Verified • Hash: NIC-REC-2026-0{i+1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stage Action Controls */}
          <div className="pt-space-md border-t border-outline-variant flex items-center justify-between flex-wrap gap-space-sm">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Status: <strong className="text-on-surface">{activeStageObj.status}</strong> on Central NLAMS Grid
            </span>

            <div className="flex items-center gap-space-sm">
              <button
                onClick={() => handleSimulateAction(`Verify Artifacts for Stage 0${activeStageObj.step}`)}
                className="px-space-md py-space-xs bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded font-label-md text-label-md border border-outline-variant transition-colors"
              >
                Inspect Gazette / PDF
              </button>
              <button
                onClick={() => handleSimulateAction(`Digital Signature Audit for ${activeStageObj.name}`)}
                className="px-space-md py-space-xs bg-primary hover:bg-surface-tint text-on-primary rounded font-label-md text-label-md flex items-center gap-1 shadow-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">fingerprint</span>
                <span>Affix NIC Digital Signature</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Act Rules & Quick Checklist (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-space-md">
          {/* RFCTLARR 2013 Statutory Compliance Box */}
          <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-xs border-b border-outline-variant pb-space-xs">
              <span className="material-symbols-outlined text-[18px] text-tertiary">gavel</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Statutory Compliance Watch
              </h3>
            </div>

            <div className="flex flex-col gap-space-xs text-body-sm">
              <div className="p-2 bg-surface-container-low rounded">
                <span className="font-label-sm text-secondary block font-bold">Section 11(1) Sunset Watch:</span>
                <span className="text-on-surface text-body-sm">Section 19 declaration MUST be published within 12 months, otherwise acquisition lapses entirely.</span>
              </div>
              <div className="p-2 bg-surface-container-low rounded">
                <span className="font-label-sm text-secondary block font-bold">Section 25 Award Deadline:</span>
                <span className="text-on-surface text-body-sm">Award must be pronounced within 12 months from date of publication of Section 19 declaration.</span>
              </div>
              <div className="p-2 bg-surface-container-low rounded">
                <span className="font-label-sm text-secondary block font-bold">First Schedule Solatium:</span>
                <span className="text-on-surface text-body-sm">100% solatium is mandatory on total market value. No discretion to CALA to reduce.</span>
              </div>
            </div>
          </div>

          {/* Quick Stats on Selected Project */}
          <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col gap-space-xs">
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
              Project Corridor Parameters
            </span>
            <div className="flex justify-between items-center py-1 border-b border-outline-variant/30 text-body-sm">
              <span>Proposed Corridor Area:</span>
              <strong className="font-cadastral-code text-on-surface">{activeProject.totalProposedAreaHa} Ha</strong>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-outline-variant/30 text-body-sm">
              <span>Notified under Sec 11:</span>
              <strong className="font-cadastral-code text-secondary">{activeProject.notifiedAreaHa} Ha</strong>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-outline-variant/30 text-body-sm">
              <span>Possession Handed Over:</span>
              <strong className="font-cadastral-code text-emerald-700">{activeProject.possessionTakenHa} Ha</strong>
            </div>
            <div className="flex justify-between items-center py-1 text-body-sm">
              <span>Disbursed via PFMS:</span>
              <strong className="font-cadastral-code text-secondary">₹{activeProject.compensationDisbursedCr} Cr</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
