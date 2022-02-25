import React, { Fragment } from "react";
import MainHackerDirectoryDisplayHelper from "../../../../../components/dashboard/directory/hackers/main/mainHackerDirectory.js";

const MainHackerDirectoryDisplayPage = (props) => {
    return (
        <Fragment>
            <MainHackerDirectoryDisplayHelper props={props} />
        </Fragment>
    );
};
export default MainHackerDirectoryDisplayPage;