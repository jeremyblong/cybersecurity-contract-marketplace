import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Button, Media } from 'reactstrap';
import axios from "axios";
import { MoreVertical, ThumbsUp, UserPlus, MessageSquare } from 'react-feather';
import RightBar from './bars/rightBar.jsx';
import LeftBar from './bars/leftBar.jsx';
import helpers from "./helpers/aboutSectionHelpers/helpers.js";
import PaginationGeneralHelper from "../../../universal/pagination/miscMainPagination.js";
import { useHistory } from 'react-router-dom';
import NotificationManager from 'react-notifications';
import moment from 'moment';
import _ from "lodash";



const { renderPicOrVideoProfileOrNotViewed, lastRenderPicImageVideo } = helpers;

const itemsPerPage = 20;

const AboutTab = ({ userData, setPermenantDataState, permenantData, user, isOpen, onCloseModal, onOpenModal, setSelectedCurrently, modalIndexSelected, setSelectedModalIndex }) => {
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ itemOffset, setItemOffset ] = useState(0);
    const [ pageCount, setPageCount ] = useState(0);
    const [ alreadyViewed, setAlreadyViewedState ] = useState([]);
    const [ suggestedRandom, setSuggestedRandomHackers ] = useState([]);

    const history = useHistory();
    

    useEffect(() => {
        const configgg = {
            params: {}
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/hackers/random/general`, configgg).then((res) => {
            if (res.data.message === "Successfully gathered hackers!") {
                console.log(res.data);

                const { hackers } = res.data;

                setSuggestedRandomHackers(hackers);
            } else {
                console.log("err", res.data);

                NotificationManager.error("An unknown error occurred while attempting to fetch this user's data/information...", "Error occurred while fetching user's data!", 4750);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {

        const endOffset = itemOffset + itemsPerPage;

        setPageCount(Math.ceil(permenantData.length / itemsPerPage));

        setAlreadyViewedState(permenantData.slice(itemOffset, endOffset));
        
    }, [itemOffset, itemsPerPage]);


    const redirectToHackerOrEmployerViewed = (accountType, hackerID) => {
        if (accountType === "hackers") {
            history.push(`/hacker/profile/individual/view/${hackerID}`);
        } else {
            NotificationManager.error("Have not wired up this logic (Employer profile's) yet!!", "NOT WIRED UP YET!", 4500);
        }
    }
    return (
        <Fragment>
            <Row>
                <Col xl="3 xl-40 box-col-4" lg="12" md="5">
                    <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc2">
                        <Row>
                            <LeftBar user={user} />
                        </Row>
                    </div>
                </Col>
                <Col xl="6 xl-60 box-col-8" lg="12" md="7">
                    <Row>
                        <Col sm="12">
                            <Card className={"add-shadow-general-card-profile"}>
                                <CardHeader>
                                    <h5>{"People You May Know"}</h5>
                                </CardHeader>
                                <CardBody className="avatar-showcase">
                                    <div className="pepole-knows">
                                        <ul>
                                            {typeof suggestedRandom !== "undefined" && suggestedRandom.length > 0 ? suggestedRandom.map((suggestion, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <li className={"people-know-li-item"}>
                                                            <div className="add-friend text-center center-viewed-content">
                                                                {lastRenderPicImageVideo(typeof suggestion.profilePicsVideos !== "undefined" && suggestion.profilePicsVideos.length > 0 ? suggestion.profilePicsVideos[suggestion.profilePicsVideos.length - 1] : null)}
                                                                <span style={{ paddingTop: "3.5px" }} className="d-block f-w-600">{`${suggestion.firstName} ${suggestion.lastName}`}</span>
                                                                <span className={"d-block"}>{typeof suggestion.reviews !== "undefined" && suggestion.reviews.length > 0 ? suggestion.reviews.length : 0} Review(s)</span>
                                                                <Button onClick={() => {
                                                                    redirectToHackerOrEmployerViewed(suggestion.accountType, suggestion.uniqueId);
                                                                }} color="primary" size="xs">~ View Profile ~</Button>
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
                        <Col sm="12">
                            <Card className={"add-shadow-general-card-profile"}>
                                <CardHeader className="social-header">
                                    <h5><span>{"Hobbies and Interests"}</span><span className="pull-right"><MoreVertical /></span></h5>
                                </CardHeader>
                                <CardBody>
                                    <Row className="details-about">
                                        <Col sm="6">
                                            <div className="your-details"><span className="f-w-600">Years Of Experience:</span>
                                                <p>This user has approx <em style={{ color: "#7366ff" }}>{_.has(user, "yearsOfExperience") ? user.yearsOfExperience.label : "Loading/Not-Specified..."}</em></p>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="your-details your-details-xs"><span className="f-w-600">Username: </span>
                                                <p>{user.username}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="details-about">
                                        <Col sm="6">
                                            <div className="your-details"><span className="f-w-600">Total Unique Views: </span>
                                                <p><em style={{ color: "#7366ff" }}>{user.totalUniqueViews}</em> unique profile view(s)</p>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="your-details your-details-xs"><span className="f-w-600">Total # Of Reviews: </span>
                                                <p>This user has approx. <em style={{ color: "#7366ff" }}>{typeof user.reviews !== "undefined" && user.reviews.length > 0 ? user.reviews.length : 0}</em> total reviews</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="details-about">
                                        <Col sm="6">
                                            <div className="your-details"><span className="f-w-600">Registration Date</span>
                                                <p>Registered <em style={{ color: "#7366ff" }}>{moment(user.registrationDate).fromNow()}</em></p>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="your-details your-details-xs"><span className="f-w-600">Total Profile Post(s)</span>
                                                <p><em style={{ color: "#7366ff" }}>{_.has(user, "profilePosts") ? user.profilePosts.length : 0}</em> total posts</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="details-about">
                                        <Col sm="6">
                                            <div className="your-details"><span className="f-w-600">Gender/Sexuality</span>
                                                <p>{_.has(user, "gender") ? user.gender.label : "Not Provided."}</p>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="your-details your-details-xs"><span className="f-w-600">Account Verification Status</span>
                                                <p><em style={{ color: "#7366ff" }}>{user.fullyVerified === true ? "Account is fully-verified!" : "Account is NOT provided."}</em></p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="details-about">
                                        <Col sm="6">
                                            <div className="your-details"><span className="f-w-600">Current Number Of Follower's</span>
                                                <p>{typeof user.currentlyFollowedBy !== "undefined" && user.currentlyFollowedBy.length > 0 ? user.currentlyFollowedBy.length : 0} follower's</p>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="your-details your-details-xs"><span className="f-w-600">Born/Birthdate</span>
                                                <p>{moment(user.birthdate).format("MM/DD/YYYY hh:mm:ss a")}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card className={"add-shadow-general-card-profile"}>
                                <CardHeader className="social-header">
                                    <h5><span>{"Education and Employement"}</span><span className="pull-right"><MoreVertical /></span></h5>
                                </CardHeader>
                                <CardBody>
                                    <Row className="details-about">
                                        <Col sm="6">
                                            <div className="your-details"><span className="f-w-600">{"The New College of Design"}</span>
                                                <p>{"2001 - 2006"}</p>
                                                <p>{"Breaking Good, RedDevil, People of Interest, The Running Dead, Found, American Guy."}</p>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="your-details your-details-xs"><span className="f-w-600">{"Digital Design Intern"}</span>
                                                <p>{"2006-2008"}</p>
                                                <p>{"Digital Design Intern for the “Multimedz” agency. Was in charge of the communication with the clients."}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="details-about">
                                        <Col sm="6">
                                            <div className="your-details"><span className="f-w-600">{"Rembrandt Institute"}</span>
                                                <p>{"2008"}</p>
                                                <p>{"Five months Digital Illustration course. Professor: Leonardo Stagg."}</p>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="your-details your-details-xs"><span className="f-w-600">{"UI/UX Designer"}</span>
                                                <p>{"2001 - 2006"}</p>
                                                <p>{"Breaking Good, RedDevil, People of Interest, The Running Dead, Found, American Guy."}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="details-about">
                                        <Col sm="6">
                                            <div className="your-details"><span className="f-w-600">{"The Digital College"}</span>
                                                <p>{"2010"}</p>
                                                <p>{"6 months intensive Motion Graphics course. After Effects and Premire. Professor: Donatello Urtle."}</p>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="your-details your-details-xs"><span className="f-w-600">{"The New College of Design"}</span>
                                                <p>{"2008 - 2013"}</p>
                                                <p>{"UI/UX Designer for the “Daydreams” agency."}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card className={"add-shadow-general-card-profile"}>
                                <CardHeader>
                                    <h5>{"People Who've Viewed This Profile"}</h5>
                                </CardHeader>
                                <CardBody className="avatar-showcase">
                                    <div className="pepole-knows">
                                        <ul>
                                            {(user !== null && typeof alreadyViewed !== "undefined" && alreadyViewed.length > 0) ? alreadyViewed.map((visit, idx) => {
                                                return (
                                                    <Fragment key={idx}>
                                                        <li className={"people-know-li-item"}>
                                                            <div className="add-friend text-center center-viewed-content">
                                                                {renderPicOrVideoProfileOrNotViewed(visit)}
                                                                <span style={{ paddingTop: "3.5px" }} className="d-block f-w-600">{visit.viewerName}</span>
                                                                <span className={"d-block"}>{visit.accountType === "hackers" ? "Hacker Account" : "Employer Account"}</span>
                                                                <Button onClick={() => {
                                                                    redirectToHackerOrEmployerViewed(visit.accountType, visit.viewedBy);
                                                                }} color="primary" size="xs">~ View Profile ~</Button>
                                                            </div>
                                                        </li>
                                                    </Fragment>
                                                );
                                            }) : null}
                                        </ul>
                                    </div>
                                    <div style={{ marginTop: "17.5px" }} className={"centered-both-ways"}>
                                        <PaginationGeneralHelper itemsPerPage={itemsPerPage} pageCount={pageCount} currentPage={currentPage} setItemOffset={setItemOffset} setCurrentPage={setCurrentPage} loopingData={permenantData} />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        {/* <Col sm="12">
                            <Card className={"add-shadow-general-card-profile"}>
                                <CardHeader>
                                    <h5>Activity Log</h5>
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
                        </Col> */}
                    </Row>
                </Col> 
                <div className="col-xl-3 xl-100 box-col-12">
                    <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc3">
                        <Row>
                            <RightBar modalIndexSelected={modalIndexSelected} setSelectedModalIndex={setSelectedModalIndex} setSelectedCurrently={setSelectedCurrently} onOpenModal={onOpenModal} isOpen={isOpen} onCloseModal={onCloseModal} user={user} />
                        </Row>
                    </div>
                </div>
            </Row>
        </Fragment>
    );
};

export default AboutTab;