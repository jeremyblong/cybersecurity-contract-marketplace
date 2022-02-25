import React, { Fragment, useState, useEffect, useRef } from "react";
import Sheet from 'react-modal-sheet';
import { Row, Col, Card, CardBody, Button, Container, CardHeader, Media, PopoverBody, PopoverHeader, InputGroupAddon, Input, Label, Form, InputGroup, Popover } from 'reactstrap';
import "./styles.css";
import helpers from "../misc/index.js";
import moment from "moment";
import ReactPlayer from 'react-player';
import NotificationManager from "react-notifications/lib/NotificationManager";
import _ from "lodash";
import { Picker } from 'emoji-mart';
import axios from "axios";
import { connect } from "react-redux";
import CommentsIndividualPostReturnCommentsHelper from "./helpers/renderComments/commentsHelper.js";
import { useForm } from 'react-hook-form';
import CommentsIndividualPostHelper from "./helpers/renderComments/otherHelpers/reactHookForm.js";
import otherHelpers from "./helpers/renderComments/otherHelpers/helperFunctions.js";
import FileViewer from 'react-file-viewer';


const { calculateFileType } = otherHelpers;

const checkMessageMeetsCritera = CommentsIndividualPostHelper().checkMessageMeetsCritera;

const { renderProfilePicVideoPost } = helpers;

// Main function for this file is at/near the very bottom of this file... it's called <ViewPostFileContentHelper />

const renderGridImageOrVideo = (file) => {
    console.log("FUCK...file.... ", file);
    if (file !== null) {
        const filePathLink = `${process.env.REACT_APP_ASSET_LINK}/${file.link}`;
        if (file.type.includes("video")) {
            // video logic
            return (
                <Media className={"single-post-display-video-wrapper-pane"}>
                    <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} height={"100%"} className={"maxed-out-post-video-custom-pane"} wrapper={"div"} url={filePathLink} />
                </Media>
            );
        } else if (file.type.includes("image")) {
            // image logic
            return (
                <Fragment>
                    <div className={"single-post-display-image-wrapper-pane"}>
                        <Media className="single-post-display-image" alt="post-picture" src={filePathLink} />
                    </div>
                </Fragment>
            );
        } else {
            console.log("NEITHER MATCH.");

            // image logic
            return (
                <Fragment>
                    <div className={"align-post-content-picture-file-viewer"}>
                        <FileViewer
                            fileType={calculateFileType(file.type)}
                            filePath={filePathLink}
                            className={"single-post-display-image"}
                            onError={(err) => console.log("error loading file for file-viewer...:", err)}
                        />
                    </div>
                </Fragment>
            );
        }
    }
}
const ViewPostFileContentHelper = ({ setProfilePosts, comments, setCommentsState, setSelectedPost, setSelectedIndex, selectedIndex, selectedPost, isPostPaneOpen,  setPostPaneOpenState, user, userData }) => {

    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false);

    const { register, handleSubmit, getValues, setValue, setError, clearErrors, formState: { errors }} = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur"
    });

    const currentValues = getValues();
  
    const addEmoji = (emoji) =>  {
        const text = `${currentValues.comment}${emoji.native}`;
        // close picker
        setShowEmojiPicker(false);
        // update comment string value
        setValue("comment", text, { shouldValidate: false });
    }

    useEffect(() => {
        console.log("comments update viewContent.js ran...");

        setCommentsState(comments);
    }, [comments]);

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

                const { post, index } = res.data;

                NotificationManager.success("You've successfully reacted with an emoji to this user's specific post! If you'd like to remove this reaction, simply react with any of the emoji's again & it'll revoke your response.", "Successfully reacted to post!", 4750);

                setSelectedPost({
                    ...post,
                    files: post.uploadedRelevantFiles,
                    index
                });
            } else if (res.data.message === "Successfully REMOVED reaction to post!") {
                const { post, index } = res.data;

                setSelectedPost({
                    ...post,
                    files: post.uploadedRelevantFiles,
                    index
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
    // leave a comment helper function
    const onSubmitForm = (formData) => {
        console.log("onSubmitForm submitted form properly...!:", formData);

        const { comment } = formData;

        const configuration = {
            id: userData.uniqueId,
            specificPostId: selectedPost.uniqueId,
            profileID: user.uniqueId,
            comment,
            firstName: userData.firstName,
            lastName: userData.lastName,
            accountType: userData.accountType,
            mostRecentProfilePicVideo: typeof userData.profilePicsVideos !== "undefined" && userData.profilePicsVideos.length > 0 ? userData.profilePicsVideos[userData.profilePicsVideos.length - 1] : null
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/post/new/comment/hacker/timeline/profile/individual`, configuration).then((res) => {
            if (res.data.message === "Successfully posted comment!") {
                console.log(res.data);

                const { updatedComments, posts, index, post } = res.data;

                setValue("comment", "", { shouldValidate: false });

                // setProfilePosts(posts);

                setSelectedPost({
                    ...post,
                    files: post.uploadedRelevantFiles,
                    index
                });

                NotificationManager.success("Successfully posted your desired comment, we've successfully updated this listing data & notified the owner of these changes!", "Successfully posted a new comment!", 4750);

            } else {
                console.log("Err", res.data);

                NotificationManager.error("An unknown error occurred while attempting to post your desired comment, please try again & if this problem persists, please contact our support team!", "Failed to post your desired comment!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("An unknown error occurred while attempting to post your desired comment, please try again & if this problem persists, please contact our support team!", "Failed to post your desired comment!", 4750);
        })
    }
    const renderFormErrors = (errors) => {
        console.log("renderFormErrors", errors);
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
                            <Form onSubmit={handleSubmit(onSubmitForm, (errors) => renderFormErrors(errors))}>
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
                                                                                <Input {...checkMessageMeetsCritera.check(setError, register, clearErrors, "comment")} onChange={(e) => {

                                                                                    checkMessageMeetsCritera.onChange(e, "comment", setValue);

                                                                                    const caret = e.target.selectionStart;
                                                                                    const element = e.target;
                                                                                    window.requestAnimationFrame(() => {
                                                                                        element.selectionStart = caret
                                                                                        element.selectionEnd = caret
                                                                                    })
                                                                                }} value={currentValues.comment} name={"comment"} className={"form-control input-txt-bx write-comment-post"} type={"text"} placeholder={checkMessageMeetsCritera.placeholder} />
                                                                                <InputGroupAddon style={{ marginLeft: "17.5px" }} addonType="append">
                                                                                    <Button type={"submit"} className={"btn-square-secondary"} color={"secondary"}>Submit Comment!</Button>
                                                                                </InputGroupAddon>
                                                                                <InputGroupAddon addonType="append">
                                                                                    <i onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="fa fa-smile-o fa-3x restyle-emoji-activator-icon" aria-hidden="true"></i>
                                                                                    {showEmojiPicker === true ? (
                                                                                            <Picker style={{ position: "absolute", right: "40px", top: "-375px" }} set="apple" emojiSize={30} onSelect={addEmoji} />
                                                                                    ) : null}
                                                                                </InputGroupAddon>
                                                                            </InputGroup>
                                                                            {errors.comment ? <span className="span-tooltip">{errors.comment.message}</span> : null}
                                                                        </Media>
                                                                    </Media>
                                                                </div>
                                                            </div>
                                                        </Row>
                                                        <Row>
                                                            <CommentsIndividualPostReturnCommentsHelper comments={comments} setCommentsState={setCommentsState} data={selectedPost} userData={userData} />
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, { })(ViewPostFileContentHelper);