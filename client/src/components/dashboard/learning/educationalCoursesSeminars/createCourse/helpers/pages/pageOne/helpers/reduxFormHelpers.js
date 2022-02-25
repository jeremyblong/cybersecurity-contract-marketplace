// helpers logic related to mainly to redux-hook-form
const HookHelpers = () => {
    
    const courseTitle = {
        check: (setError, register) => {
            return (
                {...register("courseTitle", { required: {
                    value: true,
                    message: "You MUST enter AT least 25 characters to 100 characters"
                }, minLength: {
                    value: 25,
                    message: "You must enter AT Least 25 characters"
                }, maxLength: {
                    value: 100,
                    message: "You may ONLY enter 100 characters or less"
                }})}
            )
        },
        onChange: (e, setValue) => {
            const value = e.target.value;

            setValue("courseTitle", value, { shouldValidate: true });
        },
        name: "courseTitle",
        placeholder: "Enter a 'Course Title'",
        type: "text",
        label: "Course Title"
    };
    const objectiveChecks = {
        check: (register, name) => {
            return (
                {...register(name, { required: {
                    value: true,
                    message: "You MUST enter AT least 25 characters to 160 characters"
                }, minLength: {
                    value: 25,
                    message: "You must enter AT Least 25 characters"
                }, maxLength: {
                    value: 160,
                    message: "You may ONLY enter 160 characters or less"
                }})}
            )
        },
        onChange: (setValue, name, value) => {
            // update react-hook-form value(s)
            setValue(name, value, { shouldValidate: true });
        },
        placeholder: "Example: Define the roles and responsibilities of a project manager",
        type: "text"
    };
    const prerequisitesChecks = {
        check: (register, name) => {
            return (
                {...register(name, { required: {
                    value: true,
                    message: "You MUST enter AT least 25 characters to 160 characters"
                }, minLength: {
                    value: 25,
                    message: "You must enter AT Least 25 characters"
                }, maxLength: {
                    value: 160,
                    message: "You may ONLY enter 160 characters or less"
                }})}
            )
        },
        onChange: (setValue, name, value) => {
            // update react-hook-form value(s)
            setValue(name, value, { shouldValidate: true });
        },
        placeholder: "Example: No programming experience needed. You will learn everything you need to know",
        type: "text"
    };
    const courseDesignedForChecks = {
        check: (register, name) => {
            return (
                {...register(name, { required: {
                    value: true,
                    message: "You MUST enter AT least 25 characters to 160 characters"
                }, minLength: {
                    value: 25,
                    message: "You must enter AT Least 25 characters"
                }, maxLength: {
                    value: 160,
                    message: "You may ONLY enter 160 characters or less"
                }, onBlur: (e) => {
                    // code here...
                }})}
            )
        },
        onChange: (setValue, name, value) => {
            // update react-hook-form value(s)
            setValue(name, value, { shouldValidate: true });
        },
        placeholder: "Example: Beginner Python developers curious about data science",
        type: "text",
        label: "Course Title"
    }
    const courseCategory = {
        check: (setError, register, clearErrors) => {
            return (
                {...register("courseCategory", { required: {
                    value: true,
                    message: "You MUST select a 'category' option before proceeding forward"
                }, onBlur: (e) => {
                    // code here...
                    console.log("blur - e", e);
                    // current value from this input
                    const value = e.target.value;
                    // timeout to delay for state change(s)
                    setTimeout(() => {
                        // clear error after proper selection
                        if ((typeof value !== "undefined") && (Object.keys(value).length > 0)) {
                            clearErrors("courseCategory");
                        } else {
                            // set error as nothing was selected (blank 'click-off' selection of selector)
                            setError("courseCategory", {
                                type: "manual",
                                message: "You MUST select a 'category' option before proceeding forward",
                            });
                        }
                    }, 50);
                }})}
            )
        },
        onChange: (selectedOption, setValue, clearErrors) => {
            console.log("value changed...:", selectedOption);
            
            setValue("courseCategory", selectedOption, { shouldValidate: false });

            setTimeout(() => {
                clearErrors("courseCategory");
            }, 75)
        },
        name: "courseCategory",
        placeholder: "Select a category/group type",
        label: "Select a category for your course"
    };
    const pricing = {
        check: (setError, register, clearErrors) => {
            return (
                {...register("pricing", { required: {
                    value: true,
                    message: "You MUST select a 'pricing' option before proceeding forward"
                }, onBlur: (e) => {
                    // code here...
                    console.log("blur - e", e);
                    // current value from this input
                    const value = e.target.value;
                    // timeout to delay for state change(s)
                    setTimeout(() => {
                        // clear error after proper selection
                        if ((typeof value !== "undefined") && (Object.keys(value).length > 0)) {
                            clearErrors("pricing");
                        } else {
                            // set error as nothing was selected (blank 'click-off' selection of selector)
                            setError("pricing", {
                                type: "manual",
                                message: "You MUST select a 'pricing' option before proceeding forward",
                            });
                        }
                    }, 50);
                }})}
            )
        },
        onChange: (selectedOption, setValue, clearErrors) => {
            console.log("value changed...:", selectedOption);
            
            setValue("pricing", selectedOption, { shouldValidate: false });

            setTimeout(() => {
                clearErrors("pricing");
            }, 75)
        },
        name: "pricing",
        placeholder: "Select a pricing option...",
        label: "Select a 'pricing option' for your course"
    };
    const hashtagsChecker = {
        check: (register, name) => {
            return (
                {...register(name, { required: {
                    value: true,
                    message: "You MUST enter AT least 5 hashtags/tags before attempting to continue"
                }})}
            )
        },
        onBlurred: (tags, setValue, clearErrors, setError) => {
            setValue("courseHashtags", tags, { shouldValidate: true });
            // timeout to delay for state change(s)
            setTimeout(() => {
                // clear error after proper selection
                if ((typeof tags !== "undefined") && (tags.length >= 5 && tags.length <= 15)) {
                    clearErrors("courseHashtags");
                } else {
                    // set error as nothing was selected (blank 'click-off' selection of selector)
                    setError("courseHashtags", {
                        type: "manual",
                        message: "You MUST enter BETWEEN 5-15 hashtags/tags before attempting to continue",
                    });
                }
            }, 100);
        },
        placeholder: "Enter between 5-15 hashtags/tags...",
        type: "text",
        label: "Enter BETWEEN 5-15 hashtags to proceed forward - people will use these to find your specific course..."
    };
    const descriptionChecks = {
        check: (clearErrors, register, setError, currentValues, wordCount) => {
            return (
                {...register("description", { required: {
                    value: true,
                    message: "You must enter AT least 1000 characters OR 200 words to proceed"
                }, minLength: {
                    value: 1000,
                    message: "You must enter AT least 1000 characters OR 200 words to proceed"
                }, maxLength: {
                    value: 6000,
                    message: "You may only enter up to a max of 6000 characters or 475 words"
                }})}
            );
        },
        onBlur: (clearErrors, setError, currentValues, wordCount) => {

            console.log("blurred dynamic description");

            const description = currentValues.description;

            setTimeout(() => {
                if ((typeof description !== "undefined") && ((description.length >= 1000) && (description.length <= 6000))) {
                    clearErrors("description");
                } else {
                    if ((typeof description !== "undefined") && description.length !== 0) {
                        if ((wordCount >= 200) || ((typeof description !== "undefined" && description.length <= 1000) && (description.length >= 0))) {
                            console.log("one ran!");

                            setError("description", {
                                type: "manual",
                                message: "You must enter AT least 1000 characters OR 200 words to proceed",
                            });
                        } else if ((wordCount >= 475) && ((typeof description !== "undefined" && description.length >= 6000))) {
                            console.log("two ran!");

                            setError("description", {
                                type: "manual",
                                message: "You may only enter up to a max of 6000 characters OR a maximum of 475 words",
                            });
                        } else {
                            console.log("three ran!");

                            setError("description", {
                                type: "manual",
                                message: "You must enter between 1000-6000 characters to proceed or a minimum of 200 words",
                            });
                        }
                    } else {
                        setError("description", {
                            type: "manual",
                            message: "You must enter a valid value for this input - we have detected that no data is currently in the input",
                        });
                    }
                }
            }, 50)
        },
        placeholder: "Enter your text here... (You can use MARKUP & various text styling tools with the bar above)",
        name: "description"
    }

    return {
        courseTitle,
        courseCategory,
        hashtagsChecker,
        descriptionChecks,
        pricing,
        objectiveChecks,
        prerequisitesChecks,
        courseDesignedForChecks
    }
}


export default HookHelpers;