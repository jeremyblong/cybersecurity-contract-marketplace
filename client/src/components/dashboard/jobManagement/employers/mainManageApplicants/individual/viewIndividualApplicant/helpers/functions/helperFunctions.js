import React, { Fragment } from "react";
import { Media } from "reactstrap";
import ReactPlayer from "react-player";



const renderPictureOrVideoProfilePic = (last, subrender) => {
    // check conditional item to render whether video or image

    console.log("last", last);

    if (subrender === true) {
        if (last.type.includes("video")) {
            // video logic
            return (
                <Media className="rounded-circle image-radius m-r-15">
                    <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"rounded-circle image-radius m-r-15"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                </Media>
            );
        } else {
            // image logic
            return <Media className="rounded-circle image-radius m-r-15" alt="profile-picture-in-content" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />;
        }  
    } else {
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
}
const calculateFileType = (type) => {
    switch (type) {
        case "video/mp4":
            return "mp4";
            break;
        case "image/png":
            return "png";
            break;
        case "image/jpeg":
            return "jpeg";
            break;
        case "image/jpg":
            return "jpg";
            break;
        case "image/gif":
            return "gif";
            break;
        case "image/bmp":
            return "bmp";
            break;
        case "application/pdf":
            return "pdf";
            break;
        case "text/csv":
            return "csv";
            break;
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            return "xlsx";
            break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return "docx";
            break;
        case "video/webm":
            return "webm";
            break;
        case "audio/mpeg":
            return "mp3";
            break;
        default:
            break;
    }
};
// <Media body className="rounded-circle" src={profilePicture} alt="" />

export default {
    renderPictureOrVideoProfilePic,
    calculateFileType
}