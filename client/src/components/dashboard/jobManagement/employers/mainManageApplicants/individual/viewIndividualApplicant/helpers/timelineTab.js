import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Card, Media, CardHeader, CardBody, CardFooter, Button, TabContent, TabPane, Nav, NavItem, NavLink, Form, Label, Input } from 'reactstrap';
import timeline1 from "../../../../../../../../assets/images/social-app/timeline-1.png";
import { MoreVertical } from 'react-feather';
import LeftBar from './leftBar';
import RightBar from './rightBar';
import Slider from "react-slick";
import ReactPlayer from "react-player";
import FileViewer from 'react-file-viewer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import moment from "moment";
import StarRatings from 'react-star-ratings';
import { useHistory } from "react-router-dom";
import helpers from "../helpers/functions/helperFunctions.js";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};
const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


const { renderReviewPicVideoHelper } = helpers;


const TimelineTab = ({ applicantData, calculateFileType, renderPictureOrVideoProfilePic, lastProfileItem, user }) => {
    console.log("timelineTab applicantData", applicantData);

    // history object creation
    const history = useHistory();

    const [ reviews, setReviewsState ] = useState([{
        reviewText: "Nunc sagittis condimentum erat, vitae dapibus diam. Morbi nulla erat, venenatis vel lacinia ac, gravida in ligula. Curabitur felis velit, gravida non leo non, tristique laoreet libero. Maecenas pharetra aliquet lorem, quis porta elit hendrerit at. Praesent eu velit non dolor euismod sollicitudin. Maecenas quis augue magna",
        starRating: (Math.floor(Math.random() * 10) + 1),
        reviewer: "Adam Spurdecton",
        systemDate: randomDate(new Date(2021, 5, 1), new Date()),
        date: moment(randomDate(new Date(2021, 5, 1), new Date())).format("MM/DD/YYYY hh:mm:ss a"),
        picture: "https://picsum.photos/200/300"
    }, {
        reviewText: "Nunc sagittis condimentum erat, vitae dapibus diam. Morbi nulla erat, venenatis vel lacinia ac, gravida in ligula. Curabitur felis velit, gravida non leo non, tristique laoreet libero. Maecenas pharetra aliquet lorem, quis porta elit hendrerit at. Praesent eu velit non dolor euismod sollicitudin. Maecenas quis augue magna",
        starRating: (Math.floor(Math.random() * 10) + 1),
        reviewer: "John Spactotle",
        systemDate: randomDate(new Date(2021, 5, 1), new Date()),
        date: moment(randomDate(new Date(2021, 5, 1), new Date())).format("MM/DD/YYYY hh:mm:ss a"),
        picture: "https://picsum.photos/200/300"
    }, {
        reviewText: "Nunc sagittis condimentum erat, vitae dapibus diam. Morbi nulla erat, venenatis vel lacinia ac, gravida in ligula. Curabitur felis velit, gravida non leo non, tristique laoreet libero. Maecenas pharetra aliquet lorem, quis porta elit hendrerit at. Praesent eu velit non dolor euismod sollicitudin. Maecenas quis augue magna",
        starRating: (Math.floor(Math.random() * 10) + 1),
        reviewer: "Rodreguez Smithy",
        systemDate: randomDate(new Date(2021, 5, 1), new Date()),
        date: moment(randomDate(new Date(2021, 5, 1), new Date())).format("MM/DD/YYYY hh:mm:ss a"),
        picture: "https://picsum.photos/200/300"
    }, {
        reviewText: "Nunc sagittis condimentum erat, vitae dapibus diam. Morbi nulla erat, venenatis vel lacinia ac, gravida in ligula. Curabitur felis velit, gravida non leo non, tristique laoreet libero. Maecenas pharetra aliquet lorem, quis porta elit hendrerit at. Praesent eu velit non dolor euismod sollicitudin. Maecenas quis augue magna",
        starRating: (Math.floor(Math.random() * 10) + 1),
        reviewer: "Smith Quardez",
        systemDate: randomDate(new Date(2021, 5, 1), new Date()),
        date: moment(randomDate(new Date(2021, 5, 1), new Date())).format("MM/DD/YYYY hh:mm:ss a"),
        picture: "https://picsum.photos/200/300"
    }, {
        reviewText: "Nunc sagittis condimentum erat, vitae dapibus diam. Morbi nulla erat, venenatis vel lacinia ac, gravida in ligula. Curabitur felis velit, gravida non leo non, tristique laoreet libero. Maecenas pharetra aliquet lorem, quis porta elit hendrerit at. Praesent eu velit non dolor euismod sollicitudin. Maecenas quis augue magna",
        starRating: (Math.floor(Math.random() * 10) + 1),
        reviewer: "Adam Labmert",
        systemDate: randomDate(new Date(2021, 5, 1), new Date()),
        date: moment(randomDate(new Date(2021, 5, 1), new Date())).format("MM/DD/YYYY hh:mm:ss a"),
        picture: "https://picsum.photos/200/300"
    }, {
        reviewText: "Nunc sagittis condimentum erat, vitae dapibus diam. Morbi nulla erat, venenatis vel lacinia ac, gravida in ligula. Curabitur felis velit, gravida non leo non, tristique laoreet libero. Maecenas pharetra aliquet lorem, quis porta elit hendrerit at. Praesent eu velit non dolor euismod sollicitudin. Maecenas quis augue magna",
        starRating: (Math.floor(Math.random() * 10) + 1),
        reviewer: "Likkin Jackins",
        systemDate: randomDate(new Date(2021, 5, 1), new Date()),
        date: moment(randomDate(new Date(2021, 5, 1), new Date())).format("MM/DD/YYYY hh:mm:ss a"),
        picture: "https://picsum.photos/200/300"
    }, {
        reviewText: "Nunc sagittis condimentum erat, vitae dapibus diam. Morbi nulla erat, venenatis vel lacinia ac, gravida in ligula. Curabitur felis velit, gravida non leo non, tristique laoreet libero. Maecenas pharetra aliquet lorem, quis porta elit hendrerit at. Praesent eu velit non dolor euismod sollicitudin. Maecenas quis augue magna",
        starRating: (Math.floor(Math.random() * 10) + 1),
        reviewer: "Wealsh Lawson",
        systemDate: randomDate(new Date(2021, 5, 1), new Date()),
        date: moment(randomDate(new Date(2021, 5, 1), new Date())).format("MM/DD/YYYY hh:mm:ss a"),
        picture: "https://picsum.photos/200/300"
    }]);

    const calculateRank = (points) => {
        return Math.floor(points / 1000);
    }
    const checkIfMatchFileType = (type) => {
        switch (type) {
            case "image/bmp":
                return true;
                break;
            case "image/png":
                return true;
                break;
            case "image/jpeg":
                return true;
                break;
            case "image/jpg":
                return true;
                break;
            default:
                return false;
                break;
        };
    }

    const calculateRatingStars = (ratings) => {
        let sum = 0;

        for (const key in ratings) {
            const rating = ratings[key];
            sum += rating;
        }

        return Math.round((sum / Object.keys(ratings).length));
    }

    const bothBarsProps = {
        user,
        lastProfileItem,
        applicantData
    }
    return (
        <Fragment>
        <Row>
            <Col xl="3 xl-40 box-col-4" lg="12" md="5">
                <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc4">
                    <Row>
                        <LeftBar {...bothBarsProps}/>
                    </Row>
                </div>
            </Col>
            <Col xl="6 xl-60 box-col-8" lg="12" md="7">
                <Row>
                    <Col sm="12">
                        <div className="card height-equal add-shadow-md-custom">
                            <CardHeader>
                                <h5 className="custom-line-height-header">Quick information on your potential client</h5><span className={"custom-code-addition"}>{"Here is the"} <code className="custom-code">{"core"}</code> {"highlights of this application - this is a potential hire - use this information to guage the"}<code className="custom-code">readiness of hacker's</code> and decide who is the <code className="custom-code-redish">best hacker</code> for the job or best few (if multiple's selected)</span>
                            </CardHeader>
                            <CardBody>
                                <Form className="mega-vertical">
                                <Row>
                                    <Col style={{ marginBottom: "22.5px" }} sm="12">
                                        <p className="mega-title m-b-5">Core user-data application information - info based on the 'applicants' submitted info</p>
                                    </Col>
                                    <Col sm="6">
                                        <Card className={"add-shadow-md-custom"}>
                                            <Media className="p-20">
                                                <Media body>
                                                    <h6 className="mt-0 mega-title-badge meta-title-custom-bigger-blue"># of attached file(s)<span className="badge badge-primary pull-right digits custom-digits-font-adjustment">{`${applicantData.attachedFiles.length} file(s)`}</span></h6>
                                                    <p>This applicant has attached <strong style={{ textDecorationLine: "underline" }}>{applicantData.attachedFiles.length} file's</strong> that you should view as they we're intentionally included in this application.</p>
                                                </Media>
                                            </Media>
                                        </Card>
                                    </Col>
                                    <Col sm="6">
                                        <Card className={"add-shadow-md-custom"}>
                                            <Media className="p-20">
                                                <Media body>
                                                    <h6 className="mt-0 mega-title-badge meta-title-custom-bigger-secondary">Applicant placed wager/bid on <strong>self</strong><span className="badge badge-secondary pull-right digits custom-digits-font-adjustment">{applicantData.bettingOnSelfSelected === true ? "TRUE - Betting on SELF" : "FALSE - NOT betting on self"}</span></h6>
                                                    <p>{`This applicant placed a ${Number(applicantData.waggeredBidAmount).toFixed(2)} ${process.env.REACT_APP_CRYPTO_TOKEN_NAME} wager/bet on`}<strong>'themselves'</strong>{` to WIN this listing - if this user wins, they will win ${Number(applicantData.waggeredBidAmount)} more tokens than the standard reward's...`}</p>
                                                </Media>
                                            </Media>
                                        </Card>
                                    </Col>
                                    <Col sm="6">
                                        <Card className={"add-shadow-md-custom"}>
                                            <Media className="p-20">
                                                <Media body>
                                                    <h6 className="mt-0 mega-title-badge meta-title-custom-bigger-success">{applicantData.referenceLinks.length} Reference Links Incl. <span className="badge badge-success pull-right digits custom-digits-font-adjustment">{`${applicantData.referenceLinks.length} LINKS INCLUDED`}</span></h6>
                                                    <p>This user has included <strong style={{ textDecorationLine: "underline" }}>{applicantData.referenceLinks.length} reference links</strong>. These can be anything useful regarding evaluating this applicant. These links can be anything from github to portfolio links to other misc content...</p>
                                                </Media>
                                            </Media>
                                        </Card>
                                    </Col>
                                    <Col sm="6">
                                        <Card className={"add-shadow-md-custom"}>
                                            <Media className="p-20">
                                                <Media body>
                                                    <h6 className="mt-0 mega-title-badge meta-title-custom-bigger-info">Number(#) of current reviews <span className="badge badge-info pull-right digits custom-digits-font-adjustment">{`${applicantData.submittedUserData.reviews.length} TOTAL REVIEWS/COMPLETED JOBS`}</span></h6>
                                                    <p>This applicant has a grand total of <strong style={{ textDecorationLine: "underline" }}>{applicantData.submittedUserData.reviews.length} total reviews/completed-gigs</strong> - if you'd like to check these reviews out... Visit the "Review Page" at the top of this page!</p>
                                                </Media>
                                            </Media>
                                        </Card>
                                    </Col>
                                    <Col sm="6">
                                        <Card className={"add-shadow-md-custom mb-0"}>
                                            <Media className="p-20">
                                                <Media body>
                                                    <h6 className="mt-0 mega-title-badge meta-title-custom-bigger-warning">Year's of combined experience in cybersecurity<span className="badge badge-warning pull-right digits custom-digits-font-adjustment">{applicantData.submittedUserData.yearsOfExperience.label}</span></h6>
                                                    <p>This applicant has approximately <strong>{applicantData.submittedUserData.yearsOfExperience.label}</strong> of combined experience in hacking or the cybersecurity space. This is submitted on behalf of the applicant themselves and this value is <strong>NOT verified</strong> - if you have any doubts of the experience of this user/applicant - look more into their background/history.</p>
                                                </Media>
                                            </Media>
                                        </Card>
                                    </Col>
                                    <Col sm="6">
                                        <Card className={"add-shadow-md-custom mb-0"}>
                                            <Media className="p-20">
                                                <Media body>
                                                    <h6 className="mt-0 mega-title-badge meta-title-custom-bigger-danger">EXP/XP - Experience Points<span className="badge badge-danger pull-right digits custom-digits-font-adjustment">{applicantData.submittedUserData.points} EXP/XP POINTS</span></h6>
                                                    <p>This applicant has a combined total of {applicantData.submittedUserData.points} experience/ranking points at the time of applying. There are approximately 50 LEVEL'S/RANKS within our {process.env.REACT_APP_APPLICATION_NAME} application. Each 1000 points equates to ONE level/rank. This <strong>user's rank</strong> is <strong>{calculateRank(applicantData.submittedUserData.points)}</strong></p>
                                                </Media>
                                            </Media>
                                        </Card>
                                    </Col>
                                </Row>
                                </Form>
                            </CardBody>
                        </div>
                        <Card className={"add-shadow-md-custom"}>
                            <CardBody>
                                <div className="new-users-social">
                                    <Media>
                                        {renderPictureOrVideoProfilePic(lastProfileItem, true)}
                                        <Media body>
                                            <h6 className="mb-0 f-w-700">{applicantData.applicantName}</h6>
                                            <p>Submitted application {moment(applicantData.dateApplied).fromNow()}</p>
                                        </Media><span className="pull-right mt-0"><MoreVertical /></span>
                                    </Media>
                                </div>
                                <Slider className={"slide-slide-custom"} {...settings}>
                                    {typeof applicantData.attachedFiles !== "undefined" && applicantData.attachedFiles.length > 0 ? applicantData.attachedFiles.map((file, idx) => {
                                        const filePath = `${process.env.REACT_APP_ASSET_LINK}/${file.link}`;
                                        if (file.type.includes("video")) {
                                            return (
                                                <div key={idx}>
                                                    <ReactPlayer key={file.id} controls={true} loop={true} muted={true} url={filePath} className="stretch-both-ways-topped" />
                                                </div>
                                            );
                                        } else if (checkIfMatchFileType(file.type)) {
                                            console.log("one of the following... bmp jpg jpeg png", file);
                                            return (
                                                <div id="slide-pane-slide" key={idx}>
                                                    <LazyLoadImage
                                                        alt={"picture-rendered-via-gallery"}
                                                        effect={"blur"}
                                                        className={"custom-lazy-loaded-image-slider"}
                                                        src={filePath}
                                                    />
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div key={idx} className="slideshow-fileviewer-wrapper">
                                                    <FileViewer
                                                        fileType={calculateFileType(file.type)}
                                                        filePath={filePath}
                                                        onError={(error) => {
                                                            console.log("Error fileviewer - ", error);
                                                        }}
                                                    />
                                                </div>
                                            ); 
                                        };
                                    }) : <div>
                                        <Media className="img-fluid" alt="" src={timeline1} />
                                    </div>}
                                </Slider>
                                <div className="timeline-content">
                                    <h5 style={{ marginTop: "100px" }} className="custom-line-height-header">MOST RECENT REVIEWS (View all others by clicking "View more reviews"...)</h5>
                                    <p style={{ marginTop: "3.5px" }}>Below, you will find the <strong>"Most Recent"</strong> review's from other user's about this specific user's recent gigs/jobs that were completed. You will find <strong style={{ textDecorationLine: "underline" }}>4</strong> latest reviews on this page & the rest can be found by clicking the "View MORE Reviews" button...</p>
                                    <hr />
                                    <div className="social-chat">
                                        {/* reviewText, starRating, reviewer, systemDate, date, picture */}
                                        {typeof user.reviews !== "undefined" && user.reviews.length > 0 ? user.reviews.map((review, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <div>
                                                        <Media>
                                                            {renderReviewPicVideoHelper(review.reviewerPicOrVideo)}
                                                            <Media className={"your-msg your-msg-custom-wrapper"} body>
                                                                <span className="f-w-600">{review.reviewerName} <span id={"top-right-absolute-position"}>Reviewed about <strong style={{ color: "#f73164" }}>{moment(review.date).fromNow()}</strong></span></span>
                                                                <p>{review.reviewText}</p>
                                                                <hr />
                                                                <StarRatings
                                                                    rating={calculateRatingStars(review.rating)}
                                                                    starRatedColor={"#f73164"}
                                                                    numberOfStars={10}
                                                                    starDimension={"75px"}
                                                                    starSpacing={"3.25px"}
                                                                    name={`rating${index}`}
                                                                />
                                                            </Media>
                                                        </Media>
                                                    </div>
                                                </Fragment>
                                            );
                                        }) : null}
                                        <hr />
                                        <div className="text-center"><Button style={{ width: "50%" }} outline className={"btn-square-secondary"} color={"secondary-2x"}>View MORE Reviews...</Button></div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col xl="3 xl-100 box-col-12">
                    <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc1">
                        <Row>
                            <RightBar {...bothBarsProps} />
                        </Row>
                    </div>
                </Col>
        </Row>
        </Fragment>
    );
};

export default TimelineTab;