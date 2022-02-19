import React, { Fragment, useState } from "react";
import ReactPlayer from "react-player";
import { Media, Container, Row, Col, Input, CardFooter, Card, CardBody, Form, CardHeader, FormGroup, Label, Button } from "reactstrap";
import _ from "lodash";
import axios from "axios";
import "./styles.css";
import { NotificationManager } from "react-notifications";
import Sheet from 'react-modal-sheet';
import reduxFormHelpers from "./reduxForumHelpers/formHelpers.js";
import { useForm, Controller } from 'react-hook-form';
import { WithContext as ReactTags } from 'react-tag-input';


const KeyCodes = {
    comma: 188,
    enter: [10, 13],
  };
  
const delimiters = [...KeyCodes.enter, KeyCodes.comma];


const replySubcommentChecks = reduxFormHelpers().replySubcommentChecks;

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
const addNewComment = (commentText, setCommentText, subthreadID, setComments, poster, userData) => {
    const configuration = {
        subthreadID: subthreadID, 
        commentText,
        subthreadPosterID: poster,
        signedinUserID: userData.uniqueId,
        signedinAccountType: userData.accountType
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}/post/new/comment/forums/subthread/subcomment`, configuration).then((res) => {
        if (res.data.message === "Successfully posted a new comment on subthread!") {
            console.log(res.data);

            const { comments } = res.data;

            setComments(comments);
            setCommentText("");

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
            <Label>{"(OPTIONAL) Add hashtag's to your comment to emphisize certain subject's or points of focus"}</Label>
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
const RenderModalSheetAddComment = ({ isOpen, setOpenState }) => {

    const [ hashtags, setHashtags ] = useState([]);

    const { register, handleSubmit, control, reset, getValues, setValue, setError, clearErrors, formState: { errors }} = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur"
    });

    const onSubmit = (data, e) => {
        console.log("onSubmit submitted form data...", data, e);
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
export default {
    renderSignedinUserPicVideo,
    addNewComment,
    renderPicVideoComment,
    RenderModalSheetAddComment
};