import React, { Fragment, useState, useEffect, useRef } from 'react';
import "../../styles.css";
import { Row, Col, Media } from 'reactstrap';
import axios from 'axios';
import ReactPlayer from "react-player";
import helpers from "./otherHelpers/helperFunctions.js";
import { NotificationManager } from 'react-notifications';
import uuid from "react-uuid";
import PaginationEmployerListingHelper from "../../../../../../../universal/pagination/paginationHelper.js";

const { RenderPopoverEmojiLogic, RenderEmojiLogic } = helpers;

// pagination settings and/or setup
const itemsPerPage = 5;

const renderCommentPicOrVideo = (file, id) => {
    if (file !== null) {
        if (file.type.includes("video")) {
            // video logic
            return (
                <Fragment key={id}>
                    <Media className="align-self-center">
                        <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"media-body align-self-center maxed-out-video-course-profile"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} />
                    </Media> 
                </Fragment>
            );
        } else {
            // image logic
            return (
                <Fragment key={id}>
                    <Media className="align-self-center">
                        <Media className="align-self-center" src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} alt=""/>
                    </Media>
                </Fragment>
            );
        }  
    } else {
        return <Media key={id} className="align-self-center" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} alt=""/>;
    }
}

// main function starts
const CommentsIndividualPostReturnCommentsHelper = ({ comments, setCommentsState, userData, data }) => {
    // state initialization
    const [ popover, setPopoverState ] = useState({}); 
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ pageCount, setPageCount ] = useState(0);
    const [ itemOffset, setItemOffset ] = useState(0);
    const [ allComments, setAllCommentsState ] = useState([]);
    const [ localComments, setLocalComments ] = useState([]);
    
    // render EVERY CHANGE to pagination
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;

        setAllCommentsState(data.comments);

        console.log("Booyahhhhh.", itemOffset, endOffset);

        setPageCount(Math.ceil(data.comments.length / itemsPerPage));

        setLocalComments(data.comments.slice(itemOffset, endOffset));
        
    }, [itemOffset, itemsPerPage]);

    useEffect( () => {
        console.log("currentPage CHANGED...");

        const endOffset = itemOffset + itemsPerPage;

        setLocalComments(comments.slice(itemOffset, endOffset));
    }, [currentPage] );
    
    console.log("all comment variations...:", allComments, data.comments, comments);

    // render ONLY ONCE
    useEffect(() => {
        setPopoverState(() => {
            const newObjCount = {};
            const comments = data.comments;
            // reassign state items in preperation for future state changes...
            for (const keyyy in comments) {
                newObjCount[`comment${keyyy}`] = false;
            }
            return newObjCount;
        })
    }, []);
    const handleRespondEmoji = (emojiName, comment, closePopover, targetAndPopState) => {
        console.log("emojiName", emojiName);

        const configuration = {
            emojiName,
            id: userData.uniqueId,
            listingId: data.uniqueId,
            commentID: comment.id,
            comment
        };

        axios.post(`${process.env.REACT_APP_BASE_URL}/`, configuration).then((res) => {
            if (res.data.message === "Successfully reacted to comment!") {
                console.log(res.data);

                const { listing, commenttt } = res.data;

                NotificationManager.success("Successfully REACTED to the selected comment, Your response is now live!", "Successfully reacted to comment!", 4500);

                const indexed = comments.findIndex(x => x.id === commenttt.id);

                const copy = [...comments];
                copy[indexed] = commenttt;
                
                setLocalComments(copy);

                closePopover(targetAndPopState);
            } else if (res.data.message === "You've already reacted to this comment! Since you've previously reacted, we're removing your existing response so you can update it!") {
                const { listing, commenttt } = res.data;

                NotificationManager.warning(res.data.message, "Successfully redacted your existing response!", 4500);

                const indexed = comments.findIndex(x => x.id === commenttt.id);

                const copy = [...comments];
                copy[indexed] = commenttt;
                
                setLocalComments(copy);

                closePopover(targetAndPopState);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    console.log("LAST COMPONENT COMMENT.LENGTH...:", comments.length);
    return (
        <Fragment>
            <section className="comment-box">
                <h4>Comment's</h4>
                <hr />
                <ul className={"comment-list-course-ul"}>
                    {typeof localComments !== "undefined" && localComments.length > 0 ? localComments.map((comment, index) => {
                        const popoverIDTarget = `comment${index}`;
                        return (
                            <Fragment key={`${comment.uniqueId}-${comments.length}-${index}`}>
                                <li>
                                    <Media className="align-self-center">
                                        {renderCommentPicOrVideo(comment.posterPicOrVideo, index)}
                                        <Media body>
                                            <Row>
                                                <Col md="4 xl-100">
                                                    <h6 className="mt-0">{comment.posterName}<span> {comment.posterAccountType === "hackers" ? "Hacker/Coder" : "Employer"}</span></h6><Row><RenderEmojiLogic comments={comments} reactions={comment.reactions} /></Row>
                                                </Col>
                                                <Col md="8 xl-100">
                                                    <ul className="comment-social float-left float-md-right learning-comment">
                                                    {/* <li className="digits"><i className="icofont icofont-thumbs-up"></i>{"02 Hits"}</li> */}
                                                    <li id={popoverIDTarget} onClick={() => {
                                                        setPopoverState(prevState => {
                                                            return {
                                                                ...prevState,
                                                                [`comment${index}`]: true
                                                            }
                                                        });
                                                    }} className="digits custom-digit-react-emoji"><i className="icofont icofont-ui-rate-add"></i>{"React to post w/emoji"}</li>
                                                    <RenderPopoverEmojiLogic handleRespondEmoji={handleRespondEmoji} userData={userData} comment={comment} data={data} userData={userData} reactions={comment.reactions} setPopoverState={setPopoverState} popoverState={popover} targetAndPopState={popoverIDTarget} />
                                                    </ul>
                                                </Col>
                                            </Row>
                                            <p>{comment.commentText}</p>
                                        </Media>
                                    </Media>
                                </li>
                                {typeof comment.subComments !== "undefined" && comment.subComments.length > 0 ? comment.subComments.map((subcomment, idx) => {
                                    console.log("sub-comment", subcomment);
                                    return (
                                        <li key={idx}>
                                            <ul>
                                                <li>
                                                    <Media><Media className="align-self-center" src={require("../../../../../../../../../assets/images/blog/9.jpg")} alt=""/>
                                                    <Media body>
                                                        <Row>
                                                        <Col xl="12">
                                                            <h6 className="mt-0">Name goes here<span> {"( Designer )"}</span></h6>
                                                        </Col>
                                                        </Row>
                                                        <p>{"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."}</p>
                                                    </Media>
                                                    </Media>
                                                </li>
                                            </ul>
                                        </li>
                                    );
                                }) : null}
                            </Fragment>
                        );
                    }) : null}
                </ul>
            </section>
            <Row style={{ marginTop: "27.5px" }}>
                <div className="centered-both-ways">
                    <PaginationEmployerListingHelper itemsPerPage={itemsPerPage} setItemOffset={setItemOffset} loopingData={allComments} setPageCount={setPageCount} pageCount={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            </Row>
        </Fragment>
    );
}
export default CommentsIndividualPostReturnCommentsHelper;