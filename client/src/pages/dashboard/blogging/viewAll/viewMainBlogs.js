import React, { Fragment } from "react";
import BlogsMainHomepageViewHelper from "../../../../components/dashboard/blogging/viewAll/viewMainBlogs.js";

const BlogsMainHomepageViewPage = (props) => {
    return (
        <Fragment>
            <BlogsMainHomepageViewHelper props={props} />
        </Fragment>
    );
};
export default BlogsMainHomepageViewPage;