var mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    author:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    qStem:{
        type:String, 
        minlength:10,
        maxlength:1000
    },
    contributors:{
        type:[{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }],
        default:[],
        required:true
    },
    tags:{
        type:[String],
        default:[]
    },
    answerOptions:{
        type:[AnswerOptionSchema],
        default:undefined,
        validate:{
            validator: function(value,any){
                return value&&value.length ===4
            },
            message:'Answer options should be 4'
        }
    },
    explanation:{
        type:String,
        required:true,
        default:""
    },
    image:{
        data:Buffer,
        contentType:String
    },
    comments :{
        type:[{
            type:mongoose.Schema.ObjectId,
            ref:'Comment'
        }],
        default:[]
    }
},{
    timestamps: true
})