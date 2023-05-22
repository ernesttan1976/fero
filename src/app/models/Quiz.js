const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  topic: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: Object, required: true },
  correctAns: { type: String, required: true },
  explanation: { type: String, required: true },
});

const Quiz = mongoose.models["Quiz"] || mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
