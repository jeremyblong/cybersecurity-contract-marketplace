import React, { Fragment } from "react";
import ViewIndividualJobListingHelper from "../../../../../../../components/dashboard/opportunities/employers/liveListings/individual/viewListing/viewIndividualListing.js";

const ViewIndividualJobListingPage = (props) => {
    return (
        <Fragment>
            <ViewIndividualJobListingHelper props={props} />
        </Fragment>
    );
}
export default ViewIndividualJobListingPage;