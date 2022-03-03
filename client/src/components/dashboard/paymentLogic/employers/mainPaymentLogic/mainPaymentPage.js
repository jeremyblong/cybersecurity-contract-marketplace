import React, { Fragment, useState, useEffect, useRef } from "react";
import "./styles.css";
import { Container, Row, Col, Button, Card, CardBody, Media, Input, FormGroup, Form, CardHeader, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from "react-redux";
import Breadcrumb from '../../../../../layout/breadcrumb';
import BottomAddNewPaymentMethodTabbedEmployerHelper from './helpers/bottomTabbed/bottomTabbedHelper.js';
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import Sheet from 'react-modal-sheet';
import DataTable from 'react-data-table-component';
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert';


const columns = [
    {
        name: 'Card Number (last 4)',
        selector: row => row.number,
    },
    {
        name: 'Card Name (Full Name)',
        selector: row => row.name,
    },
    {
        name: 'Exp (Expiration Date)',
        selector: row => row.expiry,
    },
    {
        name: 'Date Added (From Now)',
        selector: row => row.dateAdded,
    },
    {
        name: 'Card Type (Visa, Mastercard, etc...)',
        selector: row => row.cardType,
    },
    {
        name: "Card Action's",
        selector: row => row.action,
    }
];

const PaymentMethodsAddNewPaymentMethodEmployerHelper = ({ userData }) => {
    const [ paymentMethods, setPaymentMethods ] = useState([]);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ cardTableData, setCardTableData ] = useState([]);
    const [ ready, setReady ] = useState(false);
    const [ primaryCard, setPrimaryCard ] = useState(null);

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
        
        setCardInfo(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    useEffect(() => {
        const config = {
            params: {
                id: userData.uniqueId,
                accountType: userData.accountType
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/determine/primary/card/on/file`, config).then((res) => {
            if (res.data.message === "Successfully found primary card!") {

                console.log(res.data);

                const { lastFour } = res.data;

                if (lastFour !== null) {
                    setPrimaryCard(lastFour);
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
    const deleteSpecificCard = (paymentID) => {
        console.log("paymentID", paymentID);

        setIsOpen(false);

        confirmAlert({
            title: `You're about to delete a card off of your account...`,
            message: `Are you sure you'd like to delete this card permenantly from your account? This action cannot be undone and you will have to add the card again if you wish to use it in the future...`,
            buttons: [
              {
                label: 'Yes, Delete This Card!',
                onClick: () => {
                    axios.post(`${process.env.REACT_APP_BASE_URL}/delete/debit/credit/card/employer/account`, {
                        hackerID: userData.uniqueId,
                        paymentID
                    }).then((res) => {
                        if (res.data.message === "Successfully deleted the desired payment method!") {
            
                            console.log(res.data);
            
                            const { payments } = res.data;
            
                            const convertedPaymentsArr = [];
            
                            if (typeof payments !== "undefined" && payments.length > 0) {
                                for (let index = 0; index < payments.length; index++) {
                                    const method = payments[index];
                                    
                                    convertedPaymentsArr.push({
                                        number: <div className='font-secondary'>{method.lastFour}</div>,
                                        name: method.name,
                                        expiry: method.expiry,
                                        dateAdded: moment(method.dateAddedRaw).fromNow(),
                                        cardType: method.cardType,
                                        action: <div><span><i onClick={() => {
                                            deleteSpecificCard(method.id)
                                        }} className="fa fa-trash add-hover-effect-icon" style={{ width: 35, fontSize: 16, padding: 11, color: '#e4566e' }}></i></span>
                                        <span><i onClick={() => {
                                            console.log(method);
                                        }} className="fa fa-pencil add-hover-effect-icon" style={{ width: 35, fontSize: 16, padding: 11, color: 'rgb(40, 167, 69)' }}></i></span>
                                        </div>
                                    })
                                }
                            }
            
                            setCardTableData(convertedPaymentsArr);
                            setPaymentMethods(payments);
            
                        } else {
                            console.log("err", res.data);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
              },
              {
                label: 'No, Cancel!',
                onClick: () => {}
              }
            ]
        });
    }
    useEffect(() => {
        const config = {
            params: {
                hackerID: userData.uniqueId
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/existing/payment/methods/employer`, config).then((res) => {
            if (res.data.message === "Successfully gathered existing payment method's!") {

                console.log(res.data);

                const { paymentMethods } = res.data;

                const convertedPaymentsArr = [];

                for (let index = 0; index < paymentMethods.length; index++) {
                    const method = paymentMethods[index];
                    
                    convertedPaymentsArr.push({
                        number: <div className='font-secondary'>{method.lastFour}</div>,
                        name: method.name,
                        expiry: method.expiry,
                        dateAdded: moment(method.dateAddedRaw).fromNow(),
                        cardType: method.cardType,
                        action: <div><span><i onClick={() => {
                            deleteSpecificCard(method.id)
                        }} className="fa fa-trash add-hover-effect-icon" style={{ width: 35, fontSize: 16, padding: 11, color: '#e4566e' }}></i></span>
                        <span><i onClick={() => {
                            console.log(method);
                        }} className="fa fa-pencil add-hover-effect-icon" style={{ width: 35, fontSize: 16, padding: 11, color: 'rgb(40, 167, 69)' }}></i></span>
                        </div>
                    })
                }

                setCardTableData(convertedPaymentsArr);
                setPaymentMethods(paymentMethods);
                setReady(true);

            } else {
                console.log("err", res.data);
                
                NotificationManager.warning("Failed to fetch your current payment method's on file, please reload this page or contact support if this problem persists...", "Failed to load previous method's!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.warning("Failed to fetch your current payment method's on file, please reload this page or contact support if this problem persists...", "Failed to load previous method's!", 4750);
        })
    }, [])
    return (
        <Fragment>
            <Breadcrumb parent="Manage Your Active Payment Method's" title="Add A New Payment Method(s)"/>
            {ready === true ? <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <Sheet.Container>
                    <Sheet.Header>
                        <div className="create-sheet-btn-margin-pricing">
                            <Button onClick={() => setIsOpen(false)} style={{ width: "100%" }} outline color="danger-2x" className="btn-square-danger">Close Pane & Exit..</Button>
                        </div>
                    </Sheet.Header>
                    <Sheet.Content>
                        <Container fluid={true}>
                            <Row>
                                <Card className="card-shadow-card-add-pane">
                                    <CardHeader className="bordered-bottom-too b-t-info">
                                        <h4 className="card-pane-header">View & manage all of your current cards from this screen!</h4>
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
            <Container fluid={true}>
                <Row>
                    <Col>
                    <Card className="card-shadow-card-add">
                        <Row className="product-page-main">
                            <Col lg="6" sm="12" md="6" xl="6 xl-100">
                                <Card>
                                    <CardBody>
                                        <div className="product-page-details">
                                            <h3>{"Manage your payment methods, add new methods, view current methods & much more!"}</h3>
                                        </div>
                                        <div className="product-price custom-payment-product-price f-20">
                                            <em style={{ color: "black" }}>Current Primary:</em> **** **** **** {primaryCard !== null ? primaryCard : "****"}
                                        </div>
                                        <hr/>
                                        <p>You can manage any/all card or payment related activity with this page. These are the cards/payment-methods that'll be used to <strong style={{ color: "#f73164", textDecorationLine: "underline" }}>purchase {process.env.REACT_APP_APPLICATION_NAME}'s {process.env.REACT_APP_CRYPTO_TOKEN_NAME}</strong> to be gambled or used as payment for completed hack's. Check out the options on this page to explore our various payment logic...</p>
                                        <hr/>
                                        <div>
                                            <table className="product-page-width">
                                            <tbody>
                                                <tr>
                                                <td> <b>Current Active Cards &nbsp;&nbsp;&nbsp;:</b></td>
                                                <td className="txt-secondary">{0} Method's</td>
                                                </tr>
                                                <tr>
                                                <td> <b>Availiable Pending Payment Slots &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                <td className="txt-secondary">{10} Slots</td>
                                                </tr>
                                                <tr>
                                                <td> <b>Your Current {process.env.REACT_APP_CRYPTO_TOKEN_NAME} # Count &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                <td className="txt-secondary">{1150} Token's</td> 
                                                </tr>
                                                <tr>
                                                <td> <b>Current conversion per each {process.env.REACT_APP_CRYPTO_TOKEN_NAME} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                <td className="txt-secondary">{"$15/Token (per each token conversion)"}</td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                        <hr/>
                                        <Row>
                                            <Col md="6">
                                            <h6 className="product-title">{`Share your ${process.env.REACT_APP_CRYPTO_TOKEN_NAME} count/supply!`}</h6>
                                            </Col>
                                            <Col md="6">
                                            <div className="product-icon">
                                                <ul className="product-social">
                                                <li className="d-inline-block"><a href={null}><i className="fa fa-facebook"></i></a></li>
                                                <li className="d-inline-block"><a href={null}><i className="fa fa-google-plus"></i></a></li>
                                                <li className="d-inline-block"><a href={null}><i className="fa fa-twitter"></i></a></li>
                                                <li className="d-inline-block"><a href={null}><i className="fa fa-instagram"></i></a></li>
                                                <li className="d-inline-block"><a href={null}><i className="fa fa-rss"></i></a></li>
                                                </ul>
                                                <form className="d-inline-block f-right"></form>
                                            </div>
                                            </Col>
                                        </Row>
                                        <hr/>
                                            <Row>
                                                <Col md="12" lg="12" xl="12" sm="12">
                                                    <div className="m-t-15">
                                                        <Button style={{ width: "100%" }} color="primary-2x" outline className="btn-square-primary m-r-10" onClick={() => {}} >
                                                            <i className="fa fa-shopping-basket mr-1"></i>Purchase MORE {process.env.REACT_APP_CRYPTO_TOKEN_NAME}
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        <hr/>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" sm="12" md="6" xl="6 xl-100">
                                <Card>
                                    <CardHeader>
                                        <div className="product-page-details">
                                            <h3>{"Previously Added Card(s) & Method's"}</h3>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <ListGroup>
                                            {typeof paymentMethods !== "undefined" && paymentMethods.length > 0 ? paymentMethods.slice(0, 3).map((payment, idx) => {
                                                return (
                                                    <Fragment key={idx}>
                                                        <ListGroupItem className="list-group-item-action listitem-pricing-card flex-column align-items-start">
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5 className="mb-1">{payment.name}</h5><small style={{ color: "#f73164" }} className="text-secondary">{"Primary Method"}</small>
                                                            </div>
                                                            <p className="mb-1">{`${payment.lastFour}`}</p>
                                                            <small className="text-muted">{`Exp. ${payment.expiry}`} <small className="float-right">Card Type: {payment.cardType}</small></small>
                                                        </ListGroupItem>
                                                    </Fragment>
                                                );
                                            }) : <Fragment>
                                                <div className="centered-both-ways">
                                                    <img src={require("../../../../../assets/images/credit-cards.jpg")} className={"credit-cards-placeholder"} />
                                                </div>
                                            </Fragment>}
                                        </ListGroup>
                                        <div className="centered-both-ways">
                                            <div className="view-all-card-wrapper">
                                                <a onClick={() => setIsOpen(true)} className="view-all-card-text">View ALL Card's/Method's</a>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                <BottomAddNewPaymentMethodTabbedEmployerHelper setPaymentMethods={setPaymentMethods} handleInputChange={handleInputChange} cardInfo={cardInfo} setCardInfo={setCardInfo} /></Col>
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
export default connect(mapStateToProps, {  })(PaymentMethodsAddNewPaymentMethodEmployerHelper);