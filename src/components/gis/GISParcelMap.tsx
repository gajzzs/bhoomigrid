'use client';

import React, { useEffect, useRef, useState } from 'react';
import { 
  MapPin, 
  Search, 
  Download, 
  CheckCircle, 
  Copy, 
  Check, 
  Database, 
  Camera, 
  Scale
} from 'lucide-react';
import { LandParcel, Project, ParcelStatus, StakeholderRole } from '@/types/land-acquisition';
import { formatIndianCurrency } from '@/lib/rfctlarr-calculator';
import { EXTERNAL_GIS_PROVIDERS, createWmsLayer, type WmsProviderConfig } from '@/lib/gis-providers';

interface GISParcelMapProps {
  parcels: LandParcel[];
  projects: Project[];
  selectedProjectId?: string;
  onSelectProject: (projectId: string) => void;
  onUpdateParcelStatus: (parcelId: string, status: ParcelStatus) => void;
  language: 'en' | 'hi';
  currentRole: StakeholderRole;
}

const STATUS_COLOR_MAP: Record<ParcelStatus, { fill: string; stroke: string; label: string }> = {
  PROPOSED: { fill: '#3b82f6', stroke: '#1d4ed8', label: 'Proposed (Surveyed)' },
  NOTIFIED_SEC11: { fill: '#eab308', stroke: '#a16207', label: 'Section 11 Notified' },
  DECLARED_SEC19: { fill: '#f97316', stroke: '#c2410c', label: 'Section 19 Declared' },
  AWARD_DECLARED: { fill: '#a855f7', stroke: '#7e22ce', label: 'Award Determined' },
  COMPENSATION_DISBURSED: { fill: '#10b981', stroke: '#047857', label: 'Compensation Disbursed' },
  POSSESSION_TAKEN: { fill: '#059669', stroke: '#064e3b', label: 'Possession Taken (Complete)' },
  DISPUTED: { fill: '#ef4444', stroke: '#b91c1c', label: 'Under Dispute / Litigation' },
};

