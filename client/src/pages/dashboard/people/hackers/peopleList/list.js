import React, { Fragment } from "react";
import UsersCardsListHelper from "../../../../../components/dashboard/people/hackers/peopleList/list.js";

const UsersCardsListPage = (props) => {
    return (
        <Fragment>
            <UsersCardsListHelper props={props} />
        </Fragment>
    );
}
export default UsersCardsListPage;