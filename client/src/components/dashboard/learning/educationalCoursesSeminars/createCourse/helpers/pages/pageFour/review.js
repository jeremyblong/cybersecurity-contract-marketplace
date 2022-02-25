import React, { Fragment, useState, useRef } from "react";
import "./styles.css";
import { Button, Row, Col, Card, CardBody, CardHeader, ListGroup, ListGroupItem, Progress, Container, Badge } from 'reactstrap';
import { connect } from "react-redux";
import _ from "lodash";
import ReactPlayer from "react-player";
import ViewCourseDataPaneHelper from "./helpers/panes/viewCoursePane.js";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { updateCourseInformationData } from "../../../../../../../../redux/actions/courses/createNewCourse/index.js";
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert';
import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";

const CreateNewCourseOverviewReview = ({ overallProgress, setOverallProgress, setProgress, courseData, userData, updateCourseInformationData }) => {

    const history = useHistory();

    const [ isOpen, setIsOpenState ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState(null);

    const { pageOneData, pageTwoData, pageThreeData } = courseData;

    const handlePostingAndFinalDataSubmission = () => {
        const configuration = {
            courseData,
            id: userData.uniqueId
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/upload/new/course/for/sale/hacker`, configuration).then((res) => {
            if (res.data.message === "Successfully posted new course for sale!") {
                console.log(res.data);

                setTimeout(() => {
                    history.push("/course/learning/list/main");

                    updateCourseInformationData({
                        currentPage: 1,
                        makingEdits: false
                    });
                }, 4500);

                NotificationManager.success("You've successfully submited your course for 'review' and you will be notified upon approval or denial of your application! Good luck & stay tuned!", "Successfully submited course for review!", 4500);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleSectionClick = (section) => {
        console.log("handleSectionClick section is...:", section);

        updateCourseInformationData({
            ...courseData,
            currentPage: section,
            makingEdits: true
        })
    }
    const mainPic = `${process.env.REACT_APP_ASSET_LINK}/${pageThreeData.homepageImage.link}`;
    const promotionalDemoVideo = `${process.env.REACT_APP_ASSET_LINK}/${pageThreeData.promotionalDemoFile.link}`;
    return (
        <Fragment>
            <div className={"centered-horizontally-course"}>
                <div className={"position-above-bar-percentage"}>
                    <h1>{overallProgress}% Complete</h1>
                </div>
                <Progress className={"course-creation-progress-bar"} animated color="info" value={overallProgress} />
            </div>
            {selectedItem !== null ? <ViewCourseDataPaneHelper selectedItem={selectedItem} isOpen={isOpen} setIsOpenState={setIsOpenState} /> : null}
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className={"card-upload-courses"}>
                            <CardBody>
                                <Card className={"specifics-card"}>
                                    <CardHeader className="b-l-primary cutoff-right-slightly">
                                        <h4>Course information <strong>review</strong> & <strong>submission</strong> - <strong style={{ textDecorationLine: "underline", color: "#f73164" }}>PAGE ONE (1) DATA</strong></h4>
                                        <p style={{ marginTop: "7.5px" }}>You will now need to review all of your information to make sure all data is correct before proceeding to <strong style={{ textDecorationLine: "underline", color: "#f73164" }}>post your course for sale</strong>. If you need to change any data, simply click the <strong style={{ textDecorationLine: "underline", color: "#f73164" }}>"edit" icon</strong> and you will be redirected back to the appropriate page while saving all of your data so you can edit <strong style={{ textDecorationLine: "underline", color: "#f73164" }}>just that single data point</strong>...</p>
                                        <div className={"right-side-box-course"}>
                                            <img onClick={() => handleSectionClick(1)} src={require("../../../../../../../../assets/icons/filter.png")} className={"edit-existing-icon"} />
                                        </div>
                                    </CardHeader>
                                    <hr />
                                    <CardBody>
                                        <Row>
                                            <Col sm="12" md="4" lg="4" xl="4">
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start active">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course-active">Course Title</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageOneData.mainData.courseTitle}</p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                            <Col sm="12" md="4" lg="4" xl="4">
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course">Course Category</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageOneData.mainData.courseCategory.label}</p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                            <Col sm="12" md="4" lg="4" xl="4">
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start active">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course-active">Pricing (Per/Access)</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageOneData.mainData.pricing.label}</p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{ paddingTop: "15px" }}>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course">Course Description</h5>
                                                        </div>
                                                        <ReactMarkdown className="mb-1 maxed-height-markdown-course" children={pageOneData.mainData.description} remarkPlugins={[remarkGfm]} />
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{ paddingTop: "15px" }}>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start active">
                                                        <div style={{ paddingBottom: "5px" }} className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course-active">Course Relevant Hashtags/Tags</h5>
                                                        </div>
                                                        {pageOneData.mainData.courseHashtags.map((tag, index) => {
                                                            return <Badge key={index} className={"course-hashtags-tag"} color="light">{tag.text}</Badge>;
                                                        })}
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course">Requirement/Pre-req #1 (One)</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageOneData.requirementOrPreReqs.requirement0}</p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                        {pageOneData.requirementOrPreReqs.requirement1 !== null ? <Row>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course">Requirement/Pre-req #2 (Two)</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageOneData.requirementOrPreReqs.requirement1}</p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                        </Row> : null}
                                        {pageOneData.requirementOrPreReqs.requirement2 !== null ? <Row>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course">Requirement/Pre-req #3 (Three)</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageOneData.requirementOrPreReqs.requirement2}</p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                        </Row> : null}
                                        <hr />
                                        <Row>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course">What Student's Will Learn (Objective's) #1</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageOneData.whatStudentsWillLearn.objective0}</p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course">What Student's Will Learn (Objective's) #2</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageOneData.whatStudentsWillLearn.objective1}</p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course">What Student's Will Learn (Objective's) #3</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageOneData.whatStudentsWillLearn.objective2}</p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course">What Student's Will Learn (Objective's) #4</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageOneData.whatStudentsWillLearn.objective3}</p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                        {pageOneData.whatStudentsWillLearn.objective4 !== null ? <Row style={{ paddingTop: "15px" }}>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course">What Student's Will Learn (Objective's) #5</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageOneData.whatStudentsWillLearn.objective4}</p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                        </Row> : null}
                                        {pageOneData.whatStudentsWillLearn.objective5 !== null ? <Row style={{ paddingTop: "15px" }}>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course">What Student's Will Learn (Objective's) #6</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageOneData.whatStudentsWillLearn.objective5}</p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                        </Row> : null}
                                        <hr />
                                        <Row>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course">"Who is this course for" #1 (One)</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageOneData.whoIsThisCourseFor.concept0}</p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                        {pageOneData.whoIsThisCourseFor.concept1 !== null ? <Row>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course">"Who is this course for" #2 (Two)</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageOneData.whoIsThisCourseFor.concept1}</p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                        </Row> : null}
                                        {pageOneData.whoIsThisCourseFor.concept2 !== null ? <Row>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course">"Who is this course for" #3 (Three)</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageOneData.whoIsThisCourseFor.concept2}</p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                        </Row> : null}
                                    </CardBody>
                                </Card>
                            </CardBody>
                        </Card>
                        <Card className={"card-upload-courses"}>
                            <CardBody>
                                <Card className={"specifics-card"}>
                                    <CardHeader className="b-l-primary cutoff-right-slightly">
                                        <h4>Course information <strong>review</strong> & <strong>submission</strong> - <strong style={{ textDecorationLine: "underline", color: "#f73164" }}>PAGE TWO (2) DATA</strong></h4>
                                        <div className={"right-side-box-course"}>
                                            <img onClick={() => handleSectionClick(2)} src={require("../../../../../../../../assets/icons/filter.png")} className={"edit-existing-icon"} />
                                        </div>
                                    </CardHeader>
                                    <hr />
                                    <CardBody>
                                        <Row>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <ul>
                                                    {pageTwoData.courseContentSections.map((item, index) => {
                                                        return (
                                                            <Fragment key={index}>
                                                                <ListGroupItem className={`d-flex justify-content-between align-items-center ${index % 2 === 1 ? "active" : ""}`}>
                                                                    <div id="left-chunk-course">
                                                                        <img onClick={() => {
                                                                            setSelectedItem(item);
                                                                            setIsOpenState(true)
                                                                        }} src={require("../../../../../../../../assets/icons/view-more.png")} className={"view-more-icon"} />
                                                                    </div>
                                                                    <p className={"custom-strong-list-item"}>{item.sectionTitle}</p>
                                                                </ListGroupItem>
                                                            </Fragment>
                                                        );
                                                    })}
                                                </ul>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </CardBody>
                        </Card>
                        <Card className={"card-upload-courses"}>
                            <CardBody>
                                <Card className={"specifics-card"}>
                                    <CardHeader className="b-l-primary cutoff-right-slightly">
                                        <h4>Course information <strong>review</strong> & <strong>submission</strong> - <strong style={{ textDecorationLine: "underline", color: "#f73164" }}>PAGE THREE (3) DATA</strong></h4>
                                        <div className={"right-side-box-course"}>
                                            <img onClick={() => handleSectionClick(3)} src={require("../../../../../../../../assets/icons/filter.png")} className={"edit-existing-icon"} />
                                        </div>
                                    </CardHeader>
                                    <hr />
                                    <CardBody>
                                        <Row>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <Card className="height-equal">
                                                    <div className="calender-widget">
                                                        <div className="cal-img">
                                                            <img src={mainPic} className={"override-widget-picture-course"} />
                                                        </div>
                                                        <div className="cal-date custom-cal-date-course">
                                                            <h5><strong id="strong-banner">BANNER</strong><br />{"PIC/PHOTO"}</h5>
                                                        </div>
                                                        <div className="cal-desc text-center card-body">
                                                            <h6 className="f-w-600">{"You will find your 'Main' banner/core picture above..."}</h6>
                                                            <p className="text-muted mt-3 mb-0">{"This picture will be shown initially when people first see your listing/course for sale - This will display on 'mapped' listview's and other similar areas thoughout our site!"}</p>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Col>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <Card className="height-equal">
                                                    <div className="calender-widget">
                                                        <div className="cal-img">
                                                            <ReactPlayer controls={true} playIcon={true} playing={false} loop={false} volume={1} width={"100%"} height={"100%"} url={promotionalDemoVideo} className={"override-widget-picture-course"} />
                                                        </div>
                                                        <div className="cal-date">
                                                           
                                                        </div>
                                                        <div className="cal-desc text-center card-body">
                                                            <h6 className="f-w-600">{"Above is your 'Demo/Promo Video'..."}</h6>
                                                            <p className="text-muted mt-3 mb-0">{"This video will be used to give people a general idea of whta they're getting themselves into when purchasing your course & more of an idea of what the content consists of."}</p>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course">{"Your 'Completion Message' to finished student's"}</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageThreeData.completionMessage}</p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course">{"Your 'Welcome Message' to student's that've JUST enrolled"}</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageThreeData.welcomeMessage}</p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{ paddingTop: "12.5px" }}>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course">{"Language Spoken In Course"}</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageThreeData.languageSpoken.label}</p>
                                                    </ListGroupItem>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start active">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course-active">{"Course Completion Length (in hour's)"}</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageThreeData.lengthInHours.label}</p>
                                                    </ListGroupItem>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course">{"Primary CODING language used in course"}</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageThreeData.primaryLanguageUsed.label}</p>
                                                    </ListGroupItem>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start active">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course-active">{"Skill Level Required/Expected To Complete Course"}</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageThreeData.skillLevel.label}</p>
                                                    </ListGroupItem>
                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1 custom-h5-listitem-course">{"Subtitle (Display's directly under main title...)"}</h5>
                                                        </div>
                                                        <p className="mb-1 customized-course-text">{pageThreeData.subtitle}</p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </CardBody>
                        </Card>

                        <Card className={"card-upload-courses"}>
                            <CardBody>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <Button onClick={() => {
                                            confirmAlert({
                                                title: `Are you sure you're ready to 'Submit' your course?`,
                                                message: `Are you sure you're ready to submit your course for review and make it live to the public? If you select 'YES, Post it!', your listing/course will automatically be submitted for review & once approved will go live - You'll receive a notification once approved or denied.`,
                                                buttons: [
                                                    {
                                                        label: 'YES, Post it!',
                                                        onClick: () => handlePostingAndFinalDataSubmission()
                                                    },
                                                    {
                                                        label: "No, Don't post it...",
                                                        onClick: () => {
                                                            
                                                        }
                                                    }
                                                ]
                                            });
                                        }} className={"btn-square-info"} color={"info-2x"} outline style={{ width: "100%" }}>Submit & Post Course For Sale!</Button>
                                    </Col>
                                </Row>
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
        courseData: _.has(state.courseData, "courseData") ? state.courseData.courseData : null
    }
}
export default connect(mapStateToProps, { updateCourseInformationData })(CreateNewCourseOverviewReview);