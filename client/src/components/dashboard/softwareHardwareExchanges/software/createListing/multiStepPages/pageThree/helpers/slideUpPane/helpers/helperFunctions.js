
const handleFinalSubmissionInputs = (setModalOpenStatus, shiftCoreStyles, setIsTourOpenStatus, clearErrors, handleDynamicFormReset, typeOfListing, clearAllBodyScrollLocks) => {

    shiftCoreStyles(false);

    setIsTourOpenStatus(true);

    clearErrors();

    clearAllBodyScrollLocks();

    handleDynamicFormReset(typeOfListing);

    return setModalOpenStatus(false);
}
const biddingIncrementIntervalOptions = [
    { label: "$0.10 Minimum Higher Bid Per Raise (min bid-increment)", value: 0.10 },
    { label: "$0.25 Minimum Higher Bid Per Raise (min bid-increment)", value: 0.25 },
    { label: "$0.50 Minimum Higher Bid Per Raise (min bid-increment)", value: 0.50 },
    { label: "$0.75 Minimum Higher Bid Per Raise (min bid-increment)", value: 0.75 },
    { label: "$1.00 Minimum Higher Bid Per Raise (min bid-increment)", value: 1.00 },
    { label: "$1.25 Minimum Higher Bid Per Raise (min bid-increment)", value: 1.25 },
    { label: "$1.50 Minimum Higher Bid Per Raise (min bid-increment)", value: 1.50 },
    { label: "$1.75 Minimum Higher Bid Per Raise (min bid-increment)", value: 1.75 },
    { label: "$2.00 Minimum Higher Bid Per Raise (min bid-increment)", value: 2.00 },
    { label: "$2.25 Minimum Higher Bid Per Raise (min bid-increment)", value: 2.25 },
    { label: "$2.50 Minimum Higher Bid Per Raise (min bid-increment)", value: 2.50 },
    { label: "$2.75 Minimum Higher Bid Per Raise (min bid-increment)", value: 2.75 },
    { label: "$3.00 Minimum Higher Bid Per Raise (min bid-increment)", value: 3.00 },
    { label: "$3.25 Minimum Higher Bid Per Raise (min bid-increment)", value: 3.25 },
    { label: "$3.50 Minimum Higher Bid Per Raise (min bid-increment)", value: 3.50 },
    { label: "$3.75 Minimum Higher Bid Per Raise (min bid-increment)", value: 3.75 },
    { label: "$4.00 Minimum Higher Bid Per Raise (min bid-increment)", value: 4.00 },
    { label: "$4.25 Minimum Higher Bid Per Raise (min bid-increment)", value: 4.25 },
    { label: "$4.50 Minimum Higher Bid Per Raise (min bid-increment)", value: 4.50 },
    { label: "$4.75 Minimum Higher Bid Per Raise (min bid-increment)", value: 4.75 },
    { label: "$5.00 Minimum Higher Bid Per Raise (min bid-increment)", value: 5.00 },
    { label: "$5.25 Minimum Higher Bid Per Raise (min bid-increment)", value: 5.25 },
    { label: "$5.50 Minimum Higher Bid Per Raise (min bid-increment)", value: 5.50 },
    { label: "$5.75 Minimum Higher Bid Per Raise (min bid-increment)", value: 5.75 },
    { label: "$6.00 Minimum Higher Bid Per Raise (min bid-increment)", value: 6.00 },
    { label: "$6.25 Minimum Higher Bid Per Raise (min bid-increment)", value: 6.25 },
    { label: "$6.50 Minimum Higher Bid Per Raise (min bid-increment)", value: 6.50 },
    { label: "$6.75 Minimum Higher Bid Per Raise (min bid-increment)", value: 6.75 },
    { label: "$7.00 Minimum Higher Bid Per Raise (min bid-increment)", value: 7.00 },
    { label: "$7.25 Minimum Higher Bid Per Raise (min bid-increment)", value: 7.25 },
    { label: "$7.50 Minimum Higher Bid Per Raise (min bid-increment)", value: 7.50 }
];

const quantityAvailabilityOptions = [
    { label: "1 Quantity Available (Can be sold an unlimited amount of times - basically 1 per purchase per user)", value: "1", numericalAmount: 1, min: 1, max: 1 },
    { label: "2 Quantities Available", value: "2", numericalAmount: 2, min: 2, max: 2 },
    { label: "3 Quantities Available", value: "3", numericalAmount: 3, min: 3, max: 3 },
    { label: "4 Quantities Available", value: "4", numericalAmount: 4, min: 4, max: 4 },
    { label: "5 Quantities Available", value: "5", numericalAmount: 5, min: 5, max: 5 },
    { label: "6 Quantities Available", value: "6", numericalAmount: 6, min: 6, max: 6 },
    { label: "7 Quantities Available", value: "7", numericalAmount: 7, min: 7, max: 7 },
    { label: "8 Quantities Available", value: "8", numericalAmount: 8, min: 8, max: 8 },
    { label: "9 Quantities Available", value: "9", numericalAmount: 9, min: 9, max: 9 },
    { label: "10 Quantities Available", value: "10", numericalAmount: 10, min: 10, max: 10 },
    { label: "11 Quantities Available", value: "11", numericalAmount: 11, min: 11, max: 11 },
    { label: "12 Quantities Available", value: "12", numericalAmount: 12, min: 12, max: 12 },
    { label: "13 Quantities Available", value: "13", numericalAmount: 13, min: 13, max: 13 },
    { label: "14 Quantities Available", value: "14", numericalAmount: 14, min: 14, max: 14 },
    { label: "15 Quantities Available", value: "15", numericalAmount: 15, min: 15, max: 15 },
    { label: "16 Quantities Available", value: "16", numericalAmount: 16, min: 16, max: 16 },
    { label: "17 Quantities Available", value: "17", numericalAmount: 17, min: 17, max: 17 },
    { label: "18 Quantities Available", value: "18", numericalAmount: 18, min: 18, max: 18 },
    { label: "19 Quantities Available", value: "19", numericalAmount: 19, min: 19, max: 19 },
    { label: "20 Quantities Available", value: "20", numericalAmount: 20, min: 20, max: 20 },
    { label: "21-25 Quantities Available", value: "21-25", numericalAmount: undefined, min: 21, max: 25 },
    { label: "26-30 Quantities Available", value: "26-30", numericalAmount: undefined, min: 26, max: 30 },
    { label: "31-40 Quantities Available", value: "31-40", numericalAmount: undefined, min: 31, max: 40 },
    { label: "41-50 Quantities Available", value: "41-50", numericalAmount: undefined, min: 41, max: 50 },
    { label: "50+ Quantities Available", value: "50+", numericalAmount: undefined, min: 50, max: 1000 }
];

const acceptCouponsDiscountsOptions = [
    { label: "YES - ACCEPT Coupons/Discounts", value: true },
    { label: "NO - REJECT Coupons/Discounts", value: false }
]

export default {
    handleFinalSubmissionInputs,
    biddingIncrementIntervalOptions,
    quantityAvailabilityOptions,
    acceptCouponsDiscountsOptions
};