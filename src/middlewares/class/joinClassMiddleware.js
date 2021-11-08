const Class = require('../../db/models/class');
const User = require('../../db/models/user')

const joinClassMiddleware = (req, res, next) => {
    const userEmail = req.body.userEmail;
    const joinCode = req.body.joinCode;
    const _id = req.body._id;
    //console.log("req",req.body)
    //const classname = req.body.className;

    const check = (data) => {
        // //console.log("data",data)
        if (data === null) {
            return res.json({ msg: "No such class", success: false });
        } else {
            console.log("joinCode")
            if (joinCode == data.joinCode) {
                Class.updateOne({ joinCode: joinCode }, { $push: { students: [_id] } }, (err, data2) => {
                    if (err) throw err;
                    else {
                        //update userSchema
                        User.updateOne({ email: userEmail }, { $push: { classes: [joinCode] } })
                            .then((data3) => {
                                res.json({
                                    msg: "Joined class",
                                    success: true
                                })
                            })
                            .catch((err) => { throw err; })
                    }
                })
            } else {
                res.json({
                    msg: "Failed to join group",
                    success: false
                })
            }
        }
    }

    Class.findOne({ joinCode: joinCode})
        .then(check)
        .catch((err) => { throw err });
}

module.exports = joinClassMiddleware;
