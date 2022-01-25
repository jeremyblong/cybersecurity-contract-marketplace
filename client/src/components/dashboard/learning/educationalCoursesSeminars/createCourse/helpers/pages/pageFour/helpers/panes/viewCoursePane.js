import React, { Fragment, useState, useRef } from "react";
import "./styles.css";
import { Button, Row, Col, Card, CardBody, CardHeader, ListGroupItem, ListGroup, Container } from 'reactstrap';
import { connect } from "react-redux";
import _ from "lodash";
import ReactPlayer from "react-player";
import Sheet from 'react-modal-sheet';


const ViewCourseDataPaneHelper = ({ isOpen, setIsOpenState, selectedItem }) => {

    const videoUrl = `${process.env.REACT_APP_ASSET_LINK}/${selectedItem.video.link}`;
    return (
        <Fragment>
            <Sheet isOpen={isOpen} onClose={() => setIsOpenState(false)}>
                <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <Container style={{ marginTop: "25px" }} fluid={true}>
                        <Row>
                            <Col sm="12" md="12" lg="12" xl="12">
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <Card className="height-equal card-upload-courses">
                                                    <div className="calender-widget">
                                                        <div>
                                                            <ReactPlayer controls={true} playIcon={true} playing={false} loop={false} volume={1} width={"100%"} height={"100%"} url={videoUrl} className={"override-widget-picture-course"} />
                                                        </div>
                                                        <div className="cal-date">
                                                            
                                                        </div>
                                                        <div className="cal-desc text-center card-body">
                                                            <h6 className="f-w-600">{"Course section/snippet title for this video & description"}</h6>
                                                            <p className="text-muted mt-3 mb-0">{"This is just ONE section of many that you've uploaded, feel free to make sure they all check out & are the video's you expected."}</p>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Col>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <Card className={"specifics-card card-upload-courses"}>
                                                    <CardHeader className="b-l-primary">
                                                        <h4>The following information is related to this <strong style={{ textDecorationLine: "underline", color: "#f73164" }}>specific section/chunk</strong> of your overall course</h4>
                                                        <p style={{ marginTop: "7.5px" }}>You can view the previously entered description, date and other details below as well as the actual video (to the left) to review & make sure all content is appropriate & suitable for all audiences (adults).</p>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <ListGroup>
                                                            <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                                <div className="d-flex w-100 justify-content-between">
                                                                    <h5 className="mb-1 custom-h5-listitem-course">{"Added On..."}</h5>
                                                                </div>
                                                                <p className="mb-1">{selectedItem.formattedDate}</p>
                                                            </ListGroupItem>
                                                            <ListGroupItem className="list-group-item-action flex-column align-items-start active">
                                                                <div className="d-flex w-100 justify-content-between">
                                                                    <h5 className="mb-1 custom-h5-listitem-course-active">{"Section Title"}</h5>
                                                                </div>
                                                                <p className="mb-1">{selectedItem.sectionTitle}</p>
                                                            </ListGroupItem>
                                                            <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                                                <div className="d-flex w-100 justify-content-between">
                                                                    <h5 className="mb-1 custom-h5-listitem-course">{"Below you'll find the attached course content text associated w/this video and/or section"}</h5>
                                                                </div>
                                                                <p className="mb-1">{selectedItem.description}</p>
                                                            </ListGroupItem>
                                                        </ListGroup>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Sheet.Content>
                </Sheet.Container>

                <Sheet.Backdrop />
            </Sheet>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data,
        courseData: _.has(state.courseData, "courseData") ? state.courseData.courseData : null
    }
}
export default connect(mapStateToProps, { })(ViewCourseDataPaneHelper);