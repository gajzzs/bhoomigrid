import { NextResponse } from 'next/server';
import { offlineDb } from '@/lib/db';

export async function GET() {
  const sqlDump = offlineDb.exportToPostgreSQLDump();

  return new NextResponse(sqlDump, {
    status: 200,
    headers: {
      'Content-Type': 'application/sql',
      'Content-Disposition': 'attachment; filename="nlams_postgis_dump.sql"',
    },
  });
}
