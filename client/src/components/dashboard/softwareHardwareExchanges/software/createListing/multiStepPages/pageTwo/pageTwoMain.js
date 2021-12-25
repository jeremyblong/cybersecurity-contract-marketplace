import React, { useState, useEffect, useRef, Fragment } from 'react';
import "./styles.css";
import { Container, Row, Col, Card, CardHeader, CardBody, Form, Label, Button } from 'reactstrap'
import Dropzone from 'react-dropzone-uploader';
import axios from "axios";
import { connect } from "react-redux";
import { NotificationManager } from 'react-notifications';
import LoadingBar from 'react-top-loading-bar';
import { saveSoftwareListingInfo } from "../../../../../../../redux/actions/hackers/createSoftwareListing/createNewSoftwareListingSale.js";
import _ from "lodash";
import Slider from "react-slick";
import { Modal } from 'react-responsive-modal';
import FileViewer from 'react-file-viewer';


const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

const PageTwoMainHelper = ({ userData, saveSoftwareListingInfo, previouslySavedSoftwareData }) => {

    const [ progress, setProgress ] = useState(0); 
    const [ fileModalOpen, setFileModalOpenStatus ] = useState(false);
    const [ selectedFile, setSelectedFile ] = useState(null);
 
    const getUploadParams = ({ meta }) => { 
        return { url: 'https://httpbin.org/post' } 
    };
    useEffect(() => {
        // probably end up putting something here?
    }, [])

    const handleChangeStatus = ({ meta, file }, status) => {
        console.log("handleChangeStatus : ", meta, file, status);

        if (status === "preparing") {
            NotificationManager.info(`We've initiated your upload - we will notify you when your file has successfully uploaded! (These are just automatic uploads that ONLY you can view/manage)`, 'Initiated upload!', 4500);  
        } 

        if (status === "done") {
            const data = new FormData();
    
            data.append("file", file);
            data.append("meta", meta);

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

                    const { file, generatedID } = res.data;

                    saveSoftwareListingInfo({
                        ...previouslySavedSoftwareData,
                        uploadedPublicFiles: _.has(previouslySavedSoftwareData, "uploadedPublicFiles") ? [...previouslySavedSoftwareData.uploadedPublicFiles, file] : [file]
                    })

                    NotificationManager.success(`We've successfully uploaded your file! Please proceed filling out your information or add more files.`, 'Successfully uploaded file!', 4500);
                } else {
                    console.log("Err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
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
    const renderConditionalUponFileUploads = () => {
        return (
            <Row>
                <Col sm="12" md="12" lg="12" xl="12">
                    <div className="file-content">
                    <Card>
                        <CardBody className="file-manager">
                            <Label>If you'd like to view your previously uploaded files (uploaded yet NOT public <em style={{ color: "red" }}>yet</em>) can be viewed below however we will only show the first three (3) files in the preview region. If you'd like to view the rest of your uploaded files, click the <strong style={{ color: "blue" }}>"See More"</strong> button to view all of your uploaded content.</Label>
                            
                            <h4 className="mb-3">Uploaded File(s) & Content</h4>
                            <h6>These are your "Completed & already uploaded" files <em>however</em> they will only be permanently saved upon completion and posting of this listing as a whole.</h6>
                            <ul className="files">
                                {previouslySavedSoftwareData.uploadedPublicFiles.slice(0, 3).map((file, indexxxx) => {
                                    return (
                                        <li id="file-box-customized-software" className="file-box" key={indexxxx}>
                                            <div className="file-top"><i className={`fa fa-file-text-o ${renderColor(indexxxx)}`}></i><i className="fa fa-ellipsis-v f-14 ellips"></i></div>
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
                                                            <div className="file-top"><i className={`fa fa-file-text-o ${renderColor(indexxxx)}`}></i><i className="fa fa-ellipsis-v f-14 ellips"></i></div>
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
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Label>Select a single supporting file or multiple (Up to 10 files <strong>total</strong>)</Label>
                                    <p className="subtext-under-label-upload"><strong style={{ color: "blue" }}>NOTE</strong>: These files will be transfered or "handed over" to the winner of your auction (the highest bidder) after the completion of your listing. Please be aware that these are essentially the files that your winner will be <strong>downloading</strong> and viewing.</p>
                                    <div className="dz-message needsclick">
                                        <Dropzone
                                            getUploadParams={getUploadParams}
                                            onChangeStatus={handleChangeStatus}
                                            maxFiles={1}
                                            multiple={false}
                                            canCancel={false}
                                            inputContent="Drop a file OR select to browse local data"
                                            styles={{
                                                dropzone: { height: 275 },
                                                dropzoneActive: { borderColor: 'green' },
                                            }}
                                        />
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {_.has(previouslySavedSoftwareData, "uploadedPublicFiles") && previouslySavedSoftwareData.uploadedPublicFiles.length > 0 ? renderConditionalUponFileUploads() : null}
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
