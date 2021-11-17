const User = require('../../db/models/user')
const Class = require('../../db/models/class');
const { ObjectId } = require('mongodb');

const getParticipantsMiddleware = (req, res) => {
    const joinCode = req.query.code
    Class.findOne({ joinCode: joinCode }, (err, data) => {
        if (err) {
            console.log("err",err)
            return res.status(400).json({
                error: "err"
            })
        }
        else {
            User.find({_id:{"$in":data.students}}).then((data1)=>{
                res.json({
                    info:data1
                })
            })
            .catch((err) => {console.log(err)} )
        }
    })
}



module.exports = getParticipantsMiddleware