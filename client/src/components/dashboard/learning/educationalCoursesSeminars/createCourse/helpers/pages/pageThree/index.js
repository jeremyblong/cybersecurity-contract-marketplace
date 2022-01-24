import React, { Fragment } from "react";
import "./styles.css";
import { connect } from "react-redux";
import helpers from "./helpers/helperFunctions/helpers.js";
import { Button, Row, Col, Card, CardBody, CardHeader, FormGroup, Label, Input, Media, InputGroup, InputGroupAddon, InputGroupText, Progress, ListGroupItem, Container } from 'reactstrap';
import { updateCourseInformationData } from "../../../../../../../../redux/actions/courses/createNewCourse/index.js";
import _ from "lodash";
import uuid from "react-uuid";
import moment from "moment";


const CreateNewCoursePageThree = ({ userData, courseData, overallProgress, setOverallProgress, setProgress }) => {

    const handleSubmission = () => {
        console.log("handleSubmission ran...");
    }
    return (
        <Fragment>
            <div className={"centered-horizontally-course"}>
                <div className={"position-above-bar-percentage"}>
                    <h1>{overallProgress}% Complete</h1>
                </div>
                <Progress className={"course-creation-progress-bar"} animated color="info" value={overallProgress} />
            </div>
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col sm="12" md="12" lg="12" xl="12">
                                            <h4 className={"course-custom-title"}>More fine-grain specific details about your listing. Please fill out each of the following fields to the best of your ability & be as specific/detailed as possible. We will collect things such as difficulty level, language, etc...</h4>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: "17.5px" }}>
                                        <Card className={"specifics-card"}>
                                            <CardHeader className="b-l-primary card-header-customized-specifics">
                                                <h4>More required detailed information related to core listing</h4>
                                            </CardHeader>
                                            <CardBody>
                                                
                                            </CardBody>
                                        </Card>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card>
                            <CardBody>
                                
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card>
                            <CardBody>
                                <Button onClick={handleSubmission} className={"btn-square-secondary"} color={"secondary-2x"} outline style={{ width: "100%" }}>Submit & Continue W/Form Process</Button>
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
        userData: state.auth.data,
        courseData: _.has(state.courseData, "courseData") ? state.courseData.courseData : []    
    }
}
export default connect(mapStateToProps, { updateCourseInformationData })(CreateNewCoursePageThree);