import React, { Fragment, useState, useEffect, useRef } from 'react';
import "./styles.css";
import Breadcrumb from '../../../../../layout/breadcrumb';
import { Container, Row, Col, Card, CardBody, Button, CardHeader, ListGroupItem, ButtonGroup, ListGroup, FormGroup, Label, Input, InputGroupAddon, Form, InputGroup, InputGroupText, Media } from 'reactstrap';
import helpers from "./helpers/miscFunctions.js";
import { connect } from "react-redux";
import moment from "moment";
import { shiftCoreStyles } from "../../../../../redux/actions/universal/index.js";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import axios from 'axios';
import _ from "lodash";
import { Link, withRouter, useParams, useHistory } from "react-router-dom";
import Select from 'react-select';
import { DateRangePicker } from 'react-date-range';
import { useForm, Controller } from 'react-hook-form';
import MainHooksCustomHelpers from "./helpers/reactHookFormHelpers.js";
import Tour from 'reactour';
import LoadingBar from 'react-top-loading-bar';
import { saveApplicationDetailsProgress } from "../../../../../redux/actions/hackers/applyToEmployerListing/applicationInfo.js";
import { NotificationManager } from "react-notifications";
import uuid from 'react-uuid';
import { confirmAlert } from 'react-confirm-alert';

const { TimelineHelper, SheetPaneSubmittingDataHelper, HelperRadioButtons, renderMountedLogic, handleDeletionLink, handleLinkAddition, SheetDisplayFilesFileManagerHelper } = helpers;

// react-hook-form helpers
const urlEnteredLinkData = MainHooksCustomHelpers().urlEnteredLinkData;
const coverLetterChecks = MainHooksCustomHelpers().coverLetterChecks;
const messageToEmployerChecks = MainHooksCustomHelpers().messageToEmployerChecks;
const physicalOrDigitalChecks = MainHooksCustomHelpers().physicalOrDigitalChecks;
const approachToSuccessfullyHackCo = MainHooksCustomHelpers().approachToSuccessfullyHackCo;
const participateInBettingWagers = MainHooksCustomHelpers().participateInBettingWagers;
const tokenBidWagerAmount = MainHooksCustomHelpers().tokenBidWagerAmount;


const tourStepsOptions = [
    {
      selector: '#tour-col-custom',
      content: 'ONCE you have ALL of the required information completed & filled-out, Click this button to proceed forward and submit your filled out information & APPLY!',
    }
];

const participateInBettingWagersOptions = [
    { label: "I'd like to PARTICIPATE! Sign me up...", value: "yes-participate", actual: true },
    { label: "N0... - Don't Participate.", value: "dont-participate", actual: false }
];


