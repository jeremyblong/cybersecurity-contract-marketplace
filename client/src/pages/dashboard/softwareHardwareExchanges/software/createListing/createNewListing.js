import React, { Fragment } from "react";
import CreateNewSoftwareListingHelper from "../../../../../components/dashboard/softwareHardwareExchanges/software/createListing/createNewListing.js";



const CreateNewSoftwareListingPage = (props) => {
    return (
        <Fragment>
            <CreateNewSoftwareListingHelper props={props} />
        </Fragment>
    );
}
export default CreateNewSoftwareListingPage;