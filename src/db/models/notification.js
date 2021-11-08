/*
Leaving it as Code Comment for future implementation
*/
var mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    notificationType:{
        type:String
    },
    sender :{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    reciever : {
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    content:{
        type:String
    },
    isRead:{
        type:Boolean,
        default:false
    }
},{timestamps: true})

module.exports = mongoose.model('Notification', notificationSchema);