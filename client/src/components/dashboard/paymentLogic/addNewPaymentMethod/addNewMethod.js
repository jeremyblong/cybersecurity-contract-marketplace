import React, { Fragment, useState, useEffect, useRef } from "react";
import "./styles.css";
import { Container, Row, Col, Button, Card, CardBody, Media, Input, FormGroup, Form, CardHeader } from 'reactstrap';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Breadcrumb from '../../../../layout/breadcrumb';
import BottomAddNewPaymentMethodTabbedHelper from './helpers/bottomTabbed/bottomTabbedHelper.js';
import Ratings from 'react-ratings-declarative'
import { ProductReview,  Brand, Availability, AddToCart, BuyNow } from "../../../../constant";
import Cards from 'react-credit-cards';
import DatePicker from 'react-date-picker';
import moment from "moment";

const PaymentMethodsAddNewPaymentMethodHelper = ({ userData }) => {

    const [state, setState] = useState({ nav1: null, nav2: null });
    const [rating,setRating] = useState(0);

    const [ cardInfo, setCardInfo ] = useState({
        cvc: "",
        expiry: "",
        focus: "",
        name: "",
        number: ""
    })

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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setCardInfo(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }
    const { nav1, nav2 } = state;
    return (
        <Fragment>
            <Breadcrumb parent="Manage Your Active Payment Method's" title="Add A New Payment Method(s)"/>
            <Container fluid={true}>
                <Row>
                    <Col>
                    <Card>
                    <Row className="product-page-main">
                        <Col lg="7" sm="12" md="7" xl="7 xl-100">
                            <Card className="height-equal credit-form">
                                <CardHeader className="py-4">
                                    <h5>Add a Credit/Debit Card</h5>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col md="7">
                                            <Form className="theme-form mega-form">
                                                <FormGroup>
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        name="number"
                                                        value={cardInfo.number}
                                                        placeholder="Enter your card number.."
                                                        onChange={(e) => handleInputChange(e)}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        name="name"
                                                        value={cardInfo.name}
                                                        placeholder="Name (Full Name - First/Last)"
                                                        onChange={(e) => handleInputChange(e)}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Row>
                                                        <select onChange={(e) => {
                                                            const value = e.target.value;

                                                            if (value !== "") {
                                                        
                                                                cardInfo.expiry = value + cardInfo.expiry.substring(2, 5);

                                                                setCardInfo(prevState => {
                                                                    return {
                                                                        ...prevState,
                                                                        expiry: cardInfo.expiry
                                                                    }
                                                                })
                                                            }
                                                        }} style={{ marginLeft: "15px" }} className="form-control digits year-date-format" name='expireMM' id='expireMM'>
                                                            <option value=''>Select a month</option>
                                                            <option value='01'>January</option>
                                                            <option value='02'>February</option>
                                                            <option value='03'>March</option>
                                                            <option value='04'>April</option>
                                                            <option value='05'>May</option>
                                                            <option value='06'>June</option>
                                                            <option value='07'>July</option>
                                                            <option value='08'>August</option>
                                                            <option value='09'>September</option>
                                                            <option value='10'>October</option>
                                                            <option value='11'>November</option>
                                                            <option value='12'>December</option>
                                                        </select> 
                                                        <select onChange={(e) => {
                                                            const value = e.target.value;

                                                            if (value !== "") {
                                                                
                                                                cardInfo.expiry = cardInfo.expiry.substring(0, 2) + value;

                                                                setCardInfo(prevState => {
                                                                    return {
                                                                        ...prevState,
                                                                        expiry: cardInfo.expiry
                                                                    }
                                                                })
                                                            }
                                                        }} className="form-control digits year-date-format" name='expireYY' id='expireYY'>
                                                            <option value=''>Select a year</option>
                                                            <option value='20'>2020</option>
                                                            <option value='21'>2021</option>
                                                            <option value='22'>2022</option>
                                                            <option value='23'>2023</option>
                                                            <option value='24'>2024</option>
                                                            <option value='25'>2025</option>
                                                            <option value='26'>2026</option>
                                                            <option value='27'>2027</option>
                                                            <option value='28'>2028</option>
                                                            <option value='29'>2029</option>
                                                            <option value='30'>2030</option>
                                                            <option value='31'>2031</option>
                                                            <option value='32'>2032</option>
                                                            <option value='33'>2033</option>
                                                            <option value='34'>2034</option>
                                                            <option value='35'>2035</option>
                                                            <option value='36'>2036</option>
                                                        </select> 
                                                    </Row>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        name="cvc"
                                                        placeholder="CVC... (Security Code On Back)"
                                                        value={cardInfo.cvc}
                                                        onChange={(e) => handleInputChange(e)}
                                                    />
                                                </FormGroup>
                                            </Form>
                                        </Col>
                                        <Col md="5" className="text-center">
                                            <Cards
                                                cvc={cardInfo.cvc}
                                                expiry={cardInfo.expiry}
                                                focused={cardInfo.focus}
                                                name={cardInfo.name}
                                                number={cardInfo.number}
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                                </Card>
                        </Col>
                        <Col lg="5" sm="12" md="5" xl="5 xl-100">
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
                    </Row>
                </Card>
                <BottomAddNewPaymentMethodTabbedHelper /></Col>
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
export default connect(mapStateToProps, {  })(PaymentMethodsAddNewPaymentMethodHelper);