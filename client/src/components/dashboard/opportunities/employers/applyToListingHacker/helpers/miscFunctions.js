import React, { Fragment } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Edit, Video, Image, Activity } from 'react-feather';
import 'react-vertical-timeline-component/style.min.css';
import { Link } from "react-router-dom";
import moment from "moment";
import Sheet from 'react-modal-sheet';
import { Container, Row, Col, Card, CardBody, Button, CardHeader, ListGroupItem, ListGroup, Media, Input, Label, Form } from 'reactstrap';
import Breadcrumb from '../../../../../../layout/breadcrumb';
import "../styles.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


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
                                {renderSentence("yearsOfExperience", "Year's Of Working Experience", currentUserData.yearsOfExperience.label)}
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
                                    <h6 className="mt-0 mega-title-badge">PHYSICAL HACK(ING) <strong style={{ color: "#7366ff" }}>ONLY</strong><span className="badge badge-primary pull-right digits">{"PHYSICAL HACK(ING) ONLY"}</span></h6>
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
                                    <h6 className="mt-0 mega-title-badge">DIGITAL ASSETS <strong style={{ color: "#7366ff" }}>ONLY</strong><span className="badge badge-secondary pull-right digits">{"DIGITAL ASSETS - ONLY"}</span></h6>
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
                                    <h6 className="mt-0 mega-title-badge"><strong style={{ color: "#a927f9" }}>BOTH</strong> DIGITAL/PHYSICAL ASSETS<span className="badge badge-info pull-right digits">{"BOTH DIGITAL/PHYSICAL ASSETS - EITHER"}</span></h6>
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

export default {
    TimelineHelper,
    HelperRadioButtons,
    SheetPaneSubmittingDataHelper
};