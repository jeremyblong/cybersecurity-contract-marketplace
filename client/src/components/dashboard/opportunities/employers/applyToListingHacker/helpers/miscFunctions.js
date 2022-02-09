import React, { Fragment, useState, useEffect, useRef } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Edit, Folder, Clock, Star, Database, Upload } from 'react-feather';
import 'react-vertical-timeline-component/style.min.css';
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import Sheet from 'react-modal-sheet';
import { Container, Row, Col, Card, CardBody, Button, CardHeader, ListGroupItem, ListGroup, FormGroup, Media, Input, Label, Form, Popover, PopoverHeader, PopoverBody, Progress } from 'reactstrap';
import Breadcrumb from '../../../../../../layout/breadcrumb';
import "../styles.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import axios from "axios";
import uuid from 'react-uuid';
import errorImg from '../../../../../../assets/images/search-not-found.png';
import { Storage } from '../../../../../../constant';
import Dropzone from 'react-dropzone-uploader';
import FileViewer from 'react-file-viewer';
import { NotificationManager } from "react-notifications";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import _  from "lodash";
import sheetDisplayHelperFunctions from "./fileManagerHelperFunctions.js";

const TimelineHelper = () => {
    return (
        <Fragment>
            <Card className="custom-card-inner shadow-lg add-padding-card-bottom">
                <CardHeader className={"b-l-primary"}>
                    <h1 className={"text-center main-header-customized"}>Hiring & Application Process/Timeline</h1>
                    <hr />
                    <p className="lead">View the steps of a "listing process" and <Link className="linky" to={"/"}>how-it-works</Link> to understand the process in a more "in-depth" manner. This will show the <strong>general</strong> overall process however we recommend checking out the how-it-works link above if you need more information!</p>
                </CardHeader>
                <CardBody className={"cardbody-greyish"}>
                    <VerticalTimeline className={"custom-vertical-timeline-process"} layout="2-columns">
                        <VerticalTimelineElement
                            textClassName={"customized-text-classname-timeline"}
                            className="vertical-timeline-element--work custom-vertical-timeline-element"
                            animate={true}
                            date="1) Application Phase (Accepting New Canidates)"
                            icon={<Edit />}>
                                <Card className="custom-card-inner custom-card-timeline-item">
                                    <CardBody>
                                        <h5 className="timeline-item-header"> ~ Apply To Listing/Employer Post ~ </h5>
                                        <hr />
                                        <p>{"This phase is the 'application' part of the process where 'hackers' will apply to the listing - this is simply the application phase ONLY."}</p>
                                    </CardBody>
                                </Card>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            textClassName={"customized-text-classname-timeline"}
                            className="vertical-timeline-element--work custom-vertical-timeline-element"
                            animate={true}
                            date="2) Interview Phase (Actively interviewing & selecting candidates)"
                            icon={<Edit />}>
                                <Card className="custom-card-inner custom-card-timeline-item">
                                    <CardBody>
                                        <h5 className="timeline-item-header"> ~ Interview Phase (Interviewing & selecting potential candidates) ~ </h5>
                                        <hr />
                                        <p>{"This phase is the 'interview/vetting' phase where the employer will interview and select candidates based on numerous considerations/factors. In your interviews, remember to be professional and honest/transparent as this will increase your odd's at getting picked. This is NOT a decision phase."}</p>
                                    </CardBody>
                                </Card>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            textClassName={"customized-text-classname-timeline"}
                            className="vertical-timeline-element--work custom-vertical-timeline-element"
                            animate={true}
                            date="3) Interview Completion & Hiring Phase (Selected hacker's will be choosen to attempt to hack)"
                            icon={<Edit />}>
                                <Card className="custom-card-inner custom-card-timeline-item">
                                    <CardBody>
                                        <h5 className="timeline-item-header"> ~ Candidate selection & hiring process/selection ~ </h5>
                                        <hr />
                                        <p>{"This phase is the 'Candidate Selection & Hiring Point' where people (hacker's) will be selected to do the job at hand and all other's that're not selected will be removed from this ticket & notified. At this point, selected hacker's MUST commit/follow-through with any job related duties assigned from this point forward!"}</p>
                                    </CardBody>
                                </Card>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            textClassName={"customized-text-classname-timeline"}
                            className="vertical-timeline-element--work custom-vertical-timeline-element"
                            animate={true}
                            date="4) Hacking/hack's 'Activation Timeline' (Timeline/time allotted for hacker's to attempt to breach physical/digital security measures)"
                            icon={<Edit />}>
                                <Card className="custom-card-inner custom-card-timeline-item">
                                    <CardBody>
                                        <h5 className="timeline-item-header"> ~ Hacking/hack's 'Activation Timeline' - Time allotted for desired phyiscal/digital asset's hacks start NOW and run until noted in listing ~ </h5>
                                        <hr />
                                        <p>{"This phase is the 'Hacking Fun - AKA Activation Timeline' where hacker's are finally allowed to test/hack various digital and physical assets (Timeline/time allotted for hacker's to attempt to breach physical/digital security measures). Hacker's during this time period are allowed to infiltrate various systems - THIS is one of THE most important points in time as ANY RESULTS YEILDED DURING THIS PERIOD WILL RESULT IN FINANCIAL PAY/GAINS (IF APPLICABLE - read rules & regulations in FAQ)"}</p>
                                    </CardBody>
                                </Card>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            textClassName={"customized-text-classname-timeline"}
                            className="vertical-timeline-element--work custom-vertical-timeline-element"
                            animate={true}
                            date="5) Hack/Hack's 'Review Period' where employer's will asses any damage/evidence of successful infiltration's of said systems. This period of time is allotted for employer's to asses whether a hack warrants actual financial compensation."
                            icon={<Edit />}>
                                <Card className="custom-card-inner custom-card-timeline-item">
                                    <CardBody>
                                        <h5 className="timeline-item-header"> ~ Hack/Hack's 'Review Period' where employer's will asses any damage/evidence of successful infiltration's of said systems ~ </h5>
                                        <hr />
                                        <p>{`This phase is the 'Review Period' where employer's will review any documentation/documented-reports, write-up's, security flaw reviews and much more. This period is strictly for employer's to asses what hack's warrent rewards (financial compensation in ${process.env.REACT_APP_CRYPTO_TOKEN_NAME} tokens) and for how much said reward should be (contingent upon abidment of rules & regulations and code's of conduct - as well as the severity of such hack's)`}</p>
                                    </CardBody>
                                </Card>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            textClassName={"customized-text-classname-timeline"}
                            className="vertical-timeline-element--work custom-vertical-timeline-element"
                            animate={true}
                            date="6) HACKER WINNER's will be ANNOUNCED AFTER the employer successfully reviews and determines which hack's were successful"
                            icon={<Edit />}>
                                <Card className="custom-card-inner custom-card-timeline-item">
                                    <CardBody>
                                        <h5 className="timeline-item-header"> ~ HACKER WINNER's will be ANNOUNCED AFTER the employer successfully reviews and determines which hack's were successful ~ </h5>
                                        <hr />
                                        <p>{`This phase is the 'BID/WAGER WINNER ANNOUNCEMENT' and occurs shortly thereafter the previous rounds conclusion of results regarding which hack/hack's were successful and which one's weren't or didn't meet community standards or abided by our 'rules-and-regulations'. Successful bids/wagers will NOT be paid out just yet, however they will be paid in the following step/action. Successful HACKER's WILL BE COMPENSATED however AT THIS STAGE and any unsuccessful hacker's will be noted and ranked appropriately on various leaderboards and statistic boards.`}</p>
                                    </CardBody>
                                </Card>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            textClassName={"customized-text-classname-timeline"}
                            className="vertical-timeline-element--work custom-vertical-timeline-element"
                            animate={true}
                            date="7) Financial rewards are dispursed to winner of wager/bets regarding this listing's winner's."
                            icon={<Edit />}>
                                <Card className="custom-card-inner custom-card-timeline-item">
                                    <CardBody>
                                        <h5 className="timeline-item-header"> ~ Financial rewards in {process.env.REACT_APP_CRYPTO_TOKEN_NAME} will be paid to any bidding winner's ~ </h5>
                                        <hr />
                                        <p>{`This phase is the 'Bid Payout's' occur and any successful bets will be compensated accordingly. This is the END of any/all bidding for this listing specifically and the auctionhouse will close at this point regarding this specific listing's wager's & bets.`}</p>
                                    </CardBody>
                                </Card>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            textClassName={"customized-text-classname-timeline"}
                            className="vertical-timeline-element--work custom-vertical-timeline-element"
                            animate={true}
                            date="8) ANY related data and/or statistics related to this listing will be updated immediately and winner's/loser's will be announced PUBLICALLY."
                            icon={<Edit />}>
                                <Card className="custom-card-inner custom-card-timeline-item">
                                    <CardBody>
                                        <h5 className="timeline-item-header"> ~ ANY related data and/or statistics related to this listing will be updated immediately and winner's/loser's will be announced PUBLICALLY. ~ </h5>
                                        <hr />
                                        <p>{`This phase is the 'PUBLIC ANNOUNCEMENTS OF WINNERS/LOSERS' announcements and will occur at the step represented in this timeline. This is purely just a leaderboard/statistic update step and nothing notable will occur at this point.`}</p>
                                    </CardBody>
                                </Card>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            textClassName={"customized-text-classname-timeline"}
                            className="vertical-timeline-element--work custom-vertical-timeline-element"
                            animate={true}
                            date="9) CONCLUSSION of said listing and 'Close-Out'."
                            icon={<Edit />}>
                                <Card className="custom-card-inner custom-card-timeline-item">
                                    <CardBody>
                                        <h5 className="timeline-item-header"> ~ CONCLUSSION of said listing and 'Close-Out'. This listing at this point will be concluded and will be removed from public interactions ~ </h5>
                                        <hr />
                                        <p>{`This phase is the 'CONCLUSSION OF LISTING' which is essentially the point in which all previous actions have been completed and dispursed (including but not limited to payouts/rewards to both hacker's and better's) in which this listing will now be publically removed and archived for research or debate if needed down the road. Thanks for your participation and good luck on future listing!`}</p>
                                    </CardBody>
                                </Card>
                        </VerticalTimelineElement>
                    </VerticalTimeline>
                </CardBody>
            </Card>
        </Fragment>
    );
};

