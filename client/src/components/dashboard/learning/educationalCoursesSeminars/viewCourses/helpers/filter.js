import React, { Fragment, useState } from 'react';
import { Collapse } from 'reactstrap';
import { Row, Col, Card, CardHeader, CardBody, Media, Input, Label, Button } from 'reactstrap'
import { WebDevelopment, UXDevelopment, CourseBy, BusinessAnalyst, UpcomingCourses } from "../../../../../../constant";
import { connect } from "react-redux";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


const LearningEducationCourseFilterHelper = ({ openViewsModal, handleCouseDislike, handleAdditionalCourseLike, userData, courseData, updateModalDemoVideo }) => {
    const [isFilter, setIsFilter] = useState(true);
    const [isDesign, setIsDesign] = useState(true);

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
                                                    <Button onClick={handleAdditionalCourseLike} className={"btn-square-success"} color={"success-2x"} outline style={{ width: "100%" }}>LIKE This Course</Button>
                                                <Label className={"heavy-label-course"}>Dislike this course</Label>
                                                    <Button onClick={handleCouseDislike} className={"btn-square-danger"} color={"danger-2x"} outline style={{ width: "100%" }}>DISLIKE This Course</Button>
                                                <Label className={"heavy-label-course"}>Bookmark this course</Label>
                                                    <Button className={"btn-square-info"} color={"info-2x"} outline style={{ width: "100%" }}>Bookmark This Course</Button>
                                                <Label className={"heavy-label-course"}>View Promotional/Demo Video</Label>
                                                    <Button onClick={() => updateModalDemoVideo(true)} className={"btn-square-dark"} color={"dark"} style={{ width: "100%" }}>VIEW Promo/Demo Video</Button>
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
                                            <h4 className={"color-secondary underline"}>Primary Spoken In This Course</h4>
                                                <div className="learning-header"><span className="f-w-600">{courseData.mainData.pageThreeData.languageSpoken.label}</span></div>
                                            <hr />
                                            <h4 className={"color-secondary underline"}>Overall Course Length (Approx.)</h4>
                                                <div className="learning-header"><span className="f-w-600">{courseData.mainData.pageThreeData.lengthInHours.label}</span></div>
                                            <hr />
                                            <h4 className={"color-secondary underline"}>Course Views (Total Unique View's)</h4>
                                                <div onClick={() => openViewsModal(true)} className="learning-header heavy-total-views-clickable"><span className="f-w-600">{courseData.totalViews} Unique View(s)</span></div>
                                            <hr />
                                        </div>
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