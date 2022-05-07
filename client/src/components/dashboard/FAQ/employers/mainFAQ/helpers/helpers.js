import React from "react";
import { Media } from "reactstrap";
import ReactPlayer from "react-player";
import _ from "lodash";

const renderProfilePicVideo = (last) => {

    if (last !== null && _.has(last, "link")) {
        if (last.type.includes("video")) {
            // video logic
            return (
                <Media className="stretchy-profile-image-vid" body>
                    <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"stretchy-profile-image-vid"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                </Media>
            );
        } else {
            // image logic
            return <Media className="stretchy-profile-image-vid" body alt="profile-picture-sub" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} data-intro="This is Profile image" />;
        }    
    } else {
        // image logic
        return <Media className="stretchy-profile-image-vid" body alt="profile-picture-sub" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} data-intro="This is Profile image" />;
    } 
}

export default {
    renderProfilePicVideo
}