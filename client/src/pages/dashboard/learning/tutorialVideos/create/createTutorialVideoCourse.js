import React, { Fragment } from 'react';
import CreateTutorialCourseContentHelper from "../../../../../components/dashboard/learning/tutorialVideos/create/createTutorialVideoCourse.js";

const CreateTutorialCourseContentPage = (props) => {
    return (
        <Fragment>
            <CreateTutorialCourseContentHelper props={props} />
        </Fragment>
    );
}

export default CreateTutorialCourseContentPage;