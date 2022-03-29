import React, { Fragment, useEffect, useState } from 'react';
import "./styles.css";
import { Card, CardBody, CardHeader, Col, Row, Container, Media, Input, Label, Button, Badge } from "reactstrap";
import Breadcrumb from '../../../../../../../layout/breadcrumb';
import { Rss, AlertOctagon, DollarSign } from 'react-feather';
import CountUp from 'react-countup';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import StarRatings from 'react-star-ratings';
import { Truck, Clock, Gift, CreditCard } from "react-feather";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import _ from "lodash";
import { DateRange } from 'react-date-range';
import Calendar from 'react-calendar';
import { confirmAlert } from 'react-confirm-alert';
import { NotificationManager } from 'react-notifications';
import DepositFundsSheetPaneHelper from "./sheetHelpers/depositFunds/depositFundsSheetHelper.js";

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    interactive: false
});
   


const ManageIndividualHackerAlreadyHiredHelper = ({ userData }) => {

    const history = useHistory();

    const [ currentReviews, setCurrentReviewsLength ] = useState(0);
    const [ currentHireLength, setCurrentHireLength ] = useState(0);
    const [ currentApplicationData, setCurrentApplicationData ] = useState(null);
    const [ dateDifference, setDateDifference ] = useState(null);
    const [ listing, setListingData ] = useState(null);
    const [ dates, setDatesAvailiable ] = useState(null);
    const [ isDepositOpen, setSheetDepositOpen ] = useState(false);

    const { id, jobid } = useParams();

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

    useEffect(() => {
        console.log("jobid", jobid);

        const config = {
            jobID: jobid,
            userID: userData.uniqueId
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/gather/archived/and/live/employer/listing`, config).then((res) => {
            if (res.data.message === "Successfully gathered appropriate info!") {
                console.log(res.data);

                const { listingInfo } = res.data;

                const newDatesArray = [];

                for (let index = 0; index < listingInfo.testingDatesHackers.length; index++) {
                    const selectedDate = listingInfo.testingDatesHackers[index];
                    
                    const { startDate, endDate, key } = selectedDate;
    
                    const newData = {
                        startDate: new Date(startDate),
                        endDate: new Date(endDate),
                        key
                    }
    
                    newDatesArray.push(newData);
                }

                setDatesAvailiable(newDatesArray);

                setListingData(listingInfo);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log("Critical err", err);
        })
    }, []);

    const calculateCommentsLength = (commentsArr) => {
        let sum = 0;

        for (let index = 0; index < commentsArr.length; index++) {
            const comment = commentsArr[index];
            sum += 1;
            if (typeof comment.subcomments !== "undefined" && comment.subcomments.length > 0) {
                for (let idx = 0; idx < comment.subcomments.length; idx++) {
                    sum += 1;
                }
            }
        }
        return sum;
    }

    const requestUpdateAndFeedback = () => {
        console.log("requestUpdateAndFeedback clicked/ran..");

        confirmAlert({
            title: `Are you sure you'd like to request an update?`,
            message: `Our network of hacker's expect periodic requests for updates as to what is going on with the progress related to your company. We heavily adivise against spamming however as this create's a negative enviorment for everyone involved. If you're not spamming, continue and will we notify the hacker of your wishes for an update!`,
            buttons: [
              {
                label: 'Yes, Request Update!',
                onClick: () => {
                    console.log("yes notify and run logic!");

                    const config = {
                        jobID: jobid,
                        userID: userData.uniqueId,
                        hackerID: currentApplicationData.applicantId,
                        publicCompanyName: listing.publicCompanyName,
                        employerPostedJobId: currentApplicationData.employerPostedJobId
                    }
            
                    axios.post(`${process.env.REACT_APP_BASE_URL}/notify/user/request/update/hacker`, config).then((res) => {
                        if (res.data.message === "Successfully notified the hacker of request!") {
                            console.log(res.data);

                            NotificationManager.success("We've successfully sent the desired update request to this hacker & they should be circling back with you some point soon! Check this specific page you're currently on for future updates & changes to be posted..", "Succesfully processed request & notified hacker!", 4750);
                        } else {
                            console.log("Err", res.data);

                            NotificationManager.error("An error occurred while attempting to make changes, update the hacker hiree and process overall related logic - if this problem persists, please contact support or try this action again!", "An error occurred while attempting to notifiy related hacker!", 4750);
                        }
                    }).catch((err) => {
                        console.log("Critical err", err);

                        NotificationManager.error("An error occurred while attempting to make changes, update the hacker hiree and process overall related logic - if this problem persists, please contact support or try this action again!", "An error occurred while attempting to notifiy related hacker!", 4750);
                    })
                }
              },
              {
                label: 'No, Cancel/Exit.',
                onClick: () => {
                    console.log("canelled/don't run logic");
                }
              }
            ]
        });
    }

    const handleTotalCompletion = () => {
        console.log("handleTotalCompletion ran/clicked..");

        confirmAlert({
            title: `Are you sure you'd like to request to mark this contract as 'complete'?`,
            message: `This is NOT guarenteed to be agreed-upon AND the hacker MUST 'OK/Confirm' that the job is in fact 'completed' in order to release any pending funds. We also have the option to release partial funds or funds for ONLY portions of completed work if that is more interesting/relevant...`,
            buttons: [
              {
                label: 'Yes, Request Contract Completion! (Not Guarenteed***)',
                onClick: () => {
                    console.log("yes..");

                    const configuration = {
                        signedinUserID: userData.uniqueId,
                        hackerID: currentApplicationData.applicantId,
                        generatedID: currentApplicationData.generatedID
                    }
                    axios.post(`${process.env.REACT_APP_BASE_URL}/mark/complete/request/confirmation/employer/account`, configuration).then((res) => {
                        if (res.data.message === "Successfully marked as complete - request sent!") {
                            console.log("Successfully gathered information :... ", res.data);
                            
                            NotificationManager.success("We've successfully updated and changed the appropriate information. You're request has been SENT and will be reviewed shortly by your hacker. Stay tuned!", "Successfully sent request to hacker!", 4750);

                            const { data } = res.data;

                            setCurrentApplicationData(data);
                        } else {
                            console.log("ERROR gathering active/hired applications...:", res.data);
            
                            NotificationManager.error("An unknown error occurred while attempting process your request to 'mark contract as complete & request review', if this problem persists - please contact support & report this problem!", "Could NOT gather data!", 4750);
                        }
                    }).catch((err) => {
                        console.log("CRITICAL ERROR gathering active/hired application data...:", err);
            
                        NotificationManager.error("An unknown error occurred while attempting process your request to 'mark contract as complete & request review', if this problem persists - please contact support & report this problem!", "Could NOT gather data!", 4750);
                    })
                }
              },
              {
                label: 'No, Cancel!',
                onClick: () => {
                    console.log("cancelled.");
                }
              }
            ]
        });
    }

    console.log("currentApplicationData", currentApplicationData);
    console.log("listing", listing);

    return (
        <Fragment>
            <Breadcrumb parent="Manage Live HIRED hacker" title="Manage payments, contract conditions, work submissions & more..."/>
            <DepositFundsSheetPaneHelper isDepositOpen={isDepositOpen} setSheetDepositOpen={setSheetDepositOpen} />
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
                                    <Col sm="6" md="6" xl="3" lg="3">
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
                                    <Col sm="6" md="6" xl="3" lg="3">
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
                                    <Col sm="6" md="6" xl="3" lg="3">
                                        <Card className="o-hidden">
                                            <CardBody className="bg-success b-r-4 static-top-widget-custom-hired-longer">
                                                <div className="media static-top-widget">
                                                <div className="align-self-center text-center"><DollarSign /></div>
                                                    <div className="media-body"><span className="m-0">Each confirmation marks whether or not a user has already marked this job as <strong>complete!</strong> Once marked as <strong>complete</strong>, both user's will be able to see the appropriate changes..</span>
                                                        <h4 className="mb-0 counter counter-custom-hired-account-upper">{_.has(currentApplicationData, "requestedJobCompletionReview") && currentApplicationData.requestedJobCompletionReview.approvedByHacker === true ? "Hacker Already APPROVED!" : "Hacker has NOT Approved Yet."}</h4><DollarSign className="icon-bg" />
                                                        <h4 className="mb-0 counter counter-custom-hired-account">{_.has(currentApplicationData, "requestedJobCompletionReview") && currentApplicationData.requestedJobCompletionReview.approvedByEmployer === true ? "Employer Already APPROVED!" : "Employer has NOT Approved yet."}</h4><DollarSign className="icon-bg" />
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col sm="6" md="6" xl="3" lg="3">
                                        <Card className="o-hidden">
                                            <CardBody className="bg-info b-r-4 static-top-widget-custom-hired">
                                                <div className="media static-top-widget">
                                                <div className="align-self-center text-center"><DollarSign /></div>
                                                    <div className="media-body"><span className="m-0">This project was instantiated and/or initalized...</span>
                                                        <h4 className="mb-0 counter counter-custom-hired-account"><CountUp duration={5.75} end={dateDifference !== null ? dateDifference : 0} /> Days Ago...</h4><AlertOctagon className="icon-bg" />
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>

                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {listing !== null ? <Row>
                    <Col xl="7 xl-100">
                        <Card>
                            <CardBody>
                            <div className="product-page-details">
                                <h3 style={{ textDecorationLine: "underline" }}>{listing.publicCompanyName}</h3>
                            </div>
                            <div className="product-price f-28">
                                Experience Points Awarded Winner: <em style={{ textDecorationLine: "underline" }}>{(listing.experienceAndCost.experience).toLocaleString('en')} XP Points</em>
                            </div>
                            <CardBody>
                                <Label className='label-hired-user'>Completion Timeline/Date</Label>
                                <Calendar
                                    value={new Date(listing.estimatedCompletionDate)}
                                    className={"completion-date-hired"}
                                />
                            </CardBody>
                            <hr/>
                            <Label className='label-hired-user'>Listing Description</Label>
                            <ReactMarkdown children={listing.listingDescription} className={"markdown-desc-hired"} remarkPlugins={[remarkGfm]} />
                            <Label className='label-hired-user'>Rules Of Engagement</Label>
                            <ReactMarkdown children={listing.rulesOfEngagement} className={"markdown-desc-hired"} remarkPlugins={[remarkGfm]} />
                            <hr/>
                            <div>
                                <Row>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <table className="product-page-width">
                                            <tbody>
                                                <tr>
                                                    <td> <b>Posted Date &nbsp;&nbsp;&nbsp;:</b></td>
                                                    <td>{listing.postedDate}</td>
                                                </tr>
                                                <tr>
                                                    <td> <b>Visibility &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                    <td className="txt-success">{listing.listingVisibility.label}</td>
                                                </tr>
                                                <tr>
                                                    <td> <b>{"# Of Likes"} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                    <td>{listing.likedBy.length}</td>
                                                </tr>
                                                <tr>
                                                    <td> <b>{"Desired Completion Date"} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                    <td>{moment(listing.estimatedCompletionDate).format("MM/DD/YYYY")}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Col>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <table className="product-page-width">
                                            <tbody>
                                                <tr>
                                                    <td> <b>Comment Count&nbsp;&nbsp;&nbsp;:</b></td>
                                                    <td>{listing.comments.length}</td>
                                                </tr>
                                                <tr>
                                                    <td> <b>Rank To Apply&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                    <td className="txt-success">{listing.requiredRankToApply.label}</td>
                                                </tr>
                                                <tr>
                                                    <td> <b>{"Total View(s)"}&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                    <td>{listing.totalViews}</td>
                                                </tr>
                                                <tr>
                                                    <td> <b>{"Token's To Apply"}&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                    <td>{listing.tokensRequiredToApply.label}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Col>
                                </Row>
                            </div>
                            <hr/>
                            <Label className='label-hired-user'>Tags/Hashtags</Label>
                            <br />
                            {listing !== null && typeof listing.hashtags !== "undefined" && listing.hashtags.length > 0 ? listing.hashtags.map((hashtag, idx) => {
                                return (
                                    <Fragment key={idx}>
                                        <Badge color="dark tag-pills-sm-mb">{hashtag.text}</Badge>
                                    </Fragment>
                                );
                            }) : <Fragment>
                                <h4 className='leftalign-text-hired'>No tags/hashtags are provided for this specific listing..</h4>
                            </Fragment>}
                            <hr />
                            <Row>
                                <Col md="6">
                                    <h6 className="product-title">{"share it"}</h6>
                                </Col>
                                <Col md="6">
                                    <div className="product-icon">
                                        <ul className="product-social">
                                        <li className="d-inline-block"><a href={null}><i className="fa fa-facebook"></i></a></li>
                                        <li className="d-inline-block"><a href={null}><i className="fa fa-google-plus"></i></a></li>
                                        <li className="d-inline-block"><a href={null}><i className="fa fa-twitter"></i></a></li>
                                        <li className="d-inline-block"><a href={null}><i className="fa fa-instagram"></i></a></li>
                                        <li className="d-inline-block"><a href={null}><i className="fa fa-rss"></i></a></li>
                                        </ul>
                                        <form className="d-inline-block f-right"></form>
                                    </div>
                                </Col>
                            </Row>
                            <hr/>
                            <Label className='label-hired-user'>Desired Skill's</Label>
                            <br />
                            {listing !== null && typeof listing.desiredSkills !== "undefined" && listing.desiredSkills.length > 0 ? listing.desiredSkills.map((skill, idx) => {
                                return (
                                    <Fragment key={idx}>
                                        <Badge color="light bordered-slightly-badge-light tag-pills-sm-mb">{skill.label}</Badge>
                                    </Fragment>
                                );
                            }) : <Fragment>
                                <h4 className='leftalign-text-hired'>No are provided/required for this specific job/gig..</h4>
                            </Fragment>}
                            <hr />
                            <Row>
                                <Col md="6">
                                <h6 className="product-title">{"Rate Now"}</h6>
                                </Col>
                                <Col md="6">
                                <div className="d-flex">
                                    <StarRatings
                                        rating={4.45}
                                        starRatedColor="blue"
                                        changeRating={() => {}}
                                        numberOfStars={5}
                                        name='rating'
                                    />
                                    <span className='absolute-right-hired'>ProductReview</span>
                                </div>
                                </Col>
                            </Row>
                            <hr/>
                            <div className="m-t-15">
                                <Button style={{ width: "100%" }} color="primary" className="m-r-10" onClick={() => setSheetDepositOpen(true)}>
                                    <i className="fa fa-shopping-cart mr-1"></i>Deposit Fund's In Preperation For Hacker Payment
                                </Button>
                            </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="5 xl-cs-35">
                        <Card>
                            <CardBody>
                            <div className="filter-block">
                                <h4 style={{ color: "#7366ff" }}>{"Core Information/Stat's"}</h4>
                                <ul>
                                    <li><strong>Disclosure Policy</strong>: {listing.disclosureVisibility.label}</li>
                                    <li><strong>Total View(s)</strong>: {listing.totalViews}</li>
                                    <li><strong>Likes</strong>: {listing.likes}</li>
                                    <li><strong>Dislikes</strong>: {listing.dislikes}</li>
                                    <li><strong>Type Of Hack</strong>: {listing.typeOfHack.label}</li>
                                </ul>
                            </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                            <div className="collection-filter-block">
                                <ul>
                                    <li>
                                        <div className="media"><Truck/>
                                        <div className="media-body">
                                            <h5>{"Total Number (#) Of Applicant's"}</h5>
                                            <p>{listing.applicants.length} applicant's applied</p>
                                        </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="media"><Clock/>
                                        <div className="media-body">
                                            <h5>{"Originally Posted On"}</h5>
                                            <p>{moment(listing.postedDate).format("MM/DD/YYYY hh:mm:ss a")}</p>
                                        </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="media"><Gift/>
                                        <div className="media-body">
                                            <h5>{"Total Accumlative Comments/Sub-Comment's"}</h5>
                                            <p>{calculateCommentsLength(listing.comments)} total general comment's</p>
                                        </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="media"><CreditCard/>
                                        <div className="media-body">
                                            <h5>{"Uploaded File(s) For Hacker"}</h5>
                                            <p>{listing.uploadedFiles.length} files ready for hacker(s)</p>
                                        </div>
                                        </div>
                                    </li>
                                </ul>
                                <hr />
                                <Label style={{ marginTop: "12.5px" }} className='label-hired-user'>Dates Availiable (Phyiscal Hacking/hacks)</Label>
                                <DateRange 
                                    showDateDisplay={false}
                                    ranges={dates}
                                    direction={"horizontal"}
                                    months={2}
                                    className={"daterange-individual-hired"}
                                    onChange={() => {}}
                                />
                                <hr />
                                <Label style={{ marginTop: "25px" }} className='label-hired-user'>Out-Of-Scope Vulnerabilities</Label>
                                <ReactMarkdown children={listing.outOfScopeVulnerabilities} className={"markdown-desc-hired"} remarkPlugins={[remarkGfm]} />
                                {typeof listing.businessAddress !== "undefined" && _.has(listing, "businessAddress") ? <Fragment>
                                    <hr />
                                    <p className='business-address-hired'>Business Physical Address: {listing.businessAddress.address.freeformAddress}</p>
                                    <Map
                                        center={[listing.businessAddress.position.lon, listing.businessAddress.position.lat]}
                                        style="mapbox://styles/mapbox/streets-v9"
                                        containerStyle={{
                                            height: "275px",
                                            width: '100%',
                                            border: "2px solid grey"
                                        }}
                                    >
                                        <Marker
                                            coordinates={[listing.businessAddress.position.lon, listing.businessAddress.position.lat]}
                                            anchor="bottom"
                                        >
                                            <img src={require("../../../../../../../assets/icons/location.png")}/>
                                        </Marker>
                                    </Map>
                                </Fragment> : null}
                            </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row> : <Fragment>
                    <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                        <p>
                            <Skeleton count={30} />
                        </p>
                    </SkeletonTheme>
                </Fragment>}
                <Row>
                    <Col sm="12" md="6" lg="6" xl="6">
                        <Card className={"bordered-shadowed-card"}>
                            <CardBody>
                                <Media className="p-20 fire-employee-wrapper">
                                    <div className="radio radio-danger mr-3">
                                        <Label for="radio14"></Label>
                                    </div>
                                    <Media body>
                                        <h6 className="mt-0 mega-title-badge mega-badge-heavy-update">Request Support To Fire/Terminate Employee<span className="badge badge-danger pull-right digits digits-smaller-subsized-update">{"TERMINATE HACKER"}</span></h6>
                                        <p>{"Redirect to 'termination page' - if you decide to terminate - any previously collected already OWED dues will be transferred to the recipient/hacker and all remaining unused funds will be refunded (minus relevant fee's)"}</p>
                                        <hr />
                                        <Button className={"btn-square-danger"} color={"danger-2x"} outline style={{ width: "100%" }}>Request Termination Of Hacker/Client (ONLY through support directly)</Button>
                                    </Media>
                                </Media>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" md="6" lg="6" xl="6">
                        <Card className={"bordered-shadowed-card"}>
                            <CardBody>
                                <Media className="p-20 request-update-employee-wrapper">
                                    <div className="radio radio-info mr-3">
                                        <Label for="radio14"></Label>
                                    </div>
                                    <Media body>
                                        <h6 className="mt-0 mega-title-badge mega-badge-heavy-update">Request Immediate Update/Feedback From Hacker/Contractor<span className="badge badge-info pull-right digits digits-smaller-subsized-update">{"REQUEST UPDATE(S)"}</span></h6>
                                        <p>{"Request any relevant updates from this hired hacker/contractor, This will hopefully allow for an immediate-documented update for your records. This action is typically used to document delayed reactions/action's regarding a hired hacker NOT following through with their commitments. Use this if you're concerned about progress updates AND want the system to document such changes/updates..."}</p>
                                        <hr />
                                        <Button onClick={requestUpdateAndFeedback} className={"btn-square-info"} color={"info-2x"} outline style={{ width: "100%" }}>Request Immediate Update/Feedback</Button>
                                    </Media>
                                </Media>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className={"bordered-shadowed-card"}>
                            <CardBody>
                                <Card className="card-absolute payment-card-actions-shadow-wrapper">
                                    <CardHeader className="bg-success">
                                        <h5 style={{ textDecorationLine: "underline", color: "white" }}>Manage Payment Related Logic</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <p>Do you need to manage your payment's regarding this specific hacker/contractor ({currentApplicationData !== null ? currentApplicationData.applicantName : "---"})? Utilize the action below to redirect to manage <strong>ALL PAYMENT RELATED</strong> tasks. You will be able to make <em>partial payments</em>, complete payments, setup payment schedules/payment-times and much more after being redirected to the approriate page...</p>
                                        <hr />
                                        <Button onClick={() => history.push(`/payments/employer/account/manage/pay/hacker/${id}`)} className={"btn-square-success"} color={"success-2x"} outline style={{ width: "100%" }}>Make payments (partial/full), set delayed payments & much more...</Button>
                                    </CardBody>
                                </Card>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className={"bordered-shadowed-card"}>
                            <CardBody>
                                <Card className="card-absolute payment-card-actions-shadow-wrapper">
                                    <CardHeader className="bg-primary">
                                        <h5 style={{ textDecorationLine: "underline", color: "white" }}>Manage Payment Related Logic</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <p>View <strong>updates & new data submissions</strong> from the hacker/contractor you've employed on this particular job. You will find vulnerability reports, "hack findings" and any other evidence based results produced from the hacker's infiltration techniques.. This includes but is not limited to the exploit type found, vulnerability risk/classification, related attached files and much more.. Check it out!</p>
                                        <hr />
                                        <Button onClick={() => history.push(`/individual/hiring/job/data/view/manage/${currentApplicationData.generatedID}`)} className={"btn-square-primary"} color={"primary-2x"} outline style={{ width: "100%" }}>View Submitted Updates/Information From Hacker</Button>
                                    </CardBody>
                                </Card>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className={"bordered-shadowed-card"}>
                            <CardBody>
                                <Card className="card-absolute payment-card-actions-shadow-wrapper">
                                    <CardHeader className="bg-secondary">
                                        <h5 style={{ textDecorationLine: "underline", color: "white" }}>Mark Job As Complete & Request Confirmation From Hacker</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <p>This will initiate the <strong>nearing of completion</strong> for both you and the other user (hacker). You should <strong>ONLY</strong> activate this option <strong>IF YOU'RE ENTIRELY FINISHED</strong> with said contract & are requesting to end/complete the job to release any pending resulting funds/money to be credited to your account..</p>
                                        <hr />
                                        <p className='lead'>This will <strong>COMPLETE</strong> this entire process-flow and once <strong>confirmed by both parties</strong> involved, will release all pending funds that you've deposited previously in which {process.env.REACT_APP_APPLICATION_NAME} has collected and held until the release point..</p>
                                        <hr />
                                        <Button onClick={() => handleTotalCompletion()} className={"btn-square-secondary"} color={"secondary-2x"} outline style={{ width: "100%" }}>Mark Job As Complete & Request Confirmation (from hacker)</Button>
                                    </CardBody>
                                </Card>
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


// exp and skills