import { NextResponse } from "next/server";
import seedUsers from "@/app/lib/seedUsers";
//SEED
export async function GET() {
  seedUsers();
  return NextResponse.json({ message: "Seed Users Successful" });
}

//api/users/seed