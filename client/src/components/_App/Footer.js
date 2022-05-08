import React from 'react';
import {Link} from 'react-router-dom'; 

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <footer style={{ marginTop: "175px" }} className="footer-top-area pt-100 pb-70 jarallax">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="single-widget contact">
                                <h3>Contact Us</h3>

                                <ul className="contact-info">
                                    <li>
                                        <i className="bx bx-phone-call"></i>
                                        <span>Support:</span> 
                                        <a href="tel:Phone:+19808006253">
                                            Phone: +1(980)-800-6253
                                        </a>
                                    </li>
                                    
                                    <li>
                                        <i className="bx bx-envelope"></i>
                                        <span>Email:</span> 
                                        <a className='wrapme' href="mailto:support@thehackermarketplace.com">
                                            support@thehackermarketplace.com
                                        </a>
                                    </li>
                                    
                                    <li>
                                        <i className="bx bx-location-plus"></i>
                                        <span>Address:</span> 
                                            Central Los Angeles, CA 90012
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="single-widget">
                                <h3>Services Link</h3>

                                <ul>
                                    <li>
                                        <Link to="/service-details">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Web Site Protection
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/service-details">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Hosting & Server Guard
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/service-details">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Web Administrator
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/service-details">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Conducting Training
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/service-details">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                GRPS Smart Protection
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/service-details">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Security App
                                            
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="single-widget">
                                <h3>Support & Help</h3>

                                <ul>
                                    <li>
                                        <Link to="/contact">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Support Forum
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/faq">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                FAQ Questions
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/contact">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                24/7 Support for Help
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/contact">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Counseling 
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/contact">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Protection
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/contact">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Securihty
                                            
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="single-widget">
                                <h3>Quick Links</h3>

                                <ul>
                                    <li>
                                        <Link to="/contact">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Security
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/contact">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Protection
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/contact">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Antivirus Packages
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/contact">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Security App 
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/contact">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Website Security 
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/contact">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Digital Security
                                            
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <footer className="footer-bottom-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="copy-right">
                                <p>Copyright 2020 © CyberHunt CyberSecurity Marketplace Inc.</p>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="condition-privacy">
                                <ul>
                                    <li>
                                        <Link to="/terms-conditions">
                                            Terms & Condition
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/privacy-policy">
                                            Privacy Policy
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;