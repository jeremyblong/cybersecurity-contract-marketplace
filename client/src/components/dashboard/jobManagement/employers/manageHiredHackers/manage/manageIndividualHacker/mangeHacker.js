import React, { Fragment, useEffect, useState } from 'react';
import "./styles.css";
import { Card, CardBody, CardHeader, Col, Row, Container } from "reactstrap";
import Breadcrumb from '../../../../../../../layout/breadcrumb';
import { Rss, AlertOctagon, Calendar, DollarSign } from 'react-feather';
import CountUp from 'react-countup';
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";

const ManageIndividualHackerAlreadyHiredHelper = ({ userData }) => {

    const [ currentReviews, setCurrentReviewsLength ] = useState(0);
    const [ currentHireLength, setCurrentHireLength ] = useState(0);
    const [ currentApplicationData, setCurrentApplicationData ] = useState(null);
    const [ dateDifference, setDateDifference ] = useState(null);

    const { id } = useParams();

    console.log("ID from params...:", id);

    useEffect(() => {
        const config = {
            params: {
                activeHiredID: id,
                employerID: userData.uniqueId
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/core/user/information/related/hired/hackers`, config).then((res) => {
            if (res.data.message === "Successfully gathered appropriate info!") {
                console.log(res.data);

                const { currentHires, reviews, currentApplication } = res.data;

                const currentDateMoment = moment(new Date());
                const initiated = moment(currentApplication.date);

                setDateDifference(currentDateMoment.diff(initiated, 'days'))
                setCurrentReviewsLength(reviews);
                setCurrentHireLength(currentHires);
                setCurrentApplicationData(currentApplication);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log("Critical err", err);
        })
    }, []);


    console.log("currentApplicationData", currentApplicationData);
    console.log("dateDifference", dateDifference);

    return (
        <Fragment>
            <Breadcrumb parent="Manage Live HIRED hacker" title="Manage payments, contract conditions, work submissions & more..."/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className={"card-manage-hacker-margin"}>
                            <CardHeader className="b-l-primary border-3">
                                <h5>Manage this applicant from payments to reviews & work submissions & more...</h5>
                                <p style={{ paddingTop: "7.5px" }}>Here a few related & unrelated statistics related to job-data (left two are general while the right two are specific to this job...)</p>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col sm="6" xl="3" lg="3">
                                        <Card className="o-hidden">
                                            <CardBody className="bg-primary b-r-4 card-body static-top-widget-custom-hired">
                                                <div className="media static-top-widget">
                                                <div className="align-self-center text-center"><Rss /></div>
                                                    <div className="media-body"><span className="m-0"># Of Current Reviews And/Or Completed Gigs (Employer Statistics)</span>
                                                        <h4 className="mb-0 counter counter-custom-hired-account"><CountUp duration={5.75} end={currentReviews} /> total previous gigs/jobs</h4><Rss className="icon-bg" />
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col sm="6" xl="3" lg="3">
                                        <Card className="o-hidden">
                                            <div className="bg-secondary b-r-4 card-body static-top-widget-custom-hired">
                                                <div className="media static-top-widget">
                                                <div className="align-self-center text-center"><AlertOctagon /></div>
                                                    <div className="media-body"><span className="m-0"># Of <strong>Current</strong> And/Or Active Hire's (Employer Statistics)</span>
                                                        <h4 className="mb-0 counter counter-custom-hired-account"><CountUp duration={5.75} end={currentHireLength} /> current hire's</h4><AlertOctagon className="icon-bg" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col sm="6" xl="3" lg="3">
                                        <Card className="o-hidden">
                                            <CardBody className="bg-primary b-r-4 static-top-widget-custom-hired">
                                                <div className="media static-top-widget">
                                                <div className="align-self-center text-center"><DollarSign /></div>
                                                    <div className="media-body"><span className="m-0">{currentApplicationData !== null && currentApplicationData.bettingOnSelfSelected === true ? "Hacker is gambling/betting on themselves!" : "Hacker has OPTED-OUT of gambling/betting on self."}</span>
                                                        <h4 className="mb-0 counter counter-custom-hired-account"><CountUp duration={5.75} end={currentApplicationData !== null && currentApplicationData.bettingOnSelfSelected === true ? Math.floor(Number(currentApplicationData.waggeredBidAmount)) : 0} /> {process.env.REACT_APP_CRYPTO_TOKEN_NAME} Waggered/Betted</h4><DollarSign className="icon-bg" />
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col sm="6" xl="3" lg="3">
                                        <Card className="o-hidden">
                                            <CardBody className="bg-info b-r-4 static-top-widget-custom-hired">
                                                <div className="media static-top-widget">
                                                <div className="align-self-center text-center"><Calendar /></div>
                                                    <div className="media-body"><span className="m-0">This project was instantiated and/or initalized...</span>
                                                        <h4 className="mb-0 counter counter-custom-hired-account"><CountUp duration={5.75} end={dateDifference !== null ? dateDifference : 0} /> Days Ago...</h4><Calendar className="icon-bg" />
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md="6" lg="6" xl="6">
                        <Card className={"bordered-shadowed-card"}>
                            <CardBody>

                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" md="6" lg="6" xl="6">
                        <Card className={"bordered-shadowed-card"}>
                            <CardBody>
                                
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md="7" lg="7" xl="7">
                        <Card className={"bordered-shadowed-card"}>
                            <CardBody>

                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" md="5" lg="5" xl="5">
                        <Card className={"bordered-shadowed-card"}>
                            <CardBody>
                                
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md="4" lg="4" xl="4">
                        <Card className={"bordered-shadowed-card"}>
                            <CardBody>

                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" md="8" lg="8" xl="8">
                        <Card className={"bordered-shadowed-card"}>
                            <CardBody>
                                
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
export default connect(mapStateToProps, { })(ManageIndividualHackerAlreadyHiredHelper);
