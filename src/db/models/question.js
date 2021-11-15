var mongoose = require("mongoose");

// const AnswerOptionSchema = new mongoose.Schema({
//     optionNumber:{
//         type:Number,
//         required:true
//     },
//     answerBody:{
//         type:String,
//         minlength:1,
//         maxlength:200
//     },
//     isCorrectAnswer:{
//         type:Boolean,
//         default:false
//     },
//     // numOfSelection:{
//     //     type:Number,
//     //     default:0,
//     //     required:true
//     // }
// }, { _id: false })

const solvedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    selected: {
      type: Number,
      default: null,
    },
  },
  { _id: false },
);

const commentSchema = new mongoose.Schema(
  {
    uid: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
    },
    name: {
      type: String,
    },
    imgUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const questionSchema = new mongoose.Schema(
  {
    // qNum:{
    //     type:Number,
    // },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    authorName: {
      type: String,
    },
    authorImg: {
      type: String,
      default: "",
    },
    qStem: {
      type: String,
      unique: true,
      // minlength:10,
      // maxlength:1000
    },
    /*
    *****left as code comment for further implementation(ask @inhwa)*****
    contributors:{
        type:[{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }],
        default:[],
        required:true
    },
    */
    tags: {
      type: [String],
      default: [],
    },
    answerOptions: {
      type: [],
      default: undefined,
      // validate:{
      //     validator: function(value,any){
      //         return value&&value.length ===4
      //     },
      //     message:'Answer options should be 4'
      // }
    },
    answer: {
      type: Number,
      required: true,
    },
    explanation: {
      type: String,
      required: true,
      default: "",
    },
    // image:{
    //     data:Buffer,
    //     contentType:String
    // },
    comment: {
      type: [commentSchema],
      default: [],
    },
    likes: {
      type: [mongoose.Schema.ObjectId],
      default: [],
    },
    solved: {
      type: [solvedSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Question", questionSchema);
