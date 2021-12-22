import React, { Fragment, Component } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb'
import { Container, Row, Col, Card, Media, TabContent, TabPane, Nav, NavItem, NavLink, CardHeader } from 'reactstrap';
import TimelineTab from './timelineTab';
import AboutTab from './aboutTab';
import FriendsTab from './friendsTab';
import PhotosTab from './photosTab';
import {Timline,Friends,About,Photos,GeneralManager} from "../../../../../constant";
import axios from "axios";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { renderProfilePicVideo } from "./helpers/misc/index.js";

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
    render () {
        const { activeTab, user } = this.state;
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
                                            <li><a className="social-icon bg-primary" href="#javascripts"><i className="fa fa-smile-o"></i></a></li>
                                            <li><a className="social-icon bg-secondary" href="#javascripts"><i className="fa fa-wechat"></i></a></li>
                                            <li><a className="social-icon bg-warning" href="#javascripts"><i className="fa fa-share-alt"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="info market-tabs p-0">
                                        <Nav tabs className="border-tab tabs-scoial">
                                            <NavItem className="nav" id="myTab" role="tablist">
                                                <NavLink tag="a" href="#javascript" className={activeTab === '1' ? 'active' : ''} onClick={() => {
                                                    this.setState({
                                                        activeTab: "1"
                                                    })
                                                }}>
                                                    {Timline}
                                            </NavLink>
                                            </NavItem>
                                            <NavItem className="nav" id="myTab" role="tablist">
                                                <NavLink tag="a" href="#javascript" className={activeTab === '2' ? 'active' : ''} onClick={() => {
                                                    this.setState({
                                                        activeTab: "2"
                                                    })
                                                }}>
                                                    {About}
                                            </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <div className="user-designation"></div>
                                                <div className="title"><a target="_blank" href="#javascripts">{"ElANA"}</a></div>
                                                <div className="desc mt-2">{GeneralManager}</div>
                                            </NavItem>
                                            <NavItem className="nav" id="myTab" role="tablist">
                                                <NavLink tag="a" href="#javascript" className={activeTab === '3' ? 'active' : ''} onClick={() => {
                                                    this.setState({
                                                        activeTab: "3"
                                                    })
                                                }}>
                                                    {Friends}
                                            </NavLink>
                                            </NavItem>
                                            <NavItem className="nav" id="myTab" role="tablist">
                                                <NavLink tag="a" href="#javascript" className={activeTab === '4' ? 'active' : ''} onClick={() => {
                                                    this.setState({
                                                        activeTab: "4"
                                                    })
                                                }}>
                                                    {Photos}
                                            </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <TabContent activeTab={this.state.activeTab} className="tab-content">
                            <TabPane tabId="1">
                                <TimelineTab />
                            </TabPane>
                            <TabPane tabId="2">
                                <AboutTab />
                            </TabPane>
                            <TabPane tabId="3">
                                <FriendsTab />
                            </TabPane>
                            <TabPane tabId="4">
                                <PhotosTab />
                            </TabPane>
                        </TabContent>
                    </div>
                </Container>
            </Fragment>
        );
    }
};

export default withRouter(ProfileHackerIndividualHelper);