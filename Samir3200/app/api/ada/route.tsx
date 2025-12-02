import { adaProjects } from "@/app/lib/schemas";
import { data } from "@/app/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const bdd = await data.select().from(adaProjects);
        return NextResponse.json(bdd);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body.title?.trim()) {
            return NextResponse.json({ error: "Le champ 'title' est requis" }, { status: 400 });
        }
        const inserted = await data.insert(adaProjects).values({
            title: body.title
        }).returning();
        return NextResponse.json(inserted[0]);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
