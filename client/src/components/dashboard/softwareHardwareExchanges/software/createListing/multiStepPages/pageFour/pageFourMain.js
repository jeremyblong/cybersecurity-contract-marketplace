import React, { useEffect, useState, useRef, Fragment } from 'react';
import { Col, Button, Label, Input, Card, CardHeader, CardBody, Media, Row, ListGroup } from 'reactstrap';
import "./styles.css";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { saveSoftwareListingInfo } from "../../../../../../../redux/actions/hackers/createSoftwareListing/createNewSoftwareListingSale.js";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import helperFunctions from "./helpers/mainHelperFunctions.js";

const { renderSupportDetails, ReactSlickSliderUploadedPublicFilesHelper, renderConvertedListingTypeValue, universalContentDisplayListGroupHelper } = helperFunctions;

const PageFourMainHelper = ({ previouslySavedSoftwareData }) => {
    // create history object to eventually redirect upon submission
    const history = useHistory();
    // state initialization
    const [ ready, setReadyState ] = useState(false);


    // mounted and prepared check
    useEffect(() => {

        console.log("previouslySavedSoftwareData", previouslySavedSoftwareData);

        if (previouslySavedSoftwareData) {
            setReadyState(true);   
        }
    }, []);


    // conditional render helper function (MAIN)...
    const renderMainContentChunk = () => {
        const { category, listingTitle, description, codingLanguageContent, auctionPriceRelatedData, auctionPurchaseType, commentToReviewer, demoURL, hashtags, listingTimespan, supportExternalURL, supportProvidedExternalURL, supportResponseTimespanData, uploadedPublicFiles } = previouslySavedSoftwareData;

        const supportDetails = {
            ...supportResponseTimespanData,
            supportProvidedExternalURL,
            supportExternalURL: typeof supportExternalURL !== "undefined" ? supportExternalURL : null
        }

        if (ready === true) {
            return (
                <Fragment>
                    <Media>
                        <img className="img-40 img-fluid m-r-20" src={require("../../../../../../../assets/images/user/11.png")} alt="" />
                        <Media body>
                            <h6 className="f-w-600">
                                <a href={null}>Page <strong>ONE (20% - Progress)</strong> detail(s) review & posting</a>
                                <span className="pull-right">
                                    <Link to={`/`}> 
                                        <Button color="primary">{"Edit This Portion Of Data"}</Button>
                                    </Link>
                                </span>
                            </h6>
                            <p className="listing-review-text">LISTING REVIEW - POST NEW LISTING</p>
                        </Media>
                    </Media>
                    <div style={{ paddingTop: "17.5px" }} className="job-description">
                        <h6><em className="descriptive-chunk">Listing Title</em></h6>
                        <p>{listingTitle}</p>
                        <h6><em className="descriptive-chunk">Listing Description</em></h6>
                        <ReactMarkdown className="markdown-description-display" children={description} remarkPlugins={[remarkGfm]} />
                        <div className="natural-sm-spacer" />
                        <div className="natural-sm-spacer" />
                        <div className="natural-sm-spacer" />
                        <Row>
                            <Col sm="12" md="6" lg="6" xl="6">
                                <h6><em className="descriptive-chunk">Primary Language Software Coded In (Software coded with...)</em></h6>
                                <p>{codingLanguageContent.label}</p>
                            </Col>
                            <Col sm="12" md="6" lg="6" xl="6">
                                <h6><em className="descriptive-chunk">Type Of Hack Being Sold (Category)</em></h6>
                                <p>{category.label}</p>
                            </Col>
                        </Row>
                        <div className="natural-sm-spacer" />
                        <div className="natural-sm-spacer" />
                        <Row>
                            <div>
                                <h6><em className="descriptive-chunk">Support Settings (Offering support OR not offering)</em></h6>
                                {renderSupportDetails(supportDetails)}
                            </div>
                        </Row>
                        <div className="natural-sm-spacer" />
                        <div className="natural-sm-spacer" />
                        <div className="natural-sm-spacer" />
                        <Row>
                            <Col sm="12" md="6" lg="6" xl="6">
                                <Card className={supportResponseTimespanData.type === "no-support" ? "active-radio-selection" : "inactive-radio-selection"}>
                                    <Media className="p-20">
                                    <div className="radio radio-secondary mr-3">
                                        <Input checked={supportResponseTimespanData.type === "no-support" ? true : false} id="radio19" type="radio" name="radio1" value="option1" />
                                        <Label for="radio19"></Label>
                                    </div>
                                    <Media body>
                                        <h6 className="mt-0 mega-title-badge">NO Support Provided<span className="badge badge-secondary pull-right digits custom-badge-outline-not-included">{"NO Support - NOT Provided"}</span></h6>
                                        <p>{"No support is provided with the sale of this listing. This means user's MUST know (for the most part) what they're doing so they can easily understand README's and instructions. If you select this option, PLEASE include very detailed instructions to your audience"}</p>
                                    </Media>
                                    </Media>
                                </Card>
                            </Col>
                            <Col sm="12" md="6" lg="6" xl="6">
                                <Card className={supportResponseTimespanData.type === "no-support" ? "inactive-radio-selection" : "active-radio-selection"}>
                                    <Media className="p-20">
                                    <div className="radio radio-success mr-3">
                                        <Input checked={supportResponseTimespanData.type !== "no-support" ? true : false} id="radio19" type="radio" name="radio1" value="option1" />
                                        <Label for="radio19"></Label>
                                    </div>
                                    <Media body>
                                        <h6 className="mt-0 mega-title-badge">SUPPORT IS INCLUDED<span className="badge badge-success pull-right digits custom-badge-outline-included">{"Support-PROVIDED"}</span></h6>
                                        <p>{"This means you have selected to INCLUDE support in your listing (we HIGHLY suggest including at least a limited amount of support) and you're willing to participate in any minor troubleshooting revolving around the 'SET-UP' of your code/software ONLY. This does NOT mean you need to walk people through anything other than simply setting up the core components of what you're selling. To reiterate, We HIGHLY suggest using this functionality."}</p>
                                        {supportExternalURL !== null ? <Fragment>
                                            <hr />
                                            <div className="flat-white-background-rounded">
                                                <a onClick={() => {
                                                    window.open(supportDetails.supportExternalURL, "_blank");
                                                }} className="support-url-text">{supportDetails.supportExternalURL}</a>
                                            </div>
                                        </Fragment> : null}
                                    </Media>
                                    </Media>
                                </Card>
                            </Col>
                        </Row>
                        <div className="natural-sm-spacer" />
                        <div className="natural-sm-spacer" />
                        <hr className="secondary-hr" />
                        <div className="natural-sm-spacer" />
                        <div className="natural-sm-spacer" />
                        <Row>
                            <Media>
                                <img className="img-40 img-fluid m-r-20" src={require("../../../../../../../assets/images/user/11.png")} alt="" />
                                <Media body>
                                    <h6 className="f-w-600">
                                        <a href={null}>Page <strong>TWO (40% - Progress)</strong> detail(s) review & posting</a>
                                        <span className="pull-right">
                                            <Link to={`/`}> 
                                                <Button color="primary">{"Edit This Portion Of Data"}</Button>
                                            </Link>
                                        </span>
                                    </h6>
                                    <p className="listing-review-text">LISTING REVIEW - POST NEW LISTING</p>
                                </Media>
                            </Media>
                        </Row>
                        <div className="natural-sm-spacer" />
                        <Row>
                            <Col sm="12" md="12" lg="12" xl="12">
                                {universalContentDisplayListGroupHelper("Uploaded (Transferable/transferred) file(s) to be given to purchaser", null, "Purchaseable Content Transferred To Buyer", `These files will be transferred to whoever purchases your listing - if using "Buy-it-now" or using "multiple quantities for sale" then each user that makes a purchase will be given full access to these following files (the files below)...`)}
                                <div className="natural-sm-spacer" />
                                <div className="natural-sm-spacer" />
                                <div className="natural-sm-spacer" />
                                <ReactSlickSliderUploadedPublicFilesHelper uploadedPublicFiles={uploadedPublicFiles} />
                            </Col>
                        </Row>
                        <div className="natural-sm-spacer" />
                        <div className="natural-sm-spacer" />
                        <hr className="secondary-hr" />
                        <div className="natural-sm-spacer" />
                        <div className="natural-sm-spacer" />
                        <Row>
                            <Media>
                                <img className="img-40 img-fluid m-r-20" src={require("../../../../../../../assets/images/user/11.png")} alt="" />
                                <Media body>
                                    <h6 className="f-w-600">
                                        <a href={null}>Page <strong>THREE (60% - Progress)</strong> detail(s) review & posting</a>
                                        <span className="pull-right">
                                            <Link to={`/`}> 
                                                <Button color="primary">{"Edit This Portion Of Data"}</Button>
                                            </Link>
                                        </span>
                                    </h6>
                                    <p className="listing-review-text">LISTING REVIEW - POST NEW LISTING</p>
                                </Media>
                            </Media>
                        </Row>
                        <div className="natural-sm-spacer" />
                        <div className="natural-sm-spacer" />
                        <div className="natural-sm-spacer" />
                        <div className="natural-sm-spacer" />
                        <Row>
                            <Col sm="12" md="12" lg="12" xl="12">
                                {universalContentDisplayListGroupHelper("Demo URL (This is a live URL where user's can demo your product/code/software)", demoURL, "LIVE Demo URL", null)}
                            </Col>
                        </Row>
                        <div className="natural-sm-spacer" />
                        <Row>
                            <Col sm="12" md="6" lg="6" xl="6">
                                {universalContentDisplayListGroupHelper("Listing Duration (Total time to be listed/available to purchase - starts from posted date)", listingTimespan.label, "Listing Duration - Timespan", null)}
                            </Col>
                            <Col sm="12" md="6" lg="6" xl="6">
                                <ListGroup>
                                    {renderConvertedListingTypeValue(auctionPriceRelatedData.auctionSelectedType)}
                                </ListGroup>
                            </Col>
                        </Row>
                    </div>
                </Fragment>
            );
        } else {
            // not ready - render skelaton
            return (
                <Fragment>
                    <SkeletonTheme baseColor="#d4d4d4" highlightColor="#8f8f8f">
                        <p>
                            <Skeleton containerClassName={"stretch-bars"} count={45} />
                        </p>
                    </SkeletonTheme>
                </Fragment>
            );
        }
    }

    return renderMainContentChunk();
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data,
        previouslySavedSoftwareData: state.softwareListingSale.softwareListingSaleInfo
    }
}
export default connect(mapStateToProps, { saveSoftwareListingInfo })(PageFourMainHelper);