const SheetPaneSubmittingDataHelper = ({ ready, currentUserData, shiftCoreStyles, alreadyAdded, clearAllBodyScrollLocks, userData, sheetIsOpen, setSheetOpenState }) => {
    // deconstruct redux-state items..

    console.log("currentUserData", currentUserData);

    const renderSentence = (actual, type, val) => {
        // run conditionals to figure out what to display to user and what to mark as "incomplete"
        if (ready === true && currentUserData !== null) {
            // ready to display
            if (currentUserData.hasOwnProperty(actual)) {
                // return proper/desired "right" filled out data
                return <p className={"mb-1 listitem-sub-text-custom"}>Your {type} <strong style={currentUserData.hasOwnProperty(actual) ? { color: "#dc3545", fontSize: "1.005rem", fontWeight: 500 } : { color: "#a927f9", fontSize: "1.005rem", fontWeight: 500 }}>{val}</strong> will be submitted to the employer...</p>;
            } else {
                // throw error warning user
                return <p className={"mb-1 listitem-sub-text-custom override-red"}>You have NOT filled out the required field of <em style={{ textDecorationLine: "underline" }}>{type}</em>, therefore you will be unable to apply to this listing! If you'd like to apply to this listing, go to <Link to={"/profile/settings/edit"} className="linky">your profile settings page</Link> and edit the appropriate sections, then come back and try again!</p>;
            }
        } else {
            // return loading "data"
            return <p className={"mb-1 listitem-sub-text-custom"}>Still loading your data/content...!</p>;
        }
    }

    const renderSentenceParagraph = (dbName, customText, property) => {
        // run conditionals to figure out what to display to user and what to mark as "incomplete"
        if (ready === true && currentUserData !== null) {
            // ready to display
            if (currentUserData.hasOwnProperty(dbName)) { // "aboutMe", "About Me Section/Data", userData.aboutMe
                // return proper/desired "right" filled out data
                return <p style={{ color: "#dc3545" }} className={"mb-1 listitem-sub-text-custom"}>Your "About Me" information is {property}</p>;
            } else {
                // throw error warning user
                return <p className={"mb-1 listitem-sub-text-custom override-red"}>You have NOT filled out this required field of <em style={{ textDecorationLine: "underline" }}>{customText}</em>, therefore you will be unable to apply to this listing! If you'd like to apply to this listing, go to <Link to={"/profile/settings/edit"} className="linky">your profile settings page</Link> and edit the appropriate sections, then come back and try again!</p>;
            }
        } else {
            // return loading "data"
            return <p className={"mb-1 listitem-sub-text-custom"}>Still loading your data/content...!</p>;
        }
    }
    const renderRibbonSuccessUnacceptable = (value) => {
        return (
            <Fragment>
                {!currentUserData.hasOwnProperty(value) ? <div className="ribbon ribbon-clip-bottom-right ribbon-custom-accept-or-deny ribbon-danger">In-Active/Un-Acceptable</div> : <div className="ribbon ribbon-clip-bottom-right ribbon-custom-accept-or-deny ribbon-success">Active/Acceptable</div>}
            </Fragment>
        );
    }
    // render and return if conditions met
    const renderItemsListCustom = (chunk) => {
        // render left (FIRST) chunk
        if (chunk === "first-chunk") {
            if (ready === true && typeof currentUserData !== "undefined" && currentUserData !== null) {
                // deconstruct fetched user data values
                const { username, firstName, lastName, registrationDate, completedJobs } = currentUserData;
                // return boolean data values
                return (
                    <Fragment>
                        <ListGroup>
                            <ListGroupItem className={!currentUserData.hasOwnProperty("username") ? "list-group-item-action flex-column align-items-start active-custom-selector" : "list-group-item-action flex-column align-items-start"}>
                                <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1 listitem-header-custom">{"Username"}</h5><small>{"Will be submitted to employer"}</small>
                                </div>
                                <hr />
                                {renderSentence("username", "Username", username)}
                                {renderRibbonSuccessUnacceptable("username")}
                            </ListGroupItem>
                            <ListGroupItem className={!currentUserData.hasOwnProperty("firstName" || "lastName") ? "list-group-item-action flex-column align-items-start active-custom-selector" : "list-group-item-action flex-column align-items-start"}>
                                <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1 listitem-header-custom">{"First Name & Last Name (Together)"}</h5><small>{"Will be submitted to employer"}</small>
                                </div>
                                <hr />
                                {renderSentence("firstName" || "lastName", "Full Name", `${firstName} ${lastName}`)}
                                {renderRibbonSuccessUnacceptable("firstName" || "lastName")}
                            </ListGroupItem>
                            <ListGroupItem className={!currentUserData.hasOwnProperty("completedJobs") ? "list-group-item-action flex-column align-items-start active-custom-selector" : "list-group-item-action flex-column align-items-start"}>
                                <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1 listitem-header-custom">{"Completed Job Count"}</h5><small>{"Will be submitted to employer"}</small>
                                </div>
                                <hr />
                                {renderSentence("completedJobs", "Completed Job Count", completedJobs)}
                                {renderRibbonSuccessUnacceptable("completedJobs")}
                            </ListGroupItem>
                            <ListGroupItem className={!currentUserData.hasOwnProperty("registrationDate") ? "list-group-item-action flex-column align-items-start active-custom-selector" : "list-group-item-action flex-column align-items-start"}>
                                <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1 listitem-header-custom">{"Created Account (from ago...)"}</h5><small>{"Will be submitted to employer"}</small>
                                </div>
                                <hr />
                                {renderSentence("registrationDate", "Registration date of", moment(registrationDate).fromNow())}
                                {renderRibbonSuccessUnacceptable("registrationDate")}
                            </ListGroupItem>
                            <ListGroupItem className={!currentUserData.hasOwnProperty("aboutMe") ? "list-group-item-action flex-column align-items-start active-custom-selector" : "list-group-item-action flex-column align-items-start"}>
                                <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1 listitem-header-custom">{"'About Me' Section/Data"}</h5><small>{"Will be submitted to employer"}</small>
                                </div>
                                <hr />
                                {renderSentenceParagraph("aboutMe", "About Me Section/Data", userData.aboutMe)}
                                {renderRibbonSuccessUnacceptable("aboutMe")}
                            </ListGroupItem>
                        </ListGroup>
                    </Fragment>
                );
            } else {
                return (
                    <Fragment>
                        <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                            <p>
                                <Skeleton count={30} />
                            </p>
                        </SkeletonTheme>
                    </Fragment>
                );
            }
        } else {    
            // render right (SECOND) chunk
            if (ready === true && typeof currentUserData !== "undefined" && currentUserData !== null) {
                return (
                    <Fragment>
                        <ListGroup>
                            <ListGroupItem className={!currentUserData.hasOwnProperty("username") ? "list-group-item-action flex-column align-items-start active-custom-selector" : "list-group-item-action flex-column align-items-start"}>
                                <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1 listitem-header-custom">{"Standard/Typical Job Title"}</h5><small>{"Will be submitted to employer"}</small>
                                </div>
                                <hr />
                                {renderSentence("title", "Title", currentUserData.title)}
                                {renderRibbonSuccessUnacceptable("title")}
                            </ListGroupItem>
                            <ListGroupItem className={!currentUserData.hasOwnProperty("reviews") ? "list-group-item-action flex-column align-items-start active-custom-selector" : "list-group-item-action flex-column align-items-start"}>
                                <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1 listitem-header-custom">{"Number(#) Of Current Reviews"}</h5><small>{"Will be submitted to employer"}</small>
                                </div>
                                <hr />
                                {renderSentence("reviews", "Review Count", currentUserData.reviews.length)}
                                {renderRibbonSuccessUnacceptable("reviews")}
                            </ListGroupItem>
                            <ListGroupItem className={!currentUserData.hasOwnProperty("fullyVerified") ? "list-group-item-action flex-column align-items-start active-custom-selector" : "list-group-item-action flex-column align-items-start"}>
                                <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1 listitem-header-custom">{"Is Your Account Verified (Fully)?"}</h5><small>{"Will be submitted to employer"}</small>
                                </div>
                                <hr />
                                {renderSentence("fullyVerified", "Fully-Verified Account", currentUserData.fullyVerified === true ? "Verified" : "NOT-Verified")}
                                {renderRibbonSuccessUnacceptable("fullyVerified")}
                            </ListGroupItem>
                            <ListGroupItem className={!currentUserData.hasOwnProperty("points") ? "list-group-item-action flex-column align-items-start active-custom-selector" : "list-group-item-action flex-column align-items-start"}>
                                <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1 listitem-header-custom">{"Amount Of Earned XP (Experience Pts.) Points"}</h5><small>{"Will be submitted to employer"}</small>
                                </div>
                                <hr />
                                {renderSentence("points", "Experience Points (XP Points)", currentUserData.points)}
                                {renderRibbonSuccessUnacceptable("points")}
                            </ListGroupItem>
                            <ListGroupItem className={!currentUserData.hasOwnProperty("yearsOfExperience") ? "list-group-item-action flex-column align-items-start active-custom-selector" : "list-group-item-action flex-column align-items-start"}>
                                <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1 listitem-header-custom">{"Years Of Experience (Working/Employed/Freelancing)"}</h5><small>{"Will be submitted to employer"}</small>
                                </div>
                                <hr />
                                {renderSentence("yearsOfExperience", "Year's Of Working Experience", _.has(currentUserData, "yearsOfExperience") ? currentUserData.yearsOfExperience.label : null)}
                                {renderRibbonSuccessUnacceptable("yearsOfExperience")}
                            </ListGroupItem>
                        </ListGroup>
                    </Fragment>
                );
            } else {
                return (
                    <Fragment>
                        <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                            <p>
                                <Skeleton count={30} />
                            </p>
                        </SkeletonTheme>
                    </Fragment>
                );
            }
        }
    }
    // return sheet data (pane slide up);
    return (
        <div id="sheet-container">
            <Sheet id="sheet-ultimate" disableDrag={true} isOpen={sheetIsOpen} onClose={() => setSheetOpenState(false)}>
                <Sheet.Container className="sheetcontainer">
                        <Sheet.Header className="sheetheader">
                            <Row className="custom-sm-margin">
                                <Col sm="12" md="12" lg="12" xl="12">
                                    <div>
                                        <Button onClick={() => {
                                            // allow background clicking again
                                            shiftCoreStyles(false);
                                            // close modal
                                            setSheetOpenState(false);
                                            // clear body locks ALL
                                            clearAllBodyScrollLocks();
                                        }} className="btn-square danger stretch-and-space-btn-left" outline color="danger" size="lg"><strong>Close/Exit</strong> Pane & Go Back To Listing</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Sheet.Header>
                        <Sheet.Content>
                            <Container fluid={true}>
                                <div className="add-normal-backer">
                                    <Breadcrumb passedClassname={"custom-breadcrumb-class"} parent={`Apply & Work To Earn ${process.env.REACT_APP_CRYPTO_TOKEN_NAME} to cashout for REAL ($$$-USD)`} title={"Review job requirements & details + apply to position/listing!"} />
                                    <Container className="full-height-container background-white-container-custom" fluid={true}>
                                        <Row style={{ paddingTop: "25px", paddingBottom: "50px" }}>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <Card className="custom-card-inner custom-card-inner-customized-three">
                                                    <CardHeader className="b-l-info">
                                                        <h5>Type Of Data That'll Be Automatically Submitted (Including Previous Listed Items)</h5>
                                                        <hr />
                                                        <p>This is the data/information that'll be automatically submitted to the employer to give them a better idea of who/what you are and to hopefully personalize the experience a bit more...</p>
                                                    </CardHeader>
                                                    <CardBody>
                                                        {renderItemsListCustom("first-chunk")}
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <Card className="custom-card-inner custom-card-inner-customized-two">
                                                    <CardHeader className="b-l-info">
                                                        <h5>Standard Core Submitted Data/Information</h5>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <ListGroup>
                                                            {renderItemsListCustom("second-chunk")}                
                                                        </ListGroup>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </Container>
                        </Sheet.Content>
                    </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </div>
    );
};

const HelperRadioButtons = ({ listingReady, listingData, id }) => {
    return (
        <Fragment>
            {listingReady === true ? <Form className="mega-inline">
                <Row>
                    <Col sm="6">
                        <Card className={listingData.typeOfHack.value === "physical-hack" ? "selected-option-listing-type-red" : ""}>
                            <Media className="p-20">
                                <div className="radio radio-primary mr-3">
                                    <Input checked={listingData.typeOfHack.value === "physical-hack" ? true : false} id="radio19" type="radio" name="radio1" value="option1" />
                                    <Label for="radio19"></Label>
                                </div>
                                <Media body>
                                    <h6 className="mt-0 mega-title-badge custom-digits-change">PHYSICAL HACK(ING) <strong style={{ color: "#7366ff" }}>ONLY</strong><span className="badge badge-primary pull-right digits">{"PHYSICAL HACK(ING) ONLY"}</span></h6>
                                    <p>{"PHYSICAL HACK ONLY - This application process is related to a 'Physical-Hack' type listing so you will be required to be ON-SITE at your specified/agreed dates between you and the employer testing REAL/Physical assets - if a selected job is OUT of your home-region, we expect you to fly/travel to said destination IF you decide to take 'said' job "}<strong>AT YOUR OWN EXPENSE</strong></p>
                                </Media>
                            </Media>
                        </Card>
                    </Col>
                    <Col sm="6">
                        <Card className={listingData.typeOfHack.value === "digital-internet-hack" ? "selected-option-listing-type-blue" : ""}>
                            <Media className="p-20">
                                <div className="radio radio-secondary mr-3">
                                    <Input checked={listingData.typeOfHack.value === "digital-internet-hack" ? true : false} id="radio20" type="radio" name="radio1" value="option1" />
                                    <Label for="radio20"></Label>
                                </div>
                                <Media body>
                                    <h6 className="mt-0 mega-title-badge custom-digits-change">DIGITAL ASSETS <strong style={{ color: "#7366ff" }}>ONLY</strong><span className="badge badge-secondary pull-right digits">{"DIGITAL ASSETS - ONLY"}</span></h6>
                                    <p>{"This option indicates this listing is a 'DIGITAL ASSETS TESTING' ONLY type of listing. This means you will be testing websites, API endpoints and really any other forward-facing assets availiable to the web/internet. PHYSICAL-HACKS are "}<strong>NOT PERMITTED</strong> with this type of listing. Lack of compliance will result in <strong>IMMEDIATE BANNING FOREVER.</strong></p>
                                </Media>
                            </Media>
                        </Card>
                    </Col>
                    <Col lg="12" md="12" xl="12" sm="12">
                        <Card className={listingData.typeOfHack.value === "both-assets" ? "selected-option-listing-type-violet" : ""}>
                            <Media className="p-20">
                                <div className="radio radio-info mr-3">
                                    <Input checked={listingData.typeOfHack.value === "both-assets" ? true : false} id="radio21" type="radio" name="radio1" value="option1" />
                                    <Label for="radio21"></Label>
                                </div>
                                <Media body>
                                    <h6 className="mt-0 mega-title-badge custom-digits-change"><strong style={{ color: "#a927f9" }}>BOTH</strong> DIGITAL/PHYSICAL ASSETS<span className="badge badge-info pull-right digits">{"BOTH DIGITAL/PHYSICAL ASSETS - EITHER"}</span></h6>
                                    <p>{"This option indicates this listing is a 'BOTH DIGITAL/PHYSICAL ASSETS TESTING' types which means you're allowed to test BOTH/EITHER physical OR digital assets simultaniously! You can pick n' choose which you'd like to exploit if the current listing's settings align or are set to this type of listing. Physical hacks should still align with orchasrated/organized schedule with your selected employer HOWEVER digital assets can be "}<strong>hacked/tampered with at any point in time <em style={{ color: "red" }}>during</em> hired period.</strong></p>
                                </Media>
                            </Media>
                        </Card>
                    </Col>
                </Row>
            </Form> : <Fragment>
                <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                    <p>
                        <Skeleton count={17} />
                    </p>
                </SkeletonTheme>
            </Fragment>}
        </Fragment>
    );
}
const handleDeletionLink = (link, setSelectedLinks) => {
    console.log("handle deletion!");

    setSelectedLinks(prevState => {
        return prevState.filter((linky, i) => {
            if (linky.id !== link.id) {
                return true;
            }
        })
    })
} 
const renderMountedLogic = (globalConfig, setPhysicalOrDigitalHackOptionsState, setListingData, setDatesReady, setDateRanges, setDisabledDaysState, setListingReady) => {
    // fetch user information
    axios.get(`${process.env.REACT_APP_BASE_URL}/gather/listing/all/info`, globalConfig.configuration).then((res) => {
        if (res.data.message === "Successfully gathered listing information!") {
            console.log(res.data);
            // deconstruct listing data/obj
            const { listing } = res.data;
            // update selected date ranges

            // set listing data
            setListingData(listing);
            // new promise to delay response
                new Promise((resolve, reject) => {
                    // create new date array
                    const newDateArray = [];
                    // start & end dates array's
                    const endDateArray = [];
                    const startDateArray = [];
                    // update selected date ranges
                    const selected = listing.testingDatesHackers;
                    // loop & prepare listing data related to dates
                    for (let index = 0; index < selected.length; index++) {
                        const el = selected[index];
                        newDateArray.push({
                            startDate: new Date(el.startDate),
                            endDate: new Date(el.endDate),
                            key: 'selection',
                        });
                        startDateArray.push(new Date(new Date(el.startDate)));
                        endDateArray.push(new Date(new Date(el.endDate)));
                        // check when last element is TRUE and end looping array
                        if ((selected.length - 1) === index) {
                            resolve({ newDateArray, startDateArray, endDateArray });
                        }
                    }
                }).then((values) => {

                    const { startDateArray, endDateArray, newDateArray } = values;

                    console.log(startDateArray, endDateArray)
                    // min & max dates
                    const maxDate = new Date(Math.max.apply(null, endDateArray));
                    const minDate = new Date(Math.min.apply(null, startDateArray));

                    const maxedDate = moment(maxDate).startOf('day').toString();

                    // difference in days
                    // const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

                    const mappedSelectedDates = [];
                    const dismissDates = [];

                    for (let index = 0; index < newDateArray.length; index++) {
                        const date = newDateArray[index];
                        
                        for (let d = new Date(date.startDate); d <= new Date(date.endDate); d.setDate(d.getDate() + 1)) {
                            const startOfDay = moment(new Date(d)).startOf('day').toString()

                            if (!mappedSelectedDates.includes(startOfDay) && !moment(startOfDay).isBefore(new Date())) {
                                mappedSelectedDates.push(startOfDay);
                            } 
                        }
                        if ((newDateArray.length - 1) === index) {
                            for (let d = minDate; d <= new Date(new Date(maxedDate).setDate(d.getDate() + 1)); d.setDate(d.getDate() + 1)) {
                                const formatedLoopItem = moment(new Date(d)).startOf('day').toString();

                                // console.log("formatedLoopItem", formatedLoopItem, maxedDate);
                                if (!mappedSelectedDates.includes(formatedLoopItem)) {
                                    dismissDates.push(new Date(d));

                                    if (formatedLoopItem === maxedDate) {
                                        // set disabled days array
                                        setDisabledDaysState(dismissDates);
                                        // set SELECTED/PREVIOUSLY-PICKED days state
                                        setDateRanges(newDateArray);
                                        // display content finally!
                                        setDatesReady(true);
                                    }
                                } else {
                                    if (formatedLoopItem === maxedDate) {
                                        // set disabled days array
                                        setDisabledDaysState(dismissDates);
                                        // set SELECTED/PREVIOUSLY-PICKED days state
                                        setDateRanges(newDateArray);
                                        // display content finally!
                                        setDatesReady(true);
                                    }
                                }
                            }
                        }
                    }
                    // min and max dates
                    console.log("maxDate", maxDate);
                    console.log("minDate", minDate);
                })
            console.log("listing.typeOfHack.value", listing.typeOfHack.value);
            // update physicalOrDigitalHackOptions options 
            switch (listing.typeOfHack.value) {
                case "physical-hack":
                    setPhysicalOrDigitalHackOptionsState([{ label: "BOTH (Digital/Physical hack's) Hack Type's", value: "both-assets", isDisabled: true }, { label: "Digital/Internet-Hack ONLY", value: "digital-internet-hack", isDisabled: true }, { label: "Physical-Hack ONLY", value: "physical-hack" }]);
                    break;
                case "digital-internet-hack":
                    setPhysicalOrDigitalHackOptionsState([{ label: "BOTH (Digital/Physical hack's) Hack Type's", value: "both-assets", isDisabled: true }, { label: "Digital/Internet-Hack ONLY", value: "digital-internet-hack" }, { isDisabled: true, label: "Physical-Hack ONLY", value: "physical-hack" }]);
                    break;
                case "both-assets":
                    setPhysicalOrDigitalHackOptionsState([{ label: "BOTH (Digital/Physical hack's) Hack Type's", value: "both-assets" }, { isDisabled: true, label: "Digital/Internet-Hack ONLY", value: "digital-internet-hack" }, { isDisabled: true, label: "Physical-Hack ONLY", value: "physical-hack" }]);
                    break;
                default:
                    break;
            }
            // set listing data READY
            setListingReady(true);
        } else {
            // log error from DB request
            console.log('err', res.data);
        }
    }).catch((err) => {
        // log error from DB request
        console.log(err);
    })
};

const { handleFileDeletionUploadedFiles, handleFilesFinalSubmission, handleDotsClickExpansion, calculateFileType, bytesToSize, handleFileUploadAnyType, closePopoverDynamic, calculateWhatToShow } = sheetDisplayHelperFunctions;

const SheetDisplayFilesFileManagerHelper = ({ previousFiles, saveApplicationDetailsProgress, previous, setProgress, filesSheetOpen, setFileSheetOpenState, shiftCoreStyles, clearAllBodyScrollLocks }) => {

    // create history obj for redirects
    const history = useHistory();
    // ref's creations
    const dropzoneRef = useRef(null);
    // state initialization
    const [ selectedFile, setSelectedFile ] = useState(null);
    const [ checked, setChecked ] = useState(false);
    const [ uploadedSelected, setUploadedSelectedState ] = useState(null);
    const [ changeOptions, setChangeOptions ] = useState(null);
    const [ currentType, setCurrentType ] = useState("allfiles");
    const [ currentFileSelectedUpload, setCurrentUploadFileStatus ] = useState(null);
    const [ filePathData, setCurrentFilePathData ] = useState(null);
    const [ submissionPopover, setSubmissionPopoverState ] = useState(false);
    const [ popoverStates, setPopoverStates ] = useState({
        popover0: false,
        popover1: false,
        popover2: false,
        popover3: false,
        popover4: false,
        popover5: false,
        popover6: false
    });
    const [ fileReady, setFileReadyStatus ] = useState(false);
    const [ metaFileData, setMetaFileData ] = useState(null);
    const [ searchTerm, setSearchTerm ] = useState("");
    // current uploaded file(s) state initialization...
    const [ myfile, setMyFile ] = useState([]);

    const renderPreviewOfFile = (data, filePathData, fileReady) => { 
        // file general data
        const file = data.fileWithMeta.file;
        // return preview data via FileViewer (to not exclude documents such as .docx and such...);
        if (fileReady === true) {
            return (
                <div className="filereader-preview-dropzone">
                    <FileViewer
                        fileType={calculateFileType(file.type)}
                        filePath={filePathData}
                        onError={(e) => {
                            console.log(e, 'error in file-viewer');
    
                            NotificationManager.warning("An error occurred while attempting to display your desired image - please try again.", "Error displaying desired image!", 4500);
                        }}
                        key={file.id}
                    />
                </div>
            );
        } else {
            return null;
        }
    }
    const handleChange = event => {
      event.preventDefault();
      setSearchTerm(event.target.value)
    };
    const handleFileChangeType = (file, closePopoverDynamic, i, setMyFile, type) => {
        // deconstruct files
        const previous = previousFiles.applicationDetails.applicationDetails.files;
        saveApplicationDetailsProgress({
            files: previous.map((item, idx) => {
                if (item.link === file.link) {
                    const duplicated = {...file};
                    duplicated["customType"] = type;
                    return duplicated;
                } else {
                    return item;
                }
            })
        });
        closePopoverDynamic(i, setPopoverStates);
    }
    console.log("PREV", previousFiles);
    // eslint-disable-next-line
    const filelist = previousFiles.applicationDetails.applicationDetails.files.filter((data) => {
        if(searchTerm == null) {
            return data
        } else if(data.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return data
        }
    }).map((file, i) => {
        if (currentType === "allfiles") {
            return (
                <li className="file-box" key={i}>
                    <div id={`popover${i}`} className="file-top"><i id="colored-icon-custom" className={file.icon} ></i><i id="create-hover-icon" onClick={() => {
                        setUploadedSelectedState(file);
                        handleDotsClickExpansion(file, i, setPopoverStates);
                    }} className="fa fa-ellipsis-v f-14 ellips"></i></div>
                    <div className="file-bottom">
                        <h6>{file.name} </h6>
                        <p className="mb-1">{bytesToSize(file.size)}</p>
                        <p> <b>{"File Type"} : </b>{file.type}</p>
                    </div>
                    <Popover target={`popover${i}`} className="popped-file-upload-main-wrapper" placement="right" isOpen={popoverStates[`popover${i}`]} toggle={() => {
                        closePopoverDynamic(i, setPopoverStates);
                    }}>
                        <PopoverHeader>Move this file into a folder OR delete?! <div className="popover-cancel-container" onClick={() => {
                            closePopoverDynamic(i, setPopoverStates)
                        }}><img src={require("../../../../../../assets/icons/close-64.png")} className="small-close-popover-icon" /></div></PopoverHeader>
                        <PopoverBody className="popover-body-file-upload-popped">
                            <p>You have TWO options regarding this file, you can either <strong>delete it</strong> or <strong>attach it</strong> to a folder reference so employer's know what the file(s) are related to such as images, videos, misc or CL/CV.</p>
                            <hr />
                            <Accordion>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            DELETE THIS FILE...!
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <Button onClick={() => {
                                            handleFileDeletionUploadedFiles(i, setMyFile, setPopoverStates, uploadedSelected);
                                        }} outline color={"danger-2x"} style={{ width: "100%" }} className="btn-outline-danger">DELETE this file from queue!</Button>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            Add this file to "All File's" file section...
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <Button onClick={() => handleFileChangeType(file, closePopoverDynamic, i, setMyFile, "allfiles")} outline color={"info-2x"} style={{ width: "100%" }} className="btn-outline-info">Add-To "All File's" Section</Button>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            Add this file to "Resume/CL" file section...
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <Button onClick={() => handleFileChangeType(file, closePopoverDynamic, i, setMyFile, "resume-cover-letter-only")} outline color={"info-2x"} style={{ width: "100%" }} className="btn-outline-info">Add-To "Resume/CL" Section</Button>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            Add this file to "Videos ONLY" file section...
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <Button onClick={() => handleFileChangeType(file, closePopoverDynamic, i, setMyFile, "videos-only")} outline color={"info-2x"} style={{ width: "100%" }} className="btn-outline-info">Add-To "Videos ONLY" Section</Button>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            Add this file to "Images ONLY" file section...
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <Button onClick={() => handleFileChangeType(file, closePopoverDynamic, i, setMyFile, "images-only")} outline color={"info-2x"} style={{ width: "100%" }} className="btn-outline-info">Add-To "Images ONLY" Section</Button>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            Add this file to "Miscellaneous" file section...
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <Button onClick={() => handleFileChangeType(file, closePopoverDynamic, i, setMyFile, "misc-others")} outline color={"info-2x"} style={{ width: "100%" }} className="btn-outline-info">Add-To "Miscellaneous/Others" Section</Button>
                                    </AccordionItemPanel>
                                </AccordionItem>
                            </Accordion>
                        </PopoverBody>
                    </Popover>
                </li>
            )
        } else {
            if (file.customType === currentType) {
                return (
                    <li className="file-box" key={i}>
                        <div id={`popover${i}`} className="file-top"><i id="colored-icon-custom" className={file.icon} ></i><i id="create-hover-icon" onClick={() => {
                            setUploadedSelectedState(file);
                            handleDotsClickExpansion(file, i, setPopoverStates);
                        }} className="fa fa-ellipsis-v f-14 ellips"></i></div>
                        <div className="file-bottom">
                            <h6>{file.name} </h6>
                            <p className="mb-1">{bytesToSize(file.size)}</p>
                            <p> <b>{"File Type"} : </b>{file.type}</p>
                        </div>
                        <Popover className="popped-file-upload-main-wrapper" placement="right" isOpen={popoverStates[`popover${i}`]} target={`popover${i}`} toggle={() => {
                            closePopoverDynamic(i, setPopoverStates);
                        }}>
                            <PopoverHeader>Move this file into a folder OR delete?! <div className="popover-cancel-container" onClick={() => {
                                closePopoverDynamic(i, setPopoverStates)
                            }}><img src={require("../../../../../../assets/icons/close-64.png")} className="small-close-popover-icon" /></div></PopoverHeader>
                            <PopoverBody className="popover-body-file-upload-popped">
                                <p>You have TWO options regarding this file, you can either <strong>delete it</strong> or <strong>attach it</strong> to a folder reference so employer's know what the file(s) are related to such as images, videos, misc or CL/CV.</p>
                                <hr />
                                <Accordion>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                DELETE THIS FILE...!
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <Button onClick={() => {
                                                handleFileDeletionUploadedFiles(i, setMyFile, setPopoverStates, uploadedSelected);
                                            }} outline color={"danger-2x"} style={{ width: "100%" }} className="btn-outline-danger">DELETE this file from queue!</Button>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                Add this file to "All File's" file section...
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <Button onClick={() => handleFileChangeType(file, setMyFile, "allfiles")} outline color={"info-2x"} style={{ width: "100%" }} className="btn-outline-info">Add-To "All File's" Section</Button>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                Add this file to "Resume/CL" file section...
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <Button onClick={() => handleFileChangeType(file, setMyFile, "resume-cover-letter-only")} outline color={"info-2x"} style={{ width: "100%" }} className="btn-outline-info">Add-To "Resume/CL" Section</Button>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                Add this file to "Videos ONLY" file section...
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <Button onClick={() => handleFileChangeType(file, setMyFile, "videos-only")} outline color={"info-2x"} style={{ width: "100%" }} className="btn-outline-info">Add-To "Videos ONLY" Section</Button>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                Add this file to "Images ONLY" file section...
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <Button onClick={() => handleFileChangeType(file, setMyFile, "images-only")} outline color={"info-2x"} style={{ width: "100%" }} className="btn-outline-info">Add-To "Images ONLY" Section</Button>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                Add this file to "Miscellaneous" file section...
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <Button onClick={() => handleFileChangeType(file, setMyFile, "misc-others")} outline color={"info-2x"} style={{ width: "100%" }} className="btn-outline-info">Add-To "Miscellaneous/Others" Section</Button>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                </Accordion>
                            </PopoverBody>
                        </Popover>
                    </li>
                )
            };
        }
    });
    // DROPZONE Helpers
    const handleSubmit = (files, allFiles) => {
        allFiles.forEach(f => f.remove());
    }
    const CustomInputHelper = ({ accept, onFiles }) => {
        const text = "Drop a file OR select to browse local data";
        return (
            <label className="custom-input-dropzone-copy" style={{ backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', padding: 15, borderRadius: 3 }}>
                {text}
                <input
                    style={{ display: 'none' }}
                    type={"file"}
                    accept={accept}
                    maxSizeBytes={100000000}
                    multiple={false}
                    className={"custom-dropzone-input-actual-input"}
                    onChange={e => {
                        const file = e.target.files[0];
                        // set current file path to convert to readable URL later
                        setCurrentFilePathData(URL.createObjectURL(file));
                        // set status update for current file
                        setCurrentUploadFileStatus(file);
                        // mark file as READY 
                        setFileReadyStatus(true);
                        // update "Dropzone" component state (NOT this react component state).
                        onFiles([file])
                    }}
                />
            </label>
        );
    }
    const renderCustomButtonDropzone = (data, e) => {

        const { meta } = data.files[0];

        if (currentFileSelectedUpload === null) {
            return null;
        } else {
            if (fileReady === true) {
                return (
                    <Fragment>
                        <Button style={{ marginTop: "25px" }} onClick={(e) => {
                            e.preventDefault();
                            // file meta data for next action
                            setMetaFileData(meta);
                            // set file status as ready or prepared.
                            setFileReadyStatus(false);
    
                            const runSubmit = data.onSubmit;
    
                            handleFileUploadAnyType(runSubmit, setMetaFileData, setFileReadyStatus, setCurrentUploadFileStatus, setMyFile, currentFileSelectedUpload, metaFileData, setProgress, setChecked, checked, saveApplicationDetailsProgress, previousFiles);
                        }} className="btn-air-secondary" color="secondary" size="md">Submit & Upload Preview/Snapshot Images!</Button>
                    </Fragment>
                );
            } else {
                return (
                    <Fragment>
                        <Button style={{ marginTop: "25px" }} onClick={() => {
                            NotificationManager.warning(`File is NOT ready to upload yet! Please wait for the preparation steps to complete before submitting.`, 'Still preparing!', 4500);
                        }} className="btn-air-light" color="light" size="md">Submit & Upload Preview/Snapshot Images!</Button>
                    </Fragment>
                );
            }
        }
    }
    const onSubmitHelper = (files, allFiles) => {
        allFiles.forEach((file, index) => {
            file.remove();

            if ((allFiles.length - 1) === index) {
                // setFileReadyStatus(true);
                setCurrentUploadFileStatus(null);
            }
        })
    }
    const closeModalPaneBottom = () => {
        // clear file-upload related state stuff
        setMetaFileData(null);
        setFileReadyStatus(false);
        setCurrentUploadFileStatus(null);
        // allow background clicking again
        shiftCoreStyles(false);
        // close modal
        setFileSheetOpenState(false);
        // clear body-locks
        clearAllBodyScrollLocks();
    }
    const onFolderRegionClicked = (type) => {
        setCurrentType(type);
    }
    const calculateCurrentType = (type) => {
        console.log("currentType", currentType, type);
        switch (type) {
            case "allfiles":
                return "All Files (Everything)";
                break;
            case "resume-cover-letter-only":
                return "Resume & Cover-Letter's ONLY";
                break;
            case "images-only":
                return "Images ONLY"
                break;
            case "misc-others":
                return "Miscellaneous file(s)"
                break;
            case "videos-only":
                return "Videos ONLY";
                break;
            default:
                break;
        }
    }
    const renderConditionalButtonAndPopover = (list) => {
        if (list.length > 0) {
            return (
                <Fragment>
                    <Button id={"finalSubmissionID"} style={{ width: "100%", marginLeft: "37.5px" }} outline color={"success-2x"} className="btn-square ml-1" onClick={() => {
                        setSubmissionPopoverState(true);
                    }}><div className="icon-button-attached"><Upload /></div>{"Upload Files & Folder's Containing Content"}</Button>
                    <Popover placement="bottom" isOpen={submissionPopover} target={"finalSubmissionID"} toggle={() => {
                        setSubmissionPopoverState(false);
                    }}>
                        <PopoverHeader>Are you sure you'd like to submit your "current uploaded" files?! <div className="popover-cancel-container" onClick={() => {
                            setSubmissionPopoverState(false);
                        }}><img src={require("../../../../../../assets/icons/close-64.png")} className="small-close-popover-icon" /></div></PopoverHeader>
                        <PopoverBody>
                            <p>You're about to save your "current" uploads to your previously filled out listing information on the main page of this page. We will save this data so when you finally "submit" your final/actual application to this employer - this data will also be <strong>automatically included</strong>. Click "Submit!" to submit your selected files & folders...</p>
                            <hr />
                            <Button style={{ width: "100%" }} outline color={"info-2x"} className="btn-square" onClick={() => {
                                handleFilesFinalSubmission(myfile, previous, saveApplicationDetailsProgress, setSubmissionPopoverState, shiftCoreStyles, clearAllBodyScrollLocks, setFileSheetOpenState);
                            }}><strong style={{ textDecorationLine: "underline" }}>{"Upload!"}</strong></Button>
                        </PopoverBody>
                    </Popover>
                </Fragment>
            );
        } else {
            return <Button id={"finalSubmissionID"} style={{ width: "100%", marginLeft: "37.5px" }} outline color={"danger-2x"} className="btn-square-danger ml-1" onClick={() => {
                // clear locks related to pane
                shiftCoreStyles(false); 
                // clear body locks from open pane
                clearAllBodyScrollLocks();
                // set file sheet closed
                setFileSheetOpenState(false);
            }}><div className="icon-button-attached"><Upload /></div>{"Upload a file before exiting/closing..."}</Button>;
        }
    }
    // return sheet data (pane slide up);
    return (
        <div id="sheet-container">
            <Sheet id="sheet-ultimate" disableDrag={true} isOpen={filesSheetOpen} onClose={() => setFileSheetOpenState(false)}>
                <Sheet.Container className="sheetcontainer">
                        <Sheet.Header className="sheetheader">
                            <Row className="custom-sm-margin">
                                <Col sm="12" md="12" lg="12" xl="12">
                                    {/* <Button onClick={() => {
                                        closeModalPaneBottom();
                                    }} className="btn-square stretch-and-space-btn-right" active color="secondary" size="md">Cancel/Close</Button> */}
                                    {renderConditionalButtonAndPopover(filelist)}
                                </Col>
                            </Row>
                        </Sheet.Header>
                        <Sheet.Content>
                            <Container style={{ paddingTop: "75px", paddingBottom: "75px" }} fluid={true}>
                                <Row>
                                    <Col xl="3" className="box-col-6 pr-0 file-spacing">
                                        <div className="file-sidebar">
                                        <Card>
                                            <CardBody>
                                            <ul>
                                                <li onClick={() => {
                                                    onFolderRegionClicked("allfiles");
                                                }}>
                                                    <div className="btn btn-light"><Folder />All Files</div>
                                                </li>
                                                <li onClick={() => {
                                                    onFolderRegionClicked("resume-cover-letter-only");
                                                }}>
                                                    <div className="btn btn-light"><Clock />Resume/Cover-Letter Related</div>
                                                </li>
                                                <li onClick={() => {
                                                    onFolderRegionClicked("videos-only");
                                                }}>
                                                    <div className="btn btn-light"><Star />Video Related ONLY</div>
                                                </li>
                                                <li onClick={() => {
                                                    onFolderRegionClicked("images-only");
                                                }}>
                                                    <div className="btn btn-light"><Star />Image Related ONLY</div>
                                                </li>
                                                <li onClick={() => {
                                                    onFolderRegionClicked("misc-others");
                                                }}>
                                                    <div className="btn btn-light"><Star />Docx, PDF's, etc...Miscellaneous</div>
                                                </li>
                                            </ul>
                                            <hr />
                                            <ul>
                                                <li>
                                                <div className="btn btn-outline-primary"><Database />{Storage}</div>
                                                <div className="m-t-15">
                                                    <Progress animated={true} max={100} min={0} color={"info"} className="upload-progress-bar-update" style={{ width: "100%" }} value={myfile.length > 0 ? (myfile.length * 14.285) : 0} />
                                                    <p>{`${myfile.length} file(s) uploaded of MAX of 7 file's`}</p>
                                                </div>
                                                </li>
                                            </ul>
                                            <hr />
                                            <ul>
                                                <li>
                                                <div className="pricing-plan">
                                                    <h6>Maximum File Upload Size</h6>
                                                    <h5><div style={{ textDecorationLine: "underline", color: "#f73164" }}>100MB</div> Per File</h5>
                                                    <p>{"100MB (Per upload/file) Capacity"}</p>
                                                    <div className="natural-sm-spacer" />
                                                    <img className="bg-img" src={require("../../../../../../assets/images/dashboard/folder.png")} alt="" />
                                                </div>
                                                </li>
                                                <li>
                                                <div className="pricing-plan">
                                                    <h6>Are you having any <strong className="custom-highlighted-strong">problems</strong> while <strong className="custom-highlighted-strong">uploading</strong> files?</h6>
                                                    <h5>Experiencing <em style={{ color: "#f73164", textDecorationLine: "underline" }}>Upload Problems</em>? Try <em style={{ textDecorationLine: "underline" }}>Contacting Support</em>!</h5>
                                                    <p> {"Click the button below to be redirected to our support page..."}</p>
                                                    <Button onClick={() => {
                                                        // close modal
                                                        closeModalPaneBottom();
                                                        // redirect to appropriate page
                                                        setTimeout(() => {
                                                            history.push("/frequently-asked-questions")
                                                        }, 450)
                                                    }} size="sm" color={"info-2x"} outline className="btn-outline-info">Contact Support!</Button>
                                                    <img className="bg-img" src={require("../../../../../../assets/images/dashboard/folder1.png")} alt="" />
                                                </div>
                                                </li>
                                            </ul>
                                            </CardBody>
                                        </Card>
                                        </div>
                                    </Col>
                                    <Col xl="9" md="12" className="box-col-12">

                                        <div className="file-content">
                                        <Card>
                                            <CardHeader>
                                            <div className="media">
                                                <Form className="form-inline top-bar-input-customized">
                                                    <FormGroup className="formgroup-custom-input-wrapper">
                                                        <i className="fa fa-search"></i>
                                                        <Input
                                                            className="form-control-plaintext"
                                                            type="text"
                                                            style={{ minWidth: "60vw", width: "60vw" }}
                                                            value={searchTerm}
                                                            onChange={(e) => handleChange(e)}
                                                            placeholder="Search through uploaded file's..."
                                                        />
                                                    </FormGroup>
                                                </Form>
                                                <div className="media-body text-right">
                                                    {/* {renderConditionalButtonAndPopover(filelist)} */}
                                                </div>
                                            </div>
                                            </CardHeader>
                                            {filelist !== null ?

                                            <CardBody className="file-manager">
                                                <h4 className="mb-3">{calculateCurrentType(currentType)}</h4>
                                                <h6>Uploaded/Current file(s) that're ready to be submitted...</h6>
                                                <ul className="files">
                                                    {filelist}
                                                </ul>
                                                <h6 className="mt-4">Categorization/Folders</h6>
                                                <ul className="folder">
                                                    <li className="folder-box media-folder-area-selector">
                                                        <div onClick={() => {
                                                            onFolderRegionClicked("resume-cover-letter-only");
                                                        }} className="media"><i id="custom-folder-icon" className="fa fa-file-archive-o f-36 txt-warning"></i>
                                                            <div className="media-body ml-3">
                                                            <h6 className="mb-0">Resume/Cover-letter related</h6>
                                                            <p>{"204 files, 50mb"}</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="folder-box media-folder-area-selector">
                                                        <div onClick={() => {
                                                            onFolderRegionClicked("videos-only");
                                                        }} className="media"><i id="custom-folder-icon" className="fa fa-folder f-36 txt-warning"></i>
                                                            <div className="media-body ml-3">
                                                            <h6 className="mb-0">Video Related (video's ONLY)</h6>
                                                            <p>{"0 files, 0mb"}</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="folder-box media-folder-area-selector">
                                                        <div onClick={() => {
                                                            onFolderRegionClicked("images-only");
                                                        }} className="media"><i id="custom-folder-icon" className="fa fa-file-archive-o f-36 txt-warning"></i>
                                                            <div className="media-body ml-3">
                                                            <h6 className="mb-0">Images (Strictly jpeg/jpg/png ONLY)</h6>
                                                            <p>{"0 files, 0mb"}</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="folder-box media-folder-area-selector">
                                                        <div onClick={() => {
                                                            onFolderRegionClicked("misc-others");
                                                        }} className="media"><i id="custom-folder-icon" className="fa fa-folder f-36 txt-warning"></i>
                                                            <div className="media-body ml-3">
                                                            <h6 className="mb-0">Docx, Pdf's & other misc file's</h6>
                                                            <p>{"0 files, 0mb"}</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </CardBody>
                                            : <Fragment>
                                                <div>
                                                    <Row style={{ paddingTop: "15px" }}>
                                                        <Col sm="12" lg="12" xl="12" md="12">
                                                            <h1 style={{ padding: "17.5px" }} className="text-center nothing-uploaded-header-text">Nothing has been uploaded <strong style={{ color: "#f73164", textDecorationLine: "underline" }}>yet (you need to upload at least ONE file)</strong>, please upload some attachements <strong style={{ color: "#a927f9", textDecorationLine: "underline" }}>(UP-TO seven(7) files/documents)</strong> before proceeding.</h1>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginBottom: "12.5px" }}>
                                                        <Col sm="12" lg="12" xl="12" md="12">
                                                            <p style={{ padding: "17.5px" }} className="text-center">You will need to upload some file(s) before proceeding with submitting this application - you must upload at least ONE(1) file so we can provide our employer's with a very detailed idea/description or overview of <strong>EACH</strong> applicant!</p>
                                                        </Col>
                                                    </Row>
                                                    <div className="centered-both-ways">
                                                        <img style={{ paddingBottom: "32.5px", marginTop: "12.5px" }} className="img-fluid m-auto" src={errorImg} alt="" />
                                                    </div>
                                                </div>
                                            </Fragment>}
                                            <CardBody>
                                                <div className="custom-centered-dropzone-region">
                                                    <FormGroup className="m-t-15 custom-radio-ml">
                                                        <div className="checkbox checkbox-primary">
                                                            <Input onChange={() => {
                                                                setChecked(!checked);
                                                            }} checked={checked} id="checkbox-primary-1" type="checkbox" defaultChecked/>
                                                            <Label for="checkbox-primary-1">Check this checkbox if you'd like to assign this file (current pending upload) to "All-Files" directory or let us automatically detect which folder to put the file after uploading...</Label>
                                                        </div>
                                                    </FormGroup>
                                                    <div className="dz-message needsclick">
                                                        <Dropzone
                                                            ref={dropzoneRef}
                                                            PreviewComponent={(data) => {
                                                                return renderPreviewOfFile(data, filePathData, fileReady);
                                                            }}
                                                            maxFiles={1}
                                                            onChangeStatus={(functions) => {
                                                                setChangeOptions(functions);
                                                            }}
                                                            autoUpload={true}
                                                            submitButtonDisabled={false}
                                                            InputComponent={CustomInputHelper}
                                                            onSubmit={onSubmitHelper}
                                                            SubmitButtonComponent={(data, e) => {
                                                                return (
                                                                    <div className="absolutely-position-submit-btn">
                                                                        {renderCustomButtonDropzone(data, e)}
                                                                    </div>
                                                                );
                                                            }}
                                                            // accept={"image/*"}
                                                            multiple={false}
                                                            canCancel={false}
                                                            styles={{
                                                                dropzone: { height: 275, width: "100%" },
                                                                dropzoneActive: { borderColor: 'green' },
                                                            }}
                                                        />
                                                    </div>
                                                    {fileReady === true ? <Fragment>
                                                        <hr className="secondary-hr" />
                                                        <div className="centered-both-ways">
                                                            <Button style={{ marginTop: "25px" }} onClick={(e) => {
                                                                setMetaFileData(null);
                                                                setFileReadyStatus(false);
                                                                setCurrentUploadFileStatus(null);

                                                                changeOptions.remove();
                                                            }} className="btn-air-danger cancel-button-upload" color="danger" size="md">Cancel Current/Pending Upload</Button>
                                                        </div>
                                                    </Fragment> : null}
                                                </div>
                                            </CardBody>
                                        </Card>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Sheet.Content>
                    </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </div>
    );
}

const handleLinkAddition = (setSelectedLinks, links, clearInput, setValue, linkValue) => {
    console.log("handleLinkAddition ran...");

    const constructed = { urlName: linkValue.split("//")[1], url: linkValue, id: uuid() };

    setValue("referenceLinks", [...links, constructed], { shouldValidate: false });

    setSelectedLinks(prevState => {
        return [...prevState, constructed]
    })
}
export default {
    TimelineHelper,
    HelperRadioButtons,
    SheetPaneSubmittingDataHelper,
    renderMountedLogic,
    handleDeletionLink,
    handleLinkAddition,
    SheetDisplayFilesFileManagerHelper
};