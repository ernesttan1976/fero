import { NextResponse } from "next/server";

export async function GET(request: Request){
    const {searchParams} = new URL(request.url);
    
    const obj = Object.fromEntries(searchParams.entries());

    return NextResponse.json(obj);
}