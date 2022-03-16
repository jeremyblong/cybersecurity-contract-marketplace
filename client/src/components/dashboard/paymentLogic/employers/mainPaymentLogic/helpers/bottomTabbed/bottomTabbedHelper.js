import React, { Fragment, useState } from 'react';
import "./styles.css";
import Cards from 'react-credit-cards';
import { Row, Col, Button, Card, CardBody, Input, FormGroup, Form, CardHeader, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import axios from "axios";
import { connect } from "react-redux";
import crypto from "../../../../../../../utils/crypto.js";


const { 
    encryptObject 
} = crypto;


const BottomAddNewPaymentMethodTabbedEmployerHelper = ({ setPaymentMethods, userData, handleInputChange, cardInfo, setCardInfo }) => {
    const [activeTab, setActiveTab] = useState('1');
    const [ valid, setValidness ] = useState(false);

    const calculateReadiness = () => {
        const { number, name, expiry, cvc } = cardInfo;

        if (valid === true && typeof name !== "undefined" && name.length > 0 && typeof expiry !== "undefined" && expiry.length >= 4 && typeof cvc !== "undefined" && cvc.length >= 3) {
            return false;
        } else {
            return true;
        }
    }
    const addNewCardToAccount = () => {

        const encryptedCardInfo = encryptObject(cardInfo);

        const config = {
            encryptedCardInfo,
            employerID: userData.uniqueId
        }
    
        axios.post(`${process.env.REACT_APP_BASE_URL}/add/new/payment/method/employer`, config).then((res) => {
            if (res.data.message === "Successfully added a new payment method!") {

                console.log(res.data);

                const { newPaymentAddition } = res.data;

                setCardInfo({
                    cvc: "",
                    expiry: "",
                    focus: "",
                    name: "",
                    number: "",
                    cardType: ""
                })

                setPaymentMethods(prevState => [...prevState, newPaymentAddition]);
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <Fragment>
            <Card className="card-shadow-card-add">
                <Row className="product-page-main m-0">
                    <Col sm="12">
                    <Nav tabs className="border-tab">
                        <NavItem  id="myTab" role="tablist">
                            <NavLink href="#" className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                                Add New Card Payment Method
                            </NavLink>
                            <div className="material-border"></div>
                        </NavItem>
                        <NavItem  id="myTab" role="tablist">
                            <NavLink href="#"  className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                                Payment Related Overview
                            </NavLink>
                            <div className="material-border"></div>
                        </NavItem>
                        <NavItem  id="myTab" role="tablist">
                            <NavLink href="#"  className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
                                Other Payment Method's
                            </NavLink>
                            <div className="material-border"></div>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Col lg="12" sm="12" md="12" xl="12 xl-100">
                                <Card className="height-equal credit-form">
                                    <CardHeader className="py-4">
                                        <h5>Add a Credit/Debit Card</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col md="7">
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
                                                            type="text"
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
                                                            type="text"
                                                            name="cvc"
                                                            placeholder="CVC... (Security Code On Back)"
                                                            value={cardInfo.cvc}
                                                            onChange={(e) => handleInputChange(e)}
                                                        />
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                            <Col md="5" className="text-center">
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
                                            </Col>
                                        </Row>
                                    </CardBody>
                                    <Row>
                                        <Col sm="12" md="12" lg="12" xl="12">
                                            <Button onClick={addNewCardToAccount} disabled={calculateReadiness()} style={{ width: "100%" }} color="success" className="btn-square-success">
                                                <i className="fa fa-submit mr-1"></i> Submit New Payment Method
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </TabPane>
                        <TabPane tabId="2">
                            <p className="mb-0 m-t-20">{"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}</p>
                        </TabPane>
                        <TabPane tabId="3">
                            <p className="mb-0 m-t-20"> {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}</p>
                        </TabPane>
                    </TabContent>
                    </Col>
                </Row>
            </Card>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {  })(BottomAddNewPaymentMethodTabbedEmployerHelper);