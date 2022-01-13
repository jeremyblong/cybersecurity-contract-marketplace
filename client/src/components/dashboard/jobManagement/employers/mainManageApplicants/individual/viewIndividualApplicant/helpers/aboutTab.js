import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Button, Media, Label } from 'reactstrap';
import { MoreVertical, ThumbsUp, UserPlus, MessageSquare } from 'react-feather';
import RightBar from './rightBar';
import LeftBar from './leftBar';
import { DateRangePicker } from 'react-date-range';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import moment from "moment";
import "../styles.css";

const AboutTab = ({ applicantData, lastProfileItem, user }) => {
    const [ dates, setDates ] = useState(null);
    const [ datesReady, setDatesReadyStatus ] = useState(false);

    // mounted logic and prep dates for calendar phyiscal hacks
    useEffect(() => {
        const newDatesArray = [];
        for (let index = 0; index < applicantData.selectedTestDates.length; index++) {
            const applicationDate = applicantData.selectedTestDates[index];
            newDatesArray.push({
                startDate: new Date(applicationDate.startDate),
                endDate: new Date(applicationDate.endDate),
                key: "selection"
            });
            // end of array - exit and set READY
            if ((applicantData.selectedTestDates.length - 1) === index) {
                setDates(newDatesArray);
                setDatesReadyStatus(true);
            }
        }
    }, []);
    const bothBarsProps = {
        user,
        lastProfileItem,
        applicantData
    }
    // return data...
    return (
        <Fragment>
            <Row>
                <Col xl="3 xl-40 box-col-4" lg="12" md="5">
                    <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc2">
                        <Row>
                            <LeftBar {...bothBarsProps} />
                        </Row>
                    </div>
                </Col>
                <Col xl="6 xl-60 box-col-8" lg="12" md="7">
                    <Row>
                        <Col sm="12">
                            <Card className={"add-shadow-md-custom"}>
                                <CardHeader>
                                    <h5>This is the <strong style={{ textDecorationLine: "underline", color: "#f73164" }}>"Availiable Physical Testing Dates"</strong> submitted by this hacker applicant named <strong style={{ textDecorationLine: "underline", color: "#f73164" }}>{applicantData.applicantName}</strong>. This person has selected your "physical-hack" selection and would like to test your company's physical security.</h5>
                                    <hr />
                                    <p className={"bottom-sub-text"}>Below, you will find the available dates this hacker has choosen from the dates that you originally selected upon posting this listing so these days <strong>should</strong> align with your schedule and availability.</p>
                                    <hr />
                                    <Label id={"strong-custom-label-date"}>These are the available dates that the hacker/applicant has selected...</Label>
                                    {datesReady === true ? <DateRangePicker 
                                        ranges={dates}
                                        // minDate={new Date()}
                                        onChange={() => {}}
                                        shownDate={new Date()}
                                        className={"custom-date-range-picker"}
                                        showMonthAndYearPickers={false}
                                        staticRanges={[]}
                                        direction={"horizontal"}
                                        showMonthArrow={true}
                                        months={2}
                                        showDateDisplay={false}
                                        inputRanges={[]}
                                        scroll={{ enabled: true }}
                                        rangeColors={["#f73164", "#a927f9", "#f73164", "#a927f9", "#f73164", "#a927f9"]}
                                    /> : <Fragment>
                                        <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                            <p>
                                                <Skeleton count={12} />
                                            </p>
                                        </SkeletonTheme>
                                    </Fragment>}
                                </CardHeader>
                                <CardBody>

                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card className={"add-shadow-md-custom about-container-wrapper"}>
                                <CardHeader className="social-header">
                                    <h5><span>{"Hobbies and Interests"}</span><span className="pull-right"><MoreVertical /></span></h5>
                                </CardHeader>
                                <CardBody>
                                    <Row className="details-about">
                                        <Col sm="6">
                                            <div className="your-details"><span className="f-w-600">Hobbies:</span>
                                                <p>{"I like to ride the bike to work, swimming, and working out. I also like reading design magazines, go to museums, and binge watching a good tv show while it’s raining outside."}</p>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="your-details your-details-xs"><span className="f-w-600">{"Favourite Music Bands / Artists:"}</span>
                                                <p>{"Iron Maid, DC/AC, Megablow, The Ill, Kung Fighters, System of a Revenge."}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="details-about">
                                        <Col sm="6">
                                            <div className="your-details"><span className="f-w-600">{"Favourite TV Shows:"}</span>
                                                <p>{"Breaking Good, RedDevil, People of Interest, The Running Dead, Found, American Guy."}</p>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="your-details your-details-xs"><span className="f-w-600">{"Favourite Books:"}</span>
                                                <p>{"The Crime of the Century, Egiptian Mythology 101, The Scarred Wizard, Lord of the Wings, Amongst Gods, The Oracle, A Tale of Air and Water."}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="details-about">
                                        <Col sm="6">
                                            <div className="your-details"><span className="f-w-600">{"Favourite Movies:"}</span>
                                                <p>{"Idiocratic, The Scarred Wizard and the Fire Crown, Crime Squad Ferrum Man."}</p>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="your-details your-details-xs"><span className="f-w-600">{"Favourite Writers:"}</span>
                                                <p>{"Martin T. Georgeston, Jhonathan R. Token, Ivana Rowle, Alexandr Platt, Marcus Roth."}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="details-about">
                                        <Col sm="6">
                                            <div className="your-details"><span className="f-w-600">{"Favourite Games:"}</span>
                                                <p>{"The First of Us, Assassin’s Squad, Dark Assylum, NMAK16, Last Cause 4, Grand Snatch Auto."}</p>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="your-details your-details-xs"><span className="f-w-600">{"Other Interests:"}</span>
                                                <p>{"Swimming, Surfing, Scuba Diving, Anime, Photography, Tattoos, Street Art."}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12">
                            <Card>
                                <CardHeader className="social-header">
                                    <h5><span>{"Education and Employement"}</span><span className="pull-right"><MoreVertical /></span></h5>
                                </CardHeader>
                                <CardBody>
                                    <Row className="details-about">
                                        <Col sm="6">
                                            <div className="your-details"><span className="f-w-600">{"The New College of Design"}</span>
                                                <p>{"2001 - 2006"}</p>
                                                <p>{"Breaking Good, RedDevil, People of Interest, The Running Dead, Found, American Guy."}</p>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="your-details your-details-xs"><span className="f-w-600">{"Digital Design Intern"}</span>
                                                <p>{"2006-2008"}</p>
                                                <p>{"Digital Design Intern for the “Multimedz” agency. Was in charge of the communication with the clients."}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="details-about">
                                        <Col sm="6">
                                            <div className="your-details"><span className="f-w-600">{"Rembrandt Institute"}</span>
                                                <p>{"2008"}</p>
                                                <p>{"Five months Digital Illustration course. Professor: Leonardo Stagg."}</p>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="your-details your-details-xs"><span className="f-w-600">{"UI/UX Designer"}</span>
                                                <p>{"2001 - 2006"}</p>
                                                <p>{"Breaking Good, RedDevil, People of Interest, The Running Dead, Found, American Guy."}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="details-about">
                                        <Col sm="6">
                                            <div className="your-details"><span className="f-w-600">{"The Digital College"}</span>
                                                <p>{"2010"}</p>
                                                <p>{"6 months intensive Motion Graphics course. After Effects and Premire. Professor: Donatello Urtle."}</p>
                                            </div>
                                        </Col>
                                        <Col sm="6">
                                            <div className="your-details your-details-xs"><span className="f-w-600">{"The New College of Design"}</span>
                                                <p>{"2008 - 2013"}</p>
                                                <p>{"UI/UX Designer for the “Daydreams” agency."}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <div className="col-xl-3 xl-100 box-col-12">
                    <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc3">
                        <Row>
                            <RightBar {...bothBarsProps} />
                        </Row>
                    </div>
                </div>
            </Row>
        </Fragment>
    );
};

export default AboutTab;