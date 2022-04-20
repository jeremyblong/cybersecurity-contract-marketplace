const express = require("express");
const router = express.Router();
const config = require("config");
const Client = require('authy-client').Client;
const authy = new Client({ key: config.get("twilioAuthyProductionKey") });

router.post("/", (req, res) => {

    const { formatted, countryCode, authyId } = req.body;

    console.log(formatted, countryCode, authyId);

    if (countryCode === "US") {

        authy.requestSms({ authyId }, { force: true }, (err, smsRes) => {
            if (err) {

                console.log('ERROR requestSms', err);

                res.status(500).json(err);
            }

            console.log("requestSMS response: ", smsRes);

            res.status(200).json({
                message: "Successfully sent code!",
                smsRes
            });
        });
    } else {
        authy.requestSms({ authyId }, { force: true }, (err, smsRes) => {
            if (err) {

                console.log('ERROR requestSms', err);

                res.status(500).json(err);
            }

            console.log("requestSMS response: ", smsRes);

            res.status(200).json({
                message: "Successfully sent code!",
                smsRes
            });
        });
    }
});

module.exports = router;