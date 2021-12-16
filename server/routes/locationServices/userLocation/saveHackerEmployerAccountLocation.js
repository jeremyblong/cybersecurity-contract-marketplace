const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");

router.post("/", (req, resppppp, next) => {
    
    const { location, accountType, id } = req.body;

    const collection = Connection.db.db("db").collection(accountType);

    collection.findOneAndUpdate({ uniqueId: id }, { $set: { userLatestLocation: location }}, { returnOriginal: false }, (error, result) => {
        if (error) {
            resppppp.json({
                message: "An error occurred while saving new location data to account...",
                err: error
            })
        } else {
            console.log("result", result);

            resppppp.json({
                message: "Successfully saved location data to account!",
                user: result
            })
        }
    });
});

module.exports = router;