import React, { Fragment, useState, useEffect, useRef } from 'react';
import Breadcrumb from '../../../../../../../layout/breadcrumb'
import { Container, Row, Col, Card, Button, Media, CardBody, CardHeader, ListGroupItem, ListGroup, Label, Badge } from 'reactstrap'
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import "./styles.css";
import { Rss, AlertOctagon, DollarSign, Truck, Clock, Gift, CreditCard, Eye } from 'react-feather';
import CountUp from 'react-countup';
import moment from "moment";
import StarRatings from 'react-star-ratings';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import _ from "lodash";
import { DateRange } from 'react-date-range';
import Calendar from 'react-calendar';
import MessagingPaneMessageEmployerHelper from "./panes/messagePane/messageSendPane.js";
import { confirmAlert } from 'react-confirm-alert';
import { CopyToClipboard } from 'react-copy-to-clipboard';


const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    interactive: false
});



const ViewIndividualLiveHiredhackingJobHelper = ({ userData }) => {

    const { id } = useParams();


    const [ messagePaneOpen, setMessagePaneState ] = useState(false);
    const [ state, setState ] = useState({ nav1: null, nav2: null });
    const [ listing, setListingData ] = useState(null);
    const [ info, setInfoData ] = useState(null);
    const [ currentApplicationData, setCurrentApplicationData ] = useState(null);
    const [ dates, setDatesAvailiable ] = useState(null);
    
    const slider1 = useRef();
    const slider2 = useRef();

    useEffect(() => {
        setState({
            nav1: slider1.current,
            nav2: slider2.current
          });
      } ,[]);

    const history = useHistory();

    useEffect(() => {
        const configuration = {
            params: {
                uniqueId: userData.uniqueId,
                generatedID: id
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/hired/employer/information/hacker/account`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered active hired data!") {
                console.log("Successfully gathered information :... ", res.data);
                
                const { info } = res.data;

                const newDatesArray = [];

                for (let index = 0; index < info.employerPostedListingInfo.testingDatesHackers.length; index++) {
                    const selectedDate = info.employerPostedListingInfo.testingDatesHackers[index];
                    
                    const { startDate, endDate, key } = selectedDate;
    
                    const newData = {
                        startDate: new Date(startDate),
                        endDate: new Date(endDate),
                        key
                    }
    
                    newDatesArray.push(newData);
                }
                setInfoData(info);
                setDatesAvailiable(newDatesArray);
                setListingData(info.employerPostedListingInfo);
            } else {
                console.log("ERROR gathering active/hired applications...:", res.data);

                NotificationManager.error("An unknown error occurred while attempting to fetch core information about this specific job, if this problem persists - please contact support & report this problem!", "Could NOT gather data!", 4750);
            }
        }).catch((err) => {
            console.log("CRITICAL ERROR gathering active/hired application data...:", err);

            NotificationManager.error("An unknown error occurred while attempting to fetch core information about this specific job, if this problem persists - please contact support & report this problem!", "Could NOT gather data!", 4750);
        })
    }, [])
    
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
    const handleTotalCompletion = () => {
        console.log("handleTotalCompletion ran/clicked..");

        confirmAlert({
            title: `Are you sure you'd like to request to mark this contract as 'complete'?`,
            message: `This is NOT guarenteed to be agreed-upon AND the employer MUST 'OK/Confirm' that the job is in fact 'completed' in order to release any pending funds. We also have the option to release partial funds or funds for ONLY portions of completed work if that is more interesting/relevant...`,
            buttons: [
              {
                label: 'Yes, Request Contract Completion! (Not Guarenteed***)',
                onClick: () => {
                    console.log("yes..");

                    const configuration = {
                        signedinUserID: userData.uniqueId,
                        employerID: info.employerPosterId,
                        generatedID: id
                    }
                    axios.post(`${process.env.REACT_APP_BASE_URL}/mark/complete/request/confirmation/hacker/account`, configuration).then((res) => {
                        if (res.data.message === "Successfully marked as complete - request sent!") {
                            console.log("Successfully gathered information :... ", res.data);
                            
                            NotificationManager.success("We've successfully updated and changed the appropriate information. You're request has been SENT and will be reviewed shortly by your employer. Stay tuned!", "Successfully sent request to employer!", 4750);

                            const { data } = res.data;

                            setInfoData(data);
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

    const redirectToReviewAsHackerPage = () => {

        if (_.has(info, "requestedJobCompletionReview") && info.requestedJobCompletionReview.approvedByEmployer === true && info.requestedJobCompletionReview.approvedByHacker === true) {
            history.push(`/leave/employer/review/hacker/account/${id}/${info.employerPosterId}`);
        } else {
            NotificationManager.warning("BOTH user's have NOT marked this job as complete, yet... You MUST wait until both yourself and the employer have marked this contract as 'complete' to start the review process.", "Cannot review yet, need both user's completion mark first!", 4750);
        }
    }

    return (
        <Fragment>
            <Breadcrumb parent="Manage Your ACTIVE Job Data & Take Various Actions.." title="Manage This Active Contracted Information/Data!" />
            <MessagingPaneMessageEmployerHelper employerID={info !== null ? info.employerPosterId : null} employerName={info !== null ? info.employerPostedListingInfo.publicCompanyName : "Unknown - Loading..."} messagePaneOpen={messagePaneOpen} setMessagePaneState={setMessagePaneState} />
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className={"card-manage-hacker-margin"}>
                            <CardHeader className="b-l-primary border-3">
                                <h5>Manage this active job's related data, uploads, work submissions & more...!</h5>
                                <p style={{ paddingTop: "7.5px" }}>You will be able to <strong>FULLY manage</strong> this job's data & information all through the various logic on the form below. Check out all the various options to explore the best way to handle work submissions, reviews & much much more.</p>
                            </CardHeader>
                            <CardBody>
                                {info !== null ? <Fragment>
                                    <Row>
                                        <Col md="6" sm="6" xl="3" lg="3">
                                            <Card className="o-hidden">
                                                <CardBody className="bg-primary b-r-4 card-body static-top-widget-custom-hired">
                                                    <div className="media static-top-widget">
                                                    <div className="align-self-center text-center"><DollarSign /></div>
                                                        <div style={{ marginBottom: "32.5px" }} className="media-body"><span className="m-0 special-text-spanned">Money To Be Earned Upon Completion</span>
                                                            <h4 className="mb-0 counter counter-custom-hired-account">$<CountUp duration={5.75} end={Number(info.amountOfMoneyUponCompletion)} /> Will Be Earned!</h4><Rss className="icon-bg" />
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col md="6" sm="6" xl="3" lg="3">
                                            <Card className="o-hidden">
                                                <div className="bg-secondary b-r-4 card-body static-top-widget-custom-hired">
                                                    <div className="media static-top-widget">
                                                    <div className="align-self-center text-center"><AlertOctagon /></div>
                                                        <div style={{ marginBottom: "32.5px" }} className="media-body"><span className="m-0 special-text-spanned"># Of <strong>attached</strong> file(s)</span>
                                                            <h4 className="mb-0 counter counter-custom-hired-account"><CountUp duration={5.75} end={info.attachedFiles.length} /> file's were attached..</h4><AlertOctagon className="icon-bg" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Col>
                                        <Col md="6" sm="6" xl="3" lg="3">
                                            <Card className="o-hidden">
                                                <CardBody className="bg-primary b-r-4 static-top-widget-custom-hired">
                                                    <div className="media static-top-widget">
                                                    <div className="align-self-center text-center"><Rss /></div>
                                                        <div style={{ marginBottom: "32.5px" }} className="media-body"><span className="m-0 special-text-spanned"># Of Total Applicant's</span>
                                                            <h4 className="mb-0 counter counter-custom-hired-account">There are <CountUp duration={5.75} end={info.employerPostedListingInfo.applicants.length} /> total applicant's</h4><DollarSign className="icon-bg" />
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col md="6" sm="6" xl="3" lg="3">
                                            <Card className="o-hidden">
                                                <CardBody className="bg-success b-r-4 static-top-widget-custom-hired-longer">
                                                    <div className="media static-top-widget">
                                                    <div className="align-self-center text-center"><Eye /></div>
                                                        <div className="media-body"><span className="m-0">Each confirmation marks whether or not a user has already marked this job as <strong>complete!</strong> Once marked as <strong>complete</strong>, both user's will be able to see the appropriate changes..</span>
                                                            <h4 className="mb-0 counter counter-custom-hired-account-upper">{_.has(info, "requestedJobCompletionReview") && info.requestedJobCompletionReview.approvedByHacker === true ? "Hacker Already APPROVED!" : "Hacker has NOT Approved Yet."}</h4><DollarSign className="icon-bg" />
                                                            <h4 className="mb-0 counter counter-custom-hired-account">{_.has(info, "requestedJobCompletionReview") && info.requestedJobCompletionReview.approvedByEmployer === true ? "Employer Already APPROVED!" : "Employer has NOT Approved yet."}</h4><DollarSign className="icon-bg" />
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Fragment> : <Fragment>
                                    <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                        <p>
                                            <Skeleton count={15} />
                                        </p>
                                    </SkeletonTheme>
                                </Fragment>}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {listing !== null ? <Fragment>
                    <Row>
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
                                    </div>
                                    </Col>
                                </Row>
                                <hr/>
                                <div className="m-t-15">
                                    <Button style={{ width: "100%" }} color="primary" className="m-r-10" onClick={() => setMessagePaneState(true)}>
                                        <i class="fa fa-solid fa-comment-dots mr-1"></i>Send Message To Your Employer<i class="fa fa-solid fa-comment-dots ml-1"></i>
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
                    </Row>
                </Fragment> : <Fragment>
                    <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                        <p>
                            <Skeleton count={30} />
                        </p>
                    </SkeletonTheme>
                </Fragment>}
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className={"bordered-shadowed-card"}>
                            <CardBody>
                                <Media className="p-20 fire-employee-wrapper">
                                    <div className="radio radio-success mr-3">
                                        
                                    </div>
                                    <Media body>
                                        <h6 className="mt-0 mega-title-badge mega-badge-heavy-update">Submit Results And/Or Hacking Data/Progress<span className="badge badge-success pull-right digits digits-smaller-subsized-update">{"SUBMIT RESULTS & PROGRESS"}</span></h6>
                                        <p>{"Manage updates, data and various changes so your employer knows exactly what's been going on and what progress you've made recently. It's good habit to continously submit new information/data to the employer so they can make improvements as your hack proceeds/continues... Fixing previously broken logic."}</p>
                                        <hr />
                                        <Button className={"btn-square-success"} color={"success-2x"} outline style={{ width: "100%" }} onClick={() => {
                                            history.push(`/submit/progress/updates/live/hacking/contract/${info.generatedID}`);
                                        }}>Submit Updates & Results</Button>
                                        <hr />
                                        <p>Submit your updates for this employer and/or portions of an overall completed contract/job! You <strong>should only</strong> submit relevant data to this employer to save time on both ends. <strong>IF an employer</strong> is <strong>slacking/lacking</strong> payment deposits, do not submit work until you are sure funds have been deposited so you can be paid upon agreement of completion of this contract or a portion of this contract.</p>
                                    </Media>
                                </Media>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md="6" lg="6" xl="6">
                        <Card className={"bordered-shadowed-card"}>
                            <CardBody>
                                <Card className="card-absolute payment-card-actions-shadow-wrapper">
                                    <CardHeader className="bg-primary">
                                        <h5 style={{ textDecorationLine: "underline", color: "white" }}>View/Manage Submitted Contract Related Data</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <p>View your <strong>previously submitted</strong> information that you've submitted for the employer to review. This can include but not be limited to progress reports, hack/vulnerability findings or really any supporting documentation on any progress you've made with this contracted hack.</p>
                                        <hr />
                                        <Button onClick={() => history.push(`/view/submitted/hacker/information/hired/job/submissions/${id}`)} className={"btn-square-primary"} color={"primary-2x"} outline style={{ width: "100%" }}>View Details & Submitted Data</Button>
                                    </CardBody>
                                </Card>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" lg="6" md="6" xl="6">
                        <Card className='shadow'>
                            <CardHeader className='b-l-primary b-r-primary'>
                                <h3><strong>IF BOTH</strong> user's (employer & hacker alike) have agreed that this job is complete, you may leave a review for this user.</h3>
                                <p>We HIGHLY recommend leaving reviews immediately as these are vital to helping other hackers/employer guage the skills & competency of other user's on our platform. <strong>IF</strong> you do <strong>not</strong> leave a review, the other user's review will <strong>still be posted to your profile</strong> regardless if you decided to complete your half. This typically happens after 1 week of innactivity..</p>
                                <hr />
                                {_.has(info, "generatedAccessKeyReview") ? <CopyToClipboard text={info.generatedAccessKeyReview}
                                    onCopy={() => {
                                        NotificationManager.success("Successfully copied code and/or 'review code' to clipboard - you can now paste it!", "Successfully copied to clipboard!", 4750);
                                    }}>
                                    <span className='spantext-copy'>Copy your 'review code' by clicking here - {info.generatedAccessKeyReview} <em style={{ color: "#000" }}>(You will need this before proceeding to the 'review' page)</em></span>
                                </CopyToClipboard> : <span className='spantext-copy'>Your 'review code' is NOT availiable yet, please wait till <strong>BOTH USERS</strong> have agreed the job is 'complete'.. <em style={{ color: "#000" }}>(You will need this before proceeding to the 'review' page)</em></span>}
                            </CardHeader>
                            <CardBody>
                                <Button onClick={() => redirectToReviewAsHackerPage()} className={"btn-square-primary"} color={"primary-2x"} outline style={{ width: "100%" }}>Leave a review for this user</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xl="12 xl-100" md="12" sm="12" sm="12">
                        <Card className="bg-dark">
                            <CardBody className='full-payment-block'>
                                <h3 className='previous-payment-header'>View previous payment's made on this specific contract/gig</h3>
                                <p className='previous-payment-sub'>These are PREVIOUS payment's made by BOTH users including yourself & the contracted user. This data will be identical on the {userData.accountType === "employers" ? "hacker's" : "employer's"} account while viewing this specific contracted job.</p>
                                <ListGroup>
                                    {info !== null && typeof info.paymentHistory !== "undefined" && info.paymentHistory.length > 0 ? info.paymentHistory.map((payment, index) => {
                                        const { partial, full, pending, paidByFullName, recurring } = payment;
                                        const { amount, created, currency, description, status } = payment.completedPayment;
                                        if (recurring === false) {
                                            return (
                                                <Fragment key={index}>
                                                    <ListGroupItem style={{ marginTop: "12.5px" }} className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1" style={{ color: "#7366ff" }}>{`${paidByFullName} paid the contracted user $${(amount / 100).toFixed(2)} (${currency})`}</h5><small>{moment(created * 1000).fromNow()}</small>
                                                        </div>
                                                        <p className="mb-1">{description}</p>
                                                        <small>{partial === false && full === true ? `Full payment which is ${pending === true ? "Pending (This payment has been captured but NOT released)" : "Processed (This payment has been captured AND has been RELEASED)"}` : `Partial payment was made and is ${pending === true ? "Pending (This payment has been captured but NOT released)" : "Processed (This payment has been captured AND has been RELEASED)"}`}</small>
                                                    </ListGroupItem>
                                                </Fragment>
                                            );
                                        } else {
                                            const { active, created, currency, unit_amount } = payment.paymentData;
                                            const { lastPaymentDay, firstPaymentDay } = payment.completedPayment;
                                            return (
                                                <Fragment key={index}>
                                                    <ListGroupItem style={{ marginTop: "12.5px" }} className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1" style={{ color: "#7366ff" }}>{`${paidByFullName} has initialized a subscription/recurring payment of $${(unit_amount / 100).toFixed(2)}`}</h5><small>{moment(created * 1000).fromNow()}</small>
                                                        </div>
                                                        <p className="mb-1">{`This payment is ${active === true ? "active" : "innactive"} in the currency of ${currency === "usd" ? "US Dollar (USD)" : "Unknown Currency."}. This is a recurring payment/deposit type with a start date of ${moment(firstPaymentDay).format("dddd MM/DD")} (MM/DD) while ending on ${moment(lastPaymentDay).format("dddd MM/DD")} (MM/DD) of full payment completion (whichever comes first)!`}</p>
                                                        <small>{`This is a RECURRING payment which means every week, this payment will automatically be billed on the desired/selected day upon initializing this payment type. These can be cancelled but as of now, this payment is still active and will be availiable on a weekly basis!`}</small>
                                                    </ListGroupItem>
                                                </Fragment>
                                            );
                                        }
                                    }) : null}
                                </ListGroup>
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
                                        <h5 style={{ textDecorationLine: "underline", color: "white" }}>Mark Job As Complete & Request Confirmation From Employer</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <p>This will initiate the <strong>nearing of completion</strong> for both you and the other user (employer). You should <strong>ONLY</strong> activate this option <strong>IF YOU'RE ENTIRELY FINISHED</strong> with said contract & are requesting to end/complete the job to release any pending resulting funds/money to be credited to your account..</p>
                                        <hr />
                                        <p className='lead'>This will <strong>COMPLETE</strong> this entire process-flow and once <strong>confirmed by both parties</strong> involved, will release all pending funds that the employer/hirer has previously deposited in which {process.env.REACT_APP_APPLICATION_NAME} has collected and held until the release point..</p>
                                        <hr />
                                        <Button onClick={() => handleTotalCompletion()} className={"btn-square-secondary"} color={"secondary-2x"} outline style={{ width: "100%" }}>Mark Job As Complete & Request Confirmation (from employer)</Button>
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
export default connect(mapStateToProps, { })(ViewIndividualLiveHiredhackingJobHelper);