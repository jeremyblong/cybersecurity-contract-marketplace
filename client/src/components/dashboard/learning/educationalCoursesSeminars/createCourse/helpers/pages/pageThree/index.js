import React, { Fragment, useState, useRef, useEffect } from "react";
import "./styles.css";
import { connect } from "react-redux";
import helpers from "./helpers/helperFunctions/helpers.js";
import { Button, Row, Col, Card, CardBody, CardHeader, FormGroup, Label, Input, Form, Progress, Container } from 'reactstrap';
import { updateCourseInformationData } from "../../../../../../../../redux/actions/courses/createNewCourse/index.js";
import _ from "lodash";
import ImageUploader from 'react-images-upload';
import Select from "react-select";
import { useForm, Controller } from 'react-hook-form';
import reactHookHelpers from "./helpers/helperFunctions/hookFormHelpers.js";
import options from "./helpers/helperFunctions/options.js";
import Dropzone from 'react-dropzone-uploader';
import ReactPlayer from "react-player";
import { NotificationManager } from 'react-notifications';


const { lanuageOptions, experienceLevelOptions, languageList, hoursInLengthOptions } = options;

// react-hook-form imports/helpers
const subtitleChecks = reactHookHelpers().subtitleChecks;
const languageSpokenChecks = reactHookHelpers().languageSpokenChecks;
const skillLevelChecks = reactHookHelpers().skillLevelChecks;
const primaryLanguageChecks = reactHookHelpers().primaryLanguageChecks;
const hoursOfCourseContentChecks = reactHookHelpers().hoursOfCourseContentChecks;
const courseWelcomeMessageChecks = reactHookHelpers().courseWelcomeMessageChecks;
const completionMessageChecks = reactHookHelpers().completionMessageChecks;

const {
    renderPreviewOfFile,
    onSubmitHelper,
    CustomInputHelper,
    renderCustomButtonDropzone,
    onDroppedImage
} = helpers;

