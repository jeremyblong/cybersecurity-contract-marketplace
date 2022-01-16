// helpers logic related to mainly to redux-hook-form
const HookHelpers = () => {
    // start helper creations...
    const listingTitleChecker = {
        check: (setError, register) => {
            return (
                {...register("listingTitle", { required: {
                    value: true,
                    message: "You MUST enter AT least 15 characters to 75 characters"
                }, minLength: {
                    value: 15,
                    message: "You must enter AT Least 15 characters"
                }, maxLength: {
                    value: 75,
                    message: "You may ONLY enter 75 characters or less"
                }})}
            )
        },
        onChange: (e, setValue) => {
            const value = e.target.value;

            setValue("listingTitle", value, { shouldValidate: false });
        },
        name: "listingTitle",
        placeholder: "Enter a stream title...",
        type: "text",
        label: "Enter a stream title (this will be displayed first/foremost w/other streams)"
    };
    const subcategoryChecker = {
        check: (setError, register, values, errors, name, clearErrors) => {
            return (
                {...register(name, { required: {
                    value: true,
                    message: "You MUST select an option before starting your LIVE stream"
                }, onBlur: (e) => {
                    // log to check whats returned

                    const value = e.target.value;
                    // timeout to delay for state change(s)
                    setTimeout(() => {
                        // clear error after proper selection
                        if ((typeof value !== "undefined") && (Object.keys(value).length > 0)) {
                            clearErrors(name);
                        } else {
                            // set error as nothing was selected (blank 'click-off' selection of selector)
                            setError(name, {
                                type: "manual",
                                message: "You MUST select an option before starting your LIVE stream",
                            });
                        }
                    }, 50);
                }})}
            )
        },
        name: "subCategory",
        placeholder: "Enter a 'sub' category for your live stream (stream filtration)...",
        type: "text",
        label: "Stream Sub-Category"
    };
    const hashtagsChecker = {
        check: (setError, register, values, errors, name, clearErrors) => {
            return (
                {...register(name, { required: {
                    value: true,
                    message: "You MUST enter AT least 5 hashtags/tags before attempting to continue"
                }})}
            )
        },
        onBlurred: (tags, setValue, clearErrors, setError) => {
            setValue("streamHashtags", tags, { shouldValidate: true });
            // timeout to delay for state change(s)
            setTimeout(() => {
                // clear error after proper selection
                if ((typeof tags !== "undefined") && (tags.length >= 5 && tags.length <= 15)) {
                    clearErrors("streamHashtags");
                } else {
                    // set error as nothing was selected (blank 'click-off' selection of selector)
                    setError("streamHashtags", {
                        type: "manual",
                        message: "You MUST enter BETWEEN 5-15 hashtags/tags before attempting to continue",
                    });
                }
            }, 100);
        },
        placeholder: "Enter between 5-15 hashtags/tags...",
        type: "text",
        label: "Enter BETWEEN 5-15 hashtags to proceed forward - people will use these to find your live stream..."
    };
    const calculateBlurOrNot = (e, clearErrors, name, setError) => {
        // deconstruct value
        const valueLen = e.target.value.length;
        // timeout to delay for state change(s)
        setTimeout(() => {
            // clear error after proper selection
            if (valueLen >= 50) {
                if (valueLen <= 1000) {
                    clearErrors(name);
                } else {
                    // set error - TOO many characters
                    setError(name, {
                        type: "manual",
                        message: "You may ONLY enter 1000 characters or less",
                    });
                }
            } else {
                // NOT Long enough
                setError(name, {
                    type: "manual",
                    message: "You MUST enter AT Least 50 characters",
                });
            }
        }, 100);
    }
    const mainDescriptionChecker = {
        check: (setError, register) => {
            return (
                {...register("mainDescription", { required: {
                    value: true,
                    message: "You MUST enter AT least 50 characters to 1000 characters"
                }, minLength: {
                    value: 50,
                    message: "You MUST enter AT Least 50 characters"
                }, maxLength: {
                    value: 1000,
                    message: "You may ONLY enter 1000 characters or less"
                }})}
            )
        },
        onBlur: (e, clearErrors, name, setError) => calculateBlurOrNot(e, clearErrors, name, setError),
        onChange: (value, setValue) => {
            setValue("mainDescription", value, { shouldValidate: false });
        },
        name: "mainDescription",
        placeholder: "Enter a detailed or basic (totally up to you but at least include 50 characters) for your description",
        type: "textarea",
        label: "Enter a description for your live stream (AT-LEAST 50 characters)"
    };
    const handleSubcategoryCheckerChange = (selectedOption, setValue, subCategoryRefSelector) => {
        // run conditionals
        setValue('subCategory', selectedOption, { shouldValidate: false });

        subCategoryRefSelector.current.blur();
    }
    return {
        hashtagsChecker,
        subcategoryChecker,
        handleSubcategoryCheckerChange,
        listingTitleChecker,
        mainDescriptionChecker
    }
}


export default HookHelpers;