import React, { Fragment } from 'react';
import ViewNotificationListHelper from "../../../../../components/dashboard/notifications/employers/viewNotificationList/viewNotifications.js";

const ViewNotificationListPage = (props) => {
    return (
        <Fragment>
            <ViewNotificationListHelper props={props} />
        </Fragment>
    );
}

export default ViewNotificationListPage;