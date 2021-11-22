const Question = require('../../../db/models/question');
const Class = require('../../../db/models/class.js');
const User = require('../../../db/models/user.js');
const crypto = require('crypto');
const mongoose = require('mongoose');
const { OAuth2Client } = require('google-auth-library');
const exp = require('constants');

const createQuestionMiddleware = (req, res) => {

    var quizData = req.body.quizData;
    const classId = req.body.classId;
    const question = new Question(quizData)

    const saveToClass = (data) =>{
        console.log("classData",data)
        if (data === null) {
            return res.json({ msg: "No such class", success: false });
        } else {
            if (classId == data.joinCode) {
                Class.updateOne({ joinCode: classId }, { $push: { questions: question._id } }, (err, data2) => {
                    if (err) throw err;
                    else {
                        //update userSchema
                        User.updateOne({ _id: quizData.author }, { $push: { made: [question._id] } })
                            .then((data3) => {
                                res.json({
                                    msg: "created question",
                                    success: true,
                                    data:question._id
                                })
                            })
                            .catch((err) => { throw err; })
                    }
                })
            } else {
                res.json({
                    msg: "Failed to create question",
                    success: false
                })
            }
        }
    }

    question.save((err, data) => {
                    if (err) {
                        console.log("err:", err)
                        return res.status(400).json({
                            error: "something wrong"
                        })
                    }
                    console.log("data!!",data)
                    Class.findOne({ joinCode: classId})
                    .then(saveToClass)
                    .catch((err) => { throw err });
                })
}

module.exports = createQuestionMiddleware
