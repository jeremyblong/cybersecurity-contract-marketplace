import React, { Fragment, useState, useEffect } from 'react';
import { Card, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, CardBody,Button,Media,InputGroup, InputGroupAddon,Input, InputGroupText } from 'reactstrap';
import one from "../../../../../../assets/images/user/1.jpg";
import "./styles.css";
import { Picker } from 'emoji-mart';
import PaginationEmployerListingHelper from "../../../../universal/pagination/paginationHelper.js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import helpers from "./helpers/helperFunctions.js";
import moment from 'moment';

const { renderSignedinUserPicVideo, addNewComment, renderPicVideoComment } = helpers;

const itemsPerPage = 10;

const CustomTabsetBottomListingAuctionHelper = ({ poster, setOpenState, id, userData, isOpen }) => {
    const [ activeTab, setActiveTab ] = useState('1');
    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false);
    const [ commentText, setCommentText ] = useState("");
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ pageCount, setPageCount ] = useState(0);
    const [ itemOffset, setItemOffset ] = useState(0);
    const [ permenantData, setPermenantDataState ] = useState([]);
    const [ comments, setComments ] = useState([]);
    const [ ready, setReady ] = useState(false);

    useEffect(() => {

        const endOffset = itemOffset + itemsPerPage;

        setPageCount(Math.ceil(permenantData.length / itemsPerPage));

        setComments(permenantData.slice(itemOffset, endOffset));
        
    }, [itemOffset, itemsPerPage]);

    useEffect(() => {
        const configuration = {
            params: {
                subthreadID: id, 
                subthreadPosterID: poster
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/forum/comments/subthread/individual`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered subthread comments!") {
                console.log(res.data);

                const { comments } = res.data;

                setPageCount(Math.ceil(comments.length / itemsPerPage));

                const endOffset = itemOffset + itemsPerPage;

                setPermenantDataState(comments);
                setComments(comments.slice(itemOffset, endOffset));
                setReady(true);
            } else {
                console.log("errr inside...:", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const replyToCommentSub = () => {
        console.log("replyToCommentSub clicked/ran..");

        setOpenState(true);
    }
    const addEmoji = (emoji) => {
        setCommentText(prevState => `${prevState}${emoji.native}`);
        setShowEmojiPicker(false);
    }
    console.log("commentText", commentText, isOpen);
    return (
        <Fragment>
            <Card>
                <Row className="product-page-main m-0">
                    <Col sm="12">
                    <Nav tabs className="border-tab">
                        <NavItem  id="myTab" role="tablist">
                            <NavLink href={null} className={activeTab === '1' ? 'active' : ''}>
                               {"Comments/Reply's"}
                            </NavLink>
                            <div className="material-border"></div>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <div className='timeline-content'>
                                <div className="like-content"><span><i className="fa fa-heart font-danger"></i></span><span className="pull-right comment-number"><span>{"20"} </span><span><i className="fa fa-share-alt mr-0"></i></span></span><span className="pull-right comment-number"><span>{"10"} </span><span><i className="fa fa-comments-o"></i></span></span></div>
                                <div className="comments-box">
                                    <Media>
                                        {renderSignedinUserPicVideo(userData.profilePicsVideos[userData.profilePicsVideos.length - 1])}
                                        <Media body>
                                            <InputGroup className="text-box">
                                                <Input className="form-control custom-css-additions-input-response input-txt-bx" type="text" name="message-to-send" placeholder="Post Your Comment(s) - Enter at least 25 characters..." onChange={(e) => setCommentText(e.target.value)} value={commentText} />
                                                {typeof commentText !== "undefined" && commentText.length >= 25 ? <InputGroupAddon className='input-group-forum-addon-custom' addonType="append">
                                                    <Button color='info-2x' outline className='btn-square-info' onClick={() => addNewComment(commentText, setCommentText, id, setComments, poster, userData)}>Submit</Button>
                                                </InputGroupAddon> : <InputGroupAddon className='input-group-forum-addon-custom' addonType="append">
                                                    <InputGroupText>{25 - commentText.length > 0 ? `${25 - commentText.length} Min Char Left` : "Successful Entry!"}</InputGroupText>
                                                </InputGroupAddon>}
                                                <InputGroupAddon addonType="append">
                                                    <Button color="transparent"><i onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="fa fa-smile-o fa-2x restyle-emoji-activator-icon" aria-hidden="true"></i>
                                                    {showEmojiPicker === true ? (
                                                            <Picker style={{ position: "absolute", right: "40px", top: "-375px" }} set="apple" emojiSize={30} onSelect={addEmoji} />
                                                    ) : null}
                                                    </Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Media>
                                    </Media>
                                </div>
                                <div className="social-chat">
                                    {typeof comments !== "undefined" && comments.length > 0 ? comments.map((comment, index) => {
                                        console.log("comment", comment);
                                        return (
                                            <Fragment key={index}>
                                                <div className="your-msg">
                                                    <Media>
                                                        {renderPicVideoComment(comment.posterPicOrVideo)}
                                                        <Media className='shadowy-msg' body><span className="f-w-600">{comment.posterName} <span>{moment(comment.date).fromNow()} <i className="fa fa-reply font-primary hover-reply-forum-comment" onClick={() => replyToCommentSub()}></i></span></span>
                                                            <p>{comment.commentText}</p>
                                                        </Media>
                                                    </Media>
                                                </div>
                                            </Fragment>
                                        );
                                    }) : <Fragment>
                                        <div className='no-comments-yet-wrapper-forum'>
                                            <img src={require("../../../../../../assets/images/no-comments.png")} className={"forum-no-comments-img"} />
                                        </div>
                                    </Fragment>}
                                    <Row style={{ marginTop: "50px", marginBottom: "75px" }}>
                                        <div className="centered-both-ways">
                                            <PaginationEmployerListingHelper itemsPerPage={itemsPerPage} setItemOffset={setItemOffset} loopingData={permenantData} setPageCount={setPageCount} pageCount={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                                        </div>
                                    </Row>
                                </div>
                            </div>
                        </TabPane>
                    </TabContent>
                    </Col>
                </Row>
            </Card>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {})(withRouter(CustomTabsetBottomListingAuctionHelper));


// <div className="your-msg">
//     <Media>
//         <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={one} />
//         <Media className='shadowy-msg' body><span className="f-w-600">User One <span>{"1 Year Ago"} <i className="fa fa-reply font-primary hover-reply-forum-comment" onClick={() => replyToCommentSub()}></i></span></span>
//             <p>{"we are doing dance and singing songs, please vote our post which is very good for all young peoples"}</p>
//         </Media>
//     </Media>
// </div>
// <div className="other-msg">
//     <Media>
//         <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={one} />
//         <Media className='shadowy-msg' body><span className="f-w-600">User Two <span>{"1 Month Ago"} <i className="fa fa-reply font-primary hover-reply-forum-comment" onClick={() => replyToCommentSub()}></i></span></span>
//             <p>{"ohh yeah very good car and its features i will surely vote for it"} </p>
//         </Media>
//     </Media>
// </div>
// <div className="other-msg">
//     <Media>
//         <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={one} />
//         <Media className='shadowy-msg' body><span className="f-w-600">User Three <span>{"15 Days Ago"} <i className="fa fa-reply font-primary hover-reply-forum-comment" onClick={() => replyToCommentSub()}></i></span></span>
//             <p>{"ohh yeah very good car and its features i will surely vote for it"} </p>
//         </Media>
//     </Media>
// </div>
// <div className="your-msg">
//     <Media>
//         <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={one} />
//         <Media className='shadowy-msg' body><span className="f-w-600">User Four <span>{"1 Year Ago"} <i className="fa fa-reply font-primary hover-reply-forum-comment" onClick={() => replyToCommentSub()}></i></span></span>
//             <p>{"we are doing dance and singing songs, please vote our post which is very good for all young peoples"}</p>
//         </Media>
//     </Media>
// </div>