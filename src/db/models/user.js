var mongoose = require('mongoose')


const userProfileSchema = new mongoose.Schema({
    myQuestions : {
        type:[{
            type:mongoose.Schema.ObjectId,
            ref:'Question'
        }],
        required:true,
        default:[]
    },
    myComments:{
        type:[{
            type:mongoose.Schema.ObjectId,
            ref:'Comment'
        }],
        required:true,
        default:[]
    },
    myNotification:{
        type: [{
            type:mongoose.Schema.ObjectId,
            ref:'Notification'
        }],
        required:true,
        default:[]
    }
})
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
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