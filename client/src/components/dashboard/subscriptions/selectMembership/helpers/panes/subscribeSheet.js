import React, { Fragment, useState } from 'react';
import Sheet from 'react-modal-sheet';
import { Container, Row, Col, Card, CardBody, Button, CardHeader, CardFooter, ListGroup, ListGroupItem } from 'reactstrap';
import "./styles.css";
import { NotificationManager } from 'react-notifications';
import Breadcrumb from '../../../../../../layout/breadcrumb';
import { confirmAlert } from 'react-confirm-alert';
import axios from "axios";


const SubscribeToMembershipConfirmationHelper = ({ userData, selectedSubscription, confirmationPane, setConfirmationPaneState }) => {


    const calculateTier = (tier) => {
        switch (tier) {
            case "tier-1":
                return "Tier ONE";
                break;
            case "tier-2":
                return "Tier TWO";
                break;
            case "tier-3":
                return "Tier THREE";
                break;
            default:
                break;
        }
    }
    const calculateCost = (tier) => {
        switch (tier) {
            case "tier-1":
                return "$25.00/Month";
                break;
            case "tier-2":
                return "$35.00/Month";
                break;
            case "tier-3":
                return "$45.00/Month";
                break;
            default:
                break;
        }
    }
    const calculateTierDetails = (tier) => {
        switch (tier) {
            case "tier-1":
                return (
                    <Fragment>
                        <h2 className='benifits-text'>Benifit's of this particular tier/subscription</h2>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>{"25 Free Tokens Each Month"}</ListGroupItem>
                            <ListGroupItem>{"Access to 'premier' or 'VIP' areas"}</ListGroupItem>
                            <ListGroupItem>{"1 Profile Boost Per Month"}</ListGroupItem>
                            <ListGroupItem>{"1 Ticket To A Restricted Event Per Month"}</ListGroupItem>
                        </ListGroup>
                    </Fragment>
                );
                break;
            case "tier-2":
                return (
                    <Fragment>
                        <h2 className='benifits-text'>Benifit's of this particular tier/subscription</h2>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>{"40 Free Tokens Each Month"}</ListGroupItem>
                            <ListGroupItem>{"Access to 'premier' or 'VIP' areas"}</ListGroupItem>
                            <ListGroupItem>{"3 Profile Boost(s) Per Month"}</ListGroupItem>
                            <ListGroupItem>{"2 Tickets To A Restricted Event Per Month"}</ListGroupItem>
                            <ListGroupItem>{"Earn 1.5x Experience Per Every 1x Earned"}</ListGroupItem>
                        </ListGroup>
                    </Fragment>
                );
                break;
            case "tier-3":
                return (
                    <Fragment>
                        <h2 className='benifits-text'>Benifit's of this particular tier/subscription</h2>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>{"60 Free Tokens Each Month"}</ListGroupItem>
                            <ListGroupItem>{"Access to 'premier' or 'VIP' areas"}</ListGroupItem>
                            <ListGroupItem>{"5 Profile Boost(s) Per Month"}</ListGroupItem>
                            <ListGroupItem>{"3 Tickets To A Restricted Event Per Month"}</ListGroupItem>
                            <ListGroupItem>{"Earn 1.5x Experience Per Every 1x Earned"}</ListGroupItem>
                        </ListGroup>
                    </Fragment>
                );
                break;
            default:
                break;
        }
    }
    const handleRequest = (tier) => {
        console.log("handleRequest", tier);

        const configuration = {
            signedinID: userData.uniqueId,
            signedinAccountType: userData.accountType,
            tier
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/subscribe/membership/both/account/types`, configuration).then((res) => {
            if (res.data.message === "Subscribed successfully!") {
                console.log(res.data);
    
                NotificationManager.success("We've successfully charged your account & activated your subscription & benifits! Token's, 'boosts' and other cooresponding 'addons' were added to your account successfully and are now ACTIVE!", "Purchase successful, ACCOUNT MODIFIED W/BENIFITS!", 4750);
    
            } else if (res.data.message === "Have NOT completed onboarding flow..") {
                NotificationManager.warning("You MUST complete the account 'onboarding-flow' BEFORE attempting to make any purchases or any other related payment logic - please complete the onboarding flow & try this action again!", "MUST complete 'onboarding flow' BEFORE making this request!", 4750);
            } else {
                console.log("Err", res.data);
    
                NotificationManager.error("An unknown error has occurred while attempting 'subscribe' to the appropriate 'tier', no changes were made! Contact support if the problem persists over a period of time..", "Unknown error has occurred!", 4750);
            }
        }).catch((err) => {
            console.log("Critical errror...:", err);
    
            NotificationManager.error("An unknown error has occurred while attempting 'subscribe' to the appropriate 'tier', no changes were made! Contact support if the problem persists over a period of time..", "Unknown error has occurred!", 4750);
        })
    }
    const subscribeToMembership = (tier) => {
        setConfirmationPaneState(false);
        confirmAlert({
            title: `Are you sure you'd like to subscribe?`,
            message: `You're about to subscribe to this membership UNTIL cancelled, are you sure you'd like to do this? You can manage your active subscriptions in your 'account acccess' section..`,
            buttons: [
              {
                label: 'Yes, Sign Me Up!',
                onClick: () => {
                    handleRequest(tier);
                }
              },
              {
                label: 'No, Cancel..',
                onClick: () => {

                }
              }
            ]
        });
    }
    return (
        <Fragment>
            <Sheet isOpen={confirmationPane} onClose={() => setConfirmationPaneState(false)}>
                <Sheet.Container>
                    <Sheet.Header>
                        <div className='marginized-header'>
                            <Button className='btn-square-danger' color={"danger-2x"} style={{ width: "100%" }} outline onClick={() => setConfirmationPaneState(false)}>Cancel/Close Pane</Button>
                        </div>
                    </Sheet.Header>
                        <div className='inner-container-invite'>
                            <Sheet.Content>
                            <Breadcrumb parent="Subscribe To One Of Our Premium Memberships!" title="Subscribe To A Membership For Premium Benifits & Advantage's.." />
                                <Container fluid={true}>
                                    <Col lg="12 box-col-12" xl="12 xl-100" md="12">
                                        <Card className={"card-shadow-messaging-initialize"}>
                                            <CardHeader className={"b-l-primary b-r-primary"}>
                                                <h3>You've selected <strong style={{ color: "#f73164", textDecorationLine: "underline" }}>{calculateTier(selectedSubscription)}</strong> for your selected 'subscription'! You will recieve multiple benifits that coorelate to the cooresponding tier.. This will cost you approx. <strong style={{ color: "#51bb25", textDecorationLine: "underline" }}>{calculateCost(selectedSubscription)}</strong> but we assure you it is <strong>WELL</strong> worth it!</h3>
                                            </CardHeader>
                                            <CardBody>
                                                <Row>
                                                    <Col sm="12" md="6" lg="6" xl="6">
                                                        <Card className="card-absolute">
                                                            <CardHeader className="bg-secondary">
                                                                <h5 style={{ color: "#fff" }}>Are you sure you'd like to proceed with this purchase?</h5>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <p>If you're sure you'd like to proceed with this purchase, please click the button below to intialize the subscription process/flow & we will then process your request!</p>
                                                                <hr />
                                                                <Button className='btn-square-success' color={"success-2x"} style={{ width: "100%" }} outline onClick={() => subscribeToMembership(selectedSubscription)}>Subscribe To This Membership!</Button>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                    <Col sm="12" md="6" lg="6" xl="6">
                                                        {calculateTierDetails(selectedSubscription)}
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                            <CardFooter className={"b-l-primary b-r-primary"}>
                                                <p className='lead'>Subscribing to one of our 'Premium Tiers' is an <strong>excellent</strong> way to improve your odds of success and boost your visibility throughout our custom platform/marketplace. You will recieve numerous advantages listed in the previous selection page..</p>
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

export default SubscribeToMembershipConfirmationHelper;