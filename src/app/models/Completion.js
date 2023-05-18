const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./User');
const Course = require('./Course');

const completionsSchema = new mongoose.Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
      course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
      lesson_ids: [],
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("Completion", completionsSchema)