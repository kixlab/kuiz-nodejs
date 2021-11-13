const Class = require('../../db/models/class')

const getTag = (req,res)=>{
    const code = req.body.code
    console.log("CODE",code)
    Class.findOne({joinCode:code},(err,data)=>{
        if(err){
            console.log("err in finding class",err)
        }
        else{
            console.log("class data",data)
            res.json({
                tags:data.tag
            })
        }
    })
    
}

module.exports = getTag