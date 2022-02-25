import React, { Fragment, useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, CardHeader, Button, CardBody, Form, Label, Input, ListGroup, ListGroupItem } from 'reactstrap';
import "./styles.css";
import Breadcrumb from "../../../../../../../layout/breadcrumb";
import Dropzone from 'react-dropzone-uploader';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import FileViewer from 'react-file-viewer';
import _ from "lodash";
import axios from "axios";
import { connect } from "react-redux";
import { NotificationManager } from 'react-notifications';
import LoadingBar from 'react-top-loading-bar';
import helpers from "./helpers/createPostHelpers.js";
import CreateNewPostReduxFormHelpers from "./helpers/reactHookFormHelpers.js";
import { useForm, Controller } from 'react-hook-form';
import Select from "react-select";
import { useHistory } from "react-router-dom";

const descriptionChecker = CreateNewPostReduxFormHelpers().descriptionChecker;
const typesOfLanguagesUsed = CreateNewPostReduxFormHelpers().typesOfLanguagesUsed;
const titleChecker = CreateNewPostReduxFormHelpers().titleChecker;



const { calculateFileType, onSubmitHelper, CustomInputHelper, languageList } = helpers;

const CreateNewHackerProfileContentPostHelper = ({ userData }) => {

    const history = useHistory();

    // react-hook-form logic - initialization
    const { register, handleSubmit, control, watch, reset, setValue, getValues, setError, values, clearErrors, formState: { errors }} = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur"
    });

    const currentValues = getValues();
    
    const dropzoneRef = useRef(null);
    const typeOfPostRef = useRef(null);
    const [ typing, setTyping ] = useState("");
    const [ typesSelectionsOptions, setSelectionState ] = useState([]);
    const [ pageReady, setPageReadyStatus ] = useState(false);
    const [progress, setProgress] = useState(0);
    const [fileReady, setFileReadyStatus] = useState(false);
    const [currentFileSelectedUpload, setCurrentUploadFileStatus] = useState(null);
    const [filePathData, setCurrentFilePathData] = useState(null);
    const [fileMetaData, setMetaFileData] = useState(null);
    const [ changeOptions, setChangeOptions ] = useState(null);
    const [ uploaded, setUploadedFiles ] = useState([]);


    useEffect(() => {
        const newOptionsArr = [];
        
        for (let index = 0; index < languageList.length; index++) {
            const lang = languageList[index];
            newOptionsArr.push({ label: lang.name, value: lang.name, entire: lang });
            // check if at END
            if ((languageList.length - 1) === index) {
                setSelectionState(newOptionsArr);
                setPageReadyStatus(true);
            }
        }
    }, [])

    const renderPreviewOfFile = (data) => {

        const file = data.fileWithMeta.file;
        // return preview data via FileViewer (to not exclude documents such as .docx and such...);
        if (fileReady === true) {
            return (
                <div className="filereader-preview-dropzone-custom-upload">
                    <FileViewer
                        fileType={calculateFileType(file.type)}
                        filePath={filePathData}
                        onError={(err) => console.log("file displaying err:", err)}
                        key={file.id}
                    />
                </div>
            );
        } else {
            return null;
        }
    }
    const handleSubmitCustom = (runSubmit) => {

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

                if (typeof uploaded !== "undefined" && uploaded.length < 5) {
                    // do something with file.
                    setUploadedFiles(prevState => {
                        return [...prevState, file]
                    })

                    NotificationManager.success(`We've successfully uploaded your file! Please proceed filling out your information or add more files.`, 'Successfully uploaded file!', 4500);

                    setMetaFileData(null);
                    setFileReadyStatus(false);
                    setCurrentUploadFileStatus(null);
                } else {
                    NotificationManager.error("You've already uploaded FIVE (5) file's which is the maximum allowed for post's, please continue with your current files or delete some to make room for new file's to replace the old.", "Too many file's already in queue!", 4750);
                }

                runSubmit();
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    };
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

                            handleSubmitCustom(runSubmit);
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
    const renderFormError = (e, errors) => {
        console.log(e, errors);
    }
    const handleFinalSubmission = (data) => {
        console.log("handleFinalSubmission", data);

        const { description, typeOfPost, title } = data;

        const config = {
            description, 
            typeOfPost,
            title,
            uploaded: typeof uploaded !== "undefined" && uploaded.length > 0 ? uploaded : null,
            signedinUserID: userData.uniqueId
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/upload/new/wall/profile/post/hacker/account`, config).then((res) => {
            if (res.data.message === "Successfully updated/uploaded new wall post!") {
                console.log(res.data);

                setValue("title", "", { shouldValidate: false });
                setValue("description", "", { shouldValidate: false });
                setValue("typeOfPost", "", { shouldValidate: false });
                
                setUploadedFiles([]);

                setTimeout(() => {
                    history.push(`/hacker/profile/individual/view/${userData.uniqueId}`);
                }, 4750);

                NotificationManager.success(`We've successfully updated your profile data & posted your new post! You'll be automatically redirected to your profile to see the changes in approx 4.5 seconds...`, 'Successfully uploaded profile & post data!', 4750);
            } else {
                console.log("Err", res.data);

                NotificationManager.error("An unknown error occurred while attempting to upload your new post data to your profile, please try again or contact support if this problem persists...", "Error upload/updating post & profile!", 4750);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const renderUponConditionalLoad = () => {
        if (pageReady === true) {
            return (
                <Fragment>
                    <Form className="needs-validation streaming-start-form-wrapper" noValidate="" onSubmit={handleSubmit(handleFinalSubmission, (e, errors) => renderFormError(e, errors))}>
                        <Row style={{ marginBottom: "15px" }}>
                            <Col sm="12" md="6" lg="6" xl="6">
                                <Label className={"creation-label"}>{typesOfLanguagesUsed.label}</Label>
                                <Controller
                                    control={control}
                                    name={typesOfLanguagesUsed.name}
                                    {...typesOfLanguagesUsed.check(setError, register, "typeOfPost", clearErrors)}
                                    render={({ field }) => (
                                        <div className={"select-wrapper-post"}>
                                            <Select
                                                {...field}
                                                ref={typeOfPostRef}
                                                autoBlur={true}
                                                defaultValue={null}
                                                onMenuClose={() => {}}
                                                isMulti={true}
                                                value={currentValues.typeOfPost}
                                                onChange={(selectedOption) => {
                                                    // update redux-form state
                                                    setTimeout(() => {
                                                        setValue('typeOfPost', selectedOption, { shouldValidate: false })
                                                        // blur input in case it doesn't
                                                        typeOfPostRef.current.blur();
                                                    }, 100)
                                                }}
                                                options={typesSelectionsOptions}
                                            />
                                        </div>
                                    )}
                                />
                                {errors.typeOfPost ? <span className="span-tooltip">{errors.typeOfPost.message}</span> : null}
                            </Col>
                            <Col sm="12" md="6" lg="6" xl="6">
                                <Label className={"creation-label"}>{titleChecker.label}</Label>
                                <Input {...titleChecker.check(register, setTyping)} className="form-control" name={titleChecker.name} type={titleChecker.type} placeholder={titleChecker.placeholder} onChange={(e) => {
                                    const value = e.target.value;

                                    setTyping(value)

                                    return titleChecker.onChange(value, setValue);
                                }} value={currentValues.title} />
                                {errors.title ? <span className="span-tooltip">{errors.title.message}</span> : null}
                            </Col>
                        </Row>
                        <Label className={"creation-label"}>{descriptionChecker.label}</Label>
                        <textarea {...descriptionChecker.check(register, setTyping)} rows={5} className="form-control" name={descriptionChecker.name} type={descriptionChecker.type} placeholder={descriptionChecker.placeholder} onChange={(e) => {
                            const value = e.target.value;
                            setTyping(value);
                            return descriptionChecker.onChange(value, setValue)
                        }} value={currentValues.description} />
                        {errors.description ? <span className="span-tooltip">{errors.description.message}</span> : null}
                        <hr />
                        <Label className={"creation-label"}>Main File(s) to display in post (can upload UP-TO 5 total...)</Label>
                        <p style={{ marginBottom: "10px" }} className={"creation-descriptive-text"}>These will be the MAIN files displayed in your listing in addition to the description/content section and title. You can upload anything you'd like whether it's images/selfies and/or life updates, instructional videos or interesting data/content, totally up to you on how you customize your profile!</p>
                        <Dropzone
                            ref={dropzoneRef}
                            PreviewComponent={(data) => renderPreviewOfFile(data)}
                            maxFiles={1}
                            autoUpload={true}
                            onChangeStatus={(functions) => {
                                setChangeOptions(functions);
                            }}
                            submitButtonDisabled={false}
                            InputComponent={({ accept, onFiles }) => <CustomInputHelper accept={accept} onFiles={onFiles} setCurrentFilePathData={setCurrentFilePathData} setCurrentUploadFileStatus={setCurrentUploadFileStatus} setFileReadyStatus={setFileReadyStatus} />}
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
                                dropzone: { height: 275 },
                                dropzoneActive: { borderColor: 'green' },
                            }}
                        />
                        <hr />
                            <ListGroup>
                                {typeof uploaded !== "undefined" && uploaded.length > 0 ? uploaded.map((upload, index) => {
                                    return (
                                        <Fragment>
                                            <ListGroupItem active={(index % 2 === 1) ? true : false} className="d-flex justify-content-between align-items-center">{upload.name}<span onClick={() => setUploadedFiles(prevState => {
                                                return prevState.filter((fileee) => fileee.id !== upload.id);
                                            })} className="badge badge-secondary counter digits customized-delete-file-profile-post">{"DELETE FILE"}</span></ListGroupItem>
                                        </Fragment>
                                    );
                                }) : null}
                            </ListGroup>
                        <hr />
                        <div className={"centered-both-ways"}>
                            <Button type={"submit"} style={{ marginTop: "7.5px", width: "75%" }} color={"success-2x"} outline className="btn-square-success text-center"><i className="fa fa-plus m-r-5"></i>Submit & Post New Data!</Button>
                        </div>
                    </Form>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <SkeletonTheme baseColor="#d4d4d4" highlightColor="#8f8f8f">
                        <p>
                            <Skeleton containerClassName={"stretch-bars"} count={50} />
                        </p>
                    </SkeletonTheme>
                </Fragment>
            );
        }
    }
    return (
        <Fragment>
            <LoadingBar
                color={"#f73164"}
                height={9}
                progress={progress}
                onLoaderFinished={() => {
                    setProgress(0);
                }}
            />
            <Breadcrumb parent="Creating new 'primary content' post/posting" title="Create a new main content posting" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className={"new-post-card-wrapper"}>
                            <CardHeader className="b-l-primary border-3">
                                <h4 className={"text-center custom-card-header-create-post"}>You're currently on the 'create a new post' page which will create new data to post on your primary profile content section/sector...</h4>
                            </CardHeader>
                            <CardBody>
                                {renderUponConditionalLoad()}
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
export default connect(mapStateToProps, { })(CreateNewHackerProfileContentPostHelper);