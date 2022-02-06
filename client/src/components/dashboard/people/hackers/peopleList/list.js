import React, { Fragment,useState,useEffect } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb';
import { Container, Row, Col, Card, CardHeader, CardFooter, Media, Button, FormGroup, Label, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import _ from "lodash";
import moment from "moment";
import axios from "axios";
import helpers from "./helpers/helperFunctions.js";
import PaginationEmployerListingHelper from "../../../universal/pagination/paginationHelper.js";
import { useHistory } from 'react-router-dom';
import "./helpers/styles.css";

// pagination logic
const itemsPerPage = 6;

const { renderProfilePicVideo } = helpers;

const UsersCardsListHelper = (props) => {

    const history = useHistory();
    
    // initialize state 
    const [ hackers, setHackers ] = useState([]);
    const [ ready, setReady ] = useState(false);
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ pageCount, setPageCount ] = useState(0);
    const [ itemOffset, setItemOffset ] = useState(0);
    const [ permenantData, setPermenantDataState ] = useState([]);
    const [ searchText, setSearchText ] = useState("");

    useEffect(() => {

        const endOffset = itemOffset + itemsPerPage;

        setPageCount(Math.ceil(permenantData.length / itemsPerPage));

        setHackers(permenantData.slice(itemOffset, endOffset));
        
    }, [itemOffset, itemsPerPage]);

    // run upon load...
    useEffect(() => {
        const configuration = {
            params: {
                alreadyPooled: []
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/random/hackers/accounts`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered hackers!") {
                console.log(res.data);

                const { hackers } = res.data;

                setPageCount(Math.ceil(hackers.length / itemsPerPage));

                const endOffset = itemOffset + itemsPerPage;

                setPermenantDataState(hackers);
                setHackers(hackers.slice(itemOffset, endOffset));
                setReady(true);
            } else {
                console.log("errr inside...:", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const redirectToHackersProfile = (hackerID) => {
        console.log("redirectToHackersProfile ran...");

        history.push(`/hacker/profile/individual/view/${hackerID}`);
    }

    const renderContentMain = () => {
        if (ready === true) {
            return (
                <Fragment>
                    {hackers.filter((hacker) => `${hacker.firstName} ${hacker.lastName}`.includes(searchText)).map((hacker, i) => {
                        const bannerImage = _.has(hacker, "profileBannerImage") ? `${process.env.REACT_APP_ASSET_LINK}/${hacker.profileBannerImage.link}` : require(`../../../../../assets/images/other-images/img-cropper.jpg`);
                        const profilePicture = _.has(hacker, "profilePicsVideos") && hacker.profilePicsVideos.length > 0 ? hacker.profilePicsVideos[hacker.profilePicsVideos.length - 1] : require(`../../../../../assets/images/avtar/4.jpg`);
                        
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
                                    <h4>{`${hacker.firstName} ${hacker.lastName}`}</h4>
                                    <h6>{hacker.fullyVerified === true ? "FULLY-VERIFIED!" : "Un-Verified."}</h6>
                                    <hr />
                                    <Button onClick={() => redirectToHackersProfile(hacker.uniqueId)} style={{ width: "90%" }} className="btn-pill btn-air-info" outline color="info-2x">View/Visit "Hacker/Contractor" Profile</Button>
                                    <hr />
                                </div>
                                <CardFooter className="row">
                                    <Col sm="4 col-4">
                                        <h6>Successful/Completed Jobs</h6>
                                        <h3 className="counter">{hacker.completedJobs} Jobs/Gigs Completed</h3>
                                    </Col>
                                    {hacker.reviews.length > 0 ? <Col sm="4 col-4">
                                        <h6>Review Count</h6>
                                        <h3><span className="counter">{hacker.reviews.length} Reviews (Total)</span></h3>
                                    </Col> : <Col sm="4 col-4">
                                        <h6>Experience</h6>
                                        <h3><span className="counter">{hacker.points} XP-Experience Points</span></h3>
                                    </Col>}
                                    <Col sm="4 col-4">
                                        <h6>Registration</h6>
                                        <h3><span className="counter">Registered {moment(hacker.registrationDate).fromNow()}</span></h3>
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
    return (
        <Fragment>
        <Breadcrumb parent="Users" title="Hacker Accounts" />
            <Container fluid={true}>
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

export default UsersCardsListHelper;