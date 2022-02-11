import React, { Fragment, useState, useEffect } from "react";
import "./styles.css";
import { Parallax } from 'react-parallax';
import { Container, Row, Col, Button, Media, Badge, Progress, ListGroup, ListGroupItem, Card, CardBody, CardHeader } from 'reactstrap';
import axios from "axios";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import Sheet from 'react-modal-sheet';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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


const itemsPerPage = 20;


const ViewAllListingsToBeGambledOnHelper = ({ userData }) => {
    // state initialization..
    const [ user, setUserData ] = useState(null);
    const [ isOpen, setIsOpenState ] = useState(false);
    const [ auctions, setAuctionsData ] = useState([]);
    const [ permenantData, setPermanantData ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ pageCount, setPageCount ] = useState(0);
    const [ itemOffset, setItemOffset ] = useState(0);

    const history = useHistory();



    useEffect(() => {

        const endOffset = itemOffset + itemsPerPage;

        setPageCount(Math.ceil(permenantData.length / itemsPerPage));

        setAuctionsData(permenantData.slice(itemOffset, endOffset));
        
    }, [itemOffset, itemsPerPage]);

    useEffect(() => {

        const configuration = {
            params: {
                alreadyPooled: []
            }
        }
        
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/listings/avaliable/bid/gamble/on`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered avaliable listings to be bet/bid on!") {
                console.log(res.data);

                const { listings } = res.data;

                setPageCount(Math.ceil(listings.length / itemsPerPage));

                const endOffset = itemOffset + itemsPerPage;

                setPermanantData(listings);
                setAuctionsData(listings.slice(itemOffset, endOffset));
                
            } else {
                NotificationManager.error("Error occurred while attempting to fetch/gather listings that have gambling/betting ENABLED. Please try reloading this page or contact support if this error persists.", "Couldn't fetch info - reload page!", 4500);
            }
        }).catch((err) => {
            NotificationManager.error("Error occurred while attempting to fetch/gather listings that have gambling/betting ENABLED. Please try reloading this page or contact support if this error persists.", "Couldn't fetch info - reload page!", 4500);
        })
    }, [])

    const { width } = useWindowDimensions();

    console.log("Width", width);
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
                                        <h3 className={"vpn-parallax-header-text"}>You're now viewing our "bidding/betting" listings that <strong style={{ textDecorationLine: "underline" }}>allow people to bet</strong> on various variables regarding involved hacker's!</h3>
                                    </CardHeader>
                                    <CardBody className={"cardbody-vpn-setup"}>
                                        <p className={"vpn-parallax-sub-text"}>You will be able to place bet's on specific hacker's winning hacking events, <strong style={{ color: "#7366ff", textDecorationLine: "underline" }}>split your bets/bids</strong> in various ways (bet 40% on loser & 60% on winner to mitigate risk), bet on timeline's of how long it'll take for a successful hacker to infiltrate a system(s) and <strong style={{ color: "#7366ff", textDecorationLine: "underline" }}>MUCH MORE!</strong><hr /><strong style={{ color: "#f73164" }}>View all the betting rules & conditions below by clicking the button "View Rules & Bidding/Betting Conditions"!</strong></p>
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
                                <h3 style={{ textDecorationLine: "underline" }}>Start gambling & betting on 'which hacker's will win' and many other betting/waging types!</h3>
                            </CardHeader>
                            <CardBody>
                                <div className={"vpn-inner-container"}>
                                    <h5>You will need to review & agree to our betting/bidding <strong>Terms & Condition's (Regulations)</strong> BEFORE you will be able to place ANY bets...</h5>
                                    <p style={{ paddingTop: "7.5px" }}>This process will only take a few moments/minute's and is <strong style={{ textDecorationLine: "underline" }}>VITAL</strong> to our user's as all bids placed are <strong style={{ textDecorationLine: "underline" }}>PERMENANT</strong> so we need to make sure & confirm that ALL user's understand the rules & conditions <strong style={{ textDecorationLine: "underline" }}>BEFORE</strong> placing any bets or gambling as <strong style={{ textDecorationLine: "underline" }}>ALL GAMBLED TOKEN'S ARE PERMENANT & UNALTERABLE AND/OR NON-REFUNDABLE.</strong></p>
                                    <hr />
                                    <h5 style={{ marginBottom: "32.5px" }}>Wants to check out the Terms & Condition's so you can get started in our revolutionary <strong style={{ textDecorationLine: "underline" }}>Sport's Bet style betting platform</strong>?! View the <strong style={{ textDecorationLine: "underline" }}>terms</strong> and get started today! </h5>
                                    <hr />
                                    <Button onClick={() => setIsOpenState(true)} className={"btn-square-secondary"} outline color={"secondary-2x"} style={{ width: "100%" }}>Open Filter Options & Narrow Auction Search Results</Button>
                                    <hr />
                                    <Row>
                                        <Col sm="12" lg="12" xl="12" md="12">
                                            <Card>
                                                <Media className="p-20 add-shadow-media-custom-vpn">
                                                    <Media body>
                                                        <h6 className="mt-0 mega-title-badge" style={{ textDecorationLine: "underline" }}>View Our Rules & Regulations Prior To Any Bids/Bets<span className="badge badge-success pull-right digits">{"RULES & CONDITION'S"}</span></h6>
                                                        <p>You MUST read & agree to our 'Terms & Conditions' <strong>BEFORE</strong> placing <strong>ANY</strong> bids/bets to assure all user's are conscious and aware of all rules & regulations in place while betting <strong>LIVE/REAL CURRENCY ({process.env.REACT_APP_CRYPTO_TOKEN_NAME})</strong> to make sure any risk on {process.env.REACT_APP_APPLICATION_NAME} is mitigated & minimized. <strong style={{ color: "#7366ff" }}>These bets/bids are for <em style={{ textDecorationLine: "underline" }}>REAL</em> money & should be taken very seriously, this is essentially sports betting in a sense. Be responsible.</strong></p>
                                                        <hr />
                                                        <Button onClick={() => {
                                                            history.push("/frequently/asked/questions/main/hacker");
                                                        }} className={"btn-square-success"} outline color={"success-2x"} style={{ width: "100%" }}>View Rules & Bidding/Betting Conditions</Button>
                                                    </Media>
                                                </Media>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {typeof auctions !== "undefined" && auctions.length > 0 ? auctions.map((auction, index) => {
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
                                        }) : null}
                                    </Row>
                                    <Row style={{ marginTop: "50px" }}>
                                        <Col sm="12" md="12" lg="12" xl="12">
                                            <PaginationGeneralHelper itemsPerPage={itemsPerPage} loopingData={permenantData} currentPage={currentPage} pageCount={pageCount} setItemOffset={itemOffset} setCurrentPage={setCurrentPage} />
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
export default connect(mapStateToProps, {  })(ViewAllListingsToBeGambledOnHelper); 