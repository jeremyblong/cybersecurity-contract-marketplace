const express = require("express");
const router = express.Router();
const { encrypt, decrypt } = require("../../../../../crypto.js");
const { Connection } = require("../../../../../mongoUtil.js");


router.post("/", async (req, res) => {

    const { code, returnedCode, newPassword, providedEmail } = req.body;

    const decryped = decrypt(returnedCode);

    const email = providedEmail.toLowerCase().trim();

    if (code === decryped) {

        const employerCollection = Connection.db.db("db").collection("employers");
        const hackerCollection = Connection.db.db("db").collection("hackers");

        const hackerMatchEmailLocate = await hackerCollection.findOne({ email });
        const employerMatchEmailLocate = await employerCollection.findOne({ email });

        if (hackerMatchEmailLocate !== null) {

            const encryptedNewPass = encrypt(newPassword);

            hackerMatchEmailLocate["password"] = encryptedNewPass;

            hackerCollection.save(hackerMatchEmailLocate, (errSaving, successSaving) => {
                if (errSaving) {
                    console.log("errSaving", errSaving);

                    res.status(401).json({
                        message: "An unknown error has occurred - no action taken!",
                        success: false
                    });
                } else {
                    console.log("successSaving", successSaving);

                    res.status(200).json({
                        message: "Successfully set your new password!",
                        success: true
                    });
                }
            })

        } else if (employerMatchEmailLocate !== null) {


            const encryptedNewPass = encrypt(newPassword);

            employerMatchEmailLocate["password"] = encryptedNewPass;

            employerCollection.save(employerMatchEmailLocate, (errSaving, successSaving) => {
                if (errSaving) {
                    console.log("errSaving", errSaving);

                    res.status(401).json({
                        message: "An unknown error has occurred - no action taken!",
                        success: false
                    });
                } else {
                    console.log("successSaving", successSaving);

                    res.status(200).json({
                        message: "Successfully set your new password!",
                        success: true
                    });
                }
            })
        } else {
            res.status(401).json({
                message: "An unknown error has occurred - no action taken!",
                success: false
            });
        }
    } else {
        res.status(200).json({
            message: "Password could NOT be properly set!",
            success: false
        });
    }
});

module.exports = router;