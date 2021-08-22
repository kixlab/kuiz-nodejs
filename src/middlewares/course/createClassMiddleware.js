const Class = require('../../db/models/class');
const crypto = require('crypto');
const mongoose = require('mongoose');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID)
const jwt = require('jsonwebtoken');

const createClassMiddleware = (req,res) =>{

    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    let today = new Date();
    const classid = today.getFullYear().toString() + today.getMonth().toString() + today.getTime().toString() + makeid(40);
    const classname = req.body.className;
    const instructor = req.body.userId;
    
    Class.findOne({ className: classname }, (err, data) => {
        if (err) throw err;
        if (data != null) { return res.json({ msg: "className already exists", success: false }); } else {
            const joinpassword = Math.floor(Math.random()*1000)
            const class_ = new Class({
                className:classname,
                classId : classid,
                joinCode : joinpassword,
                instructors:[instructor],
            })
            class_.save()
                .then(() => {
                    User.updateOne({ userId: instructor }, { $push: { classes: [{ classId:classid, isStudent:false}] } })
                        .then((data) => {
                            console.log(data);
                            res.json({
                                msg: "creating class success",
                                success: true
                            })
                        })

                })
                .catch((err) => {
                    res.json({
                        msg: err.message,
                        success: false
                    })
                })
        }
    })

}

module.exports = createClassMiddleware
