var mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    uid : {
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    qid:{
        type:mongoose.Schema.ObjectId,
        ref:'Question'
    },
    comment:{
        type:String
    },
    name:{
        type:String
    },
    imgUrl:{
        type:String,
        default:""
    }
},{timestamps:true})

// module.exports = mongoose.model('Comment', commentSchema);
