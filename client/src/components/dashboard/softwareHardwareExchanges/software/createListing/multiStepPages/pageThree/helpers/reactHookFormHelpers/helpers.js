// helpers logic related to mainly to redux-hook-form
const MainHookHelpers = () => {
    
    const radioSelectionPricingOptionsOne = {
        check: (setError, register, clearErrors) => {
            return (
                {...register("auctionPurchaseType", { required: {
                    value: true,
                    message: "You MUST select an option before proceeding with this form - important bidding/purchase information is required."
                }, onBlur: (e) => {
                    // log to check whats returned
                    setTimeout(() => {
                        // clear error after proper selection
                        clearErrors("auctionPurchaseType");
                    }, 50);
                }})}
            );
        },
        id: "auction-ONLY",
        name: "auctionPurchaseType",
        value: "auction-ONLY"
    };
    const radioSelectionPricingOptionsTwo = {
        check: (setError, register, clearErrors) => {
            return (
                {...register("auctionPurchaseType", { required: {
                    value: true,
                    message: "You MUST select an option before proceeding with this form - important bidding/purchase information is required."
                }, onBlur: (e) => {
                    // log to check whats returned
                    setTimeout(() => {
                        // clear error after proper selection
                        clearErrors("auctionPurchaseType");
                    }, 50);
                }})}
            );
        },
        id: "auction-AND-buy-it-now",
        name: "auctionPurchaseType",
        value: "auction-AND-buy-it-now"
    };
    const radioSelectionPricingOptionsThree = {
        check: (setError, register, clearErrors) => {
            return (
                {...register("auctionPurchaseType", { required: {
                    value: true,
                    message: "You MUST select an option before proceeding with this form - important bidding/purchase information is required."
                }, onBlur: (e) => {
                    // log to check whats returned
                    setTimeout(() => {
                        // clear error after proper selection
                        clearErrors("auctionPurchaseType");
                    }, 50);
                }})}
            );
        },
        id: "buy-it-now-OR-best-offer",
        name: "auctionPurchaseType",
        value: "buy-it-now-OR-best-offer"
    } 
    const radioSelectionPricingOptionsFour = {
        check: (setError, register, clearErrors) => {
            return (
                {...register("auctionPurchaseType", { required: {
                    value: true,
                    message: "You MUST select an option before proceeding with this form - important bidding/purchase information is required."
                }, onBlur: (e) => {
                    // log to check whats returned
                    setTimeout(() => {
                        // clear error after proper selection
                        clearErrors("auctionPurchaseType");
                    }, 50);
                }})}
            );
        },
        id: "buy-it-now-ONLY",
        name: "auctionPurchaseType",
        value: "buy-it-now-ONLY"
    }
    // return values to other component
    return {
        radioSelectionPricingOptionsOne,
        radioSelectionPricingOptionsTwo,
        radioSelectionPricingOptionsThree,
        radioSelectionPricingOptionsFour
    }
}

export default MainHookHelpers;