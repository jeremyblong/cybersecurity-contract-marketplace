import React, { Fragment } from "react";
import { ListGroupItem, Row, Col, Badge, Button } from 'reactstrap';
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import FileViewer from 'react-file-viewer';
import _ from "lodash";

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
const handleSubmit = (runSubmit, currentFileSelectedUpload, fileMetaData, setProgress, setMetaFileData, setFileReadyStatus, setCurrentUploadFileStatus, setFiles) => {

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

    axios.post(`${process.env.REACT_APP_BASE_URL}/upload/misc/file`, data, config).then((res) => {
        if (res.data.message === "Successfully uploaded file!") {
            console.log(res.data);

            const { file } = res.data;

            // update current file in main component
            NotificationManager.success(`We've successfully uploaded your file! Please proceed filling out your information...`, 'Successfully uploaded file!', 4500);

            setFiles(file);

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
const renderCustomButtonDropzone = (data, e, currentFileSelectedUpload, setMetaFileData, setFileReadyStatus, fileMetaData, setProgress, setCurrentUploadFileStatus, fileReady, setFiles) => {

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

                        handleSubmit(runSubmit, currentFileSelectedUpload, fileMetaData, setProgress, setMetaFileData, setFileReadyStatus, setCurrentUploadFileStatus, setFiles);
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
const onSubmitHelper = (files, allFiles) => {
    allFiles.forEach((file) => {
        file.remove();
    })
}

export default {
    onSubmitHelper, 
    renderPreviewOfFile, 
    renderCustomButtonDropzone, 
    CustomInputHelper
};
  