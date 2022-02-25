const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");
// mongodb connection
// const db = mongoUtil.getDb();
const { verifyUser, COOKIE_OPTIONS } = require("../../../schemas/authentication/authenticate.js");


router.get("/", (req, res, next) => {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;
    const { accountType, uniqueId } = req.query;

    console.log("refreshToken", refreshToken, signedCookies);

    const collection = Connection.db.db("db").collection(accountType)

    collection.findOne({ uniqueId }).then((user) => {
      if (!user) {
        console.log("ERR - user not found...");
      } else {
        console.log(user);

        const tokenIndex = user.refreshToken.findIndex(
          item => item.refreshToken === refreshToken
        );

        console.log("index", tokenIndex);
  
        if (tokenIndex !== -1) {
          user.refreshToken.splice(tokenIndex, 1);

          collection.save(user, (err, data) => {
            if (err) {
              console.log("err saving - ", err);
            } else {

              req.logout();
              res.clearCookie("refreshToken", COOKIE_OPTIONS)
              res.send({ success: true, message: "Successfully logged out!", data })
            }
          })
        } else {
          req.logout();
          res.clearCookie("refreshToken", COOKIE_OPTIONS)
          res.send({ success: true, message: "Successfully logged out!" })
        }
      }
    }).catch((err) => {
      console.log(err);
    })
});

module.exports = router;