import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb';
import { Container, Row, Col, Card, CardHeader, CardFooter, Media, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import HackerDirectoryFilterOptions from "./helpers/filter/filterResults.js";
import axios from 'axios';
import moment from "moment";
import _ from "lodash";
import "./styles.css";
import ReactPlayer from 'react-player';
import { withRouter, useHistory } from "react-router-dom";

const MainHackerDirectoryDisplayHelper = ({  }) => {

    const history = useHistory();

    const [ hackers, setHackers ] = useState([]);
    const [ selectedQueries, setSelectedQueries ] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/hackers/random/general`).then((res) => {
            if (res.data.message === "Successfully gathered hackers!") {
                console.log(res.data);

                const { hackers } = res.data;

                setHackers(hackers);
            } else {
               console.log("err", res.data); 
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    const renderProfilePicVideo = (picOrVideos) => {
        console.log("picOrVideos", picOrVideos);

        const last = picOrVideos[picOrVideos.length - 1];

        if (last.type === "image/jpeg" || last.type === "image/jpg" || last.type === "image/png") {
            return <Media body className="rounded-circle" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} alt="profile-picture-hacker" />;
        } else {
            return (
                <Media body className="rounded-circle background-fill">
                    <ReactPlayer playing={true} loop={true} muted={true} width={"150px"} height={"150px"} className={"custom-player"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                </Media>
            );
        }
    }

    const calculateFilterType = (hacker) => {
        console.log("calculateFilterType hacker", hacker);

        const amountOfHearts = selectedQueries.filter((item) => item.type === 'past-hearts').map((item) => item.hearts);
        const completedContractCount = selectedQueries.filter((item) => item.type === "hired-active-jobs").map((item) => item.hired);
        const completedPastReviews = selectedQueries.filter((item) => item.type === "past-reviews").map((item) => item.reviews);
        // const currentNumberOfApplicants = selectedQueries.filter((item) => item.type === "total-current-applicants").map((item) => item.num);

        const maxNumberOfProfileHearts =  Math.max.apply(null, amountOfHearts);

        const returningOperations = ( 
            // selectedQueries.indexOf(hacker.completedJobs) !== -1
            completedContractCount.includes(typeof hacker.activeHiredHackingJobs !== "undefined" && _.has(hacker, "activeHiredHackingJobs") ? hacker.activeHiredHackingJobs.length : null) || 
            completedPastReviews.includes(typeof hacker.reviews !== "undefined" && _.has(hacker, "reviews") ? hacker.reviews.length : null) || 
            (typeof hacker.profileLovesHearts !== "undefined" && _.has(hacker, "profileLovesHearts") ? hacker.profileLovesHearts.length : 0) >= maxNumberOfProfileHearts
            // selectedQueries.includes("past-hearts") ? Math.min.apply(Math, () => hacker.profileLovesHearts.length) : null ||
            // hackerCount.includes(hacker.maxNumberOfApplicants.value) || 
            // tokensSelected.includes(hacker.tokensRequiredToApply.value) || 
            // hacker.applicants.length <= maxApplicantsNum
        );
        // maxNumberOfApplicants.value
        return returningOperations;
    }

    const calculateSort = (a, b) => {

        console.log("a b", a, b);

        if (selectedQueries.includes("newest")) {
            return new Date(b.systemDate) - new Date(a.systemDate);
        } else {
            return new Date(a.systemDate) - new Date(b.systemDate);
        }
    }

    const renderMainContent = () => {

        console.log("selectedQueries", selectedQueries);
        
        if (selectedQueries.includes("oldest") || selectedQueries.includes("newest")) {
            const sorted = hackers.sort((a, b) => calculateSort(a, b));

            console.log("sorted", sorted);

            return (
                <Fragment>
                    {sorted.filter((hacker) => calculateFilterType(hacker)).map((hacker, i) => {
                        console.log("sorted hacker", hacker);
                        return (
                            <Col md="6" lg="6" xl="6" className="box-col-6" key={i}>
                                <Card className="custom-card">
                                <CardHeader>
                                    {_.has(hacker, "profileBannerImage") ? <Media body className="img-fluid top-image" src={`${process.env.REACT_APP_ASSET_LINK}/${hacker.profileBannerImage.link}`} alt="" /> : <Media body className="img-fluid top-image" src={require(`../../../../../assets/images/other-images/img-cropper.jpg`)} alt="" />}
                                </CardHeader>
                                <div className="card-profile">
                                    {_.has(hacker, "profilePicsVideos") && hacker.profilePicsVideos.length > 0 ? renderProfilePicVideo(hacker.profilePicsVideos) : <Media body className="rounded-circle" src={require(`../../../../../assets/images/avtar/4.jpg`)} alt="profile-picture-hacker" />}
                                </div>
                                <ul className="card-social card-social-custom-edit">
                                    <li><a href="#javascript"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="#javascript"><i className="fa fa-google-plus"></i></a></li>
                                    <li><a href="#javascript"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#javascript"><i className="fa fa-instagram"></i></a></li>
                                    <li><a href="#javascript"><i className="fa fa-rss"></i></a></li>
                                </ul>
                                <div id="override-custom-card" className="text-center profile-details">
                                    <h4>{`${hacker.firstName} ${hacker.lastName}`}</h4>
                                    <h6>{hacker.aboutMe}</h6>
                                    <p style={{ paddingBottom: "20px" }}>Registered {moment(hacker.registrationDate).fromNow()}</p>
                                </div>
                                <CardFooter className="row">
                                    <Col sm="4 col-4">
                                    <h6>Completed Gigs/Jobs</h6>
                                    <h3 className="counter">{hacker.completedJobs}</h3>
                                    </Col>
                                    <Col sm="4 col-4">
                                    <h6>Rank/Level</h6>
                                    <h3><span className="counter">{hacker.rankLevel}</span></h3>
                                    </Col>
                                    <Col sm="4 col-4">
                                    <h6>Verified Account</h6>
                                    <h3><span className="counter">{hacker.fullyVerified === true ? "Fully-verified" : "Un-verified"}</span></h3>
                                    </Col>
                                </CardFooter>
                                <Button style={{ marginTop: "12px" }} onClick={() => {
                                    history.push(`/hacker/profile/individual/view/${hacker.uniqueId}`);
                                }} className="btn-pill btn-air-secondary" color="secondary" >View/Visit Hacker Profile</Button>
                                </Card>
                            </Col>
                        )
                    })}
                </Fragment>
            );
        } else {

            return (
                <Fragment>
                    {hackers.filter((hacker) => calculateFilterType(hacker)).map((hacker, i) => {
                        console.log("hacker", hacker);
                        return (
                            <Col md="6" lg="6" xl="6" className="box-col-6" key={i}>
                                <Card className="custom-card">
                                <CardHeader>
                                    {_.has(hacker, "profileBannerImage") ? <Media body className="img-fluid top-image" src={`${process.env.REACT_APP_ASSET_LINK}/${hacker.profileBannerImage.link}`} alt="" /> : <Media body className="img-fluid top-image" src={require(`../../../../../assets/images/other-images/img-cropper.jpg`)} alt="" />}
                                </CardHeader>
                                <div className="card-profile">
                                    {_.has(hacker, "profilePicsVideos") && hacker.profilePicsVideos.length > 0 ? renderProfilePicVideo(hacker.profilePicsVideos) : <Media body className="rounded-circle" src={require(`../../../../../assets/images/avtar/4.jpg`)} alt="profile-picture-hacker" />}
                                </div>
                                <ul className="card-social card-social-custom-edit">
                                    <li><a href="#javascript"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="#javascript"><i className="fa fa-google-plus"></i></a></li>
                                    <li><a href="#javascript"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#javascript"><i className="fa fa-instagram"></i></a></li>
                                    <li><a href="#javascript"><i className="fa fa-rss"></i></a></li>
                                </ul>
                                <div id="override-custom-card" className="text-center profile-details">
                                    <h4>{`${hacker.firstName} ${hacker.lastName}`}</h4>
                                    <h6>{hacker.aboutMe}</h6>
                                    <p style={{ paddingBottom: "20px" }}>Registered {moment(hacker.registrationDate).fromNow()}</p>
                                </div>
                                <CardFooter className="row">
                                    <Col sm="4 col-4">
                                    <h6>Completed Gigs/Jobs</h6>
                                    <h3 className="counter">{hacker.completedJobs}</h3>
                                    </Col>
                                    <Col sm="4 col-4">
                                    <h6>Rank/Level</h6>
                                    <h3><span className="counter">{hacker.rankLevel}</span></h3>
                                    </Col>
                                    <Col sm="4 col-4">
                                    <h6>Verified Account</h6>
                                    <h3><span className="counter">{hacker.fullyVerified === true ? "Fully-verified" : "Un-verified"}</span></h3>
                                    </Col>
                                </CardFooter>
                                <Button style={{ marginTop: "12px" }} onClick={() => {
                                    history.push(`/hacker/profile/individual/view/${hacker.uniqueId}`);
                                }} className="btn-pill btn-air-secondary" color="secondary" >View/Visit Hacker Profile</Button>
                                </Card>
                            </Col>
                        )
                    })}
                </Fragment>
            );
        }
    }
    return (
        <Fragment>
            <Breadcrumb parent="Users" title="Hacker Directory/Filter Options" />
            <Container fluid={true}>
                <Row>
                    <HackerDirectoryFilterOptions selectedQueries={selectedQueries} setSelectedQueries={setSelectedQueries} />
                    <Col md="8" lg="8" xl="8" sm="12">
                        <Row>
                            {renderMainContent()}
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <div className="centered-both-ways">
                        <Pagination className="m-b-30" aria-label="Page navigation example">
                            <ul className="pagination pagination-lg pagination-secondary">
                                <PaginationItem><PaginationLink href={null}>{"Previous"}</PaginationLink></PaginationItem>
                                <PaginationItem active><PaginationLink href={null}>{"1"}</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink href={null}>{"2"}</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink href={null}>{"3"}</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink href={null}>{"Next"}</PaginationLink></PaginationItem>
                            </ul>
                        </Pagination>
                    </div>
                </Row>
            </Container>
        </Fragment>
    );
}

export default withRouter(MainHackerDirectoryDisplayHelper);
