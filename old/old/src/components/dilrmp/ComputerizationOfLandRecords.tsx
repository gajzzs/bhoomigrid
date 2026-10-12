'use client';

import React, { useState, useMemo } from 'react';
import { DILRMP_CLR_DATA, StateCLRRecord } from '@/lib/dilrmp-data';

export const ComputerizationOfLandRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOnlineMutation, setFilterOnlineMutation] = useState<boolean | null>(null);
  const [selectedState, setSelectedState] = useState<StateCLRRecord | null>(null);

  // Filtered list
  const filteredData = useMemo(() => {
    return DILRMP_CLR_DATA.filter((item) => {
      const matchesSearch = item.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMutation =
        filterOnlineMutation === null ? true : item.onlineMutation === filterOnlineMutation;
      return matchesSearch && matchesMutation;
    });
  }, [searchTerm, filterOnlineMutation]);

  // Aggregate totals
  const totals = useMemo(() => {
    return DILRMP_CLR_DATA.reduce(
      (acc, cur) => ({
        districts: acc.districts + cur.totalDistricts,
        tehsils: acc.tehsils + cur.totalTehsils,
        villages: acc.villages + cur.totalVillages,
        rorTotal: acc.rorTotal + cur.rorTotal,
        rorComputerized: acc.rorComputerized + cur.rorComputerized,
        clrCompletedVillages: acc.clrCompletedVillages + cur.clrCompletedVillages,
        ownersMale: acc.ownersMale + cur.ownersMale,
        ownersFemale: acc.ownersFemale + cur.ownersFemale,
        ownersTotal: acc.ownersTotal + cur.ownersTotal,
      }),
      {
        districts: 0,
        tehsils: 0,
        villages: 0,
        rorTotal: 0,
        rorComputerized: 0,
        clrCompletedVillages: 0,
        ownersMale: 0,
        ownersFemale: 0,
        ownersTotal: 0,
      }
    );
  }, []);

  const nationalRorPercent = ((totals.rorComputerized / totals.rorTotal) * 100).toFixed(2);
  const nationalVillagePercent = ((totals.clrCompletedVillages / totals.villages) * 100).toFixed(2);
  const femaleOwnershipPercent = ((totals.ownersFemale / totals.ownersTotal) * 100).toFixed(1);

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Title & Sovereign Breadcrumb Ribbon */}
      <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md flex-wrap">
          <div className="flex items-center gap-space-xs bg-primary text-on-primary px-space-sm py-space-2xs rounded">
            <span className="material-symbols-outlined text-[16px] text-tertiary">description</span>
            <span className="font-label-md text-label-md tracking-wider uppercase">DILRMP • NATIONAL REVENUE PORTAL</span>
          </div>
          <div className="h-4 w-px bg-surface-container-highest"></div>
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
            <span>DIGITAL INDIA LAND RECORDS MODERNIZATION PROGRAMME</span>
            <span>•</span>
            <span className="text-secondary font-semibold">COMPONENT-I: COMPUTERIZATION OF LAND RECORDS (CLR)</span>
          </div>
        </div>

        <div className="flex items-center gap-space-sm">
          <span className="inline-flex items-center gap-1 text-label-sm font-cadastral-code bg-surface-container-low px-2 py-1 rounded text-on-surface">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            SOURCE: DILRMP.GOV.IN • SYNCED 2026
          </span>
        </div>
      </div>

      {/* KPI Cards Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">
              RoRs Computerized
            </span>
            <span className="material-symbols-outlined text-[18px] text-secondary">verified</span>
          </div>
          <div className="my-space-xs">
            <div className="font-headline-lg text-headline-lg font-bold text-on-surface">
              {(totals.rorComputerized / 10000000).toFixed(2)} <span className="text-label-lg font-normal text-on-surface-variant">Cr</span>
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              Out of {(totals.rorTotal / 10000000).toFixed(2)} Cr Total RoRs
            </div>
          </div>
          <div className="flex items-center justify-between pt-space-2xs border-t border-outline-variant/30">
            <span className="text-emerald-700 font-label-md text-label-md font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
              {nationalRorPercent}% Digitized
            </span>
            <span className="font-cadastral-code text-label-sm text-on-surface-variant">Section 11(1) Base</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">
              Villages with 100% CLR
            </span>
            <span className="material-symbols-outlined text-[18px] text-secondary">holiday_village</span>
          </div>
          <div className="my-space-xs">
            <div className="font-headline-lg text-headline-lg font-bold text-on-surface">
              {(totals.clrCompletedVillages).toLocaleString('en-IN')}
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              Out of {totals.villages.toLocaleString('en-IN')} Villages
            </div>
          </div>
          <div className="flex items-center justify-between pt-space-2xs border-t border-outline-variant/30">
            <span className="text-emerald-700 font-label-md text-label-md font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
              {nationalVillagePercent}% Completed
            </span>
            <span className="font-cadastral-code text-label-sm text-on-surface-variant">Revenue Cadastres</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">
              Gender-Based RoRs
            </span>
            <span className="material-symbols-outlined text-[18px] text-secondary">wc</span>
          </div>
          <div className="my-space-xs">
            <div className="font-headline-lg text-headline-lg font-bold text-on-surface">
              {femaleOwnershipPercent}% <span className="text-label-lg font-normal text-on-surface-variant">Female Owners</span>
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              {(totals.ownersFemale / 10000000).toFixed(2)} Cr Women Landholders
            </div>
          </div>
          <div className="flex items-center justify-between pt-space-2xs border-t border-outline-variant/30">
            <span className="text-secondary font-label-md text-label-md font-semibold bg-secondary-fixed/40 px-1.5 py-0.5 rounded">
              {(totals.ownersMale / 10000000).toFixed(2)} Cr Male
            </span>
            <span className="font-cadastral-code text-label-sm text-on-surface-variant">RFCTLARR PAFs</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">
              e-Courts & SRO Integration
            </span>
            <span className="material-symbols-outlined text-[18px] text-secondary">account_balance</span>
          </div>
          <div className="my-space-xs">
            <div className="font-headline-lg text-headline-lg font-bold text-on-surface">
              100% <span className="text-label-lg font-normal text-on-surface-variant">Inter-Operable</span>
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              Registration & Revenue Court Linking
            </div>
          </div>
          <div className="flex items-center justify-between pt-space-2xs border-t border-outline-variant/30">
            <span className="text-emerald-700 font-label-md text-label-md font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
              Encumbrance Free
            </span>
            <span className="font-cadastral-code text-label-sm text-on-surface-variant">Sec 15 Objections</span>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">
              Legal Digital RoR
            </span>
            <span className="material-symbols-outlined text-[18px] text-emerald-600">verified_user</span>
          </div>
          <div className="my-space-xs">
            <div className="font-headline-lg text-headline-lg font-bold text-on-surface">
              28 States
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              IT Act 2000 Section 65B Certified
            </div>
          </div>
          <div className="flex items-center justify-between pt-space-2xs border-t border-outline-variant/30">
            <span className="text-emerald-700 font-label-md text-label-md font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
              Court Admissible
            </span>
            <span className="font-cadastral-code text-label-sm text-on-surface-variant">DSC / e-Sign</span>
          </div>
        </div>
      </div>

      {/* Main Table & Filter Controls */}
      <div className="bg-surface-container-lowest rounded shadow-sm border border-outline-variant overflow-hidden flex flex-col">
        {/* Table Header Bar */}
        <div className="p-space-md bg-surface-container-low border-b border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[18px] text-secondary">table_chart</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              State / UT-wise Computerization of Land Records Status (CLR)
            </h3>
            <span className="font-cadastral-code text-label-sm text-on-surface-variant ml-space-xs">
              ({filteredData.length} States Displayed)
            </span>
          </div>

          <div className="flex items-center gap-space-sm flex-wrap">
            <div className="flex items-center gap-1 bg-surface-container p-0.5 rounded text-label-sm">
              <button
                type="button"
                onClick={() => setFilterOnlineMutation(null)}
                className={`px-2 py-0.5 rounded ${
                  filterOnlineMutation === null
                    ? 'bg-primary text-on-primary font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                All States
              </button>
              <button
                type="button"
                onClick={() => setFilterOnlineMutation(true)}
                className={`px-2 py-0.5 rounded ${
                  filterOnlineMutation === true
                    ? 'bg-primary text-on-primary font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Online Mutation Active
              </button>
            </div>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search state/UT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1 bg-surface-container-lowest border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary w-56"
              />
            </div>

            <button
              onClick={() => {
                const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(DILRMP_CLR_DATA, null, 2));
                const dl = document.createElement('a');
                dl.setAttribute('href', dataStr);
                dl.setAttribute('download', 'dilrmp-computerization-land-records.json');
                dl.click();
              }}
              className="flex items-center gap-1 px-3 py-1 bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded font-label-md text-label-md border border-outline-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">download</span>
              <span>Export CLR JSON</span>
            </button>
          </div>
        </div>

        {/* Dense Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-body-sm">
            <thead>
              <tr className="bg-surface-container text-on-surface-variant font-label-md text-label-md border-b border-outline-variant">
                <th className="p-space-sm w-12 text-center">S.No</th>
                <th className="p-space-sm">State / UT</th>
                <th className="p-space-sm text-right">Districts</th>
                <th className="p-space-sm text-right">Tehsils</th>
                <th className="p-space-sm text-right">Villages</th>
                <th className="p-space-sm text-right">Total RoRs</th>
                <th className="p-space-sm text-right">Computerized</th>
                <th className="p-space-sm text-right">% RoR</th>
                <th className="p-space-sm text-right">Completed Villages</th>
                <th className="p-space-sm text-right">% Villages</th>
                <th className="p-space-sm text-center">Online RoR</th>
                <th className="p-space-sm text-center">Signed RoR</th>
                <th className="p-space-sm text-center">Auto Mutation</th>
                <th className="p-space-sm text-center">e-Courts Link</th>
                <th className="p-space-sm text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50 font-body-sm">
              {filteredData.map((row) => (
                <tr key={row.sNo} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-space-sm text-center font-cadastral-code text-label-sm text-on-surface-variant">
                    {row.sNo}
                  </td>
                  <td className="p-space-sm font-semibold text-on-surface flex items-center gap-1.5">
                    <span>{row.state}</span>
                  </td>
                  <td className="p-space-sm text-right font-cadastral-code">{row.totalDistricts}</td>
                  <td className="p-space-sm text-right font-cadastral-code">{row.totalTehsils}</td>
                  <td className="p-space-sm text-right font-cadastral-code">{row.totalVillages.toLocaleString('en-IN')}</td>
                  <td className="p-space-sm text-right font-cadastral-code text-on-surface-variant">
                    {(row.rorTotal / 100000).toFixed(2)} L
                  </td>
                  <td className="p-space-sm text-right font-cadastral-code font-semibold text-secondary">
                    {(row.rorComputerized / 100000).toFixed(2)} L
                  </td>
                  <td className="p-space-sm text-right">
                    <span className={`inline-block px-1.5 py-0.5 rounded font-cadastral-code text-label-sm ${
                      row.rorPercent >= 99.5 ? 'bg-emerald-50 text-emerald-800 font-bold' : 'bg-amber-50 text-amber-800'
                    }`}>
                      {row.rorPercent.toFixed(2)}%
                    </span>
                  </td>
                  <td className="p-space-sm text-right font-cadastral-code">{row.clrCompletedVillages.toLocaleString('en-IN')}</td>
                  <td className="p-space-sm text-right font-cadastral-code font-semibold">
                    {row.clrCompletedPercent.toFixed(2)}%
                  </td>
                  <td className="p-space-sm text-center">
                    {row.onlineDownload ? (
                      <span className="text-emerald-700 font-bold text-label-sm bg-emerald-50 px-1.5 py-0.5 rounded">YES</span>
                    ) : (
                      <span className="text-rose-700 font-bold text-label-sm bg-rose-50 px-1.5 py-0.5 rounded">NO</span>
                    )}
                  </td>
                  <td className="p-space-sm text-center">
                    {row.digitallySigned ? (
                      <span className="text-emerald-700 font-bold text-label-sm bg-emerald-50 px-1.5 py-0.5 rounded">VALID</span>
                    ) : (
                      <span className="text-rose-700 font-bold text-label-sm bg-rose-50 px-1.5 py-0.5 rounded">PENDING</span>
                    )}
                  </td>
                  <td className="p-space-sm text-center">
                    {row.autoMutation ? (
                      <span className="text-emerald-700 font-bold text-label-sm bg-emerald-50 px-1.5 py-0.5 rounded">ACTIVE</span>
                    ) : (
                      <span className="text-amber-700 font-bold text-label-sm bg-amber-50 px-1.5 py-0.5 rounded">MANUAL</span>
                    )}
                  </td>
                  <td className="p-space-sm text-center">
                    {row.eCourtsIntegration ? (
                      <span className="text-emerald-700 font-bold text-label-sm bg-emerald-50 px-1.5 py-0.5 rounded">SYNCED</span>
                    ) : (
                      <span className="text-rose-700 font-bold text-label-sm bg-rose-50 px-1.5 py-0.5 rounded">NO</span>
                    )}
                  </td>
                  <td className="p-space-sm text-center">
                    <button
                      onClick={() => setSelectedState(row)}
                      className="px-2 py-0.5 bg-primary text-on-primary hover:bg-surface-tint rounded font-label-sm text-label-sm transition-colors"
                    >
                      Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* State Dossier Detail Modal */}
      {selectedState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-xl bg-surface-container-lowest rounded shadow-xl border border-outline-variant overflow-hidden flex flex-col">
            <div className="bg-primary px-space-lg py-space-md text-on-primary flex items-center justify-between">
              <div>
                <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider block">
                  DILRMP Component-I State Dossier
                </span>
                <h3 className="font-headline-sm text-headline-sm font-bold">
                  {selectedState.state} Land Records Profile
                </h3>
              </div>
              <button
                onClick={() => setSelectedState(null)}
                className="p-1 hover:bg-surface-container-high/20 rounded text-on-primary"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-space-lg flex flex-col gap-space-md text-body-sm">
              <div className="grid grid-cols-2 gap-space-sm bg-surface-container-low p-space-md rounded">
                <div>
                  <span className="text-on-surface-variant font-label-sm block">Total Districts:</span>
                  <span className="font-headline-sm font-bold text-on-surface">{selectedState.totalDistricts}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant font-label-sm block">Total Tehsils:</span>
                  <span className="font-headline-sm font-bold text-on-surface">{selectedState.totalTehsils}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant font-label-sm block">Total Revenue Villages:</span>
                  <span className="font-headline-sm font-bold text-on-surface">{selectedState.totalVillages.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant font-label-sm block">CLR Completed Villages:</span>
                  <span className="font-headline-sm font-bold text-emerald-700">{selectedState.clrCompletedVillages.toLocaleString('en-IN')} ({selectedState.clrCompletedPercent}%)</span>
                </div>
              </div>

              {/* Gender-disaggregated metrics */}
              <div className="border border-outline-variant p-space-md rounded">
                <span className="font-label-md text-label-md uppercase text-on-surface-variant block mb-2 font-semibold">
                  Gender-Disaggregated Land Ownership (RoR)
                </span>
                <div className="grid grid-cols-3 gap-space-xs text-center">
                  <div className="p-2 bg-surface-container rounded">
                    <span className="text-label-sm text-on-surface-variant block">Male Owners</span>
                    <strong className="font-cadastral-code text-on-surface block mt-1">{(selectedState.ownersMale / 100000).toFixed(2)} L</strong>
                  </div>
                  <div className="p-2 bg-surface-container rounded">
                    <span className="text-label-sm text-on-surface-variant block">Female Owners</span>
                    <strong className="font-cadastral-code text-secondary block mt-1">{(selectedState.ownersFemale / 100000).toFixed(2)} L</strong>
                  </div>
                  <div className="p-2 bg-surface-container rounded">
                    <span className="text-label-sm text-on-surface-variant block">Total Owners</span>
                    <strong className="font-cadastral-code text-on-surface block mt-1">{(selectedState.ownersTotal / 100000).toFixed(2)} L</strong>
                  </div>
                </div>
              </div>

              {/* Statutory Clearances */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label-md text-label-md uppercase text-on-surface-variant font-semibold">
                  Statutory & Judicial Inter-Operability (RFCTLARR 2013)
                </span>
                <div className="grid grid-cols-2 gap-2 text-label-sm">
                  <div className="flex items-center gap-1.5 p-1.5 bg-surface-container-low rounded">
                    <span className="material-symbols-outlined text-emerald-600 text-[16px]">check_circle</span>
                    <span>Online RoR Download</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 bg-surface-container-low rounded">
                    <span className="material-symbols-outlined text-emerald-600 text-[16px]">check_circle</span>
                    <span>Digitally Signed Legal RoR</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 bg-surface-container-low rounded">
                    <span className="material-symbols-outlined text-emerald-600 text-[16px]">check_circle</span>
                    <span>Bank Mortgage Clearing</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 bg-surface-container-low rounded">
                    <span className="material-symbols-outlined text-emerald-600 text-[16px]">check_circle</span>
                    <span>e-Courts Case Linkage</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-space-xs border-t border-outline-variant">
                <button
                  onClick={() => setSelectedState(null)}
                  className="px-space-md py-space-xs bg-primary text-on-primary rounded font-label-md text-label-md"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
