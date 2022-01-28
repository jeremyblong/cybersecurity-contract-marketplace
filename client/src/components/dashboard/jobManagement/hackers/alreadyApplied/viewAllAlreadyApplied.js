import React, { Fragment, useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Card, Media, TabContent, TabPane, Nav, NavItem, NavLink, CardBody, CardHeader, ButtonGroup, Button } from 'reactstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import moment from "moment";
import { useHistory } from "react-router-dom";

const ViewAlreadyAppliedJobsHackerHelper = ({ userData }) => {

    const history = useHistory();

    const [ applications, setApplicationData ] = useState([]);
    const [ activeTab, setActiveTab ] = useState("1");

    useEffect(() => {
        const configuration = {
            params: {
                uniqueId: userData.uniqueId
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/active/applied/jobs/hacker/account`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered active/hired applications!") {
                console.log("Successfully gathered active/hired applications!", res.data);
                
                const { applications } = res.data;

                setApplicationData(applications);
            } else {
                console.log("ERROR gathering active/hired applications...:", res.data);
            }
        }).catch((err) => {
            console.log("CRITICAL ERROR gathering active/hired applications...:", err);
        })
    }, []);

    console.log("hired applications state --- :", applications);

    const viewAndVisitEmployerListing = (employerListingID) => {
        console.log("viewAndVisitEmployerListing ran...");

        const configuration = {
            params: {
                listingId: employerListingID
            }
        }

        const baseURL = process.env.REACT_APP_BASE_URL;

        axios.get(`${baseURL}/gather/listing/all/info`, configuration).then((response) => {
            if (response.data.message === "Successfully gathered listing information!") {
                console.log("response", response.data);

                const { listing } = response.data;

                history.push(`/view/individual/employer/listing/public/${employerListingID}`, { listing })
            } else {
                console.log("error...:", response.data);
            }
        }).catch((err) => {
            console.log("Critical fetching error...:", err);
        })
    }

    const renderConditionalUponLoad = () => {
        if (typeof applications !== "undefined" && applications.length > 0) {
            return (
                <Fragment>
                    <Row>
                        {applications.map((application, index) => {
                            console.log("APPLICATION...:", application);
                            return (
                                <Col md="6" lg="4" xl="4" key={index}>
                                    <Card className="height-equal already-applied-card-wrapper">
                                        <div className="calender-widget">
                                            <div className="cal-img override-cal-img-application"></div>
                                            <div className="cal-date">
                                                <h5>{"25"}<br />{"APRIL"}</h5>
                                            </div>
                                            <div className="cal-desc text-center card-body">
                                                <h6 className="f-w-600">{`Applied approx. ${moment(application.dateApplied).fromNow()}`}</h6>
                                                <h4 className={"f-w-500"}><strong style={{ textDecorationLine: "underline" }}>Physical OR Digital Hack?</strong> {application.physicalOrDigitalOrBoth.label}</h4>
                                                <p className="text-muted mt-3 mb-0"><strong style={{ textDecorationLine: "underline" }}>Message To Employer:</strong> {application.messageToEmployer}</p>
                                                <hr />
                                                <h5 className={"f-w-500"}><strong style={{ textDecorationLine: "underline" }}>Job ID:</strong> {application.employerPostedJobId}</h5>
                                                <hr />
                                                {application.bettingOnSelfSelected === true ? <Fragment>
                                                    <div className="cal-desc text-center">
                                                        <h6 className="f-w-600 slightly-larger-sub-application-text">{"Betting/Wagered Information..."}</h6>
                                                        <p className="custom-sub-application-text">You have decided to <strong style={{ color: "#f73164", textDecorationLine: "underline" }}>wager/bet {Number(application.waggeredBidAmount).toFixed(2)} {process.env.REACT_APP_CRYPTO_TOKEN_NAME}</strong> on winning this hack (You will win this amount IF you win this hack otherwise you'll LOSE this amount)...</p>
                                                    </div>
                                                    <hr />
                                                </Fragment> : null}
                                                <Button onClick={() => viewAndVisitEmployerListing(application.employerPostedJobId)} className={"btn-square-info"} color={"info-2x"} style={{ width: "100%", marginTop: "17.5px", marginBottom: "17.5px" }} outline>View/Visit This "Employer Listing"</Button>
                                            </div>
                                            
                                        </div>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Fragment>
            );
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
export default connect(mapStateToProps, { })(withRouter(ViewAlreadyAppliedJobsHackerHelper))