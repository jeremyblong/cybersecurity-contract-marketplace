import React, { Fragment, useState, useEffect, useRef } from "react";
import "./styles.css";
import { Parallax } from 'react-parallax';
import { Container, Row, Col, Button, Card, CardBody, CardHeader, Media } from 'reactstrap';
import axios from "axios";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";
import Breadcrumb from '../../../../layout/breadcrumb';
import CustomTabsetBottomListingAuctionHelper from './helpers/bottomTabbed/bottomTabbedHelper.js';
import Slider from 'react-slick';
import Ratings from 'react-ratings-declarative'
import { ProductReview,  Brand, Availability, AddToCart, BuyNow } from "../../../../constant";
import { Truck, Gift,CreditCard,Clock } from 'react-feather';

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
}
  
const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
}


const IndividualListingToBetGambleOnHelper = ({ userData }) => {
    const [ ready, setReady ] = useState(false);
    const { width } = useWindowDimensions();
    const [state, setState] = useState({ nav1: null, nav2: null });
    const [rating,setRating] = useState(0)
    // eslint-disable-next-line
    const [quantity,Setquantity] = useState(1)

    const slider1 = useRef();
    const slider2 = useRef();


    const symbol = "$";
    const singleItem = {
        price: "55.99",
        discountPrice: "34.99",
        stock: "11"
    };

    const changeRating = (rating) => {
        setRating(rating);
    }

    const { nav1, nav2 } = state;
    return (
        <Fragment>
            <Parallax
                className={"background-parallax-vpn-setup-img"} 
                bgImage={width >= 1350 ? require('../../../../assets/images/hackerPicOne.jpg') : require('../../../../assets/images/tall-tech.jpg')}
                renderLayer={percentage => {
                    const calculated = (percentage / 9.25) * (percentage * 5.25);
                    return (
                        <div
                            style={{
                                position: 'absolute',
                                background: `rgba(${calculated}, 102, 50, ${calculated - 0.275})`,
                                minHeight: "1250px",
                                left: '0px',
                                top: '0px',
                                right: "0px",
                                bottom: "0px",
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <Card className={"vpn-setup-card-parallax"}>
                                <CardBody className={"vpn-inner-cardbody"}>
                                    <CardHeader className={"b-l-primary border-3 vpn-setup-card-header"}>
                                        <h3 className={"vpn-parallax-header-text"}>You're NOW on the final-leg of the setup process & we will now install any required dependencies for the VPN software...</h3>
                                    </CardHeader>
                                    <CardBody className={"cardbody-vpn-setup"}>
                                        <p className={"vpn-parallax-sub-text"}>You will be given a certain amount of credits to use on our FREE VPN (a reasonable amount of credit's) to use our VPN as your own PRIVATE NETWORK (more privacy) once everything is properly setup & running. We highly recommend testing your network...<hr /><strong style={{ color: "#f73164" }}>(There are multiple pages/steps in order to completely finish the setup however it doesn't take long)</strong></p>
                                    </CardBody>
                                </CardBody>
                            </Card>
                        </div>
                    );
                }}
            />
            <Breadcrumb parent="Bid, Bet and Gamble on hacker's!" title="Individual Listing/Bidding Facilitator Logic"/>
            <Container fluid={true}>
                <Row>
                    <Col>
                    <Card>
                    <Row className="product-page-main">
                        <Col xl="4">
                            <Slider  
                                asNavFor={nav2} 
                                arrows= {false}
                                    ref={slider => (slider1.current = slider)} className="product-slider">
                                        {new Array(10).fill("").map((item, idx) => {
                                            return <Media src={require("../../../../assets/images/blog/blog.jpg")} alt="" className="img-fluid" />;
                                        })}
                                </Slider>
                                <Slider asNavFor={nav1}
                                ref={slider => (slider2.current= slider)}
                                slidesToShow={4}
                                swipeToSlide={true}
                                focusOnSelect={true}
                                infinite={true}
                                className="small-slick">
                                {new Array(10).fill("").map((item, idx) => {
                                    return <Media src={require("../../../../assets/images/blog/blog.jpg")} alt="" className="img-fluid" />;
                                })}
                            </Slider>
                        </Col>
                        <Col xl="5 xl-100">
                            <Card>
                                <CardBody>
                                <div className="product-page-details">
                                    <h3>{"Women Pink shirt."}</h3>
                                </div>
                                <div className="product-price f-28">
                                    {symbol}{singleItem.price}
                                    <del>{symbol}{singleItem.discountPrice}</del>
                                </div>
                                <ul className="product-color m-t-15">
                                    <li className="bg-primary"></li>
                                    <li className="bg-secondary"></li>
                                    <li className="bg-success"></li>
                                    <li className="bg-info"></li>
                                    <li className="bg-warning"></li>
                                </ul>
                                <hr/>
                                <p>{"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that."}</p>
                                <hr/>
                                <div>
                                    <table className="product-page-width">
                                    <tbody>
                                        <tr>
                                        <td> <b>{Brand} &nbsp;&nbsp;&nbsp;:</b></td>
                                        <td>{"Pixelstrap"}</td>
                                        </tr>
                                        <tr>
                                        <td> <b>{Availability} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                        <td className="txt-success">{singleItem.stock}</td>
                                        </tr>
                                        <tr>
                                        <td> <b>{"Seller"} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                        <td>{"ABC"}</td>
                                        </tr>
                                        <tr>
                                        <td> <b>{"Fabric"} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                        <td>{"Cotton"}</td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                <hr/>
                                <Row>
                                    <Col md="6">
                                    <h6 className="product-title">{"share it"}</h6>
                                    </Col>
                                    <Col md="6">
                                    <div className="product-icon">
                                        <ul className="product-social">
                                        <li className="d-inline-block"><a href="#javascript"><i className="fa fa-facebook"></i></a></li>
                                        <li className="d-inline-block"><a href="#javascript"><i className="fa fa-google-plus"></i></a></li>
                                        <li className="d-inline-block"><a href="#javascript"><i className="fa fa-twitter"></i></a></li>
                                        <li className="d-inline-block"><a href="#javascript"><i className="fa fa-instagram"></i></a></li>
                                        <li className="d-inline-block"><a href="#javascript"><i className="fa fa-rss"></i></a></li>
                                        </ul>
                                        <form className="d-inline-block f-right"></form>
                                    </div>
                                    </Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col md="6">
                                    <h6 className="product-title">{"Rate Now"}</h6>
                                    </Col>
                                    <Col md="6">
                                    <div className="d-flex">
                                            <Ratings
                                            rating={rating}
                                            widgetRatedColors="blue"
                                            changeRating={changeRating}
                                            >
                                            <Ratings.Widget />
                                            <Ratings.Widget />
                                            <Ratings.Widget />
                                            <Ratings.Widget />
                                            <Ratings.Widget />
                                        </Ratings>
                                        <span>{ProductReview}</span>
                                    </div>
                                    </Col>
                                </Row>
                                <hr/>
                                <div className="m-t-15">
                                    <Button  color="primary" className="m-r-10" onClick={() => {}} >
                                        <i className="fa fa-shopping-basket mr-1"></i>{AddToCart}
                                    </Button>
                                    <Button  color="success" className="m-r-10" onClick={() => {}}>
                                        <i className="fa fa-shopping-cart mr-1"></i>{BuyNow}
                                    </Button>
                                    <Button color="secondary" onClick={() => {}}>
                                        <i className="fa fa-heart mr-1"></i>{"Add To WishList"}
                                    </Button>
                                </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl="3 xl-cs-35">
                            <Card>
                                <CardBody>
                                <div className="filter-block">
                                    <h4>{"Brand"}</h4>
                                    <ul>
                                    <li>{"Clothing"}</li>
                                    <li>{"Bags"}</li>
                                    <li>{"Footwear"}</li>
                                    <li>{"Watches"}</li>
                                    <li>{"ACCESSORIES"}</li>
                                    </ul>
                                </div>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                <div className="collection-filter-block">
                                    <ul>
                                    <li>
                                        <div className="media"><Truck/>
                                        <div className="media-body">
                                            <h5>{"Free Shipping"}</h5>
                                            <p>{"Free Shipping World Wide"}</p>
                                        </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="media"><Clock/>
                                        <div className="media-body">
                                            <h5>{"24 X 7 Service"}</h5>
                                            <p>{"Online Service For New Customer"}</p>
                                        </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="media"><Gift/>
                                        <div className="media-body">
                                            <h5>{"Festival Offer"}</h5>
                                            <p>{"New Online Special Festival"}</p>
                                        </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="media"><CreditCard/>
                                        <div className="media-body">
                                            <h5>{"Online Payment"}</h5>
                                            <p>{"Contrary To Popular Belief."}</p>
                                        </div>
                                        </div>
                                    </li>
                                    </ul>
                                </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Card>
                <CustomTabsetBottomListingAuctionHelper /></Col>
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
export default connect(mapStateToProps, {  })(IndividualListingToBetGambleOnHelper);