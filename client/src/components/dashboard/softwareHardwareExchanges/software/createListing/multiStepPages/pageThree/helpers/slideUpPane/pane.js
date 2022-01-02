import React, { Fragment, useState, useRef } from "react";
import Sheet from 'react-modal-sheet';
import { Button, Container, Col, Row, Card, FormGroup, Label, CardBody, Form, InputGroupAddon, InputGroup, InputGroupText } from "reactstrap";
import "./styles.css";
import Breadcrumb from "../../../../../../../../../layout/breadcrumb";
import helpers from "./helpers/reactHookFormRelated.js";
import functions from "./helpers/helperFunctions.js";
import { useForm, Controller } from 'react-hook-form';
import { connect } from "react-redux";
import { shiftCoreStyles } from "../../../../../../../../../redux/actions/universal/index.js";
import Select from 'react-select';
import { saveSoftwareListingInfo } from "../../../../../../../../../redux/actions/hackers/createSoftwareListing/createNewSoftwareListingSale.js";
import { NotificationManager } from 'react-notifications';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import _ from "lodash";
import Switch from "react-switch";

// ~ helper function rendered in main component (bottom of this component) ~
const RenderConditionalBasedUponSellingType = ({ clearAllBodyScrollLocks, handleDynamicFormReset, quantityAvailabilityOptions, acceptCouponsDiscountsOptions, reset, type, setValue, getValues, errors, setError, register, control, clearErrors, biddingIncrementIntervalOptions, handleSubmit, shiftCoreStyles, setModalOpenStatus, saveSoftwareListingInfo, previouslySavedSoftwareData }) => {
    // ref's below...
    const biddingIncrementIntervalGeneratedRef = useRef(null);
    const quantityAvailableForSaleGeneratedRef = useRef(null);
    const discountCodeAcceptanceGeneratedRef = useRef(null);
    // imported helper functions below...
    const startBidCheck = helpers().startBidCheck;
    const reservePrice = helpers().reservePrice;
    const biddingIncrementIntervalHelper = helpers().biddingIncrementIntervalHelper;
    const quantityAvailability = helpers().quantityAvailability;
    const acceptCouponsDiscounts = helpers().acceptCouponsDiscounts;
    const whatsIncludedInfoListing = helpers().whatsIncludedInfoListing;
    const buyItNowHelper = helpers().buyItNowHelper;
    const automaticAcceptBestOffer = helpers().automaticAcceptBestOffer;
    const minimumRequiredOffer = helpers().minimumRequiredOffer;
    // gather redux-hook-form values (basically a "state" replacement).
    const currentValues = getValues();

    const [ buyitnowChecked, setBuyitnowState ] = useState(true);
    const [ auctionChecked, setAuctionCheckedState ] = useState(true);
    const [ switchText, setSwitchTextState ] = useState("'AUCTION & BUY-IT-NOW' (gives user's both options) is enabled/selected currently/by-default and you're only allowed to sell ONE (1) quantity of what you're selling (1 Quantity Available TOTAL - this will create competition between submitted offers to submit the highest offer to win this listing). Your selection of 'AUCTION & BUY-IT-NOW' is now SELECTED!");
    const [ switchTextAuctionBuyitnow, setSwitchTextAuctionBuyitnowState ] = useState("'AUCTION & BIDDING' both are enabled/selected currently/by-default and you're only allowed to sell ONE (1) quantity of what you're selling (1 Quantity Available TOTAL - this will create competition between submitted offers to submit the highest offer to win this listing). Your selection of 'AUCTION & BIDDING' both are now SELECTED!");

    // console.log("startBidCheck : ", startBidCheck);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        // clearErrors(name);

        setValue(name, value, { shouldValidate: true })
    
        return value;
    };
    const handleTimespanSelectChange = (selectedOption) => {
        // run conditionals
        setValue('biddingIncrementInterval', selectedOption, { shouldValidate: false });

        biddingIncrementIntervalGeneratedRef.current.blur();
    }
    const handleQuantityAvailabilityChange = (selectedOption) => {
        // run conditionals
        setValue('quantityAvailableForSale', selectedOption, { shouldValidate: false });

        quantityAvailableForSaleGeneratedRef.current.blur();
    }
    const handleAcceptCouponsDiscountsChange = (selectedOption) => {
        // run conditionals
        setValue('discountCodeAcceptance', selectedOption, { shouldValidate: false });

        discountCodeAcceptanceGeneratedRef.current.blur();
    }

    const menuClosedSelectInput = () => {
        if (currentValues.biddingIncrementInterval) {
            // setSelectOneErrorStatus(true);
        } 
    }
    const onSubmit = (data, e, selectedType) => {

        console.log("DATA@!", data, currentValues);

        e.preventDefault();

        if (data !== '') {

            const { reservePrice, startBid } = data;

            switch (selectedType) {
                case "auction-ONLY":
                        const omittedKeysAuctionOnly = _.omit(data, ["reservePrice", "startBid"]);

                        const newDataObj = {
                            auctionPriceRelatedData: {
                                ...omittedKeysAuctionOnly,
                                reservePrice: Number(Math.round(Number(reservePrice))), 
                                startBid: Number(Math.round(Number(startBid))),
                                auctionSelectedType: selectedType
                            }
                        }

                        const mergedPreviousNewState = {...previouslySavedSoftwareData, ...newDataObj};

                        saveSoftwareListingInfo(mergedPreviousNewState);

                        shiftCoreStyles(false);
                        setModalOpenStatus(false);

                        handleDynamicFormReset("auction-ONLY");
                    break;
                case "auction-AND-buy-it-now":
                        const omittedKeysAuctionAndBuyitnow = _.omit(data, ["reservePrice", "startBid", "buyItNowPrice"]);

                        const newDataObjAuctionAndBuyitnow = {
                            auctionPriceRelatedData: {
                                ...omittedKeysAuctionAndBuyitnow,
                                reservePrice: Number(Math.round(Number(reservePrice))), 
                                startBid: Number(Math.round(Number(startBid))),
                                buyItNowData: auctionChecked === true ? {
                                    active: true,
                                    buyItNowPrice: Number(Math.round(Number(data.buyItNowPrice)))
                                } : {
                                    active: false,
                                    buyItNowPrice: undefined
                                },
                                auctionSelectedType: selectedType
                            }
                        }

                        const mergedPreviousNewStateAuctionAndBuyitnow = {...previouslySavedSoftwareData, ...newDataObjAuctionAndBuyitnow};

                        saveSoftwareListingInfo(mergedPreviousNewStateAuctionAndBuyitnow);

                        shiftCoreStyles(false);
                        setModalOpenStatus(false);

                        handleDynamicFormReset("auction-AND-buy-it-now");
                    break;
                case "buy-it-now-ONLY":
                        const omittedKeysBuyitnowOnlyConcattenated = _.omit(data, ["buyItNowPrice"]);

                        const newDataObjBuyitnowOnly = {
                            auctionPriceRelatedData: {
                                ...omittedKeysBuyitnowOnlyConcattenated,
                                buyItNowPrice: Number(Math.round(Number(data.buyItNowPrice))),
                                auctionSelectedType: selectedType
                            }
                        }

                        const mergedPreviousNewStateBuyitnowOnly = {...previouslySavedSoftwareData, ...newDataObjBuyitnowOnly};

                        saveSoftwareListingInfo(mergedPreviousNewStateBuyitnowOnly);

                        shiftCoreStyles(false);
                        setModalOpenStatus(false);

                        handleDynamicFormReset("buy-it-now-ONLY");
                    break;
                case "buy-it-now-OR-best-offer":
                        const omittedKeysBuyitnowOrBestOffer = _.omit(data, ["buyItNowPrice", "minimumRequiredOfferValue", "automaticBestOfferAccept"]);

                        const newDataObjBuyitnowOrBestOffer = {
                            auctionPriceRelatedData: {
                                ...omittedKeysBuyitnowOrBestOffer,
                                buyItNowPrice: Number(Math.round(Number(data.buyItNowPrice))),
                                offerFeatureData: buyitnowChecked === true ? {
                                    minimumRequiredOfferValue: Number(Math.round(Number(data.minimumRequiredOfferValue))),
                                    automaticBestOfferAccept: Number(Math.round(Number(data.automaticBestOfferAccept))),
                                    active: true
                                } : {
                                    active: false,
                                    automaticBestOfferAccept: undefined,
                                    minimumRequiredOfferValue: undefined
                                },
                                auctionSelectedType: selectedType
                            }
                        };

                        const mergedPreviousNewStateBuyitnowOrBestOffer = {...previouslySavedSoftwareData, ...newDataObjBuyitnowOrBestOffer};

                        saveSoftwareListingInfo(mergedPreviousNewStateBuyitnowOrBestOffer);

                        shiftCoreStyles(false);
                        setModalOpenStatus(false);

                        handleDynamicFormReset("buy-it-now-OR-best-offer");
                    break;
                default:
                    break;
            }

            clearAllBodyScrollLocks();

            NotificationManager.success("We've successfully added your new data (from the slide up pane - listing auction/buy-it-now/best-offer information) to your prepared listing which will be uploaded upon completion!", "Successfully updated listing information!", 4500);
        } else {
            console.log("onSubmit failure :(");

            errors.showMessages();
        }
    };
    const onError = async (errors, e, innerRun) => {
        console.log("error submitting...!", errors, e, innerRun);
    };

    console.log("currentValues : ", currentValues);

    const handleSwitchValueChange = (value) => {
        if (value === true) {
            const option = { label: "1 Quantity Available (Can be sold an unlimited amount of times - basically 1 per purchase per user)", value: "1", numericalAmount: 1, min: 1, max: 1 };

            setSwitchTextState("'AUCTION & BUY-IT-NOW' (gives user's both options) is enabled/selected currently/by-default and you're only allowed to sell ONE (1) quantity of what you're selling (1 Quantity Available TOTAL - this will create competition between submitted offers to submit the highest offer to win this listing). Your selection of 'AUCTION & BUY-IT-NOW' is now SELECTED!");
            // check if quanitity value already selected
            if (currentValues.quantityAvailableForSale && Object.keys(currentValues.quantityAvailableForSale).length > 0) {
                // update switch state
                setBuyitnowState(value);
            } else {
                // update react-hook-form state with default "Buy-it-now" option as "option" from above
                setValue('quantityAvailableForSale', option, { shouldValidate: false });
                // quantity value NOT already selected - do nothing but update switch state
                setBuyitnowState(value);
            }
        } else {
            setSwitchTextState("MULTIPLE quantities are selected (ALLOWING MULTIPLE SALES) and available so you can sell multiples of whatever software you're selling (Can be sold an unlimited amount of times - basically 1 per purchase per user). You've SELECTED to DISABLE the 'BEST-OFFER' setting.");
            // clear non-used redux-hook-form value (since its not being used anymore temporarily)
            reset({ automaticBestOfferAccept: "", minimumRequiredOfferValue: "" });
            // update switch state
            setBuyitnowState(value);
        }
    }
    const handleSwitchValueChangeAuctionBuyitnow = (value) => {
        if (value === true) {
            const option = { label: "1 Quantity Available (Can be sold an unlimited amount of times - basically 1 per purchase per user)", value: "1", numericalAmount: 1, min: 1, max: 1 };
            // setSwitchTextAuctionBuyitnowState
            setSwitchTextAuctionBuyitnowState("'AUCTION & BIDDING' both are enabled/selected currently/by-default and you're only allowed to sell ONE (1) quantity of what you're selling (1 Quantity Available TOTAL - this will create competition between submitted offers to submit the highest offer to win this listing). Your selection of 'AUCTION & BIDDING' both are now SELECTED!");
            // check if quanitity value already selected
            if (currentValues.quantityAvailableForSale && Object.keys(currentValues.quantityAvailableForSale).length > 0) {
                // update switch state
                setAuctionCheckedState(value);
            } else {
                // update react-hook-form state with default "Buy-it-now" option as "option" from above
                setValue('quantityAvailableForSale', option, { shouldValidate: false });
                // quantity value NOT already selected - do nothing but update switch state
                setAuctionCheckedState(value);
            }
        } else {
            setSwitchTextAuctionBuyitnowState("'AUCTION-ONLY' is enabled/selected currently and you're only allowed to sell ONE (1) quantity of what you're selling (1 Quantity Available TOTAL - this will create competition between submitted offers to submit the highest offer to win this listing). Your selection of 'AUCTION-ONLY' is now SELECTED!");
            // clear non-used redux-hook-form value (since its not being used anymore temporarily)
            reset({ buyItNowPrice: "" });
            // update switch state
            setAuctionCheckedState(value);
        }
    }
    const renderMainContentPassedConditional = (selectedType) => {
        switch (selectedType) {
            case "auction-ONLY":
                return (
                    <Fragment>
                        <CardBody>
                            <h5>This is a <strong style={{ color: "blue" }}>SINGLE ITEM AUCTION</strong> listing which means only <strong style={{ color: "blue" }}>ONE</strong> person will be able to purchase what you're selling</h5>
                            <p>Only one person will be able to purchase this listing - if you'd like to either sell multiple copies of your <strong style={{ textDecorationLine: "underline", color: "red" }}>software/code (or related)</strong> then you should check out the other listing pricing options such as "auction AND buy-it-now", "buy-it-now ONLY" or "Buy-it-now" OR "best-offer ONLY" which may include options that're more applicable to your personal preferences...</p>
                            <hr />
                            <Form className="theme-form" onSubmit={handleSubmit((data, e) => {
                                return onSubmit(data, e, selectedType);
                            }, (errors, e) => {
                                return onError(errors, e, true);
                            })}>
                                <Row>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup>
                                            <Label>{startBidCheck.label}</Label>
                                            <InputGroup>
                                                <InputGroupAddon className={"custom-dollarsign-addon"} addonType="prepend"><InputGroupText>{"$ (USD)"}</InputGroupText></InputGroupAddon>
                                                <input {...startBidCheck.check(setError, register)} pattern="[0-9]*" className="form-control" type={startBidCheck.type} name={startBidCheck.name} placeholder={startBidCheck.placeholder} onChange={(e) => {
                                                    return handleInputChange(e);
                                                }} value={currentValues.startBid} />
                                            </InputGroup>
                                            {errors.startBid ? <span className="span-tooltip">{errors.startBid.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup>
                                            <Label>{reservePrice.label}</Label>
                                            <InputGroup>
                                                <InputGroupAddon className={"custom-dollarsign-addon"} addonType="prepend"><InputGroupText>{"$ (USD)"}</InputGroupText></InputGroupAddon>
                                                <input {...reservePrice.check(setError, register, currentValues)} pattern="[0-9]*" className="form-control" type={reservePrice.type} name={reservePrice.name} placeholder={reservePrice.placeholder} onChange={(e) => {
                                                    return handleInputChange(e);
                                                }} value={currentValues.reservePrice} />
                                            </InputGroup>
                                            {errors.reservePrice ? <span className="span-tooltip">{errors.reservePrice.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <FormGroup>
                                            <Label>{biddingIncrementIntervalHelper.label}</Label>
                                            <Controller
                                                control={control}
                                                name={biddingIncrementIntervalHelper.name}
                                                {...biddingIncrementIntervalHelper.check(setError, register, clearErrors)}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        ref={biddingIncrementIntervalGeneratedRef}
                                                        autoBlur={true}
                                                        placeholder={biddingIncrementIntervalHelper.placeholder}
                                                        defaultValue={null}
                                                        onMenuClose={menuClosedSelectInput}
                                                        value={currentValues.biddingIncrementInterval}
                                                        onChange={(selectedOption) => {
                                                            return handleTimespanSelectChange(selectedOption);
                                                        }}
                                                        options={biddingIncrementIntervalOptions}
                                                    />
                                                )}
                                            />
                                            {errors.biddingIncrementInterval ? <span className="span-tooltip">{errors.biddingIncrementInterval.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <FormGroup>
                                            <Label>{whatsIncludedInfoListing.label}</Label>
                                            <textarea rows={10} {...whatsIncludedInfoListing.check(setError, register)} className="form-control" type={whatsIncludedInfoListing.type} name={whatsIncludedInfoListing.name} placeholder={whatsIncludedInfoListing.placeholder} onChange={(e) => {
                                                return handleInputChange(e);
                                            }} value={currentValues.whatsIncluded} />
                                            {errors.whatsIncluded ? <span className="span-tooltip">{errors.whatsIncluded.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                    <Button type="submit" style={{ width: "100%" }} color="success" onClick={() => {
                                        // ~ run form submission (redux-hook-form) ~
                                    }}>Submit responses, close modal & return to primary form</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Fragment>
                );
                break;
            case "auction-AND-buy-it-now":
                return (
                    <Fragment>
                        <CardBody>
                            <Form className="theme-form" onSubmit={handleSubmit((data, e) => {
                                return onSubmit(data, e, selectedType);
                            }, (errors, e) => {
                                return onError(errors, e, true);
                            })}>
                                <Row>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup>
                                            <Label>{startBidCheck.label}</Label>
                                            <InputGroup>
                                                <InputGroupAddon className={"custom-dollarsign-addon"} addonType="prepend"><InputGroupText>{"$ (USD)"}</InputGroupText></InputGroupAddon>
                                                <input {...startBidCheck.check(setError, register)} pattern="[0-9]*" className="form-control" type={startBidCheck.type} name={startBidCheck.name} placeholder={startBidCheck.placeholder} onChange={(e) => {
                                                    return handleInputChange(e);
                                                }} value={currentValues.startBid} />
                                            </InputGroup>
                                            {errors.startBid ? <span className="span-tooltip">{errors.startBid.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup>
                                            <Label>{reservePrice.label}</Label>
                                            <InputGroup>
                                                <InputGroupAddon className={"custom-dollarsign-addon"} addonType="prepend"><InputGroupText>{"$ (USD)"}</InputGroupText></InputGroupAddon>
                                                <input {...reservePrice.check(setError, register, currentValues)} pattern="[0-9]*" className="form-control" type={reservePrice.type} name={reservePrice.name} placeholder={reservePrice.placeholder} onChange={(e) => {
                                                    return handleInputChange(e);
                                                }} value={currentValues.reservePrice} />
                                            </InputGroup>
                                            {errors.reservePrice ? <span className="span-tooltip">{errors.reservePrice.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <FormGroup>
                                            <Label>{biddingIncrementIntervalHelper.label}</Label>
                                            <Controller
                                                control={control}
                                                name={biddingIncrementIntervalHelper.name}
                                                {...biddingIncrementIntervalHelper.check(setError, register, clearErrors)}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        ref={biddingIncrementIntervalGeneratedRef}
                                                        autoBlur={true}
                                                        placeholder={biddingIncrementIntervalHelper.placeholder}
                                                        defaultValue={null}
                                                        onMenuClose={menuClosedSelectInput}
                                                        value={currentValues.biddingIncrementInterval}
                                                        onChange={(selectedOption) => {
                                                            return handleTimespanSelectChange(selectedOption);
                                                        }}
                                                        options={biddingIncrementIntervalOptions}
                                                    />
                                                )}
                                            />
                                            {errors.biddingIncrementInterval ? <span className="span-tooltip">{errors.biddingIncrementInterval.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    {auctionChecked === true ? <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup>
                                            <Label>{buyItNowHelper.label}</Label>
                                            <InputGroup>
                                                <InputGroupAddon className={"custom-dollarsign-addon"} addonType="prepend"><InputGroupText>{"$ (USD)"}</InputGroupText></InputGroupAddon>
                                                <input {...buyItNowHelper.check(setError, register)} pattern="[0-9]*" className="form-control" type={buyItNowHelper.type} name={buyItNowHelper.name} placeholder={buyItNowHelper.placeholder} onChange={(e) => {
                                                    return handleInputChange(e);
                                                }} value={currentValues.buyItNowPrice} />
                                            </InputGroup>
                                            {errors.buyItNowPrice ? <span className="span-tooltip">{errors.buyItNowPrice.message}</span> : null}
                                        </FormGroup>
                                    </Col> : null}
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup>
                                            <Label>Would you like to have this listing as an "AUCTION-ONLY" listing OR a an "AUCTION W/BUY-IT-NOW" listing? (***auction W/BUY-IT-NOW allows for both bids/offers as well as a 'Buy-it-now' option IF ONLY ONE item is being sold)</Label>
                                            <Row className="selector-container">
                                                <Col sm="2" md="2" lg="2" xl="2">
                                                    <Switch width={72.5} boxShadow={"0px 0px 15px 4.5px #6A6A6A"} offColor={"#888"} className={"buyitnow-switch-class"} onColor={"#51bb25"} onChange={handleSwitchValueChangeAuctionBuyitnow} checked={auctionChecked} />
                                                </Col>
                                                <Col sm="10" md="10" lg="10" xl="10">
                                                    <p className="switch-text-custom">{switchTextAuctionBuyitnow}</p> 
                                                </Col>
                                            </Row>
                                            {errors.buyItNowPrice ? <span className="span-tooltip">{errors.buyItNowPrice.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup>
                                            <Label>{quantityAvailability.label}</Label>
                                            <Controller
                                                control={control}
                                                name={quantityAvailability.name}
                                                {...quantityAvailability.check(setError, register, clearErrors)}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        ref={quantityAvailableForSaleGeneratedRef}
                                                        autoBlur={true}
                                                        placeholder={quantityAvailability.placeholder}
                                                        defaultValue={null}
                                                        onMenuClose={null}
                                                        value={currentValues.quantityAvailableForSale}
                                                        onChange={(selectedOption) => {
                                                            return handleQuantityAvailabilityChange(selectedOption);
                                                        }}
                                                        options={buyitnowChecked === true ? [quantityAvailabilityOptions[0]] : quantityAvailabilityOptions}
                                                    />
                                                )}
                                            />
                                            {errors.quantityAvailableForSale ? <span className="span-tooltip">{errors.quantityAvailableForSale.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup>
                                            <Label>{acceptCouponsDiscounts.label}</Label>
                                            <Controller
                                                control={control}
                                                name={acceptCouponsDiscounts.name}
                                                {...acceptCouponsDiscounts.check(setError, register, clearErrors)}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        ref={discountCodeAcceptanceGeneratedRef}
                                                        autoBlur={true}
                                                        placeholder={acceptCouponsDiscounts.placeholder}
                                                        defaultValue={null}
                                                        onMenuClose={null}
                                                        value={currentValues.discountCodeAcceptance}
                                                        onChange={(selectedOption) => {
                                                            return handleAcceptCouponsDiscountsChange(selectedOption);
                                                        }}
                                                        options={acceptCouponsDiscountsOptions}
                                                    />
                                                )}
                                            />
                                            {errors.discountCodeAcceptance ? <span className="span-tooltip">{errors.discountCodeAcceptance.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <FormGroup>
                                            <Label>{whatsIncludedInfoListing.label}</Label>
                                            <textarea rows={10} {...whatsIncludedInfoListing.check(setError, register)} className="form-control" type={whatsIncludedInfoListing.type} name={whatsIncludedInfoListing.name} placeholder={whatsIncludedInfoListing.placeholder} onChange={(e) => {
                                                return handleInputChange(e);
                                            }} value={currentValues.whatsIncluded} />
                                            {errors.whatsIncluded ? <span className="span-tooltip">{errors.whatsIncluded.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                    <Button type="submit" style={{ width: "100%" }} color="success" onClick={() => {
                                        // ~ run form submission (redux-hook-form) ~
                                    }}>Submit responses, close modal & return to primary form</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Fragment>
                );
                break;
            case "buy-it-now-OR-best-offer":
                return (
                    <Fragment>
                        <CardBody>
                            <Form className="theme-form" onSubmit={handleSubmit((data, e) => {
                                return onSubmit(data, e, selectedType);
                            }, (errors, e) => {
                                return onError(errors, e, true);
                            })}>
                                {buyitnowChecked === true ? <Row>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup>
                                            <Label>{automaticAcceptBestOffer.label}</Label>
                                            <InputGroup>
                                                <InputGroupAddon className={"custom-dollarsign-addon"} addonType="prepend"><InputGroupText>{"$ (USD)"}</InputGroupText></InputGroupAddon>
                                                <input {...automaticAcceptBestOffer.check(setError, register)} pattern="[0-9]*" className="form-control" type={automaticAcceptBestOffer.type} name={automaticAcceptBestOffer.name} placeholder={automaticAcceptBestOffer.placeholder} onChange={(e) => {
                                                    return handleInputChange(e);
                                                }} value={currentValues.automaticBestOfferAccept} />
                                            </InputGroup>
                                            {errors.automaticBestOfferAccept ? <span className="span-tooltip">{errors.automaticBestOfferAccept.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup>
                                            <Label>{minimumRequiredOffer.label}</Label>
                                            <InputGroup>
                                                <InputGroupAddon className={"custom-dollarsign-addon"} addonType="prepend"><InputGroupText>{"$ (USD)"}</InputGroupText></InputGroupAddon>
                                                <input {...minimumRequiredOffer.check(setError, register)} pattern="[0-9]*" className="form-control" type={minimumRequiredOffer.type} name={minimumRequiredOffer.name} placeholder={minimumRequiredOffer.placeholder} onChange={(e) => {
                                                    return handleInputChange(e);
                                                }} value={currentValues.minimumRequiredOfferValue} />
                                            </InputGroup>
                                            {errors.minimumRequiredOfferValue ? <span className="span-tooltip">{errors.minimumRequiredOfferValue.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                </Row> : null}
                                <Row>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup>
                                            <Label>{buyItNowHelper.label}</Label>
                                            <InputGroup>
                                                <InputGroupAddon className={"custom-dollarsign-addon"} addonType="prepend"><InputGroupText>{"$ (USD)"}</InputGroupText></InputGroupAddon>
                                                <input {...buyItNowHelper.check(setError, register)} pattern="[0-9]*" className="form-control" type={buyItNowHelper.type} name={buyItNowHelper.name} placeholder={buyItNowHelper.placeholder} onChange={(e) => {
                                                    return handleInputChange(e);
                                                }} value={currentValues.buyItNowPrice} />
                                            </InputGroup>
                                            {errors.buyItNowPrice ? <span className="span-tooltip">{errors.buyItNowPrice.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup>
                                            <Label>Would you like to offer "buy-it-now" AND "best-offer" options? Select to ALLOW buy it now (will limit quanitity for sale to 1-ONE) or disallow to allow multiple sales</Label>
                                            <Row className="selector-container">
                                                <Col sm="2" md="2" lg="2" xl="2">
                                                    <Switch width={72.5} boxShadow={"0px 0px 15px 4.5px #6A6A6A"} offColor={"#888"} className={"buyitnow-switch-class"} onColor={"#51bb25"} onChange={handleSwitchValueChange} checked={buyitnowChecked} />
                                                </Col>
                                                <Col sm="10" md="10" lg="10" xl="10">
                                                    <p className="switch-text-custom">{switchText}</p> 
                                                </Col>
                                            </Row>
                                            {errors.buyItNowPrice ? <span className="span-tooltip">{errors.buyItNowPrice.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup>
                                            <Label>{quantityAvailability.label}</Label>
                                            <Controller
                                                control={control}
                                                name={quantityAvailability.name}
                                                {...quantityAvailability.check(setError, register, clearErrors)}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        ref={quantityAvailableForSaleGeneratedRef}
                                                        autoBlur={true}
                                                        placeholder={quantityAvailability.placeholder}
                                                        defaultValue={null}
                                                        onMenuClose={null}
                                                        value={currentValues.quantityAvailableForSale}
                                                        onChange={(selectedOption) => {
                                                            return handleQuantityAvailabilityChange(selectedOption);
                                                        }}
                                                        options={buyitnowChecked === true ? [quantityAvailabilityOptions[0]] : quantityAvailabilityOptions}
                                                    />
                                                )}
                                            />
                                            {errors.quantityAvailableForSale ? <span className="span-tooltip">{errors.quantityAvailableForSale.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup>
                                            <Label>{acceptCouponsDiscounts.label}</Label>
                                            <Controller
                                                control={control}
                                                name={acceptCouponsDiscounts.name}
                                                {...acceptCouponsDiscounts.check(setError, register, clearErrors)}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        ref={discountCodeAcceptanceGeneratedRef}
                                                        autoBlur={true}
                                                        placeholder={acceptCouponsDiscounts.placeholder}
                                                        defaultValue={null}
                                                        onMenuClose={null}
                                                        value={currentValues.discountCodeAcceptance}
                                                        onChange={(selectedOption) => {
                                                            return handleAcceptCouponsDiscountsChange(selectedOption);
                                                        }}
                                                        options={acceptCouponsDiscountsOptions}
                                                    />
                                                )}
                                            />
                                            {errors.discountCodeAcceptance ? <span className="span-tooltip">{errors.discountCodeAcceptance.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <FormGroup>
                                            <Label>{whatsIncludedInfoListing.label}</Label>
                                            <textarea rows={10} {...whatsIncludedInfoListing.check(setError, register)} className="form-control" type={whatsIncludedInfoListing.type} name={whatsIncludedInfoListing.name} placeholder={whatsIncludedInfoListing.placeholder} onChange={(e) => {
                                                return handleInputChange(e);
                                            }} value={currentValues.whatsIncluded} />
                                            {errors.whatsIncluded ? <span className="span-tooltip">{errors.whatsIncluded.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                    <Button type="submit" style={{ width: "100%" }} color="success" onClick={() => {
                                        // ~ run form submission (redux-hook-form) ~
                                    }}>Submit responses, close modal & return to primary form</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Fragment>
                );
                break;
            case "buy-it-now-ONLY":
                return (
                    <Fragment>
                        <CardBody>
                            <Form className="theme-form" onSubmit={handleSubmit((data, e) => {
                                return onSubmit(data, e, selectedType);
                            }, (errors, e) => {
                                return onError(errors, e, true);
                            })}>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <FormGroup>
                                            <Label>{biddingIncrementIntervalHelper.label}</Label>
                                            <Controller
                                                control={control}
                                                name={biddingIncrementIntervalHelper.name}
                                                {...biddingIncrementIntervalHelper.check(setError, register, clearErrors)}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        ref={biddingIncrementIntervalGeneratedRef}
                                                        autoBlur={true}
                                                        placeholder={biddingIncrementIntervalHelper.placeholder}
                                                        defaultValue={null}
                                                        onMenuClose={menuClosedSelectInput}
                                                        value={currentValues.biddingIncrementInterval}
                                                        onChange={(selectedOption) => {
                                                            return handleTimespanSelectChange(selectedOption);
                                                        }}
                                                        options={biddingIncrementIntervalOptions}
                                                    />
                                                )}
                                            />
                                            {errors.biddingIncrementInterval ? <span className="span-tooltip">{errors.biddingIncrementInterval.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Col sm="12" md="12" lg="12" xl="12">
                                    <FormGroup>
                                        <Label>{buyItNowHelper.label}</Label>
                                        <InputGroup>
                                            <InputGroupAddon className={"custom-dollarsign-addon"} addonType="prepend"><InputGroupText>{"$ (USD)"}</InputGroupText></InputGroupAddon>
                                            <input {...buyItNowHelper.check(setError, register)} pattern="[0-9]*" className="form-control" type={buyItNowHelper.type} name={buyItNowHelper.name} placeholder={buyItNowHelper.placeholder} onChange={(e) => {
                                                return handleInputChange(e);
                                            }} value={currentValues.buyItNowPrice} />
                                        </InputGroup>
                                        {errors.buyItNowPrice ? <span className="span-tooltip">{errors.buyItNowPrice.message}</span> : null}
                                    </FormGroup>
                                </Col>
                                <Row>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup>
                                            <Label>{quantityAvailability.label}</Label>
                                            <Controller
                                                control={control}
                                                name={quantityAvailability.name}
                                                {...quantityAvailability.check(setError, register, clearErrors)}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        ref={quantityAvailableForSaleGeneratedRef}
                                                        autoBlur={true}
                                                        placeholder={quantityAvailability.placeholder}
                                                        defaultValue={null}
                                                        onMenuClose={null}
                                                        value={currentValues.quantityAvailableForSale}
                                                        onChange={(selectedOption) => {
                                                            return handleQuantityAvailabilityChange(selectedOption);
                                                        }}
                                                        options={quantityAvailabilityOptions}
                                                    />
                                                )}
                                            />
                                            {errors.quantityAvailableForSale ? <span className="span-tooltip">{errors.quantityAvailableForSale.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup>
                                            <Label>{acceptCouponsDiscounts.label}</Label>
                                            <Controller
                                                control={control}
                                                name={acceptCouponsDiscounts.name}
                                                {...acceptCouponsDiscounts.check(setError, register, clearErrors)}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        ref={discountCodeAcceptanceGeneratedRef}
                                                        autoBlur={true}
                                                        placeholder={acceptCouponsDiscounts.placeholder}
                                                        defaultValue={null}
                                                        onMenuClose={null}
                                                        value={currentValues.discountCodeAcceptance}
                                                        onChange={(selectedOption) => {
                                                            return handleAcceptCouponsDiscountsChange(selectedOption);
                                                        }}
                                                        options={acceptCouponsDiscountsOptions}
                                                    />
                                                )}
                                            />
                                            {errors.discountCodeAcceptance ? <span className="span-tooltip">{errors.discountCodeAcceptance.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <FormGroup>
                                            <Label>{whatsIncludedInfoListing.label}</Label>
                                            <textarea rows={10} {...whatsIncludedInfoListing.check(setError, register)} className="form-control" type={whatsIncludedInfoListing.type} name={whatsIncludedInfoListing.name} placeholder={whatsIncludedInfoListing.placeholder} onChange={(e) => {
                                                return handleInputChange(e);
                                            }} value={currentValues.whatsIncluded} />
                                            {errors.whatsIncluded ? <span className="span-tooltip">{errors.whatsIncluded.message}</span> : null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                    <Button type="submit" style={{ width: "100%" }} color="success" onClick={() => {
                                        // ~ run form submission (redux-hook-form) ~
                                    }}>Submit responses, close modal & return to primary form</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Fragment>
                );
                break;
            default:
                break;
        }
    }

    return renderMainContentPassedConditional(type);
};


const SlideUpPaneAuctionPurchaseSelectionData = ({ clearAllBodyScrollLocks, typeOfListing, setIsTourOpenStatus, selected, shiftCoreStyles, previouslySavedSoftwareData, saveSoftwareListingInfo, onSubmit, onErrorMainForm, scrollToTourWrapper }) => {

    const { register, handleSubmit, control, reset, getValues, setValue, setError, clearErrors, formState: { errors }} = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur"
    });

    const [ isOpen, setModalOpenStatus ] = useState(false);

    const handleDynamicFormReset = (selectedType) => {
        switch (selectedType) {
            case "buy-it-now-ONLY":
                reset({ biddingIncrementInterval: undefined, reservePrice: undefined, startBid: undefined, whatsIncluded: undefined, buyItNowPrice: undefined, quantityAvailableForSale: undefined, discountCodeAcceptance: undefined });
                break;
            case "auction-AND-buy-it-now":
                reset({ biddingIncrementInterval: undefined, reservePrice: undefined, startBid: undefined, whatsIncluded: undefined, buyItNowPrice: undefined, discountCodeAcceptance: undefined, quantityAvailableForSale: undefined });
                break;
            case "auction-ONLY":
                reset({ biddingIncrementInterval: undefined, reservePrice: undefined, startBid: undefined, whatsIncluded: undefined });
                break;
            case "buy-it-now-OR-best-offer":
                reset({ automaticBestOfferAccept: undefined, discountCodeAcceptance: undefined, buyItNowPrice: undefined, minimumRequiredOfferValue: undefined, quantityAvailableForSale: undefined, whatsIncluded: undefined })
                break;
            default:
                break;
        }
    }

    const startBidCheck = helpers().startBidCheck;

    const { handleFinalSubmissionInputs, biddingIncrementIntervalOptions, quantityAvailabilityOptions, acceptCouponsDiscountsOptions } = functions;

    return (
        <div id="sheet-container">
            <div style={{ paddingTop: "27.5px", paddingBottom: "12.5px" }} className="centered-both-ways">
                <Button onClick={() => {
                    // DISABLE clicking background
                    shiftCoreStyles(true);
                    // set modal sheet pane OPEN/true
                    setModalOpenStatus(true);
                    // scroll to target and LOCK SCREEN until closed.
                    scrollToTourWrapper.current.scrollIntoView();
                    // alter slightly to account for top-NAV
                    setTimeout(() => {
                        window.scrollBy(0, -135);
                    }, 750);
                    // lock after appropriate position change
                    setTimeout(() => {

                        const select = document.querySelector(".enact-nonclick");
                        
                        disableBodyScroll(select);
                    }, 1000)
                }} outline className="btn-pill btn-air-success stretched-purchase-options-btn" color="success" size="lg">Select & modify listing pricing and purchase options</Button>
            </div>
            <Sheet id="sheet-ultimate" disableDrag={true} isOpen={isOpen} onClose={() => setModalOpenStatus(false)}>
                <Sheet.Container className="sheetcontainer">
                    <Sheet.Header className="sheetheader">
                        <Row>
                            <Col sm="12" md="6" lg="6" xl="6">
                                <Button onClick={() => {
                                    // run submission logic
                                    handleFinalSubmissionInputs(setModalOpenStatus, shiftCoreStyles, setIsTourOpenStatus, clearErrors, handleDynamicFormReset, typeOfListing, clearAllBodyScrollLocks);
                                }} className="btn-square stretch-and-space-btn-left" active color="primary" size="md">Submit Completed Data & Close/Exit</Button>
                            </Col>
                            <Col sm="12" md="6" lg="6" xl="6">
                                <Button onClick={() => {
                                    // allow background clicking again
                                    shiftCoreStyles(false);
                                    // close modal
                                    setModalOpenStatus(false);
                                    // clear errors
                                    clearErrors();
                                    
                                    clearAllBodyScrollLocks();

                                    handleDynamicFormReset(typeOfListing);
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
                                            {/* render sub component with SWITCH logic */}
                                            <RenderConditionalBasedUponSellingType clearAllBodyScrollLocks={clearAllBodyScrollLocks} handleDynamicFormReset={handleDynamicFormReset} quantityAvailabilityOptions={quantityAvailabilityOptions} acceptCouponsDiscountsOptions={acceptCouponsDiscountsOptions} reset={reset} type={selected} setValue={setValue} getValues={getValues} errors={errors} setError={setError} register={register} control={control} clearErrors={clearErrors} biddingIncrementIntervalOptions={biddingIncrementIntervalOptions} handleSubmit={handleSubmit} shiftCoreStyles={shiftCoreStyles} setModalOpenStatus={setModalOpenStatus} onSubmit={onSubmit} onErrorMainForm={onErrorMainForm} saveSoftwareListingInfo={saveSoftwareListingInfo} previouslySavedSoftwareData={previouslySavedSoftwareData} />
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
const mapStateToProps = (state) => {
    // return desired selected redux-state
    return {
        previouslySavedSoftwareData: state.softwareListingSale.softwareListingSaleInfo
    }
}
const ConnectedSlideUpPaneAuctionPurchase = connect(mapStateToProps, { shiftCoreStyles, saveSoftwareListingInfo })(SlideUpPaneAuctionPurchaseSelectionData);
// export helper functions
export default {
    ConnectedSlideUpPaneAuctionPurchase,
    RenderConditionalBasedUponSellingType
};