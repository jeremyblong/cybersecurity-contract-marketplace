import React from "react";
import { Media } from "reactstrap";
import ReactPlayer from "react-player";
import _ from "lodash";


const renderProfilePicVideo = (last) => {

    if (last !== null && _.has(last, "link")) {
        if (last.type.includes("video")) {
            // video logic
            return (
                <Media
                    alt="Gallery"
                    className="img-thumbnail"
                >
                    <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} height={"100%"} className={"following-video-profile"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                </Media>
            );
        } else {
            // image logic
            return <Media
                src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`}
                alt="Gallery"
                className="img-thumbnail"
            />;
        }    
    } else {
        // image logic
        return <Media
            src={process.env.REACT_APP_PLACEHOLDER_IMAGE}
            alt="Gallery"
            className="img-thumbnail"
        />;
    } 
}

export default {
    renderProfilePicVideo
}