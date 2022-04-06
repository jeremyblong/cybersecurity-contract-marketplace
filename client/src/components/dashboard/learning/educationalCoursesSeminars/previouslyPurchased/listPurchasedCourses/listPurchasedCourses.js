import React, { Fragment, useState, useEffect } from 'react';
import "./styles.css";
import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Popover, PopoverHeader, PopoverBody, Media } from "reactstrap";
import Breadcrumb from '../../../../../../layout/breadcrumb';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import helpers from "./helpers/helpers.js";
import { connect } from "react-redux";
import PaginationGeneralHelper from "../../../../universal/pagination/miscMainPagination.js";
import { useHistory } from "react-router-dom";


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

const itemsPerPage = 6;


const ListViewPurchasedCoursesHelper = ({ userData }) => {

    const history = useHistory();

    const [ currentPage, setCurrentPage ] = useState(0);
    const [ pageCount, setPageCount ] = useState(0);
    const [ itemOffset, setItemOffset ] = useState(0);
    const [ permenantData, setPermenantDataState ] = useState([]);

    const [ purchased, setPurchasedCourses ] = useState([]);
    const [ ready, setReady ] = useState(false);
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

        const endOffset = itemOffset + itemsPerPage;

        setPageCount(Math.ceil(permenantData.length / itemsPerPage));

        setPurchasedCourses(permenantData.slice(itemOffset, endOffset));
        
    }, [itemOffset, itemsPerPage]);

    useEffect(() => {
        const configuration = {
            params: {
                uniqueId: userData.uniqueId,
                accountType: userData.accountType
            }
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/purchased/course/data/only`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered courses!") {
                console.log(res.data);

                const { courses } = res.data;

                setPageCount(Math.ceil(courses.length / itemsPerPage));

                const endOffset = itemOffset + itemsPerPage;

                setPermenantDataState(courses);
                setPurchasedCourses(courses.slice(itemOffset, endOffset));
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

    const renderLoadingOrDefault = () => {
        if (ready === true && purchased.length === 0) {
            return (
                <Fragment>
                    <img src={require("../../../../../../assets/images/no-purchased-courses.png")} className={"stretch-image-all-the-way"} />
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                        <p>
                            <Skeleton count={40} />
                        </p>
                    </SkeletonTheme>
                </Fragment>
            );
        }
    }
    const handleRedirect = (data) => {
        console.log("handleRedirect clicked/ran", data);

        history.push(`/view/individual/purchased/course/data/${data.id}`);
    }
    return (
        <Fragment>
            <Breadcrumb parent="Previously Purchased 'Course Content'" title={`View Your Previously Purchased 'Course Content' Below...`}/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className='shadow'>
                            <CardHeader className='b-l-info b-r-info'>
                                <h3>View your <em style={{ fontWeight: "bold", textDecorationLine: "underline" }}>previously purchased</em> courses - <strong>ALL</strong> of your courses will be displayed below, click each one to explore the details further..</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        {typeof purchased !== "undefined" && purchased.length > 0 ? purchased.map((data, i) => {
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
                                                                            }}><img src={require("../../../../../../assets/icons/close-64.png")} className="small-close-popover-icon" /></div></PopoverHeader>
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
                                                                            <PopoverHeader>React with a "Like" to this course? <div className="popover-cancel-container" onClick={() => closeLikePopover(data, i, setLikePopoverState)}><img src={require("../../../../../../assets/icons/close-64.png")} className="small-close-popover-icon" /></div></PopoverHeader>
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
                                                                            <PopoverHeader>React with a "Dislike" to this course? <div className="popover-cancel-container" onClick={() => closeDislikePopover(data, i, setDislikePopoverState)}><img src={require("../../../../../../assets/icons/close-64.png")} className="small-close-popover-icon" /></div></PopoverHeader>
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
                                                                <li className="digits text-primary-custom">{`${data.totalViews} Total View(s)`}</li>
                                                            </ul>
                                                            <hr />
                                                            <ReactMarkdown children={data.mainData.pageOneData.mainData.description} remarkPlugins={[remarkGfm]} className="blog-bottom-details blog-bottom-details-maxed" />
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Col>
                                            );
                                        }) : <Fragment>
                                            {renderLoadingOrDefault()}
                                        </Fragment>}
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter className='b-l-info b-r-info'>
                                <PaginationGeneralHelper itemsPerPage={itemsPerPage} loopingData={permenantData} currentPage={currentPage} pageCount={pageCount} setItemOffset={setItemOffset} setCurrentPage={setCurrentPage} />
                            </CardFooter>
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
export default connect(mapStateToProps, {  })(ListViewPurchasedCoursesHelper);