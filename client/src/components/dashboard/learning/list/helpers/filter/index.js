import React, { Fragment, useState } from 'react';
import { Collapse } from 'reactstrap';
import { Search } from 'react-feather';
import { Row, Col, Card, CardHeader, CardBody, Media, Input, Label, Button } from 'reactstrap'
import { FindCourse, Categories, Design, Development, Duration, Status, Price, AllCourses, PaidCourses, Filter, Progress, Completed, WebDevelopment, UXDevelopment, CourseBy, FrontendDevelopment, BackendDevelopment, FreeCourses, Registration, UIDesign, UserExperience, BusinessAnalyst, UXDesign, InterfaceDesign, UpcomingCourses } from "../../../../../../constant";
import { useHistory } from "react-router-dom";

const courseCategoryOptions = [
    { value: 'spear-phishing-attacks', label: 'Spear Phishing Attacks' },
    { value: 'phishing', label: 'Phishing Related' },
    { value: "ransomware", label: "Ransomware Related" },
    { value: "drive-by-attack", label: "Drive-by Attack" },
    { value: "trojan-horses", label: "Trojan Horses" },
    { value: "password-attack", label: "Password Attack" },
    { value: "phone-call-text-related", label: "Phone-Call/Text-Related" },
    { value: "eavesdropping-attack", label: "Eavesdropping Attack" },
    { value: "clickjacking-ui-redress", label: "Clickjacking/UI Redress" },
    { value: "dns-spoofing", label: "DNS Spoofing" },
    { value: "watering-hole-attack", label: "Watering Hole Attack" },
    { value: "keylogger-attack", label: "Keylogger Attack" },
    { value: "bruteforce-attack", label: "Brute-Force Attack" },
    { value: "dictionary-attack", label: "Dictionary Attack" },
    { value: "credential-reuse", label: "Credential Reuse" },
    { value: 'sql-injection-attack', label: 'SQL Injection Attack' },
    { value: "fake-wap", label: "Fake WAP" },
    { value: "bait-and-switch", label: "Bait & Switch" },
    { value: "browser-locker", label: "Browser Locker" },
    { value: "birthday-attack", label: "Birthday attack" },
    { value: "insider-threat", label: "Insider Threat" },
    { value: "ai-powered-attack", label: "AI-Powered Attacks" }
];

const pricingOptions = [
    { value: "0.00", label: "$0.00 (FREE)", numerical: 0, tier: 0 },
    { value: "19.99", label: "$19.99 (tier 1)", numerical: 19.99, tier: 1 },
    { value: "24.99", label: "$24.99 (tier 2)", numerical: 24.99, tier: 2 },
    { value: "29.99", label: "$29.99 (tier 3)", numerical: 29.99, tier: 3 },
    { value: "34.99", label: "$34.99 (tier 4)", numerical: 34.99, tier: 4 },
    { value: "39.99", label: "$39.99 (tier 5)", numerical: 39.99, tier: 5 },
    { value: "44.99", label: "$44.99 (tier 6)", numerical: 44.99, tier: 6 },
    { value: "49.99", label: "$49.99 (tier 7)", numerical: 49.99, tier: 7 },
    { value: "54.99", label: "$54.99 (tier 8)", numerical: 54.99, tier: 8 },
    { value: "59.99", label: "$59.99 (tier 9)", numerical: 59.99, tier: 9 },
    { value: "64.99", label: "$64.99 (tier 10)", numerical: 64.99, tier: 10 },
    { value: "69.99", label: "$69.99 (tier 11)", numerical: 69.99, tier: 11 },
    { value: "74.99", label: "$74.99 (tier 12)", numerical: 74.99, tier: 12 },
    { value: "79.99", label: "$79.99 (tier 13)", numerical: 79.99, tier: 13 },
    { value: "84.99", label: "$84.99 (tier 14)", numerical: 84.99, tier: 14 },
    { value: "89.99", label: "$89.99 (tier 15)", numerical: 89.99, tier: 15 },
    { value: "94.99", label: "$94.99 (tier 16)", numerical: 94.99, tier: 16 },
    { value: "99.99", label: "$99.99 (tier 17)", numerical: 99.99, tier: 17 },
    { value: "124.99", label: "$124.99 (tier 18)", numerical: 124.99, tier: 18 }
];

// select language options
const lanuageOptions = [
    { label: "English (US)", value: "english (US)", fullLength: "english-US", abbrev: "en-us" },
    { label: "English (UK)", value: "english (UK)", fullLength: "english-UK", abbrev: "en-uk" },
    { label: "English (India)", value: "english (India)", fullLength: "english-INDIA", abbrev: "en-india" },
    { label: "Hindi (hi)", value: "hindi-hi", fullLength: "hindi", abbrev: "hi" },
    { label: "Spanish", value: "spanish-spa", fullLength: "spanish", abbrev: "spa" },
    { label: "French", value: "french-fr", fullLength: "french", abbrev: "fr" },
    { label: "Arabic", value: "arabic-ar", fullLength: "arabic", abbrev: "ar" },
    { label: "Mandarin", value: "mandarin-man", fullLength: "mandarin", abbrev: "man" }
];


