const express = require("express");
const router = express.Router();
const config = require("config");
const _ = require("lodash");
// mongodb
const { Connection } = require("../../../../mongoUtil.js");

router.post("/", (req, resppppp, next) => {
    const { 
        title, 
        firstName, 
        publicEmailAddress, 
        lastName, 
        addressLineOne, 
        addressPostalCode, 
        country, 
        addressCity, 
        aboutMe,
        gender,
        yearsOfExperience,
        birthdate,
        id
    } = req.body;

    console.log("req.body", req.body);

    const collection = Connection.db.db("db").collection("hackers");

    collection.findOne({ uniqueId: id }).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {

            if (typeof title !== "undefined" && title.length > 0) user["title"] = title;
            if (typeof firstName !== "undefined" && firstName.length > 0) user["firstName"] = firstName;
            if (typeof lastName !== "undefined" && lastName.length > 0) user["lastName"] = lastName;
            if (typeof publicEmailAddress !== "undefined" && publicEmailAddress.length > 0) user["publicEmailAddress"] = publicEmailAddress;
            if (typeof aboutMe !== "undefined" && aboutMe.length > 0) user["aboutMe"] = aboutMe;
            if (yearsOfExperience !== null) user["yearsOfExperience"] = yearsOfExperience;
            if (typeof birthdate !== "undefined" && birthdate.length > 0) user["birthdate"] = birthdate;
            if (gender !== null) user["gender"] = gender;

            if (_.has(user, "currentAddress")) {
                user.currentAddress = {
                    addressLineOne: addressLineOne !== null ? addressLineOne : user.addressLineOne,
                    addressCity: addressCity !== null ? addressCity : user.addressCity,  
                    addressPostalCode: addressPostalCode !== null ? addressPostalCode : user.addressPostalCode, 
                    country: country !== null ? country : user.country
                }
            } else {
                user["currentAddress"] = {
                    addressLineOne,
                    addressCity,  
                    addressPostalCode, 
                    country
                }
            }

            collection.save(user, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);

                    resppppp.json({
                        message: "Successfully updated profile data!",
                        user
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