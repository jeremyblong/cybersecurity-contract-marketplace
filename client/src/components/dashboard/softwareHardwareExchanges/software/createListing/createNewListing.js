import React, { useRef, useState, useEffect, Fragment } from 'react';
import PageOneMainHelper from "./multiStepPages/pageOne/pageOneMain.js";
import { Container, Col, Row, CardHeader, CardBody, Card, Progress, Button, ButtonGroup } from "reactstrap";
import Breadcrumb from '../../../../../layout/breadcrumb';
import LoadingBar from 'react-top-loading-bar';
import { connect } from "react-redux";
import _ from 'lodash';
import PageTwoMainHelper from "./multiStepPages/pageTwo/pageTwoMain.js";
import "./styles.css";
import PageThreeHelper from "./multiStepPages/pageThree/pageThreeMain.js";
import PageFourMainHelper from "./multiStepPages/pageFour/pageFourMain.js";
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { NotificationManager } from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert';
import { saveSoftwareListingInfo } from "../../../../../redux/actions/hackers/createSoftwareListing/createNewSoftwareListingSale.js";
import ConfirmationSuccessfullyPostedHelper from "./multiStepPages/pageFive/successConfirmationHelper.js";

const CreateNewSoftwareListingHelper = ({ currentPage, saveSoftwareListingInfo }) => {
    // state for this component ONLY - PROGRESS
    const [ progress, setProgress ] = useState(0);
    const [ runConfettiState, changeSetRunConfettiState ] = useState(true);
    const [ showConfetti, setShowConfettiStatus ] = useState(false);

    // refs for this component ONLY
    const isFirstRender = useRef(true);
    // run this REF only ONCE
    const renderOnlyOnce = useRef(false);

    const renderConditionalPageContent = () => {

        switch (currentPage) {
            case 1:
                return <PageOneMainHelper />;
                break;
            case 2: 
                return <PageTwoMainHelper />;
                break;
            case 3: 
                return <PageThreeHelper />;
                break;
            case 4: 
                return <PageFourMainHelper />
                break;
            case 5:
                return <ConfirmationSuccessfullyPostedHelper />;
                break;
            default:
                break;
        }
    }
    const calculateProgressPercentage = (page) => {
        switch (page) {
            case 1:
                return 20;
                break;
            case 2:
                return 40;
                break;
            case 3: 
                return 60;
                break;
            case 4: 
                return 80;
                break;
            case 5:
                return 100;
                break
            default:
                break;
        }
    }
    // confetti on END helper function
    const handleConfettiCompletion = (e) => {
        // log for change...
        console.log("handleConfettiCompletion ended...", e);
        // hide confetti after successful show/deploy
        setShowConfettiStatus(false);
    }
    useEffect(() => {
        console.log("logged!!!! useEffect ran...!");

        // run conditional to check for 'first render' then alter ref data
        if (isFirstRender.current) {
            console.log("isFirstRender conditional FIRST TIME.");
            // change data to false in preperation for next check upon next change
            isFirstRender.current = false;
            // change progress to represent appropriate current state
            setProgress(calculateProgressPercentage(currentPage));

            if (currentPage === 5) {
                // START DISPLAYING confetti component
                setShowConfettiStatus(true);
                // notify user of confetti and how long it'll stay displaying
                NotificationManager.info(`You've SUCCESSFULLY created & posted a new 'software for sale' listing - it is now live! We know that form was lengthy and time consuming and we appreciate your patience - here's some confetti for 20 SECONDS!`, 'Ready to REVIEW & POST!', 7000);

                setTimeout(() => {
                    changeSetRunConfettiState(false);
                    setShowConfettiStatus(false);
                },  20000);
            }
        } else {
            console.log("isFirstRender conditional SUBSEQUENT RUN.");
            // change progress to represent appropriate current state
            setProgress(calculateProgressPercentage(currentPage));

            if (currentPage === 5) {
                // START DISPLAYING confetti component
                setShowConfettiStatus(true);
                // notify user of confetti and how long it'll stay displaying
                NotificationManager.info(`You've SUCCESSFULLY created & posted a new 'software for sale' listing - it is now live! We know that form was lengthy and time consuming and we appreciate your patience - here's some confetti for 20 SECONDS!`, 'Ready to REVIEW & POST!', 7000);

                setTimeout(() => {
                    changeSetRunConfettiState(false);
                    setShowConfettiStatus(false);
                },  20000);
            }
        }
    }, [currentPage]);
    
    // create window height/width sizes for confetti component
    const { width, height } = useWindowSize();

    const closeModalAndRestartForm = (onClose) => {
        console.log("closeModalAndRestartForm ran.");

        onClose();

        saveSoftwareListingInfo({
            currentPage: 1
        })
    }
    const promptConfirmationWindowSelection = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Fragment>
                        <Card>
                            <CardHeader className="b-l-primary border-3 specific-edit-border-right">
                                <h3>Are you sure you'd like to CANCEL & RESTART this form?</h3>
                            </CardHeader>
                            <CardBody id="modal-button-showcase-cardbody" className="btn-group-showcase">
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <p className="button-group-text-above">Are you sure you'd like to restart this form? You will lose ALL previous entries & and logic previously entered. You will be returned to PAGE ONE (20%) so you can continue with your re-entries...</p>
                                    </Col>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <hr className="secondary-hr" />
                                        <div className="centered-button-container">
                                            <ButtonGroup id="button-group-custom-secondary">
                                                <Button outline color="danger" onClick={onClose}>Cancel/Close</Button>
                                                <Button outline color="success" onClick={() => {
                                                    closeModalAndRestartForm(onClose);
                                                }}>RESTART</Button>
                                            </ButtonGroup>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Fragment>
              );
            }
        });
    }
    const renderTopBar = () => {
        if (currentPage !== 5) {
            return (
                <Fragment>
                    <h5>Create a <strong style={{ color: "blue" }}>software</strong> listing - post a code snippet, malware, viruses, etc...</h5>
                    <p>We are <em style={{ color: "red", textDecorationLine: "underline" }}>NOT</em> in any shape or form responsible if you use these codes/programs in a malicious manner AND any suspicious activity or reports <strong style={{ textDecorationLine: "underline", color: "red" }}>WILL</strong> be throughly investigated & reported to the appropriate authorities.</p>
                    <hr />
                        {currentPage !== 1 ? <div className="centered-both-ways">
                            <Button className="btn-air-danger" color="danger" style={{ width: "65%" }} onClick={() => {
                                // cancel & restart
                                promptConfirmationWindowSelection();
                            }}>~ Cancel & Restart Form Entries ~</Button>
                        </div> : null}
                    <hr />
                    <p className="spacer-paragraph">In order to post a listing to sell or trade digital software related content, you will need to complete the following <strong>multi-page</strong> form to completion & your listing/item will be immediately posted shortly thereafter!</p>
                    <div className="push-bottom-progress-bar">
                        <div className="position-middle-bar-div">
                            <h4 id="progress-text-centered">{`${progress}% Completed (Create-listing flow ${progress === 80 ? "- last page - review" : ""})`}</h4>
                        </div>
                        <Progress className="reactstrap-progress-bar-custom" animated color="secondary" value={progress} />
                    </div>
                </Fragment>
            );
        }
    }
    // MAIN logic below... (returning majority of data)
    return (
        <div>
            <LoadingBar
                color='#f73164'
                height={8}
                className={"create-listing-software-loadbar"}
                progress={progress}
                containerClassName={"container-create-listing-software-loadbar"}
                loaderSpeed={3500}
                onLoaderFinished={() => {
                    setProgress(0);
                }}
            />
            {showConfetti === true ? <Confetti
                width={width}
                height={height}
                className={"confetti-custom-styles"}
                wind={0.0125}
                gravity={0.075}
                numberOfPieces={500}
                run={runConfettiState}
                onConfettiComplete={handleConfettiCompletion}
                recycle={true}
            /> : null}
            <Breadcrumb parent="Software (digital assets) Marketplace" title="Create a listing to sell software/code"/>
            <Container style={{ marginBottom: "225px" }} className="full-height-container" fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card id="over-extend-height-main-container" className="full-height-container">
                            <CardHeader>
                                {renderTopBar()}
                            </CardHeader>
                            <CardBody className="full-height-cardbody-extra">
                                {renderConditionalPageContent()}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
const mapStateToProps = (state) => {
    console.log("State in 'createNewListing.js'", state);

    return {
        currentPage: _.has(state.softwareListingSale, "softwareListingSaleInfo") && Object.keys(state.softwareListingSale.softwareListingSaleInfo).length > 0 ? state.softwareListingSale.softwareListingSaleInfo.currentPage : 1
    }
}
export default connect(mapStateToProps, { saveSoftwareListingInfo })(CreateNewSoftwareListingHelper);