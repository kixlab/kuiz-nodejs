const User = require('../db/models');
const crypto = require('crypto');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const checkIsUserMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.query.token;
    console.log(token);
    const email = req.query.email;

    if (!token) {
        return res.status(403).json({
            success: false,
            msg: "not logged in"
        })
    }

    const p = new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) reject(err)
            else resolve(decoded)
        })
    })

    const respond = (token) => {
        User.findById(token._id)
            .then((data) => {
                console.log("hello" + data);
                if (data === null) return res.status(403).json({
                    success: false,
                    msg: 'no such user'
                })
                else {
                    console.log(data.email)
                    if (data.email === email) next();
                    else return res.status(403).json({
                        success: false,
                        msg: 'no such user'
                    })
                }
            })
            .catch((err) => {
                throw err;
            })
    }

    const onError = (err) => {
        res.status(403).json({
            success: false,
            msg: err.message
        })
    }

    p
        .then(respond)
        .catch(onError)

}

module.exports = checkIsUserMiddleware;