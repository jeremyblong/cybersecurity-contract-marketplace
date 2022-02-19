import React, { Fragment, useState, useEffect, useRef } from "react";
import "./styles.css";
import { Parallax } from 'react-parallax';
import { Container, Row, Col, Button, Card, CardBody, CardHeader, Media, Label } from 'reactstrap';
import axios from "axios";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Breadcrumb from '../../../../layout/breadcrumb';
import CustomTabsetBottomListingAuctionHelper from './helpers/bottomTabbed/bottomTabbedHelper.js';
import Slider from 'react-slick';
import Ratings from 'react-ratings-declarative'
import { ProductReview,  Brand, Availability, AddToCart, BuyNow } from "../../../../constant";
import { Truck, Gift,CreditCard,Clock } from 'react-feather';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ReactPlayer from "react-player";
import _ from "lodash";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import moment from "moment";

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

    const slider1 = useRef();
    const slider2 = useRef();
    
    const { id, poster } = useParams();

    const symbol = "$";
    const singleItem = {
        price: "55.99",
        discountPrice: "34.99",
        stock: "11"
    };

    useEffect(() => {
        setState({
            nav1: slider1.current,
            nav2: slider2.current
          });
      } ,[]);

    const changeRating = (rating) => {
        setRating(rating);
    }

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
                                                        <li>Gender: {posterData.gender.label}</li>
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
                                                                <p>{forum.subcomments.length}</p>
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
                            <span className="underline-counts"><span className="green-text">{forum.likes.length}</span> <span style={{ color: "black" }}>/ </span><span className="danger-dislikes">{forum.dislikes.length}</span></span><span className="smaller-ledger">likes/dislikes</span>
                        </div>
                        <Label className={"custom-label-forum-posting-small-margin"}>Reactions To Post</Label>
                        <ul className="product-color m-t-15">
                            <li className="bg-dark emoji-container-forum-react"><img className="gif-reaction" src={require("../../../../assets/gifs/partying.gif")} /></li>
                            <li className="bg-dark emoji-container-forum-react"><img className="gif-reaction" src={require("../../../../assets/gifs/vomitting.gif")} /></li>
                            <li className="bg-dark emoji-container-forum-react"><img className="gif-reaction" src={require("../../../../assets/gifs/screaming.gif")} /></li>
                            <li className="bg-dark emoji-container-forum-react"><img className="gif-reaction" src={require("../../../../assets/gifs/sunglasses.gif")} /></li>
                            <li className="bg-dark emoji-container-forum-react"><img className="gif-reaction" src={require("../../../../assets/gifs/tearsOfJoy.gif")} /></li>
                            <li className="bg-dark emoji-container-forum-react"><img className="gif-reaction" src={require("../../../../assets/gifs/steaming.gif")} /></li>
                        </ul>
                        <hr/>
                        <Label className={"custom-label-forum-posting"}>Description/Post-Description</Label>
                        <ReactMarkdown children={forum.description} className={"markdown-main-forum-post-desc"} remarkPlugins={[remarkGfm]} />
                        <hr/>
                        <div className="m-t-15">
                            <Button style={{ width: "32.5%" }} color="primary" className="m-r-10" onClick={() => {}} >
                                <i className="fa fa-shopping-basket mr-1"></i>{"Reply/Leave New Comment"}
                            </Button>
                            <Button style={{ width: "32.5%" }} color="success" className="m-r-10" onClick={() => {}}>
                                <i className="fa fa-shopping-cart mr-1"></i>{"Award Experience Points"}
                            </Button>
                            <Button style={{ width: "32.5%" }} color="secondary" onClick={() => {}}>
                                <i className="fa fa-heart mr-1"></i>{"Report/Moderate"}
                            </Button>
                        </div>
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
                            style={{
                                position: 'absolute',
                                background: `rgba(${calculated}, 102, 50, ${calculated - 0.275})`,
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
                        <CustomTabsetBottomListingAuctionHelper id={id} poster={poster} /></Col>
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