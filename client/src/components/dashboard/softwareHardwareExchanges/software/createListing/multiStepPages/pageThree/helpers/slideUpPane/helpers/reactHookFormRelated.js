// helpers logic related to mainly to redux-hook-form
const HookHelpers = () => {
    
    const startBidCheck = {
        check: (setError, register) => {
            return (
                {...register("startBid", { required: {
                    value: true,
                    message: "You MUST enter AT least 1 characters to 10 characters & ONLY numbers"
                }, minLength: {
                    value: 1,
                    message: "You must enter AT Least 1 characters"
                }, maxLength: {
                    value: 10,
                    message: "You may ONLY enter 10 characters or less"
                }, onBlur: (e) => {
                    // code here...
                }})}
            )
        },
        name: "startBid",
        placeholder: "Enter a starting bid...",
        type: "number",
        label: "Enter a starting bid"
    };
    const reservePrice = {
        check: (setError, register, values) => {
            return (
                {...register("reservePrice", { required: {
                    value: true,
                    message: "You MUST enter AT least 1 characters to 10 characters & ONLY numbers"
                }, minLength: {
                    value: 1,
                    message: "You must enter AT Least 1 characters"
                }, maxLength: {
                    value: 10,
                    message: "You may ONLY enter 10 characters or less"
                }, onBlur: (e) => {
                    // code here...
                    console.log("blur - e", e);
                    // current value from this input
                    const current = e.target.value;
                    // starting bid
                    const startingBid = values.startBid;
                    // compare to make sure reserve is greater than starting bid
                    if (Number(current) <= Number(startingBid)) {
                        setTimeout(() => {
                            setError("reservePrice", {
                                type: "manual",
                                message: "You MUST enter a 'reserve price' GREATER than your starting bid price!",
                            });
                        }, 50);
                    }
                }})}
            )
        },
        name: "reservePrice",
        placeholder: "Enter a reserve price...",
        type: "number",
        label: "Enter a reserve price"
    };
    const whatsIncludedInfoListing = {
        check: (setError, register) => {
            return (
                {...register("whatsIncluded", { required: {
                    value: true,
                    message: "You MUST enter AT least 75 characters to 1500 characters"
                }, minLength: {
                    value: 75,
                    message: "You must enter AT Least 75 characters"
                }, maxLength: {
                    value: 1500,
                    message: "You may ONLY enter 1500 characters or less"
                }, onBlur: (e) => {
                    // code here...
                }})}
            )
        },
        name: "whatsIncluded",
        placeholder: `Please elaborate on "what's included" in this listing such as specifics of various features/functionality such as 4 files, 1 README document, 15 pictures and a GitHub repository link...`,
        type: "text",
        label: `Enter a DETAILED description of "what's included" in this listing - be as SPECIFIC as possible in reference to fine details.`
    };
    const buyItNowHelper = {
        check: (setError, register) => {
            return (
                {...register("buyItNowPrice", { required: {
                    value: true,
                    message: "You MUST enter AT least 1 characters to 10 characters & ONLY numbers"
                }, minLength: {
                    value: 1,
                    message: "You must enter AT Least 1 characters"
                }, maxLength: {
                    value: 10,
                    message: "You may ONLY enter 10 characters or less"
                }, onBlur: (e) => {
                    // code here...
                }})}
            )
        },
        name: "buyItNowPrice",
        placeholder: `Please enter a 'Buy it now' price - this essentially gives intereseted user's the ability to immediately purchase your item/software...`,
        type: "number",
        label: `Enter a 'Buy it now' price for interested parties to immediately purchase your item/code/software for sale (this transaction will finalize INSTANTLY - if funds are available)`
    }
    const quantityAvailability = {
        label: "Select a quantity/availability of your item for sale (this is the MAXIMUM number of people you're willing to sell your software/code to - each purchase counts as ONE item)",
        check: (setError, register, clearErrors) => {
            return (
                {...register("quantityAvailableForSale", { required: {
                    value: true,
                    message: "You must select a value before proceeding"
                }, onBlur: (e) => {
                    // log to check whats returned

                    const value = e.target.value;

                    setTimeout(() => {
                        // clear error after proper selection
                        if ((typeof value !== "undefined") && (Object.keys(value).length > 0)) {
                            clearErrors("quantityAvailableForSale");
                        } else {
                            // set error as nothing was selected (blank 'click-off' selection of selector)
                            setError("quantityAvailableForSale", {
                                type: "manual",
                                message: "You haven't selected a 'quantity/numerical-number' of how many times you're willing to sell this code/software content",
                            });
                        }
                    }, 50);
                }})}
            );
        },
        name: "quantityAvailableForSale",
        placeholder: "Select a quantity/availability of your item for sale..."
    };
    const acceptCouponsDiscounts = {
        label: `Would you like to accept coupons/discounts provided by ${process.env.REACT_APP_APPLICATION_NAME} (reduces price - supplied via company promotions - makes listing more appealing & draws extra interest - MAXIMUM 20% discount at any time)`,
        check: (setError, register, clearErrors) => {
            return (
                {...register("discountCodeAcceptance", { required: {
                    value: true,
                    message: "You must select a value before proceeding"
                }, onBlur: (e) => {
                    // log to check whats returned
                    const value = e.target.value;
                    // set delay to prevent premature render
                    setTimeout(() => {
                        // clear error after proper selection
                        if ((typeof value !== "undefined") && (Object.keys(value).length > 0)) {
                            clearErrors("discountCodeAcceptance");
                        } else {
                            // set error as nothing was selected (blank 'click-off' selection of selector)
                            setError("discountCodeAcceptance", {
                                type: "manual",
                                message: "You haven't selected a 'coupon/discount code' selection - select one before proceeding",
                            });
                        }
                    }, 50);
                }})}
            );
        },
        name: "discountCodeAcceptance",
        placeholder: "Select whether or not you'd like to accept coupon/discount codes..."
    }
    const biddingIncrementIntervalHelper = {
        label: "Listing Timespan/Length - Please select a listing length (up-to a maximum of 10 days however we suggest 7 days on average)",
        check: (setError, register, clearErrors) => {
            return (
                {...register("biddingIncrementInterval", { required: {
                    value: true,
                    message: "You must select a value before proceeding"
                }, onBlur: (e) => {
                    // log to check whats returned

                    const value = e.target.value;

                    setTimeout(() => {
                        // clear error after proper selection
                        if ((typeof value !== "undefined") && (Object.keys(value).length > 0)) {
                            clearErrors("biddingIncrementInterval");
                        } else {
                            // set error as nothing was selected (blank 'click-off' selection of selector)
                            setError("biddingIncrementInterval", {
                                type: "manual",
                                message: "You haven't selected a 'bidding interval' & a selection is required before proceeding",
                            });
                        }
                    }, 50);
                }})}
            );
        },
        name: "biddingIncrementInterval",
        placeholder: "Select a 'bid-increment interval' (next required minimum bid from active bidders)"
    };

    const automaticAcceptBestOffer = {
        check: (setError, register) => {
            return (
                {...register("automaticBestOfferAccept", { required: {
                    value: true,
                    message: "You MUST enter AT least 1 characters to 10 characters & ONLY numbers"
                }, minLength: {
                    value: 1,
                    message: "You must enter AT Least 1 characters"
                }, maxLength: {
                    value: 10,
                    message: "You may ONLY enter 10 characters or less"
                }, onBlur: (e) => {
                    // code here...
                }})}
            )
        },
        name: "automaticBestOfferAccept",
        placeholder: `Enter your LOWEST ACCEPTED offer...`,
        type: "number",
        label: `Enter the value of the LOWEST OFFER you'd be willing to AUTOMATICALLY accept if offer is proposed - system will process request immediately (your idea of a reasonable 'automatically' accepted offer - no action required)`
    };
    const minimumRequiredOffer = {
        check: (setError, register) => {
            return (
                {...register("minimumRequiredOfferValue", { required: {
                    value: true,
                    message: "You MUST enter AT least 1 characters to 10 characters & ONLY numbers"
                }, minLength: {
                    value: 1,
                    message: "You must enter AT Least 1 characters"
                }, maxLength: {
                    value: 10,
                    message: "You may ONLY enter 10 characters or less"
                }, onBlur: (e) => {
                    // code here...
                }})}
            )
        },
        name: "minimumRequiredOfferValue",
        placeholder: `Minimum offer amount (the lowest offer anyone can submit)`,
        type: "number",
        label: `Enter your 'Minimum offer amount' required for user's to be able to successfully submit an offer of any value GREATER THAN this fields entered value - if a user submits an offer less-than your entered value... The offer will automatically reject upon attempted submission`
    };

    return {
        startBidCheck,
        reservePrice,
        biddingIncrementIntervalHelper,
        whatsIncludedInfoListing,
        buyItNowHelper,
        quantityAvailability,
        acceptCouponsDiscounts,
        automaticAcceptBestOffer,
        minimumRequiredOffer
    }
}


export default HookHelpers;