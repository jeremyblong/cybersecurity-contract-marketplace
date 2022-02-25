import React, { Fragment, useEffect, useState } from "react";
import { Popover, PopoverHeader, PopoverBody, Row, Col, Media } from "reactstrap";
import "../../../styles.css";
import ReactPlayer from "react-player";


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
}

const RenderEmojiLogic = ({ reactions, comments }) => {

    const [emojiData, emojiArrayResponded] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const customEmojiArr = [];

        for (const key in reactions) {
            const element = reactions[key];
            if (element > 0) {
                customEmojiArr.push(key);
            }
        }

        emojiArrayResponded(customEmojiArr);
        setReady(true);
    }, []);

    console.log("emojiData inner component ./:", emojiData);

    useEffect( () => () => {
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
    }, [comments] );

    return (
        <div className={"emoji-already-existant-wrapper-container"}>
            {emojiData.map((reaction) => {
                console.log("re-render reaction...", reaction)
                switch (reaction) {
                    case "partying":
                        return <img src={require("../../../../../../../../../../assets/gifs/partying.gif")} className={"emoji-already-existant"} />;
                        break;
                    case "screaming":
                        return <img src={require("../../../../../../../../../../assets/gifs/screaming.gif")} className={"emoji-already-existant"} />;
                        break;
                    case "steaming":
                        return <img src={require("../../../../../../../../../../assets/gifs/steaming.gif")} className={"emoji-already-existant"} />;
                        break;
                    case "sunglasses":
                        return <img src={require("../../../../../../../../../../assets/gifs/sunglasses.gif")} className={"emoji-already-existant"} />;
                        break;
                    case "tearsOfJoy":
                        return <img src={require("../../../../../../../../../../assets/gifs/tearsOfJoy.gif")} className={"emoji-already-existant"} />;
                        break;
                    case "vomitting":
                        return <img src={require("../../../../../../../../../../assets/gifs/vomitting.gif")} className={"emoji-already-existant"} />;
                        break;
                    default:
                        return null;
                        break;
                }
            })}
        </div>
    );
}

const RenderPopoverEmojiLogic = ({ userData, reactions, targetAndPopState, setPopoverState, popoverState, handleRespondEmoji, comment }) => {
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
                                        <div onClick={() => handleRespondEmoji("sunglasses", comment, closePopover, targetAndPopState, userData)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../../../../assets/gifs/sunglasses.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("steaming", comment, closePopover, targetAndPopState, userData)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../../../../assets/gifs/steaming.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("tearsOfJoy", comment, closePopover, targetAndPopState, userData)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../../../../assets/gifs/tearsOfJoy.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("vomitting", comment, closePopover, targetAndPopState, userData)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../../../../assets/gifs/vomitting.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("partying", comment, closePopover, targetAndPopState, userData)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../../../../assets/gifs/partying.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("screaming", comment, closePopover, targetAndPopState, userData)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../../../../assets/gifs/screaming.gif")} />
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
const renderCustomCommentImageVideo = (last) => {
    if (last !== null) {
        // check conditional item to render
        if (last.type.includes("video")) {
            // video logic
            return (
                <Media className="img-50 img-fluid m-r-20 rounded-circle min-50-50-video">
                    <ReactPlayer playing={true} loop={true} muted={true} className={"img-50 img-fluid m-r-20 rounded-circle min-50-50-video"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                </Media>
            );
        } else if (last.type.includes("image")) {
            // image logic
            return <Media className="img-50 img-fluid m-r-20 rounded-circle min-50-50-image" alt="comment-pic-video" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} data-intro="This is Profile image" />;
        } 
    } else {
        return <Media className="img-50 img-fluid m-r-20 rounded-circle min-50-50-image" alt="comment-pic-video" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} data-intro="This is Profile image" />;
    }
}
export default {
    RenderPopoverEmojiLogic,
    RenderEmojiLogic,
    renderCustomCommentImageVideo,
    calculateFileType
};