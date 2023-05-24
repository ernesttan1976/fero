import signinUser from "@/app/lib/signinUser";
import { NextResponse } from "next/server";
import { IUser } from "../../../../../models";

export async function POST(request: Request) {
    const data = await request.json();
    //req.json, not req.body

    const response = await signinUser(data);
    console.log(response);
    if (!response) return NextResponse.json({"message": "Error: sign in failed"});
    
    return NextResponse.json(response);
    
}

