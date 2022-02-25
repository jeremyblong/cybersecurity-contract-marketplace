const express = require("express");
const router = express.Router();
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../../../schemas/authentication/authenticate.js");
const passport = require("passport");
const { Connection } = require("../../../mongoUtil.js");
const { decrypt } = require("../../../crypto.js");
const { ObjectID } = require("mongodb");
const { sendAlertUponSuccessfulAuthenticationLogin } = require("./emailAlert/alertViaEmailOfAuth.js");
const transporter = require("../../../controllers/nodemailer/transportConfig.js");

router.post("/", (req, resppppp, next) => {

    passport.authenticate('employers', (err, user, info) => {
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
            
                const collection = Connection.db.db("db").collection("employers");
            
                collection.findOne({ $or: [{
                    username: trimLowercaseIdentifier
                }, {
                    email: trimLowercaseIdentifier
                }]}).then((user) => {
                    if (!user) {
                        resppppp.json({
                            message: "User could NOT be authenticated - make sure you're using a valid email and password combination."
                        })
                    } else {
                        const decrypted = decrypt(user.password);
                    
                        if (((trimLowercaseIdentifier === user.username) || (trimLowercaseIdentifier === user.email)) && (password === decrypted)) {
            
                            const token = getToken({ _id: user._id });
            
                            const refreshToken = getRefreshToken({ _id: user._id });
            
                            user.refreshToken.push({ refreshToken, _id: new ObjectID() });
            
                            collection.save(user, async (err, result) => {
                                if (err) {
                                    console.log(err);
                                } else {

                                    const mailOptions = sendAlertUponSuccessfulAuthenticationLogin(userDeviceData, user.email);
                        
                                    await transporter.sendMail(mailOptions, (errrrrrrrror, info) => {
                                        if (errrrrrrrror) {
                                            // errrrrrrrror
                                            console.log("errrrrrrrror!", errrrrrrrror);

                                            resppppp.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                            
                                            resppppp.json({ success: true, token, message: "Successfully logged in!", data: user });
                                        } else {
                                            // success
                                            console.log("successfully sent email ! : ", info);
                                
                                            resppppp.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                            
                                            resppppp.json({ success: true, token, message: "Successfully logged in!", data: user });
                                        }
                                    });
                                }
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