const Class = require('../../../db/models/class');
const Question = require('../../../db/models/question');
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
            Question.find({_id:{"$in":data.questions}}).then((data)=>{
                res.json({
                    questions:{questionDatas:data, success:true, msg:"success"}
                })
            })
            .catch((err) => {console.log(err)} )
        }
    })
}


module.exports = loadQuestionMiddleware
