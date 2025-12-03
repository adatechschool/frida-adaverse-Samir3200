
import { studentProjects, promos, adaProjects } from "@/app/lib/schemas";
import { eq } from "drizzle-orm";
import { data } from "@/app/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const bdd = await data
    .select({
      id: studentProjects.id,
      name: studentProjects.name,
      githubUrl: studentProjects.githubUrl,
      demoUrl: studentProjects.demoUrl,
      createdAt: studentProjects.createdAt,
      publishedAt: studentProjects.publishedAt,
      slug: studentProjects.slug,
      promoId: studentProjects.promoId,
      adaProjectId: studentProjects.adaProjectId,
    })
    .from(studentProjects)
    .leftJoin(promos, eq(studentProjects.promoId, promos.id))
    .leftJoin(adaProjects, eq(studentProjects.adaProjectId, adaProjects.id));
  return NextResponse.json(bdd);
};