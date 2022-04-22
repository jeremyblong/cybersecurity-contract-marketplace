import React, { Fragment, useState } from 'react';
import { Search, MapPin } from 'react-feather';
import {Row,Col,Card,CardHeader,CardBody,Input,Label,Button,Collapse } from 'reactstrap';
import { AllSkills } from "../../../../../../../../constant";

const applicantNumberArray = [3, 6, 10, 15, 20, 30, 40, 50, 60, 75, 90, 100, 200, 300];

const JobFilter = ({ selectedQueries, setSelectedQueries }) => {
    
    const [isFilter, setIsFilter] = useState(true);
    const [location, setLocation] = useState(true);
    const [isJobTitle, setisJobTitle] = useState(true);
    const [isIndustry, setisIndustry] = useState(true);
    const [isSkill, setisSkill] = useState(true);


    const handleHackTypeChange = (value) => {

        if (selectedQueries.includes(value)) {
            setSelectedQueries(prevState => {
                return prevState.filter((item) => item !== value);
            })
        } else {
            setSelectedQueries(prevState => {
                return [...prevState, value];
            })
        }
    }
    const handleLikeDislikeChange = (filterType) => {
        console.log("handleLikeDislikeChange filterType..", filterType);
        
        // likes filtration
        if (filterType === "likes") {
            if (selectedQueries.includes("filter-by-likes-highest")) {
                setSelectedQueries(prevState => {
                    return prevState.filter((item) => item !== "filter-by-likes-highest");
                })
            } else {
                setSelectedQueries(prevState => {
                    return [...prevState, "filter-by-likes-highest"].filter((item) => item !== "filter-by-dislikes-highest");
                })
            }
        } else {
            // dislikes filtration
            if (selectedQueries.includes("filter-by-dislikes-highest")) {
                setSelectedQueries(prevState => {
                    return prevState.filter((item) => item !== "filter-by-dislikes-highest");
                })
            } else {
                setSelectedQueries(prevState => {
                    return [...prevState, "filter-by-dislikes-highest"].filter((item) => item !== "filter-by-likes-highest");
                })
            }
        }
    }
    const handleHackerCountRequired = (numOfHackers) => {
        console.log("handleHackerCountRequired number of hackers", numOfHackers);

        const findIndex = selectedQueries.findIndex((item) => item.type === "required-hackers" && item.num === numOfHackers);

        console.log("findIndex", findIndex);

        if (findIndex !== -1) {

            console.log("INCLUDES!!!");

            setSelectedQueries(prevState => {
                return prevState.filter((item) => item.type === "required-hackers" && item.num !== numOfHackers);
            })
        } else {
            setSelectedQueries(prevState => {
                return [...prevState, {
                    type: "required-hackers",
                    num: numOfHackers
                }];
            })
        }
    }

    const setSelectedTokenCount = (num) => {
        console.log("setSelectedTokenCount tokens to apply..:", num);

        const findIndex = selectedQueries.findIndex((item) => item.type === "tokens-to-apply-contract" && item.num === num);

        console.log("findIndex", findIndex);

        if (findIndex !== -1) {

            console.log("INCLUDES!!!");

            setSelectedQueries(prevState => {
                return prevState.filter((item) => item.type === "tokens-to-apply-contract" && item.num !== num);
            })
        } else {
            setSelectedQueries(prevState => {
                return [...prevState, {
                    type: "tokens-to-apply-contract",
                    num
                }];
            })
        }
    }
    const handleApplicantsCurrentSelection = (total) => {
        console.log("handleApplicantsCurrentSelection ran..");

        const findIndex = selectedQueries.findIndex((item) => item.type === "total-current-applicants" && item.num === total);

        console.log("findIndex", findIndex);

        if (findIndex !== -1) {

            console.log("INCLUDES!!!");

            setSelectedQueries(prevState => {
                return prevState.filter((item) => item.type === "total-current-applicants" && item.num !== total);
            })
        } else {
            setSelectedQueries(prevState => {
                return [...prevState, {
                    type: "total-current-applicants",
                    num: total
                }];
            })
        }
    }
    const handleByDate = (dateType) => {
        if (dateType === "oldest") {
            // oldest data/actions

            if (selectedQueries.includes("oldest")) {
                setSelectedQueries(prevState => {
                    return prevState.filter((item) => item !== "oldest");
                })
            } else {
                setSelectedQueries(prevState => {
                    return [...prevState, "oldest"].filter((item) => item !== "newest");
                })
            }
        } else {
            // newest data/actions
            if (selectedQueries.includes("newest")) {
                setSelectedQueries(prevState => {
                    return prevState.filter((item) => item !== "newest");
                })
            } else {
                setSelectedQueries(prevState => {
                    return [...prevState, "newest"].filter((item) => item !== "oldest");
                })
            }
        }
    }
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
                                            data-target="#collapseicon" aria-expanded={isFilter} aria-controls="collapseicon">Filter By Contract/Job Type (Physical, digital, etc..) & like/dislike count</Button>
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
                                        <h3 className='sort-category-custom'>Sort By "Hack Type" (Digital, Physical, etc..)</h3>
                                        <div className="checkbox-animated">
                                            <Label className="d-block" htmlFor="chk-ani">
                                                <Input onClick={(e) => handleHackTypeChange("digital-internet-hack")} className="checkbox_animated" id="chk-ani" type="checkbox" />{"Digital Hack(s)"}
                                            </Label>
                                            <Label className="d-block" htmlFor="chk-ani1">
                                                <Input onClick={(e) => handleHackTypeChange("physical-hack")} className="checkbox_animated" id="chk-ani1" type="checkbox" />{"Physical Hack(s)"}
                                            </Label>
                                            <Label className="d-block" htmlFor="chk-ani2">
                                                <Input onClick={(e) => handleHackTypeChange("both-assets")} className="checkbox_animated" id="chk-ani2" type="checkbox" />{"Both Hack Types (Physical/digital)"}
                                            </Label>
                                        </div>
                                        <hr />
                                        <h3 className='sort-category-custom'>Sort By Likes/Dislikes Count</h3>
                                        <div className="checkbox-animated">
                                            <Label className="d-block" htmlFor="chk-ani4">
                                                <Input onClick={(e) => handleLikeDislikeChange("likes")} checked={selectedQueries.includes("filter-by-likes-highest")} className="checkbox_animated" id="chk-ani4" type="checkbox" />{"Most/Highest # Of Like's"}
                                            </Label>
                                            <Label className="d-block" htmlFor="chk-ani5">
                                                <Input onClick={(e) => handleLikeDislikeChange("dislikes")} checked={selectedQueries.includes("filter-by-dislikes-highest")} className="checkbox_animated" id="chk-ani15" type="checkbox" />{"Most/Highest # Of Disike's"}
                                            </Label>
                                        </div>
                                        <hr />
                                        <h3 className='sort-category-custom'>Sort By Date (Newest/Oldest)</h3>
                                        <div className="checkbox-animated">
                                            <Label className="d-block" htmlFor="chk-ani4444444444444">
                                                <Input onClick={(e) => handleByDate("newest")} checked={selectedQueries.includes("newest")} className="checkbox_animated" id="chk-ani4444444444444" type="checkbox" />{"View Newest/Recently-Posted Listings First"}
                                            </Label>
                                            <Label className="d-block" htmlFor="chk-ani15555555555555">
                                                <Input onClick={(e) => handleByDate("oldest")} checked={selectedQueries.includes("oldest")} className="checkbox_animated" id="chk-ani15555555555555" type="checkbox" />{"View Oldest Listings First"}
                                            </Label>
                                        </div>
                                    </CardBody>
                                </Collapse>
                            </Card>
                        </Col>

                        <Col xl="12">
                            <Card>
                                <CardHeader>
                                    <h5 className="mb-0">
                                        <Button color="link pl-0" data-toggle="collapse" onClick={() => setLocation(!location)}
                                            data-target="#collapseicon1" aria-expanded={location} aria-controls="collapseicon1">Number (#) Of Required Hacker's</Button>
                                    </h5>
                                </CardHeader>
                                <Collapse isOpen={location}>
                                    <CardBody className="animate-chk">
                                        <div className="location-checkbox"> {/*  maxNumberOfApplicants */}
                                            <Label className="d-block" htmlFor="chk-ani6">
                                                <Input onClick={() => handleHackerCountRequired(1)} className="checkbox_animated" id="chk-ani6" type="checkbox" />
                                                {"1 Hacker"}<span className="d-block">{"1 Hacker Required/Desired"}</span>
                                            </Label>
                                            <Label className="d-block" htmlFor="chk-ani7">
                                                <Input onClick={() => handleHackerCountRequired(2)} className="checkbox_animated" id="chk-ani7" type="checkbox" />
                                                {"2 Hacker's"}<span className="d-block">{"2 Hacker's Required/Desired"}</span>
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani8">
                                                <Input onClick={() => handleHackerCountRequired(3)} className="checkbox_animated" id="chk-ani8" type="checkbox" />
                                                {"3 Hacker's"}<span className="d-block">{"3 Hacker's Required/Desired"}</span>
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani9">
                                                <Input onClick={() => handleHackerCountRequired(4)} className="checkbox_animated" id="chk-ani9" type="checkbox" />
                                                {"4 Hacker's"}<span className="d-block">{"4 Hacker's Required/Desired"}</span>
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani10">
                                                <Input onClick={() => handleHackerCountRequired(5)} className="checkbox_animated" id="chk-ani10" type="checkbox" />
                                                {"5 Hacker's"}<span className="d-block">{"5 Hacker's Required/Desired"}</span>
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani11">
                                                <Input onClick={() => handleHackerCountRequired(6)} className="checkbox_animated" id="chk-ani11" type="checkbox" />
                                                {"6 Hacker's"}<span className="d-block">{"6 Hacker's Required/Desired"}</span>
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani12">
                                                <Input onClick={() => handleHackerCountRequired(7)} className="checkbox_animated" id="chk-ani12" type="checkbox" />
                                                {"7 Hacker's"}<span className="d-block">{"7 Hacker's Required/Desired"}</span>
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani13">
                                                <Input onClick={() => handleHackerCountRequired(8)} className="checkbox_animated" id="chk-ani13" type="checkbox" />
                                                {"8 Hacker's"}<span className="d-block">{"8 Hacker's Required/Desired"}</span>
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani14">
                                                <Input onClick={() => handleHackerCountRequired(9)} className="checkbox_animated" id="chk-ani14" type="checkbox" />
                                                {"9 Hacker's"}<span className="d-block">{"9 Hacker's Required/Desired"}</span>
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani15">
                                                <Input onClick={() => handleHackerCountRequired(10)} className="checkbox_animated" id="chk-ani15" type="checkbox" />
                                                {"10 Hacker's"}<span className="d-block">{"10 Hacker's Required/Desired"}</span>
                                            </Label>
                                        </div>
                                    </CardBody>
                                    {/* <Button className="btn-block text-center" color="primary">All Program Types</Button> */}
                                </Collapse>
                            </Card>
                        </Col>
                        {/* <Col xl="12">
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
                        </Col>   */}

                        <Col xl="12">
                            <Card>
                                <CardHeader>
                                    <h5 className="mb-0">
                                        <Button color="link pl-0" onClick={() => setisIndustry(!isIndustry)}
                                            data-toggle="collapse" data-target="#collapseicon3" aria-expanded={isIndustry} aria-controls="collapseicon3">Token's required to apply to listing - This will filter by REQUIRED TOKEN COUNT..</Button>
                                    </h5>
                                </CardHeader>
                                <Collapse isOpen={isIndustry}>
                                    <div className="collapse show" id="collapseicon3" data-parent="#accordion" aria-labelledby="collapseicon3">
                                        <CardBody className="animate-chk">
                                            <Label className="d-block mb-0" htmlFor="chk-ani11111">
                                                <Input onClick={() => setSelectedTokenCount(2)} className="checkbox_animated" id="chk-ani11111" type="checkbox" />
                                                {"2 Token's Required To Apply"}
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani17777">
                                                <Input onClick={() => setSelectedTokenCount(4)} className="checkbox_animated" id="chk-ani17777" type="checkbox" />
                                                {"4 Token's Required To Apply"}
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani188888">
                                                <Input onClick={() => setSelectedTokenCount(7)} className="checkbox_animated" id="chk-ani188888" type="checkbox" />
                                                {"7 Token's Required To Apply"}
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani1999">
                                                <Input onClick={() => setSelectedTokenCount(10)} className="checkbox_animated" id="chk-ani1999" type="checkbox" />
                                                {"10 Token's Required To Apply"}
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani201">
                                                <Input onClick={() => setSelectedTokenCount(12)} className="checkbox_animated" id="chk-ani201" type="checkbox" />
                                                {"12 Token's Required To Apply"}
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani202">
                                                <Input onClick={() => setSelectedTokenCount(14)} className="checkbox_animated" id="chk-ani202" type="checkbox" />
                                                {"14 Token's Required To Apply"}
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani203">
                                                <Input onClick={() => setSelectedTokenCount(16)} className="checkbox_animated" id="chk-ani203" type="checkbox" />
                                                {"16 Token's Required To Apply"}
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani204">
                                                <Input onClick={() => setSelectedTokenCount(18)} className="checkbox_animated" id="chk-ani204" type="checkbox" />
                                                {"18 Token's Required To Apply"}
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani205">
                                                <Input onClick={() => setSelectedTokenCount(20)} className="checkbox_animated" id="chk-ani205" type="checkbox" />
                                                {"20 Token's Required To Apply"}
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani206">
                                                <Input onClick={() => setSelectedTokenCount(23)} className="checkbox_animated" id="chk-ani206" type="checkbox" />
                                                {"23 Token's Required To Apply"}
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani207">
                                                <Input onClick={() => setSelectedTokenCount(25)} className="checkbox_animated" id="chk-ani207" type="checkbox" />
                                                {"25 Token's Required To Apply"}
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani208">
                                                <Input onClick={() => setSelectedTokenCount(28)} className="checkbox_animated" id="chk-ani208" type="checkbox" />
                                                {"28 Token's Required To Apply"}
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani209">
                                                <Input onClick={() => setSelectedTokenCount(30)} className="checkbox_animated" id="chk-ani209" type="checkbox" />
                                                {"30 Token's Required To Apply"}
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani2011111">
                                                <Input onClick={() => setSelectedTokenCount(32)} className="checkbox_animated" id="chk-ani2011111" type="checkbox" />
                                                {"32 Token's Required To Apply"}
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani2012222222">
                                                <Input onClick={() => setSelectedTokenCount(34)} className="checkbox_animated" id="chk-ani2012222222" type="checkbox" />
                                                {"34 Token's Required To Apply"}
                                            </Label>
                                            <Label className="d-block mb-0" htmlFor="chk-ani201333333">
                                                <Input onClick={() => setSelectedTokenCount(35)} className="checkbox_animated" id="chk-ani201333333" type="checkbox" />
                                                {"35 Token's Required To Apply"}
                                            </Label>
                                        </CardBody>
                                        {/* <Button className="btn-block text-center" color="primary">{AllIndustries}</Button> */}
                                    </div>
                                </Collapse>
                            </Card>
                        </Col>
                        <Col xl="12">
                            <Card>
                                <CardHeader>
                                    <h5 className="mb-0">
                                        <Button color="link pl-0" onClick={() => setisSkill(!isSkill)}
                                            data-toggle="collapse" data-target="#collapseicon4" aria-expanded={isSkill} aria-controls="collapseicon4">Number Of Current Applicant's (People who've applied already - the total #)</Button>
                                    </h5>
                                </CardHeader>
                                <Collapse isOpen={isSkill}>
                                    <div className="collapse show" id="collapseicon4" data-parent="#accordion" aria-labelledby="collapseicon4">
                                        <CardBody className="animate-chk">
                                            {applicantNumberArray.map((number, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <Label className="d-block" htmlFor={`chk-ani21${index + 15674}`}>
                                                            <Input onClick={() => handleApplicantsCurrentSelection(number)} className="checkbox_animated" id={`chk-ani21${index + 15674}`} type="checkbox" />
                                                            {`Up-To ${number} Current Total Applicant's`}
                                                        </Label>
                                                    </Fragment>
                                                );
                                            })}
                                        </CardBody>
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