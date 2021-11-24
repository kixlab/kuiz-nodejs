var mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  myQuestions: {
    type: String,
    required: true,
    default: [],
  },
  myFeedback: {
    type: String,
    required: true,
    default: [],
  },
  myNotification: {
    type: String,
    required: true,
    default: [],
  },
  // classId:{
  //     type:String,
  // },
  joinCode: {
    type: String,
  },
  isStudent: {
    type: Boolean,
    default: true,
  },
});

const solvedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Question",
    },

    selected: {
      type: Number,
    },
    answer: {
      type: Number,
    },
  },
  { _id: false },
);
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    max: 32,
  },
  sid: {
    type: String,
    default: "12345678",
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  isStudent: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  classes: {
    type: [String],
    default: [],
  },
  made: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Question",
      },
    ],
    default: [],
  },
  solved: {
    type: [mongoose.Schema.ObjectId],
    ref: "Question",
    default: [],
  },
  comment: {
    type: [String],
  },
});

module.exports = mongoose.model("User", userSchema);
