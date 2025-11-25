
import { studentProject } from "@/app/lib/schemas";
import { data } from "@/app/lib/drizzle";
import { NextRequest } from "next/server";

export const GET = async () => {
  const bdd = await data.select().from(studentProject);
  return Response.json(bdd);
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const postData = await data.insert(studentProject).values({
    title: body.title,
    image: body.image,
    PersonnalLink: body.PersonnalLink,
    DemoLink: body.DemoLink,
    DateCreat: body.DateCreat,
    PublicDate: body.PublicDate,
    Frida_id: body.Frida_id,
    Promo_id: body.Promo_id
  });
  return Response.json(postData);
};
