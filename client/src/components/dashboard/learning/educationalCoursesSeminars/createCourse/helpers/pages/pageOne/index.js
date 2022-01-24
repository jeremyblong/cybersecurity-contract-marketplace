import React, { Fragment, useState, useMemo, useEffect, useRef } from "react";
import Dropzone from 'react-dropzone-uploader';
import { Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupText, InputGroupAddon, Progress } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { ProgressLevel, UploadProjectFile } from '../../../../../../../../constant';
import reduxFormHelpers from "./helpers/reduxFormHelpers.js";
import optionHelper from "./helpers/options/options.js";
import Select from "react-select";
import helperFunctions from "./helpers/helperFunctions/index.js";
import SimpleMDE from "react-simplemde-editor";
import "./styles.css";
import uuid from "react-uuid";
import { Plus, Trash } from "react-feather";
import { NotificationManager } from "react-notifications";
import { updateCourseInformationData } from "../../../../../../../../redux/actions/courses/createNewCourse/index.js";
import _ from "lodash";

const courseTitle = reduxFormHelpers().courseTitle;
const courseCategory = reduxFormHelpers().courseCategory;
const descriptionChecks = reduxFormHelpers().descriptionChecks;
const pricing = reduxFormHelpers().pricing;
const objectiveChecks = reduxFormHelpers().objectiveChecks;
const courseDesignedForChecks = reduxFormHelpers().courseDesignedForChecks;
const prerequisitesChecks = reduxFormHelpers().prerequisitesChecks;

const { courseCategoryOptions, pricingOptions } = optionHelper;

const { CourseCreationHashtagHelper } = helperFunctions;


