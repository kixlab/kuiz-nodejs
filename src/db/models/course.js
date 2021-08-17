var mongoose = require('mongoose')


const questionSchema = new mongoose.Schema(
    {
        qstem:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        }
    },
    {timestamps : true}
)
const classSchema = new mongoose.Schema({
    className:{
        type:String,
        trim:true,
        required:true,
        max:32
    },
    classId:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        lowercase:true
    },
    code: { 
        type:String,
        trim:true,
        lowercase:true
    },
    students:{
        type:[String],
        default:[]
    },
    instructors:{
        type:[String],
        default:[]
    },
    questions:{
        type:[questionSchema],
        default:[]
    }
})

module.exports = mongoose.model('Class', classSchema);