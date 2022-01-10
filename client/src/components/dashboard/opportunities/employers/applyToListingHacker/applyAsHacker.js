import React, { Fragment, useState, useEffect, useRef } from 'react';
import "./styles.css";
import Breadcrumb from '../../../../../layout/breadcrumb';
import { Container, Row, Col, Card, CardBody, Button, CardHeader, ListGroupItem, ListGroup, FormGroup, Label, Input, InputGroupAddon, Form, InputGroup, InputGroupText, Media } from 'reactstrap';
import helpers from "./helpers/miscFunctions.js";
import { connect } from "react-redux";
import moment from "moment";
import { shiftCoreStyles } from "../../../../../redux/actions/universal/index.js";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import axios from 'axios';
import _ from "lodash";
import { Link, withRouter, useParams } from "react-router-dom";
import Select from 'react-select';
import { DateRangePicker } from 'react-date-range';
import { useForm, Controller } from 'react-hook-form';
import MainHooksCustomHelpers from "./helpers/reactHookFormHelpers.js";
import Tour from 'reactour';
import LoadingBar from 'react-top-loading-bar';
import { saveApplicationDetailsProgress } from "../../../../../redux/actions/hackers/applyToEmployerListing/applicationInfo.js";

const { TimelineHelper, SheetPaneSubmittingDataHelper, HelperRadioButtons, renderMountedLogic, handleDeletionLink, handleLinkAddition, SheetDisplayFilesFileManagerHelper } = helpers;

const urlEnteredLinkData = MainHooksCustomHelpers().urlEnteredLinkData;
const coverLetterChecks = MainHooksCustomHelpers().coverLetterChecks;
const messageToEmployerChecks = MainHooksCustomHelpers().messageToEmployerChecks;
const physicalOrDigitalChecks = MainHooksCustomHelpers().physicalOrDigitalChecks;
const approachToSuccessfullyHackCo = MainHooksCustomHelpers().approachToSuccessfullyHackCo;


const tourStepsOptions = [
    {
      selector: '#tour-col-custom',
      content: 'ONCE you have ALL of the required information completed & filled-out, Click this button to proceed forward and submit your filled out information & APPLY!',
    }
];


