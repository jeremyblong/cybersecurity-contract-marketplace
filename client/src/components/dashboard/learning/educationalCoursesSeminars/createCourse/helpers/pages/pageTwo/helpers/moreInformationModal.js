import React, { Fragment } from "react";
import { Container, Button, Row, Col, Card, CardHeader, CardBody, ListGroup, ListGroupItem, Input } from 'reactstrap';
import { Grid, Trash, Database } from 'react-feather';
import StarRatings from 'react-star-ratings';

const ModalMoreInformationGuiadanceHelper = ({ setIsOpenModalState }) => {
    return (
        <Fragment>
            <Container fluid={true}>
                <Row>
                    <Col xl="3" className="box-col-6 pr-0 file-spacing">
                        <div style={{ marginTop: "125px" }} className="file-sidebar">
                            <Card>
                                <CardBody>
                                <h5>This is a detailed guide on "how-to-create" a course and post it for sale! Follow the instructions to the best of your ability & think through your course content & structure as every little detail counts and matters to viewer's as well as ratings to sell more copies.</h5>
                                <hr />
                                <ul>
                                    <li>
                                        <div className="btn btn-outline-primary"><Grid />Course Order/Positioning</div>
                                    </li>
                                    <li>
                                        <div className="pricing-plan">
                                            <p className={"top-title-course-help"}>The picture to the right in this modal depicts what your saved folder structure will look like once LIVE & UPLOADED. The top is the <strong>beginning of the course</strong>  and the <strong>end is the end of the course.</strong> Each section typically represents ONE "section/chunk" of your overall course. You can rearrange items by dragging them "up" OR "down" to reorder & reposition them.</p>
                                            <img className="bg-img" src={require("../../../../../../../../../assets/images/dashboard/folder.png")} alt="" />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="btn btn-outline-primary"><Database />Core TAKEAWAY's</div>
                                        <div className="m-t-15">
                                            <p className={"top-title-course-help"}>{"You should include HIGH QUALITY thought provoking engaging work-along content. Each course will review ratings/reviews & viewers/potential-buyers will be using this to decide on whether or not to purchase your course. Upload TOP-TIER content to acheive high rankings along with INTERACTIVE tests/quizes/classes throughout"}</p>
                                        </div>
                                    </li>
                                </ul>
                                </CardBody>
                            </Card>
                        </div>
                        </Col>
                        <Col xl="9" md="12" className="box-col-12">

                            <div className="file-content">
                            <Card>
                                <CardHeader>
                                <div className="media">
                                    <div className="media-body text-right">
                                        <Button style={{ width: "100%" }} color={"info-2x"} className="btn btn-info ml-1" onClick={() => setIsOpenModalState(false)}><Trash />{"Cancel/Close This Modal"}</Button>
                                    </div>
                                </div>
                                </CardHeader>
                                <CardBody className="file-manager">
                                    <Row>
                                        <Col sm="12" md="6" lg="6" xl="6">
                                            <img src={require("../../../../../../../../../assets/images/content_example.png")} className={"example-image-courses"} />
                                        </Col>
                                        <Col sm="12" md="6" lg="6" xl="6">
                                            <p className={"top-title-course-help"}>To the right, you can see the following "ideal" format for how your files/sections should be aligned... You MUST use this format, otherwise your proposed course will be rejected by admins/support. We ONLY sell TOP-TIER quality content & you will need to go through the <strong>internal review process</strong> before being <strong>approved OR denied</strong> due to structuring, file content or data being rented/sold, or overall review of this course content.</p>
                                            <hr />
                                            <h6 className="top-title-course-help-h6">Here are some tips/pointer's at acheiving the best organized course while providing <strong>HIGH QUALITY CONTENT.</strong></h6>
                                            <hr />
                                            <p className={"top-title-course-help"}>The following have approx five(5) stars rated in <strong>importance</strong> regarding which points you should place emphisis on. 5 being <strong>TOP priority</strong> while 1 star being <strong>LOW priority.</strong></p>
                                            <hr />
                                            <ListGroup>
                                                <ListGroupItem className="d-flex justify-content-between align-items-center">{"INTERACTIVE CONTENT"}
                                                    <StarRatings
                                                        rating={5}
                                                        starRatedColor="gold"
                                                        numberOfStars={5}
                                                        name='rating'
                                                    />
                                                </ListGroupItem>
                                                <ListGroupItem className="d-flex justify-content-between align-items-center">{"EXPLAIN CONCEPTS IN MULTIPLE WAYS"}<StarRatings
                                                        rating={5}
                                                        starRatedColor="gold"
                                                        numberOfStars={5}
                                                        name='rating'
                                                    />
                                                </ListGroupItem>
                                                <ListGroupItem className="d-flex justify-content-between align-items-center">{"COURSE ORGANIZATION"}<StarRatings
                                                        rating={4.40}
                                                        starRatedColor="gold"
                                                        numberOfStars={5}
                                                        name='rating'
                                                    />
                                                </ListGroupItem>
                                                <ListGroupItem className="d-flex justify-content-between align-items-center">{"SPEAK CLEARLY & FLUENTLY"}<StarRatings
                                                        rating={4.5}
                                                        starRatedColor="gold"
                                                        numberOfStars={5}
                                                        name='rating'
                                                    />
                                                </ListGroupItem>
                                                <ListGroupItem className="d-flex justify-content-between align-items-center">{"INCLUDE LOTS OF CONTENT"}<StarRatings
                                                        rating={2.75}
                                                        starRatedColor="gold"
                                                        numberOfStars={5}
                                                        name='rating'
                                                    />
                                                </ListGroupItem>
                                                <ListGroupItem className="d-flex justify-content-between align-items-center">{"USE DIAGRAMS"}<StarRatings
                                                        rating={4.65}
                                                        starRatedColor="gold"
                                                        numberOfStars={5}
                                                        name='rating'
                                                    />
                                                </ListGroupItem>
                                                <ListGroupItem className="d-flex justify-content-between align-items-center">{"UPLOAD FILE(S) COORESPONDING W/YOUR COURSE"}<StarRatings
                                                        rating={5}
                                                        starRatedColor="gold"
                                                        numberOfStars={5}
                                                        name='rating'
                                                    />
                                                </ListGroupItem>
                                            </ListGroup>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
        </Fragment>
    );
}
export default ModalMoreInformationGuiadanceHelper;