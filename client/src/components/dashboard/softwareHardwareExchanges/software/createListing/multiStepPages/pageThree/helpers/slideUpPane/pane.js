import React, { Fragment, useState } from "react";
import Sheet from 'react-modal-sheet';
import { Button, Container, Col, Row, Card, FormGroup, Label, CardBody, Form } from "reactstrap";
import "./styles.css";
import Breadcrumb from "../../../../../../../../../layout/breadcrumb";
import { Link } from "react-router-dom";
import helpers from "./helpers/reactHookFormRelated.js";
import functions from "./helpers/helperFunctions.js";
import { useForm, Controller } from 'react-hook-form';
import { connect } from "react-redux";
import { shiftCoreStyles } from "../../../../../../../../../redux/actions/universal/index.js";


const RenderConditionalBasedUponSellingType = (type, setValue, getValues, errors, setError, register) => {

    // const startBidCheck = helpers().startBidCheck;

    const startBidCheck = helpers().startBidCheck;
    const reservePrice = helpers().reservePrice;

    // console.log("startBidCheck : ", startBidCheck);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        // clearErrors(name);

        setValue(name, value, { shouldValidate: true })
    
        return value;
    };

    const currentValues = getValues();

    console.log("currentValues : ", currentValues);

    switch (type) {
        case "auction-ONLY":
            return (
                <Fragment>
                    <CardBody>
                        <Form className="theme-form" onSubmit={null}>
                            <Row>
                                <Col sm="12" md="6" lg="6" xl="6">
                                    <FormGroup>
                                        <Label>{startBidCheck.label}</Label>
                                        <input {...startBidCheck.check(setError, register)} pattern="[0-9]*" className="form-control" type={startBidCheck.type} name={startBidCheck.name} placeholder={startBidCheck.placeholder} onChange={(e) => {
                                            return handleInputChange(e);
                                        }} value={currentValues.startBid} />
                                        {errors.startBid ? <span className="span-tooltip">{errors.startBid.message}</span> : null}
                                    </FormGroup>
                                </Col>
                                <Col sm="12" md="6" lg="6" xl="6">
                                    <FormGroup>
                                        <Label>{reservePrice.label}</Label>
                                        <input {...reservePrice.check(setError, register)} pattern="[0-9]*" className="form-control" type={reservePrice.type} name={reservePrice.name} placeholder={reservePrice.placeholder} onChange={(e) => {
                                            return handleInputChange(e);
                                        }} value={currentValues.reservePrice} />
                                        {errors.reservePrice ? <span className="span-tooltip">{errors.reservePrice.message}</span> : null}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                
                            </Row>
                        </Form>
                    </CardBody>
                </Fragment>
            );
            break;
        case "auction-AND-buy-it-now":
            return (
                <Fragment>
                    <h1>{type}</h1>
                </Fragment>
            );
            break;
        case "buy-it-now-OR-best-offer":
            return (
                <Fragment>
                    <h1>{type}</h1>
                </Fragment>
            );
            break;
        case "buy-it-now-ONLY":
            return (
                <Fragment>
                    <h1>{type}</h1>
                </Fragment>
            );
            break;
        default:
            break;
    }
};


const SlideUpPaneAuctionPurchaseSelectionData = ({ selected, shiftCoreStyles }) => {

    const { register, handleSubmit, control, reset, getValues, setValue, setError, clearErrors, formState: { errors }} = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur"
    });

    console.log("typeOfListing", selected);

    const [ isOpen, setModalOpenStatus ] = useState(false);

    const startBidCheck = helpers().startBidCheck;

    console.log("startBidCheck : ", startBidCheck);

    console.log("helpers", helpers);

    const { handleFinalSubmissionInputs } = functions;

    // const currentValues = getValues();

    // console.log("currentValues : ", currentValues);

    return (
        <div id="sheet-container">
            <div style={{ paddingTop: "27.5px", paddingBottom: "12.5px" }} className="centered-both-ways">
                <Button onClick={() => {

                    shiftCoreStyles(true);

                    setModalOpenStatus(true);
                    // open modal to modify existing photos/images
                }} outline className="btn-pill btn-air-success stretched-purchase-options-btn" color="success" size="lg">Edit/Modify Existing Image/Photo's</Button>
            </div>
            <Sheet id="sheet-ultimate" disableDrag={true} isOpen={isOpen} onClose={() => setModalOpenStatus(false)}>
                <Sheet.Container className="sheetcontainer">
                    <Sheet.Header className="sheetheader">
                        <Row>
                            <Col sm="12" md="6" lg="6" xl="6">
                                <Button onClick={() => {
                                    handleFinalSubmissionInputs(setModalOpenStatus);
                                }} className="btn-square stretch-and-space-btn-left" active color="primary" size="md">Submit Completed Data & Close/Exit</Button>
                            </Col>
                            <Col sm="12" md="6" lg="6" xl="6">
                                <Button onClick={() => {
                                    shiftCoreStyles(false);
                                    
                                    setModalOpenStatus(false);
                                }} className="btn-square stretch-and-space-btn-right" active color="secondary" size="md">Cancel/Close</Button>
                            </Col>
                        </Row>
                    </Sheet.Header>
                    <Sheet.Content> 
                        <div className="add-normal-backer">
                            <Breadcrumb passedClassname={"custom-breadcrumb-class"} parent="Auction purchase options/settings" title="Select your preferred auction type"/>
                            <Container fluid={true}>
                                <Card className="card-main-container">
                                    <Row>
                                        <Col sm="12" md="12" lg="12" xl="12">
                                            {RenderConditionalBasedUponSellingType(selected, setValue, getValues, errors, setError, register)}
                                        </Col>
                                    </Row>
                                </Card>
                            </Container>
                        </div>
                    </Sheet.Content>
                </Sheet.Container>

                <Sheet.Backdrop style={{ zIndex: "-100" }} id="custom-backdrop-noclick" />
            </Sheet>
        </div>
    );
}
const ConnectedSlideUpPaneAuctionPurchase = connect(null, { shiftCoreStyles })(SlideUpPaneAuctionPurchaseSelectionData);

export default {
    ConnectedSlideUpPaneAuctionPurchase,
    RenderConditionalBasedUponSellingType
};