const ApplyAsHackerEmployerListingHelper = ({ userData, shiftCoreStyles, location, saveApplicationDetailsProgress, previous }) => {
    
    // ref's
    const physicalOrDigitalOrBothGeneratedRef = useRef(null);
    const scrollToTourWrapper = useRef(null);
    // get URL ID from string
    const { id } = useParams();
    // initialize state items...
    const [ alreadyAdded, setAlreadyAddedState ] = useState(null);
    const [ filesSheetOpen, setFileSheetOpenState ] = useState(false);
    const [ linkInput, setLinkInput ] = useState(""); 
    const [ isTourOpen, setIsTourOpenState ] = useState(false);
    const [ disabledDays, setDisabledDaysState ] = useState([]);
    const [ physicalOrDigitalHackOptions, setPhysicalOrDigitalHackOptionsState ] = useState([]);
    const [ sheetIsOpen, setSheetOpenState ] = useState(false);
    const [ currentUserData, setCurrentUserData ] = useState(null);
    const [ ready, setReadyGlobal ] = useState(false);
    const [ progress, setProgress ] = useState(0);
    const [ listingReady, setListingReady ] = useState(false);
    const [ listingData, setListingData ] = useState(null);
    const [ dateRanges, setDateRanges ] = useState(null);
    const [ datesReady, setDatesReady ] = useState(false);
    const [ selectedLinks, setSelectedLinks ] = useState([]);

    const { register, handleSubmit, control, reset, getValues, setValue, setError, clearErrors, formState: { errors }} = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur"
        // delayError: 500
    });
    
    const gatheredValues = getValues();

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
        renderMountedLogic(globalConfig, setPhysicalOrDigitalHackOptionsState, setListingData, setDatesReady, setDateRanges, setDisabledDaysState, setListingReady);
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

        setValue(name, value, { shouldValidate: true });
    }
    const showButtonOrNot = () => {
        if (!_.has(errors, "referenceLink") && !errors.referenceLink && typeof gatheredValues.referenceLink !== "undefined" && gatheredValues.referenceLink.length > 0) {
            return true;
        } else {
            return false;
        }
    }
    const clearInput = () => {
        setLinkInput("");
    }
    //  TOUR related LOCK SCREEN functions - DISABLE body scrolling
    const disableBodyAndScroll = target => {
        // disable body scroll
        disableBodyScroll(target);
    };
    const enableBody = target => clearAllBodyScrollLocks();

    const handleDirectionChangeTour = () => {
        // DISABLE clicking background
        shiftCoreStyles(true);
        // scroll to target and LOCK SCREEN until closed.
        scrollToTourWrapper.current.scrollIntoView();
        // alter slightly to account for top-NAV
        setTimeout(() => {
            window.scrollBy(0, -175);
        }, 750);
        // lock after appropriate position change
        setTimeout(() => {
            // select MAIN WRAPPER class
            const select = document.querySelector(".enact-nonclick");
            // disable selected class (movement, clicks, etc...);
            disableBodyScroll(select);

            setIsTourOpenState(true);
        }, 1000)
    }
    const handleTourClosingAction = () => {
        // allow background clicking again
        shiftCoreStyles(false);
        // clear body scroll locks
        clearAllBodyScrollLocks();
        // close tour state
        setIsTourOpenState(false);
    }
    const onErrorMainForm = (errors, e) => {
        console.log("errors : ", errors);
        console.log("e : ", e);
    }
    const onFormSubmit = (values, valuesTwo) => {
        console.log("values and valuesTwo", values, valuesTwo);
    }
    const handleFinalSubmissionFiles = () => {
        // DISABLE clicking background
        shiftCoreStyles(true);
        // set sheet open
        setFileSheetOpenState(true);
        // lock after appropriate position change
        setTimeout(() => {
            // select MAIN-WRAPPER div class
            const select = document.querySelector(".enact-nonclick");
            // finally - disable while pane is open!
            disableBodyScroll(select);
        }, 450);
    }
    // log values to debug
    console.log("gatheredValues", gatheredValues, "errors", errors);
    return (
        <Fragment>
            <LoadingBar
                color='#51bb25'
                height={7}
                progress={progress}
                onLoaderFinished={() => {
                    setProgress(0);
                }}
            />
            <SheetPaneSubmittingDataHelper ready={ready} shiftCoreStyles={shiftCoreStyles} alreadyAdded={alreadyAdded} currentUserData={currentUserData} clearAllBodyScrollLocks={clearAllBodyScrollLocks} userData={userData} sheetIsOpen={sheetIsOpen} setSheetOpenState={setSheetOpenState} renderSentence={renderSentence} />
            <SheetDisplayFilesFileManagerHelper previous={previous} saveApplicationDetailsProgress={saveApplicationDetailsProgress} setProgress={setProgress} filesSheetOpen={filesSheetOpen} setFileSheetOpenState={setFileSheetOpenState} shiftCoreStyles={shiftCoreStyles} clearAllBodyScrollLocks={clearAllBodyScrollLocks} />
            <Breadcrumb passedClassname={"custom-breadcrumb-class"} parent={`Apply & Work To Earn ${process.env.REACT_APP_CRYPTO_TOKEN_NAME} to cashout for REAL ($$$-USD)`} title={"Review job requirements & details + apply to position/listing!"} />
            <Tour
                steps={tourStepsOptions}
                isOpen={isTourOpen}
                onAfterOpen={disableBodyAndScroll}
                onBeforeClose={enableBody}
                onRequestClose={handleTourClosingAction} 
            />
            <div className="absolute-position-bottom-right-fixed">
                <Card className="redirect-fixed-bottom-right">
                    <Media className="p-20">
                        <div className="radio radio-info mr-3">
                            <Input checked={true} id="radio-redirect" type="radio" name="radio1" value="option1" />
                            <Label for="radio-redirect"></Label>
                        </div>
                        <Media className="media-body-customized-fixed" body>
                            <h6 className="mt-0 mega-title-badge custom-mega-title-badge">Are you ready to submit your application?! <span className="badge badge-info pull-right digits custom-pull-right-digits">{"SHOW ME HOW TO SUBMIT APP!"}</span></h6>
                            <p>Are you <strong>READY TO SUBMIT YOUR APPLICATION</strong> to this employer and submit your 'completed/filled-out' information? Click the button below to be directed to the <strong>'Submit Application'</strong> button to proceed forwards...</p>
                            <hr />
                            <div className="natural-sm-spacer" />
                            <Button onClick={handleDirectionChangeTour} style={{ width: "100%" }} className="btn-square btn-air-info" outline color="info-2x">Show me the 'submission' button!</Button>
                        </Media>
                    </Media>
                </Card>
            </div>
            <Container className="container-default" fluid={true}>
                <Form className={`needs-validation tooltip-validation validateClass`} noValidate="" onSubmit={handleSubmit(onFormSubmit, (errors, e) => {
                    return onErrorMainForm(errors, e);
                })}>
                    <Row className="customized-row-apply" style={{ paddingTop: "25px " }}>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <Card className="custom-card-inner customized-top-card">
                                <CardHeader className="b-l-primary">
                                    <h5>Type of hack (physical location or digital asset)</h5>
                                    <p style={{ paddingTop: "7.5px" }}>This is the <em>TYPE</em> of hack this <em>specific listing</em> requires from its participants. These selected options have absolutely <strong>NO LIENENCY</strong> and any disregard to platform rules will result in <strong>IMMEDIATE PERMENANT BANNING</strong></p>
                                </CardHeader>
                                <CardBody>
                                    <HelperRadioButtons listingReady={listingReady} listingData={listingData} id={id} />
                                    <div style={{ paddingTop: "15px" }} />
                                    <hr />{/*  listingVisibility */}
                                    <Row>
                                        <Col md="6" lg="6" xl="6" sm="12">
                                            <FormGroup>
                                                <Label className="heavy-label">{coverLetterChecks.label}</Label>
                                                <Input {...coverLetterChecks.check(setError, register, clearErrors, setValue, "coverLetterText")} value={gatheredValues.coverLetterText} placeholder={coverLetterChecks.placeholder} onChange={(e) => {
                                                    return coverLetterChecks.onChange(e, "coverLetterText", setValue);
                                                }} name={coverLetterChecks.name} type="textarea" className="form-control input-air-primary" rows={"4"} />
                                                {errors.coverLetterText ? <span className="span-tooltip">{errors.coverLetterText.message}</span> : null}
                                            </FormGroup>
                                            <FormGroup>
                                                <Label>{physicalOrDigitalChecks.label}</Label>
                                                <Controller
                                                    control={control} 
                                                    name={physicalOrDigitalChecks.name}
                                                    {...physicalOrDigitalChecks.check(physicalOrDigitalChecks.name, register)}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            autoBlur={true}
                                                            defaultValue={null}
                                                            ref={physicalOrDigitalOrBothGeneratedRef}
                                                            value={gatheredValues.physicalOrDigitalOrBoth}
                                                            placeholder={physicalOrDigitalChecks.placeholder}
                                                            onChange={(selectedOption) => {
                                                                console.log("changed!!!!");

                                                                setTimeout(() => {
                                                                    // clear error after proper selection
                                                                    if ((typeof selectedOption !== "undefined") && (Object.keys(selectedOption).length > 0)) {
                                                                        // set selected value
                                                                        setValue(physicalOrDigitalChecks.name, selectedOption, { shouldValidate: false });
                                                                        // clear relevant error
                                                                        clearErrors(physicalOrDigitalChecks.name);
                                                                    } else {
                                                                        // set error as nothing was selected (blank 'click-off' selection of selector)
                                                                        setError(physicalOrDigitalChecks.name, {
                                                                            type: "manual",
                                                                            message: "You haven't selected a 'Type Of Hack Selection' & a selection is required before proceeding",
                                                                        });
                                                                    }
                                                                }, 50);
                                                            }}
                                                            onMenuClose={() => {
                                                                physicalOrDigitalOrBothGeneratedRef.current.blur();
                                                            }}
                                                            options={physicalOrDigitalHackOptions}
                                                        />
                                                    )}
                                                />
                                                {errors.physicalOrDigitalOrBoth ? <span className="span-tooltip">{errors.physicalOrDigitalOrBoth.message}</span> : null}
                                            </FormGroup>
                                        </Col>
                                        <Col md="6" lg="6" xl="6" sm="12">
                                            <FormGroup>
                                                <Label className="heavy-label">Message To Employer (Direct to employer)</Label>
                                                <Input {...messageToEmployerChecks.check(setError, register, clearErrors, setValue, "messageToEmployer")} placeholder={messageToEmployerChecks.placeholder} onChange={(e) => {
                                                    return messageToEmployerChecks.onChange(e, "messageToEmployer", setValue);
                                                }} name={messageToEmployerChecks.name} type="textarea" className="form-control input-air-primary" rows={"4"} />
                                                {errors.messageToEmployer ? <span className="span-tooltip">{errors.messageToEmployer.message}</span> : null}
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="heavy-label">{approachToSuccessfullyHackCo.label}</Label>
                                                <Input {...approachToSuccessfullyHackCo.check(setError, register, clearErrors, "technicalApproachToHack")} placeholder={approachToSuccessfullyHackCo.placeholder} onChange={(e) => {
                                                    return approachToSuccessfullyHackCo.onChange(e, "technicalApproachToHack", setValue);
                                                }} name={approachToSuccessfullyHackCo.name} type="textarea" className="form-control input-air-primary" rows={"3"} />
                                                {errors.technicalApproachToHack ? <span className="span-tooltip">{errors.technicalApproachToHack.message}</span> : null}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="12" lg="12" xl="12">
                                            <Card className="custom-card-inner custom-card-bottom-across">
                                                <CardHeader className="b-l-info">
                                                    <h5><strong>Attachments</strong> to be <strong>sent</strong> to the employer of this listing</h5>
                                                    <p style={{ paddingTop: "7.5px" }}>These attachments can be anything from a "Cover Letter" or "Resume" & these files will be sent <strong>directly</strong> to the employer for consideration of your application for this listing or job/gig.</p>
                                                </CardHeader>
                                                <CardBody>
                                                    <Button style={{ width: "100%" }} className={"btn-square btn-air-success"} onClick={() => {
                                                        // open pane slider up from bottom
                                                        handleFinalSubmissionFiles() 
                                                    }} outline color="success-2x">Upload & Manage Attachments (To-be sent directly to employer)</Button>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
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
                                        {/* links go here... */}
                                        <FormGroup style={{ marginTop: "17.5px" }} className=" m-form__group">
                                            <Label className="heavy-label">Reference a link (blog, website, etc... made by <em style={{ textDecorationLine: "underline" }}>you</em>)</Label>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend"><InputGroupText className="group-addon-custom-two">{"http(s)://"}</InputGroupText></InputGroupAddon>
                                                <Input {...urlEnteredLinkData.check(setError, register, clearErrors, setValue, errors, "referenceLink")} value={linkInput} onChange={(e) => {
                                                    return urlEnteredLinkData.onChange(e, setError, clearErrors, setValue, setLinkInput);
                                                }} className="form-control" type="text" name="referenceLink" placeholder={"Enter a link to your work (website, blog, etc...)"} />
                                                {showButtonOrNot() ? <InputGroupAddon onClick={() => {
                                                    handleLinkAddition(setSelectedLinks, gatheredValues.referenceLink, clearInput);
                                                }} addonType="append"><InputGroupText className="group-addon-custom">{"Submit"}</InputGroupText></InputGroupAddon> : null}
                                            </InputGroup>
                                            {errors.referenceLink ? <span className="span-tooltip">{errors.referenceLink.message}</span> : null}
                                        </FormGroup>
                                        {selectedLinks.map((link, index) => {
                                            console.log("link", link);
                                            return (
                                                <div style={{ marginTop: "12.5px", marginBottom: "12.5px" }} key={index}>
                                                    <ListGroupItem onClick={(e) => {
                                                        e.preventDefault();
                                                    }} className="list-group-item custom-list-group-item-text"><div style={{ paddingRight: "25px" }} />{link.url}<i onClick={() => {
                                                        // handle deletion
                                                        handleDeletionLink(link, setSelectedLinks);
                                                    }} id={"float-trash-right"} className="icon-trash"></i></ListGroupItem>
                                                </div>
                                            );
                                        })}
                                        <Label className="heavy-label">Available dates to select (Physical 'Hack'ing Dates)</Label>
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
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" lg="12" xl="12" md="12">
                            <div ref={scrollToTourWrapper} id="tour-col-custom">
                                <Card className="shadow-lg">
                                    <CardHeader>
                                        <h5>Have you filled out <strong>ALL OF THE REQUIRED DATA/INFO</strong> and you're now <strong>READY</strong> to apply and continue with your application?!</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <p>Click the button below to proceed forward & <strong>apply to this listing</strong> and submit the data you've filled out. Good luck & we'll keep you updated along the way as we recieve more updates on this listing and your application!</p>
                                        <hr />
                                        <div className="natural-sm-spacer" />
                                        <div className="natural-sm-spacer" />
                                        <div className="natural-sm-spacer" />
                                        <Button style={{ width: "100%" }} type={"submit"} className="btn-square btn-air-info" outline color="info-2x">SUBMIT APPLICATION INFORMATION</Button>
                                        <div className="natural-sm-spacer" />
                                        <div className="natural-sm-spacer" />
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <TimelineHelper />
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Fragment>
    )
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data,
        previous: _.has(state.applicationDetails, "applicationDetails") ? state.applicationDetails.applicationDetails : {}
    }
}
export default connect(mapStateToProps, { shiftCoreStyles, saveApplicationDetailsProgress })(withRouter(ApplyAsHackerEmployerListingHelper));
