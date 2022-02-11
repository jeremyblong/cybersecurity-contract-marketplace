import React, { Fragment } from "react";
import PaymentMethodsAddNewPaymentMethodHelper from "../../../../components/dashboard/paymentLogic/addNewPaymentMethod/addNewMethod.js";

const PaymentMethodsAddNewPaymentMethodPage = (props) => {
    return (
        <Fragment>
            <PaymentMethodsAddNewPaymentMethodHelper props={props} />
        </Fragment>
    );
}
export default PaymentMethodsAddNewPaymentMethodPage;