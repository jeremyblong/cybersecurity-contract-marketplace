const express = require("express");
const router = express.Router();
const config = require("config");
const CreateNewBlog = require("../../../schemas/adminONLY/blogRelated/postNewBlogSchema.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");


router.post("/", (req, resppppp, next) => {

    const { 
        title,
        subtitle,
        body,
        accessCode 
    } = req.body.data;

    const actualKey = config.get("adminUltimatePasswordKey");

    console.log("actualKey", actualKey);

    if (actualKey === accessCode) {
        const newlyCreatedBlog = new CreateNewBlog({
            id: uuidv4(),
            date: new Date(),
            dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
            likedBy: [],
            dislikedBy: [],
            viewedBy: [],
            viewedByList: [],
            comments: [],
            likes: 0,
            dislikes: 0,
            totalViews: 0,
            title,
            subtitle,
            body
        })
    
        newlyCreatedBlog.save((err, result) => {
            if (err) {
                console.log("err: ", err);
    
                resppppp.json({
                    message: "Error occurred while attempting to save new blog data..",
                    err
                })
            } else {
                console.log("result", result);
    
                resppppp.json({
                    message: "Successfully submitted data!",
                    result
                })
            }
        })
    } else {
        resppppp.json({
            message: "Password provided does NOT match system password."
        })
    }
});

module.exports = router;