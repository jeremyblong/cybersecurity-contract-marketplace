import React, { Fragment, useState, useRef, useEffect } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import moment from "moment";
import "../styles.css";
import Sheet from 'react-modal-sheet';
import Breadcrumb from '../../../../../../../../layout/breadcrumb';
import { Container, Row, Col, Card, CardHeader, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, CardFooter, Media, Form, FormGroup, Input, ListGroup, ListGroupItem, Popover, PopoverHeader, PopoverBody, Button, InputGroup, InputGroupAddon, Label, InputGroupText } from "reactstrap"
import Select from 'react-select';


const candidateOptions = [
    { value: "Johnny Deperato", label: "Johnny Deperato" },
    { value: "Adam Jenkins", label: "Adam Jenkins" },
    { value: "Robert Farrie", label: "Robert Farrie" },
    { value: "Jessica Metcalf", label: "Jessica Metcalf" },
]

const generateRandomNumber = (num) => {
    return Math.floor(Math.random() * num) + 1;
}

const PrimaryColorAccordianHelper = (props) => {
    return (
        <Fragment>
            <Card>
                <Accordion className={"custom-accordion-bidding"}>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Active/Current Bid Count (How many unique people have bidded)
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>This listing has approximately <strong style={{ color: "blue", textDecorationLine: "underline" }}>{generateRandomNumber(50)}</strong> bids currently as of <strong style={{ color: "blue" }}>{moment(new Date()).format("MM/DD/YYYY hh:mm:ss a")}</strong>.</p>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Watch/Watcher Count (People that've saved this listing)
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>This listing <strong>currently</strong> has approximately <strong style={{ color: "blue" }}>{generateRandomNumber(125)}</strong> people <strong style={{ color: "blue" }}>"Watching"</strong> this listing. These people have bookmarked this listing & are interested and will possibly bid later towards the end of bid collections.</p>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
            </Card>
        </Fragment>
      
    );
}
const SheetPaneBiddingBettingHelper = ({ handleFinalSubmissionInputs, paneIsOpen, shiftCoreStyles, setSheetPaneOpen, clearErrors, clearAllBodyScrollLocks, handleFormReset }) => {
    const [ activeTab, setActiveTab ] = useState("1");
    const [ selectedCandidate, setSelectedCandidate ] = useState(null);
    return (
        <div id="sheet-container">
            <Breadcrumb parent="Employer Listing Betting - Gambling" title="Bet on a specific hacker (bet on WINNER of hack)" />
            <Sheet id="sheet-ultimate" disableDrag={true} isOpen={paneIsOpen} onClose={() => setSheetPaneOpen(false)}>
                <Sheet.Container className="sheetcontainer">
                    <Sheet.Header className="sheetheader">
                        <Row>
                            <Col sm="12" md="6" lg="6" xl="6">
                                <Button onClick={() => {
                                    // run submission logic
                                    handleFinalSubmissionInputs(null);
                                }} className="btn-square stretch-and-space-btn-left" active color="primary" size="md">Close/Exit Pane & Go Back To Listing Selection Area</Button>
                            </Col>
                            <Col sm="12" md="6" lg="6" xl="6">
                                <Button onClick={() => {
                                    // allow background clicking again
                                    shiftCoreStyles(false);
                                    // close modal
                                    setSheetPaneOpen(false);
                                    // clear errors
                                    clearErrors();
                                    // clear body locks ALL
                                    clearAllBodyScrollLocks();
                                    // handle form reset of any typed values
                                    handleFormReset("");
                                }} className="btn-square stretch-and-space-btn-right" active color="secondary" size="md">Cancel/Close</Button>
                            </Col>
                        </Row>
                    </Sheet.Header>
                <Sheet.Content>
                    <div className="add-normal-backer">
                        <Breadcrumb passedClassname={"custom-breadcrumb-class"} parent={`Wager bets & REAL money (Our cryptocurrency - ${process.env.REACT_APP_CRYPTO_TOKEN_NAME})`} title={"Below you find multiple options to wager REAL bets on this listing's selected hacker's"} />
                        <Container className="background-stock" fluid={true}>
                            <Row>
                                <Col sm="12" md="12" lg="12" xl="12 xl-100">
                                    <Card className="height-equal card-custom-pane-bidding">
                                        <CardHeader className="card-header-max-width-betting">
                                            <h5>Bet REAL money (cryptocurrency) and activate your inner winner! You can place bets on this listing through the form below, good luck!</h5>
                                        </CardHeader>
                                        <CardBody className="tabbed-card betting-custom-cardbody">
                                            <Nav className="nav-pills nav-primary betting-custom-nav">
                                                <NavItem>
                                                    <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                                                        <i className="icofont icofont-ui-home"></i> Primary/General Betting Types
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                                                        <i className="icofont icofont-man-in-glasses"></i> Flyer Betting (Bets AFTER intial collection)
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={activeTab}>
                                                <TabPane tabId="1">
                                                    <p className="mb-0">{"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}</p>
                                                    <hr />
                                                    <Form>
                                                        <Row>
                                                            <Col sm="12" md="6" lg="6" xl="6 xl-100">
                                                                <Select
                                                                    value={selectedCandidate}
                                                                    onChange={(selectedOption) => {
                                                                        setSelectedCandidate(selectedOption);
                                                                    }}
                                                                    options={candidateOptions}
                                                                />
                                                            </Col>
                                                            <Col sm="12" md="6" lg="6" xl="6 xl-100">
                                                                <InputGroup className="custom-inputgroup-bidding">
                                                                    <InputGroupAddon addonType="prepend">
                                                                        <InputGroupText>
                                                                            <img src={require("../../../../../../../../assets/icons/dollar-sm.png")} className="dollar-sign-custom-icon"/>
                                                                        </InputGroupText>
                                                                    </InputGroupAddon>
                                                                    <Input disabled={selectedCandidate === null ? true : false} name={"bid-amount"} className="form-control" type="text" placeholder={`Bid against/for amount in ${process.env.REACT_APP_CRYPTO_TOKEN_NAME} tokens... (Select candidate FIRST)`} />
                                                                </InputGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ paddingTop: "50px" }}>
                                                            <Col sm="12" md="12" lg="12" xl="12 xl-100">
                                                                <div className="centered-both-ways">
                                                                    <Button type="submit" style={{ width: "75%" }} outline color="success-2x" onClick={() => {
                                                                        // ~ run form submission (redux-hook-form) ~
                                                                    }}>Submit responses, close modal & submit bets!</Button>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    <p className="mb-0">{"Lorem Ipsum is simply dummy , but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages"}</p>
                                                </TabPane>
                                            </TabContent>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Sheet.Content>
                </Sheet.Container>

                <Sheet.Backdrop />
            </Sheet>
        </div>
    );
}
export default {
    PrimaryColorAccordianHelper,
    SheetPaneBiddingBettingHelper
};