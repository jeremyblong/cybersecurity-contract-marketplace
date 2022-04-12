import React, { Fragment, useEffect, useState } from 'react';
import "./styles.css";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, Media, CardFooter, ListGroup, ListGroupItem } from "reactstrap";
import Breadcrumb from '../../../../../../../layout/breadcrumb';
import ReactPlayer from 'react-player';
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { NotificationManager } from 'react-notifications';
import { connect } from "react-redux";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CountUp from "react-countup";
import _ from "lodash";
import moment from "moment";
import { Modal } from 'react-responsive-modal';
import MessagePaneHelperCourseContent from "./helpers/helpers.js";


const ViewIndividualPurchasedCourseDataHelper = ({ userData }) => {

    const { id } = useParams();

    const [ courseData, setCourseData ] = useState(null);
    const [ ready, setReady ] = useState(false);
    const [ seconds, setCurrentSeconds ] = useState(0);
    const [ currentSelected, setCurrentSelected ] = useState(null);
    const [ gatheredUserData, setGatheredUserData ] = useState(null);
    const [ modalOpen, modalOpenState ] = useState(false);
    const [ messagePaneOpen, setMessagePaneOpen ] = useState(false);

    useEffect(() => {
        const configuration = {
            params: {
                uniqueId: userData.uniqueId,
                accountType: userData.accountType,
                courseID: id
            }
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/purchased/course/data/profile`, configuration).then(async (res) => {
            if (res.data.message === "Successfully gathered course!") {
                console.log(res.data);

                const { course } = res.data;

                const config = {
                    params: {
                        uniqueId: course.poster
                    }
                }
                
                axios.get(`${process.env.REACT_APP_BASE_URL}/gather/core/anonymous/user/data`, config).then((response) => {
                    if (response.data.message === "Successfully gathered core user information!") {
                        console.log("response.data", response.data);
        
                        const { user } = response.data;
        
                        setGatheredUserData(user);
                    } else {
                        console.log("response.data error", response.data);
                    }
                }).catch((errorrrr) => {
                    console.log("errorrrr", errorrrr);
                })

                setCourseData(course);
                setCurrentSelected(course.mainData.pageTwoData.courseContentSections[0]);
                setReady(true);
            } else {
                console.log("Err", res.data);

                NotificationManager.error("There was an error that occurred after trying to retrieve the required data, try reloading this page or contact support if this problem continue to persist!", "An unknown error has occurred!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("There was an error that occurred after trying to retrieve the required data, try reloading this page or contact support if this problem continue to persist!", "An unknown error has occurred!", 4750);
        })
    }, []);

    console.log("courseData", courseData);

    const messageCoursePosterUser = () => {
        console.log("messageCoursePosterUser clicked/ran");

        setMessagePaneOpen(true);
    }

    const formatFileSize = (bytes) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
    const handleFileChangeCalculation = (section) => {
        console.log("handleFileChangeCalculation clicked/ran.");

        setCurrentSelected(section);
    }
    const calculateMin = (minutes) => {
        return (minutes / 60).toFixed(2);
    }
    const renderRightMappedBar = () => {
        if (ready === true) {
            return (
                <Fragment>
                    <ListGroup>
                        {courseData.mainData.pageTwoData.courseContentSections.map((section, index) => {
                            console.log("section", section)
                            return (
                                <Fragment key={index}>
                                    <ListGroupItem onClick={() => handleFileChangeCalculation(section)} className="list-group-item-action list-group-item-action-hover-effect flex-column align-items-start">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="sectiontitle-course"><strong style={{ color: "#f73164" }}>{`Section ${index + 1}) `}</strong> {section.sectionTitle}</h5>
                                        </div>
                                        <p className="formatted-size-course">{formatFileSize(section.video.size)} file-size</p>
                                    </ListGroupItem>
                                </Fragment>
                            );
                        })}
                    </ListGroup>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                        <p>
                            <Skeleton count={35} />
                        </p>
                    </SkeletonTheme>
                </Fragment>
            );
        }
    }
    const calculatePicOrVideoDisplay = (last) => {
        if (last !== null && _.has(last, "link")) {
            if (last.type.includes("video")) {
                // video logic
                return (
                    <div className="card-profile">
                        <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"rounded-circle"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                    </div>
                );
            } else {
                // image logic
                return (
                    <div className="card-profile">
                        <img className="rounded-circle" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} alt="" />
                    </div>
                );
            }    
        } else {
            // image logic
            return (
                <div className="card-profile">
                    <img className="rounded-circle" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} alt="" />
                </div>
            );
        } 
    } 

    console.log("currentSelected", currentSelected);
    console.log("gatheredUserData", gatheredUserData);
    
    return (
        <Fragment>
            <MessagePaneHelperCourseContent employerID={gatheredUserData !== null ? gatheredUserData.uniqueId : null} employerName={gatheredUserData !== null ? `${gatheredUserData.firstName} ${gatheredUserData.lastName}` : "Unknown - Loading..."} messagePaneOpen={messagePaneOpen} setMessagePaneState={setMessagePaneOpen} />
            {courseData !== null ? <Modal
                open={modalOpen}
                onClose={() => modalOpenState(false)}
                center
                classNames={{
                    overlay: 'customOverlay',
                    modal: 'modal-course-welcome-msg',
                }}
            >
                <Container fluid={true}>
                    <Row>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <Card className='shadow'>
                                <CardHeader>
                                    <h2><strong style={{ textDecorationLine: "underline" }}>Welcome Message:</strong></h2>
                                </CardHeader>
                                <CardBody className='b-l-info b-r-info'>
                                    <h4>{courseData.mainData.pageThreeData.welcomeMessage}</h4>
                                </CardBody>
                                <CardFooter>
                                    <Button onClick={() => modalOpenState(false)} className={"btn-square-danger"} color={"danger"} style={{ width: "100%" }}>Close/Exit Modal</Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Modal> : null}
            <Breadcrumb parent="Viewing Course Data/Information (Purchased Content).." title={`Course Data Is Now Available`}/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className='shadow'>
                            <CardHeader className='b-l-info b-r-info'>
                                <h3 style={{ textDecorationLine: "underline" }}>{ready === true ? courseData.mainData.pageOneData.mainData.courseTitle : "Still loading course title..."}</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col sm="12" md="9" lg="9" xl="9">
                                        {currentSelected !== null && gatheredUserData !== null ? <Fragment>
                                            <ReactPlayer onProgress={(data) => setCurrentSeconds(data.loadedSeconds)} controls={true} playing={true} loop={false} width={"100%"} height={"625px"} className={"custom-player-course-content"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${currentSelected.video.link}`} />
                                            <Card style={{ marginTop: "12.5px" }} className='shadow'>
                                                <CardHeader>
                                                    <h3>You can view specific information about this listing that wasn't available previously such as this instructors 'welcome message' & more..</h3>
                                                </CardHeader>
                                                <CardBody>
                                                    <h5 style={{ marginTop: "12.5px", color: "#7366ff" }}>This clip/video is approx. <em style={{ textDecorationLine: "underline" }}>{calculateMin(seconds)} minute(s)</em> in length</h5>
                                                    <hr />
                                                    <Row>
                                                        <Col sm="12" lg="6" md="6" xl="6">
                                                            <Card className="custom-card widget-profile shadow">
                                                                <CardHeader>
                                                                    <img className="img-fluid" src={`${process.env.REACT_APP_ASSET_LINK}/${courseData.mainData.pageThreeData.homepageImage.link}`} alt="profileeee" />
                                                                </CardHeader>
                                                                {calculatePicOrVideoDisplay(_.has(gatheredUserData, "profilePicsVideos") ? gatheredUserData.profilePicsVideos[gatheredUserData.profilePicsVideos.length - 1] : null)}
                                                                <ul className="card-social">
                                                                    <li><a href={null}><i className="fa fa-facebook"></i></a></li>
                                                                    <li><a href={null}><i className="fa fa-google-plus"></i></a></li>
                                                                    <li><a href={null}><i className="fa fa-twitter"></i></a></li>
                                                                    <li><a href={null}><i className="fa fa-instagram"></i></a></li>
                                                                    <li><a href={null}><i className="fa fa-rss"></i></a></li>
                                                                </ul>
                                                                <div className="text-center profile-details">
                                                                    <h4>{gatheredUserData !== null ? `${gatheredUserData.firstName} ${gatheredUserData.lastName}` : "Still loading content.."}</h4>
                                                                    <h6>{_.has(gatheredUserData, "aboutMe") ? gatheredUserData.aboutMe : "Loading content.."}</h6>
                                                                </div>
                                                                <CardFooter className="row">
                                                                    <Col sm="4 col-4" >
                                                                        <h6>Follower(s)</h6>
                                                                        <h3 className="counter">
                                                                        <CountUp end={typeof gatheredUserData.currentlyFollowedBy !== "undefined" && gatheredUserData.currentlyFollowedBy.length ? gatheredUserData.currentlyFollowedBy.length : 0} /></h3>
                                                                    </Col>
                                                                    <Col sm="4 col-4">
                                                                        <h6>Following</h6>
                                                                        <h3><span className="counter"><CountUp end={gatheredUserData.followingHackers.length + gatheredUserData.followingCompanies.length} /></span></h3>
                                                                    </Col>
                                                                    <Col sm="4 col-4">
                                                                        <h6>Likes/Dislikes</h6>
                                                                        <h3><span className="counter"><CountUp end={courseData.likes} /> like(s)/<CountUp end={courseData.dislikes} /> dislike(s)</span></h3>
                                                                    </Col>
                                                                </CardFooter>
                                                                <CardFooter className="row">
                                                                    <Col sm="12" md="12" xl="12" lg="12" >
                                                                        <Button className='btn-square-primary' onClick={messageCoursePosterUser} style={{ width: "100%" }} outline color='primary-2x'>Message 'Course Instructor'</Button>
                                                                    </Col>
                                                                </CardFooter>
                                                            </Card>
                                                        </Col>
                                                        <Col sm="12" lg="6" md="6" xl="6">
                                                            <Card className='shadow'>
                                                                <CardHeader className='b-l-primary b-r-primary'>
                                                                    <h3>Core Course Information/Data</h3>
                                                                </CardHeader>
                                                                <CardBody>
                                                                    <ReactMarkdown children={courseData.mainData.pageOneData.mainData.description} remarkPlugins={[remarkGfm]} className="markdown-currentselected-course-section" />
                                                                    <hr />
                                                                    <p><strong>Posted approx:</strong> {moment(courseData.date).fromNow()}</p>
                                                                    <hr />
                                                                    <p><strong>Category:</strong> {courseData.mainData.pageOneData.mainData.courseCategory.label}</p>
                                                                    <hr />
                                                                    <p><strong>Category:</strong> {courseData.mainData.pageThreeData.skillLevel.label}</p>
                                                                    <hr />
                                                                    <p><strong>Coding Language (Primary):</strong> {courseData.mainData.pageThreeData.primaryLanguageUsed.label}</p>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col sm="12" lg="12" md="12" xl="12">
                                                            <Button onClick={() => modalOpenState(true)} className={"btn-square-success"} outline color={"success-2x"} style={{ width: "100%" }}>View 'Welcome Message'</Button>
                                                        </Col>
                                                    </Row>
                                                    <hr />
                                                </CardBody>
                                            </Card>
                                        </Fragment> : <Fragment>
                                            <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                                <p>
                                                    <Skeleton count={35} />
                                                </p>
                                            </SkeletonTheme>
                                        </Fragment>}
                                    </Col>
                                    <Col sm="12" md="3" lg="3" xl="3">
                                        <div className='maxedout-overflow-course-sections'>
                                            {renderRightMappedBar()}
                                        </div>
                                    </Col>
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
export default connect(mapStateToProps, {  })(ViewIndividualPurchasedCourseDataHelper);