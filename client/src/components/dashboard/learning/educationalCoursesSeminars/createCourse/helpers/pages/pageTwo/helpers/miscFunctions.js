import React, { Fragment } from "react";
import { Button } from 'reactstrap';
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import { updateCourseInformationData } from "../../../../../../../../../redux/actions/courses/createNewCourse/index.js";
import { confirmAlert } from 'react-confirm-alert';


const handleSubmit = (runSubmit, currentFileSelectedUpload, fileMetaData, setProgress, setShowInitialState, setVideoFileState, setLoadedState, alreadyExisted, setCurrentFilePathData) => {

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

            if (alreadyExisted === true) {
                const configuration = {
                    method: 'get',
                    url: `${process.env.REACT_APP_ASSET_LINK}/${file.link}`,
                    responseType: 'blob'
                };
    
                axios(configuration).then((response) => {
                    // create fileready
                    const fileeee = new File([response.data], file.name); 
                    // set current file path to convert to readable URL later
                    setCurrentFilePathData(URL.createObjectURL(fileeee));
                    setVideoFileState(file);
                    setShowInitialState(false);
                    setLoadedState(true);
                })
            } else {
                setVideoFileState(file);
                setShowInitialState(false);
                setLoadedState(true);   
            }

            NotificationManager.success(`We've successfully uploaded your file! Please proceed filling out your information or add more files.`, 'Successfully uploaded file!', 4500);

            runSubmit();
        } else {
            console.log("Err", res.data);
        }
    }).catch((err) => {
        console.log(err);
    })
};

const renderCustomButtonDropzone = (data, setMetaFileData, currentFileSelectedUpload, fileMetaData, fileReady, setFileReadyStatus, setProgress, setVideoFileState, setShowInitialState, setLoadedState, alreadyExisted, setCurrentFilePathData) => {

    const { meta } = data.files[0];

    if (currentFileSelectedUpload === null) {
        return null;
    } else {
        if (fileReady === true) {
            return (
                <Fragment>
                    <Button style={{ marginTop: "7.5px" }} onClick={(e) => {
                        e.preventDefault();
                        // file meta data for next action
                        setMetaFileData(meta);
                        // set file status as ready or prepared.
                        setFileReadyStatus(false);

                        const runSubmit = data.onSubmit;

                        handleSubmit(runSubmit, currentFileSelectedUpload, fileMetaData, setProgress, setShowInitialState, setVideoFileState, setLoadedState, alreadyExisted, setCurrentFilePathData);
                    }} className="btn-air-info" color="info" size="md">Submit & Upload New File!</Button>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <Button style={{ marginTop: "7.5px" }} onClick={() => {
                        NotificationManager.warning(`File is NOT ready to upload yet! Please wait for the preparation steps to complete before submitting.`, 'Still preparing!', 4500);
                    }} className="btn-air-light" color="light" size="md">Submit & Upload New File!</Button>
                </Fragment>
            );
        }
    }
}
const handleDeletionConfirmationOpen = () => {
    const defaultState = [{
        sections: []
    }];
    confirmAlert({
        title: 'Clear/Delete ALL Items?',
        message: "Are you SURE you'd like to clear your ENTIRE 'Course Content' already filled out information? This will start a clear-slate and you will start from the beginning. You can also save this data to your account before deleting so please consider that as well.",
        buttons: [
          {
            label: 'Yes, CLEAR!',
            onClick: () => {
                updateCourseInformationData(defaultState);
            }
          },
          {
            label: 'No, CANCEL',
            onClick: () => {
                // do nothing.
            }
          }
        ]
    });
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
    calculateFileType,
    handleDeletionConfirmationOpen
};