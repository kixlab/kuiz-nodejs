const Question = require('../../../db/models/question')
const User = require('../../../db/models/user')
const { ObjectId } = require('mongodb');

const solveQuesetionMiddleware = (req,res) => {
    const selected = req.body.selectedAnswer;
    const uid = req.body.uid;
    const qid = req.body.qid;
    const solvedSchema = {"user":ObjectId(uid), "selected":selected}

    const solveQuestion = (qid, uid) => {
        Question.findOne({_id:ObjectId(qid)},(err,data2)=>{
            if(err){
                console.log("err",err)
            } 
            else{
                if(data2.solved.filter(e=>e.user == uid ).length>0){  
                    const correct = data2["solved"].filter(e=>e.selected == data2["answer"])
                    const ratio = {"correct":correct.length, "solved":data2["solved"].length}  
                    res.json({
                        msg:"already solved",
                        solved:data2["solved"],
                        ratio:ratio
                    })
                }
                else {
                    Question.findOneAndUpdate({_id : ObjectId(qid)},{$push:{solved: solvedSchema}},{ returnOriginal: false },(err,data1)=>{
                        console.log("first try!")
                        if(err){
                            console.log("err in updating solved to question",err)
                        } else{
                            const correct = data1["solved"].filter(e=>e.selected == data1.answer)
                            const ratio = {"correct":correct.length, "solved":data1["solved"].length}
                            User.updateOne({ _id: ObjectId(uid) }, { $push: { solved: ObjectId(qid) } })
                            res.json({
                                msg:"success in solving",
                                solved:data1["solved"],
                                ratio:ratio
                            })
                        }
                    })
                }
            }
        })
    }

    solveQuestion(qid, uid, selected)
}

module.exports = solveQuesetionMiddleware;