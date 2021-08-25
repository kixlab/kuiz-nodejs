const Course = require('../../db/models/class');
const crypto = require('crypto');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const registerMiddleware = (req, res) => {

    const tokenId = req.body.tokenId;
    // console.log("clientId",process.env.CLIENT_ID)
    client.verifyIdToken({idToken: tokenId, audience : process.env.CLIENT_ID}).then(response =>{
        const {email_verified, name, email} = response.getPayload();
        if(email_verified){
            User.findOne({email}).exec((err, user)=>{
                if(err){
                    console.log("err")
                    return res.status(400).json({
                        error : "This user doesn't exist. Sign up first"
                    })
                } else{
                    if(user){
                        console.log("this user exists")
                        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
                        const {_id, name, email, courses} = user;
                        res.json({
                            token, 
                            user:{_id, name, email, courses},
                        })
                    } else{
                        let newUser = new User({name, email});
                        console.log("newUser",newUser)
                        newUser.save((err, data)=>{
                            if(err){
                                console.log("err:",err)
                                return res.status(400).json({
                                    error:"something wrong"
                                })
                            }
                            const token = jwt.sign({_id:data._id}, process.env.JWT_SECRET,{expiresIn: '7d'})
                            const {_id, name, email, courses} = newUser;
                            res.json({
                                token, 
                                user:{_id, name, email, courses},
                            })
                        })
                    }
                }
            })
        }
    }).catch(err => console.log("err:",err))

}

module.exports = registerMiddleware
