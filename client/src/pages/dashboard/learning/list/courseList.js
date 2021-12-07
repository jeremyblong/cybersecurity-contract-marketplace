import React, { Fragment } from "react";
import CourseListHelper from "../../../../components/dashboard/learning/list/courseList.js";

const CourseListPage = (props) => {
    return (
        <Fragment>
            <CourseListHelper props={props} />
        </Fragment>
    );
}
export default CourseListPage;