import { NextRequest, NextResponse } from 'next/server';
import { studentProjects } from '@/app/lib/schemas';
import { data } from '@/app/lib/drizzle';
import { eq } from 'drizzle-orm';

export async function GET(_req: NextRequest, context: any) {
  const { id } = context.params;
  const result = await data.select().from(studentProjects).where(eq(studentProjects.id, Number(id)));
  return NextResponse.json(result[0]);
}

export async function POST(request: NextRequest, context: any) {
  const { id } = context.params;
  const body = await request.json();
  return NextResponse.json({ id, body });
}
