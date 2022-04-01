import React, { Fragment, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Card, CardBody, ListGroupItem, Label } from 'reactstrap';
import { Aperture } from 'react-feather';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "../../styles.css";
import moment from "moment";
import _ from "lodash";
import ReactPlayer from 'react-player';

const TabsetIndividualLiveListingHelper = ({ passedData, ready, user }) => {
    const [activeTab, setActiveTab] = useState('1');

    console.log("user", user);

    const randomDate = (start, end) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    const notSpecified = "Not Specified.";
    return (
        <Fragment>
            <Card id="tabbed-card-listing-individual">
                <Row className="product-page-main m-0">
                    <Col sm="12">
                    <Nav tabs className="border-tab">
                        <NavItem  id="myTab" role="tablist">
                            <NavLink href={null}  className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                                Recent Bids, Tags & Demo Video
                            </NavLink>
                            <div className="material-border"></div>
                        </NavItem>
                        <NavItem  id="myTab" role="tablist">
                            <NavLink href={null} className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                                {"Poster/User Information"}
                            </NavLink>
                            <div className="material-border"></div>
                        </NavItem>
                    </Nav>
                    <TabContent id="my-tabbed-content-listing" activeTab={activeTab}>
                        <TabPane className={"custom-tab-pane"} tabId="1">
                            {ready === true ? <Row>
                                <Col md="4" sm="12" lg="4" xl="4">
                                    <div className="filter-block">
                                        <h4>{"Hashtags/Relevant-Tags (Searchable)"}</h4>
                                            <div className="float-left-all-content">
                                                {passedData.hashtags ? passedData.hashtags.map((tag, index) => {
                                                    return <span key={index} className="badge badge-secondary pull-right digits custom-badge-outline-not-included">{tag.text}</span>;
                                                }) : null}
                                            </div>
                                    </div>
                                    <Col className="adjust-top-margin" md="12" sm="12" lg="12" xl="12">
                                        <Label style={{ marginTop: "27.5px" }} className="custom-label-view">'About Me' (about the poster) section</Label>
                                        <p className="aboutme-other-user-bio">{_.has(user, "aboutMe") ? user.aboutMe : "None Provided."}</p>
                                    </Col>
                                </Col>
                                {passedData.auctionPurchaseType.includes("auction") ? <Col md="4" sm="12" lg="4" xl="4">
                                    <div className="filter-block">
                                        <h4>{"Most Recent Bids"}</h4>
                                            <div className="most-recent-bids-list">
                                                <Card>
                                                    <CardBody> {/* passedData.bids */}
                                                        {new Array(3).fill("").map((bid, index) => {
                                                            const random10000 = (Math.floor(Math.random() * 10000) + 1);
                                                            const randomlyGeneratedDate = moment(randomDate(new Date(2021, 0, 1), new Date())).fromNow();
                                                            return (
                                                                <Fragment>
                                                                    <ListGroupItem className="list-group-item-action flex-column align-items-start" >
                                                                        <div className="d-flex w-100 justify-content-between">
                                                                        <h5 className="mb-1">{`Bid placed for approximately $${random10000.toFixed(2)}`}</h5><small className="text-muted red-text-secondary">{`Bid ${randomlyGeneratedDate}`}</small>
                                                                        </div>
                                                                        <p className="mb-1">{`(User's Username goes here) place a bid for $${random10000.toFixed(2)}(USD) about ${randomlyGeneratedDate}...`}</p>
                                                                        <small className={index === 2 ? "text-muted red-text-secondary" : "text-muted"}>{index === 2 ? "Highest Current Bid Standing!" : "NOT a winning bid."}</small>
                                                                    </ListGroupItem>
                                                                </Fragment>
                                                            );
                                                        })}
                                                    </CardBody>
                                                </Card>
                                            </div>
                                    </div>
                                </Col> : null}
                                <Col md="4" sm="12" lg="4" xl="4">
                                    <div className="filter-block">
                                        <h4>{"Video Demo/Preview (if applicable)"}</h4>
                                            <div className="video-preview-container-wrapper">
                                                {_.has(passedData, "videoDemoFile") ? <Fragment>
                                                    <ReactPlayer controls={true} playIcon={true} playing={false} loop={false} volume={1} width={"100%"} height={"100%"} url={`${process.env.REACT_APP_ASSET_LINK}/${passedData.videoDemoFile.link}`} />
                                                </Fragment> : <Fragment>
                                                    <Label className="custom-label-view">This listing does <strong>NOT</strong> have a "video demo" linked or assigned to it.</Label>
                                                    <img src={require("../../../../../../../../assets/images/placeholder.png")} className="preview-image-thumbnail-individual-listing" />
                                                </Fragment>}
                                            </div>
                                    </div>
                                </Col>
                            </Row> : null}
                        </TabPane>
                        <TabPane className={"custom-tab-pane"} tabId="2">
                            {ready === true ? <Card id="card-custom-one-left">
                                <CardBody>
                                    <div id="force-custom-row">
                                        <Col md="4" sm="12" lg="4" xl="4">
                                            <div className="collection-filter-block">
                                                <ul>
                                                <li>
                                                    <div className="media"><Aperture/>
                                                    <div className="media-body">
                                                        <h5 className="color-purple-red">{_.has(user, "yearsOfExperience") ? `${user.yearsOfExperience.value} years of total CS experience` : notSpecified}</h5>
                                                    </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="media"><Aperture/>
                                                    <div className="media-body">
                                                        <h5 className="color-purple-red">{"Username"}</h5>
                                                        <p>{_.has(user, "username") ? user.username : "None Provided."}</p>
                                                    </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="media"><Aperture/>
                                                    <div className="media-body">
                                                        <h5 className="color-purple-red">{"Age"}</h5>
                                                        <p>{_.has(user, "birthdate") ? moment(user.birthdate).fromNow(true) + "old" : notSpecified}</p>
                                                    </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="media"><Aperture/>
                                                    <div className="media-body">
                                                        <h5 className="color-purple-red">{"Successfully Completed Gigs/Jobs"}</h5>
                                                        <p>{_.has(user, "completedJobs") ? `${user.completedJobs} completed jobs/gigs` : notSpecified}</p>
                                                    </div>
                                                    </div>
                                                </li>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col md="4" sm="12" lg="4" xl="4">
                                            <div className="collection-filter-block">
                                                <ul>
                                                <li>
                                                    <div className="media"><Aperture/>
                                                    <div className="media-body">
                                                        <h5 className="color-purple-red">{_.has(passedData, "likes") ? passedData.likes : notSpecified} have liked this listing!</h5>
                                                    </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="media"><Aperture/>
                                                    <div className="media-body">
                                                        <h5 className="color-purple-red">{"Full Name"}</h5>
                                                        <p>{`${user.firstName} ${user.lastName}`}</p>
                                                    </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="media"><Aperture/>
                                                    <div className="media-body">
                                                        <h5 className="color-purple-red">{"Number(#) Of Reviews"}</h5>
                                                        <p>{user.reviews.length} Current Reviews</p>
                                                    </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="media"><Aperture/>
                                                    <div className="media-body">
                                                        <h5 className="color-purple-red">{"Gender"}</h5>
                                                        <p>{_.has(user, "gender") ? user.gender.label : "None Provided"}</p>
                                                    </div>
                                                    </div>
                                                </li>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col md="4" sm="12" lg="4" xl="4">
                                            <div className="collection-filter-block">
                                                <ul>
                                                <li>
                                                    <div className="media"><Aperture/>
                                                    <div className="media-body">
                                                        <h5 className="color-purple-red">{"Public Email Address (@)"}</h5>
                                                        <p>{_.has(user, "publicEmailAddress") ? user.publicEmailAddress : notSpecified}</p>
                                                    </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="media"><Aperture/>
                                                    <div className="media-body">
                                                        <h5 className="color-purple-red">{`${process.env.REACT_APP_APPLICATION_NAME} RANK/LVL`}</h5>
                                                        <p>Level #{user.rankLevel}</p>
                                                    </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="media"><Aperture/>
                                                    <div className="media-body">
                                                        <h5 className="color-purple-red">{"Registered"}</h5>
                                                        <p>{moment(user.registrationDate).fromNow()}</p>
                                                    </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="media"><Aperture/>
                                                    <div className="media-body">
                                                        <h5 className="color-purple-red">{"Title"}</h5>
                                                        <p>{_.has(user, "title") ? user.title : notSpecified}</p>
                                                    </div>
                                                    </div>
                                                </li>
                                                </ul>
                                            </div>
                                        </Col>
                                    </div>
                                </CardBody>
                            </Card> : <SkeletonTheme baseColor="#d4d4d4" highlightColor="#8f8f8f">
                                <p>
                                    <Skeleton containerClassName={"stretch-bars"} count={75} />
                                </p>
                            </SkeletonTheme>}
                        </TabPane>
                    </TabContent>
                    </Col>
                </Row>
            </Card>
        </Fragment>
    );
}

export default TabsetIndividualLiveListingHelper;