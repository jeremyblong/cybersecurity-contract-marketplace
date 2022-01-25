import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb'
import LearningEducationCourseFilterHelper from "./helpers/filter.js";
import { Container, Row, Col, Media } from 'reactstrap';
import { connect } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import moment from "moment";
import "./styles.css";

const LearningEducationCourseHelper = ({ userData, location }) => {
  // params from url 
  const params = useParams()
  // initialize state items
  const [ courseData, setCourseData ] = useState(null);
  const [ user, setUserData ] = useState(null);

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
                      <li className={"li-left-bar-course digits"}><i className="icofont icofont-user"></i>{user.firstName} <span>{user.lastName} </span></li>
                      <li className={"li-left-bar-course digits"}><i className="icofont icofont-thumbs-up"></i>{courseData.likes}<span>{" people like this"}</span></li>
                      <li className={"li-left-bar-course digits"}><i className="icofont icofont-thumbs-down"></i>{courseData.dislikes}<span>{" people dislike this"}</span></li>
                      <li className={"li-left-bar-course digits"}><i className="icofont icofont-ui-chat"></i>{`Purchased ${courseData.purchased.length} time(s)`}</li>
                    </ul>
                    <h4>
                      {"All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."}
                    </h4>
                    <div className="single-blog-content-top">
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
            <LearningEducationCourseFilterHelper />
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