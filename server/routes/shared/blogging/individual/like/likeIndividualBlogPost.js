const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');


router.post("/", (req, resppppp, next) => {

    const { blogID, userID, userAccountType, userName } = req.body;

    const collection = Connection.db.db("db").collection("restrictedblogs");

    collection.findOne({ id: blogID }).then((blog) => {
        if (!blog) {
            console.log("blog does NOT exist or could not be found.");

            resppppp.json({
                message: "blog does NOT exist or could not be found."
            })
        } else {
            console.log("blog", blog);

            if (blog.likedBy.some(x => x.viewedBy === userID)) {
                const filtered = blog.likedBy.filter((liked) => {
                    if (liked.viewedBy !== userID) {
                        return true;
                    }
                });
                blog.likes -= 1;

                blog.likedBy = filtered;

                collection.save(blog, (errorrrrr, result) => {
                    if (errorrrrr) {
                        resppppp.json({
                            message: "Error attempting to save new blog-data...",
                            err: errorrrrr
                        })
                    } else {
                        resppppp.json({
                            message: "Removed a like from this post/blog!",
                            blog
                        })
                    }
                })
            } else {
                blog.likes += 1;

                const newUserObj = {
                    id: uuidv4(),
                    viewedBy: userID,
                    viewerName: userName
                }

                blog.likedBy.push(newUserObj);

                collection.save(blog, (errorrrrr, result) => {
                    if (errorrrrr) {
                        resppppp.json({
                            message: "Error attempting to save new blog-data...",
                            err: errorrrrr
                        })
                    } else {
                        resppppp.json({
                            message: "Successfully 'liked' blog!",
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