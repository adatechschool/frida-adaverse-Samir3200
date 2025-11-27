import { NextRequest, NextResponse } from 'next/server';
import { Ada } from '@/app/lib/schemas';
import { data } from '@/app/lib/drizzle';
import { eq } from 'drizzle-orm';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
	const result = await data.select().from(Ada).where(eq(Ada.id, Number(id)));
	return NextResponse.json(result[0]);
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
	const body = await request.json();
	return NextResponse.json({ id, body });
}
