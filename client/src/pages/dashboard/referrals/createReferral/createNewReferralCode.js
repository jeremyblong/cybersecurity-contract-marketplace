import React, { Fragment } from 'react';
import CreateNewReferralHelper from "../../../../components/dashboard/referrals/createReferral/createNewReferralCode.js";


const CreateNewReferralPage = (props) => {
    return (
        <Fragment>
            <CreateNewReferralHelper props={props} />
        </Fragment>
    );
}

export default CreateNewReferralPage;