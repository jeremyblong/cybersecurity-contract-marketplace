import React, { Fragment, useState, useEffect } from 'react';
import "./styles.css";
import Breadcrumb from '../../../../../layout/breadcrumb';
import { Container, Row, Col, Card, CardBody, Button, CardHeader, ListGroupItem, ListGroup, FormGroup, Label, Input, InputGroupAddon, Form, InputGroup, InputGroupText } from 'reactstrap';
import helpers from "./helpers/miscFunctions.js";
import { connect } from "react-redux";
import moment from "moment";
import { shiftCoreStyles } from "../../../../../redux/actions/universal/index.js";
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import axios from 'axios';
import _ from "lodash";
import { Link, withRouter, useParams } from "react-router-dom";
import Select from 'react-select';
import { DateRangePicker } from 'react-date-range';

const { TimelineHelper, SheetPaneSubmittingDataHelper, HelperRadioButtons } = helpers;


const ApplyAsHackerEmployerListingHelper = ({ userData, shiftCoreStyles, location }) => {

    // get URL ID from string
    const { id } = useParams();
    // initialize state items...
    const [ alreadyAdded, setAlreadyAddedState ] = useState(null);
    const [ disabledDays, setDisabledDaysState ] = useState([]);
    const [ physicalOrDigitalHackOptions, setPhysicalOrDigitalHackOptionsState ] = useState([]);
    const [ sheetIsOpen, setSheetOpenState ] = useState(false);
    const [ currentUserData, setCurrentUserData ] = useState(null);
    const [ ready, setReadyGlobal ] = useState(false);
    const [ listingReady, setListingReady ] = useState(false);
    const [ listingData, setListingData ] = useState(null);
    const [ dateRanges, setDateRanges ] = useState(null);
    const [ datesReady, setDatesReady ] = useState(false);
    
    const handleDateSelection = (ranges) => {
        // setDateRanges(ranges);
        console.log("ranges", ranges);
    }
    // deconstruct redux-state items...
    const { username, firstName, lastName, registrationDate, completedJobs } = userData;

    // component mounted.
    useEffect(() => {
        window.scrollTo(0, 0);

        const globalConfig = {
            config: {
                params: {
                    uniqueId: userData.uniqueId
                }
            },
            configuration: {
                params: {
                    listingId: id
                }
            }
        }
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

                        // ONE DAY
                        const oneDay = 24 * 60 * 60 * 1000;

                        console.log(startDateArray, endDateArray)
                        // min & max dates
                        const maxDate = new Date(Math.max.apply(null, endDateArray));
                        const minDate = new Date(Math.min.apply(null, startDateArray));
                        const disabledDays = [];

                        const maxedDate = moment(maxDate).startOf('day').toString();

                        // difference in days
                        // const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

                        const mappedSelectedDates = [];
                        const dismissDates = [];

                        for (let index = 0; index < newDateArray.length; index++) {
                            const date = newDateArray[index];
                            // difference in days
                            console.log("DDDDDate", date);

                            
                            for (let d = new Date(date.startDate); d <= new Date(date.endDate); d.setDate(d.getDate() + 1)) {
                                console.log("new Date()", new Date(d));

                                const startOfDay = moment(new Date(d)).startOf('day').toString()

                                if (!mappedSelectedDates.includes(startOfDay)) {
                                    mappedSelectedDates.push(startOfDay);
                                } 
                            }

                            if ((newDateArray.length - 1) === index) {
                                console.log("RANNNNNNNNNN>>>>>>>....");
                                for (let d = minDate; d <= new Date(maxedDate); d.setDate(d.getDate() + 1)) {
                                    const formatedLoopItem = moment(new Date(d)).startOf('day').toString();

                                    console.log("formatedLoopItem", formatedLoopItem, maxedDate);
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
                // update physicalOrDigitalHackOptions options 
                switch (listing.typeOfHack.value) {
                    case "physical-hack":
                        setPhysicalOrDigitalHackOptionsState([{ label: "BOTH (Digital/Physical hack's) Hack Type's", value: "both-assets", isDisabled: true }, { label: "Digital/Internet-Hack ONLY", value: "digital-internet-hack", isDisabled: true }, { label: "Physical-Hack ONLY", value: "physical-hack" }]);
                        break;
                    case "":
                        setPhysicalOrDigitalHackOptionsState([{ label: "BOTH (Digital/Physical hack's) Hack Type's", value: "both-assets", isDisabled: true }, { label: "Digital/Internet-Hack ONLY", value: "digital-internet-hack" }, { isDisabled: true, label: "Physical-Hack ONLY", value: "physical-hack" }]);
                        break;
                    case "":
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
        // gather core anonymous user information
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/core/anonymous/user/data`, globalConfig.config).then((res) => {
            if (res.data.message === "Successfully gathered core user information!") {
                console.log(res.data);

                const { user } = res.data;

                setCurrentUserData(user);
                setReadyGlobal(true);
            } else {
                console.log('err', res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    
    // render custom sentence instead of DRY repeating
    const renderSentence = (actual, type, val) => {
        // run conditionals to figure out what to display to user and what to mark as "incomplete"
        if (ready === true && currentUserData !== null) {
            // ready to display
            if (currentUserData.hasOwnProperty(actual)) {
                // return proper/desired "right" filled out data
                return <p className={"mb-1 listitem-sub-text-custom-custom"}>Your {type} <strong style={currentUserData.hasOwnProperty(actual) ? { color: "#dc3545", fontSize: "1.005rem", fontWeight: 500 } : { color: "#a927f9", fontSize: "1.005rem", fontWeight: 500 }}>{val}</strong> will be submitted to the employer...</p>;
            } else {
                // throw error warning user
                return <p className={"mb-1 listitem-sub-text-custom-custom override-red"}>You have NOT filled out the required field of <em style={{ textDecorationLine: "underline" }}>{type}</em>, therefore you will be unable to apply to this listing! If you'd like to apply to this listing, go to <Link to={"/profile/settings/edit"} className="linky">your profile settings page</Link> and edit the appropriate sections, then come back and try again!</p>;
            }
        } else {
            // return loading "data"
            return <p className={"mb-1 listitem-sub-text-custom-custom"}>Still loading your data/content...!</p>;
        }
    }
    // view more fields in PANE
    const viewRemainderOfIncludedFields = (alreadyIncludedArray) => {
        console.log("alreadyIncludedArray arr... : ", alreadyIncludedArray);

        // already shown items *(HIGHLIGHT)*
        setAlreadyAddedState(alreadyIncludedArray);
        // shift "lock" styles to prevent scrolling and clicking
        shiftCoreStyles(true);
        // open modal - change modal state to OPEN
        setSheetOpenState(true);
        // set delay to allow load
        setTimeout(() => {
            // select outter body classname to pause/freeze
            const target = document.querySelector(".enact-nonclick");
            // DISABLE body scroll entirely
            disableBodyScroll(target);
        },  500);
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    }
    console.log("disabledDays", disabledDays);
    return (
        <Fragment>
            <SheetPaneSubmittingDataHelper ready={ready} shiftCoreStyles={shiftCoreStyles} alreadyAdded={alreadyAdded} currentUserData={currentUserData} clearAllBodyScrollLocks={clearAllBodyScrollLocks} userData={userData} sheetIsOpen={sheetIsOpen} setSheetOpenState={setSheetOpenState} renderSentence={renderSentence} />
            <Breadcrumb passedClassname={"custom-breadcrumb-class"} parent={`Apply & Work To Earn ${process.env.REACT_APP_CRYPTO_TOKEN_NAME} to cashout for REAL ($$$-USD)`} title={"Review job requirements & details + apply to position/listing!"} />
            <Container className="container-default" fluid={true}>
                <Row className="customized-row-apply" style={{ paddingTop: "25px " }}>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className="custom-card-inner customized-top-card">
                            <CardHeader className="b-l-primary">
                                <h5>Type of hack (physical location or digital asset)</h5>
                                <p style={{ paddingTop: "7.5px" }}>This is the <em>TYPE</em> of hack this <em>specific listing</em> requires from its participants. These selected options have absolutely <strong>NO LIENENCY</strong> and any disregard to platform rules will result in <strong>IMMEDIATE PERMENANT BANNING</strong></p>
                            </CardHeader>
                            <CardBody>
                                <HelperRadioButtons listingReady={listingReady} listingData={listingData} id={id} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md="6" lg="6" xl="6">
                        <Card className="custom-card-inner custom-card-inner-customized">
                            <CardHeader className="b-l-info">
                                <h5>Type Of Data That'll Be Automatically Submitted</h5>
                                <hr />
                                <p>This is the data/information that'll be automatically submitted to the employer to give them a better idea of who/what you are and to hopefully personalize the experience a bit more...</p>
                            </CardHeader>
                            <CardBody>
                                <ListGroup>
                                    <ListGroupItem className="list-group-item-action flex-column align-items-start" >
                                        <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1 listitem-header-custom">{"Username"}</h5><small>{"Will be submitted to employer"}</small>
                                        </div>
                                        <hr />
                                        {renderSentence("username", "Username", username)}
                                    </ListGroupItem>
                                    <ListGroupItem className="list-group-item-action flex-column align-items-start" >
                                        <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1 listitem-header-custom">{"First Name & Last Name (Together)"}</h5><small>{"Will be submitted to employer"}</small>
                                        </div>
                                        <hr />
                                        {renderSentence("fullName", "Full Name", `${firstName} ${lastName}`)}
                                    </ListGroupItem>
                                    <ListGroupItem className="list-group-item-action flex-column align-items-start" >
                                        <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1 listitem-header-custom">{"Completed Job Count"}</h5><small>{"Will be submitted to employer"}</small>
                                        </div>
                                        <hr />
                                        {renderSentence("registrationDate", "Registration date of", moment(registrationDate).fromNow())}
                                    </ListGroupItem>
                                    <ListGroupItem className="list-group-item-action flex-column align-items-start" >
                                        <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1 listitem-header-custom">{"Created Account (from ago...)"}</h5><small>{"Will be submitted to employer"}</small>
                                        </div>
                                        <hr />
                                        {renderSentence("completedJobs", "Completed Job Count", completedJobs)}
                                    </ListGroupItem>
                                    <ListGroupItem className="list-group-item-action flex-column align-items-start" >
                                        <Button style={{ width: "100%" }} className={"btn-square btn-air-info"} onClick={() => {
                                            // View ALL included fields...
                                            viewRemainderOfIncludedFields(["username", "fullName", "registrationDate", "completedJobs"]);
                                        }} outline color="info-2x">View all included fields (including above mentioned)</Button>
                                    </ListGroupItem>
                                </ListGroup>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" md="6" lg="6" xl="6">
                        <Card className="custom-card-inner custom-card-inner-customized">
                            <CardHeader className="b-l-info">
                                <h5><strong>REQUIRED</strong> data to be completed/filled-out</h5>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup className=" m-form__group">
                                        <Label>Message To Employer</Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend"><InputGroupText>{"@"}</InputGroupText></InputGroupAddon>
                                            <Input className="form-control" type="text" placeholder="Email"/>
                                        </InputGroup>
                                    </FormGroup>
                                    {datesReady === true ? <DateRangePicker
                                        ranges={dateRanges}
                                        onChange={handleDateSelection}
                                        // onPreviewChange={(value1, value2) => {
                                        //     console.log(value1, value2);
                                        // }}
                                        minDate={new Date()}
                                        // go back MAX 2 WEEKS and start from there
                                        // minDate={new Date(new Date.getTime() - (dayInMilli * 14))}
                                        disabledDates={disabledDays}
                                        scroll={{ enabled: true }}
                                        direction={"horizontal"}
                                        // showMonthAndYearPickers={true}
                                        rangeColors={["#f73164", "#a927f9", "#f73164", "#a927f9", "#f73164", "#a927f9"]}
                                    /> : null}
                                    <FormGroup>
                                        <Label>Account Type (Digital/Physical-hack type)</Label>
                                        <Select
                                            placeholder={"Select your desired hack type (of enabled options)"}
                                            value={null}
                                            onChange={(selectedOption) => {

                                            }}
                                            options={physicalOrDigitalHackOptions}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Messge To Employer</Label>
                                        <Input placeholder={"Enter your 'custom' message to the employer..."} onChange={handleInputChange} name={"message-to-employer"} type="textarea" className="form-control input-air-primary" rows={"4"} />
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <TimelineHelper />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, { shiftCoreStyles })(withRouter(ApplyAsHackerEmployerListingHelper));
