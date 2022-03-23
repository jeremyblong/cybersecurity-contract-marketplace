import React, { Fragment, useState, useEffect, useRef } from 'react';
import Breadcrumb from '../../../../../../../layout/breadcrumb'
import { Container, Row, Col, Card, Button, Media, CardBody, CardHeader, Input, Label, Badge } from 'reactstrap'
import { connect } from "react-redux";
import { useHistory, withRouter, useParams } from "react-router-dom";
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
    const [ dateDifference, setDateDifference ] = useState(null);
    const [ dates, setDatesAvailiable ] = useState(null);
    // eslint-disable-next-line
    const [ quantity, setquantity ] = useState(1)
    
    const slider1 = useRef();
    const slider2 = useRef();

    useEffect(() => {
        setState({
            nav1: slider1.current,
            nav2: slider2.current
          });
      } ,[]);
    const { nav1, nav2 } = state;
    const singleItem = {
        price: "45.99",
        discountPrice: "39.99",
        stock: 11
    }
    const symbol = "$";

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
                                        <Col sm="6" xl="3" lg="3">
                                            <Card className="o-hidden">
                                                <CardBody className="bg-primary b-r-4 card-body static-top-widget-custom-hired">
                                                    <div className="media static-top-widget">
                                                    <div className="align-self-center text-center"><DollarSign /></div>
                                                        <div className="media-body"><span className="m-0 special-text-spanned">Money To Be Earned Upon Completion</span>
                                                            <h4 className="mb-0 counter counter-custom-hired-account">$<CountUp duration={5.75} end={Number(info.amountOfMoneyUponCompletion)} /> Will Be Earned!</h4><Rss className="icon-bg" />
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
                                                        <div className="media-body"><span className="m-0 special-text-spanned"># Of <strong>attached</strong> file(s)</span>
                                                            <h4 className="mb-0 counter counter-custom-hired-account"><CountUp duration={5.75} end={info.attachedFiles.length} /> file's were attached..</h4><AlertOctagon className="icon-bg" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Col>
                                        <Col sm="6" xl="3" lg="3">
                                            <Card className="o-hidden">
                                                <CardBody className="bg-primary b-r-4 static-top-widget-custom-hired">
                                                    <div className="media static-top-widget">
                                                    <div className="align-self-center text-center"><Rss /></div>
                                                        <div className="media-body"><span className="m-0 special-text-spanned"># Of Total Applicant's</span>
                                                            <h4 className="mb-0 counter counter-custom-hired-account">There are <CountUp duration={5.75} end={info.employerPostedListingInfo.applicants.length} /> total applicant's</h4><DollarSign className="icon-bg" />
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col sm="6" xl="3" lg="3">
                                            <Card className="o-hidden">
                                                <CardBody className="bg-info b-r-4 static-top-widget-custom-hired">
                                                    <div className="media static-top-widget">
                                                    <div className="align-self-center text-center"><Eye /></div>
                                                        <div className="media-body"><span className="m-0 special-text-spanned">Total Recieved View's</span>
                                                            <h4 className="mb-0 counter counter-custom-hired-account"><CountUp duration={5.75} end={info.employerPostedListingInfo.viewedBy.length} /> Total View's...</h4><AlertOctagon className="icon-bg" />
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
                                        <h6 className="mt-0 mega-title-badge mega-badge-heavy-update">Submit Results And/Or Hacking Data/Progress<span className="badge badge-danger pull-right digits digits-smaller-subsized-update">{"SUBMIT RESULTS & PROGRESS"}</span></h6>
                                        <p>{"Manage updates, data and various changes so your employer knows exactly what's been going on and what progress you've made recently. It's good habit to continously submit new information/data to the employer so they can make improvements as your hack proceeds/continues... Fixing previously broken logic."}</p>
                                        <hr />
                                        <Button className={"btn-square-danger"} color={"danger-2x"} outline style={{ width: "100%" }}>Submit Updates & Results</Button>
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
                                        <h6 className="mt-0 mega-title-badge mega-badge-heavy-update">Something here Something here Something here Something here Something here Something here <span className="badge badge-info pull-right digits digits-smaller-subsized-update">{"Something here"}</span></h6>
                                        <p>{"Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here Something here "}</p>
                                        <hr />
                                        <Button onClick={() => {}} className={"btn-square-info"} color={"info-2x"} outline style={{ width: "100%" }}>Request Immediate Update/Feedback</Button>
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
                    {/* <Col sm="12" md="5" lg="5" xl="5">
                        <Card className={"bordered-shadowed-card"}>
                            <CardBody>
                                
                            </CardBody>
                        </Card>
                    </Col> */}
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
            {/* <Container fluid={true}>
                <Row>
                    <Col xl="7 xl-100">
                        <Card>
                            <CardBody>
                            <div className="product-page-details">
                                <h3>{"Women Pink shirt."}</h3>
                            </div>
                            <div className="product-price f-28">
                                {symbol}{singleItem.price}
                                <del>{symbol}{singleItem.discountPrice}</del>
                            </div>
                            <ul className="product-color m-t-15">
                                <li className="bg-primary"></li>
                                <li className="bg-secondary"></li>
                                <li className="bg-success"></li>
                                <li className="bg-info"></li>
                                <li className="bg-warning"></li>
                            </ul>
                            <hr/>
                            <p>{"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that."}</p>
                            <hr/>
                            <div>
                                <table className="product-page-width">
                                <tbody>
                                    <tr>
                                    <td> <b>{Brand} &nbsp;&nbsp;&nbsp;:</b></td>
                                    <td>{"Pixelstrap"}</td>
                                    </tr>
                                    <tr>
                                    <td> <b>{Availability} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                    <td className="txt-success">{singleItem.stock}</td>
                                    </tr>
                                    <tr>
                                    <td> <b>{"Seller"} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                    <td>{"ABC"}</td>
                                    </tr>
                                    <tr>
                                    <td> <b>{"Fabric"} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                    <td>{"Cotton"}</td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            <hr/>
                            <Row>
                                <Col md="6">
                                <h6 className="product-title">{"share it"}</h6>
                                </Col>
                                <Col md="6">
                                <div className="product-icon">
                                    <ul className="product-social">
                                    <li className="d-inline-block"><a href="#javascript"><i className="fa fa-facebook"></i></a></li>
                                    <li className="d-inline-block"><a href="#javascript"><i className="fa fa-google-plus"></i></a></li>
                                    <li className="d-inline-block"><a href="#javascript"><i className="fa fa-twitter"></i></a></li>
                                    <li className="d-inline-block"><a href="#javascript"><i className="fa fa-instagram"></i></a></li>
                                    <li className="d-inline-block"><a href="#javascript"><i className="fa fa-rss"></i></a></li>
                                    </ul>
                                    <form className="d-inline-block f-right"></form>
                                </div>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col md="6">
                                <h6 className="product-title">{"Rate Now"}</h6>
                                </Col>
                                <Col md="6">
                                <div className="d-flex">
                                        <Ratings
                                        rating={rating}
                                        widgetRatedColors="blue"
                                        changeRating={changeRating}
                                        >
                                        <Ratings.Widget />
                                        <Ratings.Widget />
                                        <Ratings.Widget />
                                        <Ratings.Widget />
                                        <Ratings.Widget />
                                    </Ratings>
                                    <span>{ProductReview}</span>
                                </div>
                                </Col>
                            </Row>
                            <hr/>
                            <div className="m-t-15">
                                <Button  color="primary" className="m-r-10" onClick={() => {}} >
                                    <i className="fa fa-shopping-basket mr-1"></i>Add To Cart
                                </Button>
                                <Button  color="success" className="m-r-10" onClick={() => {}}>
                                    <i className="fa fa-shopping-cart mr-1"></i>Buy-it-now
                                </Button>
                                <Button color="secondary" onClick={() => {}}>
                                    <i className="fa fa-heart mr-1"></i>{"Add To WishList"}
                                </Button>
                            </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="5 xl-cs-35">
                        <Card>
                            <CardBody>
                            <div className="filter-block">
                                <h4>{"Brand"}</h4>
                                <ul>
                                <li>{"Clothing"}</li>
                                <li>{"Bags"}</li>
                                <li>{"Footwear"}</li>
                                <li>{"Watches"}</li>
                                <li>{"ACCESSORIES"}</li>
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
                                        <h5>{"Free Shipping"}</h5>
                                        <p>{"Free Shipping World Wide"}</p>
                                    </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="media"><Clock/>
                                    <div className="media-body">
                                        <h5>{"24 X 7 Service"}</h5>
                                        <p>{"Online Service For New Customer"}</p>
                                    </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="media"><Gift/>
                                    <div className="media-body">
                                        <h5>{"Festival Offer"}</h5>
                                        <p>{"New Online Special Festival"}</p>
                                    </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="media"><CreditCard/>
                                    <div className="media-body">
                                        <h5>{"Online Payment"}</h5>
                                        <p>{"Contrary To Popular Belief."}</p>
                                    </div>
                                    </div>
                                </li>
                                </ul>
                            </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container> */}
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, { })(ViewIndividualLiveHiredhackingJobHelper);