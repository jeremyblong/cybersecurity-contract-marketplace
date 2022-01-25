// helpers logic related to mainly to redux-hook-form
const HookCourseCreationHelpers = () => {
    
    const subtitleChecks = {
        check: (setError, register) => {
            return (
                {...register("subtitle", { required: {
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
        onChange: (e, setValue) => {
            const value = e.target.value;

            setValue("subtitle", value, { shouldValidate: true });
        },
        name: "subtitle",
        placeholder: "Enter a course 'Sub-Title' for your course...",
        type: "text",
        label: "Enter a course 'Sub-Title' for your course (this will be displayed right under your main description...)"
    };
    const languageSpokenChecks = {
        check: (setError, register, clearErrors) => {
            return (
                {...register("languageSpoken", { required: {
                    value: true,
                    message: "You MUST select a 'Language' option before proceeding forward"
                }, onBlur: (e) => {
                    // current value from this input
                    const value = e.target.value;
                    // timeout to delay for state change(s)
                    setTimeout(() => {
                        // clear error after proper selection
                        if ((typeof value !== "undefined") && (Object.keys(value).length > 0)) {
                            clearErrors("languageSpoken");
                        } else {
                            // set error as nothing was selected (blank 'click-off' selection of selector)
                            setError("languageSpoken", {
                                type: "manual",
                                message: "You MUST select a 'Language' option before proceeding forward",
                            });
                        }
                    }, 50);
                }})}
            )
        },
        onChange: (selectedOption, setValue, clearErrors) => {
            setValue("languageSpoken", selectedOption, { shouldValidate: false });

            setTimeout(() => {
                clearErrors("languageSpoken");
            }, 75)
        },
        name: "languageSpoken",
        placeholder: "Select a 'Language' type...",
        label: "Select what language your course is spoken/taught with/in"
    };
    const skillLevelChecks = {
        check: (setError, register, clearErrors) => {
            return (
                {...register("skillLevel", { required: {
                    value: true,
                    message: "You MUST select a 'Skill-Level' option before proceeding forward"
                }, onBlur: (e) => {
                    // current value from this input
                    const value = e.target.value;
                    // timeout to delay for state change(s)
                    setTimeout(() => {
                        // clear error after proper selection
                        if ((typeof value !== "undefined") && (Object.keys(value).length > 0)) {
                            clearErrors("skillLevel");
                        } else {
                            // set error as nothing was selected (blank 'click-off' selection of selector)
                            setError("skillLevel", {
                                type: "manual",
                                message: "You MUST select a 'Skill-Level' option before proceeding forward",
                            });
                        }
                    }, 50);
                }})}
            )
        },
        onChange: (selectedOption, setValue, clearErrors) => {
            
            setValue("skillLevel", selectedOption, { shouldValidate: false });

            setTimeout(() => {
                clearErrors("skillLevel");
            }, 75)
        },
        name: "skillLevel",
        placeholder: "Select a 'Skill Level'...",
        label: "Select what 'Skill Level' your course require's"
    };
    const primaryLanguageChecks = {
        check: (setError, register, clearErrors) => {
            return (
                {...register("primaryLanguageUsed", { required: {
                    value: true,
                    message: "You MUST select a 'Primary Language' option before proceeding forward"
                }, onBlur: (e) => {
                    // current value from this input
                    const value = e.target.value;
                    // timeout to delay for state change(s)
                    setTimeout(() => {
                        // clear error after proper selection
                        if ((typeof value !== "undefined") && (Object.keys(value).length > 0)) {
                            clearErrors("primaryLanguageUsed");
                        } else {
                            // set error as nothing was selected (blank 'click-off' selection of selector)
                            setError("primaryLanguageUsed", {
                                type: "manual",
                                message: "You MUST select a 'Primary Language' option before proceeding forward",
                            });
                        }
                    }, 50);
                }})}
            )
        },
        onChange: (selectedOption, setValue, clearErrors) => {
            
            setValue("primaryLanguageUsed", selectedOption, { shouldValidate: false });

            setTimeout(() => {
                clearErrors("primaryLanguageUsed");
            }, 75)
        },
        name: "primaryLanguageUsed",
        placeholder: "Select a 'Primary Language' used in this course...",
        label: `Select what language was 'primarily' used in this course regarding what 'CODING' language was used most in this course`
    };
    const hoursOfCourseContentChecks = {
        check: (setError, register, clearErrors) => {
            return (
                {...register("lengthInHours", { required: {
                    value: true,
                    message: "You MUST select a 'Course Content Length (in hour's)' option before proceeding forward"
                }, onBlur: (e) => {
                    // current value from this input
                    const value = e.target.value;
                    // timeout to delay for state change(s)
                    setTimeout(() => {
                        // clear error after proper selection
                        if ((typeof value !== "undefined") && (Object.keys(value).length > 0)) {
                            clearErrors("lengthInHours");
                        } else {
                            // set error as nothing was selected (blank 'click-off' selection of selector)
                            setError("lengthInHours", {
                                type: "manual",
                                message: "You MUST select a 'Course Content Length (in hour's)' option before proceeding forward",
                            });
                        }
                    }, 50);
                }})}
            )
        },
        onChange: (selectedOption, setValue, clearErrors) => {
            
            setValue("lengthInHours", selectedOption, { shouldValidate: false });

            setTimeout(() => {
                clearErrors("lengthInHours");
            }, 75)
        },
        name: "lengthInHours",
        placeholder: "Select 'How Many' hours this course consists of (LIVE CONTENT excluding test, quizes, etc...)",
        label: `Select 'How Many' hours this course length is limited to ONLY LIVE content while excluding quizes, tests, extra material, etc...`
    }
    const courseWelcomeMessageChecks = {
        check: (setError, register) => {
            return (
                {...register("welcomeMessage", { required: {
                    value: true,
                    message: "You MUST enter AT least 75 characters to 550 characters"
                }, minLength: {
                    value: 75,
                    message: "You must enter AT Least 75 characters"
                }, maxLength: {
                    value: 550,
                    message: "You may ONLY enter 550 characters or less"
                }})}
            )
        },
        onChange: (e, setValue) => {
            const value = e.target.value;

            setValue("welcomeMessage", value, { shouldValidate: true });
        },
        name: "welcomeMessage",
        placeholder: "Enter a 'Welcome Message' to send to your students AFTER student's subscribe/purchase your course content. This is essentially a personal message from you to your student's leading into the intro of your course!",
        type: "textarea",
        label: "Enter a 'Welcome Message' to send to your student's after successfully enrolling in your course"
    }
    const completionMessageChecks = {
        check: (setError, register) => {
            return (
                {...register("completionMessage", { required: {
                    value: true,
                    message: "You MUST enter AT least 75 characters to 550 characters"
                }, minLength: {
                    value: 75,
                    message: "You must enter AT Least 75 characters"
                }, maxLength: {
                    value: 550,
                    message: "You may ONLY enter 550 characters or less"
                }})}
            )
        },
        onChange: (e, setValue) => {
            const value = e.target.value;

            setValue("completionMessage", value, { shouldValidate: true });
        },
        name: "completionMessage",
        placeholder: "Enter a 'Completion Message' to send to your students AFTER student's successfully COMPLETE (fully complete) your course & all content involved. This is essentially a personal message from you to your student's after they successfully fully complete/finish your course!",
        type: "textarea",
        label: "Enter a 'Completion Message' to send to your student's after successfully COMPLETING your course"
    }

    return {
        subtitleChecks,
        languageSpokenChecks,
        hoursOfCourseContentChecks,
        skillLevelChecks,
        primaryLanguageChecks,
        completionMessageChecks,
        courseWelcomeMessageChecks
    }
}


export default HookCourseCreationHelpers;