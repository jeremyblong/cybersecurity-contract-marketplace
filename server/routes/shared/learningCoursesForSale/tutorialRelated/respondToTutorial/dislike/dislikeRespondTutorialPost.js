const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');


router.post("/", (req, resppppp, next) => {
    
    const { signedinUserID, signedinAccountType, tutorialID, fullName } = req.body;

    const collection = Connection.db.db("db").collection("tutorialshorts");

    collection.findOne({ id: tutorialID }).then((tutorial) => {
        if (!tutorial) {
            console.log("tutorial does NOT exist or could not be found.");

            resppppp.json({
                message: "tutorial does NOT exist or could not be found."
            })
        } else {
            console.log("tutorial", tutorial);

            if (tutorial.dislikedBy.some(x => x.viewedBy === signedinUserID)) {
                const filtered = tutorial.dislikedBy.filter((liked) => {
                    if (liked.viewedBy !== signedinUserID) {
                        return true;
                    }
                });
                tutorial.dislikes -= 1;

                tutorial.dislikedBy = filtered;

                collection.save(tutorial, (errorrrrr, result) => {
                    if (errorrrrr) {
                        resppppp.json({
                            message: "Error attempting to save new tutorial-data...",
                            err: errorrrrr
                        })
                    } else {
                        resppppp.json({
                            message: "Removed a dislike from this post/tutorial!",
                            tutorial
                        })
                    }
                })
            } else {
                tutorial.dislikes += 1;

                const newUserObj = {
                    id: uuidv4(),
                    viewedBy: signedinUserID,
                    viewerName: fullName
                }

                tutorial.dislikedBy.push(newUserObj);

                collection.save(tutorial, (errorrrrr, result) => {
                    if (errorrrrr) {
                        resppppp.json({
                            message: "Error attempting to save new tutorial-data...",
                            err: errorrrrr
                        })
                    } else {
                        resppppp.json({
                            message: "Successfully disliked tutorial!",
                            tutorial
                        })
                    }
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