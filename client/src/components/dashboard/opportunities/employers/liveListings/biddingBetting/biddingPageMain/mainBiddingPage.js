import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Codepen, FileText, Youtube, Aperture, Search } from 'react-feather';
import two from '../../../../../../../assets/images/faq/2.jpg';
import one from '../../../../../../../assets/images/faq/1.jpg';
import three from '../../../../../../../assets/images/faq/3.jpg';
import four from '../../../../../../../assets/images/faq/4.jpg';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Media, Form, FormGroup, Input, ListGroup, ListGroupItem, Popover, PopoverHeader, PopoverBody, Button, InputGroup, InputGroupAddon, Label, InputGroupText } from "reactstrap"
import { withRouter } from "react-router-dom";
import { FeaturedTutorials, WebDesign, WebDevelopment, UIDesign, UXDesign } from "../../../../../../../constant";
import "./styles.css";
import _ from "lodash";
import helperFunctions from "./helpers/helperFunctions.js";
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { useForm } from 'react-hook-form';
import { connect } from "react-redux";
import { shiftCoreStyles } from "../../../../../../../redux/actions/universal/index.js";

const { PrimaryColorAccordianHelper, SheetPaneBiddingBettingHelper } = helperFunctions;

const MainBiddingBettingPageLandingHelper = ({ location, shiftCoreStyles }) => {

    // redux-form-hook values initialization
    const { register, handleSubmit, control, reset, getValues, setValue, setError, clearErrors, formState: { errors }} = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur"
    });

    const inputCustomRef = useRef(null);
    // state items initialization region
    const [ searchTerm, setSearchTerm ] = useState("");
    // main DATA for entire component
    const [ data, setData ] = useState(null);
    const [ ready, setReady ] = useState(false);
    const [ selectedMessage, setSelectedMessage ] = useState(null);
    const [ popoverOpen, setPopoverOpen ] = useState(false);
    const [ paneIsOpen, setSheetPaneOpen ] = useState(false);
 
    // fetch user details for various portions of component data
    useEffect(() => {
        const { item, listing } = location.state;

        const newObjCombined = {
            employerInfo: item,
            listing,

        }
        // set data
        setData(newObjCombined);

        setReady(true);
    },[])

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const renderBannerImageAndContent = () => {
        if (_.has(data.employerInfo, "profileBannerImage")) {
            return (
                <Fragment>
                    <div className="knowledgebase-bg knowledge-base-custom-banner" style={{ backgroundImage: `url(${process.env.REACT_APP_ASSET_LINK}/${data.employerInfo.profileBannerImage.link})`, backgroundSize:"cover", backgroundPosition:"center", display:"block" }}>
                        <img className="bg-img-cover bg-center" src={`${process.env.REACT_APP_ASSET_LINK}/${data.employerInfo.profileBannerImage.link}`} alt="looginpage" style={{display:"none"}}/>
                    </div>
                    <div id="knowledge-wrapper" className="knowledgebase-search">
                        <div>
                            <code style={{ backgroundColor: "white" }} className={"custom-price-tag"}>{"Need some help understanding bidding/betting on a listing?"}</code>
                            <Form className="form-inline" action={null}>
                                <FormGroup style={{ width: "100%" }} className="w-100"><Search/>
                                    <Input id="input-knowledge" className="form-control-plaintext w-100" type="text" onChange={handleChange} value={searchTerm} placeholder="Need Support? Search for 'auction/bidding' support answers via this input/search-bar..." />
                                </FormGroup>
                            </Form>
                            <hr />
                            <Button onClick={() => {
                                // do something related viewing & search and lookup
                            }} style={{ width: "75%", backgroundColor: "white" }} className="btn-square btn-air-secondary" outline color="secondary-2x">Submit Search & Lookup Rule(s)</Button>
                        </div>
                    </div>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <div className="knowledgebase-bg knowledge-base-custom-banner" style={{ backgroundImage: `url(require("../../../../../../../assets/images/knowledgebase/bg_1.jpg"))`, backgroundSize:"cover", backgroundPosition:"center", display:"block" }}>
                        <img className="bg-img-cover bg-center" src={require("../../../../../../../assets/images/knowledgebase/bg_1.jpg")} alt="looginpage" style={{display:"none"}}/>
                    </div>
                    <div id="knowledge-wrapper" className="knowledgebase-search">
                        <div>
                            <code style={{ backgroundColor: "white" }} className={"custom-price-tag"}>{"Need some help understanding bidding/betting on a listing?"}</code>
                            <Form className="form-inline" action={null}>
                                <FormGroup style={{ width: "100%" }} className="w-100"><Search/>
                                    <Input id="input-knowledge" className="form-control-plaintext w-100" type="text" onChange={handleChange} value={searchTerm} placeholder="Need Support? Search for 'auction/bidding' support answers via this input/search-bar..." />
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </Fragment>
            );
        }
    }
    const handleIconClicked = (value) => {
        console.log("handleIconClicked clicked!");

        setPopoverOpen(false);
        setSelectedMessage(null);

        setTimeout(() => {
            switch (value) {
                case "what-type-of-hack":
                    setSelectedMessage({
                        title: "What type of hack do you expect will be the successful type?",
                        description: "This regards to the 'type' of hack that is successfully deployed that properly/successfully infiltrates this listing's company. Some examples of hack's would be... XSS, SQL Injection, DDoS, etc... - Try to guess which hack will be the used hack and win the waged bets!",
                        selector: "3"
                    });
                    setPopoverOpen(true);
                    break;
                case "completion-timeline":
                    setSelectedMessage({
                        title: "How long do you think it'll take for a hacker to successful infiltrate this company?",
                        description: "This regards to the 'timespan' or 'time' it takes for ANY of the hackers to successfully hack into whatever company linked in this listing. You must be ACCURATE +-1 day, this means if you guess the day the hack will be successful - you win. Anything falling outside of this window is disqualified from pending winning/wagers.",
                        selector: "2"
                    });
                    setPopoverOpen(true);
                    break;
                case "against-for":
                    setSelectedMessage({
                        title: "Would you like to wager bets AGAINST or FOR which hacker? Or a combination?",
                        description: "This is regarding WHO you want to bet on (IF multiple hacker's are involved/selected), You can wager for either all of one party or you can even split your wager's (Ex. loser 35/65 winner) to lower your risk and reduce stress related to wagers. You can only wager UP-TO 100% between players.",
                        selector: "1"
                    });
                    setPopoverOpen(true);
                    break;
                case "flyer-bids":
                    setSelectedMessage({
                        title: "Are you curious as to what 'FLYER-BETS' are?!",
                        description: "FLYER-bets are bets/wagers placed AFTER all INITIAL wagers have been placed. These do NOT affect your pending wagers/bets but are instead tacked onto your existing bets. This can be useful if you have a change or heart in a player(hacker) or feel confidently that your original bet is 'spot-on' so you wish to add more money/tokens ON-TOP of your existing bets.",
                        selector: "4"
                    });
                    setPopoverOpen(true);
                    break;
                default:
                    break;
            }
        }, 250);
    }
    const handleFinalSubmissionInputs = (val) => {
        console.log("handleFinalSubmissionInputs ran .. : ", val);
    }
    const handleFormReset = (type) => {
        console.log("handleFormReset form-current type : ", type);
    }
    const handleFocussedInputChange = () => {
        console.log("focus captured.");
        // allow background clicking again
        shiftCoreStyles(true);
        // open modal - change modal state to OPEN
        setSheetPaneOpen(true);
        // set delay to allow load
        setTimeout(() => {
            // select outter body classname to pause/freeze
            const target = document.querySelector(".enact-nonclick");
            // DISABLE body scroll entirely
            disableBodyScroll(target);
        },  500);
    }
    return (
        <Fragment>
            <SheetPaneBiddingBettingHelper paneIsOpen={paneIsOpen} handleFinalSubmissionInputs={handleFinalSubmissionInputs} shiftCoreStyles={shiftCoreStyles} setSheetPaneOpen={setSheetPaneOpen} clearErrors={clearErrors} clearAllBodyScrollLocks={clearAllBodyScrollLocks} handleFormReset={handleFormReset} />
            <Container fluid={true}>
                <Row>
                    <Col xs="12">
                        {ready === true ? renderBannerImageAndContent() : <Fragment>
                            <div className="knowledgebase-bg" style={{ display:"block" }}>
                                <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                    <p>
                                        <Skeleton count={20} />
                                    </p>
                                </SkeletonTheme>
                            </div>
                        </Fragment>}
                    </Col>
                    <Col xl="4 xl-50" sm="6">
                        <Card className="bg-light bg-light-card-custom">
                            <CardBody style={{ backgroundColor: "white", borderRadius: "30px" }}>
                                <Media className="faq-widgets">
                                    <Media body>
                                        <h5>Types Of Wagers/Bets (<em>Some/small portion</em> of the many betting methods)</h5>
                                        <hr />
                                        <p>Types & ways to wager bets or bet REAL money on hacker's success or unsuccess regarding potential company infiltration's</p>
                                        <ListGroup>
                                            <ListGroupItem>
                                                <Row>
                                                    <Col sm="10" md="10" lg="10" xl="10">
                                                        <h6 className="listgroup-inner-h6-custom">Bid against/for (bet for winner OR who will likely lose)</h6>
                                                    </Col>
                                                    <Col sm="2" md="2" lg="2" xl="2">
                                                        <img id={"pop1"} onClick={() => {
                                                            handleIconClicked("against-for");
                                                        }} src={require("../../../../../../../assets/icons/info.png")} className="custom-icon-attached" />
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <Row>
                                                    <Col sm="10" md="10" lg="10" xl="10">
                                                        <h6 className="listgroup-inner-h6-custom">Bet regarding completion timeline - Time of completion</h6>
                                                    </Col>
                                                    <Col sm="2" md="2" lg="2" xl="2">
                                                        <img id={"pop2"} onClick={() => {
                                                            handleIconClicked("completion-timeline");
                                                        }} src={require("../../../../../../../assets/icons/info.png")} className="custom-icon-attached" />
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <Row>
                                                    <Col sm="10" md="10" lg="10" xl="10">
                                                        <h6 className="listgroup-inner-h6-custom">What type of hack will be successful (DDoS, XSS, etc..)</h6>
                                                    </Col>
                                                    <Col sm="2" md="2" lg="2" xl="2">
                                                        <img id={"pop3"} onClick={() => {
                                                            handleIconClicked("what-type-of-hack");
                                                        }} src={require("../../../../../../../assets/icons/info.png")} className="custom-icon-attached" />
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <Row>
                                                    <Col sm="10" md="10" lg="10" xl="10">
                                                        <h6 className="listgroup-inner-h6-custom">'Flyer-Bids' or bids placed after the initial offerings - confused? Click the 'info' icon...</h6>
                                                    </Col>
                                                    <Col sm="2" md="2" lg="2" xl="2">
                                                        <img id={"pop4"} onClick={() => {
                                                            handleIconClicked("flyer-bids");
                                                        }} src={require("../../../../../../../assets/icons/info.png")} className="custom-icon-attached" />
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <Row>
                                                    <Col sm="12" md="12" lg="12" xl="12">
                                                    <Button onClick={() => {
                                                        // do something related to redirecting to view all bidding options
                                                    }} style={{ width: "100%" }} className="btn-square btn-air-info" outline color="info-2x">View <strong style={{ textDecorationLine: "underline" }}>ALL</strong> betting/bidding options...</Button>
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                            {selectedMessage !== null ? <Popover className="custom-shadow-popover" placement="bottom" isOpen={popoverOpen} target={`pop${selectedMessage.selector}`} toggle={() => {
                                                setPopoverOpen(false);
                                            }}>
                                                <PopoverHeader>
                                                    <Row>
                                                        <Col sm="10" md="10" lg="10" xl="10">
                                                            <h6 className="custom-white-h6">{selectedMessage.title}</h6>
                                                        </Col>
                                                        <Col sm="2" md="2" lg="2" xl="2">
                                                            <div style={{ marginRight: "10px" }} className="popover-cancel-container" onClick={() => {
                                                                setPopoverOpen(false);
                                                            }}><img src={require("../../../../../../../assets/icons/close-64.png")} className="small-close-popover-icon" /></div>
                                                        </Col>
                                                    </Row> 
                                                </PopoverHeader>
                                                <PopoverBody>{selectedMessage.description}</PopoverBody>
                                            </Popover> : null}
                                        </ListGroup>
                                    </Media>
                                </Media>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="4 xl-50" sm="6">
                        <Card className="bg-light bg-light-card-custom">
                            <CardBody style={{ backgroundColor: "white", borderRadius: "30px" }}>
                                <Media className="faq-widgets">
                                    <Media body>
                                        <h5>Core Listing Actions</h5>
                                        <FormGroup className=" m-form__group">
                                            <Label style={{ fontWeight: "bold", color: "blue" }}>Wager A Bet (wager "{process.env.REACT_APP_CRYPTO_TOKEN_NAME}")</Label>
                                            <p>Bet REAL money (via our platform's cryptocurrency) in REALTIME. IF you win - you will win double your waged bets, if you lose... you'll obviously lose any money wagered. Manage <strong>ALL TYPES OF BETS</strong> through the pane activated from clicking the input below.</p>
                                            <InputGroup className="custom-inputgroup-bidding">
                                                <InputGroupAddon addonType="prepend"><InputGroupText><img src={require("../../../../../../../assets/icons/dollar-sm.png")} className="dollar-sign-custom-icon"/></InputGroupText></InputGroupAddon>
                                                <Input useRef={inputCustomRef} onFocusCapture={() => {
                                                    handleFocussedInputChange();
                                                }} className="form-control" type="text" placeholder="Click here to start posting a bid/wager...!"/>
                                            </InputGroup>
                                        </FormGroup>
                                        <div className="padding-button-wrapper">
                                            <Button onClick={() => {
                                                // do something related to redirecting to view all bidding options
                                            }} style={{ width: "100%" }} className="btn-square btn-air-info" outline color="info-2x">Leave a <strong style={{ textDecorationLine: "underline" }}>COMMENT</strong> on this listing</Button>
                                            <hr />
                                            <Button onClick={() => {
                                                // do something related to redirecting to view all bidding options
                                            }} style={{ width: "100%" }} className="btn-square btn-air-success" outline color="success-2x"><strong style={{ textDecorationLine: "underline" }}>BOOKMARK</strong> this listing OR add to <strong style={{ textDecorationLine: "underline" }}>WISHLIST</strong>!</Button>
                                            <hr />
                                            <Button onClick={() => {
                                                // do something related to redirecting to view all bidding options
                                            }} style={{ width: "100%" }} className="btn-square btn-air-primary" outline color="primary-2x">View ALL <strong style={{ textDecorationLine: "underline" }}>PREVIOUS</strong> bids...</Button>
                                            <hr />
                                            <Button onClick={() => {
                                                // do something related to redirecting to view all bidding options
                                            }} style={{ width: "100%" }} className="btn-square btn-air-secondary" outline color="secondary-2x">Send <strong style={{ textDecorationLine: "underline" }}>PRIVATE MESSAGE</strong> to the poster of this listing (*private* - hidden from public)</Button>
                                        </div>
                                    </Media>
                                </Media>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="4 xl-100 box-col-12">
                        <Card className="bg-light bg-light-card-custom">
                            <CardBody style={{ backgroundColor: "white", borderRadius: "30px" }}>
                                <Media className="faq-widgets">
                                    <Media body>
                                        <h5>Core Bidding/Waggering Information</h5>
                                        <p>{"Here are some core/basic info regarding previous, current and pending bid related data..."}</p>
                                        <hr />
                                        <PrimaryColorAccordianHelper />
                                    </Media>
                                </Media>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12">
                        <Row>
                            <Col sm="12">
                                <div className="header-faq">
                                    <h5 className="mb-0">{"Browse articles by category"}</h5>
                                </div>
                            </Col>
                            <Col sm="12">
                                <Card className="card-absolute">
                                    <CardHeader className="bg-secondary">
                                        <h5 className="text-white"><strong>CORE</strong> bidding/betting functionality</h5>
                                    </CardHeader>
                                    <CardBody className="cardbody-only-styles">
                                        <Row>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <Card className="customized-card-card">
                                                    <CardHeader className="b-l-warning custom-cardheader-customized">
                                                        <h5>Bordered Color State</h5>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <p>
                                                            {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been"}
                                                            {"the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"}
                                                            {"of type and scrambled. Lorem Ipsum is simply dummy text of the printing and typesetting"}
                                                            {"industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an"}
                                                            {"unknown printer took a galley of type and scrambled."}
                                                        </p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="12">
                        <div className="header-faq">
                            <h5 className="mb-0">{FeaturedTutorials}</h5>
                        </div>
                        <Row>
                            <Col xl="3 xl-50 box-col-6" md="6">
                                <Card className="features-faq product-box">
                                    <div className="faq-image product-img">
                                        <img className="img-fluid" src={one} alt="" />
                                        <div className="product-hover">
                                            <ul>
                                                <li><i className="icon-link"></i></li>
                                                <li><i className="icon-import"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <CardBody>
                                        <h6>{WebDesign}</h6>
                                        <p>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</p>
                                    </CardBody>
                                    <CardFooter><span>{"Dec 15, 2019"}</span><span className="pull-right"><i className="fa fa-star font-primary"></i><i className="fa fa-star font-primary"></i><i className="fa fa-star font-primary"></i><i className="fa fa-star font-primary"></i><i className="fa fa-star font-primary"></i></span></CardFooter>
                                </Card>
                            </Col>
                            <Col xl="3 xl-50 box-col-6" md="6">
                                <Card className="features-faq product-box">
                                    <div className="faq-image product-img">
                                        <img className="img-fluid" src={two} alt="" />
                                        <div className="product-hover">
                                            <ul>
                                                <li><i className="icon-link"></i></li>
                                                <li><i className="icon-import"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <CardBody>
                                        <h6>{WebDevelopment}</h6>
                                        <p>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</p>
                                    </CardBody>
                                    <CardFooter><span>{"Dec 15, 2019"}</span><span className="pull-right"><i className="fa fa-star font-primary"></i><i className="fa fa-star font-primary"></i><i className="fa fa-star font-primary"></i><i className="fa fa-star font-primary"></i><i className="fa fa-star-o font-primary"></i></span></CardFooter>
                                </Card>
                            </Col>
                            <Col xl="3 xl-50 box-col-6" md="6">
                                <Card className="features-faq product-box">
                                    <div className="faq-image product-img">
                                        <Media className="img-fluid" src={three} alt="" />
                                        <div className="product-hover">
                                            <ul>
                                                <li><i className="icon-link"></i></li>
                                                <li><i className="icon-import"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <CardBody>
                                        <h6>{UIDesign}</h6>
                                        <p>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</p>
                                    </CardBody>
                                    <CardFooter><span>{"Dec 15, 2019"}</span><span className="pull-right"><i className="fa fa-star font-primary"></i><i className="fa fa-star font-primary"></i><i className="fa fa-star font-primary"></i><i className="fa fa-star font-primary"></i><i className="fa fa-star font-primary"></i></span></CardFooter>
                                </Card>
                            </Col>
                            <Col xl="3 xl-50 box-col-6" md="6">
                                <Card className="features-faq product-box">
                                    <div className="faq-image product-img">
                                        <Media className="img-fluid" src={four} alt="" />
                                        <div className="product-hover">
                                            <ul>
                                                <li><i className="icon-link"></i></li>
                                                <li><i className="icon-import"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <CardBody>
                                        <h6>{UXDesign}</h6>
                                        <p>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</p>
                                    </CardBody>
                                    <CardFooter><span>{"Dec 15, 2019"}</span><span className="pull-right"><i className="fa fa-star font-primary"></i><i className="fa fa-star font-primary"></i><i className="fa fa-star font-primary"></i><i className="fa fa-star font-primary"></i><i className="fa fa-star-half-o font-primary"></i></span></CardFooter>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="12">
                        <div className="header-faq">
                            <h5 className="mb-0">{"Latest articles and videos"}</h5>
                        </div>
                        <Row>
                            <Col xl="4" md="6">
                                <Row>
                                    <Col sm="12">
                                        <Card>
                                            <CardBody>
                                                <div className="media"><Codepen className="m-r-30" />
                                                    <Media body>
                                                        <h6 className="f-w-600">{"Using Video"}</h6>
                                                        <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                    </Media>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col sm="12">
                                        <Card>
                                            <CardBody>
                                                <div className="media"><Codepen className="m-r-30" />
                                                    <Media body>
                                                        <h6 className="f-w-600">{"Vel illum qu"}</h6>
                                                        <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                    </Media>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col sm="12">
                                        <Card>
                                            <CardBody>
                                                <div className="media"><Codepen className="m-r-30" />
                                                    <Media body>
                                                        <h6 className="f-w-600">{"Cum sociis natoqu"}</h6>
                                                        <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. "}</p>
                                                    </Media>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xl="4" md="6">
                                <Row>
                                    <Col sm="12">
                                        <Card>
                                            <CardBody>
                                                <div className="media"><FileText className="m-r-30" />
                                                    <Media body>
                                                        <h6 className="f-w-600">{"Donec pede justo"}</h6>
                                                        <p>{" Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. "}</p>
                                                    </Media>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col sm="12">
                                        <Card>
                                            <CardBody>
                                                <div className="media"><FileText className="m-r-30" />
                                                    <Media body>
                                                        <h6 className="f-w-600">{"Nam quam nunc"}</h6>
                                                        <p>{" Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                    </Media>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col sm="12">
                                        <Card>
                                            <CardBody>
                                                <div className="media">
                                                    <FileText className="m-r-30" />
                                                    <Media body>
                                                        <h6 className="f-w-600">{"Using Video"} </h6>
                                                        <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                    </Media>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xl="4">
                                <Row>
                                    <Col xl="12" md="6">
                                        <Card>
                                            <CardBody>
                                                <div className="media"><Youtube className="m-r-30" />
                                                    <Media body>
                                                        <h6 className="f-w-600">{"Vel illum qu"}</h6>
                                                        <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                    </Media>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col xl="12" md="6">
                                        <Card>
                                            <CardBody>
                                                <div className="media"><Youtube className="m-r-30" />
                                                    <Media body>
                                                        <h6 className="f-w-600">{"Cum sociis natoqu"}</h6>
                                                        <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                    </Media>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col xl="12">
                                        <Card>
                                            <CardBody>
                                                <div className="media"><Youtube className="m-r-30" />
                                                    <Media body>
                                                        <h6 className="f-w-600">{"Donec pede justo"}</h6>
                                                        <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                    </Media>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
const mapStateToProps = (state) => {
    return {

    }
}
export default connect(mapStateToProps, { shiftCoreStyles })(withRouter(MainBiddingBettingPageLandingHelper));
