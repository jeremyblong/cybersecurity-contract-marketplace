const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { signedinID, accountType, accountSearchableType } = req.query;

    const collection = Connection.db.db("db").collection(accountType);

    collection.findOne({ uniqueId: signedinID }, { fields: { bookmarkedProfiles: 1 }}).then(async (user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");
    
            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            // filter out irrelevant account types
            const filteredAccounts = await user.bookmarkedProfiles.filter((bookmark) => bookmark.accountType === accountSearchableType);
            // if exists - return proper data
            if (filteredAccounts) {
                resppppp.json({
                    message: `Successfully gathered bookmarked ${accountSearchableType} as employer account!`,
                    [accountSearchableType]: filteredAccounts
                })
            }
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