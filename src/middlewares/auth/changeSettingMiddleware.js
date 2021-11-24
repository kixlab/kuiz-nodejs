const { ObjectId } = require('mongodb');
const User = require('../../db/models/user')

const changeSettingMiddleware = (req,res)=>{

    const sid = req.body.sid;
    const uid = req.body.uid;
    
    User.findOneAndUpdate({_id:ObjectId(uid)},{"$set":{sid:sid}},(err,data1)=>{
        if(err){
            throw err;
        } else{
            res.json({
                msg:"success",
                sid:data1.sid
            })
        }
    })
    
}

module.exports = changeSettingMiddleware