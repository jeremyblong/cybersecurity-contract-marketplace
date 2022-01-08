import React, { Fragment } from "react";
import { Media } from "reactstrap";
import ReactPlayer from "react-player";



const renderProfilePicVideo = (last) => {
    // check conditional item to render whether video or image

    console.log("last", last);

    if (last.type.includes("video")) {
        // video logic
        return (
            <Media className="custom-media-chunk" body>
                <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"profile-picture-account media-body rounded-circle-video-custom"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
            </Media>
        );
    } else {
        // image logic
        return <Media className="rounded-circle" body alt="profile-picture-sub" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} data-intro="This is Profile image" />;
    }   
}
// <Media body className="rounded-circle" src={profilePicture} alt="" />

export default {
    renderProfilePicVideo
}