import React, { Fragment } from 'react';
import { Col, Button, ButtonGroup, Input, Media, ModalHeader, InputGroup, InputGroupAddon, InputGroupText, Badge, Modal, ModalBody } from 'reactstrap';
import { ProductDetails,Quantity,AddToCart,ProductSizeArray } from "../../../../../../constant";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ImageGallery from 'react-image-gallery';

const dummyNoteDescription = `Dillinger is a cloud-enabled, mobile-ready, offline-storage compatible,
AngularJS-powered HTML5 Markdown editor.

- Type some Markdown on the left
- See HTML in the right
- ✨Magic ✨

## Features

- Import a HTML file and watch it magically convert to Markdown
- Drag and drop images (requires your Dropbox account be linked)
- Import and save files from GitHub, Dropbox, Google Drive and One Drive
- Drag and drop markdown and HTML files into Dillinger
- Export documents as Markdown, HTML and PDF

Markdown is a lightweight markup language based on the formatting conventions
that people naturally use in email.
As [John Gruber] writes on the [Markdown site][df1]

> The overriding design goal for Markdowns
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like its been marked up with tags
> or formatting instructions.

This text you see here is *actually- written in Markdown! To get a feel
for Markdowns syntax, type some text into the left window and
watch the results in the right.

## Tech

Dillinger uses a number of open source projects to work properly:

- [AngularJS] - HTML enhanced for web apps!
- [Ace Editor] - awesome web-based text editor
- [markdown-it] - Markdown parser done right. Fast and easy to extend.
- [Twitter Bootstrap] - great UI boilerplate for modern web apps
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [Gulp] - the streaming build system
- [Breakdance](https://breakdance.github.io/breakdance/) - HTML
to Markdown converter
- [jQuery] - duh

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

## Plugins

Dillinger is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.`;

// calculate listing tag to display at corner
const calculateStatus = (num) => {
    switch (num) {
        case 1:
            return "love"
            break;
        case 2: 
            return "Hot"
            break;
        case 3:
            return "gift"
            break;
        case 4: 
            return "50%"
            break;
        case 5:
            return "sale"
            break;
        default:
            break;
    }
}
// calculate auction type
const calculateAuctionType = (type) => {
    switch (type) {
        case "buy-it-now-ONLY":
            return "buy-it-now ONLY"
            break;
        case "buy-it-now-OR-best-offer":
            return "buy-it-now & best-offer";
            break;
        case "auction-AND-buy-it-now":
            return "auction & buy-it-now";
            break;
        case "auction-ONLY":
            return "auction ONLY";
            break;
        default:
            break;
    }
}
// render hashtags in mapped logic (returning data portion)
const renderTags = (tags) => {
    return (
        <div className="tags-container-listing-preview">
            <p style={{ paddingBottom: "12.5px" }} className="listing-description-header">Relevant Tags/Hashtags</p>
            {tags.map((tag, index) => {
                return <Badge className="listing-preview-badge" key={index} color="secondary">{tag.text}</Badge>;
            })}
        </div>
    );
}
// render tags but in LARGER SIZE/FORMAT
const renderLargerTags = (tags) => {
    return (
        <div className="tags-container-listing-preview-larger">
            <p style={{ paddingBottom: "12.5px" }} className="listing-description-header">Relevant Tags/Hashtags</p>
            {tags.map((tag, index) => {
                return <Badge className="listing-preview-badge-larger" key={index} color="secondary">{tag.text}</Badge>;
            })}
        </div>
    );
}
const preparePriceString = (bids, currentPrice, type, live, item, modalExists) => {
    // real live data exists - not a filler item
    if (live === true) {
        // AUCTION LISTINGS (((ONLY)))
        if (type.includes("auction")) {
            if (type === "auction-ONLY") {
                return (
                    <Fragment>
                        {`${bids.length} current bid's at $${currentPrice} (USD)`}
                        <p className={modalExists === true ? "pricing-details-custom-modal-text" : "pricing-details-custom"}>{"Auction ONLY"}</p>
                    </Fragment>
                );
            } else if (type === "auction-AND-buy-it-now") {
                const reservePrice = item.auctionPriceRelatedData.reservePrice;
                return (
                    <Fragment>
                        {`$${currentPrice.toFixed(2)} (Auction)`}
                        <p className={modalExists === true ? "pricing-details-custom-modal-text" : "pricing-details-custom"}>{`$${reservePrice.toFixed(2)} (Buy-it-now)`}</p>
                    </Fragment>
                );
            } 
            // BUY IT NOW LISTINGS (((ONLY)))
        } else {
            // create buy-it-now variable
            const buyitnow = item.auctionPriceRelatedData.buyItNowPrice;
            // buy it now OR best offer
            if (type === "buy-it-now-OR-best-offer") {
                // create minoffer variable for string below
                const minOffer = item.auctionPriceRelatedData.offerFeatureData.minimumRequiredOfferValue;
                // RETURN both best - offer buy it now
                return (
                    <Fragment>
                        {`$${buyitnow.toFixed(2)} (Buy-it-now)`}
                        <p className={modalExists === true ? "pricing-details-custom-modal-text" : "pricing-details-custom"}>{`$${minOffer.toFixed(2)} (Min-offer)`}</p>
                    </Fragment>
                );
            } else if (type === "buy-it-now-ONLY") {
                return (
                    <Fragment>
                        {`$${buyitnow.toFixed(2)} (buy-it-now) ONLY`}
                        <p className={modalExists === true ? "pricing-details-custom-modal-text" : "pricing-details-custom"}>{"Buy-it-now ONLY"}</p>
                    </Fragment>
                );
            }
        }
    } else {
        return `$${Number(item.price).toFixed(2)} current price`;
    }
}

