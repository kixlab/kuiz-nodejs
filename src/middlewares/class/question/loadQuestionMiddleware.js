const Class = require('../../../db/models/class');
// const Question = require('../../../db/models/question');
const loadQuestionMiddleware = (req, res) => {
    const joinCode = req.query.code
    Class.findOne({ joinCode: joinCode }, (err, data) => {
        if (err) {
            console.log("err",err)
            return res.status(400).json({
                error: "err"
            })
        }
        else {
            console.log("data", data)
            res.json({
                //token,
                questions: { questionDatas: data.questions, success: true, msg: "success" },
            })
        }
    })
}


module.exports = loadQuestionMiddleware
