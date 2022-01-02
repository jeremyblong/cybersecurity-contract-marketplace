import React, { useState, useEffect, useRef, Fragment } from 'react';
import "./styles.css";
import { Container, Row, Col, Card, CardHeader, CardBody, Form, Label, Button, Popover, PopoverBody, PopoverHeader, ButtonGroup } from 'reactstrap'
import Dropzone from 'react-dropzone-uploader';
import axios from "axios";
import { connect } from "react-redux";
import { NotificationManager } from 'react-notifications';
import LoadingBar from 'react-top-loading-bar';
import { saveSoftwareListingInfo } from "../../../../../../../redux/actions/hackers/createSoftwareListing/createNewSoftwareListingSale.js";
import _ from "lodash";
import { Modal } from 'react-responsive-modal';
import FileViewer from 'react-file-viewer';
import { confirmAlert } from 'react-confirm-alert';

const PageTwoMainHelper = ({ userData, saveSoftwareListingInfo, previouslySavedSoftwareData }) => {
    // refs & such
    const dropzoneRef = useRef(null);
    // start of state logic...
    const [progress, setProgress] = useState(0);
    const [fileModalOpen, setFileModalOpenStatus] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileTwo, setSelectedFileTwo] = useState(null);
    const [fileReady, setFileReadyStatus] = useState(false);
    const [currentFileSelectedUpload, setCurrentUploadFileStatus] = useState(null);
    const [filePathData, setCurrentFilePathData] = useState(null);
    const [fileMetaData, setMetaFileData] = useState(null);
    const [popoverOpen, setPopoverState] = useState(false);
    const [ fileAtPopoverInteraction, setFileAtPopoverInteractionState ] = useState(null);
    const [ popoverOne, setPopoverOneState ] = useState(false);
    const [ popoverTwo, setPopoverTwoState ] = useState(false);
    const [ popoverThree, setPopoverThreeState ] = useState(false);
    const [ changeOptions, setChangeOptions ] = useState(null);
    // popover main logic (after clicking button - create state for each iteration/item);
    const [ popoverGeneralStatus, setPopoverGeneralStatus ] = useState({
        popover0: false,
        popover1: false,
        popover2: false,
        popover3: false,
        popover4: false,
        popover5: false,
        popover6: false,
        popover7: false,
        popover8: false,
        popover9: false
    })

    const CustomInputHelper = ({ accept, onFiles }) => {

        const text = "Drop a file OR select to browse local data";

        return (
            <label className="custom-input-dropzone-copy" style={{ backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', padding: 15, borderRadius: 3 }}>
                {text}
                <input
                    style={{ display: 'none' }}
                    type="file"
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
    const handleSubmit = (runSubmit) => {

        console.log("submitted!", currentFileSelectedUpload, fileMetaData);

        if ((!_.has(previouslySavedSoftwareData, "uploadedPublicFiles")) || (previouslySavedSoftwareData.uploadedPublicFiles.length <= 10)) {
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

                    saveSoftwareListingInfo({
                        ...previouslySavedSoftwareData,
                        uploadedPublicFiles: _.has(previouslySavedSoftwareData, "uploadedPublicFiles") ? [...previouslySavedSoftwareData.uploadedPublicFiles, file] : [file]
                    })

                    NotificationManager.success(`We've successfully uploaded your file! Please proceed filling out your information or add more files.`, 'Successfully uploaded file!', 4500);

                    setMetaFileData(null);
                    setFileReadyStatus(false);
                    setCurrentUploadFileStatus(null);

                    runSubmit();
                } else {
                    console.log("Err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            // here!
            NotificationManager.error(`You're only allowed to upload 10 (TEN) files TOTAL. If you'd like to upload different files - remove/delete a previously uploaded file.`, "Too many uploads!", 4500);
        }
    };
    useEffect(() => {
        // probably end up putting something here?
        console.log("re-rendered.");
    }, [])
    const renderColor = (i) => {
        switch (i) {
            case 1:
                return "txt-success";
                break;
            case 2:
                return "txt-info";
                break;
            case 3:
                return "txt-danger";
                break;
            case 4:
                return "txt-warning";
                break;
            case 5:
                return "txt-dark";
                break;
            case 6:
                return "txt-primary";
                break;
            case 7:
                return "txt-secondary";
                break;
            case 8:
                return "txt-pink";
                break;
            case 9:
                return "txt-grey";
                break;
            case 10:
                return "txt-success";
                break;
            default:
                return "txt-warning";
                break;
        }
    }
    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    const deleteCurrentlySelectedTwoFile = (index) => {
        console.log("deleteCurrentlySelectedTwoFile ran!");
        // remove file from redux state array
        const removedFileArray = previouslySavedSoftwareData.uploadedPublicFiles.filter((item, i) => {
            if (selectedFileTwo.id !== item.id) {
                return true;
            }
        });
        // change redux state
        saveSoftwareListingInfo({
            ...previouslySavedSoftwareData,
            uploadedPublicFiles: removedFileArray
        });

        // // close popover
        calculatePopoverStateToChange(index, null, true);
        // set selected file popover state back to *default* === null
        setSelectedFileTwo(null);
    }
    const calculatePopoverOpenWhich = (index) => {
        switch (index) {
            case 0:
                return popoverOne;
                break;
            case 1: 
                return popoverTwo;
                break;
            case 2:
                return popoverThree;
                break;
            default:
                break;
        }
    }
    const calculatePopoverStateToChange = (index, bool, reverse) => {
        if (reverse === true) {
            switch (index) {
                case 0:
                    setPopoverOneState(!popoverOne);
                    break;
                case 1: 
                    setPopoverTwoState(!popoverTwo);
                    break;
                case 2:
                    setPopoverThreeState(!popoverThree);
                    break;
                default:
                    break;
            }
        } else {
            switch (index) {
                case 0:
                    setPopoverOneState(bool);
                    break;
                case 1: 
                    setPopoverTwoState(bool);
                    break;
                case 2:
                    setPopoverThreeState(bool);
                    break;
                default:
                    break;
            }
        }
    }
    const renderConditionalUponFileUploads = () => {
        return (
            <Row>
                <Col sm="12" md="12" lg="12" xl="12">
                    <div className="file-content">
                        <Card>
                            <CardBody className="file-manager">
                                <Label>If you'd like to view your previously uploaded files (uploaded yet NOT public <em style={{ color: "red" }}>yet</em>) can be viewed below however we will only show the first three (3) files in the preview region. If you'd like to view the rest of your uploaded files, click the <strong style={{ color: "blue" }}>"View All/Other Uploaded File's"</strong> button to view all of your uploaded content.</Label>

                                <h4 className="mb-3">Uploaded File(s) & Content</h4>
                                <h6>These are your "Completed & already uploaded" files <em>however</em> they will only be permanently saved upon completion and posting of this listing as a whole.</h6>
                                <ul className="files">
                                    {previouslySavedSoftwareData.uploadedPublicFiles.slice(0, 3).map((file, indexxxx) => {
                                        return (
                                            <li id="file-box-customized-software" className="file-box" key={indexxxx}>
                                                <div className="file-top">
                                                    <i className={`fa fa-file-text-o ${renderColor(indexxxx)}`}></i><i id={`PopoverCustom-${indexxxx}`} onClick={() => {
                                                        setSelectedFileTwo(file);

                                                        calculatePopoverStateToChange(indexxxx, true, false);
                                                    }} className={`fa fa-ellipsis-v f-14 ellips apply-special-hover-effect-black-icon`}></i>
                                                </div>
                                                <Popover placement="top" isOpen={calculatePopoverOpenWhich(indexxxx)} target={`PopoverCustom-${indexxxx}`} toggle={() => {
                                                    calculatePopoverStateToChange(indexxxx, null, true);
                                                }}>
                                                    <PopoverHeader>Want to delete this file? <div className="popover-cancel-container" onClick={() => {
                                                        calculatePopoverStateToChange(indexxxx, false, false);
                                                    }}><img src={require("../../../../../../../assets/icons/close-64.png")} className="small-close-popover-icon" /></div></PopoverHeader>
                                                    <PopoverBody>Would you like to <em style={{ color: "blue", textDecorationLine: "underline" }}>permanently delete</em> this file from your selected/uploaded files? This will remove ONLY this file which will free up space (if you have 10 files already) and will allow you to select another file to replace it. This action <strong style={{ color: "red" }}>cannot</strong> be undone.
                                                        <hr />
                                                        <Button style={{ marginTop: "7.5px", width: "100%" }} onClick={() => {
                                                            deleteCurrentlySelectedTwoFile(indexxxx);
                                                        }} className="btn-air-secondary" color="secondary" size="md">Delete file!</Button>
                                                    </PopoverBody>
                                                </Popover>
                                                <div className="file-bottom">
                                                    <h6>{file.name} </h6>
                                                    <p className="mb-1">{formatBytes(file.size)}</p>
                                                    <p> <b>{"Uploaded at"} : </b>{file.date}</p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <hr />
                                {previouslySavedSoftwareData.uploadedPublicFiles.length > 3 ? <Button color="secondary" style={{ width: "100%" }} onClick={() => {
                                    setSelectedFile({
                                        ...previouslySavedSoftwareData.uploadedPublicFiles[0],
                                        selectedFileIndex: 0
                                    });
                                    // set delay to allow load before modal opening...
                                    setTimeout(() => {
                                        setFileModalOpenStatus(true);
                                    }, 500)
                                }}>View All/Other Uploaded File's</Button> : null}
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        );
    }
    const onError = (e) => {
        console.log(e, 'error in file-viewer');
    }
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
            default:
                break;
        }
    }
    const renderCustomButtonDropzone = (data, e) => {

        const { meta } = data.files[0];

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

                            handleSubmit(runSubmit);
                        }} className="btn-air-secondary" color="secondary" size="md">Submit & Upload New File!</Button>
                    </Fragment>
                );
            } else {
                return (
                    <Fragment>
                        <Button style={{ marginTop: "25px" }} onClick={() => {
                            NotificationManager.warning(`File is NOT ready to upload yet! Please wait for the preparation steps to complete before submitting.`, 'Still preparing!', 4500);
                        }} className="btn-air-light" color="light" size="md">Submit & Upload New File!</Button>
                    </Fragment>
                );
            }
        }
    }
    const renderPreviewOfFile = (data) => {

        const file = data.fileWithMeta.file;
        // return preview data via FileViewer (to not exclude documents such as .docx and such...);
        if (fileReady === true) {
            return (
                <div className="filereader-preview-dropzone">
                    <FileViewer
                        fileType={calculateFileType(file.type)}
                        filePath={filePathData}
                        onError={onError}
                        key={file.id}
                    />
                </div>
            );
        } else {
            return null;
        }
    }
    const imageChangeAndConversion = (file) => {
        return URL.createObjectURL(file);
    }
    const onSubmitHelper = (files, allFiles) => {
        allFiles.forEach((file) => {
            file.remove();
        })
    }
    const getFilesFromEvent = (events) => {
        // console.log("getFilesFromEvent : ", events);
    }
    const deleteCurrentlySelectedFile = (index) => {

        const removedFileArray = previouslySavedSoftwareData.uploadedPublicFiles.filter((item, i) => {
            if (fileAtPopoverInteraction.id !== item.id) {
                return true;
            }
        });

        saveSoftwareListingInfo({
            ...previouslySavedSoftwareData,
            uploadedPublicFiles: removedFileArray
        });
        // close popover
        setDynamicPopoverStateOpen(index, null, true);
        // change file current focus 
        setFileAtPopoverInteractionState(null);
        // check if the current "set to delete" item is in focus or not (being viewed)
        if (selectedFile.selectedFileIndex === index) {
            // check if last item in array and IF SO actually bump ONE BACK instead of forward.
            if ((previouslySavedSoftwareData.uploadedPublicFiles.length - 1) === index) {
                setSelectedFile({
                    ...previouslySavedSoftwareData.uploadedPublicFiles[index - 1],
                    selectedFileIndex: selectedFile.selectedFileIndex - 1
                });
            } else {
                // set focus of current file to one forward as the list bumps and the item after deleted item comes into focus.
                setSelectedFile({
                    ...previouslySavedSoftwareData.uploadedPublicFiles[index + 1],
                    selectedFileIndex: selectedFile.selectedFileIndex
                });
            }
        }
    }
    const setDynamicPopoverStateOpen = (index, bool, reverseBool) => {
        // reverse the state or coorlated index popover status
        if (reverseBool === true) {
            setPopoverGeneralStatus({
                ...popoverGeneralStatus,
                [`popover${index}`]: !`popover${index}`
            });
        } else {
            // do NOT make reversal changes and do normal logic!
            setPopoverGeneralStatus({
                ...popoverGeneralStatus,
                [`popover${index}`]: bool
            });
        }
    }
    const handleFinalSubmissionOfForm = (onClose) => {
        console.log("handleFinalSubmissionOfForm clicked!");
        // close modal (confirmation NOT file modal).
        onClose();
        // go to page 3 (75%) or final page IF REDIRECT EXISTS
        if (typeof previouslySavedSoftwareData.redirected !== "undefined" && previouslySavedSoftwareData.redirected === true) {
            saveSoftwareListingInfo({
                ...previouslySavedSoftwareData,
                currentPage: 4
            });
        } else {
            saveSoftwareListingInfo({
                ...previouslySavedSoftwareData,
                currentPage: 3
            });
        }
    }
    const closeModalAndReviewFiles = (onClose) => {
        onClose();
        // open back up file modal to review.
        setSelectedFile({
            ...previouslySavedSoftwareData.uploadedPublicFiles[0],
            selectedFileIndex: 0
        });
        // set delay to allow load before modal opening...
        setTimeout(() => {
            setFileModalOpenStatus(true);
        }, 500)
    }
    const initiateConfirmationContinuationMessage = () => {
        console.log("initiateConfirmationContinuationMessage ran.");
        // activate confirmation alert!

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Fragment>
                        <Card>
                            <CardHeader className="b-l-primary border-3 specific-edit-border-right">
                                <h3>Continue onwards to next page or go back?</h3>
                            </CardHeader>
                            <CardBody id="modal-button-showcase-cardbody" className="btn-group-showcase">
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <p className="button-group-text-above">Would you like to leave this part of the "Create-a-listing" form and proceed onwards to the next required data collection point? Please select one of the options below...</p>
                                    </Col>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <hr className="secondary-hr" />
                                        <div className="centered-button-container">
                                            <ButtonGroup id="button-group-custom-secondary">
                                                <Button className="set-background-hover" outline color="secondary" onClick={onClose}>Cancel/Close</Button>
                                                <Button className="set-background-hover" color="secondary" onClick={() => {
                                                    handleFinalSubmissionOfForm(onClose);   
                                                }}>Submit & Continue!</Button>
                                                <Button className="set-background-hover" outline color="secondary" onClick={() => {
                                                    closeModalAndReviewFiles(onClose);
                                                }}>Review Uploaded File(s)</Button>
                                            </ButtonGroup>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Fragment>
              );
            }
        });
    }
    // check to make sure appropriate changes occur.
    console.log("popoverGeneralStatus", popoverGeneralStatus);
    return (
        <Fragment>
            <LoadingBar
                color='#51bb25'
                height={4.25}
                progress={progress}
                onLoaderFinished={() => {
                    setProgress(0);
                }}
            />
            {selectedFile !== null ? <Modal classNames={{
                overlay: 'customFileModalOverlay',
                modal: 'customFileModal',
            }} open={fileModalOpen} onOverlayClick={() => {
                console.log("onOverlayClicked clicked!");
            }} onClose={() => {
                setFileModalOpenStatus(false);
            }} center>
                <Container fluid={true}>
                    <Row>
                        <Col md="4" lg="4" xl="4">
                            <div className="file-content">
                                <Card>
                                    <CardBody id="file-manager-override-scroll" className="file-manager">
                                        <div className="left-tall-scroller-overflow">
                                            <ul className="files">
                                                {previouslySavedSoftwareData.uploadedPublicFiles.map((file, indexxxx) => {
                                                    return (
                                                        <li id={`file-box-customized-software-fullw`} className={`file-box ${selectedFile.selectedFileIndex === indexxxx ? "active-pane-file" : ""}`} key={indexxxx}>
                                                            <div className="file-top"><i className={`fa fa-file-text-o ${renderColor(indexxxx)}`}></i><i id={`popover${indexxxx}`} onClick={() => {
                                                                setFileAtPopoverInteractionState(file);
                                                                // do set (hard coded) switch
                                                                setDynamicPopoverStateOpen(indexxxx, true, false);
                                                            }} className={`fa fa-ellipsis-v f-14 ellips ${selectedFile.selectedFileIndex === indexxxx ? "apply-special-hover-effect-black-icon" : "apply-special-hover-effect"}`}></i>
                                                                <Popover placement="bottom" isOpen={popoverGeneralStatus[`popover${indexxxx}`]} target={`popover${indexxxx}`} toggle={() => {
                                                                    // reverse dynamic popover state!
                                                                    setDynamicPopoverStateOpen(indexxxx, null, true);
                                                                }}>
                                                                    <PopoverHeader>Want to delete this file? <div className="popover-cancel-container" onClick={() => {
                                                                        // do set (hard coded) switch
                                                                        setDynamicPopoverStateOpen(indexxxx, false, false);
                                                                    }}><img src={require("../../../../../../../assets/icons/close-64.png")} className="small-close-popover-icon" /></div></PopoverHeader>
                                                                    <PopoverBody>Would you like to <em style={{ color: "blue", textDecorationLine: "underline" }}>permanently delete</em> this file from your selected/uploaded files? This will remove ONLY this file which will free up space (if you have 10 files already) and will allow you to select another file to replace it. This action <strong style={{ color: "red" }}>cannot</strong> be undone.
                                                                        <hr />
                                                                        <Button style={{ marginTop: "7.5px", width: "100%" }} onClick={() => {
                                                                            deleteCurrentlySelectedFile(indexxxx);
                                                                        }} className="btn-air-secondary" color="secondary" size="md">Delete file!</Button>
                                                                    </PopoverBody>
                                                                </Popover>
                                                            </div>
                                                            <div className="file-bottom">
                                                                <h6>{file.name}</h6>
                                                                <p className="mb-1">{formatBytes(file.size)}</p>
                                                                <p> <b>{"Uploaded at"} : </b>{file.date}</p>
                                                            </div>
                                                            <div className="center-button-file">
                                                                <Button style={{ width: "100%" }} onClick={() => {
                                                                    setSelectedFile({
                                                                        ...file,
                                                                        selectedFileIndex: indexxxx
                                                                    });
                                                                }} className="btn-air-secondary" color="secondary" size="sm">View File</Button>
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                        <Col md="8" lg="8" xl="8">
                            <Card>
                                <CardBody className="file-viewer-cardbody">
                                    <div className="height-100-wmaxed">
                                        <FileViewer
                                            fileType={calculateFileType(selectedFile.type)}
                                            filePath={`${process.env.REACT_APP_ASSET_LINK}/${selectedFile.link}`}
                                            onError={onError}
                                            key={selectedFile.id}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Modal> : null}
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Upload related files & attachments</h5>
                                <p style={{ paddingTop: "7.5px" }}>Content to be transfered to purchaser of your listing. Read bottom details if confused or if you require more information or guidance.</p>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Label>Select a single supporting file or multiple (Up to 10 files <strong>total</strong>)</Label>
                                    <p className="subtext-under-label-upload"><strong style={{ color: "blue" }}>NOTE</strong>: These files will be transfered or "handed over" to the winner of your auction (the highest bidder) after the completion of your listing. Please be aware that these are essentially the files that your winner will be <strong>downloading</strong> and viewing.</p>
                                    <div className="dz-message needsclick">
                                        <Dropzone
                                            ref={dropzoneRef}
                                            PreviewComponent={(data) => renderPreviewOfFile(data)}
                                            maxFiles={1}
                                            autoUpload={true}
                                            onChangeStatus={(functions) => {
                                                setChangeOptions(functions);
                                            }}
                                            submitButtonDisabled={false}
                                            InputComponent={CustomInputHelper}
                                            getFilesFromEvent={getFilesFromEvent}
                                            onSubmit={onSubmitHelper}
                                            SubmitButtonComponent={(data, e) => {
                                                return (
                                                    <div className="absolutely-position-submit-btn">
                                                        {renderCustomButtonDropzone(data, e)}
                                                    </div>
                                                );
                                            }}
                                            multiple={false}
                                            canCancel={false}
                                            styles={{
                                                dropzone: { height: 325 },
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
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {_.has(previouslySavedSoftwareData, "uploadedPublicFiles") && previouslySavedSoftwareData.uploadedPublicFiles.length > 0 ? renderConditionalUponFileUploads() : null}
                {_.has(previouslySavedSoftwareData, "uploadedPublicFiles") && previouslySavedSoftwareData.uploadedPublicFiles.length > 0 ? <Row>
                    <Card className="card-absolute">
                        <CardBody>
                            <Col sm="12" md="12" lg="12" xl="12">
                                <Label>Currently, you've <strong style={{ color: "red" }}>successfully</strong> uploaded <strong style={{ color: "blue", textDecorationLine: "underline", fontSize: "20px" }}>{previouslySavedSoftwareData.uploadedPublicFiles.length}</strong> files out of your ten (10) file limit. You have <strong style={{ color: "blue", textDecorationLine: "underline", fontSize: "20px" }}>{(10 - previouslySavedSoftwareData.uploadedPublicFiles.length)}</strong> available slots left to upload additional files!</Label>
                                <hr />
                                <Button color="primary" style={{ width: "100%" }} onClick={() => {
                                    initiateConfirmationContinuationMessage();
                                }}> ~ Submit form details and proceed to next page ~ </Button>
                            </Col>
                        </CardBody>
                    </Card>
                </Row> : <Fragment>
                    <Row>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <Card className="card-absolute">
                                <CardHeader className="bg-secondary">
                                    <h5 style={{ color: "white" }}>Upload at least three (3) files to proceed w/this form</h5>
                                </CardHeader>
                                <CardBody>
                                    <p>You <strong style={{ color: "red", textDecorationLine: "underline" }}>MUST</strong> upload related files & attachements that will be <strong>transfered/given</strong> to the highest bidder OR person that purchases your listing via buy-it-now or best-offer (or any other methods available). Please keep in mind, <strong style={{ color: "red", textDecorationLine: "underline" }}>ALL</strong> of the files uploaded in this form page (40% aka page TWO ONLY) will be <strong style={{ color: "red", textDecorationLine: "underline" }}>TRANSFERED</strong> to the winner/purchaser of your listing. You should include the code and whatever related files/folders linked to what you're selling - IF you're NOT sure about what all needs to be uploaded, it's generally better to be safe and upload <strong style={{ color: "red", textDecorationLine: "underline" }}>everything (even if you have to question whether a file is relevant)</strong> than have to eventually <strong style={{ color: "red", textDecorationLine: "underline" }}>partially/fully refund</strong> the buyer due to illusions/deceit of what's actually included in this listing. Be honest, transparent and include everything that is supposedly for sale.</p>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Fragment>}
            </Container>
        </Fragment>
    );
};
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data,
        previouslySavedSoftwareData: state.softwareListingSale.softwareListingSaleInfo
    }
}
export default connect(mapStateToProps, { saveSoftwareListingInfo })(PageTwoMainHelper);