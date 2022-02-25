import React, { Fragment } from "react";
import ViewIndividualLiveStreamHelper from "../../../../../components/dashboard/streamingLiveHacks/ViewLiveStreams/individualStream/viewIndividualStream.js";



const ViewIndividualLiveStreamPage = (props) => {
    return (
        <Fragment>
            <ViewIndividualLiveStreamHelper props={props} />
        </Fragment>
    );
}
export default ViewIndividualLiveStreamPage;