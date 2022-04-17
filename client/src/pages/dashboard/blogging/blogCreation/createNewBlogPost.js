import React from 'react';
import CreateNewBlogPostHelper from "../../../../components/dashboard/blogging/blogCreation/createNewBlogPost.js";

const CreateNewBlogPostPage = (props) => {
    return (
        <div>
            <CreateNewBlogPostHelper props={props} />
        </div>
    );
}

export default CreateNewBlogPostPage;