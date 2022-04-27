
// helpers logic related to mainly to redux-hook-form
const CreateNewBlogPostReduxFormHelpers = () => {
    const titleChecker = {
        check: (register) => {
            return (
                {...register("title", { required: {
                    value: true,
                    message: "You MUST enter AT least 35 characters to 225 characters"
                }, minLength: {
                    value: 35,
                    message: "You MUST enter AT Least 35 characters"
                }, maxLength: {
                    value: 225,
                    message: "You may ONLY enter 225 characters or less"
                }, onBlur: (data) => {
                    console.log("blurrred... data :", data);
                }})}
            )
        },
        onChange: (value, setValue) => {
            setValue("title", value, { shouldValidate: true });
        },
        name: "title",
        placeholder: "Enter your 'blog title'...",
        type: "text"
    };
    const subtitleChecker = {
        check: (register) => {
            return (
                {...register("subtitle", { required: {
                    value: true,
                    message: "You MUST enter AT least 35 characters to 225 characters"
                }, minLength: {
                    value: 35,
                    message: "You MUST enter AT Least 35 characters"
                }, maxLength: {
                    value: 225,
                    message: "You may ONLY enter 225 characters or less"
                }, onBlur: (data) => {
                    console.log("blurrred... data :", data);
                }})}
            )
        },
        onChange: (value, setValue) => {
            setValue("subtitle", value, { shouldValidate: true });
        },
        name: "subtitle",
        placeholder: "Enter your 'blog sub-title'...",
        type: "text"
    };
    const hashtagsChecker = {
        check: (register) => {
            return (
                {...register("hashtags", { required: {
                    value: true,
                    message: "You MUST enter AT least 5 characters to 15 characters"
                }, minLength: {
                    value: 5,
                    message: "You MUST enter AT Least 5 characters"
                }, maxLength: {
                    value: 15,
                    message: "You may ONLY enter 15 characters or less"
                }, onBlur: (data) => {
                    console.log("blurrred... data :", data);
                }})}
            )
        },
        onChange: (value, setValue) => {
            setValue("hashtags", value, { shouldValidate: false });
        },
        name: "hashtags",
        placeholder: "Enter your 'blog sub-title'...",
        type: "text"
    };
    const descriptionChecker = {
        check: (register) => {
            return (
                {...register("description", { required: {
                    value: true,
                    message: "You MUST enter AT least 500 characters to 12500 characters"
                }, minLength: {
                    value: 500,
                    message: "You MUST enter AT Least 500 characters"
                }, maxLength: {
                    value: 12500,
                    message: "You may ONLY enter 12500 characters or less"
                }, onBlur: (data) => {
                    console.log("blurrred... data :", data);
                }})}
            )
        },
        onChange: (value, setValue) => {
            setValue("description", value, { shouldValidate: false });
        },
        name: "description",
        placeholder: "Enter your 'blog sub-title'...",
        type: "text"
    };
    // return values to other component
    return {
        titleChecker,
        subtitleChecker,
        hashtagsChecker,
        descriptionChecker
    }
}

export default CreateNewBlogPostReduxFormHelpers;