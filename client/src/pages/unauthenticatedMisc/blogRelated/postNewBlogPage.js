import React, { Fragment } from 'react';
import CreateANewBlogPostHelper from "../../../components/Blog/createNewBlog/createANewBlog.js";
import Footer from '../../../components/_App/Footer';
import Navbar from '../../../components/_App/Navbar';
import PageBanner from '../../../components/Common/PageBanner';

const CreateANewBlogPostPage = (props) => {
    return (
        <Fragment>
            <Navbar />
            <PageBanner 
                pageTitle="Create A New Blog Post(s)" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="New Blog Post Creation" 
            /> 
            <CreateANewBlogPostHelper props={props} />
            <Footer />
        </Fragment>
    );
}

export default CreateANewBlogPostPage;