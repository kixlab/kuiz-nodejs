const User = require('../../../db/models/user');
const Question = require('../../../db/models/question');
const loadCommentMiddleware = (req, res) => {
    const email = req.query.email
    User.findOne({ email: email }, (err, data) => {
        if (err) {
            console.log("err",err)
            return res.status(400).json({
                error: "err"
            })
        }
        else {
            res.json({
                comment:data.comment
            })
        }
    })
}


module.exports = loadCommentMiddleware
