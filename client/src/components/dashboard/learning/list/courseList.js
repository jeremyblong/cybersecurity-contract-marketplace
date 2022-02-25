import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../../../layout/breadcrumb';
import LearningFilterHelper from './helpers/filter/index.js';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Card, Media, Progress, Button, Popover, PopoverHeader, PopoverBody, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { JavaLanguage } from "../../../../constant";
import "./styles.css";
import Slider from "react-slick";
import axios from "axios";
import { connect } from "react-redux";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import helpers from "./helpers/helperFunctions.js";

const { 
    closeDislikePopover,
    openDislikePopover,
    closeLikePopover,
    openLikePopover,
    closeBookmarkPopover,
    openBookmarkPopover,
    bookmarkCourse, 
    dislikeThisCourse, 
    likeThisCourse 
} = helpers;

const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

const CourseListHelper = ({ userData }) => {

    const history = useHistory();

    const [ progress, setProgress ] = useState(10);
    const [learningData, setLearningData] = useState([{
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        exists: false
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        exists: false
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        exists: false
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        exists: false
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        exists: false
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        exists: false
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        exists: false
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        exists: false
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        exists: false
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        exists: false
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        exists: false
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        exists: false
    }]);
    const [ promoted, setPromotedState ] = useState(["", "", "", "", "", "", "", "", "", ""]);
    const [ popoverOpen, setPopoverOpen ] = useState(false);
    const [ popoverBookmark, setBookmarkPopoverState ] = useState({
        popover0: false,
        popover1: false,
        popover2: false,
        popover3: false,
        popover4: false,
        popover5: false,
        popover6: false,
        popover7: false,
        popover8: false,
        popover9: false,
        popover10: false,
        popover11: false // aka 12th item MAXED paginated item's
    });
    const [ likePopover, setLikePopoverState ] = useState({
        popover0: false,
        popover1: false,
        popover2: false,
        popover3: false,
        popover4: false,
        popover5: false,
        popover6: false,
        popover7: false,
        popover8: false,
        popover9: false,
        popover10: false,
        popover11: false // aka 12th item MAXED paginated item's
    });
    const [ dislikePopover, setDislikePopoverState ] = useState({
        popover0: false,
        popover1: false,
        popover2: false,
        popover3: false,
        popover4: false,
        popover5: false,
        popover6: false,
        popover7: false,
        popover8: false,
        popover9: false,
        popover10: false,
        popover11: false // aka 12th item MAXED paginated item's
    });

    useEffect(() => {
        console.log("CourseList.js - mounted...!");

        const configuration = {
            params: {
                uniqueId: userData.uniqueId
            }
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/courses/all/learning`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered courses!") {
                console.log(res.data);

                const { courses } = res.data;
                // new item array
                const newCoursesArray = [];
                // initialize count per added item
                let addedCount = 0;
                // check if courses were returned and exist
                if (typeof courses !== "undefined" && courses.length > 0) {
                    // loop over api-returned courses and modify existing state
                    for (let index = 0; index < courses.length; index++) {
                        const course = courses[index];
                        // indicate it's a live/active course
                        const newCourse = {
                            ...course,
                            exists: true
                        }
                        // push into array & count.
                        newCoursesArray.push(newCourse);
                        // add to count
                        addedCount++;
                        // check if last iteration
                        if ((courses.length - 1) === index) {
                            // split current array to include new elements plus dummy data
                            const combined = [...newCoursesArray, ...learningData.splice(newCoursesArray.length, 12)];
                            // set state aka update mapped items
                            setLearningData(combined);
                        }
                    }
                } 
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const handleRedirect = (data) => {
        const paramsID = data.id;
    
        history.replace(`/view/individual/course/information/${paramsID}`);
    }

    
    const handleSwipe = (direction) => {
        console.log("handle swipe direction - :", direction);
    }
    const afterChangeHelper = (index) => {
        setProgress((index + 1) * 10);
    }
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
    return (
        <Fragment>
            <Breadcrumb parent="Content Courses" title="Learn new skills!" />
            <Container fluid={true}>
                <Row>
                    <Col xl="9 xl-60">
                        <Row>
                            <Col md="12" lg="12" sm="12" xl="12">
                                <div className={"centered-horizontally-custom"}><h5 id={calculateClassProgress(progress)}>{progress}% Though Slider (Swipe to pan through slide's)</h5></div>
                                <Progress className={"progressbar-course-scrollable sm-progress-bar"} animated color={calculateClassProgressColor(progress)} value={progress} />
                                <Slider afterChange={afterChangeHelper} onSwipe={(direction) => handleSwipe(direction)} {...settings}>
                                    {promoted.map((item, index) => {
                                        return (
                                            <div key={index} className={"centered-horizontally-custom"}>
                                                <Card className={"course-list-custom-item"}>
                                                    <Row className="blog-box blog-list">
                                                        <Col sm="5">
                                                            <Media className="img-fluid sm-100-w" src={require("../../../../assets/images/faq/1.jpg")} alt="" />
                                                        </Col>
                                                        <Col sm="7">
                                                            <div className="blog-details">
                                                                <div className="blog-date digits"><span>{"05"}</span> {"January 2019"}</div>
                                                                <h6>{JavaLanguage} </h6>
                                                                <div className="blog-bottom-content">
                                                                    <ul className="blog-social">
                                                                        <li>{"by: Paige Turner"}</li>
                                                                        <li className="digits">{"15 Hits"}</li>
                                                                    </ul>
                                                                    <hr />
                                                                    <p className="mt-0">{"inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit."}</p>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </div>
                                        );
                                    })}
                                </Slider>
                            </Col>
                            {learningData.map((data, i) => {
                                if (data.exists === true) {
                                    const bannerImageFull = `${process.env.REACT_APP_ASSET_LINK}/${data.mainData.pageThreeData.homepageImage.link}`;
                                    return (
                                        <Col xl="4 xl-50 box-col-6" sm="6" key={i}>
                                            <Card>
                                                <div className="blog-box blog-grid text-center product-box">
                                                    <div className="product-img">
                                                        <Media className="img-fluid top-radius-blog container-top-image-min" src={bannerImageFull} alt="" />
                                                        <div className="product-hover">
                                                            <ul>
                                                                <Button onClick={() => {
                                                                    handleRedirect(data);
                                                                }} className={"btn-square-info"} color={"info"} style={{ width: "100%", marginBottom: "12.5px" }}>Visit/View Course</Button>
                                                                <li>
                                                                    <i onClick={() => openBookmarkPopover(data, i, setBookmarkPopoverState)} id={`popoverBookmark${i}`} className="icon-bookmark fa-2x"></i>
                                                                </li>
                                                                <Popover rootClose target={`popoverBookmark${i}`} placement="bottom" isOpen={popoverBookmark[`popover${i}`]} toggle={() => closeBookmarkPopover(data, i, setBookmarkPopoverState)}>
                                                                    <div onMouseLeave={() => closeBookmarkPopover(data, i, setBookmarkPopoverState)} className={"exit-upon-leaving-div-wrapper"}>
                                                                        <PopoverHeader>Bookmark this listing? <div className="popover-cancel-container" onClick={() => {
                                                                            closeBookmarkPopover(data, i, setBookmarkPopoverState)
                                                                        }}><img src={require("../../../../assets/icons/close-64.png")} className="small-close-popover-icon" /></div></PopoverHeader>
                                                                        <PopoverBody>Are you sure you'd like to 'bookmark' this listing? This will save this listing to your 'bookmarked items' so if you decide to <strong>re-visit</strong> this particular section of our platform - you'll be able to easily find this course again...
                                                                        <hr />
                                                                        <Button onClick={() => bookmarkCourse(data, i)} className={"btn-square-secondary"} outline color={"secondary-2x"} style={{ width: "100%", marginBottom: "12.5px" }}>Bookmark This Course!</Button>
                                                                        </PopoverBody>
                                                                    </div>
                                                                </Popover>
                                                                <li>
                                                                    <i onClick={() => openLikePopover(data, i, setLikePopoverState)} id={`popoverLike${i}`} className="fa fa-gratipay fa-2x"></i>
                                                                </li>
                                                                <Popover rootClose target={`popoverLike${i}`} placement="bottom" isOpen={likePopover[`popover${i}`]} toggle={() => closeLikePopover(data, i, setLikePopoverState)}>
                                                                    <div onMouseLeave={() => closeLikePopover(data, i, setLikePopoverState)} className={"exit-upon-leaving-div-wrapper"}>
                                                                        <PopoverHeader>React with a "Like" to this course? <div className="popover-cancel-container" onClick={() => closeLikePopover(data, i, setLikePopoverState)}><img src={require("../../../../assets/icons/close-64.png")} className="small-close-popover-icon" /></div></PopoverHeader>
                                                                        <PopoverBody>Are you sure you'd like to 'Like' this listing? This will "like" this course to show other user's that people are interested in this listing and/or people should check it out. Liking content will help your peer's decipher information on our platform...
                                                                        <hr />
                                                                        <Button onClick={() => likeThisCourse(data, i)} className={"btn-square-secondary"} outline color={"secondary-2x"} style={{ width: "100%", marginBottom: "12.5px" }}>"Like" This Course!</Button>
                                                                        </PopoverBody>
                                                                    </div>
                                                                </Popover>
                                                                <li>
                                                                    <i onClick={() => openDislikePopover(data, i, setDislikePopoverState)} id={`popoverThree${i}`} className="fa fa-thumbs-down fa-2x"></i>
                                                                </li>
                                                                <Popover rootClose target={`popoverThree${i}`} placement="bottom" isOpen={dislikePopover[`popover${i}`]} toggle={() => closeDislikePopover(data, i, setDislikePopoverState)}>
                                                                    <div onMouseLeave={() => closeDislikePopover(data, i, setDislikePopoverState)} className={"exit-upon-leaving-div-wrapper"}>
                                                                        <PopoverHeader>React with a "Dislike" to this course? <div className="popover-cancel-container" onClick={() => closeDislikePopover(data, i, setDislikePopoverState)}><img src={require("../../../../assets/icons/close-64.png")} className="small-close-popover-icon" /></div></PopoverHeader>
                                                                        <PopoverBody>Are you sure you'd like to 'Dislike' this listing? This will "Dislike" this course to show other user's that people are NOT interested in this listing. Disliking content will help your peer's decipher information on our platform regarding good VS bad content...
                                                                        <hr />
                                                                        <Button onClick={() => dislikeThisCourse(data, i)} className={"btn-square-secondary"} outline color={"secondary-2x"} style={{ width: "100%", marginBottom: "12.5px" }}>"Dislike" This Course!</Button>
                                                                        </PopoverBody>
                                                                    </div>
                                                                </Popover>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="blog-details-main">
                                                        <ul className="blog-social">
                                                            <li className="digits text-secondary-custom">{data.mainData.pageOneData.mainData.courseCategory.label}</li>
                                                            <li className="digits text-secondary-custom">{`${data.mainData.pageOneData.mainData.pricing.label}`}</li>
                                                        </ul>
                                                        <ul className="blog-social">
                                                            <li className="digits text-primary-custom">{`${data.totalViews} Total View(s) w/${data.purchased.length} Purchase's`}</li>
                                                        </ul>
                                                        <hr />
                                                        <ReactMarkdown children={data.mainData.pageOneData.mainData.description} remarkPlugins={[remarkGfm]} className="blog-bottom-details blog-bottom-details-maxed" />
                                                    </div>
                                                </div>
                                            </Card>
                                        </Col>
                                    );
                                } else {
                                    return (
                                        <Col xl="4 xl-50 box-col-6" sm="6" key={i}>
                                            <Card>
                                                <div className="blog-box blog-grid text-center product-box">
                                                    <div className="product-img">
                                                        <Media className="img-fluid top-radius-blog container-top-image-min" src={require("../../../../assets/images/faq/1.jpg")} alt="" />
                                                        <div className="product-hover">
                                                            <ul>
                                                                <Button onClick={() => {
                                                                    handleRedirect(data);
                                                                }} className={"btn-square-info"} color={"info"} style={{ width: "100%", marginBottom: "12.5px" }}>Visit/View Course</Button>
                                                                <li>
                                                                    <i onClick={() => openBookmarkPopover(data, i, setBookmarkPopoverState)} id={`popoverBookmark${i}`} className="icon-bookmark fa-2x"></i>
                                                                </li>
                                                                <Popover rootClose target={`popoverBookmark${i}`} placement="bottom" isOpen={popoverBookmark[`popover${i}`]} toggle={() => closeBookmarkPopover(data, i, setBookmarkPopoverState)}>
                                                                    <div onMouseLeave={() => closeBookmarkPopover(data, i, setBookmarkPopoverState)} className={"exit-upon-leaving-div-wrapper"}>
                                                                        <PopoverHeader>Bookmark this listing? <div className="popover-cancel-container" onClick={() => {
                                                                            closeBookmarkPopover(data, i, setBookmarkPopoverState)
                                                                        }}><img src={require("../../../../assets/icons/close-64.png")} className="small-close-popover-icon" /></div></PopoverHeader>
                                                                        <PopoverBody>Are you sure you'd like to 'bookmark' this listing? This will save this listing to your 'bookmarked items' so if you decide to <strong>re-visit</strong> this particular section of our platform - you'll be able to easily find this course again...
                                                                        <hr />
                                                                        <Button onClick={() => bookmarkCourse(data, i)} className={"btn-square-secondary"} outline color={"secondary-2x"} style={{ width: "100%", marginBottom: "12.5px" }}>Bookmark This Course!</Button>
                                                                        </PopoverBody>
                                                                    </div>
                                                                </Popover>
                                                                <li>
                                                                    <i onClick={() => openLikePopover(data, i, setLikePopoverState)} id={`popoverLike${i}`} className="fa fa-gratipay fa-2x"></i>
                                                                </li>
                                                                <Popover rootClose target={`popoverLike${i}`} placement="bottom" isOpen={likePopover[`popover${i}`]} toggle={() => closeLikePopover(data, i, setLikePopoverState)}>
                                                                    <div onMouseLeave={() => closeLikePopover(data, i, setLikePopoverState)} className={"exit-upon-leaving-div-wrapper"}>
                                                                        <PopoverHeader>React with a "Like" to this course? <div className="popover-cancel-container" onClick={() => closeLikePopover(data, i, setLikePopoverState)}><img src={require("../../../../assets/icons/close-64.png")} className="small-close-popover-icon" /></div></PopoverHeader>
                                                                        <PopoverBody>Are you sure you'd like to 'Like' this listing? This will "like" this course to show other user's that people are interested in this listing and/or people should check it out. Liking content will help your peer's decipher information on our platform...
                                                                        <hr />
                                                                        <Button onClick={() => likeThisCourse(data, i)} className={"btn-square-secondary"} outline color={"secondary-2x"} style={{ width: "100%", marginBottom: "12.5px" }}>"Like" This Course!</Button>
                                                                        </PopoverBody>
                                                                    </div>
                                                                </Popover>
                                                                <li>
                                                                    <i onClick={() => openDislikePopover(data, i, setDislikePopoverState)} id={`popoverThree${i}`} className="fa fa-thumbs-down fa-2x"></i>
                                                                </li>
                                                                <Popover rootClose target={`popoverThree${i}`} placement="bottom" isOpen={dislikePopover[`popover${i}`]} toggle={() => closeDislikePopover(data, i, setDislikePopoverState)}>
                                                                    <div onMouseLeave={() => closeDislikePopover(data, i, setDislikePopoverState)} className={"exit-upon-leaving-div-wrapper"}>
                                                                        <PopoverHeader>React with a "Dislike" to this course? <div className="popover-cancel-container" onClick={() => closeDislikePopover(data, i, setDislikePopoverState)}><img src={require("../../../../assets/icons/close-64.png")} className="small-close-popover-icon" /></div></PopoverHeader>
                                                                        <PopoverBody>Are you sure you'd like to 'Dislike' this listing? This will "Dislike" this course to show other user's that people are NOT interested in this listing. Disliking content will help your peer's decipher information on our platform regarding good VS bad content...
                                                                        <hr />
                                                                        <Button onClick={() => dislikeThisCourse(data, i)} className={"btn-square-secondary"} outline color={"secondary-2x"} style={{ width: "100%", marginBottom: "12.5px" }}>"Dislike" This Course!</Button>
                                                                        </PopoverBody>
                                                                    </div>
                                                                </Popover>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="blog-details-main">
                                                        <ul className="blog-social">
                                                            <li className="digits text-secondary-custom">{data.date}</li>
                                                            <li className="digits text-secondary-custom">{"by"}: {data.writer}</li>
                                                        </ul>
                                                        <ul className="blog-social">
                                                            <li className="digits text-primary-custom">{data.hits} {"Total Hits"}</li>
                                                        </ul>
                                                        <hr />
                                                        <h6 className="blog-bottom-details blog-bottom-details-maxed">{data.short_description}</h6>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Col>
                                    );
                                }
                            })}
                        </Row>
                        <Row style={{ paddingTop: "17.5px" }}>
                            <div className="centered-both-ways">
                                <Pagination className="m-b-30" aria-label="Page navigation example">
                                    <ul className="pagination pagination-lg pagination-secondary">
                                        <PaginationItem><PaginationLink href={null}>{"Previous"}</PaginationLink></PaginationItem>
                                        <PaginationItem active><PaginationLink href={null}>{"1"}</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink href={null}>{"2"}</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink href={null}>{"3"}</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink href={null}>{"Next"}</PaginationLink></PaginationItem>
                                    </ul>
                                </Pagination>
                            </div>
                        </Row>
                    </Col>
                    <LearningFilterHelper />
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
export default connect(mapStateToProps, {  })(CourseListHelper);