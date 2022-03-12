import React, { Fragment ,useState, useEffect } from 'react';
import { Col, Row, Card, CardBody, Media, CardHeader, Button } from 'reactstrap';
import axios from 'axios';
import { MoreVertical, ThumbsUp, UserPlus, MessageSquare } from 'react-feather';
import { AddFriend, ActivityLog, AnnaMull, DionCast, KarleneLex, WaiSchalk, Hobbies, VellaChism, JasonBorne, } from "../../../../../../constant";
import LeftBar from './leftBar';
import RightBar from './rightBar';
import three from "../../../../../../assets/images/user/3.jpg";
import two from "../../../../../../assets/images/user/2.png";
import eight from "../../../../../../assets/images/user/8.jpg";
import ten from "../../../../../../assets/images/user/10.jpg";
import fourteen from "../../../../../../assets/images/user/14.png";
import four from "../../../../../../assets/images/user/4.jpg";
import _ from "lodash";
import moment from "moment";

const AboutGeneralInfoHelper = ({ employerData, activeHearts }) => {

    const [ images, setImage ] = useState([]) 
    const [ smallImages, setsmallImages ] = useState([])   

    const initilindex = { index:0, isOpen:false }
    const [ photoIndex, setPhotoIndex ] = useState(initilindex);

    const onMovePrev = () => {
        const prev = (photoIndex.index + images.length - 1) % images.length
        setPhotoIndex({...photoIndex,index:prev})
    }

    const  onMoveNext = () => {
        const next = (photoIndex.index + 1) % images.length
        setPhotoIndex({...photoIndex,index:next})
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
                            <Card>
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
                                                <p>{_.has(employerData, "numberOfEmployees") ? employerData.numberOfEmployees.label : "Data Not Availiable."}</p>
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
                                                <p>{employerData.yearsInBusiness.label}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>{"Viewed Your Profile"}</h5>
                                </CardHeader>
                                <CardBody className="avatar-showcase">
                                    <div className="pepole-knows">
                                        <ul>
                                            <li>
                                                <div className="add-friend text-center">
                                                    <Media body className="img-60 img-fluid rounded-circle" alt="" src={two} />
                                                    <span className="d-block f-w-600">{JasonBorne}</span>
                                                    <Button color="primary" size="xs">{AddFriend}</Button>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="add-friend text-center">
                                                    <Media body className="img-60 img-fluid rounded-circle" alt="" src={three} />
                                                    <span className="d-block f-w-600">{AnnaMull}</span>
                                                    <Button color="primary" size="xs">{AddFriend}</Button>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="add-friend text-center">
                                                    <Media body className="img-60 img-fluid rounded-circle" alt="" src={three} />
                                                    <span className="d-block f-w-600">{DionCast}</span>
                                                    <Button color="primary" size="xs">{AddFriend}</Button>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="add-friend text-center">
                                                    <Media body className="img-60 img-fluid rounded-circle" alt="" src={four} />
                                                    <span className="d-block f-w-600">{KarleneLex}</span>
                                                    <Button color="primary" size="xs">{AddFriend}</Button>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="add-friend text-center"><Media body className="img-60 img-fluid rounded-circle" alt="" src={eight} />
                                                    <span className="d-block f-w-600">{VellaChism}</span>
                                                    <Button color="primary" size="xs">{AddFriend}</Button>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="add-friend text-center"><Media body className="img-60 img-fluid rounded-circle" alt="" src={ten} />
                                                    <span className="d-block f-w-600">{WaiSchalk}</span>
                                                    <Button color="primary" size="xs">{AddFriend}</Button>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="add-friend text-center">
                                                    <Media body className="img-60 img-fluid rounded-circle" alt="fourteenImg" src={fourteen} />
                                                    <span className="d-block f-w-600">{KarleneLex}</span>
                                                    <Button color="primary" size="xs">{AddFriend}</Button>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>{ActivityLog}</h5>
                                </CardHeader>
                                <CardBody>
                                    <div className="activity-log">
                                        <div className="my-activity">
                                            <h6 className="f-w-600">{"Today"}</h6>
                                            <p><span><ThumbsUp className="m-r-20" /></span>{"Comeren Diaz likes your photos."}</p>
                                            <p><span><UserPlus className="m-r-20" /></span>{"Karlene Lex and Comeren Diaz now friends."}</p>
                                            <p><span><MessageSquare className="m-r-20" /></span>{"Sarah Loren wrote on your timeline"}</p>
                                            <p><span><ThumbsUp className="m-r-20" /></span>{"Johny Waston likes your post's."}</p>
                                            <p><span><UserPlus className="m-r-20" /></span>{"Andew Jon became friends with Comeren Diaz."}</p>
                                            <p><span><UserPlus className="m-r-20" /></span>{"Johny Waston became friends with Bucky Barnes."}</p>
                                        </div>
                                        <div className="my-activity">
                                            <h6 className="f-w-600">{"25 December"}</h6>
                                            <p><span><ThumbsUp className="m-r-20" /></span>{"Comeren Diaz likes your photos."}</p>
                                            <p><span><ThumbsUp className="m-r-20" /></span>{"Johny Waston likes your post's."}</p>
                                            <p><span><UserPlus className="m-r-20" /></span>{"Karlene Lex and Comeren Diaz now friends."}</p>
                                            <p><span><UserPlus className="m-r-20" /></span>{"Johny Waston became friends with Bucky Barnes."}</p>
                                            <p><span><MessageSquare className="m-r-20" /></span>{"Sarah Loren wrote on your timeline"}</p>
                                            <p><span><MessageSquare className="m-r-20" /></span>{"Comeren Diaz wrote on your timeline"}</p>
                                        </div>
                                        <div className="my-activity">
                                            <h6 className="f-w-600">{"8 september"}</h6>
                                            <p><span><ThumbsUp className="m-r-20" /></span>{"Comeren Diaz likes your photos."}</p>
                                            <p><span><ThumbsUp className="m-r-20" /></span>{"Johny Waston likes your post's."}</p>
                                            <p><span><UserPlus className="m-r-20" /></span>{"Karlene Lex and Comeren Diaz now friends."}</p>
                                            <p><span><UserPlus className="m-r-20" /></span>{"Johny Waston became friends with Bucky Barnes."}</p>
                                            <p><span><MessageSquare className="m-r-20" /></span>{"Sarah Loren wrote on your timeline"}</p>
                                            <p><span><UserPlus className="m-r-20" /></span>{"Andew Jon became friends with Comeren Diaz."}</p>
                                        </div>
                                        <div className="my-activity">
                                            <h6 className="f-w-600">{"6 June"}</h6>
                                            <p><span><ThumbsUp className="m-r-20" /></span>{"Comeren Diaz likes your photos."}</p>
                                            <p><span><UserPlus className="m-r-20" /></span>{"Karlene Lex and Comeren Diaz now friends."}</p>
                                            <p><span><MessageSquare className="m-r-20" /></span>{"Sarah Loren wrote on your timeline"}</p>
                                            <p><span><ThumbsUp className="m-r-20" /></span>{"Johny Waston likes your post's."}</p>
                                            <p><span><UserPlus className="m-r-20" /></span>{"Andew Jon became friends with Comeren Diaz."}</p>
                                            <p><span><UserPlus className="m-r-20" /></span>{"Johny Waston became friends with Bucky Barnes."}</p>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
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