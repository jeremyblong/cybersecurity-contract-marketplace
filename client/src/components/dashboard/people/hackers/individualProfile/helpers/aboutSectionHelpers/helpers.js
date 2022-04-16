import React, { Fragment } from "react";
import ReactPlayer from "react-player";
import _ from "lodash";
import { Media } from "reactstrap";

const renderPicOrVideoProfileOrNotViewed = (visit) => {
    if (visit.viewerMostRecentProfilePicVideo !== null) {
        if (visit.viewerMostRecentProfilePicVideo.type.includes("image")) {
            return (
                <Fragment>
                    <Media body className="img-60 img-fluid rounded-circle previously-viewed-image-video" alt="follower-picture-video" src={`${process.env.REACT_APP_ASSET_LINK}/${visit.viewerMostRecentProfilePicVideo.link}`} />
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <ReactPlayer width={"60px"} height={"60px"} playing={true} loop={true} controls={false} muted={true} className={"img-60 img-fluid rounded-circle media-body previously-viewed-image-video-video"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${visit.viewerMostRecentProfilePicVideo.link}`} />
                </Fragment>
            );
        }
    } else {
        return (
            <Fragment>
                <Media body className="img-60 img-fluid rounded-circle previously-viewed-image-video" alt="follower-picture-video" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} />
            </Fragment>
        );
    }
} 

const lastRenderPicImageVideo = (last) => {
    if (last !== null) {
        if (last.type.includes("image")) {
            return (
                <Fragment>
                    <Media body className="img-60 img-fluid rounded-circle previously-viewed-image-video" alt="follower-picture-video" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <ReactPlayer width={"60px"} height={"60px"} playing={true} loop={true} controls={false} muted={true} className={"img-60 img-fluid rounded-circle media-body previously-viewed-image-video-video"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                </Fragment>
            );
        }
    } else {
        return (
            <Fragment>
                <Media body className="img-60 img-fluid rounded-circle previously-viewed-image-video" alt="follower-picture-video" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} />
            </Fragment>
        );
    }
}

export default {
    renderPicOrVideoProfileOrNotViewed,
    lastRenderPicImageVideo
};