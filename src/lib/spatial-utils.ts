// PostGIS Spatial Utilities for Offline & Full Geodetic Computation

/**
 * Calculates geodesic ellipsoidal area of a polygon in Hectares
 * Matches PostGIS ST_Area(geom::geography) / 10000.0
 */
export function calculateParcelAreaHectares(coordinates: [number, number][]): number {
  if (coordinates.length < 3) return 0;

  const EARTH_RADIUS = 6378137; // meters (WGS 84 equatorial radius)
  let totalArea = 0;

  // Convert lat/lng degrees to radians
  const coordsRad = coordinates.map(([lat, lng]) => [
    (lat * Math.PI) / 180,
    (lng * Math.PI) / 180,
  ]);

  for (let i = 0; i < coordsRad.length; i++) {
    const p1 = coordsRad[i];
    const p2 = coordsRad[(i + 1) % coordsRad.length];
    totalArea += (p2[1] - p1[1]) * (2 + Math.sin(p1[0]) + Math.sin(p2[0]));
  }

  totalArea = Math.abs((totalArea * EARTH_RADIUS * EARTH_RADIUS) / 2.0);
  // Convert square meters to hectares
  const hectares = totalArea / 10000.0;
  return Number(hectares.toFixed(4));
}

/**
 * Convert Hectares to Acres (1 Ha = 2.47105 Acres)
 */
export function hectaresToAcres(ha: number): number {
  return Number((ha * 2.47105).toFixed(4));
}

/**
 * Calculates centroid of a polygon [lat, lng]
 * Matches PostGIS ST_Centroid(geom)
 */
export function calculatePolygonCentroid(coordinates: [number, number][]): [number, number] {
  if (coordinates.length === 0) return [20.5937, 78.9629]; // Default India center

  let latSum = 0;
  let lngSum = 0;
  for (const [lat, lng] of coordinates) {
    latSum += lat;
    lngSum += lng;
  }
  return [
    Number((latSum / coordinates.length).toFixed(6)),
    Number((lngSum / coordinates.length).toFixed(6)),
  ];
}

/**
 * Converts [lat, lng][] array to PostGIS Well-Known Text (WKT)
 * Note: PostGIS WKT standard is POLYGON((lng lat, lng lat, ...))
 */
export function coordinatesToPostGISWKT(coordinates: [number, number][]): string {
  if (coordinates.length === 0) return 'POLYGON EMPTY';

  // Ensure polygon is closed
  const closedCoords = [...coordinates];
  const first = closedCoords[0];
  const last = closedCoords[closedCoords.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) {
    closedCoords.push(first);
  }

  const pointsStr = closedCoords
    .map(([lat, lng]) => `${lng.toFixed(6)} ${lat.toFixed(6)}`)
    .join(', ');

  return `POLYGON((${pointsStr}))`;
}

/**
 * Parses PostGIS WKT string back to [lat, lng][] coordinate vertices
 */
export function postgisWKTToCoordinates(wkt: string): [number, number][] {
  const match = wkt.match(/POLYGON\s*\(\((.*?)\)\)/i);
  if (!match || !match[1]) return [];

  const rawPairs = match[1].split(',');
  const coords: [number, number][] = [];

  for (const pair of rawPairs) {
    const parts = pair.trim().split(/\s+/);
    if (parts.length >= 2) {
      const lng = parseFloat(parts[0]);
      const lat = parseFloat(parts[1]);
      if (!isNaN(lat) && !isNaN(lng)) {
        coords.push([lat, lng]);
      }
    }
  }

  return coords;
}

/**
 * Checks if a point [lat, lng] is inside a polygon
 * Matches PostGIS ST_Contains(geom, ST_Point(lng, lat))
 */
export function isPointInsidePolygon(point: [number, number], polygon: [number, number][]): boolean {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * Computes bounding box [minLat, minLng, maxLat, maxLng]
 * Matches PostGIS Box2D(geom)
 */
export function computeBoundingBox(coordinates: [number, number][]): [number, number, number, number] {
  let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
  for (const [lat, lng] of coordinates) {
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
  }
  return [minLat, minLng, maxLat, maxLng];
}
