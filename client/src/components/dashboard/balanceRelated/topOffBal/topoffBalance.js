import React, { Fragment, useState, useEffect } from 'react';
import "./styles.css";
import { Container, Row, Col, Card, CardBody, CardHeader, CardFooter, Input, FormGroup, Form, Label, Button } from "reactstrap";
import Breadcrumb from '../../../../layout/breadcrumb';
import Slider from 'rc-slider';
import { connect } from "react-redux";
import Cards from 'react-credit-cards';
import Select from 'react-select';
import axios from "axios";
import { NotificationManager } from 'react-notifications';

const TopOffBalanceHelper = ({ userData }) => {
    const [ valid, setValidness ] = useState(false);
    const [ percentageToBePaid, setPercentageToBePaid ] = useState(25);
    const [ cost, setCost ] = useState(0);
    const [ previousCardOptions, setPreviousCardOptions ] = useState([]);
    const [ marks, setMarks ] = useState({
        0: { style: { color: "blue" }, label: "$0.00" },
        10: { style: { color: "blue" }, label: "$125" },
        20: { style: { color: "blue" }, label: "$250" },
        30: { style: { color: "blue" }, label: "$375" },
        40: { style: { color: "blue" }, label: "$500" },
        50: { style: { color: "blue" }, label: "$625" },
        60: { style: { color: "blue" }, label: "$750" },
        70: { style: { color: "blue" }, label: "$875" },
        80: { style: { color: "blue" }, label: "$1000" },
        90: { style: { color: "blue" }, label: "$1125" },
        100: { style: { color: "blue" }, label: "$1250" }
    });
    const [ selectedPaymentCard, setSelectedCard ] = useState(null);
    const [ cardInfo, setCardInfo ] = useState({
        cvc: "",
        expiry: "",
        focus: "",
        name: "",
        number: "",
        cardType: ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setSelectedCard(null);
        
        setCardInfo(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleSliderValueChange = (percentage) => {
        console.log("handleSliderValueChange percentage", percentage);

        setPercentageToBePaid(percentage);
    }
    const onAfterChange = (percentage) => {
        console.log("onAfterChange percentage", percentage);

        const totalCost = 1250;
        const perc = parseFloat(percentage) / 100.0;
        const converted = totalCost * perc;
        setCost(converted);
    }
    const calculateCurrentSelectedCost = (percentage) => {
        const totalCost = 1250;
        const perc = parseFloat(percentage) / 100.0;
        const converted = totalCost * perc;
        return `$${converted.toFixed(0)} selected to be deposited into your account immediately!`;
    }


    useEffect(() => {
        const config = {
            params: {
                id: userData.uniqueId,
                accountType: userData.accountType
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/cards/payment/methods/both/accounts`, config).then((res) => {
            if (res.data.message === "Gathered employer payment cards!") {

                console.log(res.data);

                const { cards } = res.data;

                const convertedPaymentsArr = [];

                if (typeof cards !== "undefined" && cards.length > 0) {
                    for (let index = 0; index < cards.length; index++) {
                        const method = cards[index];
    
                        const { last4 } = method.card;
                        
                        convertedPaymentsArr.push({ label: `**** **** **** ${last4}`, value: method })
                    }
    
                    setPreviousCardOptions(convertedPaymentsArr);
                }

            } else {
                console.log("err", res.data);
                
                NotificationManager.warning("Failed to fetch your current payment method's on file, please reload this page or contact support if this problem persists...", "Failed to load previous method's!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.warning("Failed to fetch your current payment method's on file, please reload this page or contact support if this problem persists...", "Failed to load previous method's!", 4750);
        })
    }, [])

    const handleCardSelectionChange = (value) => {

        setSelectedCard(value);

        setCardInfo({
            cvc: "",
            expiry: "",
            focus: "",
            name: "",
            number: "",
            cardType: ""
        })
    }

    const calculateDisabled = () => {
        const { cvc, expiry, focus, name, number, cardType } = cardInfo;

        if ((selectedPaymentCard !== null) || (valid === true && (typeof cvc !== "undefined" && cvc.length >= 3) && (typeof expiry !== "undefined" && expiry.length >= 4) && (typeof name !== "undefined" && name.length >= 8) && (typeof number !== "undefined" && number.length >= 10))) {
            return false;
        } else {
            return true;
        }
    }
    const handleSubmissionDepositFunds = () => {
        console.log("handleSubmissionDepositFunds ran/running!");
        
        if (typeof cost !== "undefined" && cost !== 0) {
            const config = {
                id: userData.uniqueId,
                accountType: userData.accountType,
                existingCard: selectedPaymentCard !== null ? true : false,
                cardInfo,
                cost,
                selectedPaymentCard
            }
            axios.post(`${process.env.REACT_APP_BASE_URL}/deposit/funds/account/both/account/types`, config).then((res) => {
                if (res.data.message === "Successfully deposited funds!") {
    
                    console.log(res.data);
    
                    NotificationManager.success("Successfully deposited funds into your account and they are now ACTIVE and AVAILIABLE! Check your account bal to see the reflected/updated changes..", "Successfully deposited funds into account & charged card!", 4750);
    
                } else {
                    console.log("err", res.data);
                    
                    NotificationManager.warning("An unknown error has occurred while attempting to deposit funds into your account. This error could've originated from a failed payment, database errors or other misc errors. Contact support if the problem persists!", "Unknown error has occurred.", 4750);
                }
            }).catch((err) => {
                console.log(err);
    
                NotificationManager.warning("An unknown error has occurred while attempting to deposit funds into your account. This error could've originated from a failed payment, database errors or other misc errors. Contact support if the problem persists!", "Unknown error has occurred.", 4750);
            })
        } else {
            NotificationManager.info("You MUST select a value (number) amount so we know how much you'd like to deposit into your account, please select a value with the slider before proceeding...!", "Select a value/number via the slider before continuing!", 4750);
        }
    }

    console.log("Cardinfo", cardInfo);

    return (
        <Fragment>
            <Breadcrumb parent="Purchase 'In-App' Currency And/Or Deposit Fund's" title="Deposit funds into your account balance (can be withdrawn at later date)" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className={"topoff-balance-card-wrapper"}>
                            <CardHeader className={"b-l-secondary b-r-secondary"}>
                                <h3 className='title-deposit-funds'>Deposit funds into your account and/or top-off your balance with more funding!</h3>
                                <p className='lead'>You can deposit fund's into your account to have a positive availiable balance to pay hacker's/contractors, employers, purchase profile boosts, purchase tokens, etc... These funds ARE retreivable and <strong>CAN BE WITHDRAWN</strong> at any point if you wish to clear your current/availiable account balance.</p>
                            </CardHeader>
                            <CardBody className='b-l-info b-r-info'>
                                <Row>
                                    <div className='centered-both-ways'>
                                        <Col className='dotted-border-col-two-customized' sm="12" md="6" lg="6" xl="6" style={{ marginRight: "17.5px" }}>
                                            <h3>Please select a value that you wish to deposit into your account. <strong style={{ color: "darkred", textDecorationLine: "underline" }}>drag the slider</strong> to the appropriate point, select your payment method & make the desired purchase. You'll balance will be <strong style={{ color: "darkred", textDecorationLine: "underline" }}>immediately updated!</strong></h3>
                                            <hr />
                                            <div className='center-slider-adjustment-bar'>
                                                <p className='lead'>Please drag the marker to the appropriate position marking 'how much' you'd like to depsoit on this transaction..</p>
                                                <hr />
                                                <Slider value={percentageToBePaid} startPoint={0} onAfterChange={onAfterChange} onChange={handleSliderValueChange} marks={marks} />
                                                <div className='centered-both-ways'>
                                                    <h3 className='current-selected-cost' style={{ textAlign: "center" }}>{calculateCurrentSelectedCost(percentageToBePaid)}</h3>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col className='dotted-border-col-two-customized' sm="12" md="6" lg="6" xl="6">
                                            <Row style={{ paddingBottom: "10px" }}>
                                                <Label>Select An Existing Registered Card</Label>
                                                <Select
                                                    value={selectedPaymentCard}
                                                    onChange={handleCardSelectionChange}
                                                    options={previousCardOptions}
                                                />
                                            </Row>
                                            <hr />
                                            <Form className="theme-form mega-form">
                                                <FormGroup>
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        name="name"
                                                        value={cardInfo.name}
                                                        placeholder="Name (Full Name - First/Last)"
                                                        onChange={(e) => handleInputChange(e)}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Input
                                                        className="form-control"
                                                        type="number"
                                                        name="number"
                                                        value={cardInfo.number}
                                                        placeholder="Enter your card number.."
                                                        onChange={(e) => handleInputChange(e)}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Row>
                                                        <select onChange={(e) => {
                                                            const value = e.target.value;

                                                            if (value !== "") {
                                                        
                                                                cardInfo.expiry = value + cardInfo.expiry.substring(2, 5);

                                                                setSelectedCard(null);

                                                                setCardInfo(prevState => {
                                                                    return {
                                                                        ...prevState,
                                                                        expiry: cardInfo.expiry
                                                                    }
                                                                })
                                                            }
                                                        }} style={{ marginLeft: "15px" }} className="form-control digits year-date-format" name='expireMM' id='expireMM'>
                                                            <option value=''>Select a month</option>
                                                            <option value='01'>January</option>
                                                            <option value='02'>February</option>
                                                            <option value='03'>March</option>
                                                            <option value='04'>April</option>
                                                            <option value='05'>May</option>
                                                            <option value='06'>June</option>
                                                            <option value='07'>July</option>
                                                            <option value='08'>August</option>
                                                            <option value='09'>September</option>
                                                            <option value='10'>October</option>
                                                            <option value='11'>November</option>
                                                            <option value='12'>December</option>
                                                        </select> 
                                                        <select onChange={(e) => {
                                                            const value = e.target.value;

                                                            if (value !== "") {
                                                                
                                                                cardInfo.expiry = cardInfo.expiry.substring(0, 2) + value;

                                                                setSelectedCard(null);

                                                                setCardInfo(prevState => {
                                                                    return {
                                                                        ...prevState,
                                                                        expiry: cardInfo.expiry
                                                                    }
                                                                })
                                                            }
                                                        }} className="form-control digits year-date-format" name='expireYY' id='expireYY'>
                                                            <option value=''>Select a year</option>
                                                            <option value='20'>2020</option>
                                                            <option value='21'>2021</option>
                                                            <option value='22'>2022</option>
                                                            <option value='23'>2023</option>
                                                            <option value='24'>2024</option>
                                                            <option value='25'>2025</option>
                                                            <option value='26'>2026</option>
                                                            <option value='27'>2027</option>
                                                            <option value='28'>2028</option>
                                                            <option value='29'>2029</option>
                                                            <option value='30'>2030</option>
                                                            <option value='31'>2031</option>
                                                            <option value='32'>2032</option>
                                                            <option value='33'>2033</option>
                                                            <option value='34'>2034</option>
                                                            <option value='35'>2035</option>
                                                            <option value='36'>2036</option>
                                                        </select> 
                                                    </Row>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Input
                                                        className="form-control"
                                                        type="number"
                                                        name="cvc"
                                                        placeholder="CVC... (Security Code On Back)"
                                                        value={cardInfo.cvc}
                                                        onChange={(e) => handleInputChange(e)}
                                                    />
                                                </FormGroup>
                                                <div className='centered-both-ways'>
                                                    <Cards
                                                        callback={(type, isValid) => {
                                                            setCardInfo(prevState => {
                                                                return {
                                                                    ...prevState,
                                                                    cardType: type.issuer
                                                                }
                                                            })
                                                            setValidness(isValid);
                                                        }}
                                                        cvc={cardInfo.cvc}
                                                        expiry={cardInfo.expiry}
                                                        focused={cardInfo.focus}
                                                        name={cardInfo.name}
                                                        number={cardInfo.number}
                                                    />
                                                </div>
                                            </Form>
                                        </Col>
                                    </div>
                                </Row>
                                <Row style={{ marginTop: "27.5px" }}>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <Button disabled={calculateDisabled()} className={"btn-square-info"} color={"info-2x"} onClick={() => handleSubmissionDepositFunds()} outline style={{ width: "100%" }}>Submit & Purchase Account Credits & Top-Off Balance!</Button>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter className='b-l-secondary b-r-secondary'>
                                <p className='lead'>An account balance allows for specific actions such as 'purchasing tokens', 'profile boosts' and other misc. actions. It is <strong>recommended</strong> that you keep a <strong>minimum</strong> of $125.00 in your account balance at any given time however this is NOT mandatory, just recommended.</p>
                            </CardFooter>
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
export default connect(mapStateToProps, { })(TopOffBalanceHelper);