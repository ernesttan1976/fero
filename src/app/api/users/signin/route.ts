import signupUser from "@/app/lib/signupUser";
import { NextResponse } from "next/server";
import { IUser } from "../../../../../models";

export async function POST(request: Request) {
    const data: IUser = await request.json();
    //req.json, not req.body

    const response = await signupUser(data);
    if (!response) return NextResponse.json({"message": "Error: sign up failed"});
    return NextResponse.json({"message": "Signup Successful"});
    
}

