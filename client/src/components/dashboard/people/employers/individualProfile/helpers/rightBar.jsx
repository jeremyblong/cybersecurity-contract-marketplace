import React, { Fragment, useState } from 'react';
import { Col, Card, CardHeader, CardBody, Button, Media, Collapse } from 'reactstrap';
import "../styles.css";
import one from "../../../../../../assets/images/user/1.jpg";
import three from "../../../../../../assets/images/user/3.jpg";
import five from "../../../../../../assets/images/user/5.jpg";
import two from "../../../../../../assets/images/user/2.png";
import eight from "../../../../../../assets/images/user/8.jpg";
import eleven from "../../../../../../assets/images/user/11.png";
import helpers from "./miscFunctions/helperFunctions.js";
import ten from "../../../../../../assets/images/user/10.jpg";
import six from "../../../../../../assets/images/user/6.jpg";
import fourteen from "../../../../../../assets/images/user/14.png";
import four from "../../../../../../assets/images/user/4.jpg";
import ShowMoreText from "react-show-more-text";
import _ from "lodash";
import { SocialNetworks } from "../../../../../../constant";
import { useHistory } from "react-router-dom"; 
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { NotificationManager } from "react-notifications";

const { renderPicVideoPlaceholder, renderProfilePicVideoGallerySubbed, renderHackerEmployerMapped } = helpers;


