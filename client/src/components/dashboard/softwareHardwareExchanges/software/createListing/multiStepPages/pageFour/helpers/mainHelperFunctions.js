import React, { Fragment, useState, useEffect } from "react";
import Slider from "react-slick";
import FileViewer from 'react-file-viewer';
import "../styles.css";
import { ListGroup, Card, CardBody, ListGroupItem, CardHeader, Badge, Col, Row, Popover, PopoverBody, PopoverHeader, Button } from "reactstrap";
import moment from "moment";
import { Modal } from 'react-responsive-modal';
import ReactPlayer from 'react-player';
import Tour from 'reactour';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import ImageGallery from 'react-image-gallery';

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

    console.log("uploadedPublicFiles", uploadedPublicFiles);

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
            case "image/jpg":
                return "jpg";
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
    const renderApplicableImagesOrFiles = (file, filePathData) => {
        if ((file.type === "image/jpeg") || (file.type === "image/jpg") || (file.type === "image/png")) {
            return (
                <div className="centered-both-ways">
                    <img src={filePathData} className="image-in-view" />
                </div>
            );
        } else {
            return (
                <FileViewer
                    fileType={calculateFileType(file.type)}
                    filePath={filePathData}
                    onError={onError}
                    className={"file-viewer-component-slider"}
                    key={file.id}
                />
            );
        }
    }
    return (
        <Fragment>
            <Slider {...settings}>{/* "text-document" */}
                {ready === true ? activeFileArray.map((file, index) => {
                    const filePathData = `${process.env.REACT_APP_ASSET_LINK}/${file.link}`;
                    return (
                        <Fragment key={index}>
                            <div className="fileviewer-wrapper-slider">
                                {file.notSupported === true ? renderUnknownFileTypeCard(file) : renderApplicableImagesOrFiles(file, filePathData)}
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
const commentForReviewerHelper = (comment) => {
    return (
        <Fragment>
            <ListGroupItem style={{ height: "100%" }} className="list-group-item-action flex-column align-items-start custom-listgroup-item-outter">
                <div style={{ paddingBottom: "17.5px" }} className="d-flex w-100 justify-content-between">
                    <h6><p className="descriptive-chunk">Comment To Reviewer</p></h6><strong className="top-right-title">Reviewer Note(s)</strong>
                </div>
                <div className="d-flex w-100 justify-content-between textarea-container-wrapper">
                    <textarea rows={12} className="textarea-fixed" value={comment} />
                </div>
            </ListGroupItem>
        </Fragment>
    );
}
const videoDemoListingRenderHelper = (video) => {
    // prepare url for display runtime
    const url = `${process.env.REACT_APP_ASSET_LINK}/${video.link}`;
    // return video and related container counterparts
    return (
        <Col sm="12" md="6" lg="6" xl="6">
            <ListGroupItem className="list-group-item-action flex-column align-items-start custom-listgroup-item-outter">
                <div style={{ paddingBottom: "17.5px" }} className="d-flex w-100 justify-content-between">
                    <h6><p className="descriptive-chunk">Video Demo Preview</p></h6><strong className="top-right-title">Preview</strong>
                </div>
                <div className="d-flex w-100">
                    <ReactPlayer controls={true} playIcon={true} playing={false} loop={false} volume={1} width={"100%"} height={"100%"} className={"inner-img-thumbnail"} url={url} />
                </div>
            </ListGroupItem>
        </Col>
    );
}
const hashtagsRenderHelper = (hashtags) => {
    return (
        <ListGroupItem className="list-group-item-action flex-column align-items-start custom-listgroup-item-outter">
            <div style={{ paddingBottom: "17.5px" }} className="d-flex w-100 justify-content-between">
                <h6><p className="descriptive-chunk">Hashtags/Tags</p></h6><strong className="top-right-title">Relevant Tags</strong>
            </div>
            <div className="d-flex w-100 wrap-hashtags">
                {hashtags.map((tag, index) => {
                    return <Badge key={index} color={"primary"} className="hashtagsTagClass add-shadow">{tag.text}</Badge>;
                })}
            </div>
        </ListGroupItem>
    );
}
const RenderNoThumbnailProvided = ({ scrollToTourWrapper, stepOpen, setStepOpenState }) => {
    // state initializations
    const [ popoverOpen, setPopoverStatusOpenState ] = useState(false);
    // const [ stepOpen, setStepOpenState ] = useState(false);

    // helper functions
    const setPopoverOpenGuide = () => {
        setPopoverStatusOpenState(true);
    }
    const moveToDesiredButton = () => {
        scrollToTourWrapper.current.scrollIntoView();
        // alter slightly according to scroll behavior
        setTimeout(() => {
            window.scrollBy(0, -175);
        }, 300);
        // #navigate-to-redirect
        setTimeout(() => {
            setStepOpenState(true);
        }, 750)
    }
    const steps = [
        {
          selector: '#navigate-to-redirect',
          content: `You'd like to upload a video file to boost your possibly of a sale right?! Well, click this button to be redirected!`,
        }
    ]
    const disableBodyAndScroll = target => {
        disableBodyScroll(target);        
    };
    // enable body!
    const enableBody = target => clearAllBodyScrollLocks();
    return (
        <Col sm="12" md="6" lg="6" xl="6">
            <Tour
                steps={steps}
                isOpen={stepOpen}
                onAfterOpen={disableBodyAndScroll}
                onBeforeClose={enableBody}
                onRequestClose={() => {
                    setStepOpenState(false);
                }} 
            />
            <ListGroupItem className="list-group-item-action flex-column align-items-start custom-listgroup-item-outter">
                <div style={{ paddingBottom: "17.5px" }} className="d-flex w-100 justify-content-between">
                    <h6><p className="descriptive-chunk">Video Demo Preview</p></h6><strong className="top-right-title">Preview</strong>
                </div>
                <p>You have <strong>NOT</strong> uploaded a "Video Demo" for your software goods, if you mean't to actually upload an item - <a id={"popoverNoThumbnail"} onClick={setPopoverOpenGuide} style={{ color: "blue", fontWeight: "bold" }}>CLICK HERE</a>!</p>
                <Popover placement="top" isOpen={popoverOpen} target={"popoverNoThumbnail"} toggle={() => {
                    setPopoverStatusOpenState(false);
                }}>
                    <PopoverHeader>Want to boost your odds at a sale and upload a video?! <div className="popover-cancel-container" onClick={() => {
                        setPopoverStatusOpenState(false);
                    }}>
                        <img src={require("../../../../../../../../assets/icons/close-64.png")} className="small-close-popover-icon" /></div>
                    </PopoverHeader>
                    <PopoverBody>Have you decided on uploading a "Video Demo"? We <em style={{ color: "blue", textDecorationLine: "underline" }}>HIGHLY</em> recommend this specifically videos elaborately describing what's being sold and informs the user of what they're actually buying. Click the button below to be guided to the button to redirect to the appropriate page to upload a video!
                        <hr />
                        <Button style={{ marginTop: "7.5px", width: "100%" }} onClick={() => {
                            setPopoverStatusOpenState(false);

                            moveToDesiredButton();
                        }} className="btn-air-secondary" color="secondary" size="md">Show Me!</Button>
                    </PopoverBody>
                </Popover>
                <div className="natural-sm-spacer" />
                <div className="natural-sm-spacer" />
                <div className="d-flex w-100">
                    <img src={require("../../../../../../../../assets/images/banner/3.jpg")} style={{ padding: "22.5px" }} className="inner-img-thumbnail" />
                </div>
            </ListGroupItem>
        </Col>
    );
}
const ThumbnailListingRenderHelper = ({ thumbnailImage }) => {
    // state logic
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ file, setFile ] = useState(null);
    // prep image URL
    const url = `${process.env.REACT_APP_ASSET_LINK}/${thumbnailImage.link}`;
    // on image click helper
    const handleImageClick = () => {
        // open modal and display image
        setModalOpen(true);
    }
    return (
        <Col sm="12" md="6" lg="6" xl="6">
            <Modal classNames={{
                overlay: 'modalOverylayDisplayThumbnail',
                modal: 'customThumbnailModal',
            }} open={modalOpen} onClose={() => {
                setModalOpen(false);
            }} center>
                <div className="d-flex w-100 custom-modal-interior-div">
                    <div className="boxed-image-wrapper">
                        <img src={url} className="inner-img-thumbnail" />
                    </div>
                </div>
            </Modal>
            <ListGroupItem className="list-group-item-action flex-column align-items-start custom-listgroup-item-outter custom-listgroup-item-outter-thumbnail">
                <div style={{ paddingBottom: "17.5px" }} className="d-flex w-100 justify-content-between">
                    <h6><p className="descriptive-chunk">Thumbnail Image/Preview</p></h6><strong className="top-right-title">Preview</strong>
                </div>
                <p><strong>CLICK</strong> this image to enlarge and examine it. This is the <strong>FIRST</strong> picture people will see when scrolling for software for sale so make sure it's a quality and high-quality image!</p>
                <div className="natural-sm-spacer" />
                <div className="natural-sm-spacer" />
                <div className="d-flex w-100">
                    <div onClick={handleImageClick} className="boxed-image-wrapper">
                        <img src={url} className="inner-img-thumbnail" />
                    </div>
                </div>
            </ListGroupItem>
        </Col>
    );
}
const RenderScreenshotedUploadsHelper = ({ screenshotUploadImages }) => {
    return (
        <div id="gallery-container-slideshow">
            <ListGroupItem className="list-group-item-action flex-column align-items-start custom-listgroup-item-outter-screenshots">
                <div style={{ paddingBottom: "17.5px" }} className="d-flex w-100 justify-content-between">
                    <h6><p className="descriptive-chunk">Screenshot Gallery</p></h6><strong className="top-right-title">Screenshots</strong>
                </div>
                <div className="natural-sm-spacer" />
                <div className="natural-sm-spacer" />
                <div className="d-flex w-100 slideshow-wrap-wrapper">
                    <div className="gallery-wrapper-image">
                        <ImageGallery thumbnailPosition={"left"} className={"image-gallery-screenshots"} items={screenshotUploadImages} additionalClass={"inner-img-thumbnail-slider"} />
                    </div>
                </div>
            </ListGroupItem>
        </div>
    );
}
const renderConvertedListingTypeValue = (type) => {
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
    universalContentDisplayListGroupHelper,
    commentForReviewerHelper,
    hashtagsRenderHelper,
    ThumbnailListingRenderHelper,
    videoDemoListingRenderHelper,
    RenderNoThumbnailProvided,
    RenderScreenshotedUploadsHelper
};