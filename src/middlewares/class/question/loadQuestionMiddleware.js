const Class = require('../../../db/models/class');
const Question = require('../../../db/models/question');

const loadQuestionMiddleware = (req, res, next) =>{
    console.log("loadQuestionsMiddleware")
    const joinCode = req.body.code

    const getClass = (joinCode) =>{
        return new Promise((res,rej)=>{
            Class.findOne({ joinCode: joinCode},(err,data)=>{
                if(err) throw err;
                else{
                    resolve(data.questions)
                }
            })
        })
    }
    const getQuestionData = (questionIdList) =>{
        return new Promise((res,rej)=>{
            Question.findById({ _id: { $in: questionIdList } },(err,data)=>{
                if(err) throw err;
                else{
                    resolve(data)
                }
            })
        })
    }


    getClass(joinCode)
    // .then(questions => getQuestionData(questions))
    .then(questiondatas => res.json({questionDatas : questiondatas, success:true, msg:"success"}))
    .catch(err => console.log("err",err))
}

module.exports = loadQuestionMiddleware
