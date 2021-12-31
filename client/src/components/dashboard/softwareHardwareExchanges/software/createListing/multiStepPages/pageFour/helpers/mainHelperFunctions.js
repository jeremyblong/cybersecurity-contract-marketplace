import React, { Fragment, useState, useEffect } from "react";
import Slider from "react-slick";
import FileViewer from 'react-file-viewer';
import "../styles.css";
import { ListGroup, Card, CardBody, ListGroupItem, CardHeader } from "reactstrap";
import moment from "moment";

const renderSupportDetails = (option) => {
    const renderHelper = () => {
        if (option.supportProvidedExternalURL === true) {
            return `and it is available via a support URL at ${option.supportExternalURL}!`
        } else {
            return "!";
        }
    }
    // render and return related support details into main helper function ---- <p>{category.label}</p>
    if (option.supportProvidedExternalURL === true) {
        // support URL exists and supported
        return (
            <Fragment>{option.supportProvidedExternalURL}
                <p>Support <strong style={{ color: "red" }}>IS PROVIDED</strong> with this listing {renderHelper()}</p>
            </Fragment>
        );
    } else {
        // support URL does NOT exist - no support
        return (
            <Fragment>
                <p><strong style={{ color: "red" }}>NO</strong> support is provided with this listing.</p>
            </Fragment>
        );
    }
}

