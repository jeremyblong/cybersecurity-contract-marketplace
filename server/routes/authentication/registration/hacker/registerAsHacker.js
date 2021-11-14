const express = require("express");
const router = express.Router();
const User = require("../../../../schemas/authentication/register.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

router.post("/", (req, res) => {
    const { 
        firstName, 
        lastName, 
        email, 
        username, 
        password, 
        agreement 
    } = req.body;

    const newUserRegister = new User({
        firstName: firstName.toLowerCase().trim(), 
        lastName: lastName.toLowerCase().trim(), 
        email: email.toLowerCase().trim(), 
        username: username.toLowerCase().trim(), 
        password: password.trim(), 
        agreement,
        uniqueId: uuidv4(),
        registrationDate: new Date(),
        registrationDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        completedJobs: 0,
        reviews: [],
        fullyVerified: false,
        identityVerified: false,
        followingHackers: [],
        followingCompanies: []
    })

    newUserRegister.save((err, data) => {
        if (err) {
            res.json({
                message: "Error saving user information",
                err
            })
        } else {
            res.json({
                message: "Successfully registered!",
                data
            }) 
        }
    })
});

module.exports = router;