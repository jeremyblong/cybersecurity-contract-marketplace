const express = require("express");
const router = express.Router();
const { SendEmailForgotPasswordWithCode } = require("./helpers/emailTemplate.js");
const transporter = require("../../../../controllers/nodemailer/transportConfig.js");
const { encrypt } = require("../../../../crypto.js");

router.post("/", async (req, res) => {

    const { providedEmail } = req.body;

    const MakeReferralID = (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz23456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    };

    const random12DigitRecoveryCode = MakeReferralID(12);

    const mailOptions = SendEmailForgotPasswordWithCode(random12DigitRecoveryCode, providedEmail);
                                
    await transporter.sendMail(mailOptions, (errrrrrrrror, info) => {
        if (errrrrrrrror) {
            // errrrrrrrror
            console.log("errrrrrrrror!", errrrrrrrror);

            res.json({
                message: "An error occurred while attempting to send email..",
                success: false,
                code: null
            })
        } else {
            // success
            console.log("successfully sent email ! : ", info);

            res.status(200).json({
                message: "Successfully sent recovery email with code!",
                success: true,
                code: encrypt(random12DigitRecoveryCode)
            });
        }
    });
});

module.exports = router;