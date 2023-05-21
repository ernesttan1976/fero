const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  question: { type: String, required: true },
  options: { type: Object, required: true },
  correctAns: { type: String, required: true },
  explanation: { type: String, required: true },
});

module.exports = mongoose.model("Quiz", quizSchema);
