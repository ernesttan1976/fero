import { userAgent } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import Quiz from "../models/Quiz";

export default async function seedQuestions() {
  try {
    const questions = [
      {
        topic: " Compounding Returns",
        question: "What is compounding returns?",
        options: {
          option1: "Generating consistent income from investments",
          option2:
            "Earning returns on the initial investment and accumulated earnings over time",
          option3: "Investing in high-risk assets for quick gains",
          option4: "Reinvesting dividends to maximize investment growth",
        },
        correctAns: "option2",
        explanation:
          "Compounding returns refer to the process of generating earnings on both the original investment and the accumulated returns from previous periods. In simple terms, it is the reinvestment of earnings to earn further returns. This compounding effect leads to exponential growth as the investment accumulates more value over time. The longer the investment horizon, the greater the potential for compounding returns to create substantial wealth.",
      },
      {
        topic: " Compounding Returns",
        question: "Which factor is crucial for maximizing compounding returns?",
        options: {
          option1: " High-risk investments",
          option2: " Short investment horizon",
          option3: "Time",
          option4: "Frequent trading",
        },
        correctAns: "option3",
        explanation:
          "Time is a crucial factor when it comes to compounding returns. The longer the investment remains untouched, the more time it has to grow and benefit from compounding. Even seemingly small returns can become significant over extended periods due to the compounding effect. This highlights the importance of starting early and allowing investments to compound over a long-term horizon.",
      },
    ];
    console.log(questions);
    if (Array.isArray(questions) && questions.length > 0) {
      const newQuestions = await Quiz.insertMany(questions);
      console.log("Quiz questions seeded successfully!");
      return newQuestions;
    }
  } catch (error) {
    console.error("Failed to seed quiz questions:", error);
    throw error;
  }
}
