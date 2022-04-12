import React, { Fragment, useState, useRef } from 'react';
import { Row, Col, Form, Label, Button } from 'reactstrap';
import { NotificationManager } from "react-notifications";
import Dropzone from 'react-dropzone-uploader';
import axios from "axios";
import FileViewer from 'react-file-viewer';
import _ from "lodash";
import ReactPlayer from 'react-player';
import "./styles.css";

const PageTwoVideoCreationHelper = ({ saveNewDetails, allData, jumpToStep, progress, setProgress }) => {

    const dropzoneRef = useRef(null);

    const [fileReady, setFileReadyStatus] = useState(false);
    const [currentFileSelectedUpload, setCurrentUploadFileStatus] = useState(null);
    const [filePathData, setCurrentFilePathData] = useState(null);
    const [fileMetaData, setMetaFileData] = useState(null);
    const [ changeOptions, setChangeOptions ] = useState(null);

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
    const handleSubmit = (runSubmit) => {

        console.log("submitted!", currentFileSelectedUpload, fileMetaData);

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

                NotificationManager.success(`We've successfully uploaded your file! Please proceed filling out your information or add more files.`, 'Successfully uploaded file!', 4500);

                saveNewDetails({
                    courseContent: file
                });

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
    };
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
    const onSubmitHelper = (files, allFiles) => {
        allFiles.forEach((file) => {
            file.remove();
        })
    }
    const handleSubmissionData = () => {
        console.log("handleSubmissionData clicked/ran");

        if (_.has(allData, "courseContent") && Object.keys(allData.courseContent).length > 0) {
            jumpToStep(2);
        } else {
            NotificationManager.warning("You MUST upload a video and/or data-content before attempting to proceed - upload a video up-to 30 minutes in length. Please upload a video before attempting to proceed..", "Upload a tutorial video before proceeding!", 4750);
        }
    }
    return (
        <Fragment>
            <Row>
                <Col sm="12">
                    <Form className="needs-validation">
                        <div className="form-row">
                            <Col md="12 mb-3">
                                <Label style={{ marginTop: "17.5px", marginBottom: "17.5px" }}>Upload your video content (up-to 30 minutes in length)</Label>
                                {_.has(allData, "courseContent") && Object.keys(allData.courseContent).length > 0 ? <Fragment>
                                    <Row>
                                        <Col sm="12" md="6" lg="6" xl="6">
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
                                        </Col>
                                        <Col sm="12" md="6" lg="6" xl="6">
                                            <ReactPlayer controls={true} loop={true} width={"100%"} className={"video-uploaded-course-data-tutorial"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${allData.courseContent.link}`} />
                                        </Col>
                                    </Row>
                                </Fragment> : <Fragment>
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
                                </Fragment>}
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
                            </Col>
                        </div>
                        <Button onClick={handleSubmissionData} className={"btn-square-success"} color={"success"} style={{ width: "100%", marginBottom: "12.5px", marginTop: "12.5px" }}>Proceed Forward W/Next Step</Button>
                    </Form>
                </Col>
            </Row>
        </Fragment>
    );
};

export default PageTwoVideoCreationHelper;