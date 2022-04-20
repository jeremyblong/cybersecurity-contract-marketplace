import React, { Fragment } from "react";
import { Media } from "reactstrap";
import ReactPlayer from "react-player";
import _ from "lodash";

const renderProfilePicVideo = (last) => {

    if (last !== null && _.has(last, "link")) {
        if (last.type.includes("video")) {
            // video logic
            return (
                <Media className="align-self-center" alt="">
                    <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"align-self-center maxed-out-blogging-creation-comment"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                </Media>
            );
        } else {
            // image logic
            return <Media className="align-self-center" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} alt="" />;
        }    
    } else {
        // image logic
        return <Media className="align-self-center" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} alt="" />;
    } 
}

export default {
    renderProfilePicVideo
}