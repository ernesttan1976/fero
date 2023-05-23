import { NextResponse } from "next/server";
import seedQuestions from "@/app/lib/seedQuestions";
export async function GET() {
  await seedQuestions();
  return NextResponse.json({ message: "Seed Questions Successful" });
}

