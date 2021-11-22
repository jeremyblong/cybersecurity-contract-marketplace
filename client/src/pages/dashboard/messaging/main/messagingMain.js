import React, { Fragment } from "react";
import MessagingMainHelper from "../../../../components/dashboard/messaging/main/messagingMain.js";


const MessagingMainPage = (props) => {
    return (
        <Fragment>
            <MessagingMainHelper props={props} />
        </Fragment>
    );
}
export default MessagingMainPage;