import React, { Fragment, useState } from 'react';
import { Search, MapPin } from 'react-feather';
import {Row,Col,Card,CardHeader,CardBody,Input,Label,Button,Collapse } from 'reactstrap';
import { Filters,FindJobs,Industry,SpecificSkills,AllSkills,AllIndustries } from "../../../../../../../constant";


const amountOfCompletedContractsFilterArr = [0, 1, 2, 3, 4, 5, 7, 9, 12, 15, 18, 20]
const amountOfCurrentReviews = [0, 1, 2, 3, 4, 5, 7, 9, 12, 15, 18, 21, 25, 30, 35, 45, 55];
const profileLoveHeartcount = [1, 2, 4, 7, 9, 14, 18, 25, 35, 50, 100, 125, 150, 175, 200, 250];

const HackerDirectoryFilterOptions = ({ selectedQueries, setSelectedQueries }) => {
    
    const [isFilter, setIsFilter] = useState(true);
    const [location, setLocation] = useState(true);
    const [isJobTitle, setisJobTitle] = useState(true);
    const [isIndustry, setisIndustry] = useState(true);
    const [isSkill, setisSkill] = useState(true);

    const filterByAmountOfActiveContracts = (completed) => {
        console.log("filterByAmountOfActiveContracts number of hackers", completed);

        const findIndex = selectedQueries.findIndex((item) => item.type === "hired-active-jobs" && item.hired === completed);

        console.log("findIndex", findIndex);

        if (findIndex !== -1) {

            console.log("INCLUDES!!!");

            setSelectedQueries(prevState => {
                return prevState.filter((item) => (item.type === "hired-active-jobs" && item.hired !== completed) || (item.type !== "hired-active-jobs"));
            })
        } else {
            setSelectedQueries(prevState => {
                return [...prevState, {
                    type: "hired-active-jobs",
                    hired: completed
                }];
            })
        }
    }
    const filterByNumberOfProfileHearts = (hearts) => {
        console.log("filterByNumberOfProfileHearts number of hearts", hearts);

        const findIndex = selectedQueries.findIndex((item) => item.type === "past-hearts" && item.hearts === hearts);

        console.log("findIndex", findIndex);

        if (findIndex !== -1) {

            console.log("INCLUDES!!!");

            setSelectedQueries(prevState => {
                return prevState.filter((item) => (item.type === "past-hearts" && item.hearts !== hearts) || (item.type !== "past-hearts"));
            })
        } else {
            setSelectedQueries(prevState => {
                return [...prevState, {
                    type: "past-hearts",
                    hearts
                }];
            })
        }
    }
    const filterByNumberOfPastReviews = (reviews) => {
        console.log("filterByNumberOfPastReviews number of hackers", reviews);

        const findIndex = selectedQueries.findIndex((item) => item.type === "past-reviews" && item.reviews === reviews);

        console.log("findIndex", findIndex);

        if (findIndex !== -1) {

            console.log("INCLUDES!!!");

            setSelectedQueries(prevState => {
                return prevState.filter((item) => (item.type === "past-reviews" && item.reviews !== reviews) || (item.type !== "past-reviews"));
            })
        } else {
            setSelectedQueries(prevState => {
                return [...prevState, {
                    type: "past-reviews",
                    reviews
                }];
            })
        }
    }

    return (
        <Fragment>
            <Col md="4" lg="4" xl="4" sm="12">
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
                                        <h3 className='sort-category-custom'>Sort By 'Number Of Currently Active Contracts'</h3>
                                        <div className="checkbox-animated">
                                            {amountOfCompletedContractsFilterArr.map((item, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <Label className="d-block" htmlFor={`chk-ani${Math.random()}`}>
                                                            <Input onClick={() => filterByAmountOfActiveContracts(item)} className="checkbox_animated" id={`chk-ani${Math.random()}`} type="checkbox" />{item === 20 ? `${item} total 'active' contracts (currently employed to) or beyond!` : `${item} total 'active' contracts (currently employed to)`}
                                                        </Label>
                                                    </Fragment>
                                                );
                                            })}
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
                                            data-target="#collapseicon1" aria-expanded={location} aria-controls="collapseicon1"><h3 className='sort-category-custom'>Sort By 'Number Of Past Reviews'</h3></Button>
                                    </h5>
                                </CardHeader>
                                <Collapse isOpen={location}>
                                    <CardBody className="animate-chk">
                                        <div className="location-checkbox">
                                            <div className="checkbox-animated">
                                                {amountOfCurrentReviews.map((item, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            <Label className="d-block" htmlFor={`chk-ani${Math.random()}`}>
                                                                <Input onClick={() => filterByNumberOfPastReviews(item)} className="checkbox_animated" id={`chk-ani${Math.random()}`} type="checkbox" />{item === 55 ? `${item} total 'past reviews/contracts' or more!` : `${item} total 'past reviews/contracts'`}
                                                            </Label>
                                                        </Fragment>
                                                    );
                                                })}
                                            </div>
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
                                            data-toggle="collapse" data-target="#collapseicon2" aria-expanded={isJobTitle} aria-controls="collapseicon2"><h3 className='sort-category-custom'>Sort By 'Number Of Profile Hearts/Love's'</h3></Button>
                                    </h5>
                                </CardHeader>
                                <Collapse isOpen={isJobTitle}>
                                    <CardBody className="animate-chk">
                                        <div className="checkbox-animated">
                                            {profileLoveHeartcount.map((item, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <Label className="d-block" htmlFor={`chk-ani${Math.random()}`}>
                                                            <Input onClick={() => filterByNumberOfProfileHearts(item)} className="checkbox_animated" id={`chk-ani${Math.random()}`} type="checkbox" />{`${item} total 'profile loves/hearts' OR more..`}
                                                        </Label>
                                                    </Fragment>
                                                );
                                            })}
                                        </div>
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

export default HackerDirectoryFilterOptions;