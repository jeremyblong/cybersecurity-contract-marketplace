import React, { Fragment, useState, useRef, useEffect } from 'react';
import Sheet from 'react-modal-sheet';
import helpers from "./miscFunctions.js";
import FileViewer from 'react-file-viewer';
import { Button, Row, Col, Card, CardBody, FormGroup, Label, Input, Media, InputGroup, InputGroupAddon, InputGroupText, ListGroup, ListGroupItem } from 'reactstrap';
import Dropzone from 'react-dropzone-uploader';
import _ from "lodash";
import { connect } from "react-redux";
import { shiftCoreStyles } from "../../../../../../../../../redux/actions/universal/index.js";
import ReactPlayer from 'react-player';
import uuid from 'react-uuid';
import moment from "moment";
import { updateCourseInformationData } from "../../../../../../../../../redux/actions/courses/createNewCourse/index.js";
import { NotificationManager } from 'react-notifications';
import axios from "axios";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


const { renderCustomButtonDropzone, onSubmitHelper, calculateFileType } = helpers;


const SheetHelperPaneUploadCourseContent = ({ isOpen, setIsOpen, setProgress, shiftCoreStyles, disableBodyScroll, clearAllBodyScrollLocks, courseData, updateCourseInformationData, selectedCourseContent, setCourseContentState }) => {
    const dropzoneRef = useRef(null);
    const [ changeOptions, setChangeOptions ] = useState(null);
    const [fileReady, setFileReadyStatus] = useState(false);
    const [currentFileSelectedUpload, setCurrentUploadFileStatus] = useState(null);
    const [filePathData, setCurrentFilePathData] = useState(null);
    const [fileMetaData, setMetaFileData] = useState(null);
    const [ description, setDescription ] = useState("");
    const [ showInitial, setShowInitialState ] = useState(true);
    const [ videoFile, setVideoFileState ] = useState(null);
    const [ loaded, setLoadedState ] = useState(false);
    const [ alreadyExisted, alreadyExistedState ] = useState(false);

    const renderPreviewOfFile = (data) => {

        const file = data.fileWithMeta.file;
        // return preview data via FileViewer (to not exclude documents such as .docx and such...);
        if (fileReady === true) {
            return (
                <div className="filereader-preview-dropzone">
                    <FileViewer
                        fileType={calculateFileType(file.type)}
                        filePath={filePathData}
                        onError={(err) => console.log("fileviewer error - ", err)}
                        key={file.id}
                    />
                </div>
            );
        } else {
            return null;
        }
    }
    useEffect(() => {
        console.log("mounted/useeffect ran... sheet!", selectedCourseContent)
        // check if previously already updated
        if (selectedCourseContent !== null && selectedCourseContent.video !== null && _.has(selectedCourseContent, "video") && Object.keys(selectedCourseContent.video).length > 0) {
            console.log("main chunk");
            setDescription(selectedCourseContent.description);

            const configuration = {
                method: 'get',
                url: `${process.env.REACT_APP_ASSET_LINK}/${selectedCourseContent.video.link}`,
                responseType: 'blob'
            };

            axios(configuration).then((response) => {
                // create fileready
                const file = new File([response.data], selectedCourseContent.video.name); 
                // set current file path to convert to readable URL later
                setCurrentFilePathData(URL.createObjectURL(file));
                // set status update for current file
                setCurrentUploadFileStatus(file);
                // mark file as READY 
                // setFileReadyStatus(true);
                // mark pane READY to display content
                setLoadedState(true);
                // check if rendering from previous upload
                alreadyExistedState(true);
            })
        }  else {
            console.log("second chunk")
        }
        // update local component state to reflect already-made changes
    }, [isOpen])
    const CustomInputHelper = ({ accept, onFiles }) => {

        const text = showInitial === false ? "You already selected a file to upload, please proceed with the 'course-creation' process" : "Drop a file OR select to browse local data";
    
        return (
            <label className="custom-input-dropzone-copy" style={{ backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', padding: 15, borderRadius: 3 }}>
                <div className={"centered-both-ways"}>
                    <p className={"dropzone-text-courses"}>{text}</p>
                </div>
                <input
                    style={{ display: 'none' }}
                    type="file"
                    accept={accept}
                    multiple={false}
                    className={"custom-dropzone-input-actual-input"}
                    onChange={e => {
                        const file = e.target.files[0];
                        // set current file path to convert to readable URL later
                        setCurrentFilePathData(URL.createObjectURL(file));
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
    const handleDescriptionChange = (e) => {
        const value = e.target.value;

        setDescription(value);
    }
    const handleAdditionFileDescription = () => {
        console.log("handleAdditionFileDescription clicked...");

        if (videoFile !== null) {
            if (typeof description !== "undefined" && (description.length >= 25 && description.length <= 750)) {
                // mock a copy of redux state
                const shallowCopy = [...courseData];
                // newly created obj with desc and video info data
                const newlyAddedData = {
                    description,
                    video: videoFile,
                    id: uuid(),
                    systemDate: Date.now(),
                    date: new Date(),
                    formattedDate: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                    comments: [],
                    likes: 0,
                    dislikes: 0
                }
                // courseData
                const matchingItem = shallowCopy.find((course, index) => {
                    if (course.id === selectedCourseContent.id) {
                        return true;
                    }
                });
                // combined OLD and NEW state
                const combinedPreviousPlusNew = {
                    ...matchingItem,
                    ...newlyAddedData
                }
                // find index of matching item
                const updatedStateIndex = shallowCopy.findIndex((item) => item.id === selectedCourseContent.id);
                // replace matching item
                shallowCopy[updatedStateIndex] = combinedPreviousPlusNew;
                // update redux state
                updateCourseInformationData(shallowCopy);
                // close modal
                closeModalRelated();

                NotificationManager.success("Successfully ADDED your new data/information to your existing course 'chunk/section' - Please continue building out your course content, good job!", "Updated Course Content Successfully!", 4500);
            } else {
                NotificationManager.error("You MUST enter a description BETWEEN 25 and 750 charectors (min/max) before proceeding!", "Check your description letter count!", 4500);
            }
        } else {
            NotificationManager.error("You MUST upload a video file BEFORE proceeding forward with these updates...!", "UPLOAD a video before proceeding!", 4500);
        }
    }
    const closeModalRelated = () => {
        // clear video logic
        setCourseContentState(null);
        // image upload logic CLEAR existing state
        setCurrentUploadFileStatus(null);
        // revert image state back to default
        setVideoFileState(null);
        // set current file path to default state
        setCurrentFilePathData(null);
        // set description back to default
        setDescription("");
        // image upload logic CLEAR existing state
        setMetaFileData(null);
        // image upload logic CLEAR existing state
        setFileReadyStatus(false);
        // allow background clicking again
        shiftCoreStyles(false);
        // change loading state back to default
        setLoadedState(false);
        // close modal
        setIsOpen(false);
        // clear scroll locks as PANE is closed now...
        clearAllBodyScrollLocks();
    }
    const renderPreChecks = () => {
        if (loaded === true) {
            // ready to display live content
            if (currentFileSelectedUpload === null) {
                return (
                    <Fragment>
                        <div className={"overlay-boxshadow-courses centered-both-ways"}><h6 className={"header-no-content"}>Current NO file(s) is selected/uploaded - please select a file.</h6></div>
                    </Fragment>
                );
            } else {
                return (
                    <Fragment>
                        <ReactPlayer controls={true} playIcon={true} playing={false} loop={false} volume={1} width={"100%"} height={"100%"} url={filePathData} />
                    </Fragment>
                );   
            }
        } else {
            // still loading display skelaton
            return (
                <div className={"absolutely-positied-loading-courses"}>
                    <SkeletonTheme baseColor="#d4d4d4" highlightColor="#8f8f8f">
                        <p>
                            <Skeleton containerClassName={"custom-loading-courses"} count={12} />
                        </p>
                    </SkeletonTheme>
                </div>
            );
        }
    }
    return (
        <Fragment>
            <div id="sheet-container">
                <Sheet id="sheet-ultimate" disableDrag={true} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <Sheet.Container className="sheetcontainer">
                        <Sheet.Header className="sheetheader">
                            <Row style={{ margin: "17.5px" }}>
                                <Col sm="12" md="12" lg="12" xl="12">
                                    <Button style={{ width: "100%" }} onClick={closeModalRelated} className="btn-square-danger" outline color="danger" size="md-2x">Close Pane (Any Changes will NOT be preserved while previously editted data will however persist)</Button>
                                </Col>
                            </Row>
                        </Sheet.Header>
                        <Sheet.Content>
                            <Row>
                                <Card>
                                    <CardBody>
                                        <Row style={{ marginBottom: "20px" }}>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <h3>This is the form that is <strong>primarily</strong> used to upload/change content related to "course content". Use the form below to upload video's to each course "clip/section" and enter a description if you'd like...</h3>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <div className={"add-video-overlay-courses-upload centered-both-ways"}>
                                                    {renderPreChecks()}
                                                </div>
                                            </Col>
                                            <Col sm="12" md="6" lg="6" xl="6">
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
                                                    getFilesFromEvent={null}
                                                    onSubmit={onSubmitHelper}
                                                    accept="video/*"
                                                    SubmitButtonComponent={(data) => {
                                                        return (
                                                            <div className="absolutely-position-submit-btn">
                                                                {renderCustomButtonDropzone(data, setMetaFileData, currentFileSelectedUpload, fileMetaData, fileReady, setFileReadyStatus, setProgress, setVideoFileState, setShowInitialState, setLoadedState, alreadyExisted, setCurrentFilePathData)}
                                                            </div>
                                                        );
                                                    }}
                                                    className={"shadow-courses-dropzone"}
                                                    multiple={false}
                                                    canCancel={false}
                                                    styles={{
                                                        dropzone: { height: 350 },
                                                        dropzoneActive: { borderColor: 'green' },
                                                    }}
                                                />
                                                {fileReady === true ? <Fragment>
                                                    <hr className="secondary-hr" />
                                                    <div className="centered-both-ways">
                                                        <Button style={{ marginTop: "25px" }} onClick={(e) => {
                                                            setMetaFileData(null);
                                                            setFileReadyStatus(false);
                                                            setCurrentUploadFileStatus(null);
                                                            setCurrentFilePathData(null);

                                                            changeOptions.remove();
                                                        }} className="btn-air-danger cancel-button-upload" color="danger" size="md">Cancel Current/Pending Upload</Button>
                                                    </div>
                                                </Fragment> : null}
                                            </Col>
                                            <hr style={{ marginTop: "25px" }} />
                                            <FormGroup className=" m-form__group">
                                                <Label>Course Section/Segment Description (Between 25-750 Charector's in length)</Label>
                                                <InputGroup>
                                                    <Input onChange={(e) => handleDescriptionChange(e)} value={description} className="form-control" rows={6} type="textarea" placeholder={"Enter a description (Between 25-750 Charector's in length) for your segment/section of this chunk of your course (this SHOULD give a 'general' idea of what this segment is about)..."}/>
                                                </InputGroup>
                                            </FormGroup>
                                            <hr />
                                            <div className={"centered-both-ways"}>
                                                <Button outline style={{ width: "75%" }} onClick={() => handleAdditionFileDescription()} className="btn-square-info" color="info" size="md">Submit New Information/Details & File(s)</Button>
                                            </div>
                                        </Row>
                                        <hr />
                                    </CardBody>
                                </Card>
                            </Row>
                        </Sheet.Content>
                        </Sheet.Container>
                    <Sheet.Backdrop />
                </Sheet>
            </div>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data,
        courseData: _.has(state.courseData, "courseData") ? state.courseData.courseData : []
    }
}
export default connect(mapStateToProps, { shiftCoreStyles, updateCourseInformationData })(SheetHelperPaneUploadCourseContent);

// <h5>Upload any supporting files (if any/applicable)</h5>
// <p style={{ paddingTop: "7.5px" }} className={"top-title-course-help"}>These files will be <strong style={{ color: "#f73164" }}>fully-downloadable (on purpose)</strong> so viewer's/students will be able to download course content to <strong>follow along</strong> with you during your pre-recorded videos/seminars!</p>