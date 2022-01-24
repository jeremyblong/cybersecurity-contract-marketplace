import React, { Fragment, useRef, useState } from "react";
import "./styles.css";
import { connect } from "react-redux";
import helpers from "./helpers/miscFunctions.js";
import { Button, Row, Col, Card, CardBody, FormGroup, Label, Input, Media, InputGroup, InputGroupAddon, InputGroupText, Progress, ListGroupItem, Container } from 'reactstrap';
import Tour from 'reactour';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { updateCourseInformationData } from "../../../../../../../../redux/actions/courses/createNewCourse/index.js";
import _ from "lodash";
import ReactDragListView from "react-drag-listview";
import uuid from "react-uuid";
import moment from "moment";
import SheetHelperPaneUploadCourseContent from "./helpers/paneSheet.js";
import { shiftCoreStyles } from "../../../../../../../../redux/actions/universal/index.js";
import { Modal } from 'react-responsive-modal';
import { confirmAlert } from 'react-confirm-alert';
import ModalMoreInformationGuiadanceHelper from "./helpers/moreInformationModal.js";

const { 
    handleDeletionConfirmationOpen
} = helpers;


const steps = [
    {
      selector: '#navigate-to-redirect',
      content: `If you're a bit confused as to 'how' to 'upload/create' new course content to be sold and streamed on our platform, click this highlighted icon/button and we will open a modal with more detailed information regarding this matter...`,
    }
]

