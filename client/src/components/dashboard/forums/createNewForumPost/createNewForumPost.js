import React, { Fragment, useState, useEffect, useMemo } from "react";
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
import LoadingBar from 'react-top-loading-bar'
import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";


const { CreateACommunityForumRelatedHelper, PaneSheetOpenTwoHelper } = helpers;

const mainDescriptionChecker = formHelpers().mainDescriptionChecker;
const postTitleChecker = formHelpers().postTitleChecker;
const communityChecks = formHelpers().communityChecks;

const CreateNewForumPostingHelper = ({ userData }) => {

    const [ selectedGroup, setSelectedGroup ] = useState(null);
    const [ paneSheetOpen, openPaneSheet ] = useState(false);
    const [ progress, setProgress ] = useState(0);
    const [ options, setOptions ] = useState([]);
    const [ paneTwoOpen, openPaneTwoSheet ] = useState(false);

    const history = useHistory();

    const { register, handleSubmit, control, reset, getValues, setValue, setError, clearErrors, formState: { errors }} = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur"
    });

    useEffect(() => {
        const config = {
            params: {
                signedinID: userData.uniqueId
            }
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/related/user/groups/communities`, config).then((res) => {
            if (res.data.message === "Successfully fetched the desired communities!") {
                console.log(res.data);

                const { communities } = res.data;

                setOptions(communities);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log("Err critical", err);
        })
    }, [])

    // get form-redux values
    const currentValues = getValues();

    console.log("errors", errors);

    console.log("selectedGroup", selectedGroup);

    const customDropdownRenderer = (onChange) => {
        return (
          <div>
            <div className="search-and-toggle">
              <h6 className="h6-forum-option-header">Your Communities</h6>
            </div>
            <div className="items-items">
                {selectedGroup === null ? options.map((option, index) => {
                    return (
                        <div
                            className={"options-mapped-div"}
                            key={index}
                            onClick={() => {
                                console.log("clicked.");

                                onChange(option, setValue, clearErrors);

                                setSelectedGroup(option);
                            }}>
                            <img src={`${process.env.REACT_APP_ASSET_LINK}/${option.communityMainPic.link}`} className={"community-icon-forum"} />
                            <div className="option-list-item-wrapper-forum">
                                <h5>{option.communityName}</h5>
                                <p className="membercount-forum-option">{option.members.length} Member's</p>
                            </div>
                        </div>
                    );
                }) : null}
                {selectedGroup !== null ? <h4 className="selected-forum-option">You've Selected The <strong style={{ color: "#f73164", textDecorationLine: "underline" }}>{selectedGroup.communityName}</strong> community, <a onClick={() => setSelectedGroup(null)} href={null}><strong style={{ color: "#7366ff" }}>Click here</strong> to re-select another/different community</a></h4> : null}
            </div>
          </div>
        );
    };
    const renderFormError = (e, errors) => {
        console.log("errrror form logic...:", e, errors);
    }
    const handleForumSubmission = (data) => {
        console.log("Success!", data);

        const { communityName, mainDescription, title } = data;

        const config = {
            signedinID: userData.uniqueId,
            communityName, 
            mainDescription, 
            title
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/post/new/forum/post/to/community`, config).then((res) => {
            if (res.data.message === "Successfully posted to the desired community!") {
                console.log(res.data);

                const { updatedCommunity } = res.data;

                setTimeout(() => {
                    history.push("/forum/main/homepage");
                }, 4500);

                NotificationManager.success("Successfully posted your forum posting to the desired community & your listing/post is now LIVE!", "Successfully posted your NEW forum post!", 4750);

            } else {
                console.log("Err", res.data);

                NotificationManager.error("An error occurred while attempting to post your forum posting to the desired community, please try again or contact support if the problem persists!", "Error attempting to post forum posting!", 4750);
            }
        }).catch((err) => {
            console.log("Err critical", err);

            NotificationManager.error("An error occurred while attempting to post your forum posting to the desired community, please try again or contact support if the problem persists!", "Error attempting to post forum posting!", 4750);
        })
    }
    const autofocusNoSpellcheckerOptions = useMemo(() => {
        return {
          autofocus: false,
          spellChecker: false,
        }
    }, []);

    const handleGroupCommunitySelection = (community) => {
        setValue("communityName", community, { shouldValidate: true });
        clearErrors(["communityName"])

        setSelectedGroup(community);

        openPaneTwoSheet(false);
    }
    return (
        <Fragment>
            <LoadingBar onLoaderFinished={() => setProgress(0)} progress={progress} color={"#51bb25"} containerClassName={"loader-container-classname-forum"} height={9} />
            <Sheet draggable={false} isOpen={paneSheetOpen} onClose={() => openPaneSheet(false)}>
                <Sheet.Container>
                    <Sheet.Header>
                        <div style={{ margin: "12.5px" }} className="centered-both-ways">
                            <Button onClick={() => openPaneSheet(false)} className={"btn-square-danger"} outline color={"danger-2x"} style={{ width: "100%" }}>Exit/Close This Pane</Button>
                        </div>
                    </Sheet.Header>
                    <Sheet.Content>
                        <CreateACommunityForumRelatedHelper setOptions={setOptions} setProgress={setProgress} openPaneSheet={openPaneSheet} userData={userData} />
                    </Sheet.Content>
                    </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
            <Sheet draggable={false} isOpen={paneTwoOpen} onClose={() => openPaneTwoSheet(false)}>
                <Sheet.Container>
                    <Sheet.Header>
                        <div style={{ margin: "12.5px" }} className="centered-both-ways">
                            <Button onClick={() => openPaneTwoSheet(false)} className={"btn-square-danger"} outline color={"danger-2x"} style={{ width: "100%" }}>Exit/Close This Pane</Button>
                        </div>
                    </Sheet.Header>
                    <Sheet.Content>
                        <PaneSheetOpenTwoHelper handleGroupCommunitySelection={handleGroupCommunitySelection} setOptions={setOptions} setProgress={setProgress} openPaneTwoSheet={openPaneTwoSheet} userData={userData} />
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
                                <Row>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <div className="position-right-create-group-btn">
                                            <Button onClick={() => openPaneSheet(true)} className={"btn-square-secondary"} color={"secondary-2x"} style={{ width: "100%" }} outline>Create a new community (sub-thread)</Button>
                                        </div>
                                    </Col>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <div className="position-right-actually-create-group-btn">
                                            <Button onClick={() => openPaneTwoSheet(true)} className={"btn-square-info"} color={"info-2x"} style={{ width: "100%" }} outline>Select a community (sub-thread) to post to</Button>
                                        </div>
                                    </Col>
                                </Row>
                                <Form className="needs-validation streaming-start-form-wrapper" noValidate="" onSubmit={handleSubmit(handleForumSubmission, (e, errors) => renderFormError(e, errors))}>
                                    <Select {...communityChecks.check(setError, register)} placeholder={"Search for a related 'community' to post in..."} dropdownRenderer={() => customDropdownRenderer(communityChecks.onChange)} options={options} />
                                    {errors.communityName ? <span className="span-tooltip">{errors.communityName.message}</span> : null}
                                    {selectedGroup !== null ? <h6 className="selected-forum-option-non-dropdown">You've selected to post in the <strong style={{ color: "#f73164", textDecorationLine: "underline" }}>{selectedGroup.communityName}</strong> community/group!</h6> : null}
                                    <hr />
                                    <FormGroup className=" m-form__group">
                                        <Label>{postTitleChecker.label}</Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend"><InputGroupText>{"Title"}</InputGroupText></InputGroupAddon>
                                            <Input {...postTitleChecker.check(setError, register)}  onChange={(e) => postTitleChecker.onChange(e.target.value, setValue)} value={currentValues.title} name={"title"} placeholder={postTitleChecker.placeholder} className="form-control" type="text" />
                                        </InputGroup>
                                        {errors.title ? <span className="span-tooltip">{errors.title.message}</span> : null}
                                    </FormGroup>
                                    <Label className="create-forum-label">{mainDescriptionChecker.label}</Label>
                                    <SimpleMDE
                                        {...mainDescriptionChecker.check(setError, register)} 
                                        id="Ref_container"
                                        onChange={(value) => mainDescriptionChecker.onChange(value, setValue)}
                                        value={currentValues.mainDescription}
                                        placeholder={mainDescriptionChecker.placeholder} 
                                        options={autofocusNoSpellcheckerOptions}
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