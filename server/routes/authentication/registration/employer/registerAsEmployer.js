const express = require("express");
const router = express.Router();
const User = require("../../../../schemas/authentication/employerRegister.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../../../../schemas/authentication/authenticate.js");
const { encrypt } = require("../../../../crypto.js");
const config = require("config");
const Client = require('authy-client').Client;
const authy = new Client({ key: config.get("twilioAuthyProductionKey") });
const stripe = require('stripe')(config.get("stripeSecretKey"));
const { Connection } = require("../../../../mongoUtil.js");

router.post("/", async (req, res) => {

    const { 
        firstName, 
        lastName, 
        email, 
        username, 
        password, 
        referralCode,
        agreement,
        accountType,
        phoneNumber
    } = req.body;

    const userID = uuidv4();

    if (typeof referralCode !== "undefined" && referralCode.length >= 10) {
      // referral WAS Provided!!

      const hackerCollection = Connection.db.db("db").collection("hackers");
      const employerCollection = Connection.db.db("db").collection("employers");

      const hackerFound = await hackerCollection.findOne({ referralCode });
      const employerFound = await employerCollection.findOne({ referralCode });

      // check for hacker first 
      if (hackerFound !== null) {

        const newReferralData = {
          id: uuidv4(),
          referrerName: `${hackerFound.firstName} ${hackerFound.lastName}`,
          referrerID: hackerFound.uniqueId,
          date: new Date(),
          dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
          referrerAccountType: hackerFound.accountType
        };
        
        await stripe.customers.create({
          description: 'Employer Account Type',
          email: email.toLowerCase().trim(),
          name: `${firstName.toLowerCase().trim()} ${lastName.toLowerCase().trim()}`
        }, (errrrrrror, accountData) => {
          if (errrrrrror) {
            console.log(errrrrrror);
    
            res.send({
              message: "An error occurred while attempting to register this new account...",
              err: errrrrrror
            })
          } else {
            console.log("accountData", accountData);
    
            User.register(new User({
              firstName: firstName.toLowerCase().trim(), 
              lastName: lastName.toLowerCase().trim(), 
              email: email.toLowerCase().trim(), 
              username: username.toLowerCase().trim(), 
              password: encrypt(password.trim()),
              phoneNumber, 
              accountType,
              agreement,
              referral: newReferralData,
              uniqueId: userID,
              referralCode: uuidv4(),
              registrationDate: new Date(),
              registrationDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
              completedJobs: 0,
              tokens: 0,
              reviews: [],
              fullyVerified: false,
              identityVerified: false,
              followingHackers: [],
              followingCompanies: [],
              applicants: [],
              bookmarkedProfiles: [],
              profileLovesHearts: [],
              currentlyFollowedBy: [],
              stripeAccountDetails: accountData
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

                  authy.registerUser({
                    countryCode: "US",
                    email: email.toLowerCase().trim(),
                    phone: phoneNumber
                  }, (regErr, regRes) => {
                    if (regErr) {

                        console.log('regError Registering User with Authy');

                        res.status(500).json(regErr);

                        return;
                    } else {

                      user["authyId"] = regRes.user.id;

                      user.save((errrrrrrrr, user) => {
                        if (errrrrrrrr) {
                          res.statusCode = 500
                          res.send(errrrrrrrr);
                        } else {
                          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                          res.send({ success: true, token, message: "Successfully registered!", data: user });
                        }
                      });
                    }
                  });
                }
            });
          }
        });
      } else {
        if (employerFound !== null) {
          const newReferralData = {
            id: uuidv4(),
            referrerName: `${employerFound.firstName} ${employerFound.lastName}`,
            referrerID: employerFound.uniqueId,
            date: new Date(),
            dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
            referrerAccountType: employerFound.accountType
          };
          
          await stripe.customers.create({
            description: 'Employer Account Type',
            email: email.toLowerCase().trim(),
            name: `${firstName.toLowerCase().trim()} ${lastName.toLowerCase().trim()}`
          }, (errrrrrror, accountData) => {
            if (errrrrrror) {
              console.log(errrrrrror);
      
              res.send({
                message: "An error occurred while attempting to register this new account...",
                err: errrrrrror
              })
            } else {
              console.log("accountData", accountData);
      
              User.register(new User({
                firstName: firstName.toLowerCase().trim(), 
                lastName: lastName.toLowerCase().trim(), 
                email: email.toLowerCase().trim(), 
                username: username.toLowerCase().trim(), 
                password: encrypt(password.trim()), 
                accountType,
                agreement,
                referral: newReferralData,
                uniqueId: userID,
                phoneNumber,
                referralCode: uuidv4(),
                registrationDate: new Date(),
                registrationDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                completedJobs: 0,
                tokens: 0,
                reviews: [],
                fullyVerified: false,
                identityVerified: false,
                followingHackers: [],
                followingCompanies: [],
                applicants: [],
                bookmarkedProfiles: [],
                profileLovesHearts: [],
                currentlyFollowedBy: [],
                stripeAccountDetails: accountData
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
          
                    authy.registerUser({
                      countryCode: "US",
                      email: email.toLowerCase().trim(),
                      phone: phoneNumber
                    }, (regErr, regRes) => {
                      if (regErr) {
  
                          console.log('regError Registering User with Authy');
  
                          res.status(500).json(regErr);
  
                          return;
                      } else {
  
                        user["authyId"] = regRes.user.id;
  
                        user.save((errrrrrrrr, user) => {
                          if (errrrrrrrr) {
                            res.statusCode = 500
                            res.send(errrrrrrrr);
                          } else {
                            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                            res.send({ success: true, token, message: "Successfully registered!", data: user });
                          }
                        });
                      }
                    });
                  }
              });
            }
          });
        } else {
          res.json({
            message: "An unknown error has occurred while trying to locate referring user - please make sure you're entering a 'proper referral code' as we were unable to find any results for a user with that information/code.."
          })
        }
      }
    } else {
      // no referral provided..
      await stripe.customers.create({
        description: 'Employer Account Type',
        email: email.toLowerCase().trim(),
        name: `${firstName.toLowerCase().trim()} ${lastName.toLowerCase().trim()}`
      }, (errrrrrror, accountData) => {
        if (errrrrrror) {
          console.log(errrrrrror);
  
          res.send({
            message: "An error occurred while attempting to register this new account...",
            err: errrrrrror
          })
        } else {
          console.log("accountData", accountData);
  
          User.register(new User({
            firstName: firstName.toLowerCase().trim(), 
            lastName: lastName.toLowerCase().trim(), 
            email: email.toLowerCase().trim(), 
            username: username.toLowerCase().trim(), 
            password: encrypt(password.trim()), 
            accountType,
            agreement,
            uniqueId: userID,
            phoneNumber,
            referralCode: uuidv4(),
            referral: null,
            registrationDate: new Date(),
            registrationDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
            completedJobs: 0,
            tokens: 0,
            reviews: [],
            fullyVerified: false,
            identityVerified: false,
            followingHackers: [],
            followingCompanies: [],
            applicants: [],
            bookmarkedProfiles: [],
            profileLovesHearts: [],
            currentlyFollowedBy: [],
            stripeAccountDetails: accountData
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
      
                authy.registerUser({
                  countryCode: "US",
                  email: email.toLowerCase().trim(),
                  phone: phoneNumber
                }, (regErr, regRes) => {
                  if (regErr) {

                      console.log('regError Registering User with Authy');

                      res.status(500).json(regErr);

                      return;
                  } else {

                    user["authyId"] = regRes.user.id;

                    user.save((errrrrrrrr, user) => {
                      if (errrrrrrrr) {
                        res.statusCode = 500
                        res.send(errrrrrrrr);
                      } else {
                        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                        res.send({ success: true, token, message: "Successfully registered!", data: user });
                      }
                    });
                  }
                });
              }
          });
        }
      });
    }
});

module.exports = router;