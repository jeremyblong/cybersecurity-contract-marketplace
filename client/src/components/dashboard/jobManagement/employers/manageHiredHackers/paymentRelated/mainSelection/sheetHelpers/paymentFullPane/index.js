import React, { Fragment, useState, useEffect } from 'react';
import "./styles.css";
import Breadcrumb from '../../../../../../../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardBody, CardFooter, CardHeader, ListGroup, ListGroupItem, Popover, PopoverHeader, PopoverBody, Button } from "reactstrap"
import axios from 'axios';
import { Link } from "react-router-dom";
import Sheet from 'react-modal-sheet';
import { connect } from "react-redux";
import { NotificationManager } from 'react-notifications';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { confirmAlert } from 'react-confirm-alert';
import moment from "moment";

const PaymentFullPaneManageAndPay = ({ listing, setCurrentApplication, setCurrentlyDue, currentApplication, paymentPaneFull, setFullPaymentPaneOpen, userData }) => {

    const [ cards, setCards ] = useState([]);
    const [ activeCard, setActiveCard ] = useState(null);

    const handlePaymentInitialization = () => {
        confirmAlert({
            title: `Are you SURE you'd like to deposit ${Number(currentApplication.amountOfMoneyUponCompletion).toFixed(2)}?`,
            message: `This is NOT completely permanent, IF the contracted hacker does NOT complete the required work or is incompetent, you have the ABILITY to RETRIEVE your un-used funds at a later point. Confirmed transfers/payments will ALSO need to be confirmed by you prior to any money being transferred throughout accounts.`,
            buttons: [
              {
                label: 'Yes, Make FULL Payment!',
                onClick: () => {
                    console.log("yes notify and run logic!");

                    if (activeCard !== null) {
                        const config = {
                            userID: userData.uniqueId,
                            depositAmount: Number(currentApplication.amountOfMoneyUponCompletion).toFixed(2),
                            hackerID: currentApplication.applicantId,
                            activeCard,
                            publicCompanyName: listing.publicCompanyName,
                            jobID: currentApplication.generatedID
                        }
                
                        axios.post(`${process.env.REACT_APP_BASE_URL}/deposit/funds/specific/hacker/initialization/process`, config).then((res) => {
                            if (res.data.message === "Successfully deposited funds and notified hacker!") {
                                console.log(res.data);

                                const { employer } = res.data;
    
                                setFullPaymentPaneOpen(false);
                                
                                const findIndexJobUpdated = employer.activeHiredHackers.findIndex((x) => x.id === currentApplication.id);

                                const promises = [];
                                const foundRelated = employer.activeHiredHackers[findIndexJobUpdated];

                                for (let index = 0; index < foundRelated.paymentHistory.length; index++) {
                                    const payment = foundRelated.paymentHistory[index];

                                    if (payment.recurring === true) {
                                        // fetch the payment data..
                                        const { price } = payment.completedPayment.phases[0].items[0];

                                        promises.push(new Promise((resolve, reject) => {
                                            axios.get(`${process.env.REACT_APP_BASE_URL}/fetch/price/by/id/quick`, {
                                                params: {
                                                    priceID: price
                                                }
                                            }).then((res) => {
                                                const { priceData, message } = res.data;

                                                if (message === "Success!") {
                                                    const newPriceObj = {
                                                        ...payment,
                                                        paymentData: priceData
                                                    }
                                                    resolve(newPriceObj);
                                                } else {
                                                    resolve(null);
                                                }
                                            }).catch((err) => {
                                                reject(err);
                                            })
                                        }));
                                    } else {
                                        // just return the item - payment data already exists
                                        promises.push(new Promise((resolve) => {
                                            resolve(payment);
                                        }));
                                    }
                                }

                                Promise.all(promises).then((passedData) => {
                                    console.log("passedData", passedData);

                                    setCurrentApplication({
                                        ...foundRelated,
                                        paymentHistory: passedData
                                    });
                                })
    
                                NotificationManager.success(`We've successfully deposited the funds into ${process.env.REACT_APP_APPLICATION_NAME} & your contracted hacker is now READY to go and should start working immediately (within 1 business day)! Congrats on your new hire!`, "Succesfully processed request & notified hacker!", 4750);
                            } else {
                                console.log("Err", res.data);
    
                                NotificationManager.error("An error occurred while attempting to make changes, update the hacker hiree and process overall related logic - if this problem persists, please contact support or try this action again!", "An error occurred while attempting to notifiy related hacker!", 4750);
                            }
                        }).catch((err) => {
                            console.log("Critical err", err);
    
                            NotificationManager.error("An error occurred while attempting to make changes, update the hacker hiree and process overall related logic - if this problem persists, please contact support or try this action again!", "An error occurred while attempting to notifiy related hacker!", 4750);
                        })
                    } else {
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
    }, [])
    return (
        <Fragment>
            <Sheet className={"my-sheet-container-price-wrapper"} draggable={false} isOpen={paymentPaneFull} onClose={() => setFullPaymentPaneOpen(false)}>
                <Sheet.Container className={"my-sheet-container-price"}>
                    <Sheet.Header>
                        <div style={{ margin: "12.5px" }} className="centered-both-ways">
                            <Button onClick={() => setFullPaymentPaneOpen(false)} className={"btn-square-danger"} outline color={"danger-2x"} style={{ width: "100%" }}>Exit/Close This Pane</Button>
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
                                                <h3 className='make-full-payment-header'>Make a FULL payment to the desired hacker assigned to this contract job (escrow type deposit service - does NOT immediately transfer)!</h3>
                                                <hr />
                                                <p className='lead'>This is essentially an 'escrow' type service with <em style={{ textDecorationLine: "underline" }}>stripe</em> that deposit's funds PRIOR to a hacker starting a contract to assure both {process.env.REACT_APP_APPLICATION_NAME} AND the hacker themselves that once the <strong style={{ color: "#7366ff", textDecorationLine: "underline" }}>contract is successfully completed, the funds will be released..</strong></p>
                                            </CardHeader>
                                            <CardBody>
                                                <Row>
                                                    <div className='centered-both-ways'>
                                                        <Col className='dotted-border-col' sm="12" md="6" lg="6" xl="6">
                                                            <h3>You have choosen to pay the FULL deposit of <strong style={{ color: "darkred", textDecorationLine: "underline" }}>${Number(currentApplication.amountOfMoneyUponCompletion).toFixed(2)} (USD-$)</strong> to the hacker named <strong style={{ color: "darkred", textDecorationLine: "underline" }}>{currentApplication.applicantName}</strong></h3>
                                                            <hr />
                                                            <p className='lead'>Initialize & pay via the payment button below... Please KEEP IN MIND that transfers are NOT locked in place forever and YOU WILL be able to RETRIEVE ANY UN-USED credits/money deposited if for any circumstance your contractor fails to properly do the job or any other unfortunate circumstances. You will HOWEVER need to do this through our support team however we emphisize customer's quality of experience on our platform and will do our best to refund your desired funds, if applicable.</p>
                                                        </Col>
                                                        <Col className='dotted-border-col' sm="12" md="6" lg="6" xl="6">
                                                            <h3>Select a card that you wish to make this payment with..</h3>
                                                            <hr />
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
                                                        </Col>
                                                    </div>
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
export default connect(mapStateToProps, {  })(PaymentFullPaneManageAndPay);