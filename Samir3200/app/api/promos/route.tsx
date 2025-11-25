
import { Promo } from "@/app/lib/schemas";
import { data } from "@/app/lib/drizzle";
import { NextRequest } from "next/server";

export const GET = async () => {
  const bdd = await data.select().from(Promo);
  return Response.json(bdd);
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const postData = await data.insert(Promo).values({
    nomPromo: body.nomPromo,
    dateStart: body.dateStart
  });
  return Response.json(postData);
};

