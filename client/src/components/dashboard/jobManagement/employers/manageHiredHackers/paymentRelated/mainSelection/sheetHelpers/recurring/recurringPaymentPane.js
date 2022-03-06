import React, { Fragment, useState, useEffect } from 'react';
import "./styles.css";
import Breadcrumb from '../../../../../../../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardBody, CardFooter, CardHeader, FormGroup, ListGroup, ListGroupItem, Label, Input, Button } from "reactstrap"
import axios from 'axios';
import { Link } from "react-router-dom";
import Sheet from 'react-modal-sheet';
import { connect } from "react-redux";
import { NotificationManager } from 'react-notifications';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { confirmAlert } from 'react-confirm-alert';
import moment from "moment";
import Slider from 'rc-slider';
import { Calendar } from 'react-date-range';
import ReactPlayer from "react-player";
import Select from 'react-select';


const daysOfWeekOptionsSelection = [
    { value: 0, label: 'Pay Every Sunday' },
    { value: 1, label: 'Pay Every Monday' },
    { value: 2, label: 'Pay Every Tuesday' },
    { value: 3, label: 'Pay Every Wednesday' },
    { value: 4, label: 'Pay Every Thursday' },
    { value: 5, label: 'Pay Every Friday' },
    { value: 6, label: 'Pay Every Saturday' }
];


