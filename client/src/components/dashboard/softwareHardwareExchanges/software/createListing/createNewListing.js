import React, { useRef, useState, useEffect } from 'react';
import PageOneMainHelper from "./multiStepPages/pageOne/pageOneMain.js";
import { Container, Col, Row, CardHeader, CardBody, Card, Progress } from "reactstrap";
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

const CreateNewSoftwareListingHelper = ({ currentPage }) => {
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
                    setProgress(false);
                }}
            />
            {showConfetti === true ? <Confetti
                width={width}
                height={height}
                className={"confetti-custom-styles"}
                wind={0.0125}
                gravity={0.075}
                numberOfPieces={750}
                run={runConfettiState}
                onConfettiComplete={handleConfettiCompletion}
                recycle={true}
            /> : null}
            <Breadcrumb parent="Software (digital assets) Marketplace" title="Create a listing to sell software/code"/>
            <Container style={{ marginBottom: "125px" }} className="full-height-container" fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className="full-height-container">
                            <CardHeader>
                                <h5>Create a <strong style={{ color: "blue" }}>software</strong> listing - post a code snippet, malware, viruses, etc...</h5>
                                <p>We are <em style={{ color: "red", textDecorationLine: "underline" }}>NOT</em> in any shape or form responsible if you use these codes/programs in a malicious manner AND any suspicious activity or reports <strong style={{ textDecorationLine: "underline", color: "red" }}>WILL</strong> be throughly investigated & reported to the appropriate authorities.</p>
                                <hr />
                                <p className="spacer-paragraph">In order to post a listing to sell or trade digital software related content, you will need to complete the following <strong>multi-page</strong> form to completion & your listing/item will be immediately posted shortly thereafter!</p>
                                <div className="push-bottom-progress-bar">
                                    <div className="position-middle-bar-div">
                                        <h4 id="progress-text-centered">{`${progress}% Completed (Create-listing flow ${progress === 80 ? "- last page - review" : ""})`}</h4>
                                    </div>
                                    <Progress className="reactstrap-progress-bar-custom" animated color="secondary" value={progress} />
                                </div>
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
export default connect(mapStateToProps, {  })(CreateNewSoftwareListingHelper);