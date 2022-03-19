import React, { Fragment } from 'react';
import CreateVideoChatEmployerHelper from "../../../../components/dashboard/video/createVideoInterview/createVideoChat.js";

const CreateVideoChatEmployerPage = (props) => { 
    return (
        <Fragment>
            <CreateVideoChatEmployerHelper props={props} />
        </Fragment>
    );
}

export default CreateVideoChatEmployerPage;