import React, { Fragment } from 'react';
import CashoutAvailiableBalanceHelper from "../../../../components/dashboard/balanceRelated/cashout/cashoutRemainingBal.js";


const CashoutAvailiableBalancePage = (props) => {
    return (
        <Fragment>
            <CashoutAvailiableBalanceHelper props={props} />
        </Fragment>
    );
}

export default CashoutAvailiableBalancePage;