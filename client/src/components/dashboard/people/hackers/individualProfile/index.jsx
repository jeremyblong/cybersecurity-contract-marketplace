import React, { Fragment, Component } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb'
import { Container, Row, Col, Card, Media, TabContent, TabPane, Nav, NavItem, NavLink, CardHeader, Button } from 'reactstrap';
import TimelineTab from './timelineTab';
import AboutTab from './aboutTab';
import FriendsTab from './friendsTab';
import PhotosTab from './photosTab';
import axios from "axios";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { renderProfilePicVideo } from "./helpers/misc/index.js";
import { connect } from "react-redux";
import "./styles.css";
import NotificationManager from 'react-notifications/lib/NotificationManager';
import helpers from "./bars/helpers/rightBarHelperFunctions.js";
import { confirmAlert } from 'react-confirm-alert';

const { RenderGalleryModalHackerProfileHelper } = helpers;

class ProfileHackerIndividualHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        activeTab: "1",
        user: null,
        isOpen: false,
        currentlySelected: null,
        modalIndexSelected: 0
    }

    this.passedCustomGalleryRef = React.createRef(null);
}
    componentDidMount() {
        const userID = this.props.match.params.id;

        const { userData } = this.props;

        const apiRequestPromise = new Promise((resolve, reject) => {
    
            const configuration = {
                viewingHackerAccountID: userID,
                signedinUserID: userData.uniqueId,
                signedinLastProfileFile: typeof userData.profilePicsVideos !== "undefined" && userData.profilePicsVideos.length > 0 ? userData.profilePicsVideos[userData.profilePicsVideos.length - 1] : null,
                signedinUserNameFull: `${userData.firstName} ${userData.lastName}`,
                signedinMemberSince: userData.registrationDate,
                accountType: userData.accountType
            }
            axios.post(`${process.env.REACT_APP_BASE_URL}/update/hacker/view/account/details/new/view`, configuration).then((res) => {
                if (res.data.message === "Found user & modified/marked view in DB!") {
                    console.log(res.data);
    
                    const { result, modified } = res.data;

                    if (modified === true) {
                        resolve({
                            modified: true,
                            result
                        });
                    } else {
                        resolve({
                            modified: false,
                            result
                        });
                    }
                } else {
                    console.log("err", res.data);
                    
                    reject(res.data);
                }
            }).catch((err) => {
                console.log(err);

                reject(err);
            })
        })

        apiRequestPromise.then((passedData) => {
            console.log("passedData", passedData.modified, passedData.result);

            const configgg = {
                userID,
                result: passedData.result, 
                modified: passedData.modified,
                signedinUserID: userData.uniqueId
            }

            axios.post(`${process.env.REACT_APP_BASE_URL}/gather/hacker/profile/details`, configgg).then((res) => {
                if (res.data.message === "Gathered & updated the required data (IF applicable)...") {
                    console.log(res.data);
    
                    const { user, modified } = res.data;
    
                    if (modified === false) {
                        this.setState({
                            user
                        }, () => {
                            NotificationManager.info("You've ALREADY viewed this hacker's profile so we left the users profile data untouched - ONLY on first view will your information be documented and displayed...", "Already viewed this hacker's profile!", 4750);
                        })
                    } else {
                        this.setState({
                            user
                        })
                    }
                } else {
                    console.log("err", res.data);

                    NotificationManager.error("An unknown error occurred while attempting to fetch this user's data/information...", "Error occurred while fetching user's data!", 4750);
                }
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            NotificationManager.error("An error occurred while attempting to fetch this hacker's user profile data, please try reloading the page & contact support if this issue persists...", "Error gathering user's data!", 4500);
        })
    }
    renderConditionalNavigationalTabs = () => {
        const { activeTab, user } = this.state;
        if (user !== null) {
            return (
                <Fragment>
                    <Nav tabs className="border-tab tabs-scoial">
                        <NavItem className="nav" id="myTab" role="tablist">
                            <NavLink tag="a" href={null} className={activeTab === '1' ? 'active' : ''} onClick={() => {
                                this.setState({
                                    activeTab: "1"
                                })
                            }}>
                                Main/Core-Details
                        </NavLink>
                        </NavItem>
                        <NavItem className="nav" id="myTab" role="tablist">
                            <NavLink tag="a" href={null} className={activeTab === '2' ? 'active' : ''} onClick={() => {
                                this.setState({
                                    activeTab: "2"
                                })
                            }}>
                                Secondary Data
                        </NavLink>
                        </NavItem>
                        <NavItem>
                            <div className="user-designation"></div>
                            <div className={"core-top-hacker-profile-info"}>
                                <div className="title"><a target="_blank" href={null}>{`${user.firstName} ${user.lastName}`}</a></div>
                                <div className="desc mt-2 slightly-larger-desc-hacker-profile">Username: {user.username}</div>
                                <div className="desc mt-2">{user.accountType === "hackers" ? "Hacker Account" : "Employer/Hirer Account"}</div>
                            </div>
                        </NavItem>
                        <NavItem className="nav" id="myTab" role="tablist">
                            <NavLink tag="a" href={null} className={activeTab === '3' ? 'active' : ''} onClick={() => {
                                this.setState({
                                    activeTab: "3"
                                })
                            }}>
                                Following
                        </NavLink>
                        </NavItem>
                        <NavItem className="nav" id="myTab" role="tablist">
                            <NavLink tag="a" href={null} className={activeTab === '4' ? 'active' : ''} onClick={() => {
                                this.setState({
                                    activeTab: "4"
                                })
                            }}>
                                Followed By
                        </NavLink>
                        </NavItem>
                    </Nav>
                </Fragment>
            );
        } 
    }
    bookmarkThisHackerProfile = () => {
        console.log("bookmarkThisHackerProfile ran - heart this profile.");

        const userID = this.props.match.params.id;

        const { userData } = this.props;

        const config = {
            hackerID: userID,
            signedinUserID: userData.uniqueId,
            signedinUserAccountType: userData.accountType
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/bookmark/hacker/profile/either/account/type`, config).then((res) => {
            if (res.data.message === "Successfully 'hearted' this hacker's profile!") {
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
    handleOnlyProfileHeart = () => {
        const userID = this.props.match.params.id;

        const { userData } = this.props;

        const config = {
            hackerID: userID,
            signedinUserID: userData.uniqueId,
            signedinUserAccountType: userData.accountType,
            fullName: `${userData.firstName} ${userData.lastName}`
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/heart/profile/hacker/bookmark`, config).then((res) => {
            if (res.data.message === "Successfully 'reacted/hearted' this person's profile & the changes are now active and should reflect any additional responses appropriately!") {
                console.log("Successfully 'hearted' profile...:", res.data);

                const { activeHearts } = res.data;

                const userClone = {
                    ...this.state.user,
                    profileLovesHearts: activeHearts
                }

                this.setState({
                    user: userClone
                }, () => {
                    NotificationManager.success(res.data.message, "Successfully 'hearted/reacted' to this hacker's profile!", 4750);
                })

            } else if (res.data.message === "You've already 'hearted' or 'liked' this person's profile - We automatically 'un-like' a profile if you like it and have already responded with a like...") {
                console.log("You've already 'hearted' or 'liked' this person's profile...:", res.data);

                const { activeHearts } = res.data;

                const userClone = {
                    ...this.state.user,
                    profileLovesHearts: activeHearts
                }

                this.setState({
                    user: userClone
                }, () => {
                    NotificationManager.warning(res.data.message, "Already 'hearted' this user's profile - removed previous reaction!", 4750);
                })
            } else {
                console.log("err", res.data);

                NotificationManager.error("An unknown error occurred while attempting to 'react' to this person's profile, please try again or contact support if the problem persists...", "Error occurred - unknown.", 4750)
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    handleProfilePicVideoClickedMain = () => {
        console.log("handleProfilePicVideoClickedMain ran/clicked.");
    }
    onCloseModal = () => {
        this.setState({
            isOpen: false
        })
    }
    onOpenModal = () => {
        this.setState({
            isOpen: true
        })
    }
    setSelectedCurrently = (data) => {
        this.setState({
            currentlySelected: data
        })
    }
    setSelectedModalIndex = (data) => {
        this.setState({
            modalIndexSelected: data
        })
    }
    initiateFollowingOfHacker = () => {
        console.log("initiate following of hacker.");

        const userID = this.props.match.params.id;

        const { userData } = this.props;

        const { user } = this.state;

        // api-request configuration data
        const config = {
            hackerID: userID,
            signedinUserID: userData.uniqueId,
            signedinUserAccountType: userData.accountType,
            modifyingUserAccountType: user.accountType,
            signedinFullName: `${userData.firstName} ${userData.lastName}`,
            followerUsername: userData.username,
            followerJobTitle: _.has(userData, "title") ? userData.title : null
        };
        // run request api
        axios.post(`${process.env.REACT_APP_BASE_URL}/start/following/hacker/account`, config).then((res) => {
            if (res.data.message === "Successfully started following this hacker!") {
                console.log("successfully bookmarked profile...:", res.data);

                NotificationManager.success(`You've successfully STARTED FOLLOWING the user '${user.firstName} ${user.lastName}'. This user is a 'hacker/contractor', congrats on your new connection!`, 4750);

            } else if (res.data.message === "You've ALREADY followed this user's profile...") {
                console.log("already bookmarked - do nothing...:", res.data);

                NotificationManager.warning(`You've ALREADY followed ${user.firstName} ${user.lastName}, NO ACTION was taken as we require user's to manage their following/followed user's from the following management page.`, `You're already following the hacker '${user.firstName} ${user.lastName}'!`, 4750);
            } else {
                console.log("err", res.data);

                NotificationManager.error("An unknown error has occurred while attempting to follow this user and/or make these changes...", "Error occurred while making changes!", 4750);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    startFollowingThisHacker = () => {
        console.log("startFollowingThisHacker start following this hacker....");

        confirmAlert({
            title: `You're about to start following this user...`,
            message: `Are you sure you'd like to start "following" this user? Once you follow someone, if you wish to "un-follow" them then you'll have to go to your "manage follower's" page & you can unfollow from there. This user will recieve a notification telling them about their new follower!`,
            buttons: [
              {
                label: 'Yes, Follow this user!',
                onClick: () => {
                    // START FOLLOWING HACKER
                    this.initiateFollowingOfHacker();
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
    render () {
        const { user, currentlySelected, isOpen, modalIndexSelected } = this.state;
        const { userData } = this.props;
        return (
            <Fragment>
                <Breadcrumb parent="Profile's" title="Individual Hacker Profile" />
                {user !== null ? <RenderGalleryModalHackerProfileHelper passedCustomGalleryRef={this.passedCustomGalleryRef} setSelectedCurrently={this.setSelectedCurrently} currentlySelected={currentlySelected} userData={userData} modalIndexSelected={modalIndexSelected} setSelectedModalIndex={this.setSelectedModalIndex} onCloseModal={this.onCloseModal} isOpen={isOpen} user={user} /> : null}
                <Container fluid={true}>
                    <div className="user-profile social-app-profile">
                        <Row>
                            <Col sm="12">
                                <Card className="hovercard text-center ribbon-wrapper-right">
                                    <CardHeader className="cardheader socialheader" id="override-cardheader">
                                        <div className={"absolute-banner-hacker-account-positioned"}>
                                            <Button onClick={this.startFollowingThisHacker} style={{ marginTop: "7.5px" }} color={"secondary"} className="btn-square-secondary text-center"><i className="fa fa-follow m-r-5"></i>Start "Following" This Hacker</Button>
                                        </div>
                                        <div onClick={this.bookmarkThisHackerProfile} className="ribbon ribbon-clip-right ribbon-right ribbon-info custom-hacker-profile-ribbon"><i className="fa fa-heart"></i> Bookmark This Profile?</div>
                                        {_.has(user, "profileBannerImage") ? <img src={`${process.env.REACT_APP_ASSET_LINK}/${user.profileBannerImage.link}`} id="banner-photo-cover-all" /> : <img src={require('../../../../../assets/images/banner/2.jpg')} id="banner-photo-cover-all" />}
                                    </CardHeader>
                                    <div className="user-image">
                                        <div onClick={() => this.handleProfilePicVideoClickedMain()} className="avatar">
                                            {user !== null ? renderProfilePicVideo(user.profilePicsVideos) : <Media body alt="user" src={require("../../../../../assets/images/user/1.jpg")} />}
                                        </div>
                                        
                                        {/* <div className="icon-wrapper"><i className="icofont icofont-pencil-alt-5"></i></div> */}
                                        <ul className="share-icons">
                                            <li onClick={this.handleOnlyProfileHeart}><a className="social-icon bg-primary" href={null}><i className="fa fa-heart"></i></a></li>
                                            <li><a className="social-icon bg-secondary" href={null}><i className="fa fa-wechat"></i></a></li>
                                            <li><a className="social-icon bg-warning" href={null}><i className="fa fa-share-alt"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="info market-tabs p-0">
                                        {this.renderConditionalNavigationalTabs()}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <TabContent activeTab={this.state.activeTab} className="tab-content">
                            <TabPane tabId="1">
                                <TimelineTab setSelectedCurrently={this.setSelectedCurrently} currentlySelected={currentlySelected} modalIndexSelected={modalIndexSelected} setSelectedModalIndex={this.setSelectedModalIndex} user={user} onOpenModal={this.onOpenModal} isOpen={this.state.isOpen} onCloseModal={this.onCloseModal} />
                            </TabPane>
                            <TabPane tabId="2">
                                <AboutTab setSelectedCurrently={this.setSelectedCurrently} currentlySelected={currentlySelected} modalIndexSelected={modalIndexSelected} setSelectedModalIndex={this.setSelectedModalIndex} user={user} onOpenModal={this.onOpenModal} isOpen={this.state.isOpen} onCloseModal={this.onCloseModal} />
                            </TabPane>
                            <TabPane tabId="3">
                                <FriendsTab user={user} onOpenModal={this.onOpenModal} isOpen={this.state.isOpen} onCloseModal={this.onCloseModal} />
                            </TabPane>
                            <TabPane tabId="4">
                                <PhotosTab user={user} onOpenModal={this.onOpenModal} isOpen={this.state.isOpen} onCloseModal={this.onCloseModal} />
                            </TabPane>
                        </TabContent>
                    </div>
                </Container>
            </Fragment>
        );
    }
};
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {})(withRouter(ProfileHackerIndividualHelper));