// helpers logic related to mainly to redux-hook-form
const MainHookForumCreationHelpers = () => {
    const postTitleChecker = {
        check: (setError, register) => {
            return (
                {...register("title", { required: {
                    value: true,
                    message: "You MUST enter AT least 25 characters to 125 characters"
                }, minLength: {
                    value: 25,
                    message: "You MUST enter AT Least 25 characters"
                }, maxLength: {
                    value: 125,
                    message: "You may ONLY enter 125 characters or less"
                }})}
            )
        },
        onChange: (value, setValue) => {
            setValue("title", value, { shouldValidate: true });
        },
        name: "title",
        placeholder: "Enter your forum posting title (The title of your sub-thread)",
        type: "text",
        label: "Post Title"
    };
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
    const communityChecks = {
        check: (setError, register) => {
            return (
                {...register("communityName", { required: {
                    value: true,
                    message: "You MUST select a COMMUNITY to post to before posting your new forum post"
                }})}
            )
        },
        onChange: (value, setValue, clearErrors) => {
            setValue("communityName", value, { shouldValidate: true });
            clearErrors(["communityName"])
        },
        name: "communityName",
        label: "Select a community to post your forum posting to"
    };
    // return values to other component
    return {
        mainDescriptionChecker,
        postTitleChecker,
        communityChecks
    }
}

export default MainHookForumCreationHelpers;