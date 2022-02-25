const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const axios = require("axios");
const config = require("config");
const CreateNewForumCommunity = require("../../../../schemas/forumRelated/createNewCommunity.js");
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');


router.post("/", (req, resppppp, next) => {
    
    const { id, selectedUsers, accountType, communityName, groupVisibility, selectedPicture } = req.body;

    const collection = Connection.db.db("db").collection(accountType);

    collection.findOne({ uniqueId: id }).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            const promises = [];

            for (let index = 0; index < selectedUsers.length; index++) {
                const selected = selectedUsers[index];
                
                promises.push(new Promise((resolve, reject) => axios.post(`${config.get("baseServerURL")}/send/invite/join/community/forum`, {
                    id: selected.uniqueId,
                    accountType: selected.accountType,
                    fullName: `${selected.firstName} ${selected.lastName}`,
                    from: id,
                    communityName
                }).then((res) => {
                    console.log("res.data", res.data);

                    resolve();

                }).catch((err) => {
                    console.log(err);

                    reject(err);
                })));
            }

            Promise.all(promises).then((resolved) => {
                console.log("resolved", resolved);
                
                const newCommunity = new CreateNewForumCommunity({
                    id: uuidv4(),
                    date: new Date(),
                    dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                    communityName,
                    groupVisibility,
                    members: [{
                        userID: id,
                        accountType,
                        id: uuidv4(),
                        date: new Date()
                    }],
                    subthreads: [],
                    likes: 0,
                    dislikes: 0,
                    reactionsToCommunity: {
                        partying: 0,
                        screaming: 0,
                        steaming: 0,
                        sunglasses: 0,
                        tearsOfJoy: 0,
                        vomitting: 0
                    },
                    communityManagers: [{
                        userID: id,
                        accountType,
                        id: uuidv4(),
                        date: new Date()
                    }],
                    communityModerators: [{
                        userID: id,
                        accountType,
                        id: uuidv4(),
                        date: new Date()
                    }],
                    mainAdmin: id,
                    communityMainPic: selectedPicture
                })

                newCommunity.save((errrrrrrr, result) => {
                    if (errrrrrrr) {
                        console.log(errrrrrrr);

                        resppppp.json({
                            message: "Error saving new user data...",
                            err: errrrrrrr
                        })
                    } else {
                        console.log("Result.......:", result);

                        resppppp.json({
                            message: "Successfully updated relevant information!",
                            community: result
                        })
                    }
                })
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