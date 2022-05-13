import React from 'react';
import {Link} from 'react-router-dom'; 
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import "./styles.css";

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    interactive: false
});


const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <footer className="footer-top-area pt-100 pb-70 jarallax">
                <div className="container-fluid container-footer-spacing">
                    <div className="row">
                        <div className="col-lg-3 col-xl-3 col-sm-12 col-md-6">
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
                                        <a className='wrapme' href="mailto:blongjeremy@gmail.com">
                                            blongjeremy@gmail.com
                                        </a>
                                    </li>
                                    
                                    <li>
                                        <i className="bx bx-location-plus"></i>
                                        <span>Address:</span> 
                                            San Francisco, CA 391 Ellis Street
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-xl-3 col-sm-12 col-md-6">
                            <div className="single-widget">
                                <h3>Services Link</h3>

                                <ul>
                                    <li>
                                        <Link to="/about">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                About
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/pricing-before-login">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Pricing & Subscriptions
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/team">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Team
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/forgot-password">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Forgot Password?
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/privacy-policy">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Privacy Policy
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/terms-and-conditions">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Terms & Conditions
                                            
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-xl-3 col-sm-12 col-md-6">
                            <div className="single-widget">
                                <h3>Support & Help</h3>

                                <ul>
                                    <li>
                                        <Link to="/company-details">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Company Details (About Us)
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/faq">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                FAQ Questions
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/sign-up">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Sign-Up
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/sign-in">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Login 
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/blog-main">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Blog Main (Unauthenticated View)
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/create-new-blog">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Create New Blog (Admin ONLY)
                                            
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-xl-3 col-sm-12 col-md-6">
                            <Map
                                center={[-122.412660, 37.784850]}
                                style="mapbox://styles/mapbox/streets-v9"
                                containerStyle={{
                                    height: "325px",
                                    width: '100%',
                                    border: "3px solid white"
                                }}
                            >
                                <Marker
                                    coordinates={[-122.412660, 37.784850]}
                                    anchor="bottom"
                                >
                                    <img src={require("../../assets/icons/location.png")}/>
                                </Marker>
                            </Map>
                        </div>

                        {/* <div className="col-lg-3 col-md-6">
                            <div className="single-widget">
                                <h3>Quick Links</h3>

                                <ul>
                                    <li>
                                        <Link to="/contact">
                                            
                                                <i className="bx bx-chevrons-right"></i>
                                                Contact
                                            
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
                        </div> */}
                    </div>
                </div>
            </footer>

            <footer className="footer-bottom-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="copy-right">
                                <p>Copyright 2022 © CyberHunt CyberSecurity Marketplace Inc.</p>
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