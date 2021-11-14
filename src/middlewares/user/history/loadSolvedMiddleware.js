const User = require('../../../db/models/user');
const Question = require('../../../db/models/question');
const loadSolvedMiddleware = (req, res) => {
    const email = req.query.email
    User.findOne({ email: email }, (err, data) => {
        if (err) {
            console.log("err",err)
            return res.status(400).json({
                error: "err"
            })
        }
        else {
            console.log("DATA",data)
            Question.find({_id:{"$in":data.solved}}).then((data)=>{
                res.json({
                    solved:{solved:data, success:true, msg:"success"}
                })
            })
            .catch((err) => {console.log(err)} )
        }
    })
}


module.exports = loadSolvedMiddleware
