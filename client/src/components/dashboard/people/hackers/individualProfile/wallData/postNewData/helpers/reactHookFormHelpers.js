// helpers logic related to mainly to redux-hook-form
const CreateNewPostReduxFormHelpers = () => {
    
    const typesOfLanguagesUsed = {
        check: (setError, register, name, clearErrors) => {
            return (
                {...register(name, { required: {
                    value: true,
                    message: "You MUST select an option before proceeding with your new post"
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
                                message: "You MUST select an option before proceeding with your new post",
                            });
                        }
                    }, 50);
                }})}
            )
        },
        name: "typeOfPost",
        placeholder: "Select which language's are being used in this post...",
        type: "text",
        label: "Select what 'coding language(s)' that're being used, talked about or taught in this post (if applicable)"
    };
    const descriptionChecker = {
        check: (register, setTyping) => {
            return (
                {...register("description", { required: {
                    value: true,
                    message: "You MUST enter AT least 35 characters to 850 characters"
                }, minLength: {
                    value: 35,
                    message: "You MUST enter AT Least 35 characters"
                }, maxLength: {
                    value: 850,
                    message: "You may ONLY enter 850 characters or less"
                }, onBlur: (data) => {
                    console.log("blurrred... data :", data);

                    setTyping("");
                }})}
            )
        },
        onChange: (value, setValue) => {
            setValue("description", value, { shouldValidate: true });
        },
        name: "description",
        placeholder: "Enter the 'Main Descriptive' text/information for this specific post, enter anywhere from 35-850 charectors in total - be as descriptive as you'd like or as breif as you'd like... up to you!",
        type: "textarea",
        label: "Enter a description or details about what your post is about or write about the contents of the file(s) you've uploaded (if applicable)"
    };
    const titleChecker = {
        check: (register, setTyping) => {
            return (
                {...register("title", { required: {
                    value: true,
                    message: "You MUST enter AT least 15 characters to 125 characters"
                }, minLength: {
                    value: 15,
                    message: "You MUST enter AT Least 15 characters"
                }, maxLength: {
                    value: 125,
                    message: "You may ONLY enter 125 characters or less"
                }, onBlur: (data) => {
                    console.log("blurrred... data :", data);
                    setTyping("");
                }})}
            )
        },
        onChange: (value, setValue) => {
            setValue("title", value, { shouldValidate: true });
        },
        name: "title",
        placeholder: "Enter a title for your new post (be descriptive up to 125 charectors)...",
        type: "text",
        label: "Enter a descriptive title that'll give your viewer's or anyone seeing this a good general idea of the contents of this post at a glance (accurate/detailed post's w/good titles get more responses...)"
    };
    // return values to other component
    return {
        descriptionChecker,
        typesOfLanguagesUsed,
        titleChecker
    }
}

export default CreateNewPostReduxFormHelpers;