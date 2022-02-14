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
    const [ popoverOpen, setPopoverState ] = useState(false);
    const [ isOpen, setIsOpenState ] = useState(false);
    const [ auctions, setAuctionsData ] = useState([]);
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

        const configuration = {
            params: {
                alreadyPooled: []
            }
        }

        const newPopoverState = {};

        for (let index = 0; index < forums.length; index++) {
            const forum = forums[index];
            newPopoverState[`top-popper-${index}`] = false;
        }

        setPopoversState(newPopoverState);

        setPageCount(Math.ceil(forums.length / itemsPerPage));

        const endOffset = itemOffset + itemsPerPage;

        setPermanantData(forums);
        setForumsData(forums.slice(itemOffset, endOffset));

        setReady(true);
    }, [])

    const { width } = useWindowDimensions();

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
                                        {/* {typeof auctions !== "undefined" && auctions.length > 0 ? auctions.map((auction, index) => {
                                            console.log("auction", auction);

                                            const progress = Math.floor(Math.random() * (100 - 0 + 1) + 0);
                                            const random = Math.floor(Math.random() * (500 - 25 + 1) + 25);
                                            const hashtags = auction.originalListingData.hashtags;
                                            const secondaryOrNot = (index % 2 === 1) ? true : false;

                                            return (
                                                <Fragment key={index}>
                                                    <Col sm="12" md="4" lg="4" xl="4" className="mt-4">
                                                        <div className={secondaryOrNot === true ? "project-box add-shadow-auction-wrapper-secondary" : "project-box add-shadow-auction-wrapper-info"}>
                                                            <span className={`badge ${index % 2 === 1 ? 'badge-secondary' : 'badge-info'}`}>{"Bid/Bet On This Auction Listing"}</span>
                                                            <h6 className="auction-mapped-title">{auction.originalListingData.publicCompanyName}</h6>
                                                            <div className="media">
                                                                <img className="img-20 mr-1 rounded-circle" src={require(`../../../../assets/images/user/user.png`)} alt="" />
                                                            </div>
                                                            <div className="auction-tags-mapped-wrapper">
                                                                {typeof hashtags !== "undefined" && hashtags.length > 0 ? hashtags.map((tag, idx) => {
                                                                    return (
                                                                        <Fragment key={idx}>
                                                                            <Badge className="tags-tag-auction-mapped" color={secondaryOrNot === true ? "secondary" : "info"}>{tag.text}</Badge>
                                                                        </Fragment>
                                                                    );
                                                                }) : null}
                                                            </div>
                                                            <ReactMarkdown className="markdown-description-auction" children={auction.originalListingData.listingDescription} remarkPlugins={[remarkGfm]} />
                                                            <Row className="details">
                                                                <Col xs="10" lg="10" xl="10" md="10"><span className="span-betting">Current Active Bids/Bets </span></Col>
                                                                <Col xs="2" lg="2" xl="2" md="2" className={"spacer-col-span-auction"}><span className={secondaryOrNot === true ? 'text-secondary-custom' : 'text-info-custom'}>{random}</span></Col>
                                                                <Col xs="10" lg="10" xl="10" md="10"><span className="span-betting">Total Participant's (Betting Related)</span></Col>
                                                                <Col xs="2" lg="2" xl="2" md="2" className={"spacer-col-span-auction"}><span className={secondaryOrNot === true ? 'text-secondary-custom' : 'text-info-custom'}>{random}</span></Col>
                                                                <Col xs="10" lg="10" xl="10" md="10"> <span className="span-betting">Total Cumlative Bids/Bets (Activity)</span></Col>
                                                                <Col xs="2" lg="2" xl="2" md="2" className={"spacer-col-span-auction"}><span className={secondaryOrNot === true ? 'text-secondary-custom' : 'text-info-custom'}>{auction.allBids.length}</span></Col>
                                                                <Col xs="10" lg="10" xl="10" md="10"> <span className="span-betting"># Of Hacker's Participating</span></Col>
                                                                <Col xs="2" lg="2" xl="2" md="2" className={"spacer-col-span-auction"}><span className={secondaryOrNot === true ? 'text-secondary-custom' : 'text-info-custom'}>{auction.hiredHackers.length}</span></Col>
                                                            </Row>
                                                            <div className="customers">
                                                            <ul>
                                                                <li className="d-inline-block"><img className="img-30 rounded-circle" src={require(`../../../../assets/images/user/2.png`)} alt="" /></li>
                                                                <li className="d-inline-block"><img className="img-30 rounded-circle" src={require(`../../../../assets/images/user/3.png`)} alt="" /></li>
                                                                <li className="d-inline-block"><img className="img-30 rounded-circle" src={require(`../../../../assets/images/user/user.png`)} alt="" /></li>
                                                                <li className="d-inline-block ml-2">
                                                                <p className="f-12">{`+${auction.totalParticipants.length} More`}</p>
                                                                </li>
                                                            </ul>
                                                            </div>
                                                            <div className="project-status mt-4">
                                                            <div className="media mb-0">
                                                                <p className={secondaryOrNot === true ? "remove-bold-restyle-auction-left-secondary" : "remove-bold-restyle-auction-left-info"}>{progress} Day's Left... </p>
                                                                <div className="media-body text-right"><span>Time Remaining To Bid</span></div>
                                                            </div>
                                                            {progress === "100" ?
                                                                <Progress className="sm-progress-bar progress-bar-animated" striped color={secondaryOrNot === true ? "secondary" : "info"} value={progress} style={{ height: "7.5px" }} />
                                                                :
                                                                <Progress className="sm-progress-bar progress-bar-animated" striped color={secondaryOrNot === true ? "secondary" : "info"} value={progress} style={{ height: "7.5px" }} />
                                                            }

                                                            </div>
                                                            <div className="centered-both-ways bottom-container-auction">
                                                                <Button onClick={() => {
                                                                    history.push(`/individual/betting/gambling/listing/${auction.id}`)
                                                                }} className={secondaryOrNot === true ? "btn-square-secondary" : "btn-square-info"} outline color={secondaryOrNot === true ? "secondary-2x" : "info-2x"} style={{ width: "82.5%" }}>View Auction Data/Listing</Button>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Fragment>
                                            );
                                        }) : null} */}
                                        <div className="grey-back-forum">
                                            <ListGroup>
                                            {ready === true && typeof forums !== "undefined" && forums.length > 0 ? forums.map((forum, index) => {
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
                                                                    })} className="strong-header-forum">h/MadeMeSmile</strong> - Posted by u/randomUserHere8437 - 6 hours ago <span className="justify-content-end-forum">
                                                                        <small className="text-muted">{"3 days ago"}</small>
                                                                    </span></span>
                                                                    <Popover className="popover-forum-group" placement="bottom" isOpen={popovers[`top-popper-${index}`]} target={`top-popper-${index}`} toggle={() => setPopoversState(prevState => {
                                                                        return {
                                                                            ...prevState,
                                                                            [`top-popper-${index}`]: false
                                                                        }
                                                                    })}>
                                                                        <div onMouseLeave={() => setPopoversState(prevState => {
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
                                                                        <img src={require("../../../../assets/icons/up.png")} onClick={() => {}} className={"react-icon-forum"} />
                                                                        <h6 className="reaction-count-forum">18.7k</h6>
                                                                        <img src={require("../../../../assets/icons/down.png")} onClick={() => {}} className={"react-icon-forum"} />
                                                                    </div>
                                                                </Col>
                                                                <Col sm="11" lg="11" md="11" xl="11">
                                                                    <div className="d-flex w-100 justify-content-between">
                                                                    <h5 className="mb-1 forum-title">{"During her latest concert, Billie Eilish noticed that a fan was having trouble breathing. So she stopped the entire concert of 20,000+ people — all for one fan — then told her crew to bring an inhaler so the fan could breath again. This is humanity"}</h5>
                                                                    </div>
                                                                    <p className="mb-1">{"It's hard to describe. I'm from Ukraine, Dnipro, about 200 km from the warzone that's already there for eight years, and we all here kind of used to the Russian baked shit that happening in the east. However, now everything seems different. I'm genuinely sure that they'll try to cut the whole country in half"}</p>
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