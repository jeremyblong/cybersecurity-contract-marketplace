const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { id } = req.query;

    const collection = Connection.db.db("db").collection("restrictedblogs");

    collection.findOne({ id }).then((blog) => {
        if (!blog) {
            console.log("blog does NOT exist or could not be found.");

            resppppp.json({
                message: "blog does NOT exist or could not be found."
            })
        } else {
            console.log("blog", blog);

            resppppp.json({
                message: "Successfully gathered blog!",
                blog
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