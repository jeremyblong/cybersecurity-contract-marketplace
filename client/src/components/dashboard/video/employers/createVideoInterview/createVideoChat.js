import React, { Fragment, useState, useEffect } from 'react';
import "./styles.css";
import { Container, Row, Col, Card, CardBody, CardHeader, CardFooter, Button } from "reactstrap";
import Breadcrumb from '../../../../../layout/breadcrumb';
import { connect as reduxConnect } from "react-redux";

const CreateVideoChatEmployerHelper = ({ userData }) => {

    
    return (
        <Fragment>
            <Breadcrumb parent="Invite Hacker(s) To Video Interview With You!" title="Find, Select & Invite Anyone On Our Platform.." /> 
            <Container fluid={true}>
                <Row>
                    <Col sm="12" lg="12" xl="12" md="12">
                        <Card>
                            <CardHeader className="b-l-secondary b-r-secondary">
                                <h2 className="upload-video-header">Initialize a video chat with ANY hacker on our platform (whether you've previously communicated or not!)</h2>
                                <p className="lead">We <strong style={{ color: "#f73164" }}>HIGHLY SUGGEST</strong> video interviewing <strong style={{ color: "#f73164" }}>any</strong> potential candiates for a contracted gig and/or hacking job, <strong style={{ color: "#f73164" }}>ESPECIALLY</strong> if testing <strong>physical infrastructure</strong> and other related on-site security.</p>
                            </CardHeader>
                            <CardBody className='b-l-success b-r-success'>
                                <Row>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <video width="100%" height="100%" controls>
                                            <source src={null} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </Col>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <video width="100%" height="100%" controls>
                                            <source src={null} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter className='b-l-secondary b-r-secondary'>
                                <Button className={"btn-square-success"} outline color={"success-2x"} style={{ width: "100%" }} onClick={null}>Initialize Room</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default reduxConnect(mapStateToProps, {})(CreateVideoChatEmployerHelper);