const ReactSlickSliderUploadedPublicFilesHelper = ({ uploadedPublicFiles }) => {

    const [ activeFileArray, setActiveFileArray ] = useState([]);
    const [ ready, setReady ] = useState(false);

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
            case "text/plain":
                return "text-document";
                break;
            case "application/vnd.debian.binary-package": 
                return "deb";
                break;
            case "application/octet-stream":
                return "exe"
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        console.log("mounted mainHelperFunctions.js REVIEW page...!");

        const newFileArrayUpdated = [];

        // loop over files and update if displayable
        if (typeof uploadedPublicFiles !== "undefined" && uploadedPublicFiles.length > 0) {
            for (let index = 0; index < uploadedPublicFiles.length; index++) {
                const file = uploadedPublicFiles[index];
                // retreieve converted/calculated file type
                const calculatedType = calculateFileType(file.type);
                // check if certain doc types
                if ((calculatedType === "text-document") || (calculatedType === "deb") || (calculatedType === "exe")) {
                    if ((calculatedType !== "deb") || (calculatedType !== "exe")) {
                        // NOT any matches - text-document only --- for now
                        newFileArrayUpdated.push({
                            ...file,
                            type: file.type,
                            notSupported: true
                        })
                    } else {
                        // FILE is one of these... ---- ~ deb OR exe ~
                        newFileArrayUpdated.push({
                            ...file,
                            type: "not-displayable",
                            notSupported: true
                        })
                    }
                } else {
                    // dont do anything
                    newFileArrayUpdated.push({
                        ...file,
                        type: file.type,
                        notSupported: false
                    })
                }
            }
        };
        // set new updated data to new array to map over
        setActiveFileArray(newFileArrayUpdated);
        // set as ready to allow display
        setReady(true);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const onError = (error) => {
        console.log("error", error);
    }
    const bytesToSize = (bytes) => {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
    const renderUnknownFileTypeCard = (file) => {
        return (
            <Fragment>
                <Card className="stretch-card-to-parent">
                    <CardHeader className="b-l-primary border-3">
                        <h5>{file.name}</h5>
                        <div className="natural-sm-spacer" />
                        <p>This uploaded item has been properly uploaded HOWEVER we are unable to display file types with the extension type given in this file.</p>
                    </CardHeader>
                    <CardBody>
                        <ListGroup>
                            <ListGroupItem>Uploaded: {moment(new Date(file.systemDate)).fromNow()}</ListGroupItem>
                            <ListGroupItem>File Type: {calculateFileType(file.type)} file type</ListGroupItem>
                            <ListGroupItem>File Size: {bytesToSize(file.size)}</ListGroupItem>
                        </ListGroup>
                        <div className="centered-both-ways">
                            <i className={`fa fa-file-text-o txt-success enhance-default-icon-size`}></i>
                        </div>
                    </CardBody>
                </Card>
            </Fragment>
        );
    }
    return (
        <Fragment>
            <Slider {...settings}>{/* "text-document" */}
                {ready === true ? activeFileArray.map((file, index) => {
                    console.log("ACTUAL file : ", file);

                    const filePathData = `${process.env.REACT_APP_ASSET_LINK}/${file.link}`;
                    return (
                        <Fragment key={index}>
                            <div className="fileviewer-wrapper-slider">
                                {file.notSupported === true ? renderUnknownFileTypeCard(file) : <FileViewer
                                    fileType={calculateFileType(file.type)}
                                    filePath={filePathData}
                                    onError={onError}
                                    className={"file-viewer-component-slider"}
                                    key={file.id}
                                />}
                            </div>
                        </Fragment>
                    );
                }) : null}
            </Slider>
        </Fragment>
    );
}
const universalContentDisplayListGroupHelper = (title, data, topRightTag, note) => {
    return (
        <Fragment>
            <ListGroupItem className="list-group-item-action flex-column align-items-start custom-listgroup-item-outter">
                <div className="d-flex w-100 justify-content-between">
                <h6><p className="descriptive-chunk">{title}</p></h6><strong className="top-right-title">{topRightTag}</strong>
                </div>
                {note !== null ? <p className="custom-note-text">{note}</p> : null}
                {data !== null ? <Fragment>
                    <hr className="secondary-hr" />
                    <p className="mb-1 restyle-core-color-bottomtext">{data}</p>
                </Fragment> : null}
            </ListGroupItem>
        </Fragment>
    );
}
const renderConvertedListingTypeValue = (type) => {
    console.log("listing type : ", type);

    switch (type) {
        case "buy-it-now-OR-best-offer":
            return (
                <Fragment>
                    <ListGroupItem className="list-group-item-action flex-column align-items-start custom-listgroup-item-outter">
                        <div className="d-flex w-100 justify-content-between">
                        <h6><p className="descriptive-chunk">Listing Purchase/Sell Type (Buy-it-now, best-offer, auction or combination of the previous)</p></h6><strong className="top-right-title">{"Listing Sale Type"}</strong>
                        </div>
                        <hr className="secondary-hr" />
                        <p className="mb-1 restyle-core-color-bottomtext">This is a <strong>"Buy-it-now"</strong> OR <strong>"Best-offer"</strong> listing</p>
                    </ListGroupItem>
                </Fragment>
            );
            break;
        case "auction-ONLY":
            return (
                <Fragment>
                    <ListGroupItem className="list-group-item-action flex-column align-items-start custom-listgroup-item-outter">
                        <div className="d-flex w-100 justify-content-between">
                        <h6><p className="descriptive-chunk">Listing Purchase/Sell Type (Buy-it-now, best-offer, auction or combination of the previous)</p></h6><strong className="top-right-title">{"Listing Sale Type"}</strong>
                        </div>
                        <hr className="secondary-hr" />
                        <p className="mb-1 restyle-core-color-bottomtext">This is a <strong>"Auction ONLY"</strong> listing</p>
                    </ListGroupItem>
                </Fragment>
            );
            break;
        case "auction-AND-buy-it-now":
            return (
                <Fragment>
                    <ListGroupItem className="list-group-item-action flex-column align-items-start custom-listgroup-item-outter">
                        <div className="d-flex w-100 justify-content-between">
                        <h6><p className="descriptive-chunk">Listing Purchase/Sell Type (Buy-it-now, best-offer, auction or combination of the previous)</p></h6><strong className="top-right-title">{"Listing Sale Type"}</strong>
                        </div>
                        <hr className="secondary-hr" />
                        <p className="mb-1 restyle-core-color-bottomtext">This is a <strong>"Buy-it-now"</strong> AND <strong>"Auction"</strong> listing</p>
                    </ListGroupItem>
                </Fragment>
            );
            break;
        case "buy-it-now-ONLY":
            return (
                <Fragment>
                    <ListGroupItem className="list-group-item-action flex-column align-items-start custom-listgroup-item-outter">
                        <div className="d-flex w-100 justify-content-between">
                        <h6><p className="descriptive-chunk">Listing Purchase/Sell Type (Buy-it-now, best-offer, auction or combination of the previous)</p></h6><strong className="top-right-title">{"Listing Sale Type"}</strong>
                        </div>
                        <hr className="secondary-hr" />
                        <p className="mb-1 restyle-core-color-bottomtext">This is a <strong>"Buy-it-now"</strong> ONLY listing</p>
                    </ListGroupItem>
                </Fragment>
            );
            break;
        default:
            break;
    }
}

export default {
    renderSupportDetails,
    ReactSlickSliderUploadedPublicFilesHelper,
    renderConvertedListingTypeValue,
    universalContentDisplayListGroupHelper
};