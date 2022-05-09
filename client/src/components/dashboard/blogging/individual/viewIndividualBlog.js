import React, { Fragment, useEffect, useState } from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Container, Row, Col, Card, Media, CardBody, Button, Label } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import Breadcrumb from '../../../../layout/breadcrumb';
import { NotificationManager } from "react-notifications";
import helpers from "./helpers/helpers.js";
import RestrictedBlogLeaveCommentHelperPane from "./helpers/sheets/sheetComment.js";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { confirmAlert } from 'react-confirm-alert';


const { renderProfilePicVideo } = helpers;

const ViewIndividualRestrictedAuthBlogHelper = ({ userData }) => {

    const { id } = useParams();

    const [ blog, setBlogData ] = useState(null);
    const [ selectedComment, setSelectedComment ] = useState(null);
    const [ commentText, setCommentText ] = useState("");
    const [ isMessagePaneOpen, setMessagePaneOpenState ] = useState(false);

    console.log("id", id);

    useEffect(() => {
        const config = {
            params: {
                id
            }
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/blog/individual/randomized/short/restricted`, config).then((res) => {
            if (res.data.message === "Successfully gathered blog!") {
                console.log(res.data);

                const { blog } = res.data;

                setBlogData(blog);
            } else {
                console.log("Err", res.data);

                NotificationManager.error("An unknown error occurred while attempting to gather this specific blog post data, please reload the page or contact support if this problem persists...", "Error upload/updating post & profile!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("An unknown error occurred while attempting to gather this specific blog post data, please reload the page or contact support if this problem persists...", "Error upload/updating post & profile!", 4750);
        })
    }, []);

    useEffect(() => {

        const signedinLastProfileFile = typeof userData.profilePicsVideos !== "undefined" && userData.profilePicsVideos.length > 0 ? userData.profilePicsVideos[userData.profilePicsVideos.length - 1] : null;

        const config = {
            signedinUserID: userData.uniqueId,
            signedinLastProfileFile, 
            signedinUserNameFull: `${userData.firstName} ${userData.lastName}`, 
            signedinMemberSince: userData.registrationDate,
            accountType: userData.accountType,
            blogID: id
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/mark/view/restricted/blog/individual`, config).then((res) => {
            if (res.data.message === "Found user & modified/marked view in DB!") {
                console.log(res.data);

                NotificationManager.success("Successfully 'marked' your unique blog view! We mark each view for analytics and other related required information, this information will NOT contain any vulnerable data!", "Successfully marked 'blog' view!", 4750);

            } else {
                console.log("Err", res.data);

                NotificationManager.error("An unknown error occurred while attempting to gather this specific blog post data, please reload the page or contact support if this problem persists...", "Error upload/updating post & profile!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("An unknown error occurred while attempting to gather this specific blog post data, please reload the page or contact support if this problem persists...", "Error upload/updating post & profile!", 4750);
        })
    }, []);

    console.log("blog", blog);

    const bookmarkBlog = (blog) => {
        console.log("bookmarkBlog", blog);
    }
    const likeThisBlog = (blog) => {
        console.log("likeThisBlog", blog);

        confirmAlert({
            title: `Are you sure you'd like to submit this 'like'?`,
            message: `Are you sure you'd like to submit your 'like' for this specific blog post? You can undo this action by clicking the like button again after successfully submitting this like..`,
            buttons: [
              {
                label: 'Yes, Submit Like!',
                onClick: () => {
                    console.log("yes!");

                    const config = {
                        blogID: id,
                        userID: userData.uniqueId,
                        userAccountType: userData.accountType,
                        userName: `${userData.firstName} ${userData.lastName}`
                    }
            
                    axios.post(`${process.env.REACT_APP_BASE_URL}/like/blog/post/restricted/response`, config).then((res) => {
                        if (res.data.message === "Successfully 'liked' blog!") {
                            console.log(res.data);
            
                            const { blog } = res.data;
            
                            setBlogData(blog);

                            NotificationManager.success("Successfully 'liked' this post - we've successfully updated the DB data and your like is now live!", "Successfully 'liked' this blog post!", 4750);

                        } else if (res.data.message === "Removed a like from this post/blog!") {

                            NotificationManager.info("You have ALREADY reacted to this posting, we have removed your previous like and updated the DB data!", "You've already like this post, like retracted!", 4750);
                        } else {
                            console.log("Err", res.data);
            
                            NotificationManager.error("An unknown error occurred while attempting to 'like' this post, please reload the page, try again, or contact support if this problem persists...", "Error upload/updating post & profile!", 4750);
                        }
                    }).catch((err) => {
                        console.log(err);
            
                        NotificationManager.error("An unknown error occurred while attempting to 'like' this post, please reload the page, try again, or contact support if this problem persists...", "Error upload/updating post & profile!", 4750);
                    })
                }
              },
              {
                label: 'No, Cancel..',
                onClick: () => {
                    console.log("no..");
                }
              }
            ]
        });
    }
    const dislikeThisBlog = (blog) => {
        console.log("dislikeThisBlog", blog);

        confirmAlert({
            title: `Are you sure you'd like to submit this 'dislike'?`,
            message: `Are you sure you'd like to submit your 'dislike' for this specific blog post? You can undo this action by clicking the like button again after successfully submitting this dislike..`,
            buttons: [
              {
                label: 'Yes, Submit dislike!',
                onClick: () => {
                    console.log("yes!");

                    const config = {
                        blogID: id,
                        userID: userData.uniqueId,
                        userAccountType: userData.accountType,
                        userName: `${userData.firstName} ${userData.lastName}`
                    }
            
                    axios.post(`${process.env.REACT_APP_BASE_URL}/dislike/blog/post/restricted/response`, config).then((res) => {
                        if (res.data.message === "Successfully 'disliked' blog!") {
                            console.log(res.data);
            
                            const { blog } = res.data;
            
                            setBlogData(blog);

                            NotificationManager.success("Successfully 'dislike' this post - we've successfully updated the DB data and your dislike is now live!", "Successfully 'disliked' this blog post!", 4750);

                        } else if (res.data.message === "Removed a 'dislike' from this post/blog!") {

                            NotificationManager.info("You have ALREADY reacted to this posting, we have removed your previous dislike and updated the DB data!", "You've already disliked this post, dislike retracted!", 4750);
                        } else {
                            console.log("Err", res.data);
            
                            NotificationManager.error("An unknown error occurred while attempting to 'dislike' this post, please reload the page, try again, or contact support if this problem persists...", "Error upload/updating post & profile!", 4750);
                        }
                    }).catch((err) => {
                        console.log(err);
            
                        NotificationManager.error("An unknown error occurred while attempting to 'dislike' this post, please reload the page, try again, or contact support if this problem persists...", "Error upload/updating post & profile!", 4750);
                    })
                }
              },
              {
                label: 'No, Cancel..',
                onClick: () => {
                    console.log("no..");
                }
              }
            ]
        });
    }

    const handleCommentSubmission = () => {
        console.log("handleCommentSubmission clicked");

        const signedinLastProfileFile = typeof userData.profilePicsVideos !== "undefined" && userData.profilePicsVideos.length > 0 ? userData.profilePicsVideos[userData.profilePicsVideos.length - 1] : null;

        const config = {
            signedinUserID: userData.uniqueId,
            commentText,
            signedinUserNameFull: `${userData.firstName} ${userData.lastName}`,
            accountType: userData.accountType,
            blogID: id,
            signedinLastProfileFile
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/leave/comment/restricted/blog/content`, config).then((res) => {
            if (res.data.message === "Successfully left your comment on this blog!") {
                console.log(res.data);

                NotificationManager.success("Successfully left your review on this specific blog post, your comment was posted and is now LIVE!", "Successfully posted your comment!", 4750);

                const { blog } = res.data;

                setBlogData(blog);
                setCommentText("");

            } else {
                console.log("Err", res.data);

                NotificationManager.error("An unknown error occurred while attempting to upload your new comment onto this blog post, please reload the page or contact support if this problem persists...", "Error upload/updating post & profile!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("An unknown error occurred while attempting to upload your new comment onto this blog post, please reload the page or contact support if this problem persists...", "Error upload/updating post & profile!", 4750);
        })
    }

    const calculateCommentsAllLength = (blog) => {
        console.log("calculateCommentsAllLength ran..");

        let sum = 0;

        for (let index = 0; index < blog.comments.length; index++) {
            const comment = blog.comments[index];
            sum += 1;
            for (let iii = 0; iii < comment.subComments.length; iii++) {
                sum += 1;
            }
        }
        return sum;
    }

    return (
        <Fragment>
            <Breadcrumb parent="Viewing An Individual Blog Post" title={blog !== null ? `${blog.title.slice(0, 60)}${blog.title.length >= 60 ? "..." : ""}` : "Loading..."} />
            <RestrictedBlogLeaveCommentHelperPane selectedComment={selectedComment} setBlogData={setBlogData} userData={userData} blogID={id} isMessagePaneOpen={isMessagePaneOpen} setMessagePaneOpenState={setMessagePaneOpenState} />
            <Container fluid={true}>
                <Card className="shadow">
                    <CardBody>
                        {blog !== null ? <Fragment>
                            <Row>
                                <Col sm="12">
                                    <div className="blog-single">
                                        <div className="blog-box blog-details">
                                            <Media className="img-fluid w-100" src={`${process.env.REACT_APP_ASSET_LINK}/${blog.displayImage}`} alt="blog-main" />
                                            <div className="blog-details">
                                                <ul className="blog-social">
                                                    <li className="digits">{moment(blog.date).format("MM/DD/YYYY hh:mm:ss a")} or {moment(blog.date).fromNow()}</li>
                                                    <li className="border-right-digits-blog-individual"><i className="icofont icofont-user"></i>Posted By: <span style={{ textDecorationLine: "underline", marginRight: "12.5px" }}>{blog.posterName} </span></li>
                                                    <li className="border-right-digits-blog-individual"><i className="digits"></i>Total Views: <span style={{ textDecorationLine: "underline", marginRight: "12.5px" }}>{blog.totalViews} </span></li>
                                                    <li style={{ color: "green" }} className="digits border-right-digits-blog-individual"><i className="icofont icofont-thumbs-up"></i>{blog.likes}<span style={{ marginRight: "12.5px" }}> likes</span></li>
                                                    <li style={{ color: "red" }} className="digits border-right-digits-blog-individual"><i className="icofont icofont-thumbs-down"></i>{blog.dislikes}<span style={{ marginRight: "12.5px" }}> dislikes</span></li>
                                                    <li style={{ paddingRight: "12.5px" }} className="digits border-right-digits-blog-individual"><i className="icofont icofont-ui-chat"></i>{calculateCommentsAllLength(blog)} Total Comment's</li>
                                                </ul>
                                                <Label style={{ marginTop: "10px" }} className={"blog-custom-label"}>Blog Title</Label>
                                                <h4 className="slim-margin-top">{blog.title}</h4>
                                                <Label className={"blog-custom-label"}>Blog Subtitle</Label>
                                                <p className="slim-margin-top">{blog.subtitle}</p>
                                                <Label className={"blog-custom-label"}>Poster Account Type</Label>
                                                <p className="slim-margin-top">{blog.posterAccountType === "employers" ? "Employer Account Type" : "Hacker Account Type"}</p>
                                                <div className="single-blog-content-top">
                                                    <Label style={{ marginTop: "20px", marginBottom: "10px" }} className={"blog-custom-label"}>Description</Label>
                                                    <ReactMarkdown children={blog.description} className={"individual-restricted-blog-markdown"} remarkPlugins={[remarkGfm]} />
                                                </div>
                                                <hr />
                                                <Row style={{ marginTop: "22.5px", marginBottom: "22.5px" }} >
                                                    <Col sm="12" md="6" lg="6" xl="6">
                                                        <Button className={"btn-square-success mb-2"} outline color={"success-2x"} style={{ width: "100%" }} onClick={() => likeThisBlog(blog)}>Like This Blog!</Button>
                                                    </Col>
                                                    <Col sm="12" md="6" lg="6" xl="6">
                                                        <Button className={"btn-square-danger mb-2"} outline color={"danger-2x"} style={{ width: "100%" }} onClick={() => dislikeThisBlog(blog)}>Dislike This Blog!</Button>
                                                    </Col>
                                                    {/* <Col sm="12" md="4" lg="4" xl="4">
                                                        <Button className={"btn-square-primary"} outline color={"primary-2x"} style={{ width: "100%" }} onClick={() => bookmarkBlog(blog)}>Bookmark This Blog!</Button>
                                                    </Col> */}
                                                </Row>
                                                <hr />
                                            </div>
                                        </div>
                                        <Row>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <Label style={{ marginTop: "10px", marginBottom: "10px" }} className={"blog-custom-label"}>Leave A Comment</Label>
                                                <textarea className="form-control blog-comment-textinput" value={commentText} onChange={(e) => setCommentText(e.target.value)} rows="5" cols="5" placeholder={"Enter your comment for this specific blog post..."}></textarea>
                                            </Col>
                                        </Row>
                                        <Row style={{ marginTop: "22.5px" }}>
                                            <Col sm="12" md="7" lg="7" xl="7">

                                            </Col>
                                            <Col sm="12" md="5" lg="5" xl="5">
                                                <Button disabled={typeof commentText !== "undefined" && commentText.length >= 50 ? false : true} className={"btn-square-success"} outline color={"success-2x"} style={{ width: "100%" }} onClick={() => handleCommentSubmission()}>Leave Comment!</Button>
                                            </Col>
                                        </Row>
                                        <section className="comment-box">
                                            <h4>Most Recent Blog Post Comment's</h4>
                                            <hr />
                                            <ul>
                                                {typeof blog.comments !== "undefined" && blog.comments.length > 0 ? blog.comments.map((comment, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            <li style={{ marginTop: "17.5px" }}>
                                                                <Media className="align-self-center">
                                                                    {renderProfilePicVideo(comment.posterPicOrVideo)}
                                                                    <Media body>
                                                                        <Row>
                                                                            <Col md="4">
                                                                                <h6 className="mt-0">{comment.posterName}<span> {comment.posterAccountType === "employers" ? "Employer Account" : "Hacker Account"}</span></h6>
                                                                            </Col>
                                                                            <Col md="8">
                                                                                <ul className="comment-social float-left float-md-right">
                                                                                    <li className="digits"><i className="icofont icofont-thumbs-up"></i>{typeof comment.subComments !== "undefined" && comment.subComments.length > 0 ? comment.subComments.length : 0} Reply's (Total)</li>
                                                                                    <li className="digits"><i className="icofont icofont-ui-chat"></i>{typeof comment.alreadyReacted !== "undefined" && comment.alreadyReacted.length > 0 ? comment.alreadyReacted.length : 0} Reaction's</li>
                                                                                    <li className="digits"><i className="icofont icofont-thumbs-up"></i>Posted: {moment(comment.date).fromNow()}</li>
                                                                                </ul>
                                                                            </Col>
                                                                        </Row>
                                                                        <p>{comment.commentText}</p>
                                                                        <span className="span-leave-comment-sub">
                                                                            <h5 onClick={() => {
                                                                                setSelectedComment(comment);

                                                                                setMessagePaneOpenState(true);
                                                                            }} className="text-right right-text-hover-sub-reply" style={{ marginRight: "12.5px" }}>Leave Sub-Comment</h5>
                                                                        </span>
                                                                    </Media>
                                                                </Media>
                                                            </li>
                                                            <ul>
                                                                {typeof comment.subComments !== "undefined" && comment.subComments.length > 0 ? comment.subComments.map((subcomment, index) => {
                                                                    return (
                                                                        <Fragment key={index}>
                                                                            <li>
                                                                                <Media className="align-self-center">
                                                                                    {renderProfilePicVideo(subcomment.posterPicOrVideo)}
                                                                                    <Media body>
                                                                                        <Row>
                                                                                            <Col md="4">
                                                                                                <h6 className="mt-0">{subcomment.posterName}<span> {subcomment.posterAccountType === "employers" ? "Employer Account" : "Hacker Account"}</span></h6>
                                                                                            </Col>
                                                                                            <Col md="8">
                                                                                                <ul className="comment-social float-left float-md-right">
                                                                                                    <li className="digits"><i className="icofont icofont-ui-chat"></i>{typeof subcomment.alreadyReacted !== "undefined" && subcomment.alreadyReacted.length > 0 ? subcomment.alreadyReacted.length : 0} Reaction's</li>
                                                                                                    <li className="digits"><i className="icofont icofont-thumbs-up"></i>Posted: {moment(subcomment.date).fromNow()}</li>
                                                                                                </ul>
                                                                                            </Col>
                                                                                        </Row>
                                                                                        <p>{subcomment.commentText}</p>
                                                                                    </Media>
                                                                                </Media>
                                                                            </li>
                                                                        </Fragment>
                                                                    );
                                                                }) : null}
                                                            </ul>
                                                        </Fragment>
                                                    );
                                                }) : null}
                                            </ul>
                                        </section>
                                    </div>
                                </Col>
                            </Row>
                        </Fragment> : <Fragment>
                            <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                <p>
                                    <Skeleton count={50} />
                                </p>
                            </SkeletonTheme>
                        </Fragment>}
                    </CardBody>
                </Card>
            </Container>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {  })(ViewIndividualRestrictedAuthBlogHelper);