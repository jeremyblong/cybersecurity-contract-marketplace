import React, { Fragment } from "react";
import ViewAllBalanceRelatedInfoHelper from "../../../../components/dashboard/balanceRelated/view/viewBalanceInfo.js";

const ViewAllBalanceRelatedInfoPage = (props) => {
    return (
        <Fragment>
            <ViewAllBalanceRelatedInfoHelper props={props} />
        </Fragment>
    );
};
export default ViewAllBalanceRelatedInfoPage;