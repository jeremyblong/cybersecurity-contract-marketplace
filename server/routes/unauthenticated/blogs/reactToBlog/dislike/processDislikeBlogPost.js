const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");


router.post("/", (req, resppppp, next) => {
    
    const { blogID, signedinUserID, signedinUserFullName } = req.body;

    const collection = Connection.db.db("db").collection("blogsmains");

    collection.findOne({ id: blogID }).then((blog) => {
        if (!blog) {
            console.log("blog does NOT exist or could not be found.");

            resppppp.json({
                message: "blog does NOT exist or could not be found."
            })
        } else {
            console.log("blog", blog);

            const foundIndex = blog.dislikedBy.findIndex((item) => item.reactorID === signedinUserID);

            if (foundIndex !== -1) {
                blog.dislikedBy.splice(foundIndex, 1);
                blog.dislikes -= 1;

                collection.save(blog, (error, result) => {
                    if (error) {
                        console.log("error", error);
                    } else {
                        console.log("result", result);
    
                        resppppp.json({
                            message: "Successfully 'disliked' this blog post!",
                            blog
                        })
                    }
                })
            } else {
                const newdislikedByObj = {
                    id: uuidv4(),
                    date: new Date(),
                    dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                    reactorID: signedinUserID,
                    reactorName: signedinUserFullName
                };
    
                blog.dislikes += 1;
                blog.dislikedBy.push(newdislikedByObj);
    
                collection.save(blog, (error, result) => {
                    if (error) {
                        console.log("error", error);
                    } else {
                        console.log("result", result);
    
                        resppppp.json({
                            message: "Successfully 'disliked' this blog post!",
                            blog
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