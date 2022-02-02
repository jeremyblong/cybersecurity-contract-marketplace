import React, { Fragment, useState, useEffect } from "react";
import Sheet from 'react-modal-sheet';
import { Row, Col, Card, CardBody, Button, Container, CardHeader, Media, PopoverBody, PopoverHeader, InputGroupAddon, Input, InputGroup, Popover } from 'reactstrap';
import "./styles.css";
import helpers from "../misc/index.js";
import moment from "moment";
import ReactPlayer from 'react-player';
import one from '../../../../../../../assets/images/job-search/1.jpg';
import two from '../../../../../../../assets/images/job-search/6.jpg';
import NotificationManager from "react-notifications/lib/NotificationManager";
import _ from "lodash";
import { Picker } from 'emoji-mart';
import axios from "axios";


const { renderProfilePicVideoPost } = helpers;

// Main function for this file is at/near the very bottom of this file... it's called <ViewPostFileContentHelper />

const renderGridImageOrVideo = (file) => {
    if (file.type.includes("video")) {
        // video logic
        return (
            <Media className={"single-post-display-video-wrapper-pane"}>
                <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} height={"100%"} className={"maxed-out-post-video-custom-pane"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} />
            </Media>
        );
    } else if (file.type.includes("image")) {
        // image logic
        return (
            <Fragment>
                <div className={"single-post-display-image-wrapper-pane"}>
                    <Media className="single-post-display-image" alt="post-picture" src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} />
                </div>
            </Fragment>
        );
    } else {
        console.log("NEITHER MATCH.")
    }
}
const ViewPostFileContentHelper = ({ setSelectedPost, setSelectedIndex, selectedIndex, selectedPost, isPostPaneOpen,  setPostPaneOpenState, user, userData }) => {

    const [ commentText, setCommentText ] = useState("");
    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false);
  
    const addEmoji = (emoji) =>  {
        const text = `${commentText}${emoji.native}`;
        setShowEmojiPicker(false);
        setCommentText(text)
    }

    const handleRespondEmoji = (reaction) => {
        console.log("handleRespondEmoji clicked/run...:", reaction);

        const config = {
            reaction,
            reactorID: userData.uniqueId,
            posterID: user.uniqueId, 
            relatedPosterPostID: selectedPost.uniqueId
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/react/posting/hacker/profile/individual`, config).then((res) => {
            if (res.data.message === "Successfully reacted to post!") {
                console.log(res.data);

                const { post } = res.data;

                NotificationManager.success("You've successfully reacted with an emoji to this user's specific post! If you'd like to remove this reaction, simply react with any of the emoji's again & it'll revoke your response.", "Successfully reacted to post!", 4750);

                setSelectedPost({
                    ...post,
                    files: post.uploadedRelevantFiles
                });
            } else if (res.data.message === "Successfully REMOVED reaction to post!") {
                const { post } = res.data;

                setSelectedPost({
                    ...post,
                    files: post.uploadedRelevantFiles
                });

                NotificationManager.info("We've successfully REMOVED your previous reaction as you've already reacted to this post, if you didn't mean to remove this reaction, simply react with same emoji again...", "Successfully removed previous reaction!", 4750);
            } else {
                console.log("Err", res.data);

                NotificationManager.error("An error occurred while attempting to react to this specific post with the appropriate emoji, Try again & contact support if the issue persists.", "Error reacting to post!", 4750);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const shiftActiveFileLeft = () => {
        // shift file to left
        if (selectedIndex > 0) {
            setSelectedIndex(prevState => prevState - 1);
        } else {
            NotificationManager.warning("You cannot proceed any further to the left as you are currently on the FIRST ITEM, if you wish to see the other files...Go the opposite direction.", "No more file's this direction!", 4500);
        }
    }
    const shiftActiveFileRight = () => {
        // shift file to right
        if (selectedIndex < 4) {
            setSelectedIndex(prevState => prevState + 1);
        } else {
            NotificationManager.warning("You cannot proceed any further to the right as you are currently on the LAST ITEM, if you wish to see the other files...Go the opposite direction.", "No more file's this direction!", 4500);
        }
    }
    const submitAndHandleNewComment = () => {
        console.log("submitAndHandleNewComment running/ran.");
    }
    console.log("selectedPostieeeeeeee", selectedPost, selectedIndex);
    return (
        <Fragment>
            <Sheet className={"sheet-single-post-content"} isOpen={isPostPaneOpen} onClose={() => setPostPaneOpenState(false)}>
                <Sheet.Container>
                <Sheet.Header>
                    <Row>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <div className={"close-btn-spacer"}>
                                <Button onClick={() => setPostPaneOpenState(false)} outline className={"btn-square-danger"} color={"danger-2x"} style={{ width: "100%" }}>Close/Exit This Pane Content</Button>
                            </div>
                        </Col>
                    </Row>
                </Sheet.Header>
                    <Sheet.Content>
                        <Container fluid={true}>
                            <Row className={"main-container-post-row"}>
                                <Col sm="12" md="12" lg="12" xl="12">
                                    <Card className={"negative-index-card"}>
                                        <CardHeader className="b-l-primary border-3">
                                            <h5>Comment, React & Participate in this post's other comment's & active participants. You can post comments & react to this post and/or comments from this current pane/slider...</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Card className={"add-shadow-general-card-profile"}>
                                                <CardBody className={"sheet-individual-post-body"}>
                                                    <Row>
                                                        <Col sm="12" md="5" lg="5" xl="5">      
                                                            {renderGridImageOrVideo(selectedPost.files[selectedIndex])}    
                                                        </Col>
                                                        <Col sm="12" md="7" lg="7" xl="7">
                                                            <div className="new-users-social">
                                                                <Media>
                                                                    {renderProfilePicVideoPost(user.profilePicsVideos)}
                                                                    <Media body>
                                                                        <h6 className="mb-0 f-w-700">{`${user.firstName} ${user.lastName}`}</h6>
                                                                        <p>Posted {moment(selectedPost.date).fromNow()}</p>
                                                                    </Media><span className="pull-right mt-0"><i onClick={() => shiftActiveFileLeft()} className="fa fa-caret-square-o-left icon-spacer-right-pane fa-4x" aria-hidden="true"></i><i onClick={() => shiftActiveFileRight()} className="fa fa-caret-square-o-right icon-spacer-right-pane fa-4x" aria-hidden="true"></i>
                                                                    {/* <MoreVertical /> */}
                                                                    </span>
                                                                </Media>
                                                            </div>
                                                            <div style={{ paddingBottom: "12.5px" }} className="timeline-content">
                                                                <p className={"post-title-main"}>
                                                                    {selectedPost.title}
                                                                </p>
                                                            </div>
                                                            <hr />
                                                            <div className="timeline-content" id={"override-timeline-content-pane"}>
                                                                <p>
                                                                    {selectedPost.description}
                                                                </p>
                                                                <Row id={"special-popover-row"}>
                                                                    <Col className={"course-emoji-col"} sm="2" md="1" lg="1" xl="1">
                                                                        <h3 className={"emoji-reaction-count-post"}>{selectedPost.reactions.sunglasses}</h3>
                                                                        <div onClick={() => handleRespondEmoji("sunglasses")} className={"emoji-wrapper-course"}>
                                                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/sunglasses.gif")} />
                                                                        </div>
                                                                    </Col>
                                                                    <Col className={"course-emoji-col"} sm="2" md="1" lg="1" xl="1">
                                                                        <h3 className={"emoji-reaction-count-post"}>{selectedPost.reactions.steaming}</h3>
                                                                        <div onClick={() => handleRespondEmoji("steaming")} className={"emoji-wrapper-course"}>
                                                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/steaming.gif")} />
                                                                        </div>
                                                                    </Col>
                                                                    <Col className={"course-emoji-col"} sm="2" md="1" lg="1" xl="1">
                                                                        <h3 className={"emoji-reaction-count-post"}>{selectedPost.reactions.tearsOfJoy}</h3>
                                                                        <div onClick={() => handleRespondEmoji("tearsOfJoy")} className={"emoji-wrapper-course"}>
                                                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/tearsOfJoy.gif")} />
                                                                        </div>
                                                                    </Col>
                                                                    <Col className={"course-emoji-col"} sm="2" md="1" lg="1" xl="1">
                                                                        <h3 className={"emoji-reaction-count-post"}>{selectedPost.reactions.vomitting}</h3>
                                                                        <div onClick={() => handleRespondEmoji("vomitting")} className={"emoji-wrapper-course"}>
                                                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/vomitting.gif")} />
                                                                        </div>
                                                                    </Col>
                                                                    <Col className={"course-emoji-col"} sm="2" md="1" lg="1" xl="1">
                                                                        <h3 className={"emoji-reaction-count-post"}>{selectedPost.reactions.partying}</h3>
                                                                        <div onClick={() => handleRespondEmoji("partying")} className={"emoji-wrapper-course"}>
                                                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/partying.gif")} />
                                                                        </div>
                                                                    </Col>
                                                                    <Col className={"course-emoji-col"} sm="2" md="1" lg="1" xl="1">
                                                                        <h3 className={"emoji-reaction-count-post"}>{selectedPost.reactions.screaming}</h3>
                                                                        <div onClick={() => handleRespondEmoji("screaming")} className={"emoji-wrapper-course"}>
                                                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/screaming.gif")} />
                                                                        </div>
                                                                    </Col>
                                                                    <Col className={"course-emoji-col"} sm="12" md="6" lg="6" xl="6">
                                                                        <div className="like-content custom-like-response-zone"><span className="pull-right comment-number"><span>{"20"} </span><span><i className="fa fa-share-alt mr-0"></i></span></span><span className="pull-right comment-number"><span>{selectedPost.comments.length} </span><span><i className="fa fa-comments-o"></i></span></span></div>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <div className="timeline-content" id={"override-timeline-content-pane"}>
                                                            <div className="comments-box">
                                                                <Media>
                                                                    <Media className="img-50 img-fluid m-r-20" alt="" src={require("../../../../../../../assets/gifs/typing-black.gif")} />
                                                                    <Media body>
                                                                        <InputGroup className="text-box">
                                                                            <Input value={commentText} onChange={(e) => setCommentText(e.target.value)} className="form-control input-txt-bx write-comment-post" type="text" name="message-to-send" placeholder="Post/Write Your Comment(s)..." />
                                                                            <InputGroupAddon style={{ marginLeft: "17.5px" }} addonType="append">
                                                                                <Button onClick={submitAndHandleNewComment} className={"btn-square-secondary"} color={"secondary"}>Submit Comment!</Button>
                                                                            </InputGroupAddon>
                                                                            <InputGroupAddon addonType="append">
                                                                                <i onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="fa fa-smile-o fa-3x restyle-emoji-activator-icon" aria-hidden="true"></i>
                                                                                {showEmojiPicker === true ? (
                                                                                        <Picker style={{ position: "absolute", right: "40px", top: "-375px" }} set="apple" emojiSize={30} onSelect={addEmoji} />
                                                                                ) : null}
                                                                            </InputGroupAddon>
                                                                        </InputGroup>
                                                                    </Media>
                                                                </Media>
                                                            </div>
                                                        </div>
                                                        <Row>
                                                            <Col sm="12" md="12" lg="12" xl="12">
                                                                <div className="social-chat">
                                                                    {selectedPost.comments.map((comment, idxxxxxx) => {
                                                                        return (
                                                                            <Fragment key={idxxxxxx}>
                                                                                <div className="your-msg">
                                                                                    <Media>
                                                                                        <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={one} />
                                                                                        <Media body><span className="f-w-600">{comment.poster} <span> {moment(comment.date).fromNow()} <i className="fa fa-reply font-primary"></i></span></span>
                                                                                            <p>{comment.comment}</p>
                                                                                        </Media>
                                                                                    </Media>
                                                                                </div>
                                                                                {comment.subcomments.map((subcomment, idx) => {
                                                                                    return (
                                                                                        <Fragment key={idx}>
                                                                                            <div className="other-msg">
                                                                                                <Media>
                                                                                                    <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={two} />
                                                                                                    <Media body><span className="f-w-600">{subcomment.poster} <span> {moment(subcomment.date).fromNow()} <i className="fa fa-reply font-primary"></i></span></span>
                                                                                                        <p>{subcomment.comment} </p>
                                                                                                    </Media>
                                                                                                </Media>
                                                                                            </div>
                                                                                        </Fragment>
                                                                                    );
                                                                                })}
                                                                            </Fragment>
                                                                        );
                                                                    })}
                                                                    <div className="text-center"><a href={null}>More Comments</a></div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </Fragment>
    );
}
export default ViewPostFileContentHelper;