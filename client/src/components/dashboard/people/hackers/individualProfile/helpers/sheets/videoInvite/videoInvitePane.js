import React, { Fragment, useState, useEffect } from 'react';
import Sheet from 'react-modal-sheet';
import { Container, Row, Col, Card, CardBody, Button, CardHeader, CardFooter, Form, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import "./styles.css";
import { NotificationManager } from 'react-notifications';
import Breadcrumb from '../../../../../../../../layout/breadcrumb';
import { Calendar } from 'react-date-range';
import Select from "react-select";
import moment from 'moment';
import axios from "axios";
import { connect } from "react-redux";

const currentDate = new Date();

const timeSlotsOptions = [
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0), label: '12:00AM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 1, 0, 0), label: '1:00AM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 2, 0, 0), label: '2:00AM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 3, 0, 0), label: '3:00AM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 4, 0, 0), label: '4:00AM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 5, 0, 0), label: '5:00AM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 6, 0, 0), label: '6:00AM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 7, 0, 0), label: '7:00AM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 8, 0, 0), label: '8:00AM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 0, 0), label: '9:00AM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0, 0), label: '10:00AM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 11, 0, 0), label: '11:00AM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0), label: '12:00PM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0, 0), label: '1:00PM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0), label: '2:00PM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 15, 0, 0), label: '3:00PM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 0, 0), label: '4:00PM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 17, 0, 0), label: '5:00PM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0), label: '6:00PM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 19, 0, 0), label: '7:00PM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 20, 0, 0), label: '8:00PM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 21, 0, 0), label: '9:00PM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 22, 0, 0), label: '10:00PM' },
    { value: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 0, 0), label: '11:00PM' }
]

const VideoInvitePaneInviteHackerHelper = ({ user, userData, videoInterviewPane, setVideoInterviewStartPane }) => {

    const [ selectedDate, setSelectedDate ] = useState(new Date());
    const [ selectedOption, setSelectedOption ] = useState(null);

    const handleSelect = (date) => {
        console.log(date);

        if (new Date(date) > new Date()) {
            setSelectedDate(date);
        } else {
            NotificationManager.warning("You MUST select a date that lands on a day AFTER today's date! Please select a date that occurs later than the current date.", "Date is BEFORE the current date! Reselect..", 4750);
        }
    }

    const handleTimeChange = (selected) => {
        setSelectedOption(selected);
    }

    console.log("selectedDate", selectedDate);

    const handleTimeDateSubmission = () => {
        console.log("handleTimeDateSubmission clicked/ran..");

        const configuration = {
            id: userData.uniqueId,
            accountType: userData.accountType,
            otherUserID: user.uniqueId,
            otherUserName: `${user.firstName} ${user.lastName}`,
            date: selectedDate,
            time: selectedOption,
            signedinFullName: `${userData.firstName} ${userData.lastName}`,
            otherUserAccountType: "hackers"
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/send/invite/video/chat/notification`, configuration).then((res) => {
            if (res.data.message === "Sent invite successfully!") {
                console.log(res.data);

                setVideoInterviewStartPane(false)

                NotificationManager.success("Successfully sent invite to the desired user inviting them to this video-chat at the scheduled date and/or time!", "Successfully sent invite!", 4750);

            } else {
                console.log("Err", res.data);

                setVideoInterviewStartPane(false)

                NotificationManager.error("An unknown error has occurred while attempting to process your request, please try again and contact support if the problem persists!", "Unknown error has occurred!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            setVideoInterviewStartPane(false)

            NotificationManager.error("An unknown error has occurred while attempting to process your request, please try again and contact support if the problem persists!", "Unknown error has occurred!", 4750);
        })
    }

    const calculateShow = () => {
        if (selectedDate !== null && selectedOption !== null) {
            return false;
        } else {
            return true;
        }
    }

    return (
        <Fragment>
            <Sheet isOpen={videoInterviewPane} onClose={() => setVideoInterviewStartPane(false)}>
                <Sheet.Container>
                    <Sheet.Header>
                        <div className='marginized-header'>
                            <Button className='btn-square-danger' color={"danger-2x"} style={{ width: "100%" }} outline onClick={() => setVideoInterviewStartPane(false)}>Cancel/Close Pane</Button>
                        </div>
                    </Sheet.Header>
                        <div className='inner-container-invite'>
                            <Sheet.Content>
                            <Breadcrumb parent="Send An Invite & Start A Video Interview!" title="Initialize A Video Interview With This User!" />
                                <Container fluid={true}>
                                    <Col lg="12 box-col-12" xl="12 xl-100" md="12">
                                        <Card className={"card-shadow-messaging-initialize"}>
                                            <CardHeader className={"b-l-primary b-r-primary"}>
                                                <h3>Select the various settings/options for your invite. You will be inviting this user via a notification to join your desired video interview at the appropriate selected time!</h3>
                                            </CardHeader>
                                            <CardBody>
                                                <Row>
                                                    <Col sm="12" md="6" lg="6" xl="6">
                                                        <Calendar
                                                            date={selectedDate}
                                                            onChange={handleSelect}
                                                            shownDate={new Date()}
                                                            className={"custom-date-range-picker"}
                                                            showMonthAndYearPickers={false}
                                                            staticRanges={[]}
                                                            direction={"horizontal"}
                                                            showMonthArrow={true}
                                                            months={2}
                                                            showDateDisplay={false}
                                                            inputRanges={[]}
                                                            rangeColors={["#f73164", "#a927f9", "#f73164", "#a927f9", "#f73164", "#a927f9"]}
                                                        />
                                                    </Col>
                                                    <Col sm="12" md="6" lg="6" xl="6">
                                                        <Label className='label-time-selector'>Please select a 'meeting time' or a 'video time-slot' in which you'd like to interview/communicate with this person. This will be the time you both should be video chatting by..</Label>
                                                        <Select
                                                            value={selectedOption}
                                                            onChange={handleTimeChange}
                                                            options={timeSlotsOptions}
                                                        />
                                                        <hr />
                                                        {selectedOption !== null ? <Fragment>
                                                            <h4 className='selectedtext'>You've selected the timeslot of {selectedOption.label} on the date of {selectedDate !== null ? moment(selectedDate).format("MM/DD/YYYY") : "-------"}!</h4>
                                                            <hr />
                                                        </Fragment> : null}
                                                        <Button className='btn-square-success' onClick={handleTimeDateSubmission} disabled={calculateShow()} style={{ width: "100%" }} color={"success-2x"} outline>Submit & Continue Sending Invite!</Button>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                            <CardFooter className={"b-l-primary b-r-primary"}>
                                                <p className='lead'>This is going to invite {""} to an interview at the selected date & time. Please show up approx. 5-10 min early and be considerate of your peer's time..</p>
                                            </CardFooter>
                                        </Card>
                                    </Col>
                                </Container>
                            </Sheet.Content>
                        </div>
                    </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {  })(VideoInvitePaneInviteHackerHelper);