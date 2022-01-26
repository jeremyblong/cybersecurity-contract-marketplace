import React, { Fragment, useEffect, useState, useRef } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb'
import LearningEducationCourseFilterHelper from "./helpers/filter.js";
import { Container, Row, Col, Media, Label, Badge } from 'reactstrap';
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


const LearningEducationCourseHelper = ({ userData, location }) => {
  // params from url 
  const params = useParams();
  // initialize state items
  const [ courseData, setCourseData ] = useState(null);
  const [ user, setUserData ] = useState(null);
  const [ duration, setVideoDuration ] = useState(0);

  // mounted logic - fetch course data from ID from params
  useEffect(() => {
    const configuration = {
      params: {
        id: params.id
      }
    }
    axios.get(`${process.env.REACT_APP_BASE_URL}/gather/individual/course/data`, configuration).then((res) => {
        if (res.data.message === "Successfully fetched course/listing!") {
            console.log(res.data);
            // successful request
            const { course } = res.data;
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
      setVideoDuration(video.duration);
    });
  }

  console.log("courseData fetched...:", courseData);

  const renderMainContentConditionally = () => {
    if (courseData !== null & user !== null) {
      const bannerImageFull = `${process.env.REACT_APP_ASSET_LINK}/${courseData.mainData.pageThreeData.homepageImage.link}`;
      return (
        <Fragment>
          <Col xl="9 xl-60">
              <div className="blog-single">
                <div className="blog-box blog-details">
                <Media className="img-fluid w-100" src={bannerImageFull} alt="blog-main"/>
                  <div className="blog-details">
                    <ul className="blog-social">
                      <li className={"li-left-bar-course-eliminate-border digits"}>Posted {moment(courseData.date).fromNow()}</li>
                      <li className={"li-left-bar-course digits"}><i className="icofont icofont-user"></i>Posted by {user.firstName} <span>{user.lastName} </span></li>
                      <li className={"li-left-bar-course digits"}><i className="icofont icofont-thumbs-up"></i>{courseData.likes}<span>{" people like this"}</span></li>
                      <li className={"li-left-bar-course digits"}><i className="icofont icofont-thumbs-down"></i>{courseData.dislikes}<span>{" people dislike this"}</span></li>
                      <li className={"li-left-bar-course digits"}><i className="icofont icofont-ui-chat"></i>{`Purchased ${courseData.purchased.length} time(s)`}</li>
                    </ul>
                    <h3 className={"heavy-label-course-two"}>Course Title</h3>
                    <h4>{courseData.mainData.pageOneData.mainData.courseTitle}</h4>
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
                                              <p className={"accordion-paragraph-course"}>{duration.toFixed(2)}</p>
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
                    <h3 className={"heavy-label-course-two"}>Relevant Hashtags/Tags</h3>
                    {courseData.mainData.pageOneData.mainData.courseHashtags.map((tag, index) => {
                      return (
                        <Fragment key={index}>
                          <Badge color="dark" className={"pill-badge-custom-course"}>{tag.text}</Badge>
                        </Fragment>
                      );
                    })}
                    <div className="single-blog-content-top">
                      <h3 className={"heavy-label-course-two"}>Description</h3>
                      <ReactMarkdown children={courseData.mainData.pageOneData.mainData.description} remarkPlugins={[remarkGfm]} className="custom-p-course" />
                    </div>
                  </div>
                </div>
                <section className="comment-box">
                  <h4>Comment</h4>
                  <hr/>
                  <ul>
                    <li>
                      <Media className="align-self-center"><Media className="align-self-center" src={require("../../../../../assets/images/blog/comment.jpg")} alt=""/>
                        <Media body>
                          <Row>
                            <Col md="4 xl-100">
                              <h6 className="mt-0">Name goes here<span> {"( Designer )"}</span></h6>
                            </Col>
                            <Col md="8 xl-100">
                              <ul className="comment-social float-left float-md-right learning-comment">
                                <li className="digits"><i className="icofont icofont-thumbs-up"></i>{"02 Hits"}</li>
                                <li className="digits"><i className="icofont icofont-ui-chat"></i>{"598 Comments"}</li>
                              </ul>
                            </Col>
                          </Row>
                          <p>{"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."}</p>
                        </Media>
                      </Media>
                    </li>
                    <li>
                      <ul>
                        <li>
                          <Media><Media className="align-self-center" src={require("../../../../../assets/images/blog/9.jpg")} alt=""/>
                            <Media body>
                              <Row>
                                <Col xl="12">
                                  <h6 className="mt-0">Name goes here<span> {"( Designer )"}</span></h6>
                                </Col>
                              </Row>
                              <p>{"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."}</p>
                            </Media>
                          </Media>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Media><Media className="align-self-center" src={require("../../../../../assets/images/blog/4.jpg")} alt=""/>
                        <Media body>
                          <Row>
                            <Col md="4 xl-100">
                              <h6 className="mt-0">Name goes here<span> {"( Designer )"}</span></h6>
                            </Col>
                            <Col md="8 xl-100">
                              <ul className="comment-social float-left float-md-right learning-comment">
                                <li className="digits"><i className="icofont icofont-thumbs-up"></i>{"02 Hits"}</li>
                                <li className="digits"><i className="icofont icofont-ui-chat"></i>{"598 Comments"}</li>
                              </ul>
                            </Col>
                          </Row>
                          <p>{"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."}</p>
                        </Media>
                      </Media>
                    </li>
                  </ul>
                </section>
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
            <LearningEducationCourseFilterHelper courseData={courseData} />
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