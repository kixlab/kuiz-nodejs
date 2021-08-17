var mongoose = require('mongoose')


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
    pwd: { 
        type:String,
        trim:true,
        lowercase:true
    },
    courses:{
        type:[String],
        default:[]
    }
})

module.exports = mongoose.model('User', userSchema);