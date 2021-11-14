const Class = require('../../db/models/class')

const getTargetMiddleware = (req,res)=>{
    const code = req.query.code;

    Class.findOne({joinCode:code},(err,data)=>{
        if(err){
            console.log("err in getTargetMiddleware",err)
            throw err;
        }
        else{
            console.log("target",data.target)
            res.json({
                target:data.target
            })
        }
    })
}

module.exports = getTargetMiddleware