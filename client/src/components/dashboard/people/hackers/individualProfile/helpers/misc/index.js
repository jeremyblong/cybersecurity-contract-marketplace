import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Button, Media, Input, InputGroup, InputGroupAddon, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import moment from "moment";
import ReactPlayer from 'react-player';
import { MoreVertical } from "react-feather";
import one from '../../../../../../../assets/images/job-search/1.jpg';
import two from '../../../../../../../assets/images/job-search/6.jpg';
import timeline1 from "../../../../../../../assets/images/social-app/timeline-1.png";
import "./styles.css";

const renderProfilePicVideo = (picOrVideoArray) => {
    // check conditional item to render
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
        return <Media body alt="profile-picture" src={require('../../../../../../../assets/images/user/7.jpg')} data-intro="This is Profile image" />;
    }
}
const renderProfilePicVideoPost = (picOrVideoArray) => {
    // check conditional item to render
    if (typeof picOrVideoArray !== "undefined" && picOrVideoArray.length > 0) {
        // select last element (most recent)
        const last = picOrVideoArray[picOrVideoArray.length - 1];

        if (last.dataType === "video") {
            // video logic
            return (
                <Media className="rounded-circle image-radius m-r-15">
                    <ReactPlayer playing={true} loop={true} muted={true} width={"58px"} height={"58px"} className={"rounded-circle image-radius m-r-15"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                </Media>
            );
        } else if (last.dataType === "image") {
            // image logic
            return <Media className="rounded-circle image-radius m-r-15" alt="profile-picture" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} data-intro="This is Profile image" />;
        }   
    } else {
        return <Media className="rounded-circle image-radius m-r-15" alt="profile-picture" src={require('../../../../../../../assets/images/user/7.jpg')} data-intro="This is Profile image" />;
    }
}
const handleRespondEmoji = (emojiName, comment, closePopover, targetAndPopState) => {
    console.log("emojiName", emojiName);

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
        console.log("NEITHER MATCH.")
    }
}
const RenderCertainImageDisplay = ({ setSelectedIndex, selectedIndex, isPostPaneOpen, setPostPaneOpenState, files, setSelectedPost, post }) => {
    switch (files.length) {
        case 0:
            return null;
            break;
        case 1:
            return (
                <Fragment>
                    <Media className="img-fluid" alt="" src={timeline1} />
                </Fragment>
            );
            break;
        case 2:
            return (
                <Fragment>
                    <Row>
                        <Col className={"image-render-col-custom"} sm="12" md="6" lg="6" xl="6">
                            <Media className="img-fluid" alt="" src={timeline1} />
                        </Col>
                        <Col className={"image-render-col-custom"} sm="12" md="6" lg="6" xl="6">
                            <Media className="img-fluid" alt="" src={timeline1} />
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
                            <Media className="img-fluid" alt="" src={timeline1} />
                        </Col>
                    </Row>
                    <Row style={{ paddingTop: "3px" }}>
                        <Col className={"image-render-col-custom"} sm="12" md="6" lg="6" xl="6">
                            <Media className="img-fluid" alt="" src={timeline1} />
                        </Col>
                        <Col className={"image-render-col-custom"} sm="12" md="6" lg="6" xl="6">
                            <Media className="img-fluid" alt="" src={timeline1} />
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
                            <Media className="img-fluid" alt="" src={timeline1} />
                        </Col>
                        <Col className={"image-render-col-custom"} sm="12" md="6" lg="6" xl="6">
                            <Media className="img-fluid" alt="" src={timeline1} />
                        </Col>
                    </Row>
                    <Row style={{ paddingTop: "3px" }}>
                        <Col className={"image-render-col-custom"} sm="12" md="6" lg="6" xl="6">
                            <Media className="img-fluid" alt="" src={timeline1} />
                        </Col>
                        <Col className={"image-render-col-custom"} sm="12" md="6" lg="6" xl="6">
                            <Media className="img-fluid" alt="" src={timeline1} />
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
const TimelinePostsMappedHelper = ({ setSelectedIndex, selectedIndex, isPostPaneOpen, setPostPaneOpenState, setSelectedPost, post, index, user, userData, setPopoverState, popover, popoverIDTarget }) => {
    // post.uploadedRelevantFiles.length
    
    const openPopoverPane = () => {

        setPopoverState(prevState => {
            return {
                ...prevState,
                [popoverIDTarget]: true
            }
        });
    }
    return (
        <Fragment key={index}>
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
                        <RenderCertainImageDisplay setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} isPostPaneOpen={isPostPaneOpen} setPostPaneOpenState={setPostPaneOpenState} post={post} setSelectedPost={setSelectedPost} files={post.uploadedRelevantFiles} />
                        <div className="timeline-content">
                            <p>
                                {post.description}
                            </p>
                            <div className={"emoji-response-post"}>
                                <img onClick={() => openPopoverPane()} id={`post${index}`} src={require("../../../../../../../assets/gifs/thoughts.gif")} className={"emoji-response-icon"} />
                            </div>
                            <RenderPopoverEmojiLogicMainPostings index={index} handleRespondEmoji={handleRespondEmoji} userData={userData} reactions={post.reactions} setPopoverState={setPopoverState} popoverState={popover} targetAndPopState={popoverIDTarget} />
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
                            }}><i className="fa fa-share-alt mr-0"></i></span></span><span className="pull-right comment-number"><span>{post.comments.length} </span><span><i className="fa fa-comments-o"></i></span></span></div>
                            <div className="social-chat">
                                {post.comments.map((comment, idxxxxxx) => {
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
                                            }} className="your-msg">
                                                <Media>
                                                    <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={one} />
                                                    <Media body><span className="f-w-600">{comment.poster} <span> {moment(comment.date).fromNow()} <i className="fa fa-reply font-primary"></i></span></span>
                                                        <p>{comment.comment}</p>
                                                    </Media>
                                                </Media>
                                            </div>
                                            {comment.subcomments.map((subcomment, idx) => {
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
                                <div className="text-center"><a onClick={() => setPostPaneOpenState(true)}>More Comments</a></div>
                            </div>
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
                                            <Input onFocus={() => {
                                                setSelectedPost({
                                                    ...post,
                                                    files: post.uploadedRelevantFiles,
                                                    index
                                                });
                                                // set slight delay to allow previous logic to load
                                                setTimeout(() => {
                                                    setPostPaneOpenState(true)
                                                }, 375)
                                            }} className="form-control input-txt-bx write-comment-post" type="text" name="message-to-send" placeholder="Post Your Comment(s)" />
                                            <InputGroupAddon addonType="append">
                                                <Button color="transparent"><i className="fa fa-smile-o">  </i></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Media>
                                </Media>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Fragment>
    );
}

const RenderPopoverEmojiLogicMainPostings = ({ index, reactions, targetAndPopState, setPopoverState, popoverState, handleRespondEmoji }) => {

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
                                        <div onClick={() => handleRespondEmoji("sunglasses", closePopover, targetAndPopState)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/sunglasses.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("steaming", closePopover, targetAndPopState)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/steaming.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("tearsOfJoy", closePopover, targetAndPopState)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/tearsOfJoy.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("vomitting", closePopover, targetAndPopState)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/vomitting.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("partying", closePopover, targetAndPopState)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/partying.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("screaming", closePopover, targetAndPopState)} className={"emoji-wrapper-course"}>
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