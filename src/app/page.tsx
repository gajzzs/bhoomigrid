'use client';

import React, { useState, useEffect } from 'react';
import { AuthUser, SAMPLE_USERS } from '@/types/auth';
import { SampleSignInModal } from '@/components/auth/SampleSignInModal';
import { ComputerizationOfLandRecords } from '@/components/dilrmp/ComputerizationOfLandRecords';
import { MapDigitizationDashboard } from '@/components/dilrmp/MapDigitizationDashboard';
import { StatutoryNineStages } from '@/components/workflow/StatutoryNineStages';
import { GeminiProposalEnhancer } from '@/components/ai/GeminiProposalEnhancer';
import { GISParcelMap } from '@/components/gis/GISParcelMap';
import { LandownerRegistry } from '@/components/compensation/LandownerRegistry';
import { RnRMonitoringDashboard } from '@/components/rnr/RnRMonitoringDashboard';
import { CitizenPortal } from '@/components/citizen/CitizenPortal';
import { StatutoryTimelineWatch } from '@/components/dashboard/StatutoryTimelineWatch';
import { StatePerformanceMatrix } from '@/components/dashboard/StatePerformanceMatrix';
import { offlineDb } from '@/lib/db';
import { AccessibilityBar } from '@/components/common/AccessibilityBar';
import { GovFooter } from '@/components/common/GovFooter';
import { 
  Project, 
  LandParcel, 
  StatutoryAlert, 
  StatutoryNotification, 
  ProjectAffectedFamily, 
  StageId,
  ParcelStatus 
} from '@/types/land-acquisition';

