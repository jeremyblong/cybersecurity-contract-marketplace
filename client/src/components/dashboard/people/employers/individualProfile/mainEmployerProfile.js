import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, Media, TabContent, TabPane, Nav, NavItem, NavLink, Button } from "reactstrap";
import Breadcrumb from '../../../../../layout/breadcrumb';
import "./styles.css";
import { useParams, useHistory } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import axios from "axios";
import TimelineTabEmployerProfileHelper from './helpers/timelineTab.js';
import AboutGeneralInfoHelper from './helpers/aboutTab.js';
import FollowingEmployerAccountHelper from './helpers/following.js';
import CurrentlyFollowedByEmployerAccount from './helpers/followedBy.js';
import _ from "lodash";
import helpers from "./helpers/miscFunctions/helperFunctions.js";
import { NotificationManager } from "react-notifications";
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';
import MessagingPanePrivateEmployerHelper from "./helpers/panes/messagingPane/messagePane.js";
import VideoInvitePaneInviteEmployerHelper from "./helpers/panes/videoInvitePane/videoInvite.js";


const { renderProfilePicVideo } = helpers;

const MainEmployerProfileDisplayHelper = ({ userData }) => {

    const history = useHistory();

    const [ activeTab, setActiveTab ] = useState('1');

    const [ employerData, setEmployerData ] = useState(null);
    const [ activeHearts, setActiveHears ] = useState([]);
    const [ room, setRoom ] = useState(null);
    const [ messagingPaneOpen, setMessagePaneState ] = useState(false);
    const [ videoInterviewPane, setVideoInterviewStartPane ] = useState(false);


    const useIsMounted = () => {
        // create ref
        const isMounted = useRef(false);
        // run mounting logic..
        useEffect(() => {
          isMounted.current = true;
          return () => isMounted.current = false;
        }, []);
      
        return isMounted;
    }

    const isMounted = useIsMounted();

    const { id } = useParams();

    useEffect(() => {

        if (isMounted.current === true) {
            const configuration = {
                signedinUserID: userData.uniqueId, 
                viewingEmployerAccountID: id, 
                signedinLastProfileFile: typeof userData.profilePicsVideos !== "undefined" && userData.profilePicsVideos.length > 0 ? userData.profilePicsVideos[userData.profilePicsVideos.length - 1] : null, 
                signedinUserNameFull: `${userData.firstName} ${userData.lastName}`, 
                signedinMemberSince: userData.registrationDate,
                accountType: userData.accountType
            }
            axios.post(`${process.env.REACT_APP_BASE_URL}/mark/profile/view/employer/account`, configuration).then((res) => {
                if (res.data.message === "Found user & modified/marked view in DB!") {
                    console.log(res.data);
    
                    const { result, modified } = res.data;
    
                    NotificationManager.success("Successfully marked your page/profile view as a 'unique' view! Whenver you view this page again, the count will NOT increase - it will remain as it was with a MAXIMUM 1 unique page view per user.", "Successfully marked profile view!", 4750);
    
                } else {
                    console.log("errr inside...:", res.data);
    
                    NotificationManager.error("An unknown error has occurred, please try this action again or contact support if the problem still persists over multiple attempts!", "An unknown error has occurred while attempting to 'heart' this profile!", 4750);
                }
            }).catch((err) => {
                console.log(err);
    
                NotificationManager.error("An unknown error has occurred, please try this action again or contact support if the problem still persists over multiple attempts!", "An unknown error has occurred while attempting to 'heart' this profile!", 4750);
            })
        }
    }, [])

    useEffect(() => {

        if (isMounted.current === true) {
            const configuration = {
                params: {
                    uniqueId: id
                }
            }
            axios.get(`${process.env.REACT_APP_BASE_URL}/retrieve/related/employer/core/information`, configuration).then((res) => {
                if (res.data.message === "Gathered relevant information!") {
                    console.log(res.data);

                    const { user } = res.data;

                    setActiveHears(_.has(user, "profileLovesHearts") ? user.profileLovesHearts : []);

                    setEmployerData(user);
                } else {
                    console.log("errr inside...:", res.data);

                    NotificationManager.error("An unknown error has occurred, please try this action again or contact support if the problem still persists over multiple attempts!", "An unknown error has occurred while attempting to 'heart' this profile!", 4750);
                }
            }).catch((err) => {
                console.log(err);

                NotificationManager.error("An unknown error has occurred, please try this action again or contact support if the problem still persists over multiple attempts!", "An unknown error has occurred while attempting to 'heart' this profile!", 4750);
            })
        }
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

    const initiateFollowingOfEmployer = () => {
        console.log("initiate following of Employer.");

        // api-request configuration data
        const config = {
            employerID: id,
            signedinUserID: userData.uniqueId,
            signedinUserAccountType: userData.accountType,
            modifyingUserAccountType: employerData.accountType,
            signedinFullName: `${userData.firstName} ${userData.lastName}`,
            followerUsername: userData.username,
            followerJobTitle: _.has(userData, "title") ? userData.title : null,
            latestProfilePicVideo: typeof userData.profilePicsVideos !== "undefined" && userData.profilePicsVideos.length > 0 ? userData.profilePicsVideos[userData.profilePicsVideos.length - 1] : null
        };
        // run request api
        axios.post(`${process.env.REACT_APP_BASE_URL}/start/following/employer/account`, config).then((res) => {
            if (res.data.message === "Successfully started following this employer!") {
                console.log("successfully followed employer profile...:", res.data);

                const { employer } = res.data;

                setEmployerData(employer);

                NotificationManager.success(`You've successfully STARTED FOLLOWING the user '${employerData.firstName} ${employerData.lastName}'. This user is a 'employer/contractor', congrats on your new connection!`, 4750);

            } else if (res.data.message === "You've ALREADY followed this user's profile...") {
                console.log("already bookmarked - do nothing...:", res.data);

                const { employer } = res.data;

                setEmployerData(employer);

                NotificationManager.warning(`You've ALREADY followed ${employerData.firstName} ${employerData.lastName}, NO ACTION was taken as we require user's to manage their following/followed user's from the following management page.`, `You're already following the employer '${employerData.firstName} ${employerData.lastName}'!`, 4750);
            } else {
                console.log("err", res.data);

                NotificationManager.error("An unknown error has occurred while attempting to follow this user and/or make these changes...", "Error occurred while making changes!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("An unknown error has occurred while attempting to follow this user and/or make these changes...", "Error occurred while making changes!", 4750);
        })
    }

    const bookmarkThisEmployerProfile = () => {
        console.log("bookmarkThisEmployerProfile ran - heart this profile.");

        const config = {
            employerID: id,
            signedinUserID: userData.uniqueId,
            signedinUserAccountType: userData.accountType
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/bookmark/employer/profile/either/account/type`, config).then((res) => {
            if (res.data.message === "Successfully 'bookmarked' this employers's profile!") {
                console.log("successfully bookmarked profile...:", res.data);

                NotificationManager.success("You've successfully bookmarked this user's profile and it will now show up in your 'Bookmarked Profile's' page...", "Successfully bookmarked this profile!", 4750);

            } else if (res.data.message === "You've ALREADY bookmarked this user's profile...") {
                console.log("already bookmarked - do nothing...:", res.data);

                NotificationManager.warning("You've ALREADY bookmarked this user's profile & it is already in your 'Bookmarked Profile's' page/list...", "Already bookmarked this user's profile!", 4750);
            } else {
                console.log("err", res.data);

                NotificationManager.error("An unknown error has occurred while attempting to bookmark and/or make these changes...", "Error occurred while making changes!", 4750);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const startFollowingThisEmployer = () => {
        console.log("startFollowingThisEmployer start following this Employer....");

        confirmAlert({
            title: `You're about to start following this user...`,
            message: `Are you sure you'd like to start "following" this user? Once you follow someone, if you wish to "un-follow" them then you'll have to go to your "manage follower's" page & you can unfollow from there. This user will recieve a notification telling them about their new follower!`,
            buttons: [
              {
                label: 'Yes, Follow this user!',
                onClick: () => {
                    // START FOLLOWING Employer
                    initiateFollowingOfEmployer();
                }
              },
              {
                label: 'No, Cancel!',
                onClick: () => {
                    // DO NOTHING.
                }
              }
            ]
        });
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
                                        <div style={{ paddingTop: "22.5px" }} className={"absolute-banner-hacker-account-positioned"}>
                                            <Button onClick={startFollowingThisEmployer} style={{ marginTop: "7.5px" }} color={"secondary"} className="btn-square-secondary text-center"><i className="fa fa-follow m-r-5"></i>Start "Following" This Employer</Button>
                                        </div>
                                        <div onClick={bookmarkThisEmployerProfile} className="ribbon ribbon-clip-right ribbon-right ribbon-info custom-employer-profile-ribbon"><i className="fa fa-heart"></i> Bookmark This Profile?</div>
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
                                                    <Button style={{ minWidth: "100%", color: "#f73164" }} onClick={() => setActiveTab('1')} className={"btn-square-dark hover-btn-employer-custom"} color={"dark-2x"} outline>Timeline/Core-Data</Button>
                                            </NavLink>
                                            </NavItem>
                                            <NavItem className="nav" id="myTab" role="tablist">
                                                <NavLink id={"position-above"} className={activeTab === '2' ? 'active' : ''}>
                                                    <Button style={{ minWidth: "100%", color: "#f73164" }} onClick={() => setActiveTab('2')} className={"btn-square-dark hover-btn-employer-custom"} color={"dark-2x"} outline>About</Button>
                                            </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <div className="user-designation"></div>
                                                <div className="title"><a target="_blank">{`${employerData.firstName} ${employerData.lastName}`}</a></div>
                                                <div className="desc mt-2">{_.has(employerData, "companyName") ? employerData.companyName : "No Company Name Provided"}</div>
                                            </NavItem>
                                            <NavItem className="nav" id="myTab" role="tablist">
                                                <NavLink id={"position-above"} className={activeTab === '3' ? 'active' : ''}>
                                                    <Button style={{ minWidth: "100%", color: "#f73164" }} onClick={() => setActiveTab('3')} className={"btn-square-dark hover-btn-employer-custom"} color={"dark-2x"} outline>Following/Followed</Button>
                                            </NavLink>
                                            </NavItem>
                                            <NavItem className="nav" id="myTab" role="tablist">
                                                <NavLink id={"position-above"} className={activeTab === '4' ? 'active' : ''}>
                                                    <Button style={{ minWidth: "100%", color: "#f73164" }} onClick={() => setActiveTab("4")} className={"btn-square-dark hover-btn-employer-custom"} color={"dark-2x"} outline>Followed-By</Button>
                                            </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                    <div style={{ paddingTop: "7.5px" }} className='position-just-above'>
                                        <Row>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <div className='centered-both-ways'>
                                                    <Button onClick={() => setMessagePaneState(true)} className='btn-square-dark absolute-message-btn hover-btn-employer-custom' color='dark-2x' outline style={{ width: "97.5%", color: "#f73164" }}>Message This User!</Button>
                                                </div>
                                            </Col>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <div className='centered-both-ways'>
                                                    <Button className='btn-square-dark absolute-message-btn hover-btn-employer-custom' onClick={() => setVideoInterviewStartPane(true)} color='dark-2x' outline style={{ width: "97.5%", color: "#f73164" }}>Invite/Initialize Video Chat With User!</Button>
                                                </div>
                                            </Col>
                                        </Row>
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
                                <FollowingEmployerAccountHelper employerData={employerData} />
                            </TabPane>
                            <TabPane tabId="4">
                                <CurrentlyFollowedByEmployerAccount employerData={employerData} />
                            </TabPane>
                        </TabContent>
                    </div>
                </Container>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <VideoInvitePaneInviteEmployerHelper otherUserID={id} employerData={employerData} userData={userData} videoInterviewPane={videoInterviewPane} setVideoInterviewStartPane={setVideoInterviewStartPane} />
            <MessagingPanePrivateEmployerHelper employerID={id} employerName={employerData !== null ? `${employerData.firstName} ${employerData.lastName}` : "Unknown - Loading..."} messagePaneOpen={messagingPaneOpen} setMessagePaneState={setMessagePaneState} />
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