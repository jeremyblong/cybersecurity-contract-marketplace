const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const { sendEmailToEmployerNotifyingOfApplicantTemplate } = require("./emailHelpers/emailFormattedHTML.js");
const transporter = require("../../../../controllers/nodemailer/transportConfig.js");
const _ = require("lodash");
const config = require("config");

router.post("/", (req, resppppp, next) => {
    // deconstruct passed data from front-end
    const { uniqueId, employerId, applicationData, employerPostedJobId } = req.body;
    // select employers collection
    const employerCollection = Connection.db.db("db").collection("employers");
    // select hackers collection
    const hackerCollection = Connection.db.db("db").collection("hackers");
    // UPDATE EMPLOYER INFORMATION FIRST...
    const editBothCollectionsPromise = new Promise((resolve, reject) => {
        // update EMPLOYER information
        employerCollection.findOneAndUpdate({ uniqueId: employerId }, { $push: {
            applicants: applicationData 
        }}, (err, result) => {
            if (err) {
                console.log("Err ONE", err);
                
                reject();
            } else {
                console.log("result - success ONE... : ", result);

                const employerEmail = result.value.email;
    
                resolve(employerEmail);
            }
        });
    });
    // UPDATE HACKER INFORMATION NOW...
    editBothCollectionsPromise.then((employerEmail) => {
        // update HACKER information
        hackerCollection.findOneAndUpdate({ uniqueId }, { $push: {
            previouslyAppliedJobs: applicationData 
        }}, async (err, result) => {
            if (err) {
                // IF FAILED update... - remove saved data from first collection update in "employers" account area
                console.log("Err TWO", err);

                employerCollection.findOneAndUpdate({ uniqueId: employerId }, (error, secondInnerResult) => {
                    if (error) {
                        console.log("Error undoing failed action in second attempt of edits (hacker update failed...) :", error);
                        
                        resppppp.json({
                            message: "Error undoing failed action in second attempt of edits (hacker update failed...)",
                            error
                        })
                    } else {
                        console.log("secondInnerResult - UNDID changes to EMPLOYER info... : ", secondInnerResult);
            
                        resppppp.json({
                            message: "Successfully applied to listing/employer & updated your 'hacker' account as well!",
                            applied: result
                        })
                    }
                });
            } else {
                console.log("result - success TWO... : ", result);

                const hackerInfo = result.value;

                const gatherIfPictureExists = _.has(hackerInfo, "profilePicsVideos") && hackerInfo.profilePicsVideos.length > 0 ? hackerInfo.profilePicsVideos : null;
                
                if (gatherIfPictureExists !== null) {
                    const reversed = gatherIfPictureExists.reverse();

                    for (let index = 0; index < reversed.length; index++) {
                        const file = reversed[index];
                        
                        if (!file.type.includes("video")) {
                            // FILE IS NOT a video file --- display and break loop

                            // send email to notifiy employer of NEW applicant/application submitted
                            const mailOptions = sendEmailToEmployerNotifyingOfApplicantTemplate(employerEmail, `${hackerInfo.firstName} ${hackerInfo.lastName}`, `${config.get("assetLink")}/${file.link}`); // placeholder.png
                            // send email finally
                            await transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    // error
                                    console.log("error!", error);

                                    respppppppp.status(400).json({
                                        message: "Error sending alert email!",
                                        err: error
                                    })
                                } else {
                                    // success
                                    console.log("successfully sent email ! : ", info);
                        
                                    // return json to client
                                    resppppp.status(200).json({
                                        message: "Successfully applied to listing/employer & updated your 'hacker' account as well!",
                                        applied: result
                                    })
                                }
                            });

                            break;
                        }
                        // check if on last iteration - already ran image check --- display "stock" photo
                        if ((reversed.length - 1) === index) {
                            // stock photo display
                            
                            // send email to notifiy employer of NEW applicant/application submitted
                            const mailOptions = sendEmailToEmployerNotifyingOfApplicantTemplate(employerEmail, `${hackerInfo.firstName} ${hackerInfo.lastName}`, `${config.get("assetLink")}/placeholder.png`);
                            // send email finally
                            await transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    // error
                                    console.log("error!", error);

                                    respppppppp.status(400).json({
                                        message: "Error sending alert email!",
                                        err: error
                                    })
                                } else {
                                    // success
                                    console.log("successfully sent email ! : ", info);
                        
                                    // return json to client
                                    resppppp.status(200).json({
                                        message: "Successfully applied to listing/employer & updated your 'hacker' account as well!",
                                        applied: result
                                    })
                                }
                            });
                        }
                    }
                } else {
                    // send email to notifiy employer of NEW applicant/application submitted
                    const mailOptions = sendEmailToEmployerNotifyingOfApplicantTemplate(employerEmail, `${hackerInfo.firstName} ${hackerInfo.lastName}`, `${config.get("assetLink")}/placeholder.png`);
                    // send email finally
                    await transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            // error
                            console.log("error!", error);

                            respppppppp.status(400).json({
                                message: "Error sending alert email!",
                                err: error
                            })
                        } else {
                            // success
                            console.log("successfully sent email ! : ", info);

                            // return json to client
                            resppppp.status(200).json({
                                message: "Successfully applied to listing/employer & updated your 'hacker' account as well!",
                                applied: result
                            })
                        }
                    });
                }
            }
        });
    })
});

module.exports = router;