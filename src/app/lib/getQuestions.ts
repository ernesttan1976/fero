import Quiz from "../models/Quiz";
import connect from "../config/database";

export default async function getQuestions() {
  try {
    await connect();
    const allQuiz = await Quiz.find();
    return allQuiz;
  } catch (err) {
    console.error("Failed to seed quiz questions:", err);
    throw err;
  }
}
