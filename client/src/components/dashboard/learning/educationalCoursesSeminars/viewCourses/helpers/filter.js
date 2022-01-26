import React, { Fragment, useState } from 'react';
import { Collapse } from 'reactstrap';
import { Row, Col, Card, CardHeader, CardBody, Media, Input, Label, Button } from 'reactstrap'
import { WebDevelopment, UXDevelopment, CourseBy, BusinessAnalyst, UpcomingCourses } from "../../../../../../constant";
import { connect } from "react-redux";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const LearningEducationCourseFilterHelper = ({ userData, courseData }) => {
    const [isFilter, setIsFilter] = useState(true);
    const [isDesign, setIsDesign] = useState(true);
    const [isDevelopment, setIsDevelopment] = useState(true);

    const renderContentConditionally = () => {
        if (courseData !== null) {
            return (
                <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc">
                    <Row>
                        <Col xl="12">
                            <Card>
                                <CardHeader>
                                    <h5 className="mb-0">
                                        <Button color="link pl-0" data-toggle="collapse" onClick={() => setIsFilter(!isFilter)}
                                            data-target="#collapseicon" aria-expanded={isFilter} aria-controls="collapseicon">React To This Course</Button>
                                    </h5>
                                </CardHeader>
                                <Collapse isOpen={isFilter}>
                                    <div className="collapse show" id="collapseicon" aria-labelledby="collapseicon" data-parent="#accordion">
                                        <CardBody className="filter-cards-view animate-chk">
                                            <div className="checkbox-animated mt-0">
                                                <Label className={"heavy-label-course"}>Like this course</Label>
                                                    <Button className={"btn-square-success"} color={"success-2x"} outline style={{ width: "100%" }}>LIKE This Course</Button>
                                                <Label className={"heavy-label-course"}>Dislike this course</Label>
                                                    <Button className={"btn-square-danger"} color={"danger-2x"} outline style={{ width: "100%" }}>DISLIKE This Course</Button>
                                                <Label className={"heavy-label-course"}>Bookmark this course</Label>
                                                    <Button className={"btn-square-info"} color={"info-2x"} outline style={{ width: "100%" }}>Bookmark This Course</Button>
                                            </div>
                                        </CardBody>
                                    </div>
                                </Collapse>
                            </Card>
                        </Col>
                        <Col xl="12">
                            <Card>
                                <CardHeader>
                                    <h5 className="mb-0">
                                        <Button color="link pl-0" onClick={() => setIsDesign(!isDesign)}
                                            data-toggle="collapse" data-target="#collapseicon1" aria-expanded={isDesign} aria-controls="collapseicon1">Core Course Data</Button>
                                    </h5>
                                </CardHeader>
                                <Collapse isOpen={isDesign}>
                                    <div className="collapse show" id="collapseicon1" aria-labelledby="collapseicon1" data-parent="#accordion">
                                        <div className={"cushion-course"}>
                                            <hr />
                                            <h4 className={"color-secondary underline"}>Category</h4>
                                            <div className="learning-header"><span className="f-w-600">{courseData.mainData.pageOneData.mainData.courseCategory.label}</span></div>
                                            <hr />
                                            <h4 className={"color-secondary underline"}>Pricing/Purchase Amount</h4>
                                            <div className="learning-header"><span className="f-w-600">{courseData.mainData.pageOneData.mainData.pricing.label}</span></div>
                                            <hr />
                                            <h4 className={"color-secondary underline"}>Advised Skill-Level</h4>
                                            <div className="learning-header"><span className="f-w-600">{courseData.mainData.pageThreeData.skillLevel.label}</span></div>
                                            <hr />
                                            <h4 className={"color-secondary underline"}>Primary Language Used</h4>
                                            <div className="learning-header"><span className="f-w-600">{courseData.mainData.pageThreeData.primaryLanguageUsed.label}</span></div>
                                            <hr />
                                        </div>
                                    </div>
                                </Collapse>
                            </Card>
                        </Col>
                        <Col xl="12">
                            <Card>
                                <CardHeader>
                                    <h5 className="mb-0">
                                        <Button color="link pl-0" onClick={() => setIsDevelopment(!isDevelopment)} data-toggle="collapse" data-target="#collapseicon2" aria-expanded="true" aria-controls="collapseicon2">{UpcomingCourses}</Button>
                                    </h5>
                                </CardHeader>
                                <Collapse isOpen={isDevelopment}>
                                    <div className="collapse show" id="collapseicon2" aria-labelledby="collapseicon2" data-parent="#accordion">
                                        <CardBody className="upcoming-course">
                                            <Media>
                                                <Media body><span className="f-w-600">{UXDevelopment}</span><span className="d-block">{CourseBy} <a href="#javascript"> {"Lorem ipsum"}</a></span><span className="d-block"><i className="fa fa-star font-warning"></i><i className="fa fa-star font-warning"></i><i className="fa fa-star font-warning"></i><i className="fa fa-star font-warning"></i><i className="fa fa-star-half-o font-warning"></i></span></Media>
                                                <div>
                                                    <h5 className="mb-0 font-primary">{"18"}</h5><span className="d-block">{"Dec"}</span>
                                                </div>
                                            </Media>
                                            <Media>
                                                <Media body><span className="f-w-600">{BusinessAnalyst}</span><span className="d-block">{CourseBy} <a href="#javascript">{"Lorem ipsum"} </a></span><span className="d-block"><i className="fa fa-star font-warning"></i><i className="fa fa-star font-warning"></i><i className="fa fa-star font-warning"></i><i className="fa fa-star font-warning"></i><i className="fa fa-star font-warning"></i></span></Media>
                                                <div>
                                                    <h5 className="mb-0 font-primary">{"28"}</h5><span className="d-block">{"Dec"}</span>
                                                </div>
                                            </Media>
                                            <Media>
                                                <Media body><span className="f-w-600">{WebDevelopment}</span><span className="d-block">{CourseBy} <a href="#javascript">{"Lorem ipsum"} </a></span><span className="d-block"><i className="fa fa-star font-warning"></i><i className="fa fa-star font-warning"></i><i className="fa fa-star font-warning"></i><i className="fa fa-star font-warning"></i><i className="fa fa-star-o font-warning"></i></span></Media>
                                                <div>
                                                    <h5 className="mb-0 font-primary">{"5"}</h5><span className="d-block">{"Jan"}</span>
                                                </div>
                                            </Media>
                                        </CardBody>
                                    </div>
                                </Collapse>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        } else {
            return (
                <Fragment>
                    <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                        <p>
                            <Skeleton count={70} />
                        </p>
                    </SkeletonTheme>
                </Fragment>
            );
        }
    }
    return (
        <Fragment>
            <Col xl="3 xl-40">
                {renderContentConditionally()}
            </Col>
        </Fragment>
    );
};
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {  })(LearningEducationCourseFilterHelper);