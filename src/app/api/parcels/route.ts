import { NextResponse } from 'next/server';
import { offlineDb } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId');
  const khasra = searchParams.get('khasra');

  let parcels = offlineDb.getParcels(projectId || undefined);

  if (khasra) {
    parcels = parcels.filter((p) =>
      p.khasraNumber.toLowerCase().includes(khasra.toLowerCase())
    );
  }

  // Generate GeoJSON FeatureCollection format for GIS tools
  const geojson = {
    type: 'FeatureCollection',
    features: parcels.map((p) => ({
      type: 'Feature',
      id: p.id,
      properties: {
        id: p.id,
        projectId: p.projectId,
        khasraNumber: p.khasraNumber,
        surveyNumber: p.surveyNumber,
        village: p.village,
        taluk: p.taluk,
        district: p.district,
        state: p.state,
        areaHectares: p.areaHectares,
        areaAcres: p.areaAcres,
        landType: p.landType,
        ownerName: p.ownerName,
        totalCompensationAmount: p.totalCompensationAmount,
        compensationStatus: p.compensationStatus,
        possessionStatus: p.possessionStatus,
        status: p.status,
        postgisWkt: p.postgisWkt,
      },
      geometry: {
        type: 'Polygon',
        // In GeoJSON standard: [lng, lat]
        coordinates: [p.coordinates.map(([lat, lng]) => [lng, lat])],
      },
    })),
  };

  return NextResponse.json({
    data: parcels,
    geojson,
    count: parcels.length,
  });
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, possessionDate } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Parcel ID and status are required' }, { status: 400 });
    }

    const updated = offlineDb.updateParcelStatus(id, status, possessionDate);
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ error: 'Failed to update parcel' }, { status: 500 });
  }
}
