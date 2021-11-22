import React, { Fragment } from "react";
import GeneralSettingsHelper from "../../../../../../components/dashboard/profile/hacker/settings/general/generalSettings.js";


const GeneralSettingsPage = (props) => {
    return (
        <Fragment>
            <GeneralSettingsHelper props={props} />
        </Fragment>
    );
}
export default GeneralSettingsPage;