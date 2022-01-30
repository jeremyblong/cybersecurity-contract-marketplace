import React, { Fragment } from 'react';
import { Row, Col, Card, CardBody, Button, Media, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import one from "../../../../../assets/images/user/1.jpg";
import three from "../../../../../assets/images/user/3.jpg";
import two from "../../../../../assets/images/user/2.png";
import timeline1 from "../../../../../assets/images/social-app/timeline-1.png";
import timeline2 from "../../../../../assets/images/social-app/timeline-2.png";
import { MoreVertical } from 'react-feather';
import LeftBar from './bars/leftBar.jsx';
import RightBar from './bars/rightBar.jsx';
import { JasonBorne, IssaBell, MoreCommnets } from "../../../../../constant";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


const TimelineTab = ({ user }) => {


    const renderConditionalContent = () => {
        if (user !== null) {
            return (
                <Fragment>
                    <Col xl="3 xl-40 box-col-4" lg="12" md="5">
                        <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc4">
                            <Row>
                                <LeftBar user={user} />
                            </Row>
                        </div>
                    </Col>
                    <Col xl="6 xl-60 box-col-8" lg="12" md="7">
                        <Row>
                            <Col sm="12">
                                <Card>
                                    <CardBody>
                                        <div className="new-users-social">
                                            <Media>
                                                <Media className="rounded-circle image-radius m-r-15" src={one} alt="" />
                                                <Media body>
                                                    <h6 className="mb-0 f-w-700">{`${user.firstName} ${user.lastName}`}</h6>
                                                    <p>{"January, 12,2019"}</p>
                                                </Media><span className="pull-right mt-0"><MoreVertical /></span>
                                            </Media>
                                        </div>
                                        <Media className="img-fluid" alt="" src={timeline1} />
                                        <div className="timeline-content">
                                            <p>
                                                {"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed urna in justo euismod condimentum. Fusce placerat enim et odio molestie sagittis."}
                                            </p>
                                            <div className="like-content"><span><i className="fa fa-heart font-danger"></i></span><span className="pull-right comment-number"><span>{"20"} </span><span><i className="fa fa-share-alt mr-0"></i></span></span><span className="pull-right comment-number"><span>{"10"} </span><span><i className="fa fa-comments-o"></i></span></span></div>
                                            <div className="social-chat">
                                                <div className="your-msg">
                                                    <Media>
                                                        <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={one} />
                                                        <Media body><span className="f-w-600">Jason Borne <span>{"1 Year Ago"} <i className="fa fa-reply font-primary"></i></span></span>
                                                            <p>{"we are doing dance and singing songs, please vote our post which is very good for all young peoples"}</p>
                                                        </Media>
                                                    </Media>
                                                </div>
                                                <div className="other-msg">
                                                    <Media>
                                                        <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={two} />
                                                        <Media body><span className="f-w-600">Alexandria <span>{"1 Month Ago"} <i className="fa fa-reply font-primary"></i></span></span>
                                                            <p>{"ohh yeah very good car and its features i will surely vote for it"} </p>
                                                        </Media>
                                                    </Media>
                                                </div>
                                                <div className="other-msg">
                                                    <Media>
                                                        <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={three} />
                                                        <Media body><span className="f-w-600">Olivia John <span>{"15 Days Ago"} <i className="fa fa-reply font-primary"></i></span></span>
                                                            <p>{"ohh yeah very good car and its features i will surely vote for it"} </p>
                                                        </Media>
                                                    </Media>
                                                </div>
                                                <div className="your-msg">
                                                    <Media>
                                                        <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={one} />
                                                        <Media body><span className="f-w-600">Issabella <span>{"1 Year Ago"} <i className="fa fa-reply font-primary"></i></span></span>
                                                            <p>{"we are doing dance and singing songs, please vote our post which is very good for all young peoples"}</p>
                                                        </Media>
                                                    </Media>
                                                </div>
                                                <div className="text-center"><a href="#javascript">More Comments</a></div>
                                            </div>
                                            <div className="comments-box">
                                                <Media>
                                                    <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={one} />
                                                    <Media body>
                                                        <InputGroup className="text-box">
                                                            <Input className="form-control input-txt-bx" type="text" name="message-to-send" placeholder="Post Your commnets" />
                                                            <InputGroupAddon addonType="append">
                                                                <Button color="transparent"><i className="fa fa-smile-o">  </i></Button>
                                                            </InputGroupAddon>
                                                        </InputGroup>
                                                    </Media>
                                                </Media>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col sm="12">
                                <Card>
                                    <CardBody>
                                        <div className="new-users-social">
                                            <Media>
                                                <Media className="rounded-circle image-radius m-r-15" src={one} alt="" />
                                                <Media body>
                                                    <h6 className="mb-0 f-w-700">{`${user.firstName} ${user.lastName}`}</h6>
                                                    <p>{"January, 12,2019"}</p>
                                                </Media><span className="pull-right mt-0"><MoreVertical /></span>
                                            </Media>
                                        </div>
                                        <Media className="img-fluid" alt="" src={timeline2} />
                                        <div className="timeline-content">
                                            <p>
                                                {"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed urna in justo euismod condimentum. Fusce placerat enim et odio molestie sagittis."}
                                            </p>
                                            <div className="like-content"><span><i className="fa fa-heart font-danger"></i></span><span className="pull-right comment-number"><span>{"20"} </span><span><i className="fa fa-share-alt mr-0"></i></span></span><span className="pull-right comment-number"><span>{"10"} </span><span><i className="fa fa-comments-o"></i></span></span></div>
                                            <div className="social-chat">
                                                <div className="your-msg">
                                                    <Media>
                                                        <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={one} />
                                                        <Media body><span className="f-w-600">{JasonBorne} <span>{"1 Year Ago"} <i className="fa fa-reply font-primary"></i></span></span>
                                                            <p>{"we are doing dance and singing songs, please vote our post which is very good for all young peoples"}</p>
                                                        </Media>
                                                    </Media>
                                                </div>
                                                <div className="your-msg">
                                                    <Media>
                                                        <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={one} />
                                                        <Media body><span className="f-w-600">{IssaBell} <span>{"1 Year Ago"} <i className="fa fa-reply font-primary"></i></span></span>
                                                            <p>{"we are doing dance and singing songs, please vote our post which is very good for all young peoples"}</p>
                                                        </Media>
                                                    </Media>
                                                </div>
                                                <div className="text-center"><a href="#javascript">{MoreCommnets}</a></div>
                                            </div>
                                            <div className="comments-box">
                                                <Media>
                                                    <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={one} />
                                                    <Media body>
                                                        <InputGroup className="text-box">
                                                            <Input className="form-control input-txt-bx" type="text" name="message-to-send" placeholder="Post Your commnets" />
                                                            <InputGroupAddon addonType="append">
                                                                <Button color="transparent"><i className="fa fa-smile-o">  </i></Button>
                                                            </InputGroupAddon>
                                                        </InputGroup>
                                                    </Media>
                                                </Media>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col xl="3 xl-100 box-col-12">
                        <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc1">
                            <Row>
                                <RightBar user={user} />
                            </Row>
                        </div>
                    </Col>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                        <p>
                            <Skeleton count={60} />
                        </p>
                    </SkeletonTheme>
                </Fragment>
            );
        }
    }
    return (
        <Fragment>
            <Row>
                {renderConditionalContent()}
            </Row>
        </Fragment>
    );
};

export default TimelineTab;