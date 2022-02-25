import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import LeftBar from './bars/leftBar.jsx';
import RightBar from './bars/rightBar.jsx';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import helpers from "./helpers/misc/index.js";
import ViewPostFileContentHelper from "./helpers/viewPostFileContents/viewContent.js";
import _ from "lodash";
import uuid from 'react-uuid';

const { TimelinePostsMappedHelper } = helpers;

const TimelineTab = ({ user, onCloseModal, isOpen, onOpenModal, setSelectedCurrently, setSelectedModalIndex, modalIndexSelected, userData }) => {

    const history = useHistory();

    // console.log("MY USER:", user);

    const [ popover, setPopoverState ] = useState({}); 
    const [ isPostPaneOpen, setPostPaneOpenState ] = useState(false);
    const [ selectedPost, setSelectedPost ] = useState(null);
    const [ selectedIndex, setSelectedIndex ] = useState(0);
    const [ comments, setCommentsState ] = useState([]);
    const [ profilePosts, setProfilePosts ] = useState([]);

    // render ONLY ONCE
    useEffect(() => {
        setPopoverState(() => {
            const newObjCount = {};
            const posts = user.profilePosts;
            // reassign state items in preperation for future state changes...
            for (const keyyy in posts) {
                newObjCount[`post${keyyy}`] = false;
            }
            return newObjCount;
        })
        setProfilePosts(user.profilePosts);
    }, []);

    const postNewContentStart = () => {
        console.log("postNewContentStart clicked/ran.");

        history.push("/create/new/post/hacker/profile/main/data");
    }
    const countReactions = (reactions) => {
        let count = 0;
        for (const key in reactions) {
            const el = reactions[key];
            count += el;
        }
        return count;
    }
    const renderConditionalContent = () => {
        if (user !== null) {
            return (
                <Fragment>
                    {selectedPost !== null ? <ViewPostFileContentHelper setProfilePosts={setProfilePosts} comments={selectedPost.comments} setCommentsState={setCommentsState} setSelectedPost={setSelectedPost} setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} userData={userData} user={user} selectedPost={selectedPost} isPostPaneOpen={isPostPaneOpen} setPostPaneOpenState={setPostPaneOpenState} /> : null}
                    <Col xl="3 xl-40 box-col-4" lg="12" md="5">
                        <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc4">
                            <Row>
                                <LeftBar user={user} />
                            </Row>
                        </div>
                    </Col>
                    <Col xl="6 xl-60 box-col-8" lg="12" md="7">
                        {user.uniqueId === userData.uniqueId ? <Row>
                            <Card>
                                <CardBody>
                                    <h4 className={"poster-image-video-content-header"}>Upload a new post and/or content to your main feed!</h4>
                                    <p className={"posting-sub-header-new-content"}>This can be <strong>ANYTHING</strong> from images to videos to educational content to general updates (ONLY you can see this portion of content)...</p>
                                    <hr />
                                    <Button onClick={postNewContentStart} style={{ width: "100%" }} outline color={"info"} className="btn-square-info text-center"><i className="fa fa-follow m-r-5"></i>Post New Content!</Button>
                                </CardBody>
                            </Card>
                        </Row> : null}
                        <Row>
                            {typeof profilePosts !== "undefined" && profilePosts.length > 0 ? profilePosts.map((post, index) => {
                                const popoverIDTarget = `post${index}`;
                                return <TimelinePostsMappedHelper key={`${post.uniqueId}-${countReactions(post.reactions)}-${post.comments.length}`} setProfilePosts={setProfilePosts} comments={post.comments} setCommentsState={setCommentsState} setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} isPostPaneOpen={isPostPaneOpen} setPostPaneOpenState={setPostPaneOpenState} setSelectedPost={setSelectedPost} user={user} setPopoverState={setPopoverState} popoverIDTarget={popoverIDTarget} popover={popover} userData={userData} index={`${post.uniqueId}-${countReactions(post.reactions)}-${post.comments.length}`} post={post} />;
                            }) : <Fragment>
                                <Row style={{ marginBottom: "17.5px" }}><img src={require("../../../../../assets/images/boxbg.jpg")} className={"maxed-both-ways-not-found"} /></Row>
                                <Row style={{ marginBottom: "17.5px" }}><img src={require("../../../../../assets/images/boxbg.jpg")} className={"maxed-both-ways-not-found"} /></Row>
                                <Row style={{ marginBottom: "17.5px" }}><img src={require("../../../../../assets/images/boxbg.jpg")} className={"maxed-both-ways-not-found"} /></Row>
                                <Row style={{ marginBottom: "17.5px" }}><img src={require("../../../../../assets/images/boxbg.jpg")} className={"maxed-both-ways-not-found"} /></Row>
                                <Row style={{ marginBottom: "17.5px" }}><img src={require("../../../../../assets/images/boxbg.jpg")} className={"maxed-both-ways-not-found"} /></Row>
                                <Row style={{ marginBottom: "17.5px" }}><img src={require("../../../../../assets/images/boxbg.jpg")} className={"maxed-both-ways-not-found"} /></Row>
                            </Fragment>}
                        </Row>
                    </Col>
                    <Col xl="3 xl-100 box-col-12">
                        <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc1">
                            <Row>
                                <RightBar modalIndexSelected={modalIndexSelected} setSelectedModalIndex={setSelectedModalIndex} setSelectedCurrently={setSelectedCurrently} onOpenModal={onOpenModal} isOpen={isOpen} onCloseModal={onCloseModal} user={user} />
                            </Row>
                        </div>
                    </Col>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                        <p>
                            <Skeleton count={60} />
                        </p>
                    </SkeletonTheme>
                </Fragment>
            );
        }
    }
    return (
        <Fragment>
            <Row>
                {renderConditionalContent()}
            </Row>
        </Fragment>
    );
};
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {})(TimelineTab);