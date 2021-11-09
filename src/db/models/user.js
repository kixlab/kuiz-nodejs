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
    // classId:{
    //     type:String,
    // },
    joinCode: {
        type: String,
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
    isStudent:{
        type:Boolean,
        default : true
    },
    imageUrl:{
        type:String,
        default :"~/assets/images/profile-default.png"
    },
    classes:{
        type: [String],
        default:[]
    },
    made:{
        type: [{
            type:mongoose.Schema.ObjectId,
            ref:'Question'
        }],
        default:[]
    },
    solved:{
        type: [{
            type:mongoose.Schema.ObjectId,
            ref:'Question'
        }],
        default:[]
    },
})

module.exports = mongoose.model('User', userSchema);