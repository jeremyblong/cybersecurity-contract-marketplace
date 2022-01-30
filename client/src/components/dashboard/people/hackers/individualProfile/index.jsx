import React, { Fragment, Component } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb'
import { Container, Row, Col, Card, Media, TabContent, TabPane, Nav, NavItem, NavLink, CardHeader } from 'reactstrap';
import TimelineTab from './timelineTab';
import AboutTab from './aboutTab';
import FriendsTab from './friendsTab';
import PhotosTab from './photosTab';
import axios from "axios";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { renderProfilePicVideo } from "./helpers/misc/index.js";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "./styles.css";

class ProfileHackerIndividualHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        activeTab: "1",
        user: null
    }
}
    componentDidMount() {
        const userID = this.props.match.params.id;

        console.log("userID params... :", userID);

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/hacker/profile/details`, {
            params: {
                userID
            }
        }).then((res) => {
            if (res.data.message === "Gathered user's data!") {
                console.log(res.data);

                const { user } = res.data;

                this.setState({
                    user
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
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
    render () {
        const { user } = this.state;
        return (
            <Fragment>
                <Breadcrumb parent="Profile's" title="Individual Hacker Profile" />
                <Container fluid={true}>
                    <div className="user-profile social-app-profile">
                        <Row>
                            <Col sm="12">
                                <Card className="hovercard text-center">
                                    <CardHeader className="cardheader socialheader" id="override-cardheader">
                                        {_.has(user, "profileBannerImage") ? <img src={`${process.env.REACT_APP_ASSET_LINK}/${user.profileBannerImage.link}`} id="banner-photo-cover-all" /> : <img src={require('../../../../../assets/images/banner/2.jpg')} id="banner-photo-cover-all" />}
                                    </CardHeader>
                                    <div className="user-image">
                                        <div className="avatar">
                                            {user !== null ? renderProfilePicVideo(user.profilePicsVideos) : <Media body alt="user" src={require("../../../../../assets/images/user/1.jpg")} />}
                                        </div>
                                        
                                        {/* <div className="icon-wrapper"><i className="icofont icofont-pencil-alt-5"></i></div> */}
                                        <ul className="share-icons">
                                            <li><a className="social-icon bg-primary" href={null}><i className="fa fa-smile-o"></i></a></li>
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
                                <TimelineTab user={user} />
                            </TabPane>
                            <TabPane tabId="2">
                                <AboutTab user={user}  />
                            </TabPane>
                            <TabPane tabId="3">
                                <FriendsTab user={user}  />
                            </TabPane>
                            <TabPane tabId="4">
                                <PhotosTab user={user}  />
                            </TabPane>
                        </TabContent>
                    </div>
                </Container>
            </Fragment>
        );
    }
};

export default withRouter(ProfileHackerIndividualHelper);