const CreateNewCoursePageOne = ({ overallProgress, setOverallProgress, updateCourseInformationData }) => {
    // create ref's local
    const courseCategoryGeneratedRef = useRef(null);
    const pricingGeneratedRef = useRef(null);
    const customHashtagsRef = useRef(null);
    let cursor = useRef(null);

    // state initialization
    const [ objectives, setObjectiveState ] = useState([
        {
            partCount0: "",
            id: uuid()
        }, {
            partCount1: "",
            id: uuid()
        }, {
            partCount2: "",
            id: uuid()
        }, {
            partCount3: "",
            id: uuid()
        }
    ]);
    const [ requirements, setRequirements ] = useState([
        {
            partCount0: "",
            id: uuid()
        }
    ]);
    const [ courseContentConcepts, setCourseContentConcepts ] = useState([
        {
            partCount0: "",
            id: uuid()
        }
    ]);
    useEffect(() => {
        setOverallProgress(25);
    }, []);
    // state init
    const [ hashtags, setHashtags ] = useState([]);
    const [ wordCount, setWordCount ] = useState(0);
    // redux form logic
    const { register, handleSubmit, control, resetField, unregister, getValues, array, setValue, setError, clearErrors, formState: { errors }} = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur"
    });
    // collect redux-hook-form values
    const currentValues = getValues();

    const renderErrorsFormUploadContent = (e, errors) => {
        console.log("renderErrorsFormUploadContent ran...", e, errors);
    }
    const onSubmission = (data, e) => {
        console.log("onSubmission ran...", e, data);

        const { objective0, objective1, objective2, objective3, concept0, courseCategory, courseHashtags, courseTitle, description, pricing, requirement0 } = data;

        // LEFT OUT ~ concept1, concept2

        const whatStudentsWillLearn = {
            objective0: typeof objective0 !== "undefined" ? objective0 : null,
            objective1: typeof objective1 !== "undefined" ? objective1 : null,
            objective2: typeof objective2 !== "undefined" ? objective2 : null,
            objective3: typeof objective3 !== "undefined" ? objective3 : null,
            objective4: typeof data.objective4 !== "undefined" ? data.objective4 : null,
            objective5: typeof data.objective5 !== "undefined" ? data.objective5 : null
        };
        const mainData = {
            courseTitle,
            courseCategory,
            courseHashtags,
            pricing,
            description
        };
        const requirementOrPreReqs = {
            requirement0: typeof requirement0 !== "undefined" ? requirement0 : null,
            requirement1: typeof data.requirement1 !== "undefined" ? data.requirement1 : null,
            requirement2: typeof data.requirement2 !== "undefined" ? data.requirement2 : null
        }
        const whoIsThisCourseFor = {
            concept0: typeof concept0 !== "undefined" ? concept0 : null,
            concept1: typeof data.concept1 !== "undefined" ? data.concept1 : null,
            concept2: typeof data.concept2 !== "undefined" ? data.concept2 : null
        }

        updateCourseInformationData({
            currentPage: 2,
            pageOneData: {
                whatStudentsWillLearn,
                mainData,
                requirementOrPreReqs,
                whoIsThisCourseFor
            }
        });
    }
    const autofocusNoSpellcheckerOptions = useMemo(() => {
        return {
          autofocus: false,
          spellChecker: false,
        };
    }, []);

    const handleDeletionRow = (item, index, type, reduxType) => {
        console.log("index main -:", index);
        // objective requirements concepts
        if (type === "objective") {
            
            const relevant = getValues(["objective0", "objective1", "objective2", "objective3", "objective4", "objective5"]);
            
            setObjectiveState(prevState => {
                // loop thru array
                for (let idxxxx = index; idxxxx < relevant.length; idxxxx++) {
                    const val = relevant[idxxxx];

                    if (typeof val === "undefined") {
                        unregister(["objective0", "objective1", "objective2", "objective3", "objective4", "objective5"])
                    } else {
                        setValue(`objective${idxxxx - 1}`, val, { shouldValidate: true });
                    }
                }
                return prevState.filter((x => {
                    if (x.id === item.id) {
                        return false;
                    } else {
                        return true;
                    }
                }));
            });
        } else if (type === "requirements") {

            const relevant = getValues(["requirement0", "requirement1", "requirement2"]);
            
            setRequirements(prevState => {
                // loop thru array
                for (let idxxxx = index; idxxxx < relevant.length; idxxxx++) {
                    const val = relevant[idxxxx];

                    if (typeof val === "undefined") {
                        unregister(["requirement0", "requirement1", "requirement2"])
                    } else {
                        setValue(`requirement${idxxxx - 1}`, val, { shouldValidate: true });
                    }
                }
                return prevState.filter((x => {
                    if (x.id === item.id) {
                        return false;
                    } else {
                        return true;
                    }
                }));
            });
        } else if (type === "concepts") {

            const relevant = getValues(["concept0", "concept1", "concept2"]);
            
            setCourseContentConcepts(prevState => {
                // loop thru array
                for (let idxxxx = index; idxxxx < relevant.length; idxxxx++) {
                    const val = relevant[idxxxx];

                    if (typeof val === "undefined") {
                        unregister(["concept0", "concept1", "concept2"])
                    } else {
                        setValue(`concept${idxxxx - 1}`, val, { shouldValidate: true });
                    }
                }
                return prevState.filter((x => {
                    if (x.id === item.id) {
                        return false;
                    } else {
                        return true;
                    }
                }));
            });
        }
    }
    console.log("CURRENT VALUES! :", currentValues, currentValues.length);
    return (
        <Fragment>
            <div className={"centered-horizontally-course"}>
                <div className={"position-above-bar-percentage"}>
                    <h1>{overallProgress}% Complete</h1>
                </div>
                <Progress className={"course-creation-progress-bar"} animated color="info" value={overallProgress} />
            </div>
            <Row>
                <Col sm="12" md="12" lg="12" xl="12">
                    <Card>
                        <CardBody>
                            <Form className="theme-form" onSubmit={handleSubmit(onSubmission, (e, errors) => {
                                return renderErrorsFormUploadContent(e, errors);
                            })}>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>{courseTitle.label}</Label>
                                        <Input {...courseTitle.check(setError, register)} autoFocus={true} ref={cursor} className="form-control" type={courseTitle.type} name={courseTitle.name} placeholder={courseTitle.placeholder} onChange={(e) => {
                                            courseTitle.onChange(e, setValue);
                                            const caret = e.target.selectionStart;
                                            const element = e.target;
                                            window.requestAnimationFrame(() => {
                                                element.selectionStart = caret
                                                element.selectionEnd = caret
                                            })
                                        }} value={currentValues.courseTitle} />
                                        {errors.courseTitle ? <span className="span-tooltip">{errors.courseTitle.message}</span> : null}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6" md="6" lg="6" xl="6">
                                    <FormGroup>
                                        <Label>{courseCategory.label}</Label>
                                        <Controller
                                            control={control}
                                            name={courseCategory.name}
                                            {...courseCategory.check(setError, register, clearErrors)}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    ref={courseCategoryGeneratedRef}
                                                    autoBlur={true}
                                                    placeholder={courseCategory.placeholder}
                                                    defaultValue={null}
                                                    onMenuClose={() => {
                                                        courseCategoryGeneratedRef.current.blur();
                                                    }}
                                                    value={currentValues.courseCategory}
                                                    onChange={(selectedOption) => courseCategory.onChange(selectedOption, setValue, clearErrors)}
                                                    options={courseCategoryOptions}
                                                />
                                            )}
                                        />
                                        {errors.courseCategory ? <span className="span-tooltip">{errors.courseCategory.message}</span> : null}
                                    </FormGroup>
                                </Col>
                                <Col sm="6" md="6" lg="6" xl="6">
                                    <FormGroup>
                                        <Label>{pricing.label}</Label>
                                        <Controller
                                            control={control}
                                            name={pricing.name}
                                            {...pricing.check(setError, register, clearErrors)}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    ref={pricingGeneratedRef}
                                                    autoBlur={true}
                                                    placeholder={pricing.placeholder}
                                                    defaultValue={null}
                                                    onMenuClose={() => {
                                                        pricingGeneratedRef.current.blur();
                                                    }}
                                                    value={currentValues.pricing}
                                                    onChange={(selectedOption) => pricing.onChange(selectedOption, setValue, clearErrors)}
                                                    options={pricingOptions}
                                                />
                                            )}
                                        />
                                        {errors.pricing ? <span className="span-tooltip">{errors.pricing.message}</span> : null}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12" md="12" lg="12" xl="12">
                                    <CourseCreationHashtagHelper customHashtagsRef={customHashtagsRef} setHashtags={setHashtags} hashtags={hashtags} setError={setError} register={register} values={currentValues} errors={errors} setValue={setValue} clearErrors={clearErrors} control={control} />
                                </Col>
                            </Row>
                            <Row style={{ paddingTop: "20px" }}>
                                <Col sm="12" md="12" lg="12" xl="12">
                                <Label>Enter a description for your listing (markdown is accepted - use the attached buttons to customize the way your content looks)</Label>
                                    <Controller
                                        control={control}
                                        name={descriptionChecks.name}
                                        value={currentValues.description}
                                        {...descriptionChecks.check(clearErrors, register, setError, currentValues, wordCount)}
                                        render={({ field: { ref, onChange, value, ...field }}) => (
                                            <Fragment>
                                                <SimpleMDE
                                                    ref={ref}
                                                    {...field}
                                                    placeholder={descriptionChecks.placeholder}
                                                    name={descriptionChecks.name}
                                                    onFocus={() => {
                                                        clearErrors("description");
                                                    }}
                                                    onBlur={() => descriptionChecks.onBlur(clearErrors, setError, currentValues, wordCount)}
                                                    id="editor_container"
                                                    onChange={(value) => {
                                                        onChange(value);
                                                        // return value for hook-form logic
                                                        return value;
                                                    }}
                                                    value={value}
                                                    options={autofocusNoSpellcheckerOptions}
                                                />
                                                {errors.description ? <span className="span-tooltip">{errors.description.message}</span> : null}
                                            </Fragment>
                                        )}
                                    />
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col sm="12" md="12" lg="12" xl="12">
                                    <h4 className={"course-custom-title"}>The following descriptions will be publicly visible on your Course Landing Page and will have a direct impact on your course performance. These descriptions will help learners decide if your course is right for them.</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12" md="12" lg="12" xl="12">
                                    <p className={"couse-create-p"}>The following descriptions will be publicly visible on your Course Landing Page and will have a direct impact on your course performance. These descriptions will help learners decide if your course is right for them.</p>
                                    <h5 className={"h5-custom-course"}>What will students learn in your course?</h5>
                                    You must enter at least 4 learning <a href={""} className={"important-course-link"}>objectives or outcomes</a> that learners can expect to achieve after completing your course.
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12" md="12" lg="12" xl="12">
                                    {objectives.map((objective, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <FormGroup style={{ paddingTop: "17.5px" }}>
                                                    <InputGroup>
                                                        <InputGroupAddon onClick={() => {
                                                            // reset input (recalculate order)
                                                            resetField(`objective${index}`);
                                                            // make changes to state (redux-hook-form)
                                                            handleDeletionRow(objective, index, "objective");
                                                        }} addonType="prepend"><InputGroupText style={{ backgroundColor: "#dc3545" }}><Trash style={{ color: "white" }} /></InputGroupText></InputGroupAddon>
                                                        <Input {...objectiveChecks.check(register, `objective${index}`)} onChange={(e) => {
                                                            // value
                                                            const value = e.target.value;
                                                            // create shallow array copy
                                                            const newArr = [...objectives];
                                                            // create new object w/changes
                                                            const newObj = { [`partCount${index}`]: value, id: objective.id };
                                                            // replace item
                                                            newArr[index] = newObj;
                                                            // render onChange logic
                                                            objectiveChecks.onChange(setValue, `objective${index}`, value);
                                                            // update relevant state
                                                            setObjectiveState(newArr);
                                                            // logic to KEEP current cursor position
                                                            const caret = e.target.selectionStart;
                                                            const element = e.target;
                                                            window.requestAnimationFrame(() => {
                                                                element.selectionStart = caret
                                                                element.selectionEnd = caret
                                                            })
                                                        }} value={currentValues[`objective${index}`]} name={`objective${index}`} className="form-control no-right-border-input" type="text" placeholder={objectiveChecks.placeholder}/>
                                                        <InputGroupAddon className={"counter-addon-transparent"} addonType="append"><InputGroupText>{typeof currentValues[`objective${index}`] !== "undefined" ? 160 - currentValues[`objective${index}`].length : 160}</InputGroupText></InputGroupAddon>
                                                    </InputGroup>
                                                    {errors[`objective${index}`] ? <span className="span-tooltip">{errors[`objective${index}`].message}</span> : null}
                                                    <hr />
                                                </FormGroup>
                                            </Fragment>
                                        );
                                    })}
                                </Col>
                            </Row>
                            <Row>
                                <div className={"float-right-absolute"}>
                                    <Button onClick={() => {
                                        if (objectives.length <= 5) {
                                            setObjectiveState(prevState => {
                                                return [...prevState, { [`partOne${objectives.length}`]: "", id: uuid() }]
                                            })
                                        } else {
                                            NotificationManager.warning("Error - You cannot enter TOO many inputs as there is a MAXIMUM of 6 TOTAL inputs/fields...Please use your existing fields.", "Too many fields/inputs!", 4500);
                                        }
                                    }} outline color={"primary-2x"} className={"btn-square primary"} style={{ width: "35%", border: "none" }}><Plus style={{ fontSize: 35, marginBottom: "-7.5px" }} /> Add Another Field</Button>
                                </div>
                            </Row>
                            <Row>
                                <Col sm="12" md="12" lg="12" xl="12">
                                    <h4 className={"course-custom-title"}>What are the requirements or prerequisites for taking your course?</h4>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: "25px" }}>
                                <Col sm="12" md="12" lg="12" xl="12">
                                    <p className={"couse-create-p"}>List the required skills, experience, tools or equipment learners should have prior to taking your course. <br /> If there are no requirements, use this space as an opportunity to lower the barrier for beginners.</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12" md="12" lg="12" xl="12">
                                    {requirements.map((requirement, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <FormGroup style={{ paddingTop: "17.5px" }}>
                                                    <InputGroup>
                                                        <InputGroupAddon onClick={() => {
                                                            // reset input (recalculate order)
                                                            resetField(`requirement${index}`);
                                                            // make changes to state (redux-hook-form)
                                                            handleDeletionRow(requirement, index, "requirements")
                                                        }} addonType="prepend"><InputGroupText style={{ backgroundColor: "#dc3545" }}><Trash style={{ color: "white" }} /></InputGroupText></InputGroupAddon>
                                                        <Input {...prerequisitesChecks.check(register, `requirement${index}`)} onChange={(e) => {
                                                            // value from input
                                                            const value = e.target.value;
                                                            // shallow copy
                                                            const newArr = [...requirements];
                                                            // new data obj
                                                            const newObj = { [`partCount${index}`]: value, id: requirement.id };
                                                            // replace item
                                                            newArr[index] = newObj;
                                                            // render onChange logic
                                                            prerequisitesChecks.onChange(setValue, `requirement${index}`, value);
                                                            // update the main state
                                                            setRequirements(newArr);
                                                            // logic to KEEP current cursor position
                                                            const caret = e.target.selectionStart;
                                                            const element = e.target;
                                                            window.requestAnimationFrame(() => {
                                                                element.selectionStart = caret
                                                                element.selectionEnd = caret
                                                            })
                                                        }} value={currentValues[`requirement${index}`]} name={`requirement${index}`} className="form-control no-right-border-input" type="text" placeholder={prerequisitesChecks.placeholder}/>
                                                        <InputGroupAddon className={"counter-addon-transparent"} addonType="append"><InputGroupText>{typeof currentValues[`requirement${index}`] !== "undefined" ? 160 - currentValues[`requirement${index}`].length : 160}</InputGroupText></InputGroupAddon>
                                                    </InputGroup>
                                                    {errors[`requirement${index}`] ? <span className="span-tooltip">{errors[`requirement${index}`].message}</span> : null}
                                                    <hr />
                                                </FormGroup>
                                            </Fragment>
                                        );
                                    })}
                                </Col>
                            </Row>
                            <Row>
                                <div className={"float-right-absolute"}>
                                    <Button onClick={() => {
                                        if (requirements.length <= 2) {
                                            setRequirements(prevState => {
                                                return [...prevState, { [`partOne${requirements.length}`]: "", id: uuid() }]
                                            })
                                        } else {
                                            NotificationManager.warning("Error - You cannot enter TOO many inputs as there is a MAXIMUM of 3 TOTAL inputs for this field...Please use your existing fields.", "Too many field's!", 4500);
                                        }
                                    }} outline color={"primary-2x"} className={"btn-square primary"} style={{ width: "35%", border: "none" }}><Plus style={{ fontSize: 35, marginBottom: "-7.5px" }} /> Add Another Field</Button>
                                </div>
                            </Row>
                            <Row>
                                <Col sm="12" md="12" lg="12" xl="12">
                                    <h4 className={"course-custom-title"}>Who is this course for?</h4>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: "25px" }}>
                                <Col sm="12" md="12" lg="12" xl="12">
                                    <p className={"couse-create-p"}>Write a clear description of the intended learners for your course who will find your course content valuable. <br /> This will help you attract the right learners to your course.</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12" md="12" lg="12" xl="12">
                                    {courseContentConcepts.map((concept, index) => {
                                        console.log("currentValues[`partCount${index}`]", currentValues[`partCount${index}`], concept);
                                        return (
                                            <Fragment key={index}>
                                                <FormGroup style={{ paddingTop: "17.5px" }}>
                                                    <InputGroup>
                                                        <InputGroupAddon onClick={() => {
                                                            // reset input (recalculate order)
                                                            resetField(`concept${index}`);
                                                            // make changes to state (redux-hook-form)
                                                            handleDeletionRow(concept, index, "concepts", `concept${index}`, currentValues[`concept${index}`]);
                                                        }} addonType="prepend"><InputGroupText style={{ backgroundColor: "#dc3545" }}><Trash style={{ color: "white" }} /></InputGroupText></InputGroupAddon>
                                                        <Input {...courseDesignedForChecks.check(register, `concept${index}`)} onChange={(e) => {
                                                            // value from input
                                                            const value = e.target.value;
                                                            // shallow copy
                                                            const newArr = [...courseContentConcepts];
                                                            // new data obj
                                                            const newObj = { [`partCount${index}`]: value, id: concept.id };
                                                            // replace item
                                                            newArr[index] = newObj;
                                                            // onchange handler
                                                            courseDesignedForChecks.onChange(setValue, `concept${index}`, value);
                                                            // update the main state
                                                            setCourseContentConcepts(newArr);
                                                            // logic to KEEP current cursor position
                                                            const caret = e.target.selectionStart;
                                                            const element = e.target;
                                                            window.requestAnimationFrame(() => {
                                                                element.selectionStart = caret
                                                                element.selectionEnd = caret
                                                            })
                                                        }} value={currentValues[`concept${index}`]} className="form-control no-right-border-input" type="text" placeholder={courseDesignedForChecks.placeholder}/>
                                                        <InputGroupAddon className={"counter-addon-transparent"} addonType="append"><InputGroupText>{typeof currentValues[`concept${index}`] !== "undefined" ? 160 - currentValues[`concept${index}`].length : 160}</InputGroupText></InputGroupAddon>
                                                    </InputGroup>
                                                    {errors[`concept${index}`] ? <span className="span-tooltip">{errors[`concept${index}`].message}</span> : null}
                                                    <hr />
                                                </FormGroup>
                                            </Fragment>
                                        );
                                    })}
                                </Col>
                            </Row>
                            <Row>
                                <div className={"float-right-absolute"}>
                                    <Button onClick={() => {
                                        if (courseContentConcepts.length <= 2) {
                                            setCourseContentConcepts(prevState => {
                                                return [...prevState, { [`partOne${courseContentConcepts.length}`]: "", id: uuid() }]
                                            })
                                        } else {
                                            NotificationManager.warning("Error - You cannot enter TOO many inputs as there is a MAXIMUM of 3 TOTAL inputs for this field...Please use your existing fields.", "Too many field's!", "Too many field's!", 4500);
                                        }
                                    }} outline color={"primary-2x"} className={"btn-square primary"} style={{ width: "35%", border: "none" }}><Plus style={{ fontSize: 35, marginBottom: "-7.5px" }} /> Add Another Field</Button>
                                </div>
                            </Row>
                            <Row style={{ marginTop: "42.5px" }}>
                                <Col>
                                    <FormGroup className="mb-0">
                                        <Button style={{ width: "100%" }} color="info-2x" outline className={"btn-square-info"} className="mr-3">Submit & Continue w/Process</Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data,
        courseData: _.has(state.courseData, "courseData") ? state.courseData.courseData : null
    }
}
export default connect(mapStateToProps, { updateCourseInformationData })(withRouter(CreateNewCoursePageOne));