const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const { InviteBetaCustomEmailTemplate } = require("./emailHelpers/emailTemplateBetaInvite.js");
const transporter = require("../../../../controllers/nodemailer/transportConfig.js");
const { v4: uuidv4 } = require('uuid');
const { decrypt } = require("../../../../crypto.js");

router.post("/", async (req, resppppp, next) => {
    
    const { inviterUsername, selectedOption, inviterUniqueId, inviterAccountType, inviterFullName, selectedAccountType, selectedUserEmail, selectedUserFullname } = req.body;

    const decrypted = decrypt(selectedOption.value.referralID);

    console.log("decrypted", decrypted);

    console.log("reqqqqqqqqq", req.body);

    const collection = Connection.db.db("db").collection(inviterAccountType);
    // const betaCollection  = Connection.db.db("db").collection("betatesters");

    collection.findOne({ uniqueId: inviterUniqueId }).then(async (user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            const inviteData = {
                inviterUsername, 
                inviterFullName, 
                selectedAccountType, 
                selectedUserEmail: selectedOption.value.email, 
                selectedUserFullname: selectedOption.value.fullName,
                invitationID: decrypted
            }

            const mailOptions = InviteBetaCustomEmailTemplate(inviteData, user);
                                
            await transporter.sendMail(mailOptions, (errrrrrrrror, info) => {
                if (errrrrrrrror) {
                    // errrrrrrrror
                    console.log("errrrrrrrror!", errrrrrrrror);

                    resppppp.json({
                        message: "An error occurred while attempting to send email..",
                        err: errrrrrrrror
                    })
                } else {
                    // success
                    console.log("successfully sent email ! : ", info);

                    resppppp.json({
                        message: "Invited beta user successfully!",
                        info
                    })
                }
            });
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