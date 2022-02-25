const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const _ = require("lodash");
const axios = require("axios");
const config = require("config");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const ArchivedListing = require("../../../../schemas/listings/employer/archive/archiveListingEnding.js");



router.post("/", async (req, resppppp, next) => {
    
    const { 
        applicantID,
        entireApplicantInfo,
        employerID,
        entireEmployerInfo,
        applicantData
    } = req.body;

    const employerCollection = Connection.db.db("db").collection("employers");
    const archivedCollectionListing = await Connection.db.db("db").collection("archivedemployerlistings");

    employerCollection.findOne({ uniqueId: employerID }).then((employer) => {
        if (!employer) {
            console.log("employer does NOT exist or could not be found.");

            resppppp.json({
                message: "employer does NOT exist or could not be found."
            })
        } else {

            const configuration = {
                params: {
                    listingId: applicantData.employerPostedJobId
                }
            }

            const baseURL = config.get("baseServerURL");

            axios.get(`${baseURL}/gather/listing/all/info`, configuration).then((response) => {
                if (response.data.message === "Successfully gathered listing information!") {
                    console.log("response", response.data);

                    const { listing } = response.data;
                    // only one hacker required.
                    if (listing.maxNumberOfApplicants.value === 1) {
                        console.log("PRIMARY CHUNK RAN - ONE HACKER REQUIRED.");

                        // more than one hacker required.
                        const nonRelevantOtherJobApplicants = employer.applicants.filter((applicant) => applicant.employerPostedJobId !== applicantData.employerPostedJobId);
                        // update employer applicant array
                        employer.applicants = nonRelevantOtherJobApplicants;

                        // 1) notify of denial
                        const customPromise = new Promise((resolve, reject) => {
                            // BELOW IS ALL GOOD TO GO!
                            if (typeof nonRelevantOtherJobApplicants !== "undefined" && nonRelevantOtherJobApplicants.length > 0) {
                                for (let index = 0; index < nonRelevantOtherJobApplicants.length; index++) {
                                    const user = nonRelevantOtherJobApplicants[index];
                                    // notify user of denied application
                                    axios.post(`${baseURL}/notify/other/users/denial/application/process`, {
                                        applicantId: user.applicantId,
                                        deniedJobID: user.employerPostedJobId,
                                        publicCompanyName: listing.publicCompanyName,
                                        listingDescription: listing.listingDescription,
                                        employerID
                                    }).then((res) => {
                                        console.log(res.data);
                                        if ((nonRelevantOtherJobApplicants.length - 1) === index) {
                                            resolve();
                                        }
                                    }).catch((err) => {
                                        console.log(err);
    
                                        if ((nonRelevantOtherJobApplicants.length - 1) === index) {
                                            resolve();
                                        }
                                    })
                                }
                            } else {
                                resolve();
                            }
                            // EVERYTHING ABOVE IS ALL GOOD TO GO! ^^^^^^^^^^^^
                        });
                        // 2) remove applicants from array
                        customPromise.then(() => {
                            console.log("RESOLVED!...");

                            // notify WINNER/SELECTED of recent selection or news
                            axios.post(`${baseURL}/notify/other/user/approval/application/process`, {
                                applicantId: applicantID,
                                acceptedJobID: applicantData.employerPostedJobId,
                                publicCompanyName: listing.publicCompanyName,
                                listingDescription: listing.listingDescription,
                                employerID,
                                applicantData
                            }).then((res) => {
                                console.log(res.data);

                                const newEmployerJob = {
                                    ...applicantData,
                                    id: uuidv4(),
                                    date: new Date(),
                                    dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a")
                                };

                                // add PICKED hacker to active-hired applicants
                                if (_.has(employer, "activeHiredHackers")) {
                                    employer.activeHiredHackers.push(newEmployerJob);
                                } else {
                                    employer["activeHiredHackers"] = [newEmployerJob];
                                }
                                
                                // save edited data...
                                employerCollection.save(employer, async (savingError, result) => {
                                    if (savingError) {
                                        console.log("savingError", savingError);

                                        resppppp.json({
                                            message: "Error notifiying user of 'acceptance' and selection of application process...",
                                            err: savingError
                                        })
                                    } else {

                                        if (archivedCollectionListing === null) {

                                            console.log("NOT archived - archive listing!");

                                            const newArchivedListing = new ArchivedListing(listing);

                                            newArchivedListing.save((errrrrrrrrr, completed) => {
                                                if (errrrrrrrrr) {
                                                    console.log(errrrrrrrrr);

                                                    resppppp.json({
                                                        message: "Critical error occurred while attempting to save/archive data...",
                                                        err: errrrrrrrrr
                                                    })
                                                } else {
                                                    resppppp.json({
                                                        message: "Successfully hired applicant for position/listing!",
                                                        result
                                                    });
                                                }
                                            })
                                        } else {
                                            console.log("already archived - do nothing!");

                                            resppppp.json({
                                                message: "Successfully hired applicant for position/listing!",
                                                result
                                            });
                                        }
                                    }
                                })
                            }).catch((err) => {
                                console.log(err);
                            })
                        });
                    } else {
                        // more than one hacker required.
                        console.log("ELSE RAN - MORE THAN ONE (1) HACKER REQUIRED.");
                        // filter out SELECTED hacker
                        const nonRelevantOtherJobApplicants = employer.applicants.filter((applicant) => applicant.applicantId !== applicantData.applicantId);
                        // update employer applicant array with ALL applicants EXCEPT selected applicant
                        employer.applicants = nonRelevantOtherJobApplicants;

                        // 1) notify of denial
                        const customPromise = new Promise((resolve, reject) => {
                            // notify WINNER/SELECTED of recent selection or news
                            axios.post(`${config.get("baseServerURL")}/notify/other/user/approval/application/process`, {
                                applicantId: applicantID,
                                acceptedJobID: applicantData.employerPostedJobId,
                                publicCompanyName: listing.publicCompanyName,
                                listingDescription: listing.listingDescription,
                                employerID,
                                applicantData,
                                listingInfo: listing
                            }).then((res) => {
                                console.log(res.data);

                                const newEmployerJob = {
                                    id: uuidv4(),
                                    date: new Date(),
                                    dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                                    employerPostedListingInfo: {
                                        ...listing
                                    },
                                    ...applicantData,
                                    hired: true
                                };

                                // add PICKED hacker to active-hired applicants
                                if (_.has(employer, "activeHiredHackers")) {
                                    employer.activeHiredHackers.push(newEmployerJob);

                                    resolve();
                                } else {
                                    employer["activeHiredHackers"] = [newEmployerJob];

                                    resolve();
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        })
                        // 2) remove applicants from array
                        customPromise.then((passed) => {

                            const deducted = listing.maxNumberOfApplicants.value - 1;

                            const newMaxNumberOfApplicantsObj = {
                                label: `${deducted} Hackers`,
                                value: deducted
                            }

                            const configured = {
                                listingId: applicantData.employerPostedJobId,
                                newMaxNumberOfApplicantsObj,
                                applicantID
                            }

                            axios.post(`${baseURL}/gather/listing/all/info/deduct/one/count`, configured).then((responseeee) => {
                                if (responseeee.data.message === "Successfully modified existing listing document and reduced one from hacker required count!") {
                                    console.log("responseeee.data reduced hacker count successfully: ", responseeee.data);

                                    // save edited data...
                                    employerCollection.save(employer, async (savingError, result) => {
                                        if (savingError) {
                                            console.log("savingError", savingError);

                                            resppppp.json({
                                                message: "Error notifiying user of 'acceptance' and selection of application process...",
                                                err: savingError
                                            })
                                        } else {

                                            if (archivedCollectionListing === null) {

                                                console.log("NOT archived - archive listing!");

                                                const newArchivedListing = new ArchivedListing(listing);

                                                newArchivedListing.save((errrrrrrrrr, completed) => {
                                                    if (errrrrrrrrr) {
                                                        console.log(errrrrrrrrr);

                                                        resppppp.json({
                                                            message: "Critical error occurred while attempting to save/archive data...",
                                                            err: errrrrrrrrr
                                                        })
                                                    } else {
                                                        resppppp.json({
                                                            message: "Successfully hired applicant for position/listing!",
                                                            result
                                                        });
                                                    }
                                                })
                                            } else {
                                                console.log("already archived - do nothing!");

                                                resppppp.json({
                                                    message: "Successfully hired applicant for position/listing!",
                                                    result
                                                });
                                            }
                                        }
                                    })
                                } else {
                                    console.log("error occurred while reducing listing required count:", responseeee.data);
                                }
                            }).catch((errorrrrr) => {
                                console.log("critical error modifying listing required count...: ", errorrrrr);
                            })
                        });
                    }
                } else {
                    console.log("response errrrrrrr:", response.data);

                    resppppp.json({
                        message: "Critical error occurred while trying to update data/settings - contact support."
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
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