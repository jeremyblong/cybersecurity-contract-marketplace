import React, { Fragment } from "react";
import ViewHiredHackersHelper from "../../../../../../components/dashboard/jobManagement/employers/manageHiredHackers/viewHackers/viewHackersHired.js";


const ViewHiredHackersPage = (props) => {
    return (
        <Fragment>
            <ViewHiredHackersHelper props={props} />
        </Fragment>
    );
}
export default ViewHiredHackersPage;