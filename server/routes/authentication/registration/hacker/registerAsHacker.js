const express = require("express");
const router = express.Router();
const User = require("../../../../schemas/authentication/register.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../../../../schemas/authentication/authenticate.js");
const { encrypt, decrypt } = require("../../../../crypto.js");
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
        phoneNumber,
        accountType,
        betamodeActivated,
        betacode
    } = req.body;

    if (betamodeActivated === true) {
      const betaCollection  = Connection.db.db("db").collection("betatesters");

      const betaMatch = await betaCollection.findOne({ email: email.toLowerCase().trim() });

      if (betaMatch !== null) {
        console.log("decrypt(betaMatch.referralID)", betaMatch, decrypt(betaMatch.referralID), moment(new Date()).diff(moment(betaMatch.date), 'hours'));

        if (betacode === decrypt(betaMatch.referralID) && (moment(new Date()).diff(moment(betaMatch.date), 'hours') <= 48)) {
          // user has registered in time and the code matches!
          betaMatch.accepted = true;

          betaCollection.save(betaMatch, async (errrrrrrrrr, saveddddd) => {
            if (errrrrrrrrr) {
              console.log("errrrrrrrrr", errrrrrrrrr);

              res.json({
                message: "Error occurred, beta user modification error occurred - something unknown happened..",
                err: errrrrrrrrr
              })
            } else {
              console.log("saveddddd", saveddddd);

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
                  
                  await stripe.accounts.create({
                    type: 'custom',
                    country: 'US',
                    email: email.toLowerCase().trim(),
                    business_type: "individual",
                    individual: {
                      email: email.toLowerCase().trim(),
                      first_name: firstName.toLowerCase().trim(),
                      last_name: lastName.toLowerCase().trim()
                    },
                    capabilities: {
                      card_payments: {
                        requested: true
                      },
                      transfers: {
                        requested: true
                      },
                    },
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
                        uniqueId: uuidv4(),
                        phoneNumber,
                        registrationDate: new Date(),
                        registrationDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                        completedJobs: 0,
                        reviews: [],
                        referral: newReferralData,
                        fullyVerified: false,
                        identityVerified: false,
                        followingHackers: [],
                        followingCompanies: [],
                        experiencePoints: 0,
                        rankLevel: 1,
                        referralCode: uuidv4(),
                        tokens: 0,
                        previouslyAppliedJobs: [],
                        recentlyViewedProfileViews: [],
                        recentlyViewedProfileIDSOnly: [],
                        totalUniqueViews: 0,
                        bookmarkedProfiles: [],
                        profileLovesHearts: [],
                        currentlyFollowedBy: [],
                        profilePosts: [],
                        stripeAccountDetails: accountData,
                        stripeAccountVerified: false
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
                                    res.statusCode = 500;
                                    res.send(errrrrrrrr);
                                  } else {
                                    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
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
                    
                    await stripe.accounts.create({
                      type: 'custom',
                      country: 'US',
                      email: email.toLowerCase().trim(),
                      business_type: "individual",
                      individual: {
                        email: email.toLowerCase().trim(),
                        first_name: firstName.toLowerCase().trim(),
                        last_name: lastName.toLowerCase().trim()
                      },
                      capabilities: {
                        card_payments: {
                          requested: true
                        },
                        transfers: {
                          requested: true
                        },
                      },
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
                          uniqueId: uuidv4(),
                          phoneNumber,
                          registrationDate: new Date(),
                          registrationDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                          completedJobs: 0,
                          reviews: [],
                          referral: newReferralData,
                          fullyVerified: false,
                          identityVerified: false,
                          followingHackers: [],
                          followingCompanies: [],
                          experiencePoints: 0,
                          rankLevel: 1,
                          referralCode: uuidv4(),
                          tokens: 0,
                          previouslyAppliedJobs: [],
                          recentlyViewedProfileViews: [],
                          recentlyViewedProfileIDSOnly: [],
                          totalUniqueViews: 0,
                          bookmarkedProfiles: [],
                          profileLovesHearts: [],
                          currentlyFollowedBy: [],
                          profilePosts: [],
                          stripeAccountDetails: accountData,
                          stripeAccountVerified: false
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
                                      res.statusCode = 500;
                                      res.send(errrrrrrrr);
                                    } else {
                                      res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
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
                await stripe.accounts.create({
                  type: 'custom',
                  country: 'US',
                  email: email.toLowerCase().trim(),
                  business_type: "individual",
                  individual: {
                    email: email.toLowerCase().trim(),
                    first_name: firstName.toLowerCase().trim(),
                    last_name: lastName.toLowerCase().trim()
                  },
                  capabilities: {
                    card_payments: {
                      requested: true
                    },
                    transfers: {
                      requested: true
                    },
                  },
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
                      uniqueId: uuidv4(),
                      phoneNumber,
                      registrationDate: new Date(),
                      registrationDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                      completedJobs: 0,
                      reviews: [],
                      referral: null,
                      fullyVerified: false,
                      identityVerified: false,
                      followingHackers: [],
                      followingCompanies: [],
                      experiencePoints: 0,
                      rankLevel: 1,
                      referralCode: uuidv4(),
                      tokens: 0,
                      previouslyAppliedJobs: [],
                      recentlyViewedProfileViews: [],
                      recentlyViewedProfileIDSOnly: [],
                      totalUniqueViews: 0,
                      bookmarkedProfiles: [],
                      profileLovesHearts: [],
                      currentlyFollowedBy: [],
                      profilePosts: [],
                      stripeAccountDetails: accountData,
                      stripeAccountVerified: false
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
                                  res.statusCode = 500;
                                  res.send(errrrrrrrr);
                                } else {
                                  res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
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
            }
          })
        } else {
          console.log("information does not match..!");

          res.json({
            message: "Information/data does NOT match, you MUST enter a valid beta-invitation code & the date MUST be within 48 hours of the invitation date and/or time, please try this action again.."
          })
        }
      } else {
        console.log("Error occurred, beta user could NOT be found...!");
        
        res.json({
          message: "Error occurred, beta user could NOT be found...!"
        })
      }
    } else {
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
          
          await stripe.accounts.create({
            type: 'custom',
            country: 'US',
            email: email.toLowerCase().trim(),
            business_type: "individual",
            individual: {
              email: email.toLowerCase().trim(),
              first_name: firstName.toLowerCase().trim(),
              last_name: lastName.toLowerCase().trim()
            },
            capabilities: {
              card_payments: {
                requested: true
              },
              transfers: {
                requested: true
              },
            },
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
                uniqueId: uuidv4(),
                phoneNumber,
                registrationDate: new Date(),
                registrationDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                completedJobs: 0,
                reviews: [],
                referral: newReferralData,
                fullyVerified: false,
                identityVerified: false,
                followingHackers: [],
                followingCompanies: [],
                experiencePoints: 0,
                rankLevel: 1,
                referralCode: uuidv4(),
                tokens: 0,
                previouslyAppliedJobs: [],
                recentlyViewedProfileViews: [],
                recentlyViewedProfileIDSOnly: [],
                totalUniqueViews: 0,
                bookmarkedProfiles: [],
                profileLovesHearts: [],
                currentlyFollowedBy: [],
                profilePosts: [],
                stripeAccountDetails: accountData,
                stripeAccountVerified: false
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
                            res.statusCode = 500;
                            res.send(errrrrrrrr);
                          } else {
                            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
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
            
            await stripe.accounts.create({
              type: 'custom',
              country: 'US',
              email: email.toLowerCase().trim(),
              business_type: "individual",
              individual: {
                email: email.toLowerCase().trim(),
                first_name: firstName.toLowerCase().trim(),
                last_name: lastName.toLowerCase().trim()
              },
              capabilities: {
                card_payments: {
                  requested: true
                },
                transfers: {
                  requested: true
                },
              },
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
                  uniqueId: uuidv4(),
                  phoneNumber,
                  registrationDate: new Date(),
                  registrationDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                  completedJobs: 0,
                  reviews: [],
                  referral: newReferralData,
                  fullyVerified: false,
                  identityVerified: false,
                  followingHackers: [],
                  followingCompanies: [],
                  experiencePoints: 0,
                  rankLevel: 1,
                  referralCode: uuidv4(),
                  tokens: 0,
                  previouslyAppliedJobs: [],
                  recentlyViewedProfileViews: [],
                  recentlyViewedProfileIDSOnly: [],
                  totalUniqueViews: 0,
                  bookmarkedProfiles: [],
                  profileLovesHearts: [],
                  currentlyFollowedBy: [],
                  profilePosts: [],
                  stripeAccountDetails: accountData,
                  stripeAccountVerified: false
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
                              res.statusCode = 500;
                              res.send(errrrrrrrr);
                            } else {
                              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
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
        await stripe.accounts.create({
          type: 'custom',
          country: 'US',
          email: email.toLowerCase().trim(),
          business_type: "individual",
          individual: {
            email: email.toLowerCase().trim(),
            first_name: firstName.toLowerCase().trim(),
            last_name: lastName.toLowerCase().trim()
          },
          capabilities: {
            card_payments: {
              requested: true
            },
            transfers: {
              requested: true
            },
          },
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
              uniqueId: uuidv4(),
              phoneNumber,
              registrationDate: new Date(),
              registrationDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
              completedJobs: 0,
              reviews: [],
              referral: null,
              fullyVerified: false,
              identityVerified: false,
              followingHackers: [],
              followingCompanies: [],
              experiencePoints: 0,
              rankLevel: 1,
              referralCode: uuidv4(),
              tokens: 0,
              previouslyAppliedJobs: [],
              recentlyViewedProfileViews: [],
              recentlyViewedProfileIDSOnly: [],
              totalUniqueViews: 0,
              bookmarkedProfiles: [],
              profileLovesHearts: [],
              currentlyFollowedBy: [],
              profilePosts: [],
              stripeAccountDetails: accountData,
              stripeAccountVerified: false
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
                          res.statusCode = 500;
                          res.send(errrrrrrrr);
                        } else {
                          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
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
    }
});

module.exports = router;