import { NextResponse } from 'next/server';
import { offlineDb } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { parcelId, officerName = 'Competent Authority for Land Acquisition (CALA)' } = body;

    if (!parcelId) {
      return NextResponse.json({ error: 'Parcel ID is required' }, { status: 400 });
    }

    const result = offlineDb.executeDBTTransfer(parcelId, officerName);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Direct Benefit Transfer (DBT) successfully settled via PFMS Gateway.',
      transaction: result.transaction,
    });
  } catch {
    return NextResponse.json({ error: 'DBT Processing Error' }, { status: 500 });
  }
}
