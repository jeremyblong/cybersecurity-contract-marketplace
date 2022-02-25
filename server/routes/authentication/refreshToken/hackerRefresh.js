const jwt = require("jsonwebtoken")
const express = require("express");
const config = require("config");
const router = express.Router();
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../../../schemas/authentication/authenticate.js");
const { ObjectID } = require("mongodb");
const User = require("../../../schemas/authentication/register.js");


// hacker refresh token
router.post("/", (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  const { accountType } = req.body;

  if (refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, config.get("REFRESH_TOKEN_SECRET"));

      const userId = payload._id;

      console.log("userId", userId);

      User.findOne({ _id: userId }).then(user => {
          if (user) {
            // Find the refresh token against the user record in database
            const tokenIndex = user.refreshToken.findIndex(
              item => item.refreshToken === refreshToken
            )

            if (tokenIndex === -1) {

              res.statusCode = 401;

              res.send("Unauthorized");

            } else {
              const token = getToken({ _id: userId });
              // If the refresh token exists, then create new one and replace it.
              const newRefreshToken = getRefreshToken({ _id: userId });

              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken, _id: new ObjectID() };

              user.save((err, user) => {
                if (err) {

                  res.statusCode = 500;

                  res.send(err);
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);

                  res.send({ success: true, token, message: "Gathered refresh token!" });
                }
              })
            }
          } else {
            res.statusCode = 401;
            res.send("Unauthorized");
          }
        }, err => next(err));
    } catch (err) {
      res.statusCode = 401;
      res.send("Unauthorized");
    }
  } else {
    res.statusCode = 401;
    res.send("Unauthorized");
  }
});

module.exports = router;