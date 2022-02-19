import React, { Fragment } from "react";
import ReactPlayer from "react-player";
import { Media } from "reactstrap";
import _ from "lodash";
import axios from "axios";
import "./styles.css";
import { NotificationManager } from "react-notifications";


const renderSignedinUserPicVideo = (file) => {
    if (file !== null && _.has(file, "link")) {
        if (file.type.includes("video")) {
            // video logic
            return (
                <Media className="forum-video-wrapper-signedin">
                    <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"media-body img-50 img-fluid m-r-20 rounded-circle force-rounded-file-forum"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} />
                </Media>
            );
        } else {
            // image logic
            return <Media className="img-50 img-fluid m-r-20 rounded-circle force-rounded-file-forum" body alt="profile-picture-sub" src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} data-intro="This is Profile image" />;
        }    
    } else {
        // image logic
        return <Media className="img-50 img-fluid m-r-20 rounded-circle force-rounded-file-forum" body alt="profile-picture-sub" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} data-intro="This is Profile image" />;
    } 
}
const renderPicVideoComment = (file) => {
    if (file !== null && _.has(file, "link")) {
        if (file.type.includes("video")) {
            // video logic
            return (
                <Media className="forum-video-wrapper-signedin">
                    <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"media-body img-50 img-fluid m-r-20 rounded-circle force-rounded-file-forum-second"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} />
                </Media>
            );
        } else {
            // image logic
            return <Media className="img-50 img-fluid m-r-20 rounded-circle force-rounded-file-forum-second" body alt="profile-picture-sub" src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} data-intro="This is Profile image" />;
        }    
    } else {
        // image logic
        return <Media className="img-50 img-fluid m-r-20 rounded-circle force-rounded-file-forum-second" body alt="profile-picture-sub" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} data-intro="This is Profile image" />;
    };
}
const addNewComment = (commentText, setCommentText, subthreadID, setComments, poster, userData) => {
    const configuration = {
        subthreadID: subthreadID, 
        commentText,
        subthreadPosterID: poster,
        signedinUserID: userData.uniqueId,
        signedinAccountType: userData.accountType
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}/post/new/comment/forums/subthread/subcomment`, configuration).then((res) => {
        if (res.data.message === "Successfully posted a new comment on subthread!") {
            console.log(res.data);

            const { comments } = res.data;

            setComments(comments);
            setCommentText("");

            NotificationManager.success("We've successfully updated this forum post and added your comment & it is now live/public! Check back often to see any breaking changes or check your notifications!", "Successfully posted your comment!", 4750);
        } else {
            console.log("errr inside...:", res.data);

            NotificationManager.error("An unknown error occurred while attempting to post your new comment, contact support if this problem persists or try commenting again...", "Unknown error occurred while trying to post new comment!", 4750);
        }
    }).catch((err) => {
        console.log(err);

        NotificationManager.error("An unknown error occurred while attempting to post your new comment, contact support if this problem persists or try commenting again...", "Unknown error occurred while trying to post new comment!", 4750);
    })
}
export default {
    renderSignedinUserPicVideo,
    addNewComment,
    renderPicVideoComment
};