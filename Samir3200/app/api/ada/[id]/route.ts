import { adaProjects } from "@/app/lib/schemas";
import { data } from "@/app/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";	

// GET /api/ada/[id]
export async function GET(
	req: NextRequest,
	context: any
) {
	try {
		const id = Number(context.params.id);
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