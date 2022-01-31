import React, { Fragment ,useState} from 'react';
import { Col, Card, CardHeader, CardBody, Button, Media, Form, FormGroup, Input, Collapse, UncontrolledTooltip } from 'reactstrap';
import one from "../../../../../../assets/images/user/1.jpg";
import three from "../../../../../../assets/images/user/3.jpg";
import five from "../../../../../../assets/images/user/5.jpg";
import two from "../../../../../../assets/images/user/2.png";
import eight from "../../../../../../assets/images/user/8.jpg";
import eleven from "../../../../../../assets/images/user/11.png";
import moment from "moment";
import ten from "../../../../../../assets/images/user/10.jpg";
import four from "../../../../../../assets/images/user/4.jpg";
import helpers from "./helpers/leftBarHelperFunctions.js";
import ReactPlayer from "react-player";
import { View, ActivityFeed, Likes } from "../../../../../../constant";
import "./styles.css";

const { renderPictureOrVideoContentBreakBlock, renderPicOrVideoProfileOrNot } = helpers;


const LeftBar = ({ user }) => {

    const [isProfile, setisProfile] = useState(true);
    const [isMutual, setisMutual] = useState(true);
    const [isActivity, setisActivity] = useState(true);
    const [ viewType, setViewType ] = useState("likesAndHearts");

    const lastImageBoxed = (user !== null && typeof user.profilePicsVideos !== "undefined" && user.profilePicsVideos.length > 0) ? user.profilePicsVideos[user.profilePicsVideos.length - 1] : null;
    
    return (
        <Fragment>
            <Col xl="12">
                <Card>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisProfile(!isProfile)}
                                data-toggle="collapse" data-target="#collapseicon5" aria-expanded={isProfile} aria-controls="collapseicon5"
                                >Core Profile Information
                            </Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isProfile}>
                        <CardBody className="socialprofile filter-cards-view">
                            {user !== null ? <Media><Media className="img-50 img-fluid m-r-20 rounded-circle" src={one} alt="" />
                                <Media body>
                                    <h6 className="font-primary f-w-600">{`${user.firstName} ${user.lastName}`}</h6><span className="d-block">Member Since {moment(user.registrationDate).fromNow()}<br /><span><i className="fa fa-comments-o"> </i><span className="px-2 following-text-profile-hacker-larger">Following...  <span style={{ color: "#fff" }} className="badge badge-pill badge-secondary">{user.followingHackers.length} Hacker's</span></span></span></span><span className="d-block"><span><i className="fa fa-bell-o"></i><span className="px-2 following-text-profile-hacker-larger">Following..  <span style={{ color: "#fff" }} className="badge badge-pill badge-info">{user.followingCompanies.length} Employer's</span></span></span></span>
                                </Media>
                            </Media> : null}
                            <div className="social-btngroup d-flex">
                                <Button onClick={() => setViewType("likesAndHearts")} color={viewType !== "likesAndHearts" ? "light text-center" : "info text-center"} type="button">Page Saves/Hearts</Button>
                                <Button onClick={() => setViewType("views")} color={viewType !== "likesAndHearts" ? "info text-center" : "light text-center"} type="button">Total Page View's</Button>
                            </div>
                            {viewType === "likesAndHearts" ? <div className="likes-profile text-center">
                                <h5><span><i className="fa fa-heart font-danger"></i> {user !== null ? user.profileLovesHearts.length : 0} Page Heart's</span></h5>
                            </div> : <div className="likes-profile text-center">
                                <h5><span><i className="fa fa-eye font-danger"></i> {user !== null ? user.totalUniqueViews : 0} Total Page View's</span></h5>
                            </div>}
                            <div className="text-center">{"35 New Likes This Week"}</div>
                            <div className="customers text-center social-group">
                                <ul>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={three} alt="ThirdImg" id="UncontrolledTooltipExample"/>
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample">
                                            Random Person
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={five} alt="FifthImg" id="UncontrolledTooltipExample1" />
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample1">
                                            Random Person
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={one} alt="FirstImg" id="UncontrolledTooltipExample2" />
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample2">
                                            Random Person
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={two} alt="secondImg" id="UncontrolledTooltipExample3" />
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample3">
                                            Random Person
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={eight} alt="eightImg" id="UncontrolledTooltipExample4" />
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample4">
                                            Random Person
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={eleven} alt="elevenImg" id="UncontrolledTooltipExample5" />
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample5">
                                            Random Person
                                        </UncontrolledTooltip>
                                    </li>
                                </ul>
                            </div>
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
            <Col xl="12">
                {renderPictureOrVideoContentBreakBlock(lastImageBoxed)}
            </Col>
            <Col xl="12">
                <Card>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisMutual(!isMutual)}
                                data-toggle="collapse" data-target="#collapseicon6" aria-expanded={isMutual} aria-controls="collapseicon6">Recently Viewed This Profile Too</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isMutual}>
                        <CardBody className="social-status filter-cards-view">
                            <Form>
                                <FormGroup className="m-0">
                                    <Input className="form-control-social" type="search" placeholder="Search recent viewer's..." />
                                </FormGroup>
                            </Form>  {/* social status's === social-busy social-online social-offline  */}
                            <h4 className={"member-since-header-text"}>Recent Profile Views & Visit's</h4>
                            {(user !== null && typeof user.recentlyViewedProfileViews !== "undefined" && user.recentlyViewedProfileViews.length > 0) ? user.recentlyViewedProfileViews.slice(0, 10).map((visit, idx) => {
                                return (
                                    <Fragment>
                                        <Media>
                                            {renderPicOrVideoProfileOrNot(visit)}
                                            <div className="social-status social-online"></div>
                                            <Media body>
                                                <span className="f-w-600 d-block">{visit.viewerName}</span><span className="d-block">Member Since: {moment(visit.memberSince).format("MM/DD/YYYY")} <br />{visit.accountType === "hackers" ? "Hacker Account" : "Employer Account"}</span>
                                            </Media>
                                        </Media>
                                    </Fragment>
                                );
                            }) : null}
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
            <Col xl="12">
                <Card>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisActivity(!isActivity)}
                                data-toggle="collapse" data-target="#collapseicon14" aria-expanded={isActivity} aria-controls="collapseicon14">{ActivityFeed}</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isActivity}>
                        <CardBody className="social-status filter-cards-view">
                            <Media><Media className="img-50 rounded-circle m-r-15" src={ten} alt="tenImg" />
                                <Media body>
                                    <span className="f-w-600 d-block">Random Person</span>
                                    <p>{"Commented on Shaun Park's"} <a href="#javascript">{"Photo"}</a></p><span className="light-span">{"20 min Ago"}</span>
                                </Media>
                            </Media>
                            <Media><Media className="img-50 rounded-circle m-r-15" src={three} alt="threeImg" />
                                <Media body>
                                    <span className="f-w-600 d-block">Random Person</span>
                                    <p>{"Commented on Shaun Park's"} <a href="#javascript">{"Photo"}</a></p><span className="light-span">{"1 hour Ago"}</span>
                                </Media>
                            </Media>
                            <Media><Media className="img-50 rounded-circle m-r-15" src={five} alt="fiveImg" />
                                <Media body>
                                    <span className="f-w-600 d-block">Random Person</span>
                                    <p>{"Commented on Shaun Park's"} <a href="#javascript">{"Photo"}</a></p><span className="light-span">{"1 days Ago"}</span>
                                </Media>
                            </Media>
                            <Media><Media className="img-50 rounded-circle m-r-15" src={four} alt="fourImg" />
                                <Media body>
                                    <span className="f-w-600 d-block">Random Person</span>
                                    <p>{"Commented on Shaun Park's"} <a href="#javascript">{"Photo"}</a></p><span className="light-span">{"2 days Ago"}</span>
                                </Media>
                            </Media>
                            <Media><Media className="img-50 rounded-circle m-r-15" src={three} alt="threeImg" />
                                <Media body>
                                    <span className="f-w-600 d-block">Random Person</span>
                                    <p>{"Commented on Shaun Park's"} <a href="#javascript">{"Photo"}</a></p><span className="light-span">{"5 days Ago"}</span>
                                </Media>
                            </Media>
                            <Media><Media className="img-50 rounded-circle m-r-15" src={five} alt="fiveImg" />
                                <Media body>
                                    <span className="f-w-600 d-block">Random Person</span>
                                    <p>{"Commented on Shaun Park's"} <a href="#javascript">{"Photo"}</a></p><span className="light-span">{"6 days Ago"}</span>
                                </Media>
                            </Media>
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
        </Fragment>
    );
};

export default LeftBar;