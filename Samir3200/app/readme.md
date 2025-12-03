ADA


import { adaProjects } from "@/app/lib/schemas";
import { data } from "@/app/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

// GET /api/ada/[id]
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = Number(params.id);
		if (isNaN(id)) {
			return NextResponse.json({ error: "Invalid id" }, { status: 400 });
		}
		const project = await data
			.select()
			.from(adaProjects)
			.where(eq(adaProjects.id, id));
		if (!project || project.length === 0) {
			return NextResponse.json({ error: "Not found" }, { status: 404 });
		}
		return NextResponse.json(project[0]);
	} catch (error) {
		return NextResponse.json({ error: (error as Error).message }, { status: 500 });
	}
}



PROMO

import { promos } from "@/app/lib/schemas";
import { data } from "@/app/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

// GET /api/promos/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }
    const promo = await data
      .select()
      .from(promos)
      .where(eq(promos.id, id));
    if (!promo || promo.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(promo[0]);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}


STUDENT PROJECTS

import { NextRequest, NextResponse } from 'next/server';
import { studentProjects } from '@/app/lib/schemas';
import { data } from '@/app/lib/drizzle';
import { eq } from 'drizzle-orm';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const result = await data.select().from(studentProjects).where(eq(studentProjects.id, Number(id)));
  return NextResponse.json(result[0]);
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();
  return NextResponse.json({ id, body });
}
