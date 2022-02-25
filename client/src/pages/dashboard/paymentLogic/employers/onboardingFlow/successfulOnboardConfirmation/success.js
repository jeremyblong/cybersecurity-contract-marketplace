import React, { Fragment } from 'react';
import SuccessfulOnboardCompletionHelper from "../../../../../../components/dashboard/paymentLogic/employers/onboardingFlow/successfulOnboardConfirmation/success.js";


const SuccessfulOnboardCompletionPage = (props) => {
    return (
        <Fragment>
            <SuccessfulOnboardCompletionHelper props={props} />
        </Fragment>
    );
}

export default SuccessfulOnboardCompletionPage;