type NavigationModule = 
  | 'executive-gis-command'
  | 'requisition-and-scrutiny'
  | 'cadastral-gis-studio'
  | 'compensation-and-dbt'
  | 'cala-decision-desk'
  | 'rnr-monitoring'
  | 'dilrmp-clr'
  | 'dilrmp-map'
  | 'statutory-workflow'
  | 'gemini-ai'
  | 'citizen-portal';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [activeModule, setActiveModule] = useState<NavigationModule>('executive-gis-command');
  const [currentUser, setCurrentUser] = useState<AuthUser>(SAMPLE_USERS.CENTRAL_NODAL);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  // Core domain data
  const [projects, setProjects] = useState<Project[]>([]);
  const [parcels, setParcels] = useState<LandParcel[]>([]);
  const [alerts, setAlerts] = useState<StatutoryAlert[]>([]);
  const [notifications, setNotifications] = useState<StatutoryNotification[]>([]);
  const [pafs, setPafs] = useState<ProjectAffectedFamily[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-nhai-dme-01');

  // Load state from offline spatial store
  const refreshState = () => {
    const projList = offlineDb.getProjects();
    const pclList = offlineDb.getParcels();
    const altList = offlineDb.getAlerts();
    const notList = offlineDb.getNotifications();
    const pafList = offlineDb.getPAFs();

    setProjects([...projList]);
    setParcels([...pclList]);
    setAlerts([...altList]);
    setNotifications([...notList]);
    setPafs([...pafList]);
  };

  useEffect(() => {
    setIsClient(true);
    refreshState();
  }, []);

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleAdvanceStage = (projectId: string, nextStage: number) => {
    offlineDb.updateProjectStage(projectId, nextStage as StageId);
    refreshState();
  };

  const handleUpdateParcelStatus = (parcelId: string, status: ParcelStatus) => {
    offlineDb.updateParcelStatus(parcelId, status);
    refreshState();
  };

  if (!isClient || !activeProject) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-surface text-on-surface">
        <div className="flex flex-col items-center gap-space-sm">
          <div className="w-8 h-8 border-3 border-secondary border-t-transparent rounded-full animate-spin"></div>
          <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
            Initializing Sovereign Land Grid (NLAMS Central)...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface font-body-md text-body-md text-on-surface antialiased flex flex-col">
      {/* GIGW: Skip link, text resize, high contrast toggle */}
      <AccessibilityBar />

      {/* Sample Sign-in / Identity Modal */}
      <SampleSignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        currentUser={currentUser}
        onSelectUser={(u) => setCurrentUser(u)}
      />

      {/* 1. FIXED LEFT SIDEBAR (w-72 / 288px) - SOVEREIGN CADASTRAL ENTERPRISE */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between pt-space-md pb-space-lg border-r border-outline-variant/40">
        <div className="flex flex-col gap-space-md">
          {/* Masthead */}
          <div className="px-space-lg flex items-center gap-space-sm">
            <div className="w-2.5 h-7 bg-primary rounded"></div>
            <div>
              <span className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface-variant block">
                Sovereign Land Grid
              </span>
              <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface block font-bold">
                NLAMS Central
              </span>
            </div>
          </div>

          {/* Sovereignty Tier Badge */}
          <div className="px-space-lg">
            <div className="p-space-xs bg-surface-container-low rounded flex items-center justify-between border border-outline-variant/30">
              <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Sovereignty Tier</span>
              <span className="font-label-md text-label-md px-space-xs py-space-2xs bg-surface-container text-on-surface rounded font-bold">
                UNION GOVT
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex flex-col gap-1 px-space-md overflow-y-auto max-h-[calc(100vh-250px)]">
            <button
              onClick={() => setActiveModule('executive-gis-command')}
              className={`flex items-center gap-space-md px-space-md py-space-sm rounded transition-all text-left group ${
                activeModule === 'executive-gis-command'
                  ? 'bg-primary-container text-on-primary font-headline-sm shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">public</span>
              <span className="font-body-md text-body-md font-medium">Executive GIS Command</span>
            </button>

            <button
              onClick={() => setActiveModule('requisition-and-scrutiny')}
              className={`flex items-center gap-space-md px-space-md py-space-sm rounded transition-all text-left group ${
                activeModule === 'requisition-and-scrutiny'
                  ? 'bg-primary-container text-on-primary font-headline-sm shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">fact_check</span>
              <span className="font-body-md text-body-md font-medium">Requisition & Scrutiny</span>
            </button>

            <button
              onClick={() => setActiveModule('cadastral-gis-studio')}
              className={`flex items-center gap-space-md px-space-md py-space-sm rounded transition-all text-left group ${
                activeModule === 'cadastral-gis-studio'
                  ? 'bg-primary-container text-on-primary font-headline-sm shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">layers</span>
              <span className="font-body-md text-body-md font-medium">Cadastral GIS Studio</span>
            </button>

            <button
              onClick={() => setActiveModule('compensation-and-dbt')}
              className={`flex items-center gap-space-md px-space-md py-space-sm rounded transition-all text-left group ${
                activeModule === 'compensation-and-dbt'
                  ? 'bg-primary-container text-on-primary font-headline-sm shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">payments</span>
              <span className="font-body-md text-body-md font-medium">Compensation & DBT</span>
            </button>

            <button
              onClick={() => setActiveModule('cala-decision-desk')}
              className={`flex items-center gap-space-md px-space-md py-space-sm rounded transition-all text-left group ${
                activeModule === 'cala-decision-desk'
                  ? 'bg-primary-container text-on-primary font-headline-sm shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">gavel</span>
              <span className="font-body-md text-body-md font-medium">CALA Decision Desk</span>
            </button>

            <button
              onClick={() => setActiveModule('rnr-monitoring')}
              className={`flex items-center gap-space-md px-space-md py-space-sm rounded transition-all text-left group ${
                activeModule === 'rnr-monitoring'
                  ? 'bg-primary-container text-on-primary font-headline-sm shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">family_restroom</span>
              <span className="font-body-md text-body-md font-medium">R&R Monitoring</span>
            </button>

            {/* DILRMP MODULES */}
            <div className="pt-space-xs mt-space-xs border-t border-outline-variant/40">
              <span className="px-space-md font-label-sm text-[10px] uppercase text-on-surface-variant tracking-wider font-semibold block mb-1">
                DILRMP National Programme
              </span>

              <button
                onClick={() => setActiveModule('dilrmp-clr')}
                className={`w-full flex items-center gap-space-md px-space-md py-space-sm rounded transition-all text-left group ${
                  activeModule === 'dilrmp-clr'
                    ? 'bg-primary-container text-on-primary font-headline-sm shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">description</span>
                <span className="font-body-md text-body-md font-medium">Land Records (CLR)</span>
              </button>

              <button
                onClick={() => setActiveModule('dilrmp-map')}
                className={`w-full flex items-center gap-space-md px-space-md py-space-sm rounded transition-all text-left group ${
                  activeModule === 'dilrmp-map'
                    ? 'bg-primary-container text-on-primary font-headline-sm shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">map</span>
                <span className="font-body-md text-body-md font-medium">Maps / FMBs (MAP)</span>
              </button>
            </div>

            {/* STATUTORY WORKFLOW & AI */}
            <div className="pt-space-xs mt-space-xs border-t border-outline-variant/40">
              <span className="px-space-md font-label-sm text-[10px] uppercase text-on-surface-variant tracking-wider font-semibold block mb-1">
                Statutory Engine & AI
              </span>

              <button
                onClick={() => setActiveModule('statutory-workflow')}
                className={`w-full flex items-center gap-space-md px-space-md py-space-sm rounded transition-all text-left group ${
                  activeModule === 'statutory-workflow'
                    ? 'bg-primary-container text-on-primary font-headline-sm shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">timeline</span>
                <span className="font-body-md text-body-md font-medium">9 Statutory Stages</span>
              </button>

              <button
                onClick={() => setActiveModule('gemini-ai')}
                className={`w-full flex items-center gap-space-md px-space-md py-space-sm rounded transition-all text-left group ${
                  activeModule === 'gemini-ai'
                    ? 'bg-primary-container text-on-primary font-headline-sm shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] text-amber-500">psychology</span>
                <span className="font-body-md text-body-md font-medium">Gemini AI Advisor</span>
              </button>

              <button
                onClick={() => setActiveModule('citizen-portal')}
                className={`w-full flex items-center gap-space-md px-space-md py-space-sm rounded transition-all text-left group ${
                  activeModule === 'citizen-portal'
                    ? 'bg-primary-container text-on-primary font-headline-sm shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">person_search</span>
                <span className="font-body-md text-body-md font-medium">Citizen Portal</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="px-space-md flex flex-col gap-space-sm">
          <div className="p-space-sm bg-surface-container-low rounded flex flex-col gap-space-2xs border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">NIC GATEWAY</span>
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            </div>
            <span className="font-cadastral-code text-[11px] text-on-surface truncate">
              {currentUser.nicToken}
            </span>
          </div>
          <div className="px-space-sm text-center flex items-center justify-between">
            <span className="font-label-sm text-[11px] text-on-surface-variant">NLAMS v4.8.2-ST</span>
            <span className="font-label-sm text-[11px] text-emerald-700 bg-emerald-50 px-1 rounded font-bold">LIVE</span>
          </div>
        </div>
      </aside>

      {/* 2. TOP SOVEREIGN HEADER (pl-72, h-20, fixed top) */}
      <div className="pl-72 flex flex-col min-h-screen">
        <header className="fixed top-0 left-72 right-0 h-20 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-xl border-b border-outline-variant/40">
          {/* Left Title & Government Branding */}
          <div className="flex items-center gap-space-lg">
            <img
              alt="NLAMS Sovereign Emblem"
              className="h-10 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XKvxeR-zIPl4ZC1MRv2M84hUphBD4DaldLQt6h3dPv3U1oZujshWQF2I5a3DRXwXiPiInXVrEMlgfxFEc9izRsor4hnxrsTww6A_9lNZLOt9xLZDydSMWKWqVQHRRutcL12UH9bp-7Ng-iUESia2-LeXhNr6LkoZpFT2mS76yP5MKIYc26DD0oJ_nQc0SNw7mP4oUKVQs4OVKFEqTOhSLB-mbD_bpCt0LLGrm2ZTfZdam9jf8PZi3HEk9I"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
                राष्ट्रीय भूमि अधिग्रहण एवं प्रबंधन प्रणाली
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                NLAMS - Sovereign Cadastral Grid
              </span>
            </div>
            <div className="h-7 w-px bg-surface-container-highest hidden xl:block"></div>
            <div className="hidden xl:flex items-center gap-space-xs bg-surface-container-low px-space-sm py-space-2xs rounded border border-outline-variant/30">
              <span className="material-symbols-outlined text-[15px] text-secondary">account_balance</span>
              <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                MoRTH / NHAI • Central Nodal Authority
              </span>
            </div>
            <div className="hidden 2xl:flex items-center gap-space-xs bg-surface-container px-space-sm py-space-2xs rounded">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                NIC Cloud Connected • 28 States & UTs Live
              </span>
            </div>
          </div>

          {/* Right Controls: Search, Notifications, User Identity & Sample Login */}
          <div className="flex items-center gap-space-md">
            {/* Global Search */}
            <div className="relative w-64 hidden lg:block">
              <span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                search
              </span>
              <input
                className="w-full pl-9 pr-space-sm py-1.5 bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm rounded border border-outline-variant focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Project ID, DPR, Khasra No..."
                type="text"
              />
            </div>

            {/* Notification Bell */}
            <div className="relative flex items-center justify-center p-2 rounded hover:bg-surface-container text-on-surface cursor-pointer">
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface"></span>
            </div>

            <div className="h-7 w-px bg-surface-container-highest"></div>

            {/* Logged in User Persona + 1-Click Sample Sign-in Trigger */}
            <div
              onClick={() => setIsSignInModalOpen(true)}
              className="flex items-center gap-space-sm cursor-pointer p-1.5 hover:bg-surface-container-low rounded border border-transparent hover:border-outline-variant transition-all"
              title="Click to switch sample user credentials"
            >
              <div className="flex flex-col text-right">
                <div className="flex items-center gap-1 justify-end">
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                    {currentUser.name}
                  </span>
                  <span className="material-symbols-outlined text-[14px] text-secondary">expand_more</span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary">
                  {currentUser.role.replace('_', ' ')}
                </span>
              </div>
              <img
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-secondary"
                src={currentUser.avatarUrl}
              />
            </div>
          </div>
        </header>

        {/* 3. MAIN WORKSPACE VIEW ROUTER */}
        <main id="main-content" className="w-full pt-20 flex-1 bg-surface flex flex-col p-space-xl">
          {/* Executive GIS Command Dashboard */}
          {activeModule === 'executive-gis-command' && (
            <div className="flex flex-col gap-space-xl">
              {/* Sovereign Command Breadcrumb Ribbon */}
              <div className="px-space-lg py-space-sm bg-surface-container-lowest rounded shadow-sm border border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-md flex-wrap">
                  <div className="flex items-center gap-space-xs bg-primary-container text-on-primary px-space-sm py-space-2xs rounded">
                    <span className="material-symbols-outlined text-[16px] text-secondary-container">shield</span>
                    <span className="font-label-md text-label-md tracking-wider uppercase">CABINET SEC COMMAND CONSOLE</span>
                  </div>
                  <div className="h-4 w-px bg-surface-container-highest"></div>
                  <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
                    <span>RFCTLARR ACT 2013</span>
                    <span>•</span>
                    <span className="text-secondary font-semibold">RULE 24 STATUTORY SURVEILLANCE</span>
                    <span>•</span>
                    <span className="bg-surface-container-high px-space-xs py-space-2xs rounded text-on-surface font-cadastral-code">
                      REF: CS-NLAMS/Q3-CY26
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-space-sm">
                  <span className="inline-flex items-center gap-1 font-cadastral-code text-label-sm bg-surface-container-low px-2 py-1 rounded">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    CADASTRAL REPO: SYNCED (04:00 IST)
                  </span>
                  <button
                    onClick={() => setActiveModule('statutory-workflow')}
                    className="flex items-center gap-1 px-3 py-1 bg-primary text-on-primary rounded font-label-sm text-label-sm hover:bg-surface-tint transition-colors"
                  >
                    <span className="material-symbols-outlined text-[15px]">timeline</span>
                    <span>9 Statutory Phases</span>
                  </button>
                </div>
              </div>

              {/* 5 KPI Ribbon Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-space-md">
                {/* Card 1 */}
                <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">Requisitions Under Acquisition</span>
                    <span className="material-symbols-outlined text-[18px] text-secondary">workspaces</span>
                  </div>
                  <div className="my-space-xs">
                    <div className="font-display text-display tracking-tight text-on-surface leading-none font-bold">1,428</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">Projects Across 28 States</div>
                  </div>
                  <div className="flex items-center justify-between pt-space-2xs border-t border-outline-variant/30">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-label-md text-label-md bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                      +42 this month
                    </span>
                    <span className="font-cadastral-code text-label-sm text-on-surface-variant">98.2% Active</span>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">Target Hectarage & Handover</span>
                    <span className="material-symbols-outlined text-[18px] text-secondary">domain</span>
                  </div>
                  <div className="my-space-xs">
                    <div className="font-headline-lg text-headline-lg font-bold text-on-surface">2,84,520 <span className="font-label-lg text-label-lg font-normal text-on-surface-variant">Ha</span></div>
                    <div className="font-body-sm text-body-sm text-on-surface mt-space-2xs flex items-center justify-between">
                      <span>Possessed: <strong>1,98,410 Ha</strong></span>
                      <span className="font-cadastral-code text-label-sm text-secondary font-bold">69.7%</span>
                    </div>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                    <div className="bg-secondary h-full rounded-full" style={{ width: '69.7%' }}></div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">Compensation Award & DBT</span>
                    <span className="material-symbols-outlined text-[18px] text-secondary">account_balance</span>
                  </div>
                  <div className="my-space-xs">
                    <div className="font-headline-lg text-headline-lg font-bold text-on-surface">₹1,42,850 <span className="font-label-lg text-label-lg font-normal text-on-surface-variant">Cr</span></div>
                    <div className="font-body-sm text-body-sm text-on-surface mt-space-2xs flex items-center justify-between">
                      <span>Disbursed: <strong>₹1,18,320 Cr</strong></span>
                      <span className="font-cadastral-code text-label-sm text-emerald-700 font-bold">82.8%</span>
                    </div>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '82.8%' }}></div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">Statutory Cycle Time</span>
                    <span className="material-symbols-outlined text-[18px] text-secondary">avg_pace</span>
                  </div>
                  <div className="my-space-xs">
                    <div className="font-display text-display font-bold text-on-surface leading-none">184 <span className="font-headline-sm text-headline-sm font-normal text-on-surface-variant">Days</span></div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">Benchmark: 240 Days Maximum</div>
                  </div>
                  <div className="flex items-center justify-between pt-space-2xs border-t border-outline-variant/30">
                    <span className="inline-flex items-center gap-1 text-secondary font-label-md text-label-md bg-secondary-fixed/40 px-1.5 py-0.5 rounded font-semibold">
                      23% Faster than RFCTLARR Cap
                    </span>
                  </div>
                </div>

                {/* Card 5 */}
                <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">Critical Bottlenecks</span>
                    <span className="material-symbols-outlined text-[18px] text-error">fmd_bad</span>
                  </div>
                  <div className="my-space-xs">
                    <div className="font-display text-display font-bold text-error leading-none">38</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">High-Priority Stoppages</div>
                  </div>
                  <div className="flex items-center justify-between pt-space-2xs border-t border-outline-variant/30">
                    <span className="inline-flex items-center gap-1 text-error font-label-md text-label-md bg-error-container/60 px-1.5 py-0.5 rounded font-semibold">
                      26 Forest / 12 Sec 15
                    </span>
                  </div>
                </div>
              </div>

              {/* Pan-India GIS Map & Timeline Alert Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
                <div className="lg:col-span-8 flex flex-col gap-space-md">
                  <GISParcelMap
                    parcels={parcels}
                    projects={projects}
                    selectedProjectId={selectedProjectId}
                    onSelectProject={(id) => setSelectedProjectId(id)}
                    onUpdateParcelStatus={handleUpdateParcelStatus}
                    currentRole="CENTRAL_MINISTRY"
                    language="en"
                  />
                </div>

                <div className="lg:col-span-4 flex flex-col gap-space-md">
                  <StatutoryTimelineWatch alerts={alerts} language="en" />
                  <StatePerformanceMatrix
                    projects={projects}
                    language="en"
                    onSelectProject={(id) => setSelectedProjectId(id)}
                    onOpenGIS={(id) => {
                      setSelectedProjectId(id);
                      setActiveModule('cadastral-gis-studio');
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Requisition & Scrutiny Hub */}
          {activeModule === 'requisition-and-scrutiny' && (
            <div className="flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm border border-outline-variant flex flex-col gap-space-md">
                <div className="flex items-center justify-between flex-wrap gap-space-sm border-b border-outline-variant pb-space-sm">
                  <div>
                    <span className="font-cadastral-code text-label-sm text-secondary bg-secondary-fixed/40 px-2 py-0.5 rounded">
                      {activeProject.code}
                    </span>
                    <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-1">
                      {activeProject.title}
                    </h2>
                    <span className="text-body-sm text-on-surface-variant">
                      Requiring Body: <strong>{activeProject.requiringBody}</strong> • Ministry of Road Transport & Highways
                    </span>
                  </div>

                  <div className="flex items-center gap-space-sm">
                    <button
                      onClick={() => setActiveModule('gemini-ai')}
                      className="flex items-center gap-1 px-space-md py-space-xs bg-tertiary text-on-primary hover:bg-amber-600 rounded font-label-md text-label-md font-semibold transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">psychology</span>
                      <span>Run Gemini AI Scrutiny</span>
                    </button>
                    <button
                      onClick={() => setActiveModule('statutory-workflow')}
                      className="flex items-center gap-1 px-space-md py-space-xs bg-primary text-on-primary hover:bg-surface-tint rounded font-label-md text-label-md font-semibold transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">step</span>
                      <span>Advance Stage</span>
                    </button>
                  </div>
                </div>

                {/* 6 Requisition KPI Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-space-sm">
                  <div className="p-3 bg-surface-container-low rounded border border-outline-variant">
                    <span className="text-label-sm text-on-surface-variant block uppercase">Total Area</span>
                    <strong className="font-headline-sm font-bold text-on-surface block mt-1">{activeProject.totalProposedAreaHa} Ha</strong>
                    <span className="text-[11px] text-emerald-700">100% In Scope</span>
                  </div>
                  <div className="p-3 bg-surface-container-low rounded border border-outline-variant">
                    <span className="text-label-sm text-on-surface-variant block uppercase">Revenue Villages</span>
                    <strong className="font-headline-sm font-bold text-on-surface block mt-1">24 Mouzas</strong>
                    <span className="text-[11px] text-on-surface-variant">2 Tehsils</span>
                  </div>
                  <div className="p-3 bg-surface-container-low rounded border border-outline-variant">
                    <span className="text-label-sm text-on-surface-variant block uppercase">Khasras Audited</span>
                    <strong className="font-headline-sm font-bold text-on-surface block mt-1">1,420 Parcels</strong>
                    <span className="text-[11px] text-amber-700">18 RoW Overlaps</span>
                  </div>
                  <div className="p-3 bg-surface-container-low rounded border border-outline-variant">
                    <span className="text-label-sm text-on-surface-variant block uppercase">CAMPA Deposit</span>
                    <strong className="font-headline-sm font-bold text-on-surface block mt-1">₹14.82 Cr</strong>
                    <span className="text-[11px] text-emerald-700">Stage-I Settled</span>
                  </div>
                  <div className="p-3 bg-surface-container-low rounded border border-outline-variant">
                    <span className="text-label-sm text-on-surface-variant block uppercase">Sec 11 Sunset</span>
                    <strong className="font-headline-sm font-bold text-error block mt-1">34 Days</strong>
                    <span className="text-[11px] text-error">Lapse Risk Window</span>
                  </div>
                  <div className="p-3 bg-surface-container-low rounded border border-outline-variant">
                    <span className="text-label-sm text-on-surface-variant block uppercase">Compliance Index</span>
                    <strong className="font-headline-sm font-bold text-emerald-700 block mt-1">78%</strong>
                    <span className="text-[11px] text-emerald-700">4 Clearances OK</span>
                  </div>
                </div>

                {/* Statutory Milestone Stepper */}
                <StatutoryNineStages
                  activeProject={activeProject}
                  onAdvanceStage={handleAdvanceStage}
                />
              </div>
            </div>
          )}

          {/* Cadastral GIS Studio */}
          {activeModule === 'cadastral-gis-studio' && (
            <div className="flex flex-col gap-space-md">
              <GISParcelMap
                parcels={parcels}
                projects={projects}
                selectedProjectId={selectedProjectId}
                onSelectProject={(id) => setSelectedProjectId(id)}
                onUpdateParcelStatus={handleUpdateParcelStatus}
                currentRole="CENTRAL_MINISTRY"
                language="en"
              />
            </div>
          )}

          {/* Compensation & DBT */}
          {activeModule === 'compensation-and-dbt' && (
            <div className="flex flex-col gap-space-lg">
              <LandownerRegistry
                parcels={parcels}
                projects={projects}
                selectedProjectId={selectedProjectId}
                onSelectProject={(id) => setSelectedProjectId(id)}
                onExecuteDBT={(id) => handleUpdateParcelStatus(id, 'COMPENSATION_DISBURSED')}
                currentRole="CENTRAL_MINISTRY"
                language="en"
              />
            </div>
          )}

          {/* CALA Decision Desk */}
          {activeModule === 'cala-decision-desk' && (
            <div className="flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm border border-outline-variant flex flex-col gap-space-md">
                <div className="flex items-center justify-between flex-wrap gap-space-sm border-b border-outline-variant pb-space-sm">
                  <div>
                    <span className="font-label-sm text-label-sm text-secondary uppercase font-bold">
                      Competent Authority for Land Acquisition (CALA) Bench
                    </span>
                    <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-0.5">
                      Section 15 Statutory Objection Hearings & Cause List
                    </h2>
                    <span className="text-body-sm text-on-surface-variant">
                      Jurisdiction: Haveli Taluka, District Pune • Presiding Officer: Smt. Vaishali Patil, IAS
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveModule('gemini-ai')}
                    className="flex items-center gap-1.5 px-space-md py-space-xs bg-primary text-on-primary rounded font-label-md text-label-md shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">gavel</span>
                    <span>AI Order Drafter</span>
                  </button>
                </div>

                {/* Objections List */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-body-sm">
                    <thead>
                      <tr className="bg-surface-container text-on-surface-variant font-label-md text-label-md border-b border-outline-variant">
                        <th className="p-3">Case ID</th>
                        <th className="p-3">Petitioner</th>
                        <th className="p-3">Khasra / Village</th>
                        <th className="p-3">Nature of Objection</th>
                        <th className="p-3 text-center">Hearing Date</th>
                        <th className="p-3 text-center">Section 15 Status</th>
                        <th className="p-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/40">
                      <tr className="hover:bg-surface-container-low">
                        <td className="p-3 font-cadastral-code text-secondary font-bold">CALA-2026-OBJ-041</td>
                        <td className="p-3 font-semibold text-on-surface">Shri Rameshwar K. Patel</td>
                        <td className="p-3">Khasra 142/1B • Wagholi</td>
                        <td className="p-3 text-on-surface-variant">Circle Rate undervaluation claim under Sec 26</td>
                        <td className="p-3 text-center font-cadastral-code">24-Sep-2026 (11:00 AM)</td>
                        <td className="p-3 text-center">
                          <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-label-sm">
                            HEARING SCHEDULED
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setActiveModule('gemini-ai')}
                            className="px-2.5 py-1 bg-primary text-on-primary rounded font-label-sm text-label-sm hover:bg-surface-tint"
                          >
                            Adjudicate
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-surface-container-low">
                        <td className="p-3 font-cadastral-code text-secondary font-bold">CALA-2026-OBJ-042</td>
                        <td className="p-3 font-semibold text-on-surface">Gram Panchayat Wagholi</td>
                        <td className="p-3">Survey 89/A • Wagholi</td>
                        <td className="p-3 text-on-surface-variant">Village drinking water pipeline RoW severance</td>
                        <td className="p-3 text-center font-cadastral-code">26-Sep-2026 (02:30 PM)</td>
                        <td className="p-3 text-center">
                          <span className="bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded text-label-sm">
                            SITE INSPECTION
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setActiveModule('gemini-ai')}
                            className="px-2.5 py-1 bg-primary text-on-primary rounded font-label-sm text-label-sm hover:bg-surface-tint"
                          >
                            Adjudicate
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* R&R Monitoring Dashboard */}
          {activeModule === 'rnr-monitoring' && (
            <RnRMonitoringDashboard
              pafs={pafs}
              projects={projects}
              selectedProjectId={selectedProjectId}
              onSelectProject={(id) => setSelectedProjectId(id)}
              onUpdatePAF={(id, upd) => console.log('Update PAF:', id, upd)}
              currentRole="CENTRAL_MINISTRY"
              language="en"
            />
          )}

          {/* DILRMP: Computerization of Land Records (CLR) */}
          {activeModule === 'dilrmp-clr' && (
            <ComputerizationOfLandRecords />
          )}

          {/* DILRMP: Digitized Mapsheets / FMBs / Tippans (MAP) */}
          {activeModule === 'dilrmp-map' && (
            <MapDigitizationDashboard />
          )}

          {/* 9 Statutory Stages Engine */}
          {activeModule === 'statutory-workflow' && (
            <StatutoryNineStages
              activeProject={activeProject}
              onAdvanceStage={handleAdvanceStage}
            />
          )}

          {/* Gemini AI Advisor */}
          {activeModule === 'gemini-ai' && (
            <GeminiProposalEnhancer activeProject={activeProject} />
          )}

          {/* Public Citizen Portal */}
          {activeModule === 'citizen-portal' && (
            <CitizenPortal
              parcels={parcels}
              projects={projects}
              notifications={notifications}
              language="en"
            />
          )}
        </main>

        <GovFooter />
      </div>
    </div>
  );
}
