import React, { Fragment, useState } from 'react';
import { Search, MapPin } from 'react-feather';
import {Row,Col,Card,CardHeader,CardBody,Input,Label,Button,Collapse } from 'reactstrap';
import { Filters,Location,FindJobs,AllLocations,AllJobTitle,Industry,SpecificSkills,AllSkills,JobTitle,AllIndustries } from "../../../../../../../../constant";

const JobFilter = () => {
    
    const [isFilter, setIsFilter] = useState(true);
    const [location, setLocation] = useState(true);
    const [isJobTitle, setisJobTitle] = useState(true);
    const [isIndustry, setisIndustry] = useState(true);
    const [isSkill, setisSkill] = useState(true);

    return (
        <Fragment>
            <Col xl="3 xl-40">
                <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc">
                    <Row>
                        <Col xl="12">
                            <Card>
                                <CardHeader>
                                    <h5 className="mb-0">
                                        <Button color="link pl-0" data-toggle="collapse" onClick={() => setIsFilter(!isFilter)}
                                            data-target="#collapseicon" aria-expanded={isFilter} aria-controls="collapseicon">{Filters}</Button>
                                    </h5>
                                </CardHeader>
                                <Collapse isOpen={isFilter}>
                                    <CardBody className="filter-cards-view animate-chk">
                                        <div className="job-filter">
                                            <div className="faq-form">
                                                <Input className="form-control" type="text" placeholder="Search.." />
                                                <Search className="search-icon" />
                                            </div>
                                        </div>
                                        <div className="job-filter">
                                            <div className="faq-form">
                                                <Input className="form-control" type="text" placeholder="location.." />
                                                <MapPin className="search-icon" />
                                            </div>
                                        </div>
                                        <div className="checkbox-animated">
                                            <Label className="d-block" htmlFor="chk-ani">
                                                <Input className="checkbox_animated" id="chk-ani" type="checkbox" />{"Full-time (8688)"}
                                            </Label>
                                            <Label className="d-block" htmlFor="chk-ani1">
                                                <Input className="checkbox_animated" id="chk-ani1" type="checkbox" />{"Contract (503)"}
                                            </Label>
                                            <Label className="d-block" htmlFor="chk-ani2">
                                                <Input className="checkbox_animated" id="chk-ani2" type="checkbox" />{"Part-time (288)"}
                                            </Label>
                                            <Label className="d-block" htmlFor="chk-ani3">
                                                <Input className="checkbox_animated" id="chk-ani3" type="checkbox" />{"Internship (236)"}
                                            </Label>
                                            <Label className="d-block" htmlFor="chk-ani4">
                                                <Input className="checkbox_animated" id="chk-ani4" type="checkbox" />{"Temporary (146)"}
                                            </Label>
                                            <Label className="d-block" htmlFor="chk-ani5">
                                                <Input className="checkbox_animated" id="chk-ani5" type="checkbox" />{"Commission (25)"}
                                            </Label>
                                        </div>
                                        <Button color="primary" className="text-center">{FindJobs}</Button>
                                    </CardBody>
                                </Collapse>
                            </Card>
                        </Col>

                        <Col xl="12">
                            <Card>
                                <CardHeader>
                                    <h5 className="mb-0">
                                        <Button color="link pl-0" data-toggle="collapse" onClick={() => setLocation(!location)}
                                            data-target="#collapseicon1" aria-expanded={location} aria-controls="collapseicon1">Program Features</Button>
                                    </h5>
                                </CardHeader>
                                <Collapse isOpen={location}>
                                    <CardBody className="animate-chk">
                                        <div className="location-checkbox">
                                            <Label className="d-block" htmlFor="chk-ani6">
                                                <Input className="checkbox_animated" id="chk-ani6" type="checkbox" />
                                                {"IBB"}<span className="d-block">{"220 Listings"}</span>
                                            </Label>
                                            <Label className="d-block" htmlFor="chk-ani7">
                                                <Input className="checkbox_animated" id="chk-ani7" type="checkbox" />
                                                {"Offers bounties"}<span className="d-block">{"700 Listings"}</span>
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani8">
                                                <Input className="checkbox_animated" id="chk-ani8" type="checkbox" />
                                                {"High response efficiency"}<span className="d-block">{"477 Listings"}</span>
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani9">
                                                <Input className="checkbox_animated" id="chk-ani9" type="checkbox" />
                                                {"Managed by CyberHunt"}<span className="d-block">{"905 Listings"}</span>
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani10">
                                                <Input className="checkbox_animated" id="chk-ani10" type="checkbox" />
                                                {"Offers retesting"}<span className="d-block">{"101 Listings"}</span>
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani10">
                                                <Input className="checkbox_animated" id="chk-ani10" type="checkbox" />
                                                {"Active programs"}<span className="d-block">{"54 Listings"}</span>
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani10">
                                                <Input className="checkbox_animated" id="chk-ani10" type="checkbox" />
                                                {"Bounty splitting"}<span className="d-block">{"665 Listings"}</span>
                                            </Label>
                                        </div>
                                    </CardBody>
                                    <Button className="btn-block text-center" color="primary">All Program Types</Button>
                                </Collapse>
                            </Card>
                        </Col>
                        <Col xl="12">
                            <Card>
                                <CardHeader>
                                    <h5 className="mb-0">
                                        <Button color="link pl-0" onClick={() => setisJobTitle(!isJobTitle)}
                                            data-toggle="collapse" data-target="#collapseicon2" aria-expanded={isJobTitle} aria-controls="collapseicon2">Asset Type</Button>
                                    </h5>
                                </CardHeader>
                                <Collapse isOpen={isJobTitle}>
                                    <CardBody className="animate-chk">
                                        <Label className="d-block" htmlFor="chk-ani11">
                                            <Input className="checkbox_animated" id="chk-ani11" type="checkbox" />
                                            {"Any"}
                                        </Label>
                                        <Label className="d-block" htmlFor="chk-ani12">
                                            <Input className="checkbox_animated" id="chk-ani12" type="checkbox" />
                                            {"CIDR"}
                                        </Label>
                                        <Label className="d-block" htmlFor="chk-ani14">
                                            <Input className="checkbox_animated" id="chk-ani14" type="checkbox" />
                                            {"Domain"}
                                        </Label>
                                        <Label className="d-block" htmlFor="chk-ani15">
                                            <Input className="checkbox_animated" id="chk-ani15" type="checkbox" />
                                            {"iOS: App Store"}
                                        </Label>
                                        <Label className="d-block" htmlFor="chk-ani16">
                                            <Input className="checkbox_animated" id="chk-ani16" type="checkbox" />
                                            {"iOS: Testflight"}
                                        </Label>
                                        <Label className="d-block" htmlFor="chk-ani17">
                                            <Input className="checkbox_animated" id="chk-ani17" type="checkbox" />
                                            {"iOS: .ipa"}
                                        </Label>
                                        <Label className="d-block" htmlFor="chk-ani18">
                                            <Input className="checkbox_animated" id="chk-ani18" type="checkbox" />
                                            {"Android: Play Store"}
                                        </Label>
                                        <Label className="d-block" htmlFor="chk-ani19">
                                            <Input className="checkbox_animated" id="chk-ani19" type="checkbox" />
                                            {"Android: .apk"}
                                        </Label>
                                        <Label className="d-block" htmlFor="chk-ani20">
                                            <Input className="checkbox_animated" id="chk-ani20" type="checkbox" />
                                            {"Windows: Microsoft Store"}
                                        </Label>
                                        <Label className="d-block" htmlFor="chk-ani21">
                                            <Input className="checkbox_animated" id="chk-ani21" type="checkbox" />
                                            {"Source Code"}
                                        </Label>
                                        <Label className="d-block" htmlFor="chk-ani22">
                                            <Input className="checkbox_animated" id="chk-ani22" type="checkbox" />
                                            {"Executable"}
                                        </Label>
                                        <Label className="d-block" htmlFor="chk-ani23">
                                            <Input className="checkbox_animated" id="chk-ani23" type="checkbox" />
                                            {"Hardware/IoT"}
                                        </Label>
                                        <Label className="d-block" htmlFor="chk-ani24">
                                            <Input className="checkbox_animated" id="chk-ani24" type="checkbox" />
                                            {"External Network Testing"}
                                        </Label>
                                        <Label className="d-block" htmlFor="chk-ani25">
                                            <Input className="checkbox_animated" id="chk-ani25" type="checkbox" />
                                            {"Internal Network Testing"}
                                        </Label>
                                        <Label className="d-block" htmlFor="chk-ani26">
                                            <Input className="checkbox_animated" id="chk-ani26" type="checkbox" />
                                            {"Social Engineering Testing"}
                                        </Label>
                                        <Label className="d-block" htmlFor="chk-ani27">
                                            <Input className="checkbox_animated" id="chk-ani27" type="checkbox" />
                                            {"Physical/On-Site Testing"}
                                        </Label>
                                        <Label className="d-block mb-0" htmlFor="chk-ani28">
                                            <Input className="checkbox_animated" id="chk-ani28" type="checkbox" />
                                            {"Wireless Testing"}
                                        </Label>
                                    </CardBody>
                                    <Button className="btn-block text-center" color="primary">View All Asset Types</Button>
                                </Collapse>
                            </Card>
                        </Col>
                        <Col xl="12">
                            <Card>
                                <CardHeader>
                                    <h5 className="mb-0">
                                        <Button color="link pl-0" onClick={() => setisIndustry(!isIndustry)}
                                            data-toggle="collapse" data-target="#collapseicon3" aria-expanded={isIndustry} aria-controls="collapseicon3">{Industry}</Button>
                                    </h5>
                                </CardHeader>
                                <Collapse isOpen={isIndustry}>
                                    <div className="collapse show" id="collapseicon3" data-parent="#accordion" aria-labelledby="collapseicon3">
                                        <CardBody className="animate-chk">
                                            <Label className="d-block" htmlFor="chk-ani16">
                                                <Input className="checkbox_animated" id="chk-ani16" type="checkbox" />
                                                {"Computer Software(14)"}
                                            </Label>
                                            <Label className="d-block" htmlFor="chk-ani17">
                                                <Input className="checkbox_animated" id="chk-ani17" type="checkbox" />
                                                {"IT Engineer(10)"}
                                            </Label>
                                            <Label className="d-block" htmlFor="chk-ani18">
                                                <Input className="checkbox_animated" id="chk-ani18" type="checkbox" />
                                                {"Service industry(20)"}
                                            </Label>
                                            <Label className="d-block" htmlFor="chk-ani19">
                                                <Input className="checkbox_animated" id="chk-ani19" type="checkbox" />
                                                {"Accounting(34)"}
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani20">
                                                <Input className="checkbox_animated" id="chk-ani20" type="checkbox" />
                                                {"Financial Services(5)"}
                                            </Label>
                                        </CardBody>
                                        <Button className="btn-block text-center" color="primary">{AllIndustries}</Button>
                                    </div>
                                </Collapse>
                            </Card>
                        </Col>
                        <Col xl="12">
                            <Card>
                                <CardHeader>
                                    <h5 className="mb-0">
                                        <Button color="link pl-0" onClick={() => setisSkill(!isSkill)}
                                            data-toggle="collapse" data-target="#collapseicon4" aria-expanded={isSkill} aria-controls="collapseicon4">{SpecificSkills}</Button>
                                    </h5>
                                </CardHeader>
                                <Collapse isOpen={isSkill}>
                                    <div className="collapse show" id="collapseicon4" data-parent="#accordion" aria-labelledby="collapseicon4">
                                        <CardBody className="animate-chk">
                                            <Label className="d-block" htmlFor="chk-ani21">
                                                <Input className="checkbox_animated" id="chk-ani21" type="checkbox" />
                                                {"HTML,scss & sass"}
                                             </Label>
                                            <Label className="d-block" htmlFor="chk-ani22">
                                                <Input className="checkbox_animated" id="chk-ani22" type="checkbox" />
                                                {"Javascript"}
                                             </Label>
                                            <Label className="d-block" htmlFor="chk-ani23">
                                                <Input className="checkbox_animated" id="chk-ani23" type="checkbox" />
                                                {"Node.js"}
                                             </Label>
                                            <Label className="d-block" htmlFor="chk-ani24">
                                                <Input className="checkbox_animated" id="chk-ani24" type="checkbox" />
                                                {"Gulp & Pug"}
                                             </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani25">
                                                <Input className="checkbox_animated" id="chk-ani25" type="checkbox" />
                                                {"Angular.js"}
                                             </Label>
                                        </CardBody>
                                        <Button className="btn-block text-center" color="primary">{AllSkills}</Button>
                                    </div>
                                </Collapse>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Fragment>
    );
};

export default JobFilter;