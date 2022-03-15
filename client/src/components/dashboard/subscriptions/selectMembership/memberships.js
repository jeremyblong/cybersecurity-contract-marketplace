import React, { Fragment } from 'react';
import Breadcrumb from '../../../../layout/breadcrumb';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import helpers from "./helpers/helperFunctions.js";
import "./styles.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


const { handleTokenPurchase } = helpers;

const PricingSelectMembershipHelper = ({ userData }) => {
    const string = "These tokens can be TRADED, used to apply to various contracts/jobs, tip (add a bonus or additional token(s) after job completion) and SO many other actions! You WILL need these to do most function's on our application..";

    return (
        <Fragment>
        <Breadcrumb parent="Purchase Tokens And/Or Membership's" title="Purchase Various Account 'Enhancements'" />
        <Container fluid={true} >
                <Row>
                <Col sm="12">
                    <Card>
                        <CardHeader> 
                            <h5>Purchase/Subscribe to a 'membership' status/class where you'll get free stuff & various enhancements/bonus-addons for our exclusive {process.env.REACT_APP_APPLICATION_NAME} platform/marketplace..</h5>
                            <p className="lead">Each 'Tier' has specific enhancements and generally, the higher the tier/price-scale, the more enhancements you'll get and the more powerful such enhancements will be! Get free profile boost's, ticket's to exclusive events (periodically emailed out to member's ONLY), and much more! Read our <Link to={userData.accountType === "employers" ? "/frequently/asked/questions/main/employer" : "/frequently/asked/questions/main/hacker"} className={"linked-faq-purchase"}>FAQ (Frequently asked questions) for more information..</Link></p>
                        </CardHeader>
                        <CardBody className="row">
                            <Col md="4" sm="6">
                                <div className="pricingtable card-shadow-purchase-tokens">
                                    <div className="pricingtable-header">
                                        <h3 className="title">Standard/Default Membership</h3>
                                    </div>
                                    <div className="price-value"><span className="currency">{"$"}</span><span className="amount">{"25"}</span><span className="duration">{"/mo"}</span></div>
                                        <ul className="pricing-content">
                                            <li>{"25 Free Tokens Each Month"}</li>
                                            <li>{"Access to 'premier' or 'VIP' areas"}</li>
                                            <li>{"1 Profile Boost Per Month"}</li>
                                            <li>{"1 Ticket To A Restricted Event Per Month"}</li>
                                        </ul>
                                    <div className="pricingtable-signup"><Button color="primary" size="lg">Purchase & Subscribe</Button></div>
                                </div>
                            </Col>
                            <Col md="4" sm="6">
                                <div className="pricingtable card-shadow-purchase-tokens">
                                    <div className="pricingtable-header">
                                        <h3 className="title">Premium Membership</h3>
                                    </div>
                                    <div className="price-value"><span className="currency">{"$"}</span><span className="amount">{"35"}</span><span className="duration">{"/mo"}</span></div>
                                        <ul className="pricing-content">
                                            <li>{"40 Free Tokens Each Month"}</li>
                                            <li>{"Access to 'premier' or 'VIP' areas"}</li>
                                            <li>{"3 Profile Boost Per Month"}</li>
                                            <li>{"2 Tickets To A Restricted Event Per Month"}</li>
                                            <li>{"Earn 1.5x Experience Per Every 1x Earned"}</li>
                                        </ul>
                                    <div className="pricingtable-signup"><Button color="primary" size="lg">Purchase & Subscribe</Button></div>
                                </div>
                            </Col>
                            <Col md="4" sm="6">
                                <div className="pricingtable card-shadow-purchase-tokens">
                                    <div className="pricingtable-header">
                                        <h3 className="title">"The baller" Membership</h3>
                                    </div>
                                    <div className="price-value"><span className="currency">{"$"}</span><span className="amount">{"45"}</span><span className="duration">{"/mo"}</span></div>
                                        <ul className="pricing-content">
                                            <li>{"60 Free Tokens Each Month"}</li>
                                            <li>{"Access to 'premier' or 'VIP' areas"}</li>
                                            <li>{"5 Profile Boost Per Month"}</li>
                                            <li>{"3 Tickets To A Restricted Event Per Month"}</li>
                                            <li>{"Earn 1.5x Experience Per Every 1x Earned"}</li>
                                        </ul>
                                    <div className="pricingtable-signup"><Button color="primary" size="lg">Purchase & Subscribe</Button></div>
                                </div>
                            </Col>
                        </CardBody>
                    </Card>
                    <Card>
                    <CardHeader> 
                        <h5>Purchase "Tokens" to be used throughout our application.</h5>
                        <p className="lead">You can use these to apply to extra jobs, bet/gamble them, purchase participation slots in competitions, promote your profile and much more... (IF you have NOT added a payment method - add one prior AND make it your default or make sure you have a default method on file or we'll use the first card we find in your account otherwise!)</p>
                    </CardHeader>
                    <Row className="card-body pricing-content">
                        <Col xl="3 xl-50" sm="6" className="box-col-6">
                            <Card className="text-center pricing-simple card-shadow-purchase-tokens">
                                <CardBody>
                                    <h3>Purchase 25 Tokens</h3>
                                    <h1 className='code-price-purchase-tokens'>{"$14.99"}</h1>
                                    <h6 className="mb-0">{string}</h6>
                                </CardBody><Button onClick={() => handleTokenPurchase(25, userData)} className="btn-block" size="lg" color="primary">
                                <h5 style={{ color: "white" }} className="mb-0">Purchase 25 Tokens</h5></Button>
                            </Card>
                        </Col>
                        <Col xl="3 xl-50" sm="6" className="box-col-6">
                            <Card className="text-center pricing-simple card-shadow-purchase-tokens">
                                <CardBody>
                                    <h3>Purchase 50 Tokens</h3>
                                    <h1 className='code-price-purchase-tokens'>{"$24.99"}</h1>
                                    <h6 className="mb-0">{string}</h6>
                                </CardBody><Button onClick={() => handleTokenPurchase(50, userData)} className="btn-block" size="lg" color="primary">
                                <h5 style={{ color: "white" }} className="mb-0">Purchase 50 Tokens</h5></Button>
                            </Card>
                        </Col>
                        <Col xl="3 xl-50" sm="6" className="box-col-6">
                            <Card className="text-center pricing-simple card-shadow-purchase-tokens">
                                <CardBody>
                                    <h3>Purchase 100 Tokens</h3>
                                    <h1 className='code-price-purchase-tokens'>{"$39.99"}</h1>
                                    <h6 className="mb-0">{string}</h6>
                                </CardBody><Button onClick={() => handleTokenPurchase(100, userData)} className="btn-block" size="lg" color="primary">
                                <h5 style={{ color: "white" }} className="mb-0">Purchase 100 Tokens</h5></Button>
                            </Card>
                        </Col>
                        <Col xl="3 xl-50" sm="6" className="box-col-6">
                            <Card className="text-center pricing-simple card-shadow-purchase-tokens">
                                <CardBody>
                                    <h3>Purchase 175 Tokens</h3>
                                    <h1 className='code-price-purchase-tokens'>{"$69.99"}</h1>
                                    <h6 className="mb-0">{string}</h6>
                                </CardBody><Button onClick={() => handleTokenPurchase(175, userData)} className="btn-block" size="lg" color="primary">
                                <h5 style={{ color: "white" }} className="mb-0">Purchase 175 Tokens</h5></Button>
                            </Card>
                        </Col>
                    </Row>
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
export default connect(mapStateToProps, {  })(PricingSelectMembershipHelper);