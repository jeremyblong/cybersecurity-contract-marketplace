import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb'
import { Search, Edit, Globe, BookOpen, FileText, Youtube, MessageCircle, Mail, RotateCcw, DollarSign, Check, Link, Codepen, HelpCircle, Aperture, Settings, MessageSquare } from 'react-feather';
import one from '../../../../../assets/images/faq/1.jpg';
import { Container, Row, Col, Card, CardBody, CardHeader, Media, Badge, Button } from 'reactstrap';
import { Articles, Knowledgebase, Support, IntellectualProperty, SellingAndBuying, UserAccounts, SearchArticles, Navigation, AskOurCommunity, AskQuestion, Tutorials, HelpCenter, ContactUs, VideoTutorials, DavidLinner, UserChristopher, VictoriaWilson, LatestUpdates, UIDesign, UXDesign, WebDesign, FeaturedTutorials , SeeAll } from "../../../../../constant";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import axios from "axios";
import "./styles.css";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import StarRatings from 'react-star-ratings';
import Slider from "react-slick";
import _ from "lodash";
import { useHistory } from "react-router-dom";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 3000,
    arrows: true,
    // pauseOnFocus: true
};


const MainFAQHackerHelper = () => {

    const history = useHistory();

    const [ courses, setCourseData ] = useState([]);

    useEffect(() => {
        const config = {
            params: {

            }
        } 
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/short/list/courses/for/sale`, config).then((res) => {
            if (res.data.message === "Successfully gathered courses for sale!") {
                console.log(res.data);

                const { courses } = res.data;

                const fillinLength = (16 - courses.length);
                const createLoopable = new Array(fillinLength).fill("");

                const coursesCustomized = courses;

                for (let idx = 0; idx < createLoopable.length; idx++) {
                    const element = createLoopable[idx];
                    
                    console.log("loopable el", element);

                    coursesCustomized.push(element);

                    if ((createLoopable.length - 1 )=== idx) {
                        
                        setCourseData(coursesCustomized);
                    }
                }
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);


    return (
        <Fragment>
            <Breadcrumb parent="Main FAQ & Helpful Guidance" title="Main FAQ's" />
            <Container fluid={true}>
                <div className="faq-wrap">
                    <Row>
                        <Col xl="4 xl-100">
                            <Card className="bg-dark custom-info-card-faq">
                                <CardBody>
                                    <Media className="faq-widgets">
                                        <Media body>
                                            <h5 className='text-white-only-faq'>{Articles}</h5>
                                            <p>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</p>
                                        </Media><FileText />
                                    </Media>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl="4 xl-50" sm="6">
                            <Card className="bg-dark custom-info-card-faq">
                                <CardBody>
                                    <Media className="faq-widgets">
                                        <Media body>
                                            <h5 className='text-white-only-faq'>{Knowledgebase}</h5>
                                            <p>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</p>
                                        </Media><BookOpen />
                                    </Media>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col  xl="4 xl-50" sm="6">
                            <Card className="bg-dark custom-info-card-faq">
                                <CardBody>
                                    <Media className="faq-widgets">
                                        <Media body>
                                            <h5 className='text-white-only-faq'>{Support}</h5>
                                            <p>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</p>
                                        </Media><Aperture />
                                    </Media>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="12">
                            <div className="header-faq">
                                <h5 className="mb-0">{"Quick Questions are answered"}</h5>
                            </div>
                            <Row className="default-according style-1 faq-accordion" id="accordionoc">
                                <Col xl="8 xl-60" lg="6" md="7">
                                    <Accordion>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                    <HelpCircle className='help-circle-faq' />
                                                    {"Integrating WordPress with Your Website?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' /> {"WordPress Site Maintenance ?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"Meta Tags in WordPress ?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />  {"WordPress in Your Language ?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <div className="faq-title">
                                            <h6>{IntellectualProperty}</h6>
                                        </div>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' /> {"WordPress Site Maintenance ?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' /> {"WordPress in Your Language ?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' /> {"Integrating WordPress with Your Website ?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <div className="faq-title">
                                            <h6>{SellingAndBuying}</h6>
                                        </div>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' /> {"WordPress Site Maintenance ?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"Meta Tags in WordPress ?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"Validating a Website ?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"Know Your Sources ?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <div className="faq-title">
                                            <h6>{UserAccounts}</h6>
                                        </div>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"Integrating WordPress with Your Website ?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"WordPress Site Maintenance ?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' /> {"WordPress in Your Language ?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />  {"Validating a Website ?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"Meta Tags in WordPress ?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                    </Accordion>
                                </Col>
                                <Col xl="4 xl-40" lg="6" md="5">
                                    <Row>
                                        <Col lg="12">
                                            <div className="card card-mb-faq xs-mt-search add-shadow-card-faq">
                                                <CardHeader className="faq-header">
                                                    <h5>{SearchArticles}</h5>
                                                    <HelpCircle />
                                                </CardHeader>
                                                <CardBody className="faq-body">
                                                    <div className="faq-form">
                                                        <input className="form-control" type="text" placeholder="Search.." />
                                                        <Search className="search-icon" />
                                                    </div>
                                                </CardBody>
                                            </div>
                                        </Col>
                                        <Col lg="12">
                                            <Card className="card-mb-faq add-shadow-card-faq">
                                                <CardHeader className="faq-header">
                                                    <h5>{Navigation}</h5><Settings />
                                                </CardHeader>
                                                <CardBody className="faq-body">
                                                    <div className="navigation-btn"><a className="btn btn-primary" style={{color:"#fff"}}  href="#javascript">
                                                        <MessageSquare className="m-r-10" />{AskQuestion}</a></div>
                                                    <div className="navigation-option">
                                                        <ul>
                                                            <li><a href="#javascript"><Edit />{Tutorials}</a></li>
                                                            <li><a href="#javascript"><Globe />{HelpCenter}</a></li>
                                                            <li><a href="#javascript"><BookOpen />{Knowledgebase}</a></li>
                                                            <li><a href="#javascript"><FileText />{Articles}</a><span className="badge badge-primary badge-pill pull-right">{"42"}</span></li>
                                                            <li><a href="#javascript"><Youtube />{VideoTutorials}</a><span className="badge badge-primary badge-pill pull-right">{"648"}</span></li>
                                                            <li><a href="#javascript"><MessageCircle />{AskOurCommunity}</a></li>
                                                            <li><a href="#javascript"><Mail />{ContactUs}</a></li>
                                                        </ul>
                                                        <hr />
                                                        <ul>
                                                            <li><a href="#javascript"><MessageCircle />{AskOurCommunity}</a></li>
                                                            <li><a href="#javascript"><Mail />{ContactUs}</a></li>
                                                        </ul>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col lg="12">
                                            <Card className='add-shadow-card-faq'>
                                                <CardHeader className="faq-header">
                                                    <h5 className="d-inline-block">{LatestUpdates}</h5><span className="pull-right d-inline-block">{SeeAll}</span>
                                                </CardHeader>
                                                <CardBody className="faq-body">
                                                    <Media className="updates-faq-main">
                                                        <div className="updates-faq"><RotateCcw className="font-primary" /></div>
                                                        <Media body className="updates-bottom-time">
                                                            <p><a href="#javascript">{DavidLinner} </a>{"requested money back for a double debit card charge"}</p>
                                                            <p>{"10 minutes ago"}</p>
                                                        </Media>
                                                    </Media>
                                                    <Media className="updates-faq-main">
                                                        <div className="updates-faq"><DollarSign className="font-primary" /></div>
                                                        <Media body className="updates-bottom-time">
                                                            <p>{"All sellers have received monthly payouts"}</p>
                                                            <p>{"2 hours ago"}</p>
                                                        </Media>
                                                    </Media>
                                                    <Media className="updates-faq-main">
                                                        <div className="updates-faq"><Link className="font-primary" /></div>
                                                        <Media body className="updates-bottom-time">
                                                            <p>{UserChristopher} <a href="#javascript">{"Wallace"}</a> {"is on hold and awaiting for staff reply"}</p>
                                                            <p>{"45 minutes ago"}</p>
                                                        </Media>
                                                    </Media>
                                                    <Media className="updates-faq-main">
                                                        <div className="updates-faq"><Check className="font-primary" /></div>
                                                        <Media body className="updates-bottom-time">
                                                            <p>{"Ticket #43683 has been closed by"} <a href="#javascript">{VictoriaWilson}</a></p>
                                                            <p>{"Dec 7, 11:48"}</p>
                                                        </Media>
                                                    </Media>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                       
                       </Col>
                        <Col lg="12">
                            <div className="header-faq">
                                <h5 className="mb-0">{FeaturedTutorials}</h5>
                            </div>
                            <Row>
                                <Slider {...settings}>
                                    {typeof courses !== "undefined" && courses.length > 0 ? courses.map((course, index) => {
                                        if (_.has(course, "mainData")) {
                                            const rating = Math.floor(Math.random() * (5 - 0.5 + 1) + 0.5);
                                            const tags = course.mainData.pageOneData.mainData.courseHashtags;
                                            const mainImage = `${process.env.REACT_APP_ASSET_LINK}/${course.mainData.pageThreeData.homepageImage.link}`;
                                            return (
                                                <Fragment>
                                                    <Col className='mapped-col-faq' xl="3" sm="12" lg="3" md="3">
                                                        <Card className="features-faq product-box add-shadow-card-faq-faq-mapped">
                                                            <div className="faq-image product-img">
                                                                <img className="img-fluid set-min-height-faq-image" src={mainImage} alt="" />
                                                                <div className="product-hover">
                                                                    <Button className={"btn-square-info"} color={"info"} style={{ width: "82.5%" }} onClick={() => {
                                                                        history.push(`/view/individual/course/information/${course.id}`);
                                                                    }}>View Course Listing</Button>
                                                                </div>
                                                            </div>
                                                            <CardBody>
                                                                <h6>{course.mainData.pageOneData.mainData.courseTitle}</h6>
                                                                <hr />
                                                                <ReactMarkdown className='markdown-faq-special' children={course.mainData.pageOneData.mainData.description} remarkPlugins={[remarkGfm]} />
                                                            </CardBody>
                                                            <div className='card-footer'>
                                                                {typeof tags !== "undefined" && tags.length > 0 ? tags.map((tag, idx) => {
                                                                    return <Badge key={idx} color="dark tag-pills-sm-mb">{tag.text}</Badge>;
                                                                }) : null}
                                                            </div>
                                                            <div className="card-footer">
                                                                <span>{course.mainData.pageOneData.mainData.pricing.label}</span>
                                                                <span className="pull-right">
                                                                    <StarRatings
                                                                        rating={rating}
                                                                        starRatedColor={"#a927f9"}
                                                                        numberOfStars={5}
                                                                        name='rating'
                                                                    />
                                                                </span>
                                                            </div>
                                                        </Card>
                                                    </Col>
                                                </Fragment>
                                            );
                                        } else {
                                            return (
                                                <Col className='placeholder-content-col-faq' xl="3" sm="12" lg="3" md="3">
                                                    <Card className="features-faq product-box features-box-faq-mapped">
                                                        <div className="faq-image product-img">
                                                            <img className="img-fluid" src={one} alt="" />
                                                            <div className="product-hover">
                                                                <ul>
                                                                    <li><i className="icon-link"></i></li>
                                                                    <li><i className="icon-import"></i></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <CardBody>
                                                            <h6>{WebDesign}</h6>
                                                            <p>{"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}</p>
                                                        </CardBody>
                                                        <div className="card-footer"><span>{"Dec 15, 2019"}</span><span className="pull-right"><i className="fa fa-star font-primary"></i><i className="fa fa-star font-primary"></i><i className="fa fa-star font-primary"></i><i className="fa fa-star font-primary"></i><i className="fa fa-star font-primary"></i></span></div>
                                                    </Card>
                                                </Col>
                                            );
                                        }
                                    }) : null}
                                </Slider>
                            </Row>
                        </Col>
                        <Col lg="12">
                            <div className="header-faq">
                                <h5 className="mb-0">{"Latest articles and videos"}</h5>
                            </div>
                            <Row>
                                <Col xl="4" md="6">
                                    <Row>
                                        <Col sm="12">
                                            <Card className={"add-shadow-normal-faq-card"}>
                                                <CardBody>
                                                    <Media>
                                                        <Codepen className="m-r-30" />
                                                        <Media body>
                                                            <h6 className="f-w-600">{"Using Video"}</h6>
                                                            <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                        </Media>
                                                    </Media>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col sm="12">
                                            <Card className={"add-shadow-normal-faq-card"}>
                                                <CardBody>
                                                    <Media>
                                                        <Codepen className="m-r-30" />
                                                        <Media body>
                                                            <h6 className="f-w-600">{"Vel illum qu"}</h6>
                                                            <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                        </Media>
                                                    </Media>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col sm="12">
                                            <Card className={"add-shadow-normal-faq-card"}>
                                                <CardBody>
                                                    <Media><Codepen className="m-r-30" />
                                                        <Media body>
                                                            <h6 className="f-w-600">{" Cum sociis natoqu"}</h6>
                                                            <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."} </p>
                                                        </Media>
                                                    </Media>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xl="4" md="6">
                                    <Row>
                                        <Col sm="12">
                                            <Card className={"add-shadow-normal-faq-card"}>
                                                <CardBody>
                                                    <Media>
                                                        <FileText className="m-r-30" />
                                                        <Media body>
                                                            <h6 className="f-w-600">{" Donec pede justo"}</h6>
                                                            <p>{" Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."} </p>
                                                        </Media>
                                                    </Media>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col sm="12">
                                            <Card className={"add-shadow-normal-faq-card"}>
                                                <CardBody>
                                                    <Media>
                                                        <FileText className="m-r-30" />
                                                        <Media body>
                                                            <h6 className="f-w-600">{"Nam quam nunc"}</h6>
                                                            <p>{" Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                        </Media>
                                                    </Media>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col sm="12">
                                            <Card className={"add-shadow-normal-faq-card"}>
                                                <CardBody>
                                                    <Media>
                                                        <FileText className="m-r-30" />
                                                        <Media body>
                                                            <h6 className="f-w-600">{"Using Video"} </h6>
                                                            <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                        </Media>
                                                    </Media>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xl="4">
                                    <Row>
                                        <Col xl="12" md="6">
                                            <Card className={"add-shadow-normal-faq-card"}>
                                                <CardBody>
                                                    <Media>
                                                        <Youtube className="m-r-30" />
                                                        <Media body>
                                                            <h6 className="f-w-600">{" Vel illum qu"}</h6>
                                                            <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                        </Media>
                                                    </Media>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col xl="12" md="6">
                                            <Card className={"add-shadow-normal-faq-card"}>
                                                <CardBody>
                                                    <Media>
                                                        <Youtube className="m-r-30" />
                                                        <Media body>
                                                            <h6 className="f-w-600">{" Cum sociis natoqu"}</h6>
                                                            <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                        </Media>
                                                    </Media>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col xl="12">
                                            <Card className={"add-shadow-normal-faq-card"}>
                                                <CardBody>
                                                    <Media><Youtube className="m-r-30" />
                                                        <Media body>
                                                            <h6 className="f-w-600">{"Donec pede justo"}</h6>
                                                            <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                        </Media>
                                                    </Media>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Container>
        </Fragment>
    );
};

export default MainFAQHackerHelper;