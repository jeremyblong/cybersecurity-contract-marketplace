const express = require("express");
const router = express.Router();
const { Connection } = require("../../mongoUtil.js");
const webhookHelper = require("./controllers/webhookController.js");
const transporter = require("../../controllers/nodemailer/transportConfig.js");
const axios = require("axios");
const config = require("config");
const { 
    verificationCompletedHackerEmail, 
    verificationReviewedAndApprovedHacker,
    verificationReviewedAndDeniedHacker
} = require("./emailTemplates/hackers/emails.js");
const {
    verificationCompletedEmployerEmail,
    verificationReviewedAndApprovedEmployer,
    verificationReviewedAndDeniedEmployer
} = require("./emailTemplates/employers/emails.js");

router.post("/", (req, respppppppp, next) => {

    const webhook = webhookHelper.decryptWebhookIfNeeded(req);

    console.log("webhook active/ran in processWebhook helper function: ", webhook);

    const configuration = {
        headers: {
            "X-API-KEY": config.get("passbaseSecretApiKey")
        }
    };

    const passID = webhook.key;

    const hackerCollection = Connection.db.db("db").collection("hackers");
    const employerCollection = Connection.db.db("db").collection("employers");

    const newPromise = new Promise(async (resolve, reject) => {
        const hackerUserMatch = await hackerCollection.findOne({ passbaseIDAccessKey: passID });

        if (hackerUserMatch !== null) {
            resolve(hackerUserMatch.accountType);
        } else {
            const employerUserMatch = await employerCollection.findOne({ passbaseIDAccessKey: passID });

            if (employerUserMatch !== null) {
                resolve(employerUserMatch.accountType);
            } else {
                resolve(null);
            }
        }
    });

    newPromise.then((accountType) => {
        // ~ do something with account type! ~
        console.log("accountType :", accountType);

        if (accountType !== null) {
            axios.get(`https://api.passbase.com/verification/v1/identities/${webhook.key}`, configuration).then(async (res) => {
                console.log("HERE: ", res.data);

                const { owner } = res.data;

                // console.log("owner.email", owner.email);

                switch (webhook.event) {
                    case "VERIFICATION_COMPLETED":
                    // Do logic here for VERIFICATION_COMPLETED event

                        if (accountType === "hackers") {
                            // hacker verification completed!
                            const mailOptions = verificationCompletedHackerEmail(owner.email);
                        
                            await transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    // error
                                    console.log("error!", error);

                                    respppppppp.status(200).json({
                                        message: "Error sending alert email!",
                                        err: error
                                    })
                                } else {
                                    // success
                                    console.log("successfully sent email ! : ", info);
                        
                                    respppppppp.status(200).json({
                                        message: "Success!",
                                        info
                                    })
                                }
                            });
                        } else {
                            // employer logic ONLY. 
                            const mailOptions = verificationCompletedEmployerEmail(owner.email);
                        
                            await transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    // error
                                    console.log("error!", error);

                                    respppppppp.status(200).json({
                                        message: "Error sending alert email!",
                                        err: error
                                    })
                                } else {
                                    // success
                                    console.log("successfully sent email ! : ", info);
                        
                                    respppppppp.status(200).json({
                                        message: "Success!",
                                        info
                                    })
                                }
                            });
                        }
                        break;
                    case "VERIFICATION_REVIEWED":
                        // Do logic here for VERIFICATION_REVIEWED event 
                        if (webhook.status === "approved") {
                            // APPROVED!

                            if (accountType === "hackers") {
                                const mailOptions = verificationReviewedAndApprovedHacker(owner.email);

                                // ~ INSERT AXIOS REQUEST TO FETCH USER BASED ON PASSBASE KEY/ID ~ 
                                axios.post(`${config.get("baseServerURL")}/update/user/fully/verified`, {
                                    passbaseIDAccessKey: webhook.key,
                                    accountType: "hackers"
                                }).then(async (secondResponse) => {
                                    if (secondResponse.data.message === "Successfully updated account!") {
                                        console.log(secondResponse.data);

                                        await transporter.sendMail(mailOptions, (error, info) => {
                                            if (error) {
                                                // error
                                                console.log("error!", error);

                                                respppppppp.status(200).json({
                                                    message: "Error sending alert email to verified user!",
                                                    err: error
                                                })
                                            } else {
                                                // success
                                                console.log("successfully sent email ! : ", info);
                                    
                                                respppppppp.status(200).json({
                                                    message: "Success!",
                                                    info
                                                })
                                            }
                                        });
                                    } else {
                                        console.log("ERROR : ", secondResponse.data);
                                    }
                                }).catch((errrrrrror) => {
                                    console.log(errrrrrror);
                                });
                            } else {
                                const mailOptions = verificationReviewedAndApprovedEmployer(owner.email);

                                // ~ INSERT AXIOS REQUEST TO FETCH USER BASED ON PASSBASE KEY/ID ~ 
                                axios.post(`${config.get("baseServerURL")}/update/user/fully/verified`, {
                                    passbaseIDAccessKey: webhook.key,
                                    accountType: "employers"
                                }).then(async (secondResponse) => {
                                    if (secondResponse.data.message === "Successfully updated account!") {
                                        console.log(secondResponse.data);

                                        await transporter.sendMail(mailOptions, (error, info) => {
                                            if (error) {
                                                // error
                                                console.log("error!", error);

                                                respppppppp.status(200).json({
                                                    message: "Error sending alert email to verified user!",
                                                    err: error
                                                })
                                            } else {
                                                // success
                                                console.log("successfully sent email ! : ", info);
                                    
                                                respppppppp.status(200).json({
                                                    message: "Success!",
                                                    info
                                                })
                                            }
                                        });
                                    } else {
                                        console.log("ERROR : ", secondResponse.data);
                                    }
                                }).catch((errrrrrror) => {
                                    console.log(errrrrrror);
                                });
                            }
                        } else {
                            // DENIED!
                            if (accountType === "hackers") {
                                const mailOptions = verificationReviewedAndDeniedHacker(owner.email);
                            
                                await transporter.sendMail(mailOptions, (error, info) => {
                                        if (error) {
                                            // error
                                            console.log("error!", error);

                                            respppppppp.status(200).json({
                                                message: "Error sending alert email!",
                                                err: error
                                            })
                                        } else {
                                            // success
                                            console.log("successfully sent email ! : ", info);
                                
                                            respppppppp.status(200).json({
                                                message: "Success!",
                                                info
                                            })
                                        }
                                });
                            } else {
                                const mailOptions = verificationReviewedAndDeniedEmployer(owner.email);
                            
                                await transporter.sendMail(mailOptions, (error, info) => {
                                        if (error) {
                                            // error
                                            console.log("error!", error);

                                            respppppppp.status(200).json({
                                                message: "Error sending alert email!",
                                                err: error
                                            })
                                        } else {
                                            // success
                                            console.log("successfully sent email ! : ", info);
                                
                                            respppppppp.status(200).json({
                                                message: "Success!",
                                                info
                                            })
                                        }
                                });
                            }
                        }
                    break;
                    default:
                    console.log("Couldn't process webhook event");
                }
            }).catch((err) => {
                console.log(err);
            });
        } else {
            
        }
    });
});

module.exports = router;