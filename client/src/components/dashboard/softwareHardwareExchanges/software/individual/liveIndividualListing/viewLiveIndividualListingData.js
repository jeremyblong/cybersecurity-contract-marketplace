import React,{ Fragment, useState, useEffect, useRef } from 'react';
import Breadcrumb from '../../../../../../layout/breadcrumb';
import { Container, Row, Col, Card, Button, Input, CardBody, Label, CardHeader, Form, Media } from 'reactstrap';
import TabsetIndividualLiveListingHelper from './helpers/tabset/tabset.js';
import { useHistory, withRouter } from 'react-router-dom';
import "./styles.css";
import { AddToCart, BuyNow } from "../../../../../../constant";
import ImageGallery from 'react-image-gallery';
import helpers from "./helpers/functions/mainHelperFunctions.js";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import moment from "moment";
import _ from 'lodash';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import PlaceABidSoftwareActionHelper from "./helpers/sheets/placeABid/placeBidPane.js";
import { NotificationManager } from 'react-notifications';
import io from 'socket.io-client';
import ViewPreviousBidsListHelper from "./helpers/sheets/bidsList/viewBidListPrevious.js";
import { connect } from "react-redux";

const newSocket = io(process.env.REACT_APP_BASE_URL);


const ViewIndividualListingSoftwarePageHelper = ({ location, userData })  => {

    const history = useHistory();
    // state initializations
    const [ socket, setSocket ] = useState(null);
    const [ passedData, setPassedDataState ] = useState(null);
    const [ posterUser, setPosterUserState ] = useState(null);
    const [ bidsPane, openBidListPane ] = useState(false);
    const [ sheetBidOpen, setSheetPaneOpen ] = useState(false);
    const [ bidPrice, setBidPrice ] = useState(null);
    const [ ready, setReady ] = useState(false);
    const [ timeLeft, setTimeLeft ] = useState(null);

    // helper functions
    const { preparePriceString } = helpers;
    const [rating,setRating] = useState(0);

    useEffect(() => {
        setSocket(newSocket);

        return () => newSocket.close();
    }, [ setSocket ]);

    console.log("socket", socket);

    useEffect(() => {
        if (typeof location.state !== "undefined" && location.state !== null) {
            const passedData = location.state.item;

            const firstURL = `${process.env.REACT_APP_ASSET_LINK}/${passedData.thumbnailImage.link}`;
        
            const galleryImages = [{ original: firstURL, thumbnail: firstURL } ,...passedData.screenshotUploadImages];

            const configuration = {
                params: {
                    uniqueId: passedData.poster
                }
            }

            axios.get(`${process.env.REACT_APP_BASE_URL}/gather/core/anonymous/user/data`, configuration).then((res) => {
                if (res.data.message === "Successfully gathered core user information!") {
                    console.log(res.data);

                    const { user } = res.data;

                    const calculatedTimeMillisecondsEnd = moment(passedData.date).add(passedData.listingTimespan.value, "minutes");

                    setTimeLeft({
                        calculated: new Date(calculatedTimeMillisecondsEnd),
                        posted: new Date(passedData.date)
                    });

                    setPosterUserState(user);

                    setPassedDataState({
                        ...passedData,
                        bidCount: passedData.bids.length,
                        galleryImages
                    });
                    setReady(true);
                } else {
                    console.log("Err", res.data);

                    setPassedDataState({
                        ...passedData,
                        bidCount: passedData.bids.length,
                        galleryImages
                    });
                    setReady(true);
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            history.push("/software/exchange/landing")
        }
    }, [])

    const changeRating = (newRating) => {
        setRating(newRating)
    }

    console.log("timeLeft", timeLeft);

    const renderUponReadyMainContent = () => {
        const notApplicable = "Not Applicable.";

        if (ready === true) {
            const renderBuyitnowData = () => {
                if (_.has(passedData.auctionPriceRelatedData, "buyItNowData")) {
                    if (passedData.auctionPriceRelatedData.buyItNowData.active === true) {
                        return "Active (enabled)";
                    } else {
                        return "Inactive (disabled)";
                    }
                } else {
                    return notApplicable;
                }
            }
            const renderSecondBuyitnowData = () => {
                if (_.has(passedData.auctionPriceRelatedData, "buyItNowData")) {
                    if (passedData.auctionPriceRelatedData.buyItNowData.active === true) {
                        return `$${passedData.auctionPriceRelatedData.buyItNowData.buyItNowPrice.toFixed(2)}`;
                    } else {
                        return "";
                    }
                } else {
                    return notApplicable;
                }
            }
            return (
                <Fragment>
                    <Row className="product-page-main">
                        <Col lg="4" md="12" sm="12" xl="4">
                            <ImageGallery thumbnailPosition={"bottom"} className={"image-gallery-product-view"} items={passedData.galleryImages} additionalClass={"inner-img-thumbnail-slider-product-show"} />
                        </Col>
                        <Col md="12" sm="12" lg="8" xl="8">
                            <Card> 
                                <CardBody>
                                    <div className="product-page-details">
                                        <h3>{passedData.listingTitle}</h3>
                                    </div>
                                    <div className="product-price f-28 custom-product-inner-price">
                                        {preparePriceString(passedData, openBidListPane)}
                                    </div>
                                    <hr/>
                                    <Row>
                                        <Col sm="12" md="12" lg="12" xl="12">
                                            <Label className="custom-label-view"><strong>"What's included"</strong> in this listing... This is what is included when purchasing this listing's contents</Label>
                                            <div className="fixed-textarea-input-noedit">
                                                <textarea rows={8} value={passedData.auctionPriceRelatedData.whatsIncluded} type="textarea" name="text" id="textarea-nonactive-individual-view" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="12" lg="12" xl="12">
                                            {new Date() > new Date(timeLeft.calculated) ? <p className="posted-ago-date">Auction has <em style={{ textDecorationLine: "underline" }}>ALREADY</em> ended.</p> : <p className="posted-ago-date">{moment(new Date()).from(new Date(timeLeft.calculated), true)} from <em style={{ textDecorationLine: "underline" }}>now</em> OR <em style={{ textDecorationLine: "underline" }}>{moment(new Date(timeLeft.calculated)).format("MM/DD hh:mm:ss a")}</em></p>}
                                            <div />
                                            <p className="normal-text-styled">Coupons Accepted? : {_.has(passedData.auctionPriceRelatedData, "discountCodeAcceptance") ? passedData.auctionPriceRelatedData.discountCodeAcceptance.label : notApplicable}</p>
                                        </Col>
                                    </Row>
                                    {new Date() > new Date(timeLeft.calculated) ? null : <Row>
                                        <Col sm="12" md="12" lg="12" xl="12">
                                            <Button className='btn-square-success' color='success-2x' style={{ width: "100%", marginTop: "22.5px" }} outline onClick={() => setSheetPaneOpen(true)}>Submit A New Bid/Bet</Button>
                                        </Col>
                                    </Row>}
                                    <hr/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" sm="12" lg="12" xl="12">
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col sm="12" md="12" lg="4" xl="4">
                                            <div className="custom-table-container">
                                                <table className="product-page-width">
                                                    <tbody>
                                                        <tr className="tr-custom-product">
                                                            <Row>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="td-custom-product"> <b className="redish-b">~ Category&nbsp;&nbsp;&nbsp;<strong className="blue-strong">:</strong></b></td>
                                                                </Col>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="lower-td-custom">{passedData.category.label}</td>
                                                                </Col>
                                                            </Row>
                                                        </tr>
                                                        <tr className="tr-custom-product">
                                                            <Row>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="td-custom-product"> <b className="redish-b">~ Coded Using&nbsp;&nbsp;&nbsp;<strong className="blue-strong">:</strong>&nbsp;&nbsp;&nbsp;</b></td>
                                                                </Col>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="lower-td-custom">{passedData.codingLanguageContent.label}</td>
                                                                </Col>
                                                            </Row>
                                                        </tr>
                                                        <tr className="tr-custom-product">
                                                            <Row>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="td-custom-product"> <b className="redish-b">~ Posted On/At&nbsp;&nbsp;&nbsp;<strong className="blue-strong">:</strong>&nbsp;&nbsp;&nbsp;</b></td>
                                                                </Col>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="lower-td-custom">{moment(passedData.date).format("MM/DD/YYYY hh:mm:ss a")}</td>
                                                                </Col>
                                                            </Row>
                                                        </tr>
                                                        <tr className="tr-custom-product">
                                                            <Row>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="td-custom-product"> <b className="redish-b">~ Demo URL (live preview/testing)&nbsp;&nbsp;&nbsp;<strong className="blue-strong">:</strong>&nbsp;&nbsp;&nbsp;</b></td>
                                                                </Col>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="lower-td-custom">{passedData.demoURL}</td>
                                                                </Col>
                                                            </Row>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Col>
                                        <Col sm="12" md="12" lg="4" xl="4">
                                            <div className="custom-table-container">
                                                <table className="product-page-width">
                                                    <tbody>
                                                        <tr className="tr-custom-product">
                                                            <Row>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="td-custom-product"> <b className="redish-b">~ Listing End/Timespan&nbsp;&nbsp;&nbsp;<strong className="blue-strong">:</strong></b></td>
                                                                </Col>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="lower-td-custom">{passedData.listingTimespan.label}</td>
                                                                </Col>
                                                            </Row>
                                                        </tr>
                                                        <tr className="tr-custom-product">
                                                            <Row>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="td-custom-product"> <b className="redish-b">~ Support Provided Via External URL&nbsp;&nbsp;&nbsp;<strong className="blue-strong">:</strong>&nbsp;&nbsp;&nbsp;</b></td>
                                                                </Col>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="lower-td-custom">{passedData.supportProvidedExternalURL === true ? "External Support Provided!" : "NO Support Provided."}</td>
                                                                </Col>
                                                            </Row>
                                                        </tr>
                                                        <tr className="tr-custom-product">
                                                            <Row>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="td-custom-product"> <b className="redish-b">~ Typical Response Timespan&nbsp;&nbsp;&nbsp;<strong className="blue-strong">:</strong>&nbsp;&nbsp;&nbsp;</b></td>
                                                                </Col>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="lower-td-custom">{passedData.supportResponseTimespanData.label}</td>
                                                                </Col>
                                                            </Row>
                                                        </tr>
                                                        <tr className="tr-custom-product">
                                                            <Row>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="td-custom-product"> <b className="redish-b">~ Number(#) Times Bookmarked&nbsp;&nbsp;&nbsp;<strong className="blue-strong">:</strong>&nbsp;&nbsp;&nbsp;</b></td>
                                                                </Col>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="lower-td-custom">{passedData.bookmarks} bookmarks</td>
                                                                </Col>
                                                            </Row>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Col>
                                        <Col sm="12" md="12" lg="4" xl="4">
                                            <div className="custom-table-container">
                                                <table className="product-page-width">
                                                    <tbody>
                                                        <tr className="tr-custom-product">
                                                            <Row>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="td-custom-product"> <b className="redish-b">~ Reserve Price&nbsp;&nbsp;&nbsp;<strong className="blue-strong">:</strong></b></td>
                                                                </Col>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="lower-td-custom">{_.has(passedData.auctionPriceRelatedData, "reservePrice") ? `$${passedData.auctionPriceRelatedData.reservePrice.toFixed(2)}` : notApplicable}</td>
                                                                </Col>
                                                            </Row>
                                                        </tr>
                                                        <tr className="tr-custom-product">
                                                            <Row>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="td-custom-product"> <b className="redish-b">~ Quantity Availabile For Sale&nbsp;&nbsp;&nbsp;<strong className="blue-strong">:</strong>&nbsp;&nbsp;&nbsp;</b></td>
                                                                </Col>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="lower-td-custom">{_.has(passedData.auctionPriceRelatedData, "quantityAvailableForSale") ? passedData.auctionPriceRelatedData.quantityAvailableForSale.max : notApplicable} item for sale</td>
                                                                </Col>
                                                            </Row>
                                                        </tr>
                                                        <tr className="tr-custom-product">
                                                            <Row>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="td-custom-product"> <b className="redish-b">~ Minimum Bid Increment(s)&nbsp;&nbsp;&nbsp;<strong className="blue-strong">:</strong>&nbsp;&nbsp;&nbsp;</b></td>
                                                                </Col>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="lower-td-custom">{_.has(passedData, "auctionPriceRelatedData") && _.has(passedData.auctionPriceRelatedData, "biddingIncrementInterval") ? passedData.auctionPriceRelatedData.biddingIncrementInterval.label : notApplicable}</td>
                                                                </Col>
                                                            </Row>
                                                        </tr>
                                                        <tr className="tr-custom-product">
                                                            <Row>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="td-custom-product"> <b className="redish-b">~ Buy-it-now Availability&nbsp;&nbsp;&nbsp;<strong className="blue-strong">:</strong>&nbsp;&nbsp;&nbsp;</b></td>
                                                                </Col>
                                                                <Col className={"custom-col-product-individual"} sm="6" md="6" lg="6" xl="6">
                                                                    <td className="lower-td-custom">{renderBuyitnowData(), renderSecondBuyitnowData()}</td>
                                                                </Col>
                                                            </Row>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <Col md="6" lg="6" xl="6" sm="12">
                                            <Col md="6" lg="6" xl="6" sm="12">
                                            <h6 className="product-title">{"share it"}</h6>
                                            </Col>
                                            <Col md="6" lg="6" xl="6" sm="12">
                                            <div className="product-icon">
                                                <ul className="product-social product-social-listing-custom">
                                                    <li className="d-inline-block"><a href={null}><i className="fa fa-facebook"></i></a></li>
                                                    <li className="d-inline-block"><a href={null}><i className="fa fa-google-plus"></i></a></li>
                                                    <li className="d-inline-block"><a href={null}><i className="fa fa-twitter"></i></a></li>
                                                    <li className="d-inline-block"><a href={null}><i className="fa fa-instagram"></i></a></li>
                                                    <li className="d-inline-block"><a href={null}><i className="fa fa-rss"></i></a></li>
                                                </ul>
                                                <form className="d-inline-block f-right"></form>
                                            </div>
                                            </Col>
                                        </Col>
                                        <Col md="6" lg="6" xl="6" sm="12">
                                            <div className="float-align-right">
                                                <Row>
                                                    <Col md="12" lg="12" xl="12" sm="12">
                                                        <h6 className="product-title text-right">{"Tell us what you think about this listing & rate it anonymously!"}</h6>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="12" lg="12" xl="12" sm="12">
                                                        <div className="float-align-right-stars">
                                                            <StarRatings
                                                                rating={8.25}
                                                                starRatedColor={"#f73164"}
                                                                changeRating={changeRating}
                                                                numberOfStars={10}
                                                                className={"star-container-wrapper"}
                                                                starSpacing={"0px"}
                                                                name='rating'
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <ReactMarkdown className="markdown-individual-listing-info" children={passedData.description} remarkPlugins={[remarkGfm]} />
                                    <hr/>
                                    {/* <div className="m-t-15">
                                        <Button  color="primary" className="m-r-10" onClick={() => {
                                            // addcart(singleItem, quantity);
                                            console.log("add to cart...!");
                                        }} >
                                            <i className="fa fa-shopping-basket mr-1"></i>{AddToCart}
                                        </Button>
                                        <Button  color="success" className="m-r-10" onClick={() => {
                                            // buyProduct(singleItem, quantity);
                                            console.log("buy product...!");
                                        }}>
                                            <i className="fa fa-shopping-cart mr-1"></i>{BuyNow}
                                        </Button>
                                        <Button color="secondary" onClick={() => {
                                            // addWishList(singleItem)
                                            console.log("add to wishlist...!");
                                        }}>
                                            <i className="fa fa-heart mr-1"></i>{"Add To WishList"}
                                        </Button>
                                    </div> */}
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="12" sm="12" lg="12" xl="12">
                            <Card>
                                <CardHeader>
                                    <h5>Listing purchase type</h5><span>{"The HIGHLIGHTED/SELECTED option below represents what this listing purchase format is set as. Each category has specific attributes such as 'Buy-it-now & offer-up' which means ONLY buy-it-now and offers are accepted for such listing."}</span>
                                </CardHeader>
                                <CardBody className="megaoptions-border-space-sm">
                                    <Form className="mega-inline">
                                    <Row>
                                        <Col sm="6">
                                        <Card className={passedData.auctionPurchaseType === "buy-it-now-ONLY" ? "selected-option-listing-type-red" : ""}>
                                            <Media className="p-20">
                                                <div className="radio radio-primary mr-3">
                                                    <Input checked={passedData.auctionPurchaseType === "buy-it-now-ONLY" ? true : false} id="radio19" type="radio" name="radio1" value="option1" />
                                                    <Label for="radio19"></Label>
                                                </div>
                                                <Media body>
                                                    <h6 className="mt-0 mega-title-badge">BUY-IT-NOW <strong style={{ color: "#7366ff" }}>ONLY</strong><span className="badge badge-primary pull-right digits">{"BUY-IT-NOW ONLY"}</span></h6>
                                                    <p>{"Buy-it-now ONLY - The only purchase available for this type of listing is ONLY buy-it-now. Once purchased for the set price, you will immediately be charged & all included content will be immediately transferred to your account!"}</p>
                                                </Media>
                                            </Media>
                                        </Card>
                                        </Col>
                                        <Col sm="6">
                                        <Card className={passedData.auctionPurchaseType === "buy-it-now-OR-best-offer" ? "selected-option-listing-type-blue" : ""}>
                                            <Media className="p-20">
                                                <div className="radio radio-secondary mr-3">
                                                    <Input checked={passedData.auctionPurchaseType === "buy-it-now-OR-best-offer" ? true : false} id="radio20" type="radio" name="radio1" value="option1" />
                                                    <Label for="radio20"></Label>
                                                </div>
                                                <Media body>
                                                    <h6 className="mt-0 mega-title-badge">Buy-it-now <strong style={{ color: "#7366ff" }}>OR</strong> Best-Offer<span className="badge badge-secondary pull-right digits">{"BUY-IT-NOW OR BEST-OFFER"}</span></h6>
                                                    <p>{"This option ALLOWS for BOTH buy-it-now AND best-offer's. Best offer is basically whoever gives the highest acceptable proposed price/bid for a listing item - if a seller recieves multiple offers - they can choose whichever offer suits their interests most/best which includes but is not limited to reviews, history, purchases, price point, etc..."}</p>
                                                </Media>
                                            </Media>
                                        </Card>
                                        </Col>
                                        <Col sm="6">
                                        <Card className={passedData.auctionPurchaseType === "auction-AND-buy-it-now" ? "selected-option-listing-type-red" : ""}>
                                            <Media className="p-20">
                                                <div className="radio radio-secondary mr-3">
                                                    <Input checked={passedData.auctionPurchaseType === "auction-AND-buy-it-now" ? true : false} id="radio21" type="radio" name="radio1" value="option1" />
                                                    <Label for="radio21"></Label>
                                                </div>
                                                <Media body>
                                                    <h6 className="mt-0 mega-title-badge">Auction <strong style={{ color: "#7366ff" }}>AND</strong> Buy-it-now<span className="badge badge-secondary pull-right digits">{"AUCTION & BUY-IT-NOW"}</span></h6>
                                                    <p>{"This listing is AUCTION and BUY-IT-NOW ONLY. Auction's last for a 'set' period of time (up-to 21 days MAX) and bids will last until the auction ends. The typical format of auctions is basically that the highest bid wins and it's usually better practice to submit bids in the last minute or so in order to prevent further bids from competitor buyer's. This listing is also BUY-IT-NOW too which superceeds any auction bids..."}</p>
                                                </Media>
                                            </Media>
                                        </Card>
                                        </Col>
                                        <Col sm="6">
                                        <Card className={passedData.auctionPurchaseType === "auction-ONLY" ? "selected-option-listing-type-blue" : ""}>
                                            <Media className="p-20">
                                                <div className="radio radio-primary mr-3">
                                                    <Input checked={passedData.auctionPurchaseType === "auction-ONLY" ? true : false} id="radio22" type="radio" name="radio1" value="option1" />
                                                    <Label for="radio22"></Label>
                                                </div>
                                                <Media body>
                                                    <h6 className="mt-0 mega-title-badge">Auction <strong style={{ color: "#f73164" }}>ONLY</strong><span className="badge badge-primary pull-right digits">AUCTION ONLY!</span></h6>
                                                    <p>{"This listing is an AUCTION ONLY excluding all other options such as best-offers, buy-it-now and bidding/auction formats. The typical format of auctions is basically that the highest bid wins and it's usually better practice to submit bids in the last minute or so in order to prevent further bids from competitor buyer's. Bidding is your ONLY option for these types of listings."}</p>
                                                </Media>
                                            </Media>
                                        </Card>
                                        </Col>
                                    </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <Row className="product-page-main">
                        <Col lg="12" md="12" sm="12" xl="12">
                            <SkeletonTheme baseColor="#d4d4d4" highlightColor="#8f8f8f">
                                <p>
                                    <Skeleton containerClassName={"stretch-bars"} count={75} />
                                </p>
                            </SkeletonTheme>
                        </Col>
                    </Row>
                </Fragment>
            );
        }
    }

    useEffect(() => {
        if (socket !== null) {
            
            console.log("websocket is NO LONGER NULL!");

            const newBidRecievedListener = (listing) => {
                
                console.log("newBidRecievedListener listening...", listing);

                const parsed = JSON.parse(listing);

                setPassedDataState(prevState => {
                    return {
                        ...prevState,
                        currentBidPrice: parsed.currentBidPrice,
                        bidCount: parsed.bids.length += 1
                    }
                })
            };
          
            socket.on('newBidRecieved', newBidRecievedListener);
        
            return () => {
              socket.off('newBidRecieved', newBidRecievedListener);
            };
        } else {
            console.log("WS is currently null.");
        }
    }, [socket]);


    const handleNewBidSubmission = () => {
        console.log("handleNewBidSubmission clicked/ran...");

        const configuration = {
            signedinUserID: userData.uniqueId,
            softwareListingID: passedData.uniqueId,
            bidPrice,
            posterID: passedData.poster,
            signedinUserFullName: `${userData.firstName} ${userData.lastName}`
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/place/bid/software/listing`, configuration).then((res) => {
            if (res.data.message === "Successfully placed a bid!") {
                console.log(res.data);

                const { newlyPlacedBid, listing } = res.data;

                socket.emit('newBidRecieved', JSON.stringify(listing));

                NotificationManager.success("Successfully placed your NEW BID! Your bid was successfully/properly placed and is NOW LIVE! Check the leaderboards and/or bid-history to see various updates as new bids come in.", "Successfully placed bid!", 4750);

                setSheetPaneOpen(false);

            } else if (res.data.message === "Error, enter a value higher than the existing bid price!") {
                NotificationManager.warning("Enter a value HIGHER than the EXISTING value and/or the current price. New bids MUST be higher than the current amount!", "Enter a GREATER amount than the CURRENT PRICE!", 4750);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    console.log("passed DATA...: ", passedData);
    return (
        <Fragment>
            <Breadcrumb parent="Buy/sell/trade digital software & code" title="Individual Software Product Page"/>
            <Container fluid={true}>
                <PlaceABidSoftwareActionHelper bidPrice={bidPrice} setBidPrice={setBidPrice} handleNewBidSubmission={handleNewBidSubmission} sheetBidOpen={sheetBidOpen} setSheetPaneOpen={setSheetPaneOpen} />
                <ViewPreviousBidsListHelper bids={typeof passedData !== "undefined" && passedData !== null ? passedData.bids : null} bidsPane={bidsPane} openBidListPane={openBidListPane} />
                <Row>
                    <Col>
                    <Card>
                        {renderUponReadyMainContent()}
                    </Card>
                <TabsetIndividualLiveListingHelper user={posterUser} ready={ready} passedData={passedData} /></Col>
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
export default connect(mapStateToProps, { })(withRouter(ViewIndividualListingSoftwarePageHelper));
