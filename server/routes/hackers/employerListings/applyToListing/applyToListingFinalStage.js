const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

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
    
                resolve();
            }
        });
    });
    // UPDATE HACKER INFORMATION NOW...
    editBothCollectionsPromise.then(() => {
        // update HACKER information
        hackerCollection.findOneAndUpdate({ uniqueId }, { $push: {
            previouslyAppliedJobs: applicationData 
        }}, (err, result) => {
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
                // return json to client
                resppppp.json({
                    message: "Successfully applied to listing/employer & updated your 'hacker' account as well!",
                    applied: result
                })
            }
        });
    })
});

module.exports = router;