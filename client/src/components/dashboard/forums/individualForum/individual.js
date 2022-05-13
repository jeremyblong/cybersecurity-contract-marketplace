import React, { Fragment, useState, useEffect, useRef } from "react";
import "./styles.css";
import { Parallax } from 'react-parallax';
import { Container, Row, Col, Button, Card, CardBody, CardHeader, Media, Label, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import axios from "axios";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Breadcrumb from '../../../../layout/breadcrumb';
import CustomTabsetBottomListingAuctionHelper from './helpers/bottomTabbed/bottomTabbedHelper.js';
import Slider from 'react-slick';
// import Ratings from 'react-ratings-declarative'
import { Truck, Gift,CreditCard,Clock } from 'react-feather';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ReactPlayer from "react-player";
import _ from "lodash";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import moment from "moment";
import helpers from "./helpers/bottomTabbed/helpers/helperFunctions.js";
import { NotificationManager } from "react-notifications";
import { isMobile } from 'react-device-detect';


const { RenderEmojiLogic } = helpers;

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
}
  
const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
}

const renderSliderPicOrVideo = (file) => {

    if (file !== null && _.has(file, "link")) {
        if (file.type.includes("video")) {
            // video logic
            return (
                <Media className="video-wrapper-forum-individual">
                    <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"media-body slider-slide-forum-video-image-vid-vid"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} />
                </Media>
            );
        } else {
            // image logic
            return <Media className="slider-slide-forum-video-image" body alt="profile-picture-sub" src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} data-intro="This is Profile image" />;
        }    
    } else {
        // image logic
        return <Media className="slider-slide-forum-video-image" body alt="profile-picture-sub" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} data-intro="This is Profile image" />;
    } 
}
const renderSliderPicOrVideoBottomRow = (file) => {

    if (file !== null && _.has(file, "link")) {
        if (file.type.includes("video")) {
            // video logic
            return (
                <Media className="video-wrapper-forum-individual">
                    <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"media-body slider-slide-forum-video-image"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} />
                </Media>
            );
        } else {
            // image logic
            return <Media className="slider-slide-forum-video-image" body alt="profile-picture-sub" src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} data-intro="This is Profile image" />;
        }    
    } else {
        // image logic
        return <Media className="slider-slide-forum-video-image" body alt="profile-picture-sub" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} data-intro="This is Profile image" />;
    } 
}