const ApplyAsHackerEmployerListingHelper = ({ previousFiles, userData, shiftCoreStyles, location, saveApplicationDetailsProgress, previous }) => {

    const history = useHistory();
    // ref's
    const physicalOrDigitalOrBothGeneratedRef = useRef(null);
    const participateInBettingWagersRef = useRef(null);
    const scrollToTourWrapper = useRef(null);
    // get URL ID from string
    const { id } = useParams();
    // initialize state items...
    const [ alreadyAdded, setAlreadyAddedState ] = useState(null);
    const [ filesSheetOpen, setFileSheetOpenState ] = useState(false);
    const [ showMore, setShowMoreState ] = useState(false);
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
    const [ maxDate, setMaxDate ] = useState(null);

    const { register, handleSubmit, control, resetField, getValues, setValue, setError, clearErrors, watch, formState: { errors }} = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur"
        // delayError: 500
    });
    
    const gatheredValues = getValues();

    const handleDateSelection = (ranges) => {
        const { startDate, endDate } = ranges.selection;

        const datesAreOnSameDay = (first, second) => first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate();

        const gatherDayInfo = (date) => moment(date).format("MM-DD-YYYY");

        if (datesAreOnSameDay(startDate, endDate)) {
            const formattedDate = {
                startDate,
                endDate,
                key: 'selection',
                formattedStartDate: gatherDayInfo(startDate),
                formattedEndDate: gatherDayInfo(endDate),
                uniqueId: uuid()
            }

            if (_.has(gatheredValues, "selectedTestDates") && typeof gatheredValues.selectedTestDates !== "undefined") {
                if (gatheredValues.selectedTestDates.length === 0) {
                    // update state...
                    setValue("selectedTestDates", [...gatheredValues.selectedTestDates, formattedDate], { shouldValidate: false });
                    // clear related error data
                    clearErrors(["selectedTestDates"]);
                } else {
                    if ((gatheredValues.selectedTestDates.filter(x => x.formattedStartDate === formattedDate.formattedStartDate)).length > 0) {
                        NotificationManager.warning("You cannot select the SAME date TWICE - Please select UNIQUE dates when selecting various physical 'hack dates'...", "Date is ALREADY selected!", 4750);  
                    } else {
                        // update state...
                        setValue("selectedTestDates", [...gatheredValues.selectedTestDates, formattedDate], { shouldValidate: false });
                        // clear related error data
                        clearErrors(["selectedTestDates"]);
                    }
                }
            } 
        }
    }
    // deconstruct redux-state items...
    const { username, firstName, lastName, registrationDate, completedJobs } = userData;

    // component mounted.
    useEffect(() => {

        // set default unavailiable state - selectedTestDates
        setValue("selectedTestDates", []);
        setValue("referenceLinks", []);
        // set global config obj's for api-requests
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
        renderMountedLogic(setMaxDate, globalConfig, setPhysicalOrDigitalHackOptionsState, setListingData, setDatesReady, setDateRanges, setDisabledDaysState, setListingReady);
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
    const showButtonOrNot = () => {
        if (!_.has(errors, "referenceLink") && !errors.referenceLink && typeof gatheredValues.referenceLink !== "undefined" && gatheredValues.referenceLink.length > 0) {
            return true;
        } else {
            return false;
        }
    }
    const clearInput = () => {
        resetField("referenceLink");
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
        console.log("errors : ", errors); // selectAttachments

        if (_.has(previous, "files") && previous.files.length > 0) {
            clearErrors(["selectAttachments"]);
        } else {
            setError("selectAttachments", {
                type: "manual",
                message: "You MUST select AT least ONE(1) attachments (CL, Resume, Image, etc...) before proceeding with the submission of this form",
            });
        }

        if (!gatheredValues.selectedTestDates.length > 0) {
            setError("selectedTestDates", {
                type: "manual",
                message: "You MUST select a calendar time to 'attempt' your 'physical' hack to try to infiltrate this employer's company. Select a date (one day MIN) to continue!",
            });
        } 
    }
    const onFormSubmit = (values) => {
        console.log("values", values);
        // deconstruct files from attached-files section-redux
        const attachedFiles = previousFiles.applicationDetails.applicationDetails.files;
        // deconstruct core information from bio-profile section
        const { username, firstName, lastName, completedJobs, registrationDate, aboutMe, title, reviews, fullyVerified, points, yearsOfExperience } = currentUserData;
        // deconstruct form-redux values on-submit
        const { coverLetterText, messageToEmployer, participateInBettingProcess, physicalOrDigitalOrBoth, referenceLinks, selectedTestDates, technicalApproachToHack } = values;

        // currentUserData.every((item) => {
            
        // })

        const myID = userData.uniqueId;
        const generatedID = uuid();

        const addApplicantData = {
            applicantID: myID,
            listingID: listingData.uniqueId,
            employerId: listingData.postedBy,
            employerPostedJobId: listingData.uniqueId,
            userData,
            generatedID,
            applicationData: {
                generatedID,
                attachedFiles,
                coverLetterText, 
                messageToEmployer, 
                applicantId: userData.uniqueId,
                responses: [],
                hired: false,
                applicantName: `${userData.firstName} ${userData.lastName}`,
                likes: 0,
                dislikes: 0,
                applicantId: myID,
                dateApplied: new Date(),
                legibleDateApplied: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                participateInBettingProcess, 
                physicalOrDigitalOrBoth, 
                referenceLinks, 
                selectedTestDates, 
                technicalApproachToHack, 
                waggeredBidAmount: _.has(values, "waggeredBidAmount") ? values.waggeredBidAmount : null,
                bettingOnSelfSelected: _.has(values, "waggeredBidAmount") ? true : false
            }
        }

        const finalResult = {
            uniqueId: myID,
            employerId: listingData.postedBy,
            employerPostedJobId: listingData.uniqueId,
            applicationData: {
                generatedID,
                attachedFiles,
                coverLetterText, 
                messageToEmployer, 
                applicantId: userData.uniqueId,
                responses: [],
                hired: false,
                applicantName: `${userData.firstName} ${userData.lastName}`,
                likes: 0,
                dislikes: 0,
                employerPostedJobId: listingData.uniqueId,
                employerPosterId: listingData.postedBy,
                applicantId: myID,
                dateApplied: new Date(),
                legibleDateApplied: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                participateInBettingProcess, 
                physicalOrDigitalOrBoth, 
                referenceLinks, 
                selectedTestDates, 
                technicalApproachToHack, 
                waggeredBidAmount: _.has(values, "waggeredBidAmount") ? values.waggeredBidAmount : null,
                bettingOnSelfSelected: _.has(values, "waggeredBidAmount") ? true : false,
                submittedUserData: {
                    username, 
                    firstName, 
                    lastName, 
                    completedJobs, 
                    registrationDate, 
                    aboutMe, 
                    title, 
                    reviews, 
                    fullyVerified, 
                    points, 
                    yearsOfExperience 
                }
            }
        };

        // View ALL included fields...
        const requiredKeys = ["username", "firstName", "lastName", "completedJobs", "registrationDate", "aboutMe", "title", "reviews", "fullyVerified", "points", "yearsOfExperience"];
        // figure out length of requiredKeys     
        const requiredLength = requiredKeys.length;
        // run boolean check
        const doesIncludeFailures = requiredKeys.map((key, i) => {
            if (typeof currentUserData[key] !== "undefined") {
                // includes!
                return true;
            } else {
                // doesnt include & notify!
                NotificationManager.warning(`You're missing a REQUIRED submission input field of '${key}' - please go to your bio/profile section and submit this key of '${key}' before proceeding!`, `You are MISSING a key/field of the value '${key}'...!`, 4750);
                // return value to check at end for api-request running or not afterwards
                return false;
            }
        })

        if (doesIncludeFailures.includes(false)) {
            // do nothing - NOT ready yet missing information

            NotificationManager.error(`We experienced an ERROR while attempting to run our pre-upload checks & you're missing some required information...`, `MISSING data - Required BEFORE continuing!`, 4750);
        } else {
            // RUN FINAL REQUEST! all information is properly filled out...!

            // SAVE-DATA api-request run!
            axios.post(`${process.env.REACT_APP_BASE_URL}/apply/employer/listing/submit/live/data/last`, finalResult).then((res) => {
                if (res.data.message === "Successfully applied to listing/employer & updated your 'hacker' account as well!") {

                    axios.post(`${process.env.REACT_APP_BASE_URL}/success/application/save/applicant/info/employerlisting`, addApplicantData).then((res) => {
                        if (res.data.message === "Successfully updated employer listing data!") {
                            console.log("EVERYTHING WENT WELL....!! : ", res.data);
        
                            NotificationManager.success("You've successfully applied to this employer's listing & we've notified them of your application!", "Successfully applied to gig/job!", 4000);
        
                            setTimeout(() => {
                                history.push("/dashboard/hacker")
                            },  4000);
                        } else {
                            console.log("Errorr :", res.data);
        
                            NotificationManager.error("Critical error has occurred while updating database - we have deleted any related information regarding this application - please make your attempt again as NO data was saved.", "NO DATA SAVED! TRY AGAIN....", 6250);
                        }
                    }).catch((err) => {
                        console.log(err);

                        NotificationManager.error("Critical error has occurred while updating database - we have deleted any related information regarding this application - please make your attempt again as NO data was saved.", "NO DATA SAVED! TRY AGAIN....", 6250);
                    })
                } else {
                    console.log("Errorr :", res.data);

                    NotificationManager.error(res.data.message, "An error occurred while attempting to apply to this listing!", 4500);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
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
    const watchSelectedTestDates = watch(["selectedTestDates"]);

    console.log("current!!!!!", gatheredValues);
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
            <SheetDisplayFilesFileManagerHelper saveApplicationDetailsProgress={saveApplicationDetailsProgress} previousFiles={previousFiles} setProgress={setProgress} filesSheetOpen={filesSheetOpen} setFileSheetOpenState={setFileSheetOpenState} shiftCoreStyles={shiftCoreStyles} clearAllBodyScrollLocks={clearAllBodyScrollLocks} />
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
                        <Media className="media-body-customized-fixed" body>
                            {showMore === true ? <Fragment>
                                <h6 className="mt-0 mega-title-badge custom-mega-title-badge">Are you ready to submit your application?! <span className="badge badge-info pull-right digits custom-pull-right-digits">{"SHOW ME HOW TO SUBMIT APP!"}</span></h6>
                                <p>Are you <strong>READY TO SUBMIT YOUR APPLICATION</strong> to this employer and submit your 'completed/filled-out' information? Click the button below to be directed to the <strong>'Submit Application'</strong> button to proceed forwards...</p>
                                <hr />
                                <div className="natural-sm-spacer" />
                            </Fragment> : null}
                            <Row>
                                <FormGroup className="m-t-15 custom-radio-ml">
                                    <div className="checkbox checkbox-primary">
                                        <Input onClick={() => {
                                            setShowMoreState(!showMore);
                                        }} checked={showMore === true ? true : false} id="checkbox-primary-show-more" type="checkbox" defaultChecked/>
                                        <Label for="checkbox-primary-show-more">Show <strong style={{ textDecorationLine: "underline", color: "#a927f9" }}>{showMore === true ? "LESS" : "MORE"}</strong> helpful/related info...</Label>
                                    </div>
                                </FormGroup>
                            </Row>
                            <Button onClick={handleDirectionChangeTour} style={{ width: "100%" }} className="btn-square btn-air-info" outline color="info-2x">Show me the 'submission' button!</Button>
                        </Media>
                    </Media>
                </Card>
            </div>
            <Container className="container-default" fluid={true}>
                <Form className={`needs-validation tooltip-validation validateClass`} noValidate="" onSubmit={handleSubmit(onFormSubmit, (errors, e) => {
                    setTimeout(() => {
                        return onErrorMainForm(errors, e);
                    }, 250)
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
                                                <Input {...coverLetterChecks.check(setError, register, clearErrors, "coverLetterText")} placeholder={coverLetterChecks.placeholder} onChange={(e) => {
                                                    return coverLetterChecks.onChange(e, "coverLetterText", setValue);
                                                }} name={coverLetterChecks.name} type="textarea" className="form-control input-air-primary" rows={"6"} />
                                                {errors.coverLetterText ? <span className="span-tooltip">{errors.coverLetterText.message}</span> : null}
                                                {/*  */}
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
                                            <FormGroup>
                                                <Label>{participateInBettingWagers.label}</Label>
                                                <Controller
                                                    control={control} 
                                                    name={participateInBettingWagers.name}
                                                    {...participateInBettingWagers.check(participateInBettingWagers.name, register)}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            autoBlur={true}
                                                            defaultValue={null}
                                                            ref={participateInBettingWagersRef}
                                                            value={gatheredValues.participateInBettingProcess}
                                                            placeholder={participateInBettingWagers.placeholder}
                                                            onChange={(selectedOption) => {
                                                                console.log("changed!!!!", selectedOption);

                                                                setTimeout(() => {
                                                                    // clear error after proper selection
                                                                    if ((typeof selectedOption !== "undefined") && (Object.keys(selectedOption).length > 0)) {
                                                                        // set selected value
                                                                        setValue(participateInBettingWagers.name, selectedOption, { shouldValidate: false });
                                                                        // clear relevant error
                                                                        clearErrors(participateInBettingWagers.name);
                                                                    } else {
                                                                        // set error as nothing was selected (blank 'click-off' selection of selector)
                                                                        setError(participateInBettingWagers.name, {
                                                                            type: "manual",
                                                                            message: "You haven't selected a 'betting/waggering participation status' yet however this is required before proceeding",
                                                                        });
                                                                    }
                                                                }, 50);
                                                            }}
                                                            onMenuClose={() => {
                                                                participateInBettingWagersRef.current.blur();
                                                            }}
                                                            options={participateInBettingWagersOptions}
                                                        />
                                                    )}
                                                />
                                                {errors.participateInBettingProcess ? <span className="span-tooltip">{errors.participateInBettingProcess.message}</span> : null}
                                            </FormGroup>
                                        </Col>
                                        <Col md="6" lg="6" xl="6" sm="12">
                                            <FormGroup>
                                                <Label className="heavy-label">Message To Employer (Direct to employer)</Label>
                                                <Input {...messageToEmployerChecks.check(setError, register, clearErrors, setValue, "messageToEmployer")} placeholder={messageToEmployerChecks.placeholder} onChange={(e) => {
                                                    return messageToEmployerChecks.onChange(e, "messageToEmployer", setValue);
                                                }} name={messageToEmployerChecks.name} type="textarea" className="form-control input-air-primary" rows={"6"} />
                                                {errors.messageToEmployer ? <span className="span-tooltip">{errors.messageToEmployer.message}</span> : null}
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="heavy-label">{approachToSuccessfullyHackCo.label}</Label>
                                                <Input {...approachToSuccessfullyHackCo.check(setError, register, clearErrors, "technicalApproachToHack")} placeholder={approachToSuccessfullyHackCo.placeholder} onChange={(e) => {
                                                    return approachToSuccessfullyHackCo.onChange(e, "technicalApproachToHack", setValue);
                                                }} name={approachToSuccessfullyHackCo.name} type="textarea" className="form-control input-air-primary" rows={"6"} />
                                                {errors.technicalApproachToHack ? <span className="span-tooltip">{errors.technicalApproachToHack.message}</span> : null}
                                            </FormGroup>
                                            {_.has(gatheredValues, "participateInBettingProcess") && typeof gatheredValues.participateInBettingProcess !== "undefined" && gatheredValues.participateInBettingProcess.value === "yes-participate" ? <FormGroup>
                                                <Label className="heavy-label">{tokenBidWagerAmount.label}</Label>
                                                <Input {...tokenBidWagerAmount.check(setError, register, clearErrors, setValue, "waggeredBidAmount")} value={gatheredValues.waggeredBidAmount} placeholder={tokenBidWagerAmount.placeholder} onChange={(e) => {
                                                    return tokenBidWagerAmount.onChange(e, "waggeredBidAmount", setValue);
                                                }} name={tokenBidWagerAmount.name} type="number" className="form-control input-air-primary" pattern={/\d+/g} />
                                                {errors.waggeredBidAmount ? <span className="span-tooltip">{errors.waggeredBidAmount.message}</span> : null}
                                            </FormGroup> : null}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="12" lg="12" xl="12">
                                            <Card className="custom-card-inner custom-card-bottom-across">
                                                <CardHeader className="b-l-info">
                                                    <h5><strong>Attachments</strong> to be <strong>sent</strong> to the employer of this listing</h5>
                                                    <p style={{ paddingTop: "7.5px" }}>These attachments can be anything from a "Cover Letter" or "Resume" & these files will be sent <strong>directly</strong> to the employer for consideration of your application for this listing or job/gig.</p>
                                                </CardHeader>
                                                {errors.selectAttachments ? <span className="span-tooltip">{errors.selectAttachments.message}</span> : null}
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
                                            {renderSentence("firstName" || "lastName", "Full Name", `${firstName} ${lastName}`)}
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
                                                <Input {...urlEnteredLinkData.check(setError, register, clearErrors, setValue, errors, "referenceLink")} onChange={(e) => urlEnteredLinkData.onChange(e, "referenceLink", setValue)} className="form-control" type="text" name="referenceLink" placeholder={"Enter a link to your work (website, blog, etc...)"} />
                                                {showButtonOrNot() ? <InputGroupAddon onClick={() => {
                                                    handleLinkAddition(setSelectedLinks, gatheredValues.referenceLinks, clearInput, setValue, gatheredValues.referenceLink);
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
                                        <Col sm="12" md="12" lg="12" xl="12">
                                            <Label className="heavy-label">Available dates to select (Physical 'Hack'ing Dates - you may need to click a date TWICE as this calendar can be finicky)</Label>
                                            {datesReady === true ? <DateRangePicker
                                                ranges={dateRanges}
                                                onChange={handleDateSelection}
                                                onDatesChange={() => console.log("onDatesChange")}
                                                // minDate={new Date()}
                                                shownDate={new Date()}
                                                className={"custom-date-range-picker"}
                                                showMonthAndYearPickers={false}
                                                disabledDates={disabledDays}
                                                staticRanges={[]}
                                                maxDate={maxDate}
                                                direction={"horizontal"}
                                                showMonthArrow={true}
                                                months={2}
                                                showDateDisplay={false}
                                                inputRanges={[]}
                                                scroll={{ enabled: true }}
                                                rangeColors={["#f73164", "#a927f9", "#f73164", "#a927f9", "#f73164", "#a927f9"]}
                                            /> : null}
                                        </Col>
                                        <div className="natural-sm-spacer" />
                                        {errors.selectedTestDates ? <span className="span-tooltip">{errors.selectedTestDates.message}</span> : null}
                                        <Col style={{ marginTop: "17.5px" }} sm="12" md="12" lg="12" xl="12">
                                            {typeof gatheredValues.selectedTestDates !== "undefined" && gatheredValues.selectedTestDates.length > 0 ? <Label className="heavy-label"><strong>Currently</strong> selected dates to apply "physical" hacks/hacking (<strong>CLICK DATE</strong> to disregard selected date)</Label> : null}
                                            <ListGroup className="listgroup-mapped-dates-wrapper">
                                                {typeof gatheredValues.selectedTestDates !== "undefined" && gatheredValues.selectedTestDates.length > 0 ? gatheredValues.selectedTestDates.map((date, idx) => {
                                                    return <ListGroupItem key={idx} style={{ fontWeight: "bold" }} className="list-group-item-action list-item-dates-mapped" onClick={() => {
                                                        const filtered = gatheredValues.selectedTestDates.filter((dateee, idxxxx) => {
                                                            if (dateee.uniqueId !== date.uniqueId) {
                                                                return true;
                                                            }
                                                        })
                                                        
                                                        console.log("filtered", filtered);

                                                        setValue("selectedTestDates", filtered, { shouldValidate: false });
                                                    }} active={idx % 2 === 0 ? true : false}>You've selected a date of...: {moment(date.startDate).format("MM/DD/YYYY")}</ListGroupItem>;
                                                }) : null}
                                            </ListGroup>
                                        </Col>
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
        previousFiles: _.has(state.applicationDetails, "applicationDetails") && _.has(state.applicationDetails.applicationDetails, "files") ? {
            applicationDetails: {
                applicationDetails: {
                    files: state.applicationDetails.applicationDetails.files
                }
            }
        } : {
            applicationDetails: {
                applicationDetails: {
                    files: []
                }
            }
        },
        previous: _.has(state.applicationDetails, "applicationDetails") ? state.applicationDetails.applicationDetails : {}
    }
}
export default connect(mapStateToProps, { shiftCoreStyles, saveApplicationDetailsProgress })(withRouter(ApplyAsHackerEmployerListingHelper));
