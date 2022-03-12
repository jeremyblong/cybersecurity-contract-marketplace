import React, { Fragment } from "react";
import { Media } from "reactstrap";
import ReactPlayer from "react-player";
import _ from "lodash";

const renderProfilePicVideoSmallRounded = (last) => {
    if (last !== null && _.has(last, "link")) {
        if (last.type.includes("video")) {
            // video logic
            return (
                <Media className="rounded-circle image-radius m-r-15 maxed-img-video-rounded-custom" body>
                    <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"maxed-img-video-rounded-custom"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                </Media>
            );
        } else {
            // image logic
            return <Media className="rounded-circle image-radius m-r-15 maxed-img-video-rounded-custom" body alt="profile-picture-sub" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} data-intro="This is Profile image" />;
        }  
    } else {
        // image logic
        return <Media className="rounded-circle image-radius m-r-15 maxed-img-video-rounded-custom" body alt="profile-picture-sub" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} data-intro="This is Profile image" />;
    } 
}

const renderProfilePicVideo = (last) => {
    // check conditional item to render whether video or image

    if (last !== null && _.has(last, "link")) {
        if (last.type.includes("video")) {
            // video logic
            return (
                <Media className="custom-media-chunk" body>
                    <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"profile-picture-account media-body rounded-circle-video-custom employer-profile-designed"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                </Media>
            );
        } else {
            // image logic
            return <Media className="rounded-circle maxed-out-rounded-circle employer-profile-designed" body alt="profile-picture-sub" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} data-intro="This is Profile image" />;
        }  
    } else {
        // image logic
        return <Media className="rounded-circle maxed-out-rounded-circle employer-profile-designed" body alt="profile-picture-sub" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} data-intro="This is Profile image" />;
    } 
}
const renderPicVideoPlaceholder = (last) => {
    if (last !== null && _.has(last, "link")) {
        if (last.type.includes("video")) {
            // video logic
            return (
                <Media className="img-fluid" body>
                    <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"img-fluid"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                </Media>
            );
        } else {
            // image logic
            return <Media className="img-fluid" body alt="profile-picture-sub" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} data-intro="This is Profile image" />;
        }  
    } else {
        // image logic
        return <Media className="img-fluid" body alt="profile-picture-sub" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} data-intro="This is Profile image" />;
    } 
}
const renderProfilePicVideoGallery = (last, setPhotoIndex, photoIndex, index) => {
    // check conditional item to render whether video or image

    if (last !== null && _.has(last, "link")) {
        if (last.type.includes("video")) {
            // video logic
            return (
                <Media onClick={() =>
                    setPhotoIndex({ ...photoIndex, index, isOpen: true })
                } className="img-thumbnail min-img-thumbnail-employer-profile centered-both-ways" body>
                    <ReactPlayer playing={true} loop={true} muted={true} height={"100%"} width={"100%"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                </Media>
            );
        } else {
            // image logic
            return <Media onClick={() =>
                setPhotoIndex({ ...photoIndex, index, isOpen: true })
            } className="img-thumbnail min-img-thumbnail-employer-profile" body alt="Gallery" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} data-intro="This is Profile image" />;
        }  
    } else {
        // image logic
        return <Media onClick={() =>
            setPhotoIndex({ ...photoIndex, index, isOpen: true })
        } className="img-thumbnail min-img-thumbnail-employer-profile" body alt="Gallery" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} data-intro="This is Profile image" />;
    } 
}
const renderProfilePicVideoGallerySubbed = (last, setPhotoIndex, photoIndex, index) => {
    // check conditional item to render whether video or image

    if (last !== null && _.has(last, "link")) {
        if (last.type.includes("video")) {
            // video logic
            return (
                <li className="latest-post">
                    <Media className="img-fluid maxed-out-display-list" body>
                        <ReactPlayer playing={true} loop={true} muted={true} height={"100%"} width={"100%"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                    </Media>
                </li>
            );
        } else {
            // image logic
            return (
                <Fragment>
                    <li className="latest-post">
                        <Media className="img-fluid maxed-out-display-list" body src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                    </li>
                </Fragment>
            )
        }  
    } else {
        // image logic
        return (
            <Fragment>
                <li className="latest-post">
                    <Media className="img-fluid maxed-out-display-list" body src={process.env.REACT_APP_PLACEHOLDER_IMAGE} />
                </li>
            </Fragment>
        );
    } 
}

export default {
    renderProfilePicVideo,
    renderProfilePicVideoGallery,
    renderPicVideoPlaceholder,
    renderProfilePicVideoSmallRounded,
    renderProfilePicVideoGallerySubbed
}