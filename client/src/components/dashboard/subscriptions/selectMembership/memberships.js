import React, { Fragment } from 'react';
import Breadcrumb from '../../../../layout/breadcrumb';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import { SimplePricingCard,BecomeMember, Standard, LorumIpsum, Purchase, Business,Premium,Extra,SignUp } from '../../../../constant';


const PricingSelectMembershipHelper = (props) => {
    const string = "Purchase a nominal amount of 25 tokens - use these tokens to apply to gigs, promote yourself and much more!";
    return (
        <Fragment>
        <Breadcrumb parent="Price" title="Pricing" />
        <Container fluid={true} >
                <Row>
                <Col sm="12">
                    <Card>
                    <CardHeader> 
                        <h5>{BecomeMember}</h5>
                    </CardHeader>
                    <CardBody className="row">
                        <Col md="4" sm="6">
                        <div className="pricingtable">
                            <div className="pricingtable-header">
                            <h3 className="title">{Standard} Membership</h3>
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
                        <div className="pricingtable">
                            <div className="pricingtable-header">
                            <h3 className="title">{Premium} Membership</h3>
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
                        <div className="pricingtable">
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
                        <p className="lead">You can use these to apply to extra jobs, bet/gamble them, purchase participation slots in competitions, promote your profile and much more...</p>
                    </CardHeader>
                    <Row className="card-body pricing-content">
                        <Col xl="3 xl-50" sm="6" className="box-col-6">
                        <Card className="text-center pricing-simple">
                            <CardBody>
                            <h3>Purchase 25 Tokens</h3>
                            <h1>{"$15"}</h1>
                            <h6 className="mb-0">{string}</h6>
                            </CardBody><Button className="btn-block" size="lg" color="primary">
                            <h5 style={{ color: "white" }} className="mb-0">{Purchase} 25 Tokens</h5></Button>
                        </Card>
                        </Col>
                        <Col xl="3 xl-50" sm="6" className="box-col-6">
                        <Card className="text-center pricing-simple">
                            <CardBody>
                            <h3>Purchase 50 Tokens</h3>
                            <h1>{"$25"}</h1>
                            <h6 className="mb-0">{string}</h6>
                            </CardBody><Button className="btn-block" size="lg" color="primary">
                            <h5 style={{ color: "white" }} className="mb-0">{Purchase} 50 Tokens</h5></Button>
                        </Card>
                        </Col>
                        <Col xl="3 xl-50" sm="6" className="box-col-6">
                        <Card className="text-center pricing-simple">
                            <CardBody>
                            <h3>Purchase 100 Tokens</h3>
                            <h1>{"$40"}</h1>
                            <h6 className="mb-0">{string}</h6>
                            </CardBody><Button className="btn-block" size="lg" color="primary">
                            <h5 style={{ color: "white" }} className="mb-0">{Purchase} 100 Tokens</h5></Button>
                        </Card>
                        </Col>
                        <Col xl="3 xl-50" sm="6" className="box-col-6">
                        <Card className="text-center pricing-simple">
                            <CardBody>
                            <h3>Purchase 175 Tokens</h3>
                            <h1>{"$70"}</h1>
                            <h6 className="mb-0">{string}</h6>
                            </CardBody><Button className="btn-block" size="lg" color="primary">
                            <h5 style={{ color: "white" }} className="mb-0">{Purchase} 175 Tokens</h5></Button>
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

export default PricingSelectMembershipHelper;