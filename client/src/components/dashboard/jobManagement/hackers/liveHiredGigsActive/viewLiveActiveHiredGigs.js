import React, { useState, useEffect, Fragment } from 'react';
import "./styles.css";
import axios from "axios";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Progress, Badge } from 'reactstrap';
import ShowMoreText from "react-show-more-text";
import moment from "moment";
import Breadcrumb from '../../../../../layout/breadcrumb'


const ViewLiveActivehiredJobsGigsDisplayHelper = ({ userData }) => {
    const [ listings, setListings ] = useState([]);
    const [ isExpanded, setExpanded ] = useState({});

    const history = useHistory();

    useEffect(() => {
        const configuration = {
            params: {
                uniqueId: userData.uniqueId,
                accountType: userData.accountType
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/active/hired/jobs/list/full`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered active/hired jobs!") {
                console.log("Successfully gathered active jobs :... ", res.data);
                
                const { listingData } = res.data;

                let newObjCreation = {};

                for (let index = 0; index < listingData.length; index++) {
                    newObjCreation[`expanded-${index}`] = false;
                }

                setExpanded(newObjCreation);

                setListings(listingData);
            } else {
                console.log("ERROR gathering active/hired applications...:", res.data);
            }
        }).catch((err) => {
            console.log("CRITICAL ERROR gathering active/hired applications...:", err);
        })
    }, [])

    const calculateType = (type) => {
        switch (type) {
            case "both-assets":
                return "Both Digital & Physical"
                break;
            case "physical":
                return "Physical Hack ONLY";
                break;
            case "digital":
                return "Digital Hack ONLY";
                break;
            default:
                break;
        }
    }

    console.log("isExpanded state is...:", isExpanded);
    
    return (
        <Fragment>
            <Breadcrumb parent="ALL Actively Employed Pending Contracted Jobs (Pending/Live Jobs)" title="Select the job you wish to manage further..." />
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card style={{ marginTop: "17.5px" }}>
                            <CardHeader className={"b-l-info"}>
                                <h3 className='cardheader-active-jobs-main'>View/Manage Your Active Hired Jobs/Gigs...</h3>
                                <p style={{ marginTop: "7.5px" }}>Below you will be able to access each of your "hired" job's and view, edit, modify and complete various tasks and/or data related to that specific job/contract. This is essentially the most important part of managing active gigs/contacts as you will be able to manage and complete any required relevant tasks ALL from WITHIN each of these individual job pages (the following page after being redirected to individual page)</p>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    {typeof listings !== "undefined" && listings.length > 0 ? listings.map((listing, index) => {
                                        console.log("listing", listing);

                                        const { coreEmployerData } = listing;

                                        const now = moment();
                                        const startDate = moment(listing.dateApplied); // starting date object
                                        const endDate = moment(listing.employerPostedListingInfo.estimatedCompletionDate); // this is a date object

                                        const percentage = now.diff(startDate) / endDate.diff(startDate) * 100;

                                        const progress = Math.floor(Math.random() * (100 - 0 + 1) + 0);
                                        const employerName = `${listing.coreEmployerData.firstName} ${listing.coreEmployerData.lastName}`;
                                        const secondaryOrNot = (index % 2 === 1) ? true : false;

                                        return (
                                            <Fragment key={index}>
                                                <Col sm="12" md="4" lg="4" xl="4" className="mt-4">
                                                    <div className={secondaryOrNot === true ? "project-box add-shadow-auction-wrapper-secondary" : "project-box add-shadow-auction-wrapper-info"}>
                                                        <span className={`badge ${index % 2 === 1 ? 'badge-secondary' : 'badge-info'}`}>{"Active/Current Job You're Employed On"}</span>
                                                        <h6 className="auction-mapped-title">You've recently been hire by the employer named <strong style={{ color: "#51bb25", fontWeight: "bold", textDecorationLine: "underline" }}>{employerName}</strong> with username of <strong style={{ color: "#51bb25", fontWeight: "bold", textDecorationLine: "underline" }}>{coreEmployerData.username}</strong>, below are your job details!</h6>
                                                        <div className="media">
                                                            <img className="img-20 mr-1 rounded-circle" src={require(`../../../../../assets/images/user/user.png`)} alt="" />
                                                        </div>
                                                        <p style={{ textDecorationLine: "underline", fontWeight: "bold" }}>Submitted approach to specific task/gig: </p>
                                                        <ShowMoreText
                                                            /* Default options */
                                                            lines={4}
                                                            more="Show more"
                                                            less="Show less"
                                                            className="content-css"
                                                            anchorClass="my-anchor-css-class"
                                                            onClick={(current) => setExpanded(prevState => {
                                                                return {
                                                                    ...prevState,
                                                                    [`expanded-${index}`]: !current
                                                                }
                                                            })}
                                                            expanded={isExpanded[`expanded-${index}`]}
                                                            width={280}
                                                            truncatedEndingComponent={"... "}
                                                        >   
                                                            <p>{listing.technicalApproachToHack}</p>
                                                        </ShowMoreText>
                                                        <hr />
                                                        <Row style={{ marginTop: "32.5px" }} className="details">
                                                            <Col xs="8" lg="8" xl="8" md="8"><span className="span-betting">Date Originally Applied </span></Col>
                                                            <Col xs="4" lg="4" xl="4" md="4" className={"spacer-col-span-auction"}><span className={secondaryOrNot === true ? 'text-secondary-custom' : 'text-info-custom'}>{listing.legibleDateApplied}</span></Col>
                                                            <Col xs="8" lg="8" xl="8" md="8"><span className="span-betting">Physical/Digital Hack:</span></Col>
                                                            <Col xs="4" lg="4" xl="4" md="4" className={"spacer-col-span-auction"}><span className={secondaryOrNot === true ? 'text-secondary-custom' : 'text-info-custom'}>{calculateType(listing.physicalOrDigitalOrBoth.value)}</span></Col>
                                                            <Col xs="8" lg="8" xl="8" md="8"> <span className="span-betting">Job Started </span></Col>
                                                            <Col xs="4" lg="4" xl="4" md="4" className={"spacer-col-span-auction"}><span className={secondaryOrNot === true ? 'text-secondary-custom' : 'text-info-custom'}>{moment(listing.date).fromNow()}</span></Col>
                                                            <Col xs="8" lg="8" xl="8" md="8"> <span className="span-betting"># People Following This Employer</span></Col>
                                                            <Col xs="4" lg="4" xl="4" md="4" className={"spacer-col-span-auction"}><span className={secondaryOrNot === true ? 'text-secondary-custom' : 'text-info-custom'}>{coreEmployerData.currentlyFollowedBy.length} Following</span></Col>
                                                            <Col xs="8" lg="8" xl="8" md="8"> <span className="span-betting"># Of Previously Completed Jobs</span></Col>
                                                            <Col xs="4" lg="4" xl="4" md="4" className={"spacer-col-span-auction"}><span className={secondaryOrNot === true ? 'text-secondary-custom' : 'text-info-custom'}>{coreEmployerData.completedJobs} Completed Jobs</span></Col>
                                                            <Col xs="8" lg="8" xl="8" md="8"> <span className="span-betting">Total (USD-$) Est. Total/Completion</span></Col>
                                                            <Col xs="4" lg="4" xl="4" md="4" className={"spacer-col-span-auction"}><span style={{ fontWeight: "bold", textDecorationLine: "underline" }} className={"txt-success"}>${Number(listing.amountOfMoneyUponCompletion).toFixed(2)} Est. Total Proceeds</span></Col>
                                                        </Row>
                                                        <div className="customers">
                                                        <ul>
                                                            <li className="d-inline-block"><img className="img-30 rounded-circle" src={require(`../../../../../assets/images/user/2.png`)} alt="" /></li>
                                                            <li className="d-inline-block"><img className="img-30 rounded-circle" src={require(`../../../../../assets/images/user/3.png`)} alt="" /></li>
                                                            <li className="d-inline-block"><img className="img-30 rounded-circle" src={require(`../../../../../assets/images/user/user.png`)} alt="" /></li>
                                                            <li className="d-inline-block ml-2">
                                                            <p className="f-12">{`+0 More`}</p>
                                                            </li>
                                                        </ul>
                                                        </div>
                                                        <div className="project-status mt-4">
                                                        <div className="media mb-0">
                                                            <p style={{ paddingBottom: "12.5px" }} className={secondaryOrNot === true ? "remove-bold-restyle-auction-left-secondary" : "remove-bold-restyle-auction-left-info"}>Time Remaining To Complete Job</p>
                                                            {/* <div className="media-body text-right"><span>Time Remaining To Complete Job</span></div> */}
                                                        </div>
                                                        {progress === "100" ?
                                                            <Progress className="sm-progress-bar progress-bar-animated" striped color={secondaryOrNot === true ? "secondary" : "info"} value={percentage} style={{ height: "7.5px" }} />
                                                            :
                                                            <Progress className="sm-progress-bar progress-bar-animated" striped color={secondaryOrNot === true ? "secondary" : "info"} value={percentage} style={{ height: "7.5px" }} />
                                                        }

                                                        </div>
                                                        <div className="centered-both-ways bottom-container-auction">
                                                            <Button onClick={() => {
                                                                history.push(`/individual/hired/job/data/view/manage/${listing.generatedID}`)
                                                            }} className={secondaryOrNot === true ? "btn-square-secondary" : "btn-square-info"} outline color={secondaryOrNot === true ? "secondary-2x" : "info-2x"} style={{ width: "82.5%" }}>View/Manage Listing Data</Button>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Fragment>
                                        );
                                    }) : <Fragment>
                                        <img src={require("../../../../../assets/images/no-current-hired-results.png")} className={"noresultsimg"} />
                                    </Fragment>}
                                </Row>
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
export default connect(mapStateToProps, { })(withRouter(ViewLiveActivehiredJobsGigsDisplayHelper));