const { ObjectId } = require('mongodb');
const Question = require('../../../db/models/question')
const User = require('../../../db/models/user')

const makeCommentMiddleware = (req,res)=>{
    const comment = req.body.comment;
    const uid = req.body.uid;
    const qid = req.body.qid;
    
    User.findOne({_id:ObjectId(uid)},(err,data1)=>{
        if(err){
            throw err;
        } else{
            Question.findOneAndUpdate({_id:ObjectId(qid)},{$push:{comment:{"uid": ObjectId(uid), "comment":comment, "name":data1.name, "imgUrl":data1.imageUrl}}},{ returnOriginal: false },(err,data)=>{
                if(err){
                    console.log("err in making Comment",err)
                    throw err;
                }
                else{
                    User.findOneAndUpdate({_id:ObjectId(uid)},{$push:{comment:data._id}},(err,data2)=>{
                        if(err){
                            throw err;
                        } else{
                            res.json({
                                msg:"success"
                            })
                        }
                    })
                }
            })
        }
    })
    
}

module.exports = makeCommentMiddleware