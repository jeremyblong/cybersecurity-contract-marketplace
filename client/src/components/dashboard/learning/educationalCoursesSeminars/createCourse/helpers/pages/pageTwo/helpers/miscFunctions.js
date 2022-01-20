import React, { Fragment } from "react";
import { Button } from 'reactstrap';
import axios from "axios";
import { NotificationManager } from 'react-notifications';

const handleSubmit = (runSubmit, currentFileSelectedUpload, fileMetaData, setProgress, setMetaFileData, setFileReadyStatus, setCurrentUploadFileStatus) => {

    console.log("submitted!", currentFileSelectedUpload, fileMetaData);

    //  conditional check for... (!_.has(previouslySavedSoftwareData, "uploadedPublicFiles")) || (previouslySavedSoftwareData.uploadedPublicFiles.length <= 10) redux logic

    if (true) {
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

                // save file to redux state...

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

const renderCustomButtonDropzone = (data, setMetaFileData, currentFileSelectedUpload, fileMetaData, fileReady, setFileReadyStatus, setProgress, setCurrentUploadFileStatus) => {

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

                        handleSubmit(runSubmit, currentFileSelectedUpload, fileMetaData, setProgress, setMetaFileData, setFileReadyStatus, setCurrentUploadFileStatus);
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
const onSubmitHelper = (files, allFiles) => {
    allFiles.forEach((file) => {
        file.remove();
    })
}
export default {
    renderCustomButtonDropzone,
    handleSubmit,
    onSubmitHelper,
    calculateFileType
};