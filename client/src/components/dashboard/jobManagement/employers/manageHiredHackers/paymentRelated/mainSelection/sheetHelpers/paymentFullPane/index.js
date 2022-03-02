import React, { Fragment, useState, useEffect } from 'react';
import "./styles.css";
import Breadcrumb from '../../../../../../../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardBody, CardFooter, CardHeader, ListGroup, ListGroupItem, Popover, PopoverHeader, PopoverBody, Button } from "reactstrap"
import axios from 'axios'
import Sheet from 'react-modal-sheet';
import { connect } from "react-redux";
import { NotificationManager } from 'react-notifications';

const PaymentFullPaneManageAndPay = ({ setModalOpenToDo, setCurrentlyDue, currentApplication, paymentPaneFull, setFullPaymentPaneOpen, userData }) => {

    const [ capabilities, setCapabilities ] = useState([]);
    const [ popover, setPopover ] = useState({
        capability0: false,
        capability1: false,
        capability2: false
    })

    useEffect(() => {
        const configuration = {
            params: { 
                employerID: userData.uniqueId
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/list/employer/capabilities/payments`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered payment capabilities!") {
                console.log(res.data);

                const { capabilities } = res.data;

                const arr = [];

                for (let index = 0; index < capabilities.data.length; index++) {
                    const el = capabilities.data[index];
                    if (el.id === "card_payments" || el.id === "us_bank_account_ach_payments" || el.id === "link_payments") {
                        arr.push(el);
                    }
                }
                console.log("arr", arr);

                setCapabilities(arr);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log("Critical errror...:", err);
        })
    }, [])

    const calculateType = (type) => {
        switch (type) {
            case "card_payments":
                return "Card Payment's"
                break;
            case "link_payments":
                return "Link Payment's";
                break;
            case "us_bank_account_ach_payments":
                return "US Bank Account ACH Payment's"
                break;
            default:
                break;
        }
    }

    const handleActivation = (element, idx) => {

        const { id, status } = element; 

        if (status === "active") {
            NotificationManager.info("You've ALREADY activated this option/capability & it is currently set as 'active'. Please try this action again with a 'innactive' or 'unrequested' status types..", "Already activated this payment method!", 4750);
        } else {
            const configuration = {
                params: { 
                    employerID: userData.uniqueId,
                    elementID: id
                }
            }
            axios.get(`${process.env.REACT_APP_BASE_URL}/modify/employer/capabilities/payments`, configuration).then((res) => {
                if (res.data.message === "Successfully modified payment capabilities!") {
                    console.log(res.data);

                    const { capability, elementID } = res.data;

                    setCapabilities(prevState => {
                        return prevState.forEach((item, idx) => {
                            if (item.id === elementID) {
                                return capability;
                            } else {
                                return item;
                            }
                        })
                    });
                    
                    setPopover(prevState => {
                        return {
                            ...prevState,
                            [`capability${idx}`]: false
                        }
                    })

                    NotificationManager.success(`Successfully modified the desired capabilities & updated stripe information! You're capability ${elementID} is now ACTIVE!`, `Changed ${elementID} and is now ACTIVE!`, 4750);
                } else if (res.data.message === "You must enable further 'onboarding settings' before activating this setting..") {

                    const { currentlyDue } = res.data;

                    setCurrentlyDue(currentlyDue);

                    setFullPaymentPaneOpen(false);

                    setTimeout(() => {
                        setModalOpenToDo(true);
                    },  625);
                } {
                    console.log("Err", res.data);

                    NotificationManager.error("An unknown error has occurred while attempting to update the desired information and/or capability, Please try this action again and contact support if the problem persists!", "Unknown error has occurred!", 4750);
                }
            }).catch((err) => {
                console.log("Critical errror...:", err);

                NotificationManager.error("An unknown error has occurred while attempting to update the desired information and/or capability, Please try this action again and contact support if the problem persists!", "Unknown error has occurred!", 4750);
            })
        }
    }

    console.log("capabilities", capabilities);

    console.log("popover", popover);

    return (
        <Fragment>
            <Sheet draggable={false} isOpen={paymentPaneFull} onClose={() => setFullPaymentPaneOpen(false)}>
                <Sheet.Container>
                    <Sheet.Header>
                        <div style={{ margin: "12.5px" }} className="centered-both-ways">
                            <Button onClick={() => {
                                setPopover(() => {
                                    return {
                                        capability0: false,
                                        capability1: false,
                                        capability2: false
                                    }
                                })
                                setFullPaymentPaneOpen(false)
                            }} className={"btn-square-danger"} outline color={"danger-2x"} style={{ width: "100%" }}>Exit/Close This Pane</Button>
                        </div>
                    </Sheet.Header>
                    <Sheet.Content>
                        <div id={"breadcrumb-full-payment"}>
                            <Breadcrumb id={"breadcrumb-full-payment"} parent={"Make FULL Payment"} title={currentApplication !== null ? `Make a full deposit/payment to this contractor (${currentApplication.applicantName})` : "Loading Data..."} />
                            <Container className='container-pane-full-payment' fluid={true}>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <Card className='card-payment-entirely'>
                                            <CardHeader>
                                                <h2>Make a <strong>complete payment/deposit</strong> for {currentApplication !== null ? `Make a full deposit/payment to this contractor (${currentApplication.applicantName})` : "Loading Name/Data..."} before they can proceed with the required work on this contract..</h2>
                                            </CardHeader>
                                            <CardBody>
                                                <Row>
                                                    <Col sm="12" md="6" lg="6" xl="6">
                                                        <Card className='card-payment-entirely-halved'>
                                                            <CardHeader>
                                                                <h3 className='capabilities-header'>Capabilities related to payment method's</h3>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <ListGroup className="list-group-flush">
                                                                    {typeof capabilities !== "undefined" && capabilities.length > 0 ? capabilities.map((element, idx) => {
                                                                        return (
                                                                            <ListGroupItem key={idx}>
                                                                                <Row>
                                                                                    <Col sm="12" md="4" lg="4" xl="4">
                                                                                        <strong>Payment Type:</strong>
                                                                                    </Col>
                                                                                    <Col sm="12" md="4" lg="4" xl="4">
                                                                                        <strong style={{ color: "#f73164", textDecorationLine: "underline" }}>{calculateType(element.id)}</strong>
                                                                                    </Col>
                                                                                    <Col className='target-me' sm="12" md="4" lg="4" xl="4">
                                                                                        <div className={"create-row-capability"}>
                                                                                            <strong style={{ color: "#7366ff", textDecorationLine: "underline" }}>{element.status}</strong>
                                                                                            <img id={`capability${idx}`} onClick={() => {
                                                                                                setPopover(prevState => {
                                                                                                    return {
                                                                                                        ...prevState,
                                                                                                        [`capability${idx}`]: true
                                                                                                    }
                                                                                                })
                                                                                            }} src={require("../../../../../../../../../assets/gifs/add.gif")} className={"gif-add-capability"} />
                                                                                            <div className='zindex-pop-me'>
                                                                                                <Popover className={"elevate-popover"} placement="bottom" isOpen={popover[`capability${idx}`]} target={`capability${idx}`} toggle={() => {
                                                                                                    setPopover(prevState => {
                                                                                                        return {
                                                                                                            ...prevState,
                                                                                                            [`capability${idx}`]: !popover[`capability${idx}`]
                                                                                                        }
                                                                                                    })
                                                                                                }}>
                                                                                                    <PopoverHeader>Update/Activate Capability</PopoverHeader>
                                                                                                    <PopoverBody>Would you like to update and 'activate' this capability? You MUST have previously completed the 'onboarding-flow'.
                                                                                                    <hr />
                                                                                                    <Button onClick={() => handleActivation(element, idx)} className={"btn-square-success"} outline color={"success-2x"} style={{ width: "100%" }}>Activate!</Button>
                                                                                                    </PopoverBody>
                                                                                                </Popover>
                                                                                            </div>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </ListGroupItem>
                                                                        );
                                                                    }) : null}
                                                                </ListGroup>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                    <Col sm="12" md="6" lg="6" xl="6">
                                                        <Card className='card-payment-entirely-halved'>
                                                            <CardHeader>
                                                                
                                                            </CardHeader>
                                                            <CardBody>
                                                                
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                            <CardFooter>
                                                <Button onClick={() => {}} className={"btn-square-info"} outline color={"info-2x"} style={{ width: "100%" }}>Submit Payment & Process Deposit (double-confirm action)</Button>
                                            </CardFooter>
                                        </Card>
                                    </Col>
                                </Row>
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
export default connect(mapStateToProps, {  })(PaymentFullPaneManageAndPay);