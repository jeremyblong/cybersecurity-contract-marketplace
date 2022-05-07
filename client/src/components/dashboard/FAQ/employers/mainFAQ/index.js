import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb'
import { Search, Edit, Globe, BookOpen, FileText, Youtube, MessageCircle, Mail, Codepen, HelpCircle, Aperture, Settings, MessageSquare } from 'react-feather';
import one from '../../../../../assets/images/faq/1.jpg';
import Slider from "react-slick";
import { Container, Row, Col, Card, CardBody, CardHeader, Media, ListGroup, ListGroupItem, Button, Badge } from 'reactstrap';
import { Articles, Knowledgebase, SearchArticles, Navigation, AskOurCommunity, AskQuestion, Tutorials, HelpCenter, ContactUs, VideoTutorials, WebDesign, FeaturedTutorials } from "../../../../../constant";
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
import _ from "lodash";
import { useHistory, Link as Linky } from "react-router-dom";


const settings = {
    dots: true,
    infinite: true,
    draggable: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1450,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1154,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 675,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
};

const MainFAQEmployerHelper = () => {
    
    const history = useHistory();

    const [ courses, setCourseData ] = useState([]);
    const [ blogs, setBlogs ] = useState([]);

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

    useEffect(() => {
        const config = {
            params: {

            }
        } 
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/short/list/courses/for/sale`, config).then((res) => {
            if (res.data.message === "Successfully gathered courses for sale!") {
                console.log(res.data);
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])

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
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const handleRedirectToIndividualBlog = (blog) => {
        console.log("handleRedirectToIndividualBlog clicked..:", blog);

        history.push(`/view/individual/restricted/blog/content/${blog.id}`);
    }

    const redirectToHackersProfile = (hackerID) => {
        console.log("redirectToHackersProfile ran...");

        history.push(`/hacker/profile/individual/view/${hackerID}`);
    }

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
                                            <h5 className='text-white-only-faq'>How do I aquire top-talent?</h5>
                                            <p>{"There are various settings you can select such as higher token count to apply & other related data to make your listing more appealing to seasoned hackers. Generally, you'll be able to tell whether or not a user has talent based on the various data submitted upon each explanation. Make sure to post a thourough listing & be detailed with your request..."}</p>
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
                                            <h5 className='text-white-only-faq'>Can I hire for both digital & physical 'hacks'?</h5>
                                            <p>{"YES, ABSOLUTELY! You can hire for BOTH digital & physical hacking types/requests. We are the FIRST marketplace/platform to facilitate both 'hack' types, 'digital' hacks are ONLY ONLINE ASSETS while PHYSICAL hacks require a ethical-hackers to be in your general proximity & physically try to infiltrate your company headquares/corporate offices to check the success of said security systems."}</p>
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
                                            <h5 className='text-white-only-faq'>What happens if I deposit funding & the 'hacker' doesn't complete the required work?</h5>
                                            <p>{"We utilize an escrow-style payment system or in other words, basically funding is deposited into the main platform balance (pending) which will then be released upon BOTH user's coming to agreement that the contract has been properly fulfilled. Other payment styles outside of bug-bounties which are primarily hacker-focussed, are instant payments & transfer/clear almost immediately."}</p>
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
                                                    {`What can I do as a company on ${process.env.REACT_APP_APPLICATION_NAME}?`}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"The main essential purpose for 'employers/comapanies' on our marketplace is primarily 'posting/requesting' contracted work from hackers. This is similar to your typical digital/physical bug-bounty program BUT we cater to BOTH physical & digital hacks..."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' /> {"What FEE'S are associated with the 'bug-bounty' programs?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"You will be required to pay the bug-bounty hunter but any/all applicable transferable costs directly to the security expert but thats the only fee you can expect to encur. We take the associated fees out of the security experts payment AUTOMATICALLY! Simply pay one fee, we do the rest..."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"How much can I typically expect to pay a successful bug-bounty?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Bug-bounties can range anywhere from a few hundred dollars all the way up-to $20,000+ - KEEP IN MIND, bounty hunters set their price on how much THEY will complete the contract for & once hired, the price is set in stone!"}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />  {"What happens if my bug-bounty hunter is UNABLE to complete the required work?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"If your cyber-expert is unable to complete the contract, NO MONEY IS OWED! We work off a system where workers ONLY get paid for SUCCESSFUL hacks and/or infiltrating various systems PROPERLY & SUCCESSFULLY. You will NOT be required to pay UNLESS 'substantial activity' is proven. Substantial activity is all about reasonable progress and/or improvement on previous activity - support is available to mitigate requests upon request (fee's are associated..)"}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' /> {"How to protect your company's IP (intellectual property)?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"We REQUIRE all hackers to agree to our terms & conditions, privacy policy & NDA agreements BEFORE any action can be taken on our platform - this not only protects you but the hacker as well. IF any theft occurs, IMMEDIATELY report it to our support staff so we can mitigate each situation, case by case as soon as possible. Please remember, we VERIFIY the identity of ALL users and theft will result in immediate charges being pressed & legal action taken."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' /> {"What are 'tokens'?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Tokens are purchased by bounty-hunter or security experts to apply to posted contracts. Tokens minimize the risk of spam & force candidates to 'selectivly' apply to specific jobs/listings..."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' /> {"How many applicants can apply to my posted listing?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"ANY amount of applicants can apply to your listing! It's entirely up to you to decide who you hire, how many candidates you hire & when you hire these people..."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' /> {"Will we be adding new features/functionality for companies going forward?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Absolutely! We will be adding a plethora of features & functionality for our employers going forward but upon launching, our primary focus was and still is cultivating an enviorment tailored mainly to hackers (selling custom code/hacks, selling educational courses, FREE tutorial videos, etc..)"}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"What happens to my contracts/jobs AFTER all candidates are hired or the listing is completed?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"We have a specific section of our application strictly designated to 'archived listings' - archived listings being listings that're forever saved for reference & the ability to retrieve them at a later date if any problems arise (as well as for tax reporting)..."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"What should I do BEFORE hiring a candidate that applied to one of my listings?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>
                                                    <ListGroup>
                                                        <ListGroupItem><strong style={{ color: "blue" }}>1) </strong>{" ABSOLUTELY check out the candidates reviews, profile data & contract history"}</ListGroupItem>
                                                        <ListGroupItem><strong style={{ color: "blue" }}>2) </strong>{" Review the review count & the content of each specific review (at least casually browse over & review as many reviews as possible)"}</ListGroupItem>
                                                        <ListGroupItem><strong style={{ color: "blue" }}>3) </strong>{" Carefully review their application data (the submitted data specific to your listing)"}</ListGroupItem>
                                                        <ListGroupItem><strong style={{ color: "blue" }}>4) </strong>{" Compare each application carefully & make an educated decision with all cumulative data - it is vital to collectively review ALL provided information!"}</ListGroupItem>
                                                    </ListGroup>
                                                </CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"What PAYMENT gateway/method do we use?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"We use STRIPE for ALL payment related logic - front to back. Stripe has an 'escrow-style' (not legitmately escrow but very similiar in functionality) payment functionality which captures funding, holding it in the platform itself - dispensing once the contract is completed! Most other payment related logic is automatic & instant for the most part..."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                    </Accordion>
                                </Col>
                                <Col xl="4 xl-40" lg="6" md="5">
                                    <Row>
                                        {/* <Col lg="12">
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
                                        </Col> */}
                                        <Col lg="12">
                                            <Card className="card-mb-faq add-shadow-card-faq">
                                                <CardHeader className="faq-header">
                                                    <h5>{Navigation}</h5><Settings />
                                                </CardHeader>
                                                <CardBody className="faq-body">
                                                    <div className="navigation-btn"><a className="btn btn-primary" style={{color:"#fff"}}  href={null}>
                                                        <MessageSquare className="m-r-10" />Quick-Link(s)</a></div>
                                                    <div className="navigation-option">
                                                        <ul>
                                                            <li><Linky to={"/hacker/directory/main/profiles"}><Edit />Hacker Directory</Linky></li>
                                                            <li><Linky to={"/create/employer/listing/general"}><Globe />Create Employer Listing</Linky></li>
                                                            <li><Linky to={"/view/all/general/applications/employer/recruit"}><BookOpen />View/Manage Current Applicant/Application's</Linky></li>
                                                            <li><Linky to={"/employer/account/view/reviews/previous"}><FileText />Manage Past & Previous Work</Linky></li>
                                                            <li><Linky to={"/employer/view/hired/applicants/active"}><Youtube />Current Hires</Linky></li>
                                                            <li><Linky to={"/employer/notifications"}><MessageCircle />Notification(s)</Linky></li>
                                                            <li><Linky to={"/profile/settings/edit/employer"}><Mail />Manage Core Settings</Linky></li>
                                                        </ul>
                                                        <hr />
                                                        <ul>
                                                            <li><Linky to={"/employer/introductory/video/upload"}><MessageCircle />Company/Employer Introductory Video</Linky></li>
                                                            <li><Linky to={"/employer/promote/various/account/data"}><Mail />Promote Employer Account Data</Linky></li>
                                                        </ul>
                                                    </div>
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
                        <Col style={{ paddingTop: "42.5px" }} lg="12">
                            <div className="header-faq">
                                <h5 className="mb-0">{"Blog related data & information"}</h5>
                            </div>
                            <Row>
                                {typeof blogs !== "undefined" && blogs.length > 0 ? blogs.map((blog, index) => {
                                    return (
                                        <Col onClick={() => handleRedirectToIndividualBlog(blog)} key={index} sm="12" md="4" lg="4" xl="4">
                                            <Card className={"add-shadow-normal-faq-card hovered-blog-chunk-customized-two"}>
                                                <CardBody>
                                                    <Media>
                                                        <Codepen className="m-r-30" />
                                                        <Media body>
                                                            <h6 className="f-w-600">{blog.title.slice(0, 50)}{typeof blog.title !== "undefined" && blog.title.length >= 50 ? "..." : ""}</h6>
                                                            <p>{blog.description.slice(0, 125)}{typeof blog.description !== "undefined" && blog.description.length >= 125 ? "..." : ""}</p>
                                                        </Media>
                                                    </Media>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    );
                                }) : null}
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Container>
        </Fragment>
    );
};

export default MainFAQEmployerHelper;