'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Scale, 
  Banknote, 
  Camera, 
  ExternalLink 
} from 'lucide-react';
import { Project, StageId, StakeholderRole, WORKFLOW_STAGES } from '@/types/land-acquisition';
import confetti from 'canvas-confetti';

interface WorkflowStageActionsProps {
  project: Project;
  activeStageId: StageId;
  onAdvanceStage: (projectId: string, nextStage: StageId) => void;
  currentRole: StakeholderRole;
  language: 'en' | 'hi';
  onNavigateToTab: (tabId: string) => void;
}

export const WorkflowStageActions: React.FC<WorkflowStageActionsProps> = ({
  project,
  activeStageId,
  onAdvanceStage,
  currentRole,
  language,
  onNavigateToTab,
}) => {
  const [digitalSignNote, setDigitalSignNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const stage = WORKFLOW_STAGES.find((s) => s.id === activeStageId)!;
  const isCurrentStage = project.currentStage === activeStageId;
  const canAdvance = currentRole === 'DISTRICT_COLLECTOR_CALA' || currentRole === 'CENTRAL_MINISTRY';

  const handleStageAdvance = () => {
    if (project.currentStage < 9) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        const nextStage = (project.currentStage + 1) as StageId;
        onAdvanceStage(project.id, nextStage);
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        setActionSuccessMsg(`Project successfully advanced to Stage ${nextStage}: ${WORKFLOW_STAGES.find(s => s.id === nextStage)?.name}`);
        setTimeout(() => setActionSuccessMsg(null), 4000);
      }, 700);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Stage Header Banner */}
      <div className="bg-gov-navy text-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-gov-saffron text-white text-xs font-black px-2 py-0.5 rounded">
                Stage {stage.id} of 9
              </span>
              <span className="text-xs text-slate-300 font-mono">
                {stage.actReference}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1.5">
              {language === 'hi' ? stage.hindiName : stage.name}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
              {stage.description}
            </p>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Statutory SLA Window</span>
            <span className="text-sm font-bold text-gov-gold">{stage.slaDays} Days Maximum</span>
          </div>
        </div>
      </div>

      {actionSuccessMsg && (
        <div className="p-3 bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Stage-Specific Content & Action Workspace */}
      <div className="p-6 space-y-6">
        {/* Stage 1: Proposal */}
        {activeStageId === 1 && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <h4 className="font-bold text-slate-800">Proposal & DPR Requirements (Section 3)</h4>
              <p className="text-slate-600">
                The Land Requiring Body ({project.requiringBody}) has submitted the DPR, geodetic KML alignment, and estimated cost of ₹ {project.totalEstimatedBudgetCr} Cr.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                <div className="bg-white p-2.5 rounded border">
                  <span className="text-slate-400 block text-[10px]">Proposed Area</span>
                  <span className="font-bold text-slate-800">{project.totalProposedAreaHa} Ha</span>
                </div>
                <div className="bg-white p-2.5 rounded border">
                  <span className="text-slate-400 block text-[10px]">Escrow Deposit Target</span>
                  <span className="font-bold text-emerald-700">₹ {project.escrowFundedCr} Cr</span>
                </div>
                <div className="bg-white p-2.5 rounded border">
                  <span className="text-slate-400 block text-[10px]">Alignment Route</span>
                  <span className="font-bold text-slate-800">{project.districts.join(' - ')}</span>
                </div>
                <div className="bg-white p-2.5 rounded border">
                  <span className="text-slate-400 block text-[10px]">Nodal Officer</span>
                  <span className="font-bold text-slate-800">{project.leadOfficerName}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stage 2: SIA */}
        {activeStageId === 2 && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <h4 className="font-bold text-slate-800">Social Impact Assessment (SIA) & Public Hearing (Sections 4-9)</h4>
              <p className="text-slate-600">
                Evaluation of public purpose, social impact on livelihoods, and public hearings held in Affected Gram Panchayats.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Multi-disciplinary Expert Group Approved
                </span>
                <span className="text-slate-600 bg-white px-3 py-1.5 rounded-lg border text-xs">
                  PAFs Enumerated: {project.totalAffectedFamilies} Families
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Stage 3: Section 11 Notification */}
        {activeStageId === 3 && (
          <div className="space-y-4">
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 text-xs space-y-3">
              <h4 className="font-bold text-amber-950">Statutory Preliminary Notification under Section 11(1)</h4>
              <p className="text-slate-700">
                Published in the Gazette of India and two local daily newspapers. Imposes a mandatory statutory freeze on private land transfers and building construction.
              </p>
              <div className="bg-white p-3 rounded-lg border border-amber-200 flex flex-wrap justify-between items-center gap-3">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Statutory 12-Month Countdown</span>
                  <span className="text-xs font-semibold text-slate-800">
                    Preliminary Notification Date: {project.sec11Date || '2025-02-15'} | Deadline for Sec 19: {project.sec19Deadline || '2026-02-14'}
                  </span>
                </div>
                <button
                  onClick={() => onNavigateToTab('gis')}
                  className="px-3 py-1.5 bg-gov-navy text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Inspect Section 11 Cadastral Polygons</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stage 4: Objections */}
        {activeStageId === 4 && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <h4 className="font-bold text-slate-800">Hearing of Objections under Section 15(2)</h4>
              <p className="text-slate-600">
                Landowners and interested persons have 60 days to object to alignment, area measurement, or public purpose. Competent Authority (CALA) conducts formal hearings and issues speaking disposal orders.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 font-semibold">
                  18 Objections Filed • 15 Disposed • 3 In Final Review
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Stage 5: Section 19 Declaration */}
        {activeStageId === 5 && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <h4 className="font-bold text-slate-800">Declaration of Acquisition & Joint Measurement Survey (JMS) (Section 19)</h4>
              <p className="text-slate-600">
                Final declaration issued following completion of cadastral drone survey, DGPS ground-truthing, and verification against State RoR (Bhulekh).
              </p>
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-emerald-900 flex items-center justify-between">
                <span>Joint Measurement Survey (JMS) Superimposed on Cadastral Map</span>
                <span className="font-bold text-xs">100% Boundary Verified</span>
              </div>
            </div>
          </div>
        )}

        {/* Stage 6: Award Determination */}
        {activeStageId === 6 && (
          <div className="space-y-4">
            <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-200 text-xs space-y-2">
              <h4 className="font-bold text-purple-950">Statutory Award Determination (Section 23, 26-30 & Sec 31)</h4>
              <p className="text-slate-700">
                Application of statutory formula: Base circle rate × Rural Multiplier (1.5x) + 100% Solatium + 12% Additional Market Value + Tree & Structure compensation.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigateToTab('compensation')}
                  className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Open RFCTLARR Award Ledger</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stage 7: Compensation Disbursement */}
        {activeStageId === 7 && (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs space-y-3">
              <h4 className="font-bold text-emerald-950 flex items-center gap-2">
                <Banknote className="w-4 h-4 text-emerald-700" />
                PFMS / Direct Benefit Transfer (DBT) Compensation Disbursal
              </h4>
              <p className="text-slate-700">
                Assessed compensation is directly credited into Aadhaar-linked bank accounts of Khatedars (Landowners) through the Public Financial Management System (PFMS) gateway.
              </p>
              <div className="flex flex-wrap items-center justify-between bg-white p-3 rounded-lg border border-emerald-200 gap-3">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Disbursed Outlay</span>
                  <span className="text-base font-black text-emerald-700 block">
                    ₹ {project.compensationDisbursedCr} Cr / ₹ {project.compensationAssessedCr} Cr
                  </span>
                </div>
                <button
                  onClick={() => onNavigateToTab('compensation')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                >
                  <Banknote className="w-4 h-4" />
                  <span>Disburse DBT to Landowners Now</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stage 8: Physical Possession */}
        {activeStageId === 8 && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-3">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <Camera className="w-4 h-4 text-gov-navy" />
                Physical Possession & RoR Mutation (Section 38 & 41)
              </h4>
              <p className="text-slate-600">
                Under Section 38, physical possession is taken after full compensation is paid. Field Panchnama is executed with geo-tagged photographs and digital mutation is initiated in the State Land Records (Bhulekh).
              </p>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 bg-blue-50 text-blue-900 border border-blue-200 rounded-lg font-semibold">
                  Possession Handed Over: {project.possessionTakenHa} Ha ({Math.round((project.possessionTakenHa / project.totalProposedAreaHa) * 100)}%)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Stage 9: R&R & Closure */}
        {activeStageId === 9 && (
          <div className="space-y-4">
            <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-200 text-xs space-y-3">
              <h4 className="font-bold text-purple-950">R&R Execution, Resettlement Handover & Project Closure</h4>
              <p className="text-slate-700">
                Resettlement colony plots handed over, subsistence allowances paid, employment/annuities settled, and final completion clearance certified.
              </p>
              <button
                onClick={() => onNavigateToTab('rnr')}
                className="px-3.5 py-1.5 bg-purple-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Open R&R Resettlement Dashboard</span>
              </button>
            </div>
          </div>
        )}

        {/* Digital Scrutiny & Approval Sign-off Box */}
        {isCurrentStage && (
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gov-blue" />
                Digital Scrutiny & Statutory Sign-off
              </span>
              <span className="text-[10px] text-slate-500">
                Authorized Authority: {canAdvance ? 'CALA / Ministry Officer (Authorized)' : 'View Only for Current Role'}
              </span>
            </div>

            <textarea
              placeholder="Enter official scrutiny remarks or order citation (e.g. Approved vide Order No. CALA/2025/892)..."
              value={digitalSignNote}
              onChange={(e) => setDigitalSignNote(e.target.value)}
              className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-navy h-18 resize-none"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>SHA-256 e-Sign Audit Trail will be generated automatically</span>
              </div>

              {canAdvance ? (
                <button
                  onClick={handleStageAdvance}
                  disabled={isProcessing || project.currentStage >= 9}
                  className="px-5 py-2.5 bg-gov-navy hover:bg-gov-blue text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition disabled:opacity-50 cursor-pointer"
                >
                  {isProcessing ? (
                    <span>Validating Statutory Compliance...</span>
                  ) : (
                    <>
                      <span>Sign & Advance to Stage {project.currentStage + 1}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              ) : (
                <span className="text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                  Switch to <strong>District Collector / CALA</strong> role above to execute statutory advance.
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
