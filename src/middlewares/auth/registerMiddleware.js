const User = require('../../db/models/user');
const crypto = require('crypto');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID)
///

////
const registerMiddleware = (req, res, next) => {
    console.log("currently at registerMiddleware")
    // res.header("Access-Control-Allow-Origin","localhost:3000")
    const tokenId = req.body.tokenId;
    console.log("tokenId:",tokenId)
    client.verifyIdToken({idToken: tokenId, audience : process.env.CLIENT_ID}).then(response =>{
        const {email_verified, name, email} = response.getPayload();
        console.log("response.payload:",response.getPayload())
    }).catch(err => console.log("err:",err))

    // const userId = req.body.userId;
    // const pwd = req.body.pwd;


    // User.findOne({ userId: userId }).exec()
    //     .then((data) => {
    //         if (data != null) {
    //             return res.json({ msg: "user Id already exists", success: false });
    //         } else {
    //             const user = new User({
    //                      userId: userId,
    //                      pwd: pwd
    //                 })
    //             user.save((err, product) => {
    //                     res.json({
    //                         msg: "Register success",
    //                         success: true
    //                     })
    //                 });
    //             console.log("not found!!")
    //             // crypto.pbkdf2(pwd, (process.env.PASSWORD_HASH_SALT).toString('base64'), parseInt(process.env.PASSWORD_HASH_ITER), 64, 'sha512', (err, key) => {
    //             //     const user = new User({
    //             //         userId: userId,
    //             //         pwd: key.toString('base64'),
    //             //     })
    //             //     user.save((err, product) => {
    //             //         res.json({
    //             //             msg: "Register success",
    //             //             success: true
    //             //         })
    //             //     });
    //             // })

    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         res.json({
    //             msg: "Register failed",
    //             success: false
    //         })
    //         throw err;
    //     })



}

module.exports = registerMiddleware
