import React, { Fragment, useEffect, useState } from "react";
import { Popover, PopoverHeader, PopoverBody, Row, Col } from "reactstrap";
import "../../../styles.css";

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
            {emojiData.map((reaction, indexxx) => {
                console.log("re-render reaction...", reaction)
                switch (reaction) {
                    case "partying":
                        return <img key={indexxx} src={require("../../../../../../../../../../assets/gifs/partying.gif")} className={"emoji-already-existant"} />;
                        break;
                    case "screaming":
                        return <img key={indexxx} src={require("../../../../../../../../../../assets/gifs/screaming.gif")} className={"emoji-already-existant"} />;
                        break;
                    case "steaming":
                        return <img key={indexxx} src={require("../../../../../../../../../../assets/gifs/steaming.gif")} className={"emoji-already-existant"} />;
                        break;
                    case "sunglasses":
                        return <img key={indexxx} src={require("../../../../../../../../../../assets/gifs/sunglasses.gif")} className={"emoji-already-existant"} />;
                        break;
                    case "tearsOfJoy":
                        return <img key={indexxx} src={require("../../../../../../../../../../assets/gifs/tearsOfJoy.gif")} className={"emoji-already-existant"} />;
                        break;
                    case "vomitting":
                        return <img key={indexxx} src={require("../../../../../../../../../../assets/gifs/vomitting.gif")} className={"emoji-already-existant"} />;
                        break;
                    default:
                        return null;
                        break;
                }
            })}
        </div>
    );
}

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
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../../../../assets/gifs/sunglasses.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("steaming", comment, closePopover, targetAndPopState)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../../../../assets/gifs/steaming.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("tearsOfJoy", comment, closePopover, targetAndPopState)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../../../../assets/gifs/tearsOfJoy.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("vomitting", comment, closePopover, targetAndPopState)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../../../../assets/gifs/vomitting.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("partying", comment, closePopover, targetAndPopState)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../../../../../../../assets/gifs/partying.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("screaming", comment, closePopover, targetAndPopState)} className={"emoji-wrapper-course"}>
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

export default {
    RenderPopoverEmojiLogic,
    RenderEmojiLogic
};