// actual component
const CreateNewCoursePageThree = ({ userData, courseData, overallProgress, setOverallProgress, setProgress, updateCourseInformationData }) => {

    const [ languageArrayNew, setLanguageArray ] = useState([]);
    // refs & such
    const dropzoneRef = useRef(null);
    // start of state logic...
    const [ fileReady, setFileReadyStatus ] = useState(false);
    const [ currentFileSelectedUpload, setCurrentUploadFileStatus ] = useState(null);
    const [ fileMetaData, setMetaFileData ] = useState(null);
    const [ changeOptions, setChangeOptions ] = useState(null);
    const [ filePathData, setCurrentFilePathData ] = useState(null);
    const [ promotionalDemoFile, setPromotionalDemoFile ] = useState(null);
    const [ homepageImage, setHomepageImage ] = useState(null);

    const languageSpokenRef = useRef(null);
    const primaryLanguageRef = useRef(null);
    const skillLevelRef = useRef(null);
    // redux form logic
    const { register, handleSubmit, control, resetField, unregister, getValues, array, setValue, setError, clearErrors, formState: { errors }} = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur"
    });

    const currentValues = getValues();

    useEffect(() => {
        for (const key in courseData.pageThreeData) {
            const element = courseData.pageThreeData[key];

            setValue(key, element, { shouldValidate: true });

        }
    }, [] );

    useEffect(() => {

        const languageArrayNew = [];
      
        for (let index = 0; index < languageList.length; index++) {
            const language = languageList[index];
            languageArrayNew.push({ label: language.name, value: language.name, completeData: language });

            if ((languageList.length - 1) === index) {
                setLanguageArray(languageArrayNew);
            }
        }
    }, [])
    const onSubmit = (data) => {
        console.log("onSubmit ran...", data);

        if (typeof promotionalDemoFile !== "undefined" && promotionalDemoFile !== null) {
            if (typeof homepageImage !== "undefined" && homepageImage !== null) {
                const { completionMessage, languageSpoken, lengthInHours, primaryLanguageUsed, skillLevel, subtitle, welcomeMessage } = data;

                const newDataObj = {
                    completionMessage, 
                    languageSpoken, 
                    lengthInHours, 
                    primaryLanguageUsed, 
                    skillLevel, 
                    subtitle, 
                    welcomeMessage,
                    promotionalDemoFile,
                    homepageImage
                };

                updateCourseInformationData({
                    ...courseData,
                    pageThreeData: newDataObj,
                    currentPage: 4
                })
            } else {
                NotificationManager.warning(`You MUST complete the 'Homepage Display Image/Photo' required data input - please upload a main overview photo before proceeding...`, 'Upload Overview Photo!', 4500);
            }
        } else {
            NotificationManager.warning("You need to upload a 'Demo Video File' accurately summing up what your course entails, this video should be a 'general overview' snippet video...", "Upload 'DEMO VIDEO' Video Overview!", 4500);
        }
    }
    const errorsSubmit = (e, errors) => {
        console.log("errorsSubmit", e, errors);

        NotificationManager.error("You have NOT completed ALL of the required fields, please go back and fill out the rest of the required data before proceeding...", "Missing critical data!", 4500);
    }
    const onBufferEnded = () => {
        console.log("onBufferEnded ended.");
    }
    const renderPromoDemoVideo = () => {
       // ready to display live content
        if (typeof promotionalDemoFile === "undefined" || promotionalDemoFile === null) {
            return (
                <Fragment>
                    <div className={"overlay-boxshadow-courses-page-three centered-both-ways"}><h6 className={"header-no-content"}>Current NO file(s) is selected/uploaded - please select a file.</h6></div>
                </Fragment>
            );
        } else {
            const fileReadable = `${process.env.REACT_APP_ASSET_LINK}/${promotionalDemoFile.link}`;
            return (
                <Fragment>
                    <h3 style={{ textDecorationLine: "underline" }}><strong style={{ textDecorationLine: "underline", color: "#f73164" }}>Uploaded</strong> promotional video</h3>
                    <p style={{ marginTop: "7.5px" }} className={"lead"}>You've successfully uploaded/updated your 'Promotional/Demo' video - You have completed this form section!</p>
                    <ReactPlayer onBufferEnd={onBufferEnded} progressInterval={1000} controls={true} playIcon={true} playing={false} loop={false} volume={1} width={"100%"} height={"100%"} url={fileReadable} />
                </Fragment>
            );   
        }
    }
    console.log("current VALUES:", currentValues);
    return (
        <Fragment>
            <div className={"centered-horizontally-course"}>
                <div className={"position-above-bar-percentage"}>
                    <h1>{overallProgress}% Complete</h1>
                </div>
                <Progress className={"course-creation-progress-bar"} animated color="info" value={overallProgress} />
            </div>
            <Container fluid={true}>
                <Form onSubmit={handleSubmit(onSubmit, (e, errors) => {
                    return errorsSubmit(e, errors);
                })}>
                    <Row>
                        <Col sm="12" md="12" lg="12" xl="12">
                                <Card className={"card-upload-courses"}>
                                    <CardBody>
                                        <Row>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <h4 className={"course-custom-title"}>More fine-grain specific details about your listing. Please fill out each of the following fields to the best of your ability & be as specific/detailed as possible. We will collect things such as difficulty level, language, etc...</h4>
                                            </Col>
                                        </Row>
                                        <Row style={{ marginTop: "17.5px" }}>
                                            <Card className={"specifics-card"}>
                                                <CardHeader className="b-l-primary card-header-customized-specifics">
                                                    <h4>More required detailed information related to core listing</h4>
                                                    <p style={{ marginTop: "7.5px" }}>You will need to <strong style={{ textDecorationLine: "underline", color: "#f73164" }}>complete</strong> the following <strong>required</strong> information to give potential student's more of an idea of what they will be purchasing regarding certain fine details...</p>
                                                </CardHeader>
                                                <CardBody>
                                                    <div className="form-row">
                                                        <Col sm="12 mb-3" lg="12 mb-3" xl="12 mb-3" md="12 mb-3">
                                                            <Label>{subtitleChecks.label}</Label>
                                                            <Input {...subtitleChecks.check(setError, register)} onChange={(e) => {

                                                                subtitleChecks.onChange(e, setValue)

                                                                const caret = e.target.selectionStart;
                                                                const element = e.target;
                                                                window.requestAnimationFrame(() => {
                                                                    element.selectionStart = caret
                                                                    element.selectionEnd = caret
                                                                })
                                                            }} value={currentValues.subtitle} className="form-control" name={subtitleChecks.name} type={subtitleChecks.type} placeholder={subtitleChecks.placeholder} />
                                                            {errors.subtitle ? <span className="span-tooltip">{errors.subtitle.message}</span> : null}
                                                        </Col>
                                                    </div>
                                                    <div className="form-row">
                                                        <Col md="6 mb-3" sm="12 mb-3" lg="6 mb-3" xl="6 mb-3">
                                                            <FormGroup>
                                                                <Label>{skillLevelChecks.label}</Label>
                                                                <Controller
                                                                    control={control}
                                                                    name={skillLevelChecks.name}
                                                                    {...skillLevelChecks.check(setError, register, clearErrors)}
                                                                    render={({ field }) => (
                                                                        <Select
                                                                            {...field}
                                                                            ref={skillLevelRef}
                                                                            autoBlur={true}
                                                                            placeholder={skillLevelChecks.placeholder}
                                                                            defaultValue={null}
                                                                            onMenuClose={() => {
                                                                                skillLevelRef.current.blur();
                                                                            }}
                                                                            value={currentValues.skillLevel}
                                                                            onChange={(selectedOption) => skillLevelChecks.onChange(selectedOption, setValue, clearErrors)}
                                                                            options={experienceLevelOptions}
                                                                        />
                                                                    )}
                                                                />
                                                                {errors.skillLevel ? <span className="span-tooltip">{errors.skillLevel.message}</span> : null}
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="6 mb-3" sm="12 mb-3" lg="6 mb-3" xl="6 mb-3">
                                                            <FormGroup>
                                                                <Label>{languageSpokenChecks.label}</Label>
                                                                <Controller
                                                                    control={control}
                                                                    name={languageSpokenChecks.name}
                                                                    {...languageSpokenChecks.check(setError, register, clearErrors)}
                                                                    render={({ field }) => (
                                                                        <Select
                                                                            {...field}
                                                                            ref={languageSpokenRef}
                                                                            autoBlur={true}
                                                                            placeholder={languageSpokenChecks.placeholder}
                                                                            defaultValue={null}
                                                                            onMenuClose={() => {
                                                                                languageSpokenRef.current.blur();
                                                                            }}
                                                                            value={currentValues.languageSpoken}
                                                                            onChange={(selectedOption) => languageSpokenChecks.onChange(selectedOption, setValue, clearErrors)}
                                                                            options={lanuageOptions}
                                                                        />
                                                                    )}
                                                                />
                                                                {errors.languageSpoken ? <span className="span-tooltip">{errors.languageSpoken.message}</span> : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </div>
                                                    <div className="form-row">
                                                        <Col md="5 mb-3" sm="12 mb-3" lg="5 mb-3" xl="5 mb-3">
                                                            <FormGroup>
                                                                <Label>{primaryLanguageChecks.label}</Label>
                                                                <Controller
                                                                    control={control}
                                                                    name={primaryLanguageChecks.name}
                                                                    {...primaryLanguageChecks.check(setError, register, clearErrors)}
                                                                    render={({ field }) => (
                                                                        <Select
                                                                            {...field}
                                                                            ref={primaryLanguageRef}
                                                                            autoBlur={true}
                                                                            placeholder={primaryLanguageChecks.placeholder}
                                                                            defaultValue={null}
                                                                            onMenuClose={() => {
                                                                                primaryLanguageRef.current.blur();
                                                                            }}
                                                                            value={currentValues.primaryLanguageUsed}
                                                                            onChange={(selectedOption) => primaryLanguageChecks.onChange(selectedOption, setValue, clearErrors)}
                                                                            options={languageArrayNew}
                                                                        />
                                                                    )}
                                                                />
                                                                {errors.primaryLanguageUsed ? <span className="span-tooltip">{errors.primaryLanguageUsed.message}</span> : null}
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="7 mb-3" sm="12 mb-3" lg="7 mb-3" xl="7 mb-3">
                                                            <FormGroup>
                                                                <Label>{hoursOfCourseContentChecks.label}</Label>
                                                                <Controller
                                                                    control={control}
                                                                    name={hoursOfCourseContentChecks.name}
                                                                    {...hoursOfCourseContentChecks.check(setError, register, clearErrors)}
                                                                    render={({ field }) => (
                                                                        <Select
                                                                            className={"controlled-select-course"}
                                                                            {...field}
                                                                            ref={primaryLanguageRef}
                                                                            autoBlur={true}
                                                                            placeholder={hoursOfCourseContentChecks.placeholder}
                                                                            defaultValue={null}
                                                                            onMenuClose={() => {
                                                                                primaryLanguageRef.current.blur();
                                                                            }}
                                                                            value={currentValues.lengthInHours}
                                                                            onChange={(selectedOption) => hoursOfCourseContentChecks.onChange(selectedOption, setValue, clearErrors)}
                                                                            options={hoursInLengthOptions}
                                                                        />
                                                                    )}
                                                                />
                                                                {errors.lengthInHours ? <span className="span-tooltip">{errors.lengthInHours.message}</span> : null}
                                                            </FormGroup>
                                                        </Col>
                                                    </div>
                                                    <div className="form-row">
                                                        <Col sm="12 mb-3" lg="12 mb-3" xl="12 mb-3" md="12 mb-3">
                                                            <Label>{courseWelcomeMessageChecks.label}</Label>
                                                            <Input {...courseWelcomeMessageChecks.check(setError, register)} onChange={(e) => {
                                                                
                                                                courseWelcomeMessageChecks.onChange(e, setValue)

                                                                const caret = e.target.selectionStart;
                                                                const element = e.target;
                                                                window.requestAnimationFrame(() => {
                                                                    element.selectionStart = caret
                                                                    element.selectionEnd = caret
                                                                })
                                                            }} value={currentValues.welcomeMessage} className="form-control" name={courseWelcomeMessageChecks.name} rows={8} type={courseWelcomeMessageChecks.type} placeholder={courseWelcomeMessageChecks.placeholder} />
                                                            {errors.welcomeMessage ? <span className="span-tooltip">{errors.welcomeMessage.message}</span> : null}
                                                        </Col>
                                                    </div>
                                                    <div className="form-row">
                                                        <Col sm="12 mb-3" lg="12 mb-3" xl="12 mb-3" md="12 mb-3">
                                                            <Label>{completionMessageChecks.label}</Label>
                                                            <Input {...completionMessageChecks.check(setError, register)} onChange={(e) => {
                                                                
                                                                completionMessageChecks.onChange(e, setValue)

                                                                const caret = e.target.selectionStart;
                                                                const element = e.target;
                                                                window.requestAnimationFrame(() => {
                                                                    element.selectionStart = caret
                                                                    element.selectionEnd = caret
                                                                })
                                                            }} value={currentValues.completionMessage} className="form-control" name={completionMessageChecks.name} rows={8} type={completionMessageChecks.type} placeholder={completionMessageChecks.placeholder} />
                                                            {errors.completionMessage ? <span className="span-tooltip">{errors.completionMessage.message}</span> : null}
                                                        </Col>
                                                    </div>
                                                    <hr />
                                                </CardBody>
                                            </Card>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    <Row>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <Card className={"card-upload-courses"}>
                                <CardBody>
                                    <Card className={"specifics-card"}>
                                        <CardHeader className="b-l-primary card-header-customized-specifics">
                                            <h4>Upload a <strong>PROMOTIONAL/DEMO</strong> video depicting what's being sold/provided</h4>
                                            <p style={{ marginTop: "7.5px" }}>You will now need to upload a <strong style={{ textDecorationLine: "underline", color: "#f73164" }}>promotional video</strong> or <strong style={{ textDecorationLine: "underline", color: "#f73164" }}>demo/preview</strong> of what your course entials after being purchased/bought. You <strong style={{ textDecorationLine: "underline", color: "#f73164" }}>should</strong> give an <strong>accurate</strong> idea of what's being offered for sale with this video...</p>
                                        </CardHeader>
                                        <CardBody>
                                            <Row style={{ height: "100%" }}>
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
                                                                        {renderCustomButtonDropzone(data, e, currentFileSelectedUpload, setMetaFileData, setFileReadyStatus, fileMetaData, setProgress, setCurrentUploadFileStatus, fileReady, setPromotionalDemoFile)}
                                                                    </div>
                                                                );
                                                            }}
                                                            accept={"video/*"}
                                                            multiple={false}
                                                            canCancel={false}
                                                            styles={{
                                                                dropzone: { height: 300, minWidth: "100%" },
                                                                dropzoneActive: { borderColor: 'green' },
                                                            }}
                                                        />
                                                        {errors.promotionalUploadedFile ? <span className="span-tooltip">{errors.promotionalUploadedFile.message}</span> : null}
                                                    </div>
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
                                                <Col sm="12" md="6" lg="6" xl="6">
                                                    <div className={"adjust-height-upon-upload"}>
                                                        {renderPromoDemoVideo()}
                                                    </div>
                                                </Col>
                                            </Row>
                                            <hr />
                                            <h4>Upload a <strong>MAIN PHOTO</strong> that will be displayed on the <strong>homepage/search-results</strong> while student's/hacker's look for new courses</h4>
                                            <p style={{ marginTop: "7.5px" }}>This image/photo will be used to depict what your course will entail. Usually, we find that the best results come from a <strong style={{ textDecorationLine: "underline", color: "#f73164" }}>custom designed</strong> image to look at professional as possible from the moment someone see's your listing!</p>
                                            <hr />
                                            <ImageUploader
                                                withIcon={false}
                                                withPreview={true}
                                                label={"Upload a custom cover/photo image for your listing/course"}
                                                singleImage={true}
                                                buttonText={"Upload A COVER IMAGE/PHOTO"}
                                                onChange={(images) => onDroppedImage(images, setHomepageImage)}
                                                imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
                                                maxFileSize={1048576}
                                                fileSizeError={"file size is too big - please select a 'smaller' file..."}
                                            />
                                        </CardBody>
                                    </Card>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <Card className={"card-upload-courses"}>
                                <CardBody>
                                    <Button style={{ width: "100%" }} outline className={"btn-square-info"} type={"submit"} color="info-2x">{"Submit form & proceed w/rest of logic"}</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data,
        courseData: _.has(state.courseData, "courseData") ? state.courseData.courseData : []    
    }
}
export default connect(mapStateToProps, { updateCourseInformationData })(CreateNewCoursePageThree);