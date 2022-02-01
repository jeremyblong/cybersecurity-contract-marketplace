const express = require("express");
const router = express.Router();
const User = require("../../../../schemas/authentication/register.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../../../../schemas/authentication/authenticate.js");
const { encrypt } = require("../../../../crypto.js");
const config = require("config");


router.post("/", async (req, res) => {

    const { 
        firstName, 
        lastName, 
        email, 
        username, 
        password, 
        agreement,
        accountType
    } = req.body;

    User.register(new User({
      firstName: firstName.toLowerCase().trim(), 
      lastName: lastName.toLowerCase().trim(), 
      email: email.toLowerCase().trim(), 
      username: username.toLowerCase().trim(), 
      password: encrypt(password.trim()), 
      accountType,
      agreement,
      uniqueId: uuidv4(),
      registrationDate: new Date(),
      registrationDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
      completedJobs: 0,
      reviews: [],
      fullyVerified: false,
      identityVerified: false,
      followingHackers: [],
      followingCompanies: [],
      experiencePoints: 0,
      rankLevel: 1,
      previouslyAppliedJobs: [],
      recentlyViewedProfileViews: [],
      recentlyViewedProfileIDSOnly: [],
      totalUniqueViews: 0,
      bookmarkedProfiles: [],
      profileLovesHearts: [],
      currentlyFollowedBy: []
    }), password, async (err, user) => {
      if (err) {

          console.log(err);

          res.statusCode = 500;

          res.send(err);
      } else {
          console.log("else ran")

          const token = getToken({ _id: user._id });

          const refreshToken = getRefreshToken({ _id: user._id });

          user.refreshToken.push({ refreshToken });

          user.save((errrrrrrrr, user) => {
            if (errrrrrrrr) {
              res.statusCode = 500;
              res.send(errrrrrrrr);
            } else {
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
              res.send({ success: true, token, message: "Successfully registered!", data: user });
            }
          });
        }
    });
});

module.exports = router;