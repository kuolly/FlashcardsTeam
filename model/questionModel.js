const { Schema, model } = require("mongoose");

const QuestionSchema = new Schema({
  question: String,
  answer: String,
  count: Number
});

const questionModel1 = model("Question", QuestionSchema);
const questionModel2 = model("Question", QuestionSchema);
const questionModel3 = model("Question", QuestionSchema);

module.exports = {questionModel1, questionModel2, questionModel3};
