const Feedback = require('../../../db/models/feedback');
const Question = require('../../../db/models/question');
const User = require('../../../db/models/user');

const createFeedbackMiddleware = (req,res,next)=>{
    const classid = req.query.classId
    const email = req.body.email;
    const qnum = req.query.qNum;
    const feedbacktype = req.body.feedbackType;
    const content = req.body.content;
    const evaluation = req.body.evaluation;


    const feedback = new Feedback({
        qNum: qnum,
        author:email,
        evaluation:evaluation,
        plusFeedback: feedbacktype?content:"",
        minusFeedback: feedbacktype ? "" : content,
    })

    feedback.save()
        .then(() => {
            Question.findOne({ qNum: qnum }, (err, data) => {
                if (err) throw err;
                else {
                    data.feedback.push(feedback._id)
                    res.json({ success: true, msg: "success in adding feedback to question doc" })
                }
            })
            User.findOne({email:email},(err,data)=>{
                if(err) throw err;
                else{
                    data.classes.filter(course => course.classId == classid).myFeedback.push(question._id);
                    res.json({success:true, msg:"success in adding feedback to user doc"})
                }
            })
            res.json({
                success: true
            })
        })
        .catch((err) => {
            res.json({
                msg: err.message,
                success: false
            })
        })
}

module.exports = createFeedbackMiddleware;