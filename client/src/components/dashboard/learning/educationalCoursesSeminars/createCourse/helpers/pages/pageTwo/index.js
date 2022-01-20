import React, { Fragment, useRef, useState } from "react";
import "./styles.css";
import { connect } from "react-redux";
import Dropzone from 'react-dropzone-uploader';
import helpers from "./helpers/miscFunctions.js";
import { Button, Row, Col, Card, CardBody, FormGroup, Label, Input, Media, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import FileViewer from 'react-file-viewer';
import Tour from 'reactour';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const { 
    renderCustomButtonDropzone,
    onSubmitHelper,
    calculateFileType
} = helpers;

const steps = [
    {
      selector: '#navigate-to-redirect',
      content: `If you're a bit confused as to 'how' to 'upload/create' new course content to be sold and streamed on our platform, click this highlighted icon/button and we will open a modal with more detailed information regarding this matter...`,
    }
]

const CreateNewCoursePageTwo = ({ setProgress }) => {

    const dropzoneRef = useRef(null);
    const scrollToTourWrapper = useRef(null);
    // state initialization
    const [fileReady, setFileReadyStatus] = useState(false);
    const [currentFileSelectedUpload, setCurrentUploadFileStatus] = useState(null);
    const [filePathData, setCurrentFilePathData] = useState(null);
    const [fileMetaData, setMetaFileData] = useState(null);
    const [ changeOptions, setChangeOptions ] = useState(null);
    const [ subtitle, setSubTitleValue ] = useState("");
    const [ stepOpen, setStepOpenState ] = useState(false);
    const [ modalOpen, setModalState ] = useState(false);

    const disableBodyAndScroll = target => {
        disableBodyScroll(target);        
    };
    // enable body!
    const enableBody = target => clearAllBodyScrollLocks();

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
    const handleTourActivate = () => {
        console.log("handleTourActivate ran...");

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
    const handleSubAddition = () => {
        console.log("handleSubAddition ran...")
    }
    return (
        <Fragment>
            <Tour
                steps={steps}
                isOpen={stepOpen}
                onAfterOpen={disableBodyAndScroll}
                onBeforeClose={enableBody}
                onRequestClose={() => {
                    setStepOpenState(false);
                }} 
            />
            <Row>
            <Col sm="12" md="12" lg="12" xl="12">
                    <Card>
                        <CardBody>
                            <Row>
                                <div ref={scrollToTourWrapper} id={"navigate-to-redirect"}>
                                    <Media className="p-20">
                                        <div className="radio radio-info mr-3">
                                            <Input id="radio66" type="radio" name="radio66" checked={modalOpen === true ? true : false} value={null} />
                                            <Label for={"radio66"}></Label>
                                        </div>
                                        <Media body>
                                            <h6 className="mt-0 mega-title-badge">Confused on how to upload 'Course-Content'?<span className="badge badge-info pull-right digits make-digits-larger-courses">{"Need Clarification/Help on how to upload new content?"}</span></h6>
                                            <p>{"Are you unsure of 'what' or 'how' to upload course content & most of all organize the data in a manner that makes sense? We will guide you through the process but you can find a very detailed overview/guide by clicking the button just below this text...Click it to find out more!"}</p>
                                            <hr />
                                            <Button outline style={{ width: "100%" }} onClick={() => handleSubAddition()} className="btn-square-secondary" color="secondary" size="md">Get help, guidance OR clarification on uploading course's!</Button>
                                            <p className="customized-course-lead">Basically, you will need to select the <strong>core</strong> details for your new course (which you've already done on page 1) and secondly (now) you will need to upload <strong>ONE (1) VIDEO</strong> per each added item in the list you generate/create below with the input/form & button to submit them. Simply, enter a "part" name and upload a video for that cooresponding part!</p>
                                        </Media>
                                    </Media>
                                </div>
                            </Row>
                            <ol className={"custom-ordered-list-courses"}>
                                <li>Enter a name/title for your new segment (segment being a chunk or small portion of your overall course/content)</li>
                                <li>Submit the title and it will automatically be added to the existing list (the course will be saved exactly as uploaded regarding the order)</li>
                                <li>Upload a video to the cooresponding HIGHLIGHTED region and this new video will be attached to the highlighted segment (will replace any existing video/content if already exists)</li>
                                <li>That's it! Proceed with your other course content...</li>
                            </ol>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col sm="12" md="12" lg="12" xl="12">
                    <Card>
                        <CardBody>
                            <Row>
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
                                                {renderCustomButtonDropzone(data, setMetaFileData, currentFileSelectedUpload, fileMetaData, fileReady, setFileReadyStatus, setProgress, setCurrentUploadFileStatus)}
                                            </div>
                                        );
                                    }}
                                    multiple={false}
                                    canCancel={false}
                                    styles={{
                                        dropzone: { height: 350 },
                                        dropzoneActive: { borderColor: 'green' },
                                    }}
                                />
                            </Row>
                            <hr />
                            <Row style={{ paddingTop: "12.5px" }}>
                                <Col sm="12" md="12" lg="12" xl="12">
                                    <FormGroup className="m-form__group">
                                        <Label>Add a "Sub-Section Course Content" section with this form. If you're confused as to what this means, <strong style={{ color: "red" }} id="hover-a-uploading" onClick={() => handleTourActivate()}>click this</strong> to retreieve more details on <strong>how to create sellable content/courses</strong></Label>
                                        <InputGroup style={{ width: "100%" }}>
                                            <InputGroupAddon addonType="prepend"><InputGroupText>{"Add Course Section"}</InputGroupText></InputGroupAddon>
                                            <Input value={subtitle} onChange={(e) => setSubTitleValue(e.target.value)} className="form-control min-height-input-courses" name={"subtitle"} type="text" placeholder={"Enter a course sub-section title..."} />
                                            <InputGroupAddon addonType="prepend"><Button style={{ width: "100%" }} onClick={() => handleSubAddition()} className="btn-square-info" color="info" size="md">Add New Section</Button></InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, { })(CreateNewCoursePageTwo);