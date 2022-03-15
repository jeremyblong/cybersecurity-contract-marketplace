import React, { Fragment, useRef, useState, useEffect } from "react";
import "./styles.css";
import Dropzone from 'react-dropzone-uploader';
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import FileViewer from 'react-file-viewer';
import _ from "lodash";
import { Button, Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import LoadingBar from 'react-top-loading-bar';
import Breadcrumb from '../../../../../layout/breadcrumb';
import { connect } from "react-redux";

const IntroVideoEmployerAccountHelper = ({ userData }) => {

    const dropzoneRef = useRef(null);
    // start of state logic...
    const [ fileReady, setFileReadyStatus ] = useState(false);
    const [ currentFileSelectedUpload, setCurrentUploadFileStatus ] = useState(null);
    const [ fileMetaData, setMetaFileData ] = useState(null);
    const [ progress, setProgress ] = useState(0);
    const [ changeOptions, setChangeOptions ] = useState(null);
    const [ filePathData, setCurrentFilePathData ] = useState(null);
    const [ alreadyUploaded, setAlreadyUploaded ] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/general/user/data`, {
            params: {
                id: userData.uniqueId,
                accountType: userData.accountType
            }
        }).then((res) => {
            if (res.data.message === "Gathered user!") {
                console.log("gathered!", res.data);

                const { user } = res.data;

                if (_.has(user, "companyIntroductionVideo")) {
                    setAlreadyUploaded(true);
                }
            } else {
                console.log("Err", res.data);
            }
        })
    }, [])

    const renderPreviewOfFile = (data, fileReady, filePathData) => {

        const file = data.fileWithMeta.file;
        // return preview data via FileViewer (to not exclude documents such as .docx and such...);
        if (fileReady === true) {
            return (
                <div className="filereader-preview-dropzone">
                    <FileViewer
                        fileType={calculateFileType(file.type)}
                        filePath={filePathData}
                        onError={(err) => NotificationManager.warning(`Error 'loading' your recently selected 'preview' file - please select another file & try again...`, 'File loading error!', 4500)}
                        key={file.id}
                    />
                </div>
            );
        } else {
            return null;
        }
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
    const CustomInputHelper = (accept, onFiles, setCurrentFilePathData, setCurrentUploadFileStatus, setFileReadyStatus) => {

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
        console.log("handleSubmit");

        // upload file to aws S3
        const data = new FormData();

        data.append("file", currentFileSelectedUpload);
        data.append("meta", fileMetaData);
        data.append("uniqueId", userData.uniqueId);

        const config = {
            onUploadProgress: (progressEvent) => {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

                setProgress(percentCompleted);
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        axios.post(`${process.env.REACT_APP_BASE_URL}/upload/file/intro/video/employer/save/data`, data, config).then((res) => {
            if (res.data.message === "Successfully uploaded file!") {
                console.log(res.data);

                const { file } = res.data;

                setAlreadyUploaded(true);

                NotificationManager.success(`We've successfully uploaded your file! You've now successfully update your 'company video' and it is now active & live! Check your profile to see the reflected changes..`, 'Successfully uploaded file!', 4500);

                clearData();

                runSubmit();
            } else {
                console.log("Err", res.data);

                clearData();

                NotificationManager.error(res.data.message, 'An error occurred while uploading file!', 4500);

                runSubmit();
            }
        }).catch((err) => {
            console.log(err);

            clearData();

            NotificationManager.error("An unknown error has occurred while uploading your file - please try again or contact support if the issue persists...", 'An error occurred while uploading file!', 4500);

            runSubmit();
        })
    }
    const clearData = () => {
        setMetaFileData(null);
        setFileReadyStatus(false);
        setCurrentUploadFileStatus(null);
        setCurrentFilePathData(null);
    }
    const renderCustomButtonDropzone = (data, e) => {

        const { meta } = data.files[0];

        console.log("meta", meta);

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
    const onSubmitHelper = (files, allFiles) => {
        allFiles.forEach((file) => {
            file.remove();
        })
    }
    return (
        <Fragment>
            <LoadingBar
                color={'#51bb25'}
                height={9}
                progress={progress}
                onLoaderFinished={() => {
                    setProgress(0);
                }}
            />
            <Breadcrumb parent="Upload A 'Introductory' Company Video" title="Upload A Video Accurately Depicting Your Company" /> 
            <Container fluid={true}>
                <Row>
                    <Col sm="12" lg="12" xl="12" md="12">
                        <Card>
                            <CardHeader className="b-l-secondary b-r-secondary">
                                <h2 className="upload-video-header">Upload a company 'introductory video' explaining your company & what you do!</h2>
                                <p className="lead">Upload a video (up-to 7 1/2 minutes in length) accurately <span style={{ color: "#f73164", fontWeight: "bold" }}>depicting you, your company, your goals, aspirations or really whatever you'd like to tell potential contractors (hackers) BEFORE</span> they apply to your listings/jobs so they have a better understanding of what they're getting themselves into. This is <strong>NOT</strong> mandatory, however it is <strong style={{ color: "#f73164" }}>HIGHLY SUGGESTED.</strong></p>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        {filePathData !== null && currentFileSelectedUpload !== null ? <div className={"file-viewer-uploadedvideo"}>
                                            <FileViewer
                                                fileType={calculateFileType(currentFileSelectedUpload.type)}
                                                filePath={filePathData}
                                                onError={(err) => NotificationManager.warning(`Error 'loading' your recently selected 'preview' file - please select another file & try again...`, 'File loading error!', 4500)}
                                            />
                                        </div> : alreadyUploaded === false ? <img src={require("../../../../../assets/images/not-uploaded.png")} className={"stretch-both-ways-upload-employer"} /> : <img src={require("../../../../../assets/images/updated-company-video.png")} className={"stretch-both-ways-upload-employer"} />}
                                    </Col>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <div className="dz-message needsclick">
                                            <Dropzone
                                                ref={dropzoneRef}
                                                PreviewComponent={(data) => renderPreviewOfFile(data, fileReady, filePathData)}
                                                maxFiles={1}
                                                autoUpload={true}
                                                onChangeStatus={(functions) => {
                                                    setChangeOptions(functions);
                                                }}
                                                submitButtonDisabled={false}
                                                InputComponent={({ accept, onFiles }) => CustomInputHelper(accept, onFiles, setCurrentFilePathData, setCurrentUploadFileStatus, setFileReadyStatus)}
                                                onSubmit={onSubmitHelper}
                                                SubmitButtonComponent={(data, e) => {
                                                    return (
                                                        <div className="absolutely-position-submit-btn">
                                                            {renderCustomButtonDropzone(data, e)}
                                                        </div>
                                                    );
                                                }}
                                                accept={"video/*"}
                                                multiple={false}
                                                canCancel={false}
                                                styles={{
                                                    dropzone: { height: 525, minWidth: "100%" },
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
                                                    setCurrentFilePathData(null);

                                                    // remove selected
                                                    changeOptions.remove();
                                                }} className="btn-air-danger cancel-button-upload" color="danger" size="md">Cancel Current/Pending Upload</Button>
                                            </div>
                                        </Fragment> : null}
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, { })(IntroVideoEmployerAccountHelper); 