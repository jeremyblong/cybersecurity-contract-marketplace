const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

router.post("/", (req, resppppp, next) => {

    const { blogID, accountType, selectedComment, signedinUserNameFull, signedinLastProfileFile, signedinMemberSince, commentText, signedinUserID } = req.body;

    const generatedID = uuidv4();

    const collection = Connection.db.db("db").collection("restrictedblogs");

    const newComment = {
        commentText,
        id: generatedID,
        posterPicOrVideo: signedinLastProfileFile,
        date: new Date(),
        dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        reactions: {
            partying: 0,
            screaming: 0,
            steaming: 0,
            sunglasses: 0,
            tearsOfJoy: 0,
            vomitting: 0
        },
        posterAccountType: accountType,
        poster: signedinUserID,
        posterName: signedinUserNameFull,
        alreadyReacted: []
    }; // selectedComment

    collection.findOne({ id: blogID }).then((blog) => {
        if (!blog) {
            resppppp.json({
                message: "An error occurred while attempting to gather/modify the related blog data.."
            })
        } else {

            console.log("BLOGGGGGGG", blog);
        
            const findCommentMatch = blog.comments.findIndex((individual) => individual.id === selectedComment.id);

            if (findCommentMatch !== -1) {
                const match = blog.comments[findCommentMatch];

                match.subComments.push(newComment);

                collection.save(blog, (errSaving, result) => {
                    if (errSaving) {
                        console.log("errSaving", errSaving);

                        resppppp.json({
                            message: "An error occurred while attempting to gather/modify the related blog data.."
                        })
                    } else {
                        console.log("result", result);

                        resppppp.json({
                            message: "Successfully left your comment on this blog!",
                            blog
                        })
                    }
                })
            } else {
                resppppp.json({
                    message: "An error occurred while attempting to gather/modify the related blog data.."
                })
            }
        }
    }).catch((err) => {
        console.log("Critical blog err..:", err);
    })
});

module.exports = router;