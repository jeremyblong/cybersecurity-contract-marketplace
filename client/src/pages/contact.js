import React from 'react';
import Navbar from '../components/_App/Navbar';
import PageBanner from '../components/Common/PageBanner';
import ContactInfo from '../components/Contact/ContactInfo';
// import ContactForm from '../components/Contact/ContactForm';
import Footer from '../components/_App/Footer';

const Contact = () => {
    return (
        <>
            <Navbar />

            <PageBanner 
                pageTitle="Contact Us (Potential Partnership's)" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Contact Page" 
            /> 

            <ContactInfo />

            {/* <ContactForm /> */}
            
            <Footer />
        </>
    )
}

export default Contact;