const express = require("express");
const router = express.Router();
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../../../schemas/authentication/authenticate.js");
const passport = require("passport");
const User = require("../../../")

router.post("/login", passport.authenticate("local"), (req, res, next) => {

    const token = getToken({ _id: req.user._id });

    const refreshToken = getRefreshToken({ _id: req.user._id });

    user.refreshToken.push({ refreshToken })
})

module.exports = router;


// user.save((err, user) => {
//     if (err) {
//       res.statusCode = 500
//       res.send(err)
//     } else {
//       res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
//       res.send({ success: true, token })
//     }
// })