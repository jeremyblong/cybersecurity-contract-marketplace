import React, { Fragment, useState, useEffect } from "react";
import "./styles.css";
import { Parallax } from 'react-parallax';
import { Container, Row, Col, Button, Media, Badge, Popover, PopoverHeader, PopoverBody, ListGroup, ListGroupItem, Card, CardBody, CardHeader } from 'reactstrap';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import Sheet from 'react-modal-sheet';
import PaginationGeneralHelper from "../../universal/pagination/miscMainPagination.js";
import FilterListingResultsAuctionsPaneHelper from "./helpers/filterPane/filterListingResultsPaneHelper.js";
import axios from "axios";
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


const itemsPerPage = 5;


const ForumHomepageMainHelper = ({ userData }) => {
    // state initialization..
    const [ isOpen, setIsOpenState ] = useState(false);
    const [ permenantData, setPermanantData ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ pageCount, setPageCount ] = useState(0);
    const [ itemOffset, setItemOffset ] = useState(0);
    const [ forums, setForumsData ] = useState(new Array(22).fill(""));
    const [ popovers, setPopoversState ] = useState({});
    const [ ready, setReady ] = useState(false);

    const history = useHistory();



    useEffect(() => {

        const endOffset = itemOffset + itemsPerPage;

        setPageCount(Math.ceil(permenantData.length / itemsPerPage));

        setForumsData(permenantData.slice(itemOffset, endOffset));
        
    }, [itemOffset, itemsPerPage]);

    useEffect(() => {
        
        const newPopoverState = {};

        for (let index = 0; index < forums.length; index++) {
            const forum = forums[index];
            newPopoverState[`top-popper-${index}`] = false;
        }

        setPopoversState(newPopoverState);

        const config = {
            params: {
                signedinID: userData.uniqueId
            }
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/randomized/community/posts`, config).then((res) => {
            if (res.data.message === "Successfully gathered random posts!") {
                console.log(res.data);

                const { communities } = res.data;

                setPageCount(Math.ceil(communities.length / itemsPerPage));

                const endOffset = itemOffset + itemsPerPage;

                setPermanantData(communities);
                setForumsData(communities.slice(itemOffset, endOffset));

                setReady(true);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log("Err critical", err);
        })
    }, [])

    const { width } = useWindowDimensions();

    const handleClickAndRedirect = (lastThreadID, postedBy) => {
        console.log("handleClickAndRedirect clicked/ran.", lastThreadID, postedBy);

        history.push(`/individual/forum/subthread/${lastThreadID}/${postedBy}`);  
    }

    console.log("Width", width, popovers);
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
                                        <h3 className={"vpn-parallax-header-text"}>Welcome to our <strong style={{ textDecorationLine: "underline" }}>MAIN</strong> forum page! Below, You'll be able to find many top forum subject's on various subjects from hacking to how to hire hacker's safely & more...</h3>
                                    </CardHeader>
                                    <CardBody className={"cardbody-vpn-setup"}>
                                        <p className={"vpn-parallax-sub-text"}>You will our <strong style={{ color: "#7366ff", textDecorationLine: "underline" }}>TOP</strong> forum post's on this page <strong style={{ color: "#7366ff", textDecorationLine: "underline" }}>however</strong> if you wish to view certain subject's or genres of discussion, search for whatever subject interests you... <strong style={{ color: "#f73164" }}>Use the search functionality to find exactly what you're looking for or just to narrow the results to more relevant content.</strong></p>
                                    </CardBody>
                                </CardBody>
                            </Card>
                        </div>
                    );
                }}
            />
            <Sheet draggable={false} isOpen={isOpen} onClose={() => setIsOpenState(false)}>
                <Sheet.Container>
                    <Sheet.Header>
                        <div style={{ margin: "12.5px" }} className="centered-both-ways">
                            <Button onClick={() => setIsOpenState(false)} className={"btn-square-danger"} outline color={"danger-2x"} style={{ width: "100%" }}>Exit/Close This Pane</Button>
                        </div>
                    </Sheet.Header>
                    <Sheet.Content>
                        <FilterListingResultsAuctionsPaneHelper />
                    </Sheet.Content>
                    </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
            <Container fluid={true}>
                <Row style={{ marginBottom: "225px" }}>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className={"vpn-setup-card-page-one"}>
                            <CardHeader className={"b-l-secondary border-3"}>
                                <h3 style={{ textDecorationLine: "underline" }}>MAIN forum page where you'll find various hacking discussions & hacking related content & questions/answers...</h3>
                                <hr />
                                <p className="subheader-forum-main">Post hacking related questions, ask how to "Safely" employer hacker's on {process.env.REACT_APP_APPLICATION_NAME}, solve code/hack related questions & much more! You should be able to find whatever you're looking for here..</p>
                            </CardHeader>
                            <CardBody>
                            <Row>
                                <div className="position-far-right-forum">
                                    <Button onClick={() => {
                                        history.push("/create/new/forum/post");
                                    }} color="info-2x" outline className="btn-square-info" style={{ width: "27.5%" }}>Create a forum/community post</Button>
                                </div>
                            </Row>
                                <div className={"vpn-inner-container"}>
                                    <Row>
                                        <div className="grey-back-forum">
                                            <ListGroup>
                                                {ready === true && typeof forums !== "undefined" && forums.length > 0 ? forums.map((forum, index) => {
                                                    console.log("forum!", forum);

                                                    const lastThread = forum.subthreads[forum.subthreads.length - 1];
                                                    return (
                                                        <Fragment key={index}>
                                                            <ListGroupItem className="list-group-item forum-list-group-item flex-column align-items-start">
                                                                <Row>
                                                                    <Col sm="1" lg="1" md="1" xl="1">

                                                                    </Col>
                                                                    <Col sm="11" lg="11" md="11" xl="11">
                                                                        <span className="top-header-forum"><strong id={`top-popper-${index}`} onMouseEnter={() => setPopoversState(prevState => {
                                                                            return {
                                                                                ...prevState,
                                                                                [`top-popper-${index}`]: true
                                                                            }
                                                                        })} className="strong-header-forum">c/{forum.communityName}</strong> - Visibility - {forum.groupVisibility} - {moment(lastThread.date).fromNow()} <span className="justify-content-end-forum">
                                                                            <small className="text-muted">Latest post posted {moment(forum.date).fromNow()}</small>
                                                                        </span></span>
                                                                        <Popover className="popover-forum-group" placement="bottom" isOpen={popovers[`top-popper-${index}`]} target={`top-popper-${index}`} toggle={() => setPopoversState(prevState => {
                                                                            return {
                                                                                ...prevState,
                                                                                [`top-popper-${index}`]: false
                                                                            }
                                                                        })}>
                                                                            <div className="popover-prescedence" onMouseLeave={() => setPopoversState(prevState => {
                                                                                return {
                                                                                    ...prevState,
                                                                                    [`top-popper-${index}`]: false
                                                                                }
                                                                            })}>
                                                                                <PopoverHeader className="popover-header-forum-wrapper">
                                                                                    <Row>
                                                                                        <Col sm="1" md="1" lg="1" xl="1">
                                                                                            <img src={require("../../../../assets/images/jwt.svg")} className={"popover-forum-group-image"} />
                                                                                        </Col>
                                                                                        <Col sm="11" md="11" lg="11" xl="11">
                                                                                            <h6 className="popover-group-title">h/MadeMeSmile</h6>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </PopoverHeader>
                                                                                <PopoverBody>
                                                                                    <Row>
                                                                                        <Col sm="6" md="6" lg="6" xl="6">
                                                                                            <div className="align-left-numbers-forum">
                                                                                                <div className="columized">
                                                                                                    <h4 className="number-forum-count">4.7m</h4>
                                                                                                    <p className="number-forum-count-sub">Member's</p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </Col>
                                                                                        <Col sm="6" md="6" lg="6" xl="6">
                                                                                            <div className="align-left-numbers-forum">
                                                                                                <div className="columized">
                                                                                                    <h4 className="number-forum-count">18.3k</h4>
                                                                                                    <p className="number-forum-count-sub">Online</p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </Col>
                                                                                    </Row>
                                                                                    <hr />
                                                                                    <Row>
                                                                                        <p>A place to share things that made you smile or brightened up your day. A generally uplifting subreddit.</p>
                                                                                    </Row>
                                                                                    <hr />
                                                                                    <Row>
                                                                                        <div className="centered-both-ways">
                                                                                            <Button onClick={() => {}} className="btn-square-info" color="info" style={{ width: "100%" }}>View Community</Button>
                                                                                        </div>
                                                                                    </Row>
                                                                                </PopoverBody>
                                                                            </div>
                                                                        </Popover>
                                                                    </Col>
                                                                </Row>
                                                                <Row style={{ marginTop: "7.5px" }}>
                                                                    <Col sm="1" lg="1" md="1" xl="1">
                                                                        <div className="react-up-down-forum-wrapper">
                                                                            <img src={require("../../../../assets/icons/up.png")} className={"react-icon-forum"} />
                                                                            <h6 className="reaction-count-forum"><strong style={{ color: "green" }}>{lastThread.likes.length}</strong>/<strong style={{ color: "red" }}>{lastThread.dislikes.length}</strong> {`\n`}likes/dislikes</h6>
                                                                            <img src={require("../../../../assets/icons/down.png")} className={"react-icon-forum"} />
                                                                        </div>
                                                                    </Col>
                                                                    <Col onClick={() => handleClickAndRedirect(lastThread.id,lastThread.postedBy)} sm="11" lg="11" md="11" xl="11">
                                                                        <div className="d-flex w-100 justify-content-between">
                                                                        <h5 className="mb-1 forum-title">{lastThread.title}</h5>
                                                                        </div>
                                                                        <p className="mb-1">{lastThread.description.slice(0, 375)}{typeof lastThread.description !== "undefined" && lastThread.description.length >= 375 ? "..." : ""}</p>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroupItem>
                                                        </Fragment>
                                                    );
                                                }) : null}
                                            </ListGroup>
                                        </div>
                                    </Row>
                                    <Row style={{ marginTop: "50px" }}>
                                        <Col sm="12" md="12" lg="12" xl="12">
                                            <PaginationGeneralHelper itemsPerPage={itemsPerPage} loopingData={permenantData} currentPage={currentPage} pageCount={pageCount} setItemOffset={itemOffset} setItemOffset={setItemOffset} setCurrentPage={setCurrentPage} />
                                        </Col>
                                    </Row>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
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
export default connect(mapStateToProps, {  })(ForumHomepageMainHelper); 