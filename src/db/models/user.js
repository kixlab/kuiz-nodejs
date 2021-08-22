var mongoose = require('mongoose')

const userNotificationSchema = new mongoose.Schema({
    notificationId :{type:String, default:"notification"},
    notificationType : {type: Number, default : 0 },
    isNotificationResolved :{type:Boolean, default: false}
})
const userProfileSchema = new mongoose.Schema({
    myQuestions : {
        type:[String],
        required:true,
        default:[]
    },
    myComments:{
        type:[String],
        required:true,
        default:[]
    },
    myNotification:{
        type: [userNotificationSchema],
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