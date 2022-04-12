import React, { Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Row, Col, Form, Label, Input, ListGroupItem, ListGroup, Button } from 'reactstrap';
import { WithContext as ReactTags } from 'react-tag-input';
import { NotificationManager } from "react-notifications";


const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

const suggestions = [];

const PageOneVideoCreationHelper = ({ saveNewDetails, jumpToStep, progress, setProgress }) => {

    const { register, handleSubmit, control, getValues, setValue, formState: { errors }} = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur"
    });

    const onSubmit = data => {

        if (data !== '') {
            
            console.log("Great success!");

            saveNewDetails(data);

            jumpToStep(1);
        } else {
            errors.showMessages();
        }
    };

    const gatheredValues = getValues();

    console.log("gatheredValues", gatheredValues);

    const handleDelete = (i) => {
        setValue("hashtags", gatheredValues.hashtags.filter((tag, index) => index !== i), { shouldValidate: true });
    }
    const handleAddition = (tag) => {
        setValue("hashtags", [...gatheredValues.hashtags, tag], { shouldValidate: true });
    }

    const handleDrag = (tag, currPos, newPos, tagggs) => {
        const tags = [...tagggs];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        return newTags;
    }

    const handleInputChange = (e) => {
        const { value, name } = e.target;

        setValue(name, value, { shouldValidate: true });
    }

    return (
        <Fragment>
            <Row>
                <Col sm="12">
                    <Form className="needs-validation" onSubmit={handleSubmit(onSubmit, (errorsss, e) => {
                        console.log("errrrrrs", errorsss, e);
                    })}>
                        <div className="form-row">
                            
                            <Col md="12 mb-3">
                                <Label>Video Title</Label>
                                <Input {...register("videoTitle", { required: {
                                    value: true,
                                    message: "You MUST enter a value between 15-125 characters"
                                }, minLength: {
                                    value: 15,
                                    message: "You must enter AT Least 15 characters"
                                }, maxLength: {
                                    value: 125,
                                    message: "You may ONLY enter 125 characters or less"
                                }})} className="form-control" onChange={(e) => handleInputChange(e)} value={gatheredValues.videoTitle} name="videoTitle" type="text" placeholder="Enter your 'video title' for this tutorial.." />
                                {errors.videoTitle ? <span className="span-tooltip">{errors.videoTitle.message}</span> : null}
                            </Col>
                            
                            <Col md="12 mb-3">
                                <Label>Video Subtitle</Label>
                                <Input {...register("videoSubtitle", { required: {
                                    value: true,
                                    message: "You MUST enter a value between 15-125 characters"
                                }, minLength: {
                                    value: 15,
                                    message: "You must enter AT Least 15 characters"
                                }, maxLength: {
                                    value: 125,
                                    message: "You may ONLY enter 125 characters or less"
                                }})} className="form-control" onChange={(e) => handleInputChange(e)} value={gatheredValues.videoSubtitle} name="videoSubtitle" type="text" placeholder="Enter your 'subtitle' for this tutorial.." />
                                {errors.videoSubtitle ? <span className="span-tooltip">{errors.videoSubtitle.message}</span> : null}
                            </Col>
                            <Col sm="12 mb-3" md="12 mb-3" lg="12 mb-3" xl="12 mb-3">
                                <Label>Enter relevant tags/hashtags (people will use these tags when searching for specific/condensed results) - <strong style={{ color: "blue" }}>5(MIN) - 15(MAX) Tags</strong></Label>
                                <ListGroup>
                                    <Controller
                                        control={control}
                                        name="hashtags"
                                        {...register("hashtags", { required: {
                                            value: true,
                                            message: "You MUST enter AT least 5 (five) tags up to a maximum of 15 (fifteen) tags"
                                        }})}
                                        render={({ field }) => (
                                            <ReactTags 
                                                {...field}
                                                tags={gatheredValues.hashtags}
                                                name={"hashtags"}
                                                suggestions={suggestions}
                                                classNames={{
                                                    tags: 'hashtagsTagsClass',
                                                    tagInput: 'hashtagsTagInputClass',
                                                    tagInputField: 'hashtagsTagInputFieldClass',
                                                    selected: 'hashtagsSelectedClass',
                                                    tag: 'hashtagsTagClass badge badge-primary',
                                                    remove: 'hashtagsRemoveClass',
                                                    suggestions: 'hashtagsSuggestionsClass',
                                                    activeSuggestion: 'hashtagsActiveSuggestionClass'
                                                }}
                                                handleDelete={(index) => {
                                                    setValue('hashtags', handleDelete(index, gatheredValues.hashtags), { shouldValidate: true });
                                                }}
                                                renderSuggestion={(suggestion) => {
                                                    // return list item(s)
                                                    return (
                                                        <ListGroupItem className="custom-suggestion-groupitem" key={suggestion.index} onClick={() => {
                                                            // run conditional checks
                                                            if (typeof gatheredValues.hashtags !== "undefined") {
                                                                if (gatheredValues.hashtags.length < 15) {
                                                                    if (gatheredValues.hashtags.length > 0) {
                                                                        setValue('hashtags', [...gatheredValues.hashtags, suggestion], { shouldValidate: true });
                                                                    } else {
                                                                        setValue('hashtags', [suggestion], { shouldValidate: true });
                                                                    }
                                                                } else {
                                                                    NotificationManager.warning('You have entered TOO many hashtags & we cannot add your current tag until some are removed.', "Too many hashtags!", 4250);
                                                                }
                                                            } else {
                                                                setValue('hashtags', [suggestion], { shouldValidate: true });
                                                            }
                                                        }}>{suggestion.text}</ListGroupItem>
                                                    );
                                                }}
                                                readOnly={false}
                                                placeholder={"Enter a tag (these are how people search & find your listing)"}
                                                maxLength={15}
                                                handleAddition={(tag) => {
                                                    if (typeof gatheredValues.hashtags !== "undefined") {
                                                        if (gatheredValues.hashtags.length < 15) {
                                                            if (gatheredValues.hashtags.length > 0) {
                                                                handleAddition(tag);
                                                            } else {
                                                                setValue('hashtags', [tag], { shouldValidate: true });
                                                            }
                                                        } else {
                                                            NotificationManager.warning('You have entered TOO many hashtags & we cannot add your current tag until some are removed.', "Too many hashtags!", 4500);
                                                        }
                                                    } else {
                                                        setValue('hashtags', [tag], { shouldValidate: true });
                                                    }
                                                }}
                                                handleDrag={(tag, currPos, newPos) => {
                                                    setValue('hashtags', handleDrag(tag, currPos, newPos, gatheredValues.hashtags), { shouldValidate: true });
                                                }}
                                                delimiters={delimiters} 
                                            />
                                            
                                        )}
                                    />
                                </ListGroup>
                                {errors.hashtags ? <span className="span-tooltip">{errors.hashtags.message}</span> : null}
                            </Col>
                            <Col sm="12 mb-3" md="12 mb-3" lg="12 mb-3" xl="12 mb-3">
                                <Label>Video Description</Label>
                                <Input {...register("description", { required: {
                                    value: true,
                                    message: "You MUST enter a value between 15-350 characters"
                                }, minLength: {
                                    value: 15,
                                    message: "You must enter AT Least 15 characters"
                                }, maxLength: {
                                    value: 350,
                                    message: "You may ONLY enter 350 characters or less"
                                }})} className="form-control" onChange={(e) => handleInputChange(e)} value={gatheredValues.description} name="description" type="textarea" rows={10} placeholder="Enter your 'video title' for this tutorial.." />
                                {errors.description ? <span className="span-tooltip">{errors.description.message}</span> : null}
                            </Col>
                        </div>
                        <Button type={"submit"} className={"btn-square-success"} color={"success"} style={{ width: "100%", marginBottom: "12.5px", marginTop: "12.5px" }}>Proceed Forward W/Next Step</Button>
                    </Form>
                </Col>
            </Row>
        </Fragment>
    );
};

export default PageOneVideoCreationHelper;