import React, { Fragment, useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Input, Label, Button, Collapse, Container } from 'reactstrap';
import { Location, AllLocations, AllJobTitle, Industry, JobTitle, AllIndustries } from "../../../../../../constant";
import "./styles.css";
import helpers from "./helpers/helperLogic.js";



const { statesArray, assetTypes, industries } = helpers;

const FilterListingResultsAuctionsPaneHelper = () => {

    return (
        <Fragment>
            <Container fluid={true}>
                <Row style={{ marginTop: "32.5px" }}>
                    <Col sm="12" md="12" lg="12 lg-100" xl="12 xl-100">
                        <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc">
                            <Row>
                                <Col sm="12" lg="3" md="3" xl="3">
                                    <Card className='slide-up-auction-card-wrapper'>
                                        <CardHeader>
                                            <h5 className="mb-0">
                                                <Button color="link pl-0">Number Of Active Bids/Bets  </Button>
                                            </h5>
                                        </CardHeader>
                                        <Collapse isOpen={true}>
                                            <CardBody className="animate-chk">
                                                <div className="location-checkbox">
                                                    <Label className="d-block" htmlFor="chk-ani6">
                                                        <Input className="checkbox_animated" id="chk-ani6" type="checkbox" />
                                                        {"1 Active Bidder"}<span className="d-block">{"1 (One Bidder)"}</span>
                                                    </Label>
                                                    <Label className="d-block" htmlFor="chk-ani7">
                                                        <Input className="checkbox_animated" id="chk-ani6" type="checkbox" />
                                                        {"2 Active Bidder's"}<span className="d-block">{"2 (Two Bidder's)"}</span>
                                                    </Label>
                                                    <Label className="d-block" htmlFor="chk-ani8">
                                                        <Input className="checkbox_animated" id="chk-ani6" type="checkbox" />
                                                        {"3 Active Bidder's"}<span className="d-block">{"3 (Three Bidder's)"}</span>
                                                    </Label>
                                                    <Label className="d-block" htmlFor="chk-ani9">
                                                        <Input className="checkbox_animated" id="chk-ani6" type="checkbox" />
                                                        {"4 Active Bidder's"}<span className="d-block">{"4 (Four Bidder's)"}</span>
                                                    </Label>
                                                    <Label className="d-block" htmlFor="chk-ani10">
                                                        <Input className="checkbox_animated" id="chk-ani6" type="checkbox" />
                                                        {"5 Active Bidder's"}<span className="d-block">{"5 (Five Bidder's)"}</span>
                                                    </Label>
                                                    <Label className="d-block" htmlFor="chk-ani10">
                                                        <Input className="checkbox_animated" id="chk-ani6" type="checkbox" />
                                                        {"6-10 Active Bidder's"}<span className="d-block">{"6-10 (Six to Ten Bidder's)"}</span>
                                                    </Label>
                                                    <Label className="d-block" htmlFor="chk-ani10">
                                                        <Input className="checkbox_animated" id="chk-ani6" type="checkbox" />
                                                        {"11-15 Active Bidder's"}<span className="d-block">{"11-15 (Eleven to Fifteen Bidder's)"}</span>
                                                    </Label>
                                                    <Label className="d-block" htmlFor="chk-ani10">
                                                        <Input className="checkbox_animated" id="chk-ani6" type="checkbox" />
                                                        {"16-25 Active Bidder's"}<span className="d-block">{"16-25 (Sixteen to Twenty-Five Bidder's)"}</span>
                                                    </Label>
                                                    <Label className="d-block" htmlFor="chk-ani10">
                                                        <Input className="checkbox_animated" id="chk-ani6" type="checkbox" />
                                                        {"26-49 Active Bidder's"}<span className="d-block">{"26-49 (Twenty-Six to Fourty-Nine Bidder's)"}</span>
                                                    </Label>
                                                    <Label className="d-block" htmlFor="chk-ani10">
                                                        <Input className="checkbox_animated" id="chk-ani6" type="checkbox" />
                                                        {"50+ Active Bidder's"}<span className="d-block">{"50+ (Fifty Plus Bidder's)"}</span>
                                                    </Label>
                                                </div>
                                            </CardBody>
                                            <Button className="btn-block text-center btn-push-bottom-auction" color="info">{AllLocations}</Button>
                                        </Collapse>
                                    </Card>
                                </Col>
                                <Col sm="12" lg="3" md="3" xl="3">
                                    <Card className='slide-up-auction-card-wrapper'>
                                        <CardHeader>
                                            <h5 className="mb-0">
                                                <Button color="link pl-0">Location Of Various Hack's  </Button>
                                            </h5>
                                        </CardHeader>
                                        <Collapse isOpen={true}>
                                            <CardBody className="animate-chk location-checkbox-auction-overflow">
                                                <div className="location-checkbox location-checkbox-auction-overflow-inner">
                                                    {statesArray.map((location, index) => {
                                                        return (
                                                            <Fragment key={index}>
                                                                <Label className="d-block checkbox-solid-info" htmlFor="chk-ani6">
                                                                    <Input className="checkbox_animated" id="chk-ani6" type="checkbox" />
                                                                    {location.name}<span className="d-block">{location.abbreviation}</span>
                                                                </Label>
                                                            </Fragment>
                                                        );
                                                    })}
                                                </div>
                                            </CardBody>
                                            <Button className="btn-block text-center btn-push-bottom-auction" color="secondary">{AllLocations}</Button>
                                        </Collapse>
                                    </Card>
                                </Col>
                                <Col sm="12" lg="3" md="3" xl="3">
                                    <Card className='slide-up-auction-card-wrapper'>
                                        <CardHeader>
                                            <h5 className="mb-0">
                                                <Button color="link pl-0">Asset Types (Physical & Digital)</Button>
                                            </h5>
                                        </CardHeader>
                                        <Collapse isOpen={true}>
                                            <CardBody className="animate-chk location-checkbox-auction-overflow">
                                                <div className="location-checkbox location-checkbox-auction-overflow-inner">
                                                    {assetTypes.map((asset, index) => {
                                                        return (
                                                            <Fragment key={index}>
                                                                <Label className="d-block checkbox-solid-info" htmlFor="chk-ani6">
                                                                    <Input className="checkbox_animated" id="chk-ani6" type="checkbox" />
                                                                    {asset.label}<span className="d-block">{asset.type}</span>
                                                                </Label>
                                                            </Fragment>
                                                        );
                                                    })}
                                                </div>
                                            </CardBody>
                                            <Button className="btn-block text-center btn-push-bottom-auction" color="info">{AllJobTitle}</Button>
                                        </Collapse>
                                    </Card>
                                </Col>
                                <Col sm="12" lg="3" md="3" xl="3">
                                    <Card className='slide-up-auction-card-wrapper'>
                                        <CardHeader>
                                            <h5 className="mb-0">
                                                <Button color="link pl-0">Something Here</Button>
                                            </h5>
                                        </CardHeader>
                                        <Collapse isOpen={true}>
                                            <div className="collapse show" id="collapseicon3" data-parent="#accordion" aria-labelledby="collapseicon3">
                                                <CardBody className="animate-chk location-checkbox-auction-overflow">
                                                    <div className="location-checkbox location-checkbox-auction-overflow-inner">
                                                        {industries.map((industry, index) => {
                                                            return (
                                                                <Fragment key={index}>
                                                                    <Label className="d-block checkbox-solid-info" htmlFor="chk-ani6">
                                                                        <Input className="checkbox_animated" id="chk-ani6" type="checkbox" />
                                                                        {industry}<span className="d-block">{industry}</span>
                                                                    </Label>
                                                                </Fragment>
                                                            );
                                                        })}
                                                    </div>
                                                </CardBody>
                                                <Button className="btn-block text-center btn-push-bottom-auction" color="secondary">{AllIndustries}</Button>
                                            </div>
                                        </Collapse>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default FilterListingResultsAuctionsPaneHelper;