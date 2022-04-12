import React, { Fragment } from 'react';
import { Row, Col, Card, CardHeader, CardBody, ListGroup, ListGroupItem, Badge, Button } from "reactstrap";
import "./styles.css";
import ReactPlayer from 'react-player';
import axios from "axios";
import { connect } from "react-redux";
import { NotificationManager } from 'react-notifications';
import { useHistory } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; 


const ReviewDetailsOnTutorialVideoUploadHelper = ({ allData, userData }) => {

    const history = useHistory();

    const handleSubmissionData = () => {
        console.log("handleSubmissionData clicked/ran..");

        confirmAlert({
            title: `Are you sure you'd like to post this course?!`,
            message: `Are you sure you'd like to post this course to be viewed by everyone on ${process.env.REACT_APP_APPLICATION_NAME} & the general internet - if so, please click 'Yes' and post your tutorial video!`,
            buttons: [
              {
                label: 'Yes, Post Tutorial Course!',
                onClick: () => {
                    const configuration = {
                        uniqueId: userData.uniqueId,
                        data: allData,
                        posterName: `${userData.firstName} ${userData.lastName}`,
                        accountType: userData.accountType
                    }
            
                    axios.post(`${process.env.REACT_APP_BASE_URL}/post/short/tutorial/course/instructional`, configuration).then((res) => {
                        if (res.data.message === "Successfully posted tutorial!") {
                            console.log(res.data);
            
                            NotificationManager.success("We've SUCCESSFULLY posted your new tutorial video/snippet - we will redirect you momentarily to the dashboard but feel free to locate your tutorial to see how it looks live!", "Successfully posted your tutorial course data!", 4750);
            
                            setTimeout(() => {
                                if (userData.accountType === "hackers") {
                                    history.replace("/dashboard/hacker");
                                } else {
                                    history.replace("/dashboard/employer")
                                }
                            }, 4500)
                        } else {
                            console.log("Err", res.data);
            
                            NotificationManager.error("We've encountered an error while attempting to upload your 'tutorial video' while attempting to post it live! Try this action again or contact support if this problem persists..", "Unknown error occurred while processing request!", 4750);
                        }
                    }).catch((err) => {
                        console.log(err);
            
                        NotificationManager.error("We've encountered an error while attempting to upload your 'tutorial video' while attempting to post it live! Try this action again or contact support if this problem persists..", "Unknown error occurred while processing request!", 4750);
                    })
                }
              },
              {
                label: 'No, Cancel',
                onClick: () => {
                    console.log("Cancelled.");
                }
              }
            ]
        });
    }
    return (
        <Fragment>
            <Row style={{ marginTop: "17.5px" }}>
                <Col sm="12" md="6" lg="6" xl="6">
                    <Card className='shadow'>
                        <CardHeader className='b-l-primary b-r-primary'>
                            <h3>Video Content/Data (Uploaded Content)</h3>
                        </CardHeader>
                        <CardBody>
                            <ReactPlayer controls={true} loop={true} width={"100%"} className={"video-uploaded-course-data-tutorial"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${allData.courseContent.link}`} />
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="12" md="6" lg="6" xl="6">
                    <Card className='shadow'>
                        <CardHeader className='b-l-primary b-r-primary'>
                            <h3>Video Content/Data (Uploaded Content)</h3>
                        </CardHeader>
                        <CardBody>
                            <ListGroup>
                                <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{"Tutorial Title"}</h5>
                                    </div>
                                    <p className="mb-1">{allData.videoTitle}</p>
                                </ListGroupItem>
                                <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{"Tutorial Description"}</h5>
                                    </div>
                                    <p className="mb-1">{allData.description}</p>
                                </ListGroupItem>
                                <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{"Tutorial Sub-Title"}</h5>
                                    </div>
                                    <p className="mb-1">{allData.videoSubtitle}</p>
                                </ListGroupItem>
                                <ListGroupItem className="list-group-item-action flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{"Tutorial Sub-Title"}</h5>
                                    </div>
                                    {typeof allData.hashtags !== "undefined" && typeof allData.hashtags !== "undefined" && allData.hashtags.length > 0 ? allData.hashtags.map((hashtag, idx) => {
                                        return (
                                            <Fragment key={idx}>
                                                <Badge color="dark tag-pills-sm-mb">{hashtag.text}</Badge>
                                            </Fragment>
                                        );
                                    }) : <Fragment>
                                        <h4 className='leftalign-text-hired'>No tags/hashtags are provided for this specific listing..</h4>
                                    </Fragment>}
                                </ListGroupItem>
                            </ListGroup>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Button onClick={handleSubmissionData} className={"btn-square-success"} color={"success"} style={{ width: "100%", marginBottom: "12.5px", marginTop: "12.5px" }}>Submit & Post Tutorial Video!</Button>
            </Row>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, { })(ReviewDetailsOnTutorialVideoUploadHelper);