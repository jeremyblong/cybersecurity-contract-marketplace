import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb'
import { Edit, Globe, BookOpen, FileText, Youtube, MessageCircle, Mail, Codepen, HelpCircle, Aperture, Settings, MessageSquare } from 'react-feather';
import one from '../../../../../assets/images/faq/1.jpg';
import { Container, Row, Col, Card, CardBody, CardHeader, Media, Badge, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { Navigation, LatestUpdates, WebDesign, FeaturedTutorials , SeeAll } from "../../../../../constant";
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
import { useHistory, Link as Linky } from "react-router-dom";
import helpers from "./helpers/helpers.js";
import moment from "moment";

const { renderProfilePicVideo } = helpers;

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
          breakpoint: 1024,
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


const MainFAQHackerHelper = () => {

    const history = useHistory();

    const [ courses, setCourseData ] = useState([]);
    const [ blogs, setBlogs ] = useState([]);
    const [ hackers, setHackers ] = useState([]);

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


    useEffect(() => {
        const config = {
            params: {
                
            }
        } 
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/hackers/random/general`, config).then((res) => {
            if (res.data.message === "Successfully gathered hackers!") {
                console.log(res.data);

                const { hackers } = res.data;

                setHackers(hackers.slice(0, 4));
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
                                            <h5 className='text-white-only-faq'>How to quickly gain a following?</h5>
                                            <p>{"The BEST way to properly build a following via our marketplace/platform is to consistently post on our specific platform but also share content, links & 'hack' related data on other social platforms to boost your following!"}</p>
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
                                            <h5 className='text-white-only-faq'>Different ways to make money & build an audience that pays!</h5>
                                            <p>{"There are NUMEROUS ways to monetize your knowledge and/or services such as selling pre-prepared courses (complete fully-fledged courses), selling custom-coded 'hacks' to other hackers that cannot code, posting tutorial snippet videos, apply & work contracted work (primary function of making money) & so much more...!"}</p>
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
                                            <h5 className='text-white-only-faq'>How do our users 'connect' with eachother?</h5>
                                            <p>{"There are a plethora of ways/means to connect with other LIKE-MINDED individuals on our platform beyond just making money! We utilize a 'follow/following' based program for the most part but you can also 'bookmark' people's profiles. Throughout our marketplace, you can interact in various fashions with 'likes/dislikes', emoji-reactions, comments & more..."}</p>
                                        </Media><Aperture />
                                    </Media>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="12">
                            <div className="header-faq">
                                <h5 className="mb-0">{"Quick/Common Questions - Answered"}</h5>
                            </div>
                            <Row className="default-according style-1 faq-accordion" id="accordionoc">
                                <Col xl="8 xl-60" lg="6" md="7">
                                    <Accordion>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                    <HelpCircle className='help-circle-faq' />
                                                    {"After successfully signing up, can I immediately start working?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"You MUST complete the required 'verification flow' by verifying your identity through the 'Payment Set-up BEFORE any LIVE payment's' page & via the 'profile related' logic. Payment verification is done through STRIPE & general account verification is done via the 'profile edit' page..."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' /> {"What're the BEST ways to make money on 'The Hacker Marketplace' includes all features/functionality?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Well, really it's entirely up to you! We estimate that outside of bug-bounty contracted work being the MOST EFFECTIVE way to make quick/good money, selling software custom-coded 'hacks' and customized educational courses are probably the next best way to earn funds! Selling software 'hacks' are auction-style listings so the auction ends at the set time with the highest bidder winning the 'code'. This drives up the price & creates friendly competition."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"What're the proper 'first steps' after signing up?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>
                                                    <ListGroup>
                                                        <ListGroupItem><strong style={{ color: "blue" }}>1) </strong>{" Complete a successful 'sign-up'!"}</ListGroupItem>
                                                        <ListGroupItem><strong style={{ color: "blue" }}>2) </strong>{" Verify your account via the STRIPE authentication/registration flow"}</ListGroupItem>
                                                        <ListGroupItem><strong style={{ color: "blue" }}>3) </strong>{" Verify your identity via a drivers license, passport or other similar 'accepted documentation' via the profile settings page(s)"}</ListGroupItem>
                                                        <ListGroupItem><strong style={{ color: "blue" }}>4) </strong>{" Fill-out your profile settings or information"}</ListGroupItem>
                                                        <ListGroupItem><strong style={{ color: "blue" }}>5) </strong>{" Upload a profile picture/video & a profile 'banner image'"}</ListGroupItem>
                                                        <ListGroupItem><strong style={{ color: "blue" }}>6) </strong>{" That's it for the core set-up, explore some more to further the legitimacy of your account!"}</ListGroupItem>
                                                    </ListGroup>
                                                </CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />  {"How much working real-world experience do I need to join & apply, interact & engage w/others?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"ANY, We do NOT have a minimum experience requirement to join our platform. However, you should be aware that you may run into problems finding work or making significant financial returns as you will be competing with ALL other hackers on our platform for contracts & other related features/functionality..."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <div className="faq-title">
                                            <h6>Bug-Bounty Related FAQ</h6>
                                        </div>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' /> {"How much does the 'average' successful bug-bounty reward payout?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"To date, 181,000 vulnerabilities have been reported - with $100,000,000 being paid out to 'bounty-hunters' with 'critical' rewards rising to an average of $3,650 (up 8% year after year)!"}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' /> {"How do I 'enroll' or sign-up to complete bug-bounty contracts to complete?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>
                                                    <ListGroup>
                                                        <ListGroupItem><strong style={{ color: "blue" }}>1) </strong>{" Purchase tokens (tokens are used to apply to contracts - used to reduce 'spam' & cost $$$ to purchase)"}</ListGroupItem>
                                                        <ListGroupItem><strong style={{ color: "blue" }}>2) </strong>{" Browse our 'employer listings/contracts' & find a listing that matches your expertise/experience.."}</ListGroupItem>
                                                        <ListGroupItem><strong style={{ color: "blue" }}>3) </strong>{" Complete the required information from the employer & submit the completed data"}</ListGroupItem>
                                                        <ListGroupItem><strong style={{ color: "blue" }}>4) </strong>{" Apply...! You will then be able to view your 'previously submitted applications' on the application page"}</ListGroupItem>
                                                    </ListGroup>
                                                </CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' /> {"How LONG do typical bug-bounty interviews/vetting process last?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Typical listings/contracted gigs will last UNTIL all required positions or number of hackers are completly filled! After each hire or recruited user, the count will be reduced & once the last user is hired, the listing AUTOMATICALLY gets 'archived' and removed from the active list..."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <div className="faq-title">
                                            <h6>WHY choose US over other websites & Misc Related Questions</h6>
                                        </div>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' /> {"Why choose 'The Hacker Marketplace'?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"We pay our hackers TOP-RATES upwards of nearly 90% (our user's will also pay 2.5-5% to STRIPE) ending up at approx. 85-90% total proceeds per ALL transactions! The stripe transaction fee assigned to users may eventually be absorbed by our marketplace, leading to more money in YOUR pocket at a rate of approx. 90%!"}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"Can I work however many gigs/contracts as I deem appropriate?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"YES, ABSOLUTELY! You are welcome to work however many jobs you deem appropriate, however... if you accept too many contracts & cannot fulfill your obligations - you may recieve negative feedback and/or results leading to a possible reduction in work and/or negative reviews..."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"How long have we been in business?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"We have JUST RECENTLY LAUNCHED (for better or worse - we think better)! We use an 'escrow' style payment system where the system captures funding holding it in a 'pending' state until the contract is completed. To alleviate any concerns about our recent launch and receiving your money - all funding is either immediately transferred to the end user or is held as previously mentioned in a 'pending state'."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"How can I know exactly who I'm working with?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"As previously mentioned, we authenticate/verify EACH and EVERY user via passport, DL/ID & other related 'legal' documentation to provide proof of the user of each account. We also verifiy via SSN's through our partner, stripe... coupled with other crucial identifying information. This makes sure ALL users are EXACTLY who they say they are & YOU know who you're working with, AT ALL TIMES!"}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <div className="faq-title">
                                            <h6><strong>Payment</strong> Related Questions (Hacker Specific) & Subscription Data</h6>
                                        </div>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"How do I add a 'balance' to my account?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"You can simply navigate to the 'Top-Off' Account Balance (Add Funds) page and simply add an existing debit-card or add a new one, select a 'top-off' value/amount & proceed by charging your card and topping off your overall account balance to use to purchase things such as tokens and other in-app purchases. You can always retrieve this money & send it back to your card at a later point, if you so choose..."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"How do I add 'payment methods' to my account?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Simply scroll to the VERY/near bottom of the sidebar menu & click 'Hacker's Payment(s) Homepage/Main' page and simply follow the directions/instructions and you'll have your new payment method on file in no-time!"}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' /> {"How could I benifit from 'The Hacker Marketplace' SUBSCRIPTION plans?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"By subscribing to our custom subscription packages, you will not only get premium access to certain content & elevated privileges in certain aspects along with a plethora of FREE goodies that are dispursed EVERY month of the date you've started your subscription such as FREE TOKENS, FREE BOOSTS & MUCH MORE!"}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />  {"What are TOKENS? Why and do I need to purchase them?!"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"IF you plan to target our 'bug-bounty' feature/functionality - you will ABSOLUTELY need tokens are employers/contractors set a specific token price to apply to their listing (they set the price - we do NOT) as this helps users make more precise & educated submissions. Token's are also used in other aspects throughout our marketplace but the primary function for these are contracted listings!"}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        
                                    </Accordion>
                                </Col>
                                <Col xl="4 xl-40" lg="6" md="5">
                                    <Row>
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
                                                            <li><Linky to={"/people/list/employers/general"}><Edit />General Employers</Linky></li>
                                                            <li><Linky to={"/employer/listings/available"}><Globe />Employer Listings</Linky></li>
                                                            <li><Linky to={"/map/employers/available/jobs"}><BookOpen />Employer Listsings (Map-View)</Linky></li>
                                                            <li><Linky to={"/leaderboards/homepage"}><FileText />Leaderboard Data</Linky></li>
                                                            <li><Linky to={"/already/applied/jobs/hacker/account"}><Youtube />Already Applied Contracts</Linky></li>
                                                            <li><Linky to={"/hacker/notifications"}><MessageCircle />Notification(s)</Linky></li>
                                                            <li><Linky to={"/hackers/display/all/active/gigs/hired"}><Mail />Hired/Contracted Jobs</Linky></li>
                                                        </ul>
                                                        <hr />
                                                        <ul>
                                                            <li><Linky to={"/memberships/selection"}><MessageCircle />Subscribe To Membership</Linky></li>
                                                            <li><Linky to={"/software/exchange/landing"}><Mail />Software Exchange/Marketplace</Linky></li>
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
                                                    <ListGroup>
                                                        {typeof hackers !== "undefined" && hackers.length > 0 ? hackers.map((hacker, index) => {
                                                            return (
                                                                <Fragment key={index}>
                                                                    <Media className="updates-faq-main">
                                                                        <ListGroupItem onClick={() => redirectToHackersProfile(hacker.uniqueId)} className="list-group-item-action flex-column align-items-start">
                                                                            <Row>
                                                                                <Col sm="12" md="3" lg="3" xl="3">
                                                                                    {renderProfilePicVideo(typeof hacker.profilePicsVideos !== "undefined" && hacker.profilePicsVideos.length > 0 ? hacker.profilePicsVideos[hacker.profilePicsVideos.length - 1] : null)}
                                                                                </Col>
                                                                                <Col sm="12" md="9" lg="9" xl="9">
                                                                                    <div className="d-flex w-100 justify-content-between">
                                                                                        <h5 className="mb-1">{`${hacker.firstName} ${hacker.lastName}`}</h5><small>Registered {moment(hacker.registrationDate).fromNow()}</small>
                                                                                    </div>
                                                                                    <p className="mb-1"><strong>About Me:</strong> {typeof hacker.aboutMe !== "undefined" && hacker.aboutMe.length > 0 ? hacker.aboutMe.slice(0, 65) : "No 'About Me' Provided Yet..."}{typeof hacker.aboutMe !== "undefined" && _.has(hacker, "aboutMe") && hacker.aboutMe.length >= 65 ? "..." : ""}</p>
                                                                                    <small><strong>Title:</strong> {typeof hacker.title !== "undefined" && hacker.title.length > 0 ? hacker.title : "No 'Title' Provided Yet..."}</small>
                                                                                </Col>
                                                                            </Row>
                                                                        </ListGroupItem>
                                                                    </Media>
                                                                </Fragment>
                                                            );
                                                        }) : null}
                                                    </ListGroup>
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
                        <Col style={{ paddingTop: "42.5px" }} xl="12" md="12" sm="12" lg="12">
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

export default MainFAQHackerHelper;