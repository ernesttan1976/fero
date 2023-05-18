import { NextResponse } from "next/server";
//SEED
export async function GET() {
    return NextResponse.json({"message":'Hello, Next.js!'});
}
