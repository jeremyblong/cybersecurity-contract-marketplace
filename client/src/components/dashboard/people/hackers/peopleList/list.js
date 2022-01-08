import React, { Fragment,useState,useEffect } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb';
import { Container, Row, Col, Card, CardHeader, CardFooter, Media } from 'reactstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import _ from "lodash";
import moment from "moment";
import { Button } from "reactstrap";
import axios from "axios";
import helpers from "./helpers/helperFunctions.js";

const { renderProfilePicVideo } = helpers;

const UsersCardsListHelper = (props) => {
    
    // initialize state 
    const [ hackers, setHackers ] = useState([]);
    const [ ready, setReady ] = useState(false);
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

                setHackers(hackers);
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
                    {hackers.map((hacker, i) => {
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
                                    <Button style={{ width: "90%" }} className="btn-pill btn-air-info" outline color="info-2x">View/Visit Company Profile</Button>
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
                    {renderContentMain()}
                </Row>
            </Container>
        </Fragment>
    );
}

export default UsersCardsListHelper;