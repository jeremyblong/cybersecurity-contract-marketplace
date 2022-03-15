import React from "react";
import { confirmAlert } from 'react-confirm-alert';
import axios from "axios";
import { NotificationManager } from "react-notifications";

const processPayment = (tokens, userData) => {
    console.log("processTokens", tokens, userData);

    const configuration = {
        tokens,
        signedinUserID: userData.uniqueId,
        signedinAccountType: userData.accountType
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}/purchase/account/tokens/either/account`, configuration).then((res) => {
        if (res.data.message === "Purchased tokens successfully!") {
            console.log(res.data);

            NotificationManager.success("Successfully charged your PRIMARY card on file and added the appropriate token count to your account token balance! Your tokens are NOW ready to be used!", "Thanks for your purchase, enjoy your new tokens!", 4750);

        } else if (res.data.message === "You do NOT have any listed payment methods on file!") {

            NotificationManager.warning("You do NOT have any active payment method's on file therefore we can't charge your account appropriately. Please add a card before trying this action again. No changes processed.", "Please add a payment method on file!", 4750);
        
        } else if (res.data.message === "You MUST complete the 'stripe' onboarding process/flow BEFORE making ANY purchases whatsoever. This is non-negotiable however the process is very quick generally speaking!") {
            
            NotificationManager.warning("You MUST complete the 'stripe' onboarding process/flow BEFORE making ANY purchases whatsoever. This is non-negotiable however the process is very quick generally speaking!", "MUST COMPLETE ONBOARDING BEFORE PROCEEDING!", 4750);

        } else if (res.data.message === "You do NOT have enough money availiable in your account at this current point in time, please add more funds to your account and then try this action again!") {
            
            NotificationManager.warning("You do NOT have enough money availiable in your account at this current point in time, please add more funds to your account and then try this action again!", "NOT ENOUGH FUNDS IN YOUR ACCOUNT!", 4750);

        } else {
            console.log("Err", res.data);

            NotificationManager.error("An unknown error has occurred while attempting to access account and make appropriate changes and charging the default account card - no changes were made!", "Unknown error has occurred!", 4750);
        }
    }).catch((err) => {
        console.log("Critical errror...:", err);

        NotificationManager.error("An unknown error has occurred while attempting to access account and make appropriate changes and charging the default account card - no changes were made!", "Unknown error has occurred!", 4750);
    })
}

const handleTokenPurchase = (tokens, userData) => {
    console.log("handleTokenPurchase ran/running..");

    const calculate = () => {
        switch (tokens) {
            case 25:
                return "$14.99";
                break;
            case 50:
                return "$24.99";
                break;
            case 100:
                return "$39.99";
                break;
            case 175:
                return "$69.99";
                break;
            default:
                break;
        }
    }

    confirmAlert({
        title: `Purchase ${tokens} token's for ${calculate()}? You cannot undo this action.`,
        message: `Are you sure you'd like to make this purchase? Once confirmation is received via this prompt/modal, we will bill your primary card accordingly (Your DEFAULT payment method - check your payments to figure out which is primary if you need to or change it)!`,
        buttons: [
          {
            label: 'Yes, Make Purchase!',
            onClick: () => processPayment(tokens, userData)
          },
          {
            label: 'No, Cancel.',
            onClick: () => {

            }
          }
        ]
    });
}


export default {
    handleTokenPurchase
}