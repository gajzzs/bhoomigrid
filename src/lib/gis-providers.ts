// External GIS layer providers for the National Land Acquisition & Management System.
//
// This wires the "correct" GIS integration flow:
//   1. ISRO Bhuvan (NRSC) — national satellite/thematic WMS layers, consumed directly.
//   2. QGIS Server / GeoServer — your own state cadastral layers, prepared/digitized
//      in QGIS Desktop, then published as WMS/WFS by QGIS Server or GeoServer, and
//      consumed here exactly like Bhuvan. QGIS itself is never called from the browser;
//      it is the desktop authoring tool that produces what these servers publish.
//
// All of these render as overlay layers on top of the existing base map and the
// app's own PostGIS-backed parcel polygons in GISParcelMap.tsx.

export interface WmsProviderConfig {
  id: string;
  label: string;
  description: string;
  wmsUrl: string;
  layers: string;
  attribution: string;
  format?: string;
  transparent?: boolean;
  requiresKey?: boolean;
}

// ISRO Bhuvan (NRSC) WMS endpoints. Public thematic layers are served from the
// Bhuvan Gateway; some layers / higher-resolution products require a free
// Bhuvan account + API key. Register at https://bhuvan.nrsc.gov.in
// Override the endpoint via NEXT_PUBLIC_BHUVAN_WMS_URL once you have your own key.
export const BHUVAN_LULC: WmsProviderConfig = {
  id: 'bhuvan-lulc',
  label: 'Bhuvan LULC (ISRO)',
  description: 'Land Use / Land Cover thematic layer from ISRO Bhuvan (NRSC)',
  wmsUrl: process.env.NEXT_PUBLIC_BHUVAN_WMS_URL || 'https://bhuvan-vec1.nrsc.gov.in/bhuvan/wms',
  layers: 'lulc250k:lulc250k',
  attribution: 'ISRO Bhuvan (NRSC)',
  format: 'image/png',
  transparent: true,
  requiresKey: true,
};

export const BHUVAN_ADMIN_BOUNDARY: WmsProviderConfig = {
  id: 'bhuvan-admin',
  label: 'Bhuvan admin boundaries (ISRO)',
  description: 'State / district / village administrative boundary layer',
  wmsUrl: process.env.NEXT_PUBLIC_BHUVAN_WMS_URL || 'https://bhuvan-vec1.nrsc.gov.in/bhuvan/wms',
  layers: 'india3:admin3',
  attribution: 'ISRO Bhuvan (NRSC)',
  format: 'image/png',
  transparent: true,
  requiresKey: true,
};

// Any self-hosted QGIS Server or GeoServer instance publishing the state's own
// cadastral / DILRMP layers as WMS. Point this at your own deployment via
// NEXT_PUBLIC_QGIS_SERVER_WMS_URL and NEXT_PUBLIC_QGIS_SERVER_LAYER.
export const QGIS_SERVER_CADASTRAL: WmsProviderConfig = {
  id: 'qgis-server-cadastral',
  label: 'QGIS Server cadastral overlay',
  description: 'Self-hosted QGIS Server / GeoServer WMS, e.g. state DILRMP cadastral layer',
  wmsUrl: process.env.NEXT_PUBLIC_QGIS_SERVER_WMS_URL || 'http://localhost:8080/qgisserver/cadastral',
  layers: process.env.NEXT_PUBLIC_QGIS_SERVER_LAYER || 'cadastral_parcels',
  attribution: 'QGIS Server / State DILRMP cell',
  format: 'image/png',
  transparent: true,
  requiresKey: false,
};

export const EXTERNAL_GIS_PROVIDERS: WmsProviderConfig[] = [
  BHUVAN_LULC,
  BHUVAN_ADMIN_BOUNDARY,
  QGIS_SERVER_CADASTRAL,
];

/**
 * Creates a Leaflet WMS tile layer from a provider config.
 * Pass the already-imported Leaflet module (`const L = (await import('leaflet')).default`)
 * since Leaflet must stay a client-only dynamic import in Next.js.
 */
export function createWmsLayer(L: any, provider: WmsProviderConfig) {
  return L.tileLayer.wms(provider.wmsUrl, {
    layers: provider.layers,
    format: provider.format || 'image/png',
    transparent: provider.transparent ?? true,
    attribution: provider.attribution,
    version: '1.1.1',
  });
}

/**
 * Fetches vector features (GeoJSON) from a WFS endpoint instead of raster WMS tiles.
 * Useful for pulling actual parcel geometries out of QGIS Server / GeoServer
 * (e.g. to cross-check against this app's own PostGIS parcels) rather than
 * just displaying a picture of them.
 */
export async function fetchWfsGeoJSON(wfsBaseUrl: string, typeName: string, bboxFilter?: string) {
  const params = new URLSearchParams({
    service: 'WFS',
    version: '2.0.0',
    request: 'GetFeature',
    typeName,
    outputFormat: 'application/json',
  });
  if (bboxFilter) params.set('bbox', bboxFilter);

  const res = await fetch(`${wfsBaseUrl}?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`WFS request failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
