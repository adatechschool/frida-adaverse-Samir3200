
import { studentProject, Promo, Ada } from "@/app/lib/schemas";
import { eq } from "drizzle-orm";
import { data } from "@/app/lib/drizzle";
import { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export const GET = async () => {
    const bdd = await data
      .select({
        id: studentProject.id,
        image: studentProject.image,
        DemoLink: studentProject.DemoLink,
        GithubLink: studentProject.GithubLink,
        PublicDate: studentProject.PublicDate,
        Promo_id: studentProject.Promo_id,
        Ada_id: studentProject.Ada_id,
        namePromo: Promo.nomPromo,
      })
      .from(studentProject)
      .leftJoin(Promo, eq(studentProject.Promo_id, Promo.id))
      .leftJoin(Ada, eq(studentProject.Ada_id, Ada.id));
    return NextResponse.json(bdd);
 
};