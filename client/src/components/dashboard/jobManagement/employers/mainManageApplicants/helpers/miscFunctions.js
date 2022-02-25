import React, { Fragment } from "react";
import ReactPlayer from 'react-player';


const renderImageOrVideo = (applicant) => {

    const file = applicant.attachedFiles[applicant.attachedFiles.length - 1];

    if (file.type.includes("video")) {
        return (
            <Fragment>
                <div className="ribbon-wrapper-bottom">
                    <ReactPlayer key={file.id} controls={true} loop={true} muted={true} url={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} className="stretch-both-ways-topped" />
                </div>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <div className="ribbon-wrapper-bottom">
                    <img key={file.id} src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} className="stretch-both-ways-topped" />
                </div>
            </Fragment>
        );
    }   
}

export default {
    renderImageOrVideo
}