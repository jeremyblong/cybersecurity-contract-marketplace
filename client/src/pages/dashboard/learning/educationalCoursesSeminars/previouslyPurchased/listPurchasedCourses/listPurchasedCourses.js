import React, { Fragment, useState } from 'react';
import ListViewPurchasedCoursesHelper from "../../../../../../components/dashboard/learning/educationalCoursesSeminars/previouslyPurchased/listPurchasedCourses/listPurchasedCourses.js";


const ListViewPurchasedCoursesPage = (props) => {
    return (
        <Fragment>
            <ListViewPurchasedCoursesHelper props={props} />
        </Fragment>
    );
}

export default ListViewPurchasedCoursesPage;