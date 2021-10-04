var mongoose = require('mongoose')
import {questionSchema} from './question'


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
        type: [questionSchema],
        default:[]
    },
    target:{
        type:[Number],
        default:[3,3,3],
        validate:[arrayLimit,"{PATH} exceeds the limit of 3"]
    }
})

function arrayLimit(val) {
    return val.length === 3;
}

module.exports = mongoose.model('Class', classSchema);