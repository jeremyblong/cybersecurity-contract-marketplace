import React, { Fragment } from 'react';
import CreateInviteEmailBetaListHelper from "../../../../components/dashboard/restrictedData/betaMode/createBetaEmailList.js";


const CreateInviteEmailBetaListPage = (props) => {
    return (
        <Fragment>
            <CreateInviteEmailBetaListHelper props={props} />
        </Fragment>
    );
}

export default CreateInviteEmailBetaListPage;