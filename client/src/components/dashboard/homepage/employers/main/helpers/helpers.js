import React from "react";
import { Media } from "reactstrap";
import ReactPlayer from "react-player";
import _ from "lodash";
import "../styles.css";

const renderProfilePicVideoMainPage = (last) => {

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
const renderProfilePicVideoMainPageImg = (last) => {

    if (last !== null && _.has(last, "link")) {
        if (last.type.includes("video")) {
            // video logic
            return (
                <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"img-fluid roundme roundme-video"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
            );
        } else {
            // image logic
            return <img className="img-fluid roundme" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} alt="" />;
        }    
    } else {
        // image logic
        return <img className="img-fluid roundme" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} alt="" />;
    } 
}
export default {
    renderProfilePicVideoMainPage,
    renderProfilePicVideoMainPageImg
}