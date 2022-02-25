import React, { Fragment } from "react";
import MainMapViewEmployerJobsHelper from "../../../../../components/dashboard/map/hackers/main/mainMap.js";


const MainMapViewEmployerJobsPage = (props) => {
    return (
        <Fragment>
            <MainMapViewEmployerJobsHelper props={props} />
        </Fragment>
    );
}
export default MainMapViewEmployerJobsPage;