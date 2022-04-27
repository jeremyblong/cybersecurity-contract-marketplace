import React, { Fragment, useState } from 'react';
import { Col, Card, CardHeader, CardBody, Button, Media, Collapse } from 'reactstrap';
import one from "../../../../../../../../assets/images/user/1.jpg";
import three from "../../../../../../../../assets/images/user/3.jpg";
import five from "../../../../../../../../assets/images/user/5.jpg";
import two from "../../../../../../../../assets/images/user/2.png";
import eight from "../../../../../../../../assets/images/user/8.jpg";
import eleven from "../../../../../../../../assets/images/user/11.png";
import ten from "../../../../../../../../assets/images/user/10.jpg";
import six from "../../../../../../../../assets/images/user/6.jpg";
import fourteen from "../../../../../../../../assets/images/user/14.png";
import four from "../../../../../../../../assets/images/user/4.jpg";
import { ProfileIntro } from "../../../../../../../../constant";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { NotificationManager } from "react-notifications";
import _ from "lodash";

const RightBar = ({ applicantData, user, lastProfileItem }) => {

    console.log("RIGHTBAR user... :", user, applicantData);

    const [ isIntro, setisIntro ] = useState(true);
    const [ messageToEmployer, setMessageToEmployer ] = useState(true);
    const [ isCoverLetter, setCoverLetter ] = useState(true);
    const [ technicalApproachState, setTechnicalApproach ] = useState(true);
    const [ isFriends, setisFriends ] = useState(true);

    return (
        <Fragment>
            <Col xl="12 xl-50 box-col-6">
                <Card className={"add-shadow-md-custom"}>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisIntro(!isIntro)}
                                data-toggle="collapse" data-target="#collapseicon7" aria-expanded={isIntro} aria-controls="collapseicon7">{ProfileIntro}</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isIntro}>
                        <CardBody className="filter-cards-view"><span className="f-w-600"><strong style={{ textDecorationLine: "underline", fontWeight: "inherit" }}>Basic</strong> "About" Applicant & Social Links :</span>
                            <p>{applicantData.submittedUserData.aboutMe}</p>
                            <div className="social-network theme-form"><span className="f-w-600">Applicant Social Network's</span>
                                <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.facebook !== "undefined" && user.socials.facebook.length > 0 ? user.socials.facebook : "NO Data available to copy.."}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button color="social-btn btn-secondary mb-2 text-center"><i className="fa fa-facebook m-r-5"></i>Facebook</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.gitlab !== "undefined" && user.socials.gitlab.length > 0 ? user.socials.gitlab : "NO Data available to copy.."}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button color="social-btn btn-primary mb-2 text-center"><i className="fa fa-twitter m-r-5"></i>GitLab</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.bugcrowd !== "undefined" && user.socials.bugcrowd.length > 0 ? user.socials.bugcrowd : "NO Data available to copy.."}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button color="social-btn btn-secondary text-center"><i class="fa fa-solid fa-circle-question m-r-5"></i>BugCrowd</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.github !== "undefined" && user.socials.github.length > 0 ? user.socials.github : "NO Data available to copy.."}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button style={{ marginTop: "7.5px" }} color="social-btn btn-primary text-center"><i className="fa fa-github m-r-5"></i>GitHub</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.hackerrank !== "undefined" && user.socials.hackerrank.length > 0 ? user.socials.hackerrank : "NO Data available to copy.."}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button style={{ marginTop: "7.5px" }} color="social-btn btn-secondary text-center">HackerRank</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.youtube !== "undefined" && user.socials.youtube.length > 0 ? user.socials.youtube : "NO Data available to copy.."}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button style={{ marginTop: "7.5px" }} color="social-btn btn-primary mb-2 text-center"><i class="fa fa-brands fa-youtube m-r-5"></i>YouTube</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.instagram !== "undefined" && user.socials.instagram.length > 0 ? user.socials.instagram : "NO Data available to copy.."}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button color="social-btn btn-secondary text-center"><i class="fa fa-brands fa-instagram m-r-5"></i>Instagram</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.linkedin !== "undefined" && user.socials.linkedin.length > 0 ? user.socials.linkedin : "NO Data available to copy.."}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button style={{ marginTop: "7.5px" }} color="social-btn btn-primary text-center"><i className="fa fa-github m-r-5"></i>LinkedIn</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.cobalt !== "undefined" && user.socials.cobalt.length > 0 ? user.socials.cobalt : "NO Data available to copy.."}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button style={{ marginTop: "7.5px" }} color="social-btn btn-secondary text-center"><i className="fa fa-brands fa-linkedin m-r-5"></i>Cobalt</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.twitter !== "undefined" && user.socials.twitter.length > 0 ? user.socials.twitter : "NO Data available to copy.."}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button style={{ marginTop: "7.5px" }} color="social-btn btn-primary text-center"><i className="fa fa-brands fa-twitter-square m-r-5"></i>Twitter</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.hackthebox !== "undefined" && user.socials.hackthebox.length > 0 ? user.socials.hackthebox : "NO Data available to copy.."}
                                    onCopy={() => {
                                        NotificationManager.success("You've successfully 'copied' the desired 'handle URL' - you may now paste it wherever you deem appropriate! Social media handle was copied..", "Successfully copied social-media link/url!", 4750);
                                    }}
                                >
                                    <Button style={{ marginTop: "7.5px" }} color="social-btn btn-secondary text-center"><i className="fa fa-github m-r-5"></i>HackTheBox</Button>
                                </CopyToClipboard>
                                    <CopyToClipboard 
                                    text={_.has(user, "socials") && typeof user.socials.tiktok !== "undefined" && user.socials.tiktok.length > 0 ? user.socials.tiktok : "NO Data available to copy.."}
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
                <Card className={"add-shadow-md-custom"}>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setCoverLetter(!isCoverLetter)}
                                data-toggle="collapse" data-target="#collapseicon8" aria-expanded={isCoverLetter} aria-controls="collapseicon8">Cover Letter (Applicant info...)</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isCoverLetter}>
                        <CardBody className="filter-cards-view"><span className="f-w-600">Applicant Cover Letter (CL):</span>
                            <p>{applicantData.coverLetterText}</p>
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
            <Col xl="12 xl-50 box-col-6">
                <Card className={"add-shadow-md-custom"}>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setTechnicalApproach(!technicalApproachState)}
                                data-toggle="collapse" data-target="#collapseicon11" aria-expanded={technicalApproachState} aria-controls="collapseicon11">"Technical Approach To Hack"</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={technicalApproachState}>
                        <CardBody className="filter-cards-view"><span className="f-w-600">Applicant's Technical Approach :</span>
                            <p>{applicantData.technicalApproachToHack}</p>
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
            <Col xl="12 xl-50 box-col-6">
                <Card className={"add-shadow-md-custom"}>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setMessageToEmployer(!messageToEmployer)}
                                data-toggle="collapse" data-target="#collapseicon11" aria-expanded={messageToEmployer} aria-controls="collapseicon11">"Message To Employer"</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={messageToEmployer}>
                        <CardBody className="filter-cards-view"><span className="f-w-600">Message To You (Employer) :</span>
                            <p>{applicantData.messageToEmployer}</p>
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
            {/* <Col xl="12 xl-50 box-col-6">
                <Card className={"add-shadow-md-custom"}>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisFriends(!isFriends)}
                                data-toggle="collapse" data-target="#collapseicon15" aria-expanded={isFriends} aria-controls="collapseicon15">People participating in this particular listing/opportunity</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isFriends}>
                        <CardBody className="avatar-showcase filter-cards-view">
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={three} alt="#javascript" /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={five} alt="#javascript" /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={one} alt="#javascript" /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={two} alt="#javascript" /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={three} alt="#javascript" /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={six} alt="#javascript" /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={ten} alt="#javascript" /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={fourteen} alt="#javascript" /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={one} alt="#javascript" /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={four} alt="#javascript" /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={eleven} alt="#javascript" /></div>
                            <div className="d-inline-block friend-pic"><Media body className="img-50 rounded-circle" src={eight} alt="#javascript" /></div>
                        </CardBody>
                    </Collapse>
                </Card>
            </Col> */}
            <Col xl="12 xl-50 box-col-6">
                <Card className={"add-shadow-md-custom"}><Media className="img-fluid" src={`${process.env.REACT_APP_ASSET_LINK}/${lastProfileItem.link}`} alt="" /></Card>
            </Col>
        </Fragment>
    );
};

export default RightBar;