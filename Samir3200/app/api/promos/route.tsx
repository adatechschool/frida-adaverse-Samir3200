import { promos } from "@/app/lib/schemas";
import { data } from "@/app/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const bdd = await data.select().from(promos);
        return NextResponse.json(bdd);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body.name?.trim() || !body.dateStart?.trim()) {
            return NextResponse.json({ error: "Champs 'name' et 'dateStart' requis" }, { status: 400 });
        }
        const inserted = await data.insert(promos).values({
            name: body.name,
            dateStart: body.dateStart
        }).returning();
        return NextResponse.json(inserted[0]);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}