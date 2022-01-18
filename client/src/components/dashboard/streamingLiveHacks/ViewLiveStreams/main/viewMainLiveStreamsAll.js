import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb';
import LearningFilterStreamingLiveHelper from './helpers/filter/index.js';
import { useHistory } from 'react-router-dom';
import { Container,Row, Col, Card, Media, Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import axios from 'axios';
import "./styles.css";
import _ from 'lodash';

const ViewAllLiveStreamsMainHelper = (props) => {
 
    const history = useHistory();

    const [ liveStreamsState, setLiveStreams ] = useState([{
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }]);
    const [ bookmarkOpen, setBookmarkOpenState ] = useState(false);
    const [ shareListingOpen, setShareListingOpenState ] = useState(false);

    useEffect(() => {
        console.log("mounted!");

        const config = {
            params: {
                alreadyPooled: []
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/live/streams/all`, config).then((res) => {
            if (res.data.message === "Gathered ALL live streams!") {
                console.log(res.data);

                const { liveStreams } = res.data;

                const newStreamArray = [];
                let addedCount = 0;

                if (typeof liveStreams !== "undefined" && liveStreams.length > 0) {

                    for (let index = 0; index < liveStreams.length; index++) {
                        const stream = liveStreams[index];
                        // push into array & count.
                        newStreamArray.push(stream);
                        // add to count
                        addedCount++;

                        if ((liveStreams.length - 1) === index) {
                            const combined = [...newStreamArray, ...liveStreamsState.splice(newStreamArray.length, 12)];
                            // set state aka update mapped items
                            setLiveStreams(combined);
                        }
                    }
                } 
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const calculateVisibility = (visibility) => {
        switch (visibility.visibility) {
            case "public/anyone":
                return "Public";
                break;
            case "only-platform-users":
                return "Platform User's"
                break;
            case "specific-group":
                if (visibility.accountType === "employers") {
                    return `Employer's ONLY`;
                } else {
                    return `Hacker's ONLY`;
                }
                break;
            default:
                break;
        }
    }
    const handleBookmarkStream = (stream) => {
        console.log("handleBookmarkStream stream", stream);

        setBookmarkOpenState(false);
    }
    const handleShareStream = (stream) => {
        console.log("handleShareStream stream", stream);

        setShareListingOpenState(false);
    }
    const handleRedirectIndividualPage = (stream) => {
        console.log("handle redirect - handleRedirectIndividualPage... :", stream);

        history.push("/live/streaming/view/individual/info", { stream })
    }
    return (
        <Fragment>
            <Breadcrumb parent="Live-Streams" title="Live ALL Live Streams (All Categories...)"/>
            <Container fluid={true}>
                <Row>
                    <Col xl="9 xl-60">
                        <Row>
                            {liveStreamsState.map((data, i) => {
                                console.log("data", data);
                                // check IF a LIVE stream 
                                if (_.has(data, "activated") && data.activated === true) {
                                    const playbackID = data.playback_id;
                                    return (
                                        <Col xl="4 xl-50 box-col-6" sm="6" key={i}>
                                            <Card>
                                                <div className="blog-box blog-grid text-center product-box">
                                                    <div className="product-img">
                                                        <Media className="img-fluid top-radius-blog" src={`https://image.mux.com/${playbackID}/animated.gif`} alt="" />
                                                        <div className="product-hover">
                                                            <ul>
                                                                <li><i id={"PopoverBookmark"} onClick={() => setBookmarkOpenState(true)} className="icon-bookmark"></i></li>
                                                            </ul>
                                                            <Popover placement="bottom" isOpen={bookmarkOpen} target="PopoverBookmark" toggle={() => {
                                                                setBookmarkOpenState(!bookmarkOpen);
                                                            }}>
                                                                <PopoverHeader>Bookmark This Live Stream? <div className="popover-cancel-container" onClick={() => {
                                                                    setBookmarkOpenState(false)
                                                                }}><img src={require("../../../../../assets/icons/close-64.png")} className="small-close-popover-icon" /></div></PopoverHeader>
                                                                <PopoverBody>Are you sure you'd like to "bookmark" this LIVE stream? If you bookmark this listing, after it is stopped/ended, the stream core data will dissappear & ONLY the core content (title, hashtags, etc...) will still display. You can still view it until the stream ends...
                                                                <hr />
                                                                <Button onClick={() => handleBookmarkStream(data)} style={{ width: "100%" }} className={"btn-square btn-info"} color={"info-2x"}>BOOKMARK Stream!</Button>
                                                                </PopoverBody>
                                                            </Popover>
                                                            <Button onClick={() => handleRedirectIndividualPage(data)} style={{ width: "45%" }} className={"btn-square btn-secondary"} color={"secondary-2x"}>View Stream!</Button>
                                                            <ul>
                                                                <li><i id={"PopoverShare"} onClick={() => setShareListingOpenState(true)} className="icon-share"></i></li>
                                                            </ul>
                                                            <Popover placement="bottom" isOpen={shareListingOpen} target="PopoverShare" toggle={() => {
                                                                setShareListingOpenState(!shareListingOpen);
                                                            }}>
                                                                <PopoverHeader>"SHARE" This Live Stream? <div className="popover-cancel-container" onClick={() => {
                                                                    setShareListingOpenState(false)
                                                                }}><img src={require("../../../../../assets/icons/close-64.png")} className="small-close-popover-icon" /></div></PopoverHeader>
                                                                <PopoverBody>Are you sure you'd like to "share" this LIVE stream? You will be given a link (clicking the button below will copy-to-clipboard) that you can share w/anyone anywhere! Simply take the link which will be a URL and text, share or send it to whomever you'd like...
                                                                <hr />
                                                                <Button onClick={() => handleShareStream(data)} style={{ width: "100%" }} className={"btn-square btn-info"} color={"info-2x"}>SHARE Stream!</Button>
                                                                </PopoverBody>
                                                            </Popover>
                                                        </div>
                                                    </div>
                                                    <div className="blog-details-main">
                                                        <ul className="blog-social create-custom-row-streaming-preview">
                                                            <li className="digits black-bold-title"><h6 style={{ color: "#7366ff" }}>Total Views</h6><hr />{data.views}</li>
                                                            <li className="digits black-bold-title"><h6 style={{ color: "#7366ff" }}>Visibility</h6><hr />{calculateVisibility(data.streamVisibility)}</li>
                                                            <li className="digits black-bold-title"><h6 style={{ color: "#7366ff" }}>Current Views</h6><hr />{data.currentViewers}</li>
                                                        </ul>
                                                        <hr />
                                                        <h6 className="blog-bottom-details main-details-black">{data.streamMainDescription.slice(0, 125)}{data.streamMainDescription.length >= 125 ? "..." : ""}</h6>
                                                        <hr />
                                                        <ul className="blog-social lower-bar-streaming">
                                                            <li className="digits" style={{ color: "#f73164", fontWeight: "bold" }}><h6 style={{ color: "#f73164" }}>Likes</h6><hr />{data.likes}</li>
                                                            <li className="digits" style={{ color: "#a927f9", fontWeight: "bold" }}><h6 style={{ color: "#a927f9" }}>Dislikes</h6><hr />{data.dislikes}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Col>
                                    )
                                } else {
                                    // return default placeholders instead if condition not met
                                    return (
                                        <Col xl="4 xl-50 box-col-6" sm="6" key={i}>
                                            <Card>
                                                <div className="blog-box blog-grid text-center product-box">
                                                    <div className="product-img">
                                                        <Media className="img-fluid top-radius-blog" src={require("../../../../../assets/images/placeholder.png")} alt="" />
                                                        <div className="product-hover">
                                                            <ul>
                                                                <li><i className="icon-link" onClick={() => {}}></i></li>
                                                                <li><i className="icon-import"></i></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="blog-details-main">
                                                        <ul className="blog-social">
                                                            <li className="digits">{data.date}</li>
                                                            <li className="digits">{"by"}: {data.writer}</li>
                                                            <li className="digits">{data.hits} {"Hits"}</li>
                                                        </ul>
                                                        <hr />
                                                        <h6 className="blog-bottom-details">{data.short_description}</h6>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Col>
                                    )
                                }
                            })}
                            {/* https://cybersecurity-platform.s3.amazonaws.com/757d63f5-6fb1-4045-814a-5d5a24641211 */}
                        </Row>
                    </Col>
                    <LearningFilterStreamingLiveHelper />
                </Row>
                </Container>
        </Fragment>
    );
};

export default ViewAllLiveStreamsMainHelper;