import React, { Fragment, useState } from 'react';
import "./styles.css";
import Breadcrumb from '../../../../../layout/breadcrumb';
import { Container, Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import StepZilla from "react-stepzilla";
import PageOneVideoCreationHelper from "./formSteps/pageOne/formPageOne.js";
import PageTwoVideoCreationHelper from "./formSteps/pageTwo/pageTwoSection.js";
import LoadingBar from 'react-top-loading-bar';
import ReviewDetailsOnTutorialVideoUploadHelper from "./formSteps/pageThree/reviewDetails.js";

const CreateTutorialCourseContentHelper = (props) => {

    const [ allData, setAllData ] = useState(null);
    const [ progress, setProgress ] = useState(0);

    const saveNewDetails = (data) => {
        setAllData(prevState => {
            return {
                ...prevState,
                ...data
            }
        })
    }

    const steps = [
        { name: 'Core Details', component: <PageOneVideoCreationHelper progress={progress} allData={allData} setProgress={setProgress} props={props} saveNewDetails={saveNewDetails} /> },
        { name: "Content/Video-Data", component: <PageTwoVideoCreationHelper progress={progress} allData={allData} setProgress={setProgress} props={props} saveNewDetails={saveNewDetails} /> },
        { name: "Review Details & Post", component: <ReviewDetailsOnTutorialVideoUploadHelper progress={progress} allData={allData} setProgress={setProgress} props={props} saveNewDetails={saveNewDetails} /> }
    ];

    console.log("allData", allData);

    return (
        <Fragment>
            <LoadingBar
                color='#51bb25'
                height={4.25}
                progress={progress}
                onLoaderFinished={() => {
                    setProgress(0);
                }}
            />
            <Breadcrumb parent="Tutorial Content/Courses - Informational Video(s)" title="Create A FREE Tutorial Video/Content" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className='shadow'>
                            <CardHeader className={"b-l-primary b-r-primary"}>
                                <h3>Create a tutorial video/content - Select and upload your data via the form logic below (These are ONLY FREE video's up-to 30 minutes per video)</h3>
                            </CardHeader>
                            <CardBody>
                                <StepZilla 
                                    steps={steps} 
                                    showSteps={true} 
                                    showNavigation={false} 
                                    stepsNavigation={false}
                                    dontValidate={true} 
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default CreateTutorialCourseContentHelper;