const { ObjectId } = require('mongodb');
const Question = require('../../../db/models/question');
const User = require('../../../db/models/question');

const likeQuestionMiddleware = (req,res)=>{

    const liker = req.body.uid
    const question = req.body.qid


    const likeQuestion = (qid, uid)=>{
        Question.findOne({_id:ObjectId(qid)},(err,data)=>{
            console.log("entered findOne")
            if(err){
                console.log("err in findQuestion")
                throw err;
            } else {
                if(data.likes.includes(uid)){
                    console.log("user Likes the Question")
                    Question.updateOne({_id : ObjectId(qid)},{$pull:{likes: ObjectId(uid)}},(err,data1)=>{
                        if(err){
                            console.log("err in updating like")
                        } else{
                
                            res.json({
                                isLiked : false,
                                likes: data.likes,
                                msg:"success in not liking"
                            })
                        }
                    })
                } else {
                    console.log("user doesn't like the question")
                    Question.updateOne({_id: ObjectId(qid)},{$push:{likes:ObjectId(uid)}},(err,data1)=>{
                        if(err){
                            console.log("err in updating like")
                        } else{
                    
                            res.json({
                                isLiked : true,
                                likes: data.likes,
                                msg:"success in liking"
                            })
                        }
                    } )
                }
            }
        })
    }


    
    likeQuestion(question, liker)
}

module.exports = likeQuestionMiddleware