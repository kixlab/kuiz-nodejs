const Question = require('../../db/models/question');
const crypto = require('crypto');
const mongoose = require('mongoose');
const { OAuth2Client } = require('google-auth-library');
const exp = require('constants');

const modifyQuestionMiddleware = (req, res) => {

    const [ author, qstem, tags, answeroptions, explanation, image] = [req.body.authorEmail, req.body.qstem, req.body.tags, req.body.answeroptions, req.body.explanation, req.body.image]

    Question.updateOne({ author: author }, { $pull: { qstem: qstem, tags:tags, answeroptions:answeroptions, explanation:explanation, image:image } })
        .then((data) => {
            // //console.log(data);
            axios.post("http://localhost:8080/question/modifyQuestion", 
            // { content: noticeContent, title: noticeTitle }, { params: { userId: userid, classId: classid }}
            )
                .then((response) => {
                    res.json({
                        success: true,
                        msg: "modify success"
                    })
                })
                .catch((err) => {
                    //console.log(err);
                })
        })
        .catch((err) => {
            res.status(403).json({
                success: false,
                msg: err.message
            })
        })

}

module.exports = modifyQuestionMiddleware
