import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../../../../../../layout/breadcrumb'
import { Container, Row, Col, Card, Media, TabContent, TabPane, Nav, NavItem, CardBody, CardHeader, ButtonGroup, Button } from 'reactstrap';
import TimelineTab from './helpers/timelineTab.js';
import AboutTab from './helpers/aboutTab.js';
import FriendsTab from './helpers/friendsTab.js';
import PhotosTab from './helpers/photosTab.js';
import { useParams, withRouter } from 'react-router-dom';
import axios from 'axios';
import helpers from "./helpers/functions/helperFunctions.js";
import "./styles.css";
import _ from "lodash";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from "react-router-dom";
import uuid from "react-uuid";
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert';
import { connect } from "react-redux";
import { NotificationManager } from 'react-notifications';

const { renderPictureOrVideoProfilePic, calculateFileType } = helpers;

const ManageApplicationIndividualHelper = ({ location, employerData }) => {

    // history object creation
    const history = useHistory();
    // applicant
    const applicantData = _.has(location, "state") && _.has(location.state, "applicant") ? location.state.applicant : null;
    // location props
    console.log("applicantData viewIndividualInfo.js : ", applicantData);
    // gather params
    const { id } = useParams();
    // state objects initialization
    const [ user,  setUserData ] = useState(null);
    const [ lastProfileItem, setLastProfilePictureItemState ] = useState(null);

    useEffect(() => {
        // configuration for api-request
        const config = {
            params: {
                uniqueId: id
            }
        } 
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/core/anonymous/user/data`, config).then((res) => {
            if (res.data.message === "Successfully gathered core user information!") {
                console.log(res.data);

                const { user } = res.data;

                const generatedDefaultImage = {
                    id: uuid(),
                    systemDate: new Date(),
                    date: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                    link: "placeholder.png",
                    type: "image/png",
                    name: "placeholder.png",
                    dataType: "image"
                }

                if (typeof user.profilePicsVideos !== "undefined" && user.profilePicsVideos.length > 0) {
                    const reversedImagesVideos = user.profilePicsVideos.reverse();

                    for (let index = 0; index < reversedImagesVideos.length; index++) {
                        const imgOrVideo = reversedImagesVideos[index];
                        if (imgOrVideo.type.includes("image") && !imgOrVideo.type.includes("video")) {
                            // item is NOT a video - OK to display!
                            setLastProfilePictureItemState(imgOrVideo);
                            // set user general data state object
                            setUserData(user);
                            // break loop...
                            break;
                        }
                        // check if loop completed w/o finding an image
                        if ((reversedImagesVideos.length - 1) === index && (lastProfileItem === null)) {
                            setLastProfilePictureItemState(generatedDefaultImage);
                            setUserData(user);  
                        }
                    }
                } else {
                    setLastProfilePictureItemState(generatedDefaultImage);
                    setUserData(user);
                }
                
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const [activeTab, setActiveTab] = useState('1');

    const userNotEmpty = () => {    
        if (user !== null) {
            return true;
        } else {
            return false;
        }
    }
    const renderSkelatonLoading = () => {
        return (
            <Fragment>
                <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                    <p>
                        <Skeleton count={35} />
                    </p>
                </SkeletonTheme>
            </Fragment>
        );
    }
    const timelineProps = {
        lastProfileItem, 
        renderPictureOrVideoProfilePic, 
        calculateFileType, 
        applicantData,
        user
    }
    const aboutProps = {
        user,
        lastProfileItem,
        applicantData
    }
    const generalProps = {
        user,
        applicantData
    }
    const hireDesiredUserHacker = (onClose) => {
        console.log("hireDesiredUserHacker clicked!");
        
        const config = {
            applicantID: user.uniqueId,
            entireApplicantInfo: user,
            employerID: employerData.uniqueId,
            entireEmployerInfo: employerData,
            applicantData,
        };
        axios.post(`${process.env.REACT_APP_BASE_URL}/hired/applicant/listing/start/process`, config).then((res) => {
            if (res.data.message === "Successfully hired applicant for position/listing!") {
                console.log(res.data);

                setTimeout(() => {
                    history.push("/employer/view/hired/applicants/active");
                }, 4750);

                NotificationManager.success("Successfully HIRED this applicant, They have been added to your 'active jobs' and you will now be able to see this job there...", "Successfully HIRED applicant - Redirecting Momentarily!", 4750);
            } else {
                console.log("Err", res.data);

                NotificationManager.error("Critical error occurred while attempting to update database information and/or listing information, please try again & contact support if the problem persists...", "Error occurred while attempting to update data!", 4750);
            }
        }).catch((err) => {
            console.log(err);
        })

        onClose();
    }
    const handlePreClick = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Fragment>
                        <Card>
                            <CardHeader className="b-l-primary border-3 specific-edit-border-right">
                                <h3>Are you <strong>sure</strong> you'd like to <strong>hire</strong> this hacker?! If so, click "confirm & hire"...</h3>
                            </CardHeader>
                            <CardBody id="modal-button-showcase-cardbody" className="btn-group-showcase">
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <p className="button-group-text-above">If you're 95% confident in this hacker and you feel you can trust them to do the job appropriately and you've vetted them thouroughly, continue onwards with the process and click "Confirm & HIRE this hacker" to <strong>HIRE</strong> this applicant/hacker & the job will <strong>OFFICIALLY BEGIN!</strong></p>
                                    </Col>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <hr className="secondary-hr" />
                                        <div className="centered-button-container-custom-random">
                                            <ButtonGroup id="button-group-custom-secondary">
                                                <Button outline color="danger" onClick={onClose}>Cancel/Close</Button>
                                                <Button type={"submit"} outline color="success" onClick={() => {
                                                    hireDesiredUserHacker(onClose);
                                                }}>Confirm & HIRE this hacker!</Button>
                                            </ButtonGroup>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Fragment>
              );
            }
        });
    }
    return (
        <Fragment>
            <Breadcrumb parent="Submitted Applications" title="Application/Applicant details & information" />
            <Container fluid={true}>
                <div className="user-profile social-app-profile">
                    <Row>
                        <Col sm="12">
                            <Card className="hovercard text-center add-shadow-md-custom">
                                <div className="cardheader socialheader">
                                    <img src={userNotEmpty() && _.has(user, "profileBannerImage") ? `${process.env.REACT_APP_ASSET_LINK}/${user.profileBannerImage.link}` : require("../../../../../../../assets/images/placeholder.png")} className="stretch-and-cover-image" />
                                </div>
                                <div className="user-image">
                                    <div className="avatar">
                                        {userNotEmpty() ? renderPictureOrVideoProfilePic(lastProfileItem, false) : <Media body alt="user" src={require("../../../../../../../assets/images/placeholder.png")} />}
                                    </div>
                                    <ul className="share-icons">
                                        <li><a className="social-icon bg-primary" href={null}><i className="fa fa-smile-o"></i></a></li>
                                        <li><a className="social-icon bg-secondary" href={null}><i className="fa fa-wechat"></i></a></li>
                                        <li><a className="social-icon bg-warning" href={null}><i className="fa fa-share-alt"></i></a></li>
                                    </ul>
                                </div>
                                <div className="info market-tabs p-0">
                                    <Nav tabs className="border-tab tabs-scoial">
                                        {/* left tab */}
                                        <NavItem className="nav" id="myTab" role="tablist">
                                            <Button outline color={activeTab === '1' ? "info-2x" : "secondary-2x"} className={activeTab === '1' ? 'btn-pill-info customize-active-btn' : 'btn-pill-secondary'} onClick={() => setActiveTab('1')}>
                                                Main Information
                                            </Button>
                                        </NavItem>
                                        
                                        <NavItem style={{ paddingTop: "60px" }}>
                                            <div className="user-designation"></div>
                                            <h5 style={{ textDecorationLine: "underline" }} className="text-center">Applicant Info (<strong style={{ color: "#a927f9", textDecorationLine: "underline" }}>Username & Name</strong>)</h5>
                                            <div className="title"><a target="_blank" href={null}>{user !== null ? user.username : "Loading/Unknown..."}</a></div>
                                            <div className="desc mt-2">{user !== null ? `${user.firstName} ${user.lastName}` : "Loading/Unknown..."}</div>
                                        </NavItem>
                                        {/* right tab */}
                                        <NavItem className="nav" id="myTab" role="tablist">
                                            <Button outline color={activeTab === '2' ? "info-2x" : "secondary-2x"} className={activeTab === '2' ? 'customize-active-btn btn-pill-info' : 'btn-pill-secondary'} onClick={() => setActiveTab('2')}>
                                                More/About Infomation
                                            </Button>
                                        </NavItem>
                                    </Nav>
                                    <Button style={{ width: "75%" }} outline color={"success-2x"} className={'btn-square-success'} onClick={() => handlePreClick()}>
                                        HIRE This Applicant...
                                    </Button>
                                    <hr />
                                    {activeTab === '1' ? <Fragment>
                                        <hr />
                                        <h4 className={"active-subbed-left text-left"}>Active Tab (Currently-Selected)</h4>
                                    </Fragment> : null}
                                    {activeTab === '2' ? <Fragment>
                                        <hr />
                                        <h4 className={"active-subbed-right text-right"}>Active Tab (Currently-Selected)</h4>
                                    </Fragment> : null}
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <div id="absolute-bottom-right-hire-applicant-btn">
                        <div className="inner-fixed-right-wrapper">
                            <Row>
                                <p className="hire-text-custom">Are you ready to hire this "hacker" & confident in your trust with this user? If so, hack away!</p>
                            </Row>
                            <hr />
                            <Row>
                                <div className="centered-both-ways">
                                    <Button style={{ width: "95%" }} outline color={"info-2x"} className={"btn-square-info"} onClick={() => handlePreClick()}>
                                        HIRE Applicant/Hacker!
                                    </Button>
                                </div>
                            </Row>
                        </div>
                    </div>
                    {applicantData !== null ? <TabContent activeTab={activeTab} className="tab-content">
                        <TabPane tabId="1">
                            {userNotEmpty() ? <TimelineTab {...timelineProps} /> : renderSkelatonLoading()}
                        </TabPane>
                        <TabPane tabId="2">
                            {userNotEmpty() ? <AboutTab {...aboutProps} /> : renderSkelatonLoading()}
                        </TabPane>
                        <TabPane tabId="3">
                            {userNotEmpty() ? <FriendsTab {...generalProps} /> : renderSkelatonLoading()}
                        </TabPane>
                        <TabPane tabId="4">
                            {userNotEmpty() ? <PhotosTab {...generalProps} /> : renderSkelatonLoading()}
                        </TabPane>
                    </TabContent> : null}
                </div>
            </Container>
        </Fragment>
    );
};
const mapStateToProps = (state) => {
    return {
        employerData: state.auth.data
    }
}
export default connect(mapStateToProps, { })(withRouter(ManageApplicationIndividualHelper));