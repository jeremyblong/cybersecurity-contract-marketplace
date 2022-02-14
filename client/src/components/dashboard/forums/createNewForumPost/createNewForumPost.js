import React, { Fragment, useState, useEffect, useRef, memo } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { CardBody, CardHeader, Card, Col, Container, Label, Row, Button, Form, InputGroupAddon, Input, InputGroup, FormGroup, InputGroupText } from "reactstrap";
import "./styles.css";
import Select from "react-dropdown-select";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import formHelpers from "./helpers/reduxFormHelpers/helperReduxForm.js";
import helpers from "./helpers/helperLogic.js";
import Sheet from 'react-modal-sheet';

const { CreateACommunityForumRelatedHelper } = helpers;

const mainDescriptionChecker = formHelpers().mainDescriptionChecker;

const options = [{
    label: "c/BlackHat",
    value: "c/BlackHat",
    memberCount: "17,556"
}, {
    label: "c/CryptoCurrency",
    value: "c/CryptoCurrency",
    memberCount: "37,875"
}, {
    label: "c/JavaScriptGalore",
    value: "c/JavaScriptGalore",
    memberCount: "106,887"
}, {
    label: "c/CodingCompeitions",
    value: "c/CodingCompeitions",
    memberCount: "90,017"
}, {
    label: "c/ShowerThoughts",
    value: "c/ShowerThoughts",
    memberCount: "45,786"
}, {
    label: "c/RedditThoughtsRandomized",
    value: "c/RedditThoughtsRandomized",
    memberCount: "7,886"
}, {
    label: "c/HackingTechniques",
    value: "c/HackingTechniques",
    memberCount: "3,677"
}]

const CreateNewForumPostingHelper = ({ userData }) => {

    const [ selectedGroup, setSelectedGroup ] = useState(null);
    const [ paneSheetOpen, openPaneSheet ] = useState(false);

    const { register, handleSubmit, control, reset, getValues, setValue, setError, clearErrors, formState: { errors }} = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur"
    });

    // get form-redux values
    const currentValues = getValues();

    console.log("errors", errors);

    const customDropdownRenderer = ({ props, state, methods }) => {
        return (
          <div>
            <div className="search-and-toggle">
              <h6 className="h6-forum-option-header">Your Communities</h6>
            </div>
            <div className="items-items">
              {selectedGroup === null ? options.slice(0, 6).map((option, index) => {
                  return (
                    <div
                        className={"options-mapped-div"}
                        key={index}
                        onClick={() => {
                            console.log("clicked.");

                            setSelectedGroup(option);
                        }}>
                        <img src={require(`../../../../assets/icons/reddit-${index + 1}.png`)} className={"community-icon-forum"} />
                        <div className="option-list-item-wrapper-forum">
                            <h5>{option.label}</h5>
                            <p className="membercount-forum-option">{option.memberCount} Member's</p>
                        </div>
                    </div>
                  );
                }) : null}
                {selectedGroup !== null ? <h4 className="selected-forum-option">You've Selected The <strong style={{ color: "#f73164", textDecorationLine: "underline" }}>{selectedGroup.label}</strong> community, <a onClick={() => setSelectedGroup(null)} href={null}><strong style={{ color: "#7366ff" }}>Click here</strong> to re-select another/different community</a></h4> : null}
            </div>
          </div>
        );
    };
    const renderFormError = (e, errors) => {
        console.log("errrror form logic...:", e, errors);
    }
    const handleForumSubmission = (data, other) => {
        console.log("Success!", data, other);
    }
    // const getLineAndCursorCallback = (position) => {
    //     setLineAndCursor(position);
    // };
    return (
        <Fragment>
            <Sheet draggable={false} isOpen={paneSheetOpen} onClose={() => openPaneSheet(false)}>
                <Sheet.Container>
                    <Sheet.Header>
                        <div style={{ margin: "12.5px" }} className="centered-both-ways">
                            <Button onClick={() => openPaneSheet(false)} className={"btn-square-danger"} outline color={"danger-2x"} style={{ width: "100%" }}>Exit/Close This Pane</Button>
                        </div>
                    </Sheet.Header>
                    <Sheet.Content>
                        <CreateACommunityForumRelatedHelper openPaneSheet={openPaneSheet} userData={userData} />
                    </Sheet.Content>
                    </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className="card-forum-creation" style={{ marginTop: "50px" }}>
                            <CardHeader className="b-l-info b-r-info">
                                <h3>Create a new forum post (Must be associated with a <a className="create-forum-post-a" href={null}>community</a>)</h3>
                            </CardHeader>
                            <CardBody>
                                <div className="position-right-create-group-btn">
                                    <Button onClick={() => openPaneSheet(true)} className={"btn-square-secondary"} color={"secondary-2x"} outline>Create a new community (sub-thread)</Button>
                                </div>
                                <Form className="needs-validation streaming-start-form-wrapper" noValidate="" onSubmit={handleSubmit(handleForumSubmission, (e, errors) => renderFormError(e, errors))}>
                                    <Select placeholder={"Search for a related 'community' to post in..."} dropdownRenderer={customDropdownRenderer} options={options} />
                                    {selectedGroup !== null ? <h6 className="selected-forum-option-non-dropdown">You've selected to post in the <strong style={{ color: "#f73164", textDecorationLine: "underline" }}>{selectedGroup.label}</strong> community/group!</h6> : null}
                                    <hr />
                                    <FormGroup className=" m-form__group">
                                        <Label>Post Title</Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend"><InputGroupText>{"Title"}</InputGroupText></InputGroupAddon>
                                            <Input onChange={() => {}} value={currentValues.title} name={"title"} placeholder={"Enter your post's title here..."} className="form-control" type="text" />
                                        </InputGroup>
                                    </FormGroup>
                                    <Label className="create-forum-label">{mainDescriptionChecker.label}</Label>
                                    <SimpleMDE
                                        {...mainDescriptionChecker.check(setError, register)} 
                                        id="Ref_container"
                                        onChange={(value) => mainDescriptionChecker.onChange(value, setValue)}
                                        value={currentValues.mainDescription}
                                        placeholder={mainDescriptionChecker.placeholder} 
                                        options={{
                                            autofocus: true,
                                            spellChecker: false
                                        }}
                                    />
                                    {errors.mainDescription ? <span className="span-tooltip">{errors.mainDescription.message}</span> : null}
                                    <Row style={{ marginTop: "27.5px" }}>
                                        <Col sm="12" md="12" lg="12" xl="12">
                                            <Button className={"btn-square-info"} color={"info-2x"} outline style={{ width: "100%" }} type={"submit"}>Submit New Form Post Details</Button>
                                        </Col>
                                    </Row>
                                </Form>
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
export default connect(mapStateToProps, {  })(CreateNewForumPostingHelper); 