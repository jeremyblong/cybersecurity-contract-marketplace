import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import "./styles.css";
import { connect } from "react-redux";
import BoostAlreadyPostedEmployerListingPaneHelper from "./sheets/boostEmployerListing/boostListingPosted.js";


const PromoteHomepageSelectionDataHelper = ({ userData }) => {

    const [ employerListingPromotePane, setSheetOpenEmployerListingPromote ] = useState(false);
    const [ listingBoostSelected, setEmployerListingBoostState ] = useState(null);

    const handleSelectionPromoteListing = (selection) => {
        console.log("selection", selection);

        setEmployerListingBoostState(selection);

        setSheetOpenEmployerListingPromote(true);
    }
    return (
        <Fragment>
            <Breadcrumb parent="Purchase Various 'Boosted Data'!" title="Purchase Profile Boost's, Employer Listing Boost's & More...!"/>
            <BoostAlreadyPostedEmployerListingPaneHelper userData={userData} listingBoostSelected={listingBoostSelected} employerListingPromotePane={employerListingPromotePane} setSheetOpenEmployerListingPromote={setSheetOpenEmployerListingPromote} />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader className='b-l-info b-r-info'>  
                                    <h3>Purchase 'Employer Listing / Posted Job(s)' Boosts With The Following Options.. (***ONLY 1 JOB WILL BE PROMOTED/BOOSTED WITH THIS ACTION - SELECT WISELY***)</h3>
                                    <p className='lead'>Purchase <strong>employer listing posted job listing boost's</strong> to promote your posted job to get more views, more applicant's & just overall more traction. This will put your listing before ALL other NON-promoted listing's leading to more view's and interaction generally speaking. We also have a specific page where 'boosted jobs' will appear for people searching for serious work to browse...</p>
                            </CardHeader>
                            <CardBody className="row">
                                <Col md="4" sm="6">
                                    <div className="pricingtable pricingtable-customized-min">
                                        <div className="pricingtable-header pricing-header-customized">
                                            <h3 className="title first-row-title">Standard Employer Posted Job/Listing Boost/Promo</h3>
                                            <hr />
                                            <p className='lead-boost-purchase'>This is a <strong>'Standard' package/boost</strong> which means it is the typical/average or most commonly purchased boost type. You will recieve the following with this boost purchase...</p>
                                        </div>
                                        <div className="price-value"><span className="currency">{"$"}</span><span className="amount">{"10"}</span><br /><span className="duration">{"/Boost"}</span></div>
                                        <ul className="pricing-content">
                                            <li>{"1 Day Promo Period"}</li>
                                            <li>{"Shows Your Listing Before Other Un-Boosted"}</li>
                                            <li>{"Access to special members/boosted account ONLY restricted content/data"}</li>
                                        </ul>
                                        <div className="pricingtable-signup"><Button onClick={() => handleSelectionPromoteListing("tier-1")} color="primary" size="lg">Select & Proceed!</Button></div>
                                    </div>
                                </Col>
                                <Col md="4" sm="6">
                                    <div className="pricingtable pricingtable-customized-min">
                                        <div className="pricingtable-header pricing-header-customized">
                                            <h3 className="title first-row-title">Mid-Grade Employer Posted Job/Listing Boost/Promo</h3>
                                            <hr />
                                            <p className='lead-boost-purchase'>This is a <strong>'Mid-Grade' package/boost</strong> which means it is a 'step-up' from the previous boost tier and will give you added 'perks' with the increased cost. You will recieve the following with this boost purchase...</p>
                                        </div>
                                        <div className="price-value"><span className="currency">{"$"}</span><span className="amount">{"30"}</span><br /><span className="duration">{"/Boost"}</span></div>
                                        <ul className="pricing-content">
                                            <li>{"2 Day(s) Promo Period"}</li>
                                            <li>{"Shows Your Listing Before Other Un-Boosted"}</li>
                                            <li>{"Highlight's Normal Listing W/Neon Outline Drawing More Attention"}</li>
                                            <li>{"Access to special members/boosted account ONLY restricted content/data"}</li>
                                        </ul>
                                        <div className="pricingtable-signup"><Button onClick={() => handleSelectionPromoteListing("tier-2")} color="primary" size="lg">Select & Proceed!</Button></div>
                                    </div>
                                </Col>
                                <Col md="4" sm="6">
                                    <div className="pricingtable pricingtable-customized-min">
                                        <div className="pricingtable-header pricing-header-customized">
                                            <h3 className="title first-row-title">Premium Employer Posted Job/Listing Boost/Promo</h3>
                                            <hr />
                                            <p className='lead-boost-purchase'>This is a <strong>'Premium' package/boost</strong> which means it is a 'step-up' from the previous boost tier and will give you added 'perks' with the increased cost, this is the HIGHEST/BEST tier with the MOST elevated privileges and viewablity. You will recieve the following with this boost purchase...</p>
                                        </div>
                                        <div className="price-value"><span className="currency">{"$"}</span><span className="amount">{"50"}</span><br /><span className="duration">{"/Boost"}</span></div>
                                        <ul className="pricing-content">
                                            <li>{"3 Day(s) Promo Period"}</li>
                                            <li>{"Shows Your Listing Before ALL Others"}</li>
                                            <li>{"Shown in 'Premium' Section As Well"}</li>
                                            <li>{"Highlight's Normal Listing W/Neon Outline Drawing More Attention"}</li>
                                            <li>{"Access to special members/boosted account ONLY restricted content/data"}</li>
                                        </ul>
                                        <div className="pricingtable-signup"><Button onClick={() => handleSelectionPromoteListing("tier-3")} color="primary" size="lg">Select & Proceed!</Button></div>
                                    </div>
                                </Col>
                                <hr className='hr-pricing' />
                                <CardHeader className='b-l-secondary b-r-secondary'>
                                    <h3>Purchase 'Profile' Boosts With The Following Options..</h3>
                                    <p className='lead'>Purchase <strong>profile boost's</strong> to promote your profile BEFORE other user's NON-promoted profile's. This will show your profile <strong>much more frequently & sooner</strong> than other non promoted account's. This will draw more attention to your profile which will hopefully lead to more traction/leads & more overall work!</p>
                                </CardHeader>
                                <hr />
                                <Col md="4" sm="6">
                                    <div className="pricingtable pricingtable-customized-min-row-two">
                                        <div className="pricingtable-header pricing-header-customized">
                                            <h3 className="title second-row-title">Standard 'Profile' (Boost's Your Actual Profile Itself) Boost/Promo</h3>
                                            <hr />
                                            <p className='lead-boost-purchase'>This is a <strong>'Standard' package/boost</strong> which means it is the typical/average or most commonly purchased boost type. You will recieve the following with this boost purchase...</p>
                                        </div>
                                        <div className="price-value"><span className="currency">{"$"}</span><span className="amount">{"15"}</span><br /><span className="duration">{"/Boost"}</span></div>
                                        <ul className="pricing-content">
                                            <li>{"3 Day Promo Period"}</li>
                                            <li>{"Shows Your 'Profile' Before Other Un-Boosted"}</li>
                                            <li>{"Access to special members/boosted account ONLY restricted content/data"}</li>
                                        </ul>
                                        <div className="pricingtable-signup"><Button color="secondary" size="lg">Select & Proceed!</Button></div>
                                    </div>
                                </Col>
                                <Col md="4" sm="6">
                                    <div className="pricingtable pricingtable-customized-min-row-two">
                                        <div className="pricingtable-header pricing-header-customized">
                                            <h3 className="title second-row-title">Mid-Grade 'Profile' (Boost's Your Actual Profile Itself) Boost/Promo</h3>
                                            <hr />
                                            <p className='lead-boost-purchase'>This is a <strong>'Mid-Grade' package/boost</strong> which means it is a 'step-up' from the previous boost tier and will give you added 'perks' with the increased cost. You will recieve the following with this boost purchase...</p>
                                        </div>
                                        <div className="price-value"><span className="currency">{"$"}</span><span className="amount">{"35"}</span><br /><span className="duration">{"/Boost"}</span></div>
                                        <ul className="pricing-content">
                                            <li>{"7 Day(s) Promo Period"}</li>
                                            <li>{"Shows Your 'Profile' Before Other Un-Boosted"}</li>
                                            <li>{"Highlight's Normal 'Profile' W/Neon Outline Drawing More Attention"}</li>
                                            <li>{"Access to special members/boosted account ONLY restricted content/data"}</li>
                                        </ul>
                                        <div className="pricingtable-signup"><Button color="secondary" size="lg">Select & Proceed!</Button></div>
                                    </div>
                                </Col>
                                <Col md="4" sm="6">
                                    <div className="pricingtable pricingtable-customized-min-row-two">
                                        <div className="pricingtable-header pricing-header-customized">
                                            <h3 className="title second-row-title">Premium 'Profile' (Boost's Your Actual Profile Itself) Boost/Promo</h3>
                                            <hr />
                                            <p className='lead-boost-purchase'>This is a <strong>'Premium' package/boost</strong> which means it is a 'step-up' from the previous boost tier and will give you added 'perks' with the increased cost, this is the HIGHEST/BEST tier with the MOST elevated privileges and viewablity. You will recieve the following with this boost purchase...</p>
                                        </div>
                                        <div className="price-value"><span className="currency">{"$"}</span><span className="amount">{"55"}</span><br /><span className="duration">{"/Boost"}</span></div>
                                        <ul className="pricing-content">
                                            <li>{"10 Day(s) Promo Period"}</li>
                                            <li>{"Shows Your 'Profile' Before ALL Others"}</li>
                                            <li>{"Shown in 'Premium' Profile's Section As Well"}</li>
                                            <li>{"Highlight's Normal 'Profile' W/Neon Outline Drawing More Attention"}</li>
                                            <li>{"Access to special members/boosted account ONLY restricted content/data"}</li>
                                        </ul>
                                        <div className="pricingtable-signup"><Button color="secondary" size="lg">Select & Proceed!</Button></div>
                                    </div>
                                </Col>
                            </CardBody>
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
export default connect(mapStateToProps, {})(PromoteHomepageSelectionDataHelper);