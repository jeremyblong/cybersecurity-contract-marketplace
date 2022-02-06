import React, { Fragment, useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Card, Media, TabContent, TabPane, Nav, NavItem, NavLink, CardBody, CardHeader, ButtonGroup, Button } from 'reactstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from "react-router-dom";
import moment from "moment";
import ReactPlayer from "react-player";
import ShowMoreText from "react-show-more-text";

const ViewHiredHackersHelper = ({ userData }) => {

    const history = useHistory();

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
                
                const { hackers } = res.data;

                setHackersData(hackers);
            } else {
                console.log("ERROR gathering active/hired hackers...:", res.data);
            }
        }).catch((err) => {
            console.log("CRITICAL ERROR gathering active/hired hackers...:", err);
        })
    }, []);

    const viewApplicantProfile = (hackerID) => {

        history.push(`/hacker/profile/individual/view/${hackerID}`);
    }
    const manageHiredApplicant = (id) => {
        console.log("manageHiredApplicant clicked...:", id);

        history.push(`/manage/individual/hacker/already/hired/${id}`);
    }

    const renderConditionalUponLoad = () => {
        if (typeof hackers !== "undefined" && hackers.length > 0) {
            return hackers.map((hacker, index) => {
                return (
                    <Col md="6" lg="4" xl="4" key={index}>
                        <Card className="height-equal already-applied-card-wrapper">
                            <div className="calender-widget">
                                <div className="cal-img hired-video-wrapper">
                                    <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} height={"100%"} wrapper={"div"} url={require("../../../../../../assets/video/hired-video.mp4")} className="stretch-both-ways-hired-video" />
                                </div>
                                <div className="cal-desc text-center card-body">
                                    <h6 className="f-w-600">{`Applied approx. ${moment(hacker.dateApplied).fromNow()}`}</h6>
                                    <h4 className={"f-w-500"}><strong style={{ textDecorationLine: "underline" }}>Physical OR Digital Hack OR Both?</strong> {hacker.physicalOrDigitalOrBoth.label}</h4>
                                    <p className="text-muted mt-3 mb-0"><strong style={{ textDecorationLine: "underline" }}>Message To Employer:</strong> {hacker.messageToEmployer}</p>
                                    <hr />
                                    <h5 className={"f-w-500"}><strong style={{ textDecorationLine: "underline" }}>Job ID:</strong> {hacker.employerPostedJobId}</h5>
                                    <hr />
                                    {hacker.bettingOnSelfSelected === true ? <Fragment>
                                        <div className="cal-desc text-center">
                                            <h6 className="f-w-600 slightly-larger-sub-application-text" style={{ textDecorationLine: "underline" }}>{"Betting/Wagered Information..."}</h6>
                                            <p className="custom-sub-application-text color-text-secondary-hacker">{hacker.bettingOnSelfSelected === true ? `SELF-BET (Waggering ${Number(hacker.waggeredBidAmount).toFixed(2)} ${process.env.REACT_APP_CRYPTO_TOKEN_NAME} on "self" winning) - Betting in favor of themselves winning this hack!` : "NOT SELF-BETTING, OPTED-OUT AND/OR N/A."}</p>
                                        </div>
                                        <hr />
                                    </Fragment> : null}
                                    <Button onClick={() => viewApplicantProfile(hacker.applicantId)} className={"btn-square-info"} color={"info-2x"} style={{ width: "100%", marginTop: "17.5px", marginBottom: "17.5px" }} outline>View/Visit This Hacker's Profile</Button>
                                    <hr />
                                    <Button onClick={() => manageHiredApplicant(hacker.id)} className={"btn-square-secondary"} color={"secondary-2x"} style={{ width: "100%", marginTop: "17.5px", marginBottom: "17.5px" }} outline>Manage This Employee/Contractor</Button>
                                </div>
                                
                            </div>
                        </Card>
                    </Col>
                );
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