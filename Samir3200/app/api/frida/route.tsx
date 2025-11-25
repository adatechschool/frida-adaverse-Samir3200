import { Frida } from "@/app/lib/schemas";
import { data } from "@/app/lib/drizzle";
import { NextRequest } from "next/server";


export const GET = async () => {
  const bdd = await data.select().from(Frida); 
  return Response.json(bdd);
};


export const POST = async (req: NextRequest) => {
  const body = await req.json(); 
  const postData = await data.insert(Frida).values({
    nomProjet: body.name,       
  });

 return Response.json(postData);
};

