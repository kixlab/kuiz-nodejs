const { ObjectId } = require("mongodb");
const User = require("../../db/models/user");

const changeSettingMiddleware = (req, res) => {
  const uid = req.body.uid;
  const name = req.body.name;
  const sid = req.body.sid;

  User.findOneAndUpdate(
    { _id: ObjectId(uid) },
    { $set: { name: name, sid: sid } },
    { new: true },
    (err, data1) => {
      if (err) {
        throw err;
      } else {
        res.json({
          msg: "success",
          name: data1.name,
          sid: data1.sid,
        });
      }
    },
  );
};

module.exports = changeSettingMiddleware;
