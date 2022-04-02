import React from 'react';
import Navbar from '../components/_App/Navbar';
import PageBanner from '../components/Common/PageBanner';
import CompanyDetailsContentHelper from '../components/ServiceDetails/companyDetails.js';
import Footer from '../components/_App/Footer';

const AboutCompanyDetails = () => {
    return (
        <>
            <Navbar />

            <PageBanner 
                pageTitle="About 'The Hacker Marketplace' Platform" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="About Our Company" 
            /> 

            <CompanyDetailsContentHelper />
            
            <Footer />
        </>
    )
}

export default AboutCompanyDetails;