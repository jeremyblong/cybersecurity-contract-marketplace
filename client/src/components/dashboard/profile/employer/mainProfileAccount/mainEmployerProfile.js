import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, Media, TabContent, TabPane, Nav, NavItem, NavLink, Button } from "reactstrap";
import Breadcrumb from '../../../../../layout/breadcrumb';
import "./styles.css";
import { useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import axios from "axios";
import TimelineTabEmployerProfileHelper from './helpers/timelineTab.js';
import AboutGeneralInfoHelper from './helpers/aboutTab.js';
import FriendsTabEmployerProfileHelper from './helpers/friendsTab.js';
import PhotosTab from './helpers/photosTab.js';
import _ from "lodash";
import helpers from "./helpers/miscFunctions/helperFunctions.js";
import { NotificationManager } from "react-notifications";
import { connect } from "react-redux";

const { renderProfilePicVideo } = helpers;

const MainEmployerProfileDisplayHelper = ({ userData }) => {

    const [ activeTab, setActiveTab ] = useState('1');

    const [ employerData, setEmployerData ] = useState(null);
    const [ activeHearts, setActiveHears ] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const configuration = {
            params: {
                uniqueId: id
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/retrieve/related/employer/core/information`, configuration).then((res) => {
            if (res.data.message === "Gathered relevant information!") {
                console.log(res.data);

                const { user } = res.data;

                setEmployerData(user);
            } else {
                console.log("errr inside...:", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const heartResponseProfile = () => {
        console.log("heartResponseProfile");

        const configuration = {
            employerID: id,
            signedinUserID: userData.uniqueId,
            signedinUserAccountType: userData.accountType,
            fullName: `${userData.firstName} ${userData.lastName}`
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/heart/profile/employer/account`, configuration).then((res) => {
            if (res.data.message === "You've already 'hearted' or 'liked' this person's profile - We automatically 'un-like' a profile if you like it and have already responded with a like...") {
                console.log(res.data);

                const { activeHearts } = res.data;

                setActiveHears(activeHearts);

                NotificationManager.info("You've already reacted to this person's employer profile, we automatically 'unlike' a profile if you've already previously liked it before!", "Already liked, revoked your previous like!", 4750);

            } else if (res.data.message === "Successfully 'reacted/hearted' this person's profile & the changes are now active and should reflect any additional responses appropriately!") {

                const { activeHearts } = res.data;

                setActiveHears(activeHearts);

                NotificationManager.success("Successfully 'reacted/hearted' this person's profile & the changes are now active and should reflect any additional responses appropriately!", "Successfully liked/responded to this employer account!", 4750);

            } else {
                console.log("errr inside...:", res.data);

                NotificationManager.error("An unknown error has occurred, please try this action again or contact support if the problem still persists over multiple attempts!", "An unknown error has occurred while attempting to 'heart' this profile!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("An unknown error has occurred, please try this action again or contact support if the problem still persists over multiple attempts!", "An unknown error has occurred while attempting to 'heart' this profile!", 4750);
        })
    }

    const renderContentMain = () => {
        return (
            <Fragment>
                <Container fluid={true}>
                    <div className="user-profile social-app-profile">
                        <Row>
                            <Col sm="12">
                                <Card style={{ paddingTop: "27.5px" }} className="hovercard text-center custom-maxed-employer-card">
                                    <div className="cardheader socialheader">
                                        {_.has(employerData, "profileBannerImage") ? <img src={`${process.env.REACT_APP_ASSET_LINK}/${employerData.profileBannerImage.link}`} className={"stretch-banner-profile-picture"} /> : null}
                                    </div>
                                    <div className="user-image">
                                        <div className="avatar">
                                            {renderProfilePicVideo(_.has(employerData, "profilePicsVideos") && typeof employerData.profilePicsVideos !== "undefined" && employerData.profilePicsVideos.length > 0 ? employerData.profilePicsVideos[employerData.profilePicsVideos.length - 1] : null)}
                                        </div>
                                        <ul className="share-icons">
                                            <li><a onClick={() => heartResponseProfile()} className="social-icon bg-primary"><i className="fa fa-heart-o"></i></a></li>
                                            <li><a className="social-icon bg-secondary"><i className="fa fa-wechat"></i></a></li>
                                            <li><a className="social-icon bg-warning"><i className="fa fa-share-alt"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="info market-tabs p-0 maxed-nav-wrapper-employer-profile">
                                        <Nav tabs className="border-tab tabs-scoial custom-tabs-maxed">
                                            <NavItem className="nav" id="myTab" role="tablist">
                                                <NavLink id={"position-above"} className={activeTab === '1' ? 'active' : ''}>
                                                    <Button style={{ minWidth: "100%" }} onClick={() => setActiveTab('1')} className={"btn-square-primary"} color={"primary-2x"} outline>Timeline/Core-Data</Button>
                                            </NavLink>
                                            </NavItem>
                                            <NavItem className="nav" id="myTab" role="tablist">
                                                <NavLink id={"position-above"} className={activeTab === '2' ? 'active' : ''}>
                                                    <Button style={{ minWidth: "100%" }} onClick={() => setActiveTab('2')} className={"btn-square-secondary"} color={"secondary-2x"} outline>About</Button>
                                            </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <div className="user-designation"></div>
                                                <div className="title"><a target="_blank">{`${employerData.firstName} ${employerData.lastName}`}</a></div>
                                                <div className="desc mt-2">{_.has(employerData, "companyName") ? employerData.companyName : "No Company Name Provided"}</div>
                                            </NavItem>
                                            <NavItem className="nav" id="myTab" role="tablist">
                                                <NavLink id={"position-above"} className={activeTab === '3' ? 'active' : ''}>
                                                    <Button style={{ minWidth: "100%" }} onClick={() => setActiveTab('3')} className={"btn-square-success"} color={"success-2x"} outline>Following/Followed</Button>
                                            </NavLink>
                                            </NavItem>
                                            <NavItem className="nav" id="myTab" role="tablist">
                                                <NavLink id={"position-above"} className={activeTab === '4' ? 'active' : ''}>
                                                    <Button style={{ minWidth: "100%" }} onClick={() => setActiveTab("4")} className={"btn-square-info"} color={"info-2x"} outline>Photo's</Button>
                                            </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <TabContent activeTab={activeTab} className="tab-content">
                            <TabPane tabId="1">
                                <TimelineTabEmployerProfileHelper activeHearts={activeHearts} employerData={employerData} />
                            </TabPane>
                            <TabPane tabId="2">
                                <AboutGeneralInfoHelper activeHearts={activeHearts} employerData={employerData} />
                            </TabPane>
                            <TabPane tabId="3">
                                <FriendsTabEmployerProfileHelper employerData={employerData} />
                            </TabPane>
                            <TabPane tabId="4">
                                <PhotosTab employerData={employerData} />
                            </TabPane>
                        </TabContent>
                    </div>
                </Container>
            </Fragment>
        );
    }

    return (
        <Fragment>
           <Breadcrumb parent="Viewing Individual Employer Profile Page" title="You're Now Viewing This Employer's Profile Information/Data" />
            <Container fluid={true}>
                <Row>
                    <Card className='b-l-info b-r-info shadow-wrapper-overview-profile-employer'>
                        {employerData !== null ? renderContentMain() : <Fragment>
                            <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                <p>
                                    <Skeleton count={50} />
                                </p>
                            </SkeletonTheme>
                        </Fragment>}
                    </Card>
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
export default connect(mapStateToProps, {  })(MainEmployerProfileDisplayHelper);