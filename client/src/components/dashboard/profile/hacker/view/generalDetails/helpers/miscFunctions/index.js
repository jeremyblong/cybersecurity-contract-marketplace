import React from "react";
import { Media } from "reactstrap";
import ReactPlayer from 'react-player';


export const renderProfilePicVideo = (picOrVideoArray) => {
    // check conditional item to render
    if (picOrVideoArray !== null) {
        if (typeof picOrVideoArray !== "undefined" && picOrVideoArray.length > 0) {
            // select last element (most recent)
            const last = picOrVideoArray[picOrVideoArray.length - 1];
    
            if (last.dataType === "video") {
                // video logic
                return (
                    <Media className="custom-media-chunk" body>
                        <ReactPlayer playing={true} loop={true} muted={true} width={"300px"} height={"300px"} className={"profile-picture-account media-body"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                    </Media>
                );
            } else if (last.dataType === "image") {
                // image logic
                return <Media body alt="profile-picture" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} data-intro="This is Profile image" />;
            }   
        } else {
            return <Media body alt="profile-picture" src={require('../../../../../../../../assets/images/user/7.jpg')} data-intro="This is Profile image" />;
        }
    } else {
        return <Media body alt="profile-picture" src={require('../../../../../../../../assets/images/user/7.jpg')} data-intro="This is Profile image" />;
    }
}