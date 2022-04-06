import React, { Fragment, useEffect, useState } from 'react';
import "./styles.css";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, Media, ListGroup, ListGroupItem } from "reactstrap";
import Breadcrumb from '../../../../../../../layout/breadcrumb';
import ReactPlayer from 'react-player';
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { NotificationManager } from 'react-notifications';
import { connect } from "react-redux";

const ViewIndividualPurchasedCourseDataHelper = ({ userData }) => {

    const { id } = useParams();

    const [ courseData, setCourseData ] = useState(null);
    const [ ready, setReady ] = useState(false);
    const [ seconds, setCurrentSeconds ] = useState(0);
    const [ currentSelected, setCurrentSelected ] = useState(null);

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

    const formatFileSize = (bytes) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
    const accordionValuesChanged = async (section) => {
        // matched item
        const video = document.createElement("video");
        // assign video attributes
        video.src = `${process.env.REACT_APP_ASSET_LINK}/${section.video.link}`;
        video.preload = "metadata";
        // return result
        video.addEventListener("loadedmetadata", function () {
            return video.duration;
        });
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
    const viewWelcomeLetterMessage = () => {
        console.log("viewWelcomeLetterMessage clicked/ran.");
    }
    return (
        <Fragment>
            <Breadcrumb parent="Viewing Course Data/Information (Purchased Content).." title={`Course Data Is Now Available`}/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className='shadow'>
                            <CardHeader className='b-l-info b-r-info'>
                                <h3>{ready === true ? courseData.mainData.pageOneData.mainData.courseTitle : "Still loading course title..."}</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col sm="12" md="9" lg="9" xl="9">
                                        {currentSelected !== null ? <Fragment>
                                            <ReactPlayer onProgress={(data) => setCurrentSeconds(data.loadedSeconds)} controls={true} playing={true} loop={false} width={"100%"} height={"625px"} className={"custom-player-course-content"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${currentSelected.video.link}`} />
                                            <Card style={{ marginTop: "12.5px" }} className='shadow'>
                                                <CardHeader>
                                                    <h3>You can view specific information about this listing that wasn't available previously such as this instructors 'welcome message' & more..</h3>
                                                </CardHeader>
                                                <CardBody>
                                                    <h5 style={{ marginTop: "12.5px" }}>This clip/video is approx. {calculateMin(seconds)} minute(s) in length</h5>
                                                    <hr />
                                                    <Row>
                                                        <Col sm="12" lg="12" md="12" xl="12">
                                                            <Button onClick={() => {
                                                                viewWelcomeLetterMessage();
                                                            }} className={"btn-square-success"} outline color={"success-2x"} style={{ width: "100%" }}>View 'Welcome Message'</Button>
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