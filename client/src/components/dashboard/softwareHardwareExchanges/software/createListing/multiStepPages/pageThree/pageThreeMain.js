import React, { useState, useRef, useEffect, Fragment } from 'react';
import "./styles.css";
import { connect } from "react-redux";
import { NotificationManager } from 'react-notifications';
import { saveSoftwareListingInfo } from "../../../../../../../redux/actions/hackers/createSoftwareListing/createNewSoftwareListingSale.js";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import helpers from "./helpers/mainFunctions.js";
import { Col, Button, Form, Label, Input, NavItem, NavLink, TabContent, TabPane, Nav, Card, CardHeader, CardBody, Media, Badge, Row, Popover, PopoverBody, PopoverHeader, Container, ListGroupItem, ListGroup } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { WithContext as ReactTags } from 'react-tag-input';
import Dropzone from 'react-dropzone-uploader';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';
import helperFunctions from "./helpers/slideUpPane/pane.js";
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import functionsHelperMain from "./helpers/reactHookFormHelpers/helpers.js";


const KeyCodes = {
    comma: 188,
    enter: [10, 13],
};
  
const delimiters = [...KeyCodes.enter, KeyCodes.comma];

// radio selection helpers
const radioSelectionPricingOptionsOne = functionsHelperMain().radioSelectionPricingOptionsOne;
const radioSelectionPricingOptionsTwo = functionsHelperMain().radioSelectionPricingOptionsTwo;
const radioSelectionPricingOptionsThree = functionsHelperMain().radioSelectionPricingOptionsThree;
const radioSelectionPricingOptionsFour = functionsHelperMain().radioSelectionPricingOptionsFour;

const { ConnectedSlideUpPaneAuctionPurchase, RenderConditionalBasedUponSellingType } = helperFunctions;

