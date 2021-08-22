var mongoose = require('mongoose');

const AnswerOptionSchema = new mongoose.Schema({
    optionNumber:{
        type:Number,
        required:true
    },
    answerBody:{
        type:String,
        minlength:1,
        maxlength:200
    },
    isCorrectAnswer:{
        type:Boolean,
        default:false
    },
    numOfSelection:{
        type:Number,
        default:0,
        required:true
    }
}, { _id: false })

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
    feedbcaks :{
        type:[{
            type: mongoose.Schema.ObjectId,
            ref:'Feedback'
        }],
        default:[]
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Question', questionSchema);