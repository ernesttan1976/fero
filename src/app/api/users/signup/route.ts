import { NextResponse } from "next/server";

type SignupFormData = {
    name?: string,
    email?: string,
    password?: string,
}

export async function POST(request: Request) {
    const data: SignupFormData = await request.json();
    //req.json, not req.body

    const {name, email, password} = data;
    //signup(data);


    return NextResponse.json({"message": "Signup Successful"});
    
}

