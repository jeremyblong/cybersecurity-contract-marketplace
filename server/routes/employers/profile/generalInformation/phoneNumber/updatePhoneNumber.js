const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");

router.post("/", (req, resppppp, next) => {
    
    const { id, phoneNumber } = req.body;

    console.log("id, phoneNumber", id, phoneNumber);

    const collection = Connection.db.db("db").collection("employers");

    collection.findOneAndUpdate({ uniqueId: id }, { $set: {
        phoneNumber
    }}, { returnOriginal: false }, (err, result) => {
        if (err) {
            console.log(err);

            resppppp.json({
                message: "An error occurred while attempting to update phone number..",
                err
            })
        } else {
            console.log("result", result.value);

            resppppp.json({
                message: "Successfully updated phone number!",
                user: result.value
            })
        }
    });
});

module.exports = router;