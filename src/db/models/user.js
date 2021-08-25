var mongoose = require('mongoose')


const userProfileSchema = new mongoose.Schema({
    myQuestions : {
        type:String,
        required:true,
        default:[]
    },
    myFeedback:{
        type:String,
        required:true,
        default:[]
    },
    myNotification:{
        type: String,
        required:true,
        default:[]
    },
    classId:{
        type:String,
    },
    isStudent:{
        type:Boolean,
        default:true
    }
})
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        max:32
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        lowercase:true
    },
    classes:{
        type: [userProfileSchema],
        default:[]
    }
})

module.exports = mongoose.model('User', userSchema);