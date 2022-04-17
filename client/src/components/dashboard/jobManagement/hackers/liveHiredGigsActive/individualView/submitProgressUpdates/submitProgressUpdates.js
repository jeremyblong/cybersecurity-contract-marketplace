import React, { Fragment, useEffect, useState, useRef, useMemo } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row, Label, Button, ListGroup, ListGroupItem, Badge, Media, Input, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Form, CardFooter } from 'reactstrap';
import "./styles.css";
import Breadcrumb from '../../../../../../../layout/breadcrumb'
import Select from 'react-dropdown-select';
import helpers from "./helpers/miscFunctions.js";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { NotificationManager } from 'react-notifications';
import { connect } from "react-redux";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import _ from "lodash";
import SimpleMDE from "react-simplemde-editor";
import Dropzone from 'react-dropzone-uploader';
import LoadingBar from 'react-top-loading-bar';

const { 
    ItemRenderer, 
    weaknessOptions, 
    ItemRendererVul, 
    onSubmitHelper, 
    renderPreviewOfFile, 
    renderCustomButtonDropzone, 
    CustomInputHelper 
} = helpers;

const SubmitProgressUpdatesForEmployerHelper = ({ userData }) => {


    const { id } = useParams();

    const history = useHistory();

    // refs & such
    const dropzoneRef = useRef(null);
    // start of state logic...
    const [ fileReady, setFileReadyStatus ] = useState(false);
    const [ files, setFiles ] = useState([]);
    const [ currentFileSelectedUpload, setCurrentUploadFileStatus ] = useState(null);
    const [ fileMetaData, setMetaFileData ] = useState(null);
    const [ changeOptions, setChangeOptions ] = useState(null);
    const [ filePathData, setCurrentFilePathData ] = useState(null);
    const [ data, setData ] = useState(null);
    const [ progress, setProgress ] = useState(0);
    const [ assets, setAssets ] = useState([]);
    const [ selectedAsset, setSelectedAsset ] = useState([]);
    const [ selectedVul, setSelectedVulAsset ] = useState([]);
    const [ optionSelected, setOptionSelected ] = useState(null);
    const [ title, setTitleResponse ] = useState("");
    const [ description, setDescriptionValue ] = useState("");
    const [ resultsText, setResultsValue ] = useState("");
    
    const companyName = data !== null ? data.employerPostedListingInfo.publicCompanyName : "---loading---";

    const handleAssetValueChange = (values) => {
        console.log("handleAssetValueChange values...:", values);

        setSelectedAsset(values[0]);
    }

    useEffect(() => {
        const configuration = {
            params: {
                uniqueId: userData.uniqueId,
                generatedID: id
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/hired/employer/information/hacker/account`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered active hired data!") {
                console.log("Successfully gathered information :... ", res.data);

                const { info } = res.data;

                setData(info);
                setAssets(info.employerPostedListingInfo.assetArray)
            } else {
                console.log("ERROR gathering active/hired applications...:", res.data);

                NotificationManager.error("An unknown error occurred while attempting to fetch core information about this specific job, if this problem persists - please contact support & report this problem!", "Could NOT gather data!", 4750);
            }
        }).catch((err) => {
            console.log("CRITICAL ERROR gathering active/hired application data...:", err);

            NotificationManager.error("An unknown error occurred while attempting to fetch core information about this specific job, if this problem persists - please contact support & report this problem!", "Could NOT gather data!", 4750);
        })
    }, []);

    const handleVulnerabilitySelection = (values) => {
        console.log("handleVulnerabilitySelection clicked/ran..", values);

        setSelectedVulAsset(values[0]);
    }

    const handleFinalMainSubmission = () => {
        if ((typeof description !== "undefined" && description.length >= 50) && (typeof title !== "undefined" && title.length >= 25) && (typeof resultsText !== "undefined" && resultsText.length >= 25) && (optionSelected !== null) && (_.has(selectedVul, "description") && Object.keys(selectedVul).length > 0) && (_.has(selectedAsset, "name") && Object.keys(selectedAsset).length > 0)) {
            console.log("success!");

            const configuration = {
                uniqueId: userData.uniqueId,
                generatedID: id,
                employerPosterId: data.employerPosterId,
                submitted: {
                    description,
                    title,
                    impact: resultsText,
                    severity: optionSelected,
                    vul: selectedVul,
                    relatedAttackSurface: selectedAsset,
                    files
                }
            }
            axios.post(`${process.env.REACT_APP_BASE_URL}/submit/data/employed/contract/data/hacker`, configuration).then((res) => {
                if (res.data.message === "Successfully submitted data!") {
                    console.log("Successfully submitted data!", res.data);

                    setTimeout(() => {
                        history.push(`/individual/hired/job/data/view/manage/${id}`);
                    }, 3250);

                    NotificationManager.success("Successfully updated listing information & submitted new data/results to this employer. We've successfully updated BOTH account's with the appropriate changes & your progress has been noted.", "Successfully saved/updated changes!", 4750);
                } else {
                    console.log("ERROR Successfully submitted data!...:", res.data);
    
                    NotificationManager.error("An unknown error occurred while attempting to save your updated/related information to this application, if this problem persists - please contact support & report this problem!", "Could NOT gather data!", 4750);
                }
            }).catch((err) => {
                console.log("CRITICAL Successfully submitted data!...:", err);
    
                NotificationManager.error("An unknown error occurred while attempting to save your updated/related information to this application, if this problem persists - please contact support & report this problem!", "Could NOT gather data!", 4750);
            })
        } else {
            NotificationManager.error("You MUST complete ALL of the required form data/information BEFORE proceeding & submitting your results to this employer/contractor. Please double check your information & make sure everything is filled out thoroughly..", "Fill-out ALL of the required information!", 4750);
        }
    }

    const autofocusNoSpellcheckerOptions = useMemo(() => {
        return {
          autofocus: false,
          spellChecker: false,
        }
    }, []);

    console.log("dataaaaaaa : .... ", data, selectedAsset, selectedVul);
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
            <Breadcrumb parent="Manage This Active Job & Submit A Report!" title="Submit A Report Or Follow Up On A Previous Report.." />
            <Container fluid={true}>
                <Row>
                    <Col sm="12" lg="12" md="12" xl="12">
                        <Card className='shadow relative'>
                            <CardHeader className='b-l-info b-r-info'>
                                <h3 className='header-submit-report'>You're about to submit a report to <strong style={{ color: "#f73164" }}>{companyName}</strong></h3>
                            </CardHeader>
                            <CardBody>
                                <p className='lead'>You're about to submit a report to <strong style={{ color: "#f73164" }}>{companyName}</strong>. Provide as much information as possible about the potential issue you have discovered. The more information you provide, the quicker EXNESS will be able to validate the issue. If you haven't yet, please remember to review our Policy and Disclosure Guidelines.</p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" lg="12" md="12" xl="12">
                        <Card className='shadow relative'>
                            <CardHeader className='b-l-success b-r-success'>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <div className='row-wrapper-submit-details'>
                                            <div className='wrapper-number-counter-absolute centered-both-ways'>
                                                <h1 className='numbernumber'>1</h1>
                                            </div> 
                                            <h3 className='header-submit-report'>Asset(s)</h3>
                                        </div>
                                    </Col>
                                </Row>
                                <p style={{ marginTop: "12.5px" }} className='lead'>Select the attack surface of this issue.</p>
                                
                            </CardHeader>
                            <CardBody>
                                {typeof assets !== "undefined" && assets.length > 0 ? <Fragment>
                                <Label className='label-submit-work'>Select the attack surface/asset of this issue.</Label>
                                <Select
                                    values={selectedAsset}
                                    multi={false}
                                    placeholder={"Please select a related asset/attack-surface related to your reported hack/hack(s)..."}
                                    options={assets}
                                    onChange={(values) => handleAssetValueChange(values)}
                                    contentRenderer={() => <ListGroup></ListGroup>}
                                    itemRenderer={({ item, methods }) => <ItemRenderer selectedAsset={selectedAsset} item={item} methods={methods} />}
                                />
                                </Fragment> : <Fragment>
                                    <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                        <p>
                                            <Skeleton count={10} />
                                        </p>
                                    </SkeletonTheme>
                                </Fragment>}
                                {_.has(selectedAsset, "mediumSeverity") ? <Fragment>
                                    <ListGroupItem onClick={() => {}} className={"list-group-item-action flex-column align-items-start"}>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">{selectedAsset.name}</h5><small id="smalllist" style={{ color: "red" }} onClick={() => setSelectedAsset({
                                                id: null
                                            })}>{`Delete This Item`} <i className="fa fa-solid fa-ban fa-2x"></i></small>
                                            </div>
                                        <p className="mb-1">{`This 'asset' has multiple reward tier's with 'low severity' paying the least generally and 'critical' paying the most, the employer and you will determine this vulerability risk/rating or class..`}</p>
                                        <Row>
                                            <Col sm="6" lg="3" md="3" xl="3">
                                                <Badge style={{ width: "100%" }} color="primary">${selectedAsset.lowSeverity} Per <strong>LOW</strong> Severity</Badge>
                                            </Col>
                                            <Col sm="6" lg="3" md="3" xl="3">
                                                <Badge style={{ width: "100%" }} color="secondary">${selectedAsset.mediumSeverity} Per <strong>MEDIUM</strong> Severity</Badge>
                                            </Col>
                                            <Col sm="6" lg="3" md="3" xl="3">
                                                <Badge style={{ width: "100%" }} color="info">${selectedAsset.highSeverity} Per <strong>HIGH</strong> Severity</Badge>
                                            </Col>
                                            <Col sm="6" lg="3" md="3" xl="3">
                                                <Badge style={{ width: "100%" }} color="success">${selectedAsset.criticalSeverity} Per <strong>CRITICAL</strong> Severity</Badge>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                </Fragment> : null}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" lg="12" md="12" xl="12">
                        <Card className='shadow relative'>
                            <CardHeader className='b-l-info b-r-info'>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <div className='row-wrapper-submit-details'>
                                            <div className='wrapper-number-counter-absolute centered-both-ways'>
                                                <h1 className='numbernumber'>2</h1>
                                            </div> 
                                            <h3 className='header-submit-report'>Weakness/Vulnerability</h3>
                                        </div>
                                        <p style={{ marginTop: "12.5px" }} className='lead'>Select the type of the potential issue you have discovered. Can't pick just one? Select the best match or submit a separate report for each distinct weakness.</p>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Select
                                    values={selectedVul}
                                    multi={false}
                                    placeholder={"Select the potential issue you've discovered.."}
                                    options={weaknessOptions}
                                    onChange={(values) => handleVulnerabilitySelection(values)}
                                    contentRenderer={() => <ListGroup></ListGroup>}
                                    itemRenderer={({ item, methods }) => <ItemRendererVul selectedVul={selectedVul} item={item} methods={methods} />}
                                />
                            </CardBody>
                            <CardFooter>
                                {_.has(selectedVul, "external_id") ? <Fragment>
                                    <ListGroupItem className={"list-group-item-action flex-column align-items-start"}>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">{selectedVul.name} ~ {selectedVul.external_id}</h5>
                                            <small id="smalllist" style={{ color: "red" }} onClick={() => setSelectedVulAsset({
                                                id: null
                                            })}>{`Delete This Item`} <i className="fa fa-solid fa-ban fa-2x"></i>
                                            </small>
                                        </div>
                                        <p className="mb-1">{selectedVul.description}</p>
                                    </ListGroupItem>
                                </Fragment> : null}
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" lg="12" md="12" xl="12">
                        <Card className='shadow relative'>
                            <CardHeader className='b-l-success b-r-success'>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <div className='row-wrapper-submit-details'>
                                            <div className='wrapper-number-counter-absolute centered-both-ways'>
                                                <h1 className='numbernumber'>3</h1>
                                            </div> 
                                            <h3 className='header-submit-report'>Severity (Optional)</h3>
                                        </div>
                                        <p style={{ marginTop: "12.5px" }} className='lead'>Estimate the severity of this issue.</p>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col sm="6" md="6" lg="3" xl="3">
                                        <Card>
                                            <Media className="p-20 cushion-card-media-option">
                                                <div className="radio radio-primary mr-3">
                                                    <Input onChange={() => setOptionSelected("low")} id="radio1" type="radio" name="radio1" checked={optionSelected === "low" ? true : false} />
                                                    <Label for="radio1"></Label>
                                                </div>
                                                <Media body>
                                                    <h6 className="mt-0 mega-title-badge">Low<span className="badge badge-primary pull-right digits">{"LOW SEVERITY"}</span></h6>
                                                    <p>{"This is the LOWEST level of vulnerabilities/severity... This usually doesn't require immediate action/fixes however it is still important to address."}</p>
                                                </Media>
                                            </Media>
                                        </Card>
                                    </Col>
                                    <Col sm="6" md="6" lg="3" xl="3">
                                        <Card>
                                            <Media className="p-20 cushion-card-media-option">
                                                <div className="radio radio-secondary mr-3">
                                                    <Input onChange={() => setOptionSelected("medium")} id="radio2" type="radio" name="radio2" checked={optionSelected === "medium" ? true : false} />
                                                    <Label for="radio2"></Label>
                                                </div>
                                                <Media body>
                                                    <h6 className="mt-0 mega-title-badge">Medium<span className="badge badge-secondary pull-right digits">{"MEDIUM SEVERITY"}</span></h6>
                                                    <p>{"This is the second LOWEST severity of the stages available, this stage/class doesn't require AS much immediate action."}</p>
                                                </Media>
                                            </Media>
                                        </Card>
                                    </Col>
                                    <Col sm="6" md="6" lg="3" xl="3">
                                        <Card>
                                            <Media className="p-20 cushion-card-media-option">
                                                <div className="radio radio-success mr-3">
                                                    <Input onChange={() => setOptionSelected("high")} id="radio3" type="radio" name="radio3" checked={optionSelected === "high" ? true : false} />
                                                    <Label for="radio3"></Label>
                                                </div>
                                                <Media body>
                                                    <h6 className="mt-0 mega-title-badge">High<span className="badge badge-success pull-right digits">{"HIGH SEVERITY"}</span></h6>
                                                    <p>{"This is a 'step-down' from the CRITICAL stage severity level - still, this vulnerability requires IMMEDIATE action."}</p>
                                                </Media>
                                            </Media>
                                        </Card>
                                    </Col>
                                    <Col sm="6" md="6" lg="3" xl="3">
                                        <Card>
                                            <Media className="p-20 cushion-card-media-option">
                                                <div className="radio radio-info mr-3">
                                                    <Input onChange={() => setOptionSelected("critical")} id="radio4" type="radio" name="radio4" checked={optionSelected === "critical" ? true : false} />
                                                    <Label for="radio4"></Label>
                                                </div>
                                                <Media body>
                                                    <h6 className="mt-0 mega-title-badge">Critical<span className="badge badge-info pull-right digits">{"CRITICAL SEVERITY"}</span></h6>
                                                    <p>{"This is the HIGHEST level of vulnerabilities/severity... This vulnerability requires IMMEDIATE action"}</p>
                                                </Media>
                                            </Media>
                                        </Card>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" lg="12" md="12" xl="12">
                        <Card className='shadow relative'>
                            <CardHeader className='b-l-info b-r-info'>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <div className='row-wrapper-submit-details'>
                                            <div className='wrapper-number-counter-absolute centered-both-ways'>
                                                <h1 className='numbernumber'>4</h1>
                                            </div> 
                                            <h3 className='header-submit-report'>Proof of Concept</h3>
                                        </div>
                                        <p style={{ marginTop: "12.5px" }} className='lead'>The proof of concept is the most important part of your report submission. Clear, reproducible steps will help us validate this issue as quickly as possible.</p>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Label htmlFor="exampleFormControlInput1">Title <strong style={{ color: "red" }}>*</strong> (A clear and concise title includes the type of vulnerability and the impacted asset) <strong style={{ color: "#7366ff", textDecorationLine: "underline" }}>Min 25 Character's</strong></Label>
                                    <InputGroup>
                                        <Input maxLength={150} value={title} onChange={(e) => setTitleResponse(e.target.value)} className="form-control"  type="text" placeholder="Enter your value here..." />
                                        <InputGroupAddon className={"transparentaddon"} addonType="append"><InputGroupText className={"transparentaddon-text"}>{typeof title !== "undefined" && title.length > 0 ? (150 - title.length) : 150}</InputGroupText></InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="row mb-0">
                                    <Label className="col-form-label">Description <strong style={{ color: "red" }}>*</strong> (What is the vulnerability? In clear steps, how do you reproduce it?) <strong style={{ color: "#7366ff", textDecorationLine: "underline" }}>Min 50 Character's</strong></Label>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <SimpleMDE
                                            id="description-text-entered"
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
                                            onChange={(value) => setDescriptionValue(value)}
                                            value={description}
                                            options={autofocusNoSpellcheckerOptions}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup style={{ marginTop: "22.5px", marginBottom: "22.5px" }} className="row mb-0">
                                    <Label className="col-form-label">Impact <strong style={{ color: "red" }}>*</strong> (What security impact could an attacker achieve?) <strong style={{ color: "#7366ff", textDecorationLine: "underline" }}>Min 25 Character's</strong></Label>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <textarea value={resultsText} onChange={(e) => {
                                            const caret = e.target.selectionStart;
                                            const element = e.target;
                                            window.requestAnimationFrame(() => {
                                                element.selectionStart = caret
                                                element.selectionEnd = caret
                                            })
                                            setResultsValue(e.target.value)
                                        }} placeholder={`Enter the impact of this hack/exploit...`} rows={10} className="form-control"></textarea>
                                    </Col>
                                </FormGroup>
                                <hr />
                                <Card>
                                    <CardHeader>
                                        <div className='row-wrapper-submit-details'>
                                            <div className='wrapper-number-counter-absolute centered-both-ways'>
                                                <h1 className='numbernumber'>5</h1>
                                            </div> 
                                            <h3 className='header-submit-report'>Supporting Docs/File(s)</h3>
                                        </div>
                                        <p style={{ marginTop: "12.5px" }} className='lead'>Select any relevant <strong>supporting files/items</strong> or any other supporting documents, images, or misc content that proves/backs your points and proves your hack/exploit</p>
                                    </CardHeader>
                                    <CardBody>
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
                                    </CardBody>
                                    <CardFooter className='b-l-info b-r-info'>
                                        <ListGroup>
                                            {typeof files !== "undefined" && files.length > 0 ? files.map((file, index) => {
                                                return (
                                                    <Fragment>
                                                        <ListGroupItem>{`${file.name} ~ ${file.type}`} <div className='absolute-right-cancel-delete'>
                                                            <i onClick={() => setFiles(prevState => {
                                                                return prevState.filter((item) => item.id !== file.id);
                                                            })} class="fa fa-solid fa-ban fa-2x"></i>
                                                        </div></ListGroupItem>
                                                    </Fragment>
                                                );
                                            }) : <h3 className='nothing-found-text text-center'>No file(s) have been uploaded yet..</h3>}
                                        </ListGroup>
                                    </CardFooter>
                                </Card>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" lg="12" md="12" xl="12">
                        <Card className='shadow relative'>
                            <CardHeader className='b-l-success b-r-success'>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <div className='row-wrapper-submit-details'>
                                            <div className='wrapper-number-counter-absolute centered-both-ways'>
                                                <h1 className='numbernumber'>6</h1>
                                            </div> 
                                            <h3 className='header-submit-report'>Handle Final Submission (Final-Step)</h3>
                                        </div>
                                        <p style={{ marginTop: "12.5px" }} className='lead'>Click the button below to proceed and upload your related/submitted content from the above form. Please make sure <strong style={{ color: "red" }}>all of the required information</strong> is <strong>FULLY</strong> completed and contains accurate/thourough details..</p>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Button className={"btn-square-success"} color={"success-2x"} outline style={{ width: "100%" }} onClick={handleFinalMainSubmission}>Submit Data & Completed Information/Data!</Button>
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
export default connect(mapStateToProps, { })(SubmitProgressUpdatesForEmployerHelper);
