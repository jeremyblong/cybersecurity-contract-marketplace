import React, { Fragment ,useState} from 'react';
import { Col, Card, CardHeader, CardBody, Button, Media, Form, FormGroup, Input, Collapse, UncontrolledTooltip } from 'reactstrap';
import one from "../../../../../../assets/images/user/1.jpg";
import three from "../../../../../../assets/images/user/3.jpg";
import five from "../../../../../../assets/images/user/5.jpg";
import two from "../../../../../../assets/images/user/2.png";
import eight from "../../../../../../assets/images/user/8.jpg";
import eleven from "../../../../../../assets/images/user/11.png";
import helpers from "./miscFunctions/helperFunctions.js";
import ten from "../../../../../../assets/images/user/10.jpg";
import _ from "lodash";
import four from "../../../../../../assets/images/user/4.jpg";
import moment from "moment";
import { MyProfile, BuckyBarnes, JasonBorne, SarahLoren, AndewJon, JohnyWaston, JohnyWilliam, ComerenDiaz, MyPage, View, MutualFriends, ActivityFeed, Likes } from "../../../../../../constant";

const { renderPicVideoPlaceholder, renderPicOrVideoProfileOrNot } = helpers;


const LeftBar = ({ employerData, activeHearts }) => {

    const [isProfile, setisProfile] = useState(true);
    const [isMutual, setisMutual] = useState(true);
    const [isActivity, setisActivity] = useState(true);
    const [ displayState, setDisplayState ] = useState("1");
    
    return (
        <Fragment>
            <Col xl="12">
                <Card>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisProfile(!isProfile)}
                                data-toggle="collapse" data-target="#collapseicon5" aria-expanded={isProfile} aria-controls="collapseicon5"
                                >{MyProfile}
                            </Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isProfile}>
                        <CardBody className="socialprofile filter-cards-view">
                            <Media>
                                <Media className="img-50 img-fluid m-r-20 rounded-circle" src={one} alt="" />
                                <Media body>
                                    <h6 className="font-primary f-w-600">{MyPage}</h6><span className="d-block"><span><i className="fa fa-comments-o"> </i><span className="px-2">Following  <span className="badge badge-pill badge-secondary" style={{ color: "#fff" }}>{_.has(employerData, "followingCompanies") ? `${employerData.followingCompanies.length} companies` : `${0} companies`}</span></span></span></span><span className="d-block"><span><i className="fa fa-bell-o"></i><span className="px-2">Following  <span className="badge badge-pill badge-primary" style={{ color: "#fff" }}>{_.has(employerData, "followingHackers") ? `${employerData.followingHackers.length} hacker's` : `${0} hacker's`}</span></span></span></span>
                                </Media>
                            </Media>
                            <div className="social-btngroup d-flex">
                                <Button onClick={() => setDisplayState("1")} color="primary text-center" type="button">{Likes}</Button>
                                <Button onClick={() => setDisplayState("2")} color="light text-center" type="button">{View}</Button>
                            </div>
                            {displayState === "1" ? <Fragment>
                                <div className="likes-profile text-center">
                                    <h5><span><i className="fa fa-heart font-danger"></i> {typeof activeHearts !== "undefined" ? `${activeHearts.length} profile 'hearts'` : 0}</span></h5>
                                </div>
                                <div className="text-center">{"35 New Likes This Week"}</div>
                            </Fragment> : <Fragment>
                                <div className="likes-profile text-center">
                                    <h5><span><i className="fa fa-heart font-danger"></i> {typeof activeHearts !== "undefined" ? `${activeHearts.length} profile 'hearts'` : 0}</span></h5>
                                </div>
                                <div className="text-center">{`Has approx. ${_.has(employerData, "currentlyFollowedBy") ? employerData.currentlyFollowedBy.length : "---"} 'followers'`}</div>
                            </Fragment>}
                            <div className="customers text-center social-group">
                                <ul>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={three} alt="ThirdImg" id="UncontrolledTooltipExample"/>
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample">
                                            {JohnyWaston}
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={five} alt="FifthImg" id="UncontrolledTooltipExample1" />
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample1">
                                            {AndewJon}
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={one} alt="FirstImg" id="UncontrolledTooltipExample2" />
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample2">
                                            {ComerenDiaz}
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={two} alt="secondImg" id="UncontrolledTooltipExample3" />
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample3">
                                            {BuckyBarnes}
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={eight} alt="eightImg" id="UncontrolledTooltipExample4" />
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample4">
                                            {JasonBorne}
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={eleven} alt="elevenImg" id="UncontrolledTooltipExample5" />
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample5">
                                            {ComerenDiaz}
                                        </UncontrolledTooltip>
                                    </li>
                                </ul>
                            </div>
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
            <Col xl="12">
                <Card>
                    {renderPicVideoPlaceholder(_.has(employerData, "profilePicsVideos") && typeof employerData.profilePicsVideos !== "undefined" && employerData.profilePicsVideos.length > 0 ? employerData.profilePicsVideos[employerData.profilePicsVideos.length - 1] : null)}
                </Card>
            </Col>
            <Col xl="12">
                <Card>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisMutual(!isMutual)}
                                data-toggle="collapse" data-target="#collapseicon6" aria-expanded={isMutual} aria-controls="collapseicon6">Previous (unique) profile views</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isMutual}>
                        <CardBody className="social-status filter-cards-view">
                            <Form>
                                <FormGroup className="m-0">
                                    <Input className="form-control-social" type="search" placeholder="Search Contacts.." />
                                </FormGroup>
                            </Form>
                            <h4 className={"member-since-header-text"}>Recent <strong>Unique</strong> Profile Views & Visit's</h4>
                            {(employerData !== null && typeof employerData.recentlyViewedProfileViews !== "undefined" && employerData.recentlyViewedProfileViews.length > 0) ? employerData.recentlyViewedProfileViews.slice(0, 10).map((visit, idx) => {
                                return (
                                    <Fragment key={idx}>
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
                                    <span className="f-w-600 d-block">{AndewJon}</span>
                                    <p>{"Commented on Shaun Park's"} <a href="#javascript">{"Photo"}</a></p><span className="light-span">{"20 min Ago"}</span>
                                </Media>
                            </Media>
                            <Media><Media className="img-50 rounded-circle m-r-15" src={three} alt="threeImg" />
                                <Media body>
                                    <span className="f-w-600 d-block">{JohnyWaston}</span>
                                    <p>{"Commented on Shaun Park's"} <a href="#javascript">{"Photo"}</a></p><span className="light-span">{"1 hour Ago"}</span>
                                </Media>
                            </Media>
                            <Media><Media className="img-50 rounded-circle m-r-15" src={five} alt="fiveImg" />
                                <Media body>
                                    <span className="f-w-600 d-block">{ComerenDiaz}</span>
                                    <p>{"Commented on Shaun Park's"} <a href="#javascript">{"Photo"}</a></p><span className="light-span">{"1 days Ago"}</span>
                                </Media>
                            </Media>
                            <Media><Media className="img-50 rounded-circle m-r-15" src={four} alt="fourImg" />
                                <Media body>
                                    <span className="f-w-600 d-block">{SarahLoren}</span>
                                    <p>{"Commented on Shaun Park's"} <a href="#javascript">{"Photo"}</a></p><span className="light-span">{"2 days Ago"}</span>
                                </Media>
                            </Media>
                            <Media><Media className="img-50 rounded-circle m-r-15" src={three} alt="threeImg" />
                                <Media body>
                                    <span className="f-w-600 d-block">{JohnyWaston}</span>
                                    <p>{"Commented on Shaun Park's"} <a href="#javascript">{"Photo"}</a></p><span className="light-span">{"5 days Ago"}</span>
                                </Media>
                            </Media>
                            <Media><Media className="img-50 rounded-circle m-r-15" src={five} alt="fiveImg" />
                                <Media body>
                                    <span className="f-w-600 d-block">{ComerenDiaz}</span>
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