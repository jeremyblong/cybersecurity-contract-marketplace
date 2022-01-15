import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb';
import { Container, Row, Col, Card, CardHeader, CardFooter, Media, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import axios from "axios";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import _ from "lodash";
import moment from "moment";
import helpers from "./helpers/miscFunctions.js";
import "./styles.css";

const { renderProfilePicVideo } = helpers;

const UsersCardsEmployersAccountsHelper = (props) => {
    // initialize state
    const [ employers, setEmployers ] = useState([]);
    const [ ready, setReady ] = useState(false);

    useEffect(() => {
        const configuration = {
            params: {
                alreadyPooled: []
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/random/employer/accounts`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered employers!") {
                console.log(res.data);

                const { employers } = res.data;

                setEmployers(employers);
                setReady(true);
            } else {
                console.log("errr inside...:", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const renderContentMain = () => {
        if (ready === true) {
            return (
                <Fragment>
                    {employers.map((employer, i) => {
                        const bannerImage = _.has(employer, "profileBannerImage") ? `${process.env.REACT_APP_ASSET_LINK}/${employer.profileBannerImage.link}` : require(`../../../../../assets/images/other-images/img-cropper.jpg`);
                        const profilePicture = _.has(employer, "profilePicsVideos") && employer.profilePicsVideos.length > 0 ? employer.profilePicsVideos[employer.profilePicsVideos.length - 1] : require(`../../../../../assets/images/avtar/4.jpg`);
                        
                        return (
                            <Col md="6" lg="6" xl="4" className="box-col-6" key={i}>
                                <Card className="custom-card">
                                <CardHeader className="card-header-banner-custom">
                                    <Media body className="img-fluid banner-banner-custom" src={bannerImage} alt="banner-image-display" />
                                </CardHeader>
                                <div className="card-profile customized-card-profile">
                                    {renderProfilePicVideo(profilePicture)}
                                </div>
                                <ul className="card-social">
                                    <li><a href={null}><i className="fa fa-facebook"></i></a></li>
                                    <li><a href={null}><i className="fa fa-google-plus"></i></a></li>
                                    <li><a href={null}><i className="fa fa-twitter"></i></a></li>
                                    <li><a href={null}><i className="fa fa-instagram"></i></a></li>
                                    <li><a href={null}><i className="fa fa-rss"></i></a></li>
                                </ul>
                                <div className="text-center profile-details">
                                    <h4>{_.has(employer, "companyName") ? employer.companyName : "Unknown Company Name."}</h4>
                                    <h6>{employer.fullyVerified === true ? "FULLY-VERIFIED!" : "Un-Verified."}</h6>
                                    <hr />
                                    <Button style={{ width: "90%" }} className="btn-pill btn-air-info" outline color="info-2x">View/Visit Company Profile</Button>
                                    <hr />
                                </div>
                                <CardFooter className="row">
                                    <Col sm="4 col-4">
                                        <h6>Successful/Completed Jobs</h6>
                                        <h3 className="counter">{employer.completedJobs} Jobs/Gigs Completed</h3>
                                    </Col>
                                    {employer.reviews.length > 0 ? <Col sm="4 col-4">
                                        <h6>Review Count</h6>
                                        <h3><span className="counter">{employer.reviews.length} Reviews (Total)</span></h3>
                                    </Col> : <Col sm="4 col-4">
                                        <h6>Experience</h6>
                                        <h3><span className="counter">{employer.points} XP-Experience Points</span></h3>
                                    </Col>}
                                    <Col sm="4 col-4">
                                        <h6>Registration</h6>
                                        <h3><span className="counter">Registered {moment(employer.registrationDate).fromNow()}</span></h3>
                                    </Col>
                                </CardFooter>
                                </Card>
                            </Col>
                        );
                    })}
                    <Row style={{ paddingTop: "17.5px" }}>
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
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                        <p>
                            <Skeleton count={50} />
                        </p>
                    </SkeletonTheme>
                </Fragment>
            );
        }
    }
    return (
        <Fragment>
        <Breadcrumb parent="Users" title="Employer Accounts" />
        <Container fluid={true}>
            <Row>
                {renderContentMain()}
            </Row>
        </Container>
        </Fragment>
    );
}

export default UsersCardsEmployersAccountsHelper;