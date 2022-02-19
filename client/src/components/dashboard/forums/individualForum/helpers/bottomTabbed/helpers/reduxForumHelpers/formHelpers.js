// helpers logic related to mainly to redux-hook-form
const MainHookForumSubCommentHelper = () => {
    const replySubcommentChecks = {
        check: (setError, register) => {
            return (
                {...register("subcomment", { required: {
                    value: true,
                    message: "You MUST enter a value/characters between 25 & 225 character's before proceeding"
                }, minLength: {
                    value: 25,
                    message: "You MUST enter at least 25 letter/character's OR more before proceeding"
                }, maxLength: {
                    value: 225,
                    message: "You may ONLY enter a value/characters with a length of 225 or LESS"
                }})}
            )
        },
        onChange: (value, setValue, clearErrors) => {
            setValue("subcomment", value, { shouldValidate: true });
            clearErrors(["subcomment"])
        },
        name: "subcomment",
        label: "Enter your reply to the selected comment",
        placeholder: "Enter your comment here between 25-225 character's...",
        type: "textarea",

    };
    // return values to other component
    return {
        replySubcommentChecks
    }
}

export default MainHookForumSubCommentHelper;