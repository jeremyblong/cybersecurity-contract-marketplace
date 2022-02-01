import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Col, Card, CardHeader, CardBody, Button, Media, Collapse } from 'reactstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import helpers from "./helpers/rightBarHelperFunctions.js";
import _ from 'lodash';
import moment from "moment";
import "./styles.css";
import { connect } from "react-redux";
import three from "../../../../../../assets/images/user/3.jpg";
import two from "../../../../../../assets/images/user/2.png";
import eleven from "../../../../../../assets/images/user/11.png";
import ten from "../../../../../../assets/images/user/10.jpg";


const { RenderPictureOrVideoLast, renderPictureOrVideoContentBreakBlock } = helpers;

const RightBar = ({ user, modalIndexSelected, setSelectedModalIndex, onCloseModal, onOpenModal, setSelectedCurrently }) => {
    // relevant ref's creation
    const galleryRef = useRef(null);
    const [isIntro, setisIntro] = useState(true);
    const [isFollowers, setisFollowers] = useState(true);
    const [isFollowings, setisFollowings] = useState(true);
    const [isPhotos, setisPhotos] = useState(true);

    const renderCoreInformationConditionally = () => {
        if (user !== null) {
            return (
                <Fragment>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisIntro(!isIntro)}
                                data-toggle="collapse" data-target="#collapseicon7" aria-expanded={isIntro} aria-controls="collapseicon7">Profile Introduction</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isIntro}>
                        <CardBody className="filter-cards-view"><span className="f-w-600">About This User :</span>
                            <p>{_.has(user, "aboutMe") ? user.aboutMe : "No Bio - Has NOT been completed/filled-out yet..."}</p><span className="f-w-600">{"Birthdate/Born"} :</span>
                            <p>{_.has(user, "birthdate") ? `Born ${moment(user.birthdate).fromNow()} and/or on ${moment(new Date()).format("MM/DD/YYYY")}` : "No birthdate provided/completed currently..."}</p><span className="f-w-600">Rank/Level :</span>
                            <p>{_.has(user, "rankLevel") ? `Ranked Level ${user.rankLevel} on our ${process.env.REACT_APP_APPLICATION_NAME}'s platform` : "Unknown Rank/Level..."}</p>
                            <span className="f-w-600">Total Completed Jobs :</span><p>This hacker has completed <strong style={{ color: "#7366ff", textDecorationLine: "underline" }}>{user.completedJobs}</strong> total gigs/jobs</p>
                            <div className="social-network theme-form"><span className="f-w-600">Hacker's Social Network's</span>
                                <Button color="social-btn btn-fb mb-2 text-center"><i className="fa fa-facebook m-r-5"></i>Facebook</Button>
                                <Button color="social-btn btn-twitter mb-2 text-center"><i className="fa fa-twitter m-r-5"></i>Twitter</Button>
                                <Button color="social-btn btn-google text-center"><i className="fa fa-dribbble m-r-5"></i>Dribble</Button>
                                <Button style={{ marginTop: "7.5px" }} color="social-btn btn-info text-center"><i className="fa fa-github m-r-5"></i>GitHub</Button>
                                <Button style={{ marginTop: "7.5px" }} color="social-btn btn-secondary text-center"><i className="fa fa-linkedin m-r-5"></i>Linked-In</Button>
                            </div>
                        </CardBody>
                    </Collapse>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                        <p>
                            <Skeleton count={60} />
                        </p>
                    </SkeletonTheme>
                </Fragment>
            );
        }
    }

    const pastProfileDisplayItemsConditional = () => {
        if (user !== null) {
            return (
                <Fragment>
                    <div className={"gallery-spacer-hacker-profile"}>
                        <ul className="text-center customized-row-profile-hacker-pics">
                            {typeof user.profilePicsVideos !== "undefined" && user.profilePicsVideos.length > 0 ? user.profilePicsVideos.map((file, index) => {
                                return (
                                    <Fragment key={index}>
                                        <RenderPictureOrVideoLast modalIndexSelected={modalIndexSelected} file={file} index={index} onCloseModal={onCloseModal} setSelectedModalIndex={setSelectedModalIndex} galleryRef={galleryRef} setSelectedCurrently={setSelectedCurrently} onOpenModal={onOpenModal} />
                                    </Fragment>
                                );
                            }) : null}
                        </ul>
                    </div>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                        <p>
                            <Skeleton count={10} />
                        </p>
                    </SkeletonTheme>
                </Fragment>
            );
        }
    }
    const lastImageBoxed = (user !== null && typeof user.profilePicsVideos !== "undefined" && user.profilePicsVideos.length > 0) ? user.profilePicsVideos[user.profilePicsVideos.length - 1] : null;
    return (
        <Fragment>
            <Col xl="12 xl-50 box-col-6">
                <Card>
                    {renderCoreInformationConditionally()}
                </Card>
            </Col>
            <Col xl="12 xl-50 box-col-6">
                <Card>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisFollowers(!isFollowers)}
                                data-toggle="collapse" data-target="#collapseicon8" aria-expanded={isFollowers} aria-controls="collapseicon8">Top Employer's this user is following</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isFollowers}>
                        <CardBody className="social-list filter-cards-view">
                            <Media>
                                <img className="img-50 img-fluid m-r-20 rounded-circle" alt="twoImg" src={two} />
                                <Media body><span className="d-block">First Name & Last Name</span><a href={null}>Add/Follow This User</a></Media>
                            </Media>
                            <Media>
                                <img className="img-50 img-fluid m-r-20 rounded-circle" alt="threeImg" src={three} />
                                <Media body><span className="d-block">First Name & Last Name</span><a href={null}>Add/Follow This User</a></Media>
                            </Media>
                            <Media>
                                <img className="img-50 img-fluid m-r-20 rounded-circle" alt="threeImg" src={three} />
                                <Media body><span className="d-block">First Name & Last Name</span><a href={null}>Add/Follow This User</a></Media>
                            </Media>
                            <Media>
                                <img className="img-50 img-fluid m-r-20 rounded-circle" alt="tenImg" src={ten} />
                                <Media body><span className="d-block">First Name & Last Name</span><a href={null}>Add/Follow This User</a></Media>
                            </Media>
                            <Media>
                                <img className="img-50 img-fluid m-r-20 rounded-circle" alt="elevenImg" src={eleven} />
                                <Media body><span className="d-block">First Name & Last Name</span><a href={null}>Add/Follow This User</a></Media>
                            </Media>
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
            <Col xl="12 xl-50 box-col-6">
                <Card>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisFollowings(!isFollowings)}
                                data-toggle="collapse" data-target="#collapseicon11" aria-expanded={isFollowings} aria-controls="collapseicon11">Top Hacker's this user is following</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isFollowings}>
                        <CardBody className="social-list filter-cards-view">
                            <Media>
                                <img className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={three} />
                                <Media body><span className="d-block">First Name & Last Name</span><a href={null}>Add/Follow This User</a></Media>
                            </Media>
                            <Media>
                                <img className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={two} />
                                <Media body><span className="d-block">First Name & Last Name</span><a href={null}>Add/Follow This User</a></Media>
                            </Media>
                            <Media>
                                <img className="img-50 img-fluid m-r-20 rounded-circle" alt="ten" src={ten} />
                                <Media body><span className="d-block">First Name & Last Name</span><a href={null}>Add/Follow This User</a></Media>
                            </Media>
                            <Media>
                                <img className="img-50 img-fluid m-r-20 rounded-circle" alt="threeImg" src={three} />
                                <Media body><span className="d-block">First Name & Last Name</span><a href={null}>Add/Follow This User</a></Media>
                            </Media>
                            <Media>
                                <img className="img-50 img-fluid m-r-20 rounded-circle" alt="elevenImg" src={eleven} />
                                <Media body><span className="d-block">First Name & Last Name</span><a href={null}>Add/Follow This User</a></Media>
                            </Media>
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
            <Col xl="12 xl-50 box-col-6">
                <Card>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisPhotos(!isPhotos)}
                                data-toggle="collapse" data-target="#collapseicon9" aria-expanded={isPhotos} aria-controls="collapseicon9">Latest Profile Picture's/Video's</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isPhotos}>
                        <CardBody className="photos filter-cards-view px-0">
                            {pastProfileDisplayItemsConditional()}
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
            {/* <Col xl="12 xl-50 box-col-6">
                <Card>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisFriends(!isFriends)}
                                data-toggle="collapse" data-target="#collapseicon15" aria-expanded={isFriends} aria-controls="collapseicon15">{Friends}</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isFriends}>
                        <CardBody className="avatar-showcase filter-cards-view">
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={three} alt={null} /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={five} alt={null} /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={one} alt={null} /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={two} alt={null} /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={three} alt={null} /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={six} alt={null} /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={ten} alt={null} /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={fourteen} alt={null} /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={one} alt={null} /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={four} alt={null} /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={eleven} alt={null} /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={eight} alt={null} /></div>
                        </CardBody>
                    </Collapse>
                </Card>
            </Col> */}
            <Col xl="12 xl-50 box-col-6">
                {renderPictureOrVideoContentBreakBlock(lastImageBoxed)}
            </Col>
        </Fragment>
    );
};
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {  })(RightBar);