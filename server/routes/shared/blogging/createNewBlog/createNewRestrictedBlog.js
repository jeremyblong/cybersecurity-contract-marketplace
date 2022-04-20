const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const RestrictedBlogCreation = require("../../../../schemas/blogging/createNewRestrictedBlog.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

router.post("/", (req, resppppp, next) => {
    
    const { 
        title, 
        subtitle,
        description,
        hashtags,
        userID,
        userFullName,
        userAccountType,
        fileLink
    } = req.body;

    const newBlogCreation = new RestrictedBlogCreation({
        id: uuidv4(),
        date: new Date(),
        dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        title,
        subtitle,
        hashtags,
        description,
        posterName: userFullName,
        posterID: userID,
        posterAccountType: userAccountType,
        likedBy: [],
        dislikedBy: [],
        viewedBy: [],
        viewedByList: [],
        totalTipAmount: 0,
        tippedUsers: [],
        comments: [],
        likes: 0,
        dislikes: 0,
        totalViews: 0,
        bookmarks: [],
        purchased: [],
        displayImage: fileLink
    })

    newBlogCreation.save((err, result) => {
        if (err) {
            console.log("errrrrrr saving...:", err);

            resppppp.json({
                message: "An error occurred while attempting to save your blog data..",
                err
            })
        } else {
            console.log("Saved - result!", result);

            resppppp.json({
                message: "Successfully updated/uploaded new blog post!"
            })
        }
    })
});

module.exports = router;