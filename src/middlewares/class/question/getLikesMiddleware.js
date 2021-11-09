const Question = require('../../../db/models/question')
const { ObjectId } = require('mongodb');

const getLikesMiddleware = (req,res) =>{

    const qid = req.body.qid

    Question.findById(ObjectId(qid),(err,data)=>{
        if(err){
            console.log("err in getLikesMiddleware")
        } else{
            res.json({
            likes : data.likes
            })
        }
    })
}

module.exports = getLikesMiddleware