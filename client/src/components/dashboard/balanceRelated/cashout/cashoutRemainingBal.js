import React, { Fragment, useState, useEffect } from 'react';
import "./styles.css";
import Breadcrumb from '../../../../layout/breadcrumb';
import { Col, Container, Row, Card, CardHeader, CardBody, ListGroup, ListGroupItem, Button } from 'reactstrap';
import axios from 'axios';
import { NotificationManager } from "react-notifications";
import { connect } from "react-redux";
import Slider from 'rc-slider';
import Sheet from 'react-modal-sheet';
import DataTable from 'react-data-table-component';
import moment from "moment";

const columns = [
    {
        name: 'Status',
        selector: row => row.status
    },
    {
        name: 'Amount Cashed-Out',
        selector: row => row.amount
    },
    {
        name: 'Date Of Cashout',
        selector: row => row.cashoutDate
    },
    {
        name: "Cashout Date (From Now)",
        selector: row => row.dateAddedFromNow
    },
    {
        name: 'Type Of Payout',
        selector: row => row.type
    },
    {
        name: 'Currency',
        selector: row => row.currency
    }
];

const CashoutAvailiableBalanceHelper = ({ userData }) => {

    const [ previousPayoutMethods, setPreviousPayoutMethods ] = useState([]);
    const [ selectedCard, setSelected ] = useState(null);
    const [ percentageToBePaid, setPercentageToBePaid ] = useState(25);
    const [ balance, setBalance ] = useState(null);
    const [ cost, setCost ] = useState(0);
    const [ marks, setMarks ] = useState({});
    const [ ready, setReady ] = useState(false);
    const [ payoutsPaneOpen, setPayoutsPaneOpen ] = useState(false);
    const [ cardTableData, setCardTableData ] = useState([]);

    useEffect(() => {
        const config = {
            params: {
                uniqueId: userData.uniqueId,
                accountType: userData.accountType
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/availiable/stripe/bal`, config).then((res) => {
            if (res.data.message === "Gathered balance!") {

                const { bal } = res.data;

                console.log(res.data);

                if (userData.accountType === "employers") {

                    setBalance(bal);

                    if (bal > 0) {
                        const dividedBy10 = bal / 10;

                        setMarks({
                            0: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 0).toFixed(2)}` },
                            10: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 1).toFixed(2)}` },
                            20: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 2).toFixed(2)}` },
                            30: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 3).toFixed(2)}` },
                            40: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 4).toFixed(2)}` },
                            50: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 5).toFixed(2)}` },
                            60: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 6).toFixed(2)}` },
                            70: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 7).toFixed(2)}` },
                            80: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 8).toFixed(2)}` },
                            90: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 9).toFixed(2)}` },
                            100: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 10).toFixed(2)}`  }
                        });

                        setReady(true);
                    }
                } else {
                    const { instant_available, available } = res.data.bal;

                    for (let index = 0; index < instant_available.length; index++) {
                        const item = instant_available[index];
                        if (item.currency === "usd") {
                            const dividedBy10 = item.amount / 10;

                            setBalance(item.amount);

                            setMarks({
                                0: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 0).toFixed(2)}` },
                                10: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 1).toFixed(2)}` },
                                20: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 2).toFixed(2)}` },
                                30: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 3).toFixed(2)}` },
                                40: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 4).toFixed(2)}` },
                                50: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 5).toFixed(2)}` },
                                60: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 6).toFixed(2)}` },
                                70: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 7).toFixed(2)}` },
                                80: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 8).toFixed(2)}` },
                                90: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 9).toFixed(2)}` },
                                100: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 10).toFixed(2)}`  }
                            });

                            setReady(true);

                            break;
                        }
                    }
                }

            } else {
                console.log("err", res.data);
                
                NotificationManager.warning("An unknown error has occurred while attempting to gather your account balance information, try reloading this page or contact support if the problem persists!", "Unknown error has occurred.", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.warning("An unknown error has occurred while attempting to gather your account balance information, try reloading this page or contact support if the problem persists!", "Unknown error has occurred.", 4750);
        })
    }, []);

    useEffect(() => {
      
        const config = {
            params: {
                id: userData.uniqueId,
                accountType: userData.accountType
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/both/account/payout/methods`, config).then((res) => {
            if (res.data.message === "Gathered payouts!") {

                const { payouts } = res.data;

                console.log("payouts", payouts);

                const convertedPaymentsArr = [];

                if (typeof payouts !== "undefined" && payouts.length > 0) {
                    for (let index = 0; index < payouts.length; index++) {
                        const method = payouts[index];
                        
                        convertedPaymentsArr.push({
                            status: <div className='font-success' style={{ textDecorationLine: "underline", fontWeight: "bold" }}>{method.status}</div>,
                            amount: <div className='font-primary' style={{ textDecorationLine: "underline", fontWeight: "bold" }}>{`$${method.amount / 100}`}</div>,
                            cashoutDate: moment(method.created * 1000).format("MM/DD/YYYY hh:mm:ss a"),
                            dateAddedFromNow: moment(method.created * 1000).fromNow(),
                            type: method.type,
                            currency: method.currency
                        })
                    }
                }

                setCardTableData(convertedPaymentsArr);

            } else {
                console.log("err", res.data);
                
                NotificationManager.warning("An unknown error has occurred while attempting to gather your previous 'payout methods' on file, try reloading this page or contact support if the problem persists!", "Unknown error has occurred.", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.warning("An unknown error has occurred while attempting to gather your previous 'payout methods' on file, try reloading this page or contact support if the problem persists!", "Unknown error has occurred.", 4750);
        })
    }, [balance])

    useEffect(() => {
        console.log("mounted..");

        const config = {
            params: {
                id: userData.uniqueId,
                accountType: userData.accountType
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/cards/payment/methods/both/accounts`, config).then((res) => {
            if (res.data.message === "Gathered employer payment cards!") {

                const { cards } = res.data;

                console.log(res.data);

                setPreviousPayoutMethods(cards);

            } else {
                console.log("err", res.data);
                
                NotificationManager.warning("An unknown error has occurred while attempting to gather your previous 'payout methods' on file, try reloading this page or contact support if the problem persists!", "Unknown error has occurred.", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.warning("An unknown error has occurred while attempting to gather your previous 'payout methods' on file, try reloading this page or contact support if the problem persists!", "Unknown error has occurred.", 4750);
        })
    }, []);

    console.log("balance", balance);

    const handleSliderValueChange = (percentage) => {
        console.log("handleSliderValueChange percentage", percentage);

        setPercentageToBePaid(percentage);
    }
    const onAfterChange = (percentage) => {
        console.log("onAfterChange percentage", percentage);

        const totalCost = balance / 100;
        const perc = parseFloat(percentage) / 100.0;
        const converted = totalCost * perc;
        setCost(converted);
    }
    const calculateCurrentSelectedCost = (percentage) => {
        const totalCost = balance / 100;
        const perc = parseFloat(percentage) / 100.0;
        const converted = totalCost * perc;
        return `$${converted.toFixed(2)} selected to be deposited into your desired account/card immediately! (-3% associated fee)`;
    }

    const calculateDisabled = () => {
        if ((typeof cost !== "undefined" && cost !== 0) && (typeof selectedCard !== "undefined" && selectedCard !== null)) {
            return false;
        } else {
            return true;
        }
    }
    const handlePayout = () => {
        console.log("handlePayout clicked..");

        const config = {
            id: userData.uniqueId,
            accountType: userData.accountType,
            cost,
            selectedCard
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/create/payout/and/cashout/both/account/types`, config).then((res) => {
            if (res.data.message === "Cashed out funds!") {

                const { change } = res.data;

                const dividedBy10 = (balance - change) / 10;

                setBalance(balance - change);
                setSelected(null);
                setMarks({
                    0: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 0).toFixed(2)}` },
                    10: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 1).toFixed(2)}` },
                    20: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 2).toFixed(2)}` },
                    30: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 3).toFixed(2)}` },
                    40: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 4).toFixed(2)}` },
                    50: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 5).toFixed(2)}` },
                    60: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 6).toFixed(2)}` },
                    70: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 7).toFixed(2)}` },
                    80: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 8).toFixed(2)}` },
                    90: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 9).toFixed(2)}` },
                    100: { style: { color: "blue" }, label: `$${((dividedBy10 / 100) * 10).toFixed(2)}`  }
                });

                NotificationManager.success("Successfully 'cashed-out' your desired amount of funding to the desired card/account! We've successfully deposited the desired funds into your account and all actions were initiated successfully..", "Successfully 'cashed-out' desired funds/funding!", 4750);
            } else {
                console.log("err", res.data);
                
                NotificationManager.warning("An unknown error has occurred while attempting to 'cashout/payout' your selected available balance and/or funds, try reloading this page or contact support if the problem persists!", "Unknown error has occurred.", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.warning("An unknown error has occurred while attempting to 'cashout/payout' your selected available balance and/or funds, try reloading this page or contact support if the problem persists!", "Unknown error has occurred.", 4750);
        })
    }
    return (
        <Fragment>
            <Breadcrumb parent="Cashout Availiable Account Balance!" title="Cashout Your Available Fund/Funding To A Linked Account.." />
            <Container fluid={true}>
                {ready === true ? <Sheet isOpen={payoutsPaneOpen} onClose={() => setPayoutsPaneOpen(false)}>
                    <Sheet.Container>
                        <Sheet.Header>
                            <div className="create-sheet-btn-margin-pricing">
                                <Button onClick={() => setPayoutsPaneOpen(false)} style={{ width: "100%" }} outline color="danger-2x" className="btn-square-danger">Close Pane & Exit..</Button>
                            </div>
                        </Sheet.Header>
                        <Sheet.Content>
                            <Container className='custom-container-payouts' fluid={true}>
                                <Row>
                                    <Card className="card-shadow-card-add-pane">
                                        <CardHeader className="bordered-bottom-too b-t-info">
                                            <h4 className="card-pane-header">You're now viewing your previous payouts/cashouts!</h4>
                                        </CardHeader>
                                        <CardBody>
                                            <div className="table-responsive product-table">
                                                <DataTable
                                                    noHeader
                                                    columns={columns}
                                                    data={cardTableData}
                                                />
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Row>
                            </Container>
                        </Sheet.Content>
                    </Sheet.Container>
                    <Sheet.Backdrop />
                </Sheet> : null}
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className={"shadow"}>
                            <CardHeader className={"b-r-secondary b-l-secondary"}>
                                <h3>Manage your active payout/cashout methods, add a new payout method, process a "cash-out" & much more!</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <Card className="card-absolute">
                                            <CardHeader className="bg-primary">
                                                <h5 style={{ color: "#fff" }}>Manage Your Payout/Cashout Method's</h5>
                                            </CardHeader>
                                            <CardBody>
                                                <p className='lead'>You will be able to manage your "payout/cashout" methods via this page and the logic below.. You may be asking, what is a "payout/cashout"? <strong style={{ textDecorationLine: "underline" }}>Good question! Let us explain...</strong></p>
                                                <br />
                                                <p className='lead'>Payouts also known as "cashouts" are when you <strong style={{ color: "#51bb25", textDecorationLine: "underline" }}>TRANSFER FUNDS (earned funds)</strong> to your personal bank account or card!</p>
                                                <hr />
                                                <p className='lead'>We regularly send out payouts/cashouts periodically but it's good policy to make sure you know where your automatic payment's are going and when they are hitting your account(s). Through this page, you can <strong style={{ textDecorationLine: "underline" }}>IMMEDIATELY</strong> recieve funds for a minor fee (percentage - 3%) for access to your funds faster than the typical system requirements/procedure(s).</p>
                                                <hr />
                                                <Button className={"btn-square-info"} outline color={"info-2x"} style={{ width: "100%" }} onClick={() => setPayoutsPaneOpen(true)}>View ALL PREVIOUS Payouts!</Button>
                                            </CardBody>
                                        </Card>
                                    </Col> 
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <Card className="card-absolute">
                                            <CardHeader className="bg-secondary">
                                                <h5 style={{ color: "#fff" }}>You "already linked" accounts are below..</h5>
                                            </CardHeader>
                                            <CardBody>
                                                <ListGroup className='customlistgroup-payment-methods'> 
                                                    {typeof previousPayoutMethods !== "undefined" && previousPayoutMethods.length > 0 ? previousPayoutMethods.map((method, index) => {
                                                        console.log("method", method);
                                                        if (userData.accountType === "hackers") {
                                                            const { brand, exp_month, exp_year, funding, last4, country } = method;
                                                            return (
                                                                <Fragment key={index}>
                                                                    <ListGroupItem onClick={() => setSelected(method)} className={selectedCard !== null && selectedCard.id === method.id ? "list-group-item-action listitem-pricing-card flex-column align-items-start addhover-list-group-payment active" : "list-group-item-action listitem-pricing-card flex-column align-items-start addhover-list-group-payment"}>
                                                                        <div className="d-flex w-100 justify-content-between">
                                                                            <h5 className="mb-1">{`This is a ${funding} card - ${country} based`}</h5><small style={{ color: "#f73164" }} className="text-secondary">{`Payment #${index + 1}`}</small>
                                                                        </div>
                                                                        <p className="mb-1">{`**** **** **** ${last4}`}</p>
                                                                        <small className="special">{`Exp. ${exp_month}/${exp_year}`} <small className="float-right">Card Type: {brand}</small></small>
                                                                    </ListGroupItem>
                                                                </Fragment>
                                                            );
                                                        } else {
                                                            const { brand, exp_month, exp_year, funding, last4, country } = method.card;
                                                            return (
                                                                <Fragment key={index}>
                                                                    <ListGroupItem onClick={() => setSelected(method)} className={selectedCard !== null && selectedCard.id === method.id ? "list-group-item-action listitem-pricing-card flex-column align-items-start addhover-list-group-payment active" : "list-group-item-action listitem-pricing-card flex-column align-items-start addhover-list-group-payment"}>
                                                                        <div className="d-flex w-100 justify-content-between">
                                                                            <h5 className="mb-1">{`This is a ${funding} card - ${country} based`}</h5><small style={{ color: "#f73164" }} className="text-secondary">{`Payment #${index + 1}`}</small>
                                                                        </div>
                                                                        <p className="mb-1">{`**** **** **** ${last4}`}</p>
                                                                        <small className="special">{`Exp. ${exp_month}/${exp_year}`} <small className="float-right">Card Type: {brand}</small></small>
                                                                    </ListGroupItem>
                                                                </Fragment>
                                                            );
                                                        }
                                                    }) : <Fragment>
                                                        <img src={require("../../../../assets/images/nocashout.png")} className={"nocashout-img"} />
                                                    </Fragment>}
                                                </ListGroup>
                                            </CardBody>
                                        </Card>
                                    </Col> 
                                </Row>
                                <Row>
                                    {ready === true ? <Col sm="12" md="12" lg="12" xl="12">
                                        <div className='center-slider-adjustment-bar'>
                                            <p className='lead'>Please drag the marker to the appropriate position marking 'how much' you'd like ''withdrawl' on this specific transaction (the maxed value is your current <strong style={{ textDecorationLine: "underline" }}>available</strong> account balance - this doesn't include pending funding).</p>
                                            <hr />
                                            <Slider value={percentageToBePaid} startPoint={0} onAfterChange={onAfterChange} onChange={handleSliderValueChange} marks={marks} />
                                            <div className='centered-both-ways'>
                                                <h3 className='current-selected-cost' style={{ textAlign: "center" }}>{calculateCurrentSelectedCost(percentageToBePaid)}</h3>
                                            </div>
                                        </div>
                                    </Col> : null}
                                </Row>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <Card className='shadow'>
                                            <Button disabled={calculateDisabled()} className={"btn-square-success"} outline color={"success-2x"} style={{ width: "100%" }} onClick={() => handlePayout()}>Submit & Cashout Selected Amount!</Button>
                                        </Card>
                                    </Col>
                                </Row>
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
export default connect(mapStateToProps, { })(CashoutAvailiableBalanceHelper);