import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../../../../../../layout/breadcrumb'
import { Container, Row, Col, Card, Media, TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap';
import TimelineTab from './helpers/timelineTab.js';
import AboutTab from './helpers/aboutTab.js';
import FriendsTab from './helpers/friendsTab.js';
import PhotosTab from './helpers/photosTab.js';
import { Timline, Friends, About, Photos } from "../../../../../../../constant";
import { useParams, withRouter } from 'react-router-dom';
import axios from 'axios';
import helpers from "./helpers/functions/helperFunctions.js";
import "./styles.css";
import _ from "lodash";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from "react-router-dom";
import uuid from "react-uuid";
import moment from "moment";

const { renderPictureOrVideoProfilePic, calculateFileType } = helpers;

const ManageApplicationIndividualHelper = ({ location }) => {

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

        // window.onpopstate = () => {
        //     console.log("ONPOPSTATE ran...!");
        // }

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

export default withRouter(ManageApplicationIndividualHelper);