const RenderConditionalRealDataOrNot = ({ history, singleProduct, onCloseModal, minusQty, plusQty, quantity, changeQty, onClickDetailPage, open, handleRedirectToIndividualSoftwarePage }) => {
    const symbol = "$";
    if (typeof singleProduct.default !== "undefined" && singleProduct.default === true) {
        // this is a PLACEHOLDER/DUMMY DATA modal display
        return (
            <Modal className="modal-lg modal-dialog-centered product-modal" isOpen={open}>
                <ModalBody>
                    <ModalHeader toggle={onCloseModal}>
                        <div className="product-box row">
                            <Col lg="6" className="product-img">
                            <Media className="img-fluid" src={require("../../../../../../assets/images/product/12.png")} alt="" />
                            </Col>
                            <Col lg="6" className="product-details  text-left">
                            <h4>{singleProduct.category}</h4> {/*  singleProduct */}
                            <div className="product-price">
                                {symbol}{singleProduct.price}
                                <del>{symbol}{singleProduct.discountPrice}</del>
                            </div>
                            <div className="product-view">
                                <h6 className="f-w-600">{ProductDetails}</h6>
                                <p className="mb-0">{singleProduct.description}</p>
                            </div>
                            <div className="product-size">
                                <ul>
                                {ProductSizeArray.map((items,i) => 
                                    <li key={i}>
                                    <Button color="outline-light">{items}</Button>
                                    </li>
                                )}
                                </ul>
                            </div>
                            <div className="product-qnty">
                                <h6 className="f-w-600">{Quantity}</h6>
                                <fieldset>
                                <InputGroup className="bootstrap-touchspin">
                                    <InputGroupAddon addonType="prepend">
                                    <Button color="primary btn-square" className="bootstrap-touchspin-down" onClick={minusQty}><i className="fa fa-minus"></i></Button>
                                    </InputGroupAddon>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText className="bootstrap-touchspin-prefix" style={{ display: "none" }}></InputGroupText>
                                    </InputGroupAddon>
                                    <Input className="touchspin text-center" type="text" name="quantity" value={quantity} onChange={(e) => changeQty(e)} style={{ display: "block" }} />
                                    <InputGroupAddon addonType="append">
                                    <InputGroupText className="bootstrap-touchspin-postfix" style={{ display: "none" }}></InputGroupText>
                                    </InputGroupAddon>
                                    <InputGroupAddon addonType="append" className="ml-0">
                                    <Button color="primary btn-square" className="bootstrap-touchspin-up" onClick={plusQty}><i className="fa fa-plus"></i></Button>
                                    </InputGroupAddon>
                                </InputGroup>
                                </fieldset>
                                <div className="addcart-btn">
                                <Link to={`${process.env.PUBLIC_URL}/app/ecommerce/cart`}><Button color="primary" className="mr-2 mt-2" onClick={() => {
                                    console.log("purchase - add to cart (last func)!");

                                    // addcart(singleProduct, quantity)
                                }}>{AddToCart}</Button></Link>
                                <Button onClick={() => onClickDetailPage(singleProduct)} color="primary" className="mr-2 mt-2">Visit/View Listing</Button>
                                </div>
                            </div>
                            </Col>
                        </div>
                    </ModalHeader>
                </ModalBody>
            </Modal>
        );
    } else {
        // is listing live or not?
        const live = singleProduct.default !== true ? true : false;
        // auction type calculator function helper
        const auctionType = live ? singleProduct.auctionPurchaseType : null;
        // prepare thumbnail to be displayed
        const mainThumbnailImage = `${process.env.REACT_APP_ASSET_LINK}/${singleProduct.thumbnailImage.link}`;
        // screenshots AFTER thumbnail image
        const imagesArrayCombined = [{ original: mainThumbnailImage, thumbnail: mainThumbnailImage } ,...singleProduct.screenshotUploadImages];
        // this is REAL DATA modal - actual data from DATABASE        
        return (
            <Modal className="modal-lg modal-dialog-centered product-modal custom-product-modal-styled" isOpen={open}>
                <ModalBody>
                    <ModalHeader toggle={onCloseModal}>
                        <div className="product-box row">
                            <Col lg="6" className="product-img">
                                <div className="centered-both-ways">
                                    <ImageGallery thumbnailPosition={"bottom"} className={"image-gallery-product-view"} items={imagesArrayCombined} additionalClass={"inner-img-thumbnail-slider-product-show"} />
                                    {/* <Media className="img-fluid" src={mainThumbnailImage} alt="" /> */}
                                </div>
                            </Col>
                            <Col lg="6" className="product-details  text-left">
                            <h4>{singleProduct.listingTitle}</h4> {/*  singleProduct */}
                            <div className="product-price">
                                {preparePriceString(singleProduct.bids, singleProduct.currentBidPrice, auctionType, live, singleProduct, true)}
                            </div>
                            <div className="product-view">
                                <h6 className="f-w-600">{ProductDetails}</h6>
                                <ReactMarkdown className="markdown-description-modal-listing-preview" children={singleProduct.description} remarkPlugins={[remarkGfm]} />
                            </div>
                            <div className="product-size">
                                <ul>
                                {renderLargerTags(singleProduct.hashtags)}
                                </ul>
                            </div>
                            <div className="product-qnty">
                                <h6 className="f-w-600">{Quantity}</h6>
                                <fieldset>
                                {auctionType !== "auction-ONLY" && auctionType !== null ? <InputGroup className="bootstrap-touchspin">
                                    <InputGroupAddon addonType="prepend">
                                        <Button color="primary btn-square" className="bootstrap-touchspin-down" onClick={minusQty}><i className="fa fa-minus"></i></Button>
                                    </InputGroupAddon>
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText className="bootstrap-touchspin-prefix" style={{ display: "none" }}></InputGroupText>
                                    </InputGroupAddon>
                                    <Input className="touchspin text-center" type="text" name="quantity" value={quantity} onChange={(e) => changeQty(e)} style={{ display: "block" }} />
                                        <InputGroupAddon addonType="append">
                                        <InputGroupText className="bootstrap-touchspin-postfix" style={{ display: "none" }}></InputGroupText>
                                    </InputGroupAddon>
                                    <InputGroupAddon addonType="append" className="ml-0">
                                        <Button color="primary btn-square" className="bootstrap-touchspin-up" onClick={plusQty}><i className="fa fa-plus"></i></Button>
                                    </InputGroupAddon>
                                </InputGroup> : null}
                                </fieldset>
                                <Col sm="12" md="12" lg="12" xl="12">
                                    <ButtonGroup id="stretch-pill-button-custom-group" className="btn-group-pill">
                                        <Button outline color="primary">Add To Cart!</Button>
                                        <Button onClick={() => {
                                            handleRedirectToIndividualSoftwarePage(singleProduct, history, onCloseModal, true)
                                        }} color="secondary">Visit/View Listing</Button>
                                        <Button outline color="primary">Bookmark!</Button>
                                    </ButtonGroup>
                                </Col>
                            </div>
                            </Col>
                        </div>
                    </ModalHeader>
                </ModalBody>
            </Modal>
        );
    }
}


export default {
    dummyNoteDescription,
    preparePriceString,
    renderTags,
    calculateAuctionType,
    calculateStatus,
    RenderConditionalRealDataOrNot
}