const CreateNewCoursePageTwo = ({ setProgress, updateCourseInformationData, courseData, shiftCoreStyles, coursesArray, overallProgress }) => {
    const scrollToTourWrapper = useRef(null);
    // state initialization
    const [ subtitle, setSubTitleValue ] = useState("");
    const [ stepOpen, setStepOpenState ] = useState(false);
    const [ modalOpen, setModalState ] = useState(false);
    const [ courseContent, setCourseContentList ] = useState([]); 
    const [ isOpen, setIsOpen ] = useState(false);
    const [ selectedCourseContent, setCourseContentState ] = useState(null);
    const [ isOpenModal, setIsOpenModalState ] = useState(false);

    const disableBodyAndScroll = target => {
        disableBodyScroll(target);        
    };
    // enable body!
    const enableBody = target => clearAllBodyScrollLocks();

    const handleTourActivate = () => {
        console.log("handleTourActivate ran...");

        scrollToTourWrapper.current.scrollIntoView();
        // alter slightly according to scroll behavior
        setTimeout(() => {
            window.scrollBy(0, -175);
        }, 300);
        // #navigate-to-redirect
        setTimeout(() => {
            setStepOpenState(true);
        }, 750)
    }
    const handleSubAddition = () => {
        console.log("handleSubAddition ran...");

        if (typeof coursesArray !== "undefined" && coursesArray.length > 0) {
            console.log("already exists...!");
            
            const createdDate = new Date();

            const addNew = {
                id: uuid(),
                dateTimeAdded: createdDate,
                video: null,
                sectionTitle: subtitle,
                formattedDate: moment(createdDate).format("MM/DD/YYYY hh:mm:ss a")
            };
            updateCourseInformationData({
                ...courseData,
                pageTwoData: {
                    courseContentSections: [...coursesArray, addNew]
                }
            });
            setSubTitleValue("");
        } else {
            console.log("doesnt exist...");

            const createdDate = new Date();

            const newState = [{
                id: uuid(),
                dateTimeAdded: createdDate,
                video: null,
                sectionTitle: subtitle,
                formattedDate: moment(createdDate).format("MM/DD/YYYY hh:mm:ss a")
            }];
            updateCourseInformationData({
                ...courseData,
                pageTwoData: {
                    courseContentSections: newState
                }
            });

            setSubTitleValue("");
        }
    }
    const dragProps = {
        onDragEnd(fromIndex, toIndex) {
            const data = [...courseData];
            const item = data.splice(fromIndex, 1)[0];
            data.splice(toIndex, 0, item);
            console.log(data);
            updateCourseInformationData(data)
        },
        nodeSelector: 'li',
        handleSelector: 'a'
    };
    const showConfirmAlert = (selected) => {
        confirmAlert({
            title: "You're about to delete this section/chunk",
            message: "Are you SURE you'd like to delete this section/chunk from your course material & content? If so, please proceed by clicking 'Yes, Delete!' to delete this item from your course content!",
            buttons: [
              {
                label: 'Yes, Delete!',
                onClick: () => {
                    // Delete
                    const filtered = courseData.filter((section, index) => {
                        if (section.id !== selected.id) {
                            return true;
                        }
                    });
                    updateCourseInformationData(filtered);
                }
              },
              {
                label: 'No, Cancel',
                onClick: () => {
                    // do nothing
                }
              }
            ]
        });
    }
    const handleSubmission = () => {
        console.log("handleSubmission ran...!");

        updateCourseInformationData({
            ...courseData,
            currentPage: 3
        })
    }
    return (
        <Fragment>
            <Tour
                steps={steps}
                isOpen={stepOpen}
                onAfterOpen={disableBodyAndScroll}
                onBeforeClose={enableBody}
                onRequestClose={() => {
                    setStepOpenState(false);
                }} 
            />
            <Modal classNames={{
                overlay: 'course-content-overlay-modal',
                modal: 'course-content-modal',
            }} open={isOpenModal} onClose={() => setIsOpenModalState(false)} center>
                <ModalMoreInformationGuiadanceHelper setIsOpenModalState={setIsOpenModalState} />
            </Modal>
            <SheetHelperPaneUploadCourseContent setCourseContentState={setCourseContentState} selectedCourseContent={selectedCourseContent} disableBodyScroll={disableBodyScroll} clearAllBodyScrollLocks={clearAllBodyScrollLocks} setProgress={setProgress} isOpen={isOpen} setIsOpen={setIsOpen} />

                <div className={"centered-horizontally-course"}>
                    <div className={"position-above-bar-percentage"}>
                        <h1>{overallProgress}% Complete</h1>
                    </div>
                    <Progress className={"course-creation-progress-bar"} animated color="info" value={overallProgress} />
                </div>
                <Container fluid={true}>
                    <Row>
                        <Col sm="12" md="12" lg="12" xl="12">
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <div ref={scrollToTourWrapper} id={"navigate-to-redirect"}>
                                                <Media className="p-20">
                                                    <div className="radio radio-info mr-3">
                                                        <Input id="radio66" type="radio" name="radio66" checked={modalOpen === true ? true : false} value={null} />
                                                        <Label for={"radio66"}></Label>
                                                    </div>
                                                    <Media body>
                                                        <h6 className="mt-0 mega-title-badge">Confused on how to upload 'Course-Content'?<span className="badge badge-info pull-right digits make-digits-larger-courses">{"Need Clarification/Help on how to upload new content?"}</span></h6>
                                                        <p>{"Are you unsure of 'what' or 'how' to upload course content & most of all organize the data in a manner that makes sense? We will guide you through the process but you can find a very detailed overview/guide by clicking the button just below this text...Click it to find out more!"}</p>
                                                        <hr />
                                                        <div className={"centered-both-ways"}>
                                                            <Button outline style={{ width: "50%" }} onClick={() => setIsOpenModalState(true)} className="btn-square-dark" color="dark" size="md">Get help, guidance OR clarification on uploading course's!</Button>
                                                        </div>
                                                        <p className="customized-course-lead">Basically, you will need to select the <strong>core</strong> details for your new course (which you've already done on page 1) and secondly (now) you will need to upload <strong>ONE (1) VIDEO</strong> per each added item in the list you generate/create below with the input/form & button to submit them. Simply, enter a "part" name and upload a video for that cooresponding part!</p>
                                                    </Media>
                                                </Media>
                                            </div>
                                        </Row>
                                        <ol className={"custom-ordered-list-courses"}>
                                            <li>Enter a name/title for your new segment (segment being a chunk or small portion of your overall course/content)</li>
                                            <li>Submit the title and it will automatically be added to the existing list (the course will be saved exactly as uploaded regarding the order)</li>
                                            <li>Upload a video to the cooresponding HIGHLIGHTED region and this new video will be attached to the highlighted segment (will replace any existing video/content if already exists)</li>
                                            <li>That's it! Proceed with your other course content...</li>
                                        </ol>
                                        <div className={"absolute-positioned-button-clear-redux"}>
                                            <Button id={"absolute-redux-clear-button"} onClick={() => handleDeletionConfirmationOpen()} className="btn-square-danger" color="danger" size="md">Clear ENTIRE Already Filled Course Data</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card>
                            <CardBody>
                                <Row style={{ paddingTop: "12.5px" }}>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <FormGroup className="m-form__group">
                                            <Label>Add a "Sub-Section Course Content" section with this form. If you're confused as to what this means, <strong style={{ color: "red" }} id="hover-a-uploading" onClick={() => handleTourActivate()}>click this</strong> to retreieve more details on <strong>how to create sellable content/courses</strong></Label>
                                            <InputGroup style={{ width: "100%" }}>
                                                <InputGroupAddon addonType="prepend"><InputGroupText>{"Add Course Section"}</InputGroupText></InputGroupAddon>
                                                <Input value={subtitle} onChange={(e) => setSubTitleValue(e.target.value)} className="form-control min-height-input-courses" name={"subtitle"} type="text" placeholder={"Enter a course sub-section title..."} />
                                                <InputGroupAddon addonType="prepend"><Button style={{ width: "100%" }} onClick={() => handleSubAddition()} className="btn-square-info" color="info" size="md">Add New Section</Button></InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <ReactDragListView {...dragProps}>
                                    <ul>
                                        {coursesArray.map((item, index) => {
                                            console.log("itenm!", item);
                                            return (
                                                <Fragment key={index}>
                                                    <ListGroupItem className="d-flex justify-content-between align-items-center">
                                                        <div id="left-chunk-course">
                                                            <img onClick={() => showConfirmAlert(item)} src={require("../../../../../../../../assets/icons/delete.png")} className={"view-more-icon"} />
                                                            <img onClick={() => {
                                                                setCourseContentState(item);
                                                                // DISABLE clicking background
                                                                shiftCoreStyles(true);
                                                                // set modal sheet pane OPEN/true
                                                                setIsOpen(true);
                                                                // lock after appropriate position change
                                                                setTimeout(() => {
                                                                    // LOCK page
                                                                    const select = document.querySelector(".enact-nonclick");

                                                                    disableBodyScroll(select);
                                                                }, 500)
                                                            }} src={require("../../../../../../../../assets/icons/view.png")} className={"view-more-icon"} />
                                                        </div>
                                                            <p className={"custom-strong-list-item"}>{item.sectionTitle}</p>
                                                        <a className="badge badge-secondary counter digits make-digits-larger-course-draggable">{"Use me to drag this item"}</a>
                                                    </ListGroupItem>
                                                </Fragment>
                                            );
                                        })}
                                    </ul>
                                </ReactDragListView>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card>
                            <CardBody>
                                <Button onClick={handleSubmission} className={"btn-square-secondary"} color={"secondary-2x"} outline style={{ width: "100%" }}>Submit & Continue W/Form Process</Button>
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
        userData: state.auth.data,
        coursesArray: (_.has(state.courseData, "courseData") && _.has(state.courseData.courseData, "pageTwoData") && _.has(state.courseData.courseData.pageTwoData, "courseContentSections")) ? state.courseData.courseData.pageTwoData.courseContentSections : [],
        courseData: _.has(state.courseData, "courseData") ? state.courseData.courseData : {}
    }
}
export default connect(mapStateToProps, { updateCourseInformationData, shiftCoreStyles })(CreateNewCoursePageTwo);