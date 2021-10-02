var mongoose = require('mongoose')


const classSchema = new mongoose.Schema({
    className:{
        type:String,
        trim:true,
        required:true,
        max:32
    },
    // classId:{
    //     type:String
    // },
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
        type:[String],
        default:[]
    }
})

module.exports = mongoose.model('Class', classSchema);