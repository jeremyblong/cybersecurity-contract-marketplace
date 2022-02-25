import React, { Fragment } from "react";
import PricingSelectMembershipHelper from "../../../../components/dashboard/subscriptions/selectMembership/memberships.js";


const PricingSelectMembershipPage = (props) => {
    return (
        <Fragment>
            <PricingSelectMembershipHelper props={props} />
        </Fragment>
    );
}
export default PricingSelectMembershipPage;