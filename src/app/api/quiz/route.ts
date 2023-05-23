import getQuestions from "@/app/lib/getQuestions";
import { NextResponse } from "next/server";

export async function GET() {
  const questions = await getQuestions();
  return NextResponse.json({ questions });
}
