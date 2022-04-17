import React, { useEffect, useState, Fragment } from 'react';
import "./styles.css";
import { Container, Row, Col, Card, CardHeader, CardBody, Label } from "reactstrap";
import Breadcrumb from '../../../../../layout/breadcrumb'
import { connect } from "react-redux";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import ReactPlayer from 'react-player';
import _ from "lodash";
import StarRatings from 'react-star-ratings';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ViewRecentReviewsAllEmployerHelper = ({ userData }) => {

    const [ reviews, setReviews ] = useState([]); 
    const [ ready, setReady ] = useState(false);

    useEffect(() => {
        const config = {
            params: {
                uniqueId: userData.uniqueId,
                accountType: userData.accountType
            }
          }
          axios.get(`${process.env.REACT_APP_BASE_URL}/gather/reviews/only/both/account/types`, config).then((res) => {
              if (res.data.message === "Gathered reviews!") {
                  console.log("res.data reviews: ----- :", res.data);
        
                  const { reviews } = res.data;
                
                  setReviews(reviews);
                  setReady(true);
              } else {
                  console.log("err", res.data);
                  
                  NotificationManager.warning("An unknown error has occurred while attempting to fetch your current received reviews, Contact support if the problem persists!", "Unknown error has occurred.", 4750);
              }
          }).catch((err) => {
              console.log(err);
        
              NotificationManager.warning("An unknown error has occurred while attempting to fetch your current received reviews, Contact support if the problem persists!", "Unknown error has occurred.", 4750);
          })  
    }, []);

    const renderProfilePicVideoMainPageImg = (last) => {

        if (last !== null && _.has(last, "link")) {
            if (last.type.includes("video")) {
                // video logic
                return (
                    <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"img-fluid roundme roundme-video"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                );
            } else {
                // image logic
                return <img className="img-fluid roundme" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} alt="" />;
            }    
        } else {
            // image logic
            return <img className="img-fluid roundme" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} alt="" />;
        } 
    }

    console.log("reviews", reviews);

    const calculateReviewRating = (ratings) => {
        let sum = 0;

        for (const key in ratings) {
            const rating = ratings[key];
            sum += rating;
        }

        return Math.round((sum / Object.keys(ratings).length));
    }

    return (
        <div>
            <Breadcrumb parent="Previously Received Review(s)" title="Previously Received Review's From Contracted Work" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        {ready === true ? <Fragment>
                            <Card className='shadow'>
                                <CardHeader className='b-l-primary b-r-primary'>
                                    <h3>You're viewing your recent <strong style={{ color: "#f73164", textDecorationLine: "underline" }}>completed</strong> review's from other past previously-completed contracts. These reviews were left by other users you've previously connected/worked with..</h3>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        {typeof reviews !== "undefined" && reviews.length > 0 ? reviews.map((review, index) => {
                                            // create last pic
                                            const picOrVideo = review.reviewerPicOrVideo;
                                            return (
                                                <Fragment key={index}>
                                                    <Col sm="12" md="4" lg="4" xl="4">
                                                        <Card className='shadow'>
                                                            <CardHeader className='b-l-info b-r-info'>
                                                                <Row>
                                                                    <Col sm="12" md="2" lg="2" xl="2">
                                                                        {renderProfilePicVideoMainPageImg(picOrVideo)}
                                                                    </Col>
                                                                    <Col sm="12" md="10" lg="10" xl="10">
                                                                        <h3 className='text-left review-left-by'>Review left by <strong style={{ color: "#7366ff", textDecorationLine: "underline" }}>{review.reviewerName}</strong></h3>
                                                                    </Col>
                                                                </Row>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <Label className={"review-label"}>Review Comment(s)</Label>
                                                                <p className='review-paragraph'>{review.reviewText}</p>
                                                                <Label className={"review-label"}>Both parties have reviewed?</Label>
                                                                <p className='review-paragraph' style={review.validated === true ? { color: "green" } : { color: "red" }}>{review.validated === true ? "Both parties left reviews!" : "Only ONE party has currently left a review!"}</p>
                                                                <hr />
                                                                <Label className={"review-label"}>Overall <em style={{ textDecorationLine: "underline" }}>combined</em> review score</Label>
                                                                <StarRatings
                                                                    rating={calculateReviewRating(review.rating)}
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
                                                </Fragment>
                                            );
                                        }) : <Fragment>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <img src={require("../../../../../assets/images/no-reviews-found.png")} className={"no-reviews-found"} />
                                            </Col>
                                        </Fragment>}
                                    </Row>
                                </CardBody>
                            </Card>
                        </Fragment> : <Fragment>
                            <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                <p>
                                    <Skeleton count={45} />
                                </p>
                            </SkeletonTheme>
                        </Fragment>}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {  })(ViewRecentReviewsAllEmployerHelper);