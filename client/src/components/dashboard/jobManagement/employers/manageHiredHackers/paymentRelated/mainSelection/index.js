import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../../../../../../layout/breadcrumb'
import { Codepen, FileText, Youtube, BookOpen, Aperture, Search } from 'react-feather';
import { connect } from "react-redux";
import "./styles.css";
import { Container, Row, Col, Card, CardBody, CardFooter, Media, Form, FormGroup, Input, Button, Label, ListGroupItem, ListGroup } from "reactstrap"
import axios from 'axios'
import { Parallax } from 'react-parallax';
import { useHistory, useParams } from "react-router-dom";
import RecurringPaymentPaneHelper from "./sheetHelpers/recurring/recurringPaymentPane.js";
import Slider from "react-slick";
import StarRatings from 'react-star-ratings';
import moment from "moment";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ReactPlayer from 'react-player';
import PaymentFullPaneManageAndPay from "./sheetHelpers/paymentFullPane/index.js";
import ClearPaymentsOrPartialPane from "./sheetHelpers/partialPaymentClear/clearPaymentsOrPartial.js";

const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    draggable: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1350,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
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

const MainPaymentSelectionHelper = ({ userData }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [ isOpen, setIsOpenState ] = useState(false);
    const [ currentApplication, setCurrentApplication ] = useState(null);
    const [ listingsData, setListings ] = useState([]);
    const [ blogs, setBlogs ] = useState([]);
    const [ paymentPaneFull, setFullPaymentPaneOpen ] = useState(false);
    const [ currentlyDue, setCurrentlyDue ] = useState([]);
    const [ incrementalPayentsPane, setIncrementalPaymentsOpen ] = useState(false);

    const { id } = useParams();

    const history = useHistory();


    const handleRedirectToIndividualBlog = (blog) => {
        console.log("handleRedirectToIndividualBlog clicked..:", blog);

        history.push(`/view/individual/restricted/blog/content/${blog.id}`);
    }

    const handleChange = event => {
        const searchTitle = event.target.value;

        setSearchTerm(searchTitle);
    };

    useEffect(() => {
        const configuration = {
            params: {
                activeHiredID: id, 
                employerID: userData.uniqueId
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/core/user/information/related/hired/hackers`, configuration).then(async (res) => {
            if (res.data.message === "Successfully gathered appropriate info!") {
                console.log(res.data);

                const { currentApplication } = res.data;

                const promises = [];

                if (typeof currentApplication.paymentHistory !== "undefined" && currentApplication.paymentHistory.length > 0) {
                    for (let index = 0; index < currentApplication.paymentHistory.length; index++) {
                        const payment = currentApplication.paymentHistory[index];
    
                        if (payment.recurring === true) {
                            // fetch the payment data..
                            const { price } = payment.completedPayment.phases[0].items[0];
    
                            promises.push(new Promise((resolve, reject) => {
                                axios.get(`${process.env.REACT_APP_BASE_URL}/fetch/price/by/id/quick`, {
                                    params: {
                                        priceID: price
                                    }
                                }).then((res) => {
                                    const { priceData, message } = res.data;
    
                                    if (message === "Success!") {
                                        const newPriceObj = {
                                            ...payment,
                                            paymentData: priceData
                                        }
                                        resolve(newPriceObj);
                                    } else {
                                        resolve(null);
                                    }
                                }).catch((err) => {
                                    reject(err);
                                })
                            }));
                        } else {
                            // just return the item - payment data already exists
                            promises.push(new Promise((resolve) => {
                                resolve(payment);
                            }));
                        }
                    }
    
                    Promise.all(promises).then((passedData) => {
                        console.log("passedData", passedData);
    
                        setCurrentApplication({
                            ...currentApplication,
                            paymentHistory: passedData
                        });
                    })
                } else {
                    setCurrentApplication({
                        ...currentApplication,
                        paymentHistory: []
                    });
                }
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log("Critical errror...:", err);
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
        const configuration = {
            params: {
                
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/employer/listings/general`, configuration).then((res) => {
            if (res.data.message === "Gathered general employer listings!") {
                console.log(res.data);

                const { listings } = res.data;

                setListings(listings);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log("Critical errror...:", err);
        })
    }, []);

    const renderPicOrVideoLastUploaded = (last) => {
        if (last !== null) {
            if (last.type.includes("video")) {
                // video logic
                return <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"img-fluid"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />;
            } else if (last.type.includes("image")) {
                return <img className='img-fluid' src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
            } else {
                // image logic
                return <img className='img-fluid' src={require("../../../../../../../assets/images/unknown-file-type.png")} />
            } 
        } else {
            return <img className='img-fluid' src={process.env.REACT_APP_PLACEHOLDER_IMAGE} />
        }
    }

    console.log("currentApplication", currentApplication);

    return (
        <Fragment>
            <Breadcrumb parent="Manage Payment(s)" title="Manage payments, recurring deposits & more..." />
            <ClearPaymentsOrPartialPane setCurrentApplication={setCurrentApplication} listing={listingsData} currentApplication={currentApplication} isOpen={isOpen} setIsOpenState={setIsOpenState} />
            <PaymentFullPaneManageAndPay setCurrentApplication={setCurrentApplication} listing={listingsData} paymentPaneFull={paymentPaneFull} setFullPaymentPaneOpen={setFullPaymentPaneOpen} currentlyDue={currentlyDue} setCurrentlyDue={setCurrentlyDue} currentApplication={currentApplication} />
            <RecurringPaymentPaneHelper incrementalPayentsPane={incrementalPayentsPane} setIncrementalPaymentsOpen={setIncrementalPaymentsOpen} setCurrentApplication={setCurrentApplication} listing={listingsData} currentlyDue={currentlyDue} setCurrentlyDue={setCurrentlyDue} currentApplication={currentApplication} />
            <Container fluid={true}>
                <Row>
                    <Col sm="12" lg="12" md="12" xs="12">
                        <Parallax
                            className={"knowledgebase-bg"} 
                            bgImage={require('../../../../../../../assets/images/code-2.jpg')}
                            renderLayer={percentage => {
                                const calculated = (percentage / 6.25) * (percentage * 4.25);
                                return (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            background: `rgba(${calculated}, 102, 50, ${calculated - 0.275})`,
                                            minHeight: "500px", // 1250px was before
                                            left: '0px',
                                            top: '0px',
                                            right: "0px",
                                            bottom: "0px",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    >
                                        <div className="knowledgebase-search">
                                            <div className='banner-container-custom'>
                                                <h3 style={{ color: "#fff" }}>{"How Can I help you?"}</h3>
                                                <Form className="form-inline" style={{ minWidth: "65vw" }}>
                                                    <FormGroup className="w-100"><Search/>
                                                        <Input className="form-control-plaintext w-100 create-padding-input-payment" type="text" onChange={handleChange} value={searchTerm} placeholder="Search our FAQ's for help with payment related logic..." />
                                                    </FormGroup>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }}
                        />
                    </Col>
                    <Col xl="6 xl-50" md="6" sm="12" sm="6">
                        <Card className="bg-dark">
                            <CardBody className='cardcardcard-min'>
                                <Media className="faq-widgets">
                                    <Media body>
                                        <h5 style={{ color: "white", textDecorationLine: "underline" }}>Setup pre-set payment period's (recurring)</h5>
                                        <p className='heavy-p'>Setup pre-set/pre-planned recurring payment's with your hacker/contractor to consistently pay any owed dues/fees associated with a specific hack. This can be useful for longer-term projects/requirement's that REGULARLY pays a contractor for their work. Ex. A hacker has been routinely penn-testing your physical & digital asset's for a set period of time and you wish to not hassle with remembering to pay them on time - this is your option in this scenario!</p>
                                        <hr />
                                        <p className='heavy-p'>With this type of recurring payment, both parties will need to <em>verify the transaction</em> however regardless if it's automated. This is a tool that prevents undesired payments to going to old/former contracted hackers - <em>BOTH PARTIES</em> will still need to confirm to clear the payment before it is fully transferred to desired contractor...</p>
                                        <hr />
                                        <Button onClick={() => setIncrementalPaymentsOpen(true)} className={"btn-square-light"} color={"light-2x"} outline style={{ width: "100%", color: "white", fontWeight: "bold" }}>Setup recurring payment's</Button>
                                    </Media><BookOpen />
                                </Media>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="6 xl-50" md="6" sm="12" sm="6">
                        <Card className="bg-dark">
                            <CardBody className='cardcardcard-min'>
                                <Media className="faq-widgets">
                                    <Media body>
                                        <h5 style={{ color: "white", textDecorationLine: "underline" }}>Pay off a segment/chunk of your overall owed/due balance</h5>
                                        <p className='heavy-p'>Pay off a <strong style={{ textDecorationLine: "underline" }}>CHUNK/PORTION (SELECTED)</strong> with this <em>specific</em> contracted hacker, This option will allow you to make deposit percentages of your overall dued balance at any given point in time. This option is good if you want your hacker/contractor to get started <strong style={{ textDecorationLine: "underline" }}>BUT</strong> you don't have enough money to make a <strong style={{ textDecorationLine: "underline" }}>FULL DEPOSIT</strong> or want to pay incrementally..</p>
                                        <hr />
                                        <p className='heavy-p'>There is a <em>"percentage bar"</em> which is adjustable and can be modified according to whatever amount you'd like to deposit at this current point in time. We <strong style={{ textDecorationLine: "underline" }}>SUGGEST</strong> you deposit at least 25% of the total due as until the hacker contracted amount is <strong style={{ color: "#7366ff" }}>paid in full and all funds are deposited into {process.env.REACT_APP_APPLICATION_NAME}</strong> so the contracted user (hacker) knows they will be paid upon <strong style={{ textDecorationLine: "underline" }}>COMPLETION OF THE CONTRACT.</strong></p>
                                        <hr style={{ marginBottom: "32.5px" }} />
                                        <Button onClick={() => setIsOpenState(true)} className={"btn-square-light"} color={"light-2x"} outline style={{ width: "100%", color: "white", fontWeight: "bold" }}>Make a PARTIAL payment!</Button>
                                    </Media><Aperture />
                                </Media>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="12 xl-100" md="12" sm="12" sm="12">
                        <Card className="bg-light">
                            <CardBody className='full-payment-block'>
                                <Media className="p-20">
                                    <div className="radio radio-light mr-3">
                                        <Input id="radio14" type="radio" name="radio1" value="option1" />
                                        <Label for="radio14"></Label>
                                    </div>
                                    <Media body>
                                        <h6 className="mt-0 mega-title-badge">Deposit funds into {process.env.REACT_APP_APPLICATION_NAME} to activate the desired/selected contract<span className="badge badge-dark pull-right digits mega-badge-pricing-full">{"DEPOSIT ENTIRE/FULL FUNDS"}</span></h6>
                                        <p>{`Deposit Full Fund's Amount Into ${process.env.REACT_APP_APPLICATION_NAME} In Preperation To Pay Your Contractor`}</p>
                                        <hr />
                                        <Button onClick={() => setFullPaymentPaneOpen(true)} className={"btn-square-dark"} color={"dark-2x"} outline style={{ width: "100%", fontWeight: "bold" }}>Open Full Payment Pane</Button>
                                    </Media>
                                </Media>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="12 xl-100" md="12" sm="12" sm="12">
                        <Card className="bg-dark">
                            <CardBody className='full-payment-block'>
                                <h3 className='previous-payment-header'>View previous payment's made on this specific contract/gig</h3>
                                <p className='previous-payment-sub'>These are PREVIOUS payment's made by BOTH users including yourself & the contracted user. This data will be identical on the {userData.accountType === "employers" ? "hacker's" : "employer's"} account while viewing this specific contracted job.</p>
                                <ListGroup>
                                    {currentApplication !== null && typeof currentApplication.paymentHistory !== "undefined" && currentApplication.paymentHistory.length > 0 ? currentApplication.paymentHistory.map((payment, index) => {
                                        const { partial, full, pending, paidByFullName, recurring } = payment;
                                        const { amount, created, currency, description, status } = payment.completedPayment;
                                        if (recurring === false) {
                                            return (
                                                <Fragment key={index}>
                                                    <ListGroupItem style={{ marginTop: "12.5px" }} className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1" style={{ color: "#7366ff" }}>{`${paidByFullName} paid the contracted user $${(amount / 100).toFixed(2)} (${currency})`}</h5><small>{moment(created * 1000).fromNow()}</small>
                                                        </div>
                                                        <p className="mb-1">{description}</p>
                                                        <small>{partial === false && full === true ? `Full payment which is ${pending === true ? "Pending (This payment has been captured but NOT released)" : "Processed (This payment has been captured AND has been RELEASED)"}` : `Partial payment was made and is ${pending === true ? "Pending (This payment has been captured but NOT released)" : "Processed (This payment has been captured AND has been RELEASED)"}`}</small>
                                                    </ListGroupItem>
                                                </Fragment>
                                            );
                                        } else {
                                            const { active, created, currency, unit_amount } = payment.paymentData;
                                            const { lastPaymentDay, firstPaymentDay } = payment.completedPayment;
                                            return (
                                                <Fragment key={index}>
                                                    <ListGroupItem style={{ marginTop: "12.5px" }} className="list-group-item-action flex-column align-items-start">
                                                        <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1" style={{ color: "#7366ff" }}>{`${paidByFullName} has initialized a subscription/recurring payment of $${(unit_amount / 100).toFixed(2)}`}</h5><small>{moment(created * 1000).fromNow()}</small>
                                                        </div>
                                                        <p className="mb-1">{`This payment is ${active === true ? "active" : "innactive"} in the currency of ${currency === "usd" ? "US Dollar (USD)" : "Unknown Currency."}. This is a recurring payment/deposit type with a start date of ${moment(firstPaymentDay).format("dddd MM/DD")} (MM/DD) while ending on ${moment(lastPaymentDay).format("dddd MM/DD")} (MM/DD) of full payment completion (whichever comes first)!`}</p>
                                                        <small>{`This is a RECURRING payment which means every week, this payment will automatically be billed on the desired/selected day upon initializing this payment type. These can be cancelled but as of now, this payment is still active and will be availiable on a weekly basis!`}</small>
                                                    </ListGroupItem>
                                                </Fragment>
                                            );
                                        }
                                    }) : null}
                                </ListGroup>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="12">
                        <div className="header-faq">
                            <h5 className="mb-0">Other Related Jobs You May Want To Check Out (Compare your listing to other's)</h5>
                        </div>
                        <Row>
                            <Slider {...settings}>
                                {typeof listingsData !== "undefined" && listingsData.length > 0 ? listingsData.map((listing, idx) => {
                                    const lastUploaded = listing.uploadedFiles[listing.uploadedFiles.length - 1];
                                    return (
                                        <Fragment key={idx}>
                                            <Col className='min-col-styled' xl="4 xl-100 box-col-4" lg="6" xl="6" md="6">
                                                <Card className="features-faq product-box">
                                                    <div className="faq-image product-img">
                                                        {renderPicOrVideoLastUploaded(lastUploaded)}
                                                        <div className="product-hover">
                                                            <ul>
                                                                <li><i className="icon-link"></i></li>
                                                                <li><i className="icon-import"></i></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <CardBody>
                                                        <h6>{listing.publicCompanyName}</h6>
                                                        <ReactMarkdown className='desc-desc-hiring-markdown' children={listing.listingDescription} remarkPlugins={[remarkGfm]} />
                                                    </CardBody>
                                                    <CardFooter><span>Posted {moment(listing.postedDate).fromNow()}</span>
                                                        <span className="pull-right">
                                                            <StarRatings
                                                                rating={4.45}
                                                                starRatedColor="blue"
                                                                changeRating={() => {}}
                                                                numberOfStars={5}
                                                                starDimension="40px"
                                                                starSpacing="1.75px"
                                                                name='rating'
                                                            />
                                                        </span>
                                                    </CardFooter>
                                                    <CardFooter>
                                                        <Button onClick={() => history.push(`/view/individual/employer/listing/public/${listing.uniqueId}`, { listing })} className={"btn-square-info"} outline color={"info-2x"} style={{ width: "100%" }}>Redirect/Visit This Listing</Button>
                                                    </CardFooter>
                                                </Card>
                                            </Col>
                                        </Fragment>
                                    );
                                }) : null}
                            </Slider>
                        </Row>
                    </Col>
                    <Col lg="12">
                        <div className="header-faq">
                            <h5 className="mb-0">{"Latest articles and videos"}</h5>
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
            </Container>
        </Fragment>
    );
};
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {  })(MainPaymentSelectionHelper);