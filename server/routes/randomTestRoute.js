const express = require("express");
const router = express.Router();
const { Connection } = require("../mongoUtil.js");

router.post("/", async (req, res, next) => {
    
    // const { passbaseIDAccessKey } = req.body;

    const hackerCollection = Connection.db.db("db").collection("hackers");
    const employerCollection = Connection.db.db("db").collection("employers");

    const newPromise = new Promise((resolve, reject) => {
        const hackerUserMatch = await hackerCollection.findOne({ passbaseIDAccessKey: "aef0baa4-09c0-416a-8bb8-e21540e5f1d223747234" });

        if (hackerUserMatch !== null) {
            resolve(hackerUserMatch.accountType);
        } else {
            const employerUserMatch = await employerCollection.findOne({ passbaseIDAccessKey: "aef0baa4-09c0-416a-8bb8-e21540e5f1d223747234" });

            resolve(employerUserMatch.accountType);
        }
    });

    newPromise.then((accountType) => {
        // ~ do something with account type! ~
        console.log("accountType :", accountType);
    });
});

module.exports = router;

// 16ba2d75-4cb7-4ab7-bc83-03cf7baf00fd