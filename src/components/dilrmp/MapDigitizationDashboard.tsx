'use client';

import React, { useState, useMemo } from 'react';
import { DILRMP_MAP_DATA, StateMapRecord } from '@/lib/dilrmp-data';

export const MapDigitizationDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<StateMapRecord | null>(null);
  const [ulpinInput, setUlpinInput] = useState('MH-27-041-8921-0012');
  const [ulpinSearchResult, setUlpinSearchResult] = useState<any | null>(null);

  // Filtered
  const filteredData = useMemo(() => {
    return DILRMP_MAP_DATA.filter((item) =>
      item.state.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Aggregate totals
  const totals = useMemo(() => {
    return DILRMP_MAP_DATA.reduce(
      (acc, cur) => ({
        districts: acc.districts + cur.totalDistricts,
        tehsils: acc.tehsils + cur.totalTehsils,
        cadastralMapsTotal: acc.cadastralMapsTotal + cur.cadastralMapsTotal,
        cadastralMapsDigitized: acc.cadastralMapsDigitized + cur.cadastralMapsDigitized,
        fmbsTotal: acc.fmbsTotal + cur.fmbsTotal,
        fmbsDigitized: acc.fmbsDigitized + cur.fmbsDigitized,
        tippansTotal: acc.tippansTotal + cur.tippansTotal,
        tippansDigitized: acc.tippansDigitized + cur.tippansDigitized,
        combinedTotal: acc.combinedTotal + cur.combinedTotal,
        combinedDigitized: acc.combinedDigitized + cur.combinedDigitized,
        combinedGeoReferenced: acc.combinedGeoReferenced + cur.combinedGeoReferenced,
        villagesTotal: acc.villagesTotal + cur.villagesTotal,
        villagesLinkedToRoR: acc.villagesLinkedToRoR + cur.villagesLinkedToRoR,
        villagesGeoReferenced: acc.villagesGeoReferenced + cur.villagesGeoReferenced,
        villagesUlpinAssigned: acc.villagesUlpinAssigned + cur.villagesUlpinAssigned,
        parcelsTotal: acc.parcelsTotal + cur.parcelsTotal,
        parcelsGeoReferenced: acc.parcelsGeoReferenced + cur.parcelsGeoReferenced,
        parcelsUlpinAssigned: acc.parcelsUlpinAssigned + cur.parcelsUlpinAssigned,
      }),
      {
        districts: 0,
        tehsils: 0,
        cadastralMapsTotal: 0,
        cadastralMapsDigitized: 0,
        fmbsTotal: 0,
        fmbsDigitized: 0,
        tippansTotal: 0,
        tippansDigitized: 0,
        combinedTotal: 0,
        combinedDigitized: 0,
        combinedGeoReferenced: 0,
        villagesTotal: 0,
        villagesLinkedToRoR: 0,
        villagesGeoReferenced: 0,
        villagesUlpinAssigned: 0,
        parcelsTotal: 0,
        parcelsGeoReferenced: 0,
        parcelsUlpinAssigned: 0,
      }
    );
  }, []);

  const nationalMapPercent = ((totals.cadastralMapsDigitized / totals.cadastralMapsTotal) * 100).toFixed(2);
  const nationalGeoPercent = ((totals.combinedGeoReferenced / totals.combinedTotal) * 100).toFixed(2);
  const nationalUlpinPercent = ((totals.parcelsUlpinAssigned / totals.parcelsTotal) * 100).toFixed(2);

  const handleLookupUlpin = (e: React.FormEvent) => {
    e.preventDefault();
    setUlpinSearchResult({
      ulpin: ulpinInput,
      state: 'Maharashtra',
      district: 'Pune',
      taluka: 'Haveli',
      village: 'Wagholi',
      khasraNumber: '142/1B',
      areaHa: '1.4500 Ha (3.58 Acres)',
      geometryType: 'Polygon (EPSG:4326)',
      coordinates: '73.98214° E, 18.57891° N (Centroid)',
      geoReferenced: true,
      accuracy: '±0.014m (Drone Orthomosaic RTK)',
      rorLinked: true,
      owner: 'Rameshwar K. Patel & 2 Co-sharers',
      mutationStatus: 'MUT-2026-HAV-0941 (Cleared)',
      surveyAgency: 'Survey of India / BhuNaksha v4.2',
    });
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Title & Sovereign Breadcrumb Ribbon */}
      <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md flex-wrap">
          <div className="flex items-center gap-space-xs bg-primary text-on-primary px-space-sm py-space-2xs rounded">
            <span className="material-symbols-outlined text-[16px] text-tertiary">map</span>
            <span className="font-label-md text-label-md tracking-wider uppercase">DILRMP • GIS CADASTRAL PORTAL</span>
          </div>
          <div className="h-4 w-px bg-surface-container-highest"></div>
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
            <span>DIGITAL INDIA LAND RECORDS MODERNIZATION PROGRAMME</span>
            <span>•</span>
            <span className="text-secondary font-semibold">COMPONENT-II: DIGITIZED MAPSHEETS / FMBs / TIPPANS (MAP)</span>
          </div>
        </div>

        <div className="flex items-center gap-space-sm">
          <span className="inline-flex items-center gap-1 text-label-sm font-cadastral-code bg-surface-container-low px-2 py-1 rounded text-on-surface">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            SURVEY OF INDIA • BHU-AADHAAR / ULPIN READY
          </span>
        </div>
      </div>

      {/* KPI Cards Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">
              Cadastral Maps Digitized
            </span>
            <span className="material-symbols-outlined text-[18px] text-secondary">layers</span>
          </div>
          <div className="my-space-xs">
            <div className="font-headline-lg text-headline-lg font-bold text-on-surface">
              {totals.cadastralMapsDigitized.toLocaleString('en-IN')}
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              Out of {totals.cadastralMapsTotal.toLocaleString('en-IN')} Village Sheets
            </div>
          </div>
          <div className="flex items-center justify-between pt-space-2xs border-t border-outline-variant/30">
            <span className="text-emerald-700 font-label-md text-label-md font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
              {nationalMapPercent}% Digitized
            </span>
            <span className="font-cadastral-code text-label-sm text-on-surface-variant">Vector Layers</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">
              FMBs & Tippans
            </span>
            <span className="material-symbols-outlined text-[18px] text-secondary">architecture</span>
          </div>
          <div className="my-space-xs">
            <div className="font-headline-lg text-headline-lg font-bold text-on-surface">
              {((totals.fmbsDigitized + totals.tippansDigitized) / 100000).toFixed(2)} <span className="text-label-lg font-normal text-on-surface-variant">Lakh</span>
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              Subdivision Field Books
            </div>
          </div>
          <div className="flex items-center justify-between pt-space-2xs border-t border-outline-variant/30">
            <span className="text-emerald-700 font-label-md text-label-md font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
              98.1% Digitized
            </span>
            <span className="font-cadastral-code text-label-sm text-on-surface-variant">Ladder Traverses</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">
              Geo-Referenced Composite
            </span>
            <span className="material-symbols-outlined text-[18px] text-secondary">satellite_alt</span>
          </div>
          <div className="my-space-xs">
            <div className="font-headline-lg text-headline-lg font-bold text-on-surface">
              {nationalGeoPercent}%
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              {(totals.combinedGeoReferenced / 100000).toFixed(2)} Lakh Sheets in WGS84
            </div>
          </div>
          <div className="flex items-center justify-between pt-space-2xs border-t border-outline-variant/30">
            <span className="text-secondary font-label-md text-label-md font-semibold bg-secondary-fixed/40 px-1.5 py-0.5 rounded">
              EPSG:4326 PostGIS
            </span>
            <span className="font-cadastral-code text-label-sm text-on-surface-variant">RoW Geometries</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">
              Maps Linked to RoR
            </span>
            <span className="material-symbols-outlined text-[18px] text-secondary">link</span>
          </div>
          <div className="my-space-xs">
            <div className="font-headline-lg text-headline-lg font-bold text-on-surface">
              {totals.villagesLinkedToRoR.toLocaleString('en-IN')}
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              Villages with Spatial-Textual Sync
            </div>
          </div>
          <div className="flex items-center justify-between pt-space-2xs border-t border-outline-variant/30">
            <span className="text-emerald-700 font-label-md text-label-md font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
              98.9% Synchronized
            </span>
            <span className="font-cadastral-code text-label-sm text-on-surface-variant">7/12 & Khata</span>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">
              ULPIN (Bhu-Aadhaar)
            </span>
            <span className="material-symbols-outlined text-[18px] text-emerald-600">fingerprint</span>
          </div>
          <div className="my-space-xs">
            <div className="font-headline-lg text-headline-lg font-bold text-on-surface">
              {(totals.parcelsUlpinAssigned / 10000000).toFixed(2)} <span className="text-label-lg font-normal text-on-surface-variant">Cr</span>
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              14-Digit Alpha-numeric Codes
            </div>
          </div>
          <div className="flex items-center justify-between pt-space-2xs border-t border-outline-variant/30">
            <span className="text-emerald-700 font-label-md text-label-md font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
              {nationalUlpinPercent}% Parcels
            </span>
            <span className="font-cadastral-code text-label-sm text-on-surface-variant">Unique Pin</span>
          </div>
        </div>
      </div>

      {/* ULPIN Simulator & Bhu-Aadhaar Lookup */}
      <div className="bg-surface-container-lowest p-space-md rounded shadow-sm border border-outline-variant flex flex-col gap-space-sm">
        <div className="flex items-center justify-between flex-wrap gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-[20px]">qr_code_2</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Bhu-Aadhaar (ULPIN) Spatial Integrity Verification Desk
            </h3>
          </div>
          <span className="font-cadastral-code text-label-sm text-on-surface-variant">
            ISO-19152 LADM Compliant • 14-Digit Longitudinal/Latitudinal Geocoding
          </span>
        </div>

        <form onSubmit={handleLookupUlpin} className="flex items-center gap-space-sm flex-wrap mt-1">
          <div className="flex-1 min-w-[280px]">
            <input
              type="text"
              value={ulpinInput}
              onChange={(e) => setUlpinInput(e.target.value)}
              placeholder="Enter 14-Digit ULPIN (e.g. MH-27-041-8921-0012)"
              className="w-full px-space-sm py-space-xs bg-surface-container-lowest border border-outline-variant rounded font-cadastral-code text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
          <button
            type="submit"
            className="px-space-md py-space-xs bg-primary text-on-primary hover:bg-surface-tint rounded font-label-md text-label-md flex items-center gap-1 shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">travel_explore</span>
            <span>Query Cadastral Database</span>
          </button>
          <button
            type="button"
            onClick={() => setUlpinInput('UP-32-108-4102-0089')}
            className="px-space-sm py-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface rounded font-label-sm text-label-sm border border-outline-variant"
          >
            Sample: UP Expressway Parcel
          </button>
        </form>

        {/* Search Result Box */}
        {ulpinSearchResult && (
          <div className="mt-space-xs bg-surface-container-low p-space-md rounded border border-secondary/30 grid grid-cols-1 md:grid-cols-4 gap-space-sm animate-fadeIn">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant block">ULPIN / Bhu-Aadhaar:</span>
              <span className="font-cadastral-code font-bold text-secondary text-body-md">{ulpinSearchResult.ulpin}</span>
              <span className="font-label-sm text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded inline-block mt-1">
                Spatial Hash Validated
              </span>
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant block">Revenue Jurisdiction:</span>
              <span className="font-body-sm font-semibold text-on-surface">{ulpinSearchResult.state}, {ulpinSearchResult.district}</span>
              <span className="font-body-sm text-on-surface-variant block">{ulpinSearchResult.taluka} Taluka • Mouza {ulpinSearchResult.village}</span>
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant block">Khasra & Area:</span>
              <span className="font-cadastral-code font-bold text-on-surface block">Khasra No. {ulpinSearchResult.khasraNumber}</span>
              <span className="font-body-sm text-on-surface">{ulpinSearchResult.areaHa}</span>
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant block">Survey Precision:</span>
              <span className="font-cadastral-code text-on-surface block">{ulpinSearchResult.accuracy}</span>
              <span className="font-body-sm text-on-surface-variant block">{ulpinSearchResult.surveyAgency}</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Map Digitization State Table */}
      <div className="bg-surface-container-lowest rounded shadow-sm border border-outline-variant overflow-hidden flex flex-col">
        {/* Header Bar */}
        <div className="p-space-md bg-surface-container-low border-b border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[18px] text-secondary">grid_view</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              State / UT-wise Cadastral Map Digitization & ULPIN Progress (MAP)
            </h3>
            <span className="font-cadastral-code text-label-sm text-on-surface-variant ml-space-xs">
              ({filteredData.length} States Displayed)
            </span>
          </div>

          <div className="flex items-center gap-space-sm flex-wrap">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1 bg-surface-container-lowest border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary w-56"
              />
            </div>

            <button
              onClick={() => {
                const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(DILRMP_MAP_DATA, null, 2));
                const dl = document.createElement('a');
                dl.setAttribute('href', dataStr);
                dl.setAttribute('download', 'dilrmp-map-digitization.json');
                dl.click();
              }}
              className="flex items-center gap-1 px-3 py-1 bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded font-label-md text-label-md border border-outline-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">download</span>
              <span>Export MAP JSON</span>
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
                <th className="p-space-sm text-right">Cadastral Maps</th>
                <th className="p-space-sm text-right">Digitized Maps</th>
                <th className="p-space-sm text-right">% Digitized</th>
                <th className="p-space-sm text-right">FMBs Digitized</th>
                <th className="p-space-sm text-right">Tippans Digitized</th>
                <th className="p-space-sm text-right">Geo-Referenced</th>
                <th className="p-space-sm text-right">% Geo-Ref</th>
                <th className="p-space-sm text-right">Villages Linked RoR</th>
                <th className="p-space-sm text-right">Parcels with ULPIN</th>
                <th className="p-space-sm text-right">% ULPIN</th>
                <th className="p-space-sm text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50 font-body-sm">
              {filteredData.map((row) => (
                <tr key={row.sNo} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-space-sm text-center font-cadastral-code text-label-sm text-on-surface-variant">
                    {row.sNo}
                  </td>
                  <td className="p-space-sm font-semibold text-on-surface">
                    {row.state}
                  </td>
                  <td className="p-space-sm text-right font-cadastral-code">{row.cadastralMapsTotal.toLocaleString('en-IN')}</td>
                  <td className="p-space-sm text-right font-cadastral-code font-semibold text-secondary">
                    {row.cadastralMapsDigitized.toLocaleString('en-IN')}
                  </td>
                  <td className="p-space-sm text-right">
                    <span className={`inline-block px-1.5 py-0.5 rounded font-cadastral-code text-label-sm ${
                      row.cadastralMapsPercent >= 99.5 ? 'bg-emerald-50 text-emerald-800 font-bold' : 'bg-amber-50 text-amber-800'
                    }`}>
                      {row.cadastralMapsPercent.toFixed(2)}%
                    </span>
                  </td>
                  <td className="p-space-sm text-right font-cadastral-code">
                    {(row.fmbsDigitized / 100000).toFixed(2)} L
                  </td>
                  <td className="p-space-sm text-right font-cadastral-code">
                    {(row.tippansDigitized / 100000).toFixed(2)} L
                  </td>
                  <td className="p-space-sm text-right font-cadastral-code">
                    {(row.combinedGeoReferenced / 100000).toFixed(2)} L
                  </td>
                  <td className="p-space-sm text-right font-cadastral-code font-semibold">
                    {row.combinedGeoReferencedPercent.toFixed(2)}%
                  </td>
                  <td className="p-space-sm text-right font-cadastral-code font-semibold text-emerald-700">
                    {row.villagesLinkedToRoR.toLocaleString('en-IN')}
                  </td>
                  <td className="p-space-sm text-right font-cadastral-code">
                    {(row.parcelsUlpinAssigned / 10000000).toFixed(2)} Cr
                  </td>
                  <td className="p-space-sm text-right font-cadastral-code font-bold text-secondary">
                    {row.parcelsUlpinPercent.toFixed(1)}%
                  </td>
                  <td className="p-space-sm text-center">
                    <button
                      onClick={() => setSelectedState(row)}
                      className="px-2 py-0.5 bg-primary text-on-primary hover:bg-surface-tint rounded font-label-sm text-label-sm transition-colors"
                    >
                      GIS Spec
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GIS Spec Modal */}
      {selectedState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-xl bg-surface-container-lowest rounded shadow-xl border border-outline-variant overflow-hidden flex flex-col">
            <div className="bg-primary px-space-lg py-space-md text-on-primary flex items-center justify-between">
              <div>
                <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider block">
                  DILRMP Component-II GIS Specification
                </span>
                <h3 className="font-headline-sm text-headline-sm font-bold">
                  {selectedState.state} Cadastral Map & ULPIN Profile
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
                  <span className="text-on-surface-variant font-label-sm block">Village Cadastral Sheets:</span>
                  <span className="font-headline-sm font-bold text-on-surface">{selectedState.cadastralMapsTotal.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant font-label-sm block">Digitized Cadastrals:</span>
                  <span className="font-headline-sm font-bold text-emerald-700">{selectedState.cadastralMapsDigitized.toLocaleString('en-IN')} ({selectedState.cadastralMapsPercent}%)</span>
                </div>
                <div>
                  <span className="text-on-surface-variant font-label-sm block">Subdivision FMBs Digitized:</span>
                  <span className="font-headline-sm font-bold text-on-surface">{selectedState.fmbsDigitized.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant font-label-sm block">Tippans Digitized:</span>
                  <span className="font-headline-sm font-bold text-on-surface">{selectedState.tippansDigitized.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="border border-outline-variant p-space-md rounded flex flex-col gap-2">
                <span className="font-label-md text-label-md uppercase text-on-surface-variant font-semibold">
                  Spatial Integration & ULPIN Coverage
                </span>
                <div className="flex justify-between items-center py-1 border-b border-outline-variant/30">
                  <span>Villages Geo-Referenced in WGS 84:</span>
                  <strong className="font-cadastral-code text-on-surface">{selectedState.villagesGeoReferenced.toLocaleString('en-IN')} ({selectedState.villagesGeoReferencedPercent}%)</strong>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-outline-variant/30">
                  <span>Cadastral Maps Linked to RoRs:</span>
                  <strong className="font-cadastral-code text-emerald-700">{selectedState.villagesLinkedToRoR.toLocaleString('en-IN')} ({selectedState.villagesLinkedPercent}%)</strong>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span>Total Land Parcels Assigned 14-Digit ULPIN:</span>
                  <strong className="font-cadastral-code text-secondary">{(selectedState.parcelsUlpinAssigned / 10000000).toFixed(2)} Cr ({selectedState.parcelsUlpinPercent}%)</strong>
                </div>
              </div>

              <div className="flex justify-end pt-space-xs border-t border-outline-variant">
                <button
                  onClick={() => setSelectedState(null)}
                  className="px-space-md py-space-xs bg-primary text-on-primary rounded font-label-md text-label-md"
                >
                  Close Specification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
