import React, { Fragment ,useState } from 'react';
import { Col, Row, Card, CardBody, Media, CardHeader, Button } from 'reactstrap';
import ReactPlayer from "react-player";
import LeftBar from './leftBar';
import RightBar from './rightBar';
import helpers from "./miscFunctions/helperFunctions.js";
import _ from "lodash";
import moment from "moment";
import { useHistory } from "react-router-dom";

const { renderPicOrVideoProfileOrNot } = helpers;


const AboutGeneralInfoHelper = ({ employerData, activeHearts }) => {

    const history = useHistory();

    const initilindex = { index:0, isOpen:false }
    const [ photoIndex, setPhotoIndex ] = useState(initilindex);

    const handleProfileRedirectViewer = (id, accountType) => {
        if (accountType === "hackers") {
            history.push(`/hacker/profile/individual/view/${id}`);
        } else {
            history.push(`/employer/individual/profile/main/${id}`);
        }
    }
    
    return (
        <Fragment>
            <Row>
                <Col xl="3 xl-40 box-col-4" lg="12" md="5">
                    <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc2">
                        <Row>
                            <LeftBar activeHearts={activeHearts} employerData={employerData} />
                        </Row>
                    </div>
                </Col>
                <Col xl="6 xl-60 box-col-8" lg="12" md="7">
                    <Row>
                        <Col sm="12">
                            <Card className='shadow-card-employer'>
                                <CardHeader className="social-header">
                                    <h5><span>{"Core Employer Data/Information"}</span></h5>
                                </CardHeader>
                                <CardBody>
                                    <Row className="details-about">
                                        <Col sm="6">
                                            <div className="your-details"><span className="f-w-600">Account Verification Status: </span>
                                                <p>{employerData.fullyVerified === true ? "Account Fully Verified!" : "Not Verified."}</p>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="your-details your-details-xs"><span className="f-w-600">Identity Verified: </span>
                                                <p>{employerData.identityVerified === true ? "Identity Verified!" : "Not Verified."}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="details-about">
                                        <Col sm="6">
                                            <div className="your-details"><span className="f-w-600">Number Of Employee's: </span>
                                                <p>{_.has(employerData, "numberOfEmployees") && typeof employerData.numberOfEmployees !== "undefined" ? employerData.numberOfEmployees.label : "Data Not Availiable."}</p>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="your-details your-details-xs"><span className="f-w-600">Employer Points/XP: </span>
                                                <p>{employerData.points}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="details-about">
                                        <Col sm="6">
                                            <div className="your-details"><span className="f-w-600">Public Website: </span>
                                            {_.has(employerData, "publicFacingWebsite") ? <a href={employerData.publicFacingWebsite} className={"link-color-employer-profile"}>{employerData.publicFacingWebsite}</a> : <p>{"Data Not Provided."}</p>}
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="your-details your-details-xs"><span className="f-w-600">Registered: </span>
                                                <p>Registered {moment(employerData.registrationDate).fromNow()}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="details-about">
                                        <Col sm="6">
                                            <div className="your-details"><span className="f-w-600">Date Of Registration (legible): </span>
                                                <p>{employerData.registrationDateString}</p>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="your-details your-details-xs"><span className="f-w-600">Total Review(s): </span>
                                                <p>{employerData.reviews.length} reviews</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="details-about">
                                        <Col sm="6">
                                            <div className="your-details"><span className="f-w-600">Username: </span>
                                                <p>{employerData.username}</p>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="your-details your-details-xs"><span className="f-w-600">Years In Business: </span>
                                                <p>{_.has(employerData, "yearsInBusiness") && typeof employerData.yearsInBusiness !== "undefined" ? employerData.yearsInBusiness.label : "No Data Provided."}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card className='shadow-card-employer'>
                                <CardHeader>
                                    <h5>{"Previously Viewed Your Profile"}</h5>
                                </CardHeader>
                                <CardBody className="avatar-showcase">
                                    <div className="pepole-knows">
                                        <ul>
                                            {(employerData !== null && typeof employerData.recentlyViewedProfileViews !== "undefined" && employerData.recentlyViewedProfileViews.length > 0) ? employerData.recentlyViewedProfileViews.slice(0, 10).map((visit, idx) => {
                                                return (
                                                    <Fragment key={idx}>
                                                        <li>
                                                            <div className="add-friend text-center">
                                                                <div className='centered-both-ways'>
                                                                    {renderPicOrVideoProfileOrNot(visit)}
                                                                </div>
                                                                <span className="d-block f-w-600">{visit.viewerName}</span>
                                                                <span className="d-block">Member Since: {moment(visit.memberSince).format("MM/DD/YYYY")} <br />{visit.accountType === "hackers" ? "Hacker Account" : "Employer Account"}</span>
                                                                <Button onClick={() => handleProfileRedirectViewer(visit.viewedBy, visit.accountType)} color="primary" size="xs">View Profile</Button>
                                                            </div>
                                                        </li>
                                                    </Fragment>
                                                );
                                            }) : null}
                                        </ul>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        {_.has(employerData, "companyIntroductionVideo") ? <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>Introductory Company Video</h5>
                                    <p className='lead'>This company has uploaded an 'introductory video' informing the public and/or hacker's about what they're all about, view the video to understand more about this company!</p>
                                </CardHeader>
                                <CardBody>
                                    <ReactPlayer controls={true} loop={true} height={"100%"} width={"100%"} className={"introductory-company-vid"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${employerData.companyIntroductionVideo.resource}`} />
                                </CardBody>
                            </Card>
                        </Col> : null}
                    </Row>
                </Col>
                <div className="col-xl-3 xl-100 box-col-12">
                    <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc3">
                        <Row>
                            <RightBar employerData={employerData} />
                        </Row>
                    </div>
                </div>
            </Row>
        </Fragment>
    );
};

export default AboutGeneralInfoHelper;