const experienceLevelOptions = [
    { label: "Beginner Level", value: "beginner" },
    { label: "Intermediate Level", value: "intermediate" },
    { label: "Expert Level", value: "expert" }
];
const hoursInLengthOptions = [
    { label: "10 Hours Total (round to nearest approx number)", value: 10, formatted: "10 Hour Long Course" },
    { label: "15 Hours Total (round to nearest approx number)", value: 15, formatted: "15 Hour Long Course" },
    { label: "20 Hours Total (round to nearest approx number)", value: 20, formatted: "20 Hour Long Course" },
    { label: "25 Hours Total (round to nearest approx number)", value: 25, formatted: "25 Hour Long Course" },
    { label: "30 Hours Total (round to nearest approx number)", value: 30, formatted: "30 Hour Long Course" },
    { label: "35 Hours Total (round to nearest approx number)", value: 35, formatted: "35 Hour Long Course" },
    { label: "40 Hours Total (round to nearest approx number)", value: 40, formatted: "40 Hour Long Course" },
    { label: "45 Hours Total (round to nearest approx number)", value: 45, formatted: "45 Hour Long Course" },
    { label: "50 Hours Total (round to nearest approx number)", value: 50, formatted: "50 Hour Long Course" },
    { label: "55+ Hour(s) Total (round to nearest approx number)", value: 0, formatted: "55+ Hour(s) Long Course" }
]

