import React, { Fragment } from 'react';
import ViewAllTutorialCoursesHelper from "../../../../../components/dashboard/learning/tutorialVideos/viewAllTutorials/viewAllTutorialContent.js";


const ViewAllTutorialCoursesPage = (props) => {
    return (
        <Fragment>
            <ViewAllTutorialCoursesHelper props={props} />
        </Fragment>
    );
}

export default ViewAllTutorialCoursesPage;