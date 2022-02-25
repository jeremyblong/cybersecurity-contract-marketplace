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
                            // clear error
                            clearErrors(name);
                        }, 75);
                    } else {
                        setTimeout(() => {
                            setError(name, {
                                type: "manual",
                                message: "You MUST enter a VALID URL including http/https and ://",
                            });
                        }, 75)
                    }
                }})}
            );
        },
        onChange: (e, name, setValue) => {
            console.log("e name val", e, name, setValue);
            // deconstruct actual value
            const value = e.target.value;

            console.log("valu", value);
            // set state without redux form
            setValue(name, value, { shouldValidate: false });
        }
    };
    const coverLetterChecks = {
        check: (setError, register, clearErrors, name) => {
            return (
                {...register(name, { required: {
                    value: true,
                    message: "You MUST enter a value for this field between 50 and 750 charactors"
                }, minLength: {
                    value: 50,
                    message: "You must enter AT Least 50 characters"
                }, maxLength: {
                    value: 750,
                    message: "You may ONLY enter 750 characters or less"
                }, onBlur: (e) => {
                    // deconstruct actual value
                    const value = e.target.value;
                    // deconstruct length
                    const len = value.length;
                    // check if both min/max values met
                    if ((len > 0) && (len >= 50) && (len <= 750)) {
                        // clear error
                        clearErrors(name);
                    } else {
                        // set error
                        setTimeout(() => {
                            setError(name, {
                                type: "manual",
                                message: "You MUST enter between 50 and 750 charectors in total for your cover letter (CV) before proceeding...",
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
                    message: "You MUST enter a value for this field between 50 and 750 charactors"
                }, minLength: {
                    value: 50,
                    message: "You must enter AT Least 50 characters"
                }, maxLength: {
                    value: 750,
                    message: "You may ONLY enter 750 characters or less"
                }, onBlur: (e) => {
                    // deconstruct actual value
                    const value = e.target.value;
                    // deconstruct length
                    const len = value.length;
                    // check if both min/max values met
                    if ((len > 0) && (len >= 50) && (len <= 750)) {
                        // clear error
                        clearErrors(name);
                    } else {
                        // set error
                        setTimeout(() => {
                            setError(name, {
                                type: "manual",
                                message: "You MUST enter between 50 and 750 charectors total while messaging employer before proceeding...",
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
    const participateInBettingWagers = {
        check: (name, register) => {
            return (
                {...register(name, { required: {
                    value: true,
                    message: "You must select a value/option (participate in betting OR not) before proceeding"
                }})}
            );
        },
        placeholder: "Select whether or not you'd like to participate in betting/gambling...",
        name: "participateInBettingProcess",
        label: "Would you like to participate in 'betting/waggering' on yourself to WIN more money IF you win the 'hack' or listing competition (WINNER selected by employer at end)"
    }
    const tokenBidWagerAmount = {
        check: (setError, register, clearErrors, setValue, name) => {
            return (
                {...register(name, { required: {
                    value: true,
                    message: `You MUST wager anywhere from 5-100 ${process.env.REACT_APP_CRYPTO_TOKEN_NAME} IF bidding is ENABLED (participate input...)`
                }, min: {
                    value: 5,
                    message: `You MUST wager/bid AT-LEAST 5 ${process.env.REACT_APP_CRYPTO_TOKEN_NAME}`
                }, pattern: /\d+/g, max: {
                    value: 100,
                    message: `You may ONLY wager/bid UP-TO 100 ${process.env.REACT_APP_CRYPTO_TOKEN_NAME}`
                }, onBlur: (e) => {
                    // deconstruct actual value
                    const value = e.target.value;
                    // check if both min/max values met
                    if ((value >= 5) && (value <= 100)) {
                        // clear error
                        clearErrors(name);
                    } else {
                        // set error
                        setTimeout(() => {
                            setError(name, {
                                type: "manual",
                                message: `You MUST wager anywhere from 5-100 ${process.env.REACT_APP_CRYPTO_TOKEN_NAME} IF bidding is ENABLED (participate input...) as well as entering ONLY NUMERIC charactors!`,
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
        label: `Enter how many ${process.env.REACT_APP_CRYPTO_TOKEN_NAME} you'd like to wager/bid that YOU will WIN the competition & are selected as the 'winner' of this employer listing`,
        name: "waggeredBidAmount",
        placeholder: `Enter how many ${process.env.REACT_APP_CRYPTO_TOKEN_NAME} you'd like to wager/bet (that you WIN)`
    }
    const approachToSuccessfullyHackCo = {
        check: (setError, register, clearErrors, name) => {
            return (
                {...register(name, { required: {
                    value: true,
                    message: "You MUST enter a value for this field between 50 and 750 charactors"
                }, minLength: {
                    value: 50,
                    message: "You must enter AT Least 50 characters"
                }, maxLength: {
                    value: 750,
                    message: "You may ONLY enter 750 characters or less"
                }, onBlur: (e) => {
                    console.log("blurred/");
                    // deconstruct actual value
                    const value = e.target.value;
                    // deconstruct length
                    const len = value.length;
                    // check if both min/max values met
                    if ((len > 0) && (len >= 50) && (len <= 750)) {
                        // clear error
                        clearErrors(name);
                    } else {
                        // set error
                        setTimeout(() => {
                            setError(name, {
                                type: "manual",
                                message: "You MUST enter between 50 and 750 charectors total while 'describing your hack ideas' before proceeding...",
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
        participateInBettingWagers,
        approachToSuccessfullyHackCo,
        tokenBidWagerAmount
    }
}

export default MainHooksCustomHelpers;