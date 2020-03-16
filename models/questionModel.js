const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  wrongAnswerOne: {
    type: String,
    required: true
  },
  wrongAnswerTwo: {
    type: String,
    required: true
  },
  wrongAnswerThree: {
    type: String,
    required: true
  },
  submittedBy: {
    name: {
      type: String
    },
    email: {
      type: String
    },
    organization: {
      type: String,
      required: true
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Question", QuestionSchema);
