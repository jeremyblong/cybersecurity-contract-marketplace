import React, { Fragment, useEffect, useState, useRef } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb'
import LearningEducationCourseFilterHelper from "./helpers/filter.js";
import { Container, Row, Col, Media, Label, Badge, ListGroup, ListGroupItem, Card, CardBody, CardHeader } from 'reactstrap';
import { connect } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import moment from "moment";
import "./styles.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { Modal } from 'react-responsive-modal';
import ReactPlayer from 'react-player';
import CommentsIndividualCourseHelper from "./helpers/comments/renderCommentSection.js";
import { NotificationManager } from 'react-notifications';


const LearningEducationCourseHelper = ({ userData, location }) => {
  // params from url 
  const params = useParams();
  // initialize state items
  const [ courseData, setCourseData ] = useState(null);
  const [ user, setUserData ] = useState(null);
  const [ duration, setVideoDuration ] = useState(0);
  const [ modalDemoVideo, updateModalDemoVideo ] = useState(false);
  const [ viewsModal, openViewsModal ] = useState(false);
  const [ totalViewsList, setTotalViewsList ] = useState([]);
  const [ likes, setLikes ] = useState(0);
  const [ dislikes, setDislikes ] = useState(0);

  // mounted logic - fetch course data from ID from params
  useEffect(() => {
    const configuration = {
      params: {
        id: params.id,
        signedInUserID: userData.uniqueId,
        fullName: `${userData.firstName} ${userData.lastName}`
      }
    }
    axios.get(`${process.env.REACT_APP_BASE_URL}/gather/individual/course/data`, configuration).then((res) => {
        if (res.data.message === "Successfully fetched course/listing!") {
            console.log(res.data);
            // successful request
            const { course } = res.data;
            // update course view count details
            setTotalViewsList(course.viewedByList);
            // set likes
            setLikes(course.likes);
            // set dislikes
            setDislikes(course.dislikes);
            // configuration for next api-request
            const config = {
              params: {
                uniqueId: course.poster
              }
            }
            axios.get(`${process.env.REACT_APP_BASE_URL}/gather/core/anonymous/user/data`, config).then((res) => {
                if (res.data.message === "Successfully gathered core user information!") {
                    console.log(res.data);
        
                    const { user } = res.data;
        
                    setUserData(user);
                    setCourseData(course);
                } else {
                    console.log("err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            console.log("err", res.data);
        }
    }).catch((err) => {
        console.log(err);
    });
  }, []);

  const handleAdditionalCourseLike = () => {
    console.log("handleAdditionalCourseLike clicked.");

    const config = {
      courseID: courseData.id,
      signedInUserID: userData.uniqueId,
      fullName: `${userData.firstName} ${userData.lastName}`
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}/add/like/course/learning/unique`, config).then((res) => {
        if (res.data.message === "Successfully liked this post!") {
          console.log(res.data);

          setLikes(likes + 1);

          NotificationManager.success("Successfully liked this post, We've added one to the count of this course's total 'like' count...", "Added to like count!", 4750);

        } else if (res.data.message === "Removed a like from this post/course!") {

          setLikes(likes - 1);

          NotificationManager.warning("Removed/Revoked a 'like' from this course/listing, You already liked this post previously so we've removed you're existing response - like it again to add your 'like' back!", "Revoked/Removed like from count!", 4750);
        } else {
            console.log("err", res.data);
        }
    }).catch((err) => {
        console.log(err);
    })
  }
  const handleCouseDislike = () => {
    console.log("handleCouseDislike clicked.");

    const config = {
      courseID: courseData.id,
      signedInUserID: userData.uniqueId,
      fullName: `${userData.firstName} ${userData.lastName}`
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}/add/dislike/course/learning/unique`, config).then((res) => {
        if (res.data.message === "Successfully disliked this post!") {
          console.log(res.data);

          setDislikes(dislikes + 1);

          NotificationManager.success("Successfully disliked this post, We've added one to the count of this course's total 'dislike' count...", "Added to dislike count!", 4750);

        } else if (res.data.message === "Removed a dislike from this post/course!") {

          setDislikes(dislikes - 1);

          NotificationManager.warning("Removed/Revoked a 'dislike' from this course/listing, You already disliked this post previously so we've removed you're existing response - dislike it again to add your 'dislike' back!", "Revoked/Removed dislike from count!", 4750);
        } else {
            console.log("err", res.data);
        }
    }).catch((err) => {
        console.log(err);
    })
  }

  const formatFileSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }
  const accordionValuesChanged = async (values) => {
    setVideoDuration(0);
    // select first item of array as only item will ever return
    const currentlySelected = values[0];
    // find matching value
    const matchedValue = courseData.mainData.pageTwoData.courseContentSections.filter((item) => item.id === currentlySelected)[0];
    // construct video url
    const currentURL = `${process.env.REACT_APP_ASSET_LINK}/${matchedValue.video.link}`;
    // create video tag to figure out duration of each video
    const video = document.createElement("video");
    // assign video attributes
    video.src = `${process.env.REACT_APP_ASSET_LINK}/${matchedValue.video.link}`;
    video.preload = "metadata";
    video.addEventListener("loadedmetadata", function() {
      setVideoDuration(Math.round(video.duration));
    });
  }
  const calculateMin = (minutes) => {
    return (minutes / 60).toFixed(2);
  }

  const renderMainContentConditionally = () => {
    if (courseData !== null & user !== null) {
      const bannerImageFull = `${process.env.REACT_APP_ASSET_LINK}/${courseData.mainData.pageThreeData.homepageImage.link}`;
      const promoDemoVideoFull = `${process.env.REACT_APP_ASSET_LINK}/${courseData.mainData.pageThreeData.promotionalDemoFile.link}`
      return (
        <Fragment>
          <Modal open={modalDemoVideo} onClose={() => updateModalDemoVideo(false)} center>
            <Container fluid={false}>
              <Row>
                  <Col sm="12" md="12" lg="12" xl="12">
                    <Card className="card-absolute add-shadow-course-card">
                        <CardHeader className="bg-secondary">
                            <h5 className={"modal-card-header-course"}>Promotional/Demo Video Viewing</h5>
                        </CardHeader>
                        <CardBody>
                          <h4 className={"viewing-modal-demo-video-custom"}><strong style={{ textDecorationLine: "underline" }}>Viewing demo/promo video</strong>! This video <strong style={{ color: "#f73164", textDecorationLine: "underline" }}>should</strong> give you a rough idea of what you'll be purchasing if you decide to purchase this course, the video should sum-up the topics included...</h4>
                          <hr />
                          <ReactPlayer progressInterval={1000} controls={true} playIcon={true} playing={false} loop={false} volume={1} width={"100%"} height={"100%"} url={promoDemoVideoFull} />
                        </CardBody>
                    </Card>
                </Col>
              </Row>
            </Container>
          </Modal>
          <Modal classNames={{
            modal: 'viewsModalList',
          }} open={viewsModal} onClose={() => openViewsModal(false)} center>
            <Container fluid={false}>
              <Row>
                  <Col sm="12" md="12" lg="12" xl="12">
                    <Card className="card-absolute add-shadow-course-card">
                        <CardHeader className="bg-secondary">
                            <h5 className={"modal-card-header-course"}>Course View(ing) Log Details</h5>
                        </CardHeader>
                        <CardBody>
                          <h4 className={"viewing-modal-demo-video-custom"}>Below is a list of people/user's that've previously viewed this specific course. Each view is unique & cannot be duplicated - check out who's viewed this course below...!</h4>
                          <hr />
                          <ListGroup className="list-group-flush maxed-list-views-course">
                            {typeof totalViewsList !== "undefined" && totalViewsList.length > 0 ? totalViewsList.map((view, indexx) => {
                              return (
                                <Fragment>
                                  <ListGroupItem>{view.viewerName}</ListGroupItem>
                                </Fragment>
                              );
                            }) : <Fragment>
                              <hr />
                                <h4 className={"viewing-modal-demo-video-custom"}>This course/listing does NOT have any current views... Try viewing this after this course has some active unique views!</h4>
                              <hr />
                            </Fragment>}
                          </ListGroup>
                        </CardBody>
                    </Card>
                </Col>
              </Row>
            </Container>
          </Modal>
          <Col xl="9 xl-60">
              <div className="blog-single">
                <div className="blog-box blog-details">
                <Media className="img-fluid w-100" src={bannerImageFull} alt="blog-main"/>
                  <div className="blog-details">
                    <ul className="blog-social">
                      <li className={"li-left-bar-course-eliminate-border digits"}>Posted {moment(courseData.date).fromNow()}</li>
                      <li className={"li-left-bar-course digits"}><i className="icofont icofont-user"></i>Posted by {user.firstName} <span>{user.lastName} </span></li>
                      <li className={"li-left-bar-course digits"}><i className="icofont icofont-thumbs-up"></i>{likes}<span>{" people like this"}</span></li>
                      <li className={"li-left-bar-course digits"}><i className="icofont icofont-thumbs-down"></i>{dislikes}<span>{" people dislike this"}</span></li>
                      <li className={"li-left-bar-course digits"}><i className="icofont icofont-ui-chat"></i>{`Purchased ${courseData.purchased.length} time(s)`}</li>
                    </ul>
                    <h3 className={"heavy-label-course-two"}>Course Title & Sub-title</h3>
                    <h4>Title: {courseData.mainData.pageOneData.mainData.courseTitle}</h4>
                    <h4>Sub: {courseData.mainData.pageThreeData.subtitle}</h4>
                    <h3 style={{ marginBottom: "20px" }} className={"heavy-label-course-two"}>Course Content</h3>
                    <div className={"accordion-wrapper-wrapper"}>
                      <Accordion onChange={(values) => accordionValuesChanged(values)}>
                        {courseData.mainData.pageTwoData.courseContentSections.map((section, idx) => {
                          return (
                            <Fragment>
                              <AccordionItem uuid={section.id} className={"accordion-wrapper-course"}>
                                  <AccordionItemHeading className={"accordion-header-courses"}>
                                      <AccordionItemButton onClick={(value) => console.log("button clicked", value)} className={"heavy-accordion-title"}>
                                          <div className={"float-left-course"}>
                                            <img src={require("../../../../../assets/icons/arrow-down.png")} className={"icon-maxed-accordion-section"} />{section.sectionTitle}
                                          </div>
                                      </AccordionItemButton>
                                  </AccordionItemHeading>
                                  <AccordionItemPanel>
                                      <div className={"content-section-main-course"}>
                                        <span className="f-w-600 custom-head-in-panel">Section Description</span>
                                        <p className={"accordion-paragraph-course"}>{section.description}</p>
                                        <hr />
                                        <span className="f-w-600 custom-head-in-panel">Section Video Name</span>
                                        <p className={"accordion-paragraph-course"}>{section.video.name}</p>
                                        <Row style={{ marginTop: "12.5px" }}>
                                          <Col sm="12" md="6" lg="6" xl="6">
                                            <span className="f-w-600 custom-head-in-panel">Video File-Size</span>
                                            <p className={"accordion-paragraph-course"}>{formatFileSize(section.video.size)}</p>
                                          </Col>
                                          <Col sm="12" md="6" lg="6" xl="6">
                                            <div className={"position-bottom-right-course-absolute"}>
                                              <span className="f-w-600 custom-head-in-panel">Video Duration</span>
                                              <p className={"accordion-paragraph-course"}>{calculateMin(Math.round(duration))} Minute(s)</p>
                                            </div>
                                          </Col>
                                        </Row>
                                      </div>
                                  </AccordionItemPanel>
                              </AccordionItem>
                            </Fragment>
                          );
                        })}
                      </Accordion>
                    </div>
                    <hr />
                    <div style={{ marginBottom: "17.5px" }} className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{"What are the requirements or prerequisites for taking your course?"}</h5>
                    </div>
                    <ListGroup>
                      {courseData.mainData.pageOneData.requirementOrPreReqs.requirement0 !== null ? <ListGroupItem>{courseData.mainData.pageOneData.requirementOrPreReqs.requirement0}</ListGroupItem> : null}
                      {courseData.mainData.pageOneData.requirementOrPreReqs.requirement1 !== null ? <ListGroupItem>{courseData.mainData.pageOneData.requirementOrPreReqs.requirement1}</ListGroupItem> : null}
                      {courseData.mainData.pageOneData.requirementOrPreReqs.requirement2 !== null ? <ListGroupItem>{courseData.mainData.pageOneData.requirementOrPreReqs.requirement2}</ListGroupItem> : null}
                    </ListGroup>
                    <hr />
                    <div style={{ marginBottom: "17.5px" }} className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{"What will students learn in your course?"}</h5>
                    </div>
                    <ListGroup>
                      {courseData.mainData.pageOneData.whatStudentsWillLearn.objective0 !== null ? <ListGroupItem>{courseData.mainData.pageOneData.whatStudentsWillLearn.objective0}</ListGroupItem> : null}
                      {courseData.mainData.pageOneData.whatStudentsWillLearn.objective1 !== null ? <ListGroupItem>{courseData.mainData.pageOneData.whatStudentsWillLearn.objective1}</ListGroupItem> : null}
                      {courseData.mainData.pageOneData.whatStudentsWillLearn.objective2 !== null ? <ListGroupItem>{courseData.mainData.pageOneData.whatStudentsWillLearn.objective2}</ListGroupItem> : null}
                      {courseData.mainData.pageOneData.whatStudentsWillLearn.objective3 !== null ? <ListGroupItem>{courseData.mainData.pageOneData.whatStudentsWillLearn.objective3}</ListGroupItem> : null}
                      {courseData.mainData.pageOneData.whatStudentsWillLearn.objective4 !== null ? <ListGroupItem>{courseData.mainData.pageOneData.whatStudentsWillLearn.objective4}</ListGroupItem> : null}
                      {courseData.mainData.pageOneData.whatStudentsWillLearn.objective5 !== null ? <ListGroupItem>{courseData.mainData.pageOneData.whatStudentsWillLearn.objective5}</ListGroupItem> : null}
                    </ListGroup>
                    <hr />
                    <div style={{ marginBottom: "17.5px" }} className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{"Who is this course for?"}</h5>
                    </div>
                    <ListGroup>
                      {courseData.mainData.pageOneData.whoIsThisCourseFor.concept0 !== null ? <ListGroupItem>{courseData.mainData.pageOneData.whoIsThisCourseFor.concept0}</ListGroupItem> : null}
                      {courseData.mainData.pageOneData.whoIsThisCourseFor.concept1 !== null ? <ListGroupItem>{courseData.mainData.pageOneData.whoIsThisCourseFor.concept1}</ListGroupItem> : null}
                      {courseData.mainData.pageOneData.whoIsThisCourseFor.concept2 !== null ? <ListGroupItem>{courseData.mainData.pageOneData.whoIsThisCourseFor.concept2}</ListGroupItem> : null}
                    </ListGroup>
                    <hr />
                    <h3 className={"heavy-label-course-two"}>Relevant Hashtags/Tags</h3>
                    {courseData.mainData.pageOneData.mainData.courseHashtags.map((tag, index) => {
                      return (
                        <Fragment key={index}>
                          <Badge color="dark" className={"pill-badge-custom-course"}>{tag.text}</Badge>
                        </Fragment>
                      );
                    })}
                    <hr />
                    <div className="single-blog-content-top">
                      <h3 className={"heavy-label-course-two"}>Description</h3>
                      <ReactMarkdown children={courseData.mainData.pageOneData.mainData.description} remarkPlugins={[remarkGfm]} className="custom-p-course" />
                    </div>
                  </div>
                </div>
                <CommentsIndividualCourseHelper courseData={courseData} />
              </div>
            </Col>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Col xl="9 xl-60">
            <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                <p>
                    <Skeleton count={70} />
                </p>
            </SkeletonTheme>
          </Col>
        </Fragment>
      );
    }
  }

  return (
      <Fragment>
        <Breadcrumb parent="Learning new skills & leveling up!" title="Course details & core information"/>
          <Container fluid={true}>
          <Row>
            {renderMainContentConditionally()}
            <LearningEducationCourseFilterHelper handleCouseDislike={handleCouseDislike} handleAdditionalCourseLike={handleAdditionalCourseLike} setTotalViewsList={setTotalViewsList} openViewsModal={openViewsModal} updateModalDemoVideo={updateModalDemoVideo}  courseData={courseData} />
        </Row>
        </Container>
      </Fragment>
    );
};
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {  })(LearningEducationCourseHelper);