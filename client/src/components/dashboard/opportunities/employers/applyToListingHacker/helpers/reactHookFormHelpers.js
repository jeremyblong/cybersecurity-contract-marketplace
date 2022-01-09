// helpers logic related to mainly to redux-hook-form
const MainHooksCustomHelpers = () => {

    const calculateWhetherURLIsLegit = (data) => {
        // helper function
        const isValidHttpUrl = (string) => {
            let url;
            
            try {
              url = new URL(string);
            } catch (_) {
              return false;  
            }
            // return protocol data
            return url.protocol === "http:" || url.protocol === "https:";
        }
        // finally, check if url is VALID
        if (isValidHttpUrl(data)) {
            // url IS VALID
            return true;
        } else {
            // url IS NOT VALID - return error string
            return false;
        };
    }

    const urlEnteredLinkData = {
        check: (setError, register, clearErrors, setValue, errors, name) => {
            return (
                {...register(name, { required: {
                    value: true,
                    message: "You MUST enter a value for this field between 8 and 75 charactors"
                }, minLength: {
                    value: 8,
                    message: "You must enter AT Least 8 characters"
                }, maxLength: {
                    value: 75,
                    message: "You may ONLY enter 75 characters or less"
                }, onBlur: (e) => {
                    // extracted final value from input
                    const value = e.target.value;
                    // check if valid url in helper file.
                    const validOrNot = calculateWhetherURLIsLegit(value);
                    // check if valid!
                    if (validOrNot === true) {
                        // set value
                        setValue(name, value, { shouldValidate: false });
                        // clear error after setting proper change state
                        setTimeout(() => {
                            clearErrors(name);
                        }, 50);
                    } else {
                        setTimeout(() => {
                            setError(name, {
                                type: "manual",
                                message: "You MUST enter a VALID URL including http/https and ://",
                            });
                        }, 50)
                    }
                }})}
            );
        },
        onChange: (e, setError, clearErrors, setValue, setLinkInput) => {
            // deconstruct actual value
            const value = e.target.value;
            // set state without redux form
            setLinkInput(value);
            // created timeout variable
            let timed;
            // set timeout/delay span
            clearTimeout(timed);
            // set timeout
            timed = setTimeout(() => {
                // check whether legit URL
                if (calculateWhetherURLIsLegit(value)) {
                    // clear error (relevant);
                    clearErrors("referenceLink");
                    // set value
                    setValue("referenceLink", value, { shouldValidate: false });
                } else {
                    setError("referenceLink", {
                        type: "manual",
                        message: "You MUST enter a VALID URL including http/https and ://",
                    });
                }
            },  50);
        }
    };
    const coverLetterChecks = {
        check: (setError, register, clearErrors, setValue, name) => {
            return (
                {...register(name, { required: {
                    value: true,
                    message: "You MUST enter a value for this field between 50 and 575 charactors"
                }, minLength: {
                    value: 50,
                    message: "You must enter AT Least 50 characters"
                }, maxLength: {
                    value: 575,
                    message: "You may ONLY enter 575 characters or less"
                }, onBlur: (e) => {
                    // deconstruct actual value
                    const value = e.target.value;
                    // deconstruct length
                    const len = value.length;
                    // check if both min/max values met
                    if ((len > 0) && (len >= 50) && (len <= 575)) {
                        // clear error
                        clearErrors(name);
                    } else {
                        // set error
                        setTimeout(() => {
                            setError(name, {
                                type: "manual",
                                message: "You MUST enter between 50 and 575 charectors in total for your cover letter (CV) before proceeding...",
                            });
                        }, 50);
                    }
                }})}
            );
        },
        onChange: (e, name, setValue) => {
            // deconstruct actual value
            const value = e.target.value;

            setValue(name, value, { shouldValidate: true })
        },
        label: "Cover Letter (CV)",
        name: "coverLetterText",
        placeholder: "Enter your cover letter information (or upload in attachments)..."
    };
    const messageToEmployerChecks = {
        check: (setError, register, clearErrors, setValue, name) => {
            return (
                {...register(name, { required: {
                    value: true,
                    message: "You MUST enter a value for this field between 50 and 575 charactors"
                }, minLength: {
                    value: 50,
                    message: "You must enter AT Least 50 characters"
                }, maxLength: {
                    value: 575,
                    message: "You may ONLY enter 575 characters or less"
                }, onBlur: (e) => {
                    // deconstruct actual value
                    const value = e.target.value;
                    // deconstruct length
                    const len = value.length;
                    // check if both min/max values met
                    if ((len > 0) && (len >= 50) && (len <= 575)) {
                        // clear error
                        clearErrors(name);
                    } else {
                        // set error
                        setTimeout(() => {
                            setError(name, {
                                type: "manual",
                                message: "You MUST enter between 50 and 575 charectors total while messaging employer before proceeding...",
                            });
                        }, 50);
                    }
                }})}
            );
        },
        onChange: (e, name, setValue) => {
            // deconstruct actual value
            const value = e.target.value;

            setValue(name, value, { shouldValidate: true })
        },
        label: "Message To Employer (Direct to employer)",
        name: "messageToEmployer",
        placeholder: "Enter your 'custom' message to the employer..."
    };
    const physicalOrDigitalChecks = {
        check: (name, register) => {
            return (
                {...register(name, { required: {
                    value: true,
                    message: "You must select a value/option (digital, physical or both) before proceeding"
                }})}
            );
        },
        placeholder: "Select your desired hack type (of enabled options)",
        name: "physicalOrDigitalOrBoth",
        label: "Account Type (Digital/Physical-hack type)"
    }
    const approachToSuccessfullyHackCo = {
        check: (setError, register, clearErrors, name) => {
            return (
                {...register(name, { required: {
                    value: true,
                    message: "You MUST enter a value for this field between 50 and 575 charactors"
                }, minLength: {
                    value: 50,
                    message: "You must enter AT Least 50 characters"
                }, maxLength: {
                    value: 575,
                    message: "You may ONLY enter 575 characters or less"
                }, onBlur: (e) => {
                    console.log("blurred/");
                    // deconstruct actual value
                    const value = e.target.value;
                    // deconstruct length
                    const len = value.length;
                    // check if both min/max values met
                    if ((len > 0) && (len >= 50) && (len <= 575)) {
                        // clear error
                        clearErrors(name);
                    } else {
                        // set error
                        setTimeout(() => {
                            setError(name, {
                                type: "manual",
                                message: "You MUST enter between 50 and 575 charectors total while 'describing your hack ideas' before proceeding...",
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
        label: "What is your approach to this 'hack'?",
        name: "technicalApproachToHack",
        placeholder: "Enter your 'approach' to how you expect to successfully hack this company... (don't give out your attack methods - just give a general idea - can be very broad - up to you)"
    }
    // return values to other component
    return {
        urlEnteredLinkData,
        coverLetterChecks,
        messageToEmployerChecks,
        physicalOrDigitalChecks,
        approachToSuccessfullyHackCo
    }
}

export default MainHooksCustomHelpers;