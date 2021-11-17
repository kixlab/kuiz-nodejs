const User = require('../../db/models/user');
const Class = require('../../db/models/class')

const loadClassMiddleware = (req,res,next) => {
    const classid = req.query.classId;
    const email = req.body.email;

    const findUser = (email) =>{
        return new Promise((res,rej)=>{
            User.findOne({email:email},(err,data)=>{
                if(err) throw err;
                else{
                    return (data.classes)
                }
            })
        })
    }
    const checkClass = (classes) =>{
        return new Promise((res,rej)=>{
            Class.find({ classId : {$in:classes}},(err,data)=>{
                if(err) throw err;
                else{
                    return (data)
                }
            })
        })
    }

    findUser(email)
    .then(classes => checkClass(classes))
    .then(classinfo => res.json({classInfo : classinfo, msg:"success", success:true}))
    .catch(err => console.log("err",err))


}

module.exports = loadClassMiddleware;