const IndividualForumHelper = ({ userData }) => {
    const [ ready, setReady ] = useState(false);
    const { width } = useWindowDimensions();
    const [ state, setState ] = useState({ nav1: null, nav2: null });
    const [ rating,setRating ] = useState(0);
    const [ posterData, setPosterData ] = useState(null);
    const [ reversed, setReversed ] = useState([]);
    const [ forum, setForum ] = useState(null);
    const [ isOpen, setOpenState ] = useState(false);
    const [ reactionPopover, setReactionPopoverState ] = useState(false);
    const [ reactions, setReactions ] = useState(null);
    const [ reactionCount, setReactionCount ] = useState(0);
    
    const slider1 = useRef();
    const slider2 = useRef();
    
    const { id, poster } = useParams();

    useEffect(() => {
        setState({
            nav1: slider1.current,
            nav2: slider2.current
        });
    } ,[]);

    console.log("lastThreadID", id, poster);

    useEffect(() => {
        const config = {
            params: {
                selectedThreadID: id,
                poster
            }
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/forum/poster/core/info`, config).then((res) => {
            if (res.data.message === "Successfully gathered core user information!") {
                console.log(res.data);

                const { user, listing } = res.data;

                setForum(listing);

                setReactions(listing.reactionsToMainPost);

                setPosterData(user);

                const reversed = user.profilePicsVideos.reverse();

                setReversed(reversed);

                setReady(true);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log("Err critical", err);
        })
    }, []);

    const calculateTotalReactions = (reactionOBJ) => {
        let count = 0;

        for (const key in reactionOBJ) {
            const counter = reactionOBJ[key];

            count += counter;
        }
        return count;
    }
    const handleRespondEmoji = (reaction, setPopoverState) => {
        console.log("handleRespondEmoji", reaction, setPopoverState);

        const config = {
            signedinUserID: userData.uniqueId,
            reaction,
            forum,
            accountType: userData.accountType
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/react/thread/with/emoji`, config).then((res) => {
            if (res.data.message === "Successfully reacted to forum post!") {

                console.log(res.data);

                const { reactions } = res.data;

                NotificationManager.success("Successfully reacted with an emoji to this forum posting! If you want to change this or didn't mean to react - react again with any emoji to remove this action.", "Successfully reacted to post!", 4750);

                setReactions(reactions);
                setPopoverState(false);
                
            } else {
                console.log("Err", res.data);

                NotificationManager.error("An error occurred while attempting to react to this post with an emoji, if this problem persists please contact support or try the action again!", "Error attempting to react to post!", 4750);
            }
        }).catch((err) => {
            NotificationManager.error("An error occurred while attempting to react to this post with an emoji, if this problem persists please contact support or try the action again!", "Error attempting to react to post!", 4750);

            console.log("Err critical", err);
        })
    }
    const handleLikeForumPostAddition = () => {
        console.log("handleLikeForumPostAddition clicked.");

        const config = {
            signedinUserID: userData.uniqueId,
            communitityID: forum.id
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/like/forum/listing/individual/responder`, config).then((res) => {
            if (res.data.message === "Successfully liked this forum post!" || res.data.message === "Successfully removed response from post!") {

                console.log(res.data);

                const { updated, likes } = res.data;

                if (likes === true) {
                    setForum(prevState => {
                        return {
                            ...prevState,
                            likes: updated
                        }
                    });
                } else {
                    setForum(prevState => {
                        return {
                            ...prevState,
                            dislikes: updated
                        }
                    });
                }

                NotificationManager.success("You've successfully 'reacted/liked' this post (IF you've already reacted to this post then we have removed your previous action & taken no action on this latest reaction - react again if you want to re-react)! We have updated the relevant information and made the appropriate changes!", "Successfully reacted to post!", 4750);
                
            } else {
                console.log("Err", res.data);

                NotificationManager.error("An error occurred while attempting to react to this post with a like, if this problem persists please contact support or try the action again!", "Error attempting to react to post!", 4750);
            }
        }).catch((err) => {
            NotificationManager.error("An error occurred while attempting to react to this post with a like, if this problem persists please contact support or try the action again!", "Error attempting to react to post!", 4750);

            console.log("Err critical", err);
        })
    }
    const handleDislikeForumPostAddition = () => {
        console.log("handleDislikeForumPostAddition clicked.");

        const config = {
            signedinUserID: userData.uniqueId,
            communitityID: forum.id
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/disliked/forum/listing/individual/responder`, config).then((res) => {
            if (res.data.message === "Successfully disliked this forum post!" || res.data.message === "Successfully removed response from post!") {

                console.log(res.data);

                const { updated, likes } = res.data;

                if (likes === true) {
                    setForum(prevState => {
                        return {
                            ...prevState,
                            likes: updated
                        }
                    });
                } else {
                    setForum(prevState => {
                        return {
                            ...prevState,
                            dislikes: updated
                        }
                    });
                }

                NotificationManager.success("You've successfully 'reacted/disliked' this post (IF you've already reacted to this post then we have removed your previous action & taken no action on this latest reaction - react again if you want to re-react)! We have updated the relevant information and made the appropriate changes!", "Successfully reacted to post!", 4750);
                
            } else {
                console.log("Err", res.data);

                NotificationManager.error("An error occurred while attempting to react to this post with a dislike, if this problem persists please contact support or try the action again!", "Error attempting to react to post!", 4750);
            }
        }).catch((err) => {
            NotificationManager.error("An error occurred while attempting to react to this post with a dislike, if this problem persists please contact support or try the action again!", "Error attempting to react to post!", 4750);

            console.log("Err critical", err);
        })
    }
    const renderMainContentConditionally = () => {
        if (forum !== null && ready === true) {
            return (
                <Fragment>
                    <CardBody>
                        <Row style={{ marginBottom: "25px" }}>
                            <h3 style={{ marginBottom: "20px" }} className="text-left">{"Forum poster's previous profile pics/video's (latest to oldest - left to right)"}</h3>
                            <p className="sub-main-title-p">You will find brief information about the poster that has posted this specific forum post. We believe in transparency & connecting one another at an intimate level with authenticity. Check out this user's info!</p>
                            <hr style={{ marginBottom: "25px" }} />
                            <Col sm="12" md="3" lg="3" xl="3">
                                <div className="shim-down-width">
                                    {ready === true ? <Fragment>
                                        <Slider  
                                            asNavFor={nav2} 
                                            arrows= {false}
                                            afterChange={(index) => slider2.current.slickGoTo(index, false)}
                                            ref={slider => (slider1.current = slider)} 
                                            className="product-slider product-slider-customized-profile-pics"
                                        >
                                            {reversed.map((item, idx) => {
                                                return (
                                                    <Fragment key={idx}>
                                                        {renderSliderPicOrVideo(item)}
                                                    </Fragment>
                                                );
                                            })}
                                        </Slider>
                                        <Slider asNavFor={nav1}
                                            afterChange={(index) => slider1.current.slickGoTo(index, false)}
                                            ref={slider => (slider2.current= slider)}
                                            slidesToShow={4}
                                            swipeToSlide={true}
                                            focusOnSelect={true}
                                            infinite={true}
                                            className="small-slick">
                                            {reversed.map((item, idx) => {
                                                return (
                                                    <Fragment key={idx}>
                                                        {renderSliderPicOrVideoBottomRow(item)}
                                                    </Fragment>
                                                );
                                            })}
                                        </Slider>
                                    </Fragment> : <Fragment>
                                        <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                            <p>
                                                <Skeleton count={20} />
                                            </p>
                                        </SkeletonTheme>
                                    </Fragment>}
                                </div>
                            </Col>
                            <Col sm="12" md="9" lg="9" xl="9">
                                <Row id="row-width-full">
                                    <Col sm="12" md="4" lg="4" xl="4">
                                        <Card className="card-overview-wrapper">
                                            <CardBody>
                                                <div className="filter-block">
                                                    <h4>{"Forum Poster Information (Basic/Core info)"}</h4>
                                                    <ul>
                                                        <li>Full Name: {`${posterData.firstName} ${posterData.lastName}`}</li>
                                                        <li>Username: {`${posterData.username}`}</li>
                                                        <li>Memeber Since: {moment(posterData.registrationDate).fromNow()}</li>
                                                        <li>User Born: {moment(posterData.birthdate).fromNow()}</li>
                                                        <li>Gender: {_.has(posterData, "gender") ? posterData.gender.label : "No Gender Provided."}</li>
                                                    </ul>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col sm="12" md="8" lg="8" xl="8">
                                        <Card className="card-overview-wrapper">
                                            <CardBody>
                                                <div className="collection-filter-block">
                                                    <h4>{"Thread/Sub-thread Info"}</h4>
                                                    <ul className="ul-list-topper">
                                                        <li>
                                                            <div className="media"><Truck/>
                                                            <div className="media-body">
                                                                <h5>{"Total Comments"}</h5>
                                                                <p>{typeof forum.subcomments !== "undefined" ? forum.subcomments.length : "Loading/Not-Provided."}</p>
                                                            </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="media"><Clock/>
                                                            <div className="media-body">
                                                                <h5>{"Posted By"}</h5>
                                                                <p>{`${posterData.firstName} ${posterData.lastName}`}</p>
                                                            </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="media"><Gift/>
                                                            <div className="media-body">
                                                                <h5>{"Posted"}</h5>
                                                                <p>{moment(forum.date).fromNow()}</p>
                                                            </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="media"><CreditCard/>
                                                            <div className="media-body">
                                                                <h5>{"Total Reactions (NOT likes/dislikes)"}</h5>
                                                                <p>{calculateTotalReactions(forum.reactionsToMainPost)}</p>
                                                            </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <div className="product-page-details">
                            <Label className={"custom-label-forum-posting"}>Post Title</Label>
                            <h3>{forum.title}</h3>
                        </div>
                        <div className="product-price f-28">
                            <span className="underline-counts"><span className="green-text">{typeof forum.likes !== "undefined" ? forum.likes.length : "---"}</span> <span style={{ color: "black" }}>/ </span><span className="danger-dislikes">{typeof forum.dislikes !== "undefined" ? forum.dislikes.length : "---"}</span></span><span className="smaller-ledger">likes/dislikes</span>
                        </div>
                        <Label className={"custom-label-forum-posting-small-margin"}>Reactions To Post</Label>
                        <RenderEmojiLogic setReactionCount={setReactionCount} reactions={reactions} comments={forum.subcomments} />
                        <hr/>
                        <Label className={"custom-label-forum-posting"}>Description/Post-Description</Label>
                        <ReactMarkdown children={forum.description} className={"markdown-main-forum-post-desc"} remarkPlugins={[remarkGfm]} />
                        <hr/>
                        <div className="m-t-15">
                            <Button style={isMobile === true ? { width: "100%" } : { width: "16.25%" }} color="success" className="m-r-10" onClick={() => handleLikeForumPostAddition()} >
                                {"Like This Post"}
                            </Button>
                            <Button style={isMobile === true ? { width: "100%" } : { width: "16.25%" }} color="danger" className="m-r-10" onClick={() => handleDislikeForumPostAddition()} >
                                {"Dislike This Post"}
                            </Button>
                            <Button style={isMobile === true ? { width: "100%" } : { width: "32.5%" }} id={"reactionPopoverCustom"} color="info" className="m-r-10" onClick={() => setReactionPopoverState(true)}>
                                {"React/Respond With Emoji To Post"}
                            </Button>
                            <Button style={isMobile === true ? { width: "100%" } : { width: "32.5%" }} color="primary" onClick={() => {}}>
                                {"Report/Moderate"}
                            </Button>
                        </div>
                        <Popover placement="bottom" isOpen={reactionPopover} target={"reactionPopoverCustom"} toggle={() => {
                            setReactionPopoverState(false)
                        }}>
                        <PopoverHeader>Current Comment Reaction's ({reactionCount} total reaction type's)</PopoverHeader>
                        <PopoverBody>
                            <div onMouseLeave={() => {
                                setReactionPopoverState(false)
                            }} className={"mouse-exit-close-popover-emojis"}>
                                <Row>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("sunglasses", setReactionPopoverState)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../assets/gifs/sunglasses.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("steaming", setReactionPopoverState)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../assets/gifs/steaming.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("tearsOfJoy", setReactionPopoverState)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../assets/gifs/tearsOfJoy.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("vomitting", setReactionPopoverState)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../assets/gifs/vomitting.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("partying", setReactionPopoverState)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../assets/gifs/partying.gif")} />
                                        </div>
                                    </Col>
                                    <Col className={"course-emoji-col"} sm="2" md="2" lg="2" xl="2">
                                        <div onClick={() => handleRespondEmoji("screaming", setReactionPopoverState)} className={"emoji-wrapper-course"}>
                                            <img className={"custom-course-emoji-render"} src={require("../../../../assets/gifs/screaming.gif")} />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </PopoverBody>
                    </Popover>
                    </CardBody>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                        <p>
                            <Skeleton count={45} />
                        </p>
                    </SkeletonTheme>
                </Fragment>
            );
        }
    }

    const { nav1, nav2 } = state;

    console.log("posterData", posterData);
    return (
        <Fragment>
            <Parallax
                className={"background-parallax-vpn-setup-img"} 
                bgImage={width >= 1350 ? require('../../../../assets/images/hackerPicOne.jpg') : require('../../../../assets/images/tall-tech.jpg')}
                renderLayer={percentage => {
                    const calculated = (percentage / 9.25) * (percentage * 5.25);
                    return (
                        <div
                            style={isMobile === true ? {
                                position: 'absolute',
                                background: `rgba(${calculated}, 102, 255, ${calculated - 0.275})`,
                                left: '0px',
                                top: '0px',
                                right: "0px",
                                bottom: "0px",
                                width: "100%",
                                height: "100%",
                            } : {
                                position: 'absolute',
                                background: `rgba(${calculated}, 102, 255, ${calculated - 0.275})`,
                                minHeight: "1250px",
                                left: '0px',
                                top: '0px',
                                right: "0px",
                                bottom: "0px",
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <Card className={"vpn-setup-card-parallax"}>
                                <CardBody className={"vpn-inner-cardbody"}>
                                    <CardHeader className={"b-l-primary border-3 vpn-setup-card-header"}>
                                        <h3 className={"vpn-parallax-header-text"}>You're now viewing an individual forum post - scroll down to start interacting with your peer's!</h3>
                                    </CardHeader>
                                    <CardBody className={"cardbody-vpn-setup"}>
                                        <p className={"vpn-parallax-sub-text"}>All forum data is LIVE however sometimes a page refresh is needed regarding certain part's of various form actions but mostly everything should be current. You're viewing the "<strong style={{ color: "#f73164", textDecorationLine: "underline" }}>{forum !== null && typeof forum.title !== "undefined" && forum.title.length > 0 ? forum.title : "(loading...)"}</strong>" forum post that was posted by <strong style={{ color: "#7366ff", textDecorationLine: "underline" }}>{posterData !== null ? posterData.username : "(loading...)"}</strong>. Engage and help out your peer's, talk to employer's, vett potential candiates & so much more, just keep surfing through our forum's and you're likely to find what you're looking for...</p>
                                    </CardBody>
                                </CardBody>
                            </Card>
                        </div>
                    );
                }}
            />
            <Breadcrumb parent="Forum Individual Posting(s)" title="Interact with your peer's & participate in forum discussion"/>
            <Container fluid={true}>
                <Row>
                    <Col>
                        <Card>
                            <Row className="product-page-main">
                                <Col lg="12" md="12" sm="12" xl="12 xl-100">
                                    {renderMainContentConditionally()}
                                </Col>
                            </Row>
                        </Card>
                        <CustomTabsetBottomListingAuctionHelper isOpen={isOpen} setOpenState={setOpenState} id={id} poster={poster} /></Col>
                </Row>
            </Container>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {  })(IndividualForumHelper);