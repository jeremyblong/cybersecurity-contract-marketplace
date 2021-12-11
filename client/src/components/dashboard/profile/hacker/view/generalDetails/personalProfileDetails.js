import React, { Fragment, Component } from 'react';
import Breadcrumb from '../../../../../../layout/breadcrumb';
import { Container, Row, Col, Card, CardHeader, Media, CardBody, Button } from 'reactstrap';
import {Email,MarekjecnoMailId,BOD,DDMMYY,Designer,ContactUs,ContactUsNumber,LocationDetails,MarkJecno,Follower,Following,Location} from '../../../../../../constant';
import { withRouter } from "react-router-dom";

class PersonalProfileDetailsMainHelper extends Component {
constructor(props) {
    super(props);


    this.state = {

    }
}
    handleVerificationRedirect = (e) => {
        e.preventDefault();

        console.log("handle redirect verification link");

        this.props.history.push("/start/verification/flow");
    }
    render() {
        return (
            <Fragment>
                <Breadcrumb parent="Users" title="User Profile" />
                <Container fluid={true}>
                    <div className="user-profile">
                    <Row>
                        <Col sm="12">
                        <Card className="card hovercard text-center">
                            <CardHeader className="cardheader">
                                {/* put icon here - pencil maybe? */}
                            </CardHeader>
                            <div className="user-image">
                            <div className="avatar"><Media body alt="" src={require('../../../../../../assets/images/user/7.jpg')} data-intro="This is Profile image" /></div>
                                <div className="icon-wrapper" data-intro="Change Profile image here">
                                    <i className="icofont icofont-pencil-alt-5">
                                    <input className="upload" type="file" />
                                    </i>
                                </div>
                            </div>
                            <div className="info">
                            <Row>
                                <Col sm="6" lg="4" className="order-sm-1 order-xl-0">
                                <Row >
                                    <Col md="6">
                                    <div className="ttl-info text-left">
                                        <h6><i className="fa fa-envelope mr-2"></i> {Email}</h6><span>{MarekjecnoMailId}</span>
                                    </div>
                                    </Col>
                                    <Col md="6">
                                    <div className="ttl-info text-left ttl-sm-mb-0">
                                        <h6><i className="fa fa-calendar"></i>   {BOD}</h6><span>{DDMMYY}</span>
                                    </div>
                                    </Col>
                                </Row>
                                </Col>
                                <Col sm="12" lg="4" className="order-sm-0 order-xl-1">
                                <div className="user-designation">
                                    <div className="title"><a target="_blank" href="#javascript">{MarkJecno}</a></div>
                                    <div className="desc mt-2">{Designer}</div>
                                </div>
                                </Col>
                                <Col sm="6" lg="4" className="order-sm-2 order-xl-2">
                                <Row>
                                    <Col md="6">
                                    <div className="ttl-info text-left ttl-xs-mt">
                                        <h6><i className="fa fa-phone"></i>   {ContactUs}</h6><span>{ContactUsNumber}</span>
                                    </div>
                                    </Col>
                                    <Col md="6">
                                    <div className="ttl-info text-left ttl-sm-mb-0">
                                        <h6><i className="fa fa-location-arrow"></i>   {Location}</h6><span>{LocationDetails}</span>
                                    </div>
                                    </Col>
                                </Row>
                                </Col>
                            </Row>
                            <hr />
                            <div className="social-media step4" data-intro="This is your Social details">
                                <ul className="list-inline">
                                <li className="list-inline-item"><a href="#javascript"><i className="fa fa-facebook"></i></a></li>
                                <li className="list-inline-item"><a href="#javascript"><i className="fa fa-google-plus"></i></a></li>
                                <li className="list-inline-item"><a href="#javascript"><i className="fa fa-twitter"></i></a></li>
                                <li className="list-inline-item"><a href="#javascript"><i className="fa fa-instagram"></i></a></li>
                                <li className="list-inline-item"><a href="#javascript"><i className="fa fa-rss"></i></a></li>
                                </ul>
                            </div>
                            <div className="follow">
                                <Row>
                                <Col col="6" className="text-md-right border-right">
                                    <div className="follow-num counter">{"25869"}</div><span>{Follower}</span>
                                </Col>
                                <Col col="6" className="text-md-left">
                                    <div className="follow-num counter">{"659887"}</div><span>{Following}</span>
                                </Col>
                                </Row>
                            </div>
                            </div>
                        </Card>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col sm="12" md="12" lg="4" xl="4">
                        <Card>
                            <CardHeader className="b-l-primary border-3">
                                <h5>Account Verification</h5>
                            </CardHeader>
                            <CardBody>
                                <p>Verify your account to show employer's you're safe to hire & serious about your duties/responsibilities on this platform. We recommend employer's to <strong style={{ color: "blue" }}>NOT</strong> hire hacker's with accounts that are in primarily an <em style={{ color: "blue" }}>"un-verified"</em> state.</p>
                                <hr />
                                <Button style={{ width: "100%" }} onClick={this.handleVerificationRedirect} color="secondary">Start Verification!</Button>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" md="12" lg="4" xl="4">
                        <Card>
                            <CardHeader className="b-l-primary border-3">
                                <h5>Insert text here.</h5>
                            </CardHeader>
                            <CardBody>
                                <p>
                                    {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been"}
                                    {"the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"}
                                    {"of type and scrambled. Lorem Ipsum is simply dummy text of the printing and typesetting"}
                                    {"industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an"}
                                    {"unknown printer took a galley of type and scrambled."}
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" md="12" lg="4" xl="4">
                        <Card>
                            <CardHeader className="b-l-primary border-3">
                                <h5>Insert text here.</h5>
                            </CardHeader>
                            <CardBody>
                                <p>
                                    {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been"}
                                    {"the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"}
                                    {"of type and scrambled. Lorem Ipsum is simply dummy text of the printing and typesetting"}
                                    {"industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an"}
                                    {"unknown printer took a galley of type and scrambled."}
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
        )
    }
}

export default withRouter(PersonalProfileDetailsMainHelper);
