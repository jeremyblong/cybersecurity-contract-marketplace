import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Col, Card, CardHeader, CardBody, Button, Media, Collapse, Row } from 'reactstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import helpers from "./helpers/rightBarHelperFunctions.js";
import _ from 'lodash';
import moment from "moment";
import "./styles.css";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { NotificationManager } from "react-notifications";

const { RenderPictureOrVideoLast, renderPictureOrVideoContentBreakBlock, renderPicOrVideoFollowingHackers } = helpers;

const RightBar = ({ user, modalIndexSelected, setSelectedModalIndex, onCloseModal, onOpenModal, setSelectedCurrently }) => {
    // create history obj
    const history = useHistory();
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
                                <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.facebook !== "undefined" && user.socials.facebook.length > 0 ? user.socials.facebook : ""}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button color="social-btn btn-secondary mb-2 text-center"><i className="fa fa-facebook m-r-5"></i>Facebook</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.gitlab !== "undefined" && user.socials.gitlab.length > 0 ? user.socials.gitlab : ""}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button color="social-btn btn-primary mb-2 text-center"><i className="fa fa-twitter m-r-5"></i>GitLab</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.bugcrowd !== "undefined" && user.socials.bugcrowd.length > 0 ? user.socials.bugcrowd : ""}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button color="social-btn btn-secondary text-center"><i class="fa fa-solid fa-circle-question m-r-5"></i>BugCrowd</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.github !== "undefined" && user.socials.github.length > 0 ? user.socials.github : ""}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button style={{ marginTop: "7.5px" }} color="social-btn btn-primary text-center"><i className="fa fa-github m-r-5"></i>GitHub</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.hackerrank !== "undefined" && user.socials.hackerrank.length > 0 ? user.socials.hackerrank : ""}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button style={{ marginTop: "7.5px" }} color="social-btn btn-secondary text-center">HackerRank</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.youtube !== "undefined" && user.socials.youtube.length > 0 ? user.socials.youtube : ""}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button style={{ marginTop: "7.5px" }} color="social-btn btn-primary mb-2 text-center"><i class="fa fa-brands fa-youtube m-r-5"></i>YouTube</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.instagram !== "undefined" && user.socials.instagram.length > 0 ? user.socials.instagram : ""}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button color="social-btn btn-secondary text-center"><i class="fa fa-brands fa-instagram m-r-5"></i>Instagram</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.linkedin !== "undefined" && user.socials.linkedin.length > 0 ? user.socials.linkedin : ""}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button style={{ marginTop: "7.5px" }} color="social-btn btn-primary text-center"><i className="fa fa-github m-r-5"></i>LinkedIn</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.cobalt !== "undefined" && user.socials.cobalt.length > 0 ? user.socials.cobalt : ""}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button style={{ marginTop: "7.5px" }} color="social-btn btn-secondary text-center"><i className="fa fa-brands fa-linkedin m-r-5"></i>Cobalt</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.twitter !== "undefined" && user.socials.twitter.length > 0 ? user.socials.twitter : ""}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button style={{ marginTop: "7.5px" }} color="social-btn btn-primary text-center"><i className="fa fa-brands fa-twitter-square m-r-5"></i>Twitter</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.hackthebox !== "undefined" && user.socials.hackthebox.length > 0 ? user.socials.hackthebox : ""}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button style={{ marginTop: "7.5px" }} color="social-btn btn-secondary text-center"><i className="fa fa-github m-r-5"></i>HackTheBox</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.tiktok !== "undefined" && user.socials.tiktok.length > 0 ? user.socials.tiktok : ""}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button style={{ marginTop: "7.5px" }} color="social-btn btn-primary text-center">TikTok</Button>
                                </CopyToClipboard>
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
    const redirectToFollowingHacker = (hackerID) => {
        history.push(`/hacker/profile/individual/view/${hackerID}`);
    }
    const lastImageBoxed = (user !== null && typeof user.profilePicsVideos !== "undefined" && user.profilePicsVideos.length > 0) ? user.profilePicsVideos[user.profilePicsVideos.length - 1] : null;
    return (
        <Fragment>
            <Col xl="12 xl-50 box-col-6">
                <Card className={"add-shadow-general-card-profile"}>
                    {renderCoreInformationConditionally()}
                </Card>
            </Col>
            <Col xl="12 xl-50 box-col-6">
                <Card className={"add-shadow-general-card-profile"}>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisFollowers(!isFollowers)}
                                data-toggle="collapse" data-target="#collapseicon8" aria-expanded={isFollowers} aria-controls="collapseicon8">Top Employer's this user is following</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isFollowers}>
                        <CardBody className="social-list filter-cards-view">
                            {typeof user.followingCompanies !== "undefined" && user.followingCompanies.length > 0 ? user.followingCompanies.map((employer, index) => {
                                return (
                                    <Media key={index}>
                                        {renderPicOrVideoFollowingHackers(employer.latestProfilePicVideo)}
                                        <Media body><span className="d-block">{employer.followingFullName}</span><a onClick={() => redirectToFollowingHacker(employer.followingID)} href={null}>View {employer.followingUsername}'s profile</a></Media>
                                    </Media>
                                );
                            }) : <Fragment>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <div className={"centered-both-ways"}>
                                            <h3 className={"no-results-following-header"}>No results found with this criteria...</h3>
                                        </div>
                                    </Col>
                                    <hr />
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <div className={"centered-both-ways"}>
                                            <img src={require("../../../../../../assets/images/dashboard/folder1.png")} className={"no-results-following-image"} />
                                        </div>
                                    </Col>
                                </Row>
                            </Fragment>}
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
            <Col xl="12 xl-50 box-col-6">
                <Card className={"add-shadow-general-card-profile"}>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisFollowings(!isFollowings)}
                                data-toggle="collapse" data-target="#collapseicon11" aria-expanded={isFollowings} aria-controls="collapseicon11">Top Hacker's this user is following</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isFollowings}>
                        <CardBody className="social-list filter-cards-view">
                            {typeof user.followingHackers !== "undefined" && user.followingHackers.length > 0 ? user.followingHackers.map((hacker, index) => {
                                return (
                                    <Media key={index}>
                                        {renderPicOrVideoFollowingHackers(hacker.latestProfilePicVideo)}
                                        <Media body><span className="d-block">{hacker.followingFullName}</span><a onClick={() => redirectToFollowingHacker(hacker.followingID)} href={null}>View {hacker.followingUsername}'s profile</a></Media>
                                    </Media>
                                );
                            }) : <Fragment>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <div className={"centered-both-ways"}>
                                            <h3 className={"no-results-following-header"}>No results found with this criteria...</h3>
                                        </div>
                                    </Col>
                                    <hr />
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <div className={"centered-both-ways"}>
                                            <img src={require("../../../../../../assets/images/dashboard/folder1.png")} className={"no-results-following-image"} />
                                        </div>
                                    </Col>
                                </Row>
                            </Fragment>}
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
            <Col xl="12 xl-50 box-col-6">
                <Card className={"add-shadow-general-card-profile"}>
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