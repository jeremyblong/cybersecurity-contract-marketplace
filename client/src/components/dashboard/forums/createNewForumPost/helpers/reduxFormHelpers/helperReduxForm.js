// helpers logic related to mainly to redux-hook-form
const MainHookForumCreationHelpers = () => {
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
        onChange: (value, setValue) => {
            setValue("mainDescription", value, { shouldValidate: true });
        },
        name: "mainDescription",
        placeholder: "Enter whatever you feel like! Talk about hacking or if you're an employer, you can discuss our platform's BEST hacker's & how to safely hire or even just vett hacker's through various questions and/or even a poll!",
        type: "textarea",
        label: "Enter your post description/content"
    };
    // return values to other component
    return {
        mainDescriptionChecker
    }
}

export default MainHookForumCreationHelpers;