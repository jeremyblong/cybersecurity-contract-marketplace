const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const config = require("config");
const axios = require("axios");

router.get("/", (req, resppppp, next) => {
    
    const { uniqueId, accountType } = req.query;

    const collection = Connection.db.db("db").collection(accountType);

    collection.findOne({ uniqueId }, { fields: {
        activeHiredHackingJobs: 1
    }}).then((mainUser) => {
        if (!mainUser) {
            console.log("Main user does NOT exist or could not be found.");

            resppppp.json({
                message: "Main user does NOT exist or could not be found."
            })
        } else {
            console.log("mainUser", mainUser);

            const promises = [];

            const runEndCheck = (iteration, index) => {
                if (iteration === index) {
                    // resolve and pass response to client-side front-end
                    Promise.all(promises).then((finalData) => {
                        resppppp.json({
                            message: "Successfully gathered active/hired jobs!",
                            listingData: finalData
                        })  
                    }).catch((err) => {
                        console.log("critical promise error...");

                        resppppp.json({
                            message: "Error occurred while attempting to fetch relevant data...",
                            err
                        })  
                    })
                }
            }

            for (let index = 0; index < mainUser.activeHiredHackingJobs.length; index++) {
                const hackerJob = mainUser.activeHiredHackingJobs[index];
                const employerID = hackerJob.employerPosterId;
                // fetch relevant mixed data for employer - heavily restricted data only
                promises.push(new Promise((resolve, reject) => {
                    axios.get(`${config.get("baseServerURL")}/gather/core/employer/data/related/hacking/gig`, {
                        params: {
                            employerID
                        }
                    }).then((response) => {

                        console.log("success response :", response);
                        // check for proper success response message..
                        if (response.data.message === "Successfully gathered core user information!") {
                            const { user } = response.data;
                            // combine data old with new
                            const newToUseData = {
                                ...hackerJob,
                                coreEmployerData: user
                            }
                            // fwd data to promise all resolver
                            resolve(newToUseData);  
                            
                            runEndCheck(mainUser.activeHiredHackingJobs.length - 1, index);
                        } else {
                            reject(null);

                            runEndCheck(mainUser.activeHiredHackingJobs.length - 1, index);
                        }

                    }).catch((err) => {
                        console.log("Err:", err);

                        reject(null);

                        runEndCheck(mainUser.activeHiredHackingJobs.length - 1, index);
                    })
                }))
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