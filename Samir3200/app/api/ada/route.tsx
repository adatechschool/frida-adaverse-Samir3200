

import { Ada } from "@/app/lib/schemas";
import { data } from "@/app/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";


export const GET = async () => {
    const bdd = await data.select().from(Ada);
    return NextResponse.json(bdd);
};


export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const postData = await data.insert(Ada).values({
		studentProjectName: body.studentProjectName,
        dateCreat: body.dateCreat,
    });
    return NextResponse.json(postData);
};
