const Feedback = require('../../../db/models/feedback');

const loadFeedbackMiddleware = (req, res, next) => {
    const qnum = req.query.qNum

    const getQuestion = (qnum) => {
        return new Promise((res, rej) => {
            Question.findOne({ qNum: qnum }, (err, data) => {
                if (err) throw err;
                else {
                    resolve(data.feedback)
                }
            })
        })
    }
    const getFeedbackData = (feedbackList) => {
        return new Promise((res, rej) => {
            Feedback.findById({ _id: { $in: feedbackList } }, (err, data) => {
                if (err) throw err;
                else {
                    resolve(data)
                }
            })
        })
    }


    getQuestion(qnum)
        .then(feedbackList => getFeedbackData(feedbackList))
        .then(feedbackdatas => res.json({ feedbackDatas: feedbackdatas, success: true, msg: "success" }))
        .catch(err => console.log("err", err))
}

module.exports = loadFeedbackMiddleware