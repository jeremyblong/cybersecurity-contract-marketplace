import React, { useMemo, useRef, useState, Fragment } from 'react';
import "./styles.css";
import { Container, Row, Col, Card, CardHeader, Button, CardBody, Input, Label, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import Breadcrumb from '../../../../layout/breadcrumb';
import { connect } from "react-redux";
import SimpleMDE from "react-simplemde-editor";
import { WithContext as ReactTags } from 'react-tag-input';
import { useForm } from 'react-hook-form';
import helpers from "./helpers/reduxFormHelpers.js";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";
import Dropzone from 'react-dropzone-uploader';
import miscFunctions from "./helpers/miscFunctions.js";

const {
    onSubmitHelper,
    renderPreviewOfFile,
    renderCustomButtonDropzone,
    CustomInputHelper
} = miscFunctions;


const titleChecker = helpers().titleChecker;
const subtitleChecker = helpers().subtitleChecker;
const hashtagsChecker = helpers().hashtagsChecker;
const descriptionChecker = helpers().descriptionChecker;

const KeyCodes = {
    comma: 188,
    enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

const CreateNewBlogPostHelper = ({ userData }) => {

    // refs & such
    const dropzoneRef = useRef(null);


    const [fileReady, setFileReadyStatus] = useState(false);
    const [progress, setProgress] = useState(0);
    const [file, setFiles] = useState(null);
    const [currentFileSelectedUpload, setCurrentUploadFileStatus] = useState(null);
    const [fileMetaData, setMetaFileData] = useState(null);
    const [changeOptions, setChangeOptions] = useState(null);
    const [filePathData, setCurrentFilePathData] = useState(null);

    const history = useHistory();

    // redux-form-hook values initialization
    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur",
        enableReinitialize: true
    });

    const currentValues = getValues();

    const autofocusNoSpellcheckerOptions = useMemo(() => {
        return {
            autofocus: false,
            spellChecker: false,
        }
    }, []);

    const handleDelete = (i) => {
        setValue("hashtags", currentValues.hashtags.filter((tag, index) => index !== i), { shouldValidate: true });
    };

    const handleAddition = (tag) => {
        setValue("hashtags", typeof currentValues.hashtags === "undefined" ? [tag] : [...currentValues.hashtags, tag], { shouldValidate: true });
    };

    const handleDrag = (tag, currPos, newPos) => {
        const tags = [...currentValues.hashtags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        setValue("hashtags", newTags, { shouldValidate: true });
    };

    const handleFinalSubmission = (data) => {
        console.log("handleFinalSubmission", data);

        const { title, subtitle, description, hashtags } = data;

        if (file !== null) {
            const config = {
                title,
                subtitle,
                description,
                hashtags,
                userID: userData.uniqueId,
                userFullName: `${userData.firstName} ${userData.lastName}`,
                userAccountType: userData.accountType,
                fileLink: file.link
            }

            axios.post(`${process.env.REACT_APP_BASE_URL}/upload/new/blog/post/individual/public`, config).then((res) => {
                if (res.data.message === "Successfully updated/uploaded new blog post!") {
                    console.log(res.data);

                    NotificationManager.success(`We've successfully posted your desired blog post, it is now LIVE and ACTIVE! We are going to redirect you to the blog homepage where you may locate your blog posting...`, 'Successfully uploaded blog post!', 4750);

                    setTimeout(() => {
                        history.push("/blogging/main/page/display/all");
                    }, 4500);
                } else {
                    console.log("Err", res.data);

                    NotificationManager.error("An unknown error occurred while attempting to upload your new blog post data, please try again or contact support if this problem persists...", "Error upload/updating post & profile!", 4750);
                }
            }).catch((err) => {
                console.log(err);

                NotificationManager.error("An unknown error occurred while attempting to upload your new blog post data, please try again or contact support if this problem persists...", "Error upload/updating post & profile!", 4750);
            })
        } else {
            NotificationManager.warning("You MUST upload a 'main display photo' before proceeding, this image will display on the list-view and will be seen while people are scrolling through bulk posts!", "Upload a 'main-display' photo before proceeding!", 4750);
        }
    }
    const renderFormError = (e, errors) => {
        console.log(e, errors);
    }

    console.log("currentValues", currentValues);

    return (
        <div>
            <Breadcrumb parent="Previously Received Review(s)" title="Previously Received Review's From Contracted Work" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className='shadow'>
                            <CardHeader className='b-l-primary b-r-primary'>
                                <h3>Create a new blog post and share your knowledge with the user's of our platform! This is an <em style={{ textDecorationLine: "underline", color: "#7366ff" }}>excellent</em> way to promote your account and/or knowledge showing you know what you're doing. Share your thoughts & knowledge today!</h3>
                            </CardHeader>
                            <CardBody>
                                <h3>Please fill in the required data to post your new blog post..</h3>
                                <hr />
                                <Form className="m-form__group needs-validation streaming-start-form-wrapper" noValidate="" onSubmit={handleSubmit(handleFinalSubmission, (e, errors) => {
                                    return renderFormError(e, errors)
                                })}>
                                    <FormGroup className="m-form__group">
                                        <Label>Blog Title (Main display title) ~ <em style={{ color: "red", textDecorationLine: "underline" }}>You must enter between 35 - 225 characters before posting..</em></Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend"><InputGroupText>{"Blog Title"}</InputGroupText></InputGroupAddon>
                                            <Input {...titleChecker.check(register)} value={currentValues.title} className="form-control" onChange={(e) => {

                                                const value = e.target.value;

                                                return titleChecker.onChange(value, setValue);
                                            }} name={titleChecker.name} type={titleChecker.type} placeholder={titleChecker.placeholder} />
                                        </InputGroup>
                                        {errors.title ? <span className="span-tooltip">{errors.title.message}</span> : null}
                                    </FormGroup>
                                    <FormGroup className="m-form__group">
                                        <Label>Blog Sub-Title (Main display sub-title) ~ <em style={{ color: "red", textDecorationLine: "underline" }}>You must enter between 35 - 225 characters before posting..</em></Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend"><InputGroupText>{"Blog Subtitle"}</InputGroupText></InputGroupAddon>
                                            <Input {...subtitleChecker.check(register)} className="form-control" value={currentValues.subtitle} onChange={(e) => {

                                                const value = e.target.value;

                                                return subtitleChecker.onChange(value, setValue);
                                            }} name={subtitleChecker.name} value={currentValues.subtitle} type={subtitleChecker.type} placeholder={subtitleChecker.placeholder} />
                                        </InputGroup>
                                        {errors.subtitle ? <span className="span-tooltip">{errors.subtitle.message}</span> : null}
                                    </FormGroup>
                                    <FormGroup className="m-form__group">
                                        <Label>Blog Hashtags (tags to be searched with - these will help people find your blog(s)) ~ <em style={{ color: "red", textDecorationLine: "underline" }}>You must enter between 5 - 15 'hashtags' before posting..</em></Label>
                                        <ReactTags
                                            {...hashtagsChecker.check(register)}
                                            autofocus={false}
                                            tags={currentValues.hashtags}
                                            value={currentValues.hashtags}
                                            name={"hashtags"}
                                            classNames={{
                                                tags: 'tagsClass',
                                                tagInput: 'tagInputClass',
                                                tagInputField: 'form-control',
                                                selected: 'selectedClass',
                                                tag: 'badge badge-primary custom-tag-streaming',
                                                remove: 'removeClass',
                                                suggestions: 'suggestionsClass',
                                                activeSuggestion: 'activeSuggestionClass'
                                            }}
                                            placeholder={"(OPTIONAL) Add hashtags to your comment..."}
                                            maxLength={10}
                                            // suggestions={suggestions}
                                            handleDelete={handleDelete}
                                            handleAddition={handleAddition}
                                            handleDrag={handleDrag}
                                            delimiters={delimiters}
                                        />
                                        {errors.hashtags ? <span className="span-tooltip">{errors.hashtags.message}</span> : null}
                                    </FormGroup>
                                    <FormGroup className="m-form__group">
                                        <Label>Blog Main Content ~ <em style={{ color: "red", textDecorationLine: "underline" }}>You must enter between 500 - 3500 characters before posting..</em></Label>
                                        <SimpleMDE
                                            {...descriptionChecker.check(register)}
                                            id="post-content-custom"
                                            value={currentValues.body}
                                            placeholder={`## Summary:
                                                [Add summary of the vulnerability]

                                                ## Steps to Reproduce:
                                                [Add details for how we can reproduce the issue. Please ensure reproducibility of the issue.]

                                                1. [add step]
                                                2. [add step]
                                                3. [add step]

                                                ## Impact
                                                [This session is very important as it helps us to assess the severity of the issue. To help you with filling in this session, we think that answering the following questions may help:
                                                How does the issue affect the business or the user? 
                                                What can the attacker get through the issue? 
                                                Can the issue be escalated further? If so, how?

                                                ## Mitigation
                                                [Please give a brief description of how the bug could be fixed.]


                                                ## Supporting Material/References:
                                                [list any additional material (e.g. screenshots, logs, etc.)]

                                                * [attachment / reference]
                                            `}
                                            name={"body"}
                                            onChange={(value) => descriptionChecker.onChange(value, setValue)}
                                            value={currentValues.body}
                                            options={autofocusNoSpellcheckerOptions}
                                        />
                                        {errors.description ? <span className="span-tooltip">{errors.description.message}</span> : null}
                                    </FormGroup>
                                    {file === null ? <Fragment>
                                        <Form>
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
                                                                {renderCustomButtonDropzone(data, e, currentFileSelectedUpload, setMetaFileData, setFileReadyStatus, fileMetaData, setProgress, setCurrentUploadFileStatus, fileReady, setFiles)}
                                                            </div>
                                                        );
                                                    }}
                                                    multiple={false}
                                                    inputContent={"Drag & drop or select more files from the computer (max. 250mb per file)"}
                                                    canCancel={false}
                                                    styles={{
                                                        dropzone: { height: 325, minWidth: "100%" },
                                                        dropzoneActive: { borderColor: 'green' },
                                                    }}
                                                />
                                            </div>
                                        </Form>
                                    </Fragment> : <Fragment>
                                        <Row>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <Form>
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
                                                                        {renderCustomButtonDropzone(data, e, currentFileSelectedUpload, setMetaFileData, setFileReadyStatus, fileMetaData, setProgress, setCurrentUploadFileStatus, fileReady, setFiles)}
                                                                    </div>
                                                                );
                                                            }}
                                                            multiple={false}
                                                            inputContent={"Drag & drop or select more files from the computer (max. 250mb per file)"}
                                                            canCancel={false}
                                                            styles={{
                                                                dropzone: { height: 325, minWidth: "100%" },
                                                                dropzoneActive: { borderColor: 'green' },
                                                            }}
                                                        />
                                                    </div>
                                                </Form>
                                            </Col>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <img src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} className={"stretch-blog-creation-img"} />
                                            </Col>
                                        </Row>
                                    </Fragment>}
                                    <hr />
                                    <Button type={"submit"} style={{ width: "100%" }} color={"success-2x"} outline className={"btn-square-success"}>Submit Blog Post Data!</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {})(CreateNewBlogPostHelper);