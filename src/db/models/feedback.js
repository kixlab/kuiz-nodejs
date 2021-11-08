/*
Leaving it as Code Comment for future implementation
*/
var mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
    level: {
        type: Number,
        min: 1,
        max: 5
    },
    clearness: {
        type: Number,
        min: 1,
        max: 5
    },
    helpfulness: {
        type: Number,
        min: 1,
        max: 5
    }
})
const feedbackSchema = new mongoose.Schema({
    // qNUm:{
    //     type:Number,
    //     required:true
    // },
    author: {
        type: String,
        required:true
    },
    evaluation: {
        type: evaluationSchema
    },
    plusFeedback: {
        type: String
    },
    minusFeedback: {
        type: String
    }

})

module.exports = mongoose.model('Feedback', feedbackSchema);