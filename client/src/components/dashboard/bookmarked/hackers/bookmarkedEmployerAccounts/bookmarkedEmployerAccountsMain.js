import React, { Fragment,useState,useEffect } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb';
import { Container, Row, Col, Card, CardHeader, CardFooter, Media, Pagination, PaginationItem, PaginationLink, Button } from 'reactstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import _ from "lodash";
import moment from "moment";
import axios from "axios";
import PaginationGeneralHelper from "../../../universal/pagination/miscMainPagination.js";
import { useHistory } from 'react-router-dom';
import helpers from "./helpers/bookmarkHelpers.js";
import { connect } from "react-redux";
import "./styles.css";

const { renderProfilePicVideo } = helpers;

// pagination logic
const itemsPerPage = 6;

const BookmarkedEmployerAccountsAsHackerHelper = ({ userData }) => {

    const history = useHistory();
    
    // initialize state 
    const [ employers, setEmployers ] = useState([]);
    const [ ready, setReady ] = useState(false);

    const [ currentPage, setCurrentPage ] = useState(0);
    const [ pageCount, setPageCount ] = useState(0);
    const [ itemOffset, setItemOffset ] = useState(0);
    const [ permenantData, setPermenantDataState ] = useState([]);

    useEffect(() => {

        const endOffset = itemOffset + itemsPerPage;

        setPageCount(Math.ceil(permenantData.length / itemsPerPage));

        setEmployers(permenantData.slice(itemOffset, endOffset));
        
    }, [itemOffset, itemsPerPage]);

    // run upon load...
    useEffect(() => {
        const configuration = {
            params: {
                signedinID: userData.uniqueId,
                accountType: userData.accountType, 
                accountSearchableType: "employers"
            }
        }
        // signedinID - signed in user ID, accountType --- signedinUser account type, accountSearchableType --- collection to search from
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/bookmarked/accounts/both/as/hacker`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered bookmarked employers as hacker account!") {
                console.log(res.data);

                const { employers } = res.data;

                setPageCount(Math.ceil(employers.length / itemsPerPage));

                const endOffset = itemOffset + itemsPerPage;

                setPermenantDataState(employers);
                setEmployers(employers.slice(itemOffset, endOffset));
                setReady(true);
            } else {
                console.log("errr inside...:", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const redirectToEmployersProfile = (employerID) => {
        console.log("redirectToEmployersProfile ran...");

        history.push(`/employer/individual/profile/main/${employerID}`);
    }

    const renderContentMain = () => {
        if (ready === true) {
            return (
                <Fragment>
                    {employers.length > 0 ? employers.map((employer, i) => {
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
                                    <h4>{`${employer.firstName} ${employer.lastName}`}</h4>
                                    <h6>{employer.fullyVerified === true ? "FULLY-VERIFIED!" : "Un-Verified."}</h6>
                                    <hr />
                                    <Button onClick={() => redirectToEmployersProfile(employer.uniqueId)} style={{ width: "90%" }} className="btn-pill btn-air-info" outline color="info-2x">View/Visit "Employer/Hiring" Profile</Button>
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
                    }) : <div style={{ marginBottom: "27.5px" }}>
                        <img src={require("../../../../../assets/images/no-bookmarked.png")} className={"animation-background-no-results"} />
                    </div>}
                    {employers.length > 0 ? <Fragment>
                        <Row style={{ marginTop: "50px", marginBottom: "75px" }}>
                            <div className="centered-both-ways">
                                <PaginationGeneralHelper itemsPerPage={itemsPerPage} setItemOffset={setItemOffset} loopingData={permenantData} setPageCount={setPageCount} pageCount={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                            </div>
                        </Row>
                    </Fragment> : null}
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
        <Breadcrumb parent="Bookmarked Employer/Hiring Account's" title="BOOKMARKED Employer/Hiring Accounts" />
            <Container fluid={true}>
                <Row>
                    {renderContentMain()}
                </Row>
            </Container>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {  })(BookmarkedEmployerAccountsAsHackerHelper);