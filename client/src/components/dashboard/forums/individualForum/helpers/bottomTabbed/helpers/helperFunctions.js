import React, { Fragment, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Media, Container, Row, Col, Input, CardFooter, Card, CardBody, Form, CardHeader, FormGroup, Label, Button, Popover, PopoverBody, PopoverHeader } from "reactstrap";
import _ from "lodash";
import axios from "axios";
import "./styles.css";
import { NotificationManager } from "react-notifications";
import Sheet from 'react-modal-sheet';
import reduxFormHelpers from "./reduxForumHelpers/formHelpers.js";
import { useForm, Controller } from 'react-hook-form';
import { WithContext as ReactTags } from 'react-tag-input';
import uuid from "react-uuid";

const KeyCodes = {
    comma: 188,
    enter: [10, 13],
};

const itemsPerPage = 10;
  
const delimiters = [...KeyCodes.enter, KeyCodes.comma];


const replySubcommentChecks = reduxFormHelpers().replySubcommentChecks;



const RenderPopoverEmojiLogic = ({ reactions, targetAndPopState, setPopoverState, popoverState, handleRespondEmoji, comment }) => {
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
                    <Popover placement="bottom" isOpen={popoverState[targetAndPopState]} target={targetAndPopState} toggle={() => {
                        closePopover(targetAndPopState);
                    }}>
                        <PopoverHeader>Current Comment Reaction's ({stateCount} total reaction type's)</PopoverHeader>
                        <PopoverBody>
                            <div onMouseLeave={() => {
                                closePopover(targetAndPopState);
                            }} className={"mouse-exit-close-popover-emojis"}>
                                <Row>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("sunglasses", comment, closePopover, targetAndPopState)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/sunglasses.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("steaming", comment, closePopover, targetAndPopState)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/steaming.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("tearsOfJoy", comment, closePopover, targetAndPopState)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/tearsOfJoy.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("vomitting", comment, closePopover, targetAndPopState)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/vomitting.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("partying", comment, closePopover, targetAndPopState)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../assets/gifs/partying.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("screaming", comment, closePopover, targetAndPopState)} className={"emoji-wrapper-course"}>
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
const renderSignedinUserPicVideo = (file) => {
    if (file !== null && _.has(file, "link")) {
        if (file.type.includes("video")) {
            // video logic
            return (
                <Media className="forum-video-wrapper-signedin">
                    <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"media-body img-50 img-fluid m-r-20 rounded-circle force-rounded-file-forum"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} />
                </Media>
            );
        } else {
            // image logic
            return <Media className="img-50 img-fluid m-r-20 rounded-circle force-rounded-file-forum" body alt="profile-picture-sub" src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} data-intro="This is Profile image" />;
        }    
    } else {
        // image logic
        return <Media className="img-50 img-fluid m-r-20 rounded-circle force-rounded-file-forum" body alt="profile-picture-sub" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} data-intro="This is Profile image" />;
    } 
}
const renderPicVideoComment = (file) => {
    if (file !== null && _.has(file, "link")) {
        if (file.type.includes("video")) {
            // video logic
            return (
                <Media className="forum-video-wrapper-signedin">
                    <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"media-body img-50 img-fluid m-r-20 rounded-circle force-rounded-file-forum-second"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} />
                </Media>
            );
        } else {
            // image logic
            return <Media className="img-50 img-fluid m-r-20 rounded-circle force-rounded-file-forum-second" body alt="profile-picture-sub" src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} data-intro="This is Profile image" />;
        }    
    } else {
        // image logic
        return <Media className="img-50 img-fluid m-r-20 rounded-circle force-rounded-file-forum-second" body alt="profile-picture-sub" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} data-intro="This is Profile image" />;
    };
}
const addNewComment = (commentText, setCommentText, subthreadID, setComments, poster, userData, hashtags, setHashtags) => {
    const configuration = {
        subthreadID: subthreadID, 
        commentText,
        subthreadPosterID: poster,
        signedinUserID: userData.uniqueId,
        signedinAccountType: userData.accountType,
        hashtags
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}/post/new/comment/forums/subthread/subcomment`, configuration).then((res) => {
        if (res.data.message === "Successfully posted a new comment on subthread!") {
            console.log(res.data);

            const { comments } = res.data;

            setComments(comments);
            setCommentText("");
            setHashtags([]);

            NotificationManager.success("We've successfully updated this forum post and added your comment & it is now live/public! Check back often to see any breaking changes or check your notifications!", "Successfully posted your comment!", 4750);
        } else {
            console.log("errr inside...:", res.data);

            NotificationManager.error("An unknown error occurred while attempting to post your new comment, contact support if this problem persists or try commenting again...", "Unknown error occurred while trying to post new comment!", 4750);
        }
    }).catch((err) => {
        console.log(err);

        NotificationManager.error("An unknown error occurred while attempting to post your new comment, contact support if this problem persists or try commenting again...", "Unknown error occurred while trying to post new comment!", 4750);
    })
}
const ForumCommentAddHashtagsOptionHelper = ({ setHashtags, hashtags }) => {
    // state initialization
    const suggestions = useState([])

    const handleDelete = (i) => {
        setHashtags(hashtags.filter((tag, index) => index !== i));
    }
    const handleAddition = (tag) => {

        setHashtags(prevState => {
            return [...prevState, tag]
        })
    }

    const handleDrag = (tag, currPos, newPos) => {
        const tags = [...hashtags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        setHashtags(newTags);
    }
    return (
        <div>
            <Label className="heavy-forum-label">{"(OPTIONAL) Add hashtag's to your comment to emphisize certain subject's or points of focus"}</Label>
            <ReactTags 
                autofocus={false}
                tags={hashtags}
                classNames={{
                    tags: 'tagsClass',
                    tagInput: 'tagInputClass',
                    tagInputField: 'form-control',
                    selected: 'selectedClass',
                    tag: 'badge badge-primary custom-tag-streaming',
                    remove: 'removeClass',
                    suggestions: 'suggestionsClass',
                    activeSuggestion: 'activeSuggestionClass'
                }}
                placeholder={"(OPTIONAL) Add hashtags to your comment..."}
                maxLength={10}
                // suggestions={suggestions}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                delimiters={delimiters} 
            />
        </div>
    );
};
const RenderModalSheetAddComment = ({ id, poster, itemOffset, setComments, setPermenantDataState, isOpen, selectedComment, setSelectedComment, setOpenState, userData }) => {

    const [ hashtags, setHashtags ] = useState([]);

    const { register, handleSubmit, control, reset, getValues, setValue, setError, clearErrors, formState: { errors }} = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur"
    });

    const onSubmit = (data) => {
        console.log("onSubmit submitted form data...", data);

        const subcomment = data.subcomment;

        const configuration = {
            subcomment,
            signedinUserID: userData.uniqueId,
            selectedCommentID: selectedComment.id,
            signedinAccountType: userData.accountType,
            hashtags,
            subthreadPosterID: poster,
            subthreadID: id
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/post/subcomment/comment/forum/listing`, configuration).then((res) => {
            if (res.data.message === "Successfully posted a new comment on subthread!") {
                console.log(res.data);

                const { comments } = res.data;

                const endOffset = itemOffset + itemsPerPage;

                setPermenantDataState(comments);
                setComments(comments.slice(itemOffset, endOffset));
                setOpenState(false);
            } else {
                console.log("errr inside...:", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const errorsSubmit = (e, errors) => {
        console.log("errors occurred while attempting to submit", e, errors);
    }

    const resetFormAndClose = () => {
        console.log("resetFormAndClose close and reset...");
        
        reset({
            subcomment: ""
        })
        setHashtags([]);

        setOpenState(false);
    }

    // get form-redux values
    const currentValues = getValues();

    return (
        <Fragment>
            <Sheet isOpen={isOpen} onClose={() => setOpenState(false)}>
                <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <Container fluid={true}>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <Card className="shadowy-card-forum-comment" style={{ marginTop: "25px" }}>
                                <CardHeader>
                                    <h5>Post A New Comment Response</h5>
                                </CardHeader>
                                <Form className="form theme-form" onSubmit={handleSubmit(onSubmit, (e, errors) => {
                                    return errorsSubmit(e, errors);
                                })}>
                                    <CardBody>
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <ForumCommentAddHashtagsOptionHelper hashtags={hashtags} setHashtags={setHashtags} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <Label htmlFor="exampleFormControlSelect3">{replySubcommentChecks.label}</Label>
                                                    <Input {...replySubcommentChecks.check(setError, register)} placeholder={replySubcommentChecks.placeholder} onChange={(e) => replySubcommentChecks.onChange(e.target.value, setValue, clearErrors)} value={currentValues.subcomment} type={replySubcommentChecks.type} className="form-control"  rows="5"/>
                                                    {errors.subcomment ? <span className="span-tooltip">{errors.subcomment.message}</span> : null}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                    <CardFooter>
                                        <Button style={{ width: "49.5%" }} color="primary" type={"submit"} className="mr-1">Submit Comment</Button>
                                        <Button style={{ width: "49.5%" }} color="light" onClick={resetFormAndClose}>Cancel/Close</Button>
                                    </CardFooter>
                                </Form>
                            </Card>
                        </Col>
                    </Container>
                </Sheet.Content>
                </Sheet.Container>

                <Sheet.Backdrop />
            </Sheet>
        </Fragment>
    );
}
const RenderEmojiLogic = ({ setReactionCount, reactions, comments }) => {

    const [emojiData, emojiArrayResponded] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const customEmojiArr = [];
        let count = 0;

        for (const key in reactions) {
            const element = reactions[key];
            
            count += element;
            
            if (element > 0) {
                customEmojiArr.push(key);
            }
        }
        setReactionCount(count);
        emojiArrayResponded(customEmojiArr);
        setReady(true);
    }, []);

    console.log("emojiData inner component ./:", emojiData);


    useEffect( () => {
        console.log("emojiData update or unmount", reactions, comments);

        const customEmojiArr = [];

        for (const key in reactions) {
            const element = reactions[key];

            if (element > 0) {
                customEmojiArr.push(key);
            }
        }
        console.log("customEmojiArr POSSIBLE Problem --- :", customEmojiArr);

        emojiArrayResponded(customEmojiArr);
    });

    return (
        <ul className="product-color m-t-15">
            {emojiData.map((reaction, index) => {
                console.log("re-render reaction...", reaction);
                switch (reaction) {
                    case "partying":
                        return <li key={reaction + index} className="bg-dark emoji-container-forum-react"><img className="gif-reaction" src={require("../../../../../../../assets/gifs/partying.gif")} /></li>;
                        break;
                    case "screaming":
                        return <li key={reaction + index} className="bg-dark emoji-container-forum-react"><img className="gif-reaction" src={require("../../../../../../../assets/gifs/screaming.gif")} /></li>;
                        break;
                    case "steaming":
                        return <li key={reaction + index} className="bg-dark emoji-container-forum-react"><img className="gif-reaction" src={require("../../../../../../../assets/gifs/steaming.gif")} /></li>;
                        break;
                    case "sunglasses":
                        return <li key={reaction + index} className="bg-dark emoji-container-forum-react"><img className="gif-reaction" src={require("../../../../../../../assets/gifs/sunglasses.gif")} /></li>;
                        break;
                    case "tearsOfJoy":
                        return <li key={reaction + index} className="bg-dark emoji-container-forum-react"><img className="gif-reaction" src={require("../../../../../../../assets/gifs/tearsOfJoy.gif")} /></li>;
                        break;
                    case "vomitting":
                        return <li key={reaction + index} className="bg-dark emoji-container-forum-react"><img className="gif-reaction" src={require("../../../../../../../assets/gifs/vomitting.gif")} /></li>;
                        break;
                    default:
                        return null;
                        break;
                }
            })}
        </ul>
    );
}
export default {
    renderSignedinUserPicVideo,
    addNewComment,
    renderPicVideoComment,
    RenderModalSheetAddComment,
    ForumCommentAddHashtagsOptionHelper,
    RenderEmojiLogic,
    RenderPopoverEmojiLogic
};