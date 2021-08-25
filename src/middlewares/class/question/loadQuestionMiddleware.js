const Class = require('../../db/models/class');
const Question = require('../../db/models/question');

const loadQuestionMiddleware = (req, res, next) =>{
    const classid = req.query.classid

    const getClass = (classid) =>{
        return new Promise((res,rej)=>{
            Class.findOne({classId:classid},(err,data)=>{
                if(err) throw err;
                else{
                    resolve(data.questions)
                }
            })
        })
    }
    const getQuestionData = (questionIdList) =>{
        return new Promise((res,rej)=>{
            Questions.findById({ _id: { $in: questionIdList } },(err,data)=>{
                if(err) throw err;
                else{
                    resolve(data)
                }
            })
        })
    }


    getClass(classid)
    .then(questions => getQuestionData(questions))
    .then(questiondatas => res.json({questionDatas : questiondatas, success:true, msg:"success"}))
    .catch(err => console.log("err",err))
}

module.exports = loadQuestionMiddleware
