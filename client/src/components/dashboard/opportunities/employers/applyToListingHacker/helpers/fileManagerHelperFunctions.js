import React, { Fragment} from 'react';
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { confirmAlert } from 'react-confirm-alert';
import { Row, Col, Card, CardBody, Button, CardHeader, ButtonGroup } from 'reactstrap';


const handleFileDeletionUploadedFiles = (i, setMyFile, setPopoverStates, selected) => {
    // set files state
    setMyFile(prevState => {
        console.log("prev", prevState);
        return prevState.filter((item, idx) => {
            if (item.link !== selected.link) {
                return true;
            }
        })
    });
    // close popover
    setPopoverStates(prevState => {
        return {
            ...prevState,
            [`popover${i}`]: false
        }
    });
}
const handleDotsClickExpansion = (file, index, setPopoverStates) => {
    setPopoverStates(prevState => {
        return {
            ...prevState,
            [`popover${index}`]: true
        }
    });
}
const bytesToSize = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
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
const calculateFileTypeSavedUploadedAlready = (type) => {
    switch (type) {
        case "video/mp4":
            return "videos-only";
            break;
        case "image/png":
            return "images-only";
            break;
        case "image/jpeg":
            return "images-only";
            break;
        case "image/jpg":
            return "images-only";
            break;
        case "image/gif":
            return "images-only";
            break;
        case "image/bmp":
            return "images-only";
            break;
        case "application/pdf":
            return "misc-others";
            break;
        case "text/csv":
            return "misc-others";
            break;
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            return "misc-others";
            break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return "misc-others";
            break;
        case "video/webm":
            return "videos-only";
            break;
        case "audio/mpeg":
            return "videos-only";
            break;
        default:
            return "allfiles";
            break;
    }
}
const closePopoverDynamic = (i, setPopoverStates) => {
    setPopoverStates(prevState => {
        return {
            ...prevState,
            [`popover${i}`]: false
        }
    });
}
// UPLOAD file via api-call to AWS-S3
const handleFileUploadAnyType = (onSubmit, setMetaFileData, setFileReadyStatus, setCurrentUploadFileStatus, setMyFile, currentFileSelectedUpload, metaFileData, setProgress, setChecked, checked) => {
    // upload file to aws S3
    const data = new FormData();

    data.append("file", currentFileSelectedUpload);
    data.append("meta", metaFileData);

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

            // update local file array state
            setMyFile(prevState => {
                return [...prevState, {
                    ...file,
                    icon: "fa fa-file",
                    customType: checked === true ? "allfiles" : calculateFileTypeSavedUploadedAlready(file.type)
                }]
            });
            setChecked(false);

            NotificationManager.success(`We've successfully uploaded your file! Please proceed filling out the remaining form data in order to move onto the final page!`, 'Successfully uploaded file!', 4500);

            setMetaFileData(null);
            setFileReadyStatus(false);
            setCurrentUploadFileStatus(null);

            onSubmit();
        } else {
            console.log("Err", res.data);

            NotificationManager.error(res.data.message, 'An error occurred while uploading file!', 4500);

            onSubmit();
        }
    }).catch((err) => {
        console.log(err);

        NotificationManager.error("An unknown error has occurred while uploading your file - please try again or contact support if the issue persists...", 'An error occurred while uploading file!', 4500);

        onSubmit();
    })
}
const handleFilesFinalSubmission = (files, previous, saveApplicationDetailsProgress, setSubmissionPopoverState, shiftCoreStyles, clearAllBodyScrollLocks, setFileSheetOpenState) => {
    // clear locks related to pane
    shiftCoreStyles(false); 
    // clear body locks from open pane
    clearAllBodyScrollLocks();
    // save redux logic
    saveApplicationDetailsProgress({
        ...previous,
        files
    });
    // notifiy of success
    NotificationManager.success(`You've successfully 'saved' your uploaded files/folders - continue onwards with your application and good luck!`, 'Successfully uupdated/uploaded files & folders.', 4500);
    // close popover then MAIN pane
    setSubmissionPopoverState(false);
    // close MAIN PANE FINALLY
    setFileSheetOpenState(false);
} 
export default {
    handleFileDeletionUploadedFiles,
    handleDotsClickExpansion,
    handleFilesFinalSubmission,
    calculateFileType,
    bytesToSize,
    handleFileUploadAnyType,
    closePopoverDynamic
}
