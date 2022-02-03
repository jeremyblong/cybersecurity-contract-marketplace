// helpers logic related to mainly to redux-hook-form
const CommentsIndividualPostHelper = () => {

    const checkMessageMeetsCritera = {
        check: (setError, register, clearErrors, name) => {
            return (
                {...register(name, { required: {
                    value: true,
                    message: "You MUST enter a value for this field between 50 and 450 charactors"
                }, minLength: {
                    value: 50,
                    message: "You MUST enter AT Least 50 characters"
                }, maxLength: {
                    value: 450,
                    message: "You may ONLY enter 450 characters or less"
                }, onBlur: (e) => {
                    console.log("blurred/");
                    // deconstruct actual value
                    const value = e.target.value;
                    // deconstruct length
                    const len = value.length;
                    // check if both min/max values met
                    if ((len > 0) && (len >= 50) && (len <= 450)) {
                        // clear error
                        clearErrors(name);
                    } else {
                        // set error
                        setTimeout(() => {
                            setError(name, {
                                type: "manual",
                                message: "You MUST enter between 50 and 450 charectors total when 'leaving a comment' before proceeding...",
                            });
                        }, 50);
                    }
                }})}
            );
        },
        onChange: (e, name, setValue) => {
            // deconstruct actual value
            const value = e.target.value;
            // set new value
            setValue(name, value, { shouldValidate: true })
        },
        label: "Drop/Leave a comment (communicate w/others, leave reviews, post thoughts, etc...)",
        name: "comment",
        placeholder: "Enter a comment to leave a comment on this course information, this comment will be fully-public so please be precise with whatever you say & be honest/helpful to other hacker's/student's... (Please enter between 50 and 450 charector's total)"
    }
    const homepageCheckMessageMeetsCritera = {
        check: (setError, register, clearErrors, name) => {
            return (
                {...register(name, { required: {
                    value: true,
                    message: "You MUST enter a value for this field between 50 and 450 charactors"
                }, minLength: {
                    value: 50,
                    message: "You MUST enter AT Least 50 characters"
                }, maxLength: {
                    value: 450,
                    message: "You may ONLY enter 450 characters or less"
                }, onBlur: (e) => {
                    console.log("blurred/");
                    // deconstruct actual value
                    const value = e.target.value;
                    // deconstruct length
                    const len = value.length;
                    // check if both min/max values met
                    if ((len > 0) && (len >= 50) && (len <= 450)) {
                        // clear error
                        clearErrors(name);
                    } else {
                        // set error
                        setTimeout(() => {
                            setError(name, {
                                type: "manual",
                                message: "You MUST enter between 50 and 450 charectors total when 'leaving a comment' before proceeding...",
                            });
                        }, 50);
                    }
                }})}
            );
        },
        onChange: (e, name, setValue) => {
            // deconstruct actual value
            const value = e.target.value;
            // set new value
            setValue(name, value, { shouldValidate: true })
        },
        label: "Drop/Leave a comment (communicate w/others, leave reviews, post thoughts, etc...)",
        name: "homepageComment",
        placeholder: "Enter a comment to leave a comment on this course information, this comment will be fully-public so please be precise with whatever you say & be honest/helpful to other hacker's/student's... (Please enter between 50 and 450 charector's total)"
    }
    // return values to other component
    return {
        homepageCheckMessageMeetsCritera,
        checkMessageMeetsCritera
    }
}

export default CommentsIndividualPostHelper;