const LearningFilterHelper = ({ selectedQueries, setSelectedQueries }) => {
    const history = useHistory();

    const [isFilter, setIsFilter] = useState(true);

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
    const handleCourseCategorySelection = (value) => {
        console.log("handleCourseCategorySelection category selected...:----  ", value);

        const findIndex = selectedQueries.findIndex((item) => item.type === "category" && item.value === value);

        console.log("findIndex", findIndex);

        if (findIndex !== -1) {

            console.log("INCLUDES!!!");

            setSelectedQueries(prevState => {
                return prevState.filter((item) => item.type === "category" && item.value !== value);
            })
        } else {
            setSelectedQueries(prevState => {
                return [...prevState, {
                    type: "category",
                    value
                }];
            })
        }
    }

    const handleDifficultySelection = (difficulty) => {
        console.log("handleDifficultySelection difficulty selected...:----  ", difficulty);

        const findIndex = selectedQueries.findIndex((item) => item.type === "difficulty" && item.value === difficulty);

        console.log("findIndex", findIndex);

        if (findIndex !== -1) {

            console.log("INCLUDES!!!");

            setSelectedQueries(prevState => {
                return prevState.filter((item) => item.type === "difficulty" && item.value !== difficulty);
            })
        } else {
            setSelectedQueries(prevState => {
                return [...prevState, {
                    type: "difficulty",
                    value: difficulty
                }];
            })
        }
    }

    const pricingRelatedFiltrationSelection = (numericalValue) => {
        console.log("pricingRelatedFiltrationSelection pricing selected...:----  ", numericalValue);

        const findIndex = selectedQueries.findIndex((item) => item.type === "pricing" && item.numerical === numericalValue);

        console.log("findIndex", findIndex);

        if (findIndex !== -1) {

            console.log("INCLUDES!!!");

            setSelectedQueries(prevState => {
                return prevState.filter((item) => item.type === "pricing" && item.numerical !== numericalValue);
            })
        } else {
            setSelectedQueries(prevState => {
                return [...prevState, {
                    type: "pricing",
                    numerical: numericalValue
                }];
            })
        }
    }


    const changeSpokenTaughtLanguageSelection = (language) => {
        console.log("changeSpokenTaughtLanguageSelection language selected...:----  ", language);

        const findIndex = selectedQueries.findIndex((item) => item.type === "language" && item.abbrev === language);

        console.log("findIndex", findIndex);

        if (findIndex !== -1) {

            console.log("INCLUDES!!!");

            setSelectedQueries(prevState => {
                return prevState.filter((item) => item.type === "language" && item.abbrev !== language);
            })
        } else {
            setSelectedQueries(prevState => {
                return [...prevState, {
                    type: "language",
                    abbrev: language
                }];
            })
        }
    }

    const hoursInLengthSelection = (hoursInLength) => {
        console.log("changeSpokenTaughthoursInLengthSelection hoursInLength selected...:----  ", hoursInLength);

        const findIndex = selectedQueries.findIndex((item) => item.type === "hoursInLength" && item.value === hoursInLength);

        console.log("findIndex", findIndex);

        if (findIndex !== -1) {

            console.log("INCLUDES!!!");

            setSelectedQueries(prevState => {
                return prevState.filter((item) => item.type === "hoursInLength" && item.value !== hoursInLength);
            })
        } else {
            setSelectedQueries(prevState => {
                return [...prevState, {
                    type: "hoursInLength",
                    value: hoursInLength
                }];
            })
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
                                            data-target="#collapseicon" aria-expanded={isFilter} aria-controls="collapseicon">{FindCourse}</Button>
                                        <hr />
                                        <Button color={"info-2x"} className={"btn-square btn-outline-info text-center"} onClick={() => {
                                            history.push("/learning/courses/creation/new/course");
                                        }}>Upload Your OWN Course/Content</Button>
                                    </h5>
                                </CardHeader>
                                <Collapse isOpen={isFilter}>
                                    <div className="collapse show" id="collapseicon" aria-labelledby="collapseicon" data-parent="#accordion">
                                        <CardBody className="filter-cards-view animate-chk">
                                            <div className="job-filter">
                                                <div className="faq-form">
                                                    <Input className="form-control" type="text" placeholder="Search.." />
                                                    <Search className="search-icon"/>
                                                </div>
                                            </div>
                                            <h3 className='sort-category-custom'>Category</h3>
                                            <div className="checkbox-animated">
                                                {courseCategoryOptions.map((item, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            <Label className="d-block" htmlFor={`chk-ani${index}`}>
                                                                <Input onClick={() => handleCourseCategorySelection(item.value)} className="checkbox_animated" id={`chk-ani${index}`} type="checkbox" />
                                                                {item.label}
                                                            </Label>
                                                        </Fragment>
                                                    ); 
                                                })}
                                            </div>
                                            <h3 className='sort-category-custom'>Sort By Date (Newest/Oldest)</h3>
                                            <div className="checkbox-animated">
                                                <Label className="d-block" htmlFor="chk-ani4444444444444">
                                                    <Input onClick={(e) => handleByDate("newest")} checked={selectedQueries.includes("newest")} className="checkbox_animated" id="chk-ani4444444444444" type="checkbox" />{"View Newest/Recently-Posted Listings First"}
                                                </Label>
                                                <Label className="d-block" htmlFor="chk-ani15555555555555">
                                                    <Input onClick={(e) => handleByDate("oldest")} checked={selectedQueries.includes("oldest")} className="checkbox_animated" id="chk-ani15555555555555" type="checkbox" />{"View Oldest Listings First"}
                                                </Label>
                                            </div>
                                            <h3 className='sort-category-custom'>Pricing Option's</h3>
                                            <div className="checkbox-animated mt-0">
                                                {pricingOptions.map((item, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            <Label className="d-block" htmlFor={`chk-ani${index}`}>
                                                                <Input onClick={() => pricingRelatedFiltrationSelection(item.numerical)} className="checkbox_animated" id={`chk-ani${index}`} type="checkbox" />
                                                                {item.label}
                                                            </Label>
                                                        </Fragment>
                                                    ); 
                                                })}
                                            </div>
                                            <h3 className='sort-category-custom'>Spoken Lanugage(s)</h3>
                                            <div className="checkbox-animated mt-0">
                                                {lanuageOptions.map((language, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            <Label className="d-block" htmlFor={`chk-ani${index}`}>
                                                                <Input onClick={() => changeSpokenTaughtLanguageSelection(language.abbrev)} className="checkbox_animated" id={`chk-ani${index}`} type="checkbox" />
                                                                {language.label}
                                                            </Label>
                                                        </Fragment>
                                                    ); 
                                                })}
                                            </div>
                                            <h3 className='sort-category-custom'>Skill Level (difficulty)</h3>
                                            <div className="checkbox-animated mt-0">
                                                {experienceLevelOptions.map((experience, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            <Label className="d-block" htmlFor={`chk-ani${index}`}>
                                                                <Input onClick={() => handleDifficultySelection(experience.value)} className="checkbox_animated" id={`chk-ani${index}`} type="checkbox" />
                                                                {experience.label}
                                                            </Label>
                                                        </Fragment>
                                                    ); 
                                                })}
                                            </div>
                                            <h3 className='sort-category-custom'>Course Duration/Length</h3>
                                            <div className="checkbox-animated mt-0">
                                                {hoursInLengthOptions.map((option, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            <Label className="d-block" htmlFor={`chk-ani${index}`}>
                                                                <Input onClick={() => hoursInLengthSelection(option.value)} className="checkbox_animated" id={`chk-ani${index}`} type="checkbox" />
                                                                {option.label}
                                                            </Label>
                                                        </Fragment>
                                                    ); 
                                                })}
                                            </div>
                                            {/* <Button outline color="primary-2x text-center">View ALL Courses (Randomly)</Button> */}
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

export default LearningFilterHelper;