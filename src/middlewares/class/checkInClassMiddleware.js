const User = require('../../db/models/user');

const checkInClassMiddleware = (req, res, next) => {
    const email = req.query.email;
    const classid = req.query.classId;

    User.findOne({ email: email })
        .then((data) => {
            const classes = data.classes;

            if (classes.filter(e => e.classId === classid).length>0){
                next();
            }
            else {
                res.status(403).json({
                    success: false,
                    msg: "not in the class"
                })
            }
        })

}

module.exports = checkInClassMiddleware;