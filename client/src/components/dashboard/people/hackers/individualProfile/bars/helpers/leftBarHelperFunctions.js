import React, { Fragment } from "react";
import ReactPlayer from "react-player";
import _ from "lodash";
import "./styles.css";
import { Card, Media } from "reactstrap";

const renderPictureOrVideoContentBreakBlock = (file) => {
    if (file !== null && _.has(file, "link")) {
        if (file.type.includes("video")) {
            // video logic
            return (
                <Fragment>
                    <Card className={"add-shadow-general-card-profile"}>
                        <ReactPlayer playing={true} loop={true} controls={false} muted={false} width={"100%"} className={"img-fluid"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} />
                    </Card>
                </Fragment>
            );
        } else {
            // image logic
            return (
                <Fragment>
                    <Card className={"add-shadow-general-card-profile"}>
                        <Media className="img-fluid" src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} alt="" />
                    </Card>
                </Fragment>
            );
        }  
    } else {
        // image logic - DEFAULT.
        return (
            <Fragment>
                <Card className={"add-shadow-general-card-profile"}>
                    <Media className="img-fluid" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} alt="" />
                </Card>
            </Fragment>
        );
    } 
}

const renderPicOrVideoProfileOrNot = (visit) => {
    if (visit.viewerMostRecentProfilePicVideo !== null) {
        if (visit.viewerMostRecentProfilePicVideo.type.includes("image")) {
            return (
                <Fragment>
                    <img  className="img-50 rounded-circle m-r-15" src={`${process.env.REACT_APP_ASSET_LINK}/${visit.viewerMostRecentProfilePicVideo.link}`} alt="twoImg" />
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <ReactPlayer playing={true} loop={true} controls={false} muted={true} width={"50px"} height={"50px"} className={"img-50 rounded-circle m-r-15"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${visit.viewerMostRecentProfilePicVideo.link}`} />
                </Fragment>
            );
        }
    } else {
        return (
            <Fragment>
                <img  className="img-50 rounded-circle m-r-15 at-least-min-height-profile-pic" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} alt="twoImg" />
            </Fragment>
        );
    }
} 
export default {
    renderPictureOrVideoContentBreakBlock,
    renderPicOrVideoProfileOrNot
};