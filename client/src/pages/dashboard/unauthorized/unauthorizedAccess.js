import React, { Fragment } from "react";
import UnauthorizedAccessHelper from "../../../components/dashboard/unauthorized/unauthorizedAccess.js";


const UnauthorizedAccessPage = (props) => {
    return (
        <Fragment>
            <UnauthorizedAccessHelper props={props} />
        </Fragment>
    );
};
export default UnauthorizedAccessPage;