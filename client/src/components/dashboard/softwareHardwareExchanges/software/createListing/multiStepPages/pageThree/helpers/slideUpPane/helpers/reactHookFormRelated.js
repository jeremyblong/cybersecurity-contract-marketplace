import React, { useState, useRef, useEffect, Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';



const HookHelpers = () => {
    
    const startBidCheck = {
        check: (setError, register) => {
            return (
                {...register("startBid", { required: {
                    value: true,
                    message: "You MUST enter AT least 1 characters to 10 characters"
                }, minLength: {
                    value: 1,
                    message: "You must enter AT Least 1 characters"
                }, maxLength: {
                    value: 10,
                    message: "You may ONLY enter 10 characters or less"
                }, onBlur: (e) => {
                    // code here...
                    // setError("startBid", {
                    //     type: "manual",
                    //     message: "Enter something at least??",
                    // });
                }})}
            )
        },
        name: "startBid",
        placeholder: "Enter a starting bid...",
        type: "number",
        label: "Enter a starting bid"
    };
    const reservePrice = {
        check: (setError, register) => {
            return (
                {...register("reservePrice", { required: {
                    value: true,
                    message: "You MUST enter AT least 1 characters to 10 characters"
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
        name: "reservePrice",
        placeholder: "Enter a reserve price...",
        type: "number",
        label: "Enter a reserve price"
    };

    return {
        startBidCheck,
        reservePrice
    }
}


export default HookHelpers;