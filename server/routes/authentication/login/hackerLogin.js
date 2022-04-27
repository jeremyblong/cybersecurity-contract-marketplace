const express = require("express");
const router = express.Router();
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../../../schemas/authentication/authenticate.js");
const passport = require("passport");
const { Connection } = require("../../../mongoUtil.js");
const { decrypt } = require("../../../crypto.js");
const { ObjectID } = require("mongodb");
const { sendAlertUponSuccessfulAuthenticationLogin } = require("./emailAlert/alertViaEmailOfAuth.js");
const transporter = require("../../../controllers/nodemailer/transportConfig.js");
const axios = require("axios");
const config = require("config");



router.post("/", (req, resppppp, next) => {
    passport.authenticate('hackers', (err, user, info) => {
        if (err) { 
            resppppp.json({
                message: "User could NOT be authenticated - make sure you're using a valid email and password combination."
            })
        } else {
            if (!user) {
                resppppp.json({
                    message: "User could NOT be authenticated - make sure you're using a valid email and password combination."
                })
            } else {
                const { 
                    password,
                    usernameOrEmail,
                    userDeviceData
                } = req.body;
            
                const trimLowercaseIdentifier = usernameOrEmail.toLowerCase().trim();
            
                const collection = Connection.db.db("db").collection("hackers");
            
                collection.findOne({ $or: [{
                    username: trimLowercaseIdentifier
                }, {
                    email: trimLowercaseIdentifier
                }]}).then((user) => {
                    if (!user) {
                        resppppp.json({
                            message: "User could NOT be authenticated - make sure you're using a valid email and password combination."
                        });
                    } else {
                        const decrypted = decrypt(user.password);

                        const configuration = {
                            formatted: user.phoneNumber, 
                            countryCode: "US",
                            authyId: user.authyId
                        }

                        if (((trimLowercaseIdentifier === user.username) || (trimLowercaseIdentifier === user.email)) && (password === decrypted)) {
            
                            axios.post(`${config.get("baseServerURL")}/twilio/send/code`, configuration).then((responseeeee) => {
                                if (responseeeee.data.message === "Successfully sent code!") {
                                    console.log("successfully sent message to cell phone!");
    
                                    const token = getToken({ _id: user._id });
                        
                                    const refreshToken = getRefreshToken({ _id: user._id });
                    
                                    user.refreshToken.push({ refreshToken, _id: new ObjectID() });
                    
                                    collection.save(user, async (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log("Successfully saved...!", result);
        
                                            const mailOptions = sendAlertUponSuccessfulAuthenticationLogin(userDeviceData, user.email);
                                
                                            await transporter.sendMail(mailOptions, (errrrrrrrror, info) => {
                                                if (errrrrrrrror) {
                                                    // errrrrrrrror
                                                    console.log("errrrrrrrror!", errrrrrrrror);
        
                                                    resppppp.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                                    
                                                    resppppp.send({ success: true, token, message: "Successfully logged in!", data: user });
                                                } else {
                                                    // success
                                                    console.log("successfully sent email ! : ", info);
                                        
                                                    resppppp.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                                    
                                                    resppppp.send({ success: true, token, message: "Successfully logged in!", data: user });
                                                }
                                            });
                                        }
                                    })
                                } else {
                                    console.log("Failed to send code to phone/cell-device...", responseeeee.data);
    
                                    resppppp.json({
                                        message: "User could NOT be authenticated - make sure you're using a valid email and password combination.",
                                        err: errrrrrror
                                    })
                                }
                            }).catch((errrrrrror) => {
                                console.log("errrrrrror", errrrrrror);
    
                                resppppp.json({
                                    message: "User could NOT be authenticated - make sure you're using a valid email and password combination.",
                                    err: errrrrrror
                                })
                            })
                        } else {
                            resppppp.json({
                                message: "User could NOT be authenticated - make sure you're using a valid email and password combination."
                            })
                        }
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    })(req, resppppp, next);
})

module.exports = router;