const RightBar = ({ employerData }) => {
    const [isIntro, setisIntro] = useState(true);
    const [isFollowers, setisFollowers] = useState(true);
    const [isFollowings, setisFollowings] = useState(true);
    const [isPhotos, setisPhotos] = useState(true);
    const [isFriends, setisFriends] = useState(true);
    const [ bioOpen, setBioViewMoreOpen ] = useState(false);
    const randomNumberHackers = _.has(employerData, "followingHackers") && employerData.followingHackers.length >= 10 ? (Math.floor(Math.random() * (employerData.followingHackers.length - 0 + 1)) + 0) : 10;
    const randomNumberEmployers = _.has(employerData, "followingCompanies") && employerData.followingCompanies.length >= 10 ? (Math.floor(Math.random() * (employerData.followingCompanies.length - 0 + 1)) + 0) : 10;
    
    console.log("randomNumberHackers", randomNumberHackers);

    const history = useHistory();

    const handleHackerEmployerProfileRedirect = (id, accountType) => {
        if (accountType === "hackers") {
            history.push(`/hacker/profile/individual/view/${id}`);
        } else {
            history.push(`/employer/individual/profile/main/${id}`);
        }
    }
    console.log("_.shuffle(employerData.followingHackers)", employerData);

    return (
        <Fragment>
            <Col xl="12 xl-50 box-col-6">
                <Card className={"shadow-card-employer"}>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisIntro(!isIntro)}
                                data-toggle="collapse" data-target="#collapseicon7" aria-expanded={isIntro} aria-controls="collapseicon7">Core Profile Information</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isIntro}>
                        <CardBody className="filter-cards-view"><span className="f-w-600">About Company :</span>
                            <ShowMoreText
                                /* Default options */
                                lines={4}
                                more="Show more"
                                less="Show less"
                                className="content-css"
                                anchorClass="my-anchor-css-class"
                                onClick={() => setBioViewMoreOpen(true)}
                                expanded={bioOpen}
                                width={280}
                                truncatedEndingComponent={"... "}
                            >
                                <p>{_.has(employerData, "aboutCompany") ? employerData.aboutCompany : "No Data Provided Yet."}</p>
                            </ShowMoreText>
                            <span className="f-w-600">{"Area/Specialty"} :</span>
                            <p>{_.has(employerData, "sectorOrSpecialty") ? employerData.sectorOrSpecialty : "No Data Provided Yet."}</p><span className="f-w-600">Total Previously Completed Jobs :</span>
                            <p>{_.has(employerData, "completedJobs") ? employerData.completedJobs : "No Data Provided Yet."} Previously Completed Contract's</p>
                            <div className="social-network theme-form"><span className="f-w-600">{SocialNetworks}</span>
                            <CopyToClipboard 
                                text={_.has(employerData, "socials") && typeof employerData.socials.facebook !== "undefined" && employerData.socials.facebook.length > 0 ? employerData.socials.facebook : ""}
                                onCopy={() => {
                                    NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                }}
                            >
                                <Button color="social-btn btn-secondary mb-2 text-center"><i className="fa fa-facebook m-r-5"></i>Facebook</Button>
                            </CopyToClipboard>
                                <CopyToClipboard 
                                text={_.has(employerData, "socials") && typeof employerData.socials.gitlab !== "undefined" && employerData.socials.gitlab.length > 0 ? employerData.socials.gitlab : ""}
                                onCopy={() => {
                                    NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                }}
                            >
                                <Button color="social-btn btn-primary mb-2 text-center"><i className="fa fa-twitter m-r-5"></i>GitLab</Button>
                            </CopyToClipboard>
                                <CopyToClipboard 
                                text={_.has(employerData, "socials") && typeof employerData.socials.bugcrowd !== "undefined" && employerData.socials.bugcrowd.length > 0 ? employerData.socials.bugcrowd : ""}
                                onCopy={() => {
                                    NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                }}
                            >
                                <Button color="social-btn btn-secondary text-center"><i class="fa fa-solid fa-circle-question m-r-5"></i>BugCrowd</Button>
                            </CopyToClipboard>
                                <CopyToClipboard 
                                text={_.has(employerData, "socials") && typeof employerData.socials.github !== "undefined" && employerData.socials.github.length > 0 ? employerData.socials.github : ""}
                                onCopy={() => {
                                    NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                }}
                            >
                                <Button style={{ marginTop: "7.5px" }} color="social-btn btn-primary text-center"><i className="fa fa-github m-r-5"></i>GitHub</Button>
                            </CopyToClipboard>
                                <CopyToClipboard 
                                text={_.has(employerData, "socials") && typeof employerData.socials.hackerrank !== "undefined" && employerData.socials.hackerrank.length > 0 ? employerData.socials.hackerrank : ""}
                                onCopy={() => {
                                    NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                }}
                            >
                                <Button style={{ marginTop: "7.5px" }} color="social-btn btn-secondary text-center">HackerRank</Button>
                            </CopyToClipboard>
                                <CopyToClipboard 
                                text={_.has(employerData, "socials") && typeof employerData.socials.youtube !== "undefined" && employerData.socials.youtube.length > 0 ? employerData.socials.youtube : ""}
                                onCopy={() => {
                                    NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                }}
                            >
                                <Button style={{ marginTop: "7.5px" }} color="social-btn btn-primary mb-2 text-center"><i class="fa fa-brands fa-youtube m-r-5"></i>YouTube</Button>
                            </CopyToClipboard>
                                <CopyToClipboard 
                                text={_.has(employerData, "socials") && typeof employerData.socials.instagram !== "undefined" && employerData.socials.instagram.length > 0 ? employerData.socials.instagram : ""}
                                onCopy={() => {
                                    NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                }}
                            >
                                <Button color="social-btn btn-secondary text-center"><i class="fa fa-brands fa-instagram m-r-5"></i>Instagram</Button>
                            </CopyToClipboard>
                                <CopyToClipboard 
                                text={_.has(employerData, "socials") && typeof employerData.socials.linkedin !== "undefined" && employerData.socials.linkedin.length > 0 ? employerData.socials.linkedin : ""}
                                onCopy={() => {
                                    NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                }}
                            >
                                <Button style={{ marginTop: "7.5px" }} color="social-btn btn-primary text-center"><i className="fa fa-github m-r-5"></i>LinkedIn</Button>
                            </CopyToClipboard>
                                <CopyToClipboard 
                                text={_.has(employerData, "socials") && typeof employerData.socials.cobalt !== "undefined" && employerData.socials.cobalt.length > 0 ? employerData.socials.cobalt : ""}
                                onCopy={() => {
                                    NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                }}
                            >
                                <Button style={{ marginTop: "7.5px" }} color="social-btn btn-secondary text-center"><i className="fa fa-brands fa-linkedin m-r-5"></i>Cobalt</Button>
                            </CopyToClipboard>
                                <CopyToClipboard 
                                text={_.has(employerData, "socials") && typeof employerData.socials.twitter !== "undefined" && employerData.socials.twitter.length > 0 ? employerData.socials.twitter : ""}
                                onCopy={() => {
                                    NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                }}
                            >
                                <Button style={{ marginTop: "7.5px" }} color="social-btn btn-primary text-center"><i className="fa fa-brands fa-twitter-square m-r-5"></i>Twitter</Button>
                            </CopyToClipboard>
                                <CopyToClipboard 
                                text={_.has(employerData, "socials") && typeof employerData.socials.hackthebox !== "undefined" && employerData.socials.hackthebox.length > 0 ? employerData.socials.hackthebox : ""}
                                onCopy={() => {
                                    NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                }}
                            >
                                <Button style={{ marginTop: "7.5px" }} color="social-btn btn-secondary text-center"><i className="fa fa-github m-r-5"></i>HackTheBox</Button>
                            </CopyToClipboard>
                                <CopyToClipboard 
                                text={_.has(employerData, "socials") && typeof employerData.socials.tiktok !== "undefined" && employerData.socials.tiktok.length > 0 ? employerData.socials.tiktok : ""}
                                onCopy={() => {
                                    NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                }}
                            >
                                <Button style={{ marginTop: "7.5px" }} color="social-btn btn-primary text-center">TikTok</Button>
                            </CopyToClipboard>
                            </div>
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
            <Col xl="12 xl-50 box-col-6">
                <Card className={"shadow-card-employer"}>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisFollowers(!isFollowers)}
                                data-toggle="collapse" data-target="#collapseicon8" aria-expanded={isFollowers} aria-controls="collapseicon8">Following Hacker's</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isFollowers}>
                        <CardBody className="social-list filter-cards-view">
                            {(employerData !== null && typeof employerData.followingHackers !== "undefined" && employerData.followingHackers.length > 0) ? employerData.followingHackers.slice(employerData.followingHackers.length - randomNumberHackers, 10).map((follower, idx) => {
                                console.log("follower", follower);
                                return (
                                    <Fragment key={idx}>
                                        <Media>
                                            {renderHackerEmployerMapped(follower.latestProfilePicVideo)}
                                            <Media body><span className="d-block">{follower.followingFullName}</span><a onClick={() => handleHackerEmployerProfileRedirect(follower.followingID, follower.followingAccountType)} href={null}>View Profile</a></Media>
                                        </Media>
                                    </Fragment>
                                );
                            }) : null}
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
            <Col xl="12 xl-50 box-col-6">
                <Card className={"shadow-card-employer"}>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisFollowings(!isFollowings)}
                                data-toggle="collapse" data-target="#collapseicon11" aria-expanded={isFollowings} aria-controls="collapseicon11">Following Companies</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isFollowings}>
                        <CardBody className="social-list filter-cards-view">
                            {(employerData !== null && typeof employerData.followingCompanies !== "undefined" && employerData.followingCompanies.length > 0) ? employerData.followingCompanies.slice(employerData.followingCompanies.length - randomNumberEmployers, 10).map((follower, idx) => {
                                return (
                                    <Fragment key={idx}>
                                        <Media>
                                            {renderHackerEmployerMapped(follower.latestProfilePicVideo)}
                                            <Media body><span className="d-block">{follower.followingFullName}</span><a onClick={() => handleHackerEmployerProfileRedirect(follower.followingID, follower.followingAccountType)} href={null}>View Profile</a></Media>
                                        </Media>
                                    </Fragment>
                                );
                            }) : null}
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
            <Col xl="12 xl-50 box-col-6">
                <Card className={"shadow-card-employer"}>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisPhotos(!isPhotos)}
                                data-toggle="collapse" data-target="#collapseicon9" aria-expanded={isPhotos} aria-controls="collapseicon9">Latest Profile Pictures/Video's</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isPhotos}>
                        <CardBody className="photos filter-cards-view px-0">
                            <ul className="text-center ul-list-profile-employer">
                                {typeof employerData.profilePicsVideos !== "undefined" && employerData.profilePicsVideos.length > 0 ?
                                    <Fragment>
                                        {employerData.profilePicsVideos.map((file, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    {renderProfilePicVideoGallerySubbed(file)}
                                                </Fragment>
                                            );
                                        })}
                                </Fragment> : ""}
                            </ul>
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
            {/* <Col xl="12 xl-50 box-col-6">
                <Card className={"shadow-card-employer"}>
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
                <Card className={"shadow-card-employer"}>
                    {renderPicVideoPlaceholder(_.has(employerData, "profilePicsVideos") && typeof employerData.profilePicsVideos !== "undefined" && employerData.profilePicsVideos.length > 0 ? employerData.profilePicsVideos[employerData.profilePicsVideos.length - 1] : null)}
                </Card>
            </Col>
        </Fragment>
    );
};

export default RightBar;