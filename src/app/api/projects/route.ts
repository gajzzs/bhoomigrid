import { NextResponse } from 'next/server';
import { offlineDb } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const project = offlineDb.getProjectById(id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ data: project });
  }

  const projects = offlineDb.getProjects();
  return NextResponse.json({ data: projects, count: projects.length });
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, stage, officerName } = body;

    if (!id || !stage) {
      return NextResponse.json({ error: 'Project ID and stage are required' }, { status: 400 });
    }

    const updated = offlineDb.updateProjectStage(id, stage, officerName);
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}
