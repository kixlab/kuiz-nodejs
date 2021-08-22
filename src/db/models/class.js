var mongoose = require('mongoose')


const classSchema = new mongoose.Schema({
    className:{
        type:String,
        trim:true,
        required:true,
        max:32
    },
    classId:{
        type:String
    },
    joinCode: { 
        type:Number,
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
    creator:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    instructors:{
        type: [{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }],
        default:[]
    },
    questions:{
        type:[{
            type:mongoose.Schema.ObjectId,
            ref:'Question'
        }],
        default:[]
    }
})

module.exports = mongoose.model('Class', classSchema);