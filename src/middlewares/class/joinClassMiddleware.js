const Class = require('../../db/models/class');
const User = require('../../db/models/user')

const joinClassMiddleware = (req, res, next) => {
    const userEmail = req.body.email;
    const joinCode = req.body.joinCode;
    const classname = req.body.className;

    const check = (data) => {
        if (data === null) {
            return res.json({ msg: "No such class or already registered", success: false });
        } else {
            if (joinCode == data.joinCode) {
                Class.updateOne({ className: classname, classId: data.classId }, { $push: { students: userEmail } }, (err, data2) => {
                    if (err) throw err;
                    else {
                        //update userSchema
                        User.updateOne({ email: userEmail }, { $push: { classes: { classId: data.classId, isStudent:true} } })
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

    Class.findOne({ className: classname, students: { $ne: userEmail } })
        .then(check)
        .catch((err) => { throw err });
}

module.exports = joinClassMiddleware;
