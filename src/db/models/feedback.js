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
    questionId:{
        type:mongoose.Schema.ObjectId,
        ref:"Question"
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
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