var mongoose = require('mongoose')
// import {questionSchema} from './question'



const adminSchema = new mongoose.Schema({
    instructorList : {
        type:Array
    },
    classList:{
        type:Array
    }
})


module.exports = mongoose.model('Admin', adminSchema);