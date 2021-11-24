import React, { Fragment } from "react";
import LiveEmployerListingsHelper from "../../../../../../components/dashboard/opportunities/employers/liveListings/main/liveListingsMain.js";


const LiveEmployerListingsPage = (props) => {
    return (
        <Fragment>
            <LiveEmployerListingsHelper props={props} />
        </Fragment>
    );
}
export default LiveEmployerListingsPage;