const { Schema, model } = require("mongoose");

const QuestionSchema = new Schema({
  question: String,
  answer: String,
});

const questionModel = model("Question", QuestionSchema);

module.exports = questionModel;
