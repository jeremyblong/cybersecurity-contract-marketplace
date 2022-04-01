const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");


router.post("/", async (req, resppppp, next) => {
    
    const { commentText, signedinUserFullName, signedinUserID, blogID, mostRecentProfilePicVideo, signedinAccountType } = req.body;

    const collection = Connection.db.db("db").collection("blogsmains");

    collection.findOne({ id: blogID }).then((blog) => {
        if (!blog) {
            console.log("blog does NOT exist or could not be found.");

            resppppp.json({
                message: "blog does NOT exist or could not be found."
            })
        } else {
            console.log("blog", blog);

            const generatedID = uuidv4();

            const newComment = {
                commentText,
                id: generatedID,
                posterPicOrVideo: mostRecentProfilePicVideo,
                date: new Date(),
                dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                reactions: {
                    partying: 0,
                    screaming: 0,
                    steaming: 0,
                    sunglasses: 0,
                    tearsOfJoy: 0,
                    vomitting: 0
                },
                posterAccountType: signedinAccountType,
                poster: signedinUserID,
                subComments: [],
                posterName: signedinUserFullName,
                alreadyReacted: []
            }

            blog.comments.push(newComment);

            collection.save(blog, (error, result) => {
                if (error) {
                    console.log("error", error);
                } else {
                    console.log("result", result);

                    resppppp.json({
                        message: "Successfully posted comment!",
                        blog
                    })
                }
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