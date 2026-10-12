'use client';

import React, { useState } from 'react';
import { Project } from '@/types/land-acquisition';

interface GeminiProposalEnhancerProps {
  activeProject: Project;
}

export const GeminiProposalEnhancer: React.FC<GeminiProposalEnhancerProps> = ({
  activeProject,
}) => {
  const [activeTab, setActiveTab] = useState<'SCRUTINY' | 'OBJECTION_DRAFTER' | 'AWARD_AUDIT' | 'ASSISTANT'>('SCRUTINY');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisDone, setAnalysisDone] = useState<boolean>(false);
  const [userQuery, setUserQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'gemini'; text: string; time: string }>>([
    {
      role: 'gemini',
      text: `Namaste Shri R. K. Sharma! I am your Gemini Sovereign Land AI Advisor trained on RFCTLARR Act 2013, DILRMP spatial standards, and Central MoRTH/NHAI acquisition circulars. How may I assist your scrutiny on '${activeProject.title}' today?`,
      time: '10:15 IST',
    },
  ]);

  // Handle running AI Scrutiny
  const handleRunScrutiny = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisDone(true);
    }, 1200);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const userMsg = userQuery.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST';
    const newChat = [...chatHistory, { role: 'user' as const, text: userMsg, time: now }];
    setChatHistory(newChat);
    setUserQuery('');

    // Generate intelligent response based on query
    setTimeout(() => {
      let reply = '';
      const q = userMsg.toLowerCase();
      if (q.includes('solatium') || q.includes('formula') || q.includes('compensation')) {
        reply = `Under the First Schedule of the RFCTLARR Act 2013:
1. Basic Market Value is determined under Section 26(1) (higher of circle rate or average sale price of preceding 3 years).
2. Rural Multiplier (Factor 1.0 to 2.0 based on distance from urban limits) is applied under Section 26(2).
3. 100% Solatium is mandatory under Section 30(1) on total market value.
4. Additional Market Value (AMV) @ 12% per annum is payable from Section 11 publication to award date under Section 30(3).
Total Compensation = (Market Value × Multiplier) + 100% Solatium + 12% AMV + Value of Assets.`;
      } else if (q.includes('sec 15') || q.includes('objection') || q.includes('window')) {
        reply = `Under Section 15(1), any person interested has 60 calendar days from Section 11 gazette publication to file objections. The Competent Authority (CALA) must give the petitioner an opportunity of being heard in person under Section 15(2), conduct site verification with the Tehsildar, and pronounce a reasoned statutory order within 60 days of the hearing.`;
      } else if (q.includes('forest') || q.includes('clearance') || q.includes('wildlife')) {
        reply = `For corridor alignment through forest land, Stage-I in-principle forest clearance under Forest (Conservation) Act 1980 is mandatory prior to Section 19 declaration. In this project, CAMPA compensatory afforestation deposit of ₹14.82 Cr has already been credited to the National CAMPA Escrow, satisfying Rule 11 statutory requirements.`;
      } else {
        reply = `Analysis for project ${activeProject.code} (${activeProject.title}): All alignment coordinates have been cross-checked against Survey of India 1:50,000 toposheets and DILRMP computerized RoRs. Currently, 842.60 Ha proposed area is 78% compliant with zero wildlife sanctuary buffer overlap.`;
      }

      setChatHistory((prev) => [
        ...prev,
        { role: 'gemini', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST' },
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Title & Sovereign AI Ribbon */}
      <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md flex-wrap">
          <div className="flex items-center gap-space-xs bg-primary text-on-primary px-space-sm py-space-2xs rounded">
            <span className="material-symbols-outlined text-[18px] text-tertiary">psychology</span>
            <span className="font-label-md text-label-md tracking-wider uppercase">GEMINI SOVEREIGN AI ADVISOR</span>
          </div>
          <div className="h-4 w-px bg-surface-container-highest"></div>
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
            <span>MULTIMODAL REQUISITION SCRUTINY & STATUTORY DRAFTING</span>
            <span>•</span>
            <span className="text-secondary font-semibold">POWERED BY GOOGLE GEMINI 1.5 PRO / FLASH</span>
          </div>
        </div>

        <div className="flex items-center gap-space-sm">
          <span className="inline-flex items-center gap-1 text-label-sm font-cadastral-code bg-secondary-fixed/50 px-2 py-1 rounded text-on-surface">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            NIC MEGHRAJ AI INFERENCE NODE
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-outline-variant pb-1 flex-wrap">
        <button
          onClick={() => setActiveTab('SCRUTINY')}
          className={`flex items-center gap-1.5 px-space-md py-space-xs rounded font-label-md text-label-md transition-colors ${
            activeTab === 'SCRUTINY'
              ? 'bg-primary text-on-primary font-bold shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">fact_check</span>
          <span>1. Requisition & Alignment Scrutiny</span>
        </button>

        <button
          onClick={() => setActiveTab('OBJECTION_DRAFTER')}
          className={`flex items-center gap-1.5 px-space-md py-space-xs rounded font-label-md text-label-md transition-colors ${
            activeTab === 'OBJECTION_DRAFTER'
              ? 'bg-primary text-on-primary font-bold shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">gavel</span>
          <span>2. Section 15 Objection Drafter</span>
        </button>

        <button
          onClick={() => setActiveTab('AWARD_AUDIT')}
          className={`flex items-center gap-1.5 px-space-md py-space-xs rounded font-label-md text-label-md transition-colors ${
            activeTab === 'AWARD_AUDIT'
              ? 'bg-primary text-on-primary font-bold shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">calculate</span>
          <span>3. RFCTLARR Award Formula Audit</span>
        </button>

        <button
          onClick={() => setActiveTab('ASSISTANT')}
          className={`flex items-center gap-1.5 px-space-md py-space-xs rounded font-label-md text-label-md transition-colors ${
            activeTab === 'ASSISTANT'
              ? 'bg-primary text-on-primary font-bold shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">chat</span>
          <span>4. Bhoomi-AI Legal Assistant</span>
        </button>
      </div>

      {/* Tab 1: Alignment Scrutiny */}
      {activeTab === 'SCRUTINY' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          <div className="lg:col-span-8 bg-surface-container-lowest p-space-lg rounded shadow-sm border border-outline-variant flex flex-col gap-space-md">
            <div className="flex items-center justify-between flex-wrap gap-space-sm border-b border-outline-variant pb-space-sm">
              <div>
                <span className="font-label-sm text-label-sm text-secondary uppercase font-bold">
                  Stage 01 Automated AI Scrutiny
                </span>
                <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-0.5">
                  Alignment Geometry & Statutory Feasibility Analysis
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {analysisDone && (
                  <span className="text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-1 rounded text-label-sm font-bold flex items-center gap-1 animate-fadeIn">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Scrutiny Complete
                  </span>
                )}
                <button
                  onClick={handleRunScrutiny}
                  disabled={isAnalyzing}
                  className="px-space-lg py-space-xs bg-tertiary hover:bg-amber-600 text-on-primary rounded font-label-md text-label-md flex items-center gap-1.5 shadow-sm transition-colors font-semibold"
                >
                  <span className={`material-symbols-outlined text-[18px] ${isAnalyzing ? 'animate-spin' : ''}`}>
                    {isAnalyzing ? 'sync' : 'auto_fix_high'}
                  </span>
                  <span>{isAnalyzing ? 'Analyzing Alignment...' : 'Run Gemini Scrutiny'}</span>
                </button>
              </div>
            </div>

            <p className="text-body-md text-on-surface-variant">
              Gemini AI analyzes the submitted corridor KML vectors against Survey of India cadastral records, ISRO Bhuvan land use maps, and statutory clearance checklists (Forest, Wildlife, Defense, Irrigation).
            </p>

            {/* AI Scrutiny Result Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
              <div className="p-space-sm bg-emerald-50 border border-emerald-200 rounded flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-emerald-800 font-bold uppercase">Corridor Optimization</span>
                  <span className="material-symbols-outlined text-emerald-700 text-[18px]">verified</span>
                </div>
                <div className="my-1">
                  <span className="font-headline-sm font-bold text-emerald-900 block">94.2% Optimal</span>
                  <span className="text-[12px] text-emerald-800">Bypasses prime multi-crop irrigated land in 18 Mouzas.</span>
                </div>
                <span className="font-cadastral-code text-[11px] text-emerald-700">Section 10(2) Compliant</span>
              </div>

              <div className="p-space-sm bg-amber-50 border border-amber-200 rounded flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-amber-800 font-bold uppercase">RoW Overlap Warning</span>
                  <span className="material-symbols-outlined text-amber-700 text-[18px]">warning</span>
                </div>
                <div className="my-1">
                  <span className="font-headline-sm font-bold text-amber-900 block">18 Khasras Overlap</span>
                  <span className="text-[12px] text-amber-800">State Highway RoW conflict detected at Chainage 156.400.</span>
                </div>
                <span className="font-cadastral-code text-[11px] text-amber-700">Action: Exclude Old RoW</span>
              </div>

              <div className="p-space-sm bg-blue-50 border border-blue-200 rounded flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-blue-800 font-bold uppercase">Forest & Eco-Sensitive</span>
                  <span className="material-symbols-outlined text-blue-700 text-[18px]">park</span>
                </div>
                <div className="my-1">
                  <span className="font-headline-sm font-bold text-blue-900 block">14.82 Ha Forest Land</span>
                  <span className="text-[12px] text-blue-800">Stage-I Clearance Granted • NPV Deposited in CAMPA.</span>
                </div>
                <span className="font-cadastral-code text-[11px] text-blue-700">MoEF&CC In-Principle OK</span>
              </div>
            </div>

            {/* AI Detailed Scrutiny Memo */}
            <div className="border border-outline-variant p-space-md rounded bg-surface-container-low flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md uppercase text-secondary font-bold">
                  Gemini Nodal Scrutiny Memorandum (Generated)
                </span>
                <span className="font-cadastral-code text-label-sm text-on-surface-variant">
                  Doc Ref: GEMINI-MORTH-SCR-2026/09
                </span>
              </div>

              <div className="font-body-sm text-body-sm text-on-surface space-y-2 mt-1 leading-relaxed">
                <p>
                  <strong>1. Cadastral Alignment Integrity:</strong> The proposed right-of-way alignment spanning 56.500 km across Ludhiana and Jalandhar districts has been mapped against 1,420 Khasra polygons. Zero overlap observed with archaeological monuments or scheduled tribal tracts (Fifth Schedule).
                </p>
                <p>
                  <strong>2. SIA Requirement Scrutiny:</strong> Project qualified as a linear corridor under Section 10A exemption. Social Impact Management Plan (SIMP) is recommended for 24 Project Affected Families residing adjacent to Service Road chainage 172.000.
                </p>
                <p>
                  <strong>3. Statutory Recommendation:</strong> The proposal is fit for issuance of <strong>Section 11(1) Preliminary Notification</strong> subject to exclusion of 18 overlapping State PWD survey numbers.
                </p>
              </div>

              <div className="pt-2 border-t border-outline-variant/40 flex justify-end">
                <button className="px-3 py-1 bg-primary text-on-primary hover:bg-surface-tint rounded font-label-sm text-label-sm transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">download</span>
                  <span>Export Scrutiny Note PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Project Context Card */}
          <div className="lg:col-span-4 bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col gap-space-sm">
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-bold">
              Corridor Requisition Dossier
            </span>
            <div className="p-space-sm bg-surface-container-low rounded">
              <span className="font-body-sm font-bold text-on-surface block">{activeProject.title}</span>
              <span className="font-cadastral-code text-label-sm text-secondary block mt-0.5">{activeProject.code}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-outline-variant/30 text-body-sm">
              <span>Proposed Area:</span>
              <strong className="font-cadastral-code">{activeProject.totalProposedAreaHa} Ha</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-outline-variant/30 text-body-sm">
              <span>Estimated Budget:</span>
              <strong className="font-cadastral-code">₹{activeProject.totalEstimatedBudgetCr} Cr</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-outline-variant/30 text-body-sm">
              <span>Lead Requisitioner:</span>
              <span>{activeProject.requiringBody}</span>
            </div>
            <div className="flex justify-between py-1 text-body-sm">
              <span>Current Status:</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{activeProject.status}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Section 15 Objection Drafter */}
      {activeTab === 'OBJECTION_DRAFTER' && (
        <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm border border-outline-variant flex flex-col gap-space-md">
          <div className="flex items-center justify-between flex-wrap gap-space-sm border-b border-outline-variant pb-space-sm">
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase font-bold">
                Quasi-Judicial Section 15(2) Adjudication
              </span>
              <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-0.5">
                AI Statutory Hearing Notice & Reasoned Order Drafter
              </h3>
            </div>
            <span className="font-cadastral-code text-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded">
              CALA Bench • Haveli Taluka
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-space-sm">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                Select Objection Matter:
              </label>
              <select className="w-full px-space-sm py-space-xs bg-surface-container-lowest border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary">
                <option>OBJ-2026/041: Rameshwar Patel - Objection regarding Circle Rate undervaluation (Survey 142/1B)</option>
                <option>OBJ-2026/042: Gram Panchayat Wagholi - Irrigation canal RoW bifurcation</option>
                <option>OBJ-2026/043: M/s Godavari Logistics - Warehouse partial acquisition & severance claim</option>
              </select>

              <div className="p-space-sm bg-surface-container-low rounded border border-outline-variant flex flex-col gap-1 text-body-sm">
                <span className="font-semibold text-on-surface">Petitioner Grounds:</span>
                <p className="text-on-surface-variant">
                  Petitioner claims the basic circle rate of ₹45,00,000/Ha does not reflect recent registered sale transactions in adjoining Mouza (₹65,00,000/Ha) and requests re-assessment under Section 26(1)(b).
                </p>
              </div>

              <button className="px-space-md py-space-xs bg-secondary text-on-secondary rounded font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-[16px]">draw</span>
                <span>Draft Quasi-Judicial Hearing Order</span>
              </button>
            </div>

            <div className="p-space-md bg-surface border border-outline-variant rounded font-body-sm text-body-sm flex flex-col gap-space-xs">
              <span className="font-label-md text-label-md uppercase text-secondary font-bold">
                Statutory Order Preview (RFCTLARR 2013 Sec 15(2))
              </span>
              <div className="bg-surface-container-lowest p-space-sm rounded border border-outline-variant font-mono text-[12px] leading-relaxed text-on-surface space-y-2">
                <p className="font-bold text-center">BEFORE THE COMPETENT AUTHORITY FOR LAND ACQUISITION (CALA)</p>
                <p className="text-center text-[11px] text-on-surface-variant">CASE NO: CALA/PUN/HAV/SEC15/2026/041</p>
                <p>IN THE MATTER OF: Shri Rameshwar K. Patel ...Petitioner</p>
                <p>VERSUS: National Highways Authority of India ...Respondent</p>
                <p className="text-justify">
                  ORDER: Having heard the petitioner and examined the average of 50% highest value sale deeds for the preceding three years under Section 26(1)(a), it is observed that the prevailing market value stands at ₹58,20,000/Ha. The award inquiry shall incorporate the verified sale deed registered at Sub-Registrar Office Haveli under Doc No. 4182/2025.
                </p>
                <p className="font-bold">Order pronounced on 21st day of September, 2026.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Award Formula Audit */}
      {activeTab === 'AWARD_AUDIT' && (
        <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm border border-outline-variant flex flex-col gap-space-md">
          <div className="flex items-center justify-between flex-wrap gap-space-sm border-b border-outline-variant pb-space-sm">
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase font-bold">
                First Schedule Mathematical Integrity
              </span>
              <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-0.5">
                RFCTLARR 2013 Statutory Compensation Calculator Audit
              </h3>
            </div>
            <span className="font-cadastral-code text-label-sm text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
              Audited by Gemini Financial Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md text-body-sm">
            <div className="p-space-md bg-surface-container-low rounded border border-outline-variant">
              <span className="font-label-sm text-on-surface-variant block">1. Basic Market Value (A)</span>
              <span className="font-headline-md font-bold text-on-surface block mt-1">₹58,20,000 / Ha</span>
              <span className="text-[11px] text-on-surface-variant">Circle Rate × Sec 26(1) Average</span>
            </div>
            <div className="p-space-md bg-surface-container-low rounded border border-outline-variant">
              <span className="font-label-sm text-on-surface-variant block">2. Rural Multiplier (B)</span>
              <span className="font-headline-md font-bold text-secondary block mt-1">1.25 ×</span>
              <span className="text-[11px] text-on-surface-variant">Rural area 10-20km distance</span>
            </div>
            <div className="p-space-md bg-surface-container-low rounded border border-outline-variant">
              <span className="font-label-sm text-on-surface-variant block">3. Solatium @ 100% (C)</span>
              <span className="font-headline-md font-bold text-emerald-700 block mt-1">₹72,75,000 / Ha</span>
              <span className="text-[11px] text-emerald-800">Mandatory 100% of (A × B)</span>
            </div>
            <div className="p-space-md bg-surface-container-low rounded border border-outline-variant">
              <span className="font-label-sm text-on-surface-variant block">4. Total Award Rate</span>
              <span className="font-headline-md font-bold text-on-surface block mt-1">₹1,54,22,500 / Ha</span>
              <span className="text-[11px] text-on-surface-variant">Includes 12% AMV + Assets</span>
            </div>
          </div>

          <div className="bg-emerald-50 p-space-md rounded border border-emerald-200 text-body-sm text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-emerald-700 text-[20px]">verified</span>
              <span><strong>Gemini Compliance Pass:</strong> All award calculations match RFCTLARR Act 2013 First Schedule formulas without discrepancy.</span>
            </div>
            <span className="font-cadastral-code text-label-sm text-emerald-700 font-bold">ZERO ANOMALIES</span>
          </div>
        </div>
      )}

      {/* Tab 4: Interactive Assistant */}
      {activeTab === 'ASSISTANT' && (
        <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm border border-outline-variant flex flex-col gap-space-md">
          <div className="flex items-center justify-between flex-wrap gap-space-sm border-b border-outline-variant pb-space-sm">
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase font-bold">
                Bhoomi-AI Legal Assistant
              </span>
              <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-0.5">
                Consult Gemini on Land Laws, Notifications & Judgments
              </h3>
            </div>
            <span className="font-cadastral-code text-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded">
              Trained on RFCTLARR 2013 & High Court / SC Precedents
            </span>
          </div>

          {/* Chat Messages Window */}
          <div className="min-h-[260px] max-h-[380px] overflow-y-auto p-space-md bg-surface-container-low rounded border border-outline-variant flex flex-col gap-space-sm">
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-2xl p-space-sm rounded text-body-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-on-primary rounded-br-none shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface border border-outline-variant rounded-bl-none shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-space-md mb-1">
                    <span className="font-label-sm text-[10px] uppercase font-bold opacity-75">
                      {msg.role === 'user' ? 'Shri R. K. Sharma (Joint Sec)' : 'Gemini Sovereign AI'}
                    </span>
                    <span className="font-cadastral-code text-[10px] opacity-60">{msg.time}</span>
                  </div>
                  <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="flex items-center gap-space-sm">
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Ask Gemini about Section 11 lapse rules, 100% Solatium, or R&R entitlements..."
              className="flex-1 px-space-md py-space-sm bg-surface-container-lowest border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button
              type="submit"
              className="px-space-lg py-space-sm bg-primary text-on-primary hover:bg-surface-tint rounded font-label-md text-label-md flex items-center gap-1 shadow-sm transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              <span>Send Query</span>
            </button>
          </form>

          {/* Quick Suggestion Chips */}
          <div className="flex items-center gap-space-xs flex-wrap text-label-sm">
            <span className="text-on-surface-variant">Suggested Prompts:</span>
            <button
              type="button"
              onClick={() => setUserQuery('What are the rules for RFCTLARR 100% solatium calculation?')}
              className="px-2 py-0.5 bg-surface-container hover:bg-surface-container-high rounded text-on-surface"
            >
              100% Solatium Formula
            </button>
            <button
              type="button"
              onClick={() => setUserQuery('Explain Section 15 objection window duration and CALA powers.')}
              className="px-2 py-0.5 bg-surface-container hover:bg-surface-container-high rounded text-on-surface"
            >
              Sec 15 60-Day Window
            </button>
            <button
              type="button"
              onClick={() => setUserQuery('What are the Stage-I forest clearance prerequisites under Sec 19?')}
              className="px-2 py-0.5 bg-surface-container hover:bg-surface-container-high rounded text-on-surface"
            >
              Forest Clearances
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
