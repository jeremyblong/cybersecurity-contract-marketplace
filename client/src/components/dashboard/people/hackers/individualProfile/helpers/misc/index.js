import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Button, Media, Input, InputGroup, InputGroupAddon, Popover, PopoverBody, PopoverHeader, Form, Tooltip } from 'reactstrap';
import moment from "moment";
import ReactPlayer from 'react-player';
import { MoreVertical } from "react-feather";
import two from '../../../../../../../assets/images/job-search/6.jpg';
import "./styles.css";
import { Picker } from 'emoji-mart';
import axios from "axios";
import { useForm } from 'react-hook-form';
import { NotificationManager } from 'react-notifications';
import CommentsIndividualPostHelper from "../viewPostFileContents/helpers/renderComments/otherHelpers/reactHookForm.js";
import helpers from "./miscHelpers/helpers.js";


const {
    renderProfilePicVideo, 
    renderProfilePicVideoPost, 
    renderCustomCommentImageVideo, 
    RenderEmojiLogic
} = helpers;


const homepageCheckMessageMeetsCritera = CommentsIndividualPostHelper().homepageCheckMessageMeetsCritera;


const handleRespondEmoji = (emojiName, relatedPost, closePopover, targetAndPopState, userData, user, setProfilePosts) => {
    console.log("emojiName", emojiName);

    const config = {
        reaction: emojiName,
        reactorID: userData.uniqueId,
        posterID: user.uniqueId, 
        relatedPostID: relatedPost.uniqueId
    }

    axios.post(`${process.env.REACT_APP_BASE_URL}/react/posting/hacker/profile/individual/specific/post/main/mapped`, config).then((res) => {
        if (res.data.message === "Successfully reacted to post!") {
            console.log(res.data);

            const { posts } = res.data;

            NotificationManager.success("You've successfully reacted with an emoji to this user's specific post! If you'd like to remove this reaction, simply react with any of the emoji's again & it'll revoke your response.", "Successfully reacted to post!", 4750);

            setProfilePosts(posts);

        } else if (res.data.message === "Successfully REMOVED reaction to post!") {
            const { posts } = res.data;

            setProfilePosts(posts);

            NotificationManager.info("We've successfully REMOVED your previous reaction as you've already reacted to this post, if you didn't mean to remove this reaction, simply react with same emoji again...", "Successfully removed previous reaction!", 4750);
        } else {
            console.log("Err", res.data);

            NotificationManager.error("An error occurred while attempting to react to this specific post with the appropriate emoji, Try again & contact support if the issue persists.", "Error reacting to post!", 4750);
        }
    }).catch((err) => {
        console.log(err);
    })

    // const configuration = {
    //     emojiName,
    //     id: userData.uniqueId,
    //     listingId: data.uniqueId,
    //     commentID: comment.id,
    //     comment
    // };

    // axios.post(`${process.env.REACT_APP_BASE_URL}/respond/emoji/comment/employer/listing`, configuration).then((res) => {
    //     if (res.data.message === "Successfully reacted to comment!") {
    //         console.log(res.data);

    //         const { listing, commenttt } = res.data;

    //         NotificationManager.success("Successfully REACTED to the selected comment, Your response is now live!", "Successfully reacted to comment!", 4500);

    //         const indexed = comments.findIndex(x => x.id === commenttt.id);

    //         const copy = [...comments];
    //         copy[indexed] = commenttt;
            
    //         setCommentsState(copy);

    //         closePopover(targetAndPopState);
    //     } else if (res.data.message === "You've already reacted to this comment! Since you've previously reacted, we're removing your existing response so you can update it!") {
    //         const { listing, commenttt } = res.data;

    //         NotificationManager.warning(res.data.message, "Successfully redacted your existing response!", 4500);

    //         const indexed = comments.findIndex(x => x.id === commenttt.id);

    //         const copy = [...comments];
    //         copy[indexed] = commenttt;
            
    //         setCommentsState(copy);

    //         closePopover(targetAndPopState);
    //     } else {
    //         console.log("Err", res.data);
    //     }
    // }).catch((err) => {
    //     console.log(err);
    // })
}
const renderGridImageOrVideo = (file, bottom, setSelectedPost, post, setPostPaneOpenState, index, setSelectedIndex) => {
    if (file.type.includes("video")) {
        // video logic
        return (
            <Media onClick={() => {
                setSelectedIndex(index);
                // set the selected modal/pane post
                setSelectedPost({
                    ...post,
                    files: post.uploadedRelevantFiles
                });
                // delay so selectedPost loads before/prior then display
                setTimeout(() => {
                    setPostPaneOpenState(true);
                }, 375);
            }} className={bottom === true ? "maxed-out-post-video-custom-wrapper-bottom" : "maxed-out-post-video-custom-wrapper"}>
                <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} height={"100%"} className={"maxed-out-post-video-custom"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} />
            </Media>
        );
    } else if (file.type.includes("image")) {
        // image logic
        return (
            <Fragment>
                <div className={bottom === true ? "align-post-content-picture-bottom-item" : "align-post-content-picture"}>
                    <Media onClick={() => {
                        setSelectedIndex(index);
                        // set the selected modal/pane post
                        setSelectedPost({
                            ...post,
                            files: post.uploadedRelevantFiles
                        });
                        // delay so selectedPost loads before/prior then display
                        setTimeout(() => {
                            setPostPaneOpenState(true);
                        }, 375);
                    }} className="post-image-resized" alt="post-picture" src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} />
                </div>
            </Fragment>
        );
    } else {
        console.log("NEITHER MATCH.");

        // image logic
        return (
            <Fragment>
                <div className={bottom === true ? "align-post-content-picture-bottom-item" : "align-post-content-picture"}>
                    <Media onClick={() => {
                        setSelectedIndex(index);
                        // set the selected modal/pane post
                        setSelectedPost({
                            ...post,
                            files: post.uploadedRelevantFiles
                        });
                        // delay so selectedPost loads before/prior then display
                        setTimeout(() => {
                            setPostPaneOpenState(true);
                        }, 375);
                    }} className="post-image-resized" alt="post-picture" src={require("../../../../../../../assets/images/cannot-display-file.png")} />
                </div>
            </Fragment>
        );
    }
}
const RenderCertainImageDisplay = ({ setSelectedIndex, setPostPaneOpenState, files, setSelectedPost, post }) => {
    switch (files.length) {
        case 0:
            return null;
            break;
        case 1:
            return (
                <Fragment>
                    {renderGridImageOrVideo(files[0], false, setSelectedPost, post, setPostPaneOpenState, 0, setSelectedIndex)}
                </Fragment>
            );
            break;
        case 2:
            return (
                <Fragment>
                    <Row>
                        <Col className={"image-render-col-custom"} sm="12" md="6" lg="6" xl="6">
                            {renderGridImageOrVideo(files[0], false, setSelectedPost, post, setPostPaneOpenState, 0, setSelectedIndex)}
                        </Col>
                        <Col className={"image-render-col-custom"} sm="12" md="6" lg="6" xl="6">
                            {renderGridImageOrVideo(files[1], false, setSelectedPost, post, setPostPaneOpenState, 0, setSelectedIndex)}
                        </Col>
                    </Row>
                </Fragment>
            );
            break;
        case 3:
            return (
                <Fragment>
                    <Row>
                        <Col className={"image-render-col-custom"} sm="12" md="12" lg="12" xl="12">
                            {renderGridImageOrVideo(files[0], false, setSelectedPost, post, setPostPaneOpenState, 0, setSelectedIndex)}
                        </Col>
                    </Row>
                    <Row style={{ paddingTop: "3px" }}>
                        <Col className={"image-render-col-custom"} sm="12" md="6" lg="6" xl="6">
                            {renderGridImageOrVideo(files[1], true, setSelectedPost, post, setPostPaneOpenState, 0, setSelectedIndex)}
                        </Col>
                        <Col className={"image-render-col-custom"} sm="12" md="6" lg="6" xl="6">
                            {renderGridImageOrVideo(files[2], true, setSelectedPost, post, setPostPaneOpenState, 0, setSelectedIndex)}
                        </Col>
                    </Row>
                </Fragment>
            );
            break;
        case 4:
            return (
                <Fragment>
                    <Row>
                        <Col className={"image-render-col-custom"} sm="12" md="6" lg="6" xl="6">
                            {renderGridImageOrVideo(files[0], false, setSelectedPost, post, setPostPaneOpenState, 0, setSelectedIndex)}
                        </Col>
                        <Col className={"image-render-col-custom"} sm="12" md="6" lg="6" xl="6">
                            {renderGridImageOrVideo(files[1], false, setSelectedPost, post, setPostPaneOpenState, 0, setSelectedIndex)}
                        </Col>
                    </Row>
                    <Row style={{ paddingTop: "3px" }}>
                        <Col className={"image-render-col-custom"} sm="12" md="6" lg="6" xl="6">
                            {renderGridImageOrVideo(files[2], true, setSelectedPost, post, setPostPaneOpenState, 0, setSelectedIndex)}
                        </Col>
                        <Col className={"image-render-col-custom"} sm="12" md="6" lg="6" xl="6">
                            {renderGridImageOrVideo(files[3], true, setSelectedPost, post, setPostPaneOpenState, 0, setSelectedIndex)}
                        </Col>
                    </Row>
                </Fragment>
            );
            break;
        case 5:
            return (
                <Fragment>
                    <Row>
                        <Col className={"image-render-col-custom"} sm="12" md="6" lg="6" xl="6">
                            {renderGridImageOrVideo(files[0], false, setSelectedPost, post, setPostPaneOpenState, 0, setSelectedIndex)}
                        </Col>
                        <Col className={"image-render-col-custom"} sm="12" md="6" lg="6" xl="6">
                            {renderGridImageOrVideo(files[1], false, setSelectedPost, post, setPostPaneOpenState, 1, setSelectedIndex)}
                        </Col>
                    </Row>
                    <Row style={{ paddingTop: "3px" }}>
                        <Col className={"image-render-col-custom"} sm="12" md="4" lg="4" xl="4">
                            {renderGridImageOrVideo(files[2], true, setSelectedPost, post, setPostPaneOpenState, 2, setSelectedIndex)}
                        </Col>
                        <Col className={"image-render-col-custom"} sm="12" md="4" lg="4" xl="4">
                            {renderGridImageOrVideo(files[3], true, setSelectedPost, post, setPostPaneOpenState, 3, setSelectedIndex)}
                        </Col>
                        <Col className={"image-render-col-custom"} sm="12" md="4" lg="4" xl="4">
                            {renderGridImageOrVideo(files[4], true, setSelectedPost, post, setPostPaneOpenState, 4, setSelectedIndex)}
                        </Col>
                    </Row>
                </Fragment>
            );
            break;
            
        default:
            return null;
            break;
    }
}
const TimelinePostsMappedHelper = ({ setProfilePosts, comments, setCommentsState, setSelectedIndex, setPostPaneOpenState, setSelectedPost, post, index, user, userData, setPopoverState, popover, popoverIDTarget }) => {
    // post.uploadedRelevantFiles.length
    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false);
    const [ previewOpen, setPreviewState ] = useState(false);

    const { register, handleSubmit, getValues, setValue, setError, clearErrors, formState: { errors }} = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur"
    });

    const currentValues = getValues();

    useEffect(() => {
        setCommentsState(post.comments);
    }, []);

    useEffect(() => {
        console.log("post.comments update");

        setCommentsState(post.comments);
    }, [post.comments]);
    
    const openPopoverPane = () => {

        setPopoverState(prevState => {
            return {
                ...prevState,
                [popoverIDTarget]: true
            }
        });
    }
    const addEmoji = (emoji) =>  {
        const text = `${currentValues.homepageComment}${emoji.native}`;
        // close picker
        setShowEmojiPicker(false);
        // update homepageComment string value
        setValue("homepageComment", text, { shouldValidate: false });
    }
    const renderFormErrors = (errors) => {
        console.log("renderFormErrors", errors);
    }
    const onSubmitForm = (formData) => {
        console.log("onSubmitForm submitted form properly...!:", formData);

        setPreviewState(false);

        const { homepageComment } = formData;

        const configuration = {
            id: userData.uniqueId,
            specificPostId: post.uniqueId,
            profileID: user.uniqueId,
            comment: homepageComment,
            firstName: userData.firstName,
            lastName: userData.lastName,
            accountType: userData.accountType,
            mostRecentProfilePicVideo: typeof userData.profilePicsVideos !== "undefined" && userData.profilePicsVideos.length > 0 ? userData.profilePicsVideos[userData.profilePicsVideos.length - 1] : null
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/post/new/comment/hacker/timeline/profile/individual`, configuration).then((res) => {
            if (res.data.message === "Successfully posted comment!") {
                console.log(res.data);

                const { updatedComments } = res.data;

                setValue("homepageComment", "", { shouldValidate: false });

                setCommentsState(updatedComments);

                NotificationManager.success("Successfully posted your desired comment, we've successfully updated this listing data & notified the owner of these changes!", "Successfully posted a new comment!", 4750);

            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <Fragment key={index}>
        <Form onSubmit={handleSubmit(onSubmitForm, (errors) => renderFormErrors(errors))}>
            <Col sm="12">
                <Card className={"add-shadow-general-card-profile"}>
                    <CardBody>
                        <div className="new-users-social">
                            <Media>
                                {renderProfilePicVideoPost(user.profilePicsVideos)}
                                <Media body>
                                    <h6 className="mb-0 f-w-700">{`${user.firstName} ${user.lastName}`}</h6>
                                    <p>Posted {moment(post.date).fromNow()}</p>
                                </Media><span className="pull-right mt-0"><MoreVertical /></span>
                            </Media>
                        </div>
                        <div style={{ paddingBottom: "12.5px" }} className="timeline-content">
                            <p className={"post-title-main"}>
                                {post.title}
                            </p>
                        </div>
                        <RenderCertainImageDisplay setSelectedIndex={setSelectedIndex} setPostPaneOpenState={setPostPaneOpenState} post={post} setSelectedPost={setSelectedPost} files={post.uploadedRelevantFiles} />
                        <div className="timeline-content">
                            <p>
                                {post.description}
                            </p>
                            <div className={"emoji-response-post"}>
                                <img onClick={() => openPopoverPane()} id={`post${index}`} src={require("../../../../../../../assets/gifs/thoughts.gif")} className={"emoji-response-icon"} />
                            </div>
                            <div style={{ paddingTop: "17.5px" }} className="text-center"><a onClick={() => {
                                // setSelectedIndex(index);
                                setSelectedPost({
                                    ...post,
                                    files: post.uploadedRelevantFiles,
                                    index
                                });
                                // set slight delay to allow previous logic to load
                                setTimeout(() => {
                                    setPostPaneOpenState(true)
                                }, 375)
                            }}>More Details/Comments & Complete Information</a></div>
                            <RenderPopoverEmojiLogicMainPostings setProfilePosts={setProfilePosts} user={user} index={index} handleRespondEmoji={handleRespondEmoji} userData={userData} relatedPost={post} reactions={post.reactions} setPopoverState={setPopoverState} popoverState={popover} targetAndPopState={popoverIDTarget} />
                            <div className="like-content custom-like-response-zone"><span onClick={() => {
                                setSelectedPost({
                                    ...post,
                                    files: post.uploadedRelevantFiles,
                                    index
                                });
                                // set slight delay to allow previous logic to load
                                setTimeout(() => {
                                    setPostPaneOpenState(true)
                                }, 375)
                            }} className="pull-right comment-number"><span>{"20"} </span><span onClick={() => {
                                setSelectedPost({
                                    ...post,
                                    files: post.uploadedRelevantFiles,
                                    index
                                });
                                // set slight delay to allow previous logic to load
                                setTimeout(() => {
                                    setPostPaneOpenState(true)
                                }, 375)
                            }}><i className="fa fa-share-alt mr-0"></i></span></span><span className="pull-right comment-number"><span>{comments.length} </span><span><i className="fa fa-comments-o"></i></span></span></div>
                            <Row>
                                <RenderEmojiLogic reactions={post.reactions} comments={comments} />
                            </Row>
                            <Row id={"create-spacer-comment-box-profile-individual"}>
                                <div className="comments-box">
                                    <Media>
                                        <Media onClick={() => {
                                            setSelectedPost({
                                                ...post,
                                                files: post.uploadedRelevantFiles,
                                                index
                                            });
                                            // set slight delay to allow previous logic to load
                                            setTimeout(() => {
                                                setPostPaneOpenState(true)
                                            }, 375)
                                        }} className="img-50 img-fluid m-r-20" alt="" src={require("../../../../../../../assets/gifs/typing-black.gif")} />
                                        <Media body>
                                            <InputGroup className="text-box">
                                                <Input {...homepageCheckMessageMeetsCritera.check(setError, register, clearErrors, "homepageComment")} onChange={(e) => {

                                                    homepageCheckMessageMeetsCritera.onChange(e, "homepageComment", setValue);

                                                    const caret = e.target.selectionStart;
                                                    const element = e.target;
                                                    window.requestAnimationFrame(() => {
                                                        element.selectionStart = caret
                                                        element.selectionEnd = caret
                                                    })
                                                }} value={currentValues.homepageComment} name={"homepageComment"} className={"form-control input-txt-bx write-comment-post"} type={"text"} placeholder={homepageCheckMessageMeetsCritera.placeholder} />
                                                <Tooltip placement={"top"} isOpen={previewOpen} target={"inputPreviewText"} toggle={() => setPreviewState(prevState => !prevState)}>
                                                    {currentValues.homepageComment}
                                                </Tooltip>
                                                <InputGroupAddon id={"inputPreviewText"} onMouseEnter={() => setPreviewState(prevState => !prevState)} style={{ marginLeft: "17.5px" }} addonType="append">
                                                    <Button type={"submit"} className={"btn-square-secondary"} color={"secondary"}>Submit Comment!</Button>
                                                </InputGroupAddon>
                                                <InputGroupAddon addonType="append">
                                                    <i onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="fa fa-smile-o fa-3x restyle-emoji-activator-icon" aria-hidden="true"></i>
                                                    {showEmojiPicker === true ? (
                                                            <Picker style={{ position: "absolute", right: "40px", top: "-375px" }} set="apple" emojiSize={30} onSelect={addEmoji} />
                                                    ) : null}
                                                </InputGroupAddon>
                                            </InputGroup>
                                            {errors.homepageComment ? <span style={{ marginTop: "3.5px" }} className="span-tooltip">{errors.homepageComment.message}</span> : null}
                                        </Media>
                                    </Media>
                                </div>
                            </Row>
                        </div>
                        <Row className={"custom-profile-comments-row-override"}>
                            <Col sm="12" md="12" lg="12" xl="12">
                                <div className="social-chat">
                                    {comments.slice(0, 4).map((comment, idxxxxxx) => {
                                        return (
                                            <Fragment key={idxxxxxx}>
                                                <div onClick={() => {
                                                    setSelectedPost({
                                                        ...post,
                                                        files: post.uploadedRelevantFiles,
                                                        index
                                                    });
                                                    // set slight delay to allow previous logic to load
                                                    setTimeout(() => {
                                                        setPostPaneOpenState(true)
                                                    }, 375)
                                                }} className="your-msg your-msg-custom-profile-mapped">
                                                    <Media>
                                                        {renderCustomCommentImageVideo(comment.posterPicOrVideo)}
                                                        <Media body><span className="f-w-600">{comment.posterName} <span> {moment(comment.date).fromNow()} <i className="fa fa-reply font-primary"></i></span></span>
                                                            <p>{comment.commentText}</p>
                                                        </Media>
                                                    </Media>
                                                </div>
                                                {comment.subComments.map((subcomment, idx) => {
                                                    return (
                                                        <Fragment onClick={() => {
                                                            setSelectedPost({
                                                                ...post,
                                                                files: post.uploadedRelevantFiles,
                                                                index
                                                            });
                                                            // set slight delay to allow previous logic to load
                                                            setTimeout(() => {
                                                                setPostPaneOpenState(true)
                                                            }, 375)
                                                        }} key={idx}>
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
                                    <div className="text-center"><a onClick={() => {
                                        // setSelectedIndex(index);
                                        setSelectedPost({
                                            ...post,
                                            files: post.uploadedRelevantFiles,
                                            index
                                        });
                                        // set slight delay to allow previous logic to load
                                        setTimeout(() => {
                                            setPostPaneOpenState(true)
                                        }, 375)
                                    }}>More Details/Comments & Complete Information</a></div>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            </Form>
        </Fragment>
    );
}

const RenderPopoverEmojiLogicMainPostings = ({ setProfilePosts, user, relatedPost, userData, index, reactions, targetAndPopState, setPopoverState, popoverState, handleRespondEmoji }) => {

    const [stateCount, setStateCount] = useState(0);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let count = 0;
        // loop over reactions
        for (const key in reactions) {
            const reactionOutcome = reactions[key];

            // check if emoji is already added - if not... add it!
            if (reactionOutcome > 0) {
                count++;
            }
        }
        setStateCount(count);
        setReady(true);
    }, []);

    const renderMainContentPopover = () => {
        const closePopover = (targetAndPopState) => {
            setPopoverState(prevState => {
                return {
                    ...prevState,
                    [targetAndPopState]: false
                }
            });
        }
        if (ready === true) {
            return (
                <Fragment>
                    <Popover placement="right" isOpen={popoverState[targetAndPopState]} target={`post${index}`} toggle={() => {
                        closePopover(targetAndPopState);
                    }}>
                        <PopoverHeader>Current Post Reaction's ({stateCount} total reaction type's)</PopoverHeader>
                        <PopoverBody>
                            <div onMouseLeave={() => {
                                closePopover(targetAndPopState);
                            }} className={"mouse-exit-close-popover-emojis"}>
                                <Row>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("sunglasses", relatedPost, closePopover, targetAndPopState, userData, user, setProfilePosts)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/sunglasses.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("steaming", relatedPost, closePopover, targetAndPopState, userData, user, setProfilePosts)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/steaming.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("tearsOfJoy", relatedPost, closePopover, targetAndPopState, userData, user, setProfilePosts)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/tearsOfJoy.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("vomitting", relatedPost, closePopover, targetAndPopState, userData, user, setProfilePosts)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/vomitting.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("partying", relatedPost, closePopover, targetAndPopState, userData, user, setProfilePosts)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/partying.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("screaming", relatedPost, closePopover, targetAndPopState, userData, user, setProfilePosts)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/screaming.gif")} />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </PopoverBody>
                    </Popover>
                </Fragment>
            );
        } else {
            return null;
        }
    }
    return (
        <Fragment>
            {renderMainContentPopover()}
        </Fragment>
    );
}

export default {
    TimelinePostsMappedHelper, 
    renderProfilePicVideo,
    renderProfilePicVideoPost
};