export const GISParcelMap: React.FC<GISParcelMapProps> = ({
  parcels,
  projects,
  selectedProjectId,
  onSelectProject,
  onUpdateParcelStatus,
  language,
  currentRole,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const polygonLayersRef = useRef<any[]>([]);

  const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [baseMapType, setBaseMapType] = useState<'osm' | 'satellite' | 'carto'>('osm');
  const [copiedWkt, setCopiedWkt] = useState(false);
  const [simulatedSqlResult, setSimulatedSqlResult] = useState<string | null>(null);
  const [activeOverlays, setActiveOverlays] = useState<Record<string, boolean>>({});
  const [overlayError, setOverlayError] = useState<string | null>(null);
  const overlayLayersRef = useRef<Record<string, any>>({});

  // Filter parcels based on project and search
  const displayedParcels = parcels.filter((p) => {
    if (selectedProjectId && p.projectId !== selectedProjectId) return false;
    if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.khasraNumber.toLowerCase().includes(q) ||
        p.ownerName.toLowerCase().includes(q) ||
        p.village.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Initialize Leaflet Map
  useEffect(() => {
    let isMounted = true;

    async function initLeaflet() {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      const L = (await import('leaflet')).default;

      // Center around Gujarat (default Bharuch coords: 21.73, 73.01)
      const initialCenter: [number, number] = [21.73, 73.01];

      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: 14,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      // Base tile layers
      const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | NIC Bhoomi-GIS',
        maxZoom: 19,
      });

      const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri, Earthstar Geographics | PM GatiShakti GIS',
        maxZoom: 18,
      });

      const cartoLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CartoDB | National Spatial Data Infrastructure',
        maxZoom: 19,
      });

      osmLayer.addTo(map);
      (map as any)._layersMap = { osm: osmLayer, satellite: satelliteLayer, carto: cartoLayer };
      (map as any)._activeLayer = osmLayer;
    }

    initLeaflet();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Base Layer
  useEffect(() => {
    if (!mapInstanceRef.current || !(mapInstanceRef.current as any)._layersMap) return;
    const map = mapInstanceRef.current;
    const layers = (map as any)._layersMap;

    if ((map as any)._activeLayer) {
      map.removeLayer((map as any)._activeLayer);
    }

    const nextLayer = layers[baseMapType] || layers.osm;
    nextLayer.addTo(map);
    (map as any)._activeLayer = nextLayer;
  }, [baseMapType]);

  // Render Polygons for displayed parcels
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    async function drawParcels() {
      const L = (await import('leaflet')).default;
      const map = mapInstanceRef.current;

      // Clear previous polygons
      polygonLayersRef.current.forEach((layer) => map.removeLayer(layer));
      polygonLayersRef.current = [];

      if (displayedParcels.length === 0) return;

      const groupBounds = L.latLngBounds([]);

      displayedParcels.forEach((parcel) => {
        const colors = STATUS_COLOR_MAP[parcel.status] || STATUS_COLOR_MAP.PROPOSED;

        const polygon = L.polygon(parcel.coordinates, {
          color: colors.stroke,
          fillColor: colors.fill,
          fillOpacity: 0.55,
          weight: 2.5,
        });

        polygon.bindTooltip(
          `<strong>Khasra: ${parcel.khasraNumber}</strong><br/>Owner: ${parcel.ownerName}<br/>Area: ${parcel.areaHectares} Ha`,
          { sticky: true, className: 'text-xs p-1 font-sans' }
        );

        polygon.on('click', () => {
          setSelectedParcel(parcel);
          map.panTo(parcel.centroid);
        });

        polygon.addTo(map);
        polygonLayersRef.current.push(polygon);

        // Add bounds
        parcel.coordinates.forEach(([lat, lng]) => groupBounds.extend([lat, lng]));
      });

      if (groupBounds.isValid()) {
        map.fitBounds(groupBounds, { padding: [40, 40], maxZoom: 16 });
      }
    }

    drawParcels();
  }, [displayedParcels, selectedProjectId]);

  const copyWktToClipboard = () => {
    if (selectedParcel?.postgisWkt) {
      navigator.clipboard.writeText(selectedParcel.postgisWkt);
      setCopiedWkt(true);
      setTimeout(() => setCopiedWkt(false), 2000);
    }
  };

  const runSpatialQuerySimulation = () => {
    if (!selectedParcel) return;
    const sql = `
-- PostGIS Geodetic Spatial Query
SELECT 
  khasra_number, 
  village,
  ROUND((ST_Area(geom::geography) / 10000.0)::numeric, 4) AS calc_ha,
  ST_AsText(ST_Centroid(geom)) AS centroid_wkt,
  ST_GeometryType(geom) AS geom_type
FROM land_parcels 
WHERE khasra_number = '${selectedParcel.khasraNumber}';

-- Result:
[OK] Row 1: khasra_number='${selectedParcel.khasraNumber}', village='${selectedParcel.village}', calc_ha=${selectedParcel.areaHectares}, centroid_wkt='POINT(${selectedParcel.centroid[1]} ${selectedParcel.centroid[0]})', geom_type='ST_Polygon'
`;
    setSimulatedSqlResult(sql);
  };

  // Toggles an external GIS overlay (Bhuvan ISRO WMS, or a self-hosted
  // QGIS Server / GeoServer WMS) on or off, adding/removing it from the
  // live Leaflet map instance.
  const toggleExternalOverlay = async (provider: WmsProviderConfig) => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    const isActive = !!activeOverlays[provider.id];

    if (isActive) {
      const layer = overlayLayersRef.current[provider.id];
      if (layer) {
        map.removeLayer(layer);
        delete overlayLayersRef.current[provider.id];
      }
      setActiveOverlays((prev) => ({ ...prev, [provider.id]: false }));
      return;
    }

    try {
      setOverlayError(null);
      const L = (await import('leaflet')).default;
      const wmsLayer = createWmsLayer(L, provider);
      wmsLayer.on('tileerror', () => {
        setOverlayError(
          `${provider.label}: the WMS endpoint did not return tiles. Check the URL/layer name in gis-providers.ts, or that it requires an API key.`
        );
      });
      wmsLayer.addTo(map);
      overlayLayersRef.current[provider.id] = wmsLayer;
      setActiveOverlays((prev) => ({ ...prev, [provider.id]: true }));
    } catch (err) {
      setOverlayError(`${provider.label}: failed to load (${(err as Error).message}).`);
    }
  };

  const exportCadastralGeoJSON = () => {
    const geojson = {
      type: 'FeatureCollection',
      features: displayedParcels.map((p) => ({
        type: 'Feature',
        properties: {
          khasraNumber: p.khasraNumber,
          surveyNumber: p.surveyNumber,
          village: p.village,
          taluk: p.taluk,
          district: p.district,
          state: p.state,
          areaHectares: p.areaHectares,
          ownerName: p.ownerName,
          status: p.status,
          totalCompensation: p.totalCompensationAmount,
        },
        geometry: {
          type: 'Polygon',
          coordinates: [p.coordinates.map(([lat, lng]) => [lng, lat])],
        },
      })),
    };

    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cadastral_parcels_${selectedProjectId || 'all'}.geojson`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Control & Filter Ribbon */}
      <div className="bg-white p-3.5 rounded-xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Project Selector & Status Filter */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-2.5 py-1.5 border border-slate-200">
            <span className="text-xs font-semibold text-slate-700">Project:</span>
            <select
              value={selectedProjectId || ''}
              onChange={(e) => onSelectProject(e.target.value)}
              className="bg-transparent text-xs font-bold text-gov-navy focus:outline-none cursor-pointer"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.code} - {p.title.slice(0, 32)}...
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-2.5 py-1.5 border border-slate-200">
            <span className="text-xs font-semibold text-slate-700">Parcel Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Statuses ({parcels.length})</option>
              {Object.keys(STATUS_COLOR_MAP).map((st) => (
                <option key={st} value={st}>
                  {STATUS_COLOR_MAP[st as ParcelStatus].label}
                </option>
              ))}
            </select>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search Khasra / Owner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-navy w-44"
            />
          </div>
        </div>

        {/* Right: Map Layers & Export */}
        <div className="flex items-center gap-2">
          {/* Base Layer Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setBaseMapType('osm')}
              className={`px-2 py-1 rounded font-medium transition ${baseMapType === 'osm' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
            >
              Cadastral Map
            </button>
            <button
              onClick={() => setBaseMapType('satellite')}
              className={`px-2 py-1 rounded font-medium transition ${baseMapType === 'satellite' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
            >
              Satellite
            </button>
            <button
              onClick={() => setBaseMapType('carto')}
              className={`px-2 py-1 rounded font-medium transition ${baseMapType === 'carto' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
            >
              Minimal
            </button>
          </div>

          {/* External GIS Layers: ISRO Bhuvan WMS + self-hosted QGIS Server / GeoServer WMS */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs gap-0.5">
            {EXTERNAL_GIS_PROVIDERS.map((provider) => (
              <button
                key={provider.id}
                onClick={() => toggleExternalOverlay(provider)}
                title={provider.description}
                className={`px-2 py-1 rounded font-medium transition ${activeOverlays[provider.id] ? 'bg-gov-navy text-white shadow-xs' : 'text-slate-600'}`}
              >
                {provider.label}
              </button>
            ))}
          </div>

          <button
            onClick={exportCadastralGeoJSON}
            className="flex items-center gap-1 bg-gov-navy hover:bg-gov-blue text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
            title="Download GeoJSON for QGIS / ArcGIS"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export GeoJSON</span>
          </button>
        </div>
      </div>

      {overlayError && (
        <div className="bg-amber-50 border border-amber-300 text-amber-800 text-xs px-3 py-2 rounded-lg">
          {overlayError}
        </div>
      )}

      {/* Main GIS Layout: Map + Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Map Container */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[580px]">
          {/* Map Top Status Bar */}
          <div className="bg-slate-900 text-white px-3.5 py-2 text-xs flex justify-between items-center border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gov-gold" />
              <span className="font-bold">PostGIS Geo-Referenced Cadastral Layer</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-300 text-[11px]">SRID: 4326 (WGS 84 Ellipsoid)</span>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{displayedParcels.length} Polygons Rendered</span>
            </div>
          </div>

          {/* Map View */}
          <div className="relative flex-1">
            <div ref={mapContainerRef} className="w-full h-full" />

            {/* Map Legend Floating Widget */}
            <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-xs p-3 rounded-lg shadow-md border border-slate-200 text-[11px] max-w-xs space-y-1.5 pointer-events-auto">
              <div className="font-bold text-slate-800 border-b pb-1 flex items-center justify-between">
                <span>Cadastral Status Legend</span>
                <span className="text-[9px] text-slate-400">RFCTLARR</span>
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                {Object.entries(STATUS_COLOR_MAP).map(([statusKey, val]) => (
                  <div key={statusKey} className="flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-xs shrink-0 border"
                      style={{ backgroundColor: val.fill, borderColor: val.stroke }}
                    />
                    <span className="text-[10px] text-slate-700 truncate">{val.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cadastral Parcel Inspector Drawer */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col h-[580px] overflow-y-auto">
          {selectedParcel ? (
            <div className="space-y-4">
              {/* Header */}
              <div className="border-b border-slate-200 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gov-blue uppercase tracking-wider">
                    Cadastral Record Inspector
                  </span>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${STATUS_COLOR_MAP[selectedParcel.status].fill}20`,
                      color: STATUS_COLOR_MAP[selectedParcel.status].stroke,
                    }}
                  >
                    {STATUS_COLOR_MAP[selectedParcel.status].label}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Khasra No. {selectedParcel.khasraNumber}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedParcel.village}, {selectedParcel.taluk}, {selectedParcel.district}, {selectedParcel.state}
                </p>
              </div>

              {/* Geo-tagged photo if possession taken */}
              {selectedParcel.fieldPhotoUrl && (
                <div className="relative rounded-lg overflow-hidden border border-slate-200">
                  <img
                    src={selectedParcel.fieldPhotoUrl}
                    alt="Geo-tagged Field Survey"
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-white p-1 text-[10px] flex items-center justify-between px-2">
                    <span className="flex items-center gap-1">
                      <Camera className="w-3 h-3 text-gov-gold" />
                      Geo-tagged Field Panchnama
                    </span>
                    <span>{selectedParcel.possessionDate}</span>
                  </div>
                </div>
              )}

              {/* Key Attributes */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">Surveyed Area</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {selectedParcel.areaHectares} Ha ({selectedParcel.areaAcres} Acres)
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">Land Classification</span>
                  <span className="font-bold text-slate-900 text-xs">
                    {selectedParcel.landType.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Landowner & KYC */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1.5">
                <div className="font-bold text-slate-800 flex items-center justify-between">
                  <span>Landowner (Khatedar)</span>
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5">
                    <CheckCircle className="w-3 h-3" /> Aadhaar Verified
                  </span>
                </div>
                <p className="font-bold text-slate-900">{selectedParcel.ownerName}</p>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Aadhaar Masked:</span>
                    <span>{selectedParcel.aadhaarMasked}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Bank / IFSC:</span>
                    <span>{selectedParcel.ifscCode} ({selectedParcel.bankAccountMasked})</span>
                  </div>
                </div>
              </div>

              {/* Compensation Breakdown under RFCTLARR 2013 */}
              <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-emerald-950">
                  <span className="flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5 text-emerald-700" />
                    Statutory Award Valuation
                  </span>
                  <span className="text-sm font-black text-emerald-800">
                    {formatIndianCurrency(selectedParcel.totalCompensationAmount)}
                  </span>
                </div>

                <div className="space-y-1 text-[11px] text-slate-600 pt-1 border-t border-emerald-200">
                  <div className="flex justify-between">
                    <span>Base Value (Circle Rate):</span>
                    <span>₹ {(selectedParcel.areaHectares * selectedParcel.baseCircleRatePerHa).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rural Multiplier:</span>
                    <span>{selectedParcel.ruralMultiplier}x</span>
                  </div>
                  <div className="flex justify-between font-semibold text-emerald-900">
                    <span>Solatium (100% Sec 30):</span>
                    <span>+ ₹ {selectedParcel.solatiumAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>12% AMV Interest:</span>
                    <span>+ ₹ {selectedParcel.additionalMarketValue.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trees / Standing Assets:</span>
                    <span>+ ₹ {selectedParcel.assetsValue.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {selectedParcel.pfmsUtrNumber && (
                  <div className="mt-2 bg-white p-1.5 rounded border border-emerald-300 text-[10px] text-emerald-800 font-mono flex items-center justify-between">
                    <span>PFMS UTR: {selectedParcel.pfmsUtrNumber}</span>
                    <span className="font-bold text-emerald-700">PAID</span>
                  </div>
                )}
              </div>

              {/* PostGIS WKT Geometry with Quick Copy */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1">
                    <Database className="w-3.5 h-3.5 text-gov-blue" />
                    PostGIS WKT Geometry
                  </span>
                  <button
                    onClick={copyWktToClipboard}
                    className="flex items-center gap-1 text-[11px] text-gov-blue hover:text-gov-navy font-semibold"
                  >
                    {copiedWkt ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedWkt ? 'Copied WKT' : 'Copy WKT'}</span>
                  </button>
                </div>
                <pre className="bg-slate-900 text-slate-200 text-[10px] font-mono p-2 rounded-lg overflow-x-auto max-h-16">
                  {selectedParcel.postgisWkt}
                </pre>
              </div>

              {/* PostGIS Spatial SQL simulation */}
              <div>
                <button
                  onClick={runSpatialQuerySimulation}
                  className="w-full py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition"
                >
                  <Database className="w-3.5 h-3.5 text-gov-gold" />
                  <span>Execute PostGIS Geodetic Spatial Test</span>
                </button>
                {simulatedSqlResult && (
                  <pre className="mt-2 bg-slate-950 text-emerald-400 text-[10px] font-mono p-2.5 rounded-lg overflow-x-auto max-h-24">
                    {simulatedSqlResult}
                  </pre>
                )}
              </div>

              {/* Status Action Button for CALA / Authorized Role */}
              {currentRole === 'DISTRICT_COLLECTOR_CALA' && selectedParcel.status !== 'POSSESSION_TAKEN' && (
                <div className="pt-2 border-t border-slate-200">
                  <button
                    onClick={() => onUpdateParcelStatus(selectedParcel.id, 'POSSESSION_TAKEN')}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Execute Physical Possession Memo (Sec 38)</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <MapPin className="w-12 h-12 text-slate-300 mb-3" />
              <h4 className="text-sm font-bold text-slate-700">No Parcel Selected</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Click on any cadastral polygon boundary on the map or search by Khasra number to inspect legal titles, PostGIS WKT, and compensation records.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
