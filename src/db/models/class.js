var mongoose = require('mongoose')

// import {questionSchema} from './question'

const AnswerOptionSchema = new mongoose.Schema({
    optionNumber: {
        type: Number,
        // required: true
    },
    answerBody: {
        type: String,
        minlength: 1,
        maxlength: 200
    },
    isCorrectAnswer: {
        type: Boolean,
        default: false
    },
    // numOfSelection:{
    //     type:Number,
    //     default:0,
    //     required:true
    // }
}, { _id: false })

const questionSchema = new mongoose.Schema({
    // qNumber:{
    //     type:Number,
    // },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    qStem: {
        type: String,
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
        default: []
    },
    answerOptions: {
        // type: [AnswerOptionSchema],
        type: [String],
        default: undefined,
        validate: {
            validator: function (value) {
                return value && value.length === 4
            },
            message: 'Answer options should be 4'
        }
    },
    answer:{
        type: Number,
        required:true,
        // validate: {
        //     validator: function (value, any) {
        //         return value>=0 && value <=3
        //     },
        //     message: 'Not a valid number'
        // }
    },
    explanation: {
        type: String,
        required: true,
        default: ""
    },
    image: {
        data: Buffer,
        contentType: String
    },
    comment: {
        type: String,
        default: []
    }
}, {
    timestamps: true
})

const classSchema = new mongoose.Schema({
    className:{
        type:String,
        trim:true,
        required:true,
        max:32
    },
    joinCode: { 
        type:String,
        trim:true,
        lowercase:true
    },
    students:{
        type: [{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }],
        default:[]
    },
    instructors:{
        type: [{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }],
        default:[]
    },
    questions:{
        // type: [questionSchema],
        type: [mongoose.Schema.ObjectId],
        ref:'Question',
    },
    target:{
        type:[Number],
        default:[3,3,3],
        // validate:[arrayLimit,"{PATH} exceeds the limit of 3"]
    },
    tag:{
        type:[String],
        default:[]
    }
})

function arrayLimit(val) {
    return val.length === 3;
}

module.exports = mongoose.model('Class', classSchema);