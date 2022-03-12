import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb';
import { Container, Row, Col, Card, CardHeader, CardFooter, CardBody, Media, Button, FormGroup, Label, InputGroup, Input, InputGroupAddon } from 'reactstrap';
import axios from "axios";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import _ from "lodash";
import moment from "moment";
import helpers from "./helpers/miscFunctions.js";
import "./styles.css";
import { useHistory } from "react-router-dom";
import PaginationEmployerListingHelper from "../../../universal/pagination/paginationHelper.js";
import Slider from "react-slick";

const { renderProfilePicVideo } = helpers;


// pagination logic
const itemsPerPage = 6;

const settings = {
    dots: true,
    infinite: true,
    draggable: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1350,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 675,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
};


const UsersCardsEmployersAccountsHelper = (props) => {
    // initialize state
    const [ employers, setEmployers ] = useState([]);
    const [ ready, setReady ] = useState(false);
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ pageCount, setPageCount ] = useState(0);
    const [ itemOffset, setItemOffset ] = useState(0);
    const [ permenantData, setPermenantDataState ] = useState([]);
    const [ searchText, setSearchText ] = useState("");
    const [ promotedEmployers, setPromotedEmployerListings ] = useState([]);
    const [ boostedReady, setBoostedReady ] = useState(false);

    const history = useHistory();

    useEffect(() => {

        const endOffset = itemOffset + itemsPerPage;

        setPageCount(Math.ceil(permenantData.length / itemsPerPage));

        setEmployers(permenantData.slice(itemOffset, endOffset));
        
    }, [itemOffset, itemsPerPage]);

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


    useEffect(() => {
        const configuration = {
            params: {
                alreadyPooled: []
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/promoted/employer/accounts/sampled`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered employers!") {
                console.log(res.data);
                // employer response returned..
                const { employers } = res.data;
                // determine how many to fill
                const numberToFill = 20 - employers.length;

                console.log("numberToFill", numberToFill);

                // fill empty up to 20 for proper filling of slider array..
                const filled = new Array(numberToFill).fill({
                    placeholder: true
                });
                // join/concat both arrays - real data and placeholder
                const combined = [...employers, ...filled];
                // set state
                setPromotedEmployerListings(combined);
                setBoostedReady(true);

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
                    {employers.filter((employer) => (_.has(employer, "companyName") ? employer.companyName.toLowerCase() : "").includes(searchText)).map((employer, i) => {
                        const bannerImage = _.has(employer, "profileBannerImage") ? `${process.env.REACT_APP_ASSET_LINK}/${employer.profileBannerImage.link}` : require(`../../../../../assets/images/other-images/img-cropper.jpg`);
                        const profilePicture = _.has(employer, "profilePicsVideos") && employer.profilePicsVideos.length > 0 ? employer.profilePicsVideos[employer.profilePicsVideos.length - 1] : null;
                        console.log("employer", employer);
                        return (
                            <Col md="4" lg="4" xl="4" className="box-col-4" key={i}>
                                <Card id={"promoted-employer-card"} className="custom-card centered-both-ways shadowy-card-promoted-employers">
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
                                        <Button onClick={() => handleRedirectEmployerProfile(employer)} style={{ width: "90%" }} className="btn-pill btn-air-info" outline color="info-2x">View/Visit Company Profile</Button>
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
                    <Row style={{ marginTop: "50px", marginBottom: "75px" }}>
                        <div className="centered-both-ways">
                            <PaginationEmployerListingHelper itemsPerPage={itemsPerPage} setItemOffset={setItemOffset} loopingData={permenantData} setPageCount={setPageCount} pageCount={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
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
    const handleRedirectEmployerProfile = (employer) => {
        history.push(`/employer/individual/profile/main/${employer.uniqueId}`);
    }
    return (
        <Fragment>
        <Breadcrumb parent="View/Explore Employer Account's" title="Employer Accounts & Promoted Employer Account's (Promoted Up Top)" />
        <Container fluid={true}>
            <Row>
                <Card className='shadowy-card-promoted-employers'>
                    <CardHeader>
                        <Col sm="12" md="12" xl="12" lg="12">
                            <div className="header-faq">
                                <h2 className="mb-0">Boosted Profile's - These are profiles with account owner's <strong>PAYING</strong> to have their profile shown <strong>FIRST!</strong></h2>
                                <hr />
                                <p className='lead'>Boosted profile's are profiles that have been paid to be shown first and foremost before other accounts. These are typically <strong>much more serious</strong> user's & are generally a better bet of placing your bet's on when looking for <strong>reliable</strong> employer's looking for contractors/hackers. You should still <strong>check to verify account verification status's</strong> and any other related information to make sure people are who they say they are.</p>
                            </div>
                        </Col>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col style={{ marginBottom: "37.5px" }} sm="12" md="12" xl="12" lg="12">
                                {boostedReady === true ? <Slider {...settings}>
                                    {promotedEmployers.map((employer, i) => {

                                        console.log("employer boosted", employer);

                                        const bannerImage = _.has(employer, "profileBannerImage") ? `${process.env.REACT_APP_ASSET_LINK}/${employer.profileBannerImage.link}` : require(`../../../../../assets/images/other-images/img-cropper.jpg`);
                                        const profilePicture = _.has(employer, "profilePicsVideos") && employer.profilePicsVideos.length > 0 ? employer.profilePicsVideos[employer.profilePicsVideos.length - 1] : null;

                                        if (_.has(employer, "placeholder") && employer.placeholder === true) {
                                            return (
                                                <Col md="12" lg="12" xl="12" className="box-col-12" key={i}>
                                                    <Card className="custom-card centered-both-ways min-height-card-boosted">
                                                        <CardHeader className="card-header-banner-custom">
                                                            <Media body className="img-fluid banner-display-placeholder-profile" src={require(`../../../../../assets/images/placeholder-profile.png`)} alt="banner-image-display" />
                                                        </CardHeader>
                                                        <div className="card-profile customized-card-profile">
                                                            <Media className="rounded-circle maxed-out-rounded-circle" body alt="profile-picture-sub" src={require(`../../../../../assets/images/no-pic-availiable.png`)} data-intro="This is Profile image" />
                                                        </div>
                                                        <ul className="card-social">
                                                            <li><a href={null}><i className="fa fa-facebook"></i></a></li>
                                                            <li><a href={null}><i className="fa fa-google-plus"></i></a></li>
                                                            <li><a href={null}><i className="fa fa-twitter"></i></a></li>
                                                            <li><a href={null}><i className="fa fa-instagram"></i></a></li>
                                                            <li><a href={null}><i className="fa fa-rss"></i></a></li>
                                                        </ul>
                                                        <div className="text-center profile-details">
                                                            <h4>{_.has(employer, "companyName") ? employer.username : "Unknown Company Name."}</h4>
                                                            <h6>{employer.fullyVerified === true ? "FULLY-VERIFIED!" : "Un-Verified."}</h6>
                                                            <hr />
                                                            <Button style={{ width: "100%" }} onClick={() => handleRedirectEmployerProfile(employer)} className="btn-pill btn-air-info" outline color="info-2x">View/Visit Company Profile</Button>
                                                            <hr />
                                                        </div>
                                                        <CardFooter className="row">
                                                            <Col sm="4 col-4">
                                                                <h6>Successful/Completed Jobs</h6>
                                                                <h3 className="counter"> ---N/A---</h3>
                                                            </Col>
                                                            <Col sm="4 col-4">
                                                                <h6>Review Count</h6>
                                                                <h3><span className="counter"> ---N/A---</span></h3>
                                                            </Col>
                                                            <Col sm="4 col-4">
                                                                <h6>Registration</h6>
                                                                <h3><span className="counter">---N/A--- </span></h3>
                                                            </Col>
                                                        </CardFooter>
                                                    </Card>
                                                </Col>
                                            );
                                        } else {
                                            return (
                                                <Col md="12" lg="12" xl="12" className="box-col-12" key={i}>
                                                    <Card className="custom-card centered-both-ways min-height-card-boosted">
                                                    <CardHeader className="card-header-banner-custom">
                                                        <Media body className="img-fluid banner-banner-custom banner-display-placeholder-profile" src={bannerImage} alt="banner-image-display" />
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
                                                        <h4>Username: {employer.username}</h4>
                                                        <h6>{employer.fullyVerified === true ? "FULLY-VERIFIED!" : "Un-Verified."}</h6>
                                                        <hr />
                                                        <Button style={{ width: "100%" }} onClick={() => handleRedirectEmployerProfile(employer)} className="btn-pill btn-air-info" outline color="info-2x">View/Visit Company Profile</Button>
                                                        <hr />
                                                    </div>
                                                    <CardFooter className="row">
                                                        <Col sm="4 col-4">
                                                            <h6>Completed Jobs</h6>
                                                            <h3 className="counter">{employer.completedJobs} Completed</h3>
                                                        </Col>
                                                        {employer.reviews.length > 0 ? <Col sm="4 col-4">
                                                            <h6>Review Count</h6>
                                                            <h3><span className="counter">{employer.reviews.length} Reviews</span></h3>
                                                        </Col> : <Col sm="4 col-4">
                                                            <h6>Experience</h6>
                                                            <h3><span className="counter">{employer.points} XP Points</span></h3>
                                                        </Col>}
                                                        <Col sm="4 col-4">
                                                            <h6>Registration</h6>
                                                            <h3><span className="counter">{moment(employer.registrationDate).fromNow()}</span></h3>
                                                        </Col>
                                                    </CardFooter>
                                                    </Card>
                                                </Col>
                                            );
                                        }
                                    })}
                                </Slider> : <Fragment>
                                    <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                        <p>
                                            <Skeleton count={35} />
                                        </p>
                                    </SkeletonTheme>
                                </Fragment>}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Row>
            <Row>
                <Col sm="12" md="12" lg="12" xl="12">
                    <Card className={"card-shadow-custom"}>
                        <CardHeader className="b-l-primary border-3 border-bottom-search-addition">
                            <FormGroup className=" mb-0 input-wrapper-people-list">
                                <Label>Search for hacker's by 'first' & 'last' name</Label>
                                <InputGroup className="mb-3">
                                    <Input placeholder={"Search for any user's with either their first name or last name, or you can search for them both..."} onChange={(e) => {
                                        const value = e.target.value;

                                        setSearchText(value);
                                    }} value={searchText} className="form-control custom-search-bar-people" type="text" aria-label=""/>
                                    {typeof searchText !== "undefined" && searchText.length > 0 ? <InputGroupAddon onClick={() => {
                                        setSearchText("");
                                    }} className={"searching-addon-list-people-right"} addonType="append"><i class="fa fa-times-circle fa-2x" aria-hidden="true"></i></InputGroupAddon> : null}
                                </InputGroup>
                            </FormGroup>
                        </CardHeader>
                    </Card>
                </Col>
            </Row>
            <Row>
                {renderContentMain()}
            </Row>
        </Container>
        </Fragment>
    );
}

export default UsersCardsEmployersAccountsHelper;