const RecurringPaymentPaneHelper = ({ incrementalPayentsPane, setIncrementalPaymentsOpen, userData, setCurrentApplication, listing, currentlyDue, setCurrentlyDue, currentApplication }) => {

    const [ cards, setCards ] = useState([]);
    const [ activeCard, setActiveCard ] = useState(null);
    const [ percentageToBePaid, setPercentageToBePaid ] = useState(50);
    const [ cost, setCost ] = useState(0);
    const [ dateInterval, setDateInterval ] = useState(new Date());
    const [ selectedDayOfWeek, setSelectedDayOfWeekState ] = useState({ value: 5, label: 'Pay Every Friday' });
    const [ paydays, setPaydayData ] = useState([]);
    const [ daysLength, setDaysLength ] = useState(30);
    const [ marks, setMarks ] = useState({
        0: { style: { color: "blue" }, label: "0%" },
        10: { style: { color: "blue" }, label: "10%" },
        20: { style: { color: "blue" }, label: "20%" },
        30: { style: { color: "blue" }, label: "30%" },
        40: { style: { color: "blue" }, label: "40%" },
        50: { style: { color: "blue" }, label: "50%" },
        60: { style: { color: "blue" }, label: "60%" },
        70: { style: { color: "blue" }, label: "70%" },
        80: { style: { color: "blue" }, label: "80%" },
        90: { style: { color: "blue" }, label: "90%" },
        100: { style: { color: "blue" }, label: "100%" }
    });

    useEffect(() => {
        const configuration = {
            params: {
                id: userData.uniqueId
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/employer/payment/methods/cards/only`, configuration).then((res) => {
            if (res.data.message === "Gathered employer payment cards!") {
                console.log(res.data);

                const { cards } = res.data;

                setCards(cards.data);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log("Critical errror...:", err);
        })
    }, []);

    const handlePaymentInitialization = () => {
        confirmAlert({
            title: `Are you SURE you'd like to make a 'RECURRING-PAYMENT' of ${cost.toFixed(2)}?`,
            message: `This is NOT completely permanent, IF the contracted hacker does NOT complete the required work or is incompetent, you have the ABILITY to RETRIEVE your un-used funds at a later point. Confirmed transfers/payments will ALSO need to be confirmed by you prior to any money being transferred throughout accounts.`,
            buttons: [
              {
                label: 'Yes, Initialize Recurring Payment!',
                onClick: () => {
                    console.log("yes notify and run logic!");

                    if (activeCard !== null) {
                        const config = {
                            userID: userData.uniqueId,
                            paydayEachAmount: Number(cost),
                            hackerID: currentApplication.applicantId,
                            activeCard,
                            publicCompanyName: listing.publicCompanyName,
                            jobID: currentApplication.id,
                            daysToPay: paydays,
                            selectedDayOfWeek: selectedDayOfWeek.value
                        };
                
                        axios.post(`${process.env.REACT_APP_BASE_URL}/initialize/recurring/payment/contract/start`, config).then((res) => {
                            if (res.data.message === "Successfully deposited funds and notified hacker!") {
                                console.log(res.data);

                                const { employer } = res.data;
    
                                setIncrementalPaymentsOpen(false);
                                setActiveCard(null);
                                setPercentageToBePaid(50);

                                const findIndexJobUpdated = employer.activeHiredHackers.findIndex((x) => x.id === currentApplication.id);
                                
                                setCurrentApplication(employer.activeHiredHackers[findIndexJobUpdated]);
    
                                NotificationManager.success(`We've successfully deposited the funds into ${process.env.REACT_APP_APPLICATION_NAME} & your contracted hacker is now READY to go and should start working immediately (within 1 business day)! Congrats on your new hire!`, "Succesfully processed request & notified hacker!", 4750);
                            } else {
                                console.log("Err", res.data);

                                setIncrementalPaymentsOpen(false);
                                setActiveCard(null);
                                setPercentageToBePaid(50);
    
                                NotificationManager.error("An error occurred while attempting to make changes, update the hacker hiree and process overall related logic - if this problem persists, please contact support or try this action again!", "An error occurred while attempting to notifiy related hacker!", 4750);
                            }
                        }).catch((err) => {
                            console.log("Critical err", err);
                            
                            setIncrementalPaymentsOpen(false);
                            setActiveCard(null);
                            setPercentageToBePaid(50);
    
                            NotificationManager.error("An error occurred while attempting to make changes, update the hacker hiree and process overall related logic - if this problem persists, please contact support or try this action again!", "An error occurred while attempting to notifiy related hacker!", 4750);
                        })
                    } else {
                        setIncrementalPaymentsOpen(false);
                        setActiveCard(null);
                        setPercentageToBePaid(50);

                        NotificationManager.warning("You MUST select a 'payment card' to take the desired funds from, We will bill/draw funds from this account so check your balance prior to running this command to avoid errors!", "Please select a 'payment card' before continuing!", 4750);
                    }
                }
              },
              {
                label: 'No, Cancel/Exit.',
                onClick: () => {
                    console.log("canelled/don't run logic");
                }
              }
            ]
        });
    }
    const handleSliderValueChange = (percentage) => {
        console.log("handleSliderValueChange percentage", percentage);

        setPercentageToBePaid(percentage);
    }
    const onAfterChange = (percentage) => {
        console.log("onAfterChange percentage", percentage);

        const totalCost = Math.round(Number(currentApplication.amountOfMoneyUponCompletion));
        const perc = parseFloat(percentage) / 100.0;
        const converted = totalCost * perc;
        setCost(converted);
    }
    const calculateCurrentSelectedCost = (percentage) => {
        const totalCost = Math.round(Number(currentApplication.amountOfMoneyUponCompletion));
        const perc = parseFloat(percentage) / 100.0;
        const converted = totalCost * perc;
        return `$${converted.toFixed(2)} currently selected to be paid on a recurring basis`;
    }
    const handleSelectionDateChange = (dateee) => {

        const startDate = new Date(dateee).toISOString().split('T')[0];

        const recurringDatesArray = [];

        const daysFromNow = new Date(new Date(dateee).setDate(new Date(dateee).getDate() + Number(daysLength)));
        const startDateModified = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1));

        // week starts at 0 on sunday and saturday is 6

        for (let d = startDateModified; d <= new Date(daysFromNow); d.setDate(d.getDate() + 1)) {
            const dayOfWeek = new Date(d).getDay();

            console.log("dayOfWeek", dayOfWeek);

            if (dayOfWeek === selectedDayOfWeek.value) {
                recurringDatesArray.push(new Date(d));
            }
        }

        setPaydayData(recurringDatesArray);
        
        console.log("recurringDatesArray", recurringDatesArray);

        // for (let index = 0; index < applicantData.selectedTestDates.length; index++) {
        //     const applicationDate = applicantData.selectedTestDates[index];
        //     newDatesArray.push({
        //         startDate: new Date(applicationDate.startDate),
        //         endDate: new Date(applicationDate.endDate),
        //         key: "selection"
        //     });
        //     // end of array - exit and set READY
        //     if ((applicantData.selectedTestDates.length - 1) === index) {
        //         setDates(newDatesArray);
        //         setDatesReadyStatus(true);
        //     }
        // }
    }
    return (
        <Fragment>
            <Sheet className={"my-sheet-container-price-wrapper"} draggable={false} isOpen={incrementalPayentsPane} onClose={() => setIncrementalPaymentsOpen(false)}>
                <Sheet.Container className={"my-sheet-container-price"}>
                    <Sheet.Header>
                        <div style={{ margin: "12.5px" }} className="centered-both-ways">
                            <Button onClick={() => setIncrementalPaymentsOpen(false)} className={"btn-square-danger"} outline color={"danger-2x"} style={{ width: "100%" }}>Exit/Close This Pane</Button>
                        </div>
                    </Sheet.Header>
                    <Sheet.Content>
                        <div id={"breadcrumb-full-payment"}>
                            <Breadcrumb id={"breadcrumb-full-payment"} parent={"Make FULL Payment"} title={currentApplication !== null ? `Make a full deposit/payment to this contractor (${currentApplication.applicantName})` : "Loading Data..."} />
                            <Container className='container-pane-full-payment' fluid={true}>
                                {currentApplication !== null ? <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <Card className='card-payment-entirely-halved'>
                                            <CardHeader>
                                                <h3 className='make-full-payment-header'>Set-up 'recurring' payments or payment's that'll automatically be made with your 'primary' card on a recurring/frequent basis..</h3>
                                                <hr />
                                                <p className='lead'>This is essentially an 'escrow' type service with <em style={{ textDecorationLine: "underline" }}>stripe</em> that deposit's funds PRIOR to a hacker starting a contract to assure both {process.env.REACT_APP_APPLICATION_NAME} AND the hacker themselves that once the <strong style={{ color: "#7366ff", textDecorationLine: "underline" }}>contract is successfully completed</strong>, the funds will be released.. With this specific payment method you will charged the agreed amount on a <strong style={{ color: "#7366ff", textDecorationLine: "underline" }}>'recurring basis'</strong> which means if you choose a saturday to make a $74.99 payment, <strong style={{ color: "#7366ff", textDecorationLine: "underline" }}>every</strong> saturday this payment will be automatically made <strong style={{ color: "#7366ff", textDecorationLine: "underline" }}>UNTIL CANCELLED</strong> or the peak/full payment is achieved</p>
                                            </CardHeader>
                                            <CardBody>
                                                <Row>
                                                    <div className='centered-both-ways'>
                                                        <Col className='dotted-border-col-two-custom' sm="12" md="6" lg="6" xl="6">
                                                            <h3>Please select a recurring payment value until the value of <strong style={{ color: "darkred", textDecorationLine: "underline" }}>${Number(currentApplication.amountOfMoneyUponCompletion).toFixed(2)} (USD-$)</strong> is completely paid off finalizing the balance between you and <strong style={{ color: "darkred", textDecorationLine: "underline" }}>{currentApplication.applicantName}</strong>.</h3>
                                                            <hr />
                                                            <div className='center-slider-adjustment-bar'>
                                                                <p className='lead'>Please drag the marker to the appropriate position marking 'how much' you'd like to pay on this overall payment..</p>
                                                                <hr />
                                                                <Slider value={percentageToBePaid} startPoint={0} onAfterChange={onAfterChange} onChange={handleSliderValueChange} marks={marks} />
                                                                <div className='centered-both-ways'>
                                                                    <h3 className='current-selected-cost'>{calculateCurrentSelectedCost(percentageToBePaid)}</h3>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col className='dotted-border-col-two-custom' sm="12" md="6" lg="6" xl="6">
                                                            <FormGroup>
                                                                <Label htmlFor="dayslength">Select how many DAYS (from selected date in calendar) to keep this payment active - once a week payment will be made (<strong style={{ color: "#7366ff" }}>will iterate through dates marking ONLY ONE DAY per week to make this payment</strong>)</Label>
                                                                <Input pattern="[0-9]*" value={daysLength} onChange={(e) => setDaysLength(e.target.value)} className="form-control" type="number" placeholder="Enter how many day's you'd like to make this payment for (Ex. 30 days, 45 days, etc... ONCE a week regardless of selection)" />
                                                                <hr />
                                                                <Label htmlFor="dayslength">Day of week you'd like to make this recurring payment (payment will be billed EVERY choosen day until day count ends or total cost is paid per contract)</Label>
                                                                <Select
                                                                    classNamePrefix={"put-above"}
                                                                    className={"put-above"}
                                                                    value={selectedDayOfWeek}
                                                                    onChange={(selectedOption) => setSelectedDayOfWeekState(selectedOption)}
                                                                    options={daysOfWeekOptionsSelection}
                                                                />
                                                            </FormGroup>
                                                            <div className='centered-both-ways'>
                                                                <Calendar 
                                                                    date={dateInterval}
                                                                    onChange={(date) => handleSelectionDateChange(date)}
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
                                                            </div>
                                                        </Col>
                                                    </div>
                                                </Row>
                                                <Row style={{ marginTop: "22.5px", marginBottom: "22.5px" }}>
                                                    <Col sm="12" md="6" lg="6" xl="6">
                                                        <h3>Select a card that you wish to make this payment with..</h3>
                                                        <hr />
                                                        <ListGroup>
                                                            {typeof cards !== "undefined" && cards.length > 0 ? cards.slice(0, 3).map((payment, idx) => {
                                                                return (
                                                                    <Fragment key={idx}>
                                                                        <ListGroupItem onClick={() => setActiveCard(payment)} className={activeCard !== null && activeCard.id === payment.id ? "list-group-item-action listitem-pricing-card flex-column align-items-start active active-picked" : "list-group-item-action listitem-pricing-card flex-column align-items-start"}>
                                                                            <div className="d-flex w-100 justify-content-between">
                                                                                <h5 className="mb-1">ID: {payment.id.slice(0, 7)}...</h5><small style={{ color: "#f73164" }} className="text-secondary">Added/Created: {moment(payment.created * 1000).fromNow()}</small>
                                                                            </div>
                                                                            <p className="mb-1" style={{ color: "#51bb25", fontWeight: "bold" }}>{`**** **** **** ${payment.card.last4}`}</p>
                                                                            <small className="text-muted">{`Exp. ${payment.card.exp_month}/${payment.card.exp_year}`} <small className="float-right">Card Type: {payment.card.brand}</small></small>
                                                                        </ListGroupItem>
                                                                    </Fragment>
                                                                );
                                                            }) : <Fragment>
                                                                <h3 style={{ color: "blue", textDecorationLine: "underline" }}>You don't have any availiable cards on file..</h3>
                                                                <div style={{ padding: "27.5px" }} className="centered-both-ways">
                                                                    <img src={require("../../../../../../../../../assets/images/credit-cards.jpg")} className={"credit-cards-placeholder"} />
                                                                </div>
                                                            </Fragment>}
                                                        </ListGroup>
                                                    </Col>
                                                    <Col sm="12" md="6" lg="6" xl="6">
                                                        <h3>These are your selected payment dates for recurring payments (typically every friday at midnight)</h3>
                                                        <hr />
                                                        <ListGroup>
                                                            {typeof paydays !== "undefined" && paydays.length > 0 ? paydays.map((payday, index) => {
                                                                return (
                                                                    <ListGroupItem key={index}>Automatic payment on: <strong style={{ color: "#7366ff", textDecorationLine: "underline" }}>{moment(payday).format("MM-DD-YYYY")} (MM/DD/YYYY)</strong></ListGroupItem>
                                                                );
                                                            }) : <Fragment>
                                                                <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"no-dates-selected-video-payment"} wrapper={"div"} url={require("../../../../../../../../../assets/video/nothing-selected-pending.mp4")} />
                                                            </Fragment>}
                                                        </ListGroup>
                                                    </Col>
                                                </Row>
                                                <Button onClick={() => {
                                                    handlePaymentInitialization();
                                                }} className={"btn-square-success"} outline color={"success-2x"} style={{ width: "100%", marginTop: "17.5px" }}>Make Payment (will need to double confirm)</Button>
                                            </CardBody>
                                            <CardFooter>
                                                <h3>If you're confused or would like more information on <Link className={"payment-linky"} to={"/frequently/asked/questions/main/employer"}>escrow services</Link>, you can find a plethorea of information between the <a target="_blank" href={"https://en.wikipedia.org/wiki/Escrow"}>wiki page</a> or by clicking <Link className={"payment-linky"} to={"/frequently/asked/questions/main/employer"}>here</Link> to see exactly how <strong style={{ textDecorationLine: "underline" }}>WE</strong> implement escrow type services!</h3>
                                            </CardFooter>
                                        </Card>
                                    </Col>
                                </Row> : <Row>
                                <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                    <p>
                                        <Skeleton count={45} />
                                    </p>
                                </SkeletonTheme>
                                </Row>}
                            </Container>
                        </div>
                    </Sheet.Content>
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
export default connect(mapStateToProps, {  })(RecurringPaymentPaneHelper);