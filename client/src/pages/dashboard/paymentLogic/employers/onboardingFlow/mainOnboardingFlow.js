import React, { Fragment } from 'react';
import MainOnboardingFlowHelper from "../../../../../components/dashboard/paymentLogic/employers/onboardingFlow/mainOnboardingFlow.js";

const MainOnboardingFlowPage = (props) => {
    return (
        <Fragment>
            <MainOnboardingFlowHelper props={props} />
        </Fragment>
    );
}

export default MainOnboardingFlowPage;