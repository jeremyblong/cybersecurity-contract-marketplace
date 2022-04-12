const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));
const _ = require("lodash");
const moment = require("moment");

router.post("/", (req, resppppp, next) => {
    
    const { signedinUserID, signedinAccountType, tutorialID, fullName, tipAmount } = req.body;

    const collection = Connection.db.db("db").collection("tutorialshorts");

    collection.findOne({ id: tutorialID }).then(async (tutorial) => {
        if (!tutorial) {
            console.log("tutorial does NOT exist or could not be found.");

            resppppp.json({
                message: "tutorial does NOT exist or could not be found."
            })
        } else {

            const signedinCollection = Connection.db.db("db").collection(signedinAccountType);
            const tutorialResults = Connection.db.db("db").collection("hackers");

            const signedinResults = await signedinCollection.findOne({ uniqueId: signedinUserID });
            const tutorialAccount = await tutorialResults.findOne({ uniqueId: tutorial.posterID });

            const price = (tipAmount * 100);

            if (signedinResults !== null && tutorialAccount !== null) {

                await stripe.charges.create({
                    amount: price,
                    currency: 'usd',
                    description: `You've successfully 'tipped' this user for their tutorial video on our ${config.get("applicationName")} platform!`,
                    source: signedinResults.stripeAccountDetails.id
                }, async (err, charge) => {

                    if (err) {
                        console.log("err", err);

                        resppppp.json({
                            message: "An error occurred while processing your payment for this request..",
                            err
                        })
                    } else {

                        const transfer = await stripe.transfers.create({
                            amount: Number((price * config.get("percentageCut"))).toFixed(0),
                            currency: 'usd',
                            destination: tutorialAccount.stripeAccountDetails.id
                        });

                        if (transfer) {
                            const newNotification = {
                                title: `You've recieved a new 'tip amount' for a tutorial video you've posted in the amount of $${(Number((price * config.get("percentageCut"))).toFixed(0) / 100)}!`,
                                description: `Someone viewed your tutorial and really liked the content so they decided to 'tip' you for your knowledge & hard work creating such videos. You've been credited approx. $${(Number((price * config.get("percentageCut"))).toFixed(0) / 100)} to your account as of immediately!`,
                                metadata: {
                                    attachments: {
                                        data: {
                                            tutorialID
                                        },
                                        type: null,
                                        attachment: null
                                    },
                                    from: signedinUserID,
                                    other: null
                                },
                                id: uuidv4(),
                                date: new Date(),
                                dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                                seenRead: false
                            };

                            if (_.has(tutorialAccount, "notifications")) {
                                tutorialAccount.notifications.push(newNotification);
                            } else {
                                tutorialAccount["notifications"] = [newNotification];
                            }

                            tutorialResults.save(tutorialAccount, (errSaving, savedSuccess) => {
                                if (errSaving) {
                                    console.log("errSaving", errSaving);

                                    resppppp.json({
                                        message: "An error occurred while processing second & final payment request..",
                                        err: errSaving
                                    })
                                } else {
                                    
                                    tutorial.totalTipAmount += (Number(price).toFixed(0) / 100);

                                    collection.save(tutorial, (innerErrorSaving, savedSuccessInner) => {
                                        if (innerErrorSaving) {
                                            console.log("innerErrorSaving", innerErrorSaving);
                                        } else {
                                            console.log("savedSuccessInner", savedSuccessInner);

                                            resppppp.json({
                                                message: "Successfully tipped tutorial user!",
                                                tutorial,
                                                amount: (Number((price * config.get("percentageCut"))).toFixed(0) / 100)
                                            })
                                        }
                                    })
                                }
                            })
                        } else {

                            const refund = await stripe.refunds.create({
                                charge: charge.id,
                            });

                            if (refund) {
                                resppppp.json({
                                    message: "An error occurred while processing second & final payment request.."
                                })
                            } else {
                                resppppp.json({
                                    message: "An error occurred while processing second & final payment request, a REFUND WAS ISSUED!"
                                })
                            }
                        }
                    }
                });
            } else {
                resppppp.json({
                    message: "An error occurred while processing your request.."
                })
            }
        }
    }).catch((err) => {
        console.log(err);

        resppppp.json({
            message: "Unknown error.",
            err
        })
    })
});

module.exports = router;