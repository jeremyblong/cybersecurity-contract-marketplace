import React, { Fragment } from "react";
import TopOffBalanceHelper from "../../../../components/dashboard/balanceRelated/topOffBal/topoffBalance.js";

const TopOffBalancePage = (props) => {
    return (
        <Fragment>
            <TopOffBalanceHelper props={props} />
        </Fragment>
    );
};
export default TopOffBalancePage;