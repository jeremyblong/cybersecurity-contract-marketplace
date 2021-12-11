import React, { Fragment } from "react";
import InitializeVerificationFlowHelper from "../../../../components/dashboard/verification/initialize/startVerification.js";


const InitializeVerificationFlowPage = (props) => {
    return (
        <Fragment>
            <InitializeVerificationFlowHelper props={props} />
        </Fragment>
    );
}
export default InitializeVerificationFlowPage;