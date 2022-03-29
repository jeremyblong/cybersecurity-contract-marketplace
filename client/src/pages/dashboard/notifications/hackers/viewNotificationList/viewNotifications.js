import React, { Fragment } from 'react';
import ViewNotificationListHackerHelper from "../../../../../components/dashboard/notifications/hackers/viewNotificationList/viewNotifications.js";

const ViewNotificationListHackerPage = (props) => {
    return (
        <Fragment>
            <ViewNotificationListHackerHelper props={props} />
        </Fragment>
    );
}

export default ViewNotificationListHackerPage;