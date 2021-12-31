import React, { Fragment } from "react";
import { NotificationManager } from 'react-notifications';
import uuid from "react-uuid";
import FileViewer from 'react-file-viewer';
import { Button, Label, Row, Col, Card, CardBody, CardHeader, Container, Media, Input } from "reactstrap";
import "./styles.css";
import ReactPlayer from 'react-player';
import ImageGallery from 'react-image-gallery';
import { Controller } from 'react-hook-form';

// functions with export ability to slim down main component (pageThreeMain.js)..
const CalculateWhetherURLIsLegit = (data) => {
    // check wether http/https is legitmate and correct...    
    const isValidHttpUrl = (string) => {
        let url;
        
        try {
            url = new URL(string);
        } catch (_) {
            return false;  
        }
        
        return url.protocol === "http:" || url.protocol === "https:";
    }
    // create function variable in preparation for conditional check
    const isValid = isValidHttpUrl(data);
    // check if valid URL
    if (isValid) {
        return true;
    } else {
        return false;
    };
}
const listingTimespanOptions = [
    { value: 1440, label: "1 Day (24 Hours)", countMethod: "minute(s)" },
    { value: 2160, label: "1.5 Days (36 Hours)", countMethod: "minute(s)" },
    { value: 2880, label: "2 Days (48 Hours)", countMethod: "minute(s)" },
    { value: 3600, label: "2.5 Days (60 Hours)", countMethod: "minute(s)" },
    { value: 4320, label: "3 Days (72 Hours)", countMethod: "minute(s)" },
    { value: 5760, label: "4 Days (96 Hours)", countMethod: "minute(s)" },
    { value: 7200, label: "5 Days (120 Hours)", countMethod: "minute(s)" },
    { value: 8640, label: "6 Days (144 Hours)", countMethod: "minute(s)" },
    { value: 10080, label: "7 Days (168 Hours)", countMethod: "minute(s)" },
    { value: 14400, label: "10 Days (240 Hours)", countMethod: "minute(s)" },
    { value: 20160, label: "14 Days (336 Hours)", countMethod: "minute(s)" },
    { value: 30240, label: "21 Days (504 Hours)", countMethod: "minute(s)" }
];
const handleDelete = (i, tags) => {
    return tags.filter((tag, index) => index !== i);
}
const handleDrag = (tag, currPos, newPos, existingTags) => {
    const tags = [...existingTags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // return changes (new tag array with moved element/item);
    return newTags;
};
const calculateFileType = (type) => {
    switch (type) {
        case "video/mp4":
            return "mp4";
            break;
        case "image/png":
            return "png";
            break;
        case "image/jpeg":
            return "jpeg";
            break;
        case "image/gif":
            return "gif";
            break;
        case "image/bmp":
            return "bmp";
            break;
        case "application/pdf":
            return "pdf";
            break;
        case "text/csv":
            return "csv";
            break;
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            return "xlsx";
            break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return "docx";
            break;
        case "video/webm":
            return "webm";
            break;
        case "audio/mpeg":
            return "mp3";
            break;
        default:
            break;
    }
}
const renderVideoDemoPreview = (file) => {
    if (file !== null) {
        return (
            <Fragment>
                <Row>
                    <Col sm="12" md="6" lg="6" xl="6">
                        <div className="absolute-centered-both-ways">
                            <Label style={{ marginBottom: "25px" }}>Your uploaded video demonstration (demo) will be displayed below - if you'd like to change this video, upload <strong>another</strong> clip to replace the current one.</Label>
                        </div>
                    </Col>
                    <Col sm="12" md="6" lg="6" xl="6">
                        <ReactPlayer controls={true} playIcon={true} playing={false} loop={false} volume={1} width={"100%"} height={"100%"} url={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} />
                    </Col>
                </Row>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <Row>
                    <Col sm="12" md="6" lg="6" xl="6">
                        <div className="absolute-centered-both-ways">
                            <Label style={{ marginBottom: "25px" }}>You currently do not have an uploaded "Video Demo" file - if you'd like to change this, upload a video with the <strong style={{ color: "blue" }}>"video uploader"</strong> above and the changes will be reflected.</Label>
                        </div>
                    </Col>
                    <Col sm="12" md="6" lg="6" xl="6">
                        <img src={require("../../../../../../../../assets/images/placeholder.png")} className="preview-image-thumbnail" />
                    </Col>
                </Row>
            </Fragment>
        ); 
    }
}
const RenderOptionsRadioSelectsAuctionType = ({ clearErrors, control, setError, register, radioSelectionPricingOptionsOne, radioSelectionPricingOptionsTwo, radioSelectionPricingOptionsThree, radioSelectionPricingOptionsFour, errors, onRadioChange, selected, scrollToTourWrapper}) => {
    // radioSelectionPricingOptions - react-hook-form logic
    return (
        <Fragment>
            <Row style={{ paddingTop: "17.5px", paddingBottom: "7.5px" }}>
                <Col sm="12" md="12" lg="12" xl="12">
                    <h5><strong style={{ color: "blue" }}>Choose</strong> a listing "sell" type between buy-it-now, best-offer, auction or a combination</h5>
                    <p>You <strong>MUST</strong> choose <strong>ONE</strong> option from the selections below - this is the way your listing will be posted and the available options for potential buyers to choose from... Each selection type has its own pro's and con's so choose wisely - you cannot change this option later.</p>
                </Col>
            </Row>
            <div ref={scrollToTourWrapper} id="tour-wrapper">
                <Row className="row-margin-radios">
                    <Col className="column-targeting-inner-card" sm="12" md="6" lg="6" xl="6">
                        <Card>
                        <Media className="p-20 custom-media-container">
                            <div className="radio radio-secondary mr-3">
                            <Controller
                                control={control}
                                name={radioSelectionPricingOptionsOne.name}
                                {...radioSelectionPricingOptionsOne.check(setError, register, clearErrors)}
                                render={({ field }) => (
                                    <Input {...field} onChange={(e) => {
                                        onRadioChange(e.currentTarget.value);
                                    }} checked={selected === radioSelectionPricingOptionsOne.value ? true : false} id={radioSelectionPricingOptionsOne.id} type="radio" value={radioSelectionPricingOptionsOne.value} />
                                )}
                            />
                            <Label for="auction-ONLY"></Label>
                            </div>
                            <Media body>
                            <h6 className="mt-0 mega-title-badge">Auction <em style={{ color: "#f73164" }}>ONLY</em><span className="badge badge-secondary pull-right digits">{"AUCTION"}</span></h6>
                            <p>Selecting this option will set your listing as an <strong style={{ color: "#f73164" }}>auction listing</strong> so people will <strong style={{ color: "#f73164" }}>ONLY</strong> be able post "bids" on your listing VS "buy-it-now" or "best-offer". You will need to set select your auction options after selecting this option.</p>
                            </Media>
                        </Media>
                        </Card>
                    </Col>
                    <Col className="column-targeting-inner-card" sm="12" md="6" lg="6" xl="6">
                        <Card>
                        <Media className="p-20 custom-media-container">
                            <div className="radio radio-primary mr-3">
                            <Controller
                                control={control}
                                name={radioSelectionPricingOptionsTwo.name}
                                {...radioSelectionPricingOptionsTwo.check(setError, register, clearErrors)}
                                render={({ field }) => (
                                    <Input {...field} onChange={(e) => {
                                        onRadioChange(e.currentTarget.value);
                                    }} checked={selected === radioSelectionPricingOptionsTwo.value ? true : false} id={radioSelectionPricingOptionsTwo.id} type="radio" value={radioSelectionPricingOptionsTwo.value} />
                                )}
                            />
                            <Label for="auction-AND-buy-it-now"></Label>
                            </div>
                            <Media body>
                            <h6 className="mt-0 mega-title-badge">Auction <em style={{ color: "#7366ff" }}>AND</em> "Buy-it-now"<span className="badge badge-primary pull-right digits">{"ACTION + BUY-IT-NOW"}</span></h6>
                            <p>Selecting this option will set your listing as a <strong style={{ color: "#7366ff" }}>auction AND "buy-it-now" listing</strong> so people will have the option to <em>immediately</em> purchase your software/code for sale OR they may place a bid. If someone purchases via <strong style={{ color: "#7366ff" }}>"buy-it-now"</strong> then the auction will end abruptly and any bids will be discarded and null/void.</p>
                            </Media>
                        </Media>
                        </Card>
                    </Col>
                </Row>
                <Row> {/* ---- auction-ONLY ---- auction-AND-buy-it-now ---- buy-it-now-OR-best-offer ---- buy-it-now-ONLY ---- */}
                    <Col className="column-targeting-inner-card" sm="12" md="6" lg="6" xl="6">
                        <Card>
                        <Media className="p-20 custom-media-container">
                            <div className="radio radio-primary mr-3">
                            <Controller
                                control={control}
                                name={radioSelectionPricingOptionsThree.name}
                                {...radioSelectionPricingOptionsThree.check(setError, register, clearErrors)}
                                render={({ field }) => (
                                    <Input {...field} onChange={(e) => {
                                        onRadioChange(e.currentTarget.value);
                                    }} checked={selected === radioSelectionPricingOptionsThree.value ? true : false} id={radioSelectionPricingOptionsThree.id} type="radio" value={radioSelectionPricingOptionsThree.value} />
                                )}
                            />
                            <Label for="buy-it-now-OR-best-offer"></Label>
                            </div>
                            <Media body>
                            <h6 className="mt-0 mega-title-badge">"Buy-it-now" OR "best-offer" <em style={{ color: "#7366ff" }}>ONLY</em><span className="badge badge-primary pull-right digits">{"BUY-IT-NOW OR BEST-OFFER"}</span></h6>
                                <p>Selecting this option will set your listing as a <strong style={{ color: "#7366ff" }}>buy-it-now OR best-offer</strong> listing which means people will only be able to "immediately" purchase your software/code OR they may <strong style={{ color: "#7366ff" }}>"make an offer"</strong> for you to respond whether or not you deem the offer acceptable. You can/will recieve multiple offers (if listing is popular/in-demand) in which you'll be able to extend, select, deny or message (more options exist) in response to offers recieved.</p>
                            </Media>
                        </Media>
                        </Card>
                    </Col>
                    <Col className="column-targeting-inner-card" sm="12" md="6" lg="6" xl="6">
                        <Card>
                        <Media className="p-20 custom-media-container">
                            <div className="radio radio-secondary mr-3">
                            <Controller
                                control={control}
                                name={radioSelectionPricingOptionsThree.name}
                                {...radioSelectionPricingOptionsThree.check(setError, register, clearErrors)}
                                render={({ field }) => (
                                    <Input {...field} onChange={(e) => {
                                        onRadioChange(e.currentTarget.value);
                                    }} checked={selected === radioSelectionPricingOptionsFour.value ? true : false} id={radioSelectionPricingOptionsThree.id} type="radio" value={radioSelectionPricingOptionsThree.value} />
                                )}
                            />
                            <Label for="buy-it-now-ONLY"></Label>
                            </div>
                            <Media body>
                            <h6 className="mt-0 mega-title-badge">"Buy-it-now" <em style={{ color: "#f73164" }}>ONLY</em><span className="badge badge-secondary pull-right digits">{"BUY-IT-NOW"}</span></h6>
                                <p>Selecting this option will set your listing as a <strong style={{ color: "#f73164" }}>buy-it-now</strong> listing which means people will only be able to purchase what's for sale via a one-time non-negotiable payment which ends the listing. This does <strong style={{ color: "#f73164" }}>NOT</strong> include <strong style={{ color: "#f73164" }}>best-offer's</strong>.</p>
                            </Media>
                        </Media>
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className="spacer-error" />
            {errors.auctionPurchaseType ? <span className="span-tooltip">{errors.auctionPurchaseType.message}</span> : null}
        </Fragment>
    );
}
const renderThumbnailImage = (file) => {
    if (file !== null) {
        return (
            <Fragment>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="6">
                        <div className="absolute-centered-both-ways">
                            <Label style={{ marginBottom: "25px" }}>Your uploaded thumbnail will be displayed below - if you'd like to change this image, upload <strong>another</strong> image to replace the current one.</Label>
                        </div>
                    </Col>
                    <Col sm="12" md="12" lg="12" xl="6">
                        <img src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} className="preview-image-thumbnail" />
                    </Col>
                </Row>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <Row id="row-containing-label-mobile-restyle">
                    <Col sm="12" md="12" lg="12" xl="6">
                        <div className="absolute-centered-both-ways">
                            <Label style={{ marginBottom: "25px" }}>You currently do not have an uploaded thumbnail image - if you'd like to change this, upload an image with the <strong style={{ color: "blue" }}>"uploader"</strong> above and the changes will be reflected.</Label>
                        </div>
                    </Col>
                    <Col sm="12" md="12" lg="12" xl="6">
                        <img src={require("../../../../../../../../assets/images/placeholder.png")} className="preview-image-thumbnail" />
                    </Col>
                </Row>
            </Fragment>
        ); 
    }
}
const renderPreviewOfFile = (data, filePathData, fileReady) => { 
    // file general data
    const file = data.fileWithMeta.file;
    // return preview data via FileViewer (to not exclude documents such as .docx and such...);
    if (fileReady === true) {
        return (
            <div className="filereader-preview-dropzone">
                <FileViewer
                    fileType={calculateFileType(file.type)}
                    filePath={filePathData}
                    onError={(e) => {
                        console.log(e, 'error in file-viewer');

                        NotificationManager.warning("An error occurred while attempting to display your desired image - please try again.", "Error displaying desired image!", 4500);
                    }}
                    key={file.id}
                />
            </div>
        );
    } else {
        return null;
    }
}
const renderCenteredScaledImage = () => {
    return (
        <Fragment>
            <div style={{ paddingTop: "22.5px" }} className="centered-both-ways">
                <img src={require("../../../../../../../../assets/images/placeholder.png")} className="preview-image-thumbnail" />
            </div>
        </Fragment>
    );
}
const RenderGallerySlideshowUploadedScreenshots = (images) => {
    return (
        <Fragment>
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="8">
                        <div>
                            <Card className="custom-card-image-gallery">
                                <CardBody className={typeof images !== "undefined" && images.length > 0 ? "slideshow-modify-cardbody" : "slideshow-modify-cardbody-default-empty"}>
                                    {typeof images !== "undefined" && images.length > 0 ? <ImageGallery thumbnailPosition={"left"} additionalClass={"custom-gallery-slider-slideshow"} items={images} /> : renderCenteredScaledImage()}
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                    <Col sm="12" md="12" lg="12" xl="4">
                        <Card className="custom-card-image-gallery">
                            <CardHeader id="modify-delete-card-header" className="b-l-secondary border-3">
                                <h5>Modify/Delete Existing Uploaded Photo's</h5>
                            </CardHeader>
                            <CardBody className="modify-delete-cardbody">
                                <p>{"Modify or delete any of your existing 'already uploaded' photos/images by clicking the button below and selecting which photos you'd like to replace or delete."}</p>
                                <hr />
                                <Button style={{ marginTop: "12.5px" }} onClick={(e) => {
                                    e.preventDefault();
                                    // open modal to modify existing photos/images
                                }} className="btn-air-secondary" color="secondary" size="md">Edit/Modify Existing Image/Photo's</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}
const imageChangeAndConversion = (file) => {
    return URL.createObjectURL(file);
}
const suggestionsPreselected = [
    { id: uuid(), text: "snippet" },
    { id: uuid(), text: "code" },
    { id: uuid(), text: "cloud" },
    { id: uuid(), text: "software" },
    { id: uuid(), text: "domain" },
    { id: uuid(), text: "exploit" },
    { id: uuid(), text: "breach" },
    { id: uuid(), text: "malware" },
    { id: uuid(), text: "virus" },
    { id: uuid(), text: "randsomware" },
    { id: uuid(), text: "trojan-horse" },
    { id: uuid(), text: "worm" },
    { id: uuid(), text: "spyware" },
    { id: uuid(), text: "rootkit" }
];
// export functions for pageThreeMain.js component
export default { 
    CalculateWhetherURLIsLegit, 
    listingTimespanOptions, 
    handleDrag, // hashtag input related
    handleDelete, // hashtag input related
    suggestionsPreselected,
    renderPreviewOfFile,
    imageChangeAndConversion,
    renderThumbnailImage,
    renderVideoDemoPreview,
    RenderGallerySlideshowUploadedScreenshots,
    RenderOptionsRadioSelectsAuctionType
};

// NotificationManager.success("It fuckin' worked!", "YAY!", 45000);