import React, { Fragment } from "react";
import CreateNewForumPostingHelper from "../../../../components/dashboard/forums/createNewForumPost/createNewForumPost.js";


const CreateNewForumPostingPage = (props) => {
    return (
        <Fragment>
            <CreateNewForumPostingHelper props={props} />
        </Fragment>
    );
}
export default CreateNewForumPostingPage;