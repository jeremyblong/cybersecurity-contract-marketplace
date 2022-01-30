import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import ReactPlayer from "react-player";
import _ from "lodash";
import "./styles.css";
import { Modal } from 'react-responsive-modal';
import { NotificationManager } from "react-notifications";
import Slider from "react-slick";
import { Container, Col, Card, Row, CardBody, CardHeader, ListGroupItem, ListGroup } from "reactstrap";
import moment from "moment";
import axios from "axios";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

const renderPictureOrVideoLast = (file, index, onCloseModal, setSelectedModalIndex, galleryRef, setSelectedCurrently) => {
    if (file !== null && _.has(file, "link")) {
        if (file.type.includes("video")) {
            // video logic
            return (
                <Fragment>
                    <li onClick={() => {
                        // set current index for modal
                        setSelectedModalIndex(index);
                        // set currently selected item
                        setSelectedCurrently(file);
                        // open modal and display
                        onCloseModal(true);
                        // go to appropriate/selected slide...
                        setTimeout(() => {
                            galleryRef.current.slickGoTo(index);
                        }, 375)
                    }}>
                        <div className="latest-post profile-pic-video-sidebar-custom">
                            <ReactPlayer playing={true} loop={true} controls={false} muted={false} width={"100%"} className={"img-fluid"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} />
                        </div>
                    </li>
                </Fragment>
            );
        } else {
            // image logic
            return (
                <Fragment>
                    <li onClick={() => {
                        // set current index for modal
                        setSelectedModalIndex(index);
                        // set currently selected item
                        setSelectedCurrently(file);
                        // open modal and display
                        onCloseModal(true);
                        // go to appropriate/selected slide...
                        setTimeout(() => {
                            galleryRef.current.slickGoTo(index);
                        }, 375)
                    }}>
                        <div className="latest-post profile-pic-video-sidebar-custom">
                            <img className="img-fluid" alt="post1" src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} />
                        </div>
                    </li>
                </Fragment>
            );
        }  
    } else {
        // image logic - DEFAULT.
        return (
            <Fragment>
                <li onClick={() => {
                    // set current index for modal
                    setSelectedModalIndex(index);
                    // set currently selected item
                    setSelectedCurrently(file);
                    // open modal and display
                    onCloseModal(true);
                    // go to appropriate/selected slide...
                    setTimeout(() => {
                        galleryRef.current.slickGoTo(index);
                    }, 375)
                }}>
                    <div className="latest-post profile-pic-video-sidebar-custom">
                        <img className="img-fluid" alt="post1" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} />
                    </div>
                </li>
            </Fragment>
        );
    } 
}
const renderModalImageOrVideo = (file) => {
    if (file !== null && _.has(file, "link")) {
        if (file.type.includes("video")) {
            // video logic
            return (
                <Fragment>
                    <ReactPlayer controls={true} playing={true} loop={true} muted={false} width={"100%"} className={"hacker-gallery-modal-pic"} wrapper={"div"} url={file.src} />
                </Fragment>
            );
        } else {
            // image logic
            return (
                <Fragment>
                    <img src={file.src} className={"hacker-gallery-modal-pic"} />
                </Fragment>
            );
        }  
    } else {
        // image logic - DEFAULT.
        return (
            <Fragment>
                <img src={process.env.REACT_APP_PLACEHOLDER_IMAGE} className={"hacker-gallery-modal-pic"} />
            </Fragment>
        );
    } 
}
const RenderGalleryModalHackerProfileHelper = ({ currentlySelected, setSelectedCurrently, onCloseModal, userData, user, isOpen, galleryRef }) => {

    const [ picturesArr, setPicturesArr ] = useState([]);

    useEffect(async () => {
        if (typeof user.profilePicsVideos !== "undefined" && user.profilePicsVideos.length > 0) {
            // pictures exist - run setup logic
            const newlyStructuredProfilePicsVids = await user.profilePicsVideos.map((el, idx, row) => {
                console.log("el", el);
                if (idx + 1 === row.length) {
                    // Last one.
                    let result = {
                        src: `${process.env.REACT_APP_ASSET_LINK}/${el.link}`,
                        type: el.type,
                        core: el,
                        caption: `You're viewing the ${el.name} file...`,
                        autoplay: false,
                        showControls: true,
                        thumbnail: `${process.env.REACT_APP_ASSET_LINK}/${el.link}`,
                        link: el.link,
                        className: "caption-thumbnail-custom-hacker-profile",
                        date: el.systemDate
                    };
                    // return constructed obj for lightbox
                    return result;
                } else {
                    // Not last one.
                    let resultNotLast = {
                        src: `${process.env.REACT_APP_ASSET_LINK}/${el.link}`,
                        type: el.type,
                        core: el,
                        caption: `You're viewing the ${el.name} file...`,
                        autoplay: false,
                        showControls: true,
                        thumbnail: `${process.env.REACT_APP_ASSET_LINK}/${el.link}`,
                        link: el.link,
                        className: "caption-thumbnail-custom-hacker-profile",
                        date: el.systemDate
                    }
                    // return constructed obj for lightbox
                    return resultNotLast;
                }
            });
            // wait for .mapped to finish then set the local state.
            if (newlyStructuredProfilePicsVids) {
                setPicturesArr(newlyStructuredProfilePicsVids);
            }
        }
    }, []);

    const reactWithEmojiToFile = (reaction) => {
        console.log("reactWithEmojiToFile reaction - :", reaction);

        const configuration = {
            reaction,
            reactHackerAccountID: user.uniqueId,
            reactedHackerFile: currentlySelected,
            reactingSignedinUserID: userData.uniqueId
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/react/hacker/profile/file/history`, configuration).then((res) => {
            if (res.data.message === "Successfully reacted to file!") {
                console.log(res.data);

                NotificationManager.success("Successfully REACTED to this file & the updates are now live and active - If you ever want to change this response... Simply like the post again and it will remove your existing response.", "Successfully responded to picture/video!", 4750);

            } else if (res.data.message === "You've already PREVIOUSLY reacted to this post! We are revoking/removing your previous response to allow for a new response - please try your action again!") {
                
                NotificationManager.warning(res.data.message, "You've already reacted to this post!", 4750);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    } 
    const afterChangeOccurred = (index) => {
        setSelectedCurrently(picturesArr[index]);
    }
    console.log("inner component currentlySelected", currentlySelected);
    return (
        <Fragment>
            <Modal classNames={{
                overlay: 'hackerProfileLightboxDisplayOverlay',
                modal: 'hackerProfileLightboxDisplayModal',
            }} open={isOpen} onClose={() => onCloseModal(false)} center>
                <Container className={"modal-container-hacker-profile-maxed"} fluid={true}>
                    <Row>
                        <div className={"centered-both-ways"}>
                            <Col className={"spacing-col-profile-hacker"} sm="12" md="12" lg="12" xl="12">
                                <Slider afterChange={afterChangeOccurred} ref={galleryRef} className={"profile-pictures-slider-pane"} {...settings}>
                                    {typeof picturesArr !== "undefined" && picturesArr.length > 0 ? picturesArr.map((file, idxxx) => {
                                        return (
                                            <Fragment key={idxxx}>
                                                <Col sm="12" lg="12" xl="12" md="12" className="xl-100 box-col-12 outter-most-container">
                                                    <Card className="height-equal full-height-profile-images">
                                                        <div className="calender-widget full-height-widget-profile">
                                                            <Row id={"full-height-row-hacker-profile-imgs"}>
                                                                <Col className={"min-height-col-inner-profile"} sm="12" md="4" lg="4" xl="4">
                                                                    <div className="min-cal-img-height">
                                                                        {renderModalImageOrVideo(file)}
                                                                    </div>
                                                                </Col>
                                                                <Col className={"min-height-col-inner-profile"} sm="12" md="8" lg="8" xl="8">
                                                                    <Card className={"add-shadow-profile-picture-card"}>
                                                                        <CardHeader className="b-l-primary border-3">
                                                                            <h5>Previous Profile Picture/Video Information</h5>
                                                                        </CardHeader>
                                                                        <CardBody>
                                                                            <ListGroup>
                                                                                <ListGroupItem active><strong>Viewing:</strong> {file.caption}</ListGroupItem>
                                                                                <ListGroupItem><strong>File Type:</strong> {file.type}</ListGroupItem>
                                                                                <ListGroupItem active><strong>Uploaded:</strong> {moment(file.date).fromNow()}</ListGroupItem>
                                                                            </ListGroup>
                                                                        </CardBody>
                                                                    </Card>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col sm="12" md="12" lg="12" xl="12">
                                                                    <Card style={{ marginTop: "17.5px" }} className={"add-shadow-profile-picture-card"}>
                                                                        <CardHeader className="b-l-primary border-3">
                                                                            <Row>
                                                                                <Col sm="12" md="7" lg="7" xl="7">
                                                                                    <h5>Like's/Dislikes & Responses - React to this image!</h5>
                                                                                    <hr />
                                                                                    <p>React to this <strong>specific image/video</strong> if you feel compelled! This will notify the "Owner/Poster" of your reaction.</p>
                                                                                </Col>
                                                                                <Col sm="12" md="5" lg="5" xl="5">
                                                                                    <div className={"evenly-space-emojis-reactions centered-both-ways"}>
                                                                                        <img onClick={() => reactWithEmojiToFile("sunglasses")} src={require("../../../../../../../assets/gifs/sunglasses.gif")} className={"gif-animated-card-pic-related"} />
                                                                                        <img onClick={() => reactWithEmojiToFile("steaming")} src={require("../../../../../../../assets/gifs/steaming.gif")} className={"gif-animated-card-pic-related"} />
                                                                                        <img onClick={() => reactWithEmojiToFile("tearsOfJoy")} src={require("../../../../../../../assets/gifs/tearsOfJoy.gif")} className={"gif-animated-card-pic-related"} />
                                                                                        <img onClick={() => reactWithEmojiToFile("vomitting")} src={require("../../../../../../../assets/gifs/vomitting.gif")} className={"gif-animated-card-pic-related"} />
                                                                                        <img onClick={() => reactWithEmojiToFile("partying")} src={require("../../../../../../../assets/gifs/partying.gif")} className={"gif-animated-card-pic-related"} />
                                                                                        <img onClick={() => reactWithEmojiToFile("screaming")} src={require("../../../../../../../assets/gifs/screaming.gif")} className={"gif-animated-card-pic-related"} />
                                                                                    </div>
                                                                                </Col>
                                                                            </Row>
                                                                        </CardHeader>
                                                                    </Card>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            </Fragment>
                                        );
                                    }) : null}
                                </Slider>
                            </Col>
                        </div>
                    </Row>
                </Container>
            </Modal>
        </Fragment>
    );
}
export default {
    renderPictureOrVideoLast,
    RenderGalleryModalHackerProfileHelper
};