const PageThreeHelper = ({ saveSoftwareListingInfo, previouslySavedSoftwareData, userData }) => {
    // create redirect ability
    const history = useHistory();
    // create Refs...
    const listingTimespanGeneratedRef = useRef(null);
    const dropzoneVideoDemoRef = useRef(null);
    const dropzoneScreenshotsRef = useRef(null);
    const dropzoneRef = useRef(null);
    const mounted = useRef();
    const scrollToTourWrapper = useRef(null);
    // state creation...
    const [ selectors, setSelectorsState ] = useState(null);
    const [validateClass , setValidateClass] = useState(false);
    const [ reviewerPopoverStatus, setPopoverReviewerStatus ] = useState(false);
    const [ tags, setTagsState ] = useState([]);
    const [ suggestions, setSuggestionsState ] = useState(helpers.suggestionsPreselected);
    const [ activeTab, setActiveTab ] = useState('1');
    const [ activeTabUploadState, setActiveTabUploads ] = useState('1');
    const [fileReady, setFileReadyStatus] = useState(false);
    const [currentFileSelectedUpload, setCurrentUploadFileStatus] = useState(null);
    const [filePathData, setCurrentFilePathData] = useState(null);
    const [fileMetaData, setMetaFileData] = useState(null);
    const [ progress, setProgress ] = useState(0);
    const [ thumbnailImage, setThumbnailImageState ] = useState(null);
    const [ videoDemoFile, setVideoFileDemoState ] = useState(null);
    const [ screenshotUploadImages, setScreenshotUploadStatus ] = useState([]);
    const [ changeOptions, setChangeOptions ] = useState(null);
    const [ typeOfListing, setTypeOfListingState ] = useState(null);
    // create state to CHECK if submission (react-form-hook) was by pageThreeMain.js OR pane.js (nested component);
    const [ paneFileSubmissionRan, setPaneFileSubmissionRanState ] = useState(false);
    const [ isTourOpen, setIsTourOpenStatus ] = useState(false);
     
    const { register, handleSubmit, control, reset, getValues, setValue, setError, clearErrors, formState: { errors }} = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur"
    });

    // get form-redux values
    const gatheredValues = getValues();

    // imported helpers from mainFunctions.js file (deconstructed)
    const { handleDrag, handleDelete, renderPreviewOfFile, imageChangeAndConversion, renderThumbnailImage, renderVideoDemoPreview, RenderGallerySlideshowUploadedScreenshots, RenderOptionsRadioSelectsAuctionType } = helpers;

    // react state initialization goes here...
    const [ data, setData ] = useState({
        demoURL: ""
    });
    // const [validateClass , setValidateClass] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        clearErrors(name);
    
        setData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    
        return value;
    };
    const onSubmit = (data, e) => {
        // prevent reload
        e.preventDefault();

        if (data !== '') {
            // everything is properly filled out
            console.log("everything is completed/filled-out appropriatly");
            // ~ deconstruct filled out form details of MAIN form ~
            const { auctionPurchaseType, commentToReviewer, demoURL, hashtags, listingTimespan } = data;
            // ~ deconstruct selected redux pricing/auction purchase detail data AND ALL other related redux data from form (previously filled out pages too) ~
            const { auctionPriceRelatedData, category, codingLanguageContent, currentPage, description, listingTitle, supportExternalURL, supportItemCommentsSelector, uploadedPublicFiles } = previouslySavedSoftwareData;
            // save ALL details to new redux state to prep for 'review' next page

            const newDataObjCombinedStates = {
                auctionPriceRelatedData, 
                category, 
                codingLanguageContent, 
                currentPage, 
                description, 
                listingTitle, 
                supportProvidedExternalURL: _.has(previouslySavedSoftwareData, "supportExternalURL") ? true : false,
                supportExternalURL: _.has(previouslySavedSoftwareData, "supportExternalURL") ? supportExternalURL : undefined, 
                supportResponseTimespanData: (supportItemCommentsSelector.type === "no-support") ? "no-support-provided" : supportItemCommentsSelector, 
                uploadedPublicFiles,
                auctionPurchaseType, 
                commentToReviewer, 
                demoURL, 
                hashtags, 
                listingTimespan,
                currentPage: 4
            }

            // save new state
            saveSoftwareListingInfo(newDataObjCombinedStates);
            // end
        } else {
            errors.showMessages();
        }
    };
    // current filled out values - "gatheredValues"
    const onErrorMainForm = (errors, e, innerRun, tourTrue) => {
        if (innerRun === true) {
            // ~ this ONLY runs when the MAIN FUNCTION/FORM submits rather than the nested component ~
            setPaneFileSubmissionRanState(false);
        } else {
            // loop thru errors and clear appropriate FALSE CALLS... ~
            const valuesToClear = [];
            // interate for conditional check
            for (let key in errors) {
                const individual = errors[key];
                const name = individual.ref.name;
                // push values into array to clear after completion of loop.
                valuesToClear.push(name);
            }
            clearErrors(valuesToClear);
        }
    };
    const listingTimelineSelectClose = (data) => {

        const timespan = gatheredValues.listingTimespan;

        if ((typeof timespan !== "undefined") && (Object.keys(timespan).length > 0)) {
            clearErrors("listingTimespan");
        };
    }

    console.log("getValues(listingTimespan)", getValues());

    const CustomInputHelper = ({ accept, onFiles }) => {

        const text = "Drop a file OR select to browse local data";

        return (
            <label className="custom-input-dropzone-copy" style={{ backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', padding: 15, borderRadius: 3 }}>
                {text}
                <input
                    style={{ display: 'none' }}
                    type={"file"}
                    accept={accept}
                    multiple={false}
                    className={"custom-dropzone-input-actual-input"}
                    onChange={e => {
                        const file = e.target.files[0];
                        // set current file path to convert to readable URL later
                        setCurrentFilePathData(imageChangeAndConversion(file));
                        // set status update for current file
                        setCurrentUploadFileStatus(file);
                        // mark file as READY 
                        setFileReadyStatus(true);
                        // update "Dropzone" component state (NOT this react component state).
                        onFiles([file])
                    }}
                />
            </label>
        );
    }
    const handleFileUploadAnyType = (onSubmit, uploadType) => {
        // upload file to aws S3
        const data = new FormData();

        data.append("file", currentFileSelectedUpload);
        data.append("meta", fileMetaData);

        const config = {
            onUploadProgress: (progressEvent) => {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

                setProgress(percentCompleted);
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        axios.post(`${process.env.REACT_APP_BASE_URL}/upload/misc/file/softare/listing/sale`, data, config).then((res) => {
            if (res.data.message === "Successfully uploaded file!") {
                console.log(res.data);

                const { file } = res.data;

                switch (uploadType) {
                    case "previewDisplayImage":
                        setThumbnailImageState(file);
                        break;
                    case "videoDemoPreview":
                        setVideoFileDemoState(file);
                        break;
                    case "screenshotsUpload":
                        setScreenshotUploadStatus([...screenshotUploadImages, {
                            original: `${process.env.REACT_APP_ASSET_LINK}/${file.link}`,
                            thumbnail: `${process.env.REACT_APP_ASSET_LINK}/${file.link}`,
                        }]);
                        break;
                    default:
                        break;
                };

                NotificationManager.success(`We've successfully uploaded your file! Please proceed filling out the remaining form data in order to move onto the final page!`, 'Successfully uploaded file!', 4500);

                setMetaFileData(null);
                setFileReadyStatus(false);
                setCurrentUploadFileStatus(null);

                onSubmit();
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const renderCustomButtonDropzone = (data, e, uploadType) => {

        const { meta } = data.files[0];

        switch (uploadType) {
            case "previewImageMainDisplayUpload":
                if (currentFileSelectedUpload === null) {
                    return null;
                } else {
                    if (fileReady === true) {
                        return (
                            <Fragment>
                                <Button style={{ marginTop: "25px" }} onClick={(e) => {
                                    e.preventDefault();
                                    // file meta data for next action
                                    setMetaFileData(meta);
                                    // set file status as ready or prepared.
                                    setFileReadyStatus(false);
            
                                    const runSubmit = data.onSubmit;
            
                                    handleFileUploadAnyType(runSubmit, "previewDisplayImage");
                                }} className="btn-air-secondary" color="secondary" size="md">Submit & Upload Preview/Main-display Image!</Button>
                            </Fragment>
                        );
                    } else {
                        return (
                            <Fragment>
                                <Button style={{ marginTop: "25px" }} onClick={() => {
                                    NotificationManager.warning(`File is NOT ready to upload yet! Please wait for the preparation steps to complete before submitting.`, 'Still preparing!', 4500);
                                }} className="btn-air-light" color="light" size="md">Submit & Upload Preview/Main-display Image!</Button>
                            </Fragment>
                        );
                    }
                }
                break;
            case "videoDemoUpload":
                if (currentFileSelectedUpload === null) {
                    return null;
                } else {
                    if (fileReady === true) {
                        return (
                            <Fragment>
                                <Button style={{ marginTop: "25px" }} onClick={(e) => {
                                    e.preventDefault();
                                    // file meta data for next action
                                    setMetaFileData(meta);
                                    // set file status as ready or prepared.
                                    setFileReadyStatus(false);
            
                                    const runSubmit = data.onSubmit;
            
                                    handleFileUploadAnyType(runSubmit, "videoDemoPreview");
                                }} className="btn-air-secondary" color="secondary" size="md">Submit & Upload Video Preview!</Button>
                            </Fragment>
                        );
                    } else {
                        return (
                            <Fragment>
                                <Button style={{ marginTop: "25px" }} onClick={() => {
                                    NotificationManager.warning(`File is NOT ready to upload yet! Please wait for the preparation steps to complete before submitting.`, 'Still preparing!', 4500);
                                }} className="btn-air-light" color="light" size="md">Submit & Upload Video Preview!</Button>
                            </Fragment>
                        );
                    }
                }
                break;
            case "screenshotsUpload":
                if (currentFileSelectedUpload === null) {
                    return null;
                } else {
                    if (fileReady === true) {
                        return (
                            <Fragment>
                                <Button style={{ marginTop: "25px" }} onClick={(e) => {
                                    e.preventDefault();
                                    // file meta data for next action
                                    setMetaFileData(meta);
                                    // set file status as ready or prepared.
                                    setFileReadyStatus(false);
            
                                    const runSubmit = data.onSubmit;
            
                                    handleFileUploadAnyType(runSubmit, "screenshotsUpload");
                                }} className="btn-air-secondary" color="secondary" size="md">Submit & Upload Preview/Snapshot Images!</Button>
                            </Fragment>
                        );
                    } else {
                        return (
                            <Fragment>
                                <Button style={{ marginTop: "25px" }} onClick={() => {
                                    NotificationManager.warning(`File is NOT ready to upload yet! Please wait for the preparation steps to complete before submitting.`, 'Still preparing!', 4500);
                                }} className="btn-air-light" color="light" size="md">Submit & Upload Preview/Snapshot Images!</Button>
                            </Fragment>
                        );
                    }
                }
                break;
            default:
                break;
        }
    }
    const onSubmitHelper = (files, allFiles) => {
        allFiles.forEach((file, index) => {
            file.remove();

            if ((allFiles.length - 1) === index) {
                // setFileReadyStatus(true);
                setCurrentUploadFileStatus(null);
            }
        })
    }
    const changePageUploadTabs = (page) => {
        setChangeOptions(null);

        setActiveTabUploads(page);
    }

    useEffect(() => {
        console.log("updated or ran.");

        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            // check for mount
            console.log("component mounted.");
        } else {
            // do componentDidUpdate logic - check for re-mount
            console.log("component did update!!");
        }
        // console.log("custom", custom);
    });

    const watchRadioListingFormatChangeEvent = (type) => {
        // OPTIONS/VALUES that will be returned ---------- "buy-it-now-ONLY", "auction-ONLY", "auction-AND-buy-it-now", "buy-it-now-OR-best-offer"
        setTypeOfListingState(type);

        setValue("auctionPurchaseType", type, { shouldValidate: true });
    }

    //  TOUR related LOCK SCREEN functions - DISABLE body scrolling
    const disableBodyAndScroll = target => {

        // scrollToTourWrapper.current.scrollIntoView();
        disableBodyScroll(target);        
        // setTimeout(() => {
        //     disableBodyScroll(target);
        // }, 1000)
    };
    // enable body!
    const enableBody = target => clearAllBodyScrollLocks();
    // TOUR related variable
    const steps = [
        {
            selector: '#tour-wrapper',
            content: 'Please select an option to switch listing payment type(s) in order to change your current settings or select your initial setting...'
        }
    ];

    return (
        <div>
            <LoadingBar
                color='#51bb25'
                height={4.25}
                progress={progress}
                onLoaderFinished={() => {
                    setProgress(0);
                }}
            />
            <Container className="full-height-container" fluid={true}>
                <Form className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit, (errors, e) => {
                    return onErrorMainForm(errors, e, paneFileSubmissionRan);
                })}>
                    <Row>
                        <Col sm="12" md="6" lg="6" xl="6">
                            <Label>Demo URL (<strong style={{ color: "red", textDecorationLine: "underline" }}>optional</strong> - if you want to display working code at an external URL)</Label>
                            <input {...register("demoURL", { required: false, minLength: {
                                value: 8,
                                message: "You must enter AT Least 8 characters"
                            }, maxLength: {
                                value: 75,
                                message: "You may ONLY enter 75 characters or less"
                            }, onBlur: (e) => {
                                // check if valid url in helper file.
                                const validOrNot = helpers.CalculateWhetherURLIsLegit(e.target.value);
                                // extracted final value from input
                                const value = e.target.value;

                                if (validOrNot === true) {
                                    setValue('demoURL', value, { shouldValidate: false });
                                    // clear error after setting proper change state
                                    clearErrors("demoURL");
                                } else {
                                    setTimeout(() => {
                                        if (!errors.demoURL) {
                                            setError("demoURL", {
                                                type: "manual",
                                                message: "You MUST enter a VALID URL including http/https and ://",
                                            });
                                        }
                                    }, 75)
                                }
                            }})} className="form-control" name="demoURL" type="text" placeholder="Listing title" onChange={handleInputChange} value={data.demoURL} />
                            {errors.demoURL ? <span className="span-tooltip">{errors.demoURL.message}</span> : null}
                            <div className="valid-feedback">{"Looks good!"}</div>
                        </Col>
                        <Col className="input-surrounding-col" sm="12" md="6" lg="6" xl="6">
                            <Label>Select how long you would like your listing to run for (length of <em style={{ color: "blue" }}>both</em> "buy-it-now" & "actions")</Label>
                            <Controller
                                control={control}
                                name="listingTimespan"
                                {...register("listingTimespan", { required: {
                                    value: true,
                                    message: "You must select a value before proceeding"
                                }, onBlur: (e) => {

                                    console.log("onBlur...!", e);

                                    const value = e.target.value;

                                    setTimeout(() => {
                                        // clear error after proper selection
                                        if ((typeof value !== "undefined") && (Object.keys(value).length > 0)) {
                                            clearErrors("listingTimespan");
                                        } else {
                                            // set error as nothing was selected (blank 'click-off' selection of selector)
                                            setError("listingTimespan", {
                                                type: "manual",
                                                message: "You haven't selected a 'timespan' & a selection is required before proceeding",
                                            });
                                        }
                                    }, 50);
                                }})}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        ref={listingTimespanGeneratedRef}
                                        autoBlur={true}
                                        defaultValue={null}
                                        onMenuClose={listingTimelineSelectClose}
                                        value={gatheredValues.listingTimespan}
                                        onChange={(selectedOption) => {
                                            // run conditionals
                                            if (typeof gatheredValues.listingTimespan === "undefined") {
                                                setValue('listingTimespan', selectedOption, { shouldValidate: false });
                                            } else {
                                                clearErrors("listingTimespan");
                                            }

                                            listingTimespanGeneratedRef.current.blur();
                                        }}
                                        options={helpers.listingTimespanOptions}
                                    />
                                )}
                            />
                            {errors.listingTimespan ? <span className="span-tooltip">{errors.listingTimespan.message}</span> : null}
                            <div className="valid-feedback">{"Looks good!"}</div>
                        </Col>
                    </Row>
                    <Row style={{ paddingTop: "25px" }}>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <Label>Enter relevant tags/hashtags (people will use these tags when searching for specific/condensed results) - <strong style={{ color: "blue" }}>5(MIN) - 15(MAX) Tags</strong></Label>
                            <ListGroup>
                            <Controller
                                control={control}
                                name="hashtags"
                                {...register("hashtags", { required: {
                                    value: true,
                                    message: "You MUST enter AT least 5 (five) tags up to a maximum of 15 (fifteen) tags"
                                }})}
                                render={({ field }) => (
                                    <ReactTags 
                                        {...field}
                                        tags={gatheredValues.hashtags}
                                        name={"hashtags"}
                                        suggestions={suggestions}
                                        classNames={{
                                            tags: 'hashtagsTagsClass',
                                            tagInput: 'hashtagsTagInputClass',
                                            tagInputField: 'hashtagsTagInputFieldClass',
                                            selected: 'hashtagsSelectedClass',
                                            tag: 'hashtagsTagClass badge badge-primary',
                                            remove: 'hashtagsRemoveClass',
                                            suggestions: 'hashtagsSuggestionsClass',
                                            activeSuggestion: 'hashtagsActiveSuggestionClass'
                                        }}
                                        handleDelete={(index) => {
                                            setValue('hashtags', handleDelete(index, gatheredValues.hashtags), { shouldValidate: true });
                                        }}
                                        renderSuggestion={(suggestion) => {
                                            // return list item(s)
                                            return (
                                                <ListGroupItem className="custom-suggestion-groupitem" key={suggestion.index} onClick={() => {
                                                    // run conditional checks
                                                    if (typeof gatheredValues.hashtags !== "undefined") {
                                                        if (gatheredValues.hashtags.length < 15) {
                                                            if (gatheredValues.hashtags.length > 0) {
                                                                setValue('hashtags', [...gatheredValues.hashtags, suggestion], { shouldValidate: true });
                                                            } else {
                                                                setValue('hashtags', [suggestion], { shouldValidate: true });
                                                            }
                                                        } else {
                                                            NotificationManager.warning('You have entered TOO many hashtags & we cannot add your current tag until some are removed.', "Too many hashtags!", 4250);
                                                        }
                                                    } else {
                                                        setValue('hashtags', [suggestion], { shouldValidate: true });
                                                    }
                                                }}>{suggestion.text}</ListGroupItem>
                                            );
                                        }}
                                        readOnly={false}
                                        placeholder={"Enter a tag (these are how people search & find your listing)"}
                                        maxLength={15}
                                        handleAddition={(tag) => {
                                            if (typeof gatheredValues.hashtags !== "undefined") {
                                                if (gatheredValues.hashtags.length < 15) {
                                                    if (gatheredValues.hashtags.length > 0) {
                                                        setValue('hashtags', [...gatheredValues.hashtags, tag], { shouldValidate: true });
                                                    } else {
                                                        setValue('hashtags', [tag], { shouldValidate: true });
                                                    }
                                                } else {
                                                    NotificationManager.warning('You have entered TOO many hashtags & we cannot add your current tag until some are removed.', "Too many hashtags!", 4500);
                                                }
                                            } else {
                                                setValue('hashtags', [tag], { shouldValidate: true });
                                            }
                                        }}
                                        handleDrag={(tag, currPos, newPos) => {
                                            setValue('hashtags', handleDrag(tag, currPos, newPos, gatheredValues.hashtags), { shouldValidate: true });
                                        }}
                                        delimiters={delimiters} 
                                    />
                                    
                                )}
                            />
                            </ListGroup>
                            {errors.hashtags ? <span className="span-tooltip">{errors.hashtags.message}</span> : null}
                            <div className="valid-feedback">{"Looks good!"}</div>
                        </Col>
                    </Row>
                    <Tour
                        steps={steps}
                        isOpen={isTourOpen}
                        onAfterOpen={disableBodyAndScroll}
                        onBeforeClose={enableBody}
                        onRequestClose={() => {
                            setIsTourOpenStatus(false);
                        }} 
                    />
                    <RenderOptionsRadioSelectsAuctionType clearErrors={clearErrors} control={control} setError={setError} register={register} radioSelectionPricingOptionsOne={radioSelectionPricingOptionsOne} radioSelectionPricingOptionsTwo={radioSelectionPricingOptionsTwo} radioSelectionPricingOptionsThree={radioSelectionPricingOptionsThree} radioSelectionPricingOptionsFour={radioSelectionPricingOptionsFour} errors={errors} scrollToTourWrapper={scrollToTourWrapper} selected={typeOfListing} onRadioChange={watchRadioListingFormatChangeEvent} />
                    {/* bid, buyitnow, best offer, etc... goes here */}
                    {typeOfListing !== null ? <ConnectedSlideUpPaneAuctionPurchase clearAllBodyScrollLocks={clearAllBodyScrollLocks} typeOfListing={typeOfListing} scrollToTourWrapper={scrollToTourWrapper} setIsTourOpenStatus={setIsTourOpenStatus} selected={typeOfListing} /> : null}
                    {/* bid, buyitnow, best offer, etc... goes here */}
                    <hr className="secondary-hr" />
                    <Row style={{ marginTop: "45px" }}>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <h5>Leave a comment for our reviewer's (steps, instructions, etc...)</h5>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "17.5px", marginBottom: "17.5px" }}>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <Card>
                                <CardBody>
                                    <Label>Leave a comment for "{process.env.REACT_APP_APPLICATION_NAME}" <strong onClick={() => {
                                        setPopoverReviewerStatus(true);
                                    }} id={"PopoverReviewersInfo"} style={{ color: "red", textDecorationLine: "underline" }}>reviewers</strong></Label>
                                    <Popover
                                        className="make-popover-interactive"
                                        placement="bottom" isOpen={reviewerPopoverStatus} target="PopoverReviewersInfo" toggle={() => {
                                            setPopoverReviewerStatus(!reviewerPopoverStatus);
                                        }}
                                    >
                                        <PopoverHeader>What is a "Reviewer"? <div className="popover-cancel-container" onClick={() => {
                                            setPopoverReviewerStatus(false);
                                        }}><img src={require("../../../../../../../assets/icons/close-64.png")} className="small-close-popover-icon" /></div></PopoverHeader>
                                        <PopoverBody><h6 style={{ color: "blue", textDecorationLine: "underline" }}>What is a reviewer you may ask?</h6><hr />Reviewers are employee's of {process.env.REACT_APP_APPLICATION_NAME}'s platform that personally review each submission of an "item-for-sale" before posting it publically for safety reasons. This typically takes anywhere from 1-3 days but you will be notified upon the completion of a final decision.
                                        </PopoverBody>
                                    </Popover>
                                    <textarea rows={8} {...register("commentToReviewer", { required: {
                                        value: true,
                                        message: "You MUST enter AT least 50 characters with a maximum of 1450 characters"
                                    }, minLength: {
                                        value: 50,
                                        message: "You must enter AT Least 50 characters"
                                    }, maxLength: {
                                        value: 1450,
                                        message: "You may ONLY enter 1450 characters or less"
                                    }, onBlur: (e) => {
                                        // check whether valid on click-off/blur
                                        console.log("blurred.");
                                    }})} className="form-control" name="commentToReviewer" type="textarea" placeholder="Leave a comment for our reviewers" onChange={handleInputChange} value={data.commentToReviewer} />
                                    {errors.commentToReviewer ? <span className="span-tooltip">{errors.commentToReviewer.message}</span> : null}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row id="upload-row-custom" style={{ marginTop: "45px" }}>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <Card className="card-absolute">
                                <CardHeader className="bg-primary outsider-header-card-custom-upload">
                                    <h5 className="subheader-tabbed-card">Upload/Manage various uploads via this tabbed form</h5>
                                </CardHeader>
                                <CardBody className="tabbed-card custom-tabbed-card-form">
                                    <Nav  className="nav-pills nav-secondary">
                                        <NavItem>
                                            <NavLink className={activeTabUploadState === '1' ? 'active' : ''} onClick={() => changePageUploadTabs("1")}>
                                                <i className="icofont icofont-ui-home"></i>Thumbnail/Display Image
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className={activeTabUploadState === '2' ? 'active' : ''} onClick={() => changePageUploadTabs("2")}>
                                                <i className="icofont icofont-man-in-glasses"></i>Video Demo Preview (Optional)
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className={activeTabUploadState === '3' ? 'active' : ''} onClick={() => changePageUploadTabs("3")}>
                                                <i className="icofont icofont-contacts"></i>Screenshots/Demonstration Images
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={activeTabUploadState}>
                                        <TabPane className="tabpane-custom-maxed" tabId="1">
                                            <Card className="redesign-custom-tab-card-upload-content">
                                                <CardHeader className="b-l-primary border-3 add-custom-card-border-tabbed">
                                                    <h3>Upload a thumbnail/display image (this will be the first image user's see - on homepage list view for ex.)</h3>
                                                </CardHeader>
                                                <CardBody id="cardbody-dropzone-one">
                                                    <Label style={{ marginBottom: "15px" }}>You can preview your "Thumbnail" below after successfully uploading an image that will be displayed via our "listing homepage view" when user's are searching for various software code to purchase (main page - general display area)</Label>
                                                    <div className="dz-message needsclick">
                                                        <Dropzone
                                                            ref={dropzoneRef}
                                                            PreviewComponent={(data) => {
                                                                return renderPreviewOfFile(data, filePathData, fileReady);
                                                            }}
                                                            maxFiles={1}
                                                            onChangeStatus={(functions) => {
                                                                setChangeOptions(functions);
                                                            }}
                                                            autoUpload={true}
                                                            submitButtonDisabled={false}
                                                            InputComponent={CustomInputHelper}
                                                            onSubmit={onSubmitHelper}
                                                            SubmitButtonComponent={(data, e) => {
                                                                return (
                                                                    <div className="absolutely-position-submit-btn">
                                                                        {renderCustomButtonDropzone(data, e, "previewImageMainDisplayUpload")}
                                                                    </div>
                                                                );
                                                            }}
                                                            accept={"image/*"}
                                                            multiple={false}
                                                            canCancel={false}
                                                            styles={{
                                                                dropzone: { height: 275 },
                                                                dropzoneActive: { borderColor: 'green' },
                                                            }}
                                                        />
                                                    </div>
                                                    {fileReady === true ? <Fragment>
                                                        <hr className="secondary-hr" />
                                                        <div className="centered-both-ways">
                                                            <Button style={{ marginTop: "25px" }} onClick={(e) => {
                                                                setMetaFileData(null);
                                                                setFileReadyStatus(false);
                                                                setCurrentUploadFileStatus(null);

                                                                changeOptions.remove();
                                                            }} className="btn-air-danger cancel-button-upload" color="danger" size="md">Cancel Current/Pending Upload</Button>
                                                        </div>
                                                    </Fragment> : null}
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                        <TabPane className="tabpane-custom-maxed" tabId="2">
                                            <Card className="redesign-custom-tab-card-upload-content">
                                                <CardHeader className="b-l-primary border-3 add-custom-card-border-tabbed">
                                                    <h3>Upload a video demonstration/demo breifly giving an overview of the functionality of your code/software that is being sold (this is <strong style={{ color: "blue", textDecorationLine: "underline" }}>optional</strong> however it greatly boosts sales & sale liklihood)</h3>
                                                </CardHeader>
                                                <CardBody id="cardbody-dropzone-one">
                                                    <Label style={{ marginBottom: "15px" }}>You can preview your "Video Demo" below after successfully uploading an <strong>accepted</strong> video that will be displayed when people visit your listing (after interacting/clicking your listing). This video should accurately depict what is included when purchasing your software/code.</Label>
                                                    <div className="dz-message needsclick">
                                                        <Dropzone
                                                            ref={dropzoneVideoDemoRef}
                                                            PreviewComponent={(data) => {
                                                                return renderPreviewOfFile(data, filePathData, fileReady);
                                                            }}
                                                            maxFiles={1}
                                                            autoUpload={true}
                                                            onChangeStatus={(functions) => {
                                                                setChangeOptions(functions);
                                                            }}
                                                            submitButtonDisabled={false}
                                                            InputComponent={CustomInputHelper}
                                                            onSubmit={onSubmitHelper}
                                                            SubmitButtonComponent={(data, e) => {
                                                                return (
                                                                    <div className="absolutely-position-submit-btn">
                                                                        {renderCustomButtonDropzone(data, e, "videoDemoUpload")}
                                                                    </div>
                                                                );
                                                            }}
                                                            accept={"video/*"}
                                                            multiple={false}
                                                            canCancel={false}
                                                            styles={{
                                                                dropzone: { height: 275 },
                                                                dropzoneActive: { borderColor: 'green' },
                                                            }}
                                                        />
                                                    </div>
                                                    {fileReady === true ? <Fragment>
                                                        <hr className="secondary-hr" />
                                                        <div className="centered-both-ways">
                                                            <Button style={{ marginTop: "25px" }} onClick={(e) => {
                                                                setMetaFileData(null);
                                                                setFileReadyStatus(false);
                                                                setCurrentUploadFileStatus(null);

                                                                changeOptions.remove();
                                                            }} className="btn-air-danger cancel-button-upload" color="danger" size="md">Cancel Current/Pending Upload</Button>
                                                        </div>
                                                    </Fragment> : null}
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                        <TabPane className="tabpane-custom-maxed" tabId="3">
                                            <Card className="redesign-custom-tab-card-upload-content">
                                                <CardHeader className="b-l-primary border-3 add-custom-card-border-tabbed">
                                                    <h3>Upload any <strong style={{ color: "blue", textDecorationLine: "underline" }}>accurate</strong> images/screenshots depicting what will be bought when a user decides to purchase your listing's contents - you may upload up-to 10 supporting screenshots/images describing what is being sold.</h3>
                                                </CardHeader>
                                                <CardBody id="cardbody-dropzone-one">
                                                    <Label style={{ marginBottom: "15px" }}>You can preview your "Demonstration/Demo Screenshots" below after successfully uploading an images. These should accurately depict and give user's on {process.env.REACT_APP_APPLICATION_NAME}'s platform a good/exceptional idea of what they will be purchasing in this listing.</Label>
                                                    <div className="dz-message needsclick">
                                                        <Dropzone
                                                            ref={dropzoneScreenshotsRef}
                                                            PreviewComponent={(data) => {
                                                                return renderPreviewOfFile(data, filePathData, fileReady);
                                                            }}
                                                            maxFiles={1}
                                                            autoUpload={true} 
                                                            onChangeStatus={(functions) => {
                                                                setChangeOptions(functions);
                                                            }}
                                                            submitButtonDisabled={false}
                                                            InputComponent={CustomInputHelper}
                                                            onSubmit={onSubmitHelper}
                                                            SubmitButtonComponent={(data, e) => {
                                                                return (
                                                                    <div className="absolutely-position-submit-btn">
                                                                        {renderCustomButtonDropzone(data, e, "screenshotsUpload")}
                                                                    </div>
                                                                );
                                                            }}
                                                            accept={"image/*"}
                                                            multiple={false}
                                                            canCancel={false}
                                                            styles={{
                                                                dropzone: { height: 275 },
                                                                dropzoneActive: { borderColor: 'green' },
                                                            }}
                                                        />
                                                    </div>
                                                    {fileReady === true ? <Fragment>
                                                        <hr className="secondary-hr" />
                                                        <div className="centered-both-ways">
                                                            <Button style={{ marginTop: "25px" }} onClick={(e) => {
                                                                setMetaFileData(null);
                                                                setFileReadyStatus(false);
                                                                setCurrentUploadFileStatus(null);

                                                                changeOptions.remove();
                                                            }} className="btn-air-danger cancel-button-upload" color="danger" size="md">Cancel Current/Pending Upload</Button>
                                                        </div>
                                                    </Fragment> : null}
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <div className="mobile-adjustment-upload-related">
                        <hr style={{ marginBottom: "25px" }} />
                    </div>
                    <Row id="upload-row-custom">
                        <Col sm="12" md="12" lg="12" xl="12">
                            <Card className="card-absolute">
                                <CardHeader className="bg-primary">
                                    <h5 className="subheader-tabbed-card">Please upload a "Thumbnail" image</h5>
                                </CardHeader>
                                <CardBody className="tabbed-card custom-tabbed-card-form">
                                    <Nav  className="nav-pills nav-secondary">
                                        <NavItem>
                                            <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                                                <i className="icofont icofont-ui-home"></i>Uploaded Thumbnail Content Preview
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                                                <i className="icofont icofont-man-in-glasses"></i>Video Demo Preview (Optional)
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
                                                <i className="icofont icofont-contacts"></i>Screenshots/Demonstration Images
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={activeTab}>
                                        <TabPane className="tabpane-custom-maxed" tabId="1">
                                            <Card className="redesign-custom-tab-card">
                                                <CardHeader className="b-l-primary border-3 add-custom-card-border-tabbed">
                                                    <h3>Manage/View your uploaded content below - Select & manage what you want to upload above!</h3>
                                                </CardHeader>
                                                <CardBody id="cardbody-dropzone-one">
                                                    <div className="centered-both-ways">
                                                        {renderThumbnailImage(thumbnailImage)}
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                        <TabPane className="tabpane-custom-maxed" tabId="2">
                                            <Card className="redesign-custom-tab-card">
                                                <CardHeader className="b-l-primary border-3 add-custom-card-border-tabbed">
                                                    <h5>Manage/View your uploaded content below - Select & manage what you want to upload above!</h5>
                                                </CardHeader>
                                                <CardBody id="cardbody-dropzone-one">
                                                    <div className="centered-both-ways">
                                                        {renderVideoDemoPreview(videoDemoFile)}
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                        <TabPane className="tabpane-custom-maxed" tabId="3">
                                            <Card className="redesign-custom-tab-card">
                                                <CardHeader className="b-l-primary border-3 add-custom-card-border-tabbed">
                                                    <h5>Manage/View your uploaded content below - Select & manage what you want to upload above!</h5>
                                                </CardHeader>
                                                <CardBody id="cardbody-dropzone-one">
                                                    {RenderGallerySlideshowUploadedScreenshots(screenshotUploadImages)}
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <hr />
                    <Row style={{ marginTop: "45px" }}>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <Button color="secondary" style={{ width: "100%" }} type="submit" onClick={() => {
                                setPaneFileSubmissionRanState(true);
                            }}>~ Submit form details and proceed to next page ~</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data,
        previouslySavedSoftwareData: state.softwareListingSale.softwareListingSaleInfo
    }
}
export default connect(mapStateToProps, { saveSoftwareListingInfo })(PageThreeHelper);
