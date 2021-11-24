const User = require("../../db/models/user");
const crypto = require("crypto");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const registerMiddleware = (req, res) => {
  // //console.log("Req",req)
  const name = req.body.name;
  const email = req.body.email;
  const imageUrl = req.body.image;
  User.findOne({ email }).exec((err, user) => {
    if (err) {
      //console.log("err")
      return res.status(400).json({
        error: "This user doesn't exist. Sign up first",
      });
    } else {
      if (user) {
        // //console.log("this user exists")
        // const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
        const { _id, name, email, classes, imageUrl, sid } = user;
        // //console.log("user",user)
        res.json({
          //token,
          user: { _id, name, email, classes, imageUrl, sid },
        });
      } else {
        let newUser = new User({ name, email, imageUrl });
        // //console.log("newUser", newUser)
        newUser.save((err, data) => {
          if (err) {
            //console.log("err:", err)
            return res.status(400).json({
              error: "something wrong",
            });
          }
          const token = jwt.sign(
            { _id: data._id, email: data.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
          );
          const { _id, name, email, classes, imageUrl, sid } = newUser;
          res.json({
            token,
            user: { _id, name, email, classes, imageUrl, sid },
          });
        });
      }
    }
  });
};

module.exports = registerMiddleware;
