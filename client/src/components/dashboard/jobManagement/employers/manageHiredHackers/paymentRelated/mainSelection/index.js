import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../../../../../../layout/breadcrumb'
import { Codepen, FileText, Youtube, BookOpen, Aperture, Search } from 'react-feather';
import { connect } from "react-redux";
import "./styles.css";
import { Container, Row, Col, Card, CardBody, CardFooter, Media, Form, FormGroup, Input, Button, Label, ListGroupItem, ListGroup } from "reactstrap"
import axios from 'axios'
import { Parallax } from 'react-parallax';
import { useHistory, useParams } from "react-router-dom";
import Sheet from 'react-modal-sheet';
import Slider from "react-slick";
import StarRatings from 'react-star-ratings';
import moment from "moment";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ReactPlayer from 'react-player';
import PaymentFullPaneManageAndPay from "./sheetHelpers/paymentFullPane/index.js";
import { Modal } from 'react-responsive-modal';


const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    draggable: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
};

const MainPaymentSelectionHelper = ({ userData }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [ isOpen, setIsOpenState ] = useState(false);
    const [ currentApplication, setCurrentApplication ] = useState(null);
    const [ listingsData, setListings ] = useState([]);
    const [ paymentPaneFull, setFullPaymentPaneOpen ] = useState(false);
    const [ currentlyDue, setCurrentlyDue ] = useState([]);
    const [ todoModalOpen, setModalOpenToDo ] = useState(false);

    const { id } = useParams();

    const history = useHistory();

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
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/core/user/information/related/hired/hackers`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered appropriate info!") {
                console.log(res.data);

                const { currentApplication } = res.data;

                setCurrentApplication(currentApplication);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log("Critical errror...:", err);
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
            <Sheet draggable={false} isOpen={isOpen} onClose={() => setIsOpenState(false)}>
                <Sheet.Container>
                    <Sheet.Header>
                        <div style={{ margin: "12.5px" }} className="centered-both-ways">
                            <Button onClick={() => setIsOpenState(false)} className={"btn-square-danger"} outline color={"danger-2x"} style={{ width: "100%" }}>Exit/Close This Pane</Button>
                        </div>
                    </Sheet.Header>
                    <Sheet.Content>
                        <div style={{ marginTop: "275px" }} className='centered-both-ways'>
                            <h1>Clear all pending/outstanding payment's...!</h1>
                        </div>
                    </Sheet.Content>
                    </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
            <Modal classNames={{
                overlay: '',
                modal: 'overlayCurrentlyDue',
            }} open={todoModalOpen} onClose={() => setModalOpenToDo(false)} center>
                <div style={{ margin: "7.5px" }} className="centered-both-ways">
                    <h4 className='top-modal-to-completed'>The following item's need to be completed via our 'onboarding-flow' before you may proceed forward with activating this payment method/type..</h4>
                </div>
                <hr />
                    <ListGroup className="list-group-flush">
                        {typeof currentlyDue !== "undefined" && currentlyDue.length > 0 ? currentlyDue.map((element, idx) => {
                            return (
                                <ListGroupItem key={idx}>
                                    <Row>
                                        <Col sm="12" md="6" lg="6" xl="6">
                                            <strong>To Be Completed: </strong>
                                        </Col>
                                        <Col sm="12" md="6" lg="6" xl="6">
                                            <strong style={{ color: "#f73164", textDecorationLine: "underline" }}>{element}</strong>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            );
                        }) : null}
                    </ListGroup>
                <hr />
                <div style={{ margin: "7.5px" }} className="centered-both-ways">
                    <Button onClick={() => setModalOpenToDo(false)} className={"btn-square-danger"} outline color={"danger-2x"} style={{ width: "100%" }}>Close/Exit Modal</Button>
                </div>
            </Modal>
            <PaymentFullPaneManageAndPay setModalOpenToDo={setModalOpenToDo} currentlyDue={currentlyDue} setCurrentlyDue={setCurrentlyDue} currentApplication={currentApplication} paymentPaneFull={paymentPaneFull} setFullPaymentPaneOpen={setFullPaymentPaneOpen} />
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
                        <Card className="bg-primary">
                            <CardBody className='cardcardcard-min'>
                                <Media className="faq-widgets">
                                    <Media body>
                                        <h5 style={{ color: "white", textDecorationLine: "underline" }}>Setup pre-set payment period's (recurring)</h5>
                                        <p className='heavy-p'>Setup pre-set/pre-planned recurring payment's with your hacker/contractor to consistently pay any owed dues/fees associated with a specific hack. This can be useful for longer-term projects/requirement's that REGULARLY pays a contractor for their work. Ex. A hacker has been routinely penn-testing your physical & digital asset's for a set period of time and you wish to not hassle with remembering to pay them on time - this is your option in this scenario!</p>
                                        <hr />
                                        <p className='heavy-p'>With this type of recurring payment, both parties will need to <em>verify the transaction</em> however regardless if it's automated. This is a tool that prevents undesired payments to going to old/former contracted hackers - <em>BOTH PARTIES</em> will still need to confirm to clear the payment before it is fully transferred to desired contractor...</p>
                                        <hr />
                                        <Button onClick={() => history.push(`/setup/recurring/payments/specific/contractor/${id}`)} className={"btn-square-light"} color={"light-2x"} outline style={{ width: "100%", color: "white", fontWeight: "bold" }}>Setup recurring payment's</Button>
                                    </Media><BookOpen />
                                </Media>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="6 xl-50" md="6" sm="12" sm="6">
                        <Card className="bg-info">
                            <CardBody className='cardcardcard-min'>
                                <Media className="faq-widgets">
                                    <Media body>
                                        <h5 style={{ color: "white", textDecorationLine: "underline" }}>Pay Off Entire Owed/Due Balanace</h5>
                                        <p className='heavy-p'>Pay off <strong>ENTIRE REMAINING DUE BALANCE</strong> with this <em>specific</em> contracted hacker, This option will allow you to make sure you're not oweing anyone money at any given point in time. This option/selection will display & clear all remaining payments to be paid upon <em>approval...</em></p>
                                        <hr />
                                        <p className='heavy-p'>This will automatically recognize through the system how much should be paid & will provide a <em>DETAILED</em> receipt/record after completion for bookkeeping purposes.</p>
                                        <hr />
                                        <Button onClick={() => setIsOpenState(true)} className={"btn-square-light"} color={"light-2x"} outline style={{ width: "100%", color: "white", fontWeight: "bold" }}>Clear all pending/outstanding payment's</Button>
                                    </Media><Aperture />
                                </Media>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="12 xl-50" md="12" sm="12" sm="12">
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
                    <Col lg="12">
                        <div className="header-faq">
                            <h5 className="mb-0">Other Related Jobs You May Want To Check Out (Compare your listing to other's)</h5>
                        </div>
                        <Row>
                            <Slider {...settings}>
                                {typeof listingsData !== "undefined" && listingsData.length > 0 ? listingsData.map((listing, idx) => {
                                    const lastUploaded = listing.uploadedFiles[listing.uploadedFiles.length - 1];

                                    console.log("listing!!!", listing);
                                    return (
                                        <Fragment key={idx}>
                                            <Col className='min-col-styled' xl="3 xl-50 box-col-6" lg="6" xl="6" md="6">
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
                            <Col xl="4" md="6">
                                <Row>
                                    <Col sm="12">
                                        <Card>
                                            <CardBody>
                                                <div className="media"><Codepen className="m-r-30" />
                                                    <Media body>
                                                        <h6 className="f-w-600">{"Using Video"}</h6>
                                                        <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                    </Media>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col sm="12">
                                        <Card>
                                            <CardBody>
                                                <div className="media"><Codepen className="m-r-30" />
                                                    <Media body>
                                                        <h6 className="f-w-600">{"Vel illum qu"}</h6>
                                                        <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                    </Media>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col sm="12">
                                        <Card>
                                            <CardBody>
                                                <div className="media"><Codepen className="m-r-30" />
                                                    <Media body>
                                                        <h6 className="f-w-600">{"Cum sociis natoqu"}</h6>
                                                        <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. "}</p>
                                                    </Media>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xl="4" md="6">
                                <Row>
                                    <Col sm="12">
                                        <Card>
                                            <CardBody>
                                                <div className="media"><FileText className="m-r-30" />
                                                    <Media body>
                                                        <h6 className="f-w-600">{"Donec pede justo"}</h6>
                                                        <p>{" Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. "}</p>
                                                    </Media>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col sm="12">
                                        <Card>
                                            <CardBody>
                                                <div className="media"><FileText className="m-r-30" />
                                                    <Media body>
                                                        <h6 className="f-w-600">{"Nam quam nunc"}</h6>
                                                        <p>{" Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                    </Media>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col sm="12">
                                        <Card>
                                            <CardBody>
                                                <div className="media">
                                                    <FileText className="m-r-30" />
                                                    <Media body>
                                                        <h6 className="f-w-600">{"Using Video"} </h6>
                                                        <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                    </Media>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xl="4">
                                <Row>
                                    <Col xl="12" md="6">
                                        <Card>
                                            <CardBody>
                                                <div className="media"><Youtube className="m-r-30" />
                                                    <Media body>
                                                        <h6 className="f-w-600">{"Vel illum qu"}</h6>
                                                        <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                    </Media>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col xl="12" md="6">
                                        <Card>
                                            <CardBody>
                                                <div className="media"><Youtube className="m-r-30" />
                                                    <Media body>
                                                        <h6 className="f-w-600">{"Cum sociis natoqu"}</h6>
                                                        <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                    </Media>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col xl="12">
                                        <Card>
                                            <CardBody>
                                                <div className="media"><Youtube className="m-r-30" />
                                                    <Media body>
                                                        <h6 className="f-w-600">{"Donec pede justo"}</h6>
                                                        <p>{"Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."}</p>
                                                    </Media>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
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