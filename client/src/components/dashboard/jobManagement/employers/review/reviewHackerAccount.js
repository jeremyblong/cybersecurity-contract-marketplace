import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Media, Label, Form, CardFooter, Button, InputGroup, InputGroupAddon, InputGroupText, FormGroup, Input } from "reactstrap";
import Breadcrumb from '../../../../../layout/breadcrumb';
import "./styles.css";
import { connect } from "react-redux";
import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import _ from "lodash";

const ReviewHackerAccountCompletedJobHelper = ({ userData }) => {

    const history = useHistory();

    const [ approved, setApproved ] = useState(false);
    const [ reviewText, setReviewText ] = useState("");
    const [ accessCode, setAccessCode ] = useState("");
    const [ rating, setRating ] = useState({
        overall: 0,
        communication: 0,
        accurateDescription: 0,
        contentmentOverallWithJob: 0,
        responseTimes: 0,
        knowledgeOrUnderstanding: 0,
        professionalism: 0,
        wentAsExpected: 0,
        wouldDoRepeatBusiness: 0,
        wouldReferToFriendOrFamily: 0
    });

    const { id, hackerID } = useParams();

    console.log("id hackerID", id, hackerID);

    const handleAccessTokenSubmission = () => {
        console.log("handleAccessTokenSubmission clicked/ran.");

        axios.get(`${process.env.REACT_APP_BASE_URL}/submit/access/code/review/check/hacker`, {
            params: {
                accessCode,
                id: userData.uniqueId,
                releventAssociatedContractID: id
            }
        }).then((res) => {
            if (res.data.message === "Code matches!") {
                console.log(res.data);

                setApproved(true);

                NotificationManager.success("Successfully entered your code AND THE CODE MATCHES! You may now proceed with the 'review' logic/submission and rate + review this employer..", "You may NOW review this employer!", 4750);

            } else if (res.data.message === "Code does NOT match, try again!") {

                NotificationManager.error("Code does NOT match the code/value on file, please try again entering a VALID entry-code or stop trying to access data you do not have access to yet..", "Code did NOT match our records!", 4750);

            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const changeStarRating = (value, starValue) => {
        setRating(prevState => {
            return {
                ...prevState,
                [value]: starValue
            }
        })
    }
    const handleReviewSubmission = () => {
        console.log("handleReviewSubmission clicked/ran");

        const configuration = {
            accessCode,
            id: userData.uniqueId,
            fullName: `${userData.firstName} ${userData.lastName}`,
            releventAssociatedContractID: id,
            rating,
            reviewText,
            picOrVideo: _.has(userData, "profilePicsVideos") && userData.profilePicsVideos.length > 0 ? userData.profilePicsVideos[userData.profilePicsVideos.length - 1] : null,
            hackerID
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/submit/review/for/hacker/contract`, configuration).then((res) => {
            if (res.data.message === "Successfully submitted your new review!") {
                console.log(res.data);

                setApproved(false);
                setRating({
                    overall: 0,
                    communication: 0,
                    accurateDescription: 0,
                    contentmentOverallWithJob: 0,
                    responseTimes: 0,
                    knowledgeOrUnderstanding: 0,
                    professionalism: 0,
                    wentAsExpected: 0,
                    wouldDoRepeatBusiness: 0,
                    wouldReferToFriendOrFamily: 0
                });

                setTimeout(() => {
                    history.replace("/dashboard/employer")
                },  4000);

                NotificationManager.success("Successfully submitted your review & it is now PENDING until BOTH users have submitted their reviews or after ONE (1) week of non-response from the other user..", "Successfully submitted review!", 4750);

            } else {
                console.log("Err", res.data);

                NotificationManager.error("An unknown error has occurred while attempting to submit your review, please try this action again or contact support if the problem persists!", "Unknown error has occurred!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("An unknown error has occurred while attempting to submit your review, please try this action again or contact support if the problem persists!", "Unknown error has occurred!", 4750);
        })
    }

    const reviewChecks = () => {

        const { overall, communication, accurateDescription, contentmentOverallWithJob, responseTimes, knowledgeOrUnderstanding, professionalism, wentAsExpected, wouldDoRepeatBusiness, wouldReferToFriendOrFamily } = rating;

        if (typeof reviewText !== "undefined" && reviewText.length >= 250 && overall !== 0 && communication !== 0 && accurateDescription !== 0 && contentmentOverallWithJob !== 0 && responseTimes !== 0 && knowledgeOrUnderstanding !== 0 && professionalism !== 0 && wentAsExpected !== 0 && wouldDoRepeatBusiness !== 0 && wouldReferToFriendOrFamily !== 0 ) {
            return false;
        } else {
            return true;
        }
    }

    console.log("rating", rating);

    const renderMainContentPassword = () => {
        if (approved === true) {
            return (
                <Fragment>
                    <Button disabled={reviewChecks()} onClick={handleReviewSubmission} color="success" style={{ width: "100%" }}>Submit Review & Complete Contract (will be archived)</Button>
                    <hr />
                    <Row>
                        <FormGroup className="row mb-0">
                            <Label className="col-sm-3 col-form-label"><strong className='extrastrong-review'>Comments, Review Text, Thoughts & General Review Of Interaction</strong> <br /><br /> Please note anything <strong style={{ color: "blue" }}>good or bad</strong> that this user did or anything really that stood-out to your during your encounter with this user. Please be honest, transparent and thorough with your review.. {typeof reviewText !== "undefined" && reviewText.length <= 250 ? <Fragment><hr /><em style={{ color: "red", textDecorationLine: "underline" }}>{`You must enter at-least another ${250 - reviewText.length} characters before proceeding..`}</em></Fragment> : null}</Label>
                            <Col sm="9">
                                <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="form-control" rows="10" placeholder={"Describe accurately your experience with this user and this contracted position/job, please be as thorough and detailed as possible. Note what this person did both good AND bad - please leave a professional review as this relects back on you..."}></textarea>
                            </Col>
                        </FormGroup>
                    </Row>
                    <hr />
                    <Row>   
                        <Col sm="12" lg="6" xl="6" md="6">
                            <Card className='shadow'>
                                <CardHeader>
                                    <h5 className='header-review-main'>Rate your <em style={{ textDecorationLine: "underline" }}>overall</em> experience w/this user</h5>
                                    <hr />
                                    <p>Rate your <strong style={{ color: "blue" }}>overall experience/interaction</strong> with this user from start-to-finish (be honest & genuine with your review - if you had a negative experience, please express that throughly - or a positive one!)</p>
                                </CardHeader>
                                <CardBody>
                                    <StarRatings
                                        rating={rating.overall}
                                        changeRating={(rating) => changeStarRating("overall", rating)}
                                        numberOfStars={10}
                                        starEmptyColor={"#000"}
                                        starHoverColor={"#7366ff"}
                                        starRatedColor={"#f73164"}
                                        name='rating-overall'
                                        starSpacing="7.5px"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" lg="6" xl="6" md="6">
                            <Card className='shadow'>
                                <CardHeader>
                                    <h5 className='header-review-main'>Rate your <em style={{ textDecorationLine: "underline" }}>communication</em> experience w/this user</h5>
                                    <hr />
                                    <p>Rate your <strong style={{ color: "blue" }}>experience related to communication</strong> with this user from start-to-finish. Did they clearly and effectivly communicate the task at hand and what was required of you? Were they polite and respectful? Did they treat you in a professional manner?</p>
                                </CardHeader>
                                <CardBody>
                                    <StarRatings
                                        rating={rating.communication}
                                        changeRating={(rating) => changeStarRating("communication", rating)}
                                        numberOfStars={10}
                                        starEmptyColor={"#000"}
                                        starHoverColor={"#7366ff"}
                                        starRatedColor={"#f73164"}
                                        name='rating-communication'
                                        starSpacing="7.5px"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col sm="12" lg="6" xl="6" md="6">
                            <Card className='shadow'>
                                <CardHeader>
                                    <h5 className='header-review-main'>Did the hacker <em style={{ textDecorationLine: "underline" }}>accuracy describe</em> what needed to be done, how it would be done & give appropriate details on the task at hand?</h5>
                                    <hr />
                                    <p>Did your hacker <strong style={{ color: "blue" }}>accurately describe</strong> what *actually* needed to be done before being hired & once hired and employed on this contract? Please rate the accuracy of the details provided from your hacker during this entire process</p>
                                </CardHeader>
                                <CardBody>
                                    <StarRatings
                                        rating={rating.accurateDescription}
                                        changeRating={(rating) => changeStarRating("accurateDescription", rating)}
                                        numberOfStars={10}
                                        starEmptyColor={"#000"}
                                        starHoverColor={"#7366ff"}
                                        starRatedColor={"#f73164"}
                                        name='rating-accurateDescription'
                                        starSpacing="7.5px"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" lg="6" xl="6" md="6">
                            <Card className='shadow'>
                                <CardHeader>
                                    <h5 className='header-review-main'>Rate the <em style={{ textDecorationLine: "underline" }}>value</em> (overall contentment with the completed work) of this completed contract</h5>
                                    <hr />
                                    <p>Rate your <strong style={{ color: "blue" }}>happiness/contentment</strong> with this contract <strong>AFTER THE FACT</strong>. In other words, please let us know how much you enjoyed working on this contract <em style={{ color: "blue" }}>overall</em>.. Would you like to do another job that is similar to this one?</p>
                                </CardHeader>
                                <CardBody>
                                    <StarRatings
                                        rating={rating.contentmentOverallWithJob}
                                        changeRating={(rating) => changeStarRating("contentmentOverallWithJob", rating)}
                                        numberOfStars={10}
                                        starEmptyColor={"#000"}
                                        starHoverColor={"#7366ff"}
                                        starRatedColor={"#f73164"}
                                        name='rating-contentmentOverallWithJob'
                                        starSpacing="7.5px"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col sm="12" lg="6" xl="6" md="6">
                            <Card className='shadow'>
                                <CardHeader>
                                    <h5 className='header-review-main'>Was the hacker's <em style={{ textDecorationLine: "underline" }}>response time(s)</em> appropriate or 'on-time' or in a 'timely-manner'?</h5>
                                    <hr />
                                    <p>Rate your <strong style={{ color: "blue" }}>experience</strong> regarding the response time(s) from this hacker. This is regarding variables such as messaging an hacker and recieving a response within a few hours or requesting documents/data from the hacker, and receiving them within a reasonable amount of time. Rate this user's <strong style={{ color: "blue" }}>response times.</strong></p>
                                </CardHeader>
                                <CardBody>
                                    <StarRatings
                                        rating={rating.responseTimes}
                                        changeRating={(rating) => changeStarRating("responseTimes", rating)}
                                        numberOfStars={10}
                                        starEmptyColor={"#000"}
                                        starHoverColor={"#7366ff"}
                                        starRatedColor={"#f73164"}
                                        name='rating-responseTimes'
                                        starSpacing="7.5px"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" lg="6" xl="6" md="6">
                            <Card className='shadow'>
                                <CardHeader>
                                    <h5 className='header-review-main'>How much <em style={{ textDecorationLine: "underline" }}>knowledge/understanding</em> did this 'hacker' have <em style={{ textDecorationLine: "underline" }}>overall?</em></h5>
                                    <hr />
                                    <p>Rate the <strong style={{ color: "blue" }}>knowledge/understanding</strong> would you say this hacker has overall? This can include but is not limited to conceptual understanding, hacking knowledge, engineering knowledge/understand and/or really anything beyond basic knowledge that this hacker exibited..</p>
                                </CardHeader>
                                <CardBody>
                                    <StarRatings
                                        rating={rating.knowledgeOrUnderstanding}
                                        changeRating={(rating) => changeStarRating("knowledgeOrUnderstanding", rating)}
                                        numberOfStars={10}
                                        starEmptyColor={"#000"}
                                        starHoverColor={"#7366ff"}
                                        starRatedColor={"#f73164"}
                                        name='rating-knowledgeOrUnderstanding'
                                        starSpacing="7.5px"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col sm="12" lg="6" xl="6" md="6">
                            <Card className='shadow'>
                                <CardHeader>
                                    <h5 className='header-review-main'>Please rate this hacker's <em style={{ textDecorationLine: "underline" }}>professionalism</em> during your interaction.</h5>
                                    <hr />
                                    <p>Review this user's <strong style={{ color: "blue" }}>professionalism</strong> and your interaction based on being treated equally and respectfully. This can include but is not limited to mutual respect, courtesy, compassion, understanding & any other 'characteristics' required in a professional interaction/environment</p>
                                </CardHeader>
                                <CardBody>
                                    <StarRatings
                                        rating={rating.professionalism}
                                        changeRating={(rating) => changeStarRating("professionalism", rating)}
                                        numberOfStars={10}
                                        starEmptyColor={"#000"}
                                        starHoverColor={"#7366ff"}
                                        starRatedColor={"#f73164"}
                                        name='rating-professionalism'
                                        starSpacing="7.5px"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" lg="6" xl="6" md="6">
                            <Card className='shadow'>
                                <CardHeader>
                                    <h5 className='header-review-main'>This experience turned out <em style={{ textDecorationLine: "underline" }}>as you expected/predicted and was a smooth transaction</em> it would, there <strong>weren't</strong> any surprises or unexpected turns. This contract went generally pretty smooth (1 star being absolutely not - 10 being the 'best')</h5>
                                    <hr />
                                    <p>This experience <strong style={{ color: "blue" }}>turned out 'as predicted/expected'</strong> (within reason and/or exluding external uncontrollable variables) and there were minimal 'hiccups' or set-backs along the way that were NOT expected?</p>
                                </CardHeader>
                                <CardBody>
                                    <StarRatings
                                        rating={rating.wentAsExpected}
                                        changeRating={(rating) => changeStarRating("wentAsExpected", rating)}
                                        numberOfStars={10}
                                        starEmptyColor={"#000"}
                                        starHoverColor={"#7366ff"}
                                        starRatedColor={"#f73164"}
                                        name='rating-wentAsExpected'
                                        starSpacing="7.5px"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" lg="6" xl="6" md="6">
                            <Card className='shadow'>
                                <CardHeader>
                                    <h5 className='header-review-main'>Would you <em style={{ textDecorationLine: "underline" }}>engage in future</em> activity with this hacker again? Would you do <em style={{ textDecorationLine: "underline" }}>'repeat' business</em> with this hacker?</h5>
                                    <hr />
                                    <p>Would you <strong style={{ color: "blue" }}>work for this hacker again</strong> or not? IF you'd like to work with this hacker again, give them a high rating or star count. This shows other user's that you had a pleasant interaction with this user.</p>
                                </CardHeader>
                                <CardBody>
                                    <StarRatings
                                        rating={rating.wouldDoRepeatBusiness}
                                        changeRating={(rating) => changeStarRating("wouldDoRepeatBusiness", rating)}
                                        numberOfStars={10}
                                        starEmptyColor={"#000"}
                                        starHoverColor={"#7366ff"}
                                        starRatedColor={"#f73164"}
                                        name='rating-wouldDoRepeatBusiness'
                                        starSpacing="7.5px"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" lg="6" xl="6" md="6">
                            <Card className='shadow'>
                                <CardHeader>
                                    <h5 className='header-review-main'>Would you <em style={{ textDecorationLine: "underline" }}>recommend this hacker</em>  to a friend and/or family member for professional services?</h5>
                                    <hr />
                                    <p>Would and/or how willing would you be to <strong style={{ color: "blue" }}>refer a friend or family member</strong> to this hacker or company? Would you be willing to trust this person and refer them to other's needing similar jobs and/or services?</p>
                                </CardHeader>
                                <CardBody>
                                    <StarRatings
                                        rating={rating.wouldReferToFriendOrFamily}
                                        changeRating={(rating) => changeStarRating("wouldReferToFriendOrFamily", rating)}
                                        numberOfStars={10}
                                        starEmptyColor={"#000"}
                                        starHoverColor={"#7366ff"}
                                        starRatedColor={"#f73164"}
                                        name='rating-wouldReferToFriendOrFamily'
                                        starSpacing="7.5px"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <hr />
                    <Button disabled={reviewChecks()} onClick={handleReviewSubmission} color="success" style={{ width: "100%" }}>Submit Review & Complete Contract (will be archived)</Button>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <Row>
                        <Col sm="12" lg="12" xl="12" md="12">
                            <Card>
                                <CardHeader>
                                    <h5>Enter your 'access key'</h5><span>{"Enter your "} <code>{"access-key"}</code> {"to continue posting your review. This access-key is ONLY made available AFTER both user's have agreed the contract/job is in-fact complete!"}</span>
                                </CardHeader>
                                <CardBody className="megaoptions-border-space-sm">
                                    <Form className="mega-inline">
                                        <Row>
                                            <Col sm="12" lg="12" xl="12" md="12">
                                                <Card className='shadow'>
                                                    <Media className="p-20">
                                                        <div className="radio radio-primary mr-3">
                                                            <Label for="radio19"></Label>
                                                        </div>
                                                        <Media body>
                                                            <h6 className="mt-0 mega-title-badge">Enter your 'access-key' to gain access to the review page to leave a review for this user<span className="badge badge-primary pull-right digits">{"ACCESS KEY - ENTRY"}</span></h6>
                                                            <p>{"Please enter your 'access-key' from the previous page so we know that both user's have in-fact agreed of completion. If you enter a wrong code - your access will be denied & no data will be accepted.."}</p>
                                                            <hr />
                                                            <FormGroup className=" m-form__group">
                                                                <Label>Enter your access code/key to gain access to the 'review' section/content</Label>
                                                                <InputGroup>
                                                                    <InputGroupAddon addonType="prepend"><InputGroupText className='accesskey-text-input'>{"ACCESS CODE/KEY"}</InputGroupText></InputGroupAddon>
                                                                    <Input value={accessCode} onChange={(e) => setAccessCode(e.target.value)} className="form-control" type="text" placeholder={"Enter your access code/key to gain access to the 'review' section/content"} />
                                                                </InputGroup>
                                                            </FormGroup>
                                                        </Media>
                                                    </Media>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                                <CardFooter className=" text-right">
                                    <Button onClick={handleAccessTokenSubmission} color="primary" style={{ width: "100%" }}>Submit Access-Key/Code</Button>
                                </CardFooter>
                                </Card>
                        </Col>
                    </Row>
                </Fragment>
            );
        }
    }
    return (
        <Fragment>
            <Breadcrumb parent="Review 'Hacker' Account" title="Leave A Review For This Specific Hacker!" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className={"shadow"}>
                            <CardHeader className='b-l-info b-r-info'>
                                <h2>Leave a review for this hacker account - be honest, transparent and truthful.</h2>
                                <p>We <strong style={{ color: "blue" }}>HIGHLY RECOMMEND</strong> being honest, transparent and as truthful as possible while reviewing this user. <strong>IF</strong> you feel you have a negative experience, convey that accurately but if you feel you had a <strong>positive</strong> interaction with this user, convey that accurately as well!</p>
                                <hr />
                                <p>User's will <strong style={{ color: "blue" }}>not</strong> be able to see eachother's reviews until <strong style={{ color: "blue" }}>after</strong> both users have left reviews for eachother or the 1-week expiration occurs - whichever occurs first.</p>
                            </CardHeader>
                            <CardBody>
                                {renderMainContentPassword()}
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
export default connect(mapStateToProps, { })(ReviewHackerAccountCompletedJobHelper);