var mongoose = require('mongoose')


const classQuestionSchema = new mongoose.Schema(
    {
        questionId:{
            type:mongoose.Schema.ObjectId,
            ref:'Question'
        }
    }
)
const classUserSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    ref:'User'
})
const classSchema = new mongoose.Schema({
    className:{
        type:String,
        trim:true,
        required:true,
        max:32
    },
    classCode: { 
        type:Number,
        trim:true,
        lowercase:true
    },
    students:{
        type: [classUserSchema],
        default:[]
    },
    instructors:{
        type: [classUserSchema],
        default:[]
    },
    questions:{
        type:[classQuestionSchema],
        default:[]
    }
})

module.exports = mongoose.model('Class', classSchema);