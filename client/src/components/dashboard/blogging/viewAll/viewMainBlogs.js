import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../../../layout/breadcrumb';
import blog from "../../../../assets/images/blog/blog.jpg";
import blog2 from "../../../../assets/images/blog/blog-2.jpg";
import blog3 from "../../../../assets/images/blog/blog-3.jpg";
import blog5 from "../../../../assets/images/blog/blog-5.jpg";
import moment from "moment";
import { Container, Row, Col, Card, Media, Progress } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import Slider from "react-slick";
import "./styles.css";


const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};


const BlogsMainHomepageViewHelper = ({ userData }) => {

    const [ blogs, setBlogs ] = useState([]);
    const [ promoted, setPromoted ] = useState(["", "", "", "", "", "", "", "", "", ""]);
    const [ progress, setProgress ] = useState(10);

    useEffect(() => {
        const config = {
            params: {

            }
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/blogs/randomized/short/restricted`, config).then((res) => {
            if (res.data.message === "Successfully gathered blogs!") {
                console.log(res.data);

                const { blogs } = res.data;

                setBlogs(blogs);
            } else {
                console.log("Err", res.data);

                NotificationManager.error("An unknown error occurred while attempting to gather randomized blogs (restricted), please try again or contact support if this problem persists...", "Error upload/updating post & profile!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("An unknown error occurred while attempting to gather randomized blogs (restricted), please try again or contact support if this problem persists...", "Error upload/updating post & profile!", 4750);
        })
    }, []);

    const calculateClassProgress = (progress) => {
        if (progress <= 25) {
            return "progress-text-green";
        } else if ((progress > 25) && (progress <= 40)) {
            return "progress-text-blue";
        } else if ((progress > 41) && (progress <= 65)) {
            return "progress-text-info";
        } else if ((progress > 66) && (progress <= 82.5)) {
            return "progress-text-warning";
        } else {
            return "progress-text-danger";
        }
    }
    const calculateClassProgressColor = (progress) => {
        if (progress <= 25) {
            return "success";
        } else if ((progress > 25) && (progress <= 40)) {
            return "primary";
        } else if ((progress > 41) && (progress <= 65)) {
            return "info";
        } else if ((progress > 66) && (progress <= 82.5)) {
            return "warning";
        } else {
            return "danger";
        }
    }
    const handleSwipe = (direction) => {
        console.log("handle swipe direction - :", direction);
    }
    
    console.log("blogs", blogs);

    const afterChangeHelper = (index) => {
        setProgress((index + 1) * 10);
    }
    return (
        <Fragment>
            <Breadcrumb parent="User blogging homepage" title="Blogging details & homepage (blogs from our platform user's)" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12" lg="6 box-col-12 xl-100" md="6 box-col-12 xl-100" xl="6 box-col-12 xl-100">
                        <div className={"centered-horizontally-custom"}><h5 id={calculateClassProgress(progress)}>{progress}% Though Slider (Swipe to pan through slide's)</h5></div>
                        <Progress className={"progressbar-course-scrollable sm-progress-bar"} animated color={calculateClassProgressColor(progress)} value={progress} />
                        <Slider afterChange={afterChangeHelper} onSwipe={(direction) => handleSwipe(direction)} {...settings}>
                            {promoted.map((item, index) => {
                                return (
                                    <div key={index} className={"centered-horizontally-custom"}>
                                        <Card>
                                            <div className="blog-box blog-shadow">
                                                <Media className="img-fluid" src={blog} alt="" />
                                                <div className="blog-details">
                                                    <p className="digits">{"25 July 2019"}</p>
                                                    <h4>{"Accusamus et iusto odio dignissimos ducimus qui blanditiis."}</h4>
                                                    <ul className="blog-social">
                                                        <li><i className="icofont icofont-user"></i>{`${userData.firstName} ${userData.lastName}`}</li>
                                                        <li className="digits"><i className="icofont icofont-thumbs-up"></i>{"02 Hits"}</li>
                                                        <li className="digits"><i className="icofont icofont-ui-chat"></i>{"598 Comments"}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                );
                            })}
                        </Slider>
                    </Col>
                    <Col sm="12" lg="6 box-col-12 xl-100" md="6 box-col-12 xl-100" xl="6 box-col-12 xl-100">
                        <Card style={{ marginTop: "50px" }}>
                            <div className="blog-box blog-list row">
                                <Col sm="5">
                                    <Media className="img-fluid sm-100-w" src={blog2} alt="" />
                                </Col>
                                <Col sm="7">
                                    <div className="blog-details">
                                        <div className="blog-date digits"><span>{"02"}</span> {"January 2019"}</div>
                                        <h6>{"Perspiciatis unde omnis iste natus error sit voluptatem"} </h6>
                                        <div className="blog-bottom-content">
                                            <ul className="blog-social">
                                                <li>{"by: Admin"}</li>
                                                <li className="digits">{"0 Hits"}</li>
                                            </ul>
                                            <hr />
                                            <p className="mt-0">{"inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit."}</p>
                                        </div>
                                    </div>
                                </Col>
                            </div>
                        </Card>
                        <Card>
                            <div className="blog-box blog-list row">
                                <Col sm="5">
                                    <Media className="img-fluid sm-100-w" src={blog3} alt="" />
                                </Col>
                                <Col sm="7">
                                    <div className="blog-details">
                                        <div className="blog-date digits"><span>{"03"}</span> {"January 2019"}</div>
                                        <h6>{"Perspiciatis unde omnis iste natus error sit voluptatem"} </h6>
                                        <div className="blog-bottom-content">
                                            <ul className="blog-social">
                                                <li >{"by: Admin"}</li>
                                                <li className="digits">{"02 Hits"}</li>
                                            </ul>
                                            <hr />
                                            <p className="mt-0">{"inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit."}</p>
                                        </div>
                                    </div>
                                </Col>
                            </div>
                        </Card>
                    </Col>
                    {/* this is the start of main chunk.. */}
                    {typeof blogs !== "undefined" && blogs.length > 0 ? blogs.map((blog, index) => {
                        return (
                            <Fragment key={index}>
                                <Col md="6" xl="3 box-col-6 xl-50">
                                    <Card>
                                        <div className="blog-box blog-grid text-center">
                                            <Media className="img-fluid top-radius-blog top-radius-blog-custom-contain" src={`${process.env.REACT_APP_ASSET_LINK}/${blog.displayImage}`} alt="" />
                                            <div className="blog-details-main">
                                                <ul className="blog-social row">
                                                    <Col sm="12" md="4" lg="4" xl="4" className="digits border-right-digits-blog">{moment(blog.date).format("MM/DD/YYYY")}<br />{moment(blog.date).fromNow()}</Col>
                                                    <Col sm="12" md="4" lg="4" xl="4" className="digits border-right-digits-blog">{`By: ${blog.posterName}`}</Col>
                                                    <Col sm="12" md="4" lg="4" xl="4" className="digits"><strong style={{ color: "green" }}>{blog.likes} likes</strong>/<strong style={{ color: "red" }}>{blog.dislikes} dislikes</strong></Col>
                                                </ul>
                                                <hr />
                                                <h6 className="blog-bottom-details"><em style={{ color: "#f73164", textDecorationLine: "underline" }}>Title</em>: {blog.title.slice(0, 100)}{typeof blog.title !== "undefined" && blog.title.length >= 100 ? "..." : ""}</h6>
                                                <hr />
                                                <h6 className="blog-bottom-details"><em style={{ color: "#f73164", textDecorationLine: "underline" }}>Sub-Title</em>: {blog.subtitle.slice(0, 125)}{typeof blog.subtitle !== "undefined" && blog.subtitle.length >= 125 ? "..." : ""}</h6>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            </Fragment>
                        );
                    }) : null}
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
export default connect(mapStateToProps, {  })(BlogsMainHomepageViewHelper);