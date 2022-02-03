import React, { useState, useEffect } from "react";
import { Media } from "reactstrap";
import ReactPlayer from "react-player";
import "../styles.css";

const renderProfilePicVideo = (picOrVideoArray) => {
    // check conditional item to render
    if (typeof picOrVideoArray !== "undefined" && picOrVideoArray.length > 0) {
        // select last element (most recent)
        const last = picOrVideoArray[picOrVideoArray.length - 1];

        if (last.dataType === "video") {
            // video logic
            return (
                <Media className="custom-media-chunk" body>
                    <ReactPlayer playing={true} loop={true} muted={true} width={"300px"} height={"300px"} className={"profile-picture-account media-body"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                </Media>
            );
        } else if (last.dataType === "image") {
            // image logic
            return <Media body alt="profile-picture" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} data-intro="This is Profile image" />;
        }   
    } else {
        return <Media body alt="profile-picture" src={require('../../../../../../../../assets/images/user/7.jpg')} data-intro="This is Profile image" />;
    }
}
const renderProfilePicVideoPost = (picOrVideoArray) => {
    // check conditional item to render
    if (typeof picOrVideoArray !== "undefined" && picOrVideoArray.length > 0) {
        // select last element (most recent)
        const last = picOrVideoArray[picOrVideoArray.length - 1];

        if (last.dataType === "video") {
            // video logic
            return (
                <Media className="rounded-circle image-radius m-r-15">
                    <ReactPlayer playing={true} loop={true} muted={true} width={"58px"} height={"58px"} className={"rounded-circle image-radius m-r-15"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                </Media>
            );
        } else if (last.dataType === "image") {
            // image logic
            return <Media className="rounded-circle image-radius m-r-15" alt="profile-picture" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} data-intro="This is Profile image" />;
        }   
    } else {
        return <Media className="rounded-circle image-radius m-r-15" alt="profile-picture" src={require('../../../../../../../../assets/images/user/7.jpg')} data-intro="This is Profile image" />;
    }
}
const renderCustomCommentImageVideo = (last) => {
    if (last !== null) {
        // check conditional item to render
        if (last.type.includes("video")) {
            // video logic
            return (
                <Media className="img-50 img-fluid m-r-20 rounded-circle min-50-50-video">
                    <ReactPlayer playing={true} loop={true} muted={true} className={"img-50 img-fluid m-r-20 rounded-circle min-50-50-video"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                </Media>
            );
        } else if (last.type.includes("image")) {
            // image logic
            return <Media className="img-50 img-fluid m-r-20 rounded-circle min-50-50-image" alt="comment-pic-video" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} data-intro="This is Profile image" />;
        } 
    } else {
        return <Media className="img-50 img-fluid m-r-20 rounded-circle min-50-50-image" alt="comment-pic-video" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} data-intro="This is Profile image" />;
    }
}
const RenderEmojiLogic = ({ reactions, comments }) => {

    const [emojiData, emojiArrayResponded] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const customEmojiArr = [];

        for (const key in reactions) {
            const element = reactions[key];
            if (element > 0) {
                customEmojiArr.push(key);
            }
        }

        emojiArrayResponded(customEmojiArr);
        setReady(true);
    }, []);

    useEffect( () => () => {
        console.log("reactions update or unmount miscHelpers helpers.js :", reactions, comments);

        const customEmojiArr = [];

        for (const key in reactions) {
            const element = reactions[key];
            if (element > 0) {
                customEmojiArr.push(key);
            }
        }
        console.log("customEmojiArr POSSIBLE Problem --- :", customEmojiArr);

        emojiArrayResponded(customEmojiArr);
    }, [reactions] );

    return (
        <div className={"emoji-already-existant-wrapper-container"}>
            {emojiData.map((reaction) => {
                switch (reaction) {
                    case "partying":
                        return <img src={require("../../../../../../../../assets/gifs/partying.gif")} className={"emoji-already-existant-profile-wall"} />;
                        break;
                    case "screaming":
                        return <img src={require("../../../../../../../../assets/gifs/screaming.gif")} className={"emoji-already-existant-profile-wall"} />;
                        break;
                    case "steaming":
                        return <img src={require("../../../../../../../../assets/gifs/steaming.gif")} className={"emoji-already-existant-profile-wall"} />;
                        break;
                    case "sunglasses":
                        return <img src={require("../../../../../../../../assets/gifs/sunglasses.gif")} className={"emoji-already-existant-profile-wall"} />;
                        break;
                    case "tearsOfJoy":
                        return <img src={require("../../../../../../../../assets/gifs/tearsOfJoy.gif")} className={"emoji-already-existant-profile-wall"} />;
                        break;
                    case "vomitting":
                        return <img src={require("../../../../../../../../assets/gifs/vomitting.gif")} className={"emoji-already-existant-profile-wall"} />;
                        break;
                    default:
                        return null;
                        break;
                }
            })}
        </div>
    );
}

export default {
    renderProfilePicVideo, 
    renderProfilePicVideoPost, 
    renderCustomCommentImageVideo, 
    RenderEmojiLogic
};