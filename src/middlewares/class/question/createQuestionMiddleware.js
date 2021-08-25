const Question = require('../../../db/models/question');
const crypto = require('crypto');
const mongoose = require('mongoose');
const { OAuth2Client } = require('google-auth-library');
const exp = require('constants');

const createQuestionMiddleware = (req, res) => {

    const [author, qstem, tags, answeroptions, explanation, image] = [req.body.userEmail, req.body.qstem, req.body.tags, req.body.answeroptions, req.body.explanation, req.body.image]

    const question = new Question({
        qNumber: Question.countDocuments()+1,
        author : author,
        qstem : qstem,
        tags : tags,
        answeroptions : answeroptions,
        explanation:explanation, 
        image : image
    })

    question.save()
        .then(() => {
            res.json({
                success : true
            })
        })
        .catch((err) => {
            res.json({
                msg: err.message,
                success: false
            })
        })

}

module.exports = createQuestionMiddleware
