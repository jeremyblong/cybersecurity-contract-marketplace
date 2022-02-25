import React,{Fragment, useState,useEffect,useRef} from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb';
import {Container,Row,Col,Card,Button,Media, CardBody} from 'reactstrap';
import Tablet from './helpers/tabset.js';
import Slider from 'react-slick';
import {useHistory} from 'react-router-dom';
import "./styles.css";
import Ratings from 'react-ratings-declarative';
import { ProductReview,  Brand, Availability, AddToCart, BuyNow } from "../../../../../constant";
import { Truck, Gift,CreditCard,Clock } from 'react-feather';
import uuid from "react-uuid";


const DisplayIndividualListingSoftwareHelper = (props)  => {

    const history = useHistory();

    const [state, setState] = useState({ nav1: null, nav2: null });
    const [rating,setRating] = useState(0)
    // eslint-disable-next-line
    const [quantity,Setquantity] = useState(1)
    const slider1 = useRef();
    const slider2 = useRef();

    const calculateStatus = (num) => {
        switch (num) {
            case 1:
                return "love"
                break;
            case 2: 
                return "Hot"
                break;
            case 3:
                return "gift"
                break;
            case 4: 
                return "50%"
                break;
            case 5:
                return "sale"
                break;
            default:
                break;
        }
    }

    useEffect(() => {

        setState({
            nav1: slider1.current,
            nav2: slider2.current
          });
      }, []);


    const { nav1, nav2 } = state;
    const generated = Math.floor(Math.random() * 1000) + 1;
    const statusGeneration = Math.floor(Math.random() * 5) + 1;

    const singleItem = {
        status: calculateStatus(statusGeneration),
        id: uuid(),
        name: "Software item",
        note: "Simply dummy text of the printing",
        price: (generated).toString(),
        discountPrice: ((generated - 150 > 0) ? (generated - 150) : 50).toString(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        category: "Digital Software Code Snippet"
    };

    const symbol = "$";

    const  addcart = (product, qty) => {
  
    }
    
    const buyProduct = (product, qty) => {
       
    }

    const addWishList = (product) => {
    
    }

    const changeRating = (newRating) => {
        setRating(newRating)
    }
    
    return (
        <Fragment>
                <Breadcrumb parent="Buy/sell/trade digital software & code" title="Individual Software Product Page"/>
                <Container fluid={true}>
                   <Row>
                       <Col>
                       <Card>
                        <Row className="product-page-main">
                            <Col lg="4" md="12" sm="12" xl="4">
                                <Slider  
                                    asNavFor={nav2} 
                                    arrows= {false}
                                        ref={slider => (slider1.current = slider)} className="product-slider">
                                            {new Array(8).fill("").map((item, i) => {
                                                return (
                                                    <div className="item" key={i}>
                                                        <Media src={require("../../../../../assets/images/big-lightgallry/06.jpg")} alt="" className="img-fluid" />
                                                        {/* require("../../../assets/images/" + item.images) goes in the "<Media/> tag ABOVE ^" */}
                                                    </div>
                                                )
                                            })}   
                                    </Slider>
                                    <Slider 
                                        asNavFor={nav1}
                                        ref={slider => ( slider2.current = slider )}
                                        slidesToShow={4}
                                        swipeToSlide={true}
                                        focusOnSelect={true}
                                        infinite={true}
                                        className="small-slick"
                                    >
                                    {new Array(8).fill("").map((item, i) => {
                                        return (
                                            <div className="item" key={i}>
                                                <Media src={require("../../../../../assets/images/big-lightgallry/06.jpg")} alt="image-product-individual" className="img-fluid" />
                                                {/* require("../../../assets/images/" + item.images) goes in the "<Media/> tag ABOVE ^" */}
                                            </div>
                                        )
                                    })}
                                </Slider>
                            </Col>
                            <Col md="12" sm="12" lg="8" xl="8">
                                <Card> 
                                    <CardBody>
                                    <div className="product-page-details">
                                        <h3>{"Software item - Code(s) snippet"}</h3>
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
                                        <Button  color="primary" className="m-r-10" onClick={() => {
                                            // addcart(singleItem, quantity);
                                            console.log("add to cart...!");
                                        }} >
                                            <i className="fa fa-shopping-basket mr-1"></i>{AddToCart}
                                        </Button>
                                        <Button  color="success" className="m-r-10" onClick={() => {
                                            // buyProduct(singleItem, quantity);
                                            console.log("buy product...!");
                                        }}>
                                            <i className="fa fa-shopping-cart mr-1"></i>{BuyNow}
                                        </Button>
                                        <Button color="secondary" onClick={() => {
                                            // addWishList(singleItem)
                                            console.log("add to wishlist...!");
                                        }}>
                                            <i className="fa fa-heart mr-1"></i>{"Add To WishList"}
                                        </Button>
                                    </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="12" sm="12" lg="12" xl="12">
                                <Card id="card-custom-one-left">
                                    <CardBody>
                                        <div id="force-custom-row">
                                            <Col id="hide-on-small" md="4" sm="6" lg="4" xl="4">
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
                                            </Col>
                                            <Col md="4" sm="6" lg="4" xl="4">
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
                                            </Col>
                                            <Col md="4" sm="6" lg="4" xl="4">
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
                                            </Col>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                    <Tablet /></Col>
                   </Row>
                </Container>
            </Fragment>
    );
}
export default DisplayIndividualListingSoftwareHelper
