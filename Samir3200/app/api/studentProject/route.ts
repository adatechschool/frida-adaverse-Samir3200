import { NextRequest } from "next/server";
import { data } from "@/app/lib/drizzle";
import { studentProjects } from "@/app/lib/schemas";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        if (!body.name || !body.githubUrl || !body.promoId || !body.adaProjectId) {
            return new Response(JSON.stringify({ error: "Champs obligatoires manquants (name, githubUrl, promoId, adaProjectId)." }), { status: 400 });
        }
        const inserted = await data.insert(studentProjects).values({
            name: body.name,
            slug: body.slug || null,
            githubUrl: body.githubUrl,
            demoUrl: body.demoUrl || null,
            createdAt: body.createdAt || new Date().toISOString().slice(0, 10),
            publishedAt: body.publishedAt || null,
            promoId: Number(body.promoId) || null,
            adaProjectId: Number(body.adaProjectId) || null,
        });
        return new Response(JSON.stringify({ success: true, inserted }), { status: 201 });
    } catch (e) {
        console.error('Erreur lors de l\'insertion studentProject:', e);
        return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
    }
}

export async function GET() {
    try {
        const projects = await data.select().from(studentProjects);
        return new Response(JSON.stringify(projects), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
    }
}
