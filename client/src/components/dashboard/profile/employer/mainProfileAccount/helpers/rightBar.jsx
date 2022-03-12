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
import { SocialNetworks, Dribbble, BuckyBarnes, JasonBorne, SarahLoren, AndewJon, AddFriend, ComerenDiaz, Friends, Facebooks, Twitters, Follower, Following } from "../../../../../../constant";


const { renderPicVideoPlaceholder, renderProfilePicVideoGallerySubbed } = helpers;


const RightBar = ({ employerData }) => {
    const [isIntro, setisIntro] = useState(true);
    const [isFollowers, setisFollowers] = useState(true);
    const [isFollowings, setisFollowings] = useState(true);
    const [isPhotos, setisPhotos] = useState(true);
    const [isFriends, setisFriends] = useState(true);
    const [ bioOpen, setBioViewMoreOpen ] = useState(false);

    return (
        <Fragment>
            <Col xl="12 xl-50 box-col-6">
                <Card>
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
                                <Button color="social-btn btn-fb mb-2 text-center"><i className="fa fa-facebook m-r-5"></i>{Facebooks}</Button>
                                <Button color="social-btn btn-twitter mb-2 text-center"><i className="fa fa-twitter m-r-5"></i>{Twitters}</Button>
                                <Button color="social-btn btn-google text-center"><i className="fa fa-dribbble m-r-5"></i>{Dribbble}</Button>
                            </div>
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
            <Col xl="12 xl-50 box-col-6">
                <Card>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisFollowers(!isFollowers)}
                                data-toggle="collapse" data-target="#collapseicon8" aria-expanded={isFollowers} aria-controls="collapseicon8">{Follower}</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isFollowers}>
                        <CardBody className="social-list filter-cards-view">
                            <Media>
                                <img className="img-50 img-fluid m-r-20 rounded-circle" alt="twoImg" src={two} />
                                <Media body><span className="d-block">{BuckyBarnes}</span><a href="#javascript">{AddFriend}</a></Media>
                            </Media>
                            <Media>
                                <img className="img-50 img-fluid m-r-20 rounded-circle" alt="threeImg" src={three} />
                                <Media body><span className="d-block">{SarahLoren}</span><a href="#javascript">{AddFriend}</a></Media>
                            </Media>
                            <Media>
                                <img className="img-50 img-fluid m-r-20 rounded-circle" alt="threeImg" src={three} />
                                <Media body><span className="d-block">{JasonBorne}</span><a href="#javascript">{AddFriend}</a></Media>
                            </Media>
                            <Media>
                                <img className="img-50 img-fluid m-r-20 rounded-circle" alt="tenImg" src={ten} />
                                <Media body><span className="d-block">{ComerenDiaz}</span><a href="#javascript">{AddFriend}</a></Media>
                            </Media>
                            <Media>
                                <img className="img-50 img-fluid m-r-20 rounded-circle" alt="elevenImg" src={eleven} />
                                <Media body><span className="d-block">{AndewJon}</span><a href="#javascript">{AddFriend}</a></Media>
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
                                data-toggle="collapse" data-target="#collapseicon11" aria-expanded={isFollowings} aria-controls="collapseicon11">{Following}</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isFollowings}>
                        <CardBody className="social-list filter-cards-view">
                            <Media>
                                <img className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={three} />
                                <Media body><span className="d-block">{SarahLoren}</span><a href="#javascript">{AddFriend}</a></Media>
                            </Media>
                            <Media>
                                <img className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={two} />
                                <Media body><span className="d-block">{BuckyBarnes}</span><a href="#javascript">{AddFriend}</a></Media>
                            </Media>
                            <Media>
                                <img className="img-50 img-fluid m-r-20 rounded-circle" alt="ten" src={ten} />
                                <Media body><span className="d-block">{ComerenDiaz}</span><a href="#javascript">{AddFriend}</a></Media>
                            </Media>
                            <Media>
                                <img className="img-50 img-fluid m-r-20 rounded-circle" alt="threeImg" src={three} />
                                <Media body><span className="d-block">{JasonBorne}</span><a href="#javascript">{AddFriend}</a></Media>
                            </Media>
                            <Media>
                                <img className="img-50 img-fluid m-r-20 rounded-circle" alt="elevenImg" src={eleven} />
                                <Media body><span className="d-block">{AndewJon}</span><a href="#javascript">{AddFriend}</a></Media>
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
            <Col xl="12 xl-50 box-col-6">
                <Card>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisFriends(!isFriends)}
                                data-toggle="collapse" data-target="#collapseicon15" aria-expanded={isFriends} aria-controls="collapseicon15">{Friends}</Button>
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
            </Col>
            <Col xl="12 xl-50 box-col-6">
                <Card>
                    {renderPicVideoPlaceholder(_.has(employerData, "profilePicsVideos") && typeof employerData.profilePicsVideos !== "undefined" && employerData.profilePicsVideos.length > 0 ? employerData.profilePicsVideos[employerData.profilePicsVideos.length - 1] : null)}
                </Card>
            </Col>
        </Fragment>
    );
};

export default RightBar;