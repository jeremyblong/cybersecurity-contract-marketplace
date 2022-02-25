import React, { Fragment } from "react";
import IndividualForumHelper from "../../../../components/dashboard/forums/individualForum/individual.js";

const IndividualForumPage = (props) => {
    return (
        <Fragment>
            <IndividualForumHelper props={props} />
        </Fragment>
    );
}
export default IndividualForumPage;