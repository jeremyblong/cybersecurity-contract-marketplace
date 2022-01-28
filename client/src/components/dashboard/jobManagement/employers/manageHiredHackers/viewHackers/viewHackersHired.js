import React, { Fragment, useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Card, Media, TabContent, TabPane, Nav, NavItem, NavLink, CardBody, CardHeader, ButtonGroup, Button } from 'reactstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ViewHiredHackersHelper = ({ userData }) => {

    const [ hackers, setHackersData ] = useState([]);
    const [ activeTab, setActiveTab ] = useState("1");

    useEffect(() => {
        const configuration = {
            params: {
                uniqueId: userData.uniqueId
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/active/jobs/employer/account`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered active/hired hackers!") {
                console.log("Successfully gathered active/hired hackers!", res.data);
                
                const { hackers } = res.data;

                setHackersData(hackers);
            } else {
                console.log("ERROR gathering active/hired hackers...:", res.data);
            }
        }).catch((err) => {
            console.log("CRITICAL ERROR gathering active/hired hackers...:", err);
        })
    }, []);

    console.log("hired hackers state --- :", hackers);

    const renderConditionalUponLoad = () => {
        if (typeof hackers !== "undefined" && hackers.length > 0) {
            return hackers.map((hacker, index) => {
                console.log("HACKER...:", hacker);
                // return (
                //     <Col md="6" lg="6" xl="4" className="box-col-6" key={index}>
                //         <Card className="custom-card">
                //         <CardHeader className="card-header-banner-custom">
                //             <Media body className="img-fluid banner-banner-custom" src={bannerImage} alt="banner-image-display" />
                //         </CardHeader>
                //         <div className="card-profile customized-card-profile">
                //             {renderProfilePicVideo(profilePicture)}
                //         </div>
                //         <ul className="card-social">
                //             <li><a href={null}><i className="fa fa-facebook"></i></a></li>
                //             <li><a href={null}><i className="fa fa-google-plus"></i></a></li>
                //             <li><a href={null}><i className="fa fa-twitter"></i></a></li>
                //             <li><a href={null}><i className="fa fa-instagram"></i></a></li>
                //             <li><a href={null}><i className="fa fa-rss"></i></a></li>
                //         </ul>
                //         <div className="text-center profile-details">
                //             <h4>{`${hacker.firstName} ${hacker.lastName}`}</h4>
                //             <h6>{hacker.fullyVerified === true ? "FULLY-VERIFIED!" : "Un-Verified."}</h6>
                //             <hr />
                //             <Button style={{ width: "90%" }} className="btn-pill btn-air-info" outline color="info-2x">View/Visit Company Profile</Button>
                //             <hr />
                //         </div>
                //         <CardFooter className="row">
                //             <Col sm="4 col-4">
                //                 <h6>Successful/Completed Jobs</h6>
                //                 <h3 className="counter">{hacker.completedJobs} Jobs/Gigs Completed</h3>
                //             </Col>
                //             {hacker.reviews.length > 0 ? <Col sm="4 col-4">
                //                 <h6>Review Count</h6>
                //                 <h3><span className="counter">{hacker.reviews.length} Reviews (Total)</span></h3>
                //             </Col> : <Col sm="4 col-4">
                //                 <h6>Experience</h6>
                //                 <h3><span className="counter">{hacker.points} XP-Experience Points</span></h3>
                //             </Col>}
                //             <Col sm="4 col-4">
                //                 <h6>Registration</h6>
                //                 <h3><span className="counter">Registered {moment(hacker.registrationDate).fromNow()}</span></h3>
                //             </Col>
                //         </CardFooter>
                //         </Card>
                //     </Col>
                // );
            })
        } else {
            return (
                <Fragment>
                    <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                        <p>
                            <Skeleton count={45} />
                        </p>
                    </SkeletonTheme>
                </Fragment>
            );
        }
    }

    return (
        <Fragment>
            <Container className={"active-hired-container-wrapper"} fluid={true}>
                <Row>
                    <Col sm="12 sm-100" md="12 md-100" lg="12 lg-100" xl="12 xl-100">
                        <Card>
                            <CardHeader>
                                <h5>Active <strong>HIRED</strong> workers/hacker's that're still pending and actively employed.</h5>
                            </CardHeader>
                            <CardBody className="tabbed-card">
                                <Nav  className="nav-pills nav-secondary">
                                    <NavItem>
                                        <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                                            <i className="icofont icofont-ui-home"></i> Employer Listing(s) Hired  
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        {renderConditionalUponLoad()}
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
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
export default connect(mapStateToProps, { })(withRouter